'use client'

import { useState } from 'react'

export default function Checkbox({ active }) {
  const [check, setCheck] = useState(active)
  return (
    <div className='flex items-center h-5'>
      <input onChange={() => setCheck(prev => !prev)} checked={check} id='activo' name='activo' type='checkbox' value='true' className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800' />
    </div>
  )
}
