"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./progressring.module.css";

interface ProgressRingProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: "success" | "warning" | "critical" | "primary";
}

export function ProgressRing({
    percentage,
    size = 120,
    strokeWidth = 10,
    color = "primary",
}: ProgressRingProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = mounted ? circumference - (percentage / 100) * circumference : circumference;

    return (
        <div className={styles.container} style={{ width: size, height: size }}>
            <svg className={styles.svg} width={size} height={size}>
                <circle
                    className={styles.track}
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <motion.circle
                    className={`${styles.progress} ${styles[color]}`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <div className={styles.textContainer}>
                <span className={styles.percentage}>
                    {mounted ? percentage : 0}%
                </span>
            </div>
        </div>
    );
}
