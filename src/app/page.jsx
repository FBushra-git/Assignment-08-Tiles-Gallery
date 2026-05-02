// src/app/page.jsx — Home page
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import TileCard, { TileCardSkeleton } from "@/components/TileCard";
import { getFeaturedTiles } from "@/lib/api";
import { FiArrowRight, FiPackage, FiStar, FiAward } from "react-icons/fi";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1600&q=80",
    sub:  "New Arrivals 2025",
    h1:   "Discover Your\nPerfect Aesthetic",
    body: "Handpicked tiles from master craftspeople around the world.",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
    sub:  "Premium Collection",
    h1:   "Natural Stone\n& Marble",
    body: "Timeless elegance hewn from the earth's finest materials.",
  },
  {
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80",
    sub:  "Design Forward",
    h1:   "Shape Your\nLiving Spaces",
    body: "Modern patterns and textures to transform every room.",
  },
];

const STATS = [
  { Icon: FiPackage, value: "500+", label: "Tile Designs" },
  { Icon: FiStar,    value: "4.8★", label: "Avg Rating" },
  { Icon: FiAward,   value: "12",   label: "Award Winners" },
];

const MARQUEE_ITEMS = [
  "New Arrivals: Aegean Blue Ceramic",
  "Weekly Feature: Modern Geometric Patterns",
  "Join the Community of Tile Enthusiasts",
  "Moroccan Zellige Now In Stock",
  "Free Shipping on Orders Over $200",
  "New: Calacatta Gold Marble",
  "Explore 500+ Premium Tile Designs",
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getFeaturedTiles()
      .then(setFeatured)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-enter">

      {/* ── 1. Hero Swiper ── */}
      <section className="relative h-[88vh] min-h-[500px]">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="h-full w-full"
        >
          {SLIDES.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full w-full">
                <Image src={s.image} alt={s.h1} fill priority={i === 0} sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="max-w-xl text-white">
                      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-clay-300 mb-3 block">
                        {s.sub}
                      </span>
                      <h1 className="font-display font-bold text-5xl sm:text-6xl mb-5 whitespace-pre-line leading-tight">
                        {s.h1}
                      </h1>
                      <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-sm">{s.body}</p>
                      <Link
                        href="/all-tiles"
                        className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg transition-colors"
                      >
                        Browse Now <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ── 2. Marquee ── */}
      <div className="marquee-strip">
        <Marquee speed={55} gradient={false} pauseOnHover={true}>
          {MARQUEE_ITEMS.map((t, i) => (
            <span key={i} className="mx-8">
              {t} <span className="text-clay-300 mx-4">◆</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ── 3. Stats Bar ── */}
      <section className="bg-white border-b border-clay-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-3 divide-x divide-clay-100">
            {STATS.map(({ Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 text-center px-4">
                <Icon size={20} className="text-clay-400" />
                <span className="font-display font-bold text-2xl text-clay-800">{value}</span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Featured Tiles ── */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-clay-400 mb-1">Top Rated</p>
            <h2 className="font-display font-bold text-4xl text-clay-800">Featured Tiles</h2>
          </div>
          <Link href="/all-tiles" className="hidden sm:flex items-center gap-1 text-clay-600 hover:text-clay-800 text-sm font-medium transition-colors">
            View all <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <TileCardSkeleton key={i} />)
            : featured.map(tile => <TileCard key={tile.id} tile={tile} />)
          }
        </div>
      </section>

      {/* ── 5. CTA Banner ── */}
      <section className="relative h-64 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80"
          alt="Beautiful interior"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-clay-900/65 flex items-center justify-center text-center px-4">
          <div className="text-white">
            <h2 className="font-display font-bold text-4xl mb-3">Transform Your Space</h2>
            <p className="text-clay-200 mb-6 max-w-md mx-auto">
              From rustic terracotta to gleaming marble — every tile tells a story.
            </p>
            <Link
              href="/all-tiles"
              className="inline-block bg-white text-clay-800 hover:bg-clay-50 font-semibold px-7 py-3 rounded-2xl transition-colors"
            >
              Browse the Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}