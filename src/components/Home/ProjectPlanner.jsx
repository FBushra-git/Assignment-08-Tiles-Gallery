import Link from 'next/link'
import { FiArrowRight, FiCheckCircle, FiClipboard, FiGrid, FiPackage, FiUserCheck } from 'react-icons/fi'

const STEPS = [
	{
		Icon: FiGrid,
		title: 'Compare by surface',
		copy: 'Scan material, dimensions, rating, and category in a clean product grid before opening details.',
	},
	{
		Icon: FiUserCheck,
		title: 'Unlock protected notes',
		copy: 'Sign in to view full tile specifications, creator information, tags, and sample actions.',
	},
	{
		Icon: FiPackage,
		title: 'Request with confidence',
		copy: 'Use stock status and price details to decide which sample belongs in your shortlist.',
	},
]

const SWATCHES = [
	{ label: 'Aegean', color: 'bg-blue-700' },
	{ label: 'Calacatta', color: 'bg-stone-100' },
	{ label: 'Terracotta', color: 'bg-orange-700' },
	{ label: 'Zellige', color: 'bg-emerald-700' },
	{ label: 'Basalt', color: 'bg-zinc-800' },
	{ label: 'Pearl', color: 'bg-slate-50' },
]

export default function ProjectPlanner() {
	return (
		<section className='bg-[#fffaf5] py-20'>
			<div className='mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center'>
				<div className='rounded-lg border border-clay-100 bg-white p-5 shadow-sm sm:p-7'>
					<div className='mb-6 flex items-center justify-between gap-4'>
						<div>
							<p className='mb-2 text-xs font-bold uppercase tracking-[0.22em] text-clay-500'>Project Planner</p>
							<h2 className='font-display text-4xl font-bold leading-tight text-clay-900'>Build a sample shortlist in minutes.</h2>
						</div>
						<div className='hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-clay-100 text-clay-800 sm:flex'>
							<FiClipboard size={22} />
						</div>
					</div>

					<div className='space-y-3'>
						{STEPS.map(({ Icon, title, copy }, index) => (
							<div key={title} className='grid grid-cols-[auto_1fr] gap-4 rounded-lg border border-clay-100 bg-clay-50 p-4'>
								<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-white text-clay-700 shadow-sm'>
									<Icon size={18} />
								</div>
								<div>
									<div className='flex items-center gap-2'>
										<span className='text-xs font-bold uppercase tracking-widest text-clay-500'>0{index + 1}</span>
										<FiCheckCircle size={14} className='text-green-600' />
									</div>
									<h3 className='mt-1 font-display text-xl font-bold text-clay-900'>{title}</h3>
									<p className='mt-1 text-sm leading-6 text-gray-500'>{copy}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='relative overflow-hidden rounded-lg border border-clay-100 bg-clay-900 p-5 text-white shadow-sm sm:p-7'>
					<div className='absolute right-0 top-0 h-32 w-32 bg-clay-500/20 blur-3xl' />
					<div className='relative'>
						<p className='mb-2 text-xs font-bold uppercase tracking-[0.22em] text-clay-200'>Sample Tray</p>
						<h3 className='font-display text-3xl font-bold leading-tight'>Color, finish, and pattern stay side by side.</h3>
						<p className='mt-3 text-sm leading-7 text-clay-50'>Use the collection as a visual board before committing to one direction. The catalog already groups each tile with tags, rating, size, and material.</p>

						<div className='mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3'>
							{SWATCHES.map(({ label, color }) => (
								<div key={label} className='rounded-lg border border-white/10 bg-white/10 p-3 backdrop-blur'>
									<div className={`mb-3 h-20 rounded-md border border-white/20 ${color}`} />
									<p className='text-sm font-bold'>{label}</p>
								</div>
							))}
						</div>

						<Link href='/all-tiles' className='mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-clay-900 transition-colors hover:bg-clay-50'>
							Start Shortlist <FiArrowRight size={15} />
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
