# Python 基础 · 进阶 · 标准库

## 10. 标准库速览

| 模块 | 用途 |
| --- | --- |
| `pathlib` | 路径与文件操作 |
| `json` | JSON 编解码 |
| `re` | 正则匹配 |
| `datetime` | 日期时间 |
| `collections` | `Counter`、`defaultdict` 等容器 |
| `itertools` | 组合、排列、链式迭代 |
| `logging` | 分级日志 |
| `os` / `sys` | 系统与运行时信息 |

示例：JSON 与日期：

```python
import json
from datetime import datetime, timedelta

payload = json.dumps({"name": "Ada", "active": True})
data = json.loads(payload)
tomorrow = datetime.now() + timedelta(days=1)
```

示例：正则：

```python
import re

text = "user_id=42, price=9.9"
nums = re.findall(r"\d+(?:\.\d+)?", text)
```

