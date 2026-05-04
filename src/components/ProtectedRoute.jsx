'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import LoadingSpinner from './LoadingSpinner'

export default function ProtectedRoute({ children }) {
	const { data: session, isPending } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (!isPending && !session) router.push('/login')
	}, [session, isPending, router])

	if (isPending) return <LoadingSpinner message='Checking authentication…' />
	if (!session) return null
	return <>{children}</>
}