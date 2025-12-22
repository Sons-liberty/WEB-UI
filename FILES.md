# 项目文件清单

## 📁 源代码文件

### 应用核心 (src/app/)
```
src/app/
├── layout.tsx          # 根布局：Header、Footer、主题切换
├── page.tsx            # 主页面：完整的工作流程
└── globals.css         # 全局样式、动画、自定义类
```

### 组件 (src/components/)
```
src/components/
├── ThemeToggle.tsx         # 主题切换器（明亮/深色模式）
├── ServiceSelector.tsx     # 服务分类选择器
├── FileUpload.tsx          # 拖拽文件上传组件
├── ImageComparison.tsx     # 前后对比滑块组件
└── ProcessingStatus.tsx    # 处理状态显示组件
```

### 工具库 (src/lib/)
```
src/lib/
└── api.ts              # API 客户端、工具函数、错误处理
```

### 类型定义 (src/types/)
```
src/types/
└── index.ts            # TypeScript 接口定义
```

## ⚙️ 配置文件

```
项目根目录/
├── next.config.js          # Next.js 配置（图片域名、API 代理）
├── tailwind.config.ts      # Tailwind CSS + daisyUI 主题配置
├── tsconfig.json           # TypeScript 编译器配置
├── postcss.config.mjs      # PostCSS 配置（Tailwind 插件）
├── package.json            # 依赖项和脚本
└── .gitignore              # Git 忽略规则
```

## 🌍 环境变量

```
.env.local                  # 环境变量（API URL）
.env.local.example          # 环境变量模板
```

## 📚 文档文件

```
项目根目录/
├── README.md               # 完整项目文档
├── QUICKSTART.md           # 快速入门指南
├── PROJECT_SUMMARY.md      # 项目完成总结
├── FILES.md                # 本文件清单
├── API_DOCUMENTATION.md    # API 接口文档（已存在）
└── PLAN.md                 # 项目计划和需求（已存在）
```

## 📦 依赖项 (package.json)

### 生产依赖
- `next@^14.2.0` - React 框架
- `react@^18.3.0` - UI 库
- `react-dom@^18.3.0` - React DOM 渲染器

### 开发依赖
- `typescript@^5.0.0` - TypeScript 编译器
- `@types/react@^18.3.0` - React 类型定义
- `@types/node@^20.0.0` - Node.js 类型定义
- `tailwindcss@^3.4.0` - CSS 框架
- `daisyui@^4.12.0` - UI 组件库
- `autoprefixer@^10.4.20` - CSS 前缀自动添加
- `postcss@^8.4.47` - CSS 转换工具

## 🗂 完整文件树

```
WEB-UI/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ThemeToggle.tsx
│   │   ├── ServiceSelector.tsx
│   │   ├── FileUpload.tsx
│   │   ├── ImageComparison.tsx
│   │   └── ProcessingStatus.tsx
│   ├── lib/
│   │   └── api.ts
│   └── types/
│       └── index.ts
├── public/
│   ├── next.svg
│   └── vercel.svg
├── node_modules/
├── .next/                  # 构建输出目录
├── .git/                   # Git 仓库
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── package.json
├── package-lock.json
├── .gitignore
├── .env.local
├── .env.local.example
├── README.md
├── QUICKSTART.md
├── PROJECT_SUMMARY.md
├── FILES.md
├── API_DOCUMENTATION.md
└── PLAN.md
```

## 📊 文件统计

- **总源代码文件**: 12 个
- **组件文件**: 5 个
- **配置文件**: 6 个
- **文档文件**: 6 个
- **TypeScript 行数**: ~2000+ 行
- **文档行数**: ~1500+ 行

## 🎯 关键文件说明

### src/app/page.tsx (主页面)
- 状态管理（服务、图片、处理状态）
- 健康检查和服务加载
- 文件上传和处理逻辑
- 组件集成和布局

### src/components/ImageComparison.tsx (对比组件)
- 滑块拖拽实现
- 鼠标和触摸事件处理
- 视图模式切换
- 下载和重新处理功能

### src/components/ServiceSelector.tsx (服务选择器)
- 服务分类展示
- 卡片式布局
- 图标和颜色主题
- 选择状态管理

### src/lib/api.ts (API 层)
- 健康检查函数
- 服务列表获取
- 图片处理请求
- Base64 转换
- 文件验证
- 错误处理

### tailwind.config.ts (主题配置)
- 自定义 OKLCH 颜色主题
- daisyUI 主题配置
- 圆角和动画设置

## 🔍 文件用途快速索引

### 需要修改的文件（常见场景）

**更改 API 地址**:
- `.env.local`

**修改主题颜色**:
- `tailwind.config.ts` (第 18-49 行)

**添加新服务**:
- 无需修改代码，后端 API 返回即可

**修改上传限制**:
- `src/lib/api.ts` (validateImageFile 函数)

**自定义样式**:
- `src/app/globals.css`

**修改页面布局**:
- `src/app/page.tsx`
- `src/app/layout.tsx`

### 只读文件（不建议修改）

- `package-lock.json` - 锁定依赖版本
- `.next/` - 构建输出，自动生成
- `node_modules/` - 依赖包，通过 npm 管理

---

**最后更新**: 2025-12-22
