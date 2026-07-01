import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiDroplet, FiLayers, FiShield, FiSun } from 'react-icons/fi'

const MATERIALS = [
	{
		name: 'Marble Light',
		mood: 'Calm luxury for large, bright rooms',
		image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
		Icon: FiSun,
		accent: 'bg-clay-100 text-clay-800',
	},
	{
		name: 'Handmade Glaze',
		mood: 'Reflective depth for walls and niches',
		image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=85',
		Icon: FiDroplet,
		accent: 'bg-emerald-50 text-emerald-800',
	},
	{
		name: 'Pattern Field',
		mood: 'Graphic structure for floors and backsplashes',
		image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=85',
		Icon: FiLayers,
		accent: 'bg-stone-100 text-stone-800',
	},
]

export default function MaterialStudio() {
	return (
		<section className='border-y border-clay-100 bg-white py-20'>
			<div className='mx-auto max-w-7xl px-4'>
				<div className='mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end'>
					<div>
						<p className='mb-2 text-xs font-bold uppercase tracking-[0.22em] text-clay-500'>Material Studio</p>
						<h2 className='font-display text-4xl font-bold leading-tight text-clay-900 sm:text-5xl'>Choose by atmosphere, not only category.</h2>
					</div>
					<p className='max-w-2xl text-sm leading-7 text-gray-500 lg:justify-self-end'>Explore tile directions by the feeling they create: bright stone calm, handmade surface movement, or bold pattern rhythm. Each route leads naturally into the full catalog.</p>
				</div>

				<div className='grid gap-5 lg:grid-cols-3'>
					{MATERIALS.map(({ name, mood, image, Icon, accent }) => (
						<article key={name} className='group overflow-hidden rounded-lg border border-clay-100 bg-[#fffaf5] shadow-sm'>
							<div className='relative h-72 overflow-hidden'>
								<Image src={image} alt={name} fill sizes='(max-width:1024px) 100vw, 33vw' className='object-cover transition-transform duration-500 group-hover:scale-105' />
								<div className='absolute inset-0 bg-gradient-to-t from-clay-950/80 via-clay-900/20 to-transparent' />
								<div className='absolute bottom-4 left-4 right-4 text-white'>
									<div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${accent}`}>
										<Icon size={18} />
									</div>
									<h3 className='font-display text-2xl font-bold'>{name}</h3>
									<p className='mt-1 text-sm leading-6 text-clay-50'>{mood}</p>
								</div>
							</div>
						</article>
					))}
				</div>

				<div className='mt-6 flex flex-col gap-4 rounded-lg border border-clay-100 bg-clay-900 p-5 text-white sm:flex-row sm:items-center sm:justify-between'>
					<div className='flex items-start gap-3'>
						<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-clay-900'>
							<FiShield size={18} />
						</div>
						<div>
							<h3 className='font-display text-xl font-bold'>Every detail stays inspectable.</h3>
							<p className='mt-1 text-sm leading-6 text-clay-50'>Protected detail pages keep material, size, stock, creator, and style notes organized for serious comparison.</p>
						</div>
					</div>
					<Link href='/all-tiles' className='inline-flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-clay-900 transition-colors hover:bg-clay-50'>
						Open Catalog <FiArrowRight size={14} />
					</Link>
				</div>
			</div>
		</section>
	)
}
