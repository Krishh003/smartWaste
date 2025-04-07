import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Create a response with the success message
    const response = NextResponse.json({ 
      success: true,
      message: 'Logged out successfully' 
    })
    
    // Clear the authentication token cookie
    response.cookies.set('token', '', {
      expires: new Date(0),
      path: '/'
    })
    
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    )
  }
} 