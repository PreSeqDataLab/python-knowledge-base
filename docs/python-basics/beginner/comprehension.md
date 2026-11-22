# Python 基础 · 入门 · 推导式

## 10. 推导式

```python
squares = [n * n for n in range(10) if n % 2 == 0]
index = {name: i for i, name in enumerate(["a", "b"])}
unique = {n % 3 for n in range(10)}
lazy = (n * n for n in range(10))
```

推导式简洁，但嵌套过深时优先改回普通循环，保证可读性。

