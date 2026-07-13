import { useEffect, useState } from 'react'

const TWO_MINUTES = 2 * 60 * 1000

// Module scope, not inside the hook — so every component that imports useFetch
// shares this one Map, and it survives re-renders and unmounts.
// Shape: url -> { time, data }
const cache = new Map()

export default function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const hit = cache.get(url)

    // Fresh hit: serve from cache, no network call.
    if (hit && Date.now() - hit.time < TWO_MINUTES) {
      setData(hit.data)
      setLoading(false)
      setError(null)
      return
    }

    // Miss or expired: fetch and overwrite the entry.
    setLoading(true)
    setError(null)

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        return res.json()
      })
      .then((json) => {
        cache.set(url, { time: Date.now(), data: json })
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [url])

  return { data, loading, error }
}
