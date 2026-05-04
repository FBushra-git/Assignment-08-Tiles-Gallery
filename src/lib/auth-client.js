// src/lib/auth-client.js — Client-side BetterAuth hooks
'use client'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
	//vercel live link
	// baseURL: 'https://tiles-gallery.vercel.app',
	baseURL: process.env.BETTER_AUTH_URL,
})

// Named exports used throughout the app
export const { signIn, signOut, signUp, useSession, updateUser } = authClient
