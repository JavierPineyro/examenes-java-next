import { ToastError } from '@/components/Cards/toaster'
import Register from '@/components/Forms/register'

export default function RegisterPage({ searchParams }) {
  const message = searchParams.get('message') || ''
  return (
    <main className='flex justify-center items-center h-screen'>
      {message && <ToastError message={message} />}
      <Register />
    </main>
  )
}
