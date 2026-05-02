// src/lib/auth-client.js — Client-side BetterAuth hooks
"use client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});

// Named exports used throughout the app
export const { signIn, signOut, signUp, useSession, updateUser } = authClient;
