# Python 基础 · 进阶 · 装饰器

## 3. 装饰器

```python
from functools import wraps

def log_call(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        print("calling", fn.__name__)
        return fn(*args, **kwargs)
    return wrapper
```

装饰器本质是“接收函数、返回函数”。`wraps` 保留原函数的 `__name__` 与文档字符串。

