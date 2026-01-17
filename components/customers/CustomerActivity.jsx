/**
 * CustomerActivity
 * 
 * Complete activity timeline for customers.
 * - Purchase history
 * - Communication log
 * - Loyalty events
 * - Support interactions
 * - Behavior tracking
 * - Milestones & achievements
 * 
 * Can be used standalone or embedded in CustomerDetail.
 */

import React, { useState, useEffect } from 'react';
import {
  Activity,
  ShoppingCart,
  Mail,
  MessageSquare,
  Phone,
  Gift,
  Award,
  Star,
  Heart,
  AlertTriangle,
  RefreshCw,
  Eye,
  MousePointer,
  LogIn,
  UserPlus,
  CreditCard,
  Truck,
  Package,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Calendar,
  Clock,
  Filter,
  Search,
  ChevronDown,
  ExternalLink,
  MoreHorizontal,
  Zap
} from 'lucide-react';

export function CustomerActivity({ customerId, embedded = false }) {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setActivities([
        {
          id: 1,
          type: 'purchase',
          title: 'Completed Purchase',
          description: 'Order #ORD-8847 - 3 items',
          amount: 245.00,
          timestamp: '2024-01-15T14:32:00Z',
          timeAgo: '2 hours ago',
          details: {
            orderId: 'ORD-8847',
            items: 3,
            paymentMethod: 'Visa •••• 4242'
          }
        },
        {
          id: 2,
          type: 'loyalty',
          title: 'Earned Reward Points',
          description: '+245 points from purchase',
          timestamp: '2024-01-15T14:32:00Z',
          timeAgo: '2 hours ago',
          details: {
            pointsEarned: 245,
            newBalance: 1890,
            reason: 'Purchase reward'
          }
        },
        {
          id: 3,
          type: 'email_opened',
          title: 'Opened Email',
          description: 'Winter Sale - 30% Off Everything',
          timestamp: '2024-01-15T10:15:00Z',
          timeAgo: '6 hours ago',
          details: {
            campaignId: 'CAMP-2024-012',
            subject: 'Winter Sale - 30% Off Everything',
            clickedLinks: 2
          }
        },
        {
          id: 4,
          type: 'site_visit',
          title: 'Visited Website',
          description: 'Viewed 8 pages • 12 min session',
          timestamp: '2024-01-15T10:12:00Z',
          timeAgo: '6 hours ago',
          details: {
            pagesViewed: 8,
            sessionDuration: '12:34',
            source: 'Email campaign'
          }
        },
        {
          id: 5,
          type: 'support',
          title: 'Support Ticket Resolved',
          description: 'Ticket #TKT-456 - Shipping inquiry',
          timestamp: '2024-01-14T16:45:00Z',
          timeAgo: 'Yesterday',
          details: {
            ticketId: 'TKT-456',
            category: 'Shipping',
            resolution: 'Provided tracking info',
            satisfaction: 'positive'
          }
        },
        {
          id: 6,
          type: 'review',
          title: 'Left a Review',
          description: '5 stars on Premium Widget',
          rating: 5,
          timestamp: '2024-01-14T14:20:00Z',
          timeAgo: 'Yesterday',
          details: {
            productId: 'PRO-001',
            productName: 'Premium Widget',
            rating: 5,
            reviewText: 'Excellent quality, fast shipping!'
          }
        },
        {
          id: 7,
          type: 'purchase',
          title: 'Completed Purchase',
          description: 'Order #ORD-8790 - 1 item',
          amount: 89.99,
          timestamp: '2024-01-12T11:30:00Z',
          timeAgo: '3 days ago',
          details: {
            orderId: 'ORD-8790',
            items: 1,
            paymentMethod: 'PayPal'
          }
        },
        {
          id: 8,
          type: 'loyalty_redeemed',
          title: 'Redeemed Points',
          description: '-500 points for $5 discount',
          timestamp: '2024-01-12T11:30:00Z',
          timeAgo: '3 days ago',
          details: {
            pointsRedeemed: 500,
            discountValue: 5.00,
            newBalance: 1645
          }
        },
        {
          id: 9,
          type: 'milestone',
          title: 'Reached Milestone!',
          description: 'Became a Loyal Customer',
          timestamp: '2024-01-10T09:00:00Z',
          timeAgo: '5 days ago',
          details: {
            milestone: 'loyal_customer',
            previousTier: 'Regular',
            newTier: 'Loyal',
            totalSpent: 1500
          }
        },
        {
          id: 10,
          type: 'email_clicked',
          title: 'Clicked Email Link',
          description: 'New Arrivals - Check Them Out',
          timestamp: '2024-01-08T15:22:00Z',
          timeAgo: '1 week ago',
          details: {
            campaignId: 'CAMP-2024-008',
            linkClicked: 'Shop New Arrivals',
            landingPage: '/collections/new'
          }
        },
        {
          id: 11,
          type: 'cart_abandoned',
          title: 'Abandoned Cart',
          description: '2 items worth $156.00',
          amount: 156.00,
          timestamp: '2024-01-07T18:45:00Z',
          timeAgo: '1 week ago',
          details: {
            items: 2,
            cartValue: 156.00,
            recovered: true,
            recoveryMethod: 'Email reminder'
          }
        },
        {
          id: 12,
          type: 'signup',
          title: 'Created Account',
          description: 'Signed up via website',
          timestamp: '2024-01-01T10:00:00Z',
          timeAgo: '2 weeks ago',
          details: {
            source: 'Organic',
            referrer: 'Google Search',
            device: 'Mobile'
          }
        }
      ]);
      setLoading(false);
    }, 400);
  }, [customerId]);

  const getActivityIcon = (type) => {
    const iconProps = { size: 18 };
    switch (type) {
      case 'purchase':
        return <ShoppingCart {...iconProps} />;
      case 'loyalty':
        return <Gift {...iconProps} />;
      case 'loyalty_redeemed':
        return <Award {...iconProps} />;
      case 'email_opened':
      case 'email_clicked':
        return <Mail {...iconProps} />;
      case 'site_visit':
        return <Eye {...iconProps} />;
      case 'support':
        return <MessageSquare {...iconProps} />;
      case 'review':
        return <Star {...iconProps} />;
      case 'milestone':
        return <Zap {...iconProps} />;
      case 'cart_abandoned':
        return <ShoppingCart {...iconProps} />;
      case 'signup':
        return <UserPlus {...iconProps} />;
      case 'login':
        return <LogIn {...iconProps} />;
      case 'refund':
        return <RefreshCw {...iconProps} />;
      default:
        return <Activity {...iconProps} />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'purchase':
        return '#22c55e';
      case 'loyalty':
      case 'loyalty_redeemed':
        return '#8b5cf6';
      case 'email_opened':
      case 'email_clicked':
        return '#3b82f6';
      case 'site_visit':
        return '#06b6d4';
      case 'support':
        return '#f59e0b';
      case 'review':
        return '#eab308';
      case 'milestone':
        return '#f97316';
      case 'cart_abandoned':
        return '#ef4444';
      case 'signup':
        return '#22c55e';
      case 'refund':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getActivityCategory = (type) => {
    switch (type) {
      case 'purchase':
      case 'cart_abandoned':
      case 'refund':
        return 'orders';
      case 'loyalty':
      case 'loyalty_redeemed':
      case 'milestone':
        return 'loyalty';
      case 'email_opened':
      case 'email_clicked':
        return 'email';
      case 'site_visit':
      case 'signup':
      case 'login':
        return 'engagement';
      case 'support':
      case 'review':
        return 'support';
      default:
        return 'other';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter activities
  const filteredActivities = activities.filter(activity => {
    if (filter !== 'all' && getActivityCategory(activity.type) !== filter) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // Group by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {});

  const filterOptions = [
    { value: 'all', label: 'All Activity' },
    { value: 'orders', label: 'Orders' },
    { value: 'loyalty', label: 'Loyalty' },
    { value: 'email', label: 'Email' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'support', label: 'Support' }
  ];

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Activity size={24} style={{ animation: 'pulse 1s ease-in-out infinite' }} />
        <p>Loading activity...</p>
      </div>
    );
  }

  return (
    <div style={embedded ? styles.embeddedContainer : styles.container}>
      {/* Header - only show if not embedded */}
      {!embedded && (
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.title}>Customer Activity</h1>
            <span style={styles.subtitle}>
              {filteredActivities.length} activities
            </span>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={styles.toolbar}>
        <div style={styles.filterTabs}>
          {filterOptions.map(option => (
            <button
              key={option.value}
              style={{
                ...styles.filterTab,
                ...(filter === option.value ? styles.filterTabActive : {})
              }}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div style={styles.searchBox}>
          <Search size={16} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Timeline */}
      <div style={styles.timeline}>
        {Object.keys(groupedActivities).length === 0 ? (
          <div style={styles.emptyState}>
            <Activity size={48} color="var(--color-text-muted)" />
            <h3 style={styles.emptyTitle}>No activities found</h3>
            <p style={styles.emptyMessage}>
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          Object.entries(groupedActivities).map(([date, dayActivities]) => (
            <div key={date} style={styles.dateGroup}>
              <div style={styles.dateHeader}>
                <Calendar size={14} />
                <span>{new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>

              <div style={styles.activitiesList}>
                {dayActivities.map((activity, index) => {
                  const color = getActivityColor(activity.type);
                  const isLast = index === dayActivities.length - 1;

                  return (
                    <div key={activity.id} style={styles.activityItem}>
                      {/* Timeline connector */}
                      <div style={styles.timelineConnector}>
                        <div style={{
                          ...styles.activityDot,
                          backgroundColor: color
                        }}>
                          {getActivityIcon(activity.type)}
                        </div>
                        {!isLast && <div style={styles.timelineLine} />}
                      </div>

                      {/* Activity content */}
                      <div style={styles.activityContent}>
                        <div style={styles.activityHeader}>
                          <span style={styles.activityTitle}>{activity.title}</span>
                          <span style={styles.activityTime}>{activity.timeAgo}</span>
                        </div>

                        <p style={styles.activityDescription}>
                          {activity.description}
                        </p>

                        {/* Amount if present */}
                        {activity.amount !== undefined && (
                          <div style={styles.activityAmount}>
                            {activity.type === 'cart_abandoned' ? (
                              <span style={{ color: '#ef4444' }}>
                                {formatCurrency(activity.amount)} abandoned
                                {activity.details?.recovered && (
                                  <span style={styles.recoveredBadge}>Recovered</span>
                                )}
                              </span>
                            ) : (
                              <span style={{ color: '#22c55e' }}>
                                {formatCurrency(activity.amount)}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Rating if present */}
                        {activity.rating && (
                          <div style={styles.ratingStars}>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={i < activity.rating ? '#eab308' : 'transparent'}
                                color={i < activity.rating ? '#eab308' : 'var(--color-text-muted)'}
                              />
                            ))}
                          </div>
                        )}

                        {/* Details panel */}
                        {activity.details && (
                          <div style={styles.activityDetails}>
                            {activity.details.orderId && (
                              <span style={styles.detailItem}>
                                Order: <a href="#" style={styles.detailLink}>{activity.details.orderId}</a>
                              </span>
                            )}
                            {activity.details.pointsEarned && (
                              <span style={styles.detailItem}>
                                <Gift size={12} /> +{activity.details.pointsEarned} pts
                              </span>
                            )}
                            {activity.details.pointsRedeemed && (
                              <span style={styles.detailItem}>
                                <Award size={12} /> -{activity.details.pointsRedeemed} pts
                              </span>
                            )}
                            {activity.details.newBalance !== undefined && (
                              <span style={styles.detailItem}>
                                Balance: {activity.details.newBalance} pts
                              </span>
                            )}
                            {activity.details.campaignId && (
                              <span style={styles.detailItem}>
                                Campaign: {activity.details.campaignId}
                              </span>
                            )}
                            {activity.details.ticketId && (
                              <span style={styles.detailItem}>
                                Ticket: <a href="#" style={styles.detailLink}>{activity.details.ticketId}</a>
                              </span>
                            )}
                            {activity.details.satisfaction && (
                              <span style={{
                                ...styles.detailItem,
                                color: activity.details.satisfaction === 'positive' ? '#22c55e' : '#ef4444'
                              }}>
                                {activity.details.satisfaction === 'positive' ? (
                                  <><ThumbsUp size={12} /> Satisfied</>
                                ) : (
                                  <><ThumbsDown size={12} /> Not Satisfied</>
                                )}
                              </span>
                            )}
                            {activity.details.newTier && (
                              <span style={styles.tierBadge}>
                                <Award size={12} />
                                {activity.details.previousTier} → {activity.details.newTier}
                              </span>
                            )}
                            {activity.details.source && activity.type === 'signup' && (
                              <span style={styles.detailItem}>
                                Source: {activity.details.source}
                              </span>
                            )}
                            {activity.details.device && (
                              <span style={styles.detailItem}>
                                Device: {activity.details.device}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div style={styles.activityActions}>
                        <button style={styles.actionIconBtn}>
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredActivities.length > 0 && (
        <div style={styles.loadMore}>
          <button style={styles.loadMoreBtn}>
            Load More Activity
          </button>
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
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '16px'
  },
  filterTabs: {
    display: 'flex',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  filterTab: {
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
  timeline: {},
  dateGroup: {
    marginBottom: '32px'
  },
  dateHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '1px solid var(--color-border)'
  },
  activitiesList: {},
  activityItem: {
    display: 'flex',
    gap: '16px',
    position: 'relative'
  },
  timelineConnector: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '40px',
    flexShrink: 0
  },
  activityDot: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    zIndex: 1
  },
  timelineLine: {
    width: '2px',
    flex: 1,
    backgroundColor: 'var(--color-border)',
    marginTop: '8px',
    marginBottom: '-8px'
  },
  activityContent: {
    flex: 1,
    paddingBottom: '24px'
  },
  activityHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '4px'
  },
  activityTitle: {
    fontWeight: 600,
    fontSize: '15px'
  },
  activityTime: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  activityDescription: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '0 0 8px 0'
  },
  activityAmount: {
    fontSize: '16px',
    fontWeight: 700,
    marginBottom: '8px'
  },
  recoveredBadge: {
    marginLeft: '8px',
    padding: '2px 8px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#22c55e'
  },
  ratingStars: {
    display: 'flex',
    gap: '2px',
    marginBottom: '8px'
  },
  activityDetails: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '8px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  detailLink: {
    color: 'var(--color-primary)',
    textDecoration: 'none',
    fontWeight: 500
  },
  tierBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#f97316'
  },
  activityActions: {
    flexShrink: 0
  },
  actionIconBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: '16px 0 8px 0'
  },
  emptyMessage: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  loadMore: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '24px'
  },
  loadMoreBtn: {
    padding: '12px 32px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  }
};

export default CustomerActivity;