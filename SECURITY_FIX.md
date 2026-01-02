# 🚨 紧急安全修复：移除 Git 历史中的敏感信息

## ⚠️ 发现的问题

在提交 `919e661` 中，`.env.example` 文件包含了真实的 API keys：
- `ANTHROPIC_API_KEY` - 真实的 API key
- `INSTANT_APP_ADMIN_TOKEN` - 真实的 token
- `NEXT_PUBLIC_INSTANT_APP_ID` - 真实的 app ID

这些信息已经暴露在 Git 历史中，即使后续提交删除了文件。

## 🔒 立即行动

### 第一步：更换所有泄露的 API Keys

**在修复 Git 历史之前，立即更换：**

1. **Anthropic API Key**
   - 登录 Anthropic 控制台
   - 撤销当前的 API key
   - 创建新的 API key

2. **InstantDB Credentials**
   - 登录 InstantDB 控制台
   - 重新生成 Admin Token
   - 更新 App ID（如果需要）

3. **Railway Endpoint**
   - 如果 URL 包含敏感信息，考虑更新

### 第二步：从 Git 历史中移除敏感信息

由于已经推送到远程，需要重写 Git 历史。

## 🛠️ 修复方法

### 方法 1：使用 git rebase（推荐，如果只有少量提交）

```bash
# 1. 交互式 rebase 到第一个提交之前
git rebase -i --root

# 2. 在编辑器中，将包含敏感信息的提交标记为 'edit'
# 找到提交 919e661，将 'pick' 改为 'edit'

# 3. Git 会停在那个提交，删除敏感文件
git rm .env.example
git commit --amend --no-edit

# 4. 继续 rebase
git rebase --continue

# 5. 处理第二个提交（如果也需要修改）
# 如果第二个提交只是删除 .env.example，可以保持不变或删除

# 6. 强制推送到远程（⚠️ 警告：这会重写远程历史）
git push origin master --force
```

### 方法 2：完全重写历史（更彻底）

```bash
# 1. 创建一个新的干净分支
git checkout --orphan clean-master

# 2. 添加所有文件（除了 .env.example）
git add .
git rm --cached .env.example 2>/dev/null || true

# 3. 创建新的初始提交
git commit -m "Initial commit: AI LaTeX Editor with Docker support"

# 4. 删除旧的 master 分支
git branch -D master

# 5. 重命名新分支为 master
git branch -m master

# 6. 强制推送到远程
git push origin master --force
```

### 方法 3：使用 git filter-branch（如果有很多提交）

```bash
# 从所有提交中移除 .env.example 文件
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.example" \
  --prune-empty --tag-name-filter cat -- --all

# 强制推送
git push origin master --force
```

## 📋 推荐步骤（最简单）

我建议使用方法 2，因为你的项目只有两个提交：

```bash
# 执行以下命令
cd /Users/andersonchen/Downloads/jules-main

# 创建新的干净分支
git checkout --orphan clean-master

# 添加所有文件
git add .

# 确保 .env.example 不在暂存区（如果存在）
git reset HEAD .env.example 2>/dev/null || true

# 创建新的提交
git commit -m "Initial commit: AI LaTeX Editor with Docker support"

# 删除旧的 master 分支
git branch -D master

# 重命名新分支
git branch -m master

# 强制推送（⚠️ 这会重写远程历史）
git push origin master --force
```

## ⚠️ 重要警告

1. **强制推送会重写远程历史**
   - 如果有其他人克隆了仓库，他们的本地仓库会出问题
   - 需要通知团队成员重新克隆

2. **GitHub 可能仍保留历史**
   - 即使强制推送，GitHub 可能仍保留旧的提交对象
   - 考虑联系 GitHub 支持完全删除

3. **立即更换 API Keys**
   - 即使从 Git 历史中移除，如果仓库是公开的，密钥可能已经被泄露
   - 必须立即更换所有泄露的密钥

## ✅ 修复后检查

```bash
# 检查历史中是否还有 .env.example
git log --all --full-history -- .env.example

# 应该没有输出，如果有，说明还有残留
```

## 📝 创建正确的 .env.example

修复后，创建一个不包含真实密钥的 `.env.example`：

```env
# Anthropic API Key
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# InstantDB
INSTANT_APP_ADMIN_TOKEN=your_instantdb_admin_token_here
NEXT_PUBLIC_INSTANT_APP_ID=your_instantdb_app_id_here

# Railway Endpoint
NEXT_PUBLIC_RAILWAY_ENDPOINT_URL=https://your-railway-endpoint-url.com/
```

## 🔐 预防措施

1. **使用 .gitignore**
   - 确保 `.env` 和 `.env.local` 在 `.gitignore` 中
   - 永远不要提交包含真实密钥的文件

2. **使用 .env.example**
   - 只提交 `.env.example`，使用占位符
   - 在 README 中说明如何配置

3. **使用 Git Hooks**
   - 设置 pre-commit hook 检查敏感信息
   - 使用工具如 `git-secrets` 或 `truffleHog`

4. **定期审计**
   - 定期检查 Git 历史中是否有敏感信息
   - 使用工具扫描仓库

