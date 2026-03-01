"use client";
import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import styles from "./glasscard.module.css";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    intensity?: "low" | "medium" | "high";
    interactive?: boolean;
    gradientBorder?: boolean;
    children: ReactNode;
}

export function GlassCard({
    intensity = "medium",
    interactive = false,
    gradientBorder = false,
    children,
    className = "",
    ...props
}: GlassCardProps) {
    const hoverProps = interactive
        ? {
            whileHover: { y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" },
        }
        : {};

    return (
        <motion.div
            className={`${styles.card} ${styles[intensity]} ${gradientBorder ? styles.gradientBorder : ""
                } ${className}`}
            {...hoverProps}
            {...props}
        >
            {children}
        </motion.div>
    );
}
