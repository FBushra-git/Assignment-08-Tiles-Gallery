'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FiStar, FiArrowRight } from 'react-icons/fi'

export default function TileCard({ tile }) {
	return (
		<div className='tile-card bg-white rounded-2xl overflow-hidden border border-clay-100 shadow-sm flex flex-col'>
			{/* Image */}
			<div className='relative h-48 overflow-hidden'>
				<Image
					src={tile.image}
					alt={tile.title}
					fill
					priority
					sizes='(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw'
					className='object-cover'
				/>
				{/* Category badge */}
				<span className='absolute top-3 left-3 bg-white/90 text-clay-700 text-xs font-medium px-2.5 py-1 rounded-full capitalize shadow-sm'>
					{tile.category}
				</span>
				{/* Out of stock overlay */}
				{!tile.inStock && (
					<div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
						<span className='text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded-full'>
							Out of Stock
						</span>
					</div>
				)}
			</div>

			{/* Content */}
			<div className='p-4 flex flex-col gap-2 flex-1'>
				<div className='flex items-start justify-between gap-1'>
					<h3 className='font-display font-semibold text-clay-800 text-sm leading-snug'>
						{tile.title}
					</h3>
					<div className='flex items-center gap-0.5 shrink-0 text-amber-500'>
						<FiStar size={12} fill='currentColor' />
						<span className='text-xs text-gray-500'>{tile.rating}</span>
					</div>
				</div>

				{/* Tags */}
				<div className='flex gap-1.5 flex-wrap'>
					<span className='bg-clay-100 text-clay-700 text-xs px-2 py-0.5 rounded-full'>
						{tile.material}
					</span>
					<span className='bg-clay-100 text-clay-700 text-xs px-2 py-0.5 rounded-full'>
						{tile.dimensions}
					</span>
				</div>

				<p className='text-gray-400 text-xs leading-relaxed line-clamp-2 flex-1'>
					{tile.description}
				</p>

				{/* Price + button */}
				<div className='flex items-center justify-between pt-3 border-t border-clay-50 mt-auto'>
					<div>
						<p className='text-xs text-gray-400'>From</p>
						<p className='font-display font-semibold text-clay-700'>
							${tile.price}
						</p>
					</div>
					<Link
						href={`/tile/${tile.id}`}
						className='flex items-center gap-1 text-xs font-semibold bg-clay-100 hover:bg-clay-200 text-clay-700 px-3 py-2 rounded-xl transition-colors'
					>
						Details <FiArrowRight size={12} />
					</Link>
				</div>
			</div>
		</div>
	)
}

// Skeleton card for loading state
export function TileCardSkeleton() {
	return (
		<div className='bg-white rounded-2xl overflow-hidden border border-clay-100'>
			<div className='skeleton-box h-48 w-full' />
			<div className='p-4 space-y-2.5'>
				<div className='skeleton-box h-4 w-3/4' />
				<div className='skeleton-box h-3 w-1/2' />
				<div className='skeleton-box h-3 w-full' />
				<div className='skeleton-box h-3 w-5/6' />
				<div className='flex justify-between pt-2'>
					<div className='skeleton-box h-5 w-16' />
					<div className='skeleton-box h-8 w-24 rounded-xl' />
				</div>
			</div>
		</div>
	)
}