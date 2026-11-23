# HTTP 基础

> API 的本质是：客户端发一个 HTTP 请求，服务端回一个 HTTP 响应。

## 目标

- 看懂请求行、请求头、请求体和响应行、响应头、响应体。
- 区分常见请求方法及是否安全、幂等。
- 能根据状态码判断问题出在客户端还是服务端。
- 会用 `curl -i` 观察完整的请求与响应。

## 一次请求与响应

```text
GET /public/items/42?q=demo HTTP/1.1
Host: 127.0.0.1:8001
Accept: application/json
```

```text
HTTP/1.1 200 OK
content-type: application/json

{"item_id":42,"q":"demo","skip":0,"limit":10}
```

- 请求行：方法 + 路径与查询串 + 协议版本。
- 请求头：描述客户端能力与身份，例如 `Accept`、`Authorization`。
- 请求体：`POST`、`PUT`、`PATCH` 常用，通常放 JSON。
- 响应行：协议版本 + 状态码 + 原因短语。
- 响应头：描述响应内容，例如 `Content-Type`、`Cache-Control`。
- 响应体：业务数据，FastAPI 默认序列化为 JSON。

## 请求方法

| 方法 | 用途 | 安全 | 幂等 | 典型成功码 |
| --- | --- | --- | --- | --- |
| `GET` | 查询资源 | 是 | 是 | `200` |
| `POST` | 创建资源或触发动作 | 否 | 否 | `201` 或 `200` |
| `PUT` | 全量替换资源 | 否 | 是 | `200` 或 `204` |
| `PATCH` | 局部更新资源 | 否 | 通常否 | `200` |
| `DELETE` | 删除资源 | 否 | 是 | `204` 或 `200` |

“安全”指不改变服务端状态；“幂等”指同一请求执行多次与执行一次的结果一致。

## 状态码

| 区段 | 含义 | 常见例子 |
| --- | --- | --- |
| `2xx` | 成功 | `200`、`201`、`204` |
| `3xx` | 重定向或缓存 | `301`、`302`、`304` |
| `4xx` | 客户端问题 | `400`、`401`、`403`、`404`、`422` |
| `5xx` | 服务端问题 | `500`、`502`、`503` |

几个容易混淆的：

- `400 Bad Request`：请求格式错误，服务端无法解析。
- `401 Unauthorized`：没有认证，或凭据无效，本质是“你是谁”。
- `403 Forbidden`：已认证但没有权限，本质是“你不能”。
- `404 Not Found`：资源不存在，也可能用于隐藏无权访问的资源。
- `422 Unprocessable Content`：格式能解析，但字段校验失败；FastAPI 默认用它表示参数错误。
- `500 Internal Server Error`：未捕获的服务端异常。

## 常用请求头

| 请求头 | 作用 |
| --- | --- |
| `Accept` | 期望的响应类型，例如 `application/json` |
| `Content-Type` | 请求体的类型，发送 JSON 时必须写 |
| `Authorization` | 认证信息，常见为 `Bearer <token>` |
| `User-Agent` | 客户端标识 |
| `X-Request-Id` | 自定义请求追踪 ID |

响应侧最需要关注 `Content-Type`、`Content-Length`、`Cache-Control` 和 `Location`（`201` 创建后指向新资源）。

## 示例：用 curl 观察

先启动本仓库示例服务：

```bash
uvicorn main:app --reload --port 8001
```

`-i` 让 curl 同时输出响应头：

```bash
curl -i http://127.0.0.1:8001/
curl -i "http://127.0.0.1:8001/public/items/42?q=demo"
curl -i http://127.0.0.1:8001/public/items/abc
```

最后一条会把 `abc` 传给 `int` 类型的 `item_id`，FastAPI 返回 `422`，响应体类似：

```json
{
  "detail": [
    {
      "type": "int_parsing",
      "loc": ["path", "item_id"],
      "msg": "Input should be a valid integer, unable to parse string as an integer",
      "input": "abc"
    }
  ]
}
```

`loc` 告诉你出错位置，`msg` 说明原因，`type` 方便程序判断。

## 常见误区

- 所有成功都返回 `200`：创建资源应优先 `201`，删除成功可用 `204`。
- 用 `500` 表示参数错误：参数错误是客户端问题，应使用 `400` 或 `422`。
- 把 `401` 和 `403` 混用：先判断“有没有认证”，再判断“有没有权限”。
- 用 `GET` 携带请求体：语义不清晰，很多代理和缓存会忽略请求体。
- 发送 JSON 却漏掉 `Content-Type: application/json`，服务端可能按表单解析。

## 练习

1. 用 `curl -i` 请求根路由，指出状态行、响应头和响应体分别在哪里。
2. 请求 `/public/items/abc`，从 `422` 响应中读出 `loc`、`msg`、`type`。
3. 对同一个资源连续执行两次 `DELETE`，观察状态码，并解释“幂等”的含义。
4. 用下面的命令创建条目，观察 `201` 和响应体：

   ```bash
   curl -i -X POST http://127.0.0.1:8001/public/items \
     -H 'Content-Type: application/json' \
     -d '{"name": "demo", "price": 9.9}'
   ```

## 复习要点

- 请求 = 方法 + URL + 头 + 体；响应 = 状态码 + 头 + 体。
- `GET/HEAD` 安全，`GET/HEAD/PUT/DELETE` 幂等，`POST` 通常既不安全也不幂等。
- `401` 是没认证，`403` 是没权限，`422` 是字段校验失败。
- 排查接口问题时，先看状态码，再看响应体，最后看服务端日志。

## 扩展阅读

- 相关章节：[第一个 FastAPI 应用](first-app.md)、[路由与参数](routing.md)
- 外部文档：[MDN HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)
