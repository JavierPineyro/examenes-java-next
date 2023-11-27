import { ToastError, ToastSuccess } from '@/components/Cards/toaster'
import Main from '@/components/Container/main'
import Search from '@/components/Forms/search-category'
import { Suspense } from 'react'
import Link from 'next/link'
import ExamenSection from '@/components/Exams/examen-section'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { ROL } from '@/lib/utils'
import ExamenSkeleton from '@/components/Cards/examen-skeleton'
import CreateExamModal from '@/components/Modal/create-exam'

export default async function ExamPage({ searchParams }) {
  const session = await getServerSession(options)
  const roles = session?.user?.roles

  const query = searchParams?.query || ''
  const message = searchParams?.message || ''
  const error = searchParams?.error || ''
  const isError = error === 'true'

  return (
    <Main className='w-full p-2 '>

      {message && !isError && <ToastSuccess message={message} />}
      {message && isError && <ToastError message={message} />}

      <div className='flex items-center justify-center gap-2 px-3 mb-4'>
        <Search placeholder='Buscar examenes...' />
        {
          roles === ROL.ADMIN && <CreateExamModal />
        }
      </div>
      <Suspense key={query} fallback={<ExamenSkeleton />}>
        <ExamenSection query={query} />
      </Suspense>
    </Main>
  )
}
