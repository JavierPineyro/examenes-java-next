'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function ButtonAuth () {
  const { data: session, status } = useSession()

  console.log('----------------------')
  console.log({ session, status })
  console.log('----------------------')

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <>
        signIn as {session?.user?.username}
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    )
  }

  return (
    <>
      Not sign in<br />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  )
}
