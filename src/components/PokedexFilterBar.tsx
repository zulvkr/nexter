import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { Button } from '@/components/ui/button'
import { pokemonTypes } from '@/lib/pokemonAttributes'

export default function PokedexFilterBar({
  activeTypeFilter,
  setActiveTypeFilter
}: {
  activeTypeFilter: string[]
  setActiveTypeFilter: React.Dispatch<React.SetStateAction<string[]>>
}) {
  return (
    <div>
      Filters
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'default'}>Type</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <div className='space-y-2'>
                {pokemonTypes.map(type => (
                  <Button
                    variant={'default'}
                    key={type}
                    className='mr-1'
                    rounded={'full'}
                    onClick={() => {
                      if (activeTypeFilter.includes(type)) {
                        setActiveTypeFilter(prev => {
                          return prev.filter(x => x !== type)
                        })
                      } else {
                        setActiveTypeFilter(prev => [...prev, type])
                      }
                    }}
                  >
                    {type} {activeTypeFilter.includes(type) && '✓'}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
