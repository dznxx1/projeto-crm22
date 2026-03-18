import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  const exists = await prisma.user.findUnique({ where: { email: "admin@flowcrm.com.br" } });
  if (!exists) {
    await prisma.user.create({ data: { name: "Admin FlowCRM", email: "admin@flowcrm.com.br", password: await bcrypt.hash("Admin@2024!", 12), role: "ADMIN", plan: "MAX" } });
    console.log("✅ Admin user seeded");
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
