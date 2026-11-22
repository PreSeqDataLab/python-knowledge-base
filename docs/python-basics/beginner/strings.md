# Python 基础 · 入门 · 数字与字符串

## 7. 数字与字符串

```python
a, b = 7, 2
print(a / b)    # 3.5
print(a // b)   # 3
print(a % b)    # 1
print(a ** b)   # 49
```

字符串支持索引、切片和常用方法：

```python
s = "Python"
print(s[0])        # P
print(s[-1])       # n
print(s[1:4])      # yth
print(s.lower())
print(s.replace("y", "Y"))
print(", ".join(["a", "b"]))
```

f-string 是最常用的格式化方式：

```python
user = "Ada"
score = 95
print(f"{user} scored {score}")
```

