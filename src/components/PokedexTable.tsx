import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { AllPokemonQueryQuery } from '@/gql/graphql'

interface PokedexTableProps {
  allPokemon: AllPokemonQueryQuery['getAllPokemon']
}

export default function PokedexTable({ allPokemon }: PokedexTableProps) {
  return (
    <Table>
      <TableCaption>List of All Pokemon.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=''>Number</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className='text-right'>Total Base Stats</TableHead>
          <TableHead className='text-right'>HP</TableHead>
          <TableHead className='text-right'>Attack</TableHead>
          <TableHead className='text-right'>Defense</TableHead>
          <TableHead className='text-right'>Sp. Att</TableHead>
          <TableHead className='text-right'>Sp. Def</TableHead>
          <TableHead className='text-right'>Speed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allPokemon.map(pokemon => (
          <TableRow key={pokemon.key}>
            <TableCell className='font-medium'>{pokemon.num}</TableCell>
            <TableCell>
              <div className='w-12 h-12 mr-4 object-contain flex items-center justify-center'>
                <img
                  src={pokemon.sprite}
                  alt={pokemon.key}
                  className='max-h-full'
                />
              </div>
            </TableCell>
            <TableCell className='font-medium text-gray-900 capitalize'>{pokemon.species.replace(/-/g, ' ')}</TableCell>
            <TableCell className='text-right'>{pokemon.baseStatsTotal}</TableCell>
            <TableCell className='text-right'>{pokemon.baseStats.hp}</TableCell>
            <TableCell className='text-right'>{pokemon.baseStats.attack}</TableCell>
            <TableCell className='text-right'>{pokemon.baseStats.defense}</TableCell>
            <TableCell className='text-right'>{pokemon.baseStats.specialattack}</TableCell>
            <TableCell className='text-right'>{pokemon.baseStats.specialdefense}</TableCell>
            <TableCell className='text-right'>{pokemon.baseStats.speed}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
