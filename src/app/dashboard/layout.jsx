import NavbarClient from '@/components/Navbar/navbar-client'
import SidebarClient from '@/components/Sidebar/sidebar-client'

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <NavbarClient />
      </header>
      <div className='flex overflow-hidden'>
        <SidebarClient />
        {children}
      </div>
    </div>
  )
}
