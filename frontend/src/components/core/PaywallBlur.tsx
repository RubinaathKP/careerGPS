"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Button } from "./Button";
import styles from "./paywall.module.css";
import { fadeSlideUp } from "@/lib/framer-variants";

interface PaywallBlurProps {
    isPremium: boolean;
    children: ReactNode;
    title?: string;
    description?: string;
}

export function PaywallBlur({
    isPremium,
    children,
    title = "Unlock Premium Features",
    description = "Upgrade to CareerGPS Premium to access personalized AI roadmaps, deep ATS analysis, and more."
}: PaywallBlurProps) {

    if (isPremium) {
        return <>{children}</>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.blurredContent}>
                {children}
            </div>

            <motion.div
                className={styles.overlay}
                variants={fadeSlideUp}
                initial="initial"
                animate="animate"
            >
                <div className={styles.lockRing}>
                    <Lock size={24} className={styles.lockIcon} />
                </div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>

                <Button variant="glow" size="md">
                    Upgrade to Premium
                </Button>
            </motion.div>
        </div>
    );
}
