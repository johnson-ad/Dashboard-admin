'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Edit, Trash2, Folder, Package } from 'lucide-react';
import { CategoryModal } from '@/components/modals/CategoryModal';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  display_order: number;
  product_count?: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;
    
    try {
      const response = await fetch(`/api/categories/${selectedCategory.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCategories();
        setSelectedCategory(null);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-gray-400">Organize your products into categories</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />} onClick={() => setShowModal(true)}>
          Add Category
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Categories</p>
                <p className="text-2xl font-bold text-white mt-1">{categories.length}</p>
              </div>
              <Folder className="w-10 h-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Categories</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {categories.filter(c => c.is_active).length}
                </p>
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
                <p className="text-sm text-gray-400">Total Products</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {categories.reduce((sum, c) => sum + (c.product_count || 0), 0)}
                </p>
              </div>
              <Package className="w-10 h-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-400">
            Loading categories...
          </div>
        ) : (
          categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Folder className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant={category.is_active ? 'success' : 'default'}>
                      {category.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {category.description || 'No description'}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Package className="w-4 h-4" />
                      <span>{category.product_count || 0} products</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        icon={<Edit className="w-4 h-4" />}
                        onClick={() => handleEdit(category)}
                      />
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        icon={<Trash2 className="w-4 h-4" />}
                        onClick={() => handleDelete(category)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      <CategoryModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setSelectedCategory(null); }}
        onSuccess={fetchCategories}
        category={selectedCategory}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedCategory?.name}"?`}
      />
    </div>
  );
}
