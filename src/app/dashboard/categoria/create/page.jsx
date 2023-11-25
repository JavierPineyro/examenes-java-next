import Main from '@/components/Container/main'
import CreateCategoryForm from '@/components/Forms/create-category-form'
import Breadcrumb from '@/components/Title/breadcrumb-title'

export default function CategoryCreatePage({ searchParams }) {
  const errorMessage = searchParams?.errormessage || ''
  return (
    <Main className=''>
      <header className='w-full'>
        <Breadcrumb section='Categoria' action='Crear' />
      </header>
      <div className='h-full flex flex-col items-center justify-center'>
        {
          errorMessage && <p className='text-red-500'>{errorMessage}</p>
        }
        <CreateCategoryForm />
      </div>
    </Main>
  )
}
