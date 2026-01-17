/**
 * MarketingSocial
 * 
 * Social media management dashboard:
 * - Connected accounts
 * - Post scheduling
 * - Content calendar
 * - Analytics per platform
 * - Engagement tracking
 * - AI content suggestions
 */

import React, { useState, useEffect } from 'react';
import {
  Share2,
  Plus,
  Calendar,
  Clock,
  Image,
  Video,
  Link,
  Heart,
  MessageCircle,
  Repeat,
  Eye,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Settings,
  RefreshCw,
  MoreHorizontal,
  Edit,
  Trash2,
  Send,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Users,
  Sparkles,
  Filter,
  Search,
  ChevronDown,
  ChevronRight,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Globe,
  Hash,
  AtSign,
  Zap
} from 'lucide-react';

export function MarketingSocial() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [accounts, setAccounts] = useState([]);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [stats, setStats] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalFollowers: 24850,
        followerGrowth: 12.4,
        totalEngagement: 3420,
        engagementRate: 4.2,
        postsThisMonth: 18,
        scheduledPosts: 7,
        topPlatform: 'Instagram',
        bestPostTime: '6:00 PM'
      });

      setAccounts([
        {
          id: 1,
          platform: 'instagram',
          name: '@yourbrand',
          followers: 12400,
          growth: 8.2,
          engagement: 5.1,
          connected: true,
          lastPost: '2024-01-15T14:30:00'
        },
        {
          id: 2,
          platform: 'facebook',
          name: 'Your Brand Page',
          followers: 8200,
          growth: 3.4,
          engagement: 2.8,
          connected: true,
          lastPost: '2024-01-14T10:00:00'
        },
        {
          id: 3,
          platform: 'twitter',
          name: '@yourbrand',
          followers: 3100,
          growth: 15.6,
          engagement: 3.2,
          connected: true,
          lastPost: '2024-01-15T09:15:00'
        },
        {
          id: 4,
          platform: 'linkedin',
          name: 'Your Brand Inc.',
          followers: 1150,
          growth: 22.1,
          engagement: 4.5,
          connected: true,
          lastPost: '2024-01-12T11:00:00'
        },
        {
          id: 5,
          platform: 'tiktok',
          name: '@yourbrand',
          followers: 0,
          growth: 0,
          engagement: 0,
          connected: false,
          lastPost: null
        }
      ]);

      setScheduledPosts([
        {
          id: 1,
          content: 'New arrivals just dropped! 🔥 Check out our latest collection...',
          platforms: ['instagram', 'facebook'],
          scheduledFor: '2024-01-16T18:00:00',
          status: 'scheduled',
          media: [{ type: 'image', url: null }],
          author: 'Sarah M.'
        },
        {
          id: 2,
          content: 'Behind the scenes at our warehouse! See how we pack your orders with care 📦',
          platforms: ['instagram', 'tiktok'],
          scheduledFor: '2024-01-17T12:00:00',
          status: 'scheduled',
          media: [{ type: 'video', url: null }],
          author: 'Mike R.'
        },
        {
          id: 3,
          content: 'Pro tip: Here are 5 ways to organize your collection like a pro...',
          platforms: ['twitter', 'linkedin'],
          scheduledFor: '2024-01-17T09:00:00',
          status: 'scheduled',
          media: [],
          author: 'Sarah M.'
        },
        {
          id: 4,
          content: 'Flash sale this weekend! 20% off everything...',
          platforms: ['instagram', 'facebook', 'twitter'],
          scheduledFor: '2024-01-18T10:00:00',
          status: 'draft',
          media: [{ type: 'image', url: null }],
          author: 'John D.'
        },
        {
          id: 5,
          content: 'Customer spotlight: Check out this amazing collection from @collector123',
          platforms: ['instagram'],
          scheduledFor: '2024-01-19T15:00:00',
          status: 'pending_approval',
          media: [{ type: 'image', url: null }],
          author: 'Mike R.'
        }
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return <Instagram size={18} />;
      case 'facebook': return <Facebook size={18} />;
      case 'twitter': return <Twitter size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      case 'youtube': return <Youtube size={18} />;
      case 'tiktok': return <Video size={18} />;
      default: return <Globe size={18} />;
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'instagram': return '#E4405F';
      case 'facebook': return '#1877F2';
      case 'twitter': return '#1DA1F2';
      case 'linkedin': return '#0A66C2';
      case 'youtube': return '#FF0000';
      case 'tiktok': return '#000000';
      default: return '#6b7280';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'scheduled':
        return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', label: 'Scheduled' };
      case 'draft':
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', label: 'Draft' };
      case 'pending_approval':
        return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316', label: 'Pending Approval' };
      case 'published':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', label: 'Published' };
      case 'failed':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', label: 'Failed' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', label: status };
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Share2 size={48} style={{ opacity: 0.5 }} />
        <p>Loading social media...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Social Media</h1>
          <p style={styles.subtitle}>Manage your social presence across all platforms</p>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.secondaryBtn}>
            <Calendar size={16} />
            Content Calendar
          </button>
          <button style={styles.primaryBtn} onClick={() => setShowCreateModal(true)}>
            <Plus size={18} />
            Create Post
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Users size={20} color="#3b82f6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{formatNumber(stats.totalFollowers)}</span>
            <span style={styles.statLabel}>Total Followers</span>
          </div>
          <span style={styles.statTrend}>
            <TrendingUp size={14} color="#22c55e" />
            +{stats.followerGrowth}%
          </span>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Heart size={20} color="#ef4444" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{formatNumber(stats.totalEngagement)}</span>
            <span style={styles.statLabel}>Engagements</span>
          </div>
          <span style={styles.statTrend}>
            {stats.engagementRate}% rate
          </span>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Send size={20} color="#8b5cf6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.postsThisMonth}</span>
            <span style={styles.statLabel}>Posts This Month</span>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Clock size={20} color="#f59e0b" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{stats.scheduledPosts}</span>
            <span style={styles.statLabel}>Scheduled</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'accounts', label: 'Accounts', icon: Users },
          { id: 'scheduled', label: 'Scheduled Posts', icon: Calendar },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp }
        ].map(tab => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.tabActive : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <TabIcon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Connected Accounts */}
      {activeTab === 'overview' && (
        <>
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Connected Accounts</h2>
              <button style={styles.linkBtn}>
                <Plus size={14} />
                Connect Account
              </button>
            </div>
            <div style={styles.accountsGrid}>
              {accounts.map((account) => (
                <div
                  key={account.id}
                  style={{
                    ...styles.accountCard,
                    opacity: account.connected ? 1 : 0.6
                  }}
                >
                  <div style={styles.accountHeader}>
                    <div style={{
                      ...styles.platformIcon,
                      backgroundColor: `${getPlatformColor(account.platform)}20`,
                      color: getPlatformColor(account.platform)
                    }}>
                      {getPlatformIcon(account.platform)}
                    </div>
                    <div style={styles.accountInfo}>
                      <span style={styles.accountName}>{account.name}</span>
                      <span style={styles.accountPlatform}>{account.platform}</span>
                    </div>
                    {account.connected ? (
                      <CheckCircle size={16} color="#22c55e" />
                    ) : (
                      <button style={styles.connectBtn}>Connect</button>
                    )}
                  </div>
                  {account.connected && (
                    <div style={styles.accountStats}>
                      <div style={styles.accountStat}>
                        <span style={styles.accountStatValue}>{formatNumber(account.followers)}</span>
                        <span style={styles.accountStatLabel}>Followers</span>
                      </div>
                      <div style={styles.accountStat}>
                        <span style={{
                          ...styles.accountStatValue,
                          color: account.growth > 0 ? '#22c55e' : '#ef4444'
                        }}>
                          {account.growth > 0 ? '+' : ''}{account.growth}%
                        </span>
                        <span style={styles.accountStatLabel}>Growth</span>
                      </div>
                      <div style={styles.accountStat}>
                        <span style={styles.accountStatValue}>{account.engagement}%</span>
                        <span style={styles.accountStatLabel}>Engagement</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div style={styles.aiSection}>
            <div style={styles.aiHeader}>
              <Sparkles size={20} color="#8b5cf6" />
              <span style={styles.aiTitle}>AI Content Suggestions</span>
            </div>
            <div style={styles.aiSuggestions}>
              <div style={styles.aiSuggestion}>
                <div style={styles.suggestionIcon}>
                  <Clock size={16} />
                </div>
                <div style={styles.suggestionContent}>
                  <span style={styles.suggestionTitle}>Best time to post</span>
                  <span style={styles.suggestionText}>
                    Your audience is most active at 6:00 PM on weekdays. Schedule your next post then!
                  </span>
                </div>
                <button style={styles.suggestionBtn}>Apply</button>
              </div>
              <div style={styles.aiSuggestion}>
                <div style={styles.suggestionIcon}>
                  <Hash size={16} />
                </div>
                <div style={styles.suggestionContent}>
                  <span style={styles.suggestionTitle}>Trending hashtags</span>
                  <span style={styles.suggestionText}>
                    #SportCards #CardCollector #WaxRippers are trending in your niche
                  </span>
                </div>
                <button style={styles.suggestionBtn}>Use</button>
              </div>
              <div style={styles.aiSuggestion}>
                <div style={styles.suggestionIcon}>
                  <TrendingUp size={16} />
                </div>
                <div style={styles.suggestionContent}>
                  <span style={styles.suggestionTitle}>Content idea</span>
                  <span style={styles.suggestionText}>
                    Video content gets 3x more engagement. Try a "pack opening" video!
                  </span>
                </div>
                <button style={styles.suggestionBtn}>Create</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Accounts Tab */}
      {activeTab === 'accounts' && (
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>All Accounts</h2>
            <button style={styles.primaryBtn}>
              <Plus size={16} />
              Connect New Account
            </button>
          </div>
          <div style={styles.accountsList}>
            {accounts.map((account) => (
              <div key={account.id} style={styles.accountRow}>
                <div style={{
                  ...styles.platformIconLarge,
                  backgroundColor: `${getPlatformColor(account.platform)}20`,
                  color: getPlatformColor(account.platform)
                }}>
                  {getPlatformIcon(account.platform)}
                </div>
                <div style={styles.accountRowInfo}>
                  <span style={styles.accountRowName}>{account.name}</span>
                  <span style={styles.accountRowPlatform}>
                    {account.platform.charAt(0).toUpperCase() + account.platform.slice(1)}
                  </span>
                </div>
                <div style={styles.accountRowStats}>
                  <div style={styles.accountRowStat}>
                    <span style={styles.accountRowStatValue}>{formatNumber(account.followers)}</span>
                    <span style={styles.accountRowStatLabel}>Followers</span>
                  </div>
                  <div style={styles.accountRowStat}>
                    <span style={styles.accountRowStatValue}>{account.engagement}%</span>
                    <span style={styles.accountRowStatLabel}>Engagement</span>
                  </div>
                  <div style={styles.accountRowStat}>
                    <span style={{
                      ...styles.accountRowStatValue,
                      color: account.growth > 0 ? '#22c55e' : '#ef4444'
                    }}>
                      {account.growth > 0 ? '+' : ''}{account.growth}%
                    </span>
                    <span style={styles.accountRowStatLabel}>Growth</span>
                  </div>
                </div>
                <div style={styles.accountRowStatus}>
                  {account.connected ? (
                    <span style={styles.connectedBadge}>
                      <CheckCircle size={12} />
                      Connected
                    </span>
                  ) : (
                    <button style={styles.connectBtn}>Connect</button>
                  )}
                </div>
                <button style={styles.iconBtn}>
                  <Settings size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scheduled Posts Tab */}
      {activeTab === 'scheduled' && (
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Scheduled Posts</h2>
            <div style={styles.sectionActions}>
              <button style={styles.secondaryBtn}>
                <Filter size={14} />
                Filter
              </button>
              <button style={styles.primaryBtn} onClick={() => setShowCreateModal(true)}>
                <Plus size={16} />
                Create Post
              </button>
            </div>
          </div>
          <div style={styles.postsList}>
            {scheduledPosts.map((post) => {
              const statusStyle = getStatusStyle(post.status);
              return (
                <div key={post.id} style={styles.postCard}>
                  <div style={styles.postLeft}>
                    {post.media.length > 0 ? (
                      <div style={styles.postMedia}>
                        {post.media[0].type === 'image' ? (
                          <Image size={24} color="var(--color-text-muted)" />
                        ) : (
                          <Video size={24} color="var(--color-text-muted)" />
                        )}
                      </div>
                    ) : (
                      <div style={styles.postMedia}>
                        <Hash size={24} color="var(--color-text-muted)" />
                      </div>
                    )}
                  </div>
                  <div style={styles.postContent}>
                    <p style={styles.postText}>{post.content}</p>
                    <div style={styles.postMeta}>
                      <div style={styles.postPlatforms}>
                        {post.platforms.map((platform, idx) => (
                          <span
                            key={idx}
                            style={{
                              ...styles.postPlatformIcon,
                              color: getPlatformColor(platform)
                            }}
                          >
                            {getPlatformIcon(platform)}
                          </span>
                        ))}
                      </div>
                      <span style={styles.postSchedule}>
                        <Clock size={12} />
                        {formatDate(post.scheduledFor)}
                      </span>
                      <span style={styles.postAuthor}>by {post.author}</span>
                    </div>
                  </div>
                  <div style={styles.postRight}>
                    <span style={{
                      ...styles.postStatus,
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color
                    }}>
                      {statusStyle.label}
                    </span>
                    <div style={styles.postActions}>
                      <button style={styles.iconBtn} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button style={styles.iconBtn} title="Delete">
                        <Trash2 size={16} />
                      </button>
                      <button style={styles.iconBtn} title="More">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Performance Analytics</h2>
            <select style={styles.periodSelect}>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <div style={styles.analyticsGrid}>
            <div style={styles.analyticsCard}>
              <h4 style={styles.analyticsTitle}>Engagement by Platform</h4>
              <div style={styles.analyticsChart}>
                {accounts.filter(a => a.connected).map((account) => (
                  <div key={account.id} style={styles.barRow}>
                    <span style={styles.barLabel}>
                      <span style={{ color: getPlatformColor(account.platform) }}>
                        {getPlatformIcon(account.platform)}
                      </span>
                      {account.platform}
                    </span>
                    <div style={styles.barContainer}>
                      <div style={{
                        ...styles.bar,
                        width: `${(account.engagement / 6) * 100}%`,
                        backgroundColor: getPlatformColor(account.platform)
                      }} />
                    </div>
                    <span style={styles.barValue}>{account.engagement}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.analyticsCard}>
              <h4 style={styles.analyticsTitle}>Follower Growth</h4>
              <div style={styles.analyticsChart}>
                {accounts.filter(a => a.connected).map((account) => (
                  <div key={account.id} style={styles.barRow}>
                    <span style={styles.barLabel}>
                      <span style={{ color: getPlatformColor(account.platform) }}>
                        {getPlatformIcon(account.platform)}
                      </span>
                      {account.platform}
                    </span>
                    <div style={styles.barContainer}>
                      <div style={{
                        ...styles.bar,
                        width: `${(account.growth / 25) * 100}%`,
                        backgroundColor: account.growth > 10 ? '#22c55e' : '#f59e0b'
                      }} />
                    </div>
                    <span style={{
                      ...styles.barValue,
                      color: account.growth > 0 ? '#22c55e' : '#ef4444'
                    }}>
                      {account.growth > 0 ? '+' : ''}{account.growth}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={styles.insightsCard}>
            <Sparkles size={20} color="#8b5cf6" />
            <div style={styles.insightsContent}>
              <h4 style={styles.insightsTitle}>AI Insights</h4>
              <p style={styles.insightsText}>
                Your LinkedIn engagement is 60% higher than other platforms. Consider posting more professional 
                content there. Instagram Reels are getting 2.5x more reach than static posts - 
                try creating more video content!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {showCreateModal && (
        <div style={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Create Post</h2>
              <button style={styles.modalClose} onClick={() => setShowCreateModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Platforms</label>
                <div style={styles.platformsSelect}>
                  {accounts.filter(a => a.connected).map((account) => (
                    <label key={account.id} style={styles.platformCheckbox}>
                      <input type="checkbox" style={styles.checkbox} />
                      <span style={{ color: getPlatformColor(account.platform) }}>
                        {getPlatformIcon(account.platform)}
                      </span>
                      {account.name}
                    </label>
                  ))}
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Content</label>
                <textarea
                  placeholder="What do you want to share?"
                  rows={4}
                  style={styles.formTextarea}
                />
                <div style={styles.charCount}>0 / 280</div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Media</label>
                <div style={styles.mediaUpload}>
                  <Image size={24} color="var(--color-text-muted)" />
                  <span>Drop images or videos here</span>
                  <button style={styles.uploadBtn}>Browse</button>
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Schedule</label>
                  <input type="datetime-local" style={styles.formInput} />
                </div>
              </div>
              <div style={styles.aiAssist}>
                <Sparkles size={16} color="#8b5cf6" />
                <span>AI can help improve your post</span>
                <button style={styles.aiAssistBtn}>Enhance</button>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.secondaryBtn} onClick={() => setShowCreateModal(false)}>
                Save Draft
              </button>
              <button style={styles.primaryBtn}>
                <Send size={16} />
                Schedule Post
              </button>
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '14px',
    border: '1px solid var(--color-border)'
  },
  statIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 700
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  statTrend: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    color: '#22c55e'
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    marginBottom: '24px'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
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
  section: {
    marginBottom: '24px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0
  },
  sectionActions: {
    display: 'flex',
    gap: '12px'
  },
  linkBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  accountsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  },
  accountCard: {
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '14px',
    border: '1px solid var(--color-border)'
  },
  accountHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  platformIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  platformIconLarge: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  accountInfo: {
    flex: 1
  },
  accountName: {
    display: 'block',
    fontWeight: 600,
    marginBottom: '2px'
  },
  accountPlatform: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textTransform: 'capitalize'
  },
  connectBtn: {
    padding: '6px 12px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  accountStats: {
    display: 'flex',
    gap: '16px'
  },
  accountStat: {
    flex: 1,
    textAlign: 'center'
  },
  accountStatValue: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 700,
    marginBottom: '2px'
  },
  accountStatLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  accountsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  accountRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '14px',
    border: '1px solid var(--color-border)'
  },
  accountRowInfo: {
    flex: 1
  },
  accountRowName: {
    display: 'block',
    fontWeight: 600,
    marginBottom: '2px'
  },
  accountRowPlatform: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  accountRowStats: {
    display: 'flex',
    gap: '32px'
  },
  accountRowStat: {
    textAlign: 'center'
  },
  accountRowStatValue: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 600
  },
  accountRowStatLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  accountRowStatus: {},
  connectedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '6px',
    color: '#22c55e',
    fontSize: '12px',
    fontWeight: 500
  },
  iconBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  aiSection: {
    padding: '20px',
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
    borderRadius: '14px',
    border: '1px solid rgba(139, 92, 246, 0.2)'
  },
  aiHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '16px'
  },
  aiTitle: {
    fontSize: '16px',
    fontWeight: 600
  },
  aiSuggestions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  aiSuggestion: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '10px'
  },
  suggestionIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    color: '#8b5cf6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  suggestionContent: {
    flex: 1
  },
  suggestionTitle: {
    display: 'block',
    fontWeight: 600,
    marginBottom: '4px'
  },
  suggestionText: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  suggestionBtn: {
    padding: '8px 14px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    border: 'none',
    borderRadius: '8px',
    color: '#8b5cf6',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  postsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  postCard: {
    display: 'flex',
    gap: '16px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '14px',
    border: '1px solid var(--color-border)'
  },
  postLeft: {},
  postMedia: {
    width: '60px',
    height: '60px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  postContent: {
    flex: 1
  },
  postText: {
    margin: '0 0 12px 0',
    fontSize: '14px',
    lineHeight: 1.5
  },
  postMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  postPlatforms: {
    display: 'flex',
    gap: '6px'
  },
  postPlatformIcon: {},
  postSchedule: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  postAuthor: {},
  postRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '12px'
  },
  postStatus: {
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500
  },
  postActions: {
    display: 'flex',
    gap: '4px'
  },
  periodSelect: {
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '20px'
  },
  analyticsCard: {
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '14px',
    border: '1px solid var(--color-border)'
  },
  analyticsTitle: {
    fontSize: '14px',
    fontWeight: 600,
    margin: '0 0 16px 0'
  },
  analyticsChart: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  barRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  barLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100px',
    fontSize: '13px',
    textTransform: 'capitalize'
  },
  barContainer: {
    flex: 1,
    height: '8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  bar: {
    height: '100%',
    borderRadius: '4px'
  },
  barValue: {
    width: '50px',
    textAlign: 'right',
    fontSize: '13px',
    fontWeight: 600
  },
  insightsCard: {
    display: 'flex',
    gap: '16px',
    padding: '20px',
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
    borderRadius: '14px',
    border: '1px solid rgba(139, 92, 246, 0.2)'
  },
  insightsContent: {
    flex: 1
  },
  insightsTitle: {
    fontSize: '14px',
    fontWeight: 600,
    margin: '0 0 8px 0'
  },
  insightsText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: 0,
    lineHeight: 1.6
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
    maxWidth: '600px',
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
  formGroup: {
    marginBottom: '20px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  formLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    marginBottom: '8px'
  },
  formInput: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  formTextarea: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  charCount: {
    textAlign: 'right',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginTop: '6px'
  },
  platformsSelect: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px'
  },
  platformCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    fontSize: '13px',
    cursor: 'pointer'
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  mediaUpload: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '30px',
    border: '2px dashed var(--color-border)',
    borderRadius: '12px',
    color: 'var(--color-text-muted)'
  },
  uploadBtn: {
    padding: '8px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  aiAssist: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
    borderRadius: '10px',
    fontSize: '13px'
  },
  aiAssistBtn: {
    marginLeft: 'auto',
    padding: '6px 14px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    border: 'none',
    borderRadius: '6px',
    color: '#8b5cf6',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid var(--color-border)'
  }
};

export default MarketingSocial;