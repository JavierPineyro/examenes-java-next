import Card from '@/components/Cards/card'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { ROL } from '@/lib/utils'
import { api } from '@/lib/api'

export default async function ListOfExamns({ categoryId }) {
  const session = await getServerSession(options)
  const { token, roles } = session?.user
  let exams = []

  const data = await api.exam.getExamnsByCategoryId({ token, id: categoryId })

  if (roles === ROL.USER) {
    exams = data.filter(exam => exam.activo === true)
  }
  if (roles === ROL.ADMIN) {
    exams = data
  }

  return (
    <div>
      {
        exams.length > 0
          ? <ListExams roles={roles} exams={exams} />
          : <div className='text-lg mt-12 text-gray-500 w-full text-center'>No hay exámenes para esta categoría</div>
      }
    </div>
  )
}

function ListExams({ exams, roles }) {
  return (
    <div className='grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-3'>
      {exams.map((exam) => <Card roles={roles} key={exam.id} info={exam} />)}
    </div>
  )
}
