const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Clean up existing data
    await prisma.roadmap.deleteMany()
    await prisma.resume.deleteMany()
    await prisma.profile.deleteMany()
    await prisma.user.deleteMany()

    // Create a mock user
    const user = await prisma.user.create({
        data: {
            email: 'alex@example.com',
            name: 'Alex',
            tier: 'PREMIUM',
            profile: {
                create: {
                    targetRole: 'Senior Frontend Engineer',
                    experienceLevel: 'Mid-Level',
                    readinessScore: 68
                }
            },
            resumes: {
                create: {
                    atsScore: 82,
                    missingKeywords: 'System Design,GraphQL,AWS'
                }
            },
            roadmaps: {
                create: {
                    title: 'Senior Frontend Mastery',
                    targetRole: 'Senior Frontend Engineer',
                    phases: JSON.stringify([
                        { name: "Phase 1", skills: ["Advanced React Patterns", "Performance Optimization"] }
                    ])
                }
            }
        }
    })

    console.log('Database seeded successfully!', user)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
