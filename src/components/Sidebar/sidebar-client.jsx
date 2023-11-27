'use client'

import { Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiChartPie, HiInbox, HiUser, HiViewBoards } from 'react-icons/hi'
import { signOut } from 'next-auth/react'

export default function SidebarClient() {
  return (
    <Sidebar aria-label='Sidebar with logo branding example'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href='/dashboard' icon={HiChartPie}>
            Inicio
          </Sidebar.Item>
          <Sidebar.Item href='/dashboard/categoria' icon={HiViewBoards}>
            Categorias
          </Sidebar.Item>
          <Sidebar.Item href='/dashboard/examen' icon={HiInbox}>
            Examenes
          </Sidebar.Item>
          <Sidebar.Item href='#' icon={HiUser}>
            Users
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item className='cursor-pointer' onClick={() => signOut()} icon={HiArrowSmRight}>
            Cerrar Sesion
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
