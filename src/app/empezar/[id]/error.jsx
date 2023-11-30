'use client' // Error components must be Client Components

import Main from '@/components/Container/main'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <Main>
      <div className='w-full flex flex-col justify-center items-center'>
        <h2>Ocurrió un error!</h2>
        <p>{error.message}</p>
        <Link className='text-blue-500 hover:underline' href='/'>Ir al inicio</Link>
      </div>
    </Main>
  )
}
