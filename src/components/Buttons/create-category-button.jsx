'use client'

import { ROL } from '@/lib/utils'
import { Button } from 'flowbite-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiPlus } from 'react-icons/hi'

export default function CreateCategoryButton() {
  const { data: session } = useSession()
  const pathname = usePathname()
  return (
    <>
      {
        session?.user?.roles === ROL.ADMIN
          ? <Btn pathname={pathname} />
          : null
      }
    </>
  )
}

function Btn({ pathname }) {
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
