// src/app/my-profile/page.jsx - Profile page (PRIVATE)
"use client";
import Link from "next/link";
import Image from "next/image";
import { FiCalendar, FiEdit2, FiMail, FiUser } from "react-icons/fi";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSession } from "@/lib/auth-client";

export default function MyProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "Member";

  const rows = [
    { icon: <FiUser size={16} />, label: "Display Name", value: user?.name || "Not set" },
    { icon: <FiMail size={16} />, label: "Email", value: user?.email || "Not set" },
    { icon: <FiCalendar size={16} />, label: "Member Since", value: joined },
  ];

  return (
    <ProtectedRoute>
      <div className="page-enter min-h-screen bg-[#fffaf5]">
        <section className="relative border-b border-clay-100 bg-white">
          <div className="absolute inset-0 h-56 overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85" alt="Profile banner" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-clay-950/80 via-clay-900/45 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-5xl px-4 pb-10 pt-36">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border-4 border-white bg-clay-700 text-4xl font-bold text-white shadow-xl">
                  {user?.image ? <img src={user.image} alt="Avatar" className="h-full w-full object-cover" /> : user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="min-w-0 pb-1 text-white sm:text-clay-900">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-clay-200 sm:text-clay-500">My Profile</p>
                  <h1 className="truncate font-display text-3xl font-bold sm:text-4xl">{user?.name || "Tile Enthusiast"}</h1>
                  <p className="mt-1 truncate text-sm text-clay-50/90 sm:text-gray-500">{user?.email}</p>
                </div>
              </div>

              <Link href="/my-profile/update" className="inline-flex w-fit items-center gap-2 rounded-lg bg-clay-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-clay-800">
                <FiEdit2 size={15} /> Update Profile
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {rows.map(({ icon, label, value }) => (
              <div key={label} className="rounded-lg border border-clay-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-clay-500">
                  {icon}
                  <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
                </div>
                <p className="truncate text-sm font-semibold text-gray-700">{value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
