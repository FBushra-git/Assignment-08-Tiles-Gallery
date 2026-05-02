// src/app/login/page.jsx — Login with email/password + Google
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [errors,   setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!email)    e.email    = "Email is required";
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
        toast.success("Welcome back!");
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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — image */}
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=900&q=80"
          alt="Tiles"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-clay-900/80 to-clay-700/50 flex flex-col justify-end p-12">
          <p className="font-display text-3xl text-white leading-snug mb-2">
            &ldquo;Every tile tells a story<br />of craft and dedication.&rdquo;
          </p>
          <span className="text-clay-300 text-sm">— Tiles Gallery</span>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-clay-50">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-clay-500 rounded-lg grid grid-cols-2 gap-0.5 p-1.5">
              <div className="bg-white rounded-sm" /><div className="bg-white/60 rounded-sm" />
              <div className="bg-white/60 rounded-sm" /><div className="bg-white rounded-sm" />
            </div>
            <span className="font-display font-bold text-xl text-clay-800">Tiles Gallery</span>
          </Link>

          <h1 className="font-display font-bold text-3xl text-clay-800 mb-1">Welcome back</h1>
          <p className="text-gray-400 text-sm mb-7">Sign in to continue exploring.</p>

          {/* Form error */}
          {errors.form && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Email</label>
              <div className="relative">
                <FiMail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-clay-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:border-clay-400 ${errors.email ? "border-red-400" : "border-clay-200"}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Password</label>
              <div className="relative">
                <FiLock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-clay-400" />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`w-full pl-9 pr-10 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:border-clay-400 ${errors.password ? "border-red-400" : "border-clay-200"}`}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-clay-400">
                  {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-clay-500 hover:bg-clay-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-clay-200" />
            <span className="text-gray-400 text-xs">or continue with</span>
            <div className="flex-1 h-px bg-clay-200" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={gLoading}
            className="w-full flex items-center justify-center gap-2 border border-clay-200 bg-white hover:bg-clay-50 font-medium py-3 rounded-xl transition-colors text-sm"
          >
            <FcGoogle size={20} />
            {gLoading ? "Redirecting…" : "Continue with Google"}
          </button>

          <p className="text-center text-sm text-gray-400 mt-7">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-clay-600 font-semibold hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
