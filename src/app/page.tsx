'use client'

import { graphql } from '@/gql'
import { useInfiniteQuery } from '@tanstack/react-query'
import client from '@/lib/graphqlRequest'
import { processPokemon } from '@/lib/pokemonProcessor'
import PokedexTable from '@/components/PokedexTable'
import PokedexCardList from '@/components/PokedexCardList'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useEffect } from 'react'

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

  const { data } = queryResult

  const allData = data?.pages.flatMap(x => x?.res.getAllPokemon)

  const allPokemonData = allData ? processPokemon(allData) : undefined

  // const isAllDataLoaded = allData?.length === maxLength

  return (
    <div>
      {allPokemonData && (
        <>
          <div className='sm:hidden'>
            <PokedexCardList
              allPokemon={allPokemonData}
              infiniteQueryResult={queryResult}
            />
          </div>
          <div className='hidden sm:block'>
            <PokedexTable allPokemon={allPokemonData} />
            {/* {!isFetchingNextPage && !isAllDataLoaded && (
            <IntersectHelper callback={fetchNextPage} />
          )} */}
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
