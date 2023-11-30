import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import { ROL } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { ToastError, ToastSuccess } from '@/components/Cards/toaster'
import { registerAsAdmin } from '@/lib/actions'

export default async function UsersPage({ searchParams }) {
  const session = await getServerSession(options)
  const roles = session?.user?.roles

  const message = searchParams.message ?? ''
  const error = searchParams.error ?? ''

  const isError = error === 'true'

  if (roles !== ROL.ADMIN) {
    redirect('/dashboard')
  }

  return (
    <main className='flex flex-col w-full justify-center items-center max-h-screen'>
      <div>
        {(message && isError) && <ToastError message={message} />}
        {(message && !isError) && <ToastSuccess message={message} />}
      </div>
      <form action={registerAsAdmin} className='flex w-full max-w-xl flex-col gap-4'>
        <div>
          <div className='mb-2 block'>
            <label htmlFor='username' className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Tu nombre de usuario</label>
          </div>
          <input autoComplete='off' name='username' type='text' id='username' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' placeholder='jsSmith...' required />
        </div>
        <div>
          <div className='mb-2 block'>
            <label htmlFor='email' className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Tu correo eletrónico</label>
          </div>
          <input autoComplete='off' name='email' id='email' type='email' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' placeholder='jsmith@mail.com' required />
        </div>
        <div>
          <div className='mb-2 block'>
            <label htmlFor='password' className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Tu contraseña</label>
          </div>
          <input autoComplete='off' placeholder='* * * * * * * *' minLength={8} name='password' id='password' type='password' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' required />
        </div>
        <div>
          <div className='mb-2 block'>
            <label htmlFor='repeatPassword' className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Repite tu contraseña</label>
          </div>
          <input autoComplete='off' placeholder='* * * * * * * *' minLength={8} name='repeatPassword' id='repeatPassword' type='password' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' required />
        </div>
        <div>
          <div className='mb-2 block'>
            <label htmlFor='repeatPassword' className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Rol</label>
          </div>
          <div className='flex gap-4'>
            <div className='flex items-center gap-2'>
              <input value='admin' type='radio' name='role' id='admin' />
              <label htmlFor='admin'>Admin</label>
            </div>
            <div className='flex items-center gap-2'>
              <input value='user' type='radio' name='role' id='user' />
              <label htmlFor='user'>Usuario</label>
            </div>
          </div>
        </div>
        <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Crear cuenta</button>
      </form>
    </main>
  )
}
