import Link from 'next/link'
import {
	FiInstagram,
	FiTwitter,
	FiFacebook,
	FiMail,
	FiPhone,
	FiMapPin,
} from 'react-icons/fi'

export default function Footer() {
	return (
		<footer className='bg-clay-600 text-clay-200 mt-10'>
			<div className='max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
				{/* Brand */}
				<div>
					<div className='flex items-center gap-2 mb-4'>
						<div className='w-7 h-7 bg-clay-500 rounded-md grid grid-cols-2 gap-0.5 p-1'>
							<div className='bg-white rounded-sm' />
							<div className='bg-white/60 rounded-sm' />
							<div className='bg-white/60 rounded-sm' />
							<div className='bg-white rounded-sm' />
						</div>
						<span className='font-display font-bold text-white'>
							Tiles Gallery
						</span>
					</div>
					<p className='text-white text-sm leading-relaxed'>
						Curating the world&apos;s finest tiles for homeowners, designers,
						and architects.
					</p>
					{/* Social links */}
					<div className='flex gap-3 mt-5'>
						{[
							{
								href: 'https://instagram.com',
								Icon: FiInstagram,
								label: 'Instagram',
							},
							{
								href: 'https://twitter.com',
								Icon: FiTwitter,
								label: 'Twitter',
							},
							{
								href: 'https://facebook.com',
								Icon: FiFacebook,
								label: 'Facebook',
							},
						].map(({ href, Icon, label }) => (
							<a
								key={label}
								href={href}
								target='_blank'
								rel='noopener noreferrer'
								aria-label={label}
								className='w-8 h-8 bg-clay-800 rounded-full flex items-center justify-center hover:bg-clay-600 transition-colors'
							>
								<Icon size={14} />
							</a>
						))}
					</div>
				</div>

				{/* Quick Links */}
				<div>
					<h4 className='font-display font-semibold text-white mb-4'>
						Explore
					</h4>
					<ul className='space-y-2 text-sm'>
						{['/', '/all-tiles', '/login', '/register', '/my-profile'].map(
							(href) => (
								<li key={href}>
									<Link
										href={href}
										className='text-white hover:text-black transition-colors capitalize'
									>
										{href === '/'
											? 'Home'
											: href.replace('/', '').replace('-', ' ')}
									</Link>
								</li>
							),
						)}
					</ul>
				</div>

				{/* Categories */}
				<div>
					<h4 className='font-display font-semibold text-white  mb-4'>
						Categories
					</h4>
					<ul className='space-y-2 text-sm   '>
						{[
							'Ceramic',
							'Marble',
							'Terracotta',
							'Mosaic',
							'Zellige',
							'Hexagon',
						].map((c) => (
							<li
								key={c}
								className='text-white hover:text-black transition-colors capitalize cursor-pointer'
							>
								{c}
							</li>
						))}
					</ul>
				</div>

				{/* Contact Us */}
				<div>
					<h4 className='font-display font-semibold text-white mb-4'>
						Contact Us
					</h4>
					<ul className='space-y-3 text-sm text-white '>
						<li className='flex items-start gap-2'>
							<FiMail size={14} className='mt-0.5 shrink-0' />
							<a
								href='mailto:hello@tilesgallery.com'
								className='hover:text-clay-100'
							>
								hello@tilesgallery.com
							</a>
						</li>
						<li className='flex items-start gap-2'>
							<FiPhone size={14} className='mt-0.5 shrink-0' />
							<span>+1 (555) 234-5678</span>
						</li>
						<li className='flex items-start gap-2'>
							<FiMapPin size={14} className='mt-0.5 shrink-0' />
							<span>123 Design District, San Francisco, CA</span>
						</li>
					</ul>
				</div>
			</div>

			{/* Bottom bar */}
			<div className='border-t border-clay-800 py-4 px-4'>
				<p className='text-center text-white  text-xs'>
					© {new Date().getFullYear()} Tiles Gallery. All rights reserved. Made
					with love for design lovers.
				</p>
			</div>
		</footer>
	)
}