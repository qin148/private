# 在 Vercel 上导入 GitHub 并部署（分步说明）

本文假设：**代码已经在 GitHub 上**（有一个仓库，里面有本项目的文件）。若还没有，请先在 GitHub 新建仓库并把本地项目 `push` 上去。

---

## 第一步：登录 Vercel 并绑定 GitHub

1. 用浏览器打开：**https://vercel.com**
2. 点击页面上的 **Sign Up**（注册）或 **Log In**（登录）。
3. 选择 **Continue with GitHub**（用 GitHub 登录）。
4. 若浏览器弹出 GitHub 授权页面：**Authorize Vercel**（授权 Vercel 访问你的 GitHub 账号）。  
   - 首次使用可能让你选择「允许访问哪些仓库」：可以选 **All repositories**，或只选 **Only select repositories** 再勾选本项目仓库。

---

## 第二步：从 GitHub 导入项目

1. 登录成功后，一般会进入 **Dashboard（控制台）**。
2. 找到 **Add New…** 按钮（常见在右上角或页面中间），点击后选择 **Project**（新建项目）。  
   - 若界面是中文或新版布局，也可能是 **「New Project」**、**「创建项目」** 等类似入口。
3. 进入 **Import Git Repository**（导入 Git 仓库）页面后：
   - 在列表里**找到你的仓库名**，点击右侧的 **Import**（导入）。  
   - 若列表里没有：点 **Adjust GitHub App Permissions**（调整 GitHub 应用权限），按提示给 Vercel 开放对应仓库的访问，再回到本页刷新。

---

## 第三步：检查构建设置（很重要）

导入后会出现 **「Configure Project」**（配置项目）页面，请逐项确认：

| 配置项 | 建议填写 | 说明 |
|--------|----------|------|
| **Framework Preset**（框架预设） | **Vite** | 选 Vite 后，下面几项往往会自动填对。若已是 Vite，可不改。 |
| **Root Directory** | 留空 或 `.` | 若仓库根目录就是本项目（有 `package.json`、`vite.config.js`），不要填子文件夹。若项目是 monorepo 子目录，再填子路径。 |
| **Build Command** | `npm run build` | 生成正式网页文件的命令，一般选 Vite 后会自动出现。 |
| **Output Directory** | `dist` | Vite 打包结果所在文件夹，必须是 **dist**（小写）。 |
| **Install Command** | `npm install` 或留空 | 留空时 Vercel 通常也会默认执行安装依赖，一般不用改。 |

**本项目已包含 `vercel.json`**：用于解决用 React Router 时「刷新子页面出现 404」的问题，无需在 Vercel 网页里额外设置。

确认无误后，点击 **Deploy**（部署）。

---

## 第四步：等待构建结束

1. 点击 Deploy 后，页面会显示 **Building…**（构建中）和日志滚动。
2. **成功**：出现 **Congratulations** 或绿色勾，并显示 **Visit**（访问）按钮。  
3. **失败**：日志里会有红色报错（例如依赖安装失败、构建命令报错）。把报错最后几行复制下来，对照本地是否能在项目目录执行 `npm install` 和 `npm run build` 成功。

---

## 第五步：拿到网址并分享给朋友

1. 部署成功后，Vercel 会分配一个默认域名，形如：**`https://你的项目名.vercel.app`**
2. 点击 **Visit** 或复制该链接，在**手机流量 / 其他 Wi-Fi** 下打开，确认能正常打开。
3. 把这个链接发给朋友即可，**不要求和对方在同一 Wi-Fi**。

你也可以在 Vercel 项目里进入 **Settings → Domains** 绑定自己的域名（可选）。

---

## 第六步：以后更新网站（自动重新部署）

1. 在本地改代码，提交并推送到 GitHub 上 Vercel 所连接的那个分支（一般是 **main** 或 **master**）：

   ```bash
   git add .
   git commit -m "更新说明"
   git push
   ```

2. **通常几秒内**，Vercel 会检测到新的提交并**自动再部署**一次。  
3. 在 Vercel 该项目的 **Deployments** 页面可以看到每次部署记录和是否成功。

---

## 常见问题（简短）

- **列表里找不到仓库**：到 GitHub → **Settings → Applications → Vercel** 里检查仓库访问权限。  
- **Build 失败**：在本地项目根目录执行 `npm run build`，与线上报错对照。  
- **子路径刷新 404**：确认仓库根目录已有 **`vercel.json`** 并已 push 到 GitHub。
