'use client'

import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import { useSession, signOut } from 'next-auth/react'
import SpinnerNavbar from './navbar-spinner'
import Link from 'next/link'

export default function NavbarClient() {
  const { data: session, status } = useSession()

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href='/'>
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Programación 2</span>
      </Navbar.Brand>
      <div className='flex md:order-2'>
        {status === 'loading'
          ? <SpinnerNavbar />
          : <AvatarDropdown username={session?.user?.username} roles={session?.user?.roles} />}
      </div>
    </Navbar>
  )
}

function AvatarDropdown({ roles, username }) {
  const formatRolText = (role) => {
    return role.split('_')[1].toLowerCase()
  }

  return (
    <>
      <Dropdown
        className='z-20'
        arrowIcon={false}
        inline
        label={
          <Avatar alt='User settings' img='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=retro&f=y' rounded />
        }
      >
        <Dropdown.Header>
          <span className='block text-sm'>Rol: {formatRolText(roles)}</span>
          <span className='block truncate text-sm font-medium'>{username}</span>
        </Dropdown.Header>
        <Dropdown.Item as={Link} href='/dashboard'>Dashboard</Dropdown.Item>
        <Dropdown.Item as={Link} href='/perfil'>Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => signOut({
          callbackUrl: '/'
        })}
        >Cerrar sesión
        </Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </>
  )
}
