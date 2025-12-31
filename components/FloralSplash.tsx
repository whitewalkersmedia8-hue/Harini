import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
interface FloralSplashProps {
  onComplete: () => void;
}
export function FloralSplash({
  onComplete
}: FloralSplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);
  return <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFFEF7]" exit={{
    opacity: 0
  }} transition={{
    duration: 1
  }}>
      <div className="relative w-64 h-64 md:w-96 md:h-96">
        {/* Center Text */}
        <motion.div initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: 1,
        duration: 1
      }} className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900">
            H & A
          </h1>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-gray-500 mt-2">
            Wedding Invitation
          </p>
        </motion.div>

        {/* Animated Floral Elements */}
        <svg className="w-full h-full" viewBox="0 0 200 200">
          {/* Circle Path for drawing */}
          <motion.circle cx="100" cy="100" r="80" fill="none" stroke="#1a1a1a" strokeWidth="0.5" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={{
          pathLength: 1,
          opacity: 0.2
        }} transition={{
          duration: 2,
          ease: 'easeInOut'
        }} />

          {/* Blooming Petals */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => <motion.g key={angle} initial={{
          scale: 0,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          delay: 0.5 + i * 0.1,
          duration: 1,
          type: 'spring'
        }} style={{
          transformOrigin: '100px 100px'
        }}>
              <motion.path d={`M100 100 Q${100 + Math.cos((angle - 30) * Math.PI / 180) * 50} ${100 + Math.sin((angle - 30) * Math.PI / 180) * 50} ${100 + Math.cos(angle * Math.PI / 180) * 90} ${100 + Math.sin(angle * Math.PI / 180) * 90} Q${100 + Math.cos((angle + 30) * Math.PI / 180) * 50} ${100 + Math.sin((angle + 30) * Math.PI / 180) * 50} 100 100`} fill="none" stroke="#1a1a1a" strokeWidth="0.5" initial={{
            pathLength: 0
          }} animate={{
            pathLength: 1
          }} transition={{
            delay: 0.5 + i * 0.1,
            duration: 1.5
          }} />
            </motion.g>)}
        </svg>
      </div>
    </motion.div>;
}