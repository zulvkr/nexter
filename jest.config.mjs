import nextJest from 'next/jest.js'

/**
 * Reference:
 * https://nextjs.org/docs/pages/building-your-application/optimizing/testing#jest-and-react-testing-library
 */
 
const createJestConfig = nextJest({
  dir: './',
})
 
/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
}
 
export default createJestConfig(config)