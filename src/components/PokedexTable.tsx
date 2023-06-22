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
          <TableHead className='w-[100px]'>Number</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className='text-right'>Total</TableHead>
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
            <TableCell>{pokemon.species.replace(/-/g, ' ')}</TableCell>
            <TableCell className='text-right'>{pokemon.baseStatsTotal}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
