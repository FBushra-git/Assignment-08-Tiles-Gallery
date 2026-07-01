// src/app/my-profile/update/page.jsx - Update name & image (PRIVATE)
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiCheck, FiImage, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import { updateUser, useSession } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
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
      const res = await updateUser({ name: name.trim(), image: image.trim() || undefined });
      if (res?.error) toast.error(res.error.message || "Update failed");
      else {
        toast.success("Profile updated");
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
      <div className="page-enter min-h-screen bg-[#fffaf5] px-4 py-12">
        <div className="mx-auto w-full max-w-xl">
          <Link href="/my-profile" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-clay-700 transition-colors hover:text-clay-900">
            <FiArrowLeft /> Back to Profile
          </Link>

          <div className="rounded-lg border border-clay-100 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-clay-500">Account Settings</p>
            <h1 className="font-display text-3xl font-bold text-clay-900">Update Profile</h1>
            <p className="mt-2 text-sm leading-6 text-gray-500">Change your display name and optional profile image link.</p>

            <form onSubmit={handleUpdate} className="mt-7 space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Display Name</label>
                <div className="relative">
                  <FiUser size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-clay-500" />
                  <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className={`w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-clay-500 ${errors.name ? "border-red-400" : "border-clay-200"}`} />
                </div>
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">Profile Image URL</label>
                <div className="relative">
                  <FiImage size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-clay-500" />
                  <input type="text" placeholder="https://example.com/photo.jpg" value={image} onChange={(e) => setImage(e.target.value)} className="w-full rounded-lg border border-clay-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-clay-500" />
                </div>
                <p className="mt-1 text-xs text-gray-400">Paste a direct image link: JPG, PNG, or WebP.</p>
              </div>

              {image && (
                <div className="flex items-center gap-3 rounded-lg border border-clay-100 bg-clay-50 p-3">
                  <img src={image} alt="Preview" className="h-12 w-12 rounded-lg border border-clay-200 object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
                  <p className="text-xs font-semibold text-gray-500">Image preview</p>
                </div>
              )}

              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-lg bg-clay-700 py-3 text-sm font-bold text-white transition-colors hover:bg-clay-800 disabled:opacity-60">
                {loading ? "Updating..." : <><FiCheck /> Update Information</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
