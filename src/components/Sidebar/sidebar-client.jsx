'use client'

import { Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiChartPie, HiInbox, HiUser, HiViewBoards } from 'react-icons/hi'
import { signOut, useSession } from 'next-auth/react'
import { ROL } from '@/lib/utils'

export default function SidebarClient() {
  const { data: session } = useSession()
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
          {
            session?.user?.roles === ROL.ADMIN && <Sidebar.Item href='/users' icon={HiUser}>
              Users
            </Sidebar.Item>
          }
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
