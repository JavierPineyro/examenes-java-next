'use client'

import { Button, Modal } from 'flowbite-react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export default function ModalUpdate({ updateAction, category }) {
  const [openModal, setOpenModal] = useState(false)
  const inputFocusRef = useRef(null)
  const formRef = useRef(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const message = searchParams.get('message')
  const error = searchParams.get('error')
  const isError = error === 'true'

  return (
    <>
      <Button className='w-36' color='purple' onClick={() => setOpenModal(true)}>Actualizar</Button>
      <Modal
        show={openModal} size='md' popup onClose={() => {
          setOpenModal(false)
          router.replace(pathname)
        }} initialFocus={inputFocusRef}
      >
        <Modal.Header />
        <Modal.Body>
          <div className='space-y-4'>
            <h3 className='text-md leading-tight text-center'>
              {(message && !isError) && <span className='text-green-600'>{message}</span>}
              {(message && isError) && <span className='text-red-600'>{message}</span>}
            </h3>

            <form
              ref={formRef} className='flex flex-col gap-2' action={async (formData) => {
                await updateAction(formData)
                formRef.current?.reset()
              }}
            >
              <div>
                <div className='mb-2 block'>
                  <label htmlFor='titulo' className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Título</label>
                </div>
                <input ref={inputFocusRef} defaultValue={category.titulo} autoComplete='off' name='titulo' type='text' id='titulo' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' required />
              </div>

              <div className='mb-2'>
                <div className='mb-2 block'>
                  <label htmlFor='descripcion' className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Descripción</label>
                </div>
                <input defaultValue={category.descripcion} autoComplete='off' name='descripcion' type='text' id='descripcion' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' required />
              </div>

              <div className='w-full'>
                <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Guardar</button>
              </div>
            </form>

          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
