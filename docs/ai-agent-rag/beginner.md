# AI Agent 与 RAG · 入门

## 目标

- 理解 Token、上下文窗口、温度等基本概念。
- 能调用大模型 API 并写出可复用的 Prompt 模板。

## 知识点

### 核心概念

- **Token**：模型处理文本的基本单位，不等于字符数。
- **上下文窗口**：一次请求能容纳的 Token 上限，包含输入与输出。
- **Temperature**：越低越确定，越高越随机。
- **System / User / Assistant**：角色消息决定指令优先级。

### 一次最小调用

```python
from openai import OpenAI

client = OpenAI()  # 从环境变量读取 OPENAI_API_KEY

resp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "你是简洁的技术助手。"},
        {"role": "user", "content": "用一句话解释 RAG。"},
    ],
    temperature=0.2,
)
print(resp.choices[0].message.content)
```

### Prompt 结构

```text
角色：你是……
任务：根据以下资料回答问题……
约束：不要编造；不确定时回答“资料中未提及”。
资料：{context}
问题：{question}
输出格式：JSON，字段 answer / evidence
```

## 示例：可复用模板

```python
TEMPLATE = """角色：你是代码审查助手。
任务：指出下面代码的一个潜在问题。
约束：只输出问题本身，不超过 30 字。
代码：
{code}
"""

def review(code: str) -> str:
    return TEMPLATE.format(code=code)
```

## 练习

1. 把上面的模板改为输出 JSON，并用 Pydantic 校验。
2. 对比 `temperature=0` 与 `temperature=1` 的输出稳定性。
3. 统计一段中文文本的 Token 数，估算成本。

## 复习要点

- Prompt 要写清角色、任务、约束、输入、输出格式。
- 上下文窗口有限，长文档必须切分。
- 不要让模型“自由发挥”关键事实，先给它证据。
