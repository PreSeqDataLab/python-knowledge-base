# Python 基础 · 进阶 · 错误与异常

## 7. 错误与异常

```python
try:
    value = int("abc")
except ValueError as exc:
    print("convert failed:", exc)
else:
    print(value)
finally:
    print("done")
```

不要捕获过宽的 `Exception` 后静默吞掉错误。业务异常可自定义异常类。

