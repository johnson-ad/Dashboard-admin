'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Lock, Bell, Shield, Palette, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const onProfileSubmit = async (data: any) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert('Profile updated successfully!');
      setLoading(false);
    }, 1000);
  };

  const onPasswordSubmit = async (data: any) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert('Password changed successfully!');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and application settings</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-blue-500" />
              <CardTitle>Profile Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  {...register('firstName')}
                  defaultValue="Admin"
                  placeholder="Enter first name"
                />
                <Input
                  label="Last Name"
                  {...register('lastName')}
                  defaultValue="User"
                  placeholder="Enter last name"
                />
              </div>
              <Input
                label="Email"
                type="email"
                {...register('email')}
                defaultValue="admin@example.com"
                placeholder="Enter email"
              />
              <Input
                label="Phone"
                {...register('phone')}
                defaultValue="+1 (555) 123-4567"
                placeholder="Enter phone"
              />
              <Button type="submit" loading={loading}>
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle>Account Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Account Type</p>
              <p className="text-white font-medium">Administrator</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Member Since</p>
              <p className="text-white font-medium">January 2026</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Last Login</p>
              <p className="text-white font-medium">2 hours ago</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-purple-500" />
              <CardTitle>Change Password</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                {...register('currentPassword')}
                placeholder="Enter current password"
              />
              <Input
                label="New Password"
                type="password"
                {...register('newPassword')}
                placeholder="Enter new password"
              />
              <Input
                label="Confirm Password"
                type="password"
                {...register('confirmPassword')}
                placeholder="Confirm new password"
              />
              <Button type="submit" loading={loading}>
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-yellow-500" />
              <CardTitle>Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive email updates</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </label>
            <label className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Order Notifications</p>
                <p className="text-sm text-gray-400">Get notified of new orders</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </label>
            <label className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Low Stock Alerts</p>
                <p className="text-sm text-gray-400">Alert when stock is low</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </label>
            <label className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Review Notifications</p>
                <p className="text-sm text-gray-400">New review alerts</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded" />
            </label>
          </CardContent>
        </Card>
      </div>

      {/* Security & Theme */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-red-500" />
              <CardTitle>Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">Add extra security</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded" />
            </label>
            <label className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Login Alerts</p>
                <p className="text-sm text-gray-400">Get notified of logins</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </label>
            <Button variant="danger">Delete Account</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Palette className="w-6 h-6 text-pink-500" />
              <CardTitle>Appearance</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-3">Theme</p>
              <div className="grid grid-cols-3 gap-3">
                <button className="p-4 rounded-lg bg-gradient-to-br from-purple-900 to-blue-900 border-2 border-blue-500">
                  <p className="text-white text-sm">Dark</p>
                </button>
                <button className="p-4 rounded-lg bg-white border-2 border-gray-300">
                  <p className="text-gray-900 text-sm">Light</p>
                </button>
                <button className="p-4 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-transparent">
                  <p className="text-white text-sm">Auto</p>
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-3">Language</p>
              <select className="w-full glass-card rounded-lg px-4 py-2.5 text-white">
                <option>English</option>
                <option>Français</option>
                <option>Español</option>
                <option>Deutsch</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
