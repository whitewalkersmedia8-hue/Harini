import React from 'react';
import { motion } from 'framer-motion';
export function FloralArt({
  className = ''
}: {
  className?: string;
}) {
  return <div className={`relative overflow-hidden ${className}`}>
      <motion.svg viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover text-gray-900" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 1.5
    }}>
        {/* Main Stem */}
        <motion.path d="M200 800 C200 800 150 600 250 400 C350 200 100 100 100 0" stroke="currentColor" strokeWidth="2" initial={{
        pathLength: 0
      }} animate={{
        pathLength: 1
      }} transition={{
        duration: 2,
        ease: 'easeInOut'
      }} />

        {/* Leaves - Left Side */}
        <motion.path d="M220 700 Q150 650 180 600" stroke="currentColor" strokeWidth="1.5" fill="none" initial={{
        pathLength: 0
      }} animate={{
        pathLength: 1
      }} transition={{
        delay: 0.5,
        duration: 1.5
      }} />
        <motion.path d="M180 600 Q210 620 220 700" stroke="currentColor" strokeWidth="1" fill="none" initial={{
        pathLength: 0
      }} animate={{
        pathLength: 1
      }} transition={{
        delay: 0.5,
        duration: 1.5
      }} />

        {/* Leaves - Right Side */}
        <motion.path d="M230 500 Q300 450 280 400" stroke="currentColor" strokeWidth="1.5" fill="none" initial={{
        pathLength: 0
      }} animate={{
        pathLength: 1
      }} transition={{
        delay: 0.8,
        duration: 1.5
      }} />
        <motion.path d="M280 400 Q260 480 230 500" stroke="currentColor" strokeWidth="1" fill="none" initial={{
        pathLength: 0
      }} animate={{
        pathLength: 1
      }} transition={{
        delay: 0.8,
        duration: 1.5
      }} />

        {/* Large Flower Top */}
        <motion.g initial={{
        scale: 0,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} transition={{
        delay: 1.2,
        duration: 1
      }}>
          <path d="M100 100 C50 50 150 0 100 0 C50 0 150 50 100 100 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M100 100 C150 150 200 50 150 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M100 100 C50 150 0 50 50 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </motion.g>

        {/* Decorative Buds */}
        <motion.circle cx="250" cy="400" r="5" fill="currentColor" initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        delay: 1.5
      }} />
        <motion.circle cx="180" cy="600" r="4" fill="currentColor" initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        delay: 1.6
      }} />
      </motion.svg>
    </div>;
}