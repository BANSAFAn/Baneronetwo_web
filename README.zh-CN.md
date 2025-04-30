# Baneronetwo Web

<div align="center">

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?logo=vite)](https://vitejs.dev/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-1.0.0-161618?logo=radix-ui)](https://www.radix-ui.com/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.45.0-EC5990?logo=react-hook-form)](https://react-hook-form.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.15.0-CA4245?logo=react-router)](https://reactrouter.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.7.2-22B5BF)](https://recharts.org/)

</div>

## 🌐 可用语言

<div align="center">

[![English](https://img.shields.io/badge/English-README-blue)](README.md)
[![Русский](https://img.shields.io/badge/Русский-README-blue)](README.ru.md)
[![Українська](https://img.shields.io/badge/Українська-README-blue)](README.uk.md)
[![Deutsch](https://img.shields.io/badge/Deutsch-README-blue)](README.de.md)
[![日本語](https://img.shields.io/badge/日本語-README-blue)](README.ja.md)
[![Polski](https://img.shields.io/badge/Polski-README-blue)](README.pl.md)
[![简体中文](https://img.shields.io/badge/简体中文-README-blue)](README.zh-CN.md)
[![Беларуская](https://img.shields.io/badge/Беларуская-README-blue)](README.be.md)

</div>

---

## 概述

Baneronetwo Web 是一个使用 React、TypeScript 和 Tailwind CSS 构建的现代响应式 Web 应用程序。它具有丰富的 UI 组件集，由 Radix UI 原语提供支持并使用 Tailwind CSS 进行样式设计，在所有设备上提供无缝的用户体验。

<div align="center">
<img src="ScreenNig.png" alt="Baneronetwo Web 截图" width="800"/>
</div>

## ✨ 特性

- **现代 UI 组件**：手风琴、下拉菜单、导航菜单、选择输入、对话框、工具提示等
- **响应式设计**：完全自适应布局，适用于从移动设备到桌面的所有设备
- **类型安全**：使用 TypeScript 构建，提供更好的开发者体验和代码质量
- **快速开发**：由 Vite 提供支持，实现闪电般的构建和热模块替换
- **国际化**：通过基于上下文的翻译系统完全支持多种语言
- **表单验证**：集成 React Hook Form 进行高效的表单处理和验证
- **数据可视化**：使用 Recharts 创建美观的图表和图形
- **路由**：使用 React Router 实现无缝导航
- **主题**：支持亮色和暗色模式，易于自定义

## 🚀 开始使用

```bash
# 克隆仓库
git clone https://github.com/yourusername/baneronetwo-web.git
cd baneronetwo-web

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 🛠️ 技术栈

### 核心技术

- **前端框架**：[React](https://reactjs.org/) - 用于构建用户界面的 JavaScript 库
- **语言**：[TypeScript](https://www.typescriptlang.org/) - 带有类型语法的 JavaScript
- **样式**：[Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- **构建工具**：[Vite](https://vitejs.dev/) - 下一代前端工具

### UI 组件

- **组件库**：[Radix UI](https://www.radix-ui.com/) - 无样式、可访问的组件，用于构建高质量设计系统
- **图标**：[Lucide Icons](https://lucide.dev/) - 美观一致的图标
- **排版**：基于 Tailwind CSS 的自定义排版系统

### 状态管理与数据处理

- **表单处理**：[React Hook Form](https://react-hook-form.com/) - 高性能、灵活且可扩展的表单
- **数据获取**：[SWR](https://swr.vercel.app/) - 用于数据获取的 React Hooks
- **数据可视化**：[Recharts](https://recharts.org/) - 使用 React 和 D3 构建的重新定义的图表库

### 路由与导航

- **路由**：[React Router](https://reactrouter.com/) - React 的声明式路由

### 开发工具

- **代码检查**：带有自定义配置的 ESLint
- **格式化**：Prettier
- **测试**：Vitest 和 React Testing Library

## 📂 项目结构

```
├── src/                  # 源文件
│   ├── components/       # 可重用 UI 组件
│   ├── context/          # React 上下文提供者
│   ├── hooks/            # 自定义 React hooks
│   ├── lib/              # 实用程序库
│   ├── pages/            # 应用程序页面
│   ├── translations/     # 国际化文件
│   └── utils/            # 实用函数
├── public/               # 静态资源
└── ...                   # 配置文件
```

## 🌍 国际化

Baneronetwo Web 通过基于上下文的翻译系统支持多种语言。应用程序会检测用户的首选语言，并在可用时自动以该语言显示内容。

支持的语言：
- 英语 (English)
- 俄语 (Русский)
- 乌克兰语 (Українська)
- 德语 (Deutsch)
- 日语 (日本語)
- 波兰语 (Polski)
- 简体中文
- 白俄罗斯语 (Беларуская)

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

## 📄 许可证

本项目采用 MIT 许可证 - 有关详细信息，请参阅 LICENSE 文件。