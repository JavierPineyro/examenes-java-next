import { api } from '@/lib/api'
import { ROL } from '@/lib/utils'
import CreateExamModal from '@/components/Modal/create-exam'
import { createExam } from '@/lib/actions'

export default async function CreateExamButton({ token, roles }) {
  const categories = await api.category.getAll({ token })
  const createExamWithToken = createExam.bind(null, { token })

  return (
    <>
      {
        roles === ROL.ADMIN && <CreateExamModal createAction={createExamWithToken} categories={categories} />
      }
    </>
  )
}
