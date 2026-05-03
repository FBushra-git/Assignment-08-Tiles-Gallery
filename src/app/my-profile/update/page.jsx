// src/app/my-profile/update/page.jsx — Update name & image (PRIVATE)

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser, FiImage, FiArrowLeft, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSession, updateUser } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [name,    setName]    = useState("");
  const [image,   setImage]   = useState("");
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState({});

  // Pre-fill with current data when session loads
  useEffect(() => {
    if (user) { setName(user.name || ""); setImage(user.image || ""); }
  }, [user]);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name cannot be empty";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleUpdate = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // BetterAuth updateUser patches the user record in MongoDB
      const res = await updateUser({ name: name.trim(), image: image.trim() || undefined });
      if (res?.error) {
        toast.error(res.error.message || "Update failed");
      } else {
        toast.success("Profile updated!");
        router.push("/my-profile");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="page-enter min-h-screen bg-clay-50 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <Link
            href="/my-profile"
            className="flex items-center gap-1.5 text-clay-600 hover:text-clay-800 text-sm font-medium mb-6 transition-colors"
          >
            <FiArrowLeft /> Back to Profile
          </Link>

          <div className="bg-white rounded-2xl border border-clay-100 shadow-sm p-8">
            <h1 className="font-display font-bold text-2xl text-clay-800 mb-1">Update Profile</h1>
            <p className="text-gray-400 text-sm mb-7">Edit your display name and profile image URL.</p>

            <form onSubmit={handleUpdate} className="space-y-5">
           
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Display Name</label>
                <div className="relative">
                  <FiUser size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-clay-400" />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={`w-full pl-9 pr-4 py-2.5 rounded-xl border bg-clay-50 text-sm focus:outline-none focus:border-clay-400 ${errors.name ? "border-red-400" : "border-clay-200"}`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Profile Image URL</label>
                <div className="relative">
                  <FiImage size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-clay-400" />
                  <input
                    type="text"
                    placeholder="https://example.com/photo.jpg"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-clay-200 bg-clay-50 text-sm focus:outline-none focus:border-clay-400"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Paste a direct image link (JPG, PNG, WebP)</p>
              </div>

              
              {image && (
                <div className="flex items-center gap-3 bg-clay-50 rounded-xl p-3 border border-clay-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover border border-clay-200"
                    onError={e => e.currentTarget.style.display = "none"}
                  />
                  <p className="text-xs text-gray-400">Image preview</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-clay-500 hover:bg-clay-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {loading ? "Updating…" : <><FiCheck /> Update Information</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
