/**
 * OrderDetail
 * 
 * Complete view of a single order.
 * - Order info and status timeline
 * - Customer details
 * - Items breakdown
 * - Payment info
 * - Fulfillment tracking
 * - Notes and communication
 * - Actions (refund, cancel, resend receipt, etc.)
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  AlertCircle,
  Printer,
  RefreshCw,
  Edit2,
  MessageSquare,
  DollarSign,
  Receipt,
  Send,
  MoreHorizontal,
  ChevronRight,
  Calendar,
  FileText,
  Star
} from 'lucide-react';

export function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [newNote, setNewNote] = useState('');
  const [showRefundModal, setShowRefundModal] = useState(false);

  // Mock order data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrder({
        id: orderId || 'ORD-2024-001',
        customer: {
          id: 'CUS-001',
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '(555) 123-4567',
          totalOrders: 12,
          totalSpent: 458.90,
          memberSince: new Date('2023-06-15')
        },
        items: [
          { id: 1, name: 'Classic Burger', quantity: 2, price: 12.99, total: 25.98, notes: 'No onions' },
          { id: 2, name: 'Loaded Fries', quantity: 1, price: 8.99, total: 8.99, notes: '' },
          { id: 3, name: 'Pumpkin Spice Latte', quantity: 2, price: 5.49, total: 10.98, notes: 'Extra whipped cream' }
        ],
        subtotal: 45.95,
        discount: { code: 'FALL10', amount: 4.60 },
        tax: 3.41,
        tip: 5.00,
        deliveryFee: 3.99,
        total: 53.75,
        status: 'processing',
        paymentStatus: 'paid',
        paymentMethod: {
          type: 'card',
          brand: 'Visa',
          last4: '4242',
          expiry: '12/25'
        },
        fulfillment: {
          type: 'delivery',
          status: 'preparing',
          address: {
            street: '123 Main Street',
            apt: 'Apt 4B',
            city: 'Dallas',
            state: 'TX',
            zip: '75201'
          },
          instructions: 'Leave at door, ring doorbell',
          estimatedTime: new Date(Date.now() + 1000 * 60 * 25),
          driver: null
        },
        timeline: [
          { status: 'placed', timestamp: new Date(Date.now() - 1000 * 60 * 35), note: 'Order placed online' },
          { status: 'confirmed', timestamp: new Date(Date.now() - 1000 * 60 * 33), note: 'Payment confirmed' },
          { status: 'preparing', timestamp: new Date(Date.now() - 1000 * 60 * 20), note: 'Kitchen started preparation' }
        ],
        notes: [
          { id: 1, author: 'System', message: 'Order placed via website', timestamp: new Date(Date.now() - 1000 * 60 * 35) },
          { id: 2, author: 'Kitchen', message: 'Starting preparation', timestamp: new Date(Date.now() - 1000 * 60 * 20) }
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 35),
        updatedAt: new Date(Date.now() - 1000 * 60 * 5)
      });
      setLoading(false);
    }, 500);
  }, [orderId]);

  const getStatusConfig = (status) => {
    const configs = {
      placed: { color: '#6b7280', icon: Clock, label: 'Order Placed' },
      confirmed: { color: '#3b82f6', icon: CheckCircle, label: 'Confirmed' },
      preparing: { color: '#f97316', icon: Package, label: 'Preparing' },
      ready: { color: '#8b5cf6', icon: Package, label: 'Ready' },
      out_for_delivery: { color: '#06b6d4', icon: Truck, label: 'Out for Delivery' },
      delivered: { color: '#22c55e', icon: CheckCircle, label: 'Delivered' },
      picked_up: { color: '#22c55e', icon: CheckCircle, label: 'Picked Up' },
      completed: { color: '#22c55e', icon: CheckCircle, label: 'Completed' },
      cancelled: { color: '#ef4444', icon: XCircle, label: 'Cancelled' }
    };
    return configs[status] || configs.placed;
  };

  const handleStatusUpdate = (newStatus) => {
    const newTimeline = [
      ...order.timeline,
      { status: newStatus, timestamp: new Date(), note: `Status updated to ${newStatus}` }
    ];
    setOrder(prev => ({
      ...prev,
      status: newStatus,
      fulfillment: { ...prev.fulfillment, status: newStatus },
      timeline: newTimeline,
      updatedAt: new Date()
    }));
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setOrder(prev => ({
      ...prev,
      notes: [
        ...prev.notes,
        { id: Date.now(), author: 'Staff', message: newNote, timestamp: new Date() }
      ]
    }));
    setNewNote('');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite' }} />
        <p>Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={styles.errorContainer}>
        <AlertCircle size={48} />
        <h2>Order not found</h2>
        <button onClick={() => navigate('/orders')}>Back to Orders</button>
      </div>
    );
  }

  const currentStatus = getStatusConfig(order.fulfillment.status);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backButton} onClick={() => navigate('/orders')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <div style={styles.orderIdRow}>
              <h1 style={styles.orderId}>{order.id}</h1>
              <span style={{
                ...styles.statusBadge,
                backgroundColor: `${currentStatus.color}20`,
                color: currentStatus.color
              }}>
                <currentStatus.icon size={14} />
                {currentStatus.label}
              </span>
            </div>
            <p style={styles.orderMeta}>
              Placed {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
            </p>
          </div>
        </div>

        <div style={styles.headerActions}>
          <button style={styles.actionBtn}>
            <Printer size={16} />
            Print
          </button>
          <button style={styles.actionBtn}>
            <Receipt size={16} />
            Receipt
          </button>
          <button style={styles.actionBtn}>
            <Mail size={16} />
            Email
          </button>
          <button style={styles.actionBtnPrimary}>
            <Edit2 size={16} />
            Edit Order
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          {/* Status Timeline */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Order Timeline</h3>
            </div>
            <div style={styles.timeline}>
              {order.timeline.map((event, index) => {
                const config = getStatusConfig(event.status);
                const Icon = config.icon;
                const isLast = index === order.timeline.length - 1;

                return (
                  <div key={index} style={styles.timelineItem}>
                    <div style={styles.timelineIcon}>
                      <div style={{
                        ...styles.timelineDot,
                        backgroundColor: config.color
                      }}>
                        <Icon size={14} color="#fff" />
                      </div>
                      {!isLast && <div style={styles.timelineLine} />}
                    </div>
                    <div style={styles.timelineContent}>
                      <span style={styles.timelineStatus}>{config.label}</span>
                      <span style={styles.timelineNote}>{event.note}</span>
                      <span style={styles.timelineTime}>{formatTime(event.timestamp)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Status Actions */}
            {order.status !== 'completed' && order.status !== 'cancelled' && (
              <div style={styles.statusActions}>
                <span style={styles.statusActionsLabel}>Update Status:</span>
                <div style={styles.statusButtons}>
                  {order.fulfillment.status === 'preparing' && (
                    <button 
                      style={styles.statusBtn}
                      onClick={() => handleStatusUpdate('ready')}
                    >
                      Mark Ready
                    </button>
                  )}
                  {order.fulfillment.status === 'ready' && order.fulfillment.type === 'delivery' && (
                    <button 
                      style={styles.statusBtn}
                      onClick={() => handleStatusUpdate('out_for_delivery')}
                    >
                      Out for Delivery
                    </button>
                  )}
                  {(order.fulfillment.status === 'out_for_delivery' || order.fulfillment.status === 'ready') && (
                    <button 
                      style={styles.statusBtnSuccess}
                      onClick={() => handleStatusUpdate(order.fulfillment.type === 'delivery' ? 'delivered' : 'picked_up')}
                    >
                      Mark {order.fulfillment.type === 'delivery' ? 'Delivered' : 'Picked Up'}
                    </button>
                  )}
                  <button 
                    style={styles.statusBtnDanger}
                    onClick={() => handleStatusUpdate('cancelled')}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Order Items</h3>
              <span style={styles.itemCount}>{order.items.length} items</span>
            </div>
            <div style={styles.itemsList}>
              {order.items.map(item => (
                <div key={item.id} style={styles.orderItem}>
                  <div style={styles.itemQuantity}>{item.quantity}x</div>
                  <div style={styles.itemDetails}>
                    <span style={styles.itemName}>{item.name}</span>
                    {item.notes && (
                      <span style={styles.itemNotes}>Note: {item.notes}</span>
                    )}
                  </div>
                  <div style={styles.itemPrice}>
                    <span style={styles.itemTotal}>${item.total.toFixed(2)}</span>
                    <span style={styles.itemUnitPrice}>${item.price.toFixed(2)} each</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div style={styles.orderTotals}>
              <div style={styles.totalRow}>
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount && (
                <div style={{ ...styles.totalRow, color: '#22c55e' }}>
                  <span>Discount ({order.discount.code})</span>
                  <span>-${order.discount.amount.toFixed(2)}</span>
                </div>
              )}
              <div style={styles.totalRow}>
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              {order.deliveryFee > 0 && (
                <div style={styles.totalRow}>
                  <span>Delivery Fee</span>
                  <span>${order.deliveryFee.toFixed(2)}</span>
                </div>
              )}
              {order.tip > 0 && (
                <div style={styles.totalRow}>
                  <span>Tip</span>
                  <span>${order.tip.toFixed(2)}</span>
                </div>
              )}
              <div style={styles.totalRowFinal}>
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Notes & Activity</h3>
            </div>
            <div style={styles.notesList}>
              {order.notes.map(note => (
                <div key={note.id} style={styles.noteItem}>
                  <div style={styles.noteHeader}>
                    <span style={styles.noteAuthor}>{note.author}</span>
                    <span style={styles.noteTime}>{formatTime(note.timestamp)}</span>
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

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {/* Customer Info */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Customer</h3>
              <button 
                style={styles.viewProfileBtn}
                onClick={() => navigate(`/customers/${order.customer.id}`)}
              >
                View Profile <ChevronRight size={14} />
              </button>
            </div>
            <div style={styles.customerInfo}>
              <div style={styles.customerAvatar}>
                {order.customer.name.charAt(0)}
              </div>
              <div style={styles.customerDetails}>
                <span style={styles.customerName}>{order.customer.name}</span>
                <div style={styles.customerMeta}>
                  <span><Star size={12} /> {order.customer.totalOrders} orders</span>
                  <span>${order.customer.totalSpent.toFixed(2)} spent</span>
                </div>
              </div>
            </div>
            <div style={styles.contactInfo}>
              <div style={styles.contactRow}>
                <Mail size={14} />
                <a href={`mailto:${order.customer.email}`}>{order.customer.email}</a>
              </div>
              <div style={styles.contactRow}>
                <Phone size={14} />
                <a href={`tel:${order.customer.phone}`}>{order.customer.phone}</a>
              </div>
            </div>
          </div>

          {/* Delivery/Pickup Info */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>
                {order.fulfillment.type === 'delivery' ? 'Delivery' : 'Pickup'} Info
              </h3>
            </div>
            {order.fulfillment.type === 'delivery' ? (
              <>
                <div style={styles.addressBlock}>
                  <MapPin size={16} />
                  <div style={styles.addressText}>
                    <span>{order.fulfillment.address.street}</span>
                    {order.fulfillment.address.apt && <span>{order.fulfillment.address.apt}</span>}
                    <span>{order.fulfillment.address.city}, {order.fulfillment.address.state} {order.fulfillment.address.zip}</span>
                  </div>
                </div>
                {order.fulfillment.instructions && (
                  <div style={styles.instructions}>
                    <strong>Instructions:</strong> {order.fulfillment.instructions}
                  </div>
                )}
                <div style={styles.estimatedTime}>
                  <Clock size={16} />
                  <span>Estimated: {formatTime(order.fulfillment.estimatedTime)}</span>
                </div>
              </>
            ) : (
              <div style={styles.pickupInfo}>
                <Clock size={16} />
                <span>Pickup at: {formatTime(order.fulfillment.estimatedTime)}</span>
              </div>
            )}
          </div>

          {/* Payment Info */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Payment</h3>
              <span style={{
                ...styles.paymentBadge,
                backgroundColor: order.paymentStatus === 'paid' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                color: order.paymentStatus === 'paid' ? '#22c55e' : '#eab308'
              }}>
                {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
              </span>
            </div>
            <div style={styles.paymentMethod}>
              <CreditCard size={20} />
              <div style={styles.paymentDetails}>
                <span style={styles.paymentBrand}>
                  {order.paymentMethod.brand} •••• {order.paymentMethod.last4}
                </span>
                <span style={styles.paymentExpiry}>
                  Expires {order.paymentMethod.expiry}
                </span>
              </div>
              <span style={styles.paymentAmount}>${order.total.toFixed(2)}</span>
            </div>
            
            {order.paymentStatus === 'paid' && (
              <button 
                style={styles.refundBtn}
                onClick={() => setShowRefundModal(true)}
              >
                <DollarSign size={14} />
                Issue Refund
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Quick Actions</h3>
            </div>
            <div style={styles.quickActions}>
              <button style={styles.quickAction}>
                <Receipt size={16} />
                Resend Receipt
              </button>
              <button style={styles.quickAction}>
                <MessageSquare size={16} />
                Contact Customer
              </button>
              <button style={styles.quickAction}>
                <FileText size={16} />
                View Invoice
              </button>
              <button style={styles.quickAction}>
                <RefreshCw size={16} />
                Reorder
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
  orderIdRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  orderId: {
    fontSize: '28px',
    fontWeight: 700,
    margin: 0
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '13px',
    fontWeight: 600
  },
  orderMeta: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '8px 0 0 0'
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
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
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
  itemCount: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  timeline: {
    padding: '24px'
  },
  timelineItem: {
    display: 'flex',
    gap: '16px'
  },
  timelineIcon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  timelineDot: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  timelineLine: {
    width: '2px',
    height: '40px',
    backgroundColor: 'var(--color-border)',
    margin: '8px 0'
  },
  timelineContent: {
    flex: 1,
    paddingBottom: '24px'
  },
  timelineStatus: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600
  },
  timelineNote: {
    display: 'block',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginTop: '4px'
  },
  timelineTime: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginTop: '4px'
  },
  statusActions: {
    padding: '16px 24px',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface-2)'
  },
  statusActionsLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginBottom: '12px',
    display: 'block'
  },
  statusButtons: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  statusBtn: {
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  statusBtnSuccess: {
    padding: '10px 16px',
    backgroundColor: '#22c55e',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  statusBtnDanger: {
    padding: '10px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    color: '#ef4444',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  itemsList: {
    padding: '0 24px'
  },
  orderItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '16px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  itemQuantity: {
    width: '32px',
    height: '32px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 600
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    display: 'block',
    fontWeight: 500
  },
  itemNotes: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginTop: '4px',
    fontStyle: 'italic'
  },
  itemPrice: {
    textAlign: 'right'
  },
  itemTotal: {
    display: 'block',
    fontWeight: 600
  },
  itemUnitPrice: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  orderTotals: {
    padding: '20px 24px',
    backgroundColor: 'var(--color-surface-2)'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    fontSize: '14px'
  },
  totalRowFinal: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 0 0',
    marginTop: '8px',
    borderTop: '1px solid var(--color-border)',
    fontSize: '18px',
    fontWeight: 700
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
  },
  viewProfileBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  customerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px'
  },
  customerAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 600
  },
  customerDetails: {
    flex: 1
  },
  customerName: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 600
  },
  customerMeta: {
    display: 'flex',
    gap: '16px',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginTop: '4px'
  },
  contactInfo: {
    padding: '0 24px 20px'
  },
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 0',
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  addressBlock: {
    display: 'flex',
    gap: '12px',
    padding: '20px 24px'
  },
  addressText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    fontSize: '14px'
  },
  instructions: {
    padding: '0 24px 16px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  estimatedTime: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 24px',
    backgroundColor: 'var(--color-surface-2)',
    fontSize: '14px',
    fontWeight: 500
  },
  pickupInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '20px 24px',
    fontSize: '14px'
  },
  paymentBadge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 600
  },
  paymentMethod: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px'
  },
  paymentDetails: {
    flex: 1
  },
  paymentBrand: {
    display: 'block',
    fontWeight: 500
  },
  paymentExpiry: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  paymentAmount: {
    fontSize: '18px',
    fontWeight: 700
  },
  refundBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: 'calc(100% - 48px)',
    margin: '0 24px 20px',
    padding: '12px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '10px',
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  quickActions: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    padding: '20px 24px'
  },
  quickAction: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  }
};

export default OrderDetail;