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
- 约稿订单
- 画师提交状态推进申请
- 管理员审核订单状态
- 社区晒图
- 后台概览
