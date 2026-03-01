"use client";
import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.className = savedTheme;
        } else {
            document.documentElement.className = "dark";
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.className = newTheme;
    };

    return { theme, toggleTheme };
}
