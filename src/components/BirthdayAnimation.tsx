import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function BirthdayAnimation() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 8000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <motion.div
      className="birthday-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 7.5, duration: 0.5 }}
    >
      {[...Array(50)].map((_, i) => (
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
        initial={{ x: '100vw', opacity: 0, scale: 0.5 }}
        animate={{ 
          x: 0, 
          opacity: 1, 
          scale: [0.5, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 1.5, 
          ease: 'easeOut',
          scale: { times: [0, 0.6, 1], duration: 1.5 },
          rotate: { delay: 1.5, duration: 0.5, repeat: Infinity, repeatDelay: 1 }
        }}
      >
        🎉 Happy Birthday Jetty! 🎂
      </motion.div>
      <motion.div
        className="birthday-subtext"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        ✨ Wishing you an amazing year ahead! ✨
      </motion.div>
    </motion.div>
  )
}
