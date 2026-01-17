/**
 * AICompetitors
 * 
 * Competitor intelligence dashboard.
 * AI monitors nearby competitors and surfaces:
 * - Price changes and comparisons
 * - Review trends and sentiment
 * - Menu/product changes
 * - Marketing activities
 * - Strengths and weaknesses
 * 
 * Helps business owners stay competitive with data-driven insights.
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Target,
  MapPin,
  Star,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Plus,
  ChevronDown,
  ChevronUp,
  Eye,
  AlertCircle,
  Check,
  Minus,
  Loader
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

export function AICompetitors({ onAction }) {
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);
  const [expandedSection, setExpandedSection] = useState('overview');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch competitors from API
  const fetchCompetitors = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/competitors`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Transform API data to match component expectations
        const transformed = (data.data || []).map(c => ({
          id: c.id,
          name: c.name,
          distance: parseFloat(c.distance) || 0,
          type: c.type || 'Direct Competitor',
          threat: c.threat_level || 'medium',
          rating: parseFloat(c.rating) || 0,
          ratingChange: parseFloat(c.rating_change) || 0,
          reviewCount: c.review_count || 0,
          priceLevel: c.avg_price > 30 ? '$$$' : c.avg_price > 15 ? '$$' : '$',
          avgPrice: parseFloat(c.avg_price) || 0,
          yourAvgPrice: 12.99, // This could come from your own products API
          priceDiff: c.price_diff || 0,
          recentChanges: [], // Could be expanded later
          strengths: c.strengths || [],
          weaknesses: c.weaknesses || [],
          topItems: c.top_items || [],
          sentiment: c.sentiment || { positive: 50, neutral: 30, negative: 20 }
        }));
        setCompetitors(transformed);
        setLastUpdated(new Date());
      } else if (response.status === 401 || response.status === 403) {
        setError('Authentication required');
      } else {
        setError('Failed to load competitors');
      }
    } catch (err) {
      console.error('Error fetching competitors:', err);
      setError('Unable to connect to API');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (API_URL) {
      fetchCompetitors();
    } else {
      setLoading(false);
      setError('API URL not configured');
    }
  }, [fetchCompetitors]);

  const yourBusiness = {
    name: 'Your Restaurant',
    rating: 4.5,
    reviewCount: 287,
    avgPrice: 12.99,
    priceLevel: '$$'
  };

  const getThreatColor = (threat) => {
    switch (threat) {
      case 'high': return '#ef4444';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'price': return DollarSign;
      case 'menu': return Plus;
      case 'promo': return Target;
      case 'loyalty': return Star;
      case 'hours': return RefreshCw;
      default: return AlertCircle;
    }
  };

  const handleComparePrice = (competitor, item) => {
    onAction([{
      type: 'price_comparison',
      competitor: competitor.name,
      item: item.name,
      theirPrice: item.price,
      yourPrice: item.yourPrice
    }]);
  };

  const handleMatchPromotion = (competitor) => {
    onAction([{
      type: 'create_promotion',
      reason: `Match ${competitor.name}'s promotion`,
      competitor: competitor.name
    }]);
  };

  // Loading state
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingState}>
          <Loader size={32} style={{ animation: 'spin 1s linear infinite' }} />
          <p>Loading competitor data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorState}>
          <AlertCircle size={32} color="#ef4444" />
          <p>{error}</p>
          <button style={styles.refreshButton} onClick={fetchCompetitors}>
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (competitors.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.emptyState}>
          <Target size={48} color="var(--color-text-muted)" />
          <h3>No Competitors Tracked</h3>
          <p>Add competitors to start monitoring your competitive landscape</p>
          <button style={styles.addCompetitorButton}>
            <Plus size={18} />
            Add First Competitor
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <Target size={24} style={{ color: '#f97316' }} />
          <div>
            <h2 style={styles.title}>Competitor Intelligence</h2>
            <p style={styles.subtitle}>
              Monitoring {competitors.length} competitor{competitors.length !== 1 ? 's' : ''} within 1 mile
            </p>
          </div>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.lastUpdated}>
            <RefreshCw size={14} />
            Updated {lastUpdated.toLocaleTimeString()}
          </span>
          <button style={styles.refreshButton} onClick={fetchCompetitors}>
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Your Position Summary */}
      <div style={styles.positionCard}>
        <h3 style={styles.positionTitle}>Your Competitive Position</h3>
        <div style={styles.positionGrid}>
          <div style={styles.positionStat}>
            <div style={styles.positionComparison}>
              <span style={styles.positionValue}>{yourBusiness.rating}</span>
              <Star size={20} fill="#eab308" color="#eab308" />
            </div>
            <span style={styles.positionLabel}>Your Rating</span>
            <span style={styles.positionContext}>
              <TrendingUp size={12} color="#22c55e" />
              Above 2 of 3 competitors
            </span>
          </div>
          <div style={styles.positionStat}>
            <div style={styles.positionComparison}>
              <span style={styles.positionValue}>${yourBusiness.avgPrice}</span>
            </div>
            <span style={styles.positionLabel}>Avg Price</span>
            <span style={styles.positionContext}>
              <TrendingDown size={12} color="#22c55e" />
              13% below market avg
            </span>
          </div>
          <div style={styles.positionStat}>
            <div style={styles.positionComparison}>
              <span style={styles.positionValue}>{yourBusiness.reviewCount}</span>
            </div>
            <span style={styles.positionLabel}>Reviews</span>
            <span style={styles.positionContext}>
              <Minus size={12} color="#eab308" />
              Middle of pack
            </span>
          </div>
          <div style={styles.positionStat}>
            <div style={styles.positionComparison}>
              <span style={{ ...styles.positionValue, color: '#22c55e' }}>Strong</span>
            </div>
            <span style={styles.positionLabel}>Overall Position</span>
            <span style={styles.positionContext}>
              Value leader in area
            </span>
          </div>
        </div>
      </div>

      {/* Competitor Cards */}
      <div style={styles.competitorsList}>
        {competitors.map(competitor => (
          <div 
            key={competitor.id}
            style={{
              ...styles.competitorCard,
              ...(selectedCompetitor === competitor.id ? styles.competitorCardSelected : {})
            }}
          >
            {/* Competitor Header */}
            <div 
              style={styles.competitorHeader}
              onClick={() => setSelectedCompetitor(
                selectedCompetitor === competitor.id ? null : competitor.id
              )}
            >
              <div style={styles.competitorInfo}>
                <div style={styles.competitorName}>
                  <h3>{competitor.name}</h3>
                  <span style={{
                    ...styles.threatBadge,
                    backgroundColor: `${getThreatColor(competitor.threat)}20`,
                    color: getThreatColor(competitor.threat)
                  }}>
                    {competitor.threat} threat
                  </span>
                </div>
                <div style={styles.competitorMeta}>
                  <span><MapPin size={12} /> {competitor.distance} mi</span>
                  <span>{competitor.type}</span>
                  <span>{competitor.priceLevel}</span>
                </div>
              </div>

              <div style={styles.competitorStats}>
                <div style={styles.competitorStat}>
                  <div style={styles.ratingDisplay}>
                    <Star size={16} fill="#eab308" color="#eab308" />
                    <span style={styles.ratingValue}>{competitor.rating}</span>
                    {competitor.ratingChange !== 0 && (
                      <span style={{
                        ...styles.ratingChange,
                        color: competitor.ratingChange > 0 ? '#22c55e' : '#ef4444'
                      }}>
                        {competitor.ratingChange > 0 ? '+' : ''}{competitor.ratingChange}
                      </span>
                    )}
                  </div>
                  <span style={styles.statLabel}>{competitor.reviewCount} reviews</span>
                </div>

                <div style={styles.competitorStat}>
                  <span style={styles.priceValue}>${competitor.avgPrice}</span>
                  <span style={{
                    ...styles.priceDiff,
                    color: competitor.priceDiff < 0 ? '#22c55e' : '#ef4444'
                  }}>
                    You're {Math.abs(competitor.priceDiff)}% {competitor.priceDiff < 0 ? 'lower' : 'higher'}
                  </span>
                </div>

                <button style={styles.expandButton}>
                  {selectedCompetitor === competitor.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
            </div>

            {/* Expanded Content */}
            {selectedCompetitor === competitor.id && (
              <div style={styles.competitorExpanded}>
                {/* Recent Changes */}
                <div style={styles.section}>
                  <h4 style={styles.sectionTitle}>
                    <AlertCircle size={16} />
                    Recent Changes
                  </h4>
                  <div style={styles.changesList}>
                    {competitor.recentChanges.map((change, i) => {
                      const Icon = getChangeIcon(change.type);
                      return (
                        <div key={i} style={styles.changeItem}>
                          <div style={styles.changeIcon}>
                            <Icon size={14} />
                          </div>
                          <span style={styles.changeMessage}>{change.message}</span>
                          <span style={styles.changeDate}>{change.date}</span>
                        </div>
                      );
                    })}
                  </div>
                  {competitor.recentChanges.some(c => c.type === 'promo') && (
                    <button 
                      style={styles.matchButton}
                      onClick={() => handleMatchPromotion(competitor)}
                    >
                      <Target size={14} />
                      Create Counter-Promotion
                    </button>
                  )}
                </div>

                {/* Price Comparison */}
                <div style={styles.section}>
                  <h4 style={styles.sectionTitle}>
                    <DollarSign size={16} />
                    Price Comparison
                  </h4>
                  <div style={styles.priceTable}>
                    <div style={styles.priceTableHeader}>
                      <span>Item</span>
                      <span>Their Price</span>
                      <span>Your Price</span>
                      <span>Diff</span>
                    </div>
                    {competitor.topItems.map((item, i) => (
                      <div key={i} style={styles.priceTableRow}>
                        <span style={styles.itemName}>{item.name}</span>
                        <span>${item.price}</span>
                        <span>{item.yourPrice ? `$${item.yourPrice}` : '—'}</span>
                        <span style={{
                          color: item.yourPrice 
                            ? item.yourPrice < item.price ? '#22c55e' : '#ef4444'
                            : 'var(--color-text-muted)'
                        }}>
                          {item.yourPrice 
                            ? `${item.yourPrice < item.price ? '-' : '+'}${Math.abs(Math.round((item.yourPrice - item.price) / item.price * 100))}%`
                            : 'N/A'
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div style={styles.swotGrid}>
                  <div style={styles.swotSection}>
                    <h4 style={{ ...styles.sectionTitle, color: '#22c55e' }}>
                      <TrendingUp size={16} />
                      Their Strengths
                    </h4>
                    <ul style={styles.swotList}>
                      {competitor.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={styles.swotSection}>
                    <h4 style={{ ...styles.sectionTitle, color: '#ef4444' }}>
                      <TrendingDown size={16} />
                      Their Weaknesses
                    </h4>
                    <ul style={styles.swotList}>
                      {competitor.weaknesses.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Review Sentiment */}
                <div style={styles.section}>
                  <h4 style={styles.sectionTitle}>
                    <Star size={16} />
                    Review Sentiment
                  </h4>
                  <div style={styles.sentimentBar}>
                    <div style={{
                      ...styles.sentimentSegment,
                      width: `${competitor.sentiment.positive}%`,
                      backgroundColor: '#22c55e'
                    }}>
                      {competitor.sentiment.positive}%
                    </div>
                    <div style={{
                      ...styles.sentimentSegment,
                      width: `${competitor.sentiment.neutral}%`,
                      backgroundColor: '#eab308'
                    }}>
                      {competitor.sentiment.neutral}%
                    </div>
                    <div style={{
                      ...styles.sentimentSegment,
                      width: `${competitor.sentiment.negative}%`,
                      backgroundColor: '#ef4444'
                    }}>
                      {competitor.sentiment.negative}%
                    </div>
                  </div>
                  <div style={styles.sentimentLabels}>
                    <span><span style={{ color: '#22c55e' }}>●</span> Positive</span>
                    <span><span style={{ color: '#eab308' }}>●</span> Neutral</span>
                    <span><span style={{ color: '#ef4444' }}>●</span> Negative</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={styles.competitorActions}>
                  <button style={styles.viewProfileButton}>
                    <ExternalLink size={14} />
                    View Full Profile
                  </button>
                  <button style={styles.trackButton}>
                    <Eye size={14} />
                    Track Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Competitor */}
      <button style={styles.addCompetitorButton}>
        <Plus size={18} />
        Add Competitor to Track
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  loadingState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    gap: '16px',
    color: 'var(--color-text-muted)'
  },
  errorState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    gap: '16px',
    color: 'var(--color-text-muted)'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    gap: '16px',
    textAlign: 'center',
    color: 'var(--color-text-muted)'
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
    alignItems: 'center',
    gap: '16px'
  },
  lastUpdated: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  refreshButton: {
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
  positionCard: {
    padding: '24px',
    backgroundColor: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
    background: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  positionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 20px 0'
  },
  positionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px'
  },
  positionStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  positionComparison: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  positionValue: {
    fontSize: '28px',
    fontWeight: 700
  },
  positionLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  positionContext: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  competitorsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  competitorCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden',
    transition: 'all 0.2s'
  },
  competitorCardSelected: {
    borderColor: 'var(--color-primary)'
  },
  competitorHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    cursor: 'pointer'
  },
  competitorInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  competitorName: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  threatBadge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase'
  },
  competitorMeta: {
    display: 'flex',
    gap: '16px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  competitorStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px'
  },
  competitorStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px'
  },
  ratingDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  ratingValue: {
    fontSize: '18px',
    fontWeight: 700
  },
  ratingChange: {
    fontSize: '12px',
    fontWeight: 600
  },
  statLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  priceValue: {
    fontSize: '18px',
    fontWeight: 700
  },
  priceDiff: {
    fontSize: '12px',
    fontWeight: 500
  },
  expandButton: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  competitorExpanded: {
    padding: '0 24px 24px',
    borderTop: '1px solid var(--color-border)'
  },
  section: {
    padding: '20px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 600,
    margin: '0 0 16px 0'
  },
  changesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  changeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px'
  },
  changeIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: 'var(--color-surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)'
  },
  changeMessage: {
    flex: 1,
    fontSize: '14px'
  },
  changeDate: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  matchButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '16px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  priceTable: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  priceTableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '16px',
    padding: '8px 12px',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    fontWeight: 600
  },
  priceTableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '16px',
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    fontSize: '14px'
  },
  itemName: {
    fontWeight: 500
  },
  swotGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    padding: '20px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  swotSection: {},
  swotList: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.8
  },
  sentimentBar: {
    display: 'flex',
    height: '32px',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  sentimentSegment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 600
  },
  sentimentLabels: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    marginTop: '12px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  competitorActions: {
    display: 'flex',
    gap: '12px',
    paddingTop: '20px'
  },
  viewProfileButton: {
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
  trackButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    cursor: 'pointer'
  },
  addCompetitorButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '16px',
    backgroundColor: 'transparent',
    border: '2px dashed var(--color-border)',
    borderRadius: '12px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  }
};

export default AICompetitors;