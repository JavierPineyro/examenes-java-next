import { options } from '@/app/api/auth/[...nextauth]/options'
import Main from '@/components/Container/main'
import Title from '@/components/Title/title'
import { api } from '@/lib/api'
import { getServerSession } from 'next-auth'

export default async function ExamenDetailPage({ params }) {
  const session = await getServerSession(options)
  const { id } = params
  const token = session?.user?.token

  const exam = await api.exam.getExamenById({ token, id })

  // give array mock data for questions items with title, question1, questio2, question3, question4 and answwer
  const questions = [
    {
      title: 'What is the capital of France?',
      question1: 'Paris',
      question2: 'London',
      question3: 'Berlin',
      question4: 'Madrid',
      answer: 'Paris'
    },
    {
      title: 'What is the largest planet in our solar system?',
      question1: 'Mars',
      question2: 'Jupiter',
      question3: 'Saturn',
      question4: 'Uranus',
      answer: 'Jupiter'
    }
  ]
  return (
    <Main className='w-full p-2 '>
      <div className='flex justify-between px-4'>
        <Title>{exam.titulo}</Title>
        <button className='bg-green-500 text-white px-4 py-2 rounded-md'>Add Question</button>
      </div>
      <section className='p-4 flex flex-col gap-6'>
        {
          questions.map((question, index) => {
            return (
              <div key={question.title + index} className='p-2 shadow-md rounded-md bg-gray-200/60'>
                <header className='flex text-2xl items-center gap-2'>
                  <span className='font-bold pr-4'>{index + 1})</span>
                  <span>{question.title}</span>
                </header>
                <div className='columns-2 p-5 tex-lg'>
                  <p className='mb-1'>A)<span className='font-bold'> {question.question1}</span></p>
                  <p className='mb-1'>B)<span className='font-bold'> {question.question2}</span></p>
                  <p className='mb-1'>C)<span className='font-bold'> {question.question3}</span></p>
                  <p className='mb-1'>D)<span className='font-bold'> {question.question4}</span></p>
                </div>
                <hr className='h-px my-3 bg-gray-300 border-0 dark:bg-gray-700' />
                <div className='flex items-center w-full '>
                  <p className='font-bold grow text-lg'>Respuesta: {question.answer}</p>
                  <div className='flex gap-1 pr-5'>
                    <button className='bg-red-500 text-white px-4 py-2 rounded-md'>Eliminar</button>
                    <button className='bg-green-500 text-white px-4 py-2 rounded-md'>Actualizar</button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
    </Main>
  )
}
