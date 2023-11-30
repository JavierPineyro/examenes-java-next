import { options } from '@/app/api/auth/[...nextauth]/options'
import FormResolve from '@/components/Forms/resolve-exam'
import Title from '@/components/Title/title'
import { resolveAction } from '@/lib/actions'
import { api } from '@/lib/api'
import { getServerSession } from 'next-auth'

export default async function EmpezarPage({ params }) {
  const { id } = params
  const session = await getServerSession(options)
  const token = session?.user?.token
  const questions = await api.question.getQuestionsOfExam({ token, id })

  const resolveActionWithExamId = resolveAction.bind(null, { token, examId: id })

  return (
    <div className='container px-96'>
      <Title className='mb-2'>Cuestionario en curso</Title>
      <FormResolve resolveAction={resolveActionWithExamId} questions={questions} />
    </div>
  )
}
