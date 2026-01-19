'use client';

import { motion } from 'framer-motion';

export function FloatingOrbs() {
  const orbs = [
    { size: 400, x: '10%', y: '20%', delay: 0, color: 'from-purple-500/20 to-pink-500/20' },
    { size: 300, x: '70%', y: '60%', delay: 2, color: 'from-blue-500/20 to-cyan-500/20' },
    { size: 350, x: '80%', y: '10%', delay: 4, color: 'from-pink-500/20 to-orange-500/20' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
