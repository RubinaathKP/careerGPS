export const fadeSlideUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
};

export const staggerContainer = {
    transition: { staggerChildren: 0.1 },
};

export const hoverScale = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
};
