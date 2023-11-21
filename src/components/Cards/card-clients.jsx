'use client'

import { Card } from 'flowbite-react'

export default function CardClient() {
  return (
    <Card className='max-w-sm'>
      <h5 className='mb-2 text-3xl font-bold text-gray-900 dark:text-white'>Work fast from anywhere</h5>
      <p className='mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg'>
        Stay up to date and move work forward with Flowbite on iOS & Android. Download the app today.
      </p>
      <div className='items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0'>
        <a
          href='#'
          className='inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto'
        >
          <div className='text-left'>
            <div className='mb-1 text-xs'>Download on the</div>
            <div className='-mt-1 font-sans text-sm font-semibold'>Mac App Store</div>
          </div>
        </a>
        <a
          href='#'
          className='inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto'
        >
          <div className='text-left'>
            <div className='mb-1 text-xs'>Get in on</div>
            <div className='-mt-1 font-sans text-sm font-semibold'>Google Play</div>
          </div>
        </a>
      </div>
    </Card>
  )
}
