import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // Admin user
  const email = "admin@example.com";
  const password = "admin123456";
  const passwordHash = await hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    await prisma.user.create({
      data: { email, passwordHash, name: "Admin", role: "ADMIN" },
    });
    console.log(`Seeded admin user: ${email} / ${password}`);
  } else {
    console.log(`User ${email} already exists.`);
  }
}

main()
  .catch((e: unknown) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
