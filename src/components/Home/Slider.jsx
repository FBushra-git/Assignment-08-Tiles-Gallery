'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import { FiArrowRight } from 'react-icons/fi'

const SLIDES = [
	{
		image:
			'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=1600&q=80',
		sub: 'New Arrivals 2025',
		h1: 'Discover Your\nPerfect Aesthetic',
		body: 'Handpicked tiles from master craftspeople around the world.',
	},
	{
		image:
			'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
		sub: 'Premium Collection',
		h1: 'Natural Stone\n& Marble',
		body: "Timeless elegance hewn from the earth's finest materials.",
	},
	{
		image:
			'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80',
		sub: 'Design Forward',
		h1: 'Shape Your\nLiving Spaces',
		body: 'Modern patterns and textures to transform every room.',
	},
]

const Slider = () => {
	return (
		<section className='relative h-[88vh] min-h-[500px]'>
			<Swiper
				modules={[Pagination, Autoplay, EffectFade]}
				effect='fade'
				pagination={{ clickable: true }}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				loop
				className='h-full w-full'
			>
				{SLIDES.map((s, i) => (
					<SwiperSlide key={i}>
						<div className='relative h-full w-full'>
							<Image
								src={s.image}
								alt={s.h1}
								fill
								priority={i === 0}
								sizes='100vw'
								className='object-cover'
							/>
							<div className='absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent' />
							<div className='absolute inset-0 flex items-center'>
								<div className='max-w-7xl mx-auto px-6 w-full'>
									<div className='max-w-xl text-white'>
										<span className='text-xs font-semibold tracking-[0.2em] uppercase text-clay-300 mb-3 block'>
											{s.sub}
										</span>
										<h1 className='font-display font-bold text-5xl sm:text-6xl mb-5 whitespace-pre-line leading-tight'>
											{s.h1}
										</h1>
										<p className='text-gray-300 text-lg mb-8 leading-relaxed max-w-sm'>
											{s.body}
										</p>
										<Link
											href='/all-tiles'
											className='inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg transition-colors'
										>
											Browse Now <FiArrowRight />
										</Link>
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