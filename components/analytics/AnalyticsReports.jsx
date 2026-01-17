/**
 * AnalyticsReports
 * 
 * Report generation and management:
 * - Pre-built report templates
 * - Custom report builder
 * - Scheduled reports
 * - Export (PDF, Excel, CSV)
 * - Report history
 * - Email delivery settings
 */

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Mail,
  Calendar,
  Clock,
  Play,
  Pause,
  Edit,
  Trash2,
  Copy,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  Eye,
  Send,
  RefreshCw,
  Settings,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  AlertTriangle,
  CheckCircle,
  FileSpreadsheet,
  File,
  Sparkles,
  Layers,
  Star,
  StarOff
} from 'lucide-react';

export function AnalyticsReports() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState([]);
  const [scheduledReports, setScheduledReports] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setReports([
        {
          id: 1,
          name: 'Monthly Sales Summary',
          description: 'Complete sales overview with trends and comparisons',
          category: 'sales',
          type: 'template',
          lastRun: '2024-01-15T09:00:00',
          lastRunStatus: 'success',
          isFavorite: true,
          createdAt: '2023-06-01',
          schedule: { frequency: 'monthly', day: 1, time: '09:00' }
        },
        {
          id: 2,
          name: 'Weekly Inventory Report',
          description: 'Stock levels, movements, and alerts',
          category: 'inventory',
          type: 'template',
          lastRun: '2024-01-14T08:00:00',
          lastRunStatus: 'success',
          isFavorite: true,
          createdAt: '2023-07-15',
          schedule: { frequency: 'weekly', day: 'monday', time: '08:00' }
        },
        {
          id: 3,
          name: 'Customer Acquisition Report',
          description: 'New customers, sources, and conversion rates',
          category: 'customers',
          type: 'template',
          lastRun: '2024-01-15T10:30:00',
          lastRunStatus: 'success',
          isFavorite: false,
          createdAt: '2023-08-20',
          schedule: null
        },
        {
          id: 4,
          name: 'Product Performance',
          description: 'Top sellers, margins, and inventory turnover',
          category: 'products',
          type: 'template',
          lastRun: '2024-01-13T14:00:00',
          lastRunStatus: 'success',
          isFavorite: true,
          createdAt: '2023-09-10',
          schedule: { frequency: 'weekly', day: 'friday', time: '14:00' }
        },
        {
          id: 5,
          name: 'Daily Revenue Snapshot',
          description: 'Quick daily revenue and order summary',
          category: 'sales',
          type: 'template',
          lastRun: '2024-01-15T18:00:00',
          lastRunStatus: 'success',
          isFavorite: false,
          createdAt: '2023-10-01',
          schedule: { frequency: 'daily', time: '18:00' }
        },
        {
          id: 6,
          name: 'Q4 2023 Analysis',
          description: 'Custom quarterly performance report',
          category: 'sales',
          type: 'custom',
          lastRun: '2024-01-02T11:00:00',
          lastRunStatus: 'success',
          isFavorite: false,
          createdAt: '2024-01-02',
          schedule: null
        },
        {
          id: 7,
          name: 'Customer Retention Analysis',
          description: 'Churn rates, retention by segment, lifetime value',
          category: 'customers',
          type: 'template',
          lastRun: '2024-01-10T09:00:00',
          lastRunStatus: 'success',
          isFavorite: false,
          createdAt: '2023-11-15',
          schedule: { frequency: 'monthly', day: 10, time: '09:00' }
        },
        {
          id: 8,
          name: 'Marketing ROI Report',
          description: 'Campaign performance and return on investment',
          category: 'marketing',
          type: 'template',
          lastRun: '2024-01-08T16:00:00',
          lastRunStatus: 'failed',
          isFavorite: false,
          createdAt: '2023-12-01',
          schedule: { frequency: 'weekly', day: 'monday', time: '09:00' }
        },
        {
          id: 9,
          name: 'Supplier Performance',
          description: 'Vendor reliability, lead times, and costs',
          category: 'inventory',
          type: 'custom',
          lastRun: null,
          lastRunStatus: null,
          isFavorite: false,
          createdAt: '2024-01-10',
          schedule: null
        }
      ]);

      setScheduledReports([
        { id: 1, reportId: 1, name: 'Monthly Sales Summary', frequency: 'Monthly', nextRun: '2024-02-01T09:00:00', recipients: 3, status: 'active' },
        { id: 2, reportId: 2, name: 'Weekly Inventory Report', frequency: 'Weekly', nextRun: '2024-01-22T08:00:00', recipients: 2, status: 'active' },
        { id: 3, reportId: 4, name: 'Product Performance', frequency: 'Weekly', nextRun: '2024-01-19T14:00:00', recipients: 4, status: 'active' },
        { id: 4, reportId: 5, name: 'Daily Revenue Snapshot', frequency: 'Daily', nextRun: '2024-01-16T18:00:00', recipients: 1, status: 'active' },
        { id: 5, reportId: 8, name: 'Marketing ROI Report', frequency: 'Weekly', nextRun: '2024-01-22T09:00:00', recipients: 2, status: 'paused' }
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const formatDateTime = (dateStr) => {
    if (!dateStr) return 'Never';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const formatNextRun = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = date - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 1) return `in ${diffDays} days`;
    if (diffDays === 1) return 'Tomorrow';
    if (diffHours > 0) return `in ${diffHours} hours`;
    return 'Soon';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'sales': return <DollarSign size={16} />;
      case 'inventory': return <Package size={16} />;
      case 'customers': return <Users size={16} />;
      case 'products': return <ShoppingCart size={16} />;
      case 'marketing': return <TrendingUp size={16} />;
      default: return <BarChart3 size={16} />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'sales': return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' };
      case 'inventory': return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' };
      case 'customers': return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' };
      case 'products': return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316' };
      case 'marketing': return { bg: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' };
      default: return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' };
    }
  };

  const toggleFavorite = (reportId) => {
    setReports(prev => prev.map(r =>
      r.id === reportId ? { ...r, isFavorite: !r.isFavorite } : r
    ));
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'favorites') return matchesSearch && report.isFavorite;
    if (activeTab === 'scheduled') return matchesSearch && report.schedule;
    if (activeTab === 'custom') return matchesSearch && report.type === 'custom';
    return matchesSearch && report.category === activeTab;
  });

  const reportTemplates = [
    { id: 'sales', name: 'Sales Report', icon: DollarSign, desc: 'Revenue, orders, and trends' },
    { id: 'inventory', name: 'Inventory Report', icon: Package, desc: 'Stock levels and movements' },
    { id: 'customers', name: 'Customer Report', icon: Users, desc: 'Acquisition and retention' },
    { id: 'products', name: 'Product Report', icon: ShoppingCart, desc: 'Performance and margins' },
    { id: 'marketing', name: 'Marketing Report', icon: TrendingUp, desc: 'Campaigns and ROI' },
    { id: 'custom', name: 'Custom Report', icon: Sparkles, desc: 'Build from scratch' }
  ];

  const tabCounts = {
    all: reports.length,
    favorites: reports.filter(r => r.isFavorite).length,
    scheduled: reports.filter(r => r.schedule).length,
    custom: reports.filter(r => r.type === 'custom').length
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <FileText size={48} style={{ opacity: 0.5 }} />
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Reports</h1>
          <p style={styles.subtitle}>Generate, schedule, and export analytics reports</p>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.secondaryBtn}>
            <RefreshCw size={16} />
            Run All Scheduled
          </button>
          <button style={styles.primaryBtn} onClick={() => setShowCreateModal(true)}>
            <Plus size={18} />
            Create Report
          </button>
        </div>
      </div>

      {/* Scheduled Reports Section */}
      <div style={styles.scheduledSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>
            <Calendar size={18} />
            Scheduled Reports
          </h3>
          <span style={styles.sectionBadge}>{scheduledReports.filter(s => s.status === 'active').length} active</span>
        </div>
        <div style={styles.scheduledGrid}>
          {scheduledReports.slice(0, 4).map((scheduled) => (
            <div key={scheduled.id} style={styles.scheduledCard}>
              <div style={styles.scheduledHeader}>
                <span style={styles.scheduledName}>{scheduled.name}</span>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: scheduled.status === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(249, 115, 22, 0.1)',
                  color: scheduled.status === 'active' ? '#22c55e' : '#f97316'
                }}>
                  {scheduled.status === 'active' ? <Play size={10} /> : <Pause size={10} />}
                  {scheduled.status}
                </span>
              </div>
              <div style={styles.scheduledMeta}>
                <span style={styles.scheduledFreq}>
                  <RefreshCw size={12} />
                  {scheduled.frequency}
                </span>
                <span style={styles.scheduledNext}>
                  <Clock size={12} />
                  {formatNextRun(scheduled.nextRun)}
                </span>
                <span style={styles.scheduledRecipients}>
                  <Mail size={12} />
                  {scheduled.recipients} recipient{scheduled.recipients !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs & Search */}
      <div style={styles.toolbar}>
        <div style={styles.tabs}>
          {[
            { id: 'all', label: 'All Reports' },
            { id: 'favorites', label: 'Favorites' },
            { id: 'scheduled', label: 'Scheduled' },
            { id: 'custom', label: 'Custom' }
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
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Reports Grid */}
      <div style={styles.reportsGrid}>
        {filteredReports.map((report) => {
          const categoryStyle = getCategoryColor(report.category);
          return (
            <div key={report.id} style={styles.reportCard}>
              <div style={styles.cardHeader}>
                <div style={{
                  ...styles.categoryIcon,
                  backgroundColor: categoryStyle.bg,
                  color: categoryStyle.color
                }}>
                  {getCategoryIcon(report.category)}
                </div>
                <div style={styles.cardActions}>
                  <button
                    style={{
                      ...styles.iconBtn,
                      color: report.isFavorite ? '#f59e0b' : 'var(--color-text-muted)'
                    }}
                    onClick={() => toggleFavorite(report.id)}
                  >
                    {report.isFavorite ? <Star size={16} fill="#f59e0b" /> : <StarOff size={16} />}
                  </button>
                  <button style={styles.iconBtn}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              <h3 style={styles.reportName}>{report.name}</h3>
              <p style={styles.reportDesc}>{report.description}</p>

              <div style={styles.reportMeta}>
                <span style={{
                  ...styles.categoryBadge,
                  backgroundColor: categoryStyle.bg,
                  color: categoryStyle.color
                }}>
                  {report.category}
                </span>
                {report.type === 'custom' && (
                  <span style={styles.customBadge}>Custom</span>
                )}
                {report.schedule && (
                  <span style={styles.scheduleBadge}>
                    <Clock size={10} />
                    {report.schedule.frequency}
                  </span>
                )}
              </div>

              <div style={styles.lastRun}>
                {report.lastRunStatus === 'success' && (
                  <CheckCircle size={12} color="#22c55e" />
                )}
                {report.lastRunStatus === 'failed' && (
                  <AlertTriangle size={12} color="#ef4444" />
                )}
                <span>Last run: {formatDateTime(report.lastRun)}</span>
              </div>

              <div style={styles.cardFooter}>
                <button style={styles.runBtn}>
                  <Play size={14} />
                  Run Now
                </button>
                <div style={styles.exportBtns}>
                  <button style={styles.exportBtn} title="Export PDF">
                    <File size={14} />
                  </button>
                  <button style={styles.exportBtn} title="Export Excel">
                    <FileSpreadsheet size={14} />
                  </button>
                  <button style={styles.exportBtn} title="Email Report">
                    <Mail size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Create New Card */}
        <button style={styles.createCard} onClick={() => setShowCreateModal(true)}>
          <div style={styles.createIcon}>
            <Plus size={32} />
          </div>
          <span style={styles.createText}>Create Report</span>
          <span style={styles.createHint}>Build a custom report</span>
        </button>
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <div style={styles.emptyState}>
          <FileText size={48} color="var(--color-text-muted)" />
          <h3>No reports found</h3>
          <p>Create your first report to start tracking performance</p>
          <button style={styles.primaryBtn} onClick={() => setShowCreateModal(true)}>
            <Plus size={18} />
            Create Report
          </button>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div style={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Create Report</h2>
              <button style={styles.modalClose} onClick={() => setShowCreateModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <p style={styles.modalSubtitle}>Choose a report template to get started</p>
              <div style={styles.templateGrid}>
                {reportTemplates.map((template) => {
                  const TemplateIcon = template.icon;
                  const categoryStyle = getCategoryColor(template.id);
                  return (
                    <button key={template.id} style={styles.templateCard}>
                      <div style={{
                        ...styles.templateIcon,
                        backgroundColor: categoryStyle.bg,
                        color: categoryStyle.color
                      }}>
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
  secondaryBtn: {
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
  scheduledSection: {
    marginBottom: '24px'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  sectionBadge: {
    padding: '4px 10px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    color: '#22c55e',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 500
  },
  scheduledGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px'
  },
  scheduledCard: {
    padding: '16px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  scheduledHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  scheduledName: {
    fontSize: '14px',
    fontWeight: 600,
    flex: 1,
    marginRight: '8px'
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  scheduledMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px'
  },
  scheduledFreq: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  scheduledNext: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  scheduledRecipients: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
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
  reportsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  reportCard: {
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  categoryIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  reportName: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 6px 0'
  },
  reportDesc: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: '0 0 16px 0',
    lineHeight: 1.4
  },
  reportMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '12px'
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  customBadge: {
    padding: '4px 10px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    color: '#8b5cf6',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600
  },
  scheduleBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    backgroundColor: 'rgba(107, 114, 128, 0.1)',
    color: '#6b7280',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  lastRun: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginBottom: '16px'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid var(--color-border)'
  },
  runBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  exportBtns: {
    display: 'flex',
    gap: '4px'
  },
  exportBtn: {
    padding: '8px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  createCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '40px 20px',
    backgroundColor: 'transparent',
    border: '2px dashed var(--color-border)',
    borderRadius: '16px',
    cursor: 'pointer',
    minHeight: '200px'
  },
  createIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)'
  },
  createText: {
    fontSize: '15px',
    fontWeight: 600
  },
  createHint: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
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
    textAlign: 'left'
  },
  templateIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

export default AnalyticsReports;