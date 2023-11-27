'use client'

import { Button, Modal } from 'flowbite-react'
import { useRef, useState } from 'react'

export default function CreateExamModal() {
  const [openModal, setOpenModal] = useState(false)
  const inputRef = useRef(null)

  // {
  //   "titulo": "Conceptos de POO con JAVA",
  //   "descripcion": "Aprender a desarrollar con java",
  //   "numeroDePreguntas": "10",
  //   "puntosMaximos": "10",
  //   "activo": true,
  //   "categoria": {
  //     "id": 2
  //   }
  // }

  return (
    <>
      <Button className='w-36' color='success' onClick={() => setOpenModal(true)}>Agregar</Button>
      <Modal show={openModal} size='md' popup onClose={() => setOpenModal(false)} initialFocus={inputRef}>
        <Modal.Header />
        <Modal.Body>
          <form className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <label htmlFor='titulo' className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Título</label>
              </div>
              <input ref={inputRef} autoComplete='off' name='titulo' type='text' id='titulo' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' required />
            </div>
            <div>
              <div className='mb-2 block'>
                <label htmlFor='descripcion' className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Descripción</label>
              </div>
              <input autoComplete='off' name='descripcion' type='text' id='descripcion' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' required />
            </div>
            <div className='flex gap-8'>
              <div>
                <label htmlFor='numPreguntas' className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>N° de preguntas</label>
                <input min={1} type='number' required name='numeroDePreguntas' id='numPreguntas' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' />
              </div>
              <div>
                <label htmlFor='puntosMaximos' className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'>Puntos máximos</label>
                <input min={1} type='number' required name='puntosMaximos' id='puntosMaximos' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' />
              </div>
            </div>
            <div class='flex items-start mb-5'>
              <div class='flex items-center h-5'>
                <input id='activo' name='activo' type='checkbox' value='activo' className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800' required />
              </div>
              <label htmlFor='activo' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Activar</label>
            </div>
            <div>
              <label htmlFor='categoria' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Selecciona la categoría</label>
              <select name='categoria' id='categoria' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>

                <option value='eeuu'>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
                <option>Canada</option>
                <option>France</option>

              </select>
            </div>

            <div className='w-full'>
              <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Guardar</button>
            </div>

          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
