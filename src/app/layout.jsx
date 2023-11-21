import { Montserrat } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

// const nunitoSans = Nunito({ subsets: ['latin'], weight: '600' })
const monserrat = Montserrat({ subsets: ['latin'], weight: ['500', '600'] })

export const metadata = {
  title: 'Examenes y cuestionarios',
  description: 'Examenes para practicar sobre distintos temas, Registrate!'
}

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <body className={`${monserrat.className} antialiased`}>
        <Providers>
          <div className='w-full h-screen max-h-screen'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
