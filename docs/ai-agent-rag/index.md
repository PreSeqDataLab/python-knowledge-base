# AI Agent 与 RAG

从“调用大模型”走到“让模型使用工具并基于私有知识可靠回答”。

| 层级 | 章节 | 完成标准 |
| --- | --- | --- |
| 入门 | [beginner.md](beginner.md) | 能调用 LLM API，写出稳定 Prompt |
| 进阶 | [intermediate.md](intermediate.md) | 能设计工具调用与 Agent 循环 |
| 实战 | [practical.md](practical.md) | 能搭建并评估一个最小 RAG 系统 |
| 面试 | [interview.md](interview.md) | 能讲清 RAG 流程、幻觉治理与评估指标 |

## 为什么独立成线

AI 不再是 Web 的一个功能点，而是包含检索、工具、状态、评估与成本控制的独立工程问题，因此从原“AI 部分”中独立出来。

## 扩展方式

新主题优先加到对应层级文件；当一个层级内容超过约 300 行时，拆成子目录并更新 `.vitepress/config.mts` 中的 `sidebar` 配置。
