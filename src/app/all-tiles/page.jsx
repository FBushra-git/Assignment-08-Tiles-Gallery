'use client'

import { useEffect, useMemo, useState } from 'react'
import TileCard, { TileCardSkeleton } from '@/components/TileCard'
import { getAllTiles } from '@/lib/api'
import { FiGrid, FiSearch, FiX } from 'react-icons/fi'

export default function AllTilesPage() {
	const [tiles, setTiles] = useState([])
	const [query, setQuery] = useState('')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let isMounted = true

		async function loadTiles() {
			try {
				const data = await getAllTiles()
				const list = Array.isArray(data) ? data : (data?.tiles ?? [])
				if (isMounted) setTiles(list)
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

	const filteredTiles = useMemo(() => {
		if (!query.trim()) return tiles
		const q = query.toLowerCase()
		return tiles.filter((t) =>
			t.title?.toLowerCase().includes(q) ||
			t.category?.toLowerCase().includes(q) ||
			t.material?.toLowerCase().includes(q) ||
			t.tags?.some((tag) => tag.toLowerCase().includes(q)),
		)
	}, [query, tiles])

	return (
		<div className='page-enter min-h-screen'>
			<section className='border-b border-clay-100 bg-white'>
				<div className='mx-auto max-w-7xl px-4 py-12 sm:py-16'>
					<div className='grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end'>
						<div>
							<p className='mb-3 text-xs font-bold uppercase tracking-[0.22em] text-clay-500'>The Collection</p>
							<h1 className='font-display text-5xl font-bold leading-tight text-clay-900 sm:text-6xl'>All Tiles</h1>
							<p className='mt-4 max-w-2xl text-sm leading-7 text-gray-500'>Search premium tile designs by material, category, finish, or style tag. Each detail page includes stock, dimensions, creator, and sample information.</p>
						</div>

						<div className='rounded-lg border border-clay-100 bg-clay-50 p-3'>
							<label className='mb-2 block text-xs font-bold uppercase tracking-widest text-clay-600'>Search catalog</label>
							<div className='relative'>
								<FiSearch size={17} className='absolute left-3 top-1/2 -translate-y-1/2 text-clay-500' />
								<input
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder='Marble, mosaic, ceramic...'
									className='w-full rounded-lg border border-clay-200 bg-white py-3 pl-10 pr-10 text-sm outline-none transition-colors focus:border-clay-500'
								/>
								{query && (
									<button onClick={() => setQuery('')} className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-clay-700' aria-label='Clear search'>
										<FiX />
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='mx-auto max-w-7xl px-4 py-10'>
				<div className='mb-6 flex items-center justify-between gap-4'>
					<p className='text-sm font-semibold text-gray-500'>
						{loading ? 'Loading catalog...' : `${filteredTiles.length} ${filteredTiles.length === 1 ? 'tile' : 'tiles'} shown`}
					</p>
					<div className='hidden items-center gap-2 text-xs font-bold uppercase tracking-widest text-clay-500 sm:flex'>
						<FiGrid /> Curated Grid
					</div>
				</div>

				{loading && (
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{Array.from({ length: 8 }).map((_, i) => <TileCardSkeleton key={i} />)}
					</div>
				)}

				{!loading && filteredTiles.length === 0 && (
					<div className='flex min-h-[360px] flex-col items-center justify-center rounded-lg border border-dashed border-clay-200 bg-white px-4 text-center'>
						<FiGrid size={42} className='mb-4 text-clay-300' />
						<h3 className='font-display text-2xl font-bold text-clay-800'>No tiles found</h3>
						<p className='mt-2 max-w-sm text-sm leading-6 text-gray-500'>Try a different material, category, or style keyword.</p>
						<button onClick={() => setQuery('')} className='mt-5 rounded-lg bg-clay-700 px-4 py-2 text-sm font-bold text-white hover:bg-clay-800'>Clear search</button>
					</div>
				)}

				{!loading && filteredTiles.length > 0 && (
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{filteredTiles.map((tile) => <TileCard key={tile.id} tile={tile} />)}
					</div>
				)}
			</section>
		</div>
	)
}
