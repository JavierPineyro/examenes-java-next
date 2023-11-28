'use client'

import { Button, TextInput } from 'flowbite-react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { HiSearch } from 'react-icons/hi'
import { useDebouncedCallback } from 'use-debounce'

const TIME_BETWEEN_TYPING = 400

export default function Search({ placeholder }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }

    replace(`${pathname}?${params.toString()}`)
  }, TIME_BETWEEN_TYPING)

  return (
    <form className='flex gap-2 flex-1 grow flex-shrink-0' action=''>
      <TextInput
        onChange={event => handleSearch(event.target.value)}
        name='searchCategory'
        id='search-category'
        type='search'
        icon={HiSearch}
        autoComplete='off'
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
        required
      />
      <Button type='submit' color='blue'>Buscar</Button>
    </form>
  )
}
