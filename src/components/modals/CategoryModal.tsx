'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: any;
}

export function CategoryModal({ isOpen, onClose, onSuccess, category }: CategoryModalProps) {
  const [loading, setLoading] = useState(false);
  const isEditing = !!category;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: category || { is_active: true },
  });

  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);

  const onSubmit = async (data: CategoryFormData) => {
    setLoading(true);
    try {
      const url = isEditing ? `/api/categories/${category.id}` : '/api/categories';
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
        alert('Error saving category');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Category' : 'Add New Category'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Category Name"
          {...register('name')}
          error={errors.name?.message}
          placeholder="Enter category name"
        />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full glass-card rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="Category description (optional)"
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
            {isEditing ? 'Update Category' : 'Create Category'}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
