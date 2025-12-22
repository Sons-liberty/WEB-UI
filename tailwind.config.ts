import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        light: {
          "color-scheme": "light",
          "primary": "oklch(66% 0.295 322.15)",
          "primary-content": "oklch(97% 0.017 320.058)",
          "secondary": "oklch(68% 0.169 237.323)",
          "secondary-content": "oklch(97% 0.013 236.62)",
          "accent": "oklch(62% 0.214 259.815)",
          "accent-content": "oklch(97% 0.014 254.604)",
          "neutral": "oklch(12% 0.042 264.695)",
          "neutral-content": "oklch(98% 0.003 247.858)",
          "base-100": "oklch(98% 0.003 247.858)",
          "base-200": "oklch(96% 0.007 247.896)",
          "base-300": "oklch(92% 0.013 255.508)",
          "base-content": "oklch(20% 0.042 265.755)",
          "info": "oklch(58% 0.158 241.966)",
          "info-content": "oklch(97% 0.013 236.62)",
          "success": "oklch(59% 0.145 163.225)",
          "success-content": "oklch(97% 0.021 166.113)",
          "warning": "oklch(66% 0.179 58.318)",
          "warning-content": "oklch(98% 0.022 95.277)",
          "error": "oklch(57% 0.245 27.325)",
          "error-content": "oklch(97% 0.013 17.38)",
          "--rounded-box": "2rem",
          "--rounded-btn": "2rem",
          "--rounded-badge": "2rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
      "dark",
    ],
    darkTheme: "dark",
  },
};

export default config;
