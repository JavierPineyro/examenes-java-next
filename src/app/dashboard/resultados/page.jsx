import { options } from '@/app/api/auth/[...nextauth]/options'
import Main from '@/components/Container/main'
import QuestionItem from '@/components/Question/question.item'
import Title from '@/components/Title/title'
import { api } from '@/lib/api'
import { getServerSession } from 'next-auth'

export default async function ResultsPage({ searchParams }) {
  const respuestasCorrectas = searchParams.respuestasCorrectas || ''
  const puntos = searchParams.puntos || ''
  let message = searchParams.message || ''
  const idExam = searchParams.exam || ''
  const id = Number(idExam)

  const session = await getServerSession(options)
  const token = session?.user?.token
  let questions = []
  try {
    if (id) {
      questions = await api.question.getQuestionsOfExam({ token, id })
    } else {
      message = 'No se pudo obtener el examen, intentelo mas tarde'
    }
  } catch (error) {
    console.error(error)
    message = 'No se pudo obtener las preguntas del examen, intentelo mas tarde'
  }

  return (
    <Main>
      <div className='w-full p-6 mb-8 bg-gray-100 shadow-md'>
        <Title>Resultados</Title>
        <p className='text-lg text-center'>{message}</p>
        <p className='text-lg text-center'>Respuestas correctas: <span className='font-semibold ml-1'>{respuestasCorrectas}</span></p>
        <p className='text-lg text-center'>Calificación: <span className='font-semibold ml-1'>{puntos}</span></p>
      </div>
      <div className='flex flex-col gap-5 px-6'>
        {
          questions.map((question, index) => <CardResults key={question.id} question={question} num={index + 1} />
          )
        }
      </div>
    </Main>

  )
}

function CardResults({ num, question }) {
  return (
    <div className='p-2 shadow-md rounded-md bg-gray-200/60'>
      <header className='flex text-lg items-center gap-2'>
        <span className='font-bold pr-4'>{num})</span>
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
      </div>
    </div>
  )
}
