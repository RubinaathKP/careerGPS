"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/core/GlassCard";
import { ProgressRing } from "@/components/core/ProgressRing";
import { Button } from "@/components/core/Button";
import { fadeSlideUp, staggerContainer } from "@/lib/framer-variants";
import { Award, TrendingUp, AlertCircle, FileText } from "lucide-react";
import styles from "./dashboard.module.css";

// Type definition for our expected API response
interface DashboardData {
    name: string;
    tier: string;
    targetRole: string;
    experienceLevel: string;
    readinessScore: number;
    latestAtsScore: number;
    missingSkillsCount: number;
}

export default function DashboardOverview() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/dashboard');
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                } else {
                    console.error("Failed to load dashboard data", await res.text());
                }
            } catch (err) {
                console.error("Error fetching dashboard data", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className={styles.container} style={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <h2 style={{ color: "var(--text-secondary)" }}>Synthesizing Profile...</h2>
                </motion.div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className={styles.container}>
                <GlassCard intensity="high">
                    <h2>Error loading your profile.</h2>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.header}
                initial="initial"
                animate="animate"
                variants={fadeSlideUp}
            >
                <h1 className={styles.title}>Welcome back, {data.name}.</h1>
                <p className={styles.subtitle}>Your career mastery is {data.readinessScore}% optimized for {data.targetRole} roles.</p>
            </motion.div>

            <motion.div
                className={styles.grid}
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                <motion.div variants={fadeSlideUp} className={styles.readinessCardWrapper}>
                    <GlassCard intensity="high" className={styles.readinessCard}>
                        <div className={styles.readinessContent}>
                            <div className={styles.readinessText}>
                                <h2 className={styles.cardTitle}>Market Readiness</h2>
                                <p className={styles.cardDesc}>Based on your latest ATS scan and confirmed skills, you are strongly positioned.</p>
                                <div className={styles.actionGroup}>
                                    <Button variant="glow" size="sm">Generate Next Steps</Button>
                                </div>
                            </div>
                            <div className={styles.ringWrapper}>
                                <ProgressRing percentage={data.readinessScore} size={140} color="primary" strokeWidth={12} />
                            </div>
                        </div>
                        {/* Inject an SVG gradient definition for the ring */}
                        <svg style={{ height: 0, width: 0, position: "absolute" }}>
                            <defs>
                                <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#4f46e5" />
                                    <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </GlassCard>
                </motion.div>

                <div className={styles.statsGrid}>
                    <motion.div variants={fadeSlideUp} className={styles.cardWrapper}>
                        <GlassCard intensity="medium" className={styles.statCard}>
                            <div className={styles.statHeader}>
                                <h3 className={styles.statTitle}>ATS Score</h3>
                                <FileText size={18} className={styles.statIcon} />
                            </div>
                            <div className={styles.statValue}>{data.latestAtsScore}/100</div>
                            <p className={styles.statChange}><TrendingUp size={14} /> +4 this week</p>
                        </GlassCard>
                    </motion.div>

                    <motion.div variants={fadeSlideUp} className={styles.cardWrapper}>
                        <GlassCard intensity="medium" className={styles.statCard}>
                            <div className={styles.statHeader}>
                                <h3 className={styles.statTitle}>Missing Skills</h3>
                                <AlertCircle size={18} className={styles.warningIcon} />
                            </div>
                            <div className={styles.statValue}>{data.missingSkillsCount}</div>
                            <p className={styles.statDesc}>Critical gaps detected</p>
                        </GlassCard>
                    </motion.div>

                    <motion.div variants={fadeSlideUp} className={styles.cardWrapper}>
                        <GlassCard intensity="medium" className={styles.statCard}>
                            <div className={styles.statHeader}>
                                <h3 className={styles.statTitle}>Market Rank</h3>
                                <Award size={18} className={styles.successIcon} />
                            </div>
                            <div className={styles.statValue}>Top 15%</div>
                            <p className={styles.statDesc}>in {data.targetRole}</p>
                        </GlassCard>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
