'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  MessageSquare,
  Settings,
  BarChart3,
  FileText,
  CreditCard,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: ShoppingCart, label: 'Orders', href: '/dashboard/orders' },
  { icon: Package, label: 'Products', href: '/dashboard/products' },
  { icon: Users, label: 'Customers', href: '/dashboard/customers' },
  { icon: Tag, label: 'Categories', href: '/dashboard/categories' },
  { icon: CreditCard, label: 'Coupons', href: '/dashboard/coupons' },
  { icon: MessageSquare, label: 'Reviews', href: '/dashboard/reviews' },
  { icon: FileText, label: 'Reports', href: '/dashboard/reports' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
        }}
        className={cn(
          'fixed left-0 top-0 h-screen w-64 glass-card border-r border-white/10 z-50',
          'lg:translate-x-0 transition-transform duration-300'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-gradient">Admin Dashboard</h1>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer',
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
}
