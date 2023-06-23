import { AllPokemonQueryQuery } from "@/gql/graphql";

export type pokemonType = AllPokemonQueryQuery['getAllPokemon'][0]
