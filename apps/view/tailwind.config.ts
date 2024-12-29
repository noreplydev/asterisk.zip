import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            animation: {
                appear: "appear 2s ease-out forwards 1.2s",
                appearFull: "appearFull 2s ease-out forwards 1.2s",
            },
            keyframes: {
                appear: {
                    "0%": { opacity: "0" },
                    "30%": { opacity: "0" },
                    "100%": { opacity: "0.2" },
                },
                appearFull: {
                    "0%": { opacity: "0" },
                    "30%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
