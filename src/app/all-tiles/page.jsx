// src/app/all-tiles/page.jsx — Full gallery with search
"use client";
import { useState, useEffect } from "react";
import TileCard, { TileCardSkeleton } from "@/components/TileCard";
import { getAllTiles } from "@/lib/api";
import { FiSearch, FiGrid } from "react-icons/fi";

export default function AllTilesPage() {
  const [tiles,    setTiles]    = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query,    setQuery]    = useState("");
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    getAllTiles()
      .then(d => { setTiles(d); setFiltered(d); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (val) => {
    setQuery(val);
    if (!val.trim()) { setFiltered(tiles); return; }
    const q = val.toLowerCase();
    setFiltered(tiles.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.material.toLowerCase().includes(q) ||
      t.tags?.some(tag => tag.toLowerCase().includes(q))
    ));
  };

  return (
    <div className="page-enter min-h-screen">
      {/* Hero / Search */}
      <div className="bg-white border-b border-clay-100">
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-clay-400 mb-2">The Collection</p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-clay-800 mb-2">All Tiles</h1>
          <p className="text-gray-400 text-sm mb-8">
            {loading ? "Loading…" : `${filtered.length} tiles available`}
          </p>
         //Search 
          <div className="max-w-lg mx-auto relative">
            <FiSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-clay-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, material, category, tag…"
              value={query}
              onChange={e => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-clay-200 bg-clay-50 focus:outline-none focus:border-clay-400 text-sm shadow-sm"
            />
          </div>
        </div>
      </div>

     //Grid 
      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <TileCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FiGrid size={44} className="text-clay-200 mb-4" />
            <h3 className="font-display text-xl text-clay-600 mb-2">No tiles found</h3>
            <p className="text-gray-400 text-sm">
              Try a different term or{" "}
              <button onClick={() => handleSearch("")} className="text-clay-500 underline">clear search</button>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(tile => <TileCard key={tile.id} tile={tile} />)}
          </div>
        )}
      </div>
    </div>
  );
}
