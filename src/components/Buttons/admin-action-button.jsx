import { deleteCategory } from '@/lib/actions'
import { ROL } from '@/lib/utils'

export default function ActionButtons({ role, token, categoryId }) {
  const deleteCategoryWithId = deleteCategory.bind(null, { id: categoryId, token })
  return (
    <>
      {
        role === ROL.ADMIN && (
          <>
            <form action={deleteCategoryWithId}>
              <button type='submit' className='px-2 w-40 py-3 rounded-md text-center bg-red-400'>Eliminar</button>
            </form>
            <button type='submit' className='px-2 w-40 py-3 rounded-md text-center bg-amber-600'>Editar</button>
          </>
        )
      }
    </>
  )
}
