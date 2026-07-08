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

1. 选择风格模板。
2. 选择构图。
3. 选择比例。
4. 选择生成数量。
5. 输入提示词补充。
6. 点击“生成头像”。
7. 前端请求 `/api/images/generate`。
8. 后端拼接角色 Prompt。
9. 后端调用真实模型或本地模拟。
10. 前端展示生成图，并同步更新角色卡封面。

## 下一步建议

- 接入真实用户系统。
- 接入点数扣费表。
- 增加图片审核。
- 把生成图上传到对象存储。
- 把图片资产绑定到角色表。
- 增加异步任务轮询和失败重试。
