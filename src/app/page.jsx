'use client'
import Slider from '@/components/Home/Slider'
import Brands from '@/components/Home/Brands'
import CTA from '@/components/Home/CTA'
import Featured from '@/components/Home/Featured'
import MaterialStudio from '@/components/Home/MaterialStudio'
import ProjectPlanner from '@/components/Home/ProjectPlanner'

const HomePage = () => {
	return (
		<div>
			<Slider />
			<Brands />
			<MaterialStudio />
			<Featured />
			<ProjectPlanner />
			<CTA />
		</div>
	)
}

export default HomePage

