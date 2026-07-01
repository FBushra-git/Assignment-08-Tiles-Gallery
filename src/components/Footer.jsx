import Link from 'next/link'
import { FiFacebook, FiInstagram, FiMail, FiMapPin, FiPhone, FiTwitter } from 'react-icons/fi'

export default function Footer() {
	return (
		<footer className='border-t border-clay-900 bg-clay-900 text-white'>
			<div className='mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4'>
				<div>
					<div className='mb-4 flex items-center gap-3'>
						<div className='grid h-8 w-8 grid-cols-2 gap-0.5 rounded-lg bg-clay-200 p-1.5'>
							<div className='rounded-sm bg-clay-900' />
							<div className='rounded-sm bg-clay-500' />
							<div className='rounded-sm bg-clay-500' />
							<div className='rounded-sm bg-clay-900' />
						</div>
						<span className='font-display text-lg font-bold text-white'>Tiles Gallery</span>
					</div>
					<p className='text-sm leading-7 text-clay-50'>Curated tile surfaces for homeowners, designers, and architects comparing material, texture, and finish.</p>
					<div className='mt-5 flex gap-2'>
						{[
							{ href: 'https://instagram.com', Icon: FiInstagram, label: 'Instagram' },
							{ href: 'https://twitter.com', Icon: FiTwitter, label: 'Twitter' },
							{ href: 'https://facebook.com', Icon: FiFacebook, label: 'Facebook' },
						].map(({ href, Icon, label }) => (
							<a key={label} href={href} target='_blank' rel='noopener noreferrer' aria-label={label} className='flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white transition-colors hover:bg-white/10'>
								<Icon size={15} />
							</a>
						))}
					</div>
				</div>

				<div>
					<h4 className='mb-4 text-xs font-bold uppercase tracking-[0.22em] text-clay-300'>Explore</h4>
					<ul className='space-y-2 text-sm'>
						{[
							['/', 'Home'],
							['/all-tiles', 'All Tiles'],
							['/login', 'Login'],
							['/register', 'Register'],
							['/my-profile', 'My Profile'],
						].map(([href, label]) => (
							<li key={href}><Link href={href} className='text-clay-50 transition-colors hover:text-white'>{label}</Link></li>
						))}
					</ul>
				</div>

				<div>
					<h4 className='mb-4 text-xs font-bold uppercase tracking-[0.22em] text-clay-300'>Categories</h4>
					<ul className='space-y-2 text-sm text-clay-50'>
						{['Ceramic', 'Marble', 'Terracotta', 'Mosaic', 'Zellige', 'Hexagon'].map((category) => <li key={category}>{category}</li>)}
					</ul>
				</div>

				<div>
					<h4 className='mb-4 text-xs font-bold uppercase tracking-[0.22em] text-clay-300'>Contact</h4>
					<ul className='space-y-3 text-sm text-clay-50'>
						<li className='flex items-start gap-2'><FiMail size={15} className='mt-0.5 shrink-0 text-clay-300' /><a href='mailto:hello@tilesgallery.com' className='hover:text-white'>hello@tilesgallery.com</a></li>
						<li className='flex items-start gap-2'><FiPhone size={15} className='mt-0.5 shrink-0 text-clay-300' /><span>+1 (555) 234-5678</span></li>
						<li className='flex items-start gap-2'><FiMapPin size={15} className='mt-0.5 shrink-0 text-clay-300' /><span>123 Design District, San Francisco, CA</span></li>
					</ul>
				</div>
			</div>

			<div className='border-t border-white/10 px-4 py-4'>
				<p className='text-center text-xs text-clay-100'>Copyright {new Date().getFullYear()} Tiles Gallery. All rights reserved.</p>
			</div>
		</footer>
	)
}

