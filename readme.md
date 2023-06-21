# Pokedex Browser

## Description

This is a simple pokedex browser that allows you to search for pokemon and view their details.

## Development

1. Clone the repository
2. Install dependencies

   ```bash
   npm install
   ```

3. Run the development server

   ```bash
   # in linux or mac
   npm run dev:linux

   # in windows, run two terminal instances
   npm run dev
   # and
   npm run dev:graphql
   ```

## Stack

- [Next.js](https://nextjs.org/)
- [React Query](https://react-query.tanstack.com/)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen/docs/getting-started)

## Known Issues

- Dev server will warn `Module not found: Can't resolve 'encoding'`. [This is a known issue in graphql-request](https://github.com/jasonkuhrt/graphql-request/issues/448).
