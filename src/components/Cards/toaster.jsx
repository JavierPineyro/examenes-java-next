'use client'

import { Toast } from 'flowbite-react'
import { HiCheck, HiX } from 'react-icons/hi'
import { usePathname, useRouter } from 'next/navigation'

export function ToastSuccess({ message }) {
  const pathname = usePathname()
  const { replace } = useRouter()

  return (
    <div className='flex flex-col gap-4 w-full'>
      <Toast className='w-full'>
        <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'>
          <HiCheck className='h-5 w-5' />
        </div>
        <div className='ml-3 text-sm font-normal'>{message}</div>
        <Toast.Toggle onDismiss={() => {
          replace(pathname)
        }}
        />
      </Toast>
    </div>
  )
}

export function ToastError({ message }) {
  const pathname = usePathname()
  const { replace } = useRouter()
  return (
    <div className='flex flex-col gap-4 w-full'>
      <Toast className='w-full'>
        <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200'>
          <HiX className='h-5 w-5' />
        </div>
        <div className='ml-3 text-sm font-normal'>{message}</div>
        <Toast.Toggle onDismiss={() => {
          replace(pathname)
        }}
        />
      </Toast>
    </div>
  )
}
