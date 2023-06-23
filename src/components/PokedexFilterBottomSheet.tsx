import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { pokemonTypes } from '@/lib/pokemonAttributes'
import { Button } from './ui/button'

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
          <DialogDescription asChild>
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
