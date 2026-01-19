'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  sku: z.string().min(1, 'SKU is required'),
  price: z.number().min(0, 'Price must be positive'),
  compare_at_price: z.number().optional(),
  category_id: z.string().optional(),
  stock_quantity: z.number().int().min(0, 'Stock must be positive'),
  description: z.string().optional(),
  short_description: z.string().optional(),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: any;
  categories: any[];
}

export function ProductModal({ isOpen, onClose, onSuccess, product, categories }: ProductModalProps) {
  const [loading, setLoading] = useState(false);
  const isEditing = !!product;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      is_active: true,
      is_featured: false,
      stock_quantity: 0,
    },
  });

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      const url = isEditing ? `/api/products/${product.id}` : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        }),
      });

      if (response.ok) {
        onSuccess();
        onClose();
        reset();
      } else {
        alert('Error saving product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Product' : 'Add New Product'} size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Product Name"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Enter product name"
          />
          
          <Input
            label="SKU"
            {...register('sku')}
            error={errors.sku?.message}
            placeholder="e.g., SKU-001"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            error={errors.price?.message}
            placeholder="0.00"
          />
          
          <Input
            label="Compare at Price"
            type="number"
            step="0.01"
            {...register('compare_at_price', { valueAsNumber: true })}
            error={errors.compare_at_price?.message}
            placeholder="0.00"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              {...register('category_id')}
              className="w-full glass-card rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          
          <Input
            label="Stock Quantity"
            type="number"
            {...register('stock_quantity', { valueAsNumber: true })}
            error={errors.stock_quantity?.message}
            placeholder="0"
          />
        </div>

        <Input
          label="Short Description"
          {...register('short_description')}
          placeholder="Brief product description"
        />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full glass-card rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="Detailed product description"
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              {...register('is_active')}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-2 focus:ring-blue-500/50"
            />
            <span>Active</span>
          </label>
          
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              {...register('is_featured')}
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-2 focus:ring-blue-500/50"
            />
            <span>Featured</span>
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" loading={loading} className="flex-1">
            {isEditing ? 'Update Product' : 'Create Product'}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
