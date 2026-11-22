# 计算机与必要基础 · 入门

## 目标

- 熟练使用常用命令行与 Git。
- 建立网络分层与 HTTP 的基本心智模型。

## 知识点

### 常用命令

```bash
pwd
ls -la
cd /path
cp -r src dst
grep -rn "keyword" .
curl -I https://example.com
```

### Git 最小闭环

```bash
git status
git switch -c feat/topic
git add .
git commit -m "feat: add topic"
git push -u origin feat/topic
```

冲突处理：先 `git fetch`，再 `git rebase origin/main`，逐个解决冲突后继续。

### 网络分层

```text
应用层的 URL → 传输层 TCP → 网络层 IP → 链路层帧
```

DNS 把域名解析为 IP；HTTPS = HTTP + TLS。

## 示例：看一次请求

```bash
curl -v https://example.com
```

观察：DNS 解析、TCP 连接、TLS 握手、HTTP 请求与响应头。

## 练习

1. 用 `curl -v` 访问本书 Pages 地址，找出状态码。
2. 创建一个分支，修改一章再提交，观察 PR 差异。
3. 用 `grep` 在本书中搜索 `RAG`，确认检索关键词是否出现。

## 复习要点

- Git 的三种状态：工作区、暂存区、提交历史。
- TCP 面向连接，UDP 不保证送达。
- `curl -v` 是理解网络请求最直观的工具。
