import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { api } from '@/lib/api'
import Card from '@/components/Cards/card'

export default async function CategorySection() {
  const session = await getServerSession(options)

  const categories = await api.category.getAll({ token: session?.user?.token })

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
