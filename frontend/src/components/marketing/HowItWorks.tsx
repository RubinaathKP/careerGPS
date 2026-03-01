"use client";
import { motion } from "framer-motion";
import { FileSearch, Map, Zap } from "lucide-react";
import { GlassCard } from "@/components/core/GlassCard";
import { fadeSlideUp, staggerContainer } from "@/lib/framer-variants";
import styles from "./howitworks.module.css";

const steps = [
    {
        icon: <FileSearch size={32} className={styles.icon} />,
        title: "1. AI Resume Analysis",
        description: "Upload your resume and let our engine extract your exact skill profile, instantly scoring it against top ATS systems."
    },
    {
        icon: <Map size={32} className={styles.icon} />,
        title: "2. Generate Roadmap",
        description: "Define your dream role. Our AI cross-references market data to build a master roadmap outlining the exact skills you need."
    },
    {
        icon: <Zap size={32} className={styles.icon} />,
        title: "3. Close the Gap",
        description: "Follow the interactive timeline, complete recommended projects, and level up your readiness score to land the job."
    }
];

export function HowItWorks() {
    return (
        <section className={styles.section} id="how-it-works">
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeSlideUp}
                >
                    <h2 className={styles.title}>How It Works</h2>
                    <p className={styles.subtitle}>Three steps to engineer your career trajectory.</p>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    {steps.map((step, i) => (
                        <motion.div key={i} variants={fadeSlideUp} className={styles.cardWrapper}>
                            <GlassCard interactive intensity="medium" className={styles.card}>
                                <div className={styles.iconWrapper}>{step.icon}</div>
                                <h3 className={styles.cardTitle}>{step.title}</h3>
                                <p className={styles.cardDesc}>{step.description}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
