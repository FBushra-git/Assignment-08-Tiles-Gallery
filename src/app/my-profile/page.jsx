// src/app/my-profile/page.jsx — Profile page (PRIVATE)
"use client";
import Link from "next/link";
import Image from "next/image";
import { FiEdit2, FiMail, FiCalendar, FiUser } from "react-icons/fi";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSession } from "@/lib/auth-client";

export default function MyProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" })
    : "Member";

  return (
    <ProtectedRoute>
      <div className="page-enter min-h-screen bg-clay-50">
        {/* Banner */}
        <div className="relative h-44 sm:h-56 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80"
            alt="Profile banner"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-clay-900/30 to-clay-900/60" />
        </div>

        <div className="max-w-2xl mx-auto px-4">
          {/* Avatar row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-14 mb-8 relative z-10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-white shadow-xl overflow-hidden bg-clay-500 flex items-center justify-center text-white text-3xl font-bold shrink-0">
              {user?.image ? (
                
                <img src={user.image} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.name?.[0]?.toUpperCase() || "U"
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-clay-800 truncate">
                {user?.name || "Tile Enthusiast"}
              </h1>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
            <Link
              href="/my-profile/update"
              className="flex items-center gap-2 bg-clay-100 hover:bg-clay-200 text-clay-700 text-sm font-medium px-4 py-2 rounded-xl transition-colors shrink-0"
            >
              <FiEdit2 size={14} /> Update Profile
            </Link>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { icon: <FiUser size={14}/>,     label: "Display Name", value: user?.name || "—" },
              { icon: <FiMail size={14}/>,     label: "Email",        value: user?.email || "—" },
              { icon: <FiCalendar size={14}/>, label: "Member Since", value: joined },
            ].map(({ icon, label, value }) => (
              <div key={label} className="bg-white rounded-2xl p-5 border border-clay-100 shadow-sm">
                <div className="flex items-center gap-2 text-clay-400 mb-1">
                  {icon}
                  <span className="text-xs uppercase tracking-wide font-medium">{label}</span>
                </div>
                <p className="text-gray-700 font-medium truncate">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
