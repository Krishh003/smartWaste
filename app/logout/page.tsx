"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          // Redirect to login page after successful logout
          router.push('/login')
        } else {
          console.error('Logout failed')
          router.push('/')
        }
      } catch (error) {
        console.error('Logout error:', error)
        router.push('/')
      }
    }

    logout()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <p className="text-gray-500">Logging out...</p>
      </div>
    </div>
  )
} 