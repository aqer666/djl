# AI 绘图接入说明

当前实现包含一个本地后端 `server.mjs`：

- `GET /`：托管前端页面。
- `POST /api/images/generate`：接收前端绘图请求。
- 未配置 API Key 时：返回本地模拟 SVG 图，用于跑通产品流程。
- 配置 `OPENAI_API_KEY` 时：优先调用 OpenAI Images API。
- 配置 `REPLICATE_API_TOKEN` 时：调用 Replicate 模型。

## 启动

```powershell
cd C:\Users\d_jun\Documents\Codex\2026-07-07\b-w\outputs
node server.mjs
```

然后访问：

```text
http://127.0.0.1:8765/
```

## 使用 OpenAI

```powershell
$env:OPENAI_API_KEY="你的 OpenAI API Key"
$env:OPENAI_IMAGE_MODEL="gpt-image-1"
node server.mjs
```

## 使用 Replicate

```powershell
$env:REPLICATE_API_TOKEN="你的 Replicate API Token"
$env:REPLICATE_MODEL="black-forest-labs/flux-schnell"
node server.mjs
```

## 已实现的前端流程

1. 启动 `node server.mjs` 并访问 `http://127.0.0.1:8765/`。
2. 进入“OC”页面。
3. 点击角色卡片上的“生成头像”。
4. 选择风格模板。
5. 选择构图。
6. 选择比例。
7. 选择生成数量。
8. 输入提示词补充。
9. 点击“生成头像”。
10. 前端请求 `/api/images/generate`。
11. 后端拼接角色 Prompt。
12. 后端调用真实模型或本地模拟。
13. 前端展示生成图、服务商、点数消耗和实际 Prompt。
14. 点击“设为角色封面”，生成图会绑定到角色卡并持久化到 `localStorage`。

## 下一步建议

- 接入真实用户系统。
- 接入点数扣费表。
- 增加图片审核。
- 把生成图上传到对象存储。
- 把图片资产绑定到角色表。
- 增加异步任务轮询和失败重试。
