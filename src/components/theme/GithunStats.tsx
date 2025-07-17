/* eslint-disable @next/next/no-img-element */
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function GithubStats() {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (!mounted) return null;

    const statsUrl = `https://github-readme-stats.vercel.app/api?username=martinezdap25&show_icons=true&theme=${currentTheme === "dark" ? "dark" : "default"
        }&hide_title=true&hide_border=true&hide_rank=true`;

    return (
        <div className="w-full max-w-xs mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-md overflow-hidden transition-colors duration-300">
            <img
                src={statsUrl}
                alt="GitHub Stats"
                className="w-full h-auto rounded-xl"
                width={250}
                height={130}
            />
        </div>
    );
}
