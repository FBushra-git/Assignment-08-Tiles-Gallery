import Marquee from 'react-fast-marquee'

const MARQUEE_ITEMS = [
	'New Arrivals: Aegean Blue Ceramic',
	'Weekly Feature: Modern Geometric Patterns',
	'Join the Community of Tile Enthusiasts',
	'Moroccan Zellige Now In Stock',
	'Free Shipping on Orders Over $200',
	'New: Calacatta Gold Marble',
	'Explore 500+ Premium Tile Designs',
]

const Brands = () => {
	return (
		<div className='marquee-strip'>
			<Marquee speed={55} gradient={false} pauseOnHover={true}>
				{MARQUEE_ITEMS.map((t, i) => (
					<span key={i} className='mx-8'>
						{t} <span className='text-clay-300 mx-4'>◆</span>
					</span>
				))}
			</Marquee>
		</div>
	)
}

export default Brands