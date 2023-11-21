'use client'

import { Button, Label, TextInput } from 'flowbite-react'

export default function LoginHomePage() {
  return (
    <form className='flex max-w-md flex-col gap-4'>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='username1' value='Nombre de usuario' />
        </div>
        <TextInput id='username1' type='email' placeholder='lowbite...' required />
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='password1' value='Contraseña' />
        </div>
        <TextInput id='password1' type='password' placeholder='*******' required />
      </div>
      <Button type='submit'>Login</Button>
    </form>
  )
}
