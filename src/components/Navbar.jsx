'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from '@/lib/auth-client'
import toast from 'react-hot-toast'
import { FiMenu, FiX, FiLogOut, FiUser, FiGrid } from 'react-icons/fi'

const LINKS = [
	{ href: '/', label: 'Home' },
	{ href: '/all-tiles', label: 'All Tiles' },
	{ href: '/my-profile', label: 'My Profile' },
]

export default function Navbar() {
	const pathname = usePathname()
	const { data: session, isPending } = useSession()
	const [open, setOpen] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => setMounted(true), [])
	useEffect(() => setOpen(false), [pathname])

	const handleLogout = async () => {
		await signOut()
		toast.success('Logged out')
		setOpen(false)
	}

	return (
		<nav className='sticky top-0 z-50 border-b border-clay-100/80 bg-white/90 backdrop-blur-xl'>
			<div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4'>
				<Link href='/' className='flex shrink-0 items-center gap-3'>
					<div className='grid h-9 w-9 grid-cols-2 gap-0.5 rounded-lg bg-clay-700 p-1.5 shadow-sm'>
						<div className='rounded-sm bg-clay-50' />
						<div className='rounded-sm bg-clay-300' />
						<div className='rounded-sm bg-clay-300' />
						<div className='rounded-sm bg-clay-50' />
					</div>
					<div className='hidden leading-tight sm:block'>
						<span className='block font-display text-lg font-bold text-clay-900'>Tiles Gallery</span>
						<span className='block text-[11px] font-medium uppercase tracking-widest text-clay-500'>Curated surfaces</span>
					</div>
				</Link>

				<ul className='hidden items-center gap-1 rounded-lg border border-clay-100 bg-clay-50/70 p-1 md:flex'>
					{LINKS.map(({ href, label }) => {
						const active = pathname === href
						return (
							<li key={href}>
								<Link
									href={href}
									className={`block rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${
										active ? 'bg-white text-clay-800 shadow-sm' : 'text-gray-500 hover:text-clay-700'
									}`}
								>
									{label}
								</Link>
							</li>
						)
					})}
				</ul>

				<div className='hidden items-center gap-3 md:flex'>
					{!mounted || isPending ? (
						<div className='h-9 w-9 animate-pulse rounded-full bg-clay-100' />
					) : session ? (
						<div className='dropdown dropdown-end'>
							<label tabIndex={0} className='cursor-pointer'>
								<div className='flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-clay-700 text-sm font-bold text-white ring-2 ring-clay-100 transition-all hover:ring-clay-300'>
									{session.user?.image ? (
										<img src={session.user.image} alt='avatar' className='h-full w-full object-cover' />
									) : (
										session.user?.name?.[0]?.toUpperCase() || 'U'
									)}
								</div>
							</label>

							<ul tabIndex={0} className='dropdown-content menu mt-3 w-52 gap-1 rounded-lg border border-clay-100 bg-white p-2 shadow-xl'>
								<li>
									<Link href='/my-profile' className='rounded-md text-sm text-gray-700 hover:bg-clay-50'>
										<FiUser size={14} /> My Profile
									</Link>
								</li>
								<li>
									<Link href='/all-tiles' className='rounded-md text-sm text-gray-700 hover:bg-clay-50'>
										<FiGrid size={14} /> All Tiles
									</Link>
								</li>
								<div className='my-1 h-px bg-clay-100' />
								<li>
									<button onClick={handleLogout} className='rounded-md text-sm text-red-500 hover:bg-red-50'>
										<FiLogOut size={14} /> Logout
									</button>
								</li>
							</ul>
						</div>
					) : (
						<Link href='/login' className='rounded-lg bg-clay-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-clay-800'>
							Login
						</Link>
					)}
				</div>

				<button className='rounded-lg border border-clay-100 p-2 text-clay-700 md:hidden' onClick={() => setOpen(!open)} aria-label='Toggle menu'>
					{open ? <FiX size={20} /> : <FiMenu size={20} />}
				</button>
			</div>

			{open && (
				<div className='border-t border-clay-100 bg-white px-4 py-4 md:hidden'>
					<div className='space-y-1'>
						{LINKS.map(({ href, label }) => (
							<Link key={href} href={href} className={`block rounded-md px-3 py-2 text-sm font-semibold ${pathname === href ? 'bg-clay-50 text-clay-700' : 'text-gray-600'}`}>
								{label}
							</Link>
						))}
					</div>
					<div className='mt-3 border-t border-clay-100 pt-3'>
						{session ? (
							<button onClick={handleLogout} className='rounded-md px-3 py-2 text-sm font-semibold text-red-500'>Logout</button>
						) : (
							<Link href='/login' className='block rounded-md bg-clay-700 px-3 py-2 text-center text-sm font-semibold text-white'>Login</Link>
						)}
					</div>
				</div>
			)}
		</nav>
	)
}
