/**
 * CustomerDetail
 * 
 * Complete customer profile view.
 * - Personal info and contact
 * - Order history
 * - Spending analytics
 * - Loyalty points
 * - Tags and segments
 * - Notes and communication history
 * - Quick actions
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Heart,
  Tag,
  MessageSquare,
  Edit2,
  MoreHorizontal,
  Gift,
  Clock,
  ChevronRight,
  Send,
  Plus,
  X,
  Award,
  Repeat,
  CreditCard,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

export function CustomerDetail() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [newNote, setNewNote] = useState('');
  const [newTag, setNewTag] = useState('');
  const [showAddTag, setShowAddTag] = useState(false);

  // Mock customer data
  useEffect(() => {
    setTimeout(() => {
      setCustomer({
        id: customerId || 'CUS-001',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '(555) 123-4567',
        avatar: null,
        segment: 'vip',
        tags: ['Corporate', 'Catering', 'Lunch Regular'],
        
        // Contact Info
        address: {
          street: '123 Main Street',
          apt: 'Suite 400',
          city: 'Dallas',
          state: 'TX',
          zip: '75201'
        },
        birthday: new Date('1985-06-15'),
        
        // Stats
        totalOrders: 47,
        totalSpent: 1245.80,
        avgOrderValue: 26.51,
        lastOrderDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        firstOrderDate: new Date('2023-03-15'),
        
        // Loyalty
        loyaltyPoints: 2450,
        loyaltyTier: 'Gold',
        pointsToNextTier: 550,
        lifetimePoints: 3200,
        
        // Preferences
        preferences: {
          favoriteItems: ['Classic Burger', 'Loaded Fries', 'Iced Tea'],
          dietaryRestrictions: ['No onions'],
          seatingPreference: 'Window booth',
          communicationPreference: 'Email'
        },
        
        // Recent Orders
        recentOrders: [
          {
            id: 'ORD-2024-001',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
            total: 37.86,
            items: 4,
            status: 'completed'
          },
          {
            id: 'ORD-2024-002',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
            total: 52.40,
            items: 6,
            status: 'completed'
          },
          {
            id: 'ORD-2024-003',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
            total: 28.90,
            items: 3,
            status: 'completed'
          },
          {
            id: 'ORD-2024-004',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 22),
            total: 45.20,
            items: 5,
            status: 'completed'
          },
          {
            id: 'ORD-2024-005',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
            total: 31.15,
            items: 4,
            status: 'completed'
          }
        ],
        
        // Spending by Month
        spendingHistory: [
          { month: 'Jul', amount: 145 },
          { month: 'Aug', amount: 178 },
          { month: 'Sep', amount: 156 },
          { month: 'Oct', amount: 198 },
          { month: 'Nov', amount: 165 },
          { month: 'Dec', amount: 210 }
        ],
        
        // Notes
        notes: [
          { id: 1, author: 'Sarah', message: 'VIP customer - always prioritize orders', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) },
          { id: 2, author: 'Mike', message: 'Prefers booth seating near window', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15) },
          { id: 3, author: 'System', message: 'Upgraded to Gold loyalty tier', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) }
        ],
        
        // Activity Timeline
        activity: [
          { type: 'order', message: 'Placed order #ORD-2024-001', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
          { type: 'loyalty', message: 'Earned 75 loyalty points', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) },
          { type: 'review', message: 'Left a 5-star review', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) },
          { type: 'order', message: 'Placed order #ORD-2024-002', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8) },
          { type: 'reward', message: 'Redeemed "Free Dessert" reward', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10) }
        ],
        
        createdAt: new Date('2023-03-15'),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
      });
      setLoading(false);
    }, 500);
  }, [customerId]);

  const getSegmentConfig = (segment) => {
    switch (segment) {
      case 'vip':
        return { label: 'VIP', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' };
      case 'regular':
        return { label: 'Regular', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' };
      case 'new':
        return { label: 'New', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' };
      case 'at_risk':
        return { label: 'At Risk', color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)' };
      default:
        return { label: segment, color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' };
    }
  };

  const getTierConfig = (tier) => {
    switch (tier) {
      case 'Gold':
        return { color: '#f59e0b', bg: 'linear-gradient(135deg, #f59e0b, #d97706)' };
      case 'Silver':
        return { color: '#9ca3af', bg: 'linear-gradient(135deg, #9ca3af, #6b7280)' };
      case 'Platinum':
        return { color: '#a855f7', bg: 'linear-gradient(135deg, #a855f7, #7c3aed)' };
      default:
        return { color: '#6b7280', bg: 'var(--color-surface-2)' };
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setCustomer(prev => ({
      ...prev,
      notes: [
        { id: Date.now(), author: 'You', message: newNote, timestamp: new Date() },
        ...prev.notes
      ]
    }));
    setNewNote('');
  };

  const handleAddTag = () => {
    if (!newTag.trim() || customer.tags.includes(newTag)) return;
    setCustomer(prev => ({
      ...prev,
      tags: [...prev.tags, newTag]
    }));
    setNewTag('');
    setShowAddTag(false);
  };

  const handleRemoveTag = (tag) => {
    setCustomer(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner} />
        <p>Loading customer...</p>
      </div>
    );
  }

  if (!customer) {
    return (
      <div style={styles.errorContainer}>
        <AlertCircle size={48} />
        <h2>Customer not found</h2>
        <button onClick={() => navigate('/customers')}>Back to Customers</button>
      </div>
    );
  }

  const segmentConfig = getSegmentConfig(customer.segment);
  const tierConfig = getTierConfig(customer.loyaltyTier);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Orders' },
    { id: 'loyalty', label: 'Loyalty' },
    { id: 'activity', label: 'Activity' }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backButton} onClick={() => navigate('/customers')}>
            <ArrowLeft size={20} />
          </button>
          <div style={styles.customerHeader}>
            <div style={styles.avatar}>
              {customer.name.charAt(0)}
            </div>
            <div style={styles.customerHeaderInfo}>
              <div style={styles.nameRow}>
                <h1 style={styles.customerName}>{customer.name}</h1>
                <span style={{
                  ...styles.segmentBadge,
                  backgroundColor: segmentConfig.bg,
                  color: segmentConfig.color
                }}>
                  <Star size={12} />
                  {segmentConfig.label}
                </span>
              </div>
              <div style={styles.customerMeta}>
                <span><Mail size={14} /> {customer.email}</span>
                <span><Phone size={14} /> {customer.phone}</span>
                <span><Calendar size={14} /> Customer since {formatDate(customer.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.actionBtn}>
            <Mail size={16} />
            Email
          </button>
          <button style={styles.actionBtn}>
            <Gift size={16} />
            Send Reward
          </button>
          <button style={styles.actionBtnPrimary}>
            <Edit2 size={16} />
            Edit Customer
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <ShoppingBag size={20} color="#3b82f6" />
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{customer.totalOrders}</span>
            <span style={styles.statLabel}>Total Orders</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <DollarSign size={20} color="#22c55e" />
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{formatCurrency(customer.totalSpent)}</span>
            <span style={styles.statLabel}>Total Spent</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <TrendingUp size={20} color="#8b5cf6" />
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{formatCurrency(customer.avgOrderValue)}</span>
            <span style={styles.statLabel}>Avg Order</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <Star size={20} color="#f59e0b" />
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{customer.loyaltyPoints.toLocaleString()}</span>
            <span style={styles.statLabel}>Loyalty Points</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.tabActive : {})
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          {activeTab === 'overview' && (
            <>
              {/* Loyalty Card */}
              <div style={styles.loyaltyCard}>
                <div style={{
                  ...styles.loyaltyCardHeader,
                  background: tierConfig.bg
                }}>
                  <div style={styles.loyaltyTier}>
                    <Award size={24} />
                    <span>{customer.loyaltyTier} Member</span>
                  </div>
                  <div style={styles.loyaltyPoints}>
                    <span style={styles.pointsValue}>{customer.loyaltyPoints.toLocaleString()}</span>
                    <span style={styles.pointsLabel}>points</span>
                  </div>
                </div>
                <div style={styles.loyaltyProgress}>
                  <div style={styles.progressInfo}>
                    <span>{customer.pointsToNextTier} points to next tier</span>
                    <span>Platinum</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div style={{
                      ...styles.progressFill,
                      width: `${((3000 - customer.pointsToNextTier) / 3000) * 100}%`
                    }} />
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Recent Orders</h3>
                  <button style={styles.viewAllBtn} onClick={() => setActiveTab('orders')}>
                    View All <ChevronRight size={14} />
                  </button>
                </div>
                <div style={styles.ordersList}>
                  {customer.recentOrders.slice(0, 5).map(order => (
                    <div 
                      key={order.id} 
                      style={styles.orderRow}
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      <div style={styles.orderInfo}>
                        <span style={styles.orderId}>{order.id}</span>
                        <span style={styles.orderDate}>{formatDate(order.date)}</span>
                      </div>
                      <div style={styles.orderDetails}>
                        <span style={styles.orderItems}>{order.items} items</span>
                        <span style={styles.orderTotal}>{formatCurrency(order.total)}</span>
                      </div>
                      <ChevronRight size={16} color="var(--color-text-muted)" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Spending Chart */}
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Spending History</h3>
                </div>
                <div style={styles.chartContainer}>
                  <div style={styles.barChart}>
                    {customer.spendingHistory.map((item, index) => (
                      <div key={index} style={styles.barGroup}>
                        <div style={styles.barWrapper}>
                          <div style={{
                            ...styles.bar,
                            height: `${(item.amount / 250) * 100}%`
                          }} />
                        </div>
                        <span style={styles.barLabel}>{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Order History</h3>
                <span style={styles.orderCount}>{customer.totalOrders} orders</span>
              </div>
              <div style={styles.ordersList}>
                {customer.recentOrders.map(order => (
                  <div 
                    key={order.id} 
                    style={styles.orderRowFull}
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    <div style={styles.orderStatus}>
                      <CheckCircle size={16} color="#22c55e" />
                    </div>
                    <div style={styles.orderInfo}>
                      <span style={styles.orderId}>{order.id}</span>
                      <span style={styles.orderDate}>{formatDate(order.date)}</span>
                    </div>
                    <div style={styles.orderDetails}>
                      <span style={styles.orderItems}>{order.items} items</span>
                    </div>
                    <span style={styles.orderTotalLarge}>{formatCurrency(order.total)}</span>
                    <ChevronRight size={16} color="var(--color-text-muted)" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'loyalty' && (
            <>
              <div style={styles.loyaltyCard}>
                <div style={{
                  ...styles.loyaltyCardHeader,
                  background: tierConfig.bg
                }}>
                  <div style={styles.loyaltyTier}>
                    <Award size={24} />
                    <span>{customer.loyaltyTier} Member</span>
                  </div>
                  <div style={styles.loyaltyPoints}>
                    <span style={styles.pointsValue}>{customer.loyaltyPoints.toLocaleString()}</span>
                    <span style={styles.pointsLabel}>points</span>
                  </div>
                </div>
                <div style={styles.loyaltyProgress}>
                  <div style={styles.progressInfo}>
                    <span>{customer.pointsToNextTier} points to Platinum</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div style={{
                      ...styles.progressFill,
                      width: `${((3000 - customer.pointsToNextTier) / 3000) * 100}%`
                    }} />
                  </div>
                </div>
              </div>

              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Loyalty Stats</h3>
                </div>
                <div style={styles.loyaltyStats}>
                  <div style={styles.loyaltyStat}>
                    <span style={styles.loyaltyStatValue}>{customer.lifetimePoints.toLocaleString()}</span>
                    <span style={styles.loyaltyStatLabel}>Lifetime Points Earned</span>
                  </div>
                  <div style={styles.loyaltyStat}>
                    <span style={styles.loyaltyStatValue}>{(customer.lifetimePoints - customer.loyaltyPoints).toLocaleString()}</span>
                    <span style={styles.loyaltyStatLabel}>Points Redeemed</span>
                  </div>
                  <div style={styles.loyaltyStat}>
                    <span style={styles.loyaltyStatValue}>3</span>
                    <span style={styles.loyaltyStatLabel}>Rewards Claimed</span>
                  </div>
                </div>
              </div>

              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Available Rewards</h3>
                </div>
                <div style={styles.rewardsList}>
                  <div style={styles.rewardItem}>
                    <Gift size={20} color="#22c55e" />
                    <div style={styles.rewardInfo}>
                      <span style={styles.rewardName}>Free Dessert</span>
                      <span style={styles.rewardCost}>500 points</span>
                    </div>
                    <button style={styles.redeemBtn}>Redeem</button>
                  </div>
                  <div style={styles.rewardItem}>
                    <Gift size={20} color="#3b82f6" />
                    <div style={styles.rewardInfo}>
                      <span style={styles.rewardName}>$10 Off Order</span>
                      <span style={styles.rewardCost}>1,000 points</span>
                    </div>
                    <button style={styles.redeemBtn}>Redeem</button>
                  </div>
                  <div style={styles.rewardItem}>
                    <Gift size={20} color="#8b5cf6" />
                    <div style={styles.rewardInfo}>
                      <span style={styles.rewardName}>Free Entree</span>
                      <span style={styles.rewardCost}>2,000 points</span>
                    </div>
                    <button style={styles.redeemBtn}>Redeem</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'activity' && (
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Activity Timeline</h3>
              </div>
              <div style={styles.activityTimeline}>
                {customer.activity.map((item, index) => (
                  <div key={index} style={styles.activityItem}>
                    <div style={styles.activityDot} />
                    {index < customer.activity.length - 1 && <div style={styles.activityLine} />}
                    <div style={styles.activityContent}>
                      <span style={styles.activityMessage}>{item.message}</span>
                      <span style={styles.activityTime}>{formatDate(item.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {/* Contact Info */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Contact Info</h3>
              <button style={styles.editBtn}><Edit2 size={14} /></button>
            </div>
            <div style={styles.contactList}>
              <div style={styles.contactItem}>
                <Mail size={16} />
                <a href={`mailto:${customer.email}`}>{customer.email}</a>
              </div>
              <div style={styles.contactItem}>
                <Phone size={16} />
                <a href={`tel:${customer.phone}`}>{customer.phone}</a>
              </div>
              {customer.address && (
                <div style={styles.contactItem}>
                  <MapPin size={16} />
                  <div style={styles.addressText}>
                    <span>{customer.address.street}</span>
                    {customer.address.apt && <span>{customer.address.apt}</span>}
                    <span>{customer.address.city}, {customer.address.state} {customer.address.zip}</span>
                  </div>
                </div>
              )}
              {customer.birthday && (
                <div style={styles.contactItem}>
                  <Gift size={16} />
                  <span>Birthday: {formatDate(customer.birthday)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Tags</h3>
              <button 
                style={styles.addTagBtn}
                onClick={() => setShowAddTag(true)}
              >
                <Plus size={14} />
              </button>
            </div>
            <div style={styles.tagsList}>
              {customer.tags.map(tag => (
                <span key={tag} style={styles.tag}>
                  {tag}
                  <button 
                    style={styles.removeTagBtn}
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {showAddTag && (
                <div style={styles.addTagInput}>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="New tag..."
                    style={styles.tagInput}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                    autoFocus
                  />
                  <button style={styles.tagSubmit} onClick={handleAddTag}>
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Preferences</h3>
            </div>
            <div style={styles.preferencesList}>
              <div style={styles.preferenceItem}>
                <span style={styles.preferenceLabel}>Favorite Items</span>
                <span style={styles.preferenceValue}>
                  {customer.preferences.favoriteItems.join(', ')}
                </span>
              </div>
              <div style={styles.preferenceItem}>
                <span style={styles.preferenceLabel}>Dietary</span>
                <span style={styles.preferenceValue}>
                  {customer.preferences.dietaryRestrictions.join(', ') || 'None'}
                </span>
              </div>
              <div style={styles.preferenceItem}>
                <span style={styles.preferenceLabel}>Seating</span>
                <span style={styles.preferenceValue}>
                  {customer.preferences.seatingPreference}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Notes</h3>
            </div>
            <div style={styles.notesList}>
              {customer.notes.map(note => (
                <div key={note.id} style={styles.noteItem}>
                  <div style={styles.noteHeader}>
                    <span style={styles.noteAuthor}>{note.author}</span>
                    <span style={styles.noteTime}>{formatDate(note.timestamp)}</span>
                  </div>
                  <p style={styles.noteMessage}>{note.message}</p>
                </div>
              ))}
            </div>
            <div style={styles.addNoteForm}>
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                style={styles.noteInput}
                onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
              />
              <button style={styles.noteSubmit} onClick={handleAddNote}>
                <Send size={16} />
              </button>
            </div>
          </div>
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
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid var(--color-border)',
    borderTopColor: 'var(--color-primary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    gap: '16px',
    color: 'var(--color-text-muted)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px'
  },
  backButton: {
    padding: '10px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    cursor: 'pointer'
  },
  customerHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: 600
  },
  customerHeaderInfo: {},
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '8px'
  },
  customerName: {
    fontSize: '28px',
    fontWeight: 700,
    margin: 0
  },
  segmentBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: 600
  },
  customerMeta: {
    display: 'flex',
    gap: '20px',
    color: 'var(--color-text-muted)',
    fontSize: '14px'
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
  actionBtnPrimary: {
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 700
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '16px'
  },
  tab: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  tabActive: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 360px',
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
    gap: '24px'
  },
  card: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid var(--color-border)'
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  viewAllBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  loyaltyCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  loyaltyCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    color: '#ffffff'
  },
  loyaltyTier: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '18px',
    fontWeight: 600
  },
  loyaltyPoints: {
    textAlign: 'right'
  },
  pointsValue: {
    display: 'block',
    fontSize: '32px',
    fontWeight: 700
  },
  pointsLabel: {
    fontSize: '14px',
    opacity: 0.9
  },
  loyaltyProgress: {
    padding: '20px 24px'
  },
  progressInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginBottom: '10px'
  },
  progressBar: {
    height: '8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '4px'
  },
  ordersList: {
    padding: '0'
  },
  orderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 24px',
    borderBottom: '1px solid var(--color-border)',
    cursor: 'pointer'
  },
  orderRowFull: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 24px',
    borderBottom: '1px solid var(--color-border)',
    cursor: 'pointer'
  },
  orderStatus: {},
  orderInfo: {
    flex: 1
  },
  orderId: {
    display: 'block',
    fontWeight: 600,
    color: 'var(--color-primary)'
  },
  orderDate: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  orderDetails: {
    textAlign: 'right'
  },
  orderItems: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  orderTotal: {
    display: 'block',
    fontWeight: 600
  },
  orderTotalLarge: {
    fontWeight: 700,
    fontSize: '16px'
  },
  orderCount: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  chartContainer: {
    padding: '24px'
  },
  barChart: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '150px',
    gap: '12px'
  },
  barGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    flex: 1
  },
  barWrapper: {
    width: '100%',
    height: '120px',
    display: 'flex',
    alignItems: 'flex-end'
  },
  bar: {
    width: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '4px 4px 0 0',
    transition: 'height 0.3s'
  },
  barLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  loyaltyStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    padding: '24px'
  },
  loyaltyStat: {
    textAlign: 'center'
  },
  loyaltyStatValue: {
    display: 'block',
    fontSize: '24px',
    fontWeight: 700
  },
  loyaltyStatLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  rewardsList: {
    padding: '16px 24px'
  },
  rewardItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  rewardInfo: {
    flex: 1
  },
  rewardName: {
    display: 'block',
    fontWeight: 500
  },
  rewardCost: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  redeemBtn: {
    padding: '8px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  activityTimeline: {
    padding: '24px'
  },
  activityItem: {
    position: 'relative',
    paddingLeft: '28px',
    paddingBottom: '24px'
  },
  activityDot: {
    position: 'absolute',
    left: 0,
    top: '4px',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-primary)'
  },
  activityLine: {
    position: 'absolute',
    left: '5px',
    top: '20px',
    width: '2px',
    height: 'calc(100% - 8px)',
    backgroundColor: 'var(--color-border)'
  },
  activityContent: {},
  activityMessage: {
    display: 'block',
    fontWeight: 500
  },
  activityTime: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  editBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  contactList: {
    padding: '20px 24px'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '10px 0',
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  addressText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  addTagBtn: {
    padding: '6px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    cursor: 'pointer'
  },
  tagsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    padding: '20px 24px'
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '16px',
    fontSize: '13px'
  },
  removeTagBtn: {
    padding: '2px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  addTagInput: {
    display: 'flex',
    gap: '8px'
  },
  tagInput: {
    padding: '6px 12px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '16px',
    color: 'var(--color-text)',
    fontSize: '13px',
    outline: 'none',
    width: '120px'
  },
  tagSubmit: {
    padding: '6px 10px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '16px',
    color: '#ffffff',
    cursor: 'pointer'
  },
  preferencesList: {
    padding: '20px 24px'
  },
  preferenceItem: {
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  preferenceLabel: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginBottom: '4px'
  },
  preferenceValue: {
    fontSize: '14px'
  },
  notesList: {
    padding: '16px 24px',
    maxHeight: '200px',
    overflowY: 'auto'
  },
  noteItem: {
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  noteHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px'
  },
  noteAuthor: {
    fontSize: '13px',
    fontWeight: 600
  },
  noteTime: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  noteMessage: {
    fontSize: '14px',
    margin: 0,
    color: 'var(--color-text-muted)'
  },
  addNoteForm: {
    display: 'flex',
    gap: '12px',
    padding: '16px 24px',
    borderTop: '1px solid var(--color-border)'
  },
  noteInput: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  noteSubmit: {
    padding: '12px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    cursor: 'pointer'
  }
};

export default CustomerDetail;