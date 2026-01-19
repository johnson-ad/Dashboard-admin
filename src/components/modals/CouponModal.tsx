'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const couponSchema = z.object({
  code: z.string().min(1, 'Code is required').toUpperCase(),
  description: z.string().optional(),
  discount_type: z.enum(['percentage', 'fixed']),
  discount_value: z.number().min(0, 'Discount must be positive'),
  minimum_order_amount: z.number().min(0).optional(),
  usage_limit: z.number().int().min(1).optional(),
  valid_from: z.string().optional(),
  valid_until: z.string().optional(),
  is_active: z.boolean().default(true),
});

type CouponFormData = z.infer<typeof couponSchema>;

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  coupon?: any;
}

export function CouponModal({ isOpen, onClose, onSuccess, coupon }: CouponModalProps) {
  const [loading, setLoading] = useState(false);
  const isEditing = !!coupon;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
    defaultValues: coupon || {
      discount_type: 'percentage',
      is_active: true,
    },
  });

  const discountType = watch('discount_type');

  useEffect(() => {
    if (coupon) {
      reset({
        ...coupon,
        valid_from: coupon.valid_from ? new Date(coupon.valid_from).toISOString().split('T')[0] : '',
        valid_until: coupon.valid_until ? new Date(coupon.valid_until).toISOString().split('T')[0] : '',
      });
    }
  }, [coupon, reset]);

  const onSubmit = async (data: CouponFormData) => {
    setLoading(true);
    try {
      const url = isEditing ? `/api/coupons/${coupon.id}` : '/api/coupons';
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
        alert('Error saving coupon');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving coupon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Coupon' : 'Create New Coupon'} size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Coupon Code"
            {...register('code')}
            error={errors.code?.message}
            placeholder="SUMMER25"
            style={{ textTransform: 'uppercase' }}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Discount Type</label>
            <select
              {...register('discount_type')}
              className="w-full glass-card rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label={discountType === 'percentage' ? 'Discount (%)' : 'Discount Amount ($)'}
            type="number"
            step="0.01"
            {...register('discount_value', { valueAsNumber: true })}
            error={errors.discount_value?.message}
            placeholder="10"
          />
          
          <Input
            label="Minimum Order Amount"
            type="number"
            step="0.01"
            {...register('minimum_order_amount', { valueAsNumber: true })}
            error={errors.minimum_order_amount?.message}
            placeholder="0.00"
          />
        </div>

        <Input
          label="Usage Limit"
          type="number"
          {...register('usage_limit', { valueAsNumber: true })}
          error={errors.usage_limit?.message}
          placeholder="Leave empty for unlimited"
        />

        <Input
          label="Description"
          {...register('description')}
          placeholder="e.g., Summer sale discount"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Valid From"
            type="date"
            {...register('valid_from')}
            error={errors.valid_from?.message}
          />
          
          <Input
            label="Valid Until"
            type="date"
            {...register('valid_until')}
            error={errors.valid_until?.message}
          />
        </div>

        <label className="flex items-center gap-2 text-gray-300">
          <input
            type="checkbox"
            {...register('is_active')}
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-2 focus:ring-blue-500/50"
          />
          <span>Active</span>
        </label>

        <div className="flex gap-3 pt-4">
          <Button type="submit" loading={loading} className="flex-1">
            {isEditing ? 'Update Coupon' : 'Create Coupon'}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
