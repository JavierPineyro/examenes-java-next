import { options } from '@/app/api/auth/[...nextauth]/options'
import NoResults from '@/components/Cards/no-results'
import Main from '@/components/Container/main'
import CreateQuestionModal from '@/components/Modal/create-question'
import Title from '@/components/Title/title'
import { createQuestion } from '@/lib/actions'
import { api } from '@/lib/api'
import { getServerSession } from 'next-auth'

// give a question and answer to a java quiz game
// {
//   question: '¿Cuál es la sintaxis correcta para declarar una variable nombre en Java?',
//   option1: 'var nombre;',
//   option2: 'variable nombre;',
//   option3: 'let nombre',
//   option4: 'String nombre',
// }

export default async function ExamenDetailPage({ params }) {
  const session = await getServerSession(options)
  const { id } = params
  const token = session?.user?.token

  const exam = await api.exam.getExamenById({ token, id })
  const questions = await api.question.getQuestionsOfExam({ token, id })

  const createAction = createQuestion.bind(null, { token, id: exam.id })

  return (
    <Main className='w-full p-2 '>
      <div className='flex justify-between px-4'>
        <Title>{exam.titulo}</Title>
        <CreateQuestionModal createAction={createAction} />
      </div>
      <section className='p-4 flex flex-col gap-6'>
        {
          questions.map((question, index) => {
            return (
              <div key={question.id} className='p-2 shadow-md rounded-md bg-gray-200/60'>
                <header className='flex text-lg items-center gap-2'>
                  <span className='font-bold pr-4'>{index + 1})</span>
                  <span>{question.contenido}</span>
                </header>
                <div className='columns-2 p-5 tex-md'>
                  <p className='mb-1'>A)<span className='font-bold'> {question.opcion1}</span></p>
                  <p className='mb-1'>B)<span className='font-bold'> {question.opcion2}</span></p>
                  <p className='mb-1'>C)<span className='font-bold'> {question.opcion3}</span></p>
                  <p className='mb-1'>D)<span className='font-bold'> {question.opcion4}</span></p>
                </div>
                <hr className='h-px my-3 bg-gray-300 border-0 dark:bg-gray-700' />
                <div className='flex items-center w-full '>
                  <p className='grow text-lg'>Respuesta: <span className='font-bold text-blue-700'>{question.respuesta}</span>
                  </p>
                  <div className='flex gap-1 pr-5'>
                    <button className='bg-red-500 text-white px-4 py-2 rounded-md'>Eliminar</button>
                    <button className='bg-green-500 text-white px-4 py-2 rounded-md'>Actualizar</button>
                  </div>
                </div>
              </div>
            )
          })
        }
        {
          (questions?.length === 0) && <NoResults>No hay preguntas</NoResults>
        }
      </section>
    </Main>
  )
}
