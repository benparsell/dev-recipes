'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SearchIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-3.5 w-[18px] -translate-y-1/2 text-ink-400"
            strokeWidth={1.75}
          />
          <Input
            id="search"
            className="h-[50px] pl-11 text-base"
            onChange={(event) => {
              setValue(event.target.value)
            }}
            placeholder="Search recipes"
          />
        </div>
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}
