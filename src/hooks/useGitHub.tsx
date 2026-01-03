import { useEffect, useState } from 'react'
import axios from 'axios'

export type GitHubUser = {
  login: string
  avatar_url: string
  name?: string
  bio?: string
  public_repos: number
  followers: number
  html_url: string
}

export type Repo = {
  id: number
  name: string
  full_name: string
  html_url: string
  language: string | null
  pushed_at: string | null
  updated_at: string | null
}

type State = {
  loading: boolean
  user?: GitHubUser
  repos?: Repo[]
  error?: string
}

const GITHUB_API = 'https://api.github.com'

export function useGitHub(username?: string) {
  const [state, setState] = useState<State>({ loading: false })

  useEffect(() => {
    if (!username) return

    let cancelled = false
    async function fetchAll() {
      setState({ loading: true })
      try {
        const userRes = await axios.get(`${GITHUB_API}/users/${username}`)
        const user: GitHubUser = userRes.data

        // fetch repos (public only), try to get most recent 100
        const reposRes = await axios.get(
          `${GITHUB_API}/users/${username}/repos?per_page=100&sort=pushed`
        )
        const repos: Repo[] = reposRes.data.map((r: any) => ({
          id: r.id,
          name: r.name,
          full_name: r.full_name,
          html_url: r.html_url,
          language: r.language,
          pushed_at: r.pushed_at,
          updated_at: r.updated_at,
        }))

        if (!cancelled) setState({ loading: false, user, repos })
      } catch (err: any) {
        const msg = parseError(err)
        if (!cancelled) setState({ loading: false, error: msg })
      }
    }

    fetchAll()
    return () => {
      cancelled = true
    }
  }, [username])

  return state
}

function parseError(e: any) {
  if (e?.response) {
    const status = e.response.status
    if (status === 404) return 'User not found.'
    if (status === 403) return 'Rate limit exceeded. Try again later.'
    return `GitHub API error (${status}).`
  }
  if (e?.message) return e.message
  return 'Network error.'
}

export default useGitHub
