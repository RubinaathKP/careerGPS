"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/core/Button";
import { fadeSlideUp, staggerContainer } from "@/lib/framer-variants";
import styles from "./hero.module.css";

export function Hero() {
    return (
        <section className={styles.heroSection}>
            <div className={styles.container}>
                <motion.div
                    className={styles.textContent}
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <motion.h1 variants={fadeSlideUp} className={styles.title}>
                        Master Your Career <br />
                        with <span className={styles.highlight}>AI Intelligence</span>
                    </motion.h1>
                    <motion.p variants={fadeSlideUp} className={styles.subtitle}>
                        Stop guessing. Generate an exact roadmap, analyze your resume, and close skill gaps using our state-of-the-art AI engine.
                    </motion.p>
                    <motion.div variants={fadeSlideUp} className={styles.ctaGroup}>
                        <Button variant="glow" size="lg">Start for Free</Button>
                        <Button variant="secondary" size="lg">View Demo</Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.visualContent}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                    <div className={styles.sphereWrapper}>
                        <div className={styles.glowSphere} />
                        <div className={styles.coreSphere} />
                        <motion.div
                            className={`${styles.floatingChip} ${styles.chip1}`}
                            animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        >
                            React
                        </motion.div>
                        <motion.div
                            className={`${styles.floatingChip} ${styles.chip2}`}
                            animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                        >
                            Python
                        </motion.div>
                        <motion.div
                            className={`${styles.floatingChip} ${styles.chip3}`}
                            animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                        >
                            System Design
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
