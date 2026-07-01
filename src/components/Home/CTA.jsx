import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

const CTA = () => {
	return (
		<section className='relative overflow-hidden'>
			<div className='relative min-h-[360px]'>
				<Image src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85' alt='Bright room with tile surfaces' fill sizes='100vw' className='object-cover' />
				<div className='absolute inset-0 bg-gradient-to-r from-clay-950/85 via-clay-900/55 to-clay-900/10' />
				<div className='relative z-10 mx-auto flex min-h-[360px] max-w-7xl items-center px-4 py-16'>
					<div className='max-w-xl text-white'>
						<p className='mb-3 text-xs font-bold uppercase tracking-[0.22em] text-clay-200'>Ready to compare</p>
						<h2 className='font-display text-4xl font-bold leading-tight sm:text-5xl'>Transform the room from the surface up.</h2>
						<p className='mt-4 text-sm leading-7 text-clay-50/90'>Browse refined finishes, inspect material details, and save time choosing the right tile for your next project.</p>
						<Link href='/all-tiles' className='mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-clay-900 transition-colors hover:bg-clay-50'>
							Browse the Gallery <FiArrowRight />
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CTA
