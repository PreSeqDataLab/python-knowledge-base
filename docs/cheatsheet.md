# 速查手册

手机端用于快速回顾，完整解释请点击对应主线章节。

## Python

```bash
python --version
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip freeze > requirements.txt
```

```python
# 类型注解与数据类
from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int = 0
```

常见坑：默认参数不要用可变对象；`is` 与 `==` 区别；闭包晚绑定。

## Web

```bash
uvicorn main:app --reload --port 8001
```

- 状态码：`200` 成功，`201` 创建，`204` 无内容，`400` 参数错误，`401` 未认证，`403` 无权限，`404` 未找到，`422` 校验失败，`500` 服务端错误。
- FastAPI 三件套：路径操作、Pydantic 模型、依赖注入。
- 排查顺序：请求是否到达 → 参数是否校验通过 → 依赖是否执行 → 日志与异常。

## AI / RAG

```text
RAG = 索引（切分 → 向量化 → 存储） + 检索（召回 → 重排） + 生成（Prompt → LLM） + 评估
```

- 幻觉优先靠“检索证据 + 引用 + 拒答策略”缓解，而不是只调温度。
- 评估至少看：召回率、答案相关性、忠实度、延迟与成本。
- Agent = LLM + 工具 + 循环 + 状态。

## 计算机基础

```bash
git status
git switch -c feat/topic
git add .
git commit -m "feat: add topic"
git push -u origin feat/topic
```

- TCP 三次握手 / 四次挥手；HTTP 与 HTTPS 区别。
- 时间复杂度：二分 `O(log n)`，排序 `O(n log n)`，哈希查找均摊 `O(1)`。
- 调试顺序：复现 → 缩小范围 → 观察状态 → 验证假设 → 回归。

## 更多

- [Python 面试](python-basics/interview.md)
- [Web 面试](web-development/interview.md)
- [AI / RAG 面试](ai-agent-rag/interview.md)
- [计算机基础面试](computer-fundamentals/interview.md)
