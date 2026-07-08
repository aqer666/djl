# OC Forge MVP

这是 OC Forge 创作约稿社区的前端 MVP 原型。

## 本地预览

可以直接打开 `index.html`，或使用本地静态服务：

```bash
python -m http.server 8765
```

然后访问：

```text
http://127.0.0.1:8765/
```

## 主要文件

- `index.html`：页面入口
- `styles.css`：界面样式
- `app.js`：mock 数据、路由和交互逻辑
- `hero-oc-platform.png`：首屏视觉图
- `server.mjs`：本地图片生成接口演示服务
- `AI_IMAGE_SETUP.md`：图片生成接口说明

## 当前功能

- 画师列表和画师主页
- OC 角色档案
- OC AI 头像生成：选择风格、构图、比例和数量，调用本地图片生成接口并绑定角色封面
- 约稿订单
- 画师提交状态推进申请
- 管理员审核订单状态
- 社区晒图
- 后台概览

## AI 头像生成验证

启动本地服务后进入“OC”页面，点击任意角色卡片上的“生成头像”。

```bash
node server.mjs
```

未配置 API Key 时会走本地 mock，生成的图片会保存到 `generated/` 并展示在弹窗内；点击“设为角色封面”后会写入浏览器 `localStorage`。
