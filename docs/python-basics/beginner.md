# Python 基础 · 入门

## 目标

- 能安装并管理 Python 3 环境。
- 能写出处理字符串、列表、字典的小脚本。
- 能理解“解释执行”与“缩进决定代码块”的基本规则。

## 知识点

### 版本与环境

```bash
python --version
# 或
python3 --version
```

`python -v` 是 verbose 模式，不是查看版本。

创建虚拟环境：

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip freeze > requirements.txt
```

### Anaconda（可选）

```bash
curl -O https://repo.anaconda.com/archive/Anaconda3-2025.11-Linux-x86_64.sh
chmod +x Anaconda3-2025.11-Linux-x86_64.sh
bash Anaconda3-2025.11-Linux-x86_64.sh
```

静默安装到指定目录：

```bash
# -b 静默安装（无交互），-p 指定安装路径
sudo bash Anaconda3-2025.11-Linux-x86_64.sh -b -p /opt/anaconda3
source /opt/anaconda3/bin/activate
conda init --all
```

目标目录必须不存在；卸载时用 `conda init --reverse --all` 再删除目录。

### 基本语法

```python
#!/usr/bin/env python3
print("Hello, World!")

name: str = "Ada"
numbers: list[int] = [1, 2, 3]
user: dict[str, int] = {"age": 18}

for n in numbers:
    print(n)

if user["age"] >= 18:
    print("adult")
else:
    print("minor")
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
3. 把上面的词频脚本改造成接收命令行参数的文件路径。

## 复习要点

- 虚拟环境隔离依赖，避免全局污染。
- 列表可变、元组不可变；字典键必须可哈希。
- `is` 比较身份，`==` 比较值。
- 缩进错误是新手最常见语法错误。
