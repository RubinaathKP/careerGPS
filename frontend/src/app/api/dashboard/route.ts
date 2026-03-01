import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // For now, simulate a logged in user by fetching the first user.
        // In production, this would use NextAuth.js session:
        // const session = await getServerSession()
        // const userEmail = session?.user?.email

        const user = await prisma.user.findFirst({
            include: {
                profile: true,
                resumes: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            name: user.name,
            tier: user.tier,
            targetRole: user.profile?.targetRole,
            experienceLevel: user.profile?.experienceLevel,
            readinessScore: user.profile?.readinessScore || 0,
            latestAtsScore: user.resumes[0]?.atsScore || 0,
            missingSkillsCount: user.resumes[0]?.missingKeywords ? user.resumes[0].missingKeywords.split(',').length : 0,
        });

    } catch (error) {
        console.error("Dashboard API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
