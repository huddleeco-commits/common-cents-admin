/**
 * InventoryCategories
 * 
 * Category management for inventory organization.
 * - View all categories
 * - Create/edit categories
 * - Drag-and-drop reordering
 * - Category stats
 * - Bulk item assignment
 * 
 * Categories adapt to industry via brain.json
 */

import React, { useState } from 'react';
import {
  Folder,
  FolderPlus,
  Edit2,
  Trash2,
  MoreVertical,
  Package,
  DollarSign,
  AlertTriangle,
  ChevronRight,
  GripVertical,
  Plus,
  X,
  Check,
  Settings
} from 'lucide-react';

export function InventoryCategories({ onSelectCategory }) {
  const [categories, setCategories] = useState([
    {
      id: 'proteins',
      name: 'Proteins',
      icon: '🥩',
      color: '#ef4444',
      itemCount: 12,
      totalValue: 2450.80,
      lowStockCount: 2,
      description: 'Meat, poultry, seafood'
    },
    {
      id: 'produce',
      name: 'Produce',
      icon: '🥬',
      color: '#22c55e',
      itemCount: 18,
      totalValue: 890.50,
      lowStockCount: 1,
      description: 'Fresh fruits and vegetables'
    },
    {
      id: 'dairy',
      name: 'Dairy',
      icon: '🧀',
      color: '#f59e0b',
      itemCount: 8,
      totalValue: 560.25,
      lowStockCount: 3,
      description: 'Milk, cheese, eggs, butter'
    },
    {
      id: 'beverages',
      name: 'Beverages',
      icon: '🥤',
      color: '#3b82f6',
      itemCount: 24,
      totalValue: 1234.60,
      lowStockCount: 0,
      description: 'Drinks, syrups, coffee, tea'
    },
    {
      id: 'dry_goods',
      name: 'Dry Goods',
      icon: '🍞',
      color: '#8b5cf6',
      itemCount: 32,
      totalValue: 780.90,
      lowStockCount: 1,
      description: 'Bread, pasta, grains, canned goods'
    },
    {
      id: 'supplies',
      name: 'Supplies',
      icon: '📦',
      color: '#6b7280',
      itemCount: 45,
      totalValue: 1560.00,
      lowStockCount: 0,
      description: 'Packaging, utensils, cleaning'
    },
    {
      id: 'frozen',
      name: 'Frozen',
      icon: '🧊',
      color: '#06b6d4',
      itemCount: 15,
      totalValue: 920.40,
      lowStockCount: 2,
      description: 'Frozen foods and ingredients'
    },
    {
      id: 'condiments',
      name: 'Condiments & Sauces',
      icon: '🍯',
      color: '#ec4899',
      itemCount: 22,
      totalValue: 340.75,
      lowStockCount: 0,
      description: 'Sauces, dressings, seasonings'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    icon: '📦',
    color: '#6b7280',
    description: ''
  });

  const iconOptions = ['📦', '🥩', '🥬', '🧀', '🥤', '🍞', '🧊', '🍯', '🍕', '🍔', '☕', '🧴', '🧹', '💊', '🔧'];
  const colorOptions = ['#ef4444', '#f97316', '#f59e0b', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280'];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const handleCreateCategory = () => {
    if (!newCategory.name.trim()) return;

    const category = {
      id: newCategory.name.toLowerCase().replace(/\s+/g, '_'),
      ...newCategory,
      itemCount: 0,
      totalValue: 0,
      lowStockCount: 0
    };

    setCategories(prev => [...prev, category]);
    setNewCategory({ name: '', icon: '📦', color: '#6b7280', description: '' });
    setShowCreateModal(false);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory) return;

    setCategories(prev => prev.map(cat =>
      cat.id === editingCategory.id ? editingCategory : cat
    ));
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    setShowActionMenu(null);
  };

  const totalItems = categories.reduce((sum, cat) => sum + cat.itemCount, 0);
  const totalValue = categories.reduce((sum, cat) => sum + cat.totalValue, 0);
  const totalLowStock = categories.reduce((sum, cat) => sum + cat.lowStockCount, 0);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.title}>Categories</h2>
          <span style={styles.categoryCount}>{categories.length} categories</span>
        </div>
        <button
          style={styles.createBtn}
          onClick={() => setShowCreateModal(true)}
        >
          <FolderPlus size={16} />
          New Category
        </button>
      </div>

      {/* Summary Stats */}
      <div style={styles.summaryRow}>
        <div style={styles.summaryItem}>
          <Package size={16} />
          <span><strong>{totalItems}</strong> total items</span>
        </div>
        <div style={styles.summaryItem}>
          <DollarSign size={16} />
          <span><strong>{formatCurrency(totalValue)}</strong> inventory value</span>
        </div>
        {totalLowStock > 0 && (
          <div style={{...styles.summaryItem, color: '#f97316'}}>
            <AlertTriangle size={16} />
            <span><strong>{totalLowStock}</strong> items low stock</span>
          </div>
        )}
      </div>

      {/* Categories Grid */}
      <div style={styles.categoriesGrid}>
        {categories.map(category => (
          <div
            key={category.id}
            style={styles.categoryCard}
            onClick={() => onSelectCategory && onSelectCategory(category)}
          >
            <div style={styles.cardHeader}>
              <div style={styles.dragHandle}>
                <GripVertical size={16} />
              </div>
              <div style={{
                ...styles.categoryIcon,
                backgroundColor: `${category.color}20`
              }}>
                <span style={styles.iconEmoji}>{category.icon}</span>
              </div>
              <div style={styles.categoryInfo}>
                <h3 style={styles.categoryName}>{category.name}</h3>
                <p style={styles.categoryDesc}>{category.description}</p>
              </div>
              <div style={styles.cardMenu}>
                <button
                  style={styles.menuBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowActionMenu(showActionMenu === category.id ? null : category.id);
                  }}
                >
                  <MoreVertical size={16} />
                </button>
                {showActionMenu === category.id && (
                  <div style={styles.actionMenu}>
                    <button
                      style={styles.actionMenuItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCategory(category);
                        setShowActionMenu(null);
                      }}
                    >
                      <Edit2 size={14} /> Edit Category
                    </button>
                    <button
                      style={styles.actionMenuItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCategory && onSelectCategory(category);
                      }}
                    >
                      <Package size={14} /> View Items
                    </button>
                    <div style={styles.menuDivider} />
                    <button
                      style={{...styles.actionMenuItem, color: '#ef4444'}}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category.id);
                      }}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.cardStats}>
              <div style={styles.stat}>
                <span style={styles.statValue}>{category.itemCount}</span>
                <span style={styles.statLabel}>items</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statValue}>{formatCurrency(category.totalValue)}</span>
                <span style={styles.statLabel}>value</span>
              </div>
              {category.lowStockCount > 0 && (
                <div style={{...styles.stat, ...styles.statWarning}}>
                  <span style={styles.statValue}>{category.lowStockCount}</span>
                  <span style={styles.statLabel}>low stock</span>
                </div>
              )}
            </div>

            <div style={styles.cardFooter}>
              <span style={styles.viewLink}>
                View items <ChevronRight size={14} />
              </span>
              <div
                style={{
                  ...styles.colorIndicator,
                  backgroundColor: category.color
                }}
              />
            </div>
          </div>
        ))}

        {/* Add Category Card */}
        <div
          style={styles.addCategoryCard}
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={32} />
          <span>Add Category</span>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Create Category</h3>
              <button
                style={styles.closeBtn}
                onClick={() => setShowCreateModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Category Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({...prev, name: e.target.value}))}
                  placeholder="e.g., Proteins, Beverages, Supplies"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <input
                  type="text"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({...prev, description: e.target.value}))}
                  placeholder="Brief description of this category"
                  style={styles.input}
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Icon</label>
                  <div style={styles.iconPicker}>
                    {iconOptions.map(icon => (
                      <button
                        key={icon}
                        style={{
                          ...styles.iconOption,
                          ...(newCategory.icon === icon ? styles.iconOptionActive : {})
                        }}
                        onClick={() => setNewCategory(prev => ({...prev, icon}))}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Color</label>
                  <div style={styles.colorPicker}>
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        style={{
                          ...styles.colorOption,
                          backgroundColor: color,
                          ...(newCategory.color === color ? styles.colorOptionActive : {})
                        }}
                        onClick={() => setNewCategory(prev => ({...prev, color}))}
                      >
                        {newCategory.color === color && <Check size={14} color="#fff" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div style={styles.preview}>
                <span style={styles.previewLabel}>Preview</span>
                <div style={styles.previewCard}>
                  <div style={{
                    ...styles.previewIcon,
                    backgroundColor: `${newCategory.color}20`
                  }}>
                    <span>{newCategory.icon}</span>
                  </div>
                  <div style={styles.previewInfo}>
                    <span style={styles.previewName}>
                      {newCategory.name || 'Category Name'}
                    </span>
                    <span style={styles.previewDesc}>
                      {newCategory.description || 'Description'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button
                style={styles.cancelBtn}
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button
                style={styles.createBtnPrimary}
                onClick={handleCreateCategory}
                disabled={!newCategory.name.trim()}
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingCategory && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Edit Category</h3>
              <button
                style={styles.closeBtn}
                onClick={() => setEditingCategory(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Category Name</label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory(prev => ({...prev, name: e.target.value}))}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <input
                  type="text"
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory(prev => ({...prev, description: e.target.value}))}
                  style={styles.input}
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Icon</label>
                  <div style={styles.iconPicker}>
                    {iconOptions.map(icon => (
                      <button
                        key={icon}
                        style={{
                          ...styles.iconOption,
                          ...(editingCategory.icon === icon ? styles.iconOptionActive : {})
                        }}
                        onClick={() => setEditingCategory(prev => ({...prev, icon}))}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Color</label>
                  <div style={styles.colorPicker}>
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        style={{
                          ...styles.colorOption,
                          backgroundColor: color,
                          ...(editingCategory.color === color ? styles.colorOptionActive : {})
                        }}
                        onClick={() => setEditingCategory(prev => ({...prev, color}))}
                      >
                        {editingCategory.color === color && <Check size={14} color="#fff" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button
                style={styles.cancelBtn}
                onClick={() => setEditingCategory(null)}
              >
                Cancel
              </button>
              <button
                style={styles.createBtnPrimary}
                onClick={handleUpdateCategory}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    margin: 0
  },
  categoryCount: {
    padding: '6px 12px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  createBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  summaryRow: {
    display: 'flex',
    gap: '24px'
  },
  summaryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  categoryCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '20px'
  },
  dragHandle: {
    color: 'var(--color-text-muted)',
    cursor: 'grab',
    padding: '4px'
  },
  categoryIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  iconEmoji: {
    fontSize: '24px'
  },
  categoryInfo: {
    flex: 1,
    minWidth: 0
  },
  categoryName: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 4px 0'
  },
  categoryDesc: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    margin: 0
  },
  cardMenu: {
    position: 'relative'
  },
  menuBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  actionMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    width: '160px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    zIndex: 100,
    overflow: 'hidden'
  },
  actionMenuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer',
    textAlign: 'left'
  },
  menuDivider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '4px 0'
  },
  cardStats: {
    display: 'flex',
    gap: '24px',
    marginBottom: '16px'
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  statValue: {
    fontSize: '18px',
    fontWeight: 700
  },
  statLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase'
  },
  statWarning: {
    color: '#f97316'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid var(--color-border)'
  },
  viewLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    color: 'var(--color-primary)',
    fontWeight: 500
  },
  colorIndicator: {
    width: '24px',
    height: '4px',
    borderRadius: '2px'
  },
  addCategoryCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '2px dashed var(--color-border)',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    cursor: 'pointer',
    color: 'var(--color-text-muted)',
    transition: 'all 0.2s'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '20px',
    overflow: 'hidden'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid var(--color-border)'
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0
  },
  closeBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  modalContent: {
    padding: '24px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '8px',
    color: 'var(--color-text-muted)'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  iconPicker: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  iconOption: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-surface-2)',
    border: '2px solid transparent',
    borderRadius: '10px',
    fontSize: '18px',
    cursor: 'pointer'
  },
  iconOptionActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)'
  },
  colorPicker: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  colorOption: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    border: '2px solid transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  colorOptionActive: {
    borderColor: '#ffffff',
    boxShadow: '0 0 0 2px var(--color-primary)'
  },
  preview: {
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px'
  },
  previewLabel: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    marginBottom: '12px',
    display: 'block'
  },
  previewCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  previewIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px'
  },
  previewInfo: {},
  previewName: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 600
  },
  previewDesc: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '16px 24px',
    borderTop: '1px solid var(--color-border)'
  },
  cancelBtn: {
    padding: '12px 24px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  createBtnPrimary: {
    padding: '12px 24px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  }
};

export default InventoryCategories;