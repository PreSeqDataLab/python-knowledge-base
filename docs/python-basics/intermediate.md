# Python 基础 · 进阶

## 目标

- 能用类、模块和包组织中等规模代码。
- 能读懂生成器、装饰器与上下文管理器。
- 能区分多线程与异步的适用场景。

## 知识点

### 面向对象与数据模型

```python
from dataclasses import dataclass

@dataclass
class Item:
    name: str
    price: float = 0.0

    def discounted(self, rate: float) -> float:
        return self.price * (1 - rate)
```

优先用 `@dataclass` 减少样板代码；需要校验时用 Pydantic。

### 推导式与生成器

```python
squares = [n * n for n in range(10) if n % 2 == 0]
gen = (n * n for n in range(10))  # 惰性，不一次性占内存
```

### 装饰器

```python
from functools import wraps

def log_call(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        print("calling", fn.__name__)
        return fn(*args, **kwargs)
    return wrapper
```

`wraps` 保留原函数的 `__name__` 与文档字符串。

### 并发模型

- 多线程：适合 I/O 密集，受 GIL 限制，不适合 CPU 密集。
- 多进程：适合 CPU 密集，绕过 GIL，但进程间通信成本高。
- `asyncio`：单线程事件循环，适合大量 I/O 等待。

## 示例：上下文管理器

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

## 练习

1. 把词频脚本封装成类，支持替换分词策略。
2. 用生成器实现一个大文件的逐行处理，避免一次性读入内存。
3. 写一个带缓存的装饰器，并说明缓存键如何设计。

## 复习要点

- GIL 让同一时刻只有一个线程执行 Python 字节码。
- 生成器惰性求值，适合流式处理。
- 装饰器的本质是“接收函数、返回函数”。
- 上下文管理器用 `with` 保证资源释放。
