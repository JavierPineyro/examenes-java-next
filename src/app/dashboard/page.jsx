import CardSkeleton from '@/components/Cards/card-skeleton'
import CategorySection from '@/components/Category/category-section'
import ListOfExamns from '@/components/Exams/list-of-examns'
import Title from '@/components/Title/title'
import { Suspense } from 'react'
import Main from '@/components/Container/main'

export default function DashboardPage() {
  return (
    <Main className='flex flex-col gap-4'>
      <Title>¿Qué puedes hacer aquí?</Title>
      <ul className='mb-4 list-disc pl-10'>
        <li>Ver las categorías</li>
        <li>Ver los distintos exámenes</li>
        <li>Buscar los exámenes con el buscador</li>
        <li>Resolver los exámenes para practicar tus conocimientos</li>
      </ul>
      <section className='w-full'>
        <Title>Categorias</Title>
        <section className='w-full'>
          <Suspense fallback={<CardSkeleton />}>
            <CategorySection pathname='dashboard' />
          </Suspense>
        </section>
      </section>
    </Main>
  )
}
