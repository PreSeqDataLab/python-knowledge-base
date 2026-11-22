# Python 基础 · 进阶 · 函数与 lambda

## 1. 函数与作用域

```python
def add(a: int, b: int = 1) -> int:
    return a + b

print(add(2), add(2, 3))
```

参数可使用位置参数、默认参数、`*args`、`**kwargs`。默认参数不要使用可变对象，否则多次调用会共享同一份状态。

变量查找遵循 LEGB 顺序：Local → Enclosing → Global → Built-in。


## 2. lambda 与高阶函数

```python
pairs = [(1, "b"), (2, "a")]
print(sorted(pairs, key=lambda p: p[1]))
```

`lambda` 适合简短的一次性函数；复杂逻辑仍应定义普通函数。

