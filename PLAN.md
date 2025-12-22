# 技术框架
Next.js+daisyUI+TailwindCSS

# API
API 已经实现在 [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

# 实现状态
✅ 完整的项目结构

✅ 所有API接口封装

✅ 图片上传/处理/下载完整流程

✅ 响应式布局

✅ 深色模式支持

✅ TypeScript类型定义

✅ 错误处理和Loading状态

✅ 拖拽上传功能

✅ 服务健康检查

✅ Base64图片处理

✅ 双栏对比预览

# 目标
1.无需数据库与用户登陆注册系统，目前样例开发阶段，实现基本功能与界面即可。


# 颜色主题推荐

默认：
```css

@plugin "daisyui/theme" {
  name: "light";
  default: true;
  prefersdark: false;
  color-scheme: "light";
  --color-base-100: oklch(98% 0.003 247.858);
  --color-base-200: oklch(96% 0.007 247.896);
  --color-base-300: oklch(92% 0.013 255.508);
  --color-base-content: oklch(20% 0.042 265.755);
  --color-primary: oklch(66% 0.295 322.15);
  --color-primary-content: oklch(97% 0.017 320.058);
  --color-secondary: oklch(68% 0.169 237.323);
  --color-secondary-content: oklch(97% 0.013 236.62);
  --color-accent: oklch(62% 0.214 259.815);
  --color-accent-content: oklch(97% 0.014 254.604);
  --color-neutral: oklch(12% 0.042 264.695);
  --color-neutral-content: oklch(98% 0.003 247.858);
  --color-info: oklch(58% 0.158 241.966);
  --color-info-content: oklch(97% 0.013 236.62);
  --color-success: oklch(59% 0.145 163.225);
  --color-success-content: oklch(97% 0.021 166.113);
  --color-warning: oklch(66% 0.179 58.318);
  --color-warning-content: oklch(98% 0.022 95.277);
  --color-error: oklch(57% 0.245 27.325);
  --color-error-content: oklch(97% 0.013 17.38);
  --radius-selector: 2rem;
  --radius-field: 2rem;
  --radius-box: 2rem;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 1px;
  --depth: 1;
  --noise: 1;
}
```
暗色可以使用daisyui 的dark切换。