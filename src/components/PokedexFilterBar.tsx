import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { Toggle } from "@/components/ui/toggle"
import { pokemonTypes } from '@/lib/pokemonAttributes'
import { HiAdjustments } from 'react-icons/hi'

export default function PokedexFilterBar({
  activeTypeFilter,
  setActiveTypeFilter
}: {
  activeTypeFilter: string[]
  setActiveTypeFilter: React.Dispatch<React.SetStateAction<string[]>>
}) {
  return (
    <div className='flex items-center py-4'>
      <div className='text-2xl font-semibold pr-8'>Pokédex</div>
      <div className='ml-8'>
        <Popover>
          <PopoverTrigger asChild>
            <div className='border rounded w-[300px] h-10 items-center flex px-4 cursor-pointer text-gray-900 text-opacity-50'>
              {activeTypeFilter.length === 0 && (
                <span className='mr-2 text-xs font-semibold'>
                  Filter by type
                </span>
              )}
              {activeTypeFilter.length > 0 && (
                <>
                  <span className='mr-2 uppercase text-xs font-semibold'>
                    Filter By
                  </span>
                  <ul className='flex gap-1'>
                    {activeTypeFilter.map(type => (
                      <li
                        title={type}
                        key={type}
                        className='text-xs text-gray-500 capitalize w-15 border px-2 py-1 rounded'
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <HiAdjustments className='ml-auto' />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <div className='space-y-2'>
                {pokemonTypes.map(type => (
                  <Toggle
                    key={type}
                    className='mr-1'
                    size={'sm'}
                    variant={'outline'}
                    pressed={activeTypeFilter.includes(type)}
                    onPressedChange={
                      active => {
                        if (active) {
                          setActiveTypeFilter(prev => [...prev, type])
                        } else {
                          setActiveTypeFilter(prev => prev.filter(x => x !== type))
                        }
                      }
                    }
                  >
                    {type} {activeTypeFilter.includes(type) && '✓'}
                  </Toggle>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
