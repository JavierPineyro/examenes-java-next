import NavbarClient from '@/components/Navbar/navbar-client'
import SidebarClient from '@/components/Sidebar/sidebar-client'

export default function LayoutUser({ children }) {
  return (
    <div>
      <header>
        <NavbarClient />
      </header>
      <div className='flex pt-3 pb-7 justify-center overflow-hidden'>
        <SidebarClient />
        {children}
      </div>
    </div>
  )
}
