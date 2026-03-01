import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { targetRole } = await request.json();

        // Simulate AI Generation duration
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const user = await prisma.user.findFirst();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const generatedPhases = [
            {
                name: "Phase 1: Core Fundamentals",
                skills: ["Advanced React Context", "Performance Profiling", "Accessibility (a11y)"]
            },
            {
                name: "Phase 2: Infrastructure",
                skills: ["Next.js App Router API Routes", "Dockerize Frontend", "CI/CD GitHub Actions"]
            },
            {
                name: "Phase 3: Architecture",
                skills: ["Micro-frontends", "Monorepo Strategy (Turborepo)", "State Machine Design (XState)"]
            }
        ];

        const roadmap = await prisma.roadmap.create({
            data: {
                userId: user.id,
                title: `${targetRole || "Senior"} Growth Pathway`,
                targetRole: targetRole || "Senior Engineer",
                phases: JSON.stringify(generatedPhases)
            }
        });

        return NextResponse.json({ success: true, roadmap });

    } catch (error) {
        console.error("Roadmap Generation Error:", error);
        return NextResponse.json({ error: "Generation Failed" }, { status: 500 });
    }
}
