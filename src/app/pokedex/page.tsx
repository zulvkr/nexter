'use client'

import { graphql } from '@/gql'
import { useQuery } from '@tanstack/react-query'
import client from '@/lib/graphqlRequest'

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
  const { data } = useQuery({
    queryKey: ['allPokemon'],
    // All pokemon without missingno
    queryFn: async () =>
      await client.request(allPokemon, {
        offset: 89,
        take: 1010
      })
  })
  return (
    <div>
      <pre>{data && JSON.stringify(data, null, 2)}</pre>
      <h1>Pokedex</h1>
    </div>
  )
}
