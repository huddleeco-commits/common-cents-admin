/**
 * ProductPricing
 * 
 * Advanced pricing management.
 * - Bulk price editing
 * - Price rules (automatic)
 * - Sale/promotion pricing
 * - Cost & margin tracking
 * - Price history
 * - Competitor price tracking
 * - Currency management
 * 
 * Works across entire catalog or filtered selection.
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  DollarSign,
  Percent,
  TrendingUp,
  TrendingDown,
  Tag,
  Zap,
  Clock,
  Calendar,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Download,
  Upload,
  Eye,
  History,
  Target,
  Globe,
  Copy,
  Play,
  Pause,
  Settings
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

export function ProductPricing() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [priceRules, setPriceRules] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [bulkEditType, setBulkEditType] = useState('fixed');
  const [bulkEditValue, setBulkEditValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPricingData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/products`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.products) {
        // Transform products for pricing view
        const pricingProducts = data.products.map(p => ({
          id: p.id,
          name: p.name,
          sku: p.sku || `SKU-${p.id}`,
          category: p.category || 'Uncategorized',
          price: parseFloat(p.price) || 0,
          comparePrice: p.compare_price ? parseFloat(p.compare_price) : null,
          cost: p.cost ? parseFloat(p.cost) : 0,
          margin: p.cost && p.price ? (((parseFloat(p.price) - parseFloat(p.cost)) / parseFloat(p.price)) * 100).toFixed(1) : 0,
          lastUpdated: p.updated_at || p.created_at || new Date().toISOString(),
          priceHistory: p.price_history || []
        }));
        setProducts(pricingProducts);
      } else {
        setProducts([]);
      }

      // Price rules would come from a separate endpoint
      setPriceRules([]);
    } catch (err) {
      console.error('Error fetching pricing data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPricingData();
  }, [fetchPricingData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getMarginColor = (margin) => {
    if (margin >= 65) return '#22c55e';
    if (margin >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const getTotalRevenuePotential = () => {
    return products.reduce((sum, p) => sum + p.price, 0);
  };

  const getAverageMargin = () => {
    const total = products.reduce((sum, p) => sum + p.margin, 0);
    return (total / products.length).toFixed(1);
  };

  const getProductsOnSale = () => {
    return products.filter(p => p.comparePrice).length;
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const applyBulkEdit = () => {
    const value = parseFloat(bulkEditValue);
    if (isNaN(value)) return;

    const updatedProducts = products.map(product => {
      if (!selectedProducts.includes(product.id)) return product;

      let newPrice = product.price;
      
      if (bulkEditType === 'fixed') {
        newPrice = value;
      } else if (bulkEditType === 'increase_percent') {
        newPrice = product.price * (1 + value / 100);
      } else if (bulkEditType === 'decrease_percent') {
        newPrice = product.price * (1 - value / 100);
      } else if (bulkEditType === 'increase_amount') {
        newPrice = product.price + value;
      } else if (bulkEditType === 'decrease_amount') {
        newPrice = product.price - value;
      } else if (bulkEditType === 'margin') {
        newPrice = product.cost / (1 - value / 100);
      }

      const newMargin = ((newPrice - product.cost) / newPrice * 100).toFixed(1);

      return {
        ...product,
        price: Math.round(newPrice * 100) / 100,
        margin: parseFloat(newMargin),
        lastUpdated: new Date().toISOString().split('T')[0]
      };
    });

    setProducts(updatedProducts);
    setShowBulkEdit(false);
    setSelectedProducts([]);
    setBulkEditValue('');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <DollarSign size={32} style={{ animation: 'pulse 1s ease-in-out infinite' }} />
        <p>Loading pricing data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.loadingContainer}>
        <AlertTriangle size={32} color="#ef4444" />
        <p style={{ color: '#ef4444' }}>{error}</p>
        <button onClick={fetchPricingData} style={styles.retryBtn}>
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Pricing</h1>
          <span style={styles.subtitle}>
            Manage prices, margins, and promotions
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
            <Plus size={16} />
            New Price Rule
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
              <DollarSign size={22} color="#22c55e" />
            </div>
          </div>
          <div style={styles.statValue}>{formatCurrency(getTotalRevenuePotential())}</div>
          <div style={styles.statLabel}>Total Catalog Value</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)'}}>
              <Percent size={22} color="#8b5cf6" />
            </div>
          </div>
          <div style={styles.statValue}>{getAverageMargin()}%</div>
          <div style={styles.statLabel}>Average Margin</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(249, 115, 22, 0.1)'}}>
              <Tag size={22} color="#f97316" />
            </div>
          </div>
          <div style={styles.statValue}>{getProductsOnSale()}</div>
          <div style={styles.statLabel}>Products on Sale</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
              <Zap size={22} color="#3b82f6" />
            </div>
          </div>
          <div style={styles.statValue}>{priceRules.filter(r => r.status === 'active').length}</div>
          <div style={styles.statLabel}>Active Price Rules</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={styles.tabNav}>
        {[
          { id: 'overview', label: 'Price List', icon: DollarSign },
          { id: 'rules', label: 'Price Rules', icon: Zap },
          { id: 'history', label: 'Price History', icon: History },
          { id: 'analysis', label: 'Margin Analysis', icon: TrendingUp }
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

      {/* Price List Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Toolbar */}
          <div style={styles.toolbar}>
            <div style={styles.searchBox}>
              <Search size={18} color="var(--color-text-muted)" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.toolbarRight}>
              {selectedProducts.length > 0 && (
                <button
                  style={styles.bulkEditBtn}
                  onClick={() => setShowBulkEdit(true)}
                >
                  <Edit size={16} />
                  Bulk Edit ({selectedProducts.length})
                </button>
              )}
              <button style={styles.filterBtn}>
                <Filter size={16} />
                Filter
              </button>
            </div>
          </div>

          {/* Bulk Edit Panel */}
          {showBulkEdit && (
            <div style={styles.bulkEditPanel}>
              <span style={styles.bulkEditLabel}>
                Adjust prices for {selectedProducts.length} products:
              </span>
              <select
                value={bulkEditType}
                onChange={(e) => setBulkEditType(e.target.value)}
                style={styles.bulkEditSelect}
              >
                <option value="fixed">Set fixed price</option>
                <option value="increase_percent">Increase by %</option>
                <option value="decrease_percent">Decrease by %</option>
                <option value="increase_amount">Increase by $</option>
                <option value="decrease_amount">Decrease by $</option>
                <option value="margin">Set margin %</option>
              </select>
              <div style={styles.bulkInputWrapper}>
                {bulkEditType.includes('percent') || bulkEditType === 'margin' ? (
                  <span style={styles.inputSuffix}>%</span>
                ) : (
                  <span style={styles.inputPrefix}>$</span>
                )}
                <input
                  type="number"
                  value={bulkEditValue}
                  onChange={(e) => setBulkEditValue(e.target.value)}
                  style={styles.bulkEditInput}
                  placeholder="0"
                />
              </div>
              <button style={styles.applyBtn} onClick={applyBulkEdit}>
                <Check size={14} />
                Apply
              </button>
              <button
                style={styles.cancelBtn}
                onClick={() => {
                  setShowBulkEdit(false);
                  setBulkEditValue('');
                }}
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Price Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeaderCell}>
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length}
                      onChange={handleSelectAll}
                      style={styles.checkbox}
                    />
                  </th>
                  <th style={styles.tableHeaderCell}>Product</th>
                  <th style={styles.tableHeaderCell}>Price</th>
                  <th style={styles.tableHeaderCell}>Compare Price</th>
                  <th style={styles.tableHeaderCell}>Cost</th>
                  <th style={styles.tableHeaderCell}>Margin</th>
                  <th style={styles.tableHeaderCell}>Last Updated</th>
                  <th style={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const isSelected = selectedProducts.includes(product.id);
                  const marginColor = getMarginColor(product.margin);
                  const discount = product.comparePrice
                    ? Math.round((1 - product.price / product.comparePrice) * 100)
                    : null;

                  return (
                    <tr
                      key={product.id}
                      style={{
                        ...styles.tableRow,
                        ...(isSelected ? styles.tableRowSelected : {})
                      }}
                    >
                      <td style={styles.tableCell}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectProduct(product.id)}
                          style={styles.checkbox}
                        />
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.productCell}>
                          <div style={styles.productImageThumb}>
                            <Package size={18} color="var(--color-text-muted)" />
                          </div>
                          <div style={styles.productInfo}>
                            <span style={styles.productName}>{product.name}</span>
                            <span style={styles.productMeta}>
                              {product.sku} • {product.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.priceInputWrapper}>
                          <span style={styles.pricePrefix}>$</span>
                          <input
                            type="number"
                            value={product.price}
                            style={styles.priceInput}
                            onChange={() => {}}
                          />
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.comparePriceCell}>
                          {product.comparePrice ? (
                            <>
                              <div style={styles.priceInputWrapper}>
                                <span style={styles.pricePrefix}>$</span>
                                <input
                                  type="number"
                                  value={product.comparePrice}
                                  style={styles.priceInput}
                                  onChange={() => {}}
                                />
                              </div>
                              <span style={styles.discountBadge}>-{discount}%</span>
                            </>
                          ) : (
                            <button style={styles.addComparePriceBtn}>
                              <Plus size={12} />
                              Add
                            </button>
                          )}
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.priceInputWrapper}>
                          <span style={styles.pricePrefix}>$</span>
                          <input
                            type="number"
                            value={product.cost}
                            style={styles.priceInput}
                            onChange={() => {}}
                          />
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.marginCell}>
                          <span style={{
                            ...styles.marginValue,
                            color: marginColor
                          }}>
                            {product.margin}%
                          </span>
                          <div style={styles.marginBar}>
                            <div style={{
                              ...styles.marginBarFill,
                              width: `${Math.min(product.margin, 100)}%`,
                              backgroundColor: marginColor
                            }} />
                          </div>
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={styles.dateText}>{formatDate(product.lastUpdated)}</span>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.actionsCell}>
                          {product.priceHistory.length > 0 && (
                            <button style={styles.actionIconBtn} title="Price History">
                              <History size={14} />
                            </button>
                          )}
                          <button style={styles.actionIconBtn} title="Edit">
                            <Edit size={14} />
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
        </>
      )}

      {/* Price Rules Tab */}
      {activeTab === 'rules' && (
        <div style={styles.rulesSection}>
          <div style={styles.rulesHeader}>
            <p style={styles.rulesDescription}>
              Price rules automatically adjust prices based on conditions. Rules are applied in order of priority.
            </p>
          </div>

          <div style={styles.rulesList}>
            {priceRules.map((rule, index) => (
              <div key={rule.id} style={styles.ruleCard}>
                <div style={styles.ruleCardHeader}>
                  <div style={styles.ruleCardLeft}>
                    <div style={styles.rulePriority}>{index + 1}</div>
                    <div style={styles.ruleInfo}>
                      <span style={styles.ruleName}>{rule.name}</span>
                      <span style={styles.ruleDetails}>
                        {rule.type === 'percentage' && `${rule.value}% off`}
                        {rule.type === 'margin' && `Min ${rule.value}% margin`}
                        {rule.type === 'rounding' && `Round to ${rule.value}`}
                        {' • '}
                        {rule.affectedProducts} products
                      </span>
                    </div>
                  </div>
                  <div style={styles.ruleCardRight}>
                    {rule.startDate && (
                      <span style={styles.ruleDates}>
                        <Calendar size={12} />
                        {formatDate(rule.startDate)} - {formatDate(rule.endDate)}
                      </span>
                    )}
                    <span style={{
                      ...styles.ruleStatus,
                      backgroundColor: rule.status === 'active' 
                        ? 'rgba(34, 197, 94, 0.1)' 
                        : 'rgba(249, 115, 22, 0.1)',
                      color: rule.status === 'active' ? '#22c55e' : '#f59e0b'
                    }}>
                      {rule.status === 'active' ? <Play size={10} /> : <Pause size={10} />}
                      {rule.status}
                    </span>
                    <div style={styles.ruleActions}>
                      <button style={styles.actionIconBtn}>
                        <Edit size={14} />
                      </button>
                      <button style={styles.actionIconBtn}>
                        {rule.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                      </button>
                      <button style={styles.actionIconBtn}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {rule.conditions.length > 0 && (
                  <div style={styles.ruleConditions}>
                    <span style={styles.conditionsLabel}>Conditions:</span>
                    {rule.conditions.map((cond, i) => (
                      <span key={i} style={styles.conditionBadge}>
                        {cond.field} {cond.operator} "{cond.value}"
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Rule Card */}
          <div style={styles.addRuleCard}>
            <Plus size={24} color="var(--color-text-muted)" />
            <span style={styles.addRuleText}>Create New Price Rule</span>
            <button style={styles.addRuleBtn}>
              <Plus size={16} />
              Add Rule
            </button>
          </div>
        </div>
      )}

      {/* Price History Tab */}
      {activeTab === 'history' && (
        <div style={styles.historySection}>
          <div style={styles.historyHeader}>
            <div style={styles.historyFilters}>
              <select style={styles.historySelect}>
                <option value="all">All Products</option>
                <option value="changed">Recently Changed</option>
              </select>
              <select style={styles.historySelect}>
                <option value="30">Last 30 Days</option>
                <option value="60">Last 60 Days</option>
                <option value="90">Last 90 Days</option>
              </select>
            </div>
          </div>

          <div style={styles.historyList}>
            {products.filter(p => p.priceHistory.length > 0).map((product) => (
              <div key={product.id} style={styles.historyCard}>
                <div style={styles.historyProductInfo}>
                  <Package size={18} color="var(--color-text-muted)" />
                  <div>
                    <span style={styles.historyProductName}>{product.name}</span>
                    <span style={styles.historyProductSku}>{product.sku}</span>
                  </div>
                </div>
                <div style={styles.historyTimeline}>
                  {product.priceHistory.map((entry, i) => {
                    const isIncrease = i > 0 && entry.price > product.priceHistory[i - 1].price;
                    const isDecrease = i > 0 && entry.price < product.priceHistory[i - 1].price;
                    return (
                      <div key={i} style={styles.historyEntry}>
                        <span style={styles.historyDate}>{formatDate(entry.date)}</span>
                        <span style={{
                          ...styles.historyPrice,
                          color: isDecrease ? '#22c55e' : isIncrease ? '#ef4444' : 'inherit'
                        }}>
                          {isDecrease && <ArrowDownRight size={14} />}
                          {isIncrease && <ArrowUpRight size={14} />}
                          {formatCurrency(entry.price)}
                        </span>
                      </div>
                    );
                  })}
                  <div style={styles.historyEntry}>
                    <span style={styles.historyDate}>Current</span>
                    <span style={styles.historyPriceCurrent}>
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {products.filter(p => p.priceHistory.length > 0).length === 0 && (
              <div style={styles.emptyHistory}>
                <History size={40} color="var(--color-text-muted)" />
                <p>No price history recorded yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Margin Analysis Tab */}
      {activeTab === 'analysis' && (
        <div style={styles.analysisSection}>
          {/* Margin Distribution */}
          <div style={styles.analysisCard}>
            <h3 style={styles.analysisCardTitle}>Margin Distribution</h3>
            <div style={styles.marginDistribution}>
              {[
                { label: 'High (65%+)', min: 65, max: 100, color: '#22c55e' },
                { label: 'Medium (50-65%)', min: 50, max: 65, color: '#f59e0b' },
                { label: 'Low (<50%)', min: 0, max: 50, color: '#ef4444' }
              ].map((tier) => {
                const count = products.filter(p => p.margin >= tier.min && p.margin < tier.max).length;
                const percent = (count / products.length * 100).toFixed(0);
                return (
                  <div key={tier.label} style={styles.marginTier}>
                    <div style={styles.marginTierHeader}>
                      <span style={{...styles.marginTierLabel, color: tier.color}}>
                        {tier.label}
                      </span>
                      <span style={styles.marginTierCount}>{count} products</span>
                    </div>
                    <div style={styles.marginTierBar}>
                      <div style={{
                        ...styles.marginTierBarFill,
                        width: `${percent}%`,
                        backgroundColor: tier.color
                      }} />
                    </div>
                    <span style={styles.marginTierPercent}>{percent}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Low Margin Alert */}
          <div style={styles.analysisCard}>
            <h3 style={styles.analysisCardTitle}>
              <AlertTriangle size={18} color="#f59e0b" style={{ marginRight: '8px' }} />
              Low Margin Products
            </h3>
            <div style={styles.lowMarginList}>
              {products.filter(p => p.margin < 50).length === 0 ? (
                <div style={styles.noLowMargin}>
                  <Check size={20} color="#22c55e" />
                  <span>All products have healthy margins!</span>
                </div>
              ) : (
                products.filter(p => p.margin < 50).map((product) => (
                  <div key={product.id} style={styles.lowMarginItem}>
                    <span style={styles.lowMarginName}>{product.name}</span>
                    <span style={styles.lowMarginValue}>{product.margin}%</span>
                    <button style={styles.fixMarginBtn}>Fix</button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Category Margins */}
          <div style={styles.analysisCard}>
            <h3 style={styles.analysisCardTitle}>Margins by Category</h3>
            <div style={styles.categoryMargins}>
              {['Electronics', 'Apparel', 'Fitness', 'Home', 'Accessories', 'Stationery'].map((category) => {
                const categoryProducts = products.filter(p => p.category === category);
                if (categoryProducts.length === 0) return null;
                const avgMargin = categoryProducts.reduce((sum, p) => sum + p.margin, 0) / categoryProducts.length;
                return (
                  <div key={category} style={styles.categoryMarginRow}>
                    <span style={styles.categoryName}>{category}</span>
                    <div style={styles.categoryMarginBar}>
                      <div style={{
                        ...styles.categoryMarginBarFill,
                        width: `${avgMargin}%`,
                        backgroundColor: getMarginColor(avgMargin)
                      }} />
                    </div>
                    <span style={{
                      ...styles.categoryMarginValue,
                      color: getMarginColor(avgMargin)
                    }}>
                      {avgMargin.toFixed(1)}%
                    </span>
                  </div>
                );
              })}
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  statHeader: {
    marginBottom: '12px'
  },
  statIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
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
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    width: '300px'
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  toolbarRight: {
    display: 'flex',
    gap: '12px'
  },
  bulkEditBtn: {
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
  filterBtn: {
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
    outline: 'none',
    cursor: 'pointer'
  },
  bulkInputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  inputPrefix: {
    position: 'absolute',
    left: '12px',
    color: 'var(--color-text-muted)',
    fontSize: '13px'
  },
  inputSuffix: {
    position: 'absolute',
    right: '12px',
    color: 'var(--color-text-muted)',
    fontSize: '13px'
  },
  bulkEditInput: {
    padding: '10px 14px 10px 28px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    outline: 'none',
    width: '120px'
  },
  applyBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    backgroundColor: '#22c55e',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  cancelBtn: {
    padding: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
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
  productCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  productImageThumb: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  productInfo: {},
  productName: {
    display: 'block',
    fontWeight: 600,
    fontSize: '14px'
  },
  productMeta: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  priceInputWrapper: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center'
  },
  pricePrefix: {
    position: 'absolute',
    left: '10px',
    color: 'var(--color-text-muted)',
    fontSize: '13px'
  },
  priceInput: {
    width: '90px',
    padding: '8px 10px 8px 24px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    fontWeight: 600,
    outline: 'none',
    textAlign: 'right'
  },
  comparePriceCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  discountBadge: {
    padding: '4px 8px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#22c55e'
  },
  addComparePriceBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    backgroundColor: 'transparent',
    border: '1px dashed var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text-muted)',
    fontSize: '12px',
    cursor: 'pointer'
  },
  marginCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  marginValue: {
    fontWeight: 700,
    fontSize: '14px',
    minWidth: '50px'
  },
  marginBar: {
    flex: 1,
    height: '6px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '3px',
    overflow: 'hidden',
    maxWidth: '80px'
  },
  marginBarFill: {
    height: '100%',
    borderRadius: '3px'
  },
  dateText: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
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
  // Price Rules Tab
  rulesSection: {},
  rulesHeader: {
    marginBottom: '20px'
  },
  rulesDescription: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: 0
  },
  rulesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  ruleCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  ruleCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px'
  },
  ruleCardLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  rulePriority: {
    width: '32px',
    height: '32px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '14px'
  },
  ruleInfo: {},
  ruleName: {
    display: 'block',
    fontWeight: 600,
    fontSize: '15px'
  },
  ruleDetails: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  ruleCardRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  ruleDates: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  ruleStatus: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  ruleActions: {
    display: 'flex',
    gap: '4px'
  },
  ruleConditions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    backgroundColor: 'var(--color-surface-2)',
    borderTop: '1px solid var(--color-border)'
  },
  conditionsLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  conditionBadge: {
    padding: '6px 12px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '8px',
    fontSize: '12px'
  },
  addRuleCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '40px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '2px dashed var(--color-border)',
    marginTop: '16px'
  },
  addRuleText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  addRuleBtn: {
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
  // History Tab
  historySection: {},
  historyHeader: {
    marginBottom: '20px'
  },
  historyFilters: {
    display: 'flex',
    gap: '12px'
  },
  historySelect: {
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none'
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  historyCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '20px 24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  historyProductInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '250px'
  },
  historyProductName: {
    display: 'block',
    fontWeight: 600,
    fontSize: '14px'
  },
  historyProductSku: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  historyTimeline: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flex: 1
  },
  historyEntry: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  },
  historyDate: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  historyPrice: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    fontWeight: 600
  },
  historyPriceCurrent: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--color-primary)'
  },
  emptyHistory: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    gap: '12px',
    color: 'var(--color-text-muted)'
  },
  // Analysis Tab
  analysisSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  },
  analysisCard: {
    padding: '24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  analysisCardTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 20px 0'
  },
  marginDistribution: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  marginTier: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  marginTierHeader: {
    width: '140px'
  },
  marginTierLabel: {
    display: 'block',
    fontWeight: 600,
    fontSize: '13px'
  },
  marginTierCount: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  marginTierBar: {
    flex: 1,
    height: '10px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  marginTierBarFill: {
    height: '100%',
    borderRadius: '5px'
  },
  marginTierPercent: {
    width: '40px',
    textAlign: 'right',
    fontWeight: 600,
    fontSize: '13px'
  },
  lowMarginList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  noLowMargin: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '10px',
    color: '#22c55e',
    fontSize: '14px'
  },
  lowMarginItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px'
  },
  lowMarginName: {
    flex: 1,
    fontWeight: 500,
    fontSize: '14px'
  },
  lowMarginValue: {
    fontWeight: 700,
    color: '#ef4444'
  },
  fixMarginBtn: {
    padding: '6px 14px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  categoryMargins: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  categoryMarginRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  categoryName: {
    width: '100px',
    fontSize: '13px',
    fontWeight: 500
  },
  categoryMarginBar: {
    flex: 1,
    height: '8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  categoryMarginBarFill: {
    height: '100%',
    borderRadius: '4px'
  },
  categoryMarginValue: {
    width: '50px',
    textAlign: 'right',
    fontWeight: 700,
    fontSize: '13px'
  }
};

export default ProductPricing;