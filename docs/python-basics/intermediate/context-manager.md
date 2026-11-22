# Python 基础 · 进阶 · 上下文管理器

## 5. 上下文管理器与 `with`

```python
from contextlib import contextmanager

@contextmanager
def timer(label: str):
    import time
    start = time.perf_counter()
    try:
        yield
    finally:
        print(label, time.perf_counter() - start)

with timer("query"):
    sum(range(1_000_000))
```

`with` 保证离开代码块时执行清理逻辑，常用于文件、锁和数据库连接。

