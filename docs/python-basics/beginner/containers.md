# Python 基础 · 入门 · 常用容器

## 8. 常用容器

| 类型 | 是否有序 | 是否可变 | 典型用途 |
| --- | --- | --- | --- |
| `list` | 是 | 是 | 顺序集合、栈、队列基础 |
| `tuple` | 是 | 否 | 固定记录、字典键 |
| `dict` | 是（3.7+） | 是 | 键值映射 |
| `set` | 否 | 是 | 去重、集合运算 |

```python
items = ["a", "b", "a"]
point = (10, 20)
user = {"name": "Ada", "age": 18}
tags = {"python", "web", "python"}

print(list(set(items)))       # 去重
print(user.get("age"))        # 安全取值
print(sorted(tags))           # 有序输出
```

字典的键必须可哈希；列表不能作为键，元组可以。

