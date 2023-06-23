import { render, screen } from '@testing-library/react'
import { PokedexCard } from '@/components/PokedexCardList'
import '@testing-library/jest-dom'
import type { pokemonType } from '@/types/pokemon'
import { AbilitiesEnum, PokemonEnum } from '@/gql/graphql'

describe('PokedexCard', () => {
  const bulbasaurPokemon: pokemonType = {
    num: 1,
    key: PokemonEnum.Bulbasaur,
    species: 'bulbasaur',
    baseSpecies: null,
    sprite: 'https://play.pokemonshowdown.com/sprites/ani/bulbasaur.gif',
    backSprite:
      'https://play.pokemonshowdown.com/sprites/ani-back/bulbasaur.gif',
    height: 0.7,
    color: 'Green',
    baseStats: {
      attack: 49,
      defense: 49,
      hp: 45,
      specialattack: 65,
      specialdefense: 65,
      speed: 45
    },
    baseStatsTotal: 318,
    catchRate: {
      base: 45
    },
    legendary: false,
    mythical: false,
    types: [
      {
        name: 'Grass'
      },
      {
        name: 'Poison'
      }
    ],
    abilities: {
      first: {
        key: AbilitiesEnum.Overgrow,
        shortDesc:
          "At 1/3 or less of its max HP, this Pokémon's offensive stat is 1.5x with Grass attacks."
      },
      hidden: {
        shortDesc: "If Sunny Day is active, this Pokémon's Speed is doubled.",
        key: AbilitiesEnum.Chlorophyll,
        name: 'Chlorophyll'
      }
    },
    flavorTexts: [
      {
        flavor:
          'For some time after its birth, it grows by taking nourishment from the seed on its back.'
      }
    ],
    levellingRate: 'Medium Slow'
  }

  it('should display pokemon name', () => {

    render(<PokedexCard pokemon={bulbasaurPokemon} />)

    const cardHeading = screen.getByRole('heading', {
      name: 'bulbasaur'
    })

    expect(cardHeading).toBeInTheDocument()
  })

  it('should display pokemon types', () => {
    render(<PokedexCard pokemon={bulbasaurPokemon} />)

    const cardTypes = screen.getAllByRole('listitem', {
      name: /grass|poison/i
    })

    expect(cardTypes).toHaveLength(2)
  })

  it('should display pokemon sprite', () => {
    render(<PokedexCard pokemon={bulbasaurPokemon} />)

    const cardImage = screen.getByRole('img', {
      name: 'bulbasaur',
    })

    expect(cardImage).toBeInTheDocument()
  })

  it('should display pokemon base stats', () => {
    render(<PokedexCard pokemon={bulbasaurPokemon} />)

    const cardBaseStats = screen.getAllByRole('rowheader', {
      name: /Total|HP|Attack|Defense|Sp\. Att|Sp. Def|Speed/i
    })

    expect(cardBaseStats).toHaveLength(7)


    const cardBaseStatsValues = screen.getAllByRole('cell', {
      name: /318|49|49|45|65|65|45/i

    })

    expect(cardBaseStatsValues).toHaveLength(7)

  })
})
