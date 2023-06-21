import { render, screen } from '@testing-library/react'
import Home from '@/app/page.tsx'
import '@testing-library/jest-dom'
 
describe('Home', () => {
  it('should show Next.js logo', () => {
    render(<Home />)
 
    const docsLink = screen.getByRole('img', {
      // Next.js Logo alt
      name: /next\.js logo/i,

    })
 
    expect(docsLink).toBeInTheDocument()
    expect(docsLink).toHaveAttribute('src', '/next.svg')
  })
})