// 1
const { PrismaClient } = require("@prisma/client")

// 2
const prisma = new PrismaClient()

//3
async function main() {
    console.log(prisma);
  const allUsers = await prisma.users.findMany()
  console.log(allUsers)
}

//4
main()
  .catch(e => {
    throw e
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect()
  })