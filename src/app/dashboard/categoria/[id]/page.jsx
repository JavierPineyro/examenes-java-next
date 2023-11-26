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

  // Tengo que añadir la funcionalidad de editar, puedo hacer que los botones lo lleven a una pagina con el formulario igual que en "/create", en eliminar puede ir a una pagina donde le advierta lo que pasa si elimminas una categoria y que tenga que confirmarlo para hacerlo

  // en la pagina del dashboard uso el mismmo ListOfCategories y no se si deba usar el mismo y poner la logica de que solo agarre 3 examenes activos como ejemplo, nose, tengo que ver eso (DONE HALF)

  // Poner Try catch en los actions so i dont start writing tons of IF's

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
      <section className='flex flex-col gap-3 grow'>
        <h3 className='text-lg font-semibold'>Exámenes de {category.titulo}</h3>
        <Suspense fallback={<CardSkeleton />}>
          <ListOfExamns categoryId={id} />
        </Suspense>
      </section>
    </Main>
  )
}
