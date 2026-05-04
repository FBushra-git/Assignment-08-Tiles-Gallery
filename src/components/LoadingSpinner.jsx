export default function LoadingSpinner({ message = 'Loading...' }) {
	return (
		<div className='flex flex-col items-center justify-center gap-4 py-20'>
			<div className='w-10 h-10 border-4 border-clay-200 border-t-clay-500 rounded-full animate-spin' />
			<p className='text-clay-400 text-sm font-medium'>{message}</p>
		</div>
	)
}