# yzy0304.github.io

Personal portfolio and blog of Zhenyu Yao, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## 本地预览

```bash
npm install
npm run dev        # http://localhost:4321 ，草稿（draft: true）也会显示
npm run build      # 生产构建到 dist/，草稿不会被构建
```

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

## 部署

推送到 `main` 后由 `.github/workflows/deploy.yml` 构建并发布。
首次需要在仓库 Settings → Pages → Source 选择 **GitHub Actions**。
