# AI Agent 与 RAG · 进阶

## 目标

- 理解 Agent 与 Workflow 的区别。
- 能设计工具调用、状态管理与终止条件。

## 知识点

### Agent 循环

```text
观察 → 规划 → 调用工具 → 观察结果 → 再规划 → 输出答案
```

Agent 强调模型自主决定下一步；Workflow 是固定编排。生产环境优先 Workflow，必要时才引入 Agent。

### 工具定义

```python
tools = [{
    "type": "function",
    "function": {
        "name": "search_web",
        "description": "按关键词检索网页",
        "parameters": {
            "type": "object",
            "properties": {"query": {"type": "string"}},
            "required": ["query"],
        },
    },
}]
```

模型返回 `tool_calls`，程序执行真实函数，再把结果作为 `tool` 角色消息回传。

### 状态与记忆

- 短期记忆：当前会话消息列表。
- 长期记忆：向量库或结构化数据库。
- 状态压缩：对长历史做摘要，避免超出上下文。

### 结构化输出

用 JSON Schema / Pydantic 约束返回，避免解析自然语言。

## 示例：带终止条件的循环骨架

```python
for step in range(max_steps):
    resp = llm(messages, tools=tools)
    if not resp.tool_calls:
        return resp.content
    for call in resp.tool_calls:
        result = dispatch[call.name](**call.args)
        messages.append({"role": "tool", "content": str(result)})
raise RuntimeError("agent 未在限定步数内完成")
```

## 练习

1. 给工具调用增加超时与重试。
2. 设计“最多 5 步、无新信息则停止”的终止策略。
3. 把工具执行结果改成结构化对象而非裸字符串。

## 复习要点

- Agent 的难点不是循环，而是可控性与可观测性。
- 必须设置最大步数与超时。
- 工具描述决定模型是否选对工具。
