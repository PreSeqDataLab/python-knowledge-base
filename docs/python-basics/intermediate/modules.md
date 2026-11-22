# Python 基础 · 进阶 · 模块与 __name__

## 6. 模块与 `__name__`

```python
# helper.py
def twice(x: int) -> int:
    return x * 2

print(__name__)  # 直接运行时为 "__main__"
```

`if __name__ == "__main__":` 中的代码只在脚本直接运行时执行，被导入时不执行。

