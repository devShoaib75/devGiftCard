import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function BirthdayAnimation() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <motion.div
      className="birthday-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3.5, duration: 0.5 }}
    >
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="confetti"
          initial={{ y: '100vh', x: `${Math.random() * 100}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: '-20vh',
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            ease: 'easeOut',
            delay: Math.random() * 0.5
          }}
          style={{
            backgroundColor: ['#7c5cff', '#ff6b9d', '#ffd93d', '#6bcf7f'][Math.floor(Math.random() * 4)]
          }}
        />
      ))}
      <motion.div
        className="birthday-text"
        initial={{ y: '100vh', scale: 0.5, opacity: 0 }}
        animate={{ y: '40vh', scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        🎉 Happy Birthday Jetty! 🎂
      </motion.div>
    </motion.div>
  )
}
