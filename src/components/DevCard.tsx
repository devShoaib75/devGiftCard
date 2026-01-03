import React, { useMemo } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import type { GitHubUser, Repo } from '../hooks/useGitHub'
import computeActivityScore from '../utils/score'
import { FiExternalLink } from 'react-icons/fi'
import { QRCodeSVG } from 'qrcode.react'

type Props = {
  user?: GitHubUser
  repos?: Repo[]
  loading?: boolean
  error?: string
}

function formatDate(d?: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString()
}

export const DevCard: React.FC<Props> = ({ user, repos }) => {
  const score = useMemo(() => computeActivityScore(repos, user?.followers || 0), [repos, user])
  
  const shareUrl = useMemo(() => {
    if (!user?.login) return ''
    return `${window.location.origin}${window.location.pathname}?u=${user.login}`
  }, [user?.login])

  // tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [5, -5])
  const rotateY = useTransform(x, [-50, 50], [-5, 5])

  const topLangs = useMemo(() => {
    if (!repos) return [] as string[]
    const counts = repos.reduce<Record<string, number>>((acc, r) => {
      const l = r.language || 'Unknown'
      acc[l] = (acc[l] || 0) + 1
      return acc
    }, {})
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map((t) => t[0])
  }, [repos])

  const lastActivity = useMemo(() => {
    if (!repos || repos.length === 0) return '—'
    const sorted = [...repos].sort((a, b) => (b.pushed_at || '').localeCompare(a.pushed_at || ''))
    return formatDate(sorted[0].pushed_at)
  }, [repos])

  return (
    <div className="devcard-wrap">
      <motion.div
        className="devcard"
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        whileTap={{ scale: 0.98 }}
        onMouseMove={(e) => {
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const deltaX = (e.clientX - cx) / 10
          const deltaY = (e.clientY - cy) / 10
          x.set(deltaX)
          y.set(deltaY)
        }}
        onMouseLeave={() => {
          x.set(0)
          y.set(0)
        }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      >
        <div className="devcard-left">
          <div className="avatar-wrap">
            <img src={user?.avatar_url} alt={user?.login} className="avatar" />
          </div>
          {shareUrl && (
            <div className="qr-wrap">
              <QRCodeSVG 
                value={shareUrl} 
                size={100}
                bgColor="transparent"
                fgColor="#7c5cff"
                level="M"
              />
            </div>
          )}
        </div>
        <div className="devcard-main">
          <div className="header">
            <div>
              <h2>{user?.name || user?.login || '—'}</h2>
              <p className="muted">{user?.bio || '—'}</p>
            </div>
            <a className="profile-link" href={user?.html_url} target="_blank" rel="noreferrer">
              <FiExternalLink />
            </a>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="value">{user?.public_repos ?? '—'}</div>
              <div className="label">Repos</div>
            </div>
            <div className="stat">
              <div className="value">{user?.followers ?? '—'}</div>
              <div className="label">Followers</div>
            </div>
            <div className="stat">
              <div className="value">{lastActivity}</div>
              <div className="label">Last Activity</div>
            </div>
          </div>

          <div className="langs">
            {topLangs.map((l) => (
              <span key={l} className="lang">
                {l}
              </span>
            ))}
          </div>

          <div className="score-row">
            <div className="score-ring">
              <svg viewBox="0 0 36 36">
                <path
                  className="ring-bg"
                  d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  className="ring"
                  d="M18 2.0845a15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0 -31.831"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: score / 100 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
            </div>
            <div className="score-info">
              <div className="score-value">{score}</div>
              <div className="score-label muted">Activity</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="devcard-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        Built with care. Happy Birthday <motion.span
          className="jetty-text"
          animate={{ 
            scale: [1, 1.2, 1],
            color: ['#7c5cff', '#ff6b9d', '#7c5cff']
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          Jetty
        </motion.span>
      </motion.div>
    </div>
  )
}

export default DevCard
