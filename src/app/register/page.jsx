// src/app/register/page.jsx — Registration with Google option
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock, FiImage, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [errors,   setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim())       e.name     = "Name is required";
    if (!email.trim())      e.email    = "Email is required";
    if (password.length < 6) e.password = "Min. 6 characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleRegister = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await signUp.email({ name, email, password, image: photoURL || undefined });
      if (res?.error) {
        toast.error(res.error.message || "Registration failed");
        setErrors({ form: res.error.message });
      } else {
        toast.success("Account created! Please login.");
        router.push("/login");
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
      toast.error("Google sign-in failed.");
      setGLoading(false);
    }
  };

  const field = (label, value, onChange, type = "text", icon, error, placeholder, extra = {}) => (
    <div>
      <label className="text-xs font-medium text-gray-600 mb-1 block">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-clay-400">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`w-full pl-9 pr-4 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:border-clay-400 ${error ? "border-red-400" : "border-clay-200"}`}
          {...extra}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left — form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-clay-50">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-clay-500 rounded-lg grid grid-cols-2 gap-0.5 p-1.5">
              <div className="bg-white rounded-sm" /><div className="bg-white/60 rounded-sm" />
              <div className="bg-white/60 rounded-sm" /><div className="bg-white rounded-sm" />
            </div>
            <span className="font-display font-bold text-xl text-clay-800">Tiles Gallery</span>
          </Link>

          <h1 className="font-display font-bold text-3xl text-clay-800 mb-1">Create account</h1>
          <p className="text-gray-400 text-sm mb-7">Join our community of tile enthusiasts.</p>

          {errors.form && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {field("Full Name",              name,     setName,     "text",     <FiUser  size={15} />, errors.name,     "Jane Doe")}
            {field("Email",                  email,    setEmail,    "email",    <FiMail  size={15} />, errors.email,    "you@example.com")}
            {field("Profile Photo URL (opt)", photoURL, setPhotoURL, "text",    <FiImage size={15} />, null,            "https://…")}

            {/* Password with show/hide */}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Password</label>
              <div className="relative">
                <FiLock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-clay-400" />
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Min. 6 characters"
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
              {loading ? "Creating…" : "Register"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-clay-200" />
            <span className="text-gray-400 text-xs">or</span>
            <div className="flex-1 h-px bg-clay-200" />
          </div>

          <button
            onClick={handleGoogle}
            disabled={gLoading}
            className="w-full flex items-center justify-center gap-2 border border-clay-200 bg-white hover:bg-clay-50 font-medium py-3 rounded-xl transition-colors text-sm"
          >
            <FcGoogle size={20} />
            {gLoading ? "Redirecting…" : "Continue with Google"}
          </button>

          <p className="text-center text-sm text-gray-400 mt-7">
            Already have an account?{" "}
            <Link href="/login" className="text-clay-600 font-semibold hover:underline">Login here</Link>
          </p>
        </div>
      </div>

      {/* Right — image */}
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=80"
          alt="Moroccan tiles"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-clay-900/80 to-clay-600/40 flex flex-col justify-end p-12">
          <p className="font-display text-3xl text-white leading-snug mb-2">
            &ldquo;Art underfoot,<br />beauty overhead.&rdquo;
          </p>
          <span className="text-clay-300 text-sm">— Tiles Gallery Community</span>
        </div>
      </div>
    </div>
  );
}
