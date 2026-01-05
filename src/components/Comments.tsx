import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Comment {
  id: string
  name: string
  message: string
  timestamp: string
}

export default function Comments() {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    loadComments()
  }, [])

  async function loadComments() {
    try {
      const res = await fetch('/api/comments')
      const data = await res.json()
      setComments(data)
    } catch {
      setComments([])
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString()
    }

    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
      })
      setComments([comment, ...comments])
      setName('')
      setMessage('')
      setShowForm(false)
    } catch {
      alert('Failed to save comment')
    }
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <button onClick={() => setShowForm(!showForm)} className="comment-btn">
        {showForm ? 'Cancel' : '💬 Add Comment'}
      </button>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="comment-form"
          >
            <input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <textarea
              placeholder="Your comment"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={3}
            />
            <button type="submit">Submit</button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="comments-list">
        {comments.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="comment-item"
          >
            <strong>{c.name}</strong>
            <p>{c.message}</p>
            <small>{new Date(c.timestamp).toLocaleString()}</small>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
