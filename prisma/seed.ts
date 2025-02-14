import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Create users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async (_, i) => {
      const hashedPassword = await bcrypt.hash("password123", 10)
      return prisma.user.create({
        data: {
          email: `user${i + 1}@example.com`,
          name: `User ${i + 1}`,
          password: hashedPassword,
          streak: Math.floor(Math.random() * 10),
        },
      })
    }),
  )

  // Create articles
  const articles = await Promise.all(
    Array.from({ length: 20 }).map((_, i) =>
      prisma.article.create({
        data: {
          title: `Article ${i + 1}`,
          content: `This is the content of article ${i + 1}.`,
        },
      }),
    ),
  )

  // Create reads
  await Promise.all(
    users.flatMap((user) =>
      Array.from({ length: Math.floor(Math.random() * 10) }).map(() =>
        prisma.read.create({
          data: {
            userId: user.id,
            articleId: articles[Math.floor(Math.random() * articles.length)].id,
          },
        }),
      ),
    ),
  )

  console.log("Seed data created successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

