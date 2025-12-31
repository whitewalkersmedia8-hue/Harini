import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Petal SVG shapes
const PETAL_SHAPES = ['M10 0C10 0 20 10 20 20C20 30 10 40 10 40C10 40 0 30 0 20C0 10 10 0 10 0Z', 'M15 0C15 0 30 15 30 30C30 45 15 60 15 60C15 60 0 45 0 30C0 15 15 0 15 0Z', 'M12 0C12 0 24 12 24 24C24 36 12 48 12 48C12 48 0 36 0 24C0 12 12 0 12 0Z'];
interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  scale: number;
  shapeIndex: number;
  rotation: number;
}
export function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);
  useEffect(() => {
    // Create initial set of petals
    const newPetals = Array.from({
      length: 15
    }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 15,
      scale: 0.5 + Math.random() * 0.5,
      shapeIndex: Math.floor(Math.random() * PETAL_SHAPES.length),
      rotation: Math.random() * 360
    }));
    setPetals(newPetals);
  }, []);
  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map(petal => <motion.div key={petal.id} className="absolute top-[-50px] text-pink-200/40" style={{
      left: `${petal.x}%`
    }} initial={{
      y: -50,
      opacity: 0,
      rotate: petal.rotation
    }} animate={{
      y: '110vh',
      opacity: [0, 0.8, 0.8, 0],
      rotate: petal.rotation + 360,
      x: [0, 20, -20, 0] // Swaying motion
    }} transition={{
      duration: petal.duration,
      delay: petal.delay,
      repeat: Infinity,
      ease: 'linear',
      times: [0, 0.1, 0.9, 1]
    }}>
          <svg width={30 * petal.scale} height={60 * petal.scale} viewBox="0 0 30 60" fill="currentColor" style={{
        filter: 'blur(1px)'
      }}>
            <path d={PETAL_SHAPES[petal.shapeIndex]} />
          </svg>
        </motion.div>)}
    </div>;
}