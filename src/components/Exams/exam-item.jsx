import { HiOutlinePuzzle } from 'react-icons/hi'
import Indicator from '@/components/Indicator/indicator'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { deleteExam, updateExam } from '@/lib/actions'
import ModalDelete from '@/components/Modal/delete-modal'
import { ROL } from '@/lib/utils'
import UpdateExamModal from '@/components/Modal/update-exam'

export default async function ExamItem({ exam, categories }) {
  const session = await getServerSession(options)
  const token = session?.user?.token
  const role = session?.user?.roles

  const deleteAction = deleteExam.bind(null, { token, id: exam.id })
  const updateAction = updateExam.bind(null, { token, id: exam.id })

  return (
    <div className='shadow-md bg-gray-200/60 rounded-md py-4 px-3 mb-4'>
      <header className='flex items-center gap-3 mb-3'>
        <span className='text-4xl w-8 h-8 rounded-full'>
          <HiOutlinePuzzle />
        </span>
        <div>
          <h1 className='font-semibold'>{exam.titulo} <Indicator enabled={exam.activo} /></h1>
          <h3 className='text-gray-600 text-sm'>{exam.descripcion}</h3>
        </div>
      </header>
      <footer className='flex justify-around gap-3'>
        {
          role === ROL.ADMIN
            ? <a href={`/dashboard/examen/${exam.id}`} className='text-white flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Preguntas</a>
            : <a href={`/dashboard/instrucciones/${exam.id}`} className='text-white flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Empezar</a>
        }

        <span className='flex items-center bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400'>Puntos maximos: {exam.puntosMaximos}</span>
        <span className='flex items-center bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400'>N° de preguntas: {exam.numeroDePreguntas}</span>

        {
          role === ROL.ADMIN && <ControlButtons updateAction={updateAction} categories={categories} exam={exam} deleteAction={deleteAction} />
        }
      </footer>
    </div>
  )
}

// This component it's only used here, it was made this way so the linter stops messing around
function ControlButtons({ updateAction, categories, exam, deleteAction }) {
  return (
    <><UpdateExamModal updateAction={updateAction} categories={categories} exam={exam} />
      <ModalDelete deleteAction={deleteAction} />
    </>
  )
}
