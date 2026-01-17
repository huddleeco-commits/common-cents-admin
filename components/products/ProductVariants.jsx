/**
 * ProductVariants
 * 
 * Variant & option management system.
 * - Define option types (Size, Color, Material, etc.)
 * - Create variant combinations
 * - Bulk edit variant prices/inventory
 * - Variant-specific images
 * - Option templates for reuse
 * 
 * Can be used standalone or embedded in ProductDetail.
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Layers,
  Plus,
  X,
  Edit,
  Trash2,
  Save,
  GripVertical,
  Image,
  Package,
  DollarSign,
  Box,
  ChevronDown,
  ChevronUp,
  Check,
  Copy,
  MoreHorizontal,
  AlertTriangle,
  Palette,
  Ruler,
  Tag,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Search,
  Filter,
  Eye,
  EyeOff
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

export function ProductVariants({ productId, embedded = false }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [editingOption, setEditingOption] = useState(null);
  const [showAddOption, setShowAddOption] = useState(false);
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [bulkEditField, setBulkEditField] = useState('price');
  const [bulkEditValue, setBulkEditValue] = useState('');

  const fetchProductVariants = useCallback(async () => {
    if (!productId) {
      setLoading(false);
      setError('No product ID provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.product) {
        const p = data.product;
        setProduct({
          id: p.id,
          name: p.name,
          options: p.variant_options || [],
          variants: p.variants || [],
          optionTemplates: [
            { id: 'tpl-1', name: 'Clothing Sizes', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
            { id: 'tpl-2', name: 'Basic Colors', options: ['Black', 'White', 'Gray', 'Navy', 'Red'] },
            { id: 'tpl-3', name: 'Shoe Sizes (US)', options: ['6', '7', '8', '9', '10', '11', '12'] }
          ]
        });
      } else {
        throw new Error(data.error || 'Product not found');
      }
    } catch (err) {
      console.error('Error fetching product variants:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductVariants();
  }, [fetchProductVariants]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getVariantName = (variant) => {
    return Object.values(variant.options).join(' / ');
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of Stock', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' };
    if (stock <= 20) return { label: 'Low Stock', color: '#f59e0b', bg: 'rgba(249, 115, 22, 0.1)' };
    return { label: 'In Stock', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' };
  };

  const getTotalStock = () => {
    return product.variants.reduce((sum, v) => sum + v.stock, 0);
  };

  const getAveragePrice = () => {
    const total = product.variants.reduce((sum, v) => sum + v.price, 0);
    return total / product.variants.length;
  };

  const handleSelectAll = () => {
    if (selectedVariants.length === product.variants.length) {
      setSelectedVariants([]);
    } else {
      setSelectedVariants(product.variants.map(v => v.id));
    }
  };

  const handleSelectVariant = (variantId) => {
    if (selectedVariants.includes(variantId)) {
      setSelectedVariants(selectedVariants.filter(id => id !== variantId));
    } else {
      setSelectedVariants([...selectedVariants, variantId]);
    }
  };

  const handleBulkEdit = () => {
    // Apply bulk edit to selected variants
    const updatedVariants = product.variants.map(variant => {
      if (selectedVariants.includes(variant.id)) {
        return {
          ...variant,
          [bulkEditField]: bulkEditField === 'price' || bulkEditField === 'cost' || bulkEditField === 'comparePrice'
            ? parseFloat(bulkEditValue)
            : bulkEditField === 'stock'
            ? parseInt(bulkEditValue)
            : bulkEditValue
        };
      }
      return variant;
    });
    setProduct({ ...product, variants: updatedVariants });
    setBulkEditMode(false);
    setSelectedVariants([]);
    setBulkEditValue('');
  };

  const handleAddOptionValue = (optionId, newValue) => {
    const updatedOptions = product.options.map(opt => {
      if (opt.id === optionId) {
        return {
          ...opt,
          values: [...opt.values, { id: `val-${Date.now()}`, value: newValue }]
        };
      }
      return opt;
    });
    setProduct({ ...product, options: updatedOptions });
  };

  const handleRemoveOptionValue = (optionId, valueId) => {
    const updatedOptions = product.options.map(opt => {
      if (opt.id === optionId) {
        return {
          ...opt,
          values: opt.values.filter(v => v.id !== valueId)
        };
      }
      return opt;
    });
    setProduct({ ...product, options: updatedOptions });
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Layers size={32} style={{ animation: 'pulse 1s ease-in-out infinite' }} />
        <p>Loading variants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.loadingContainer}>
        <AlertTriangle size={32} color="#ef4444" />
        <p style={{ color: '#ef4444' }}>{error}</p>
        <button onClick={fetchProductVariants} style={styles.retryBtn}>
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.loadingContainer}>
        <Layers size={32} color="var(--color-text-muted)" />
        <p>No variants found</p>
      </div>
    );
  }

  return (
    <div style={{
      ...styles.container,
      ...(embedded ? styles.containerEmbedded : {})
    }}>
      {/* Header */}
      {!embedded && (
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.title}>Variants</h1>
            <span style={styles.subtitle}>
              {product.name} • {product.variants.length} variants
            </span>
          </div>
          <div style={styles.headerActions}>
            <button style={styles.actionBtn}>
              <Download size={16} />
              Export
            </button>
            <button style={styles.actionBtn}>
              <Upload size={16} />
              Import
            </button>
            <button style={styles.primaryBtn}>
              <RefreshCw size={16} />
              Regenerate Variants
            </button>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div style={styles.summaryStats}>
        <div style={styles.summaryStat}>
          <Layers size={18} color="#8b5cf6" />
          <div>
            <span style={styles.summaryValue}>{product.variants.length}</span>
            <span style={styles.summaryLabel}>Variants</span>
          </div>
        </div>
        <div style={styles.summaryStat}>
          <Tag size={18} color="#3b82f6" />
          <div>
            <span style={styles.summaryValue}>{product.options.length}</span>
            <span style={styles.summaryLabel}>Options</span>
          </div>
        </div>
        <div style={styles.summaryStat}>
          <Box size={18} color="#22c55e" />
          <div>
            <span style={styles.summaryValue}>{formatNumber(getTotalStock())}</span>
            <span style={styles.summaryLabel}>Total Stock</span>
          </div>
        </div>
        <div style={styles.summaryStat}>
          <DollarSign size={18} color="#f59e0b" />
          <div>
            <span style={styles.summaryValue}>{formatCurrency(getAveragePrice())}</span>
            <span style={styles.summaryLabel}>Avg Price</span>
          </div>
        </div>
      </div>

      {/* Options Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Options</h2>
          <button
            style={styles.addOptionBtn}
            onClick={() => setShowAddOption(true)}
          >
            <Plus size={16} />
            Add Option
          </button>
        </div>

        <div style={styles.optionsList}>
          {product.options.map((option, optIndex) => (
            <div key={option.id} style={styles.optionCard}>
              <div style={styles.optionHeader}>
                <div style={styles.optionHeaderLeft}>
                  <GripVertical size={16} color="var(--color-text-muted)" style={{ cursor: 'grab' }} />
                  <div style={styles.optionIconWrapper}>
                    {option.type === 'color' ? (
                      <Palette size={18} color="#8b5cf6" />
                    ) : (
                      <Tag size={18} color="#3b82f6" />
                    )}
                  </div>
                  <div>
                    <span style={styles.optionName}>{option.name}</span>
                    <span style={styles.optionCount}>
                      {option.values.length} values
                    </span>
                  </div>
                </div>
                <div style={styles.optionActions}>
                  <button
                    style={styles.optionActionBtn}
                    onClick={() => setEditingOption(option.id === editingOption ? null : option.id)}
                  >
                    <Edit size={14} />
                  </button>
                  <button style={styles.optionActionBtn}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div style={styles.optionValues}>
                {option.values.map((val) => (
                  <div key={val.id} style={styles.optionValue}>
                    {option.type === 'color' && val.colorCode && (
                      <span
                        style={{
                          ...styles.colorSwatch,
                          backgroundColor: val.colorCode,
                          border: val.colorCode === '#FFFFFF' ? '1px solid var(--color-border)' : 'none'
                        }}
                      />
                    )}
                    <span>{val.value}</span>
                    {editingOption === option.id && (
                      <button
                        style={styles.removeValueBtn}
                        onClick={() => handleRemoveOptionValue(option.id, val.id)}
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                ))}
                {editingOption === option.id && (
                  <input
                    type="text"
                    placeholder="Add value..."
                    style={styles.addValueInput}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        handleAddOptionValue(option.id, e.target.value.trim());
                        e.target.value = '';
                      }
                    }}
                  />
                )}
              </div>
            </div>
          ))}

          {product.options.length === 0 && (
            <div style={styles.noOptions}>
              <Layers size={32} color="var(--color-text-muted)" />
              <p>No options defined</p>
              <button
                style={styles.addFirstOptionBtn}
                onClick={() => setShowAddOption(true)}
              >
                <Plus size={16} />
                Add First Option
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Variants Table Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Variant List</h2>
          <div style={styles.sectionActions}>
            {selectedVariants.length > 0 && (
              <div style={styles.bulkActionsBar}>
                <span style={styles.selectedCount}>
                  {selectedVariants.length} selected
                </span>
                <button
                  style={styles.bulkActionBtn}
                  onClick={() => setBulkEditMode(true)}
                >
                  <Edit size={14} />
                  Bulk Edit
                </button>
                <button style={{...styles.bulkActionBtn, color: '#ef4444'}}>
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bulk Edit Panel */}
        {bulkEditMode && selectedVariants.length > 0 && (
          <div style={styles.bulkEditPanel}>
            <span style={styles.bulkEditLabel}>
              Edit {selectedVariants.length} variants:
            </span>
            <select
              value={bulkEditField}
              onChange={(e) => setBulkEditField(e.target.value)}
              style={styles.bulkEditSelect}
            >
              <option value="price">Price</option>
              <option value="comparePrice">Compare Price</option>
              <option value="cost">Cost</option>
              <option value="stock">Stock</option>
              <option value="status">Status</option>
            </select>
            {bulkEditField === 'status' ? (
              <select
                value={bulkEditValue}
                onChange={(e) => setBulkEditValue(e.target.value)}
                style={styles.bulkEditInput}
              >
                <option value="">Select status...</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            ) : (
              <input
                type={bulkEditField === 'stock' ? 'number' : 'text'}
                placeholder={`Enter new ${bulkEditField}...`}
                value={bulkEditValue}
                onChange={(e) => setBulkEditValue(e.target.value)}
                style={styles.bulkEditInput}
              />
            )}
            <button style={styles.applyBulkBtn} onClick={handleBulkEdit}>
              <Check size={14} />
              Apply
            </button>
            <button
              style={styles.cancelBulkBtn}
              onClick={() => {
                setBulkEditMode(false);
                setBulkEditValue('');
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Variants Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeaderCell}>
                  <input
                    type="checkbox"
                    checked={selectedVariants.length === product.variants.length && product.variants.length > 0}
                    onChange={handleSelectAll}
                    style={styles.checkbox}
                  />
                </th>
                <th style={styles.tableHeaderCell}>Variant</th>
                <th style={styles.tableHeaderCell}>SKU</th>
                <th style={styles.tableHeaderCell}>Price</th>
                <th style={styles.tableHeaderCell}>Compare</th>
                <th style={styles.tableHeaderCell}>Cost</th>
                <th style={styles.tableHeaderCell}>Stock</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {product.variants.map((variant) => {
                const stockStatus = getStockStatus(variant.stock);
                const isSelected = selectedVariants.includes(variant.id);
                const margin = variant.price - variant.cost;
                const marginPercent = ((margin / variant.price) * 100).toFixed(0);

                return (
                  <tr
                    key={variant.id}
                    style={{
                      ...styles.tableRow,
                      ...(isSelected ? styles.tableRowSelected : {})
                    }}
                  >
                    <td style={styles.tableCell}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectVariant(variant.id)}
                        style={styles.checkbox}
                      />
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.variantCell}>
                        <div style={styles.variantImageThumb}>
                          {variant.image ? (
                            <img src={variant.image} alt="" style={styles.variantImg} />
                          ) : (
                            <Package size={16} color="var(--color-text-muted)" />
                          )}
                        </div>
                        <div style={styles.variantInfo}>
                          <span style={styles.variantName}>{getVariantName(variant)}</span>
                          <div style={styles.variantOptions}>
                            {Object.entries(variant.options).map(([key, value], i) => (
                              <span key={key} style={styles.variantOption}>
                                {key}: {value}
                                {i < Object.entries(variant.options).length - 1 && ' • '}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.skuText}>{variant.sku}</span>
                    </td>
                    <td style={styles.tableCell}>
                      <input
                        type="number"
                        value={variant.price}
                        style={styles.inlineInput}
                        onChange={() => {}}
                      />
                    </td>
                    <td style={styles.tableCell}>
                      <input
                        type="number"
                        value={variant.comparePrice || ''}
                        placeholder="-"
                        style={styles.inlineInput}
                        onChange={() => {}}
                      />
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.costCell}>
                        <input
                          type="number"
                          value={variant.cost}
                          style={styles.inlineInput}
                          onChange={() => {}}
                        />
                        <span style={styles.marginBadge}>{marginPercent}%</span>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.stockCell}>
                        <input
                          type="number"
                          value={variant.stock}
                          style={{
                            ...styles.inlineInput,
                            ...styles.stockInput,
                            color: stockStatus.color
                          }}
                          onChange={() => {}}
                        />
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: variant.status === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                        color: variant.status === 'active' ? '#22c55e' : '#6b7280'
                      }}>
                        {variant.status === 'active' ? <Eye size={10} /> : <EyeOff size={10} />}
                        {variant.status}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionsCell}>
                        <button style={styles.actionIconBtn} title="Edit">
                          <Edit size={14} />
                        </button>
                        <button style={styles.actionIconBtn} title="Image">
                          <Image size={14} />
                        </button>
                        <button style={styles.actionIconBtn} title="More">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Option Templates */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Option Templates</h2>
          <button style={styles.addOptionBtn}>
            <Plus size={16} />
            Save as Template
          </button>
        </div>

        <div style={styles.templatesList}>
          {product.optionTemplates.map((template) => (
            <div key={template.id} style={styles.templateCard}>
              <div style={styles.templateHeader}>
                <span style={styles.templateName}>{template.name}</span>
                <button style={styles.useTemplateBtn}>
                  Use Template
                </button>
              </div>
              <div style={styles.templateValues}>
                {template.options.map((opt, i) => (
                  <span key={i} style={styles.templateValue}>{opt}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Option Modal */}
      {showAddOption && (
        <div style={styles.modalOverlay} onClick={() => setShowAddOption(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Add Option</h2>
              <button
                style={styles.modalClose}
                onClick={() => setShowAddOption(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Option Name</label>
                <input
                  type="text"
                  placeholder="e.g., Size, Color, Material"
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Option Type</label>
                <div style={styles.typeOptions}>
                  <label style={styles.typeOption}>
                    <input type="radio" name="optionType" value="text" defaultChecked />
                    <div style={styles.typeOptionContent}>
                      <Tag size={18} />
                      <span>Text</span>
                    </div>
                  </label>
                  <label style={styles.typeOption}>
                    <input type="radio" name="optionType" value="color" />
                    <div style={styles.typeOptionContent}>
                      <Palette size={18} />
                      <span>Color</span>
                    </div>
                  </label>
                  <label style={styles.typeOption}>
                    <input type="radio" name="optionType" value="size" />
                    <div style={styles.typeOptionContent}>
                      <Ruler size={18} />
                      <span>Size</span>
                    </div>
                  </label>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Values</label>
                <textarea
                  placeholder="Enter values separated by commas (e.g., Small, Medium, Large)"
                  style={styles.formTextarea}
                  rows={3}
                />
              </div>

              <div style={styles.templateSection}>
                <span style={styles.templateSectionLabel}>Or use a template:</span>
                <div style={styles.templateQuickList}>
                  {product.optionTemplates.map(tpl => (
                    <button key={tpl.id} style={styles.templateQuickBtn}>
                      {tpl.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.cancelBtn}
                onClick={() => setShowAddOption(false)}
              >
                Cancel
              </button>
              <button style={styles.createBtn}>
                <Plus size={16} />
                Add Option
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
    padding: '24px 32px',
    maxWidth: '100%'
  },
  containerEmbedded: {
    padding: 0
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
    gap: '16px',
    color: 'var(--color-text-muted)'
  },
  retryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px'
  },
  headerLeft: {},
  title: {
    fontSize: '28px',
    fontWeight: 700,
    margin: '0 0 4px 0'
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  headerActions: {
    display: 'flex',
    gap: '12px'
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  primaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  summaryStats: {
    display: 'flex',
    gap: '20px',
    marginBottom: '24px'
  },
  summaryStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    flex: 1
  },
  summaryValue: {
    display: 'block',
    fontSize: '22px',
    fontWeight: 700
  },
  summaryLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  section: {
    marginBottom: '32px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0
  },
  sectionActions: {
    display: 'flex',
    gap: '12px'
  },
  addOptionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  optionCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '20px'
  },
  optionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  optionHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  optionIconWrapper: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionName: {
    display: 'block',
    fontWeight: 600,
    fontSize: '15px'
  },
  optionCount: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  optionActions: {
    display: 'flex',
    gap: '8px'
  },
  optionActionBtn: {
    padding: '8px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  optionValues: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  optionValue: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '20px',
    fontSize: '13px'
  },
  colorSwatch: {
    width: '16px',
    height: '16px',
    borderRadius: '50%'
  },
  removeValueBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: 'none',
    borderRadius: '50%',
    color: '#ef4444',
    cursor: 'pointer'
  },
  addValueInput: {
    padding: '8px 14px',
    backgroundColor: 'transparent',
    border: '1px dashed var(--color-border)',
    borderRadius: '20px',
    color: 'var(--color-text)',
    fontSize: '13px',
    outline: 'none',
    width: '120px'
  },
  noOptions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    gap: '16px'
  },
  addFirstOptionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  // Bulk Actions
  bulkActionsBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  selectedCount: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  bulkActionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  bulkEditPanel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '12px',
    marginBottom: '16px'
  },
  bulkEditLabel: {
    fontSize: '14px',
    fontWeight: 500
  },
  bulkEditSelect: {
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer',
    outline: 'none'
  },
  bulkEditInput: {
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    outline: 'none',
    flex: 1,
    maxWidth: '200px'
  },
  applyBulkBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  cancelBulkBtn: {
    padding: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  // Table
  tableContainer: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeaderRow: {
    backgroundColor: 'var(--color-surface-2)'
  },
  tableHeaderCell: {
    padding: '14px 16px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    borderBottom: '1px solid var(--color-border)'
  },
  tableRow: {
    borderBottom: '1px solid var(--color-border)',
    transition: 'background-color 0.15s'
  },
  tableRowSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)'
  },
  tableCell: {
    padding: '14px 16px',
    fontSize: '14px',
    verticalAlign: 'middle'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  variantCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  variantImageThumb: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0
  },
  variantImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  variantInfo: {},
  variantName: {
    display: 'block',
    fontWeight: 600,
    fontSize: '14px'
  },
  variantOptions: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  variantOption: {},
  skuText: {
    fontFamily: 'monospace',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  inlineInput: {
    width: '90px',
    padding: '8px 10px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    outline: 'none',
    textAlign: 'right'
  },
  costCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  marginBadge: {
    padding: '2px 8px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#22c55e'
  },
  stockCell: {},
  stockInput: {
    width: '70px'
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  actionsCell: {
    display: 'flex',
    gap: '4px'
  },
  actionIconBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  // Templates
  templatesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px'
  },
  templateCard: {
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  templateHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  templateName: {
    fontWeight: 600,
    fontSize: '15px'
  },
  useTemplateBtn: {
    padding: '6px 14px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  templateValues: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  templateValue: {
    padding: '6px 12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '16px',
    fontSize: '12px'
  },
  // Modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  modalClose: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  modalBody: {
    padding: '24px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  formLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '8px'
  },
  formInput: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  formTextarea: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  typeOptions: {
    display: 'flex',
    gap: '12px'
  },
  typeOption: {
    flex: 1,
    cursor: 'pointer'
  },
  typeOptionContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '2px solid var(--color-border)',
    borderRadius: '12px',
    transition: 'all 0.2s'
  },
  templateSection: {
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: '1px solid var(--color-border)'
  },
  templateSectionLabel: {
    display: 'block',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginBottom: '12px'
  },
  templateQuickList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  templateQuickBtn: {
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid var(--color-border)'
  },
  cancelBtn: {
    padding: '12px 20px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  createBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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

export default ProductVariants;