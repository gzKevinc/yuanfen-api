# 宠缘匹配 - Railway 部署指南

## 方案B：Railway 部署（推荐，免费，无需信用卡）

Railway 是一个可以一键部署 Node.js 后端到全球 CDN 的平台，免费套餐足够小程序用。

---

## 第一步：安装 Railway CLI

```bash
npm install -g @railway/cli
```

如果安装慢，用国内镜像：
```bash
npm install -g @railway/cli --registry=https://registry.npmmirror.com
```

---

## 第二步：登录 Railway

```bash
railway login
```

会打开浏览器，按提示登录（可用 GitHub 账号）。

---

## 第三步：部署

```bash
cd /Users/kevin.c/Desktop/yuanfen-miniprogram/backend
railway init
railway up
```

---

## 第四步：获取 API 地址

部署成功后，Railway 会给你一个类似 `https://xxx.railway.app` 的地址。

把这个地址更新到小程序：
- 打开 `/Users/kevin.c/Desktop/yuanfen-miniprogram/utils/api.js`
- 把 `BASE_URL` 改成 `https://xxx.railway.app`（或者保持 `https://pawdestiny.cn`，只需要配置 Nginx 反向代理到 Railway 地址）

---

## 替代方案：用 API 代理（无需改小程序代码）

如果不想改小程序代码，可以在腾讯云服务器（43.139.62.15）上配置 Nginx 反向代理到 Railway：

```
# Nginx 配置
location /api/ {
    proxy_pass https://xxx.railway.app/;
}
```

这样小程序访问 `/api/` 就会自动转发到 Railway。

---

## 当前状态

✅ 后端代码已准备
⏳ 等待安装 Railway CLI 并部署