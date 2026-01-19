'use client';

import { motion } from 'framer-motion';

export function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(102, 126, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(102, 126, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
    </div>
  );
}
