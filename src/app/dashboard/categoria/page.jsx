import CardSkeleton from '@/components/Cards/card-skeleton'
import CategorySection from '@/components/Category/category-section'
import CreateCategoryButton from '@/components/Category/create-category-button'
import Main from '@/components/Container/main'
import Search from '@/components/Forms/search-category'
import Title from '@/components/Title/title'
import { Suspense } from 'react'

export default function CategoryPage({ searchParams }) {
  // se lo paso al componente de categories list
  const query = searchParams?.query || ''

  return (
    <Main className='w-full p-2 mb-4'>
      <div className='flex items-center justify-center w-full'>
        <Title>Categorias</Title>
      </div>
      <div className='flex items-center justify-center gap-2 md:mt-8 mt-4 mb-4'>
        <Search placeholder='Buscar categoría...' />
        <CreateCategoryButton />
      </div>
      <Suspense key={query} fallback={<CardSkeleton />}>
        <CategorySection query={query} />
      </Suspense>
    </Main>
  )
}
