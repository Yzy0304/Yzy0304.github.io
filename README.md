# yzy0304.github.io

Personal portfolio and blog of Zhenyu Yao, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## 本地预览

```bash
npm install
npm run dev        # http://localhost:4321 ，草稿（draft: true）也会显示
npm run build      # 生产构建到 dist/，草稿不会被构建
```

## 用手机 / Mac 写博客、传图片（推荐）

打开 **https://yzy0304.github.io/admin/** （Sveltia CMS，配置在 `public/admin/config.yml`）。

1. **第一次使用**：在 GitHub → Settings → Developer settings → Personal access tokens → *Fine-grained tokens* 新建令牌：
   *Repository access* 只选 `Yzy0304.github.io`，*Permissions → Contents* 选 **Read and write**，有效期按需。
2. 在后台点「使用访问令牌登录」，粘贴令牌。浏览器会记住登录，手机和 Mac 各登录一次即可。
3. 新建 / 修改文章，正文里可直接插入图片；照片会自动压缩到 2000px 以内并转成 WebP，存到 `public/images/uploads/`。
4. 点保存即提交到 `main`，GitHub Actions 约 1 分钟后自动发布。勾选「草稿」的文章不会出现在网站上。
5. 打上「生活」标签的文章会同时出现在「日常」页面；设置了封面图的文章在列表里会显示封面。

令牌只保存在你自己的浏览器里；换设备或令牌过期时重新粘贴即可。不要把令牌发给别人。

## 写博客（从 Obsidian 复制）

1. 复制 `src/content/blog/_template.md`，改名为 `英文短横线.md`（文件名就是网址，如 `clip-tta-notes.md` → `/blog/clip-tta-notes/`）。
2. 填好顶部的 `title`、`date`、`tags`、`lang`，把 Obsidian 正文粘到下面。
3. 写完把 `draft` 改成 `false`，提交并 push 到 `main`，GitHub Actions 会自动部署。

支持的 Obsidian 语法：`$...$` / `$$...$$` 公式、代码块高亮、表格、`> [!note]` 类 callout。
**不支持** `[[双链]]` 和 `![[图片嵌入]]`：图片请放到 `public/images/`，用标准写法 `![说明](/images/xxx.png)`。
（Obsidian 设置 → 文件与链接 → 关闭“使用 Wiki 链接”，粘贴时就会是标准写法。）

## 修改个人信息

所有经历、成绩、项目文字都在 `src/data/profile.ts`（中英两份），改这一个文件即可。
规则：只写简历里能找到依据的内容，不添加未经证实的数字。

- 首页卡片与六个页面（学业 / 科研 / 项目 / 实习 / 简历 / 日常）的标题和简介：`pages` 字段。
- 实习：在 `internships` 里加条目后，「实习」页会自动显示；为空时显示“正在寻找实习”。
- 日常：`life` 里加地点/经历（可选 `image: '/images/life/xxx.jpg'`）；博客文章打上 `life` 或 `生活` 标签也会出现在「日常」页。

## 首页小助手 Mochi

右下角的小宠物是一个**离线**助手，只根据 `profile.ts` 回答（关键词匹配，不调用任何 API），逻辑在 `src/lib/assistant.ts`。
以后要接入大模型：保留界面，把 `reply()` 换成请求你自己的后端，并把 `systemContext(lang)` 作为 system prompt。

## 开场动画

首页第一次打开时会像 Mac 开机的 “hello” 一样手写出 “welcome to my personal blog”（每个浏览器会话只播放一次，点击可跳过）。
笔画数据由 `node scripts/gen-hello.mjs` 从单线字体 Hershey Script 生成到 `src/data/hello.ts`；改文字就改脚本里的 `LINES` 再运行一次。

## 部署

推送到 `main` 后由 `.github/workflows/deploy.yml` 构建并发布。
首次需要在仓库 Settings → Pages → Source 选择 **GitHub Actions**。
