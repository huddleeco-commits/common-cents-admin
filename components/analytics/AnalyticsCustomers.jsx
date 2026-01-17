/**
 * CustomerAnalytics
 * 
 * Deep dive into customer behavior and insights.
 * - Customer acquisition
 * - Retention analysis
 * - Lifetime value
 * - Cohort analysis
 * - Behavior patterns
 * - Churn prediction
 * 
 * AI-powered customer insights for growth.
 */

import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  UserCheck,
  UserMinus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Clock,
  Heart,
  Star,
  Award,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  MapPin,
  Smartphone,
  Monitor,
  Mail,
  RefreshCw
} from 'lucide-react';

export function CustomerAnalytics() {
  const [dateRange, setDateRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setCustomerData({
        // Summary metrics
        summary: {
          totalCustomers: 3847,
          newCustomers: 234,
          newCustomersChange: 18.5,
          returningCustomers: 1456,
          returningChange: 12.3,
          churnedCustomers: 45,
          churnRate: 1.2,
          avgLifetimeValue: 287.50,
          ltvChange: 8.2
        },

        // Customer growth over time
        customerGrowth: [
          { month: 'Jan', new: 180, returning: 1200, churned: 35 },
          { month: 'Feb', new: 195, returning: 1280, churned: 42 },
          { month: 'Mar', new: 210, returning: 1350, churned: 38 },
          { month: 'Apr', new: 225, returning: 1400, churned: 40 },
          { month: 'May', new: 215, returning: 1420, churned: 48 },
          { month: 'Jun', new: 234, returning: 1456, churned: 45 }
        ],

        // Customer segments
        segments: [
          { 
            name: 'VIP', 
            count: 187, 
            percent: 4.9, 
            revenue: 45600,
            avgOrderValue: 89.50,
            ordersPerMonth: 4.2,
            color: '#8b5cf6'
          },
          { 
            name: 'Regular', 
            count: 1245, 
            percent: 32.4, 
            revenue: 98500,
            avgOrderValue: 52.30,
            ordersPerMonth: 2.1,
            color: '#3b82f6'
          },
          { 
            name: 'Occasional', 
            count: 1890, 
            percent: 49.1, 
            revenue: 42300,
            avgOrderValue: 38.75,
            ordersPerMonth: 0.8,
            color: '#22c55e'
          },
          { 
            name: 'At Risk', 
            count: 345, 
            percent: 9.0, 
            revenue: 8200,
            avgOrderValue: 35.20,
            ordersPerMonth: 0.3,
            color: '#f97316'
          },
          { 
            name: 'Churned', 
            count: 180, 
            percent: 4.7, 
            revenue: 0,
            avgOrderValue: 0,
            ordersPerMonth: 0,
            color: '#ef4444'
          }
        ],

        // Acquisition channels
        acquisitionChannels: [
          { channel: 'Organic Search', customers: 1234, percent: 32.1, cac: 0 },
          { channel: 'Social Media', customers: 876, percent: 22.8, cac: 12.50 },
          { channel: 'Referral', customers: 654, percent: 17.0, cac: 8.00 },
          { channel: 'Paid Ads', customers: 543, percent: 14.1, cac: 28.75 },
          { channel: 'Direct', customers: 340, percent: 8.8, cac: 0 },
          { channel: 'Email', customers: 200, percent: 5.2, cac: 5.25 }
        ],

        // Retention cohorts
        retentionCohorts: [
          { cohort: 'Jan 2024', month1: 100, month2: 68, month3: 52, month4: 45, month5: 42, month6: 40 },
          { cohort: 'Feb 2024', month1: 100, month2: 72, month3: 58, month4: 50, month5: 46, month6: null },
          { cohort: 'Mar 2024', month1: 100, month2: 70, month3: 55, month4: 48, month5: null, month6: null },
          { cohort: 'Apr 2024', month1: 100, month2: 74, month3: 60, month4: null, month5: null, month6: null },
          { cohort: 'May 2024', month1: 100, month2: 71, month3: null, month4: null, month5: null, month6: null },
          { cohort: 'Jun 2024', month1: 100, month2: null, month3: null, month4: null, month5: null, month6: null }
        ],

        // Customer behavior
        behavior: {
          avgOrderFrequency: 2.3,
          avgDaysBetweenOrders: 14,
          avgOrderValue: 52.24,
          preferredOrderTime: '6pm - 8pm',
          preferredOrderDay: 'Saturday',
          mobileVsDesktop: { mobile: 62, desktop: 38 }
        },

        // Top customers
        topCustomers: [
          { id: 1, name: 'Sarah M.', orders: 47, spent: 2890.50, lastOrder: '2 days ago', segment: 'VIP' },
          { id: 2, name: 'Michael R.', orders: 42, spent: 2654.25, lastOrder: '1 day ago', segment: 'VIP' },
          { id: 3, name: 'Jennifer L.', orders: 38, spent: 2410.80, lastOrder: '3 days ago', segment: 'VIP' },
          { id: 4, name: 'David K.', orders: 35, spent: 2180.00, lastOrder: '5 days ago', segment: 'VIP' },
          { id: 5, name: 'Amanda S.', orders: 32, spent: 1920.75, lastOrder: '1 day ago', segment: 'VIP' }
        ],

        // At risk customers
        atRiskCustomers: [
          { id: 101, name: 'Robert T.', lastOrder: '45 days ago', previousFreq: 'Weekly', spent: 890.00, winbackChance: 65 },
          { id: 102, name: 'Lisa M.', lastOrder: '38 days ago', previousFreq: 'Bi-weekly', spent: 654.50, winbackChance: 72 },
          { id: 103, name: 'James W.', lastOrder: '52 days ago', previousFreq: 'Weekly', spent: 1245.00, winbackChance: 45 },
          { id: 104, name: 'Emily D.', lastOrder: '41 days ago', previousFreq: 'Monthly', spent: 320.25, winbackChance: 58 }
        ],

        // Geographic distribution
        geoDistribution: [
          { location: 'Downtown', customers: 1245, percent: 32.4 },
          { location: 'Midtown', customers: 876, percent: 22.8 },
          { location: 'Uptown', customers: 654, percent: 17.0 },
          { location: 'Suburbs', customers: 543, percent: 14.1 },
          { location: 'Other', customers: 529, percent: 13.7 }
        ],

        // AI insights
        aiInsights: [
          {
            type: 'opportunity',
            title: 'High-Value Segment Growing',
            message: 'VIP segment grew 12% this month. Consider exclusive perks to accelerate growth.',
            action: 'Create VIP campaign'
          },
          {
            type: 'warning',
            title: '45 Customers At Risk',
            message: 'These customers haven\'t ordered in 30+ days. Winback campaign could recover $2,400.',
            action: 'Launch winback'
          },
          {
            type: 'insight',
            title: 'Referral Channel Outperforming',
            message: 'Referral has lowest CAC ($8) and highest LTV. Consider boosting referral rewards.',
            action: 'Boost referrals'
          }
        ]
      });
      setLoading(false);
    }, 600);
  }, [dateRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (loading || !customerData) {
    return (
      <div style={styles.loadingContainer}>
        <Users size={32} style={{ animation: 'pulse 1s ease-in-out infinite' }} />
        <p>Loading customer insights...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Customer Analytics</h1>
          <span style={styles.subtitle}>Understand and grow your customer base</span>
        </div>
        <div style={styles.headerActions}>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={styles.dateSelect}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="12m">Last 12 Months</option>
          </select>
        </div>
      </div>

      {/* AI Insights */}
      <div style={styles.aiInsightsRow}>
        {customerData.aiInsights.map((insight, index) => (
          <div key={index} style={{
            ...styles.aiInsightCard,
            borderLeftColor: insight.type === 'opportunity' ? '#22c55e' :
                            insight.type === 'warning' ? '#f97316' : '#3b82f6'
          }}>
            <Zap size={16} color={
              insight.type === 'opportunity' ? '#22c55e' :
              insight.type === 'warning' ? '#f97316' : '#3b82f6'
            } />
            <div style={styles.aiInsightContent}>
              <h4 style={styles.aiInsightTitle}>{insight.title}</h4>
              <p style={styles.aiInsightMessage}>{insight.message}</p>
            </div>
            <button style={styles.aiInsightAction}>{insight.action}</button>
          </div>
        ))}
      </div>

      {/* Summary Cards */}
      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <div style={{...styles.summaryIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
            <Users size={22} color="#3b82f6" />
          </div>
          <div style={styles.summaryInfo}>
            <span style={styles.summaryLabel}>Total Customers</span>
            <span style={styles.summaryValue}>{formatNumber(customerData.summary.totalCustomers)}</span>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={{...styles.summaryIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
            <UserPlus size={22} color="#22c55e" />
          </div>
          <div style={styles.summaryInfo}>
            <span style={styles.summaryLabel}>New Customers</span>
            <span style={styles.summaryValue}>{formatNumber(customerData.summary.newCustomers)}</span>
            <span style={styles.summaryChange}>
              <ArrowUpRight size={12} color="#22c55e" />
              +{customerData.summary.newCustomersChange}%
            </span>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={{...styles.summaryIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)'}}>
            <UserCheck size={22} color="#8b5cf6" />
          </div>
          <div style={styles.summaryInfo}>
            <span style={styles.summaryLabel}>Returning</span>
            <span style={styles.summaryValue}>{formatNumber(customerData.summary.returningCustomers)}</span>
            <span style={styles.summaryChange}>
              <ArrowUpRight size={12} color="#22c55e" />
              +{customerData.summary.returningChange}%
            </span>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={{...styles.summaryIcon, backgroundColor: 'rgba(239, 68, 68, 0.1)'}}>
            <UserMinus size={22} color="#ef4444" />
          </div>
          <div style={styles.summaryInfo}>
            <span style={styles.summaryLabel}>Churn Rate</span>
            <span style={styles.summaryValue}>{customerData.summary.churnRate}%</span>
            <span style={{...styles.summaryChange, color: '#22c55e'}}>
              Healthy
            </span>
          </div>
        </div>

        <div style={styles.summaryCard}>
          <div style={{...styles.summaryIcon, backgroundColor: 'rgba(245, 158, 11, 0.1)'}}>
            <DollarSign size={22} color="#f59e0b" />
          </div>
          <div style={styles.summaryInfo}>
            <span style={styles.summaryLabel}>Avg Lifetime Value</span>
            <span style={styles.summaryValue}>{formatCurrency(customerData.summary.avgLifetimeValue)}</span>
            <span style={styles.summaryChange}>
              <ArrowUpRight size={12} color="#22c55e" />
              +{customerData.summary.ltvChange}%
            </span>
          </div>
        </div>
      </div>

      {/* Customer Segments & Growth Chart */}
      <div style={styles.twoColumnGrid}>
        {/* Segments */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Customer Segments</h3>
            <button style={styles.viewAllBtn}>
              Manage <ChevronRight size={14} />
            </button>
          </div>
          <div style={styles.segmentsList}>
            {customerData.segments.map((segment, index) => (
              <div key={index} style={styles.segmentRow}>
                <div style={styles.segmentInfo}>
                  <div style={{
                    ...styles.segmentDot,
                    backgroundColor: segment.color
                  }} />
                  <div>
                    <span style={styles.segmentName}>{segment.name}</span>
                    <span style={styles.segmentCount}>{formatNumber(segment.count)} customers</span>
                  </div>
                </div>
                <div style={styles.segmentStats}>
                  <div style={styles.segmentStat}>
                    <span style={styles.segmentStatValue}>{formatCurrency(segment.revenue)}</span>
                    <span style={styles.segmentStatLabel}>Revenue</span>
                  </div>
                  <div style={styles.segmentStat}>
                    <span style={styles.segmentStatValue}>{formatCurrency(segment.avgOrderValue)}</span>
                    <span style={styles.segmentStatLabel}>AOV</span>
                  </div>
                  <div style={styles.segmentStat}>
                    <span style={styles.segmentStatValue}>{segment.ordersPerMonth}</span>
                    <span style={styles.segmentStatLabel}>Orders/mo</span>
                  </div>
                </div>
                <div style={styles.segmentBar}>
                  <div style={{
                    ...styles.segmentBarFill,
                    width: `${segment.percent}%`,
                    backgroundColor: segment.color
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Chart */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Customer Growth</h3>
            <div style={styles.chartLegend}>
              <span style={styles.legendItem}>
                <span style={{...styles.legendDot, backgroundColor: '#22c55e'}} />
                New
              </span>
              <span style={styles.legendItem}>
                <span style={{...styles.legendDot, backgroundColor: '#3b82f6'}} />
                Returning
              </span>
            </div>
          </div>
          <div style={styles.growthChart}>
            {customerData.customerGrowth.map((month, index) => (
              <div key={index} style={styles.growthBarGroup}>
                <div style={styles.growthBars}>
                  <div style={{
                    ...styles.growthBar,
                    height: `${(month.returning / 1500) * 120}px`,
                    backgroundColor: '#3b82f6'
                  }} />
                  <div style={{
                    ...styles.growthBar,
                    height: `${(month.new / 250) * 60}px`,
                    backgroundColor: '#22c55e'
                  }} />
                </div>
                <span style={styles.growthLabel}>{month.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Retention Cohorts */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Retention Cohorts</h3>
          <span style={styles.cohortNote}>Percentage of customers retained over time</span>
        </div>
        <div style={styles.cohortTable}>
          <div style={styles.cohortHeader}>
            <div style={styles.cohortHeaderCell}>Cohort</div>
            <div style={styles.cohortHeaderCell}>Month 1</div>
            <div style={styles.cohortHeaderCell}>Month 2</div>
            <div style={styles.cohortHeaderCell}>Month 3</div>
            <div style={styles.cohortHeaderCell}>Month 4</div>
            <div style={styles.cohortHeaderCell}>Month 5</div>
            <div style={styles.cohortHeaderCell}>Month 6</div>
          </div>
          {customerData.retentionCohorts.map((cohort, index) => (
            <div key={index} style={styles.cohortRow}>
              <div style={styles.cohortLabel}>{cohort.cohort}</div>
              {['month1', 'month2', 'month3', 'month4', 'month5', 'month6'].map((month, mIndex) => (
                <div 
                  key={mIndex}
                  style={{
                    ...styles.cohortCell,
                    backgroundColor: cohort[month] !== null 
                      ? `rgba(34, 197, 94, ${cohort[month] / 100 * 0.8})`
                      : 'var(--color-surface-2)',
                    color: cohort[month] !== null && cohort[month] > 50 ? '#ffffff' : 'var(--color-text)'
                  }}
                >
                  {cohort[month] !== null ? `${cohort[month]}%` : '—'}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Acquisition & Behavior */}
      <div style={styles.twoColumnGrid}>
        {/* Acquisition Channels */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Acquisition Channels</h3>
          </div>
          <div style={styles.channelList}>
            {customerData.acquisitionChannels.map((channel, index) => (
              <div key={index} style={styles.channelRow}>
                <div style={styles.channelInfo}>
                  <span style={styles.channelName}>{channel.channel}</span>
                  <span style={styles.channelCustomers}>
                    {formatNumber(channel.customers)} customers ({channel.percent}%)
                  </span>
                </div>
                <div style={styles.channelCAC}>
                  <span style={styles.cacValue}>
                    {channel.cac === 0 ? 'Free' : formatCurrency(channel.cac)}
                  </span>
                  <span style={styles.cacLabel}>CAC</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Behavior */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Customer Behavior</h3>
          </div>
          <div style={styles.behaviorGrid}>
            <div style={styles.behaviorItem}>
              <Clock size={20} color="#3b82f6" />
              <div style={styles.behaviorInfo}>
                <span style={styles.behaviorValue}>{customerData.behavior.avgOrderFrequency}/mo</span>
                <span style={styles.behaviorLabel}>Avg Order Frequency</span>
              </div>
            </div>
            <div style={styles.behaviorItem}>
              <Calendar size={20} color="#8b5cf6" />
              <div style={styles.behaviorInfo}>
                <span style={styles.behaviorValue}>{customerData.behavior.avgDaysBetweenOrders} days</span>
                <span style={styles.behaviorLabel}>Days Between Orders</span>
              </div>
            </div>
            <div style={styles.behaviorItem}>
              <DollarSign size={20} color="#22c55e" />
              <div style={styles.behaviorInfo}>
                <span style={styles.behaviorValue}>{formatCurrency(customerData.behavior.avgOrderValue)}</span>
                <span style={styles.behaviorLabel}>Avg Order Value</span>
              </div>
            </div>
            <div style={styles.behaviorItem}>
              <Clock size={20} color="#f59e0b" />
              <div style={styles.behaviorInfo}>
                <span style={styles.behaviorValue}>{customerData.behavior.preferredOrderTime}</span>
                <span style={styles.behaviorLabel}>Peak Order Time</span>
              </div>
            </div>
          </div>
          <div style={styles.deviceSplit}>
            <span style={styles.deviceLabel}>Device Split</span>
            <div style={styles.deviceBar}>
              <div style={{
                ...styles.deviceSegment,
                width: `${customerData.behavior.mobileVsDesktop.mobile}%`,
                backgroundColor: '#3b82f6'
              }}>
                <Smartphone size={14} />
                {customerData.behavior.mobileVsDesktop.mobile}%
              </div>
              <div style={{
                ...styles.deviceSegment,
                width: `${customerData.behavior.mobileVsDesktop.desktop}%`,
                backgroundColor: '#8b5cf6'
              }}>
                <Monitor size={14} />
                {customerData.behavior.mobileVsDesktop.desktop}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Customers & At Risk */}
      <div style={styles.twoColumnGrid}>
        {/* Top Customers */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Top Customers</h3>
            <Award size={18} color="#f59e0b" />
          </div>
          <div style={styles.topCustomersList}>
            {customerData.topCustomers.map((customer, index) => (
              <div key={customer.id} style={styles.topCustomerRow}>
                <div style={styles.topCustomerRank}>#{index + 1}</div>
                <div style={styles.topCustomerInfo}>
                  <span style={styles.topCustomerName}>{customer.name}</span>
                  <span style={styles.topCustomerMeta}>
                    {customer.orders} orders • Last: {customer.lastOrder}
                  </span>
                </div>
                <div style={styles.topCustomerSpent}>
                  <span style={styles.spentValue}>{formatCurrency(customer.spent)}</span>
                  <span style={{
                    ...styles.segmentBadge,
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    color: '#8b5cf6'
                  }}>
                    {customer.segment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* At Risk Customers */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>At Risk Customers</h3>
            <button style={styles.winbackBtn}>
              <Mail size={14} />
              Send Winback
            </button>
          </div>
          <div style={styles.atRiskList}>
            {customerData.atRiskCustomers.map((customer) => (
              <div key={customer.id} style={styles.atRiskRow}>
                <div style={styles.atRiskInfo}>
                  <span style={styles.atRiskName}>{customer.name}</span>
                  <span style={styles.atRiskMeta}>
                    Last order: {customer.lastOrder} • Was: {customer.previousFreq}
                  </span>
                </div>
                <div style={styles.atRiskStats}>
                  <span style={styles.atRiskSpent}>{formatCurrency(customer.spent)} spent</span>
                  <div style={styles.winbackChance}>
                    <span style={{
                      ...styles.winbackValue,
                      color: customer.winbackChance >= 60 ? '#22c55e' : '#f97316'
                    }}>
                      {customer.winbackChance}%
                    </span>
                    <span style={styles.winbackLabel}>winback chance</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Geographic Distribution</h3>
          <MapPin size={18} color="var(--color-text-muted)" />
        </div>
        <div style={styles.geoGrid}>
          {customerData.geoDistribution.map((geo, index) => (
            <div key={index} style={styles.geoItem}>
              <div style={styles.geoInfo}>
                <span style={styles.geoLocation}>{geo.location}</span>
                <span style={styles.geoCustomers}>{formatNumber(geo.customers)} customers</span>
              </div>
              <div style={styles.geoBar}>
                <div style={{
                  ...styles.geoBarFill,
                  width: `${geo.percent}%`
                }} />
              </div>
              <span style={styles.geoPercent}>{geo.percent}%</span>
            </div>
          ))}
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
  aiInsightsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  aiInsightCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '16px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    borderLeft: '4px solid'
  },
  aiInsightContent: {
    flex: 1
  },
  aiInsightTitle: {
    fontSize: '14px',
    fontWeight: 600,
    margin: '0 0 4px 0'
  },
  aiInsightMessage: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    margin: 0,
    lineHeight: 1.5
  },
  aiInsightAction: {
    padding: '8px 14px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  summaryCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  summaryIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  summaryInfo: {},
  summaryLabel: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginBottom: '4px'
  },
  summaryValue: {
    display: 'block',
    fontSize: '22px',
    fontWeight: 700
  },
  summaryChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#22c55e',
    marginTop: '4px'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px'
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
  segmentsList: {
    padding: '16px 24px'
  },
  segmentRow: {
    padding: '16px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  segmentInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px'
  },
  segmentDot: {
    width: '12px',
    height: '12px',
    borderRadius: '4px'
  },
  segmentName: {
    display: 'block',
    fontWeight: 600
  },
  segmentCount: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  segmentStats: {
    display: 'flex',
    gap: '24px',
    marginBottom: '12px'
  },
  segmentStat: {},
  segmentStatValue: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600
  },
  segmentStatLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  segmentBar: {
    height: '4px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  segmentBarFill: {
    height: '100%',
    borderRadius: '2px'
  },
  chartLegend: {
    display: 'flex',
    gap: '16px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  legendDot: {
    width: '10px',
    height: '10px',
    borderRadius: '3px'
  },
  growthChart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '24px',
    height: '220px'
  },
  growthBarGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  growthBars: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    height: '180px',
    justifyContent: 'flex-end'
  },
  growthBar: {
    width: '32px',
    borderRadius: '4px'
  },
  growthLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  cohortNote: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  cohortTable: {
    padding: '16px 24px',
    overflowX: 'auto'
  },
  cohortHeader: {
    display: 'grid',
    gridTemplateColumns: '120px repeat(6, 1fr)',
    gap: '8px',
    marginBottom: '8px'
  },
  cohortHeaderCell: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textAlign: 'center'
  },
  cohortRow: {
    display: 'grid',
    gridTemplateColumns: '120px repeat(6, 1fr)',
    gap: '8px',
    marginBottom: '8px'
  },
  cohortLabel: {
    fontSize: '13px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center'
  },
  cohortCell: {
    padding: '12px 8px',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '13px',
    fontWeight: 600
  },
  channelList: {
    padding: '16px 24px'
  },
  channelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  channelInfo: {},
  channelName: {
    display: 'block',
    fontWeight: 500,
    marginBottom: '4px'
  },
  channelCustomers: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  channelCAC: {
    textAlign: 'right'
  },
  cacValue: {
    display: 'block',
    fontWeight: 600,
    color: '#22c55e'
  },
  cacLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  behaviorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    padding: '20px 24px'
  },
  behaviorItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px'
  },
  behaviorInfo: {},
  behaviorValue: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 600
  },
  behaviorLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  deviceSplit: {
    padding: '0 24px 24px'
  },
  deviceLabel: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginBottom: '8px'
  },
  deviceBar: {
    display: 'flex',
    height: '40px',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  deviceSegment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600
  },
  topCustomersList: {
    padding: '16px 24px'
  },
  topCustomerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '14px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  topCustomerRank: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 600
  },
  topCustomerInfo: {
    flex: 1
  },
  topCustomerName: {
    display: 'block',
    fontWeight: 600
  },
  topCustomerMeta: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  topCustomerSpent: {
    textAlign: 'right'
  },
  spentValue: {
    display: 'block',
    fontWeight: 600,
    marginBottom: '4px'
  },
  segmentBadge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 600
  },
  winbackBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  atRiskList: {
    padding: '16px 24px'
  },
  atRiskRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  atRiskInfo: {},
  atRiskName: {
    display: 'block',
    fontWeight: 600
  },
  atRiskMeta: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  atRiskStats: {
    textAlign: 'right'
  },
  atRiskSpent: {
    display: 'block',
    fontSize: '13px',
    marginBottom: '4px'
  },
  winbackChance: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    justifyContent: 'flex-end'
  },
  winbackValue: {
    fontWeight: 700
  },
  winbackLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  geoGrid: {
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  geoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  geoInfo: {
    width: '140px'
  },
  geoLocation: {
    display: 'block',
    fontWeight: 500
  },
  geoCustomers: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  geoBar: {
    flex: 1,
    height: '24px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  geoBarFill: {
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '6px'
  },
  geoPercent: {
    width: '50px',
    textAlign: 'right',
    fontWeight: 600
  }
};

export default CustomerAnalytics;