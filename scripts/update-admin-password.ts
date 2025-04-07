import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@smartwaste.com';
  const password = 'admin@123';

  try {
    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Update the admin user's password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    console.log('Admin password updated successfully');
  } catch (error) {
    console.error('Error updating admin password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 