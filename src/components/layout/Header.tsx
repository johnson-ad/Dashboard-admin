'use client';

import { motion } from 'framer-motion';
import { Bell, Menu, Search, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-16 glass-card border-b border-white/10 sticky top-0 z-30">
      <div className="h-full flex items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          {/* Search */}
          <div className="hidden md:block w-80">
            <Input
              type="search"
              placeholder="Search products, orders, customers..."
              icon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors relative"
            >
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </motion.button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-80 glass-card rounded-xl p-4 shadow-xl"
              >
                <h3 className="font-semibold text-white mb-3">Notifications</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm text-white font-medium">
                          New order received
                        </p>
                        <Badge variant="info">New</Badge>
                      </div>
                      <p className="text-xs text-gray-400">
                        Order #ORD-{1000 + i} - $129.99
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-gray-400">admin@example.com</p>
              </div>
            </motion.button>

            {/* Profile Dropdown */}
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-56 glass-card rounded-xl p-2 shadow-xl"
              >
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-white">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-white">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
