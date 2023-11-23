import CardSkeleton from '@/components/Cards/card-skeleton'
import CategorySection from '@/components/Category/category-section'
import ListOfExamns from '@/components/Cards/list-of-examns'
import Title from '@/components/Title/title'
import { Suspense } from 'react'

export default function DashboardPage() {
  return (
    <main className='w-full flex flex-col gap-4'>
      <section className='w-full p-2'>
        <Title>Categorias</Title>
        <section className='w-full'>
          <Suspense fallback={<CardSkeleton />}>
            <CategorySection />
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
    </main>
  )
}
