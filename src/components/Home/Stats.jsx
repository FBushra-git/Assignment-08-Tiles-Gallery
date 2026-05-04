import { FiPackage, FiStar, FiAward } from 'react-icons/fi'

const STATS = [
	{ Icon: FiPackage, value: '500+', label: 'Tile Designs' },
	{ Icon: FiStar, value: '4.8★', label: 'Avg Rating' },
	{ Icon: FiAward, value: '12', label: 'Award Winners' },
]

const Stats = () => {
	return (
		<section className='bg-white border-b border-clay-100'>
			<div className='max-w-7xl mx-auto px-4 py-8'>
				<div className='grid grid-cols-3 divide-x divide-clay-100'>
					{STATS.map(({ Icon, value, label }) => (
						<div
							key={label}
							className='flex flex-col items-center gap-1 text-center px-4'
						>
							<Icon size={20} className='text-clay-400' />
							<span className='font-display font-bold text-2xl text-clay-800'>
								{value}
							</span>
							<span className='text-xs text-gray-400 uppercase tracking-wider'>
								{label}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Stats