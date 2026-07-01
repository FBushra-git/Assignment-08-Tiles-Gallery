// src/app/tile/[id]/page.jsx - Single tile detail (PRIVATE)
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiCheckCircle, FiPackage, FiStar, FiXCircle } from "react-icons/fi";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getTileById } from "@/lib/api";

export default function TileDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    getTileById(id)
      .then(setTile)
      .catch(() => setError("Tile not found"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <ProtectedRoute>
      <div className="page-enter min-h-screen bg-[#fffaf5]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
          <button onClick={() => router.back()} className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-clay-700 transition-colors hover:text-clay-900">
            <FiArrowLeft /> Back to Gallery
          </button>

          {loading && <LoadingSpinner message="Loading tile..." />}

          {error && (
            <div className="rounded-lg border border-clay-100 bg-white py-20 text-center shadow-sm">
              <p className="mb-4 text-xl text-gray-500">{error}</p>
              <Link href="/all-tiles" className="inline-flex rounded-lg bg-clay-700 px-5 py-3 text-sm font-bold text-white hover:bg-clay-800">Browse All Tiles</Link>
            </div>
          )}

          {tile && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
              <div className="space-y-3">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-clay-100 bg-white shadow-sm">
                  <Image src={tile.image} alt={tile.title} fill sizes="(max-width:1024px)100vw,52vw" className="object-cover" priority />
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className={`relative aspect-square overflow-hidden rounded-lg border bg-white ${i === 0 ? "border-clay-700" : "border-clay-100"}`}>
                      <Image src={tile.image} alt={`${tile.title} preview`} fill sizes="160px" className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-clay-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-clay-100 px-3 py-1 text-xs font-bold capitalize text-clay-800">{tile.category}</span>
                  {tile.inStock ? (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-3 py-1 text-xs font-bold text-green-700"><FiCheckCircle size={13} /> In Stock</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1 text-xs font-bold text-red-600"><FiXCircle size={13} /> Out of Stock</span>
                  )}
                </div>

                <h1 className="font-display text-4xl font-bold leading-tight text-clay-900 sm:text-5xl">{tile.title}</h1>

                <div className="mt-4 space-y-1 text-sm text-gray-500">
                  <p><span className="font-bold text-gray-700">Creator:</span> {tile.creator}</p>
                  <p><span className="font-bold text-gray-700">Style:</span> {tile.style}</p>
                </div>

                <div className="mt-5 flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar key={i} size={16} className={i < Math.floor(tile.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                  ))}
                  <span className="ml-1 text-sm font-semibold text-gray-500">{tile.rating} / 5.0</span>
                </div>

                <div className="mt-6 rounded-lg border border-clay-100 bg-clay-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Price per tile</p>
                  <p className="mt-1 font-display text-4xl font-bold text-clay-800">${tile.price}<span className="ml-1 text-base font-normal text-gray-400">{tile.currency}</span></p>
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 font-display text-xl font-bold text-clay-900">Specifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ["Material", tile.material],
                      ["Dimensions", tile.dimensions],
                      ["Style", tile.style],
                      ["Stock", tile.inStock ? "Available" : "Unavailable"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-lg border border-clay-100 bg-white p-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
                        <p className="mt-1 text-sm font-semibold text-gray-700">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mb-2 font-display text-xl font-bold text-clay-900">Style Description</h3>
                  <p className="text-sm leading-7 text-gray-500">{tile.description}</p>
                </div>

                {tile.tags?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tile.tags.map((tag) => <span key={tag} className="rounded-md bg-clay-100 px-3 py-1 text-xs font-bold text-clay-700">{tag}</span>)}
                  </div>
                )}

                <button disabled={!tile.inStock} className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-clay-700 py-3.5 text-sm font-bold text-white transition-colors hover:bg-clay-800 disabled:cursor-not-allowed disabled:opacity-50">
                  <FiPackage />
                  {tile.inStock ? "Request a Sample" : "Out of Stock"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
