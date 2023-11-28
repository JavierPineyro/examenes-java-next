import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import Main from '@/components/Container/main'
import ListOfExamns from '@/components/Exams/list-of-examns'
import { api } from '@/lib/api'
import { Suspense } from 'react'
import CardSkeleton from '@/components/Cards/card-skeleton'
import ActionButtons from '@/components/Buttons/admin-action-button'

export default async function CategoryViewPage({ params }) {
  const { id } = params
  const session = await getServerSession(options)
  const { token, roles } = session?.user
  const category = await api.category.getById({ token, id })

  return (
    <Main>
      <section className='flex grow-0 mb-6 pr-8'>
        <div className='grow'>
          <h1 className='text-5xl font-semibold mb-4'>{category.titulo}</h1>
          <p className='text-xl text-gray-500'>{category.descripcion}</p>
        </div>
        <div className='flex grow-0 gap-1 flex-col items-end justify-center'>
          <ActionButtons categoryId={id} token={token} role={roles} />
        </div>
      </section>
      <section className=''>
        <h3 className='grow text-lg mb-3 font-semibold'>Exámenes de {category.titulo}</h3>

        <Suspense fallback={<CardSkeleton />}>
          <ListOfExamns categoryId={id} />
        </Suspense>
      </section>
    </Main>
  )
}
