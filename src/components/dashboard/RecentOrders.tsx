'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const orders = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    customer: 'John Doe',
    date: new Date('2024-01-15'),
    total: 299.99,
    status: 'delivered',
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    customer: 'Jane Smith',
    date: new Date('2024-01-16'),
    total: 149.50,
    status: 'processing',
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    customer: 'Bob Johnson',
    date: new Date('2024-01-17'),
    total: 599.00,
    status: 'shipped',
  },
  {
    id: '4',
    orderNumber: 'ORD-004',
    customer: 'Alice Williams',
    date: new Date('2024-01-18'),
    total: 89.99,
    status: 'pending',
  },
];

const statusColors: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
  delivered: 'success',
  processing: 'info',
  shipped: 'warning',
  pending: 'default',
};

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{formatDate(order.date, 'short')}</TableCell>
                <TableCell className="font-semibold">
                  {formatCurrency(order.total)}
                </TableCell>
                <TableCell>
                  <Badge variant={statusColors[order.status]}>
                    {order.status}
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
      </CardContent>
    </Card>
  );
}
