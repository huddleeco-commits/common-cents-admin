/**
 * TrafficAnalytics
 * 
 * Website and app traffic insights.
 * - Visitor metrics
 * - Traffic sources
 * - Page performance
 * - Device breakdown
 * - Geographic data
 * - Conversion funnel
 * 
 * Understanding where customers come from.
 */

import React, { useState, useEffect } from 'react';
import {
  Globe,
  Users,
  Eye,
  Clock,
  TrendingUp,
  TrendingDown,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Search,
  Share2,
  Mail,
  DollarSign,
  MousePointer,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  ChevronRight,
  Zap,
  Target,
  RefreshCw
} from 'lucide-react';

export function TrafficAnalytics() {
  const [dateRange, setDateRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [trafficData, setTrafficData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setTrafficData({
        // Summary metrics
        summary: {
          totalVisitors: 28450,
          visitorsChange: 12.5,
          uniqueVisitors: 22340,
          uniqueChange: 15.2,
          pageViews: 87650,
          pageViewsChange: 8.3,
          avgSessionDuration: '4:32',
          durationChange: 5.8,
          bounceRate: 38.5,
          bounceChange: -2.3,
          conversionRate: 3.8,
          conversionChange: 18.8
        },

        // Traffic over time
        trafficOverTime: [
          { date: 'Mon', visitors: 3200, pageViews: 9800 },
          { date: 'Tue', visitors: 3450, pageViews: 10500 },
          { date: 'Wed', visitors: 3100, pageViews: 9400 },
          { date: 'Thu', visitors: 3600, pageViews: 11200 },
          { date: 'Fri', visitors: 4200, pageViews: 13100 },
          { date: 'Sat', visitors: 5800, pageViews: 18200 },
          { date: 'Sun', visitors: 5100, pageViews: 15350 }
        ],

        // Traffic sources
        trafficSources: [
          { source: 'Organic Search', visitors: 9940, percent: 34.9, change: 18.2, icon: 'search' },
          { source: 'Direct', visitors: 7112, percent: 25.0, change: 8.5, icon: 'globe' },
          { source: 'Social Media', visitors: 5690, percent: 20.0, change: 24.6, icon: 'share' },
          { source: 'Referral', visitors: 3417, percent: 12.0, change: 12.1, icon: 'external' },
          { source: 'Email', visitors: 1707, percent: 6.0, change: -5.2, icon: 'mail' },
          { source: 'Paid Ads', visitors: 584, percent: 2.1, change: 32.4, icon: 'dollar' }
        ],

        // Top pages
        topPages: [
          { page: '/menu', views: 24500, avgTime: '2:45', bounceRate: 28, conversions: 456 },
          { page: '/', views: 18200, avgTime: '1:20', bounceRate: 45, conversions: 234 },
          { page: '/order', views: 12400, avgTime: '5:30', bounceRate: 15, conversions: 890 },
          { page: '/specials', views: 8900, avgTime: '2:10', bounceRate: 32, conversions: 178 },
          { page: '/locations', views: 6500, avgTime: '1:45', bounceRate: 52, conversions: 89 },
          { page: '/about', views: 4200, avgTime: '1:30', bounceRate: 58, conversions: 23 },
          { page: '/contact', views: 3100, avgTime: '2:00', bounceRate: 42, conversions: 67 }
        ],

        // Device breakdown
        devices: [
          { device: 'Mobile', visitors: 17640, percent: 62, icon: 'smartphone' },
          { device: 'Desktop', visitors: 8535, percent: 30, icon: 'monitor' },
          { device: 'Tablet', visitors: 2275, percent: 8, icon: 'tablet' }
        ],

        // Browser breakdown
        browsers: [
          { browser: 'Chrome', percent: 58 },
          { browser: 'Safari', percent: 24 },
          { browser: 'Firefox', percent: 8 },
          { browser: 'Edge', percent: 6 },
          { browser: 'Other', percent: 4 }
        ],

        // Geographic data
        locations: [
          { location: 'New York', visitors: 8535, percent: 30 },
          { location: 'Los Angeles', visitors: 5690, percent: 20 },
          { location: 'Chicago', visitors: 4268, percent: 15 },
          { location: 'Houston', visitors: 2845, percent: 10 },
          { location: 'Phoenix', visitors: 2276, percent: 8 },
          { location: 'Other', visitors: 4836, percent: 17 }
        ],

        // Conversion funnel
        conversionFunnel: [
          { stage: 'Visited Site', count: 28450, percent: 100 },
          { stage: 'Viewed Menu', count: 18500, percent: 65 },
          { stage: 'Added to Cart', count: 4200, percent: 14.8 },
          { stage: 'Started Checkout', count: 2100, percent: 7.4 },
          { stage: 'Completed Order', count: 1081, percent: 3.8 }
        ],

        // Real-time visitors
        realTime: {
          currentVisitors: 147,
          trend: 'up',
          topPages: [
            { page: '/menu', visitors: 45 },
            { page: '/order', visitors: 38 },
            { page: '/', visitors: 32 },
            { page: '/specials', visitors: 18 }
          ]
        },

        // Search terms
        searchTerms: [
          { term: 'restaurant near me', clicks: 1245, position: 3.2 },
          { term: 'best burger downtown', clicks: 876, position: 2.8 },
          { term: 'food delivery', clicks: 654, position: 5.4 },
          { term: 'lunch specials', clicks: 432, position: 4.1 },
          { term: 'happy hour deals', clicks: 321, position: 2.5 }
        ],

        // AI insights
        aiInsights: [
          {
            type: 'opportunity',
            title: 'Mobile Traffic Dominates',
            message: '62% of visitors use mobile. Ensure mobile checkout is optimized for conversions.',
            action: 'Review mobile UX'
          },
          {
            type: 'insight',
            title: 'Social Traffic Growing Fast',
            message: 'Social media traffic up 24.6%. Your Instagram posts are driving significant engagement.',
            action: 'Boost social'
          },
          {
            type: 'warning',
            title: 'High Homepage Bounce',
            message: '45% bounce rate on homepage. Consider adding clearer CTAs or featured specials.',
            action: 'Optimize homepage'
          }
        ]
      });
      setLoading(false);
    }, 600);
  }, [dateRange]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getSourceIcon = (icon) => {
    switch (icon) {
      case 'search': return Search;
      case 'globe': return Globe;
      case 'share': return Share2;
      case 'external': return ExternalLink;
      case 'mail': return Mail;
      case 'dollar': return DollarSign;
      default: return Globe;
    }
  };

  const getDeviceIcon = (device) => {
    switch (device) {
      case 'smartphone': return Smartphone;
      case 'monitor': return Monitor;
      case 'tablet': return Tablet;
      default: return Monitor;
    }
  };

  if (loading || !trafficData) {
    return (
      <div style={styles.loadingContainer}>
        <Globe size={32} style={{ animation: 'pulse 1s ease-in-out infinite' }} />
        <p>Loading traffic data...</p>
      </div>
    );
  }

  const maxVisitors = Math.max(...trafficData.trafficOverTime.map(d => d.visitors));

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Traffic Analytics</h1>
          <span style={styles.subtitle}>Website and app performance</span>
        </div>
        <div style={styles.headerActions}>
          {/* Real-time indicator */}
          <div style={styles.realTimeIndicator}>
            <span style={styles.realTimeDot} />
            <span>{trafficData.realTime.currentVisitors} visitors now</span>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={styles.dateSelect}
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* AI Insights */}
      <div style={styles.aiInsightsRow}>
        {trafficData.aiInsights.map((insight, index) => (
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

      {/* Summary Metrics */}
      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <Users size={20} color="#3b82f6" />
            <span style={styles.metricLabel}>Total Visitors</span>
          </div>
          <div style={styles.metricValue}>{formatNumber(trafficData.summary.totalVisitors)}</div>
          <div style={styles.metricChange}>
            <ArrowUpRight size={14} color="#22c55e" />
            <span style={{ color: '#22c55e' }}>+{trafficData.summary.visitorsChange}%</span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <Eye size={20} color="#8b5cf6" />
            <span style={styles.metricLabel}>Page Views</span>
          </div>
          <div style={styles.metricValue}>{formatNumber(trafficData.summary.pageViews)}</div>
          <div style={styles.metricChange}>
            <ArrowUpRight size={14} color="#22c55e" />
            <span style={{ color: '#22c55e' }}>+{trafficData.summary.pageViewsChange}%</span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <Clock size={20} color="#22c55e" />
            <span style={styles.metricLabel}>Avg Session</span>
          </div>
          <div style={styles.metricValue}>{trafficData.summary.avgSessionDuration}</div>
          <div style={styles.metricChange}>
            <ArrowUpRight size={14} color="#22c55e" />
            <span style={{ color: '#22c55e' }}>+{trafficData.summary.durationChange}%</span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <MousePointer size={20} color="#f97316" />
            <span style={styles.metricLabel}>Bounce Rate</span>
          </div>
          <div style={styles.metricValue}>{trafficData.summary.bounceRate}%</div>
          <div style={styles.metricChange}>
            <ArrowDownRight size={14} color="#22c55e" />
            <span style={{ color: '#22c55e' }}>{trafficData.summary.bounceChange}%</span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <Target size={20} color="#ec4899" />
            <span style={styles.metricLabel}>Conversion Rate</span>
          </div>
          <div style={styles.metricValue}>{trafficData.summary.conversionRate}%</div>
          <div style={styles.metricChange}>
            <ArrowUpRight size={14} color="#22c55e" />
            <span style={{ color: '#22c55e' }}>+{trafficData.summary.conversionChange}%</span>
          </div>
        </div>
      </div>

      {/* Traffic Chart & Sources */}
      <div style={styles.twoColumnGrid}>
        {/* Traffic Chart */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Traffic Overview</h3>
            <div style={styles.chartLegend}>
              <span style={styles.legendItem}>
                <span style={{...styles.legendDot, backgroundColor: '#3b82f6'}} />
                Visitors
              </span>
            </div>
          </div>
          <div style={styles.trafficChart}>
            {trafficData.trafficOverTime.map((day, index) => (
              <div key={index} style={styles.trafficBarGroup}>
                <div style={styles.trafficBarContainer}>
                  <div style={{
                    ...styles.trafficBar,
                    height: `${(day.visitors / maxVisitors) * 150}px`
                  }}>
                    <span style={styles.trafficBarValue}>{formatNumber(day.visitors)}</span>
                  </div>
                </div>
                <span style={styles.trafficBarLabel}>{day.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Traffic Sources</h3>
          </div>
          <div style={styles.sourcesList}>
            {trafficData.trafficSources.map((source, index) => {
              const SourceIcon = getSourceIcon(source.icon);
              return (
                <div key={index} style={styles.sourceRow}>
                  <div style={styles.sourceIcon}>
                    <SourceIcon size={18} />
                  </div>
                  <div style={styles.sourceInfo}>
                    <span style={styles.sourceName}>{source.source}</span>
                    <span style={styles.sourceVisitors}>{formatNumber(source.visitors)} visitors</span>
                  </div>
                  <div style={styles.sourceStats}>
                    <span style={styles.sourcePercent}>{source.percent}%</span>
                    <span style={{
                      ...styles.sourceChange,
                      color: source.change >= 0 ? '#22c55e' : '#ef4444'
                    }}>
                      {source.change >= 0 ? '+' : ''}{source.change}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Conversion Funnel</h3>
          <span style={styles.funnelSummary}>
            {trafficData.conversionFunnel[trafficData.conversionFunnel.length - 1].percent}% overall conversion
          </span>
        </div>
        <div style={styles.funnelContainer}>
          {trafficData.conversionFunnel.map((stage, index) => (
            <div key={index} style={styles.funnelStage}>
              <div style={styles.funnelInfo}>
                <span style={styles.funnelStageName}>{stage.stage}</span>
                <span style={styles.funnelCount}>{formatNumber(stage.count)}</span>
              </div>
              <div style={styles.funnelBarContainer}>
                <div style={{
                  ...styles.funnelBar,
                  width: `${stage.percent}%`,
                  backgroundColor: index === trafficData.conversionFunnel.length - 1 ? '#22c55e' : '#3b82f6'
                }} />
              </div>
              <span style={styles.funnelPercent}>{stage.percent}%</span>
              {index < trafficData.conversionFunnel.length - 1 && (
                <div style={styles.funnelDropoff}>
                  <span style={styles.dropoffArrow}>↓</span>
                  <span style={styles.dropoffValue}>
                    {(trafficData.conversionFunnel[index].percent - trafficData.conversionFunnel[index + 1].percent).toFixed(1)}% drop
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Devices, Pages & Locations */}
      <div style={styles.threeColumnGrid}>
        {/* Device Breakdown */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Devices</h3>
          </div>
          <div style={styles.devicesContent}>
            <div style={styles.deviceCircle}>
              {trafficData.devices.map((device, index) => {
                const DeviceIcon = getDeviceIcon(device.icon);
                const rotation = index === 0 ? 0 : trafficData.devices.slice(0, index).reduce((a, b) => a + b.percent, 0) * 3.6;
                return (
                  <div key={index} style={{
                    ...styles.deviceSegmentLabel,
                    transform: `rotate(${rotation + device.percent * 1.8}deg) translateY(-80px)`
                  }}>
                  </div>
                );
              })}
              <div style={styles.deviceCenter}>
                <Smartphone size={24} color="#3b82f6" />
                <span style={styles.deviceCenterValue}>62%</span>
                <span style={styles.deviceCenterLabel}>Mobile</span>
              </div>
            </div>
            <div style={styles.devicesList}>
              {trafficData.devices.map((device, index) => {
                const DeviceIcon = getDeviceIcon(device.icon);
                return (
                  <div key={index} style={styles.deviceRow}>
                    <DeviceIcon size={18} />
                    <span style={styles.deviceName}>{device.device}</span>
                    <span style={styles.devicePercent}>{device.percent}%</span>
                    <span style={styles.deviceVisitors}>{formatNumber(device.visitors)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Top Pages</h3>
          </div>
          <div style={styles.pagesList}>
            {trafficData.topPages.slice(0, 5).map((page, index) => (
              <div key={index} style={styles.pageRow}>
                <div style={styles.pageInfo}>
                  <span style={styles.pagePath}>{page.page}</span>
                  <span style={styles.pageViews}>{formatNumber(page.views)} views</span>
                </div>
                <div style={styles.pageStats}>
                  <span style={styles.pageTime}>{page.avgTime}</span>
                  <span style={{
                    ...styles.pageBounce,
                    color: page.bounceRate < 40 ? '#22c55e' : page.bounceRate < 50 ? '#f59e0b' : '#ef4444'
                  }}>
                    {page.bounceRate}% bounce
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Top Locations</h3>
            <MapPin size={18} color="var(--color-text-muted)" />
          </div>
          <div style={styles.locationsList}>
            {trafficData.locations.map((location, index) => (
              <div key={index} style={styles.locationRow}>
                <div style={styles.locationInfo}>
                  <span style={styles.locationName}>{location.location}</span>
                  <span style={styles.locationVisitors}>{formatNumber(location.visitors)}</span>
                </div>
                <div style={styles.locationBar}>
                  <div style={{
                    ...styles.locationBarFill,
                    width: `${location.percent}%`
                  }} />
                </div>
                <span style={styles.locationPercent}>{location.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Terms & Real-time */}
      <div style={styles.twoColumnGrid}>
        {/* Search Terms */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Top Search Terms</h3>
            <Search size={18} color="var(--color-text-muted)" />
          </div>
          <div style={styles.searchTermsList}>
            {trafficData.searchTerms.map((term, index) => (
              <div key={index} style={styles.searchTermRow}>
                <div style={styles.searchTermInfo}>
                  <span style={styles.searchTerm}>"{term.term}"</span>
                  <span style={styles.searchClicks}>{formatNumber(term.clicks)} clicks</span>
                </div>
                <div style={styles.searchPosition}>
                  <span style={styles.positionValue}>#{term.position.toFixed(1)}</span>
                  <span style={styles.positionLabel}>avg position</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Activity */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Real-Time Activity</h3>
            <div style={styles.liveIndicator}>
              <span style={styles.liveDot} />
              LIVE
            </div>
          </div>
          <div style={styles.realTimeContent}>
            <div style={styles.realTimeMain}>
              <span style={styles.realTimeCount}>{trafficData.realTime.currentVisitors}</span>
              <span style={styles.realTimeLabel}>Active visitors right now</span>
            </div>
            <div style={styles.realTimePages}>
              <span style={styles.realTimePagesTitle}>Currently viewing:</span>
              {trafficData.realTime.topPages.map((page, index) => (
                <div key={index} style={styles.realTimePage}>
                  <span style={styles.realTimePagePath}>{page.page}</span>
                  <span style={styles.realTimePageCount}>{page.visitors}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Browser Breakdown */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h3 style={styles.cardTitle}>Browser Distribution</h3>
        </div>
        <div style={styles.browserBar}>
          {trafficData.browsers.map((browser, index) => (
            <div 
              key={index}
              style={{
                ...styles.browserSegment,
                width: `${browser.percent}%`,
                backgroundColor: ['#3b82f6', '#8b5cf6', '#f97316', '#22c55e', '#6b7280'][index]
              }}
            >
              {browser.percent >= 10 && (
                <span style={styles.browserLabel}>{browser.browser} {browser.percent}%</span>
              )}
            </div>
          ))}
        </div>
        <div style={styles.browserLegend}>
          {trafficData.browsers.map((browser, index) => (
            <div key={index} style={styles.browserLegendItem}>
              <span style={{
                ...styles.browserDot,
                backgroundColor: ['#3b82f6', '#8b5cf6', '#f97316', '#22c55e', '#6b7280'][index]
              }} />
              <span>{browser.browser}</span>
              <span style={styles.browserPercent}>{browser.percent}%</span>
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
    alignItems: 'center',
    gap: '16px'
  },
  realTimeIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#22c55e'
  },
  realTimeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#22c55e',
    animation: 'pulse 2s infinite'
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
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  metricCard: {
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  metricHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px'
  },
  metricLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  metricValue: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '8px'
  },
  metricChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px'
  },
  threeColumnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
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
  trafficChart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '24px',
    height: '220px'
  },
  trafficBarGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  trafficBarContainer: {
    height: '150px',
    display: 'flex',
    alignItems: 'flex-end'
  },
  trafficBar: {
    width: '40px',
    backgroundColor: '#3b82f6',
    borderRadius: '6px 6px 0 0',
    position: 'relative'
  },
  trafficBarValue: {
    position: 'absolute',
    top: '-24px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '11px',
    fontWeight: 600,
    whiteSpace: 'nowrap'
  },
  trafficBarLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  sourcesList: {
    padding: '16px 24px'
  },
  sourceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  sourceIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-primary)'
  },
  sourceInfo: {
    flex: 1
  },
  sourceName: {
    display: 'block',
    fontWeight: 600
  },
  sourceVisitors: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  sourceStats: {
    textAlign: 'right'
  },
  sourcePercent: {
    display: 'block',
    fontWeight: 600
  },
  sourceChange: {
    fontSize: '12px',
    fontWeight: 500
  },
  funnelSummary: {
    fontSize: '13px',
    color: '#22c55e',
    fontWeight: 600
  },
  funnelContainer: {
    padding: '24px'
  },
  funnelStage: {
    marginBottom: '20px'
  },
  funnelInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  funnelStageName: {
    fontWeight: 500
  },
  funnelCount: {
    fontWeight: 600
  },
  funnelBarContainer: {
    height: '32px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '4px'
  },
  funnelBar: {
    height: '100%',
    borderRadius: '8px',
    transition: 'width 0.3s'
  },
  funnelPercent: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  funnelDropoff: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
    paddingLeft: '16px'
  },
  dropoffArrow: {
    color: '#ef4444'
  },
  dropoffValue: {
    fontSize: '12px',
    color: '#ef4444'
  },
  devicesContent: {
    padding: '24px'
  },
  deviceCircle: {
    position: 'relative',
    width: '160px',
    height: '160px',
    margin: '0 auto 24px',
    borderRadius: '50%',
    background: 'conic-gradient(#3b82f6 0deg 223deg, #8b5cf6 223deg 331deg, #22c55e 331deg 360deg)'
  },
  deviceCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-surface)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px'
  },
  deviceCenterValue: {
    fontSize: '20px',
    fontWeight: 700
  },
  deviceCenterLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  devicesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  deviceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  deviceName: {
    flex: 1,
    fontWeight: 500
  },
  devicePercent: {
    fontWeight: 600
  },
  deviceVisitors: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    width: '80px',
    textAlign: 'right'
  },
  pagesList: {
    padding: '16px 24px'
  },
  pageRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  pageInfo: {},
  pagePath: {
    display: 'block',
    fontWeight: 600,
    fontFamily: 'monospace'
  },
  pageViews: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  pageStats: {
    textAlign: 'right'
  },
  pageTime: {
    display: 'block',
    fontSize: '13px'
  },
  pageBounce: {
    fontSize: '11px',
    fontWeight: 500
  },
  locationsList: {
    padding: '16px 24px'
  },
  locationRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  locationInfo: {
    width: '100px'
  },
  locationName: {
    display: 'block',
    fontWeight: 500,
    fontSize: '13px'
  },
  locationVisitors: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  locationBar: {
    flex: 1,
    height: '8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  locationBarFill: {
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '4px'
  },
  locationPercent: {
    width: '40px',
    textAlign: 'right',
    fontWeight: 600,
    fontSize: '13px'
  },
  searchTermsList: {
    padding: '16px 24px'
  },
  searchTermRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  searchTermInfo: {},
  searchTerm: {
    display: 'block',
    fontWeight: 500,
    fontStyle: 'italic'
  },
  searchClicks: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  searchPosition: {
    textAlign: 'right'
  },
  positionValue: {
    display: 'block',
    fontWeight: 700,
    color: '#22c55e'
  },
  positionLabel: {
    fontSize: '10px',
    color: 'var(--color-text-muted)'
  },
  liveIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 700,
    color: '#ef4444'
  },
  liveDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#ef4444',
    animation: 'pulse 1s infinite'
  },
  realTimeContent: {
    padding: '24px'
  },
  realTimeMain: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  realTimeCount: {
    display: 'block',
    fontSize: '48px',
    fontWeight: 700,
    color: 'var(--color-primary)'
  },
  realTimeLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  realTimePages: {},
  realTimePagesTitle: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    marginBottom: '12px'
  },
  realTimePage: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  realTimePagePath: {
    fontFamily: 'monospace',
    fontSize: '13px'
  },
  realTimePageCount: {
    fontWeight: 600
  },
  browserBar: {
    display: 'flex',
    height: '40px',
    margin: '20px 24px',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  browserSegment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  browserLabel: {
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: 600
  },
  browserLegend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    padding: '0 24px 24px'
  },
  browserLegendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px'
  },
  browserDot: {
    width: '10px',
    height: '10px',
    borderRadius: '3px'
  },
  browserPercent: {
    fontWeight: 600,
    color: 'var(--color-text-muted)'
  }
};

export default TrafficAnalytics;