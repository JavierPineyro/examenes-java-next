'use client'

import { Button } from 'flowbite-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiPlus } from 'react-icons/hi'

export default function CreateCategoryButton() {
  const pathname = usePathname()
  return (
    <Button
      className='hover:bg-green-500 transition-colors  active:bg-green-800'
      href={`${pathname}/create`}
      as={Link}
      color='success'
    >
      <HiPlus className='mr-1 h-4 w-4' />
      Crear categoria
    </Button>
  )
}
