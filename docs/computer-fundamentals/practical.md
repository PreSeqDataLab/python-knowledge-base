# 计算机与必要基础 · 实战

## 目标

建立一套可复用的排障流程：复现 → 缩小范围 → 观察 → 验证 → 回归。

## 知识点

### 调试五步法

1. **复现**：稳定重现，记录输入与环境。
2. **缩小范围**：二分法定位到模块或代码行。
3. **观察状态**：日志、断点、指标、抓包。
4. **验证假设**：一次只改一个变量。
5. **回归**：补测试，确认不引入新问题。

### 性能排查清单

- CPU：是否死循环、序列化开销、正则回溯。
- 内存：是否无限增长、缓存无过期。
- I/O：是否 N+1 查询、慢 SQL、远程调用串行。
- 网络：DNS、连接数、超时、重试放大。

## 示例：给函数打点

```python
import time
import logging

def timed(fn):
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        try:
            return fn(*args, **kwargs)
        finally:
            logging.info("%s cost %.3fs", fn.__name__, time.perf_counter() - start)
    return wrapper
```

## 练习

1. 给 Web 项目的关键依赖加装耗时日志。
2. 人为制造一个 `N+1` 查询，记录排查全过程。
3. 用二分法定位一个偶现失败测试。

## 复习要点

- 先证明问题在哪，再改代码。
- 日志要带上下文：时间、请求 ID、关键参数。
- 修复必须配回归测试。
