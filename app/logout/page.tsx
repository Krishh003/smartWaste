"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Loader2 } from 'lucide-react'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut({ redirect: false })
        router.push('/login')
      } catch (error) {
        console.error('Logout error:', error)
        router.push('/')
      }
    }

    handleLogout()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
        <p className="text-gray-500 dark:text-gray-400">Logging out...</p>
      </div>
    </div>
  )
} 