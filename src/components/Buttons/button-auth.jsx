'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import SpinnerNavbar from '../Navbar/navbar-spinner'
import { Button } from 'flowbite-react'
import Link from 'next/link'

export default function ButtonAuth() {
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'

  if (status === 'loading') {
    return <SpinnerNavbar />
  }

  if (session) {
    return (
      <>
        Sesión Iniciada como: <span className='ml-1 font-semibold'>{session?.user?.username}</span>
        <div className='flex items-center gap-1'>
          <Button onClick={() => signOut()} disabled={isLoading} processingSpinner={<div className='w-5 h-5 border-2 border-t-transparent rounded-full animate-spin' />} isProcessing={isLoading} size='sm' color='failure'>
            Cerrar sesión
          </Button>
          <Button size='sm' color='blue' as={Link} href='/dashboard'>Ir al dashboard</Button>
        </div>
      </>
    )
  }

  return (
    <>
      <button
        className='bg-blue-500 inline-flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => signIn()}
      >
        Iniciar sesión
      </button>
      <Link
        href='/register'
        className='bg-green-400 inline-flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Registrarse
      </Link>

    </>
  )
}
