/**
 * ProductForm
 * 
 * Product creation and editing form:
 * - Basic info (name, description, SKU)
 * - Pricing & inventory
 * - Images & media
 * - Variants (size, color, etc.)
 * - Categories & tags
 * - SEO settings
 * - Shipping details
 * - Custom attributes
 */

import React, { useState, useEffect } from 'react';
import {
  Package,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Image,
  Upload,
  DollarSign,
  Tag,
  Layers,
  Box,
  Truck,
  Search as SearchIcon,
  Globe,
  BarChart3,
  Settings,
  Eye,
  EyeOff,
  GripVertical,
  Copy,
  AlertCircle,
  CheckCircle,
  Info,
  Link,
  FileText,
  Percent,
  Weight,
  Ruler,
  Calendar,
  Clock,
  Star,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Hash,
  Type,
  AlignLeft,
  List,
  Grid,
  Move
} from 'lucide-react';

export function ProductForm({ product = null, onSave, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Form state
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    sku: '',
    barcode: '',
    brand: '',
    manufacturer: '',
    
    // Pricing
    price: '',
    compareAtPrice: '',
    costPrice: '',
    taxable: true,
    taxClass: 'standard',
    
    // Inventory
    trackInventory: true,
    quantity: '',
    lowStockThreshold: '10',
    allowBackorder: false,
    
    // Shipping
    weight: '',
    weightUnit: 'lb',
    length: '',
    width: '',
    height: '',
    dimensionUnit: 'in',
    shippingClass: 'standard',
    requiresShipping: true,
    
    // Organization
    status: 'draft',
    visibility: 'visible',
    categories: [],
    tags: [],
    collections: [],
    
    // SEO
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    
    // Media
    images: [],
    
    // Variants
    hasVariants: false,
    variantOptions: [],
    variants: [],
    
    // Custom Attributes
    attributes: []
  });

  // Initialize with existing product data
  useEffect(() => {
    if (product) {
      setFormData({
        ...formData,
        ...product
      });
    }
  }, [product]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (value) => {
    updateField('name', value);
    if (!formData.slug || formData.slug === generateSlug(formData.name)) {
      updateField('slug', generateSlug(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.price || parseFloat(formData.price) < 0) {
      newErrors.price = 'Valid price is required';
    }
    
    if (formData.trackInventory && !formData.quantity) {
      newErrors.quantity = 'Quantity is required when tracking inventory';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (status = formData.status) => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await onSave?.({ ...formData, status });
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const addVariantOption = () => {
    updateField('variantOptions', [
      ...formData.variantOptions,
      { id: Date.now(), name: '', values: [''] }
    ]);
  };

  const updateVariantOption = (index, field, value) => {
    const newOptions = [...formData.variantOptions];
    newOptions[index][field] = value;
    updateField('variantOptions', newOptions);
  };

  const removeVariantOption = (index) => {
    updateField('variantOptions', formData.variantOptions.filter((_, i) => i !== index));
  };

  const addAttribute = () => {
    updateField('attributes', [
      ...formData.attributes,
      { id: Date.now(), name: '', value: '' }
    ]);
  };

  const updateAttribute = (index, field, value) => {
    const newAttrs = [...formData.attributes];
    newAttrs[index][field] = value;
    updateField('attributes', newAttrs);
  };

  const removeAttribute = (index) => {
    updateField('attributes', formData.attributes.filter((_, i) => i !== index));
  };

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: Package },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'inventory', label: 'Inventory', icon: Box },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'variants', label: 'Variants', icon: Layers },
    { id: 'organization', label: 'Organization', icon: Tag },
    { id: 'seo', label: 'SEO', icon: Globe },
    { id: 'attributes', label: 'Attributes', icon: List }
  ];

  const availableCategories = [
    { id: 1, name: 'Card Storage', parent: null },
    { id: 2, name: 'Binders', parent: 1 },
    { id: 3, name: 'Boxes', parent: 1 },
    { id: 4, name: 'Card Protection', parent: null },
    { id: 5, name: 'Sleeves', parent: 4 },
    { id: 6, name: 'Top Loaders', parent: 4 },
    { id: 7, name: 'Magnetic Holders', parent: 4 },
    { id: 8, name: 'Display', parent: null },
    { id: 9, name: 'Frames', parent: 8 },
    { id: 10, name: 'Cases', parent: 8 },
    { id: 11, name: 'Accessories', parent: null }
  ];

  const calculateProfit = () => {
    const price = parseFloat(formData.price) || 0;
    const cost = parseFloat(formData.costPrice) || 0;
    if (price && cost) {
      const profit = price - cost;
      const margin = (profit / price) * 100;
      return { profit: profit.toFixed(2), margin: margin.toFixed(1) };
    }
    return null;
  };

  const profitCalc = calculateProfit();

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backBtn} onClick={onCancel}>
            <X size={20} />
          </button>
          <div>
            <h1 style={styles.title}>
              {product ? 'Edit Product' : 'New Product'}
            </h1>
            {isDirty && (
              <span style={styles.unsavedBadge}>Unsaved changes</span>
            )}
          </div>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.secondaryBtn} onClick={onCancel}>
            Cancel
          </button>
          <button
            style={styles.secondaryBtn}
            onClick={() => handleSubmit('draft')}
            disabled={loading}
          >
            <Save size={16} />
            Save Draft
          </button>
          <button
            style={styles.primaryBtn}
            onClick={() => handleSubmit('active')}
            disabled={loading}
          >
            {loading ? (
              <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <CheckCircle size={16} />
            )}
            {product ? 'Update Product' : 'Publish Product'}
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {/* Sidebar Navigation */}
        <div style={styles.sidebar}>
          <nav style={styles.nav}>
            {sections.map((section) => {
              const SectionIcon = section.icon;
              const isActive = activeSection === section.id;
              const hasError = Object.keys(errors).some(key => {
                if (section.id === 'basic') return ['name', 'slug', 'sku'].includes(key);
                if (section.id === 'pricing') return ['price'].includes(key);
                if (section.id === 'inventory') return ['quantity'].includes(key);
                return false;
              });

              return (
                <button
                  key={section.id}
                  style={{
                    ...styles.navItem,
                    ...(isActive ? styles.navItemActive : {})
                  }}
                  onClick={() => setActiveSection(section.id)}
                >
                  <SectionIcon size={18} />
                  <span>{section.label}</span>
                  {hasError && (
                    <AlertCircle size={14} color="#ef4444" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Status Card */}
          <div style={styles.statusCard}>
            <h4 style={styles.statusTitle}>Product Status</h4>
            <select
              value={formData.status}
              onChange={(e) => updateField('status', e.target.value)}
              style={styles.statusSelect}
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={formData.visibility}
              onChange={(e) => updateField('visibility', e.target.value)}
              style={styles.statusSelect}
            >
              <option value="visible">Visible</option>
              <option value="hidden">Hidden</option>
              <option value="featured">Featured</option>
            </select>
          </div>
        </div>

        {/* Main Form Area */}
        <div style={styles.mainArea}>
          {/* Basic Info Section */}
          {activeSection === 'basic' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Basic Information</h2>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Product Name <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter product name"
                  style={{
                    ...styles.input,
                    ...(errors.name ? styles.inputError : {})
                  }}
                />
                {errors.name && (
                  <span style={styles.errorText}>{errors.name}</span>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>URL Slug</label>
                <div style={styles.slugInput}>
                  <span style={styles.slugPrefix}>/products/</span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => updateField('slug', e.target.value)}
                    placeholder="product-url-slug"
                    style={styles.slugField}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Full product description..."
                  rows={6}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Short Description</label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => updateField('shortDescription', e.target.value)}
                  placeholder="Brief summary for listings..."
                  rows={2}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => updateField('sku', e.target.value)}
                    placeholder="ABC-123"
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Barcode (UPC, EAN, etc.)</label>
                  <input
                    type="text"
                    value={formData.barcode}
                    onChange={(e) => updateField('barcode', e.target.value)}
                    placeholder="123456789012"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => updateField('brand', e.target.value)}
                    placeholder="Brand name"
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Manufacturer</label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => updateField('manufacturer', e.target.value)}
                    placeholder="Manufacturer name"
                    style={styles.input}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Pricing Section */}
          {activeSection === 'pricing' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Pricing</h2>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Price <span style={styles.required}>*</span>
                  </label>
                  <div style={styles.inputWithIcon}>
                    <DollarSign size={16} />
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => updateField('price', e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      style={{
                        ...styles.inputIconField,
                        ...(errors.price ? styles.inputError : {})
                      }}
                    />
                  </div>
                  {errors.price && (
                    <span style={styles.errorText}>{errors.price}</span>
                  )}
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Compare at Price</label>
                  <div style={styles.inputWithIcon}>
                    <DollarSign size={16} />
                    <input
                      type="number"
                      value={formData.compareAtPrice}
                      onChange={(e) => updateField('compareAtPrice', e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      style={styles.inputIconField}
                    />
                  </div>
                  <span style={styles.helpText}>Original price shown as strikethrough</span>
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Cost Price</label>
                  <div style={styles.inputWithIcon}>
                    <DollarSign size={16} />
                    <input
                      type="number"
                      value={formData.costPrice}
                      onChange={(e) => updateField('costPrice', e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      style={styles.inputIconField}
                    />
                  </div>
                  <span style={styles.helpText}>Used for profit calculations</span>
                </div>
                <div style={styles.formGroup}>
                  {profitCalc && (
                    <div style={styles.profitCard}>
                      <div style={styles.profitRow}>
                        <span>Profit</span>
                        <span style={styles.profitValue}>${profitCalc.profit}</span>
                      </div>
                      <div style={styles.profitRow}>
                        <span>Margin</span>
                        <span style={styles.profitValue}>{profitCalc.margin}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.taxable}
                    onChange={(e) => updateField('taxable', e.target.checked)}
                    style={styles.checkbox}
                  />
                  Charge tax on this product
                </label>
              </div>

              {formData.taxable && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Tax Class</label>
                  <select
                    value={formData.taxClass}
                    onChange={(e) => updateField('taxClass', e.target.value)}
                    style={styles.select}
                  >
                    <option value="standard">Standard Rate</option>
                    <option value="reduced">Reduced Rate</option>
                    <option value="zero">Zero Rate</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Inventory Section */}
          {activeSection === 'inventory' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Inventory</h2>

              <div style={styles.formGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.trackInventory}
                    onChange={(e) => updateField('trackInventory', e.target.checked)}
                    style={styles.checkbox}
                  />
                  Track inventory for this product
                </label>
              </div>

              {formData.trackInventory && (
                <>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>
                        Quantity <span style={styles.required}>*</span>
                      </label>
                      <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => updateField('quantity', e.target.value)}
                        placeholder="0"
                        min="0"
                        style={{
                          ...styles.input,
                          ...(errors.quantity ? styles.inputError : {})
                        }}
                      />
                      {errors.quantity && (
                        <span style={styles.errorText}>{errors.quantity}</span>
                      )}
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Low Stock Threshold</label>
                      <input
                        type="number"
                        value={formData.lowStockThreshold}
                        onChange={(e) => updateField('lowStockThreshold', e.target.value)}
                        placeholder="10"
                        min="0"
                        style={styles.input}
                      />
                      <span style={styles.helpText}>Alert when stock falls below this</span>
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.allowBackorder}
                        onChange={(e) => updateField('allowBackorder', e.target.checked)}
                        style={styles.checkbox}
                      />
                      Allow backorders when out of stock
                    </label>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Shipping Section */}
          {activeSection === 'shipping' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Shipping</h2>

              <div style={styles.formGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.requiresShipping}
                    onChange={(e) => updateField('requiresShipping', e.target.checked)}
                    style={styles.checkbox}
                  />
                  This is a physical product that requires shipping
                </label>
              </div>

              {formData.requiresShipping && (
                <>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Weight</label>
                      <div style={styles.inputWithUnit}>
                        <input
                          type="number"
                          value={formData.weight}
                          onChange={(e) => updateField('weight', e.target.value)}
                          placeholder="0"
                          step="0.01"
                          min="0"
                          style={styles.inputWithUnitField}
                        />
                        <select
                          value={formData.weightUnit}
                          onChange={(e) => updateField('weightUnit', e.target.value)}
                          style={styles.unitSelect}
                        >
                          <option value="lb">lb</option>
                          <option value="oz">oz</option>
                          <option value="kg">kg</option>
                          <option value="g">g</option>
                        </select>
                      </div>
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Shipping Class</label>
                      <select
                        value={formData.shippingClass}
                        onChange={(e) => updateField('shippingClass', e.target.value)}
                        style={styles.select}
                      >
                        <option value="standard">Standard</option>
                        <option value="express">Express</option>
                        <option value="freight">Freight</option>
                        <option value="free">Free Shipping</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Dimensions ({formData.dimensionUnit})</label>
                    <div style={styles.dimensionsRow}>
                      <input
                        type="number"
                        value={formData.length}
                        onChange={(e) => updateField('length', e.target.value)}
                        placeholder="Length"
                        step="0.1"
                        min="0"
                        style={styles.dimInput}
                      />
                      <span>×</span>
                      <input
                        type="number"
                        value={formData.width}
                        onChange={(e) => updateField('width', e.target.value)}
                        placeholder="Width"
                        step="0.1"
                        min="0"
                        style={styles.dimInput}
                      />
                      <span>×</span>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => updateField('height', e.target.value)}
                        placeholder="Height"
                        step="0.1"
                        min="0"
                        style={styles.dimInput}
                      />
                      <select
                        value={formData.dimensionUnit}
                        onChange={(e) => updateField('dimensionUnit', e.target.value)}
                        style={styles.unitSelect}
                      >
                        <option value="in">in</option>
                        <option value="cm">cm</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Media Section */}
          {activeSection === 'media' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Images & Media</h2>

              <div style={styles.mediaUpload}>
                <Upload size={32} color="var(--color-text-muted)" />
                <p style={styles.uploadText}>
                  Drag and drop images here, or <span style={styles.uploadLink}>browse</span>
                </p>
                <span style={styles.uploadHint}>
                  Supports JPG, PNG, WebP. Max 5MB each.
                </span>
              </div>

              {formData.images.length > 0 && (
                <div style={styles.imageGrid}>
                  {formData.images.map((image, index) => (
                    <div key={index} style={styles.imageCard}>
                      <img src={image.url} alt="" style={styles.imageThumb} />
                      <button style={styles.imageRemove}>
                        <X size={14} />
                      </button>
                      {index === 0 && (
                        <span style={styles.primaryBadge}>Primary</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div style={styles.mediaPlaceholder}>
                <Image size={48} color="var(--color-text-muted)" />
                <p>No images uploaded yet</p>
              </div>
            </div>
          )}

          {/* Variants Section */}
          {activeSection === 'variants' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Product Variants</h2>

              <div style={styles.formGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.hasVariants}
                    onChange={(e) => updateField('hasVariants', e.target.checked)}
                    style={styles.checkbox}
                  />
                  This product has multiple options (size, color, etc.)
                </label>
              </div>

              {formData.hasVariants && (
                <>
                  <div style={styles.variantOptions}>
                    {formData.variantOptions.map((option, index) => (
                      <div key={option.id} style={styles.variantOption}>
                        <div style={styles.variantOptionHeader}>
                          <GripVertical size={16} color="var(--color-text-muted)" />
                          <input
                            type="text"
                            value={option.name}
                            onChange={(e) => updateVariantOption(index, 'name', e.target.value)}
                            placeholder="Option name (e.g., Size, Color)"
                            style={styles.variantNameInput}
                          />
                          <button
                            style={styles.removeBtn}
                            onClick={() => removeVariantOption(index)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div style={styles.variantValues}>
                          <input
                            type="text"
                            placeholder="Enter values separated by commas (e.g., Small, Medium, Large)"
                            style={styles.input}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button style={styles.addBtn} onClick={addVariantOption}>
                    <Plus size={16} />
                    Add Option
                  </button>
                </>
              )}
            </div>
          )}

          {/* Organization Section */}
          {activeSection === 'organization' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Organization</h2>

              <div style={styles.formGroup}>
                <label style={styles.label}>Categories</label>
                <div style={styles.categoryList}>
                  {availableCategories.filter(c => !c.parent).map((category) => (
                    <div key={category.id} style={styles.categoryGroup}>
                      <label style={styles.categoryLabel}>
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(category.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateField('categories', [...formData.categories, category.id]);
                            } else {
                              updateField('categories', formData.categories.filter(id => id !== category.id));
                            }
                          }}
                          style={styles.checkbox}
                        />
                        {category.name}
                      </label>
                      <div style={styles.subCategories}>
                        {availableCategories.filter(c => c.parent === category.id).map((sub) => (
                          <label key={sub.id} style={styles.subCategoryLabel}>
                            <input
                              type="checkbox"
                              checked={formData.categories.includes(sub.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  updateField('categories', [...formData.categories, sub.id]);
                                } else {
                                  updateField('categories', formData.categories.filter(id => id !== sub.id));
                                }
                              }}
                              style={styles.checkbox}
                            />
                            {sub.name}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Tags</label>
                <input
                  type="text"
                  placeholder="Add tags separated by commas"
                  style={styles.input}
                />
                <span style={styles.helpText}>Press Enter to add tags</span>
              </div>
            </div>
          )}

          {/* SEO Section */}
          {activeSection === 'seo' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Search Engine Optimization</h2>

              <div style={styles.seoPreview}>
                <span style={styles.seoPreviewTitle}>
                  {formData.seoTitle || formData.name || 'Product Title'}
                </span>
                <span style={styles.seoPreviewUrl}>
                  yourstore.com/products/{formData.slug || 'product-url'}
                </span>
                <span style={styles.seoPreviewDesc}>
                  {formData.seoDescription || formData.shortDescription || 'Product description will appear here...'}
                </span>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>SEO Title</label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => updateField('seoTitle', e.target.value)}
                  placeholder={formData.name || 'Product title for search engines'}
                  style={styles.input}
                />
                <span style={styles.charCount}>
                  {(formData.seoTitle || '').length}/60 characters
                </span>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Meta Description</label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) => updateField('seoDescription', e.target.value)}
                  placeholder="Brief description for search results..."
                  rows={3}
                  style={styles.textarea}
                />
                <span style={styles.charCount}>
                  {(formData.seoDescription || '').length}/160 characters
                </span>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Focus Keywords</label>
                <input
                  type="text"
                  value={formData.seoKeywords}
                  onChange={(e) => updateField('seoKeywords', e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                  style={styles.input}
                />
              </div>
            </div>
          )}

          {/* Attributes Section */}
          {activeSection === 'attributes' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Custom Attributes</h2>
              <p style={styles.sectionDesc}>
                Add custom attributes to provide additional product information.
              </p>

              <div style={styles.attributesList}>
                {formData.attributes.map((attr, index) => (
                  <div key={attr.id} style={styles.attributeRow}>
                    <input
                      type="text"
                      value={attr.name}
                      onChange={(e) => updateAttribute(index, 'name', e.target.value)}
                      placeholder="Attribute name"
                      style={styles.attrInput}
                    />
                    <input
                      type="text"
                      value={attr.value}
                      onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                      placeholder="Value"
                      style={styles.attrInput}
                    />
                    <button
                      style={styles.removeBtn}
                      onClick={() => removeAttribute(index)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <button style={styles.addBtn} onClick={addAttribute}>
                <Plus size={16} />
                Add Attribute
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-background)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  backBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    margin: 0
  },
  unsavedBadge: {
    fontSize: '12px',
    color: '#f59e0b',
    fontWeight: 500
  },
  headerRight: {
    display: 'flex',
    gap: '12px'
  },
  secondaryBtn: {
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
  content: {
    display: 'flex',
    gap: '0',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  sidebar: {
    width: '240px',
    padding: '24px',
    borderRight: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
    minHeight: 'calc(100vh - 73px)',
    position: 'sticky',
    top: '73px',
    alignSelf: 'flex-start'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '24px'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 14px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '10px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%'
  },
  navItemActive: {
    backgroundColor: 'var(--color-surface-2)',
    color: 'var(--color-text)',
    fontWeight: 500
  },
  statusCard: {
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px'
  },
  statusTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    margin: '0 0 12px 0'
  },
  statusSelect: {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    marginBottom: '8px',
    cursor: 'pointer'
  },
  mainArea: {
    flex: 1,
    padding: '32px',
    maxWidth: '800px'
  },
  section: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '24px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: '0 0 24px 0'
  },
  sectionDesc: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '-16px 0 24px 0'
  },
  formGroup: {
    marginBottom: '20px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    marginBottom: '8px'
  },
  required: {
    color: '#ef4444'
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  inputError: {
    borderColor: '#ef4444'
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  slugInput: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  slugPrefix: {
    padding: '12px 14px',
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    borderRight: '1px solid var(--color-border)'
  },
  slugField: {
    flex: 1,
    padding: '12px 14px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  inputWithIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text-muted)'
  },
  inputIconField: {
    flex: 1,
    padding: '12px 0',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  inputWithUnit: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  inputWithUnitField: {
    flex: 1,
    padding: '12px 14px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  unitSelect: {
    padding: '12px',
    backgroundColor: 'var(--color-surface)',
    border: 'none',
    borderLeft: '1px solid var(--color-border)',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  dimensionsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  dimInput: {
    flex: 1,
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    textAlign: 'center'
  },
  helpText: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginTop: '6px'
  },
  errorText: {
    display: 'block',
    fontSize: '12px',
    color: '#ef4444',
    marginTop: '6px'
  },
  charCount: {
    display: 'block',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginTop: '6px',
    textAlign: 'right'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  profitCard: {
    padding: '16px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '10px'
  },
  profitRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '14px'
  },
  profitValue: {
    fontWeight: 600,
    color: '#22c55e'
  },
  mediaUpload: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    border: '2px dashed var(--color-border)',
    borderRadius: '12px',
    cursor: 'pointer',
    marginBottom: '20px'
  },
  uploadText: {
    fontSize: '14px',
    margin: '12px 0 4px 0'
  },
  uploadLink: {
    color: 'var(--color-primary)',
    cursor: 'pointer'
  },
  uploadHint: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginBottom: '20px'
  },
  imageCard: {
    position: 'relative',
    aspectRatio: '1',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  imageThumb: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  imageRemove: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    padding: '6px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer'
  },
  primaryBadge: {
    position: 'absolute',
    bottom: '8px',
    left: '8px',
    padding: '4px 8px',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '10px',
    fontWeight: 600
  },
  mediaPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    color: 'var(--color-text-muted)',
    textAlign: 'center'
  },
  variantOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '16px'
  },
  variantOption: {
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px'
  },
  variantOptionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px'
  },
  variantNameInput: {
    flex: 1,
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    fontWeight: 500
  },
  variantValues: {},
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  removeBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '6px'
  },
  categoryList: {
    maxHeight: '300px',
    overflowY: 'auto',
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px'
  },
  categoryGroup: {
    marginBottom: '12px'
  },
  categoryLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  subCategories: {
    marginLeft: '28px',
    marginTop: '8px'
  },
  subCategoryLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px',
    cursor: 'pointer',
    marginBottom: '6px'
  },
  seoPreview: {
    padding: '20px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px',
    marginBottom: '24px'
  },
  seoPreviewTitle: {
    display: 'block',
    fontSize: '18px',
    color: '#1a0dab',
    marginBottom: '4px'
  },
  seoPreviewUrl: {
    display: 'block',
    fontSize: '14px',
    color: '#006621',
    marginBottom: '6px'
  },
  seoPreviewDesc: {
    display: 'block',
    fontSize: '14px',
    color: '#545454',
    lineHeight: 1.5
  },
  attributesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '16px'
  },
  attributeRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  attrInput: {
    flex: 1,
    padding: '12px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px'
  }
};

export default ProductForm;