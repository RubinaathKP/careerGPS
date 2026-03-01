"use client";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { FeaturesGrid } from "@/components/marketing/FeaturesGrid";
import { Pricing } from "@/components/marketing/Pricing";

export default function HomePage() {
    return (
        <>
            <Hero />
            <HowItWorks />
            <FeaturesGrid />
            <Pricing />
        </>
    );
}
