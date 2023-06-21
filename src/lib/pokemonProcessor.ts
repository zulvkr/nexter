import { AllPokemonQueryQuery } from '@/gql/graphql'

export function processPokemon(pokemon: AllPokemonQueryQuery['getAllPokemon']) {
  // remove all pokemon that has same key but keep the first one
  const uniquePokemon = pokemon.filter(
    (pk, index, self) => index === self.findIndex(p => p.num === pk.num)
  )
  return uniquePokemon
}
