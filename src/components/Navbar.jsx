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

	// ✅ Prevent hydration mismatch
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	const handleLogout = async () => {
		await signOut()
		toast.success('Logged out!')
		setOpen(false)
	}

	return (
		<nav className='sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-clay-100 shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
				{/* ── Logo ── */}
				<Link href='/' className='flex items-center gap-2 shrink-0'>
					<div className='w-8 h-8 bg-clay-500 rounded-lg grid grid-cols-2 gap-0.5 p-1.5'>
						<div className='bg-white rounded-sm' />
						<div className='bg-white/60 rounded-sm' />
						<div className='bg-white/60 rounded-sm' />
						<div className='bg-white rounded-sm' />
					</div>
					<span className='font-display font-bold text-lg text-clay-800 hidden sm:block'>
						Tiles Gallery
					</span>
				</Link>

				{/* ── Desktop Nav Links ── */}
				<ul className='hidden md:flex items-center gap-6'>
					{LINKS.map(({ href, label }) => (
						<li key={href}>
							<Link
								href={href}
								className={`text-sm font-medium transition-colors pb-0.5 ${
									pathname === href
										? 'text-clay-600 border-b-2 border-clay-500'
										: 'text-gray-500 hover:text-clay-600'
								}`}
							>
								{label}
							</Link>
						</li>
					))}
				</ul>

				{/* ── Auth Controls ── */}
				<div className='hidden md:flex items-center gap-3'>
					{/* ⛔ Prevent mismatch until mounted */}
					{!mounted ? (
						<div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse' />
					) : isPending ? (
						<div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse' />
					) : session ? (
						<div className='dropdown dropdown-end'>
							<label tabIndex={0} className='cursor-pointer'>
								<div className='w-9 h-9 rounded-full bg-clay-500 flex items-center justify-center text-white font-semibold text-sm ring-2 ring-clay-200 hover:ring-clay-400 transition-all overflow-hidden'>
									{session.user?.image ? (
										<img
											src={session.user.image}
											alt='avatar'
											className='w-full h-full object-cover'
										/>
									) : (
										session.user?.name?.[0]?.toUpperCase() || 'U'
									)}
								</div>
							</label>

							<ul
								tabIndex={0}
								className='dropdown-content menu bg-white border border-clay-100 shadow-lg rounded-2xl p-2 w-48 mt-2 gap-1'
							>
								<li>
									<Link
										href='/my-profile'
										className='text-sm text-gray-700 hover:bg-clay-50 rounded-xl'
									>
										<FiUser size={14} /> My Profile
									</Link>
								</li>
								<li>
									<Link
										href='/all-tiles'
										className='text-sm text-gray-700 hover:bg-clay-50 rounded-xl'
									>
										<FiGrid size={14} /> All Tiles
									</Link>
								</li>

								<div className='h-px bg-clay-100 my-1' />

								<li>
									<button
										onClick={handleLogout}
										className='text-sm text-red-500 hover:bg-red-50 rounded-xl'
									>
										<FiLogOut size={14} /> Logout
									</button>
								</li>
							</ul>
						</div>
					) : (
						<Link
							href='/login'
							className='btn btn-sm bg-clay-500 hover:bg-clay-600 text-white border-none rounded-xl font-medium'
						>
							Login
						</Link>
					)}
				</div>

				{/* ── Mobile Toggle ── */}
				<button
					className='md:hidden text-clay-600 p-1'
					onClick={() => setOpen(!open)}
					aria-label='Toggle menu'
				>
					{open ? <FiX size={22} /> : <FiMenu size={22} />}
				</button>
			</div>

			{/* ── Mobile Menu ── */}
			{open && (
				<div className='md:hidden bg-white border-t border-clay-100 px-4 pb-6 pt-3 space-y-2'>
					{LINKS.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							onClick={() => setOpen(false)}
							className={`block py-2 text-base font-medium ${
								pathname === href ? 'text-clay-600' : 'text-gray-600'
							}`}
						>
							{label}
						</Link>
					))}

					<div className='pt-2 border-t border-clay-100'>
						{session ? (
							<button
								onClick={handleLogout}
								className='text-red-500 text-base font-medium py-2'
							>
								Logout
							</button>
						) : (
							<Link
								href='/login'
								onClick={() => setOpen(false)}
								className='block py-2 text-clay-600 font-semibold'
							>
								Login
							</Link>
						)}
					</div>
				</div>
			)}
		</nav>
	)
}