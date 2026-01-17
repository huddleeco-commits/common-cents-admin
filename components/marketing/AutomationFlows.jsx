/**
 * AutomationFlows
 * 
 * Marketing automation management:
 * - Welcome series
 * - Abandoned cart recovery
 * - Post-purchase follow-up
 * - Win-back campaigns
 * - Birthday/anniversary emails
 * - Browse abandonment
 * - Custom trigger flows
 * - Visual flow builder
 * - Performance analytics
 */

import React, { useState, useEffect } from 'react';
import {
  Zap,
  Play,
  Pause,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  MoreHorizontal,
  Mail,
  MessageSquare,
  Clock,
  Users,
  ShoppingCart,
  UserPlus,
  Gift,
  Calendar,
  Eye,
  TrendingUp,
  DollarSign,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  AlertTriangle,
  CheckCircle,
  Settings,
  RefreshCw,
  Target,
  MousePointer,
  Send,
  Timer,
  GitBranch,
  Layers,
  Activity,
  BarChart3,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export function AutomationFlows() {
  const [loading, setLoading] = useState(true);
  const [automations, setAutomations] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAutomation, setSelectedAutomation] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalRevenue: 42850,
        revenueChange: 22.4,
        activeFlows: 6,
        emailsSent: 8420,
        emailsChange: 15.2,
        avgConversion: 12.8,
        conversionChange: 3.1
      });

      setAutomations([
        {
          id: 1,
          name: 'Welcome Series',
          description: 'Onboard new subscribers with a 3-email sequence',
          trigger: 'signup',
          triggerLabel: 'New Signup',
          status: 'active',
          steps: [
            { type: 'email', name: 'Welcome Email', delay: '0', sent: 1240, opened: 868, clicked: 248 },
            { type: 'delay', duration: '2 days' },
            { type: 'email', name: 'Getting Started Guide', delay: '2d', sent: 1180, opened: 590, clicked: 142 },
            { type: 'delay', duration: '3 days' },
            { type: 'email', name: 'First Purchase Offer', delay: '5d', sent: 1050, opened: 420, clicked: 105 }
          ],
          metrics: {
            entered: 1240,
            completed: 890,
            converted: 186,
            revenue: 9300,
            conversionRate: 15.0,
            openRate: 50.2,
            clickRate: 13.3
          },
          lastTriggered: '2024-01-15T14:32:00',
          createdAt: '2023-09-01'
        },
        {
          id: 2,
          name: 'Abandoned Cart Recovery',
          description: 'Recover lost sales with timely reminders',
          trigger: 'cart_abandon',
          triggerLabel: 'Cart Abandoned',
          status: 'active',
          steps: [
            { type: 'delay', duration: '1 hour' },
            { type: 'email', name: 'You left something behind', delay: '1h', sent: 890, opened: 445, clicked: 178 },
            { type: 'condition', condition: 'not_purchased' },
            { type: 'delay', duration: '24 hours' },
            { type: 'email', name: 'Your cart is waiting', delay: '25h', sent: 650, opened: 286, clicked: 98 },
            { type: 'condition', condition: 'not_purchased' },
            { type: 'delay', duration: '48 hours' },
            { type: 'email', name: 'Final reminder + 10% off', delay: '73h', sent: 420, opened: 168, clicked: 67 }
          ],
          metrics: {
            entered: 890,
            completed: 420,
            converted: 134,
            revenue: 12680,
            conversionRate: 15.1,
            openRate: 45.8,
            clickRate: 17.5
          },
          lastTriggered: '2024-01-15T16:45:00',
          createdAt: '2023-10-15'
        },
        {
          id: 3,
          name: 'Post-Purchase Follow-up',
          description: 'Thank customers and encourage reviews',
          trigger: 'purchase',
          triggerLabel: 'Order Completed',
          status: 'active',
          steps: [
            { type: 'email', name: 'Thank you for your order', delay: '0', sent: 2100, opened: 1680, clicked: 420 },
            { type: 'delay', duration: '7 days' },
            { type: 'email', name: 'How are you enjoying your purchase?', delay: '7d', sent: 1950, opened: 780, clicked: 234 },
            { type: 'delay', duration: '14 days' },
            { type: 'email', name: 'Leave a review', delay: '21d', sent: 1800, opened: 540, clicked: 162 }
          ],
          metrics: {
            entered: 2100,
            completed: 1800,
            converted: 315,
            revenue: 7875,
            conversionRate: 15.0,
            openRate: 47.6,
            clickRate: 12.9
          },
          lastTriggered: '2024-01-15T11:20:00',
          createdAt: '2023-08-20'
        },
        {
          id: 4,
          name: 'Win-Back Campaign',
          description: 'Re-engage inactive customers',
          trigger: 'inactive_60d',
          triggerLabel: 'Inactive 60 Days',
          status: 'active',
          steps: [
            { type: 'email', name: 'We miss you!', delay: '0', sent: 450, opened: 135, clicked: 45 },
            { type: 'condition', condition: 'not_engaged' },
            { type: 'delay', duration: '7 days' },
            { type: 'email', name: 'Special offer just for you', delay: '7d', sent: 380, opened: 95, clicked: 38 },
            { type: 'condition', condition: 'not_engaged' },
            { type: 'delay', duration: '14 days' },
            { type: 'sms', name: 'Last chance: 25% off', delay: '21d', sent: 320, clicked: 48 }
          ],
          metrics: {
            entered: 450,
            completed: 320,
            converted: 45,
            revenue: 3150,
            conversionRate: 10.0,
            openRate: 30.0,
            clickRate: 10.5
          },
          lastTriggered: '2024-01-14T09:00:00',
          createdAt: '2023-11-01'
        },
        {
          id: 5,
          name: 'Birthday Rewards',
          description: 'Send special offers on customer birthdays',
          trigger: 'birthday',
          triggerLabel: 'Birthday',
          status: 'active',
          steps: [
            { type: 'email', name: 'Happy Birthday! 🎂', delay: '0', sent: 234, opened: 187, clicked: 89 },
            { type: 'delay', duration: '7 days' },
            { type: 'condition', condition: 'not_redeemed' },
            { type: 'email', name: 'Your birthday gift expires soon', delay: '7d', sent: 145, opened: 87, clicked: 35 }
          ],
          metrics: {
            entered: 234,
            completed: 234,
            converted: 98,
            revenue: 4900,
            conversionRate: 41.9,
            openRate: 79.9,
            clickRate: 38.0
          },
          lastTriggered: '2024-01-15T00:00:00',
          createdAt: '2023-12-01'
        },
        {
          id: 6,
          name: 'Browse Abandonment',
          description: 'Follow up when visitors view but don\'t buy',
          trigger: 'browse_abandon',
          triggerLabel: 'Browsed Products',
          status: 'paused',
          steps: [
            { type: 'delay', duration: '4 hours' },
            { type: 'email', name: 'Still interested?', delay: '4h', sent: 560, opened: 168, clicked: 56 },
            { type: 'condition', condition: 'not_purchased' },
            { type: 'delay', duration: '2 days' },
            { type: 'email', name: 'Items you viewed are selling fast', delay: '52h', sent: 420, opened: 105, clicked: 42 }
          ],
          metrics: {
            entered: 560,
            completed: 420,
            converted: 34,
            revenue: 2040,
            conversionRate: 6.1,
            openRate: 27.5,
            clickRate: 9.8
          },
          lastTriggered: '2024-01-10T18:30:00',
          createdAt: '2023-11-15',
          pauseReason: 'Optimizing email content'
        },
        {
          id: 7,
          name: 'VIP Tier Upgrade',
          description: 'Congratulate customers on reaching VIP status',
          trigger: 'vip_upgrade',
          triggerLabel: 'VIP Status Reached',
          status: 'active',
          steps: [
            { type: 'email', name: 'Welcome to VIP! 🌟', delay: '0', sent: 89, opened: 80, clicked: 45 },
            { type: 'delay', duration: '3 days' },
            { type: 'email', name: 'Your exclusive VIP benefits', delay: '3d', sent: 85, opened: 68, clicked: 34 }
          ],
          metrics: {
            entered: 89,
            completed: 85,
            converted: 42,
            revenue: 6300,
            conversionRate: 47.2,
            openRate: 89.9,
            clickRate: 50.6
          },
          lastTriggered: '2024-01-13T10:15:00',
          createdAt: '2023-12-10'
        },
        {
          id: 8,
          name: 'Review Request',
          description: 'Ask for reviews after product delivery',
          trigger: 'delivered',
          triggerLabel: 'Order Delivered',
          status: 'draft',
          steps: [
            { type: 'delay', duration: '3 days' },
            { type: 'email', name: 'How was your purchase?', delay: '3d', sent: 0, opened: 0, clicked: 0 }
          ],
          metrics: {
            entered: 0,
            completed: 0,
            converted: 0,
            revenue: 0,
            conversionRate: 0,
            openRate: 0,
            clickRate: 0
          },
          lastTriggered: null,
          createdAt: '2024-01-14'
        }
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercent = (num) => {
    return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return 'Never';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getTriggerIcon = (trigger) => {
    switch (trigger) {
      case 'signup': return <UserPlus size={16} />;
      case 'cart_abandon': return <ShoppingCart size={16} />;
      case 'purchase': return <DollarSign size={16} />;
      case 'inactive_60d': return <Clock size={16} />;
      case 'birthday': return <Gift size={16} />;
      case 'browse_abandon': return <Eye size={16} />;
      case 'vip_upgrade': return <Target size={16} />;
      case 'delivered': return <CheckCircle size={16} />;
      default: return <Zap size={16} />;
    }
  };

  const getTriggerColor = (trigger) => {
    switch (trigger) {
      case 'signup': return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' };
      case 'cart_abandon': return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316' };
      case 'purchase': return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' };
      case 'inactive_60d': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      case 'birthday': return { bg: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' };
      case 'browse_abandon': return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' };
      case 'vip_upgrade': return { bg: 'rgba(251, 191, 36, 0.1)', color: '#f59e0b' };
      case 'delivered': return { bg: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6' };
      default: return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' };
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', icon: <Play size={10} /> };
      case 'paused':
        return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316', icon: <Pause size={10} /> };
      case 'draft':
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', icon: <Edit size={10} /> };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', icon: null };
    }
  };

  const getStepIcon = (type) => {
    switch (type) {
      case 'email': return <Mail size={14} />;
      case 'sms': return <MessageSquare size={14} />;
      case 'delay': return <Timer size={14} />;
      case 'condition': return <GitBranch size={14} />;
      default: return <Zap size={14} />;
    }
  };

  const filteredAutomations = automations.filter(auto => {
    const matchesSearch = auto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auto.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && auto.status === activeTab;
  });

  const tabCounts = {
    all: automations.length,
    active: automations.filter(a => a.status === 'active').length,
    paused: automations.filter(a => a.status === 'paused').length,
    draft: automations.filter(a => a.status === 'draft').length
  };

  const templates = [
    { id: 'welcome', name: 'Welcome Series', icon: UserPlus, desc: 'Onboard new subscribers' },
    { id: 'cart', name: 'Abandoned Cart', icon: ShoppingCart, desc: 'Recover lost sales' },
    { id: 'post_purchase', name: 'Post-Purchase', icon: DollarSign, desc: 'Follow up after orders' },
    { id: 'winback', name: 'Win-Back', icon: RefreshCw, desc: 'Re-engage inactive users' },
    { id: 'birthday', name: 'Birthday', icon: Gift, desc: 'Celebrate customer birthdays' },
    { id: 'browse', name: 'Browse Abandonment', icon: Eye, desc: 'Follow up on viewed items' },
    { id: 'custom', name: 'Custom Flow', icon: Sparkles, desc: 'Build from scratch' }
  ];

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Zap size={48} style={{ opacity: 0.5 }} />
        <p>Loading automations...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Automations</h1>
          <p style={styles.subtitle}>Automated marketing flows & sequences</p>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.primaryBtn} onClick={() => setShowCreateModal(true)}>
            <Plus size={18} />
            Create Automation
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
              <DollarSign size={20} color="#22c55e" />
            </div>
            <span style={{...styles.statChange, color: '#22c55e'}}>
              <ArrowUpRight size={14} />
              {formatPercent(stats.revenueChange)}
            </span>
          </div>
          <div style={styles.statValue}>{formatCurrency(stats.totalRevenue)}</div>
          <div style={styles.statLabel}>Automation Revenue</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)'}}>
              <Zap size={20} color="#8b5cf6" />
            </div>
          </div>
          <div style={styles.statValue}>{stats.activeFlows}</div>
          <div style={styles.statLabel}>Active Flows</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
              <Send size={20} color="#3b82f6" />
            </div>
            <span style={{...styles.statChange, color: '#22c55e'}}>
              <ArrowUpRight size={14} />
              {formatPercent(stats.emailsChange)}
            </span>
          </div>
          <div style={styles.statValue}>{formatNumber(stats.emailsSent)}</div>
          <div style={styles.statLabel}>Emails Sent</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statHeader}>
            <div style={{...styles.statIcon, backgroundColor: 'rgba(249, 115, 22, 0.1)'}}>
              <TrendingUp size={20} color="#f97316" />
            </div>
            <span style={{...styles.statChange, color: '#22c55e'}}>
              <ArrowUpRight size={14} />
              {formatPercent(stats.conversionChange)}
            </span>
          </div>
          <div style={styles.statValue}>{stats.avgConversion}%</div>
          <div style={styles.statLabel}>Avg Conversion</div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div style={styles.toolbar}>
        <div style={styles.tabs}>
          {[
            { id: 'all', label: 'All' },
            { id: 'active', label: 'Active' },
            { id: 'paused', label: 'Paused' },
            { id: 'draft', label: 'Draft' }
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
                {tabCounts[tab.id]}
              </span>
            </button>
          ))}
        </div>

        <div style={styles.searchBox}>
          <Search size={18} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search automations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Automations List */}
      <div style={styles.automationsList}>
        {filteredAutomations.map((automation) => {
          const triggerStyle = getTriggerColor(automation.trigger);
          const statusStyle = getStatusStyle(automation.status);
          const emailSteps = automation.steps.filter(s => s.type === 'email' || s.type === 'sms');

          return (
            <div key={automation.id} style={styles.automationCard}>
              {/* Card Header */}
              <div style={styles.cardHeader}>
                <div style={styles.cardHeaderLeft}>
                  <div style={{
                    ...styles.triggerBadge,
                    backgroundColor: triggerStyle.bg,
                    color: triggerStyle.color
                  }}>
                    {getTriggerIcon(automation.trigger)}
                    {automation.triggerLabel}
                  </div>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.color
                  }}>
                    {statusStyle.icon}
                    {automation.status}
                  </span>
                </div>
                <div style={styles.cardActions}>
                  <button style={styles.iconBtn} title="View Analytics">
                    <BarChart3 size={16} />
                  </button>
                  <button style={styles.iconBtn} title="Edit">
                    <Edit size={16} />
                  </button>
                  <button style={styles.iconBtn} title="More">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div style={styles.cardBody}>
                <h3 style={styles.automationName}>{automation.name}</h3>
                <p style={styles.automationDesc}>{automation.description}</p>

                {/* Flow Preview */}
                <div style={styles.flowPreview}>
                  <div style={styles.flowSteps}>
                    {automation.steps.slice(0, 6).map((step, index) => (
                      <React.Fragment key={index}>
                        <div style={{
                          ...styles.flowStep,
                          backgroundColor: step.type === 'email' ? 'rgba(59, 130, 246, 0.1)' :
                            step.type === 'sms' ? 'rgba(34, 197, 94, 0.1)' :
                            step.type === 'delay' ? 'rgba(107, 114, 128, 0.1)' :
                            'rgba(249, 115, 22, 0.1)',
                          color: step.type === 'email' ? '#3b82f6' :
                            step.type === 'sms' ? '#22c55e' :
                            step.type === 'delay' ? '#6b7280' :
                            '#f97316'
                        }}>
                          {getStepIcon(step.type)}
                        </div>
                        {index < automation.steps.slice(0, 6).length - 1 && (
                          <div style={styles.flowConnector} />
                        )}
                      </React.Fragment>
                    ))}
                    {automation.steps.length > 6 && (
                      <span style={styles.moreSteps}>+{automation.steps.length - 6}</span>
                    )}
                  </div>
                  <span style={styles.stepsCount}>
                    {emailSteps.length} messages • {automation.steps.filter(s => s.type === 'delay').length} delays
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div style={styles.metricsGrid}>
                <div style={styles.metric}>
                  <span style={styles.metricValue}>{formatNumber(automation.metrics.entered)}</span>
                  <span style={styles.metricLabel}>Entered</span>
                </div>
                <div style={styles.metric}>
                  <span style={styles.metricValue}>{automation.metrics.openRate.toFixed(1)}%</span>
                  <span style={styles.metricLabel}>Open Rate</span>
                </div>
                <div style={styles.metric}>
                  <span style={styles.metricValue}>{automation.metrics.clickRate.toFixed(1)}%</span>
                  <span style={styles.metricLabel}>Click Rate</span>
                </div>
                <div style={styles.metric}>
                  <span style={{...styles.metricValue, color: '#22c55e'}}>
                    {automation.metrics.conversionRate.toFixed(1)}%
                  </span>
                  <span style={styles.metricLabel}>Conversion</span>
                </div>
                <div style={styles.metric}>
                  <span style={{...styles.metricValue, color: '#22c55e'}}>
                    {formatCurrency(automation.metrics.revenue)}
                  </span>
                  <span style={styles.metricLabel}>Revenue</span>
                </div>
              </div>

              {/* Card Footer */}
              <div style={styles.cardFooter}>
                <span style={styles.lastTriggered}>
                  <Activity size={12} />
                  Last triggered: {formatDateTime(automation.lastTriggered)}
                </span>
                <div style={styles.footerActions}>
                  {automation.status === 'active' ? (
                    <button style={{...styles.footerBtn, color: '#f59e0b'}}>
                      <Pause size={14} />
                      Pause
                    </button>
                  ) : automation.status === 'paused' ? (
                    <button style={{...styles.footerBtn, color: '#22c55e'}}>
                      <Play size={14} />
                      Resume
                    </button>
                  ) : (
                    <button style={{...styles.footerBtn, color: '#3b82f6'}}>
                      <Play size={14} />
                      Activate
                    </button>
                  )}
                  <button style={styles.footerBtn}>
                    <Copy size={14} />
                    Duplicate
                  </button>
                </div>
              </div>

              {/* Pause Reason */}
              {automation.pauseReason && (
                <div style={styles.pauseReason}>
                  <AlertTriangle size={14} />
                  {automation.pauseReason}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAutomations.length === 0 && (
        <div style={styles.emptyState}>
          <Zap size={48} color="var(--color-text-muted)" />
          <h3>No automations found</h3>
          <p>Create your first automation to start engaging customers automatically</p>
          <button style={styles.primaryBtn} onClick={() => setShowCreateModal(true)}>
            <Plus size={18} />
            Create Automation
          </button>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div style={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Create Automation</h2>
              <button style={styles.modalClose} onClick={() => setShowCreateModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <p style={styles.modalSubtitle}>Choose a template or start from scratch</p>
              <div style={styles.templateGrid}>
                {templates.map((template) => {
                  const TemplateIcon = template.icon;
                  return (
                    <button key={template.id} style={styles.templateCard}>
                      <div style={styles.templateIcon}>
                        <TemplateIcon size={24} />
                      </div>
                      <span style={styles.templateName}>{template.name}</span>
                      <span style={styles.templateDesc}>{template.desc}</span>
                      <ChevronRight size={16} style={styles.templateArrow} />
                    </button>
                  );
                })}
              </div>
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
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '20px'
  },
  tabs: {
    display: 'flex',
    gap: '4px'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
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
  automationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  automationCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface-2)'
  },
  cardHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  triggerBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 600
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
  cardActions: {
    display: 'flex',
    gap: '4px'
  },
  iconBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  cardBody: {
    padding: '20px'
  },
  automationName: {
    fontSize: '18px',
    fontWeight: 600,
    margin: '0 0 6px 0'
  },
  automationDesc: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '0 0 16px 0'
  },
  flowPreview: {
    marginBottom: '16px'
  },
  flowSteps: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    marginBottom: '8px'
  },
  flowStep: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flowConnector: {
    width: '20px',
    height: '2px',
    backgroundColor: 'var(--color-border)'
  },
  moreSteps: {
    marginLeft: '8px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  stepsCount: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px',
    padding: '16px 20px',
    borderTop: '1px solid var(--color-border)',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface-2)'
  },
  metric: {
    textAlign: 'center'
  },
  metricValue: {
    display: 'block',
    fontSize: '18px',
    fontWeight: 700,
    marginBottom: '2px'
  },
  metricLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px'
  },
  lastTriggered: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  footerActions: {
    display: 'flex',
    gap: '8px'
  },
  footerBtn: {
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
  pauseReason: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    color: '#f97316',
    fontSize: '13px'
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
    maxWidth: '700px',
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
  modalSubtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '0 0 20px 0'
  },
  templateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  },
  templateCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '20px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease'
  },
  templateIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-primary)',
    marginBottom: '4px'
  },
  templateName: {
    fontSize: '15px',
    fontWeight: 600
  },
  templateDesc: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  templateArrow: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-text-muted)'
  }
};

export default AutomationFlows;