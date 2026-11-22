# Python 基础 · 入门 · 条件与循环

## 9. 条件与循环

```python
score = 85
if score >= 90:
    grade = "A"
elif score >= 60:
    grade = "B"
else:
    grade = "C"
```

```python
for i in range(3):
    if i == 1:
        continue
    print(i)

n = 3
while n > 0:
    print(n)
    n -= 1
```

`break` 结束循环，`continue` 跳过本轮。循环也可以带 `else`，但只在未被 `break` 打断时执行。

