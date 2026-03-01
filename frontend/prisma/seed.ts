import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding the database with mock "Alex" data...');

    // Reset existing data (optional, but good for reliable seed)
    await prisma.roadmap.deleteMany();
    await prisma.resume.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            email: 'alex@example.com',
            name: 'Alex Developer',
            tier: 'PREMIUM',
            profile: {
                create: {
                    targetRole: 'Senior Frontend Engineer',
                    experienceLevel: 'Mid-Level',
                    readinessScore: 82,
                }
            },
            resumes: {
                create: {
                    fileUrl: 's3://mock-bucket/alex-resume-v1.pdf',
                    atsScore: 78,
                    missingKeywords: 'GraphQL, Webpack, Testing Library',
                    suggestions: 'Consider adding more quantifiable metrics to your recent experiences.',
                }
            },
            roadmaps: {
                create: {
                    title: 'Path to Senior Frontend',
                    targetRole: 'Senior Frontend Engineer',
                    phases: JSON.stringify([
                        { phaseName: 'Master Advanced React', duration: '2 weeks', skills: ['Suspense', 'Server Components'] },
                        { phaseName: 'Deep Dive Architecture', duration: '4 weeks', skills: ['Micro-frontends', 'State Management'] }
                    ]),
                }
            }
        }
    });

    console.log('Database seeded successfully!', { user });
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
