import Link from 'next/link'
import { FiHome, FiGrid } from 'react-icons/fi'

export default function NotFound() {
	return (
		<div className='min-h-[75vh] flex items-center justify-center px-4'>
			<div className='text-center max-w-sm'>
				<p className='font-display font-bold text-[110px] leading-none text-clay-100 select-none'>
					404
				</p>
				<div className='w-14 h-14 bg-clay-100 rounded-2xl grid grid-cols-2 gap-1 p-3 mx-auto mb-5'>
					<div className='bg-clay-300 rounded' />
					<div className='bg-clay-200 rounded' />
					<div className='bg-clay-200 rounded' />
					<div className='bg-clay-300 rounded' />
				</div>
				<h1 className='font-display font-semibold text-2xl text-clay-800 mb-3'>
					Page Not Found
				</h1>
				<p className='text-gray-400 text-sm mb-8'>
					The tile you&apos;re looking for seems to have gone missing from our
					gallery.
				</p>
				<div className='flex items-center justify-center gap-3 flex-wrap'>
					<Link
						href='/'
						className='flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm'
					>
						<FiHome size={14} /> Go Home
					</Link>
					<Link
						href='/all-tiles'
						className='flex items-center gap-2 bg-clay-100 hover:bg-clay-200 text-clay-700 font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm'
					>
						<FiGrid size={14} /> Browse Tiles
					</Link>
				</div>
			</div>
		</div>
	)
}
