/**
 * CampaignList
 * 
 * Complete campaign management view:
 * - All campaigns (email, SMS, push)
 * - Status filters (active, scheduled, completed, draft)
 * - Search & advanced filters
 * - Bulk actions
 * - Performance metrics per campaign
 * - Quick actions (pause, duplicate, delete)
 * - Sort by various metrics
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Megaphone,
  Mail,
  MessageSquare,
  Bell,
  Search,
  Filter,
  Plus,
  Play,
  Pause,
  Copy,
  Trash2,
  Edit,
  MoreHorizontal,
  ChevronDown,
  Calendar,
  Clock,
  Users,
  Eye,
  MousePointer,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  ExternalLink,
  BarChart3,
  Send,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Grid,
  List
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

export function CampaignList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortField, setSortField] = useState('startDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [showFilters, setShowFilters] = useState(false);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/marketing/campaigns`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          setCampaigns([]);
          setFilteredCampaigns([]);
          return;
        }
        throw new Error(`Failed to fetch campaigns: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.campaigns) {
        setCampaigns(result.campaigns);
        setFilteredCampaigns(result.campaigns);
      } else {
        setCampaigns([]);
        setFilteredCampaigns([]);
      }
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError(err.message);
      setCampaigns([]);
      setFilteredCampaigns([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  // Demo data for when no API is available
  const getDemoCampaigns = () => [
        {
          id: 1,
          name: 'January Flash Sale',
          type: 'email',
          status: 'active',
          subject: '🔥 24-Hour Flash Sale - Up to 50% Off!',
          audience: 'All Subscribers',
          audienceSize: 12450,
          sent: 8500,
          delivered: 8415,
          opened: 2125,
          clicked: 340,
          converted: 85,
          unsubscribed: 12,
          bounced: 85,
          revenue: 12750,
          cost: 42.50,
          startDate: '2024-01-10T10:00:00',
          endDate: '2024-01-17T23:59:59',
          createdBy: 'Sarah M.',
          lastModified: '2024-01-10T09:45:00'
        },
        {
          id: 2,
          name: 'New Product Launch - Wireless Earbuds',
          type: 'email',
          status: 'active',
          subject: '🎧 Introducing Our New Premium Wireless Earbuds',
          audience: 'Tech Enthusiasts',
          audienceSize: 8200,
          sent: 6920,
          delivered: 6850,
          opened: 1730,
          clicked: 276,
          converted: 62,
          unsubscribed: 8,
          bounced: 70,
          revenue: 9300,
          cost: 34.60,
          startDate: '2024-01-12T14:00:00',
          endDate: '2024-01-19T23:59:59',
          createdBy: 'Mike R.',
          lastModified: '2024-01-12T13:30:00'
        },
        {
          id: 3,
          name: 'VIP Early Access',
          type: 'sms',
          status: 'completed',
          subject: null,
          message: 'VIP Alert! Get early access to our sale. Use code VIP20 for 20% off. Shop now: link.co/vip',
          audience: 'VIP Customers',
          audienceSize: 1250,
          sent: 1250,
          delivered: 1238,
          opened: null,
          clicked: 187,
          converted: 45,
          unsubscribed: 3,
          bounced: 12,
          revenue: 8100,
          cost: 62.50,
          startDate: '2024-01-08T09:00:00',
          endDate: '2024-01-10T23:59:59',
          createdBy: 'Sarah M.',
          lastModified: '2024-01-08T08:45:00'
        },
        {
          id: 4,
          name: 'Weekend Reminder',
          type: 'push',
          status: 'scheduled',
          subject: null,
          title: 'Weekend Sale Ends Soon!',
          body: 'Last chance to save 30% on everything. Shop now!',
          audience: 'App Users - Active',
          audienceSize: 5200,
          sent: 0,
          delivered: 0,
          opened: null,
          clicked: null,
          converted: null,
          unsubscribed: null,
          bounced: null,
          revenue: null,
          cost: null,
          startDate: '2024-01-20T10:00:00',
          endDate: '2024-01-20T10:00:00',
          createdBy: 'Mike R.',
          lastModified: '2024-01-15T16:20:00'
        },
        {
          id: 5,
          name: 'Abandoned Cart Recovery',
          type: 'email',
          status: 'active',
          subject: 'You left something behind! Complete your order',
          audience: 'Cart Abandoners (24h)',
          audienceSize: 890,
          sent: 756,
          delivered: 748,
          opened: 298,
          clicked: 89,
          converted: 34,
          unsubscribed: 2,
          bounced: 8,
          revenue: 4250,
          cost: 3.78,
          startDate: '2024-01-01T00:00:00',
          endDate: null,
          createdBy: 'Auto',
          lastModified: '2024-01-01T00:00:00',
          isAutomation: true
        },
        {
          id: 6,
          name: 'Welcome Series - Email 1',
          type: 'email',
          status: 'active',
          subject: 'Welcome to the family! Here\'s 10% off',
          audience: 'New Subscribers',
          audienceSize: 1240,
          sent: 1240,
          delivered: 1228,
          opened: 620,
          clicked: 186,
          converted: 62,
          unsubscribed: 5,
          bounced: 12,
          revenue: 3100,
          cost: 6.20,
          startDate: '2024-01-01T00:00:00',
          endDate: null,
          createdBy: 'Auto',
          lastModified: '2024-01-01T00:00:00',
          isAutomation: true
        },
        {
          id: 7,
          name: 'Valentine\'s Day Preview',
          type: 'email',
          status: 'draft',
          subject: '💝 Valentine\'s Day Gift Guide Inside',
          audience: 'All Subscribers',
          audienceSize: 12450,
          sent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          converted: 0,
          unsubscribed: 0,
          bounced: 0,
          revenue: 0,
          cost: 0,
          startDate: null,
          endDate: null,
          createdBy: 'Sarah M.',
          lastModified: '2024-01-14T11:30:00'
        },
        {
          id: 8,
          name: 'Re-engagement Campaign',
          type: 'email',
          status: 'paused',
          subject: 'We miss you! Come back for 25% off',
          audience: 'Inactive 60+ days',
          audienceSize: 3400,
          sent: 2100,
          delivered: 2058,
          opened: 315,
          clicked: 63,
          converted: 21,
          unsubscribed: 45,
          bounced: 42,
          revenue: 1890,
          cost: 10.50,
          startDate: '2024-01-05T10:00:00',
          endDate: '2024-01-12T23:59:59',
          createdBy: 'Mike R.',
          lastModified: '2024-01-10T14:00:00',
          pauseReason: 'High unsubscribe rate'
        },
        {
          id: 9,
          name: 'Flash Sale Alert',
          type: 'sms',
          status: 'completed',
          message: 'FLASH SALE! 40% off everything for 4 hours only. Code: FLASH40. Shop: link.co/flash',
          audience: 'SMS Subscribers',
          audienceSize: 4500,
          sent: 4500,
          delivered: 4455,
          opened: null,
          clicked: 534,
          converted: 156,
          unsubscribed: 23,
          bounced: 45,
          revenue: 18720,
          cost: 225.00,
          startDate: '2024-01-06T12:00:00',
          endDate: '2024-01-06T16:00:00',
          createdBy: 'Sarah M.',
          lastModified: '2024-01-06T11:45:00'
        },
        {
          id: 10,
          name: 'New Arrivals Notification',
          type: 'push',
          status: 'completed',
          title: 'New Arrivals Just Dropped!',
          body: 'Check out our latest products before they sell out.',
          audience: 'App Users - All',
          audienceSize: 8900,
          sent: 8900,
          delivered: 7565,
          opened: null,
          clicked: 1245,
          converted: 89,
          unsubscribed: null,
          bounced: null,
          revenue: 5340,
          cost: 0,
          startDate: '2024-01-09T15:00:00',
          endDate: '2024-01-09T15:00:00',
          createdBy: 'Mike R.',
          lastModified: '2024-01-09T14:30:00'
        }
  ];

  // Filter and sort campaigns
  useEffect(() => {
    let result = [...campaigns];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.audience.toLowerCase().includes(query) ||
        (c.subject && c.subject.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(c => c.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      result = result.filter(c => c.type === typeFilter);
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'startDate' || sortField === 'lastModified') {
        aVal = aVal ? new Date(aVal).getTime() : 0;
        bVal = bVal ? new Date(bVal).getTime() : 0;
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    setFilteredCampaigns(result);
  }, [campaigns, searchQuery, statusFilter, typeFilter, sortField, sortDirection]);

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return '-';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) return '-';
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercent = (num) => {
    if (num === null || num === undefined) return '-';
    return `${num.toFixed(1)}%`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'email': return <Mail size={16} />;
      case 'sms': return <MessageSquare size={16} />;
      case 'push': return <Bell size={16} />;
      default: return <Megaphone size={16} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'email': return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' };
      case 'sms': return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' };
      case 'push': return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316' };
      default: return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' };
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', icon: <Play size={10} /> };
      case 'scheduled':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', icon: <Clock size={10} /> };
      case 'paused':
        return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316', icon: <Pause size={10} /> };
      case 'completed':
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', icon: <CheckCircle size={10} /> };
      case 'draft':
        return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', icon: <Edit size={10} /> };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', icon: null };
    }
  };

  const getOpenRate = (campaign) => {
    if (!campaign.opened || !campaign.delivered) return null;
    return (campaign.opened / campaign.delivered) * 100;
  };

  const getClickRate = (campaign) => {
    if (!campaign.clicked || !campaign.delivered) return null;
    return (campaign.clicked / campaign.delivered) * 100;
  };

  const getConversionRate = (campaign) => {
    if (!campaign.converted || !campaign.clicked) return null;
    return (campaign.converted / campaign.clicked) * 100;
  };

  const getROI = (campaign) => {
    if (!campaign.revenue || !campaign.cost || campaign.cost === 0) return null;
    return ((campaign.revenue - campaign.cost) / campaign.cost) * 100;
  };

  const handleSelectAll = () => {
    if (selectedCampaigns.length === filteredCampaigns.length) {
      setSelectedCampaigns([]);
    } else {
      setSelectedCampaigns(filteredCampaigns.map(c => c.id));
    }
  };

  const handleSelectCampaign = (id) => {
    if (selectedCampaigns.includes(id)) {
      setSelectedCampaigns(selectedCampaigns.filter(cId => cId !== id));
    } else {
      setSelectedCampaigns([...selectedCampaigns, id]);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown size={14} />;
    return sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const statusCounts = {
    all: campaigns.length,
    active: campaigns.filter(c => c.status === 'active').length,
    scheduled: campaigns.filter(c => c.status === 'scheduled').length,
    paused: campaigns.filter(c => c.status === 'paused').length,
    completed: campaigns.filter(c => c.status === 'completed').length,
    draft: campaigns.filter(c => c.status === 'draft').length
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Megaphone size={48} style={{ opacity: 0.5 }} />
        <p>Loading campaigns...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.loadingContainer}>
        <AlertTriangle size={48} color="#ef4444" />
        <p style={{ color: '#ef4444' }}>{error}</p>
        <button onClick={fetchCampaigns} style={styles.retryBtn}>
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
          <h1 style={styles.title}>Campaigns</h1>
          <p style={styles.subtitle}>{campaigns.length} total campaigns</p>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.actionBtn}>
            <Download size={16} />
            Export
          </button>
          <button style={styles.primaryBtn}>
            <Plus size={18} />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div style={styles.statusTabs}>
        {[
          { id: 'all', label: 'All' },
          { id: 'active', label: 'Active' },
          { id: 'scheduled', label: 'Scheduled' },
          { id: 'draft', label: 'Draft' },
          { id: 'paused', label: 'Paused' },
          { id: 'completed', label: 'Completed' }
        ].map(tab => (
          <button
            key={tab.id}
            style={{
              ...styles.statusTab,
              ...(statusFilter === tab.id ? styles.statusTabActive : {})
            }}
            onClick={() => setStatusFilter(tab.id)}
          >
            {tab.label}
            <span style={{
              ...styles.statusTabCount,
              ...(statusFilter === tab.id ? styles.statusTabCountActive : {})
            }}>
              {statusCounts[tab.id]}
            </span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.toolbarLeft}>
          <div style={styles.searchBox}>
            <Search size={18} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            {searchQuery && (
              <button
                style={styles.clearSearchBtn}
                onClick={() => setSearchQuery('')}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">All Types</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="push">Push</option>
          </select>

          <button
            style={{
              ...styles.filterBtn,
              ...(showFilters ? styles.filterBtnActive : {})
            }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
          </button>
        </div>

        <div style={styles.toolbarRight}>
          {selectedCampaigns.length > 0 && (
            <div style={styles.bulkActions}>
              <span style={styles.selectedCount}>
                {selectedCampaigns.length} selected
              </span>
              <button style={styles.bulkActionBtn}>
                <Pause size={14} />
                Pause
              </button>
              <button style={styles.bulkActionBtn}>
                <Copy size={14} />
                Duplicate
              </button>
              <button style={{...styles.bulkActionBtn, color: '#ef4444'}}>
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}

          <div style={styles.viewToggle}>
            <button
              style={{
                ...styles.viewToggleBtn,
                ...(viewMode === 'table' ? styles.viewToggleBtnActive : {})
              }}
              onClick={() => setViewMode('table')}
            >
              <List size={16} />
            </button>
            <button
              style={{
                ...styles.viewToggleBtn,
                ...(viewMode === 'grid' ? styles.viewToggleBtnActive : {})
              }}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeaderCell}>
                  <input
                    type="checkbox"
                    checked={selectedCampaigns.length === filteredCampaigns.length && filteredCampaigns.length > 0}
                    onChange={handleSelectAll}
                    style={styles.checkbox}
                  />
                </th>
                <th style={styles.tableHeaderCell}>
                  <button style={styles.sortBtn} onClick={() => handleSort('name')}>
                    Campaign {getSortIcon('name')}
                  </button>
                </th>
                <th style={styles.tableHeaderCell}>Type</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>
                  <button style={styles.sortBtn} onClick={() => handleSort('sent')}>
                    Sent {getSortIcon('sent')}
                  </button>
                </th>
                <th style={styles.tableHeaderCell}>Open Rate</th>
                <th style={styles.tableHeaderCell}>Click Rate</th>
                <th style={styles.tableHeaderCell}>
                  <button style={styles.sortBtn} onClick={() => handleSort('revenue')}>
                    Revenue {getSortIcon('revenue')}
                  </button>
                </th>
                <th style={styles.tableHeaderCell}>
                  <button style={styles.sortBtn} onClick={() => handleSort('startDate')}>
                    Date {getSortIcon('startDate')}
                  </button>
                </th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((campaign) => {
                const typeStyle = getTypeColor(campaign.type);
                const statusStyle = getStatusStyle(campaign.status);
                const openRate = getOpenRate(campaign);
                const clickRate = getClickRate(campaign);
                const isSelected = selectedCampaigns.includes(campaign.id);

                return (
                  <tr
                    key={campaign.id}
                    style={{
                      ...styles.tableRow,
                      ...(isSelected ? styles.tableRowSelected : {})
                    }}
                  >
                    <td style={styles.tableCell}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectCampaign(campaign.id)}
                        style={styles.checkbox}
                      />
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.campaignCell}>
                        <div>
                          <span style={styles.campaignName}>{campaign.name}</span>
                          <span style={styles.campaignAudience}>
                            <Users size={12} />
                            {campaign.audience} ({formatNumber(campaign.audienceSize)})
                          </span>
                        </div>
                        {campaign.isAutomation && (
                          <span style={styles.automationBadge}>Auto</span>
                        )}
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{
                        ...styles.typeBadge,
                        backgroundColor: typeStyle.bg,
                        color: typeStyle.color
                      }}>
                        {getTypeIcon(campaign.type)}
                        {campaign.type}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color
                      }}>
                        {statusStyle.icon}
                        {campaign.status}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.metricValue}>{formatNumber(campaign.sent)}</span>
                    </td>
                    <td style={styles.tableCell}>
                      {openRate !== null ? (
                        <div style={styles.rateCell}>
                          <span style={styles.rateValue}>{formatPercent(openRate)}</span>
                          <div style={styles.rateBar}>
                            <div style={{
                              ...styles.rateBarFill,
                              width: `${Math.min(openRate, 100)}%`,
                              backgroundColor: openRate >= 20 ? '#22c55e' : openRate >= 15 ? '#f59e0b' : '#ef4444'
                            }} />
                          </div>
                        </div>
                      ) : (
                        <span style={styles.naValue}>-</span>
                      )}
                    </td>
                    <td style={styles.tableCell}>
                      {clickRate !== null ? (
                        <div style={styles.rateCell}>
                          <span style={styles.rateValue}>{formatPercent(clickRate)}</span>
                          <div style={styles.rateBar}>
                            <div style={{
                              ...styles.rateBarFill,
                              width: `${Math.min(clickRate * 10, 100)}%`,
                              backgroundColor: clickRate >= 3 ? '#22c55e' : clickRate >= 2 ? '#f59e0b' : '#ef4444'
                            }} />
                          </div>
                        </div>
                      ) : (
                        <span style={styles.naValue}>-</span>
                      )}
                    </td>
                    <td style={styles.tableCell}>
                      <span style={{
                        ...styles.revenueValue,
                        color: campaign.revenue > 0 ? '#22c55e' : 'inherit'
                      }}>
                        {formatCurrency(campaign.revenue)}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.dateValue}>
                        {campaign.status === 'scheduled'
                          ? formatDateTime(campaign.startDate)
                          : formatDate(campaign.startDate)
                        }
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionsCell}>
                        <button style={styles.actionIconBtn} title="View Stats">
                          <BarChart3 size={14} />
                        </button>
                        <button style={styles.actionIconBtn} title="Edit">
                          <Edit size={14} />
                        </button>
                        <button style={styles.actionIconBtn} title="Duplicate">
                          <Copy size={14} />
                        </button>
                        <button style={styles.actionIconBtn} title="More">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredCampaigns.length === 0 && (
            <div style={styles.emptyState}>
              <Megaphone size={48} color="var(--color-text-muted)" />
              <h3>No campaigns found</h3>
              <p>Try adjusting your filters or create a new campaign</p>
              <button style={styles.primaryBtn}>
                <Plus size={18} />
                Create Campaign
              </button>
            </div>
          )}
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div style={styles.gridContainer}>
          {filteredCampaigns.map((campaign) => {
            const typeStyle = getTypeColor(campaign.type);
            const statusStyle = getStatusStyle(campaign.status);
            const openRate = getOpenRate(campaign);
            const clickRate = getClickRate(campaign);
            const isSelected = selectedCampaigns.includes(campaign.id);

            return (
              <div
                key={campaign.id}
                style={{
                  ...styles.gridCard,
                  ...(isSelected ? styles.gridCardSelected : {})
                }}
              >
                <div style={styles.gridCardHeader}>
                  <div style={styles.gridCardHeaderLeft}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectCampaign(campaign.id)}
                      style={styles.checkbox}
                    />
                    <span style={{
                      ...styles.typeBadge,
                      backgroundColor: typeStyle.bg,
                      color: typeStyle.color
                    }}>
                      {getTypeIcon(campaign.type)}
                      {campaign.type}
                    </span>
                  </div>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.color
                  }}>
                    {statusStyle.icon}
                    {campaign.status}
                  </span>
                </div>

                <h3 style={styles.gridCardTitle}>{campaign.name}</h3>
                <p style={styles.gridCardAudience}>
                  <Users size={14} />
                  {campaign.audience}
                </p>

                <div style={styles.gridCardStats}>
                  <div style={styles.gridCardStat}>
                    <span style={styles.gridCardStatLabel}>Sent</span>
                    <span style={styles.gridCardStatValue}>{formatNumber(campaign.sent)}</span>
                  </div>
                  <div style={styles.gridCardStat}>
                    <span style={styles.gridCardStatLabel}>Open Rate</span>
                    <span style={styles.gridCardStatValue}>{formatPercent(openRate)}</span>
                  </div>
                  <div style={styles.gridCardStat}>
                    <span style={styles.gridCardStatLabel}>Click Rate</span>
                    <span style={styles.gridCardStatValue}>{formatPercent(clickRate)}</span>
                  </div>
                  <div style={styles.gridCardStat}>
                    <span style={styles.gridCardStatLabel}>Revenue</span>
                    <span style={{...styles.gridCardStatValue, color: '#22c55e'}}>
                      {formatCurrency(campaign.revenue)}
                    </span>
                  </div>
                </div>

                <div style={styles.gridCardFooter}>
                  <span style={styles.gridCardDate}>
                    <Calendar size={12} />
                    {formatDate(campaign.startDate)}
                  </span>
                  <div style={styles.gridCardActions}>
                    <button style={styles.actionIconBtn}><BarChart3 size={14} /></button>
                    <button style={styles.actionIconBtn}><Edit size={14} /></button>
                    <button style={styles.actionIconBtn}><MoreHorizontal size={14} /></button>
                  </div>
                </div>
              </div>
            );
          })}
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
    gap: '12px'
  },
  actionBtn: {
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
  statusTabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '0'
  },
  statusTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    marginBottom: '-1px'
  },
  statusTabActive: {
    color: 'var(--color-primary)',
    borderBottomColor: 'var(--color-primary)'
  },
  statusTabCount: {
    padding: '2px 8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    fontSize: '12px'
  },
  statusTabCountActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: 'var(--color-primary)'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    gap: '16px'
  },
  toolbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
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
  clearSearchBtn: {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  filterSelect: {
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none'
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  filterBtnActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'var(--color-primary)',
    color: 'var(--color-primary)'
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  bulkActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 16px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '10px'
  },
  selectedCount: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--color-primary)'
  },
  bulkActionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '12px',
    cursor: 'pointer'
  },
  viewToggle: {
    display: 'flex',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  viewToggleBtn: {
    padding: '10px 14px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  viewToggleBtnActive: {
    backgroundColor: 'var(--color-surface-2)',
    color: 'var(--color-text)'
  },
  tableContainer: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeaderRow: {
    backgroundColor: 'var(--color-surface-2)'
  },
  tableHeaderCell: {
    padding: '14px 16px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    borderBottom: '1px solid var(--color-border)'
  },
  sortBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    cursor: 'pointer'
  },
  tableRow: {
    borderBottom: '1px solid var(--color-border)',
    transition: 'background-color 0.15s'
  },
  tableRowSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)'
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    verticalAlign: 'middle'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  campaignCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  campaignName: {
    display: 'block',
    fontWeight: 600,
    fontSize: '14px',
    marginBottom: '4px'
  },
  campaignAudience: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  automationBadge: {
    padding: '3px 8px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: '6px',
    fontSize: '10px',
    fontWeight: 600,
    color: '#8b5cf6'
  },
  typeBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '5px 10px',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  metricValue: {
    fontWeight: 600
  },
  rateCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  rateValue: {
    fontSize: '13px',
    fontWeight: 600
  },
  rateBar: {
    width: '60px',
    height: '4px',
    backgroundColor: 'var(--color-border)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  rateBarFill: {
    height: '100%',
    borderRadius: '2px'
  },
  naValue: {
    color: 'var(--color-text-muted)'
  },
  revenueValue: {
    fontWeight: 700
  },
  dateValue: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  actionsCell: {
    display: 'flex',
    gap: '4px'
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
    gap: '12px',
    textAlign: 'center'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px'
  },
  gridCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '20px',
    transition: 'box-shadow 0.2s'
  },
  gridCardSelected: {
    borderColor: 'var(--color-primary)',
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)'
  },
  gridCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  gridCardHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  gridCardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 8px 0',
    lineHeight: 1.3
  },
  gridCardAudience: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: '0 0 16px 0'
  },
  gridCardStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    padding: '16px 0',
    borderTop: '1px solid var(--color-border)',
    borderBottom: '1px solid var(--color-border)'
  },
  gridCardStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  gridCardStatLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  gridCardStatValue: {
    fontSize: '15px',
    fontWeight: 700
  },
  gridCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px'
  },
  gridCardDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  gridCardActions: {
    display: 'flex',
    gap: '4px'
  }
};

export default CampaignList;