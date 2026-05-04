'use client'

import { useEffect, useMemo, useState } from 'react'
import TileCard, { TileCardSkeleton } from '@/components/TileCard'
import { getAllTiles } from '@/lib/api'
import { FiSearch, FiGrid } from 'react-icons/fi'

export default function AllTilesPage() {
	const [tiles, setTiles] = useState([])
	const [query, setQuery] = useState('')
	const [loading, setLoading] = useState(true)

	// Fetch data once
	useEffect(() => {
		let isMounted = true

		async function loadTiles() {
			try {
				const data = await getAllTiles()

				// safer fallback (handles both array or {tiles: []})
				const list = Array.isArray(data) ? data : (data?.tiles ?? [])

				if (isMounted) {
					setTiles(list)
				}
			} catch (err) {
				console.error('Failed to load tiles:', err)
			} finally {
				if (isMounted) setLoading(false)
			}
		}

		loadTiles()

		return () => {
			isMounted = false
		}
	}, [])

	// Memoized filtering (better performance than state duplication)
	const filteredTiles = useMemo(() => {
		if (!query.trim()) return tiles

		const q = query.toLowerCase()

		return tiles.filter((t) => {
			return (
				t.title?.toLowerCase().includes(q) ||
				t.category?.toLowerCase().includes(q) ||
				t.material?.toLowerCase().includes(q) ||
				t.tags?.some((tag) => tag.toLowerCase().includes(q))
			)
		})
	}, [query, tiles])

	return (
		<div className='min-h-screen page-enter'>
			{/* Header */}
			<div className='bg-white border-b border-clay-100'>
				<div className='max-w-7xl mx-auto px-4 pt-12 pb-10 text-center'>
					<p className='text-xs font-semibold tracking-[0.2em] uppercase text-clay-400 mb-2'>
						The Collection
					</p>

					<h1 className='font-display font-bold text-4xl sm:text-5xl text-clay-800 mb-6'>
						All Tiles
					</h1>

					{/* Search */}
					<div className='max-w-lg mx-auto relative'>
						<FiSearch
							size={16}
							className='absolute left-4 top-1/2 -translate-y-1/2 text-clay-400'
						/>

						<input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder='Search by name, material, category, tag…'
							className='w-full pl-10 pr-4 py-3 rounded-full border border-clay-200 bg-clay-50 focus:outline-none focus:border-clay-400 text-sm shadow-sm'
						/>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className='max-w-7xl mx-auto px-4 py-10'>
				{/* Loading */}
				{loading && (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{Array.from({ length: 8 }).map((_, i) => (
							<TileCardSkeleton key={i} />
						))}
					</div>
				)}

				{/* Empty state */}
				{!loading && filteredTiles.length === 0 && (
					<div className='flex flex-col items-center justify-center py-24 text-center'>
						<FiGrid size={44} className='text-clay-200 mb-4' />

						<h3 className='font-display text-xl text-clay-600 mb-2'>
							No tiles found
						</h3>

						<p className='text-gray-400 text-sm'>
							Try a different keyword or{' '}
							<button
								onClick={() => setQuery('')}
								className='text-clay-500 underline'
							>
								clear search
							</button>
						</p>
					</div>
				)}

				{/* Grid */}
				{!loading && filteredTiles.length > 0 && (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{filteredTiles.map((tile) => (
							<TileCard key={tile.id} tile={tile} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}
