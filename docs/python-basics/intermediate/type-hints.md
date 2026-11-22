# Python 基础 · 进阶 · 类型注解

## 9. 类型注解

```python
def group(values: list[str], size: int = 2) -> list[list[str]]:
    return [values[i:i + size] for i in range(0, len(values), size)]
```

类型注解不改变运行时行为，但能提升 IDE 提示、静态检查和团队协作效率。

