import { options } from '@/app/api/auth/[...nextauth]/options'
import Main from '@/components/Container/main'
import Title from '@/components/Title/title'
import { api } from '@/lib/api'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export default async function InstructionPage({ params }) {
  const { id } = params
  const session = await getServerSession(options)
  const token = session?.user?.token

  const exam = await api.exam.getExamenById({ token, id })

  const pointsOfQuestion = (amountOfQuestions, maxPoints) => {
    // make sure to give only 1 decimal
    return (Number(maxPoints) / Number(amountOfQuestions)).toFixed(1)
  }

  return (
    <Main>
      <h2 className='mb-3'>Lee las instrucciones atentamente antes de continuar</h2>
      <div className='mb-3'>
        <Title>{exam.titulo}</Title>
        <small className=' text-gray-500'>{exam.descripcion}</small>
      </div>
      <hr />
      <h3 className='mt-3 underline'>Instrucciones</h3>
      <ul className='my-3 list-disc pl-4'>
        <li className='ml-2'>Entra al cuestionario y responde todas las preguntas antes de enviar el exámen</li>
        <li className='ml-2'>Este cuestionario es solo para fines de práctica y no tiene validez en ninguna institución</li>
        <li className='ml-2'>Puedes intentar resolver el cuestionario tantas veces como quieras</li>
        <li className='ml-2'>Cada pregunta vale: <strong>{pointsOfQuestion(exam.numeroDePreguntas, exam.puntosMaximos)}</strong></li>
      </ul>
      <hr />
      <ul className='my-3 list-disc pl-4'>
        <li className='ml-2'>Lea atentamente cada pregunta antes de elegir la respuesta</li>
        <li className='ml-2'>Cada pregunta tiene una respuesta correcta</li>
        <li className='ml-2'>Si no selecciona una respuesta correcta, la pregunta se marcará como incorrecta</li>
        <li className='ml-2'>Cuando haya respondido todas las preguntas, envie el formulario haciendo click en el botón de "Finalizar"</li>
      </ul>
      <div className='w-full flex justify-start'>
        <Link className='bg-blue-600 text-white px-3 py-2 rounded-md w-36 hover:bg-blue-800 transition-colors text-center font-medium' href={`/empezar/${id}`}>Empezar</Link>
      </div>
    </Main>
  )
}
