import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import * as jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }
      const userId = decoded.userId

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          reads: {
            include: { article: true },
            orderBy: { readAt: "desc" },
            take: 5,
          },
        },
      })

      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }

      const stats = {
        streak: user.streak,
        recentReads: user.reads.map((read) => ({
          articleTitle: read.article.title,
          readAt: read.readAt,
        })),
      }

      res.status(200).json(stats)
    } catch (error) {
      res.status(401).json({ error: "Invalid token" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

