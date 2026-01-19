'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Plus, Search, Edit, Trash2, Tag, Percent, DollarSign } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Coupon {
  id: string;
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  minimum_order_amount: number;
  usage_limit: number;
  usage_count: number;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/coupons');
      if (response.ok) {
        const data = await response.json();
        setCoupons(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(search.toLowerCase()) ||
    coupon.description?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: coupons.length,
    active: coupons.filter(c => c.is_active).length,
    totalUsage: coupons.reduce((sum, c) => sum + c.usage_count, 0),
    avgDiscount: coupons.length > 0 
      ? coupons.reduce((sum, c) => sum + parseFloat(c.discount_value.toString()), 0) / coupons.length 
      : 0,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Coupons</h1>
          <p className="text-gray-400">Manage discount codes and promotions</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>
          Create Coupon
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Coupons</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
              </div>
              <Tag className="w-10 h-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Coupons</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.active}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Usage</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalUsage}</p>
              </div>
              <Percent className="w-10 h-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Discount</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stats.avgDiscount.toFixed(0)}%
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Coupons</CardTitle>
            <div className="w-80">
              <Input
                type="search"
                placeholder="Search coupons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading coupons...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                          <Tag className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-mono font-bold text-white">{coupon.code}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-gray-300">
                      {coupon.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="warning">
                        {coupon.discount_type === 'percentage' 
                          ? `${coupon.discount_value}%` 
                          : formatCurrency(coupon.discount_value)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="text-white font-medium">{coupon.usage_count}</span>
                        <span className="text-gray-400"> / {coupon.usage_limit || '∞'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {formatDate(coupon.valid_until, 'short')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={coupon.is_active ? 'success' : 'default'}>
                        {coupon.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" icon={<Edit className="w-4 h-4" />}>
                          Edit
                        </Button>
                        <Button size="sm" variant="ghost" icon={<Trash2 className="w-4 h-4" />}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
