// src/app/api/auth/[...all]/route.js
// Handles ALL BetterAuth endpoints (sign-in, sign-up, session, OAuth callbacks…)
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
