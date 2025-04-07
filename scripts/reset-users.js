const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        // Delete all existing users
        await prisma.user.deleteMany();
        console.log('All users deleted successfully');

        // Create two new dummy users
        const user1 = await prisma.user.create({
            data: {
                email: 'admin@example.com',
                name: 'Admin User',
                password: 'admin123', // Note: In production, this should be hashed
                role: 'ADMIN'
            }
        });

        const user2 = await prisma.user.create({
            data: {
                email: 'user@example.com',
                name: 'Regular User',
                password: 'user123', // Note: In production, this should be hashed
                role: 'USER'
            }
        });

        console.log('Created new users:', { user1, user2 });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();