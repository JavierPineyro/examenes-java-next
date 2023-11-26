import Card from '@/components/Cards/card'

export default function ListOfCategories({ categories }) {
  return (
    <div className='grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-3'>
      {
        categories.map(category => {
          return (
            <Card info={category} key={category.id} />
          )
        })
      }
    </div>
  )
}
