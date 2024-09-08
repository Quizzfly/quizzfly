const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons");

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        fontFamily: {
            satoshi: ["Open Sans", "Satoshi", "sans-serif"],
        },
        extend: {
            colors: {
                current: "currentColor",
                transparent: "transparent",
                "mark-bg": "rgba(0,0,0,0.4)",
                primary: "var(--color-primary)",
                "border-primary": "var(--color-border-primary)",
            },
            backgroundImage: {
                video: "url('../images/video/video.png')",
            },
            content: {
                "icon-copy": 'url("../images/icon/icon-copy-alt.svg")',
            },
            transitionProperty: { width: "width", stroke: "stroke" },
            boxShadow: {
                secondary: "0px 8px 13px -3px rgba(0, 0, 0, 0.07)",
                default: "0px 1px 3px 0px rgba(0,0,0,0.1),0px 1px 2px -1px rgba(0,0,0,0.1)",
                card: "0px 1px 3px rgba(0, 0, 0, 0.12)",
                "card-2": "0px 1px 2px rgba(0, 0, 0, 0.05)",
                switcher:
                    "0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #FFFFFF, inset 0px -1px 1px rgba(0, 0, 0, 0.1)",
                "switch-1": "0px 0px 5px rgba(0, 0, 0, 0.15)",
                1: "0px 1px 3px rgba(0, 0, 0, 0.08)",
                2: "0px 1px 4px rgba(0, 0, 0, 0.12)",
                3: "0px 1px 5px rgba(0, 0, 0, 0.14)",
                4: "0px 4px 10px rgba(0, 0, 0, 0.12)",
                5: "0px 1px 1px rgba(0, 0, 0, 0.15)",
                6: "0px 3px 15px rgba(0, 0, 0, 0.1)",
                7: "-5px 0 0 #313D4A, 5px 0 0 #313D4A",
                8: "1px 0 0 #313D4A, -1px 0 0 #313D4A, 0 1px 0 #313D4A, 0 -1px 0 #313D4A, 0 3px 13px rgb(0 0 0 / 8%)",
                9: "0px 2px 3px rgba(183, 183, 183, 0.5)",
            },
            dropShadow: {
                1: "0px 1px 0px #E2E8F0",
                2: "0px 1px 4px rgba(0, 0, 0, 0.12)",
                3: "0px 0px 4px rgba(0, 0, 0, 0.15)",
                4: "0px 0px 2px rgba(0, 0, 0, 0.2)",
                5: "0px 1px 5px rgba(0, 0, 0, 0.2)",
            },
            keyframes: {
                linspin: {
                    "100%": { transform: "rotate(360deg)" },
                },
                easespin: {
                    "12.5%": { transform: "rotate(135deg)" },
                    "25%": { transform: "rotate(270deg)" },
                    "37.5%": { transform: "rotate(405deg)" },
                    "50%": { transform: "rotate(540deg)" },
                    "62.5%": { transform: "rotate(675deg)" },
                    "75%": { transform: "rotate(810deg)" },
                    "87.5%": { transform: "rotate(945deg)" },
                    "100%": { transform: "rotate(1080deg)" },
                },
                "left-spin": {
                    "0%": { transform: "rotate(130deg)" },
                    "50%": { transform: "rotate(-5deg)" },
                    "100%": { transform: "rotate(130deg)" },
                },
                "right-spin": {
                    "0%": { transform: "rotate(-130deg)" },
                    "50%": { transform: "rotate(5deg)" },
                    "100%": { transform: "rotate(-130deg)" },
                },
                rotating: {
                    "0%, 100%": { transform: "rotate(360deg)" },
                    "50%": { transform: "rotate(0deg)" },
                },
                topbottom: {
                    "0%, 100%": { transform: "translate3d(0, -100%, 0)" },
                    "50%": { transform: "translate3d(0, 0, 0)" },
                },
                bottomtop: {
                    "0%, 100%": { transform: "translate3d(0, 0, 0)" },
                    "50%": { transform: "translate3d(0, -100%, 0)" },
                },
            },
            animation: {
                linspin: "linspin 1568.2353ms linear infinite",
                easespin: "easespin 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both",
                "left-spin": "left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both",
                "right-spin": "right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both",
                "ping-once": "ping 5s cubic-bezier(0, 0, 0.2, 1)",
                rotating: "rotating 30s linear infinite",
                topbottom: "topbottom 60s infinite alternate linear",
                bottomtop: "bottomtop 60s infinite alternate linear",
                "spin-1.5": "spin 1.5s linear infinite",
                "spin-2": "spin 2s linear infinite",
                "spin-3": "spin 3s linear infinite",
            },
        },
    },
    plugins: [
        iconsPlugin({
            // Select the icon collections you want to use
            // You can also ignore this option to automatically discover all individual icon packages you have installed
            // If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
            collections: getIconCollections(["solar", "material-symbols-light"]),
            // If you want to use all icons from @iconify/json, you can do this:
            // collections: getIconCollections("all"),
            // and the more recommended way is to use `dynamicIconsPlugin`, see below.
        }),
    ],
};
