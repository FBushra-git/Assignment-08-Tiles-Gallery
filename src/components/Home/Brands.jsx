import Marquee from 'react-fast-marquee'

const MARQUEE_ITEMS = [
	'New Arrivals: Aegean Blue Ceramic',
	'Weekly Feature: Modern Geometric Patterns',
	'Moroccan Zellige Now In Stock',
	'Free Shipping on Orders Over $200',
	'New: Calacatta Gold Marble',
	'Explore 500+ Premium Tile Designs',
]

const Brands = () => {
	return (
		<div className='marquee-strip'>
			<Marquee speed={50} gradient={false} pauseOnHover>
				{MARQUEE_ITEMS.map((text) => (
					<span key={text} className='mx-8 inline-flex items-center gap-6'>
						{text}
						<span className='h-1.5 w-1.5 rounded-full bg-clay-300' />
					</span>
				))}
			</Marquee>
		</div>
	)
}

export default Brands
