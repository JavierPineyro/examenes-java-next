'use client'

import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function ModalDelete({ deleteAction }) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Button color='failure' onClick={() => setOpenModal(true)}>Eliminar</Button>
      <Modal show={openModal} size='md' onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              ¿Estás seguro de que quieres eliminar lo?
            </h3>
            <div className='flex justify-center gap-4'>
              <form action={deleteAction}>
                <Button color='failure' type='submit'>
                  Si, estoy seguro
                </Button>
              </form>
              <Button color='gray' onClick={() => setOpenModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
