import NavbarClient from '@/components/Navbar/navbar-client'
import SidevarClient from '@/components/Sidebar/sidebar-client'

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <NavbarClient />
      </header>
      <div className='flex'>
        <SidevarClient />
        {children}
      </div>
    </div>
  )
}
