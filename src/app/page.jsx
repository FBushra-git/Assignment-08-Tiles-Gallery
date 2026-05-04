'use client'
import Slider from '@/components/Home/Slider'
import Brands from '@/components/Home/Brands'
import CTA from '@/components/Home/CTA'
import Featured from '@/components/Home/Featured'

const HomePage = () => {
	return (
		<div>
			<Slider />
			<Brands />
			<Featured />
			<CTA />
		</div>
	)
}

export default HomePage
