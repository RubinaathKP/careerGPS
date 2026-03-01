"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import styles from "./scorebadge.module.css";
import { fadeSlideUp } from "@/lib/framer-variants";

interface ScoreBadgeProps {
    children: ReactNode;
    type?: "warning" | "error" | "info" | "success";
    icon?: ReactNode;
}

export function ScoreBadge({ children, type = "info", icon }: ScoreBadgeProps) {
    return (
        <motion.div
            variants={fadeSlideUp}
            className={`${styles.badge} ${styles[type]}`}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.text}>{children}</span>
        </motion.div>
    );
}
