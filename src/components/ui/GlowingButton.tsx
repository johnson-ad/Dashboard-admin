'use client';

import { motion } from 'framer-motion';
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface GlowingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  glow?: boolean;
}

export function GlowingButton({
  children,
  variant = 'primary',
  glow = true,
  className,
  ...props
}: GlowingButtonProps) {
  const variants = {
    primary: 'from-blue-500 to-purple-600',
    secondary: 'from-gray-600 to-gray-800',
    success: 'from-green-500 to-emerald-600',
    danger: 'from-red-500 to-rose-600',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative px-6 py-3 rounded-xl font-semibold text-white overflow-hidden group',
        className
      )}
      {...props}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${variants[variant]}`} />
      
      {/* Glow effect */}
      {glow && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${variants[variant]} blur-xl opacity-0 group-hover:opacity-50`}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}
      
      {/* Shine animation */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
