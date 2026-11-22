# Python 基础 · 入门 · 输入输出与文件

## 11. 输入输出与文件初步

```python
name = input("Your name: ")
print(f"Hello, {name}")

from pathlib import Path

path = Path("note.txt")
path.write_text("hello", encoding="utf-8")
print(path.read_text(encoding="utf-8"))
```

用 `with` 管理文件能确保异常时也关闭资源：

```python
with open("note.txt", encoding="utf-8") as f:
    for line in f:
        print(line.rstrip())
```

## 示例：统计词频

```python
from collections import Counter

text = "python web python ai python"
counts = Counter(text.split())
print(counts.most_common(2))
# [('python', 3), ('web', 1)]
```

## 练习

1. 写一个脚本读取 `hello.py` 并统计行数。
2. 用字典统计一段文本中每个字符出现次数。
3. 输入一段文本，输出出现次数最多的 3 个单词。
4. 用集合找出两个列表中不同的元素。

## 复习要点

- Python 3 又称 Python 3000 / Py3k；Python 2 已于 2020-01-01 停止更新。
- `python -V` 或 `python --version` 查看版本；小写 `-v` 不是。
- `.py` 源文件可用 `python3 hello.py` 运行；shebang 只在直接执行脚本时起作用。
- 虚拟环境隔离依赖，避免全局污染。
- 缩进错误是新手最常见语法错误。
- 列表可变、元组不可变；字典键必须可哈希。
- f-string 是首选字符串格式化方式。
- 推导式适合简单转换，复杂逻辑应写循环。
