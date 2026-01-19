'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function AnimatedCard({ children, className, delay = 0, hover = true }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={hover ? {
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      className={cn(
        'glass-card rounded-2xl p-6 relative overflow-hidden group',
        className
      )}
    >
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))',
          filter: 'blur(20px)',
        }}
      />
      
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
