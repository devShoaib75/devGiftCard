import type { Repo } from '../hooks/useGitHub'

function daysSince(date?: string | null) {
  if (!date) return Infinity
  const then = new Date(date).getTime()
  return (Date.now() - then) / (1000 * 60 * 60 * 24)
}

// Compute a 0-100 activity score based on repo recency, repo count, and language diversity
export function computeActivityScore(repos: Repo[] | undefined, followers = 0) {
  if (!repos || repos.length === 0) return 10

  const total = repos.length

  // recentness: count repos pushed within 7,30,90 days
  const recent7 = repos.filter((r) => daysSince(r.pushed_at) <= 7).length
  const recent30 = repos.filter((r) => daysSince(r.pushed_at) <= 30).length
  const recent90 = repos.filter((r) => daysSince(r.pushed_at) <= 90).length

  // language diversity
  const langs = new Set(repos.map((r) => r.language).filter(Boolean))
  const langScore = Math.min(15, langs.size * 2) // up to 15

  // repo activity score (weighted by recency)
  const activityScore = (recent7 * 5) + (recent30 * 2) + (recent90 * 1)

  // normalize activity to 0-50
  const activityNorm = Math.min(50, activityScore)

  // followers contributes up to 15 points
  const followerScore = Math.min(15, Math.log10(Math.max(1, followers)) * 3)

  // repo count contributes up to 20
  const repoScore = Math.min(20, Math.log2(total + 1) * 3)

  const score = Math.round(activityNorm + repoScore + followerScore + langScore)
  return Math.max(10, Math.min(100, score))
}

export default computeActivityScore
