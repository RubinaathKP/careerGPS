"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Sparkles, Database } from "lucide-react";
import styles from "./aiskeleton.module.css";
import { GlassCard } from "@/components/core/GlassCard";

const steps = [
    { text: "Analyzing target role requirements...", icon: BrainCircuit },
    { text: "Cross-referencing global market data...", icon: Database },
    { text: "Synthesizing optimal pathway...", icon: Sparkles },
];

export function AISkeletonLoader() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length);
        }, 2000); // Change step every 2 seconds

        return () => clearInterval(interval);
    }, []);

    const CurrentIcon = steps[currentStep].icon;

    return (
        <GlassCard intensity="high" className={styles.loaderCard}>
            <div className={styles.shimmerWrapper}>
                <div className={styles.shimmerEffect} />

                <div className={styles.content}>
                    <motion.div
                        className={styles.iconContainer}
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <CurrentIcon size={48} className={styles.icon} />
                    </motion.div>

                    <h3 className={styles.title}>AI Engine Active</h3>

                    <div className={styles.textContainer}>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className={styles.subtitle}
                            >
                                {steps[currentStep].text}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Progress Bar Mock */}
                    <div className={styles.progressBarBg}>
                        <motion.div
                            className={styles.progressBarFill}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 6, ease: "linear" }}
                        />
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
