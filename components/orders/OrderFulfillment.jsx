/**
 * OrderFulfillment
 * 
 * Order fulfillment management:
 * - Fulfillment queue
 * - Pick, pack, ship workflow
 * - Batch processing
 * - Shipping label generation
 * - Carrier integration
 * - Tracking updates
 */

import React, { useState, useEffect } from 'react';
import {
  Package,
  Truck,
  Search,
  Filter,
  Check,
  X,
  Clock,
  AlertTriangle,
  CheckCircle,
  Box,
  Printer,
  QrCode,
  Barcode,
  MapPin,
  User,
  Calendar,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  RefreshCw,
  Download,
  Upload,
  Scan,
  Weight,
  Ruler,
  DollarSign,
  Tag,
  Layers,
  ArrowRight,
  Play,
  Pause,
  SkipForward,
  CheckSquare,
  Square,
  Mail,
  MessageSquare,
  ExternalLink,
  Settings,
  Zap
} from 'lucide-react';

export function OrderFulfillment() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('queue');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [fulfillmentQueue, setFulfillmentQueue] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [showShipModal, setShowShipModal] = useState(false);
  const [selectedForShipping, setSelectedForShipping] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        awaitingFulfillment: 12,
        inProgress: 5,
        shippedToday: 23,
        avgFulfillmentTime: '2.4 hrs'
      });

      setFulfillmentQueue([
        {
          id: 'ORD-2024-001',
          customer: { name: 'John Smith', address: '123 Main St, New York, NY 10001' },
          items: [
            { id: 1, name: 'Premium Sports Card Binder', sku: 'SCB-001', qty: 1, location: 'A1-01' },
            { id: 2, name: 'Card Sleeves (100 pack)', sku: 'CS-100', qty: 2, location: 'B2-15' },
            { id: 3, name: 'Top Loaders (25 pack)', sku: 'TL-025', qty: 1, location: 'B2-18' }
          ],
          priority: 'high',
          orderDate: '2024-01-15T08:30:00',
          dueDate: '2024-01-16T17:00:00',
          shippingMethod: 'express',
          notes: 'Handle with care - collector items'
        },
        {
          id: 'ORD-2024-002',
          customer: { name: 'Sarah Johnson', address: '456 Oak Ave, Los Angeles, CA 90001' },
          items: [
            { id: 4, name: 'Graded Card Display Case', sku: 'GCD-001', qty: 1, location: 'C3-22' }
          ],
          priority: 'normal',
          orderDate: '2024-01-15T09:15:00',
          dueDate: '2024-01-18T17:00:00',
          shippingMethod: 'standard',
          notes: null
        },
        {
          id: 'ORD-2024-003',
          customer: { name: 'Mike Davis', address: '789 Pine Rd, Chicago, IL 60601' },
          items: [
            { id: 5, name: 'Card Storage Box (3200ct)', sku: 'CSB-3200', qty: 2, location: 'D1-05' },
            { id: 6, name: 'Dividers Set', sku: 'DIV-50', qty: 1, location: 'D1-08' }
          ],
          priority: 'normal',
          orderDate: '2024-01-15T10:00:00',
          dueDate: '2024-01-19T17:00:00',
          shippingMethod: 'standard',
          notes: null
        },
        {
          id: 'ORD-2024-004',
          customer: { name: 'Emily Brown', address: '321 Elm St, Houston, TX 77001' },
          items: [
            { id: 7, name: 'UV Protected Display Frame', sku: 'UVF-001', qty: 1, location: 'E2-12' },
            { id: 8, name: 'Premium Card Sleeves (200 pack)', sku: 'PCS-200', qty: 3, location: 'B2-20' },
            { id: 9, name: 'Magnetic Holders (5 pack)', sku: 'MH-005', qty: 2, location: 'B3-01' },
            { id: 10, name: 'Card Stand Set', sku: 'CSS-010', qty: 1, location: 'E2-15' }
          ],
          priority: 'rush',
          orderDate: '2024-01-15T11:30:00',
          dueDate: '2024-01-15T17:00:00',
          shippingMethod: 'overnight',
          notes: 'RUSH ORDER - Customer paid for same-day shipping'
        },
        {
          id: 'ORD-2024-005',
          customer: { name: 'David Wilson', address: '654 Maple Dr, Phoenix, AZ 85001' },
          items: [
            { id: 11, name: 'Starter Collection Kit', sku: 'SCK-001', qty: 1, location: 'A2-10' }
          ],
          priority: 'normal',
          orderDate: '2024-01-15T12:45:00',
          dueDate: '2024-01-20T17:00:00',
          shippingMethod: 'economy',
          notes: null
        }
      ]);

      setInProgress([
        {
          id: 'ORD-2024-006',
          customer: { name: 'Lisa Anderson', address: '987 Cedar Ln, Seattle, WA 98101' },
          items: [
            { id: 12, name: 'Pro Binder 9-Pocket', sku: 'PB9-001', qty: 2, location: 'A1-05', picked: true },
            { id: 13, name: 'Card Sleeves (100 pack)', sku: 'CS-100', qty: 4, location: 'B2-15', picked: true }
          ],
          priority: 'normal',
          status: 'packing',
          assignedTo: 'John D.',
          startedAt: '2024-01-15T13:00:00',
          shippingMethod: 'standard'
        },
        {
          id: 'ORD-2024-007',
          customer: { name: 'Robert Taylor', address: '147 Birch Ct, Denver, CO 80201' },
          items: [
            { id: 14, name: 'Graded Card Slab Case', sku: 'GCSC-001', qty: 5, location: 'C3-25', picked: true },
            { id: 15, name: 'Foam Inserts', sku: 'FI-010', qty: 1, location: 'C3-30', picked: false }
          ],
          priority: 'high',
          status: 'picking',
          assignedTo: 'Sarah M.',
          startedAt: '2024-01-15T13:30:00',
          shippingMethod: 'express'
        }
      ]);

      setCompleted([
        {
          id: 'ORD-2024-008',
          customer: { name: 'Jennifer Martinez', address: '258 Walnut Ave, Miami, FL 33101' },
          items: 3,
          shippedAt: '2024-01-15T11:00:00',
          carrier: 'UPS',
          trackingNumber: '1Z999AA10123456784',
          shippingMethod: 'express'
        },
        {
          id: 'ORD-2024-009',
          customer: { name: 'Christopher Lee', address: '369 Spruce St, Boston, MA 02101' },
          items: 2,
          shippedAt: '2024-01-15T10:30:00',
          carrier: 'FedEx',
          trackingNumber: '794644790320',
          shippingMethod: 'standard'
        },
        {
          id: 'ORD-2024-010',
          customer: { name: 'Amanda White', address: '741 Ash Blvd, Atlanta, GA 30301' },
          items: 1,
          shippedAt: '2024-01-15T09:45:00',
          carrier: 'USPS',
          trackingNumber: '9400111899223456789012',
          shippingMethod: 'standard'
        }
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeUntilDue = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffMs = due - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffMs < 0) return { text: 'Overdue', urgent: true };
    if (diffHours < 4) return { text: `${diffHours}h left`, urgent: true };
    if (diffHours < 24) return { text: `${diffHours}h left`, urgent: false };
    return { text: `${diffDays}d left`, urgent: false };
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'rush':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', label: 'RUSH' };
      case 'high':
        return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316', label: 'High' };
      case 'normal':
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', label: 'Normal' };
      case 'low':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', label: 'Low' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', label: priority };
    }
  };

  const getShippingMethodStyle = (method) => {
    switch (method) {
      case 'overnight':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', icon: <Zap size={12} /> };
      case 'express':
        return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316', icon: <Truck size={12} /> };
      case 'standard':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', icon: <Package size={12} /> };
      case 'economy':
        return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', icon: <Box size={12} /> };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', icon: <Package size={12} /> };
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'picking':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', label: 'Picking' };
      case 'packing':
        return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', label: 'Packing' };
      case 'labeling':
        return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316', label: 'Labeling' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', label: status };
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === fulfillmentQueue.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(fulfillmentQueue.map(o => o.id));
    }
  };

  const startFulfillment = (orderId) => {
    const order = fulfillmentQueue.find(o => o.id === orderId);
    if (order) {
      setFulfillmentQueue(prev => prev.filter(o => o.id !== orderId));
      setInProgress(prev => [...prev, {
        ...order,
        status: 'picking',
        assignedTo: 'You',
        startedAt: new Date().toISOString(),
        items: order.items.map(item => ({ ...item, picked: false }))
      }]);
    }
  };

  const carriers = [
    { id: 'ups', name: 'UPS', services: ['Ground', 'Next Day Air', '2nd Day Air'] },
    { id: 'fedex', name: 'FedEx', services: ['Ground', 'Express', 'Priority Overnight'] },
    { id: 'usps', name: 'USPS', services: ['Priority Mail', 'First Class', 'Media Mail'] },
    { id: 'dhl', name: 'DHL', services: ['Express', 'Ground'] }
  ];

  const filteredQueue = fulfillmentQueue.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Package size={48} style={{ opacity: 0.5 }} />
        <p>Loading fulfillment...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Fulfillment</h1>
          <p style={styles.subtitle}>Pick, pack, and ship orders</p>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.secondaryBtn}>
            <Scan size={16} />
            Scan Mode
          </button>
          <button style={styles.secondaryBtn}>
            <Printer size={16} />
            Print Pick Lists
          </button>
          <button style={styles.primaryBtn}>
            <Play size={18} />
            Start Batch
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(249, 115, 22, 0.1)'}}>
            <Clock size={20} color="#f97316" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.awaitingFulfillment}</span>
            <span style={styles.statLabel}>Awaiting Fulfillment</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
            <RefreshCw size={20} color="#3b82f6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.inProgress}</span>
            <span style={styles.statLabel}>In Progress</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
            <Truck size={20} color="#22c55e" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.shippedToday}</span>
            <span style={styles.statLabel}>Shipped Today</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)'}}>
            <Zap size={20} color="#8b5cf6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.avgFulfillmentTime}</span>
            <span style={styles.statLabel}>Avg Fulfillment Time</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {[
          { id: 'queue', label: 'Queue', count: fulfillmentQueue.length },
          { id: 'inProgress', label: 'In Progress', count: inProgress.length },
          { id: 'completed', label: 'Completed Today', count: completed.length }
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
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Queue Tab */}
      {activeTab === 'queue' && (
        <>
          {/* Toolbar */}
          <div style={styles.toolbar}>
            <div style={styles.toolbarLeft}>
              <div style={styles.searchBox}>
                <Search size={18} color="var(--color-text-muted)" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
              </div>
              <button style={styles.filterBtn}>
                <Filter size={16} />
                Filter
              </button>
            </div>
            {selectedOrders.length > 0 && (
              <div style={styles.bulkActions}>
                <span style={styles.selectedCount}>{selectedOrders.length} selected</span>
                <button style={styles.bulkBtn}>
                  <Play size={14} />
                  Start All
                </button>
                <button style={styles.bulkBtn}>
                  <Printer size={14} />
                  Print Pick Lists
                </button>
              </div>
            )}
          </div>

          {/* Queue List */}
          <div style={styles.ordersList}>
            {filteredQueue.map((order) => {
              const priorityStyle = getPriorityStyle(order.priority);
              const shippingStyle = getShippingMethodStyle(order.shippingMethod);
              const timeUntilDue = getTimeUntilDue(order.dueDate);
              const isSelected = selectedOrders.includes(order.id);

              return (
                <div
                  key={order.id}
                  style={{
                    ...styles.orderCard,
                    ...(isSelected ? styles.orderCardSelected : {}),
                    ...(order.priority === 'rush' ? styles.orderCardRush : {})
                  }}
                >
                  <div style={styles.orderHeader}>
                    <div style={styles.orderHeaderLeft}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOrder(order.id)}
                        style={styles.checkbox}
                      />
                      <span style={styles.orderId}>{order.id}</span>
                      <span style={{
                        ...styles.priorityBadge,
                        backgroundColor: priorityStyle.bg,
                        color: priorityStyle.color
                      }}>
                        {priorityStyle.label}
                      </span>
                      <span style={{
                        ...styles.shippingBadge,
                        backgroundColor: shippingStyle.bg,
                        color: shippingStyle.color
                      }}>
                        {shippingStyle.icon}
                        {order.shippingMethod}
                      </span>
                    </div>
                    <div style={styles.orderHeaderRight}>
                      <span style={{
                        ...styles.dueBadge,
                        color: timeUntilDue.urgent ? '#ef4444' : 'var(--color-text-muted)'
                      }}>
                        <Clock size={12} />
                        {timeUntilDue.text}
                      </span>
                      <button style={styles.iconBtn}>
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>

                  <div style={styles.orderBody}>
                    <div style={styles.customerSection}>
                      <div style={styles.customerIcon}>
                        <User size={16} />
                      </div>
                      <div style={styles.customerInfo}>
                        <span style={styles.customerName}>{order.customer.name}</span>
                        <span style={styles.customerAddress}>
                          <MapPin size={12} />
                          {order.customer.address}
                        </span>
                      </div>
                    </div>

                    <div style={styles.itemsSection}>
                      <div style={styles.itemsHeader}>
                        <Package size={14} />
                        <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''} to pick</span>
                      </div>
                      <div style={styles.itemsList}>
                        {order.items.map((item) => (
                          <div key={item.id} style={styles.itemRow}>
                            <span style={styles.itemQty}>×{item.qty}</span>
                            <span style={styles.itemName}>{item.name}</span>
                            <span style={styles.itemSku}>{item.sku}</span>
                            <span style={styles.itemLocation}>
                              <MapPin size={10} />
                              {item.location}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.notes && (
                      <div style={styles.notesSection}>
                        <AlertTriangle size={14} color="#f59e0b" />
                        <span>{order.notes}</span>
                      </div>
                    )}
                  </div>

                  <div style={styles.orderFooter}>
                    <span style={styles.orderDate}>
                      <Calendar size={12} />
                      Ordered {formatDate(order.orderDate)} at {formatTime(order.orderDate)}
                    </span>
                    <div style={styles.orderActions}>
                      <button style={styles.secondarySmBtn}>
                        <Printer size={14} />
                        Pick List
                      </button>
                      <button
                        style={styles.primarySmBtn}
                        onClick={() => startFulfillment(order.id)}
                      >
                        <Play size={14} />
                        Start Fulfillment
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredQueue.length === 0 && (
              <div style={styles.emptyState}>
                <CheckCircle size={48} color="var(--color-text-muted)" />
                <h3>All caught up!</h3>
                <p>No orders waiting for fulfillment</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* In Progress Tab */}
      {activeTab === 'inProgress' && (
        <div style={styles.ordersList}>
          {inProgress.map((order) => {
            const statusStyle = getStatusStyle(order.status);
            const pickedCount = order.items.filter(i => i.picked).length;

            return (
              <div key={order.id} style={styles.orderCard}>
                <div style={styles.orderHeader}>
                  <div style={styles.orderHeaderLeft}>
                    <span style={styles.orderId}>{order.id}</span>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color
                    }}>
                      {statusStyle.label}
                    </span>
                    <span style={styles.assignedBadge}>
                      <User size={12} />
                      {order.assignedTo}
                    </span>
                  </div>
                  <div style={styles.orderHeaderRight}>
                    <span style={styles.startedAt}>
                      Started {formatTime(order.startedAt)}
                    </span>
                  </div>
                </div>

                <div style={styles.orderBody}>
                  <div style={styles.customerSection}>
                    <div style={styles.customerIcon}>
                      <User size={16} />
                    </div>
                    <div style={styles.customerInfo}>
                      <span style={styles.customerName}>{order.customer.name}</span>
                      <span style={styles.customerAddress}>
                        <MapPin size={12} />
                        {order.customer.address}
                      </span>
                    </div>
                  </div>

                  <div style={styles.progressSection}>
                    <div style={styles.progressHeader}>
                      <span>Pick Progress</span>
                      <span>{pickedCount}/{order.items.length} items</span>
                    </div>
                    <div style={styles.progressBar}>
                      <div
                        style={{
                          ...styles.progressFill,
                          width: `${(pickedCount / order.items.length) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  <div style={styles.itemsList}>
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          ...styles.itemRow,
                          ...(item.picked ? styles.itemRowPicked : {})
                        }}
                      >
                        {item.picked ? (
                          <CheckSquare size={16} color="#22c55e" />
                        ) : (
                          <Square size={16} color="var(--color-text-muted)" />
                        )}
                        <span style={styles.itemQty}>×{item.qty}</span>
                        <span style={styles.itemName}>{item.name}</span>
                        <span style={styles.itemLocation}>
                          <MapPin size={10} />
                          {item.location}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.orderFooter}>
                  <div style={styles.workflowSteps}>
                    <span style={{...styles.workflowStep, ...(order.status === 'picking' ? styles.workflowStepActive : styles.workflowStepComplete)}}>
                      Pick
                    </span>
                    <ChevronRight size={14} color="var(--color-text-muted)" />
                    <span style={{...styles.workflowStep, ...(order.status === 'packing' ? styles.workflowStepActive : {})}}>
                      Pack
                    </span>
                    <ChevronRight size={14} color="var(--color-text-muted)" />
                    <span style={styles.workflowStep}>
                      Ship
                    </span>
                  </div>
                  <div style={styles.orderActions}>
                    <button style={styles.secondarySmBtn}>
                      <Pause size={14} />
                      Pause
                    </button>
                    <button
                      style={styles.primarySmBtn}
                      onClick={() => {
                        setSelectedForShipping(order);
                        setShowShipModal(true);
                      }}
                    >
                      <ArrowRight size={14} />
                      {order.status === 'picking' ? 'Mark Picked' : 'Ready to Ship'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {inProgress.length === 0 && (
            <div style={styles.emptyState}>
              <RefreshCw size={48} color="var(--color-text-muted)" />
              <h3>No orders in progress</h3>
              <p>Start fulfilling orders from the queue</p>
            </div>
          )}
        </div>
      )}

      {/* Completed Tab */}
      {activeTab === 'completed' && (
        <div style={styles.completedList}>
          {completed.map((order) => (
            <div key={order.id} style={styles.completedCard}>
              <div style={styles.completedLeft}>
                <CheckCircle size={20} color="#22c55e" />
                <div style={styles.completedInfo}>
                  <span style={styles.orderId}>{order.id}</span>
                  <span style={styles.completedCustomer}>{order.customer.name}</span>
                </div>
              </div>
              <div style={styles.completedCenter}>
                <span style={styles.completedItems}>{order.items} items</span>
                <span style={styles.completedCarrier}>
                  <Truck size={12} />
                  {order.carrier}
                </span>
              </div>
              <div style={styles.completedTracking}>
                <span style={styles.trackingLabel}>Tracking</span>
                <span style={styles.trackingNumber}>{order.trackingNumber}</span>
              </div>
              <div style={styles.completedRight}>
                <span style={styles.shippedAt}>
                  Shipped {formatTime(order.shippedAt)}
                </span>
                <button style={styles.iconBtn}>
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ship Modal */}
      {showShipModal && selectedForShipping && (
        <div style={styles.modalOverlay} onClick={() => setShowShipModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Create Shipment</h2>
              <button style={styles.modalClose} onClick={() => setShowShipModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.shipmentInfo}>
                <div style={styles.shipmentOrder}>
                  <span style={styles.shipmentLabel}>Order</span>
                  <span style={styles.shipmentValue}>{selectedForShipping.id}</span>
                </div>
                <div style={styles.shipmentOrder}>
                  <span style={styles.shipmentLabel}>Customer</span>
                  <span style={styles.shipmentValue}>{selectedForShipping.customer.name}</span>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Carrier</label>
                <div style={styles.carrierGrid}>
                  {carriers.map((carrier) => (
                    <button key={carrier.id} style={styles.carrierBtn}>
                      {carrier.name}
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Weight (lbs)</label>
                  <div style={styles.inputWithIcon}>
                    <Weight size={16} />
                    <input type="number" placeholder="0.0" style={styles.formInput} />
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Dimensions (in)</label>
                  <div style={styles.dimensionsInputs}>
                    <input type="number" placeholder="L" style={styles.dimInput} />
                    <span>×</span>
                    <input type="number" placeholder="W" style={styles.dimInput} />
                    <span>×</span>
                    <input type="number" placeholder="H" style={styles.dimInput} />
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  <input type="checkbox" style={styles.formCheckbox} />
                  Send tracking notification to customer
                </label>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.secondaryBtn} onClick={() => setShowShipModal(false)}>
                Cancel
              </button>
              <button style={styles.primaryBtn}>
                <Printer size={16} />
                Print Label & Complete
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
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  statIcon: {
    width: '48px',
    height: '48px',
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
    fontSize: '24px',
    fontWeight: 700
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  toolbarLeft: {
    display: 'flex',
    gap: '12px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    width: '280px'
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
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
  bulkActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  selectedCount: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginRight: '8px'
  },
  bulkBtn: {
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
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  orderCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  orderCardSelected: {
    borderColor: 'var(--color-primary)'
  },
  orderCardRush: {
    borderColor: '#ef4444',
    borderWidth: '2px'
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: 'var(--color-surface-2)',
    borderBottom: '1px solid var(--color-border)'
  },
  orderHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  orderHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  orderId: {
    fontWeight: 600,
    color: 'var(--color-primary)'
  },
  priorityBadge: {
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  shippingBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  dueBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px'
  },
  iconBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  orderBody: {
    padding: '20px'
  },
  customerSection: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px'
  },
  customerIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)'
  },
  customerInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  customerName: {
    fontWeight: 600,
    marginBottom: '4px'
  },
  customerAddress: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  itemsSection: {
    marginBottom: '16px'
  },
  itemsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--color-text-muted)'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    fontSize: '13px'
  },
  itemRowPicked: {
    opacity: 0.6,
    textDecoration: 'line-through'
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
  itemLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--color-primary)'
  },
  notesSection: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '12px',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#f59e0b'
  },
  progressSection: {
    marginBottom: '16px'
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  progressBar: {
    height: '8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderTop: '1px solid var(--color-border)'
  },
  orderDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  orderActions: {
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
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600
  },
  assignedBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  startedAt: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  workflowSteps: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  workflowStep: {
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--color-text-muted)',
    backgroundColor: 'var(--color-surface-2)'
  },
  workflowStepActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: '#3b82f6'
  },
  workflowStepComplete: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    color: '#22c55e'
  },
  completedList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  completedCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '16px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  completedLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1
  },
  completedInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  completedCustomer: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  completedCenter: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  completedItems: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  completedCarrier: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px'
  },
  completedTracking: {
    display: 'flex',
    flexDirection: 'column'
  },
  trackingLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginBottom: '2px'
  },
  trackingNumber: {
    fontSize: '12px',
    fontFamily: 'monospace',
    color: 'var(--color-primary)'
  },
  completedRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  shippedAt: {
    fontSize: '12px',
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
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    width: '100%',
    maxWidth: '600px',
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
  shipmentInfo: {
    display: 'flex',
    gap: '24px',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px'
  },
  shipmentOrder: {
    display: 'flex',
    flexDirection: 'column'
  },
  shipmentLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginBottom: '4px'
  },
  shipmentValue: {
    fontSize: '14px',
    fontWeight: 600
  },
  formGroup: {
    marginBottom: '20px'
  },
  formLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 500,
    marginBottom: '8px'
  },
  carrierGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px'
  },
  carrierBtn: {
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '16px'
  },
  inputWithIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text-muted)'
  },
  formInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  dimensionsInputs: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  dimInput: {
    width: '60px',
    padding: '10px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    textAlign: 'center'
  },
  formCheckbox: {
    marginRight: '8px'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid var(--color-border)'
  }
};

export default OrderFulfillment;