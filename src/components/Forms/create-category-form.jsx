import { options } from '@/app/api/auth/[...nextauth]/options'
import { createCategory } from '@/lib/actions'
import { getServerSession } from 'next-auth'

export default async function CreateCategoryForm() {
  const session = await getServerSession(options)
  return (
    <form
      action={createCategory}
      className='max-w-md mx-auto rounded-lg w-full p-4 bg-[#f9fafb]'
    >
      <div className='mb-5'>
        <label htmlFor='title-new-category' className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Título</label>
        <input autoComplete='off' name='titulo' type='text' id='title-new-category' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' placeholder='Matemáticas ...' required />
      </div>

      <div className='mb-5'>
        <label htmlFor='description-new-category' className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Descripción</label>
        <input autoComplete='off' name='descripcion' type='text' id='description-new-category' className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' placeholder='En esta materia se practica ...' required />
        <input name='token' defaultValue={session?.user?.token} className='invisible' type='text' id='token' value={session?.user?.token} />
      </div>

      <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Crear</button>
    </form>

  )
}
