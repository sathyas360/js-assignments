import { useState } from 'react'
import useFetch from './useFetch.js'

const URLS = [
  { label: 'User 1', url: 'https://jsonplaceholder.typicode.com/users/1' },
  { label: 'User 2', url: 'https://jsonplaceholder.typicode.com/users/2' },
  { label: 'User 3', url: 'https://jsonplaceholder.typicode.com/users/3' },
]

function UserCard({ name, url }) {
  const { data, loading, error } = useFetch(url)

  return (
    <div className="card">
      <h2>{name}</h2>
      {loading && <p className="muted">Loading…</p>}
      {error && <p className="error">{error.message}</p>}
      {data && (
        <ul>
          <li><strong>{data.name}</strong></li>
          <li>{data.email}</li>
          <li>{data.company?.name}</li>
        </ul>
      )}
    </div>
  )
}

export default function App() {
  const [url, setUrl] = useState(URLS[0].url)
  const [showSecond, setShowSecond] = useState(false)

  return (
    <div className="page">
      <h1>useFetch</h1>
      <p className="hint">
        Open the network tab and click each card to test fetch
      </p>

      <div className="row">
        {URLS.map((u) => (
          <button
            key={u.url}
            onClick={() => setUrl(u.url)}
            className={u.url === url ? 'active' : ''}
          >
            {u.label}
          </button>
        ))}
        <button onClick={() => setShowSecond((s) => !s)}>
          {showSecond ? 'Unmount B' : 'Mount B'}
        </button>
      </div>

      <div className="row">
        <UserCard name="Component A" url={url} />
        {showSecond && <UserCard name="Component B" url={url} />}
      </div>
    </div>
  )
}
