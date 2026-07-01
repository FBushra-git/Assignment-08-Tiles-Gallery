'use client'
import TileCard, { TileCardSkeleton } from '@/components/TileCard'
import { getFeaturedTiles } from '@/lib/api'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'

const Featured = () => {
	const [featured, setFeatured] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getFeaturedTiles()
			.then((data) => setFeatured(data || []))
			.catch(console.error)
			.finally(() => setLoading(false))
	}, [])

	return (
		<section className='mx-auto max-w-7xl px-4 py-20'>
			<div className='mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between'>
				<div className='max-w-2xl'>
					<p className='mb-2 text-xs font-bold uppercase tracking-[0.22em] text-clay-500'>Top Rated</p>
					<h2 className='font-display text-4xl font-bold text-clay-900 sm:text-5xl'>Featured Tiles</h2>
					<p className='mt-3 text-sm leading-7 text-gray-500'>Our highest-rated surfaces, selected for rich texture, timeless color, and flexible use across kitchens, baths, and feature walls.</p>
				</div>
				<Link href='/all-tiles' className='inline-flex w-fit items-center gap-2 rounded-lg border border-clay-200 bg-white px-4 py-2.5 text-sm font-bold text-clay-800 transition-colors hover:bg-clay-50'>
					View all <FiArrowRight size={14} />
				</Link>
			</div>

			<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
				{loading
					? Array.from({ length: 4 }).map((_, i) => <TileCardSkeleton key={i} />)
					: featured.map((tile) => <TileCard key={tile.id} tile={tile} />)}
			</div>
		</section>
	)
}

export default Featured
