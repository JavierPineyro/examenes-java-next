import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { api } from '@/lib/api'
import Card from '@/components/Cards/card'

export default async function CategorySection({ query = '', pathname = '' }) {
  const session = await getServerSession(options)
  let categories = []

  if (!query && pathname === 'dashboard') {
    const data = await api.category.getAll({ token: session?.user?.token })
    categories = data.length > 3 ? data.slice(0, 3) : data
  } else {
    categories = await api.category.search({ token: session?.user?.token, query })
  }

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
