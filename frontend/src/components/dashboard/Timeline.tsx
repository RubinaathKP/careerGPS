"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import styles from "./timeline.module.css";
import { GlassCard } from "@/components/core/GlassCard";

interface Phase {
    name: string;
    skills: string[];
}

interface TimelineProps {
    phases: Phase[];
}

export function Timeline({ phases }: TimelineProps) {
    return (
        <div className={styles.container}>
            {/* The continuous vertical line */}
            <motion.div
                className={styles.verticalLine}
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {phases.map((phase, index) => (
                <div key={index} className={styles.node}>

                    {/* The bullet point/icon on the line */}
                    <motion.div
                        className={styles.indicatorWrapper}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.4, type: "spring" }}
                    >
                        <div className={styles.indicator}>
                            <Circle size={16} fill="currentColor" />
                        </div>
                    </motion.div>

                    {/* The actual phase content card */}
                    <motion.div
                        className={styles.contentWrapper}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.4) + 0.2, duration: 0.5 }}
                    >
                        <GlassCard intensity="medium" className={styles.phaseCard}>
                            <h3 className={styles.phaseName}>{phase.name}</h3>
                            <ul className={styles.skillsList}>
                                {phase.skills.map((skill, sIndex) => (
                                    <motion.li
                                        key={sIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: (index * 0.4) + 0.4 + (sIndex * 0.1) }}
                                        className={styles.skillItem}
                                    >
                                        <CheckCircle2 size={16} className={styles.checkIcon} />
                                        <span>{skill}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </GlassCard>
                    </motion.div>
                </div>
            ))}
        </div>
    );
}
