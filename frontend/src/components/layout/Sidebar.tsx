"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard, Map, FileText, Target, BookOpen,
    ChevronLeft, ChevronRight, Lock
} from "lucide-react";
import styles from "./sidebar.module.css";

const routes = [
    { name: "Overview", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Roadmap", path: "/dashboard/roadmap", icon: <Map size={20} /> },
    { name: "Resume Analyzer", path: "/dashboard/resume", icon: <FileText size={20} /> },
    { name: "Skill Gap", path: "/dashboard/skills", icon: <Target size={20} /> },
    { name: "Companies", path: "/dashboard/companies", icon: <BookOpen size={20} /> },
];

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <motion.aside
            className={styles.sidebar}
            animate={{ width: isCollapsed ? 80 : 260 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className={styles.header}>
                <div className={styles.logo}>
                    <div className={styles.logoGlow} />
                    {!isCollapsed && <span className={styles.logoText}>CareerGPS</span>}
                    {isCollapsed && <span className={styles.logoText}>C</span>}
                </div>
                <button
                    className={styles.collapseBtn}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            <nav className={styles.nav}>
                {routes.map((route) => {
                    const isActive = pathname === route.path;
                    return (
                        <Link
                            key={route.path}
                            href={route.path}
                            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                        >
                            <div className={styles.iconWrapper}>{route.icon}</div>
                            {!isCollapsed && <span className={styles.navLabel}>{route.name}</span>}
                            {isActive && (
                                <motion.div layoutId="sidebar-active" className={styles.activeIndicator} />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <button className={`${styles.upgradeBtn} ${isCollapsed ? styles.collapsedUpgrade : ""}`}>
                    <Lock size={16} className={styles.lockIcon} />
                    {!isCollapsed && <span>Upgrade</span>}
                </button>
            </div>
        </motion.aside>
    );
}
