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
          </>
        )
      }
    </>
  )
}
