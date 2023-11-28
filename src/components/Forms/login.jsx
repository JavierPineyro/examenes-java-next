'use client'

import { signIn } from 'next-auth/react'

export default function Login() {
  const handleLogin = async (event) => {
    event.preventDefault()
    // get the form values using formData and currentTarget
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')
    // sign in with the username and password
    await signIn('credentials', { username, password, redirect: true, callbackUrl: '/' })
  }
  return (
    <form onSubmit={handleLogin} action='' className='flex w-full max-w-xl flex-col gap-4'>
      <h1>Iniciar sesión</h1>
      <div>
        <div className='mb-2 block'>
          <label htmlFor='username' className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Nombre de usuario</label>
        </div>
        <input autoComplete='off' name='username' type='text' id='username' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' placeholder='jsSmith...' required />
      </div>
      <div>
        <div className='mb-2 block'>
          <label htmlFor='password' className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Contraseña</label>
        </div>
        <input autoComplete='off' placeholder='* * * * * * * *' name='password' id='password' type='password' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' required />
      </div>
      <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Iniciar sesión</button>
    </form>
  )
}
