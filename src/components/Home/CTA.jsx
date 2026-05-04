import Image from 'next/image'
import Link from 'next/link'

const CTA = () => {
	return (
		<section className='relative h-64 overflow-hidden'>
			<Image
				src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80'
				alt='Beautiful interior'
				fill
				sizes='100vw'
				className='object-cover'
			/>

			<div className='absolute inset-0 bg-clay-900/65 flex items-center justify-center text-center px-4'>
				<div className='text-white'>
					<h2 className='font-display font-bold text-4xl mb-3'>
						Transform Your Space
					</h2>

					<p className='text-clay-200 mb-6 max-w-md mx-auto'>
						From rustic terracotta to gleaming marble — every tile tells a
						story.
					</p>

					<Link
						href='/all-tiles'
						className='inline-block bg-white text-clay-800 hover:bg-clay-50 font-semibold px-7 py-3 rounded-2xl transition-colors'
					>
						Browse the Gallery
					</Link>
				</div>
			</div>
		</section>
	)
}

export default CTA