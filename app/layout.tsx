import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/Navigation"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "The News Gamification",
  description: "Increase reader engagement with gamification",
    generator: 'dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </div>
      </body>
    </html>
  )
}



import './globals.css'