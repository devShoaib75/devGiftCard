import express from 'express'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import cors from 'cors'

const app = express()
const PORT = 3001
const COMMENTS_FILE = join(process.cwd(), 'public', 'comments.json')

app.use(cors())
app.use(express.json())

app.get('/api/comments', (req, res) => {
  try {
    const data = readFileSync(COMMENTS_FILE, 'utf-8')
    res.json(JSON.parse(data))
  } catch {
    res.json([])
  }
})

app.post('/api/comments', (req, res) => {
  try {
    let comments = []
    try {
      comments = JSON.parse(readFileSync(COMMENTS_FILE, 'utf-8'))
    } catch {}
    comments.unshift(req.body)
    writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2))
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to save' })
  }
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
