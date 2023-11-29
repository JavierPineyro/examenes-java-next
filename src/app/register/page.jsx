import { ToastError } from '@/components/Cards/toaster'
import Register from '@/components/Forms/register'
import Link from 'next/link'

export default function RegisterPage({ searchParams }) {
  const message = searchParams.message || ''
  return (
    <main className='flex flex-col justify-center items-center h-screen'>
      <div>
        {message && <ToastError message={message} />}
      </div>
      <Register />
      <div className='mt-4'>
        <Link className='text-start text-base text-blue-600 hover:underline' href='/login'>iniciar sesión</Link>
      </div>
    </main>
  )
}
