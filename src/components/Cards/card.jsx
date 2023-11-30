'use client'

import { ROL } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Card({ info, roles }) {
  const { titulo, descripcion, id } = info
  const pathname = usePathname()
  let href = (pathname === '/dashboard/categoria' || pathname === '/dashboard') ? `/dashboard/categoria/${id}` : `/dashboard/instrucciones/${id}`

  if (roles && roles === ROL.ADMIN) {
    href = '/dashboard/examen'
  }
  return (
    <div className='w-full p-4 max-h-[175px] bg-[#f9fafb] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div id='defaultTabContent' className='max-h-[185px] h-full'>
        <div className='flex flex-col rounded-lg h-full' id='about' role='tabpanel' aria-labelledby='about-tab'>
          <h2 className='mb-3 grow-0 text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>
            {titulo}
          </h2>
          <p className='mb-3 grow-0 text-sm line-clamp-2 text-gray-500 dark:text-gray-400'>
            {descripcion}
          </p>
          <div className='flex grow  justify-start items-end'>
            <Link href={href} className='inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700'>
              Ver
              <svg className=' w-2.5 h-2.5 ms-2 rtl:rotate-180' aria-hidden='true' fill='none' viewBox='0 0 6 10'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 9 4-4-4-4' />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
