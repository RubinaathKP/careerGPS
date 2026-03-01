"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Sparkles, Target, Zap, ArrowRight, Lock } from "lucide-react";
import { GlassCard } from "@/components/core/GlassCard";
import { Button } from "@/components/core/Button";
import { PaywallBlur } from "@/components/core/PaywallBlur";
import { AISkeletonLoader } from "@/components/dashboard/AISkeletonLoader";
import { Timeline } from "@/components/dashboard/Timeline";
import { fadeSlideUp, staggerContainer } from "@/lib/framer-variants";
import styles from "./roadmap.module.css";

interface GeneratedRoadmap {
    title: string;
    targetRole: string;
    phases: { name: string; skills: string[] }[];
}

export default function RoadmapGeneratorPage() {
    const [targetRole, setTargetRole] = useState("");
    const [experience, setExperience] = useState("Mid-Level");
    const [isGenerating, setIsGenerating] = useState(false);
    const [roadmap, setRoadmap] = useState<GeneratedRoadmap | null>(null);
    const isPremium = false; // Hardcode false for demo purposes

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!targetRole) return;

        setIsGenerating(true);
        setRoadmap(null); // Clear previous

        try {
            const response = await fetch('/api/roadmap/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetRole, experience })
            });

            if (response.ok) {
                const data = await response.json();

                // Parse the stringified JSON phases from the DB schema
                const parsedPhases = typeof data.roadmap.phases === 'string'
                    ? JSON.parse(data.roadmap.phases)
                    : data.roadmap.phases;

                setRoadmap({
                    title: data.roadmap.title,
                    targetRole: data.roadmap.targetRole,
                    phases: parsedPhases,
                });
            } else {
                console.error("Generation failed");
            }
        } catch (error) {
            console.error("Error generating roadmap:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const resetGenerator = () => {
        setRoadmap(null);
        setTargetRole("");
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
                    <Compass className={styles.headerIcon} />
                    <h1 className={styles.title}>AI Career GPS</h1>
                </div>
                <p className={styles.subtitle}>Generate a bespoke, step-by-step pathway to your dream role based on your current trajectory.</p>
            </motion.div>

            <AnimatePresence mode="wait">
                {!isGenerating && !roadmap && (
                    <motion.div
                        key="form"
                        initial="initial"
                        animate="animate"
                        exit={{ opacity: 0, scale: 0.95 }}
                        variants={fadeSlideUp}
                        className={styles.formContainer}
                    >
                        <GlassCard intensity="high" className={styles.formCard}>
                            <form onSubmit={handleGenerate} className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="targetRole" className={styles.label}>
                                        <Target size={16} /> Target Role
                                    </label>
                                    <input
                                        id="targetRole"
                                        type="text"
                                        value={targetRole}
                                        onChange={(e) => setTargetRole(e.target.value)}
                                        placeholder="e.g. Senior Frontend Engineer, Staff Machine Learning..."
                                        className={styles.input}
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="experience" className={styles.label}>
                                        <Zap size={16} /> Current Level
                                    </label>
                                    <select
                                        id="experience"
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                        className={styles.select}
                                    >
                                        <option value="Junior">Junior (0-2 YOE)</option>
                                        <option value="Mid-Level">Mid-Level (2-5 YOE)</option>
                                        <option value="Senior">Senior (5+ YOE)</option>
                                    </select>
                                </div>

                                <Button
                                    type="submit"
                                    variant="glow"
                                    className={styles.submitBtn}
                                    disabled={!targetRole}
                                >
                                    Synthesize Pathway <ArrowRight size={18} />
                                </Button>
                            </form>
                        </GlassCard>
                    </motion.div>
                )}

                {isGenerating && (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={styles.loaderContainer}
                    >
                        <AISkeletonLoader />
                    </motion.div>
                )}

                {roadmap && !isGenerating && (
                    <motion.div
                        key="results"
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeSlideUp} className={styles.resultsHeader}>
                            <div>
                                <h2 className={styles.resultsTitle}>{roadmap.title}</h2>
                                <p className={styles.resultsSubtitle}>Optimized pathway successfully mapped.</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={resetGenerator}>
                                Generate New Map
                            </Button>
                        </motion.div>

                        <motion.div variants={fadeSlideUp}>
                            <PaywallBlur
                                isPremium={isPremium}
                                title="Unlock Personalized Pathways"
                                description="Upgrade to Premium to view your generated phases, skills to master, and project recommendations."
                            >
                                <Timeline phases={roadmap.phases} />
                            </PaywallBlur>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
