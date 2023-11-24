'use client'

import { Breadcrumb } from 'flowbite-react'
import { HiHome, HiBookOpen } from 'react-icons/hi'

export default function BreadcrumbTitle({ section = '', action = '' }) {
  return (
    <Breadcrumb className='w-full text-3xl' aria-label='categorias breadcrumb'>
      <Breadcrumb.Item href='/dashboard' icon={HiHome}>
        Inicio
      </Breadcrumb.Item>
      <Breadcrumb.Item href={`/dashboard/${section.toLocaleLowerCase()}`} icon={HiBookOpen}>
        {section}
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        {action}
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}
