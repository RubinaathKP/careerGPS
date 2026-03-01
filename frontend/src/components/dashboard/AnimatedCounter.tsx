"use client";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    delay?: number;
}

export function AnimatedCounter({ value, delay = 0 }: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        stiffness: 50,
        damping: 20,
        restDelta: 0.5,
    });
    const isInView = useInView(ref, { once: true, margin: "-10px" });

    useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                motionValue.set(value);
            }, delay * 1000);
        }
    }, [motionValue, isInView, delay, value]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US").format(
                    latest.toFixed(0) as unknown as number
                );
            }
        });
    }, [springValue]);

    return <span ref={ref} />;
}
