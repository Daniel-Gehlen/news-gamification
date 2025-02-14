import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

const prisma = new PrismaClient()

describe("API Tests", () => {
  let userId: number
  let token: string

  beforeAll(async () => {
    // Create a test user
    const hashedPassword = await bcrypt.hash("testpassword", 10)
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        name: "Test User",
        password: hashedPassword,
      },
    })
    userId = user.id
    token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" })
  })

  afterAll(async () => {
    // Clean up test data
    await prisma.read.deleteMany({ where: { userId } })
    await prisma.user.delete({ where: { id: userId } })
    await prisma.$disconnect()
  })

  test("User can read an article", async () => {
    const article = await prisma.article.create({
      data: {
        title: "Test Article",
        content: "This is a test article.",
      },
    })

    const response = await fetch("/api/read-article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ articleId: article.id }),
    })

    expect(response.status).toBe(200)

    const readRecord = await prisma.read.findFirst({
      where: { userId, articleId: article.id },
    })
    expect(readRecord).toBeTruthy()

    await prisma.article.delete({ where: { id: article.id } })
  })

  test("User can get their stats", async () => {
    const response = await fetch("/api/user-stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toHaveProperty("streak")
    expect(data).toHaveProperty("recentReads")
  })
})

