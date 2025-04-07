const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const password = 'user@123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
        where: {
            email: 'user@smartwaste.com',
        },
        data: {
            password: hashedPassword,
        },
    });

    console.log('Password updated successfully for:', user.email);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async() => {
        await prisma.$disconnect();
    });