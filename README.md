# 技术博客 - Markdown 编辑器

一个支持实时预览和深色主题的 Markdown 编辑器，文件存储在云端。

## 功能特性

- **技术博客风格** - 简洁极简设计，支持深色/浅色主题切换
- **编辑模式切换** - 默认预览模式，点击切换到编辑模式
- **云端存储** - 所有文件保存在 Supabase 数据库
- **多文件管理** - 创建、删除、重命名文件
- **文件导入/导出** - 支持本地文件导入和导出
- **代码高亮** - 支持代码语法高亮显示
- **响应式设计** - 支持桌面端和移动端

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

### 3. 部署到 Netlify

1. 在 Netlify 控制台连接 GitHub 仓库
2. 或者使用命令行部署：
   ```bash
   npx netlify deploy --prod --dir=public --functions=api
   ```
3. 在 Netlify 环境变量中添加：
   - `SUPABASE_URL`: 你的 Supabase Project URL
   - `SUPABASE_ANON_KEY`: 你的 Supabase anon public key

### 4. 获取访问地址

部署完成后，Netlify 会提供一个 `https://your-project.netlify.app` 的地址。

## 使用说明

| 功能 | 说明 |
|------|------|
| **编辑模式** | 点击 ✏️ 编辑按钮，同时显示编辑器和预览 |
| **预览模式** | 点击 👁️ 预览按钮，只显示渲染后的文档 |
| **保存文件** | Ctrl+S 保存当前文件 |
| **新建文件** | Ctrl+N 创建新文件 |
| **导入文件** | Ctrl+O 导入本地 Markdown 文件 |
| **切换主题** | 点击右上角 🌙/☀️ 切换深色/浅色主题 |

## 环境变量

需要在 Netlify 项目设置中配置以下环境变量：

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

## 技术栈

- 前端：HTML + CSS + Vanilla JavaScript
- 后端：Netlify Serverless Functions
- 数据库：Supabase (PostgreSQL)
- Markdown 解析：marked.js
- 字体：Inter + JetBrains Mono

## 更新日志

### 2026-05-30
- 添加技术博客风格设计
- 支持深色/浅色主题切换
- 添加编辑模式切换功能（默认预览模式）
- 添加文章搜索功能
- 改进响应式设计，支持移动端
