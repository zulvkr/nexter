import { AllPokemonQueryQuery } from '@/gql/graphql'

type pokemonType = AllPokemonQueryQuery['getAllPokemon'][0]

function PokedexCard({ pokemon }: { pokemon: pokemonType }) {
  return (
    <div className='flex flex-row items-center justify-between w-full px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm'>
      <div className='flex flex-row items-center'>
        <div className='w-12 h-12 mr-4 object-contain flex items-center justify-center'>
          <img src={pokemon.sprite} alt={pokemon.key} className='max-h-full' />
        </div>
        <div className='flex flex-col'>
          <div className='text-sm font-medium text-gray-900 capitalize'>
            {pokemon.species.replace(/-/g, ' ')}
          </div>
          <div className='text-xs text-gray-500'>{pokemon.types[0].name}</div>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <div className='text-xs text-gray-500'>#{pokemon.num}</div>
        <div className='text-xs text-gray-500'>
          {pokemon.baseStatsTotal} BST
        </div>
      </div>
    </div>
  )
}

interface PokedexCardListProps {
  allPokemon: AllPokemonQueryQuery['getAllPokemon']
}

export default function PokedexCardList({ allPokemon }: PokedexCardListProps) {
  return (
    <div className='grid grid-cols-1 gap-4 px-4'>
      {allPokemon.map(pokemon => (
        <PokedexCard key={pokemon.key} pokemon={pokemon} />
      ))}
    </div>
  )
}
