import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'

// Dynamically import all images from photo folder
const imageModules = import.meta.glob('/src/photo/*.{jpg,jpeg,png,gif,webp}', { eager: true })
const images = Object.entries(imageModules)
  .filter(([path]) => !path.includes('bg.jpg'))
  .map(([, module]: [string, any]) => module.default)

type Props = {
  onClose: () => void
}

export default function Memories({ onClose }: Props) {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % images.length)
  const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length)

  // Auto-play slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 5000) // Change image every 5 seconds
    return () => clearInterval(interval)
  }, [current])

  // Touch swipe support
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) next()
    if (touchStart - touchEnd < -75) prev()
  }

  return (
    <motion.div
      className="memories-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="close-btn" onClick={onClose}>
        <FiX />
      </button>

      <div className="memories-container">
        <button className="nav-btn prev" onClick={prev}>
          <FiChevronLeft />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="slide"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img src={images[current]} alt={`Memory ${current + 1}`} />
          </motion.div>
        </AnimatePresence>

        <button className="nav-btn next" onClick={next}>
          <FiChevronRight />
        </button>
      </div>

      <div className="slide-counter">
        {current + 1} / {images.length}
      </div>

      <div className="slide-indicators">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`indicator ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </motion.div>
  )
}
