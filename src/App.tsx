import React, { useEffect, useMemo, useState } from 'react'
import './index.css'
import './App.css'
import useGitHub from './hooks/useGitHub'
import DevCard from './components/DevCard'
import BirthdayAnimation from './components/BirthdayAnimation'

function parseQueryUser() {
  try {
    const p = new URLSearchParams(window.location.search)
    return p.get('u') || undefined
  } catch (e) {
    return undefined
  }
}

export default function App() {
  const qUser = useMemo(() => parseQueryUser(), [])
  const [username, setUsername] = useState<string | undefined>(qUser || 'shoaib3375')
  const [input, setInput] = useState('')

  useEffect(() => {
    if (qUser) setInput(qUser)
    else setInput('shoaib3375')
  }, [qUser])

  const { user, repos, loading, error } = useGitHub(username)

  function submit(e?: React.FormEvent) {
    e?.preventDefault()
    if (!input) return
    const params = new URLSearchParams(window.location.search)
    params.set('u', input)
    const url = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', url)
    setUsername(input)
  }

  return (
    <div id="root">
      <BirthdayAnimation />
      <main className="app-container">
        <h1 className="title">Jetty DevCard</h1>
        <p className="subtitle">Transform your GitHub profile into a premium developer identity card</p>

        <form className="search" onSubmit={submit}>
          <input
            placeholder="Enter GitHub username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="GitHub username"
          />
          <button type="submit">Load</button>
        </form>

        {error && <div className="error">{error}</div>}

        <div className="card-area">
          <DevCard user={user} repos={repos} loading={loading} error={error} />
        </div>

        <div className="notes muted">
          Tips: try <code>?u=torvalds</code> or any username. Share via URL.
        </div>
      </main>
    </div>
  )
}
