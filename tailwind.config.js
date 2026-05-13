/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fffdf8",
          100: "#faf6ef",
          200: "#f3ead8",
          300: "#e8dcc4"
        },
        ink: {
          DEFAULT: "#2c2825",
          muted: "#6b6560"
        },
        brand: {
          50: "#f4f7f4",
          100: "#e3ebe4",
          600: "#2f5d4d",
          700: "#254a3d",
          900: "#1a3329"
        }
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "sans-serif"
        ]
      },
      boxShadow: {
        card: "0 2px 14px rgba(44, 40, 37, 0.055), 0 1px 3px rgba(44, 40, 37, 0.04)",
        "card-hover": "0 10px 28px rgba(44, 40, 37, 0.09)",
        soft: "0 18px 50px rgba(47, 93, 77, 0.08)"
      },
      maxWidth: {
        app: "420px"
      },
      borderRadius: {
        "3xl": "1.375rem"
      }
    }
  },
  plugins: []
};
