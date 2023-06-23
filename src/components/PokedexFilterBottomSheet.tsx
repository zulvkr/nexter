import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { pokemonTypes } from '@/lib/pokemonAttributes'
import { Button } from '@/components/ui/button'
import { Toggle } from './ui/toggle'

export default function PokedexFilterBottomSheet({
  triggerComponent,
  activeTypeFilter,
  setActiveTypeFilter
}: {
  triggerComponent: React.ReactNode
  activeTypeFilter: string[]
  setActiveTypeFilter: React.Dispatch<React.SetStateAction<string[]>>
}) {
  return (
    <Dialog>
      <DialogTrigger>{triggerComponent}</DialogTrigger>
      <DialogContent className='pb-14'>
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className='space-y-2'>
                {pokemonTypes.map(type => (
                  <Toggle
                    variant={'outline'}
                    size={'sm'}
                    key={type}
                    className='mr-1'
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
