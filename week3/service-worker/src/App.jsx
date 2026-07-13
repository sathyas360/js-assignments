import { useEffect, useState } from 'react'

const STORAGE_KEY = 'notifications'

const load = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
const save = (list) => localStorage.setItem(STORAGE_KEY, JSON.stringify(list))

export default function App() {
  const [notifications, setNotifications] = useState(load)
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }
  }, [])

  // a push event arrives here as a message forwarded by the service worker
  useEffect(() => {
    const onMessage = (event) => {
      setNotifications((prev) => {
        const next = [event.data, ...prev]
        save(next)
        return next
      })
    }
    navigator.serviceWorker?.addEventListener('message', onMessage)
    return () => navigator.serviceWorker?.removeEventListener('message', onMessage)
  }, [])

  // basic online/offline awareness
  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  const markAsRead = (id) => {
    setNotifications((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      save(next)
      return next
    })
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="app">
      <header>
        <h1>
          Notifications {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </h1>
        <span className={online ? 'status online' : 'status offline'}>
          {online ? 'online' : 'offline'}
        </span>
      </header>

      <p className="hint">
        Open the DevTools Application tab and click on push to simulate a push event
      </p>

      <ul className="list">
        {notifications.length === 0 && <li className="empty">No notifications yet</li>}
        {notifications.map((n) => (
          <li key={n.id} className={n.read ? 'read' : 'unread'} onClick={() => markAsRead(n.id)}>
            <span className="dot" />
            <span className="message">{n.message}</span>
            <time>{new Date(n.timestamp).toLocaleTimeString()}</time>
          </li>
        ))}
      </ul>
    </div>
  )
}
