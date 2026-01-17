/**
 * AIHistory
 * 
 * Complete audit log of all AI actions.
 * - Every change AI made or suggested
 * - User approvals and rejections
 * - Automated task runs
 * - Insights generated
 * - Conversations and decisions
 * 
 * Full transparency and accountability.
 */

import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  Calendar,
  Check,
  X,
  Eye,
  RotateCcw,
  MessageSquare,
  Zap,
  Target,
  DollarSign,
  Package,
  Star,
  FileText,
  Clock,
  ChevronDown,
  ChevronRight,
  Download,
  AlertCircle,
  Bot,
  User
} from 'lucide-react';

export function AIHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('7days');
  const [expandedItems, setExpandedItems] = useState([]);

  // History data
  const historyItems = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: 'change',
      category: 'menu',
      title: 'Added 2 seasonal menu items',
      description: 'Added Pumpkin Spice Latte ($5.49) and Maple Bacon Burger ($14.99) to menu',
      status: 'applied',
      initiatedBy: 'user',
      conversation: [
        { role: 'user', message: 'Add some seasonal items to the menu' },
        { role: 'assistant', message: 'I suggest adding Pumpkin Spice Latte and Maple Bacon Burger based on local trends.' },
        { role: 'user', message: 'Yes, add both' }
      ],
      changes: [
        { field: 'menu.items', action: 'add', value: 'Pumpkin Spice Latte - $5.49' },
        { field: 'menu.items', action: 'add', value: 'Maple Bacon Burger - $14.99' },
        { field: 'menu.featured', action: 'update', value: 'Set as featured for 2 weeks' }
      ],
      impact: '+$240 revenue in first 24 hours'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      type: 'task',
      category: 'monitoring',
      title: 'Competitor price check completed',
      description: 'Scanned 3 competitors, detected 1 price change',
      status: 'completed',
      initiatedBy: 'automation',
      details: {
        competitorsScanned: 3,
        changesDetected: 1,
        alerts: ["Joe's Diner raised burger prices 12%"]
      }
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      type: 'insight',
      category: 'opportunity',
      title: 'Seasonal opportunity identified',
      description: 'Detected pumpkin spice trend (+340%) in local area',
      status: 'acted',
      initiatedBy: 'ai',
      recommendation: 'Add seasonal pumpkin items to menu',
      confidence: 94,
      dataPoints: ['Google Trends', 'Local search data', 'Competitor analysis']
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      type: 'change',
      category: 'content',
      title: 'Updated business hours',
      description: 'Fixed Monday hours (was showing open, now correctly closed)',
      status: 'applied',
      initiatedBy: 'user',
      conversation: [
        { role: 'assistant', message: 'I noticed your website shows Monday as open, but your settings say closed.' },
        { role: 'user', message: 'Fix it please' }
      ],
      changes: [
        { field: 'hours.monday', action: 'update', value: 'Closed' }
      ]
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
      type: 'task',
      category: 'report',
      title: 'Daily performance report generated',
      description: 'Generated and emailed daily summary',
      status: 'completed',
      initiatedBy: 'automation',
      details: {
        revenue: '$1,245',
        orders: 47,
        avgRating: 4.6,
        emailSent: true
      }
    },
    {
      id: 6,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      type: 'change',
      category: 'pricing',
      title: 'Price adjustment suggested',
      description: 'Recommended 5% price increase on burgers',
      status: 'rejected',
      initiatedBy: 'ai',
      conversation: [
        { role: 'assistant', message: 'Competitors raised prices. You have room for 5% increase.' },
        { role: 'user', message: 'Not right now, maybe next month' }
      ],
      recommendation: 'Increase burger prices by 5%',
      rejectionReason: 'User deferred to next month'
    },
    {
      id: 7,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18),
      type: 'task',
      category: 'reviews',
      title: 'Review response drafted',
      description: 'Drafted response to 5-star review from John D.',
      status: 'pending',
      initiatedBy: 'automation',
      details: {
        reviewerName: 'John D.',
        rating: 5,
        draftResponse: 'Thank you so much for your kind words, John! We\'re thrilled you enjoyed...'
      }
    },
    {
      id: 8,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      type: 'insight',
      category: 'alert',
      title: 'Low stock alert',
      description: 'Burger buns inventory below threshold',
      status: 'acted',
      initiatedBy: 'ai',
      recommendation: 'Reorder burger buns - only 2 days of inventory left',
      actionTaken: 'User placed order with supplier'
    },
    {
      id: 9,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36),
      type: 'change',
      category: 'settings',
      title: 'Email notifications updated',
      description: 'Enabled daily report emails',
      status: 'applied',
      initiatedBy: 'user',
      changes: [
        { field: 'notifications.dailyReport', action: 'update', value: 'Enabled' },
        { field: 'notifications.email', action: 'update', value: 'owner@restaurant.com' }
      ]
    },
    {
      id: 10,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      type: 'task',
      category: 'seo',
      title: 'SEO health check completed',
      description: 'Weekly SEO analysis found 2 improvements',
      status: 'completed',
      initiatedBy: 'automation',
      details: {
        score: 87,
        improvements: [
          'Add alt text to 3 images',
          'Update meta description'
        ]
      }
    }
  ];

  const typeFilters = [
    { id: 'all', label: 'All Activity' },
    { id: 'change', label: 'Changes' },
    { id: 'task', label: 'Tasks' },
    { id: 'insight', label: 'Insights' }
  ];

  const statusFilters = [
    { id: 'all', label: 'All Status' },
    { id: 'applied', label: 'Applied' },
    { id: 'completed', label: 'Completed' },
    { id: 'rejected', label: 'Rejected' },
    { id: 'pending', label: 'Pending' }
  ];

  const dateFilters = [
    { id: '24hours', label: 'Last 24 hours' },
    { id: '7days', label: 'Last 7 days' },
    { id: '30days', label: 'Last 30 days' },
    { id: 'all', label: 'All time' }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'menu': return Package;
      case 'pricing': return DollarSign;
      case 'monitoring': return Target;
      case 'report': return FileText;
      case 'reviews': return Star;
      case 'opportunity': return Zap;
      case 'alert': return AlertCircle;
      case 'content': return FileText;
      case 'settings': return Clock;
      case 'seo': return Search;
      default: return History;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'menu': return '#22c55e';
      case 'pricing': return '#eab308';
      case 'monitoring': return '#f97316';
      case 'report': return '#3b82f6';
      case 'reviews': return '#eab308';
      case 'opportunity': return '#22c55e';
      case 'alert': return '#ef4444';
      case 'content': return '#8b5cf6';
      case 'settings': return '#6b7280';
      case 'seo': return '#06b6d4';
      default: return '#6b7280';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'applied':
        return { backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', icon: Check };
      case 'completed':
        return { backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', icon: Check };
      case 'rejected':
        return { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', icon: X };
      case 'pending':
        return { backgroundColor: 'rgba(234, 179, 8, 0.1)', color: '#eab308', icon: Clock };
      case 'acted':
        return { backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', icon: Zap };
      default:
        return { backgroundColor: 'var(--color-surface-2)', color: 'var(--color-text-muted)', icon: History };
    }
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (hours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const toggleExpand = (id) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredItems = historyItems
    .filter(item => filterType === 'all' || item.type === filterType)
    .filter(item => filterStatus === 'all' || item.status === filterStatus)
    .filter(item => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(query) || 
             item.description.toLowerCase().includes(query);
    });

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <History size={24} style={{ color: '#6b7280' }} />
          <div>
            <h2 style={styles.title}>Activity History</h2>
            <p style={styles.subtitle}>
              Complete log of all AI actions and changes
            </p>
          </div>
        </div>
        <button style={styles.exportButton}>
          <Download size={16} />
          Export Log
        </button>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.searchBox}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filterGroup}>
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            style={styles.filterSelect}
          >
            {typeFilters.map(f => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>

          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={styles.filterSelect}
          >
            {statusFilters.map(f => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>

          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            style={styles.filterSelect}
          >
            {dateFilters.map(f => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div style={styles.statsRow}>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>{historyItems.length}</span>
          <span style={styles.statText}>Total Actions</span>
        </div>
        <div style={styles.statDivider} />
        <div style={styles.statItem}>
          <span style={{ ...styles.statNumber, color: '#22c55e' }}>
            {historyItems.filter(i => i.status === 'applied' || i.status === 'completed').length}
          </span>
          <span style={styles.statText}>Completed</span>
        </div>
        <div style={styles.statDivider} />
        <div style={styles.statItem}>
          <span style={{ ...styles.statNumber, color: '#eab308' }}>
            {historyItems.filter(i => i.status === 'pending').length}
          </span>
          <span style={styles.statText}>Pending</span>
        </div>
        <div style={styles.statDivider} />
        <div style={styles.statItem}>
          <span style={{ ...styles.statNumber, color: '#ef4444' }}>
            {historyItems.filter(i => i.status === 'rejected').length}
          </span>
          <span style={styles.statText}>Rejected</span>
        </div>
      </div>

      {/* Timeline */}
      <div style={styles.timeline}>
        {filteredItems.map((item, index) => {
          const CategoryIcon = getCategoryIcon(item.category);
          const categoryColor = getCategoryColor(item.category);
          const statusStyle = getStatusStyle(item.status);
          const StatusIcon = statusStyle.icon;
          const isExpanded = expandedItems.includes(item.id);

          return (
            <div key={item.id} style={styles.timelineItem}>
              {/* Timeline Line */}
              {index < filteredItems.length - 1 && (
                <div style={styles.timelineLine} />
              )}

              {/* Timeline Dot */}
              <div style={{
                ...styles.timelineDot,
                backgroundColor: categoryColor
              }}>
                <CategoryIcon size={14} color="#ffffff" />
              </div>

              {/* Content */}
              <div style={styles.timelineContent}>
                <div 
                  style={styles.timelineHeader}
                  onClick={() => toggleExpand(item.id)}
                >
                  <div style={styles.timelineInfo}>
                    <h4 style={styles.timelineTitle}>{item.title}</h4>
                    <p style={styles.timelineDescription}>{item.description}</p>
                    <div style={styles.timelineMeta}>
                      <span style={styles.timelineTime}>
                        <Clock size={12} />
                        {formatTimestamp(item.timestamp)}
                      </span>
                      <span style={styles.timelineInitiator}>
                        {item.initiatedBy === 'user' ? <User size={12} /> : 
                         item.initiatedBy === 'ai' ? <Bot size={12} /> : 
                         <Clock size={12} />}
                        {item.initiatedBy === 'user' ? 'You' : 
                         item.initiatedBy === 'ai' ? 'AI Suggested' : 
                         'Automated'}
                      </span>
                    </div>
                  </div>

                  <div style={styles.timelineActions}>
                    <div style={{
                      ...styles.statusBadge,
                      backgroundColor: statusStyle.backgroundColor,
                      color: statusStyle.color
                    }}>
                      <StatusIcon size={12} />
                      {item.status}
                    </div>
                    <button style={styles.expandButton}>
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={styles.timelineExpanded}>
                    {/* Conversation */}
                    {item.conversation && (
                      <div style={styles.expandedSection}>
                        <h5 style={styles.expandedSectionTitle}>
                          <MessageSquare size={14} />
                          Conversation
                        </h5>
                        <div style={styles.conversationList}>
                          {item.conversation.map((msg, i) => (
                            <div key={i} style={styles.conversationItem}>
                              <div style={{
                                ...styles.conversationAvatar,
                                backgroundColor: msg.role === 'user' ? 'var(--color-surface-2)' : 'var(--color-primary)'
                              }}>
                                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                              </div>
                              <span style={styles.conversationMessage}>{msg.message}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Changes Made */}
                    {item.changes && (
                      <div style={styles.expandedSection}>
                        <h5 style={styles.expandedSectionTitle}>
                          <Zap size={14} />
                          Changes Made
                        </h5>
                        <div style={styles.changesList}>
                          {item.changes.map((change, i) => (
                            <div key={i} style={styles.changeItem}>
                              <span style={{
                                ...styles.changeAction,
                                color: change.action === 'add' ? '#22c55e' : 
                                       change.action === 'update' ? '#3b82f6' : '#ef4444'
                              }}>
                                {change.action.toUpperCase()}
                              </span>
                              <span style={styles.changeField}>{change.field}</span>
                              <span style={styles.changeValue}>{change.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Task Details */}
                    {item.details && (
                      <div style={styles.expandedSection}>
                        <h5 style={styles.expandedSectionTitle}>
                          <FileText size={14} />
                          Details
                        </h5>
                        <div style={styles.detailsGrid}>
                          {Object.entries(item.details).map(([key, value]) => (
                            <div key={key} style={styles.detailItem}>
                              <span style={styles.detailKey}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span style={styles.detailValue}>
                                {Array.isArray(value) ? value.join(', ') : 
                                 typeof value === 'boolean' ? (value ? 'Yes' : 'No') : 
                                 value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Impact */}
                    {item.impact && (
                      <div style={styles.impactBanner}>
                        <Zap size={16} />
                        <span>Impact: {item.impact}</span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div style={styles.expandedActions}>
                      {item.status === 'applied' && (
                        <button style={styles.revertButton}>
                          <RotateCcw size={14} />
                          Revert Change
                        </button>
                      )}
                      {item.status === 'pending' && (
                        <>
                          <button style={styles.approveButton}>
                            <Check size={14} />
                            Approve
                          </button>
                          <button style={styles.rejectButton}>
                            <X size={14} />
                            Reject
                          </button>
                        </>
                      )}
                      <button style={styles.viewDetailsButton}>
                        <Eye size={14} />
                        View Full Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div style={styles.emptyState}>
            <History size={48} style={{ opacity: 0.3 }} />
            <h3>No activity found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        )}
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
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    margin: 0
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0'
  },
  exportButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  filters: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px'
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  filterGroup: {
    display: 'flex',
    gap: '12px'
  },
  filterSelect: {
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none'
  },
  statsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '20px 24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: 700
  },
  statText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  statDivider: {
    width: '1px',
    height: '32px',
    backgroundColor: 'var(--color-border)'
  },
  timeline: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
  },
  timelineItem: {
    position: 'relative',
    display: 'flex',
    gap: '20px',
    paddingLeft: '40px'
  },
  timelineLine: {
    position: 'absolute',
    left: '15px',
    top: '40px',
    bottom: '-20px',
    width: '2px',
    backgroundColor: 'var(--color-border)'
  },
  timelineDot: {
    position: 'absolute',
    left: '4px',
    top: '20px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  timelineContent: {
    flex: 1,
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    marginBottom: '20px',
    overflow: 'hidden'
  },
  timelineHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '20px',
    cursor: 'pointer'
  },
  timelineInfo: {
    flex: 1
  },
  timelineTitle: {
    fontSize: '15px',
    fontWeight: 600,
    margin: '0 0 4px 0'
  },
  timelineDescription: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: '0 0 12px 0'
  },
  timelineMeta: {
    display: 'flex',
    gap: '16px'
  },
  timelineTime: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  timelineInitiator: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  timelineActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  expandButton: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  timelineExpanded: {
    padding: '0 20px 20px',
    borderTop: '1px solid var(--color-border)'
  },
  expandedSection: {
    paddingTop: '20px'
  },
  expandedSectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 600,
    margin: '0 0 12px 0',
    color: 'var(--color-text-muted)'
  },
  conversationList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  conversationItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },
  conversationAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    flexShrink: 0
  },
  conversationMessage: {
    fontSize: '13px',
    lineHeight: 1.5,
    color: 'var(--color-text)'
  },
  changesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  changeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    fontSize: '13px'
  },
  changeAction: {
    fontWeight: 700,
    fontSize: '10px'
  },
  changeField: {
    fontFamily: 'monospace',
    color: 'var(--color-text-muted)'
  },
  changeValue: {
    flex: 1,
    textAlign: 'right'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px'
  },
  detailKey: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    textTransform: 'capitalize'
  },
  detailValue: {
    fontSize: '14px',
    fontWeight: 500
  },
  impactBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '20px',
    padding: '14px 16px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '10px',
    color: '#22c55e',
    fontSize: '14px',
    fontWeight: 500
  },
  expandedActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid var(--color-border)'
  },
  revertButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    color: '#ef4444',
    fontSize: '13px',
    cursor: 'pointer'
  },
  approveButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: '#22c55e',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    cursor: 'pointer'
  },
  rejectButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    color: '#ef4444',
    fontSize: '13px',
    cursor: 'pointer'
  },
  viewDetailsButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'var(--color-text-muted)'
  }
};

export default AIHistory;