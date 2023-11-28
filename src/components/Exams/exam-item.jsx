import { HiOutlinePuzzle } from 'react-icons/hi'
import Indicator from '@/components/Indicator/indicator'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { deleteExam } from '@/lib/actions'
import ModalDelete from '../Modal/delete-modal'
import { ROL } from '@/lib/utils'

export default async function ExamItem({ exam }) {
  const session = await getServerSession(options)
  const token = session?.user?.token
  const role = session?.user?.roles
  const deleteAction = deleteExam.bind(null, { token, id: exam.id })

  return (
    <div className='bg-gray-200/60 rounded-md py-4 px-3 mb-4'>
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
            ? <a href='#' className='text-white flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Preguntas</a>
            : <a href='#' className='text-white flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Empezar</a>
        }

        <span className='flex items-center bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400'>Puntos maximos: {exam.puntosMaximos}</span>
        <span className='flex items-center bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400'>N° de preguntas: {exam.numeroDePreguntas}</span>

        {
          role === ROL.ADMIN && <>
            <button className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-1 dark:focus:ring-yellow-900'>Actualizar</button>

            <ModalDelete deleteAction={deleteAction} />
          </>
        }
      </footer>
    </div>
  )
}
