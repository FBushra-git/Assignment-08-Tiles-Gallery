// src/app/login/page.jsx - Login with email/password + Google
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    if (!password) e.password = "Password is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleLogin = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await signIn.email({ email, password });
      if (res?.error) {
        toast.error(res.error.message || "Invalid credentials");
        setErrors({ form: res.error.message });
      } else {
        toast.success("Welcome back");
        router.push("/");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google login failed.");
      setGLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-[0.95fr_1.05fr]">
      <div className="relative hidden lg:block">
        <Image src="https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1100&q=85" alt="Textured tile wall" fill sizes="48vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-clay-950/80 via-clay-900/25 to-transparent" />
        <div className="absolute bottom-10 left-10 max-w-md text-white">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-clay-200">Member Access</p>
          <h2 className="font-display text-4xl font-bold leading-tight">See every material note before choosing a sample.</h2>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 flex items-center gap-3">
            <div className="grid h-9 w-9 grid-cols-2 gap-0.5 rounded-lg bg-clay-700 p-1.5">
              <div className="rounded-sm bg-white" /><div className="rounded-sm bg-clay-300" />
              <div className="rounded-sm bg-clay-300" /><div className="rounded-sm bg-white" />
            </div>
            <span className="font-display text-xl font-bold text-clay-900">Tiles Gallery</span>
          </Link>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-clay-500">Welcome back</p>
          <h1 className="font-display text-4xl font-bold text-clay-900">Log in to continue</h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">Access protected tile details, profile settings, and sample requests.</p>

          {errors.form && <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{errors.form}</div>}

          <form onSubmit={handleLogin} className="mt-7 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Email</label>
              <div className="relative">
                <FiMail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-clay-500" />
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-clay-500 ${errors.email ? "border-red-400" : "border-clay-200"}`} />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Password</label>
              <div className="relative">
                <FiLock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-clay-500" />
                <input type={showPw ? "text" : "password"} placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full rounded-lg border bg-white py-3 pl-10 pr-10 text-sm outline-none transition-colors focus:border-clay-500 ${errors.password ? "border-red-400" : "border-clay-200"}`} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-clay-500" aria-label="Toggle password visibility">
                  {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className="w-full rounded-lg bg-clay-700 py-3 text-sm font-bold text-white transition-colors hover:bg-clay-800 disabled:opacity-60">
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-clay-100" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">or</span>
            <div className="h-px flex-1 bg-clay-100" />
          </div>

          <button onClick={handleGoogle} disabled={gLoading} className="flex w-full items-center justify-center gap-2 rounded-lg border border-clay-200 bg-white py-3 text-sm font-bold text-clay-900 transition-colors hover:bg-clay-50 disabled:opacity-60">
            <FcGoogle size={20} />
            {gLoading ? "Redirecting..." : "Continue with Google"}
          </button>

          <p className="mt-7 text-center text-sm text-gray-500">
            Don&apos;t have an account? <Link href="/register" className="font-bold text-clay-700 hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
