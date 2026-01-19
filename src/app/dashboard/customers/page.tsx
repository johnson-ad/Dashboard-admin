'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Search, Eye, Users, UserPlus, DollarSign, ShoppingBag } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_active: boolean;
  total_orders: number;
  total_spent: number;
  created_at: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      // Fallback: charger depuis la DB directement
      loadCustomersFromDB();
    }
  };

  const loadCustomersFromDB = async () => {
    try {
      const response = await fetch('/api/healthcheck');
      // Pour l'instant on simule les données
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.email.toLowerCase().includes(search.toLowerCase()) ||
    `${customer.first_name} ${customer.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.is_active).length,
    totalRevenue: customers.reduce((sum, c) => sum + parseFloat(c.total_spent?.toString() || '0'), 0),
    avgOrderValue: customers.length > 0 
      ? customers.reduce((sum, c) => sum + parseFloat(c.total_spent?.toString() || '0'), 0) / customers.length 
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
          <h1 className="text-3xl font-bold text-white mb-2">Customers</h1>
          <p className="text-gray-400">Manage your customer database</p>
        </div>
        <Button icon={<UserPlus className="w-4 h-4" />}>
          Add Customer
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Customers</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Customers</p>
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
                <p className="text-sm text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Order Value</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {formatCurrency(stats.avgOrderValue)}
                </p>
              </div>
              <ShoppingBag className="w-10 h-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Customers</CardTitle>
            <div className="w-80">
              <Input
                type="search"
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading customers...</div>
          ) : customers.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No customers found. Customer data will appear here.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {customer.first_name.charAt(0)}{customer.last_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {customer.first_name} {customer.last_name}
                          </p>
                          <p className="text-sm text-gray-400">
                            Joined {formatDate(customer.created_at, 'short')}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{customer.email}</TableCell>
                    <TableCell className="text-gray-300">{customer.phone}</TableCell>
                    <TableCell>
                      <Badge variant="info">{customer.total_orders} orders</Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-white">
                      {formatCurrency(customer.total_spent || 0)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.is_active ? 'success' : 'default'}>
                        {customer.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" icon={<Eye className="w-4 h-4" />}>
                        View
                      </Button>
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
