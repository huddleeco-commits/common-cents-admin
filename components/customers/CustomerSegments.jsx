/**
 * CustomerSegments
 * 
 * Customer segmentation management.
 * - View all segments with counts
 * - Create custom segments
 * - Edit segment rules
 * - Segment analytics
 * - Quick actions per segment
 * 
 * AI can auto-segment based on behavior patterns.
 */

import React, { useState } from 'react';
import {
  Users,
  Star,
  UserPlus,
  AlertCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Plus,
  Edit2,
  Trash2,
  Mail,
  Gift,
  ChevronRight,
  MoreVertical,
  Zap,
  Target,
  DollarSign,
  ShoppingBag,
  Calendar,
  Settings,
  Eye
} from 'lucide-react';

export function CustomerSegments({ onViewSegment }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSegment, setEditingSegment] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Predefined segments
  const segments = [
    {
      id: 'vip',
      name: 'VIP Customers',
      description: 'High-value customers with 10+ orders or $500+ spent',
      icon: Star,
      color: '#f59e0b',
      count: 45,
      percentChange: 12,
      totalRevenue: 28450,
      avgOrderValue: 42.50,
      rules: [
        { field: 'totalOrders', operator: '>=', value: 10 },
        { field: 'totalSpent', operator: '>=', value: 500, logic: 'OR' }
      ],
      isSystem: true
    },
    {
      id: 'regular',
      name: 'Regular Customers',
      description: 'Customers with 3-9 orders in the last 6 months',
      icon: Users,
      color: '#3b82f6',
      count: 234,
      percentChange: 5,
      totalRevenue: 45670,
      avgOrderValue: 28.30,
      rules: [
        { field: 'totalOrders', operator: '>=', value: 3 },
        { field: 'totalOrders', operator: '<', value: 10 }
      ],
      isSystem: true
    },
    {
      id: 'new',
      name: 'New Customers',
      description: 'Customers who joined in the last 30 days',
      icon: UserPlus,
      color: '#22c55e',
      count: 67,
      percentChange: 23,
      totalRevenue: 4520,
      avgOrderValue: 22.10,
      rules: [
        { field: 'createdAt', operator: '>=', value: '30_days_ago' }
      ],
      isSystem: true
    },
    {
      id: 'at_risk',
      name: 'At Risk',
      description: 'Previously active customers with no orders in 45+ days',
      icon: AlertCircle,
      color: '#f97316',
      count: 89,
      percentChange: -8,
      totalRevenue: 12340,
      avgOrderValue: 31.20,
      rules: [
        { field: 'totalOrders', operator: '>=', value: 2 },
        { field: 'lastOrderDate', operator: '<=', value: '45_days_ago' }
      ],
      isSystem: true
    },
    {
      id: 'churned',
      name: 'Churned',
      description: 'Customers with no orders in 90+ days',
      icon: Clock,
      color: '#ef4444',
      count: 156,
      percentChange: -3,
      totalRevenue: 8920,
      avgOrderValue: 26.80,
      rules: [
        { field: 'lastOrderDate', operator: '<=', value: '90_days_ago' }
      ],
      isSystem: true
    },
    {
      id: 'corporate',
      name: 'Corporate Accounts',
      description: 'Business customers and corporate orders',
      icon: Target,
      color: '#8b5cf6',
      count: 28,
      percentChange: 15,
      totalRevenue: 18920,
      avgOrderValue: 67.50,
      rules: [
        { field: 'tags', operator: 'contains', value: 'Corporate' }
      ],
      isSystem: false
    },
    {
      id: 'lunch_crowd',
      name: 'Lunch Regulars',
      description: 'Customers who primarily order during lunch hours',
      icon: Clock,
      color: '#06b6d4',
      count: 112,
      percentChange: 7,
      totalRevenue: 15680,
      avgOrderValue: 18.90,
      rules: [
        { field: 'preferredOrderTime', operator: '=', value: 'lunch' }
      ],
      isSystem: false
    },
    {
      id: 'birthday_month',
      name: 'Birthday This Month',
      description: 'Customers with birthdays in the current month',
      icon: Gift,
      color: '#ec4899',
      count: 34,
      percentChange: 0,
      totalRevenue: 4230,
      avgOrderValue: 29.40,
      rules: [
        { field: 'birthdayMonth', operator: '=', value: 'current' }
      ],
      isSystem: false
    }
  ];

  const handleViewSegment = (segment) => {
    if (onViewSegment) {
      onViewSegment(segment);
    }
  };

  const handleEmailSegment = (segment) => {
    console.log('Email segment:', segment.id);
  };

  const handleDeleteSegment = (segment) => {
    if (segment.isSystem) {
      alert('Cannot delete system segments');
      return;
    }
    console.log('Delete segment:', segment.id);
  };

  const totalCustomers = segments.reduce((sum, s) => sum + s.count, 0);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.title}>Customer Segments</h2>
          <span style={styles.subtitle}>
            {segments.length} segments • {totalCustomers} total customers
          </span>
        </div>
        <button 
          style={styles.createButton}
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={16} />
          Create Segment
        </button>
      </div>

      {/* AI Suggestion */}
      <div style={styles.aiSuggestion}>
        <div style={styles.aiIcon}>
          <Zap size={20} />
        </div>
        <div style={styles.aiContent}>
          <h4 style={styles.aiTitle}>AI Insight</h4>
          <p style={styles.aiText}>
            89 customers haven't ordered in 45+ days. Send a win-back campaign to recover 
            an estimated $2,400 in potential revenue.
          </p>
        </div>
        <button style={styles.aiAction}>
          Create Campaign
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Segments Grid */}
      <div style={styles.segmentsGrid}>
        {segments.map(segment => {
          const Icon = segment.icon;
          const isPositive = segment.percentChange >= 0;

          return (
            <div key={segment.id} style={styles.segmentCard}>
              <div style={styles.segmentHeader}>
                <div style={{
                  ...styles.segmentIcon,
                  backgroundColor: `${segment.color}20`,
                  color: segment.color
                }}>
                  <Icon size={20} />
                </div>
                <div style={styles.segmentInfo}>
                  <h3 style={styles.segmentName}>{segment.name}</h3>
                  <p style={styles.segmentDescription}>{segment.description}</p>
                </div>
                <div style={styles.segmentMenu}>
                  <button 
                    style={styles.menuButton}
                    onClick={() => setShowActionMenu(showActionMenu === segment.id ? null : segment.id)}
                  >
                    <MoreVertical size={16} />
                  </button>
                  {showActionMenu === segment.id && (
                    <div style={styles.actionMenu}>
                      <button 
                        style={styles.actionMenuItem}
                        onClick={() => handleViewSegment(segment)}
                      >
                        <Eye size={14} /> View Customers
                      </button>
                      <button 
                        style={styles.actionMenuItem}
                        onClick={() => handleEmailSegment(segment)}
                      >
                        <Mail size={14} /> Email Segment
                      </button>
                      <button style={styles.actionMenuItem}>
                        <Gift size={14} /> Send Offer
                      </button>
                      {!segment.isSystem && (
                        <>
                          <div style={styles.actionMenuDivider} />
                          <button 
                            style={styles.actionMenuItem}
                            onClick={() => setEditingSegment(segment)}
                          >
                            <Edit2 size={14} /> Edit Rules
                          </button>
                          <button 
                            style={{ ...styles.actionMenuItem, color: '#ef4444' }}
                            onClick={() => handleDeleteSegment(segment)}
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.segmentStats}>
                <div style={styles.segmentMainStat}>
                  <span style={styles.segmentCount}>{segment.count}</span>
                  <span style={styles.segmentCountLabel}>customers</span>
                  <span style={{
                    ...styles.percentChange,
                    color: isPositive ? '#22c55e' : '#ef4444'
                  }}>
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {isPositive ? '+' : ''}{segment.percentChange}%
                  </span>
                </div>

                <div style={styles.segmentMetrics}>
                  <div style={styles.segmentMetric}>
                    <DollarSign size={14} />
                    <span>${(segment.totalRevenue / 1000).toFixed(1)}k revenue</span>
                  </div>
                  <div style={styles.segmentMetric}>
                    <ShoppingBag size={14} />
                    <span>${segment.avgOrderValue.toFixed(2)} avg</span>
                  </div>
                </div>
              </div>

              <div style={styles.segmentActions}>
                <button 
                  style={styles.viewButton}
                  onClick={() => handleViewSegment(segment)}
                >
                  <Eye size={14} />
                  View
                </button>
                <button 
                  style={styles.emailButton}
                  onClick={() => handleEmailSegment(segment)}
                >
                  <Mail size={14} />
                  Email
                </button>
              </div>

              {segment.isSystem && (
                <div style={styles.systemBadge}>
                  <Settings size={10} />
                  System
                </div>
              )}
            </div>
          );
        })}

        {/* Create New Segment Card */}
        <div 
          style={styles.createCard}
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={32} />
          <span>Create Custom Segment</span>
          <p>Define rules to group customers</p>
        </div>
      </div>

      {/* Segment Performance Summary */}
      <div style={styles.performanceSection}>
        <h3 style={styles.performanceTitle}>Segment Performance</h3>
        <div style={styles.performanceGrid}>
          <div style={styles.performanceCard}>
            <div style={styles.performanceHeader}>
              <span style={styles.performanceLabel}>Highest Value</span>
              <Star size={16} color="#f59e0b" />
            </div>
            <span style={styles.performanceValue}>VIP Customers</span>
            <span style={styles.performanceStat}>$42.50 avg order</span>
          </div>
          <div style={styles.performanceCard}>
            <div style={styles.performanceHeader}>
              <span style={styles.performanceLabel}>Fastest Growing</span>
              <TrendingUp size={16} color="#22c55e" />
            </div>
            <span style={styles.performanceValue}>New Customers</span>
            <span style={styles.performanceStat}>+23% this month</span>
          </div>
          <div style={styles.performanceCard}>
            <div style={styles.performanceHeader}>
              <span style={styles.performanceLabel}>Needs Attention</span>
              <AlertCircle size={16} color="#f97316" />
            </div>
            <span style={styles.performanceValue}>At Risk</span>
            <span style={styles.performanceStat}>89 customers at risk</span>
          </div>
          <div style={styles.performanceCard}>
            <div style={styles.performanceHeader}>
              <span style={styles.performanceLabel}>Win-Back Opportunity</span>
              <Gift size={16} color="#8b5cf6" />
            </div>
            <span style={styles.performanceValue}>Churned</span>
            <span style={styles.performanceStat}>$8,920 potential</span>
          </div>
        </div>
      </div>
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
    alignItems: 'flex-start'
  },
  headerLeft: {},
  title: {
    fontSize: '24px',
    fontWeight: 700,
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  createButton: {
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
  aiSuggestion: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '20px 24px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: '16px',
    border: '1px solid rgba(139, 92, 246, 0.2)'
  },
  aiIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: '#8b5cf6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff'
  },
  aiContent: {
    flex: 1
  },
  aiTitle: {
    fontSize: '14px',
    fontWeight: 600,
    margin: '0 0 4px 0',
    color: '#8b5cf6'
  },
  aiText: {
    fontSize: '14px',
    margin: 0,
    color: 'var(--color-text)'
  },
  aiAction: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: '#8b5cf6',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  segmentsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
  segmentCard: {
    position: 'relative',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  segmentHeader: {
    display: 'flex',
    gap: '16px'
  },
  segmentIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  segmentInfo: {
    flex: 1,
    minWidth: 0
  },
  segmentName: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 4px 0'
  },
  segmentDescription: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    margin: 0,
    lineHeight: 1.4
  },
  segmentMenu: {
    position: 'relative'
  },
  menuButton: {
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
    width: '180px',
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
  actionMenuDivider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '4px 0'
  },
  segmentStats: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  segmentMainStat: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    flexWrap: 'wrap'
  },
  segmentCount: {
    fontSize: '32px',
    fontWeight: 700
  },
  segmentCountLabel: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  percentChange: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    fontWeight: 600
  },
  segmentMetrics: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    textAlign: 'right'
  },
  segmentMetric: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    justifyContent: 'flex-end'
  },
  segmentActions: {
    display: 'flex',
    gap: '12px'
  },
  viewButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  emailButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  systemBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    fontSize: '10px',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    fontWeight: 600
  },
  createCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '2px dashed var(--color-border)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: 'var(--color-text-muted)',
    minHeight: '240px'
  },
  performanceSection: {
    marginTop: '16px'
  },
  performanceTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: '0 0 16px 0'
  },
  performanceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px'
  },
  performanceCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    padding: '20px'
  },
  performanceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  performanceLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    fontWeight: 500
  },
  performanceValue: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '4px'
  },
  performanceStat: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  }
};

export default CustomerSegments;