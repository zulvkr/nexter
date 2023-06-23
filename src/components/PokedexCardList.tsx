import { AllPokemonQueryQuery } from '@/gql/graphql'
import { UseInfiniteQueryResult } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef } from 'react'

type pokemonType = AllPokemonQueryQuery['getAllPokemon'][0]

export function PokedexCard({ pokemon }: { pokemon: pokemonType }) {
  return (
    <div className='flex flex-row w-full gap-4 px-4 py-4 bg-white border border-gray-200 rounded-md shadow-sm'>
      <div className='flex-auto'>
        <div className='flex justify-between'>
          <div>
            <h2 className='font-medium text-gray-900 capitalize'>
              {pokemon.species.replace(/-/g, ' ')}
            </h2>
            <ul className='flex gap-1 mt-1'>
              {pokemon.types.map(type => (
                <li
                  title={type.name}
                  key={type.name}
                  className='text-xs text-gray-500 capitalize w-15 border px-2 py-1 rounded'
                >
                  {type.name}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex'>
            <div className='w-12 h-12 object-contain flex items-center justify-center'>
              <img
                src={pokemon.sprite}
                alt={pokemon.key}
                className='max-h-full'
              />
            </div>
          </div>
        </div>

        <div
          role='table'
          aria-label='Pokemon Base Stats'
          className='flex-auto grid grid-cols-[minmax(90px,1fr),minmax(50px,1fr)] text-sm text-gray-600 divide-y border-gray-50 [&>div]:py-1 mt-4'
        >
          <div role='rowheader'>Total</div>
          <div role='cell' className='text-right border-none'>
            {pokemon.baseStatsTotal}
          </div>
          <div role='rowheader'>HP</div>
          <div role='cell' className='text-right'>
            {pokemon.baseStats.hp}
          </div>
          <div role='rowheader'>Attack</div>
          <div role='cell' className='text-right'>
            {pokemon.baseStats.attack}
          </div>
          <div role='rowheader'>Defense</div>
          <div role='cell' className='text-right'>
            {pokemon.baseStats.defense}
          </div>
          <div role='rowheader'>Sp. Att</div>
          <div role='cell' className='text-right'>
            {pokemon.baseStats.specialattack}
          </div>
          <div role='rowheader'>Sp. Def</div>
          <div role='cell' className='text-right'>
            {pokemon.baseStats.specialdefense}
          </div>
          <div role='rowheader'>Speed</div>
          <div role='cell' className='text-right'>
            {pokemon.baseStats.speed}
          </div>
        </div>
      </div>
    </div>
  )
}

interface PokedexCardListProps {
  allPokemon: AllPokemonQueryQuery['getAllPokemon']
  infiniteQueryResult: UseInfiniteQueryResult
}

export default function PokedexCardList({
  allPokemon,
  infiniteQueryResult
}: PokedexCardListProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    infiniteQueryResult

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allPokemon.length + 1 : allPokemon.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 322,
    overscan: 5
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse()

    if (!lastItem) {
      return
    }

    if (
      lastItem.index >= allPokemon.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    virtualItems,
    allPokemon.length,
    rowVirtualizer
  ])

  return (
    <div ref={ref} className='h-[calc(100svh)] overflow-auto px-4 py-4'>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualItem => {
          const isLastRow = virtualItem.index === allPokemon.length - 1
          const pokemon = allPokemon[virtualItem.index]

          return (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`
              }}
            >
              {isLastRow && hasNextPage
                ? 'Loading more...'
                : pokemon && <PokedexCard pokemon={pokemon} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
