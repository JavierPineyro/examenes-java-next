import { deleteCategory, updateCategory } from '@/lib/actions'
import { ROL } from '@/lib/utils'
import ModalDelete from '../Modal/delete-modal'
import { api } from '@/lib/api'
import ModalUpdate from '../Modal/update-modal'

export default async function ActionButtons({ role, token, categoryId }) {
  const deleteCategoryWithId = deleteCategory.bind(null, { id: categoryId, token })
  const updateCategoryWithId = updateCategory.bind(null, { id: categoryId, token })

  const category = await api.category.getById({ token, id: categoryId })

  return (
    <>
      {
        role === ROL.ADMIN && (
          <>
            <ModalDelete deleteAction={deleteCategoryWithId} />
            <ModalUpdate updateAction={updateCategoryWithId} category={category} />
            {/* <button className='grow-0 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3.5 py-2.5  mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Agregar exámen</button> */}
          </>
        )
      }
    </>
  )
}
