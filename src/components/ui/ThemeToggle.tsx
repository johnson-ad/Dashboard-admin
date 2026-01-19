'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: 'dark', icon: Moon, color: 'from-purple-500 to-blue-600' },
    { name: 'light', icon: Sun, color: 'from-yellow-400 to-orange-500' },
    { name: 'cyberpunk', icon: Zap, color: 'from-pink-500 to-cyan-500' },
  ] as const;

  return (
    <div className="flex items-center gap-2 p-1 glass-card rounded-xl">
      {themes.map(({ name, icon: Icon, color }) => (
        <motion.button
          key={name}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(name)}
          className={`relative p-2 rounded-lg transition-all ${
            theme === name
              ? `bg-gradient-to-r ${color} text-white shadow-lg`
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Icon className="w-5 h-5" />
          {theme === name && (
            <motion.div
              layoutId="activeTheme"
              className="absolute inset-0 rounded-lg bg-gradient-to-r opacity-20"
              style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
