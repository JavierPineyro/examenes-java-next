import { options } from '@/app/api/auth/[...nextauth]/options'
import NoResults from '@/components/Cards/no-results'
import Main from '@/components/Container/main'
import CreateQuestionModal from '@/components/Modal/create-question'
import QuestionItem from '@/components/Question/question.item'
import Title from '@/components/Title/title'
import { createQuestion } from '@/lib/actions'
import { api } from '@/lib/api'
import { getServerSession } from 'next-auth'

export default async function ExamenDetailPage({ params, searchParams }) {
  const session = await getServerSession(options)
  const { id } = params
  const token = session?.user?.token
  let isErrorApi = false
  let messageErrorApi = ''
  let exam = {}
  let questions = []

  try {
    exam = await api.exam.getExamenById({ token, id })
    questions = await api.question.getQuestionsOfExam({ token, id })
  } catch (error) {
    console.log(error)
    messageErrorApi = error.message || 'No se pudo crear la pregunta'
    isErrorApi = true
  }

  const createAction = createQuestion.bind(null, { token, id: exam.id })

  return (
    <Main className='w-full p-2'>
      {
        isErrorApi && <NoResults>{messageErrorApi}</NoResults>
      }
      <div className='flex justify-between px-4'>
        <Title>{exam.titulo}</Title>
        {
          questions?.length < Number(exam.numeroDePreguntas) && <CreateQuestionModal createAction={createAction} />
        }
      </div>
      <section className='p-4 flex flex-col gap-6'>
        {
          questions.map((question, index) => <QuestionItem examId={exam.id} key={question.id} token={token} question={question} num={index + 1} />)
        }
        {
          (questions?.length === 0) && <NoResults>No hay preguntas</NoResults>
        }
      </section>
    </Main>
  )
}
