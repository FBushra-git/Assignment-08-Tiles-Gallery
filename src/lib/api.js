import data from '../data/tiles.json'

const tiles = data.tiles

export async function getAllTiles() {
	return tiles
}

export async function getTileById(id) {
	return tiles.find((t) => t.id == id)
}

export async function getFeaturedTiles() {
	return [...tiles].sort((a, b) => b.rating - a.rating).slice(0, 4)
}
