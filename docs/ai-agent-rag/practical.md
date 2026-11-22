# AI Agent 与 RAG · 实战

## 目标

从零搭建一个可评估的最小 RAG 系统：索引 → 检索 → 生成 → 评估。

## 知识点

### 四段流程

1. **索引**：加载文档 → 切分 → 向量化 → 存入向量库。
2. **检索**：用户问题向量化 → 召回 Top-K → 可选重排。
3. **生成**：把证据拼入 Prompt → LLM 生成答案与引用。
4. **评估**：召回率、答案相关性、忠实度、延迟与成本。

### 最小实现骨架

```python
from pathlib import Path

# 1. 切分
def chunk(text: str, size: int = 500, overlap: int = 50) -> list[str]:
    return [text[i:i + size] for i in range(0, len(text), size - overlap)]

# 2. 索引（示意：doc_store 保存文本，vector_store 保存向量）
docs = chunk(Path("manual.md").read_text(encoding="utf-8"))
vectors = [embed(d) for d in docs]          # embed 由你的模型提供
vector_store.upsert(vectors, docs)

# 3. 检索 + 生成
question = "如何配置虚拟环境？"
hits = vector_store.query(embed(question), top_k=3)
context = "\n\n".join(h.text for h in hits)
answer = llm(f"仅依据资料回答，并标注出处：\n{context}\n问题：{question}")
```

### 常见坑

- 切分过大：噪声多、成本高；过小：语义断裂。
- 只做向量召回：关键词命中差，建议混合检索。
- 无引用：无法追溯，幻觉难发现。
- 无拒答策略：资料不足时模型容易编造。

### 评估最小集

| 指标 | 怎么看 |
| --- | --- |
| 召回率 | 正确文档是否进入 Top-K |
| 忠实度 | 答案是否可由证据推出 |
| 答案相关性 | 是否真正回答问题 |
| 延迟 / 成本 | P95 延迟与每次请求 Token 花费 |

## 练习

1. 给检索增加关键词召回，与向量结果合并去重。
2. 在 Prompt 中加入“资料不足时回答未提及”并测试。
3. 用 20 条人工标注问题跑一次评估表。

## 复习要点

- RAG 不是“接个向量库”就结束，评估闭环才决定质量。
- 先提高召回，再优化生成。
- 引用与拒答是控制幻觉的两个低成本手段。
