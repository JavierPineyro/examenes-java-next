import { ToastError } from '@/components/Cards/toaster'
import Login from '@/components/Forms/login'

export default function LoginPage({ searchParams }) {
  const message = searchParams.message || ''
  return (
    <main className="flex justify-center items-center h-screen bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')] ">
      {message && <ToastError message={message} />}
      <Login />
    </main>
  )
}
