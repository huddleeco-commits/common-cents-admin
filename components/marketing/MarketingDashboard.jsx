/**
 * MarketingDashboard
 * 
 * Marketing command center with:
 * - Campaign performance overview
 * - Active promotions
 * - Email/SMS metrics
 * - Automation status
 * - ROI tracking
 * - Audience insights
 * - Quick actions
 * - AI recommendations
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Megaphone,
  Mail,
  MessageSquare,
  Bell,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Eye,
  MousePointer,
  ShoppingCart,
  Percent,
  Tag,
  Zap,
  Calendar,
  Clock,
  Play,
  Pause,
  Plus,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Send,
  Target,
  Award,
  Gift,
  Sparkles,
  BarChart3,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ExternalLink
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

export function MarketingDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('30d');
  const [stats, setStats] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [automations, setAutomations] = useState([]);
  const [insights, setInsights] = useState([]);

  const fetchMarketingData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');

      // Fetch campaigns
      const campaignsRes = await fetch(`${API_URL}/api/marketing/campaigns`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      // Fetch promotions
      const promotionsRes = await fetch(`${API_URL}/api/marketing/promotions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      let campaignsData = [];
      let promotionsData = [];

      if (campaignsRes.ok) {
        const result = await campaignsRes.json();
        campaignsData = result.campaigns || [];
      }

      if (promotionsRes.ok) {
        const result = await promotionsRes.json();
        promotionsData = result.promotions || [];
      }

      setCampaigns(campaignsData);
      setPromotions(promotionsData);
      setAutomations([]);
      setInsights([]);

      // Calculate stats from real data
      const totalRevenue = campaignsData.reduce((sum, c) => sum + (c.revenue || 0), 0) +
                          promotionsData.reduce((sum, p) => sum + (p.revenue || 0), 0);
      const totalSent = campaignsData.reduce((sum, c) => sum + (c.sent || 0), 0);
      const totalOpened = campaignsData.reduce((sum, c) => sum + (c.opened || 0), 0);
      const totalClicked = campaignsData.reduce((sum, c) => sum + (c.clicked || 0), 0);
      const totalConverted = campaignsData.reduce((sum, c) => sum + (c.converted || 0), 0);

      setStats({
        totalRevenue,
        revenueChange: 0,
        emailsSent: totalSent,
        emailsChange: 0,
        openRate: totalSent > 0 ? (totalOpened / totalSent * 100) : 0,
        openRateChange: 0,
        clickRate: totalSent > 0 ? (totalClicked / totalSent * 100) : 0,
        clickRateChange: 0,
        conversions: totalConverted,
        conversionsChange: 0,
        roi: 0,
        roiChange: 0,
        activeSubscribers: 0,
        subscribersChange: 0,
        unsubscribeRate: 0
      });
    } catch (err) {
      console.error('Error fetching marketing data:', err);
      setError(err.message);
      setStats({ totalRevenue: 0, revenueChange: 0, emailsSent: 0, emailsChange: 0, openRate: 0, openRateChange: 0, clickRate: 0, clickRateChange: 0, conversions: 0, conversionsChange: 0, roi: 0, roiChange: 0, activeSubscribers: 0, subscribersChange: 0, unsubscribeRate: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketingData();
  }, [fetchMarketingData]);

  // Demo data for reference (not used)
  const getDemoCampaigns = () => [
        {
          id: 1,
          name: 'January Flash Sale',
          type: 'email',
          status: 'active',
          sent: 8500,
          opened: 2125,
          clicked: 340,
          converted: 85,
          revenue: 12750,
          startDate: '2024-01-10',
          endDate: '2024-01-17'
        },
        {
          id: 2,
          name: 'New Product Launch',
          type: 'email',
          status: 'active',
          sent: 6920,
          opened: 1730,
          clicked: 276,
          converted: 62,
          revenue: 9300,
          startDate: '2024-01-12',
          endDate: '2024-01-19'
        },
        {
          id: 3,
          name: 'VIP Early Access',
          type: 'sms',
          status: 'completed',
          sent: 1250,
          opened: null,
          clicked: 187,
          converted: 45,
          revenue: 8100,
          startDate: '2024-01-08',
          endDate: '2024-01-10'
        },
        {
          id: 4,
          name: 'Weekend Reminder',
          type: 'push',
          status: 'scheduled',
          sent: 0,
          scheduledFor: '2024-01-20 10:00',
          audience: 5200
        }
  ];

  // Demo promotions for reference (not used)
  const getDemoPromotions = () => [
        {
          id: 1,
          name: 'SAVE20',
          type: 'percentage',
          value: 20,
          usageCount: 234,
          usageLimit: 500,
          revenue: 18720,
          status: 'active',
          expiresAt: '2024-01-31'
        },
        {
          id: 2,
          name: 'FREESHIP',
          type: 'free_shipping',
          value: null,
          usageCount: 567,
          usageLimit: null,
          revenue: 12450,
          status: 'active',
          expiresAt: null
        },
        {
          id: 3,
          name: 'WELCOME10',
          type: 'percentage',
          value: 10,
          usageCount: 89,
          usageLimit: null,
          revenue: 4230,
          status: 'active',
          expiresAt: null
        }
  ];

  // Demo automations for reference (not used)
  const getDemoAutomations = () => [
        {
          id: 1,
          name: 'Welcome Series',
          trigger: 'signup',
          status: 'active',
          sent: 1240,
          converted: 186,
          conversionRate: 15.0,
          revenue: 9300
        },
        {
          id: 2,
          name: 'Abandoned Cart',
          trigger: 'cart_abandon',
          status: 'active',
          sent: 890,
          converted: 134,
          conversionRate: 15.1,
          revenue: 12680
        },
        {
          id: 3,
          name: 'Win-Back Campaign',
          trigger: 'inactive_60d',
          status: 'active',
          sent: 450,
          converted: 45,
          conversionRate: 10.0,
          revenue: 3150
        },
        {
          id: 4,
          name: 'Post-Purchase Follow-up',
          trigger: 'purchase',
          status: 'paused',
          sent: 2100,
          converted: 315,
          conversionRate: 15.0,
          revenue: 7875
        }
  ];

  // Demo insights for reference (not used)
  const getDemoInsights = () => [
        {
          id: 1,
          type: 'success',
          title: 'Abandoned cart emails performing well',
          description: '15.1% conversion rate is 3x above industry average',
          action: 'View automation'
        },
        {
          id: 2,
          type: 'warning',
          title: 'SAVE20 code running low',
          description: '234 of 500 uses claimed. Consider extending limit.',
          action: 'Edit promotion'
        },
        {
          id: 3,
          type: 'tip',
          title: 'Best send time detected',
          description: 'Tuesday 10am shows highest open rates for your audience',
          action: 'Apply to campaigns'
        }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercent = (num) => {
    return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getCampaignTypeIcon = (type) => {
    switch (type) {
      case 'email': return <Mail size={16} />;
      case 'sms': return <MessageSquare size={16} />;
      case 'push': return <Bell size={16} />;
      default: return <Megaphone size={16} />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' };
      case 'scheduled':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' };
      case 'paused':
        return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316' };
      case 'completed':
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' };
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle size={18} color="#22c55e" />;
      case 'warning': return <AlertTriangle size={18} color="#f59e0b" />;
      case 'tip': return <Sparkles size={18} color="#8b5cf6" />;
      default: return <Sparkles size={18} />;
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Megaphone size={48} style={{ opacity: 0.5 }} />
        <p>Loading marketing data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.loadingContainer}>
        <AlertTriangle size={48} color="#ef4444" />
        <p style={{ color: '#ef4444' }}>{error}</p>
        <button onClick={fetchMarketingData} style={styles.retryBtn}>
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Marketing</h1>
          <p style={styles.subtitle}>Campaigns, promotions & automations</p>
        </div>
        <div style={styles.headerRight}>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={styles.dateSelect}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="ytd">Year to date</option>
          </select>
          <button style={styles.refreshBtn}>
            <RefreshCw size={16} />
          </button>
          <button style={styles.primaryBtn}>
            <Plus size={18} />
            New Campaign
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
              <DollarSign size={20} color="#22c55e" />
            </div>
            <span style={{
              ...styles.statChange,
              color: stats.revenueChange >= 0 ? '#22c55e' : '#ef4444'
            }}>
              {stats.revenueChange >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {formatPercent(stats.revenueChange)}
            </span>
          </div>
          <div style={styles.statValue}>{formatCurrency(stats.totalRevenue)}</div>
          <div style={styles.statLabel}>Marketing Revenue</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
              <Send size={20} color="#3b82f6" />
            </div>
            <span style={{
              ...styles.statChange,
              color: stats.emailsChange >= 0 ? '#22c55e' : '#ef4444'
            }}>
              {stats.emailsChange >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {formatPercent(stats.emailsChange)}
            </span>
          </div>
          <div style={styles.statValue}>{formatNumber(stats.emailsSent)}</div>
          <div style={styles.statLabel}>Emails Sent</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)'}}>
              <Eye size={20} color="#8b5cf6" />
            </div>
            <span style={{
              ...styles.statChange,
              color: stats.openRateChange >= 0 ? '#22c55e' : '#ef4444'
            }}>
              {stats.openRateChange >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {formatPercent(stats.openRateChange)}
            </span>
          </div>
          <div style={styles.statValue}>{stats.openRate}%</div>
          <div style={styles.statLabel}>Open Rate</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(249, 115, 22, 0.1)'}}>
              <MousePointer size={20} color="#f97316" />
            </div>
            <span style={{
              ...styles.statChange,
              color: stats.clickRateChange >= 0 ? '#22c55e' : '#ef4444'
            }}>
              {stats.clickRateChange >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {formatPercent(stats.clickRateChange)}
            </span>
          </div>
          <div style={styles.statValue}>{stats.clickRate}%</div>
          <div style={styles.statLabel}>Click Rate</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(236, 72, 153, 0.1)'}}>
              <ShoppingCart size={20} color="#ec4899" />
            </div>
            <span style={{
              ...styles.statChange,
              color: stats.conversionsChange >= 0 ? '#22c55e' : '#ef4444'
            }}>
              {stats.conversionsChange >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {formatPercent(stats.conversionsChange)}
            </span>
          </div>
          <div style={styles.statValue}>{formatNumber(stats.conversions)}</div>
          <div style={styles.statLabel}>Conversions</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(20, 184, 166, 0.1)'}}>
              <TrendingUp size={20} color="#14b8a6" />
            </div>
            <span style={{
              ...styles.statChange,
              color: stats.roiChange >= 0 ? '#22c55e' : '#ef4444'
            }}>
              {stats.roiChange >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              +{stats.roiChange}x
            </span>
          </div>
          <div style={styles.statValue}>{stats.roi}x</div>
          <div style={styles.statLabel}>ROI</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={styles.mainGrid}>
        {/* Active Campaigns */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              <Megaphone size={20} />
              Active Campaigns
            </h2>
            <button style={styles.viewAllBtn}>
              View All
              <ArrowRight size={14} />
            </button>
          </div>
          <div style={styles.campaignsList}>
            {campaigns.map((campaign) => {
              const statusStyle = getStatusStyle(campaign.status);
              const openRate = campaign.opened ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : null;
              const clickRate = campaign.clicked && campaign.sent ? ((campaign.clicked / campaign.sent) * 100).toFixed(1) : null;

              return (
                <div key={campaign.id} style={styles.campaignItem}>
                  <div style={styles.campaignHeader}>
                    <div style={styles.campaignInfo}>
                      <div style={{
                        ...styles.campaignTypeIcon,
                        backgroundColor: campaign.type === 'email' ? 'rgba(59, 130, 246, 0.1)' :
                          campaign.type === 'sms' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(249, 115, 22, 0.1)',
                        color: campaign.type === 'email' ? '#3b82f6' :
                          campaign.type === 'sms' ? '#22c55e' : '#f97316'
                      }}>
                        {getCampaignTypeIcon(campaign.type)}
                      </div>
                      <div>
                        <span style={styles.campaignName}>{campaign.name}</span>
                        <span style={styles.campaignMeta}>
                          {campaign.status === 'scheduled' 
                            ? `Scheduled: ${campaign.scheduledFor}`
                            : `${formatDate(campaign.startDate)} - ${formatDate(campaign.endDate)}`
                          }
                        </span>
                      </div>
                    </div>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color
                    }}>
                      {campaign.status}
                    </span>
                  </div>

                  {campaign.status !== 'scheduled' && (
                    <div style={styles.campaignStats}>
                      <div style={styles.campaignStat}>
                        <span style={styles.campaignStatValue}>{formatNumber(campaign.sent)}</span>
                        <span style={styles.campaignStatLabel}>Sent</span>
                      </div>
                      {openRate && (
                        <div style={styles.campaignStat}>
                          <span style={styles.campaignStatValue}>{openRate}%</span>
                          <span style={styles.campaignStatLabel}>Opened</span>
                        </div>
                      )}
                      {clickRate && (
                        <div style={styles.campaignStat}>
                          <span style={styles.campaignStatValue}>{clickRate}%</span>
                          <span style={styles.campaignStatLabel}>Clicked</span>
                        </div>
                      )}
                      {campaign.revenue && (
                        <div style={styles.campaignStat}>
                          <span style={{...styles.campaignStatValue, color: '#22c55e'}}>
                            {formatCurrency(campaign.revenue)}
                          </span>
                          <span style={styles.campaignStatLabel}>Revenue</span>
                        </div>
                      )}
                    </div>
                  )}

                  {campaign.status === 'scheduled' && (
                    <div style={styles.scheduledInfo}>
                      <Clock size={14} />
                      <span>Targeting {formatNumber(campaign.audience)} subscribers</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insights */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              <Sparkles size={20} />
              AI Insights
            </h2>
          </div>
          <div style={styles.insightsList}>
            {insights.map((insight) => (
              <div key={insight.id} style={styles.insightItem}>
                <div style={styles.insightIcon}>
                  {getInsightIcon(insight.type)}
                </div>
                <div style={styles.insightContent}>
                  <span style={styles.insightTitle}>{insight.title}</span>
                  <span style={styles.insightDescription}>{insight.description}</span>
                  <button style={styles.insightAction}>
                    {insight.action}
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Promotions */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              <Tag size={20} />
              Active Promotions
            </h2>
            <button style={styles.viewAllBtn}>
              View All
              <ArrowRight size={14} />
            </button>
          </div>
          <div style={styles.promotionsList}>
            {promotions.map((promo) => (
              <div key={promo.id} style={styles.promoItem}>
                <div style={styles.promoHeader}>
                  <div style={styles.promoCode}>
                    <Tag size={14} color="#8b5cf6" />
                    <span>{promo.name}</span>
                  </div>
                  <span style={styles.promoValue}>
                    {promo.type === 'percentage' && `${promo.value}% OFF`}
                    {promo.type === 'fixed' && `$${promo.value} OFF`}
                    {promo.type === 'free_shipping' && 'FREE SHIPPING'}
                  </span>
                </div>
                <div style={styles.promoStats}>
                  <div style={styles.promoStat}>
                    <span style={styles.promoStatLabel}>Used</span>
                    <span style={styles.promoStatValue}>
                      {formatNumber(promo.usageCount)}
                      {promo.usageLimit && ` / ${formatNumber(promo.usageLimit)}`}
                    </span>
                  </div>
                  <div style={styles.promoStat}>
                    <span style={styles.promoStatLabel}>Revenue</span>
                    <span style={{...styles.promoStatValue, color: '#22c55e'}}>
                      {formatCurrency(promo.revenue)}
                    </span>
                  </div>
                </div>
                {promo.usageLimit && (
                  <div style={styles.promoProgress}>
                    <div style={{
                      ...styles.promoProgressBar,
                      width: `${(promo.usageCount / promo.usageLimit) * 100}%`,
                      backgroundColor: promo.usageCount / promo.usageLimit > 0.8 ? '#f59e0b' : '#8b5cf6'
                    }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Automations */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              <Zap size={20} />
              Automations
            </h2>
            <button style={styles.viewAllBtn}>
              View All
              <ArrowRight size={14} />
            </button>
          </div>
          <div style={styles.automationsList}>
            {automations.map((auto) => {
              const statusStyle = getStatusStyle(auto.status);
              return (
                <div key={auto.id} style={styles.automationItem}>
                  <div style={styles.automationHeader}>
                    <div style={styles.automationInfo}>
                      <span style={styles.automationName}>{auto.name}</span>
                      <span style={styles.automationTrigger}>
                        Trigger: {auto.trigger.replace('_', ' ')}
                      </span>
                    </div>
                    <div style={styles.automationActions}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color
                      }}>
                        {auto.status === 'active' ? <Play size={10} /> : <Pause size={10} />}
                        {auto.status}
                      </span>
                    </div>
                  </div>
                  <div style={styles.automationStats}>
                    <div style={styles.automationStat}>
                      <span style={styles.automationStatValue}>{formatNumber(auto.sent)}</span>
                      <span style={styles.automationStatLabel}>Sent</span>
                    </div>
                    <div style={styles.automationStat}>
                      <span style={styles.automationStatValue}>{auto.conversionRate}%</span>
                      <span style={styles.automationStatLabel}>Conv. Rate</span>
                    </div>
                    <div style={styles.automationStat}>
                      <span style={{...styles.automationStatValue, color: '#22c55e'}}>
                        {formatCurrency(auto.revenue)}
                      </span>
                      <span style={styles.automationStatLabel}>Revenue</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.quickActions}>
        <h3 style={styles.quickActionsTitle}>Quick Actions</h3>
        <div style={styles.quickActionsGrid}>
          <button style={styles.quickActionBtn}>
            <Mail size={20} />
            <span>Send Email</span>
          </button>
          <button style={styles.quickActionBtn}>
            <Tag size={20} />
            <span>Create Promo</span>
          </button>
          <button style={styles.quickActionBtn}>
            <Zap size={20} />
            <span>New Automation</span>
          </button>
          <button style={styles.quickActionBtn}>
            <Users size={20} />
            <span>Segment Audience</span>
          </button>
          <button style={styles.quickActionBtn}>
            <BarChart3 size={20} />
            <span>View Reports</span>
          </button>
          <button style={styles.quickActionBtn}>
            <Gift size={20} />
            <span>Launch Sale</span>
          </button>
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
    color: 'var(--color-text-muted)',
    margin: 0
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  dateSelect: {
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none'
  },
  refreshBtn: {
    padding: '10px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
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
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  statIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    fontSize: '12px',
    fontWeight: 600
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    marginBottom: '24px'
  },
  card: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '20px',
    border: '1px solid var(--color-border)',
    padding: '24px'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  viewAllBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  campaignsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  campaignItem: {
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px'
  },
  campaignHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  campaignInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },
  campaignTypeIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  campaignName: {
    display: 'block',
    fontWeight: 600,
    fontSize: '14px',
    marginBottom: '2px'
  },
  campaignMeta: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  campaignStats: {
    display: 'flex',
    gap: '20px'
  },
  campaignStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  campaignStatValue: {
    fontSize: '14px',
    fontWeight: 700
  },
  campaignStatLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  scheduledInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  insightsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  insightItem: {
    display: 'flex',
    gap: '14px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px'
  },
  insightIcon: {
    flexShrink: 0
  },
  insightContent: {
    flex: 1
  },
  insightTitle: {
    display: 'block',
    fontWeight: 600,
    fontSize: '14px',
    marginBottom: '4px'
  },
  insightDescription: {
    display: 'block',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginBottom: '10px'
  },
  insightAction: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  promotionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  promoItem: {
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px'
  },
  promoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  promoCode: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 700,
    fontSize: '14px',
    fontFamily: 'monospace'
  },
  promoValue: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#8b5cf6'
  },
  promoStats: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  promoStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  promoStatLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  promoStatValue: {
    fontSize: '14px',
    fontWeight: 600
  },
  promoProgress: {
    height: '4px',
    backgroundColor: 'var(--color-border)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  promoProgressBar: {
    height: '100%',
    borderRadius: '2px',
    transition: 'width 0.3s ease'
  },
  automationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  automationItem: {
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px'
  },
  automationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  automationInfo: {},
  automationName: {
    display: 'block',
    fontWeight: 600,
    fontSize: '14px',
    marginBottom: '2px'
  },
  automationTrigger: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textTransform: 'capitalize'
  },
  automationActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  automationStats: {
    display: 'flex',
    gap: '24px'
  },
  automationStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  automationStatValue: {
    fontSize: '14px',
    fontWeight: 700
  },
  automationStatLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  quickActions: {
    padding: '24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '20px',
    border: '1px solid var(--color-border)'
  },
  quickActionsTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 16px 0'
  },
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '12px'
  },
  quickActionBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    padding: '20px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '14px',
    color: 'var(--color-text)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};

export default MarketingDashboard;