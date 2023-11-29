'use client'

import { Button, Modal } from 'flowbite-react'
import { useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { HiPencil } from 'react-icons/hi'

const initiaState = {
  opcion1: '',
  opcion2: '',
  opcion3: '',
  opcion4: ''
}

export default function UpdateQuestionModal({ updateAction, question }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const message = searchParams.get('message')
  const error = searchParams.get('error')
  const isError = error === 'true'

  const [openModal, setOpenModal] = useState(false)

  const [option1, setOption1] = useState(question.opcion1)
  const [option2, setOption2] = useState(question.opcion2)
  const [option3, setOption3] = useState(question.opcion3)
  const [option4, setOption4] = useState(question.opcion4)

  return (
    <>
      <Button className='w-36' color='warning' onClick={() => setOpenModal(true)}>
        <HiPencil className='mr-1 h-4 w-4' />
        Actualizar
      </Button>
      <Modal
        show={openModal} size='md' popup onClose={() => {
          setOpenModal(false)
          router.replace(pathname)
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <form
            action={async (formData) => {
              await updateAction(formData)
            }} className='space-y-6'
          >
            <h3 className='text-md leading-tight text-center'>
              {(message && !isError) && <span className='text-green-600'>{message}</span>}
              {(message && isError) && <span className='text-red-600'>{message}</span>}
            </h3>
            <div>
              <div className='mb-2 block'>
                <label htmlFor='contenido' className='block text-xs font-medium text-gray-900 dark:text-white'>Pregunta</label>
              </div>
              <input autoComplete='off' name='contenido' type='text' id='contenido' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' required defaultValue={question.contenido} />
            </div>
            <div>
              <div className='mb-2 block'>
                <label htmlFor='opcion1' className='block text-xs font-medium text-gray-900 dark:text-white'>Opción 1</label>
              </div>
              <input defaultValue={question.opcion1} onChange={(e) => setOption1(e.target.value)} autoComplete='off' name='opcion1' type='text' id='opcion1' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' required />
            </div>
            <div>
              <div className='mb-2 block'>
                <label htmlFor='opcion2' className='block text-xs font-medium text-gray-900 dark:text-white'>Opción 2</label>
              </div>
              <input defaultValue={question.opcion2} onChange={(e) => setOption2(e.target.value)} autoComplete='off' name='opcion2' type='text' id='opcion2' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' required />
            </div>
            <div>
              <div className='mb-2 block'>
                <label htmlFor='opcion3' className='block text-xs font-medium text-gray-900 dark:text-white'>Opción 3</label>
              </div>
              <input defaultValue={question.opcion3} onChange={(e) => setOption3(e.target.value)} autoComplete='off' name='opcion3' type='text' id='opcion3' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' required />
            </div>
            <div>
              <div className='mb-2 block'>
                <label htmlFor='opcion4' className='block text-xs font-medium text-gray-900 dark:text-white'>Opción 4</label>
              </div>
              <input defaultValue={question.opcion4} onChange={(e) => setOption4(e.target.value)} autoComplete='off' name='opcion4' type='text' id='opcion4' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' required />
            </div>
            <div>
              <label htmlFor='respuesta' className='block text-xs font-medium text-gray-900 dark:text-white'>Respuesta</label>
              <select name='respuesta' id='respuesta' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' defaultValue={question.respuesta}>

                <option value={option1}>{option1}</option>
                <option value={option2}>{option2}</option>
                <option value={option3}>{option3}</option>
                <option value={option4}>{option4}</option>

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
