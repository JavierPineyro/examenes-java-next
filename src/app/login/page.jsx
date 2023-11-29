import { ToastError } from '@/components/Cards/toaster'
import Login from '@/components/Forms/login'
import Link from 'next/link'

export default function LoginPage({ searchParams }) {
  const message = searchParams.message || ''
  return (
    <main className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')] ">
      <div>
        {message && <ToastError message={message} />}
      </div>
      <Login />
      <div className='mt-4'>
        <Link className='text-start text-base text-blue-600 hover:underline' href='/register'>crear cuenta</Link>
      </div>
    </main>
  )
}
