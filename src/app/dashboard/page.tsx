'use client';

import { motion } from 'framer-motion';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const stats = [
  {
    title: 'Total Revenue',
    value: formatCurrency(45231.89),
    change: 12.5,
    icon: DollarSign,
    color: '#10b981',
  },
  {
    title: 'Total Orders',
    value: '2,543',
    change: 8.2,
    icon: ShoppingCart,
    color: '#667eea',
  },
  {
    title: 'Total Customers',
    value: '1,234',
    change: 15.3,
    icon: Users,
    color: '#f59e0b',
  },
  {
    title: 'Total Products',
    value: '456',
    change: 3.1,
    icon: Package,
    color: '#ef4444',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, Admin! 👋
        </h1>
        <p className="text-gray-400">
          Here's what's happening with your store today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SalesChart />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Top Products
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      Product Name {i}
                    </p>
                    <p className="text-xs text-gray-400">{45 - i * 5} sold</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white">
                  {formatCurrency(99.99 * i)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <RecentOrders />
      </motion.div>
    </div>
  );
}
