import Card from '@/components/Cards/card'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { ROL } from '@/lib/utils'

export default async function ListOfExamns({ categoryId }) {
  const session = await getServerSession(options)
  const { token, roles } = session?.user
  const exams = []

  if (roles === ROL.ADMIN) {
    // exams = await api.examen.getExamsByCategoryId({token, categoryId})
  } else {
    // exams = await api.examen.getEnabledExamsByCategoryId({token, categoryId})
  }

  return (
    <div>
      {
        exams.length > 0
          ? exams.map((exam) => {
            return (
              <div key={exam.id} className='grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-3'>
                <Card info={exam} />
              </div>
            )
          })
          : <div className='text-lg mt-12 text-gray-500 w-full text-center'>No hay exámenes para esta categoría</div>
      }
    </div>
  )
}
