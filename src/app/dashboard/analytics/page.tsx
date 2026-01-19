'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { DollarSign, ShoppingCart, Users, TrendingUp, Package, Star } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalRevenue: 158658.90,
    totalOrders: 100,
    totalCustomers: 30,
    totalProducts: 50,
    avgOrderValue: 1586.59,
    conversionRate: 23.5,
  });

  const categoryData = [
    { name: 'Electronics', value: 35, amount: 55430 },
    { name: 'Clothing', value: 25, amount: 39665 },
    { name: 'Home & Garden', value: 20, amount: 31732 },
    { name: 'Sports', value: 20, amount: 31832 },
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 12450, orders: 78 },
    { month: 'Feb', revenue: 15230, orders: 95 },
    { month: 'Mar', revenue: 18960, orders: 119 },
    { month: 'Apr', revenue: 21340, orders: 134 },
    { month: 'May', revenue: 19870, orders: 125 },
    { month: 'Jun', revenue: 22560, orders: 142 },
  ];

  const topProducts = [
    { name: 'Wireless Headphones Pro', sales: 145, revenue: 14500 },
    { name: 'Smart Watch Ultra', sales: 132, revenue: 26400 },
    { name: 'Laptop Stand Premium', sales: 98, revenue: 7840 },
    { name: 'Mechanical Keyboard RGB', sales: 87, revenue: 13050 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">Detailed insights and performance metrics</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Total Revenue</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-green-500" />
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400 font-medium">+12.5%</span>
              <span className="text-gray-400 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Avg Order Value</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {formatCurrency(stats.avgOrderValue)}
                </p>
              </div>
              <ShoppingCart className="w-12 h-12 text-blue-500" />
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400 font-medium">+8.2%</span>
              <span className="text-gray-400 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Conversion Rate</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.conversionRate}%
                </p>
              </div>
              <Star className="w-12 h-12 text-yellow-500" />
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400 font-medium">+15.3%</span>
              <span className="text-gray-400 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="revenue" fill="#667eea" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-white">{product.name}</p>
                    <p className="text-sm text-gray-400">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">{formatCurrency(product.revenue)}</p>
                  <p className="text-sm text-gray-400">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
