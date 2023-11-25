import CardSkeleton from '@/components/Cards/card-skeleton'
import CategorySection from '@/components/Category/category-section'
import ListOfExamns from '@/components/Exams/list-of-examns'
import Title from '@/components/Title/title'
import { Suspense } from 'react'
import Main from '@/components/Container/main'

export default function DashboardPage() {
  return (
    <Main className='flex flex-col gap-4'>
      <section className='w-full'>
        <Title>Categorias</Title>
        <section className='w-full'>
          <Suspense fallback={<CardSkeleton />}>
            <CategorySection pathname='dashboard' />
          </Suspense>
        </section>
      </section>
      <section>
        <Title>Examenes</Title>
        <section className='w-full'>
          <Suspense fallback={<CardSkeleton />}>
            <ListOfExamns />
          </Suspense>
        </section>
      </section>
    </Main>
  )
}
