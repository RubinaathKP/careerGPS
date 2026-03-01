"use client";
import { motion } from "framer-motion";
import { BrainCircuit, LineChart, Target, Compass } from "lucide-react";
import { GlassCard } from "@/components/core/GlassCard";
import { fadeSlideUp, staggerContainer } from "@/lib/framer-variants";
import styles from "./featuresgrid.module.css";

const features = [
    {
        icon: <BrainCircuit className={styles.icon} />,
        title: "AI Skill Gap Analysis",
        description: "Instantly detect missing keywords from your resume and generate specialized learning paths to close them."
    },
    {
        icon: <LineChart className={styles.icon} />,
        title: "Readiness Score",
        description: "Track your quantitative probability of passing top-tier ATS systems in real-time."
    },
    {
        icon: <Target className={styles.icon} />,
        title: "Precision Targeting",
        description: "Filter roles by tech stack urgency and align your active projects directly to market demand."
    },
    {
        icon: <Compass className={styles.icon} />,
        title: "Dynamic Roadmaps",
        description: "Your career roadmap adapts as you learn, recalculating timelines and priorities dynamically."
    }
];

export function FeaturesGrid() {
    return (
        <section className={styles.section} id="features">
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeSlideUp}
                >
                    <h2 className={styles.title}>Engineered for Growth</h2>
                    <p className={styles.subtitle}>Supercharge your job hunt with enterprise-grade tooling.</p>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    {features.map((feature, i) => (
                        <motion.div key={i} variants={fadeSlideUp}>
                            <GlassCard interactive gradientBorder className={styles.card}>
                                <div className={styles.iconWrapper}>{feature.icon}</div>
                                <h3 className={styles.cardTitle}>{feature.title}</h3>
                                <p className={styles.cardDesc}>{feature.description}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
