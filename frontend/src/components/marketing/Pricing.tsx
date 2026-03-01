"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { GlassCard } from "@/components/core/GlassCard";
import { Button } from "@/components/core/Button";
import { fadeSlideUp, staggerContainer } from "@/lib/framer-variants";
import styles from "./pricing.module.css";

const plans = [
    {
        name: "Free",
        price: "$0",
        description: "Essential career intelligence.",
        features: ["1 AI Resume Analysis", "Basic Skill Gap Detection", "Standard Roadmap Generation", "Community Access"],
        buttonVariant: "secondary" as const,
        buttonText: "Get Started",
        popular: false
    },
    {
        name: "Premium",
        price: "$19",
        period: "/mo",
        description: "Uncapped potential for serious growth.",
        features: ["Unlimited Resume Parsing", "Advanced ATS Keywords", "Dynamic Adaptive Roadmaps", "1-on-1 Interview Prep AI", "PDF Downloads"],
        buttonVariant: "glow" as const,
        buttonText: "Upgrade to Premium",
        popular: true
    }
];

export function Pricing() {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <section className={styles.section} id="pricing">
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeSlideUp}
                >
                    <h2 className={styles.title}>Simple, Transparent Pricing</h2>
                    <p className={styles.subtitle}>Invest in your ultimate career trajectory.</p>

                    <div className={styles.toggleWrapper}>
                        <span className={!isAnnual ? styles.activeText : styles.inactiveText}>Monthly</span>
                        <div
                            className={styles.toggleTrack}
                            onClick={() => setIsAnnual(!isAnnual)}
                        >
                            <motion.div
                                className={styles.toggleThumb}
                                layout
                                initial={false}
                                animate={{ x: isAnnual ? 24 : 2 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </div>
                        <span className={isAnnual ? styles.activeText : styles.inactiveText}>
                            Annually <span className={styles.discount}>Save 20%</span>
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.grid}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {plans.map((plan, i) => (
                        <motion.div key={i} variants={fadeSlideUp} className={plan.popular ? styles.popularWrapper : ""}>
                            <GlassCard
                                intensity="high"
                                gradientBorder={plan.popular}
                                className={`${styles.card} ${plan.popular ? styles.popularCard : ""}`}
                            >
                                {plan.popular && <div className={styles.popularBadge}>Most Popular</div>}

                                <div className={styles.planHeader}>
                                    <h3 className={styles.planName}>{plan.name}</h3>
                                    <div className={styles.priceContainer}>
                                        <span className={styles.price}>{plan.price}</span>
                                        {plan.period && <span className={styles.period}>{plan.period}</span>}
                                    </div>
                                    <p className={styles.planDesc}>{plan.description}</p>
                                </div>

                                <ul className={styles.featureList}>
                                    {plan.features.map((feat, j) => (
                                        <li key={j} className={styles.featureItem}>
                                            <Check size={18} className={styles.checkIcon} />
                                            <span className={styles.featureText}>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button variant={plan.buttonVariant} className={styles.fullWidthBtn}>
                                    {plan.buttonText}
                                </Button>
                            </GlassCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
