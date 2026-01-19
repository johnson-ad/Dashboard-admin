'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  color: string;
}

export function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <Card hover className="relative overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
        style={{ background: color }}
      />

      <CardContent className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-2"
            >
              {value}
            </motion.h3>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span
                className={`text-sm font-medium ${
                  isPositive ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {isPositive ? '+' : ''}
                {change}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          </div>

          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
