import { HiOutlinePuzzle } from 'react-icons/hi'
import Indicator from '../Indicator/indicator'

export default function ExamItem({ exam }) {
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
        <a href='#' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Preguntas</a>
        <span class='flex items-center bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400'>Puntos maximos: {exam.puntosMaximos}</span>
        <span className='flex items-center bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400'>N° de preguntas: {exam.numeroDePreguntas}</span>
        <button className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-1 dark:focus:ring-yellow-900'>Actualizar</button>
        <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Eliminar</button>
      </footer>
    </div>
  )
}
