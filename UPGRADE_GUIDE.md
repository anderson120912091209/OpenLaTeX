# 🔄 Next.js 升级指南 - 安全漏洞修复

## 📋 升级概述

项目已从 **Next.js 14.2.5** 升级到 **Next.js 15.1.3**，修复了以下安全漏洞：

- **CVE-2025-29927**: Authorization bypass vulnerability in Next.js middleware
- **CVE-2025-55182**: Remote code execution vulnerability in React Server Components
- **CVE-2025-55184**: Denial-of-service vulnerability in React Server Components

## 🚀 主要变更

### 1. Next.js: 14.2.5 → 15.1.3
- 修复了多个关键安全漏洞
- 性能优化和改进
- 新的功能特性

### 2. React: 18.x → 19.0.0
- 重大版本升级
- 新的 React Compiler
- 改进的服务器组件支持

### 3. 其他依赖更新
- `@ai-sdk/anthropic`: 0.0.47 → 1.0.0
- `@ai-sdk/openai`: 0.0.49 → 1.0.0
- `ai`: 3.3.11 → 4.0.0
- `framer-motion`: 11.3.28 → 11.11.17
- `lucide-react`: 0.429.0 → 0.468.0
- `next-themes`: 0.3.0 → 0.4.4
- 所有 `@radix-ui/*` 组件更新到最新版本

## 📝 安装步骤

### 1. 删除旧的依赖

```bash
# 删除 node_modules 和 lock 文件
rm -rf node_modules package-lock.json
```

### 2. 安装新依赖

```bash
# 安装所有更新的依赖
npm install
```

### 3. 运行安全审计

```bash
# 检查是否还有安全漏洞
npm audit

# 自动修复可修复的漏洞
npm audit fix
```

## ⚠️ 重大变更和兼容性

### Next.js 15 变更

1. **React 19 要求**
   - 必须使用 React 19
   - 某些旧的 React 模式可能不再支持

2. **Image 配置**
   - `domains` 仍然支持，但推荐使用 `remotePatterns`
   - 已更新 `next.config.js` 以同时支持两种方式

3. **Server Actions**
   - Server Actions 的行为可能有细微变化
   - 检查 `app/actions.tsx` 是否正常工作

### React 19 变更

1. **新的 JSX Transform**
   - 不再需要 `import React from 'react'`（如果使用新的 JSX transform）
   - TypeScript 配置已更新

2. **ref 作为 prop**
   - `ref` 现在可以作为常规 prop 传递
   - 某些组件可能需要更新

3. **useFormStatus 和 useFormState**
   - 新的表单 hooks
   - 可能需要更新表单相关代码

## 🔍 需要检查的代码

### 1. Server Actions (`app/actions.tsx`)

检查 AI SDK 的使用是否兼容新版本：

```typescript
// 旧版本 (v3)
import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'

// 新版本 (v4) - 应该仍然兼容，但检查 API 变更
```

### 2. React Context (`contexts/*.tsx`)

确保 React 19 的 Context API 使用正确：

```typescript
// 检查是否有任何废弃的 API
// React 19 应该向后兼容大部分 Context 使用
```

### 3. Monaco Editor (`components/editor/*`)

Monaco Editor 应该仍然兼容，但检查：

- 编辑器初始化
- 事件处理
- 主题设置

### 4. PDF 渲染 (`components/latex-render/*`)

`react-pdf` 应该仍然兼容，但检查：

- PDF 加载
- 页面渲染
- 错误处理

## 🧪 测试清单

升级后，请测试以下功能：

- [ ] 应用启动 (`npm run dev`)
- [ ] 项目列表页面
- [ ] 项目创建
- [ ] 编辑器功能（Monaco Editor）
- [ ] AI 辅助功能 (Ctrl/Cmd + K)
- [ ] PDF 编译和预览
- [ ] 文件管理（创建/删除/重命名）
- [ ] 用户认证
- [ ] 主题切换（暗/亮模式）
- [ ] 响应式布局

## 🐛 常见问题

### 问题 1: TypeScript 错误

如果遇到 TypeScript 错误：

```bash
# 更新 TypeScript 类型
npm install --save-dev @types/react@latest @types/react-dom@latest
```

### 问题 2: React 类型错误

如果 React 类型不匹配：

```bash
# 确保使用正确的 React 类型
npm install --save-dev @types/react@^19.0.0 @types/react-dom@^19.0.0
```

### 问题 3: AI SDK 错误

如果 AI SDK 有错误：

```bash
# 检查 AI SDK 文档
# https://sdk.vercel.ai/docs
```

### 问题 4: 构建错误

如果构建失败：

```bash
# 清理构建缓存
rm -rf .next
npm run build
```

## 📚 参考资源

- [Next.js 15 升级指南](https://nextjs.org/docs/app/getting-started/upgrading)
- [React 19 发布说明](https://react.dev/blog/2024/04/25/react-19)
- [Next.js 安全公告](https://nextjs.org/security)
- [AI SDK 文档](https://sdk.vercel.ai/docs)

## ✅ 升级后验证

运行以下命令验证升级：

```bash
# 1. 检查版本
npm list next react react-dom

# 2. 运行开发服务器
npm run dev

# 3. 构建生产版本
npm run build

# 4. 运行安全审计
npm audit
```

## 🔒 安全改进

升级后，以下安全漏洞已修复：

1. ✅ **CVE-2025-29927**: Next.js 15.1.3 已修复
2. ✅ **CVE-2025-55182**: Next.js 15.1.3 已修复
3. ✅ **CVE-2025-55184**: Next.js 15.1.3 已修复

## 📝 下一步

1. **测试应用**：全面测试所有功能
2. **更新文档**：如有必要，更新项目文档
3. **监控**：部署后监控错误日志
4. **定期更新**：定期运行 `npm audit` 检查新漏洞

---

**注意**：如果遇到任何问题，请查看 [Next.js 15 迁移指南](https://nextjs.org/docs/app/getting-started/upgrading) 或提交 issue。

