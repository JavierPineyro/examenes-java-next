'use client'

import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import { useSession, signIn, signOut } from 'next-auth/react'
import SpinnerNavbar from './navbar-spinner'

export default function NavbarClient() {
  const { data: session, status } = useSession()
  console.log('----------------------')
  console.log({ session, status })
  console.log('----------------------')

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
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => signOut()}>Cerrar sesión</Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </>
  )
}
