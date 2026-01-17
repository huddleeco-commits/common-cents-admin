/**
 * CustomerCommunication
 * 
 * Complete communication history & tools.
 * - Email history
 * - SMS messages
 * - Phone call logs
 * - Chat transcripts
 * - Quick send actions
 * - Template library
 * 
 * Unified inbox for all customer touchpoints.
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Mail,
  MessageSquare,
  Phone,
  Send,
  Inbox,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Eye,
  MousePointer,
  RefreshCw,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  MoreHorizontal,
  Paperclip,
  Image,
  FileText,
  Star,
  Reply,
  Forward,
  Trash2,
  Archive,
  Tag,
  User,
  Calendar,
  Zap
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

export function CustomerCommunication({ customerId, embedded = false }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [communications, setCommunications] = useState([]);
  const [selectedComm, setSelectedComm] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showCompose, setShowCompose] = useState(false);
  const [composeType, setComposeType] = useState('email');

  const fetchCommunications = useCallback(async () => {
    if (!customerId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/communications/${customerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          setCommunications([]);
          return;
        }
        throw new Error(`Failed to fetch communications: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.communications) {
        setCommunications(data.communications);
      } else {
        setCommunications([]);
      }
    } catch (err) {
      console.error('Error fetching communications:', err);
      setError(err.message);
      setCommunications([]);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    fetchCommunications();
  }, [fetchCommunications]);

  // Demo data for when no API is available
  const getDemoCommunications = () => [
        {
          id: 1,
          type: 'email',
          direction: 'outbound',
          subject: 'Your order has shipped! 📦',
          preview: 'Great news! Your order #ORD-8847 is on its way...',
          body: `Hi Marcus,

Great news! Your order #ORD-8847 is on its way to you.

Tracking Number: 1Z999AA10123456784
Carrier: UPS Ground
Estimated Delivery: January 18, 2024

Track your package: https://tracking.example.com/1Z999AA10123456784

Thanks for shopping with us!

Best regards,
The Team`,
          status: 'delivered',
          timestamp: '2024-01-15T14:35:00Z',
          timeAgo: '2 hours ago',
          from: 'orders@yourstore.com',
          to: 'marcus@example.com',
          campaign: null,
          opened: true,
          clicked: true,
          openedAt: '2024-01-15T14:42:00Z',
          clickedAt: '2024-01-15T14:43:00Z'
        },
        {
          id: 2,
          type: 'email',
          direction: 'outbound',
          subject: 'Winter Sale - 30% Off Everything! ❄️',
          preview: 'Don\'t miss our biggest sale of the season...',
          body: `Hi Marcus,

Winter is here, and so are the savings!

Get 30% off everything in our store with code WINTER30.

Shop now: https://yourstore.com/sale

Offer ends January 20th.

Happy shopping!`,
          status: 'delivered',
          timestamp: '2024-01-15T09:00:00Z',
          timeAgo: '7 hours ago',
          from: 'marketing@yourstore.com',
          to: 'marcus@example.com',
          campaign: 'CAMP-2024-012',
          campaignName: 'Winter Sale 2024',
          opened: true,
          clicked: true,
          openedAt: '2024-01-15T10:15:00Z',
          clickedAt: '2024-01-15T10:18:00Z'
        },
        {
          id: 3,
          type: 'sms',
          direction: 'outbound',
          content: 'Your order #ORD-8847 has shipped! Track it here: trk.co/abc123',
          status: 'delivered',
          timestamp: '2024-01-15T14:36:00Z',
          timeAgo: '2 hours ago',
          from: 'YourStore',
          to: '+1 (555) 123-4567'
        },
        {
          id: 4,
          type: 'email',
          direction: 'inbound',
          subject: 'Re: Order Status Question',
          preview: 'Thanks for the quick response! That answers my question...',
          body: `Thanks for the quick response! That answers my question about the shipping timeline.

I appreciate the great customer service.

Marcus`,
          status: 'received',
          timestamp: '2024-01-14T17:30:00Z',
          timeAgo: 'Yesterday',
          from: 'marcus@example.com',
          to: 'support@yourstore.com',
          threadId: 'THREAD-456'
        },
        {
          id: 5,
          type: 'email',
          direction: 'outbound',
          subject: 'Re: Order Status Question',
          preview: 'Hi Marcus, Thanks for reaching out! Your order is currently...',
          body: `Hi Marcus,

Thanks for reaching out!

Your order #ORD-8847 is currently being processed and should ship within 24 hours. You'll receive a tracking number via email once it's on its way.

Is there anything else I can help you with?

Best regards,
Sarah
Customer Support`,
          status: 'delivered',
          timestamp: '2024-01-14T16:45:00Z',
          timeAgo: 'Yesterday',
          from: 'support@yourstore.com',
          to: 'marcus@example.com',
          threadId: 'THREAD-456',
          agent: 'Sarah M.'
        },
        {
          id: 6,
          type: 'email',
          direction: 'inbound',
          subject: 'Order Status Question',
          preview: 'Hi, I placed an order yesterday and was wondering...',
          body: `Hi,

I placed an order yesterday (#ORD-8847) and was wondering when it might ship? I need it by the end of the week if possible.

Thanks,
Marcus`,
          status: 'received',
          timestamp: '2024-01-14T15:20:00Z',
          timeAgo: 'Yesterday',
          from: 'marcus@example.com',
          to: 'support@yourstore.com',
          threadId: 'THREAD-456'
        },
        {
          id: 7,
          type: 'phone',
          direction: 'inbound',
          summary: 'Customer called about product availability',
          notes: 'Marcus inquired about restocking of Smart Gadget Pro. Informed him we expect new inventory by end of month. He requested to be notified when back in stock.',
          status: 'completed',
          duration: '4:32',
          timestamp: '2024-01-12T11:15:00Z',
          timeAgo: '3 days ago',
          from: '+1 (555) 123-4567',
          to: 'Sales Line',
          agent: 'Mike R.',
          outcome: 'Callback requested'
        },
        {
          id: 8,
          type: 'email',
          direction: 'outbound',
          subject: 'Thanks for your purchase! 🎉',
          preview: 'Thank you for your order! Here\'s your receipt...',
          body: `Hi Marcus,

Thank you for your order!

Order #ORD-8790
Total: $89.99

We're preparing your items and will notify you once shipped.

Thank you for shopping with us!`,
          status: 'delivered',
          timestamp: '2024-01-12T11:32:00Z',
          timeAgo: '3 days ago',
          from: 'orders@yourstore.com',
          to: 'marcus@example.com',
          opened: true,
          clicked: false,
          openedAt: '2024-01-12T11:45:00Z'
        },
        {
          id: 9,
          type: 'sms',
          direction: 'outbound',
          content: '🎁 You\'ve earned 500 points! Redeem them on your next order. Shop now: yourstore.com',
          status: 'delivered',
          timestamp: '2024-01-10T10:00:00Z',
          timeAgo: '5 days ago',
          from: 'YourStore',
          to: '+1 (555) 123-4567',
          campaign: 'CAMP-2024-008',
          campaignName: 'Points Reminder'
        },
        {
          id: 10,
          type: 'email',
          direction: 'outbound',
          subject: 'Welcome to YourStore! 🎊',
          preview: 'Thanks for signing up! Here\'s 10% off your first order...',
          body: `Hi Marcus,

Welcome to YourStore! We're excited to have you.

As a thank you for joining, here's 10% off your first order: WELCOME10

Browse our collections: https://yourstore.com

Happy shopping!`,
          status: 'delivered',
          timestamp: '2024-01-01T10:05:00Z',
          timeAgo: '2 weeks ago',
          from: 'hello@yourstore.com',
          to: 'marcus@example.com',
          campaign: 'AUTO-WELCOME',
          campaignName: 'Welcome Series',
          opened: true,
          clicked: true,
          openedAt: '2024-01-01T10:30:00Z',
          clickedAt: '2024-01-01T10:32:00Z'
        }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email': return Mail;
      case 'sms': return MessageSquare;
      case 'phone': return Phone;
      case 'chat': return MessageSquare;
      default: return Mail;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'email': return '#3b82f6';
      case 'sms': return '#22c55e';
      case 'phone': return '#8b5cf6';
      case 'chat': return '#06b6d4';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
      case 'completed':
      case 'received':
        return <CheckCircle size={14} color="#22c55e" />;
      case 'sent':
        return <Send size={14} color="#3b82f6" />;
      case 'failed':
        return <XCircle size={14} color="#ef4444" />;
      case 'pending':
        return <Clock size={14} color="#f59e0b" />;
      default:
        return <CheckCircle size={14} />;
    }
  };

  const getDirectionLabel = (direction) => {
    return direction === 'inbound' ? 'Received' : 'Sent';
  };

  // Filter communications
  const filteredComms = communications.filter(comm => {
    if (filter === 'all') return true;
    return comm.type === filter;
  });

  // Stats
  const stats = {
    totalEmails: communications.filter(c => c.type === 'email').length,
    totalSMS: communications.filter(c => c.type === 'sms').length,
    totalCalls: communications.filter(c => c.type === 'phone').length,
    openRate: 85,
    clickRate: 42
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Mail size={24} style={{ animation: 'pulse 1s ease-in-out infinite' }} />
        <p>Loading communications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.loadingContainer}>
        <AlertTriangle size={24} color="#ef4444" />
        <p style={{ color: '#ef4444' }}>{error}</p>
        <button onClick={fetchCommunications} style={styles.retryBtn}>
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={embedded ? styles.embeddedContainer : styles.container}>
      {/* Header */}
      {!embedded && (
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.title}>Communications</h1>
            <span style={styles.subtitle}>
              {filteredComms.length} messages
            </span>
          </div>
          <div style={styles.headerActions}>
            <button
              style={styles.primaryBtn}
              onClick={() => setShowCompose(true)}
            >
              <Plus size={16} />
              New Message
            </button>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div style={styles.statsRow}>
        <div style={styles.statItem}>
          <Mail size={16} color="#3b82f6" />
          <span style={styles.statValue}>{stats.totalEmails}</span>
          <span style={styles.statLabel}>Emails</span>
        </div>
        <div style={styles.statItem}>
          <MessageSquare size={16} color="#22c55e" />
          <span style={styles.statValue}>{stats.totalSMS}</span>
          <span style={styles.statLabel}>SMS</span>
        </div>
        <div style={styles.statItem}>
          <Phone size={16} color="#8b5cf6" />
          <span style={styles.statValue}>{stats.totalCalls}</span>
          <span style={styles.statLabel}>Calls</span>
        </div>
        <div style={styles.statDivider} />
        <div style={styles.statItem}>
          <Eye size={16} color="#06b6d4" />
          <span style={styles.statValue}>{stats.openRate}%</span>
          <span style={styles.statLabel}>Open Rate</span>
        </div>
        <div style={styles.statItem}>
          <MousePointer size={16} color="#f59e0b" />
          <span style={styles.statValue}>{stats.clickRate}%</span>
          <span style={styles.statLabel}>Click Rate</span>
        </div>
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.filterTabs}>
          {[
            { value: 'all', label: 'All', icon: Inbox },
            { value: 'email', label: 'Email', icon: Mail },
            { value: 'sms', label: 'SMS', icon: MessageSquare },
            { value: 'phone', label: 'Calls', icon: Phone }
          ].map(option => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.value}
                style={{
                  ...styles.filterTab,
                  ...(filter === option.value ? styles.filterTabActive : {})
                }}
                onClick={() => setFilter(option.value)}
              >
                <IconComponent size={14} />
                {option.label}
              </button>
            );
          })}
        </div>

        <div style={styles.searchBox}>
          <Search size={16} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search messages..."
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Split View */}
      <div style={styles.splitView}>
        {/* Message List */}
        <div style={styles.messageList}>
          {filteredComms.map((comm) => {
            const TypeIcon = getTypeIcon(comm.type);
            const typeColor = getTypeColor(comm.type);
            const isSelected = selectedComm?.id === comm.id;

            return (
              <div
                key={comm.id}
                style={{
                  ...styles.messageItem,
                  ...(isSelected ? styles.messageItemSelected : {}),
                  ...(comm.direction === 'inbound' ? styles.messageInbound : {})
                }}
                onClick={() => setSelectedComm(comm)}
              >
                {/* Type Icon */}
                <div style={{
                  ...styles.messageTypeIcon,
                  backgroundColor: `${typeColor}15`,
                  color: typeColor
                }}>
                  <TypeIcon size={16} />
                </div>

                {/* Content */}
                <div style={styles.messageContent}>
                  <div style={styles.messageHeader}>
                    <span style={styles.messageDirection}>
                      {comm.direction === 'inbound' ? (
                        <span style={styles.inboundBadge}>Received</span>
                      ) : (
                        <span style={styles.outboundBadge}>Sent</span>
                      )}
                    </span>
                    <span style={styles.messageTime}>{comm.timeAgo}</span>
                  </div>

                  {/* Subject/Content */}
                  {comm.type === 'email' && (
                    <>
                      <div style={styles.messageSubject}>{comm.subject}</div>
                      <div style={styles.messagePreview}>{comm.preview}</div>
                    </>
                  )}

                  {comm.type === 'sms' && (
                    <div style={styles.messagePreview}>{comm.content}</div>
                  )}

                  {comm.type === 'phone' && (
                    <>
                      <div style={styles.messageSubject}>{comm.summary}</div>
                      <div style={styles.messagePreview}>
                        Duration: {comm.duration} • Agent: {comm.agent}
                      </div>
                    </>
                  )}

                  {/* Status & Engagement */}
                  <div style={styles.messageFooter}>
                    <div style={styles.messageStatus}>
                      {getStatusIcon(comm.status)}
                      <span>{comm.status}</span>
                    </div>

                    {comm.type === 'email' && comm.direction === 'outbound' && (
                      <div style={styles.engagementBadges}>
                        {comm.opened && (
                          <span style={styles.engagementBadge}>
                            <Eye size={10} /> Opened
                          </span>
                        )}
                        {comm.clicked && (
                          <span style={styles.engagementBadge}>
                            <MousePointer size={10} /> Clicked
                          </span>
                        )}
                      </div>
                    )}

                    {comm.campaign && (
                      <span style={styles.campaignBadge}>
                        <Zap size={10} /> {comm.campaignName || comm.campaign}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div style={styles.detailPanel}>
          {selectedComm ? (
            <>
              {/* Detail Header */}
              <div style={styles.detailHeader}>
                <div style={styles.detailTypeRow}>
                  {(() => {
                    const TypeIcon = getTypeIcon(selectedComm.type);
                    const typeColor = getTypeColor(selectedComm.type);
                    return (
                      <div style={{
                        ...styles.detailTypeIcon,
                        backgroundColor: `${typeColor}15`,
                        color: typeColor
                      }}>
                        <TypeIcon size={20} />
                      </div>
                    );
                  })()}
                  <div>
                    <span style={styles.detailType}>
                      {selectedComm.type.charAt(0).toUpperCase() + selectedComm.type.slice(1)}
                    </span>
                    <span style={styles.detailDirection}>
                      {selectedComm.direction === 'inbound' ? 'Received' : 'Sent'}
                    </span>
                  </div>
                </div>

                <div style={styles.detailActions}>
                  {selectedComm.type === 'email' && (
                    <>
                      <button style={styles.detailActionBtn}>
                        <Reply size={14} />
                      </button>
                      <button style={styles.detailActionBtn}>
                        <Forward size={14} />
                      </button>
                    </>
                  )}
                  <button style={styles.detailActionBtn}>
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>

              {/* Detail Meta */}
              <div style={styles.detailMeta}>
                <div style={styles.metaRow}>
                  <span style={styles.metaLabel}>From:</span>
                  <span style={styles.metaValue}>{selectedComm.from}</span>
                </div>
                <div style={styles.metaRow}>
                  <span style={styles.metaLabel}>To:</span>
                  <span style={styles.metaValue}>{selectedComm.to}</span>
                </div>
                <div style={styles.metaRow}>
                  <span style={styles.metaLabel}>Date:</span>
                  <span style={styles.metaValue}>
                    {new Date(selectedComm.timestamp).toLocaleString()}
                  </span>
                </div>
                {selectedComm.agent && (
                  <div style={styles.metaRow}>
                    <span style={styles.metaLabel}>Agent:</span>
                    <span style={styles.metaValue}>{selectedComm.agent}</span>
                  </div>
                )}
              </div>

              {/* Subject */}
              {selectedComm.subject && (
                <div style={styles.detailSubject}>
                  {selectedComm.subject}
                </div>
              )}

              {/* Body */}
              <div style={styles.detailBody}>
                {selectedComm.body || selectedComm.content || selectedComm.notes}
              </div>

              {/* Engagement Stats */}
              {selectedComm.type === 'email' && selectedComm.direction === 'outbound' && (
                <div style={styles.engagementSection}>
                  <h4 style={styles.engagementTitle}>Engagement</h4>
                  <div style={styles.engagementGrid}>
                    <div style={styles.engagementStat}>
                      <Eye size={16} color={selectedComm.opened ? '#22c55e' : 'var(--color-text-muted)'} />
                      <span style={styles.engagementLabel}>
                        {selectedComm.opened ? 'Opened' : 'Not Opened'}
                      </span>
                      {selectedComm.openedAt && (
                        <span style={styles.engagementTime}>
                          {new Date(selectedComm.openedAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div style={styles.engagementStat}>
                      <MousePointer size={16} color={selectedComm.clicked ? '#22c55e' : 'var(--color-text-muted)'} />
                      <span style={styles.engagementLabel}>
                        {selectedComm.clicked ? 'Clicked' : 'No Clicks'}
                      </span>
                      {selectedComm.clickedAt && (
                        <span style={styles.engagementTime}>
                          {new Date(selectedComm.clickedAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Phone Call Details */}
              {selectedComm.type === 'phone' && (
                <div style={styles.callDetails}>
                  <div style={styles.callStat}>
                    <Clock size={14} />
                    <span>Duration: {selectedComm.duration}</span>
                  </div>
                  {selectedComm.outcome && (
                    <div style={styles.callStat}>
                      <CheckCircle size={14} />
                      <span>Outcome: {selectedComm.outcome}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Campaign Info */}
              {selectedComm.campaign && (
                <div style={styles.campaignInfo}>
                  <Zap size={14} color="#f59e0b" />
                  <span>Part of campaign: <strong>{selectedComm.campaignName || selectedComm.campaign}</strong></span>
                </div>
              )}

              {/* Quick Reply */}
              {selectedComm.type === 'email' && (
                <div style={styles.quickReply}>
                  <textarea
                    placeholder="Write a quick reply..."
                    style={styles.replyTextarea}
                  />
                  <div style={styles.replyActions}>
                    <button style={styles.attachBtn}>
                      <Paperclip size={14} />
                    </button>
                    <button style={styles.sendBtn}>
                      <Send size={14} />
                      Send Reply
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={styles.noSelection}>
              <Mail size={48} color="var(--color-text-muted)" />
              <h3 style={styles.noSelectionTitle}>Select a message</h3>
              <p style={styles.noSelectionText}>
                Choose a message from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div style={styles.modalOverlay} onClick={() => setShowCompose(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>New Message</h2>
              <button
                style={styles.modalClose}
                onClick={() => setShowCompose(false)}
              >
                ×
              </button>
            </div>

            {/* Type Selector */}
            <div style={styles.composeTypeTabs}>
              {[
                { value: 'email', label: 'Email', icon: Mail },
                { value: 'sms', label: 'SMS', icon: MessageSquare }
              ].map(option => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    style={{
                      ...styles.composeTypeTab,
                      ...(composeType === option.value ? styles.composeTypeTabActive : {})
                    }}
                    onClick={() => setComposeType(option.value)}
                  >
                    <IconComponent size={16} />
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div style={styles.modalBody}>
              {composeType === 'email' ? (
                <>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>To</label>
                    <input
                      type="email"
                      placeholder="customer@example.com"
                      style={styles.formInput}
                      defaultValue="marcus@example.com"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Subject</label>
                    <input
                      type="text"
                      placeholder="Email subject..."
                      style={styles.formInput}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Message</label>
                    <textarea
                      placeholder="Write your message..."
                      style={styles.formTextarea}
                      rows={8}
                    />
                  </div>
                  <div style={styles.templateRow}>
                    <span style={styles.templateLabel}>Use template:</span>
                    <select style={styles.templateSelect}>
                      <option value="">Select template...</option>
                      <option value="follow_up">Follow Up</option>
                      <option value="thank_you">Thank You</option>
                      <option value="feedback">Request Feedback</option>
                      <option value="promo">Special Offer</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>To</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      style={styles.formInput}
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Message</label>
                    <textarea
                      placeholder="Write your SMS (160 chars)..."
                      style={styles.formTextarea}
                      rows={4}
                      maxLength={160}
                    />
                    <span style={styles.charCount}>0/160 characters</span>
                  </div>
                </>
              )}
            </div>

            <div style={styles.modalFooter}>
              <button
                style={styles.cancelBtn}
                onClick={() => setShowCompose(false)}
              >
                Cancel
              </button>
              <button style={styles.sendModalBtn}>
                <Send size={16} />
                Send {composeType === 'email' ? 'Email' : 'SMS'}
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
  embeddedContainer: {
    padding: '0'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    gap: '12px',
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
  statsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '16px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    marginBottom: '20px'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  statValue: {
    fontSize: '18px',
    fontWeight: 700
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  statDivider: {
    width: '1px',
    height: '32px',
    backgroundColor: 'var(--color-border)'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  filterTabs: {
    display: 'flex',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  filterTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  filterTabActive: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    width: '250px'
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  splitView: {
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    gap: '20px',
    height: 'calc(100vh - 320px)',
    minHeight: '500px'
  },
  messageList: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflowY: 'auto'
  },
  messageItem: {
    display: 'flex',
    gap: '12px',
    padding: '16px',
    borderBottom: '1px solid var(--color-border)',
    cursor: 'pointer',
    transition: 'background-color 0.15s'
  },
  messageItemSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)'
  },
  messageInbound: {
    borderLeft: '3px solid #22c55e'
  },
  messageTypeIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  messageContent: {
    flex: 1,
    minWidth: 0
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px'
  },
  messageDirection: {},
  inboundBadge: {
    padding: '2px 8px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '8px',
    fontSize: '10px',
    fontWeight: 600,
    color: '#22c55e'
  },
  outboundBadge: {
    padding: '2px 8px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '8px',
    fontSize: '10px',
    fontWeight: 600,
    color: '#3b82f6'
  },
  messageTime: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  messageSubject: {
    fontWeight: 600,
    fontSize: '14px',
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  messagePreview: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  messageFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '8px'
  },
  messageStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    textTransform: 'capitalize'
  },
  engagementBadges: {
    display: 'flex',
    gap: '6px'
  },
  engagementBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 6px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '6px',
    fontSize: '10px',
    color: '#22c55e'
  },
  campaignBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: '8px',
    fontSize: '10px',
    color: '#f59e0b',
    marginLeft: 'auto'
  },
  detailPanel: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid var(--color-border)'
  },
  detailTypeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  detailTypeIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailType: {
    display: 'block',
    fontWeight: 600,
    fontSize: '16px'
  },
  detailDirection: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  detailActions: {
    display: 'flex',
    gap: '8px'
  },
  detailActionBtn: {
    padding: '8px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  detailMeta: {
    padding: '16px 24px',
    backgroundColor: 'var(--color-surface-2)',
    borderBottom: '1px solid var(--color-border)'
  },
  metaRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '6px',
    fontSize: '13px'
  },
  metaLabel: {
    color: 'var(--color-text-muted)',
    width: '50px'
  },
  metaValue: {
    fontWeight: 500
  },
  detailSubject: {
    padding: '16px 24px',
    fontSize: '18px',
    fontWeight: 600,
    borderBottom: '1px solid var(--color-border)'
  },
  detailBody: {
    padding: '24px',
    fontSize: '14px',
    lineHeight: 1.7,
    whiteSpace: 'pre-wrap',
    flex: 1
  },
  engagementSection: {
    padding: '16px 24px',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface-2)'
  },
  engagementTitle: {
    fontSize: '13px',
    fontWeight: 600,
    margin: '0 0 12px 0',
    color: 'var(--color-text-muted)'
  },
  engagementGrid: {
    display: 'flex',
    gap: '24px'
  },
  engagementStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  engagementLabel: {
    fontSize: '13px',
    fontWeight: 500
  },
  engagementTime: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  callDetails: {
    display: 'flex',
    gap: '24px',
    padding: '16px 24px',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface-2)'
  },
  callStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px'
  },
  campaignInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    fontSize: '13px'
  },
  quickReply: {
    padding: '16px 24px',
    borderTop: '1px solid var(--color-border)'
  },
  replyTextarea: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    resize: 'none',
    outline: 'none',
    minHeight: '80px',
    boxSizing: 'border-box'
  },
  replyActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px'
  },
  attachBtn: {
    padding: '8px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  sendBtn: {
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
  noSelection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: '12px'
  },
  noSelectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0
  },
  noSelectionText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  // Modal styles
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
    maxWidth: '560px',
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
    width: '32px',
    height: '32px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  composeTypeTabs: {
    display: 'flex',
    padding: '16px 24px',
    gap: '12px',
    borderBottom: '1px solid var(--color-border)'
  },
  composeTypeTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: 'var(--color-surface-2)',
    border: '2px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    flex: 1,
    justifyContent: 'center'
  },
  composeTypeTabActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'var(--color-primary)',
    color: 'var(--color-primary)'
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
    boxSizing: 'border-box'
  },
  templateRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  templateLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  templateSelect: {
    flex: 1,
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none'
  },
  charCount: {
    display: 'block',
    textAlign: 'right',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginTop: '4px'
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
  sendModalBtn: {
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

export default CustomerCommunication;