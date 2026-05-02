// src/app/tile/[id]/page.jsx — Single tile detail (PRIVATE)
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiStar, FiPackage, FiCheckCircle, FiXCircle } from "react-icons/fi";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getTileById } from "@/lib/api";

export default function TileDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tile,    setTile]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!id) return;
    getTileById(id)
      .then(setTile)
      .catch(() => setError("Tile not found"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <ProtectedRoute>
      <div className="page-enter max-w-7xl mx-auto px-4 py-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-clay-600 hover:text-clay-800 text-sm font-medium mb-8 transition-colors"
        >
          <FiArrowLeft /> Back to Gallery
        </button>

        {loading && <LoadingSpinner message="Loading tile…" />}

        {error && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400 mb-4">{error}</p>
            <Link href="/all-tiles" className="btn bg-clay-500 text-white border-none hover:bg-clay-600">
              Browse All Tiles
            </Link>
          </div>
        )}

        {tile && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* ── Left: Images ── */}
            <div className="space-y-3">
              {/* Main image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image src={tile.image} alt={tile.title} fill sizes="(max-width:1024px)100vw,50vw" className="object-cover" priority />
              </div>
              {/* Thumbnail row */}
              <div className="grid grid-cols-4 gap-2">
                {[0,1,2,3].map(i => (
                  <div key={i} className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 ${i===0 ? "border-clay-500" : "border-transparent hover:border-clay-300"}`}>
                    <Image src={tile.image} alt="thumb" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Details ── */}
            <div className="space-y-5">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-clay-100 text-clay-700 text-xs font-medium px-3 py-1 rounded-full capitalize">
                  {tile.category}
                </span>
                {tile.inStock ? (
                  <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                    <FiCheckCircle size={12}/> In Stock
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-400 text-xs font-medium">
                    <FiXCircle size={12}/> Out of Stock
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-clay-800 leading-tight">
                {tile.title}
              </h1>

              {/* Creator & Style */}
              <div className="text-sm text-gray-500 space-y-1">
                <p><span className="font-medium text-gray-700">Creator: </span>{tile.creator}</p>
                <p><span className="font-medium text-gray-700">Style: </span>{tile.style}</p>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1.5">
                {Array.from({length:5}).map((_,i) => (
                  <FiStar key={i} size={15}
                    className={i < Math.floor(tile.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-1">{tile.rating} / 5.0</span>
              </div>

              {/* Price */}
              <div className="bg-clay-50 rounded-2xl p-4 border border-clay-100">
                <p className="text-xs text-gray-400 mb-1">Price per tile</p>
                <p className="font-display font-bold text-3xl text-clay-700">
                  ${tile.price}
                  <span className="text-base text-gray-400 font-normal ml-1">{tile.currency}</span>
                </p>
              </div>

              {/* Specs */}
              <div>
                <h3 className="font-display font-semibold text-clay-700 mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ["Material",   tile.material],
                    ["Dimensions", tile.dimensions],
                    ["Style",      tile.style],
                    ["In Stock",   tile.inStock ? "Yes" : "No"],
                  ].map(([label, val]) => (
                    <div key={label} className="bg-white rounded-xl p-3 border border-clay-100">
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-sm font-medium text-gray-700 mt-0.5">{val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-display font-semibold text-clay-700 mb-2">Style Description</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tile.description}</p>
              </div>

              {/* Tags */}
              {tile.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tile.tags.map(tag => (
                    <span key={tag} className="bg-clay-100 text-clay-700 text-xs font-medium px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <button
                disabled={!tile.inStock}
                className="w-full flex items-center justify-center gap-2 bg-clay-500 hover:bg-clay-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-2xl transition-colors shadow-md"
              >
                <FiPackage />
                {tile.inStock ? "Request a Sample" : "Out of Stock"}
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
