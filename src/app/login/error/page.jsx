import Link from 'next/link'

export default function ErrorPage({ searchParams }) {
  const error = searchParams.error ?? ''
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center bg-slate-900'>
      {error && <h1 className='text-center text-gray-50 font-bold text-xl mt-5 mb-5 uppercase md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl 5xl:text'>Usuario o contraseña incorrecta</h1>}
      <div className='text-gray-50'>
        <Link className='text-start text-base text-blue-600 hover:underline' href='/login'>Inicia sesión</Link> o <Link className='text-start text-base text-blue-600 hover:underline' href='/register'>Registrate</Link>

      </div>
    </div>
  )
}
