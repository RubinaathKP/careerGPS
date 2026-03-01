"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import styles from "./themetoggle.module.css";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className={styles.placeholder} />;

    return (
        <button onClick={toggleTheme} className={styles.toggle} aria-label="Toggle theme">
            <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.3 }}
            >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
        </button>
    );
}
