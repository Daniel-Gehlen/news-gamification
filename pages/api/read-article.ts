import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import * as jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { articleId } = req.body
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }
      const userId = decoded.userId

      await prisma.read.create({
        data: {
          userId,
          articleId,
        },
      })

      // Update user streak
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (user) {
        const lastRead = await prisma.read.findFirst({
          where: { userId },
          orderBy: { readAt: "desc" },
          skip: 1,
        })

        const isConsecutiveDay = lastRead ? new Date().getDate() - lastRead.readAt.getDate() === 1 : false

        await prisma.user.update({
          where: { id: userId },
          data: { streak: isConsecutiveDay ? user.streak + 1 : 1 },
        })
      }

      res.status(200).json({ message: "Article read recorded successfully" })
    } catch (error) {
      res.status(401).json({ error: "Invalid token" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

