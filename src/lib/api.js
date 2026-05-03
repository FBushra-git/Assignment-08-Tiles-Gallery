import tiles from "@/data/tiles.json";

export async function getAllTiles() {
  return tiles;
}

export async function getTileById(id) {
  return tiles.find((t) => t.id == id); // important: ==
}

export async function getFeaturedTiles() {
  return tiles.sort((a, b) => b.rating - a.rating).slice(0, 4);
}