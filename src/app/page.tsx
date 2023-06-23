'use client'

import { graphql } from '@/gql'
import { useInfiniteQuery } from '@tanstack/react-query'
import client from '@/lib/graphqlRequest'
import { processPokemon } from '@/lib/pokemonProcessor'
import PokedexTable from '@/components/PokedexTable'
import PokedexCardList from '@/components/PokedexCardList'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useEffect, useState } from 'react'
import { HiOutlineAdjustments } from 'react-icons/hi'
import PokedexFilterBottomSheet from '@/components/PokedexFilterBottomSheet'
import PokedexFilterBar from '@/components/PokedexFilterBar'

const allPokemon = graphql(/* GraphQL */ `
  query allPokemonQuery($offset: Int, $take: Int) {
    getAllPokemon(offset: $offset, take: $take) {
      num
      key
      species
      baseSpecies
      sprite
      backSprite
      height
      color
      baseStats {
        attack
        defense
        hp
        specialattack
        specialdefense
        speed
      }
      baseStatsTotal
      catchRate {
        base
      }
      legendary
      mythical
      types {
        name
      }
      abilities {
        first {
          key
          shortDesc
        }
        hidden {
          shortDesc
          key
          name
        }
      }
      flavorTexts {
        flavor
      }
      levellingRate
    }
  }
`)

export default function PokedexPage() {
  // All pokemon without missingno: 89 - 1392
  const take = 200
  const initialOffset = 89
  const minOffset = 89
  const maxLength = 1392

  const queryResult = useInfiniteQuery({
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    queryKey: [
      { query: 'allPokemon', initialOffset, take, maxLength, minOffset }
    ],
    queryFn: async ({ pageParam }) => {
      const offset: number = pageParam?.nextOffset ?? initialOffset
      const lastPage: boolean = pageParam?.lastPage ?? false

      const res = await client.request(allPokemon, {
        offset: offset,
        take: lastPage ? maxLength - offset : take
      })

      return {
        res,
        offset
      }
    },
    getNextPageParam: lastPage => {
      const nextOffset = lastPage.offset + take

      if (nextOffset + take < maxLength) {
        return { nextOffset }
      }

      if (nextOffset < maxLength) {
        return { nextOffset, lastPage: true }
      }

      return undefined
    }
  })

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = queryResult

  const allData = data?.pages.flatMap(x => x?.res.getAllPokemon)

  const allPokemonData = allData ? processPokemon(allData) : undefined

  const [pokemonTypesFilter, setPokemonTypesFilter] = useState<string[]>([])

  const filteredPokemonData = allPokemonData?.filter(pokemon => {
    if (pokemonTypesFilter.length === 0) {
      return true
    }
    return pokemonTypesFilter.every(type => {
      return pokemon.types.some(pokemonType => pokemonType.name === type)
    })
  })

  // const isAllDataLoaded = allData?.length === maxLength

  return (
    <div>
      {filteredPokemonData && (
        <>
          <div className='sm:hidden'>
            <PokedexCardList
              allPokemon={filteredPokemonData}
              infiniteQueryResult={queryResult}
            />
            <div className='absolute bottom-8 left-0 right-0 flex items-center justify-center'>
              <PokedexFilterBottomSheet
                activeTypeFilter={pokemonTypesFilter}
                setActiveTypeFilter={setPokemonTypesFilter}
                triggerComponent={
                  <div className='button bg-gray-950 text-white h-12 flex items-center justify-center w-[100px] rounded-full shadow font-semibold text-sm'>
                    <HiOutlineAdjustments size={18} />
                    <span className='ml-2'>Filter</span>
                  </div>
                }
              />
            </div>
          </div>
          <div className='hidden sm:block'>
            <div>
              <PokedexFilterBar
                activeTypeFilter={pokemonTypesFilter}
                setActiveTypeFilter={setPokemonTypesFilter}
              />
            </div>
            <PokedexTable allPokemon={filteredPokemonData} />
            {!isFetchingNextPage && hasNextPage && (
            <IntersectHelper callback={fetchNextPage} />
          )}
          </div>
        </>
      )}
    </div>
  )
}

function IntersectHelper({ callback }: { callback: () => void }) {
  const [ref, entry] = useIntersectionObserver({
    rootMargin: '4000px 0px 4000px 0px'
  })

  const isIntersecting = entry?.isIntersecting

  useEffect(() => {
    if (isIntersecting) {
      callback()
    }
  }, [isIntersecting, callback])

  return <div ref={ref} />
}
