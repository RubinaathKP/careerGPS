"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, AlertTriangle, XCircle, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/core/GlassCard";
import { Button } from "@/components/core/Button";
import { ScoreBadge } from "@/components/dashboard/ScoreBadge";
import { ProgressRing } from "@/components/core/ProgressRing";
import { AnimatedCounter } from "@/components/dashboard/AnimatedCounter";
import { fadeSlideUp, staggerContainer } from "@/lib/framer-variants";
import styles from "./skills.module.css";
import Link from "next/link";

interface SkillGapData {
    targetRole: string;
    readinessScore: number;
    missingSkills: string[];
}

export default function SkillGapPage() {
    const [data, setData] = useState<SkillGapData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch real data from our existing API to get the latest analysis
        async function fetchSkills() {
            try {
                const res = await fetch('/api/dashboard');
                if (res.ok) {
                    const json = await res.json();

                    // We extract the "missing skills" from the latest resume scan context
                    const missingKeywords = json.latestAtsScore ?
                        (json.user?.resumes?.[0]?.missingKeywords?.split(',') || ["Docker", "Kubernetes", "GraphQL", "CI/CD"]) :
                        ["Docker", "Kubernetes", "GraphQL", "CI/CD"];

                    setData({
                        targetRole: json.targetRole || "Senior Frontend Engineer",
                        readinessScore: json.readinessScore || 75,
                        missingSkills: missingKeywords.map((k: string) => k.trim()),
                    });
                }
            } catch (error) {
                console.error("Error fetching skill gaps", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchSkills();
    }, []);

    if (isLoading) {
        return (
            <div className={styles.container} style={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <h2 style={{ color: "var(--text-secondary)" }}>Analyzing Gap Data...</h2>
                </motion.div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.header}
                initial="initial"
                animate="animate"
                variants={fadeSlideUp}
            >
                <div className={styles.titleWrapper}>
                    <Target className={styles.headerIcon} />
                    <h1 className={styles.title}>Skill Assessment</h1>
                </div>
                <p className={styles.subtitle}>Identify the exact technical gaps standing between you and your target role.</p>
            </motion.div>

            <motion.div
                className={styles.mainGrid}
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {/* Left side: High-level target summary */}
                <motion.div variants={fadeSlideUp}>
                    <GlassCard intensity="high" className={styles.summaryCard}>
                        <ProgressRing size={160} percentage={data.readinessScore} strokeWidth={12} color="warning" />
                        <div style={{ marginTop: '-100px', marginBottom: '80px', fontSize: '2rem', fontWeight: 600 }}>
                            <AnimatedCounter value={data.readinessScore} delay={0.2} />%
                        </div>

                        <h3 className={styles.roleLabel}>Target Role Baseline</h3>
                        <div className={styles.targetRole}>{data.targetRole}</div>

                        <div style={{ marginTop: '2rem', width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                <span>Current Mastery</span>
                                <span>Competency Threshold</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', position: 'relative' }}>
                                <motion.div
                                    style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'var(--color-primary)', borderRadius: '4px' }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${data.readinessScore}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                                <div style={{ position: 'absolute', top: '-4px', left: '90%', width: '2px', height: '16px', background: '#f59e0b' }} />
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Right side: Detailed Missing Skills List */}
                <motion.div variants={fadeSlideUp} className={styles.skillsListCardWrapper}>
                    <GlassCard intensity="medium" className={styles.skillsListCard}>
                        <div className={styles.listHeader}>
                            <h3 className={styles.listTitle}>
                                <AlertTriangle size={20} className={styles.titleIcon} />
                                Identified Vulnerabilities
                            </h3>
                            <ScoreBadge type="error">{data.missingSkills.length} Critical</ScoreBadge>
                        </div>

                        <motion.div variants={staggerContainer}>
                            {data.missingSkills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeSlideUp}
                                    className={styles.skillItem}
                                >
                                    <div className={styles.skillIconWrapper}>
                                        <XCircle size={18} />
                                    </div>
                                    <div className={styles.skillContent}>
                                        <h4>{skill}</h4>
                                        <p>Frequently requested capability for <strong>{data.targetRole}</strong> positions at top-tier companies.</p>
                                    </div>
                                    <Button variant="ghost" size="sm" style={{ marginLeft: 'auto', alignSelf: 'center' }}>
                                        Learn
                                    </Button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </GlassCard>
                </motion.div>
            </motion.div>

            <motion.div
                className={styles.actionFooter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <Link href="/dashboard/roadmap">
                    <Button variant="glow" size="lg">
                        Auto-Generate Mastery Roadmap <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}
