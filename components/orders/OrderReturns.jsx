/**
 * OrderReturns
 * 
 * Returns and refunds management:
 * - Return requests queue
 * - RMA processing
 * - Refund management
 * - Return reasons analytics
 * - Restocking workflow
 * - Customer communication
 */

import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  Search,
  Filter,
  Package,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Calendar,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Mail,
  MessageSquare,
  Camera,
  Image,
  FileText,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Check,
  X,
  Truck,
  Box,
  CreditCard,
  Banknote,
  BarChart3,
  PieChart,
  Download,
  Printer,
  Send,
  ThumbsUp,
  ThumbsDown,
  ShoppingBag,
  Tag,
  AlertCircle
} from 'lucide-react';

export function OrderReturns() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [returns, setReturns] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        pendingReturns: 8,
        awaitingItems: 5,
        processedToday: 12,
        refundedAmount: 1845.50,
        returnRate: 3.2,
        returnRateChange: -0.4,
        avgProcessingTime: '1.8 days',
        topReasons: [
          { reason: 'Wrong size/fit', count: 34, percent: 28 },
          { reason: 'Not as described', count: 29, percent: 24 },
          { reason: 'Defective/Damaged', count: 22, percent: 18 },
          { reason: 'Changed mind', count: 18, percent: 15 },
          { reason: 'Other', count: 18, percent: 15 }
        ]
      });

      setReturns([
        {
          id: 'RMA-2024-001',
          orderId: 'ORD-2024-089',
          customer: { name: 'John Smith', email: 'john@example.com' },
          items: [
            { id: 1, name: 'Premium Card Binder - Blue', sku: 'PCB-BLU', qty: 1, price: 49.99, reason: 'Defective zipper' }
          ],
          status: 'pending',
          requestDate: '2024-01-15T10:30:00',
          reason: 'Defective/Damaged',
          customerNote: 'The zipper broke after first use. Would like a replacement or refund.',
          hasPhotos: true,
          photoCount: 2,
          refundAmount: 49.99,
          refundMethod: 'original',
          priority: 'high'
        },
        {
          id: 'RMA-2024-002',
          orderId: 'ORD-2024-076',
          customer: { name: 'Sarah Johnson', email: 'sarah@example.com' },
          items: [
            { id: 2, name: 'Card Sleeves 100-Pack', sku: 'CS-100', qty: 3, price: 8.99, reason: 'Wrong item received' },
            { id: 3, name: 'Top Loaders 25-Pack', sku: 'TL-025', qty: 2, price: 12.99, reason: 'Wrong item received' }
          ],
          status: 'pending',
          requestDate: '2024-01-15T09:15:00',
          reason: 'Wrong item sent',
          customerNote: 'Received penny sleeves instead of standard sleeves, and regular top loaders instead of thick.',
          hasPhotos: true,
          photoCount: 3,
          refundAmount: 52.95,
          refundMethod: 'original',
          priority: 'normal'
        },
        {
          id: 'RMA-2024-003',
          orderId: 'ORD-2024-065',
          customer: { name: 'Mike Davis', email: 'mike@example.com' },
          items: [
            { id: 4, name: 'Graded Card Display Case', sku: 'GCDC-001', qty: 1, price: 89.99, reason: 'Changed mind' }
          ],
          status: 'approved',
          requestDate: '2024-01-14T16:00:00',
          approvedDate: '2024-01-15T08:30:00',
          reason: 'Changed mind',
          customerNote: 'Decided to go with a different display solution.',
          hasPhotos: false,
          photoCount: 0,
          refundAmount: 74.99,
          restockingFee: 15.00,
          refundMethod: 'original',
          returnLabel: 'USPS-9400111899223456789012',
          priority: 'normal'
        },
        {
          id: 'RMA-2024-004',
          orderId: 'ORD-2024-058',
          customer: { name: 'Emily Brown', email: 'emily@example.com' },
          items: [
            { id: 5, name: 'UV Protected Frame - Large', sku: 'UVF-LG', qty: 1, price: 129.99, reason: 'Damaged in shipping' }
          ],
          status: 'awaiting_return',
          requestDate: '2024-01-13T11:20:00',
          approvedDate: '2024-01-13T14:00:00',
          reason: 'Damaged in shipping',
          customerNote: 'Glass was cracked when package arrived. Box was clearly mishandled.',
          hasPhotos: true,
          photoCount: 4,
          refundAmount: 129.99,
          refundMethod: 'original',
          returnLabel: 'UPS-1Z999AA10123456784',
          trackingStatus: 'In Transit',
          expectedArrival: '2024-01-17',
          priority: 'high'
        },
        {
          id: 'RMA-2024-005',
          orderId: 'ORD-2024-042',
          customer: { name: 'David Wilson', email: 'david@example.com' },
          items: [
            { id: 6, name: 'Card Storage Box 3200ct', sku: 'CSB-3200', qty: 2, price: 24.99, reason: 'Not as described' }
          ],
          status: 'received',
          requestDate: '2024-01-12T09:45:00',
          approvedDate: '2024-01-12T11:00:00',
          receivedDate: '2024-01-15T10:00:00',
          reason: 'Not as described',
          customerNote: 'Box dimensions are smaller than listed on website.',
          hasPhotos: true,
          photoCount: 2,
          refundAmount: 49.98,
          refundMethod: 'original',
          inspectionStatus: 'pending',
          priority: 'normal'
        },
        {
          id: 'RMA-2024-006',
          orderId: 'ORD-2024-031',
          customer: { name: 'Lisa Anderson', email: 'lisa@example.com' },
          items: [
            { id: 7, name: 'Magnetic Card Holder 5-Pack', sku: 'MCH-005', qty: 1, price: 34.99, reason: 'Defective' }
          ],
          status: 'refunded',
          requestDate: '2024-01-10T14:30:00',
          approvedDate: '2024-01-10T15:00:00',
          receivedDate: '2024-01-13T09:00:00',
          refundedDate: '2024-01-13T11:30:00',
          reason: 'Defective/Damaged',
          customerNote: 'Magnets are too weak, cards keep falling out.',
          hasPhotos: true,
          photoCount: 1,
          refundAmount: 34.99,
          refundMethod: 'original',
          refundTransactionId: 'REF-789456123',
          priority: 'normal'
        },
        {
          id: 'RMA-2024-007',
          orderId: 'ORD-2024-025',
          customer: { name: 'Robert Taylor', email: 'robert@example.com' },
          items: [
            { id: 8, name: 'Pro Binder 12-Pocket', sku: 'PB12-001', qty: 1, price: 29.99, reason: 'Wrong color' }
          ],
          status: 'rejected',
          requestDate: '2024-01-09T16:00:00',
          rejectedDate: '2024-01-10T09:00:00',
          reason: 'Wrong item received',
          customerNote: 'Ordered blue, received black.',
          hasPhotos: true,
          photoCount: 1,
          rejectionReason: 'Item matches order - customer selected black in original order',
          priority: 'low'
        },
        {
          id: 'RMA-2024-008',
          orderId: 'ORD-2024-098',
          customer: { name: 'Jennifer Martinez', email: 'jennifer@example.com' },
          items: [
            { id: 9, name: 'Starter Kit Bundle', sku: 'SKB-001', qty: 1, price: 79.99, reason: 'Missing items' }
          ],
          status: 'pending',
          requestDate: '2024-01-15T13:45:00',
          reason: 'Missing items',
          customerNote: 'Bundle was supposed to include sleeves and top loaders but only received the binder.',
          hasPhotos: true,
          photoCount: 2,
          refundAmount: 79.99,
          refundMethod: 'partial',
          priority: 'high'
        }
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316', label: 'Pending Review', icon: <Clock size={12} /> };
      case 'approved':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', label: 'Approved', icon: <Check size={12} /> };
      case 'awaiting_return':
        return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', label: 'Awaiting Return', icon: <Truck size={12} /> };
      case 'received':
        return { bg: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6', label: 'Received', icon: <Box size={12} /> };
      case 'refunded':
        return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', label: 'Refunded', icon: <CheckCircle size={12} /> };
      case 'rejected':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', label: 'Rejected', icon: <XCircle size={12} /> };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', label: status, icon: null };
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      case 'normal':
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' };
      case 'low':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' };
    }
  };

  const getReasonIcon = (reason) => {
    switch (reason) {
      case 'Defective/Damaged':
        return <AlertTriangle size={14} color="#ef4444" />;
      case 'Wrong item sent':
        return <Package size={14} color="#f97316" />;
      case 'Not as described':
        return <FileText size={14} color="#8b5cf6" />;
      case 'Changed mind':
        return <RefreshCw size={14} color="#3b82f6" />;
      case 'Damaged in shipping':
        return <Truck size={14} color="#ef4444" />;
      case 'Missing items':
        return <Box size={14} color="#f97316" />;
      default:
        return <RotateCcw size={14} color="#6b7280" />;
    }
  };

  const filteredReturns = returns.filter(ret => {
    const matchesSearch = ret.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.customer.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && ret.status === 'pending';
    if (activeTab === 'in_progress') return matchesSearch && ['approved', 'awaiting_return', 'received'].includes(ret.status);
    if (activeTab === 'completed') return matchesSearch && ['refunded', 'rejected'].includes(ret.status);
    return matchesSearch;
  });

  const tabCounts = {
    all: returns.length,
    pending: returns.filter(r => r.status === 'pending').length,
    in_progress: returns.filter(r => ['approved', 'awaiting_return', 'received'].includes(r.status)).length,
    completed: returns.filter(r => ['refunded', 'rejected'].includes(r.status)).length
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <RotateCcw size={48} style={{ opacity: 0.5 }} />
        <p>Loading returns...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Returns & Refunds</h1>
          <p style={styles.subtitle}>Manage return requests and process refunds</p>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.secondaryBtn}>
            <Download size={16} />
            Export
          </button>
          <button style={styles.secondaryBtn}>
            <BarChart3 size={16} />
            Analytics
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(249, 115, 22, 0.1)'}}>
            <Clock size={20} color="#f97316" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.pendingReturns}</span>
            <span style={styles.statLabel}>Pending Review</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)'}}>
            <Truck size={20} color="#8b5cf6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.awaitingItems}</span>
            <span style={styles.statLabel}>Awaiting Items</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
            <CheckCircle size={20} color="#22c55e" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.processedToday}</span>
            <span style={styles.statLabel}>Processed Today</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
            <DollarSign size={20} color="#3b82f6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{formatCurrency(stats.refundedAmount)}</span>
            <span style={styles.statLabel}>Refunded Today</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
            <TrendingDown size={20} color="#22c55e" />
          </div>
          <div style={styles.statInfo}>
            <div style={styles.statValueRow}>
              <span style={styles.statValue}>{stats.returnRate}%</span>
              <span style={{...styles.statChange, color: '#22c55e'}}>
                {stats.returnRateChange}%
              </span>
            </div>
            <span style={styles.statLabel}>Return Rate</span>
          </div>
        </div>
      </div>

      {/* Return Reasons Chart */}
      <div style={styles.reasonsSection}>
        <h3 style={styles.sectionTitle}>Top Return Reasons (Last 30 Days)</h3>
        <div style={styles.reasonsChart}>
          {stats.topReasons.map((reason, index) => (
            <div key={index} style={styles.reasonRow}>
              <span style={styles.reasonLabel}>{reason.reason}</span>
              <div style={styles.reasonBarContainer}>
                <div
                  style={{
                    ...styles.reasonBar,
                    width: `${reason.percent}%`,
                    backgroundColor: index === 0 ? '#ef4444' :
                      index === 1 ? '#f97316' :
                      index === 2 ? '#eab308' :
                      index === 3 ? '#3b82f6' : '#6b7280'
                  }}
                />
              </div>
              <span style={styles.reasonCount}>{reason.count}</span>
              <span style={styles.reasonPercent}>{reason.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {[
          { id: 'pending', label: 'Pending Review' },
          { id: 'in_progress', label: 'In Progress' },
          { id: 'completed', label: 'Completed' },
          { id: 'all', label: 'All Returns' }
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

      {/* Search */}
      <div style={styles.toolbar}>
        <div style={styles.searchBox}>
          <Search size={18} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search by RMA, order, or customer..."
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

      {/* Returns List */}
      <div style={styles.returnsList}>
        {filteredReturns.map((ret) => {
          const statusStyle = getStatusStyle(ret.status);
          const priorityStyle = getPriorityStyle(ret.priority);

          return (
            <div key={ret.id} style={styles.returnCard}>
              <div style={styles.returnHeader}>
                <div style={styles.returnHeaderLeft}>
                  <span style={styles.rmaId}>{ret.id}</span>
                  <span style={styles.orderLink}>
                    <ShoppingBag size={12} />
                    {ret.orderId}
                  </span>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.color
                  }}>
                    {statusStyle.icon}
                    {statusStyle.label}
                  </span>
                  {ret.priority === 'high' && (
                    <span style={{
                      ...styles.priorityBadge,
                      backgroundColor: priorityStyle.bg,
                      color: priorityStyle.color
                    }}>
                      High Priority
                    </span>
                  )}
                </div>
                <div style={styles.returnHeaderRight}>
                  <span style={styles.requestDate}>
                    <Calendar size={12} />
                    {formatDateTime(ret.requestDate)}
                  </span>
                  <button style={styles.iconBtn}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              <div style={styles.returnBody}>
                <div style={styles.returnMain}>
                  {/* Customer */}
                  <div style={styles.customerSection}>
                    <div style={styles.customerAvatar}>
                      {ret.customer.name.charAt(0)}
                    </div>
                    <div style={styles.customerInfo}>
                      <span style={styles.customerName}>{ret.customer.name}</span>
                      <span style={styles.customerEmail}>{ret.customer.email}</span>
                    </div>
                  </div>

                  {/* Reason */}
                  <div style={styles.reasonSection}>
                    <div style={styles.reasonHeader}>
                      {getReasonIcon(ret.reason)}
                      <span style={styles.reasonTitle}>{ret.reason}</span>
                    </div>
                    <p style={styles.customerNote}>{ret.customerNote}</p>
                    {ret.hasPhotos && (
                      <div style={styles.photosIndicator}>
                        <Camera size={12} />
                        {ret.photoCount} photo{ret.photoCount !== 1 ? 's' : ''} attached
                      </div>
                    )}
                  </div>

                  {/* Items */}
                  <div style={styles.itemsSection}>
                    <span style={styles.itemsSectionTitle}>Items to Return</span>
                    {ret.items.map((item) => (
                      <div key={item.id} style={styles.itemRow}>
                        <span style={styles.itemQty}>×{item.qty}</span>
                        <span style={styles.itemName}>{item.name}</span>
                        <span style={styles.itemSku}>{item.sku}</span>
                        <span style={styles.itemPrice}>{formatCurrency(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar Info */}
                <div style={styles.returnSidebar}>
                  <div style={styles.refundBox}>
                    <span style={styles.refundLabel}>Refund Amount</span>
                    <span style={styles.refundAmount}>{formatCurrency(ret.refundAmount)}</span>
                    {ret.restockingFee && (
                      <span style={styles.restockingFee}>
                        -{formatCurrency(ret.restockingFee)} restocking fee
                      </span>
                    )}
                    <span style={styles.refundMethod}>
                      <CreditCard size={12} />
                      {ret.refundMethod === 'original' ? 'Original payment method' : 'Store credit'}
                    </span>
                  </div>

                  {ret.returnLabel && (
                    <div style={styles.trackingBox}>
                      <span style={styles.trackingLabel}>Return Label</span>
                      <span style={styles.trackingNumber}>{ret.returnLabel}</span>
                      {ret.trackingStatus && (
                        <span style={styles.trackingStatus}>
                          <Truck size={12} />
                          {ret.trackingStatus}
                        </span>
                      )}
                    </div>
                  )}

                  {ret.rejectionReason && (
                    <div style={styles.rejectionBox}>
                      <AlertCircle size={14} />
                      <span>{ret.rejectionReason}</span>
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.returnFooter}>
                <div style={styles.returnTimeline}>
                  {ret.approvedDate && (
                    <span style={styles.timelineItem}>
                      <Check size={10} color="#22c55e" />
                      Approved {formatDate(ret.approvedDate)}
                    </span>
                  )}
                  {ret.receivedDate && (
                    <span style={styles.timelineItem}>
                      <Box size={10} color="#8b5cf6" />
                      Received {formatDate(ret.receivedDate)}
                    </span>
                  )}
                  {ret.refundedDate && (
                    <span style={styles.timelineItem}>
                      <DollarSign size={10} color="#22c55e" />
                      Refunded {formatDate(ret.refundedDate)}
                    </span>
                  )}
                </div>
                <div style={styles.returnActions}>
                  <button style={styles.secondarySmBtn}>
                    <Mail size={14} />
                    Contact
                  </button>
                  <button style={styles.secondarySmBtn}>
                    <Eye size={14} />
                    View Details
                  </button>
                  {ret.status === 'pending' && (
                    <>
                      <button style={{...styles.actionBtn, color: '#ef4444'}}>
                        <XCircle size={14} />
                        Reject
                      </button>
                      <button style={styles.primarySmBtn}>
                        <CheckCircle size={14} />
                        Approve
                      </button>
                    </>
                  )}
                  {ret.status === 'received' && (
                    <button style={styles.primarySmBtn}>
                      <DollarSign size={14} />
                      Process Refund
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredReturns.length === 0 && (
          <div style={styles.emptyState}>
            <RotateCcw size={48} color="var(--color-text-muted)" />
            <h3>No returns found</h3>
            <p>No return requests match your current filters</p>
          </div>
        )}
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '18px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '14px',
    border: '1px solid var(--color-border)'
  },
  statIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  statValue: {
    fontSize: '22px',
    fontWeight: 700
  },
  statValueRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px'
  },
  statChange: {
    fontSize: '12px',
    fontWeight: 600
  },
  statLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  reasonsSection: {
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    margin: '0 0 16px 0'
  },
  reasonsChart: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  reasonRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  reasonLabel: {
    width: '140px',
    fontSize: '13px',
    flexShrink: 0
  },
  reasonBarContainer: {
    flex: 1,
    height: '8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  reasonBar: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  reasonCount: {
    width: '30px',
    fontSize: '13px',
    fontWeight: 600,
    textAlign: 'right'
  },
  reasonPercent: {
    width: '40px',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textAlign: 'right'
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    marginBottom: '20px'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '10px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  tabActive: {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)'
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
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  returnsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  returnCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  returnHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: 'var(--color-surface-2)',
    borderBottom: '1px solid var(--color-border)'
  },
  returnHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  returnHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  rmaId: {
    fontWeight: 700,
    color: 'var(--color-primary)'
  },
  orderLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 10px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 600
  },
  priorityBadge: {
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600
  },
  requestDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  iconBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  returnBody: {
    display: 'flex',
    gap: '24px',
    padding: '20px'
  },
  returnMain: {
    flex: 1
  },
  customerSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px'
  },
  customerAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-primary)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 600
  },
  customerInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  customerName: {
    fontWeight: 600,
    marginBottom: '2px'
  },
  customerEmail: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  reasonSection: {
    marginBottom: '20px'
  },
  reasonHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px'
  },
  reasonTitle: {
    fontWeight: 600
  },
  customerNote: {
    fontSize: '14px',
    color: 'var(--color-text)',
    lineHeight: 1.5,
    margin: '0 0 12px 0',
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    borderLeft: '3px solid var(--color-border)'
  },
  photosIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: '#3b82f6',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500
  },
  itemsSection: {
    marginTop: '16px'
  },
  itemsSectionTitle: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    marginBottom: '10px',
    textTransform: 'uppercase'
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    fontSize: '13px',
    marginBottom: '8px'
  },
  itemQty: {
    fontWeight: 600,
    color: 'var(--color-primary)',
    minWidth: '30px'
  },
  itemName: {
    flex: 1
  },
  itemSku: {
    color: 'var(--color-text-muted)',
    fontSize: '12px'
  },
  itemPrice: {
    fontWeight: 600
  },
  returnSidebar: {
    width: '220px',
    flexShrink: 0
  },
  refundBox: {
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px',
    marginBottom: '12px'
  },
  refundLabel: {
    display: 'block',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginBottom: '4px',
    textTransform: 'uppercase'
  },
  refundAmount: {
    display: 'block',
    fontSize: '24px',
    fontWeight: 700,
    color: '#22c55e',
    marginBottom: '8px'
  },
  restockingFee: {
    display: 'block',
    fontSize: '12px',
    color: '#ef4444',
    marginBottom: '8px'
  },
  refundMethod: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  trackingBox: {
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px',
    marginBottom: '12px'
  },
  trackingLabel: {
    display: 'block',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginBottom: '4px',
    textTransform: 'uppercase'
  },
  trackingNumber: {
    display: 'block',
    fontSize: '12px',
    fontFamily: 'monospace',
    color: 'var(--color-text)',
    marginBottom: '8px',
    wordBreak: 'break-all'
  },
  trackingStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#8b5cf6'
  },
  rejectionBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '12px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#ef4444'
  },
  returnFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    borderTop: '1px solid var(--color-border)'
  },
  returnTimeline: {
    display: 'flex',
    gap: '16px'
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  returnActions: {
    display: 'flex',
    gap: '8px'
  },
  secondarySmBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    fontSize: '13px',
    cursor: 'pointer'
  },
  primarySmBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    gap: '16px',
    textAlign: 'center'
  }
};

export default OrderReturns;