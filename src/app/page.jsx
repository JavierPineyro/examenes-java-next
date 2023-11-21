import ButtonAuth from '@/components/Buttons/button-auth'

export default function HomePage() {
  return (
    <main className='flex flex-col gap-4 h-full px-4 justify-center m-auto items-center'>
      <h1 className='text-5xl font-bold'>Examenes/Cuestionarios</h1>
      <p className='text-2xl font-semibold'>Este es un proyecto creado para la materia de Programación 2</p>
      <p className='text-center mb-2'>Se trata de un sistema donde usuarios pueden ingresar y realizar examenes como pruebas para practicar conocimientos sobre distintos temas.

      </p>
      <ButtonAuth />
    </main>
  )
}
