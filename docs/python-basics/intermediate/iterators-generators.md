# Python 基础 · 进阶 · 迭代器与生成器

## 4. 迭代器与生成器

```python
squares = [n * n for n in range(10)]
gen = (n * n for n in range(10))

next(gen)
list(gen)
```

生成器惰性求值，适合流式处理大文件。迭代器和生成器的共同点是都实现迭代协议。

