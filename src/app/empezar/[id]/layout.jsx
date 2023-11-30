import NavbarClient from '@/components/Navbar/navbar-client'

export default function LayoutEmpezar({ children }) {
  return (
    <div>
      <header>
        <NavbarClient />
      </header>
      <div className='flex pt-3 pb-7 justify-center overflow-hidden'>
        {children}
      </div>
    </div>
  )
}
