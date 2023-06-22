/**
 * Source:
 * https://github.com/uidotdev/usehooks/blob/main/index.js
 */

import * as React from 'react'

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
):  [
  React.MutableRefObject<null>,
  IntersectionObserverEntry | null
] {
  const { threshold = 1, root = null, rootMargin = '0%' } = options
  const ref = React.useRef(null)
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(
    null
  )

  React.useEffect(() => {
    const node = ref?.current

    if (!node || typeof IntersectionObserver !== 'function') {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
      },
      { threshold, root, rootMargin }
    )

    observer.observe(node)

    return () => {
      setEntry(null)
      observer.disconnect()
    }
  }, [threshold, root, rootMargin])

  return [ref, entry]
}
