import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { api } from '@/lib/api'
import NoResults from '@/components/Cards/no-results'
import ExamItem from './exam-item'

export default async function ExamenSection({ query = '' }) {
  const session = await getServerSession(options)
  const token = session?.user?.token
  const exams = await api.exam.search({ token, query })

  return (
    <div className='px-4'>
      {
        exams.length > 0
          ? <ExamList exams={exams} />
          : <NoResults>No hay resultados</NoResults>
      }
    </div>
  )
}

function ExamList({ exams }) {
  return (
    <>
      {
        exams.map(exam => (<ExamItem exam={exam} key={exam.id} />))
      }
    </>
  )
}
