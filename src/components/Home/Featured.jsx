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
			.then((data) => {
				// console.log('Featured:', data) // debug
				setFeatured(data || [])
			})
			.catch(console.error)
			.finally(() => setLoading(false))
	}, [])

	return (
		<section className='max-w-7xl mx-auto px-4 py-20'>
			<div className='flex items-end justify-between mb-10'>
				<div>
					<p className='text-xs font-semibold tracking-[0.2em] uppercase text-clay-400 mb-1'>
						Top Rated
					</p>
					<h2 className='font-display font-bold text-4xl text-clay-800'>
						Featured Tiles
					</h2>
				</div>
				<Link
					href='/all-tiles'
					className='hidden sm:flex items-center gap-1 text-clay-600 hover:text-clay-800 text-sm font-medium transition-colors'
				>
					View all <FiArrowRight size={14} />
				</Link>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{loading
					? Array.from({ length: 4 }).map((_, i) => (
							<TileCardSkeleton key={i} />
						))
					: featured.map((tile) => <TileCard key={tile.id} tile={tile} />)}
			</div>
		</section>
	)
}

export default Featured