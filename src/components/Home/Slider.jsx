'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'

const SLIDES = [
	{
		image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1800&q=85',
		sub: 'New Arrivals 2026',
		h1: 'Surfaces selected for calm, modern rooms',
		body: 'Browse ceramic, marble, mosaic, terracotta, and zellige collections curated for real interiors.',
	},
	{
		image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=85',
		sub: 'Natural Stone',
		h1: 'Marble and stone with quiet presence',
		body: 'Find refined finishes with material notes, dimensions, ratings, and stock status in one place.',
	},
	{
		image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1800&q=85',
		sub: 'Design Forward',
		h1: 'Patterns that shape the whole room',
		body: 'From geometric accents to handmade texture, compare styles before choosing your next sample.',
	},
]

const Slider = () => {
	return (
		<section className='relative h-[calc(100vh-64px)] min-h-[600px] overflow-hidden'>
			<Swiper
				modules={[Pagination, Autoplay, EffectFade]}
				effect='fade'
				pagination={{ clickable: true }}
				autoplay={{ delay: 5200, disableOnInteraction: false }}
				loop
				className='h-full w-full'
			>
				{SLIDES.map((s, i) => (
					<SwiperSlide key={s.h1}>
						<div className='relative h-full w-full'>
							<Image src={s.image} alt={s.h1} fill priority={i === 0} sizes='100vw' className='object-cover' />
							<div className='absolute inset-0 bg-gradient-to-r from-clay-950/85 via-clay-900/45 to-transparent' />
							<div className='absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#fffaf5] to-transparent' />
							<div className='absolute inset-0 flex items-center'>
								<div className='mx-auto w-full max-w-7xl px-4'>
									<div className='max-w-2xl text-white'>
										<span className='mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-clay-100 backdrop-blur'>
											<FiCheckCircle size={14} /> {s.sub}
										</span>
										<h1 className='font-display text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl'>
											{s.h1}
										</h1>
										<p className='mt-5 max-w-xl text-base leading-8 text-clay-50/90 sm:text-lg'>
											{s.body}
										</p>
										<div className='mt-8 flex flex-wrap items-center gap-3'>
											<Link href='/all-tiles' className='inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-clay-900 transition-colors hover:bg-clay-50'>
												Browse Collection <FiArrowRight />
											</Link>
											<Link href='/login' className='inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10'>
												Sign in for details
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}

export default Slider
