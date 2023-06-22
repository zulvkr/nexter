import { AllPokemonQueryQuery } from '@/gql/graphql'

type pokemonType = AllPokemonQueryQuery['getAllPokemon'][0]

function PokedexCard({ pokemon }: { pokemon: pokemonType }) {
  return (
    <div className='flex flex-row w-full gap-4 px-4 py-4 bg-white border border-gray-200 rounded-md shadow-sm'>
      <div className='flex-auto'>
        <div className='flex justify-between'>
          <div>
            <div className='font-medium text-gray-900 capitalize'>
              {pokemon.species.replace(/-/g, ' ')}
            </div>
            <div className='flex gap-1 mt-1'>
              {pokemon.types.map(type => (
                <div
                  key={type.name}
                  className='text-xs text-gray-500 capitalize w-15 border px-2 py-1 rounded'
                >
                  {type.name}
                </div>
              ))}
            </div>
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

        <div className='flex-auto grid grid-cols-[minmax(90px,1fr),minmax(50px,1fr)] text-sm text-gray-600 divide-y border-gray-50 [&>div]:py-1 mt-4'>
          <div>Total</div>
          <div className='text-right border-none'>{pokemon.baseStatsTotal}</div>
          <div>HP</div>
          <div className='text-right'>{pokemon.baseStats.hp}</div>
          <div>Attack</div>
          <div className='text-right'>{pokemon.baseStats.attack}</div>
          <div>Defense</div>
          <div className='text-right'>{pokemon.baseStats.defense}</div>
          <div>Sp. Att</div>
          <div className='text-right'>{pokemon.baseStats.specialattack}</div>
          <div>Sp. Def</div>
          <div className='text-right'>{pokemon.baseStats.specialdefense}</div>
          <div>Speed</div>
          <div className='text-right'>{pokemon.baseStats.speed}</div>
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
