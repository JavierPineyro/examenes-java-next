import { ToastError } from '@/components/Cards/toaster'
import Main from '@/components/Container/main'
import CreateCategoryForm from '@/components/Forms/create-category-form'
import Breadcrumb from '@/components/Title/breadcrumb-title'

export default function CategoryCreatePage({ searchParams }) {
  const message = searchParams?.message || ''
  const error = searchParams?.error || ''
  const isError = error === 'true'

  return (
    <Main className=''>
      <header className='w-full'>
        <Breadcrumb section='Categoria' action='Crear' />
      </header>
      <div className='h-full flex flex-col items-center justify-center'>
        {
          message && isError && <ToastError message={message} />
        }
        <CreateCategoryForm />
      </div>
    </Main>
  )
}
