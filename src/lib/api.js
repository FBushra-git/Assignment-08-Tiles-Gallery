// src/lib/api.js — Tile data fetching helpers (json-server)
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getAllTiles() {
  const res = await fetch(`${API}/tiles`);
  if (!res.ok) throw new Error("Failed to fetch tiles");
  return res.json();
}

export async function getTileById(id) {
  const res = await fetch(`${API}/tiles/${id}`);
  if (!res.ok) throw new Error("Tile not found");
  return res.json();
}

// Top 4 tiles by rating — used on Home page
export async function getFeaturedTiles() {
  const tiles = await getAllTiles();
  return tiles.sort((a, b) => b.rating - a.rating).slice(0, 4);
}
