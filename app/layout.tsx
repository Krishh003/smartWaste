import type { Metadata } from "next"
import "../app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "../components/theme-provider"
import { Sidebar } from "../components/sidebar"
import { Header } from "../components/header"
import { AuthProvider } from "../hooks/use-auth"
import React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart Waste Management",
  description: "A smart waste management system for cities",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}

// Create a separate client component for providers

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </AuthProvider>
  )
}