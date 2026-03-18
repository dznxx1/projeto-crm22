import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Plus Jakarta Sans", "sans-serif"], heading: ["Bricolage Grotesque", "sans-serif"] },
      colors: {
        "bg-base": "#0A0D14", "bg-surface": "#111827", "bg-card": "#1C2333",
        "accent-blue": "#3B82F6", "accent-green": "#10B981", "accent-purple": "#8B5CF6",
        "border-default": "#1F2937", "border-hover": "#374151",
      },
    },
  },
  plugins: [],
};
export default config;
