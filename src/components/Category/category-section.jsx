import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { api } from '@/lib/api'
import NoResults from '@/components/Cards/no-results'
import ListOfCategories from '@/components/Category/list-of-categories'

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
    <>
      {
        categories.length > 0
          ? <ListOfCategories categories={categories} />
          : <NoResults>No hay resultados</NoResults>
      }
    </>
  )
}
