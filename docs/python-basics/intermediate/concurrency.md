# Python 基础 · 进阶 · 并发模型

## 11. 并发模型

- 多线程：适合 I/O 密集，受 GIL 限制，不适合 CPU 密集。
- 多进程：适合 CPU 密集，绕过 GIL，但进程间通信成本高。
- `asyncio`：单线程事件循环，适合大量 I/O 等待。

## 示例：解析配置文件

```python
import json
from pathlib import Path

config = json.loads(Path("config.json").read_text(encoding="utf-8"))
debug = config.get("debug", False)
print("debug mode:", debug)
```

## 练习

1. 把词频脚本封装成类，支持替换分词策略。
2. 用生成器实现一个大文件的逐行处理，避免一次性读入内存。
3. 写一个带缓存的装饰器，并说明缓存键如何设计。
4. 用 `json` 保存和读取程序配置。

## 复习要点

- 装饰器是高阶函数，`wraps` 保留元信息。
- 生成器惰性求值，适合流式处理。
- `with` 依赖上下文管理协议。
- `__name__` 用于区分“直接运行”和“被导入”。
- 异常应按类型捕获，避免吞错。
- 优先用标准库解决问题，再考虑第三方依赖。
