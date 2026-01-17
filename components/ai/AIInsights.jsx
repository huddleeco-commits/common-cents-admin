/**
 * AIInsights
 * 
 * Proactive AI-generated insights and recommendations.
 * Categories:
 * - Opportunities (seasonal items, pricing power, trends)
 * - Alerts (low stock, negative reviews, issues)
 * - Recommendations (optimizations, improvements)
 * - Predictions (busy times, demand forecasting)
 * 
 * AI analyzes internal data + external signals to surface
 * actionable insights without being asked.
 */

import React, { useState } from 'react';
import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Target,
  Clock,
  DollarSign,
  Users,
  Star,
  Calendar,
  Zap,
  ChevronRight,
  Check,
  X,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Filter,
  Sparkles
} from 'lucide-react';

export function AIInsights({ insights: initialInsights, onAction }) {
  const [filter, setFilter] = useState('all');
  const [dismissedIds, setDismissedIds] = useState([]);
  const [actedIds, setActedIds] = useState([]);

  // Extended insights data
  const allInsights = [
    {
      id: 1,
      type: 'opportunity',
      priority: 'high',
      category: 'seasonal',
      title: 'Seasonal Menu Opportunity',
      message: 'Pumpkin spice searches are up 340% in Dallas this week. Adding seasonal items could boost revenue by 15-20%.',
      impact: '+$2,400/month estimated',
      confidence: 94,
      dataPoints: ['Google Trends', 'Local search data', 'Competitor menus'],
      action: {
        label: 'Add Seasonal Items',
        type: 'menu_update'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 min ago
    },
    {
      id: 2,
      type: 'competitor',
      priority: 'high',
      category: 'pricing',
      title: 'Competitor Price Increase',
      message: "Joe's Diner raised their burger prices by 12% yesterday. You now have pricing power - you're 18% below market average.",
      impact: '+$1,800/month if matched',
      confidence: 89,
      dataPoints: ["Joe's Diner menu", 'Local price analysis', 'Your sales data'],
      action: {
        label: 'Review Pricing',
        type: 'pricing_review'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
      id: 3,
      type: 'event',
      priority: 'medium',
      category: 'local',
      title: 'Dallas Marathon This Sunday',
      message: 'Expect 40% more foot traffic based on last year. Consider extended hours and extra staff.',
      impact: '+$3,200 revenue potential',
      confidence: 87,
      dataPoints: ['Event calendar', 'Last year performance', 'Location data'],
      action: {
        label: 'Prepare Promotion',
        type: 'create_promotion'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4) // 4 hours ago
    },
    {
      id: 4,
      type: 'alert',
      priority: 'high',
      category: 'inventory',
      title: 'Low Stock Alert',
      message: 'Burger buns running low - only 2 days of inventory left based on current sales velocity.',
      impact: 'Risk of stockout',
      confidence: 96,
      dataPoints: ['Inventory levels', 'Sales velocity', 'Supplier lead time'],
      action: {
        label: 'Reorder Now',
        type: 'inventory_order'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 min ago
    },
    {
      id: 5,
      type: 'optimization',
      priority: 'medium',
      category: 'menu',
      title: 'Underperforming Item',
      message: 'Garden Salad has sold only 8 units in 3 weeks. Consider removing or repositioning.',
      impact: 'Free up menu space',
      confidence: 91,
      dataPoints: ['Sales data', 'Menu analytics', 'Customer feedback'],
      action: {
        label: 'Review Item',
        type: 'menu_review'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 hours ago
    },
    {
      id: 6,
      type: 'opportunity',
      priority: 'medium',
      category: 'reviews',
      title: '2 New Positive Reviews',
      message: 'You received 2 five-star reviews today! Responding quickly boosts visibility by 35%.',
      impact: 'Improved reputation',
      confidence: 100,
      dataPoints: ['Google Reviews', 'Response rate data'],
      action: {
        label: 'Respond to Reviews',
        type: 'review_response'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 45) // 45 min ago
    },
    {
      id: 7,
      type: 'prediction',
      priority: 'low',
      category: 'demand',
      title: 'Busy Weekend Ahead',
      message: 'Based on weather (72°F, sunny) and local events, expect 25% higher traffic Saturday.',
      impact: 'Plan accordingly',
      confidence: 78,
      dataPoints: ['Weather forecast', 'Historical patterns', 'Event calendar'],
      action: {
        label: 'View Forecast',
        type: 'view_forecast'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8) // 8 hours ago
    },
    {
      id: 8,
      type: 'alert',
      priority: 'medium',
      category: 'website',
      title: 'Hours Mismatch',
      message: "Your website shows Monday as open, but you're actually closed. This may confuse customers.",
      impact: 'Customer experience',
      confidence: 100,
      dataPoints: ['Website data', 'brain.json settings'],
      action: {
        label: 'Fix Hours',
        type: 'update_hours'
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12 hours ago
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'opportunity': return TrendingUp;
      case 'competitor': return Target;
      case 'event': return Calendar;
      case 'alert': return AlertTriangle;
      case 'optimization': return Zap;
      case 'prediction': return Clock;
      default: return Lightbulb;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'opportunity': return '#22c55e';
      case 'competitor': return '#f97316';
      case 'event': return '#8b5cf6';
      case 'alert': return '#ef4444';
      case 'optimization': return '#3b82f6';
      case 'prediction': return '#06b6d4';
      default: return '#6b7280';
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high':
        return { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      case 'medium':
        return { backgroundColor: 'rgba(234, 179, 8, 0.1)', color: '#eab308' };
      case 'low':
        return { backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' };
      default:
        return { backgroundColor: 'var(--color-surface-2)', color: 'var(--color-text-muted)' };
    }
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const handleAction = (insight) => {
    setActedIds(prev => [...prev, insight.id]);
    onAction([{
      type: insight.action.type,
      insight: insight
    }]);
  };

  const handleDismiss = (id) => {
    setDismissedIds(prev => [...prev, id]);
  };

  const filteredInsights = allInsights
    .filter(i => !dismissedIds.includes(i.id))
    .filter(i => filter === 'all' || i.type === filter)
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const filterOptions = [
    { id: 'all', label: 'All', count: allInsights.filter(i => !dismissedIds.includes(i.id)).length },
    { id: 'opportunity', label: 'Opportunities', icon: TrendingUp },
    { id: 'competitor', label: 'Competitors', icon: Target },
    { id: 'alert', label: 'Alerts', icon: AlertTriangle },
    { id: 'event', label: 'Events', icon: Calendar },
    { id: 'optimization', label: 'Optimize', icon: Zap }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <Sparkles size={24} style={{ color: '#eab308' }} />
          <div>
            <h2 style={styles.title}>AI Insights</h2>
            <p style={styles.subtitle}>
              {filteredInsights.length} actionable insights based on your data
            </p>
          </div>
        </div>

        <div style={styles.headerRight}>
          <span style={styles.lastUpdated}>
            <Clock size={14} />
            Updated 5 min ago
          </span>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        {filterOptions.map(option => (
          <button
            key={option.id}
            style={{
              ...styles.filterButton,
              ...(filter === option.id ? styles.filterButtonActive : {})
            }}
            onClick={() => setFilter(option.id)}
          >
            {option.icon && <option.icon size={14} />}
            <span>{option.label}</span>
            {option.count && (
              <span style={styles.filterCount}>{option.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Stats Summary */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
            <DollarSign size={20} color="#22c55e" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>+$7,400</span>
            <span style={styles.statLabel}>Potential Revenue</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
            <AlertTriangle size={20} color="#ef4444" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>2</span>
            <span style={styles.statLabel}>Action Required</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
            <Target size={20} color="#3b82f6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>89%</span>
            <span style={styles.statLabel}>Avg Confidence</span>
          </div>
        </div>
      </div>

      {/* Insights List */}
      <div style={styles.insightsList}>
        {filteredInsights.map(insight => {
          const Icon = getTypeIcon(insight.type);
          const color = getTypeColor(insight.type);
          const isActed = actedIds.includes(insight.id);

          return (
            <div 
              key={insight.id} 
              style={{
                ...styles.insightCard,
                ...(isActed ? styles.insightCardActed : {})
              }}
            >
              {/* Priority Badge */}
              <div style={{
                ...styles.priorityBadge,
                ...getPriorityStyle(insight.priority)
              }}>
                {insight.priority.toUpperCase()}
              </div>

              <div style={styles.insightHeader}>
                <div style={{
                  ...styles.insightIcon,
                  backgroundColor: `${color}20`,
                  color: color
                }}>
                  <Icon size={20} />
                </div>

                <div style={styles.insightMeta}>
                  <span style={{ ...styles.insightType, color }}>
                    {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                  </span>
                  <span style={styles.insightTimestamp}>
                    {formatTimestamp(insight.timestamp)}
                  </span>
                </div>

                <button 
                  style={styles.dismissButton}
                  onClick={() => handleDismiss(insight.id)}
                >
                  <X size={16} />
                </button>
              </div>

              <h3 style={styles.insightTitle}>{insight.title}</h3>
              <p style={styles.insightMessage}>{insight.message}</p>

              {/* Impact & Confidence */}
              <div style={styles.insightStats}>
                <div style={styles.impactBadge}>
                  <TrendingUp size={14} />
                  {insight.impact}
                </div>
                <div style={styles.confidenceBadge}>
                  <span style={styles.confidenceBar}>
                    <span style={{
                      ...styles.confidenceFill,
                      width: `${insight.confidence}%`,
                      backgroundColor: insight.confidence > 85 ? '#22c55e' : 
                                       insight.confidence > 70 ? '#eab308' : '#ef4444'
                    }} />
                  </span>
                  <span>{insight.confidence}% confidence</span>
                </div>
              </div>

              {/* Data Sources */}
              <div style={styles.dataSources}>
                <span style={styles.dataSourcesLabel}>Based on:</span>
                {insight.dataPoints.map((point, i) => (
                  <span key={i} style={styles.dataSourceTag}>{point}</span>
                ))}
              </div>

              {/* Actions */}
              <div style={styles.insightActions}>
                {isActed ? (
                  <div style={styles.actedBadge}>
                    <Check size={16} />
                    Action Taken
                  </div>
                ) : (
                  <>
                    <button 
                      style={styles.actionButton}
                      onClick={() => handleAction(insight)}
                    >
                      {insight.action.label}
                      <ChevronRight size={16} />
                    </button>
                    <div style={styles.feedbackButtons}>
                      <button style={styles.feedbackButton}>
                        <ThumbsUp size={14} />
                      </button>
                      <button style={styles.feedbackButton}>
                        <ThumbsDown size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {filteredInsights.length === 0 && (
          <div style={styles.emptyState}>
            <Lightbulb size={48} style={{ opacity: 0.3 }} />
            <h3>No insights in this category</h3>
            <p>Check back later or try a different filter</p>
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
  headerRight: {
    display: 'flex',
    alignItems: 'center'
  },
  lastUpdated: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  filters: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '20px',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  filterButtonActive: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  filterCount: {
    padding: '2px 8px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '10px',
    fontSize: '11px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
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
  insightsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  insightCard: {
    position: 'relative',
    padding: '24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    transition: 'all 0.2s'
  },
  insightCardActed: {
    opacity: 0.6,
    backgroundColor: 'var(--color-surface-2)'
  },
  priorityBadge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: 700
  },
  insightHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  insightIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  insightMeta: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  insightType: {
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase'
  },
  insightTimestamp: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  dismissButton: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px',
    opacity: 0.5
  },
  insightTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: '0 0 8px 0'
  },
  insightMessage: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.6,
    margin: '0 0 16px 0'
  },
  insightStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px'
  },
  impactBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '8px',
    color: '#22c55e',
    fontSize: '13px',
    fontWeight: 500
  },
  confidenceBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  confidenceBar: {
    width: '60px',
    height: '6px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  confidenceFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s'
  },
  dataSources: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '20px'
  },
  dataSourcesLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  dataSourceTag: {
    padding: '4px 10px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px',
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  insightActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '16px',
    borderTop: '1px solid var(--color-border)'
  },
  actionButton: {
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
  actedBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '10px',
    color: '#22c55e',
    fontSize: '14px',
    fontWeight: 600
  },
  feedbackButtons: {
    display: 'flex',
    gap: '8px'
  },
  feedbackButton: {
    padding: '10px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'var(--color-text-muted)'
  }
};

export default AIInsights;