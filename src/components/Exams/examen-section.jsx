import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { api } from '@/lib/api'
import NoResults from '@/components/Cards/no-results'
import ExamItem from './exam-item'
import { ROL } from '@/lib/utils'

export default async function ExamenSection({ query = '' }) {
  const session = await getServerSession(options)

  const token = session?.user?.token
  const roles = session?.user?.roles
  let exams = []

  const data = await api.exam.search({ token, query })
  if (roles === ROL.USER && data) {
    exams = data.filter(exam => exam.activo === true)
  }

  if (roles === ROL.ADMIN && data) {
    exams = data
  }

  return (
    <div className='px-4'>
      {
        exams.length > 0
          ? <ExamList token={token} exams={exams} />
          : <NoResults>No hay resultados</NoResults>
      }
    </div>
  )
}

async function ExamList({ exams, token }) {
  const categories = await api.category.getAll({ token })

  return (
    <>
      {
        exams.map(exam => (<ExamItem categories={categories} exam={exam} key={exam.id} />))
      }
    </>
  )
}
