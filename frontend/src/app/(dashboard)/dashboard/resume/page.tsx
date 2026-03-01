"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, CheckCircle, AlertTriangle, TrendingUp, Sparkles, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/core/GlassCard";
import { Button } from "@/components/core/Button";
import { PaywallBlur } from "@/components/core/PaywallBlur";
import { AnimatedCounter } from "@/components/dashboard/AnimatedCounter";
import { ScoreBadge } from "@/components/dashboard/ScoreBadge";
import { fadeSlideUp, staggerContainer } from "@/lib/framer-variants";
import styles from "./resume.module.css";
import { ProgressRing } from "@/components/core/ProgressRing";

interface AnalysisResult {
    atsScore: number;
    missingKeywords: string;
    suggestions: string;
}

export default function ResumeAnalyzerPage() {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const isPremium = false; // Hardcode false for demo purposes

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile?.type === "application/pdf") {
            setFile(droppedFile);
        } else {
            alert("Please upload a PDF file.");
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;

        setIsAnalyzing(true);
        // Simulate file upload delay + backend processing
        try {
            const formData = new FormData();
            formData.append("resume", file);

            const response = await fetch('/api/resume/analyze', {
                method: 'POST',
                // FormData sets the correct multipart boundary automatically
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data.data);
            } else {
                console.error("Analysis failed.");
            }
        } catch (error) {
            console.error("Error analyzing resume:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetAnalysis = () => {
        setFile(null);
        setResult(null);
    };

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.header}
                initial="initial"
                animate="animate"
                variants={fadeSlideUp}
            >
                <h1 className={styles.title}>Resume Optimizer</h1>
                <p className={styles.subtitle}>Drop your latest resume to analyze ATS compatibility and discover skill gaps.</p>
            </motion.div>

            <AnimatePresence mode="wait">
                {!result && !isAnalyzing && (
                    <motion.div
                        key="upload"
                        variants={fadeSlideUp}
                        initial="initial"
                        animate="animate"
                        exit={{ opacity: 0, y: -20 }}
                        className={styles.uploadCard}
                    >
                        <GlassCard intensity="high">
                            <label
                                className={`${styles.dropzone} ${isDragging ? styles.active : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                    id="resume-upload"
                                />
                                <UploadCloud className={styles.uploadIcon} />
                                <h3 className={styles.uploadText}>
                                    {file ? file.name : "Click or drag PDF here"}
                                </h3>
                                <p className={styles.uploadSubtext}>
                                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Maximum file size 5MB"}
                                </p>

                                {file && (
                                    <Button variant="glow" onClick={(e) => { e.preventDefault(); handleAnalyze(); }}>
                                        Analyze Resume <Sparkles size={16} />
                                    </Button>
                                )}
                            </label>
                        </GlassCard>
                    </motion.div>
                )}

                {isAnalyzing && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.loadingState}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 className={styles.loadingIcon} />
                        </motion.div>
                        <h3 className={styles.loadingText}>Extracting Keywords...</h3>
                        <p className={styles.loadingSubtext}>Cross-referencing against Top YC Companies</p>
                    </motion.div>
                )}

                {result && !isAnalyzing && (
                    <motion.div
                        key="results"
                        className={styles.analysisGrid}
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        {/* Score Section */}
                        <motion.div variants={fadeSlideUp}>
                            <GlassCard intensity="high" className={styles.scoreCard}>
                                <div className={styles.scoreWrapper}>
                                    <ProgressRing size={200} percentage={result.atsScore} strokeWidth={10} color={result.atsScore > 80 ? 'success' : 'warning'} />
                                    <div className={styles.scoreNumber}>
                                        <AnimatedCounter value={result.atsScore} delay={0.2} />
                                        <span className={styles.scoreMax}>/100</span>
                                    </div>
                                </div>
                                <h3 className={styles.scoreLabel}>Estimated ATS Match</h3>
                                <Button variant="ghost" size="sm" onClick={resetAnalysis} style={{ marginTop: '1rem' }}>Upload Another</Button>
                            </GlassCard>
                        </motion.div>

                        {/* Details Section */}
                        <motion.div variants={fadeSlideUp}>
                            <GlassCard intensity="medium" className={styles.detailsCard}>
                                <div>
                                    <h4 className={styles.sectionTitle}>
                                        <AlertTriangle size={20} />
                                        Missing Keywords
                                    </h4>
                                    <div className={styles.badgeGroup}>
                                        {result.missingKeywords.split(',').map((keyword, i) => (
                                            <ScoreBadge key={i} type="error">{keyword.trim()}</ScoreBadge>
                                        ))}
                                    </div>
                                </div>

                                <PaywallBlur
                                    isPremium={isPremium}
                                    title="Unlock AI Suggestions"
                                    description="Upgrade to Premium to get tailored, actionable feedback on how to fix your resume gaps."
                                >
                                    <div>
                                        <h4 className={styles.sectionTitle}>
                                            <TrendingUp size={20} />
                                            AI Suggestions
                                        </h4>
                                        <div className={styles.suggestions}>
                                            {result.suggestions}
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '1.5rem' }}>
                                        <h4 className={styles.sectionTitle}>
                                            <CheckCircle size={20} />
                                            Detected Strengths
                                        </h4>
                                        <div className={styles.badgeGroup}>
                                            <ScoreBadge type="success">React</ScoreBadge>
                                            <ScoreBadge type="success">Frontend</ScoreBadge>
                                            <ScoreBadge type="success">TypeScript</ScoreBadge>
                                        </div>
                                    </div>
                                </PaywallBlur>
                            </GlassCard>
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
