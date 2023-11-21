import CardClient from './card-clients'

export default async function ListOfCardsServer() {
  return (
    <div className='w-full p-3 grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-3'>
      {
        Array.from({ length: 10 }).map((_, i) => <CardClient key={i} />)
      }
    </div>
  )
}
