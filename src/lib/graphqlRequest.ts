import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('https://graphqlpokemon.favware.tech/v7', {
  fetch
})

export default client
