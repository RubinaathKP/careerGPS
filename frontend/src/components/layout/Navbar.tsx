"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/core/Button";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./navbar.module.css";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>CareerGPS</span>
                    <div className={styles.logoGlow} />
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.desktopNav}>
                    <Link href="#features" className={styles.navLink}>Features</Link>
                    <Link href="#companies" className={styles.navLink}>Companies</Link>
                    <Link href="#pricing" className={styles.navLink}>Pricing</Link>
                </nav>

                {/* Right Actions */}
                <div className={styles.actions}>
                    <ThemeToggle />
                    <div className={styles.desktopAuth}>
                        {session ? (
                            <>
                                <Link href="/dashboard" className={styles.navLink}>
                                    Dashboard
                                </Link>
                                <Button variant="secondary" size="sm" onClick={() => signOut()}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" size="sm" onClick={() => signIn('credentials', { callbackUrl: '/dashboard' })}>Login</Button>
                                <Button variant="glow" size="sm" onClick={() => signIn('credentials', { callbackUrl: '/dashboard' })}>Signup</Button>
                            </>
                        )}
                    </div>
                    {/* Mobile hamburger */}
                    <button className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {mobileMenuOpen && (
                <motion.div
                    className={styles.mobileMenu}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link href="#features" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>Features</Link>
                    <Link href="#companies" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>Companies</Link>
                    <Link href="#pricing" className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                    <hr className={styles.divider} />
                    <div className={styles.mobileAuthActions}>
                        {session ? (
                            <>
                                <Link href="/dashboard" style={{ width: '100%' }}>
                                    <div className={`${styles.fullWidth} ${styles.mobileLink} ${styles.primaryGlow}`}>Dashboard</div>
                                </Link>
                                <Button variant="ghost" className={styles.fullWidth} onClick={() => signOut()}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" className={styles.fullWidth} onClick={() => signIn('credentials', { callbackUrl: '/dashboard' })}>Login</Button>
                                <Button variant="glow" className={styles.fullWidth} onClick={() => signIn('credentials', { callbackUrl: '/dashboard' })}>Signup</Button>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </header>
    );
}
