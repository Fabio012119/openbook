import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@openbook.io';
  const password = 'supersecurepassword';
  const name = "superadmin";

  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });

  if (!existing) {
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: Role.SUPER_ADMIN,
      },
    });

    console.log(`✅ Seeded SUPER_ADMIN: ${email}`);
  } else {
    console.log(`ℹ️ SUPER_ADMIN already exists: ${email}`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
