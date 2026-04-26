# Markdown 编辑器 - 云端版

一个可以在任意电脑上通过网址访问的 Markdown 实时预览编辑器，文件存储在云端。

## 部署步骤

### 1. 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com) 并注册免费账号
2. 创建新项目
3. 在项目设置中获取：
   - Project URL
   - anon public key

### 2. 设置数据库

1. 在 Supabase 控制台打开 SQL Editor
2. 复制并运行 `supabase-setup.sql` 文件中的 SQL 语句
3. 这将创建 `files` 表并配置访问权限

### 3. 部署到 Vercel

1. 访问 [vercel.com](https://vercel.com) 并注册账号
2. 点击 "Add New" -> "Project"
3. 选择 "Import Git Repository" 或手动上传项目
4. 在环境变量中添加：
   - `SUPABASE_URL`: 你的 Supabase Project URL
   - `SUPABASE_ANON_KEY`: 你的 Supabase anon public key
5. 点击 "Deploy"

### 4. 获取访问地址

部署完成后，Vercel 会提供一个 `https://your-project.vercel.app` 的地址，在任何电脑上都可以通过这个地址访问。

## 功能特性

- **实时预览**：左侧编辑，右侧实时渲染
- **云端存储**：所有文件保存在 Supabase 数据库
- **多文件管理**：创建、删除、重命名文件
- **文件导入/导出**：支持本地文件导入和导出
- **快捷键**：Ctrl+S 保存，Ctrl+N 新建，Ctrl+O 打开

## 环境变量

需要在 Vercel 项目设置中配置以下环境变量：

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

## 技术栈

- 前端：HTML + CSS + Vanilla JavaScript
- 后端：Vercel Serverless Functions
- 数据库：Supabase (PostgreSQL)
- Markdown 解析：marked.js
