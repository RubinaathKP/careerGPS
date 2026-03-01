"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { GlassCard } from "@/components/core/GlassCard";
import { Button } from "@/components/core/Button";
import { fadeSlideUp, staggerContainer } from "@/lib/framer-variants";
import styles from "./companies.module.css";
import Link from "next/link";

interface CompanyData {
    name: string;
    industry: string;
    targetScore: number;
    userScore: number;
    openRoles: number;
    trend: 'up' | 'down' | 'flat';
}

const MOCK_COMPANIES: CompanyData[] = [
    { name: "Stripe", industry: "Fintech", targetScore: 92, userScore: 78, openRoles: 14, trend: 'up' },
    { name: "Airbnb", industry: "Travel/Tech", targetScore: 88, userScore: 78, openRoles: 8, trend: 'flat' },
    { name: "Vercel", industry: "Developer Tools", targetScore: 85, userScore: 78, openRoles: 22, trend: 'up' },
    { name: "OpenAI", industry: "Artificial Intelligence", targetScore: 95, userScore: 78, openRoles: 5, trend: 'down' },
    { name: "Rippling", industry: "HR Tech", targetScore: 82, userScore: 78, openRoles: 31, trend: 'up' },
    { name: "Linear", industry: "Productivity", targetScore: 89, userScore: 78, openRoles: 3, trend: 'flat' },
];

export default function CompaniesPage() {
    const [userAtsScore, setUserAtsScore] = useState(78);

    useEffect(() => {
        // Fetch the user's latest ATS score to compare against the companies
        async function fetchScore() {
            try {
                const res = await fetch('/api/dashboard');
                if (res.ok) {
                    const json = await res.json();
                    if (json.latestAtsScore) {
                        setUserAtsScore(json.latestAtsScore);
                    }
                }
            } catch (error) {
                console.error("Error fetching score for companies view", error);
            }
        }
        fetchScore();
    }, []);

    const getMatchDetails = (target: number, user: number) => {
        const diff = user - target;
        if (diff >= 0) return { text: "Strong Match", colorClass: styles.matchHigh, bgClass: styles.bgHigh };
        if (diff >= -10) return { text: "Borderline", colorClass: styles.matchMedium, bgClass: styles.bgMedium };
        return { text: "Reach", colorClass: styles.matchLow, bgClass: styles.bgLow };
    };

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.header}
                initial="initial"
                animate="animate"
                variants={fadeSlideUp}
            >
                <div className={styles.titleWrapper}>
                    <Building2 className={styles.headerIcon} />
                    <h1 className={styles.title}>Company Matchmaker</h1>
                </div>
                <p className={styles.subtitle}>See how your current resume stacks up against the hiring bar at top YC and tech tier companies.</p>
            </motion.div>

            <motion.div
                className={styles.grid}
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {MOCK_COMPANIES.map((company, index) => {
                    // Update user score from real DB data
                    const currentScore = userAtsScore;
                    const match = getMatchDetails(company.targetScore, currentScore);

                    return (
                        <motion.div key={index} variants={fadeSlideUp}>
                            <GlassCard intensity="low" className={styles.companyCard}>
                                <div className={styles.companyHeader}>
                                    <div className={styles.logoPlaceholder}>
                                        {company.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className={styles.companyName}>{company.name}</h3>
                                        <span className={styles.companyIndustry}>{company.industry}</span>
                                    </div>
                                </div>

                                <div className={styles.statsGrid}>
                                    <div className={styles.statItem}>
                                        <span className={styles.statLabel}>Hiring Bar</span>
                                        <span className={styles.statValue}>{company.targetScore}</span>
                                    </div>
                                    <div className={styles.statItem}>
                                        <span className={styles.statLabel}>Open Roles</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span className={styles.statValue}>{company.openRoles}</span>
                                            {company.trend === 'up' && <TrendingUp size={16} color="#34d399" />}
                                            {company.trend === 'down' && <TrendingDown size={16} color="#f87171" />}
                                            {company.trend === 'flat' && <Minus size={16} color="#9ca3af" />}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.scoreWrapper}>
                                    <div className={styles.scoreLabelContainer}>
                                        <span className={styles.scoreLabel}>Your ATS Match</span>
                                        <span className={`${styles.matchText} ${match.colorClass}`}>
                                            {match.text}
                                        </span>
                                    </div>

                                    <div className={styles.progressBarBg}>
                                        <motion.div
                                            className={`${styles.progressBarFill} ${match.bgClass}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${currentScore}%` }}
                                            transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                                        />
                                        {/* Target Bar Marker */}
                                        <div
                                            className={styles.targetBar}
                                            style={{ left: `${company.targetScore}%` }}
                                            title={`Target Score: ${company.targetScore}`}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        <span>0</span>
                                        <span>User: {currentScore}</span>
                                        <span>100</span>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" style={{ marginTop: '1.5rem', width: '100%' }}>
                                    View Open Roles
                                </Button>
                            </GlassCard>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
