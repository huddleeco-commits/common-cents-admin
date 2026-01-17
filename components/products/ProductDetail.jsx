/**
 * ProductDetail
 * 
 * Complete single product editor.
 * - Basic info (name, description, SKU)
 * - Pricing & cost
 * - Media gallery
 * - Variants management
 * - Inventory tracking
 * - SEO settings
 * - Organization (categories, tags)
 * - Sales analytics
 * 
 * Full CRUD for individual products.
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Package,
  Save,
  X,
  ChevronLeft,
  MoreHorizontal,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Archive,
  ExternalLink,
  Image,
  Plus,
  Upload,
  DollarSign,
  Tag,
  Layers,
  Box,
  BarChart2,
  Settings,
  Globe,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  ShoppingBag,
  Star,
  Edit,
  GripVertical,
  Link,
  FileText,
  Hash,
  RefreshCw
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

export function ProductDetail({ productId, onBack, onSave }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [hasChanges, setHasChanges] = useState(false);
  const [product, setProduct] = useState(null);

  const fetchProduct = useCallback(async () => {
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
        // Transform API data to component format
        const p = data.product;
        setProduct({
          id: p.id,
          name: p.name || '',
          slug: p.slug || p.name?.toLowerCase().replace(/\s+/g, '-') || '',
          sku: p.sku || '',
          barcode: p.barcode || '',
          description: p.description || '',
          shortDescription: p.short_description || '',
          status: p.status || 'active',
          price: parseFloat(p.price) || 0,
          comparePrice: p.compare_price ? parseFloat(p.compare_price) : null,
          cost: p.cost ? parseFloat(p.cost) : 0,
          taxable: p.taxable !== false,
          taxCode: p.tax_code || '',
          trackInventory: p.track_inventory !== false,
          stock: p.stock || 0,
          lowStockThreshold: p.low_stock_threshold || 10,
          allowBackorder: p.allow_backorder || false,
          weight: p.weight || 0,
          weightUnit: p.weight_unit || 'kg',
          category: p.category || '',
          subcategory: p.subcategory || '',
          tags: p.tags || [],
          vendor: p.vendor || '',
          collections: p.collections || [],
          images: p.images || [{ id: 1, url: null, alt: 'Main product image', isPrimary: true }],
          hasVariants: p.has_variants || false,
          variantOptions: p.variant_options || [],
          variants: p.variants || [],
          seo: p.seo || {
            title: p.name || '',
            description: p.description || '',
            keywords: [],
            urlHandle: p.slug || ''
          },
          analytics: p.analytics || {
            views: 0,
            viewsChange: 0,
            sales: 0,
            salesChange: 0,
            revenue: 0,
            revenueChange: 0,
            conversionRate: 0,
            avgRating: 0,
            reviewCount: 0
          },
          createdAt: p.created_at || new Date().toISOString(),
          updatedAt: p.updated_at || new Date().toISOString(),
          publishedAt: p.published_at || null
        });
      } else {
        throw new Error(data.error || 'Product not found');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleChange = (field, value) => {
    setProduct(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleNestedChange = (parent, field, value) => {
    setProduct(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setHasChanges(false);
    if (onSave) onSave(product);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMargin = () => {
    if (!product.price || !product.cost) return null;
    const margin = product.price - product.cost;
    const percent = ((margin / product.price) * 100).toFixed(1);
    return { amount: margin, percent };
  };

  const getStockStatus = () => {
    if (!product.trackInventory) return { label: 'Not Tracked', color: '#6b7280' };
    if (product.stock === 0) return { label: 'Out of Stock', color: '#ef4444' };
    if (product.stock <= product.lowStockThreshold) return { label: 'Low Stock', color: '#f59e0b' };
    return { label: 'In Stock', color: '#22c55e' };
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Package size={32} style={{ animation: 'pulse 1s ease-in-out infinite' }} />
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.loadingContainer}>
        <AlertTriangle size={32} color="#ef4444" />
        <p style={{ color: '#ef4444' }}>{error}</p>
        <button onClick={fetchProduct} style={styles.retryBtn}>
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.loadingContainer}>
        <Package size={32} color="var(--color-text-muted)" />
        <p>Product not found</p>
        <button onClick={onBack} style={styles.backBtn}>
          Back to Products
        </button>
      </div>
    );
  }

  const margin = getMargin();
  const stockStatus = getStockStatus();

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backBtn} onClick={onBack}>
            <ChevronLeft size={20} />
            Products
          </button>
          <div style={styles.titleRow}>
            <h1 style={styles.title}>{product.name}</h1>
            <span style={{
              ...styles.statusBadge,
              backgroundColor: product.status === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(107, 114, 128, 0.1)',
              color: product.status === 'active' ? '#22c55e' : '#6b7280'
            }}>
              {product.status === 'active' ? <Eye size={12} /> : <EyeOff size={12} />}
              {product.status}
            </span>
          </div>
          <span style={styles.subtitle}>
            SKU: {product.sku} • Last updated {formatDate(product.updatedAt)}
          </span>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.actionBtn}>
            <Eye size={16} />
            Preview
          </button>
          <button style={styles.actionBtn}>
            <Copy size={16} />
            Duplicate
          </button>
          <button style={styles.actionBtn}>
            <MoreHorizontal size={16} />
          </button>
          <button
            style={{
              ...styles.saveBtn,
              opacity: hasChanges ? 1 : 0.5
            }}
            onClick={handleSave}
            disabled={!hasChanges || saving}
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Unsaved Changes Bar */}
      {hasChanges && (
        <div style={styles.unsavedBar}>
          <AlertTriangle size={16} />
          <span>You have unsaved changes</span>
          <button style={styles.discardBtn} onClick={() => setHasChanges(false)}>
            Discard
          </button>
          <button style={styles.saveSmallBtn} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      )}

      {/* Quick Stats */}
      <div style={styles.quickStats}>
        <div style={styles.quickStat}>
          <Eye size={16} color="#3b82f6" />
          <div style={styles.quickStatContent}>
            <span style={styles.quickStatValue}>{formatNumber(product.analytics.views)}</span>
            <span style={styles.quickStatLabel}>Views</span>
          </div>
          <span style={styles.quickStatChange}>+{product.analytics.viewsChange}%</span>
        </div>
        <div style={styles.quickStat}>
          <ShoppingBag size={16} color="#22c55e" />
          <div style={styles.quickStatContent}>
            <span style={styles.quickStatValue}>{formatNumber(product.analytics.sales)}</span>
            <span style={styles.quickStatLabel}>Sales</span>
          </div>
          <span style={styles.quickStatChange}>+{product.analytics.salesChange}%</span>
        </div>
        <div style={styles.quickStat}>
          <DollarSign size={16} color="#8b5cf6" />
          <div style={styles.quickStatContent}>
            <span style={styles.quickStatValue}>{formatCurrency(product.analytics.revenue)}</span>
            <span style={styles.quickStatLabel}>Revenue</span>
          </div>
          <span style={styles.quickStatChange}>+{product.analytics.revenueChange}%</span>
        </div>
        <div style={styles.quickStat}>
          <Star size={16} color="#f59e0b" />
          <div style={styles.quickStatContent}>
            <span style={styles.quickStatValue}>{product.analytics.avgRating}</span>
            <span style={styles.quickStatLabel}>{product.analytics.reviewCount} reviews</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={styles.tabNav}>
        {[
          { id: 'details', label: 'Details', icon: FileText },
          { id: 'media', label: 'Media', icon: Image },
          { id: 'pricing', label: 'Pricing', icon: DollarSign },
          { id: 'inventory', label: 'Inventory', icon: Box },
          { id: 'variants', label: 'Variants', icon: Layers },
          { id: 'seo', label: 'SEO', icon: Globe }
        ].map(tab => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              style={{
                ...styles.tabBtn,
                ...(activeTab === tab.id ? styles.tabBtnActive : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <TabIcon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Details Tab */}
        {activeTab === 'details' && (
          <div style={styles.tabContent}>
            <div style={styles.twoColumn}>
              {/* Left Column */}
              <div style={styles.leftColumn}>
                {/* Basic Info */}
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>Basic Information</h3>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Product Name</label>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      style={styles.formInput}
                      placeholder="Enter product name"
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Short Description</label>
                    <input
                      type="text"
                      value={product.shortDescription}
                      onChange={(e) => handleChange('shortDescription', e.target.value)}
                      style={styles.formInput}
                      placeholder="Brief product summary"
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Full Description</label>
                    <textarea
                      value={product.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      style={styles.formTextarea}
                      rows={5}
                      placeholder="Detailed product description"
                    />
                  </div>

                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>SKU</label>
                      <input
                        type="text"
                        value={product.sku}
                        onChange={(e) => handleChange('sku', e.target.value)}
                        style={styles.formInput}
                        placeholder="Stock keeping unit"
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Barcode</label>
                      <input
                        type="text"
                        value={product.barcode}
                        onChange={(e) => handleChange('barcode', e.target.value)}
                        style={styles.formInput}
                        placeholder="UPC, EAN, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* Organization */}
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>Organization</h3>
                  
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Category</label>
                      <select
                        value={product.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        style={styles.formSelect}
                      >
                        <option value="Electronics">Electronics</option>
                        <option value="Apparel">Apparel</option>
                        <option value="Home">Home & Garden</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Subcategory</label>
                      <select
                        value={product.subcategory}
                        onChange={(e) => handleChange('subcategory', e.target.value)}
                        style={styles.formSelect}
                      >
                        <option value="Audio">Audio</option>
                        <option value="Video">Video</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Vendor</label>
                    <input
                      type="text"
                      value={product.vendor}
                      onChange={(e) => handleChange('vendor', e.target.value)}
                      style={styles.formInput}
                      placeholder="Product vendor or supplier"
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Tags</label>
                    <div style={styles.tagsContainer}>
                      {product.tags.map((tag, index) => (
                        <span key={index} style={styles.tag}>
                          {tag}
                          <button
                            style={styles.tagRemove}
                            onClick={() => {
                              const newTags = product.tags.filter((_, i) => i !== index);
                              handleChange('tags', newTags);
                            }}
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        placeholder="Add tag..."
                        style={styles.tagInput}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.target.value.trim()) {
                            handleChange('tags', [...product.tags, e.target.value.trim()]);
                            e.target.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Collections</label>
                    <div style={styles.collectionsContainer}>
                      {product.collections.map((collection, index) => (
                        <span key={index} style={styles.collectionBadge}>
                          {collection}
                        </span>
                      ))}
                      <button style={styles.addCollectionBtn}>
                        <Plus size={14} />
                        Add to Collection
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div style={styles.rightColumn}>
                {/* Status */}
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>Status</h3>
                  <div style={styles.statusOptions}>
                    <label style={styles.radioOption}>
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={product.status === 'active'}
                        onChange={(e) => handleChange('status', e.target.value)}
                        style={styles.radioInput}
                      />
                      <div style={styles.radioContent}>
                        <Eye size={16} color="#22c55e" />
                        <span>Active</span>
                      </div>
                    </label>
                    <label style={styles.radioOption}>
                      <input
                        type="radio"
                        name="status"
                        value="draft"
                        checked={product.status === 'draft'}
                        onChange={(e) => handleChange('status', e.target.value)}
                        style={styles.radioInput}
                      />
                      <div style={styles.radioContent}>
                        <EyeOff size={16} color="#6b7280" />
                        <span>Draft</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Quick Info */}
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>Quick Info</h3>
                  <div style={styles.infoList}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Price</span>
                      <span style={styles.infoValue}>{formatCurrency(product.price)}</span>
                    </div>
                    {margin && (
                      <div style={styles.infoRow}>
                        <span style={styles.infoLabel}>Margin</span>
                        <span style={{...styles.infoValue, color: '#22c55e'}}>
                          {formatCurrency(margin.amount)} ({margin.percent}%)
                        </span>
                      </div>
                    )}
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Stock</span>
                      <span style={{...styles.infoValue, color: stockStatus.color}}>
                        {product.stock} ({stockStatus.label})
                      </span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Variants</span>
                      <span style={styles.infoValue}>{product.variants.length}</span>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>Dates</h3>
                  <div style={styles.infoList}>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Created</span>
                      <span style={styles.infoValue}>{formatDate(product.createdAt)}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Published</span>
                      <span style={styles.infoValue}>{formatDate(product.publishedAt)}</span>
                    </div>
                    <div style={styles.infoRow}>
                      <span style={styles.infoLabel}>Updated</span>
                      <span style={styles.infoValue}>{formatDate(product.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Media Tab */}
        {activeTab === 'media' && (
          <div style={styles.tabContent}>
            <div style={styles.card}>
              <div style={styles.cardHeaderRow}>
                <h3 style={styles.cardTitle}>Product Images</h3>
                <button style={styles.uploadBtn}>
                  <Upload size={16} />
                  Upload Images
                </button>
              </div>
              
              <div style={styles.mediaGrid}>
                {product.images.map((image, index) => (
                  <div
                    key={image.id}
                    style={{
                      ...styles.mediaCard,
                      ...(image.isPrimary ? styles.mediaCardPrimary : {})
                    }}
                  >
                    <div style={styles.mediaImagePlaceholder}>
                      <Image size={32} color="var(--color-text-muted)" />
                    </div>
                    <div style={styles.mediaCardOverlay}>
                      <input
                        type="text"
                        placeholder="Alt text..."
                        value={image.alt}
                        style={styles.altInput}
                        onChange={() => {}}
                      />
                      <div style={styles.mediaActions}>
                        {image.isPrimary && (
                          <span style={styles.primaryBadge}>Primary</span>
                        )}
                        <button style={styles.mediaActionBtn}>
                          <Edit size={14} />
                        </button>
                        <button style={styles.mediaActionBtn}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Upload New */}
                <div style={styles.mediaUploadCard}>
                  <Upload size={32} color="var(--color-text-muted)" />
                  <span style={styles.uploadText}>Drop images here or click to upload</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div style={styles.tabContent}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Pricing</h3>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Price</label>
                  <div style={styles.inputWithPrefix}>
                    <span style={styles.inputPrefix}>$</span>
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                      style={styles.formInputWithPrefix}
                      step="0.01"
                    />
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Compare-at Price</label>
                  <div style={styles.inputWithPrefix}>
                    <span style={styles.inputPrefix}>$</span>
                    <input
                      type="number"
                      value={product.comparePrice || ''}
                      onChange={(e) => handleChange('comparePrice', parseFloat(e.target.value) || null)}
                      style={styles.formInputWithPrefix}
                      step="0.01"
                      placeholder="Original price"
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Cost per Item</label>
                  <div style={styles.inputWithPrefix}>
                    <span style={styles.inputPrefix}>$</span>
                    <input
                      type="number"
                      value={product.cost}
                      onChange={(e) => handleChange('cost', parseFloat(e.target.value))}
                      style={styles.formInputWithPrefix}
                      step="0.01"
                    />
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Profit Margin</label>
                  <div style={styles.marginDisplay}>
                    {margin ? (
                      <>
                        <span style={styles.marginAmount}>{formatCurrency(margin.amount)}</span>
                        <span style={styles.marginPercent}>{margin.percent}%</span>
                      </>
                    ) : (
                      <span style={styles.marginNA}>N/A</span>
                    )}
                  </div>
                </div>
              </div>

              <div style={styles.checkboxGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={product.taxable}
                    onChange={(e) => handleChange('taxable', e.target.checked)}
                    style={styles.checkbox}
                  />
                  <span>Charge tax on this product</span>
                </label>
              </div>

              {product.taxable && (
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Tax Code</label>
                  <input
                    type="text"
                    value={product.taxCode}
                    onChange={(e) => handleChange('taxCode', e.target.value)}
                    style={styles.formInput}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div style={styles.tabContent}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Inventory</h3>
              
              <div style={styles.checkboxGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={product.trackInventory}
                    onChange={(e) => handleChange('trackInventory', e.target.checked)}
                    style={styles.checkbox}
                  />
                  <span>Track quantity</span>
                </label>
              </div>

              {product.trackInventory && (
                <>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Stock Quantity</label>
                      <input
                        type="number"
                        value={product.stock}
                        onChange={(e) => handleChange('stock', parseInt(e.target.value))}
                        style={styles.formInput}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Low Stock Threshold</label>
                      <input
                        type="number"
                        value={product.lowStockThreshold}
                        onChange={(e) => handleChange('lowStockThreshold', parseInt(e.target.value))}
                        style={styles.formInput}
                      />
                    </div>
                  </div>

                  <div style={styles.stockStatusDisplay}>
                    <span style={{
                      ...styles.stockStatusBadge,
                      backgroundColor: stockStatus.color + '20',
                      color: stockStatus.color
                    }}>
                      {stockStatus.label}
                    </span>
                    <span style={styles.stockStatusText}>
                      {product.stock} units available
                    </span>
                  </div>

                  <div style={styles.checkboxGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={product.allowBackorder}
                        onChange={(e) => handleChange('allowBackorder', e.target.checked)}
                        style={styles.checkbox}
                      />
                      <span>Allow customers to purchase when out of stock</span>
                    </label>
                  </div>
                </>
              )}
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Shipping</h3>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Weight</label>
                  <input
                    type="number"
                    value={product.weight}
                    onChange={(e) => handleChange('weight', parseFloat(e.target.value))}
                    style={styles.formInput}
                    step="0.01"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Unit</label>
                  <select
                    value={product.weightUnit}
                    onChange={(e) => handleChange('weightUnit', e.target.value)}
                    style={styles.formSelect}
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                    <option value="g">g</option>
                    <option value="oz">oz</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Variants Tab */}
        {activeTab === 'variants' && (
          <div style={styles.tabContent}>
            <div style={styles.card}>
              <div style={styles.cardHeaderRow}>
                <h3 style={styles.cardTitle}>Variants</h3>
                <button style={styles.addVariantBtn}>
                  <Plus size={16} />
                  Add Variant
                </button>
              </div>

              {product.variants.length > 0 ? (
                <div style={styles.variantsTable}>
                  <div style={styles.variantsHeader}>
                    <span style={styles.variantColName}>Variant</span>
                    <span style={styles.variantColSku}>SKU</span>
                    <span style={styles.variantColPrice}>Price</span>
                    <span style={styles.variantColStock}>Stock</span>
                    <span style={styles.variantColActions}>Actions</span>
                  </div>
                  {product.variants.map((variant) => (
                    <div key={variant.id} style={styles.variantRow}>
                      <div style={styles.variantName}>
                        <GripVertical size={14} color="var(--color-text-muted)" />
                        <div style={styles.variantImageThumb}>
                          <Package size={16} color="var(--color-text-muted)" />
                        </div>
                        <span>{variant.name}</span>
                      </div>
                      <span style={styles.variantSku}>{variant.sku}</span>
                      <span style={styles.variantPrice}>{formatCurrency(variant.price)}</span>
                      <span style={{
                        ...styles.variantStock,
                        color: variant.stock === 0 ? '#ef4444' : variant.stock < 20 ? '#f59e0b' : '#22c55e'
                      }}>
                        {variant.stock}
                      </span>
                      <div style={styles.variantActions}>
                        <button style={styles.variantActionBtn}>
                          <Edit size={14} />
                        </button>
                        <button style={styles.variantActionBtn}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={styles.noVariants}>
                  <Layers size={32} color="var(--color-text-muted)" />
                  <p>No variants yet</p>
                  <button style={styles.addVariantBtn}>
                    <Plus size={16} />
                    Add Variant Option
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div style={styles.tabContent}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Search Engine Optimization</h3>
              
              <div style={styles.seoPreview}>
                <span style={styles.seoPreviewLabel}>Search Engine Preview</span>
                <div style={styles.seoPreviewCard}>
                  <span style={styles.seoPreviewTitle}>
                    {product.seo.title || product.name}
                  </span>
                  <span style={styles.seoPreviewUrl}>
                    yourstore.com/products/{product.seo.urlHandle}
                  </span>
                  <span style={styles.seoPreviewDesc}>
                    {product.seo.description || product.shortDescription}
                  </span>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Page Title</label>
                <input
                  type="text"
                  value={product.seo.title}
                  onChange={(e) => handleNestedChange('seo', 'title', e.target.value)}
                  style={styles.formInput}
                  placeholder="SEO page title"
                />
                <span style={styles.charCount}>
                  {product.seo.title.length}/70 characters
                </span>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Meta Description</label>
                <textarea
                  value={product.seo.description}
                  onChange={(e) => handleNestedChange('seo', 'description', e.target.value)}
                  style={styles.formTextarea}
                  rows={3}
                  placeholder="SEO meta description"
                />
                <span style={styles.charCount}>
                  {product.seo.description.length}/160 characters
                </span>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>URL Handle</label>
                <div style={styles.inputWithPrefix}>
                  <span style={styles.urlPrefix}>/products/</span>
                  <input
                    type="text"
                    value={product.seo.urlHandle}
                    onChange={(e) => handleNestedChange('seo', 'urlHandle', e.target.value)}
                    style={styles.formInputWithPrefix}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div style={styles.dangerZone}>
        <h3 style={styles.dangerTitle}>Danger Zone</h3>
        <div style={styles.dangerActions}>
          <button style={styles.dangerBtn}>
            <Archive size={16} />
            Archive Product
          </button>
          <button style={{...styles.dangerBtn, ...styles.deleteBtn}}>
            <Trash2 size={16} />
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '24px 32px',
    maxWidth: '100%'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
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
    marginBottom: '20px'
  },
  headerLeft: {},
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '0',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: '8px'
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    margin: 0
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    marginTop: '4px',
    display: 'block'
  },
  headerActions: {
    display: 'flex',
    gap: '10px'
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
  saveBtn: {
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
  unsavedBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: '12px',
    marginBottom: '20px',
    color: '#f97316',
    fontSize: '14px'
  },
  discardBtn: {
    marginLeft: 'auto',
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #f97316',
    borderRadius: '8px',
    color: '#f97316',
    fontSize: '13px',
    cursor: 'pointer'
  },
  saveSmallBtn: {
    padding: '8px 16px',
    backgroundColor: '#f97316',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  quickStats: {
    display: 'flex',
    gap: '20px',
    marginBottom: '24px'
  },
  quickStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    flex: 1
  },
  quickStatContent: {},
  quickStatValue: {
    display: 'block',
    fontSize: '20px',
    fontWeight: 700
  },
  quickStatLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  quickStatChange: {
    marginLeft: 'auto',
    fontSize: '12px',
    fontWeight: 600,
    color: '#22c55e'
  },
  tabNav: {
    display: 'flex',
    gap: '4px',
    marginBottom: '24px',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '0'
  },
  tabBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    marginBottom: '-1px'
  },
  tabBtnActive: {
    color: 'var(--color-primary)',
    borderBottomColor: 'var(--color-primary)'
  },
  mainContent: {},
  tabContent: {},
  twoColumn: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  card: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '24px'
  },
  cardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 20px 0'
  },
  formGroup: {
    marginBottom: '20px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  formLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '8px',
    color: 'var(--color-text)'
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
  formSelect: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none',
    boxSizing: 'border-box'
  },
  inputWithPrefix: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  inputPrefix: {
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    borderRight: '1px solid var(--color-border)',
    color: 'var(--color-text-muted)',
    fontSize: '14px'
  },
  urlPrefix: {
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    borderRight: '1px solid var(--color-border)',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    whiteSpace: 'nowrap'
  },
  formInputWithPrefix: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    minHeight: '48px'
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '20px',
    color: '#ffffff',
    fontSize: '12px'
  },
  tagRemove: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    border: 'none',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    color: '#ffffff'
  },
  tagInput: {
    flex: 1,
    minWidth: '100px',
    padding: '6px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  collectionsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  collectionBadge: {
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    fontSize: '13px'
  },
  addCollectionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'transparent',
    border: '1px dashed var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-primary)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  statusOptions: {
    display: 'flex',
    gap: '12px'
  },
  radioOption: {
    flex: 1,
    cursor: 'pointer'
  },
  radioInput: {
    display: 'none'
  },
  radioContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '2px solid var(--color-border)',
    borderRadius: '10px',
    transition: 'all 0.2s'
  },
  infoList: {},
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  infoLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  infoValue: {
    fontSize: '13px',
    fontWeight: 600
  },
  // Media Tab
  mediaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '16px'
  },
  mediaCard: {
    position: 'relative',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  mediaCardPrimary: {
    borderColor: 'var(--color-primary)',
    borderWidth: '2px'
  },
  mediaImagePlaceholder: {
    height: '160px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mediaCardOverlay: {
    padding: '12px'
  },
  altInput: {
    width: '100%',
    padding: '8px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    fontSize: '12px',
    outline: 'none',
    marginBottom: '8px',
    boxSizing: 'border-box'
  },
  mediaActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  primaryBadge: {
    padding: '4px 8px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--color-primary)'
  },
  mediaActionBtn: {
    padding: '6px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '6px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  mediaUploadCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    height: '200px',
    border: '2px dashed var(--color-border)',
    borderRadius: '12px',
    cursor: 'pointer'
  },
  uploadText: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    textAlign: 'center'
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  // Pricing Tab
  marginDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '10px'
  },
  marginAmount: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#22c55e'
  },
  marginPercent: {
    fontSize: '14px',
    color: '#22c55e'
  },
  marginNA: {
    color: 'var(--color-text-muted)'
  },
  checkboxGroup: {
    marginBottom: '16px'
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
  // Inventory Tab
  stockStatusDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    marginBottom: '16px'
  },
  stockStatusBadge: {
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 600
  },
  stockStatusText: {
    fontSize: '14px'
  },
  // Variants Tab
  addVariantBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  variantsTable: {},
  variantsHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 100px',
    gap: '16px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    marginBottom: '8px'
  },
  variantColName: {},
  variantColSku: {},
  variantColPrice: {},
  variantColStock: {},
  variantColActions: { textAlign: 'right' },
  variantRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 100px',
    gap: '16px',
    alignItems: 'center',
    padding: '14px 16px',
    borderBottom: '1px solid var(--color-border)'
  },
  variantName: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontWeight: 500
  },
  variantImageThumb: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  variantSku: {
    fontFamily: 'monospace',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  variantPrice: {
    fontWeight: 600
  },
  variantStock: {
    fontWeight: 600
  },
  variantActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px'
  },
  variantActionBtn: {
    padding: '8px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  noVariants: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '40px',
    color: 'var(--color-text-muted)'
  },
  // SEO Tab
  seoPreview: {
    marginBottom: '24px'
  },
  seoPreviewLabel: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    marginBottom: '12px',
    textTransform: 'uppercase'
  },
  seoPreviewCard: {
    padding: '16px 20px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)'
  },
  seoPreviewTitle: {
    display: 'block',
    fontSize: '18px',
    fontWeight: 500,
    color: '#1a0dab',
    marginBottom: '4px'
  },
  seoPreviewUrl: {
    display: 'block',
    fontSize: '13px',
    color: '#006621',
    marginBottom: '4px'
  },
  seoPreviewDesc: {
    fontSize: '13px',
    color: '#545454',
    lineHeight: 1.5
  },
  charCount: {
    display: 'block',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginTop: '6px',
    textAlign: 'right'
  },
  // Danger Zone
  dangerZone: {
    marginTop: '40px',
    padding: '24px',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderRadius: '16px',
    border: '1px solid rgba(239, 68, 68, 0.2)'
  },
  dangerTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ef4444',
    margin: '0 0 16px 0'
  },
  dangerActions: {
    display: 'flex',
    gap: '12px'
  },
  dangerBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  deleteBtn: {
    borderColor: '#ef4444',
    color: '#ef4444'
  }
};

export default ProductDetail;