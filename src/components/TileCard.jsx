'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiBox, FiMaximize2, FiStar } from 'react-icons/fi'

export default function TileCard({ tile }) {
	return (
		<article className='tile-card group flex h-full flex-col overflow-hidden rounded-lg border border-clay-100 bg-white shadow-sm'>
			<div className='relative h-52 overflow-hidden bg-clay-100'>
				<Image
					src={tile.image}
					alt={tile.title}
					fill
					priority
					sizes='(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw'
					className='object-cover'
				/>
				<div className='absolute inset-x-0 top-0 flex items-start justify-between p-3'>
					<span className='rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold capitalize text-clay-800 shadow-sm'>
						{tile.category}
					</span>
					<div className='flex items-center gap-1 rounded-md bg-clay-900/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur'>
						<FiStar size={12} className='fill-amber-300 text-amber-300' />
						{tile.rating}
					</div>
				</div>
				{!tile.inStock && (
					<div className='absolute inset-0 flex items-center justify-center bg-clay-900/55'>
						<span className='rounded-md bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-clay-900'>
							Out of Stock
						</span>
					</div>
				)}
			</div>

			<div className='flex flex-1 flex-col p-4'>
				<h3 className='font-display text-lg font-bold leading-snug text-clay-900'>
					{tile.title}
				</h3>

				<div className='mt-3 grid grid-cols-2 gap-2 text-xs text-gray-500'>
					<div className='flex items-center gap-1.5 rounded-md bg-clay-50 px-2.5 py-2'>
						<FiBox size={13} className='text-clay-500' />
						<span className='truncate'>{tile.material}</span>
					</div>
					<div className='flex items-center gap-1.5 rounded-md bg-clay-50 px-2.5 py-2'>
						<FiMaximize2 size={13} className='text-clay-500' />
						<span className='truncate'>{tile.dimensions}</span>
					</div>
				</div>

				<p className='mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500'>
					{tile.description}
				</p>

				<div className='mt-4 flex items-center justify-between border-t border-clay-100 pt-4'>
					<div>
						<p className='text-[11px] font-bold uppercase tracking-widest text-gray-400'>From</p>
						<p className='font-display text-xl font-bold text-clay-800'>${tile.price}</p>
					</div>
					<Link href={`/tile/${tile.id}`} className='inline-flex items-center gap-1.5 rounded-lg bg-clay-700 px-3.5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-clay-800'>
						Details <FiArrowRight size={13} />
					</Link>
				</div>
			</div>
		</article>
	)
}

export function TileCardSkeleton() {
	return (
		<div className='overflow-hidden rounded-lg border border-clay-100 bg-white'>
			<div className='skeleton-box h-52 w-full' />
			<div className='space-y-3 p-4'>
				<div className='skeleton-box h-5 w-3/4' />
				<div className='grid grid-cols-2 gap-2'>
					<div className='skeleton-box h-8 w-full' />
					<div className='skeleton-box h-8 w-full' />
				</div>
				<div className='skeleton-box h-3 w-full' />
				<div className='skeleton-box h-3 w-5/6' />
				<div className='flex justify-between border-t border-clay-100 pt-4'>
					<div className='skeleton-box h-8 w-16' />
					<div className='skeleton-box h-9 w-24' />
				</div>
			</div>
		</div>
	)
}
