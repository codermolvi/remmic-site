import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page after a brief delay
    const timer = setTimeout(() => {
      router.push('/')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-Premium-charcoal">
      <div className="text-center">
        <h1 className="font-display text-6xl text-Premium-gold mb-4">404</h1>
        <p className="text-Premium-gray-400 text-xl mb-4">Page Not Found</p>
        <p className="text-Premium-gray-500">Redirecting to home...</p>
      </div>
    </div>
  )
}