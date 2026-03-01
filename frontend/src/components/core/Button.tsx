"use client";
import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { hoverScale } from "@/lib/framer-variants";
import styles from "./button.module.css";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "ghost" | "glow";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    icon?: ReactNode;
    children: ReactNode;
}

export function Button({
    variant = "primary",
    size = "md",
    isLoading = false,
    icon,
    children,
    className = "",
    ...props
}: ButtonProps) {
    return (
        <motion.button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
            disabled={isLoading || props.disabled}
            {...hoverScale}
            {...props}
        >
            {isLoading ? (
                <span className={styles.spinner} />
            ) : (
                <>
                    {icon && <span className={styles.icon}>{icon}</span>}
                    {children}
                </>
            )}
        </motion.button>
    );
}
