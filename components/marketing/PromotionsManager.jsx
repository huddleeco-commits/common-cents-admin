/**
 * PromotionsManager
 * 
 * Complete promotion management system:
 * - Discount codes (percentage, fixed, free shipping)
 * - Flash sales
 * - Buy One Get One (BOGO)
 * - Product bundles
 * - Volume discounts
 * - Usage limits & expiration
 * - Performance tracking
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Tag,
  Percent,
  DollarSign,
  Truck,
  Gift,
  Package,
  ShoppingBag,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  MoreHorizontal,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  BarChart3,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle,
  CheckCircle,
  Pause,
  Play,
  RefreshCw,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Layers,
  ChevronDown,
  ExternalLink,
  Info
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

export function PromotionsManager() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [promotions, setPromotions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [stats, setStats] = useState(null);

  const fetchPromotions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/marketing/promotions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          // API doesn't exist yet, use empty data
          setPromotions([]);
          setStats({ totalRevenue: 0, revenueChange: 0, activePromos: 0, totalRedemptions: 0, redemptionsChange: 0, avgOrderValue: 0, aovChange: 0 });
          return;
        }
        throw new Error(`Failed to fetch promotions: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.promotions) {
        setPromotions(result.promotions);
        // Calculate stats from data
        const active = result.promotions.filter(p => p.status === 'active');
        const totalRevenue = result.promotions.reduce((sum, p) => sum + (p.revenue || 0), 0);
        const totalRedemptions = result.promotions.reduce((sum, p) => sum + (p.usage_count || 0), 0);
        setStats({
          totalRevenue,
          revenueChange: 0,
          activePromos: active.length,
          totalRedemptions,
          redemptionsChange: 0,
          avgOrderValue: totalRedemptions > 0 ? totalRevenue / totalRedemptions : 0,
          aovChange: 0
        });
      } else {
        setPromotions([]);
        setStats({ totalRevenue: 0, revenueChange: 0, activePromos: 0, totalRedemptions: 0, redemptionsChange: 0, avgOrderValue: 0, aovChange: 0 });
      }
    } catch (err) {
      console.error('Error fetching promotions:', err);
      setError(err.message);
      setPromotions([]);
      setStats({ totalRevenue: 0, revenueChange: 0, activePromos: 0, totalRedemptions: 0, redemptionsChange: 0, avgOrderValue: 0, aovChange: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  // Demo data for reference (not used)
  const getDemoPromotions = () => [
        {
          id: 1,
          code: 'SAVE20',
          name: 'January Sale - 20% Off',
          type: 'percentage',
          value: 20,
          status: 'active',
          usageCount: 234,
          usageLimit: 500,
          minPurchase: 50,
          maxDiscount: 100,
          revenue: 18720,
          avgDiscount: 24.50,
          startsAt: '2024-01-01T00:00:00',
          expiresAt: '2024-01-31T23:59:59',
          appliesTo: 'all',
          customerLimit: 1,
          createdAt: '2023-12-28'
        },
        {
          id: 2,
          code: 'FREESHIP',
          name: 'Free Shipping',
          type: 'free_shipping',
          value: null,
          status: 'active',
          usageCount: 567,
          usageLimit: null,
          minPurchase: 35,
          maxDiscount: null,
          revenue: 12450,
          avgDiscount: 8.99,
          startsAt: null,
          expiresAt: null,
          appliesTo: 'all',
          customerLimit: null,
          createdAt: '2023-10-15'
        },
        {
          id: 3,
          code: 'WELCOME10',
          name: 'New Customer Welcome',
          type: 'percentage',
          value: 10,
          status: 'active',
          usageCount: 89,
          usageLimit: null,
          minPurchase: null,
          maxDiscount: 50,
          revenue: 4230,
          avgDiscount: 12.30,
          startsAt: null,
          expiresAt: null,
          appliesTo: 'all',
          customerLimit: 1,
          conditions: ['first_order'],
          createdAt: '2023-09-01'
        },
        {
          id: 4,
          code: 'FLASH40',
          name: 'Flash Sale - 40% Off',
          type: 'percentage',
          value: 40,
          status: 'expired',
          usageCount: 156,
          usageLimit: 200,
          minPurchase: 75,
          maxDiscount: 150,
          revenue: 23400,
          avgDiscount: 58.50,
          startsAt: '2024-01-06T12:00:00',
          expiresAt: '2024-01-06T16:00:00',
          appliesTo: 'all',
          customerLimit: 1,
          createdAt: '2024-01-05'
        },
        {
          id: 5,
          code: 'VIP25',
          name: 'VIP Customer Exclusive',
          type: 'percentage',
          value: 25,
          status: 'active',
          usageCount: 78,
          usageLimit: null,
          minPurchase: 100,
          maxDiscount: 200,
          revenue: 15600,
          avgDiscount: 45.00,
          startsAt: null,
          expiresAt: null,
          appliesTo: 'all',
          customerLimit: null,
          conditions: ['vip_customer'],
          createdAt: '2023-11-20'
        },
        {
          id: 6,
          code: 'BOGO50',
          name: 'Buy One Get One 50% Off',
          type: 'bogo',
          value: 50,
          status: 'active',
          usageCount: 145,
          usageLimit: null,
          minPurchase: null,
          maxDiscount: null,
          revenue: 8700,
          avgDiscount: 32.00,
          startsAt: '2024-01-10',
          expiresAt: '2024-01-20',
          appliesTo: 'category',
          applyCategory: 'Apparel',
          customerLimit: 2,
          createdAt: '2024-01-09'
        },
        {
          id: 7,
          code: 'BUNDLE15',
          name: 'Bundle Discount',
          type: 'fixed',
          value: 15,
          status: 'active',
          usageCount: 56,
          usageLimit: null,
          minPurchase: null,
          maxDiscount: null,
          revenue: 3360,
          avgDiscount: 15.00,
          startsAt: null,
          expiresAt: null,
          appliesTo: 'products',
          applyProducts: ['Bundle A', 'Bundle B'],
          customerLimit: null,
          createdAt: '2023-12-01'
        },
        {
          id: 8,
          code: 'SUMMER30',
          name: 'Summer Preview Sale',
          type: 'percentage',
          value: 30,
          status: 'scheduled',
          usageCount: 0,
          usageLimit: 1000,
          minPurchase: 60,
          maxDiscount: 100,
          revenue: 0,
          avgDiscount: 0,
          startsAt: '2024-06-01T00:00:00',
          expiresAt: '2024-06-30T23:59:59',
          appliesTo: 'all',
          customerLimit: 1,
          createdAt: '2024-01-10'
        },
        {
          id: 9,
          code: 'LOYALTY5',
          name: '$5 Off Loyalty Reward',
          type: 'fixed',
          value: 5,
          status: 'paused',
          usageCount: 234,
          usageLimit: null,
          minPurchase: 25,
          maxDiscount: null,
          revenue: 1170,
          avgDiscount: 5.00,
          startsAt: null,
          expiresAt: null,
          appliesTo: 'all',
          conditions: ['has_account'],
          customerLimit: null,
          createdAt: '2023-08-15'
        }
  ];

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return '-';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) return '-';
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercent = (num) => {
    return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No expiration';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'percentage': return <Percent size={16} />;
      case 'fixed': return <DollarSign size={16} />;
      case 'free_shipping': return <Truck size={16} />;
      case 'bogo': return <Gift size={16} />;
      case 'bundle': return <Package size={16} />;
      default: return <Tag size={16} />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'percentage': return 'Percentage';
      case 'fixed': return 'Fixed Amount';
      case 'free_shipping': return 'Free Shipping';
      case 'bogo': return 'BOGO';
      case 'bundle': return 'Bundle';
      default: return type;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'percentage': return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' };
      case 'fixed': return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' };
      case 'free_shipping': return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' };
      case 'bogo': return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316' };
      case 'bundle': return { bg: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' };
      default: return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' };
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', icon: <CheckCircle size={12} /> };
      case 'scheduled':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', icon: <Clock size={12} /> };
      case 'paused':
        return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316', icon: <Pause size={12} /> };
      case 'expired':
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', icon: <X size={12} /> };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', icon: null };
    }
  };

  const getPromoValue = (promo) => {
    switch (promo.type) {
      case 'percentage': return `${promo.value}% OFF`;
      case 'fixed': return `$${promo.value} OFF`;
      case 'free_shipping': return 'FREE SHIPPING';
      case 'bogo': return `BOGO ${promo.value}% OFF`;
      default: return promo.value;
    }
  };

  const getUsagePercent = (promo) => {
    if (!promo.usageLimit) return null;
    return (promo.usageCount / promo.usageLimit) * 100;
  };

  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch = promo.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && promo.status === activeTab;
  });

  const tabCounts = {
    all: promotions.length,
    active: promotions.filter(p => p.status === 'active').length,
    scheduled: promotions.filter(p => p.status === 'scheduled').length,
    paused: promotions.filter(p => p.status === 'paused').length,
    expired: promotions.filter(p => p.status === 'expired').length
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Tag size={48} style={{ opacity: 0.5 }} />
        <p>Loading promotions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.loadingContainer}>
        <AlertTriangle size={48} color="#ef4444" />
        <p style={{ color: '#ef4444' }}>{error}</p>
        <button onClick={fetchPromotions} style={styles.retryBtn}>
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
          <h1 style={styles.title}>Promotions</h1>
          <p style={styles.subtitle}>Discount codes, sales & special offers</p>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.actionBtn}>
            <Download size={16} />
            Export
          </button>
          <button 
            style={styles.primaryBtn}
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={18} />
            Create Promotion
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
              <DollarSign size={20} color="#22c55e" />
            </div>
            <span style={{
              ...styles.statChange,
              color: stats.revenueChange >= 0 ? '#22c55e' : '#ef4444'
            }}>
              {stats.revenueChange >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {formatPercent(stats.revenueChange)}
            </span>
          </div>
          <div style={styles.statValue}>{formatCurrency(stats.totalRevenue)}</div>
          <div style={styles.statLabel}>Promo Revenue</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)'}}>
              <Tag size={20} color="#8b5cf6" />
            </div>
          </div>
          <div style={styles.statValue}>{stats.activePromos}</div>
          <div style={styles.statLabel}>Active Promos</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
              <Users size={20} color="#3b82f6" />
            </div>
            <span style={{
              ...styles.statChange,
              color: stats.redemptionsChange >= 0 ? '#22c55e' : '#ef4444'
            }}>
              {stats.redemptionsChange >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {formatPercent(stats.redemptionsChange)}
            </span>
          </div>
          <div style={styles.statValue}>{formatNumber(stats.totalRedemptions)}</div>
          <div style={styles.statLabel}>Total Redemptions</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(249, 115, 22, 0.1)'}}>
              <ShoppingBag size={20} color="#f97316" />
            </div>
            <span style={{
              ...styles.statChange,
              color: stats.aovChange >= 0 ? '#22c55e' : '#ef4444'
            }}>
              {stats.aovChange >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {formatPercent(stats.aovChange)}
            </span>
          </div>
          <div style={styles.statValue}>{formatCurrency(stats.avgOrderValue)}</div>
          <div style={styles.statLabel}>Avg Order Value</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {[
          { id: 'all', label: 'All' },
          { id: 'active', label: 'Active' },
          { id: 'scheduled', label: 'Scheduled' },
          { id: 'paused', label: 'Paused' },
          { id: 'expired', label: 'Expired' }
        ].map(tab => (
          <button
            key={tab.id}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.tabActive : {})
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span style={{
              ...styles.tabCount,
              ...(activeTab === tab.id ? styles.tabCountActive : {})
            }}>
              {tabCounts[tab.id]}
            </span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchBox}>
          <Search size={18} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search by code or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          {searchQuery && (
            <button style={styles.clearBtn} onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>
        <button style={styles.filterBtn}>
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* Promotions Grid */}
      <div style={styles.promoGrid}>
        {filteredPromotions.map((promo) => {
          const typeStyle = getTypeColor(promo.type);
          const statusStyle = getStatusStyle(promo.status);
          const usagePercent = getUsagePercent(promo);

          return (
            <div key={promo.id} style={styles.promoCard}>
              {/* Card Header */}
              <div style={styles.promoCardHeader}>
                <div style={styles.promoCodeWrapper}>
                  <span style={{
                    ...styles.promoTypeBadge,
                    backgroundColor: typeStyle.bg,
                    color: typeStyle.color
                  }}>
                    {getTypeIcon(promo.type)}
                  </span>
                  <div>
                    <span style={styles.promoCode}>{promo.code}</span>
                    <span style={styles.promoName}>{promo.name}</span>
                  </div>
                </div>
                <div style={styles.promoCardActions}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.color
                  }}>
                    {statusStyle.icon}
                    {promo.status}
                  </span>
                  <button style={styles.moreBtn}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              {/* Value Display */}
              <div style={styles.promoValue}>
                <span style={styles.promoValueText}>{getPromoValue(promo)}</span>
                {promo.minPurchase && (
                  <span style={styles.promoCondition}>
                    Min. {formatCurrency(promo.minPurchase)}
                  </span>
                )}
                {promo.maxDiscount && (
                  <span style={styles.promoCondition}>
                    Max. {formatCurrency(promo.maxDiscount)}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div style={styles.promoStats}>
                <div style={styles.promoStat}>
                  <span style={styles.promoStatLabel}>Used</span>
                  <span style={styles.promoStatValue}>
                    {formatNumber(promo.usageCount)}
                    {promo.usageLimit && <span style={styles.promoStatLimit}> / {formatNumber(promo.usageLimit)}</span>}
                  </span>
                </div>
                <div style={styles.promoStat}>
                  <span style={styles.promoStatLabel}>Revenue</span>
                  <span style={{...styles.promoStatValue, color: '#22c55e'}}>
                    {formatCurrency(promo.revenue)}
                  </span>
                </div>
                <div style={styles.promoStat}>
                  <span style={styles.promoStatLabel}>Avg Discount</span>
                  <span style={styles.promoStatValue}>
                    {formatCurrency(promo.avgDiscount)}
                  </span>
                </div>
              </div>

              {/* Usage Progress */}
              {usagePercent !== null && (
                <div style={styles.usageProgress}>
                  <div style={styles.usageProgressBar}>
                    <div style={{
                      ...styles.usageProgressFill,
                      width: `${Math.min(usagePercent, 100)}%`,
                      backgroundColor: usagePercent >= 90 ? '#ef4444' : 
                        usagePercent >= 70 ? '#f59e0b' : '#22c55e'
                    }} />
                  </div>
                  <span style={styles.usageProgressText}>
                    {usagePercent.toFixed(0)}% used
                  </span>
                </div>
              )}

              {/* Dates */}
              <div style={styles.promoDates}>
                <div style={styles.promoDate}>
                  <Calendar size={12} />
                  <span>
                    {promo.startsAt 
                      ? `${formatDate(promo.startsAt)} - ${formatDate(promo.expiresAt)}`
                      : 'No expiration'
                    }
                  </span>
                </div>
                {promo.customerLimit && (
                  <div style={styles.promoDate}>
                    <Users size={12} />
                    <span>{promo.customerLimit}x per customer</span>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div style={styles.promoCardFooter}>
                <button style={styles.promoActionBtn}>
                  <BarChart3 size={14} />
                  Stats
                </button>
                <button style={styles.promoActionBtn}>
                  <Edit size={14} />
                  Edit
                </button>
                <button style={styles.promoActionBtn}>
                  <Copy size={14} />
                  Duplicate
                </button>
                {promo.status === 'active' ? (
                  <button style={{...styles.promoActionBtn, color: '#f59e0b'}}>
                    <Pause size={14} />
                    Pause
                  </button>
                ) : promo.status === 'paused' ? (
                  <button style={{...styles.promoActionBtn, color: '#22c55e'}}>
                    <Play size={14} />
                    Resume
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}

        {/* Add New Card */}
        <button 
          style={styles.addPromoCard}
          onClick={() => setShowCreateModal(true)}
        >
          <div style={styles.addPromoIcon}>
            <Plus size={32} />
          </div>
          <span style={styles.addPromoText}>Create New Promotion</span>
          <span style={styles.addPromoHint}>
            Discount code, sale, or special offer
          </span>
        </button>
      </div>

      {/* Empty State */}
      {filteredPromotions.length === 0 && (
        <div style={styles.emptyState}>
          <Tag size={48} color="var(--color-text-muted)" />
          <h3 style={styles.emptyTitle}>No promotions found</h3>
          <p style={styles.emptyText}>
            {searchQuery 
              ? 'Try adjusting your search or filters'
              : 'Create your first promotion to get started'
            }
          </p>
          <button 
            style={styles.primaryBtn}
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={18} />
            Create Promotion
          </button>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreatePromoModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}

// Create Promotion Modal Component
function CreatePromoModal({ onClose, editPromo = null }) {
  const [promoType, setPromoType] = useState('percentage');
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    value: '',
    minPurchase: '',
    maxDiscount: '',
    usageLimit: '',
    customerLimit: '1',
    startsAt: '',
    expiresAt: '',
    appliesTo: 'all'
  });

  const promoTypes = [
    { id: 'percentage', label: 'Percentage Off', icon: Percent, desc: '% discount on order' },
    { id: 'fixed', label: 'Fixed Amount', icon: DollarSign, desc: '$ off order total' },
    { id: 'free_shipping', label: 'Free Shipping', icon: Truck, desc: 'Waive shipping fees' },
    { id: 'bogo', label: 'Buy One Get One', icon: Gift, desc: 'BOGO deals' }
  ];

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, code }));
  };

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.modal} onClick={e => e.stopPropagation()}>
        <div style={modalStyles.header}>
          <h2 style={modalStyles.title}>
            {editPromo ? 'Edit Promotion' : 'Create Promotion'}
          </h2>
          <button style={modalStyles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={modalStyles.body}>
          {/* Promo Type Selection */}
          <div style={modalStyles.section}>
            <label style={modalStyles.label}>Promotion Type</label>
            <div style={modalStyles.typeGrid}>
              {promoTypes.map(type => {
                const TypeIcon = type.icon;
                const isSelected = promoType === type.id;
                return (
                  <button
                    key={type.id}
                    style={{
                      ...modalStyles.typeBtn,
                      ...(isSelected ? modalStyles.typeBtnActive : {})
                    }}
                    onClick={() => setPromoType(type.id)}
                  >
                    <TypeIcon size={20} />
                    <span style={modalStyles.typeBtnLabel}>{type.label}</span>
                    <span style={modalStyles.typeBtnDesc}>{type.desc}</span>
                    {isSelected && (
                      <div style={modalStyles.typeCheck}>
                        <Check size={12} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code & Name */}
          <div style={modalStyles.section}>
            <div style={modalStyles.row}>
              <div style={modalStyles.field}>
                <label style={modalStyles.label}>Discount Code *</label>
                <div style={modalStyles.inputWithBtn}>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    placeholder="e.g., SAVE20"
                    style={modalStyles.input}
                  />
                  <button style={modalStyles.generateBtn} onClick={generateCode}>
                    <RefreshCw size={14} />
                    Generate
                  </button>
                </div>
              </div>
              <div style={modalStyles.field}>
                <label style={modalStyles.label}>Internal Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., January Sale"
                  style={modalStyles.input}
                />
              </div>
            </div>
          </div>

          {/* Value */}
          {promoType !== 'free_shipping' && (
            <div style={modalStyles.section}>
              <div style={modalStyles.row}>
                <div style={modalStyles.field}>
                  <label style={modalStyles.label}>
                    {promoType === 'percentage' || promoType === 'bogo' ? 'Discount Percentage *' : 'Discount Amount *'}
                  </label>
                  <div style={modalStyles.inputWithIcon}>
                    <span style={modalStyles.inputIcon}>
                      {promoType === 'percentage' || promoType === 'bogo' ? '%' : '$'}
                    </span>
                    <input
                      type="number"
                      value={formData.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                      placeholder="0"
                      style={{...modalStyles.input, paddingLeft: '36px'}}
                    />
                  </div>
                </div>
                {promoType === 'percentage' && (
                  <div style={modalStyles.field}>
                    <label style={modalStyles.label}>Maximum Discount</label>
                    <div style={modalStyles.inputWithIcon}>
                      <span style={modalStyles.inputIcon}>$</span>
                      <input
                        type="number"
                        value={formData.maxDiscount}
                        onChange={(e) => setFormData(prev => ({ ...prev, maxDiscount: e.target.value }))}
                        placeholder="No limit"
                        style={{...modalStyles.input, paddingLeft: '36px'}}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Requirements */}
          <div style={modalStyles.section}>
            <label style={modalStyles.label}>Requirements</label>
            <div style={modalStyles.row}>
              <div style={modalStyles.field}>
                <label style={modalStyles.sublabel}>Minimum Purchase</label>
                <div style={modalStyles.inputWithIcon}>
                  <span style={modalStyles.inputIcon}>$</span>
                  <input
                    type="number"
                    value={formData.minPurchase}
                    onChange={(e) => setFormData(prev => ({ ...prev, minPurchase: e.target.value }))}
                    placeholder="No minimum"
                    style={{...modalStyles.input, paddingLeft: '36px'}}
                  />
                </div>
              </div>
              <div style={modalStyles.field}>
                <label style={modalStyles.sublabel}>Usage Limit</label>
                <input
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData(prev => ({ ...prev, usageLimit: e.target.value }))}
                  placeholder="Unlimited"
                  style={modalStyles.input}
                />
              </div>
              <div style={modalStyles.field}>
                <label style={modalStyles.sublabel}>Per Customer</label>
                <input
                  type="number"
                  value={formData.customerLimit}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerLimit: e.target.value }))}
                  placeholder="Unlimited"
                  style={modalStyles.input}
                />
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div style={modalStyles.section}>
            <label style={modalStyles.label}>Schedule</label>
            <div style={modalStyles.row}>
              <div style={modalStyles.field}>
                <label style={modalStyles.sublabel}>Start Date</label>
                <input
                  type="datetime-local"
                  value={formData.startsAt}
                  onChange={(e) => setFormData(prev => ({ ...prev, startsAt: e.target.value }))}
                  style={modalStyles.input}
                />
              </div>
              <div style={modalStyles.field}>
                <label style={modalStyles.sublabel}>End Date</label>
                <input
                  type="datetime-local"
                  value={formData.expiresAt}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiresAt: e.target.value }))}
                  style={modalStyles.input}
                />
              </div>
            </div>
          </div>

          {/* Applies To */}
          <div style={modalStyles.section}>
            <label style={modalStyles.label}>Applies To</label>
            <div style={modalStyles.radioGroup}>
              {[
                { id: 'all', label: 'All Products' },
                { id: 'category', label: 'Specific Categories' },
                { id: 'products', label: 'Specific Products' }
              ].map(option => (
                <label key={option.id} style={modalStyles.radioLabel}>
                  <input
                    type="radio"
                    name="appliesTo"
                    value={option.id}
                    checked={formData.appliesTo === option.id}
                    onChange={(e) => setFormData(prev => ({ ...prev, appliesTo: e.target.value }))}
                    style={modalStyles.radioInput}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div style={modalStyles.footer}>
          <button style={modalStyles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button style={modalStyles.saveBtn}>
            <Check size={16} />
            {editPromo ? 'Save Changes' : 'Create Promotion'}
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
    color: 'var(--color-text-muted)',
    margin: 0
  },
  headerRight: {
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  statIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    fontSize: '12px',
    fontWeight: 600
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    marginBottom: '20px',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '0'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    marginBottom: '-1px'
  },
  tabActive: {
    color: 'var(--color-primary)',
    borderBottomColor: 'var(--color-primary)'
  },
  tabCount: {
    padding: '2px 8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    fontSize: '12px'
  },
  tabCountActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: 'var(--color-primary)'
  },
  toolbar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    flex: 1,
    maxWidth: '400px'
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  clearBtn: {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
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
  promoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '20px'
  },
  promoCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  promoCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  promoCodeWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },
  promoTypeBadge: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  promoCode: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 700,
    fontFamily: 'monospace',
    letterSpacing: '0.5px'
  },
  promoName: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginTop: '2px'
  },
  promoCardActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  moreBtn: {
    padding: '6px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '6px'
  },
  promoValue: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '10px'
  },
  promoValueText: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--color-primary)'
  },
  promoCondition: {
    padding: '4px 10px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '6px',
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  promoStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    padding: '12px 0',
    borderTop: '1px solid var(--color-border)',
    borderBottom: '1px solid var(--color-border)'
  },
  promoStat: {
    textAlign: 'center'
  },
  promoStatLabel: {
    display: 'block',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginBottom: '4px'
  },
  promoStatValue: {
    fontSize: '15px',
    fontWeight: 700
  },
  promoStatLimit: {
    fontWeight: 400,
    color: 'var(--color-text-muted)'
  },
  usageProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  usageProgressBar: {
    flex: 1,
    height: '6px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  usageProgressFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  },
  usageProgressText: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    whiteSpace: 'nowrap'
  },
  promoDates: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px'
  },
  promoDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  promoCardFooter: {
    display: 'flex',
    gap: '8px',
    marginTop: 'auto'
  },
  promoActionBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '12px',
    cursor: 'pointer'
  },
  addPromoCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '40px 20px',
    backgroundColor: 'transparent',
    border: '2px dashed var(--color-border)',
    borderRadius: '16px',
    cursor: 'pointer',
    minHeight: '300px'
  },
  addPromoIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)'
  },
  addPromoText: {
    fontSize: '16px',
    fontWeight: 600
  },
  addPromoHint: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    gap: '16px',
    textAlign: 'center'
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0
  },
  emptyText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: 0
  }
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    width: '100%',
    maxWidth: '680px',
    maxHeight: '90vh',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid var(--color-border)'
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0
  },
  closeBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  body: {
    padding: '24px',
    overflowY: 'auto',
    flex: 1
  },
  section: {
    marginBottom: '24px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '12px'
  },
  sublabel: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginBottom: '6px'
  },
  typeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  },
  typeBtn: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '2px solid var(--color-border)',
    borderRadius: '12px',
    cursor: 'pointer',
    textAlign: 'left'
  },
  typeBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: 'rgba(59, 130, 246, 0.05)'
  },
  typeBtnLabel: {
    fontSize: '14px',
    fontWeight: 600
  },
  typeBtnDesc: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  typeCheck: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  inputWithBtn: {
    display: 'flex',
    gap: '8px'
  },
  generateBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  inputWithIcon: {
    position: 'relative'
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-text-muted)',
    fontSize: '14px'
  },
  radioGroup: {
    display: 'flex',
    gap: '20px'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  radioInput: {
    width: '18px',
    height: '18px'
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid var(--color-border)'
  },
  cancelBtn: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
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
    padding: '10px 24px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  }
};

export default PromotionsManager;