'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const customerSchema = z.object({
  email: z.string().email('Invalid email address'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  is_active: z.boolean().default(true),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  customer?: any;
}

export function CustomerModal({ isOpen, onClose, onSuccess, customer }: CustomerModalProps) {
  const [loading, setLoading] = useState(false);
  const isEditing = !!customer;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer || { is_active: true },
  });

  useEffect(() => {
    if (customer) {
      reset(customer);
    }
  }, [customer, reset]);

  const onSubmit = async (data: CustomerFormData) => {
    setLoading(true);
    try {
      const url = isEditing ? `/api/customers/${customer.id}` : '/api/customers';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        onSuccess();
        onClose();
        reset();
      } else {
        alert('Error saving customer');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Customer' : 'Add New Customer'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            {...register('first_name')}
            error={errors.first_name?.message}
            placeholder="John"
          />
          
          <Input
            label="Last Name"
            {...register('last_name')}
            error={errors.last_name?.message}
            placeholder="Doe"
          />
        </div>

        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="john.doe@example.com"
        />

        <Input
          label="Phone"
          {...register('phone')}
          error={errors.phone?.message}
          placeholder="+1 (555) 123-4567"
        />

        <label className="flex items-center gap-2 text-gray-300">
          <input
            type="checkbox"
            {...register('is_active')}
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-2 focus:ring-blue-500/50"
          />
          <span>Active Customer</span>
        </label>

        <div className="flex gap-3 pt-4">
          <Button type="submit" loading={loading} className="flex-1">
            {isEditing ? 'Update Customer' : 'Create Customer'}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
