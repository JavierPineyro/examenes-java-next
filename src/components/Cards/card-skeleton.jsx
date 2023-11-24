export default function CardSkeleton() {
  return (
    <div className='flex gap-2 sm:columns-3'>
      <div className='w-full h-[160px] bg-gray-300 animate-pulse rounded-md' />
      <div className='w-full h-[160px] bg-gray-300 animate-pulse rounded-md' />
      <div className='w-full h-[160px] bg-gray-300 animate-pulse rounded-md' />
    </div>
  )
}
