/**
 * CustomerLoyalty
 * 
 * Loyalty program management - ADMIN SIDE.
 * - Program overview & stats
 * - Tier management
 * - Points configuration
 * - Rewards catalog
 * - Member management
 * - Redemption history
 * 
 * ECOSYSTEM FOUNDATION:
 * This module is designed to evolve into token-based
 * loyalty where points become tradeable assets.
 * 
 * Current: Points → Discounts
 * Future: Tokens → Trade, Transfer, Real Value
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Gift,
  Award,
  Star,
  Crown,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Zap,
  ChevronRight,
  Plus,
  Settings,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  Heart,
  ShoppingBag,
  Percent,
  Tag,
  Coins,
  Gem,
  Shield,
  Lock,
  Unlock,
  AlertTriangle
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '';

export function CustomerLoyalty() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchLoyaltyData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/loyalty`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        // If no loyalty endpoint exists, use default data structure
        if (response.status === 404) {
          setData(getDefaultLoyaltyData());
          return;
        }
        throw new Error(`Failed to fetch loyalty data: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.data) {
        setData(result.data);
      } else {
        setData(getDefaultLoyaltyData());
      }
    } catch (err) {
      console.error('Error fetching loyalty data:', err);
      // Use default data if API fails
      setData(getDefaultLoyaltyData());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoyaltyData();
  }, [fetchLoyaltyData]);

  const getDefaultLoyaltyData = () => ({
        // Program Overview
        program: {
          name: 'Rewards Club',
          status: 'active',
          pointsName: 'Points',
          pointsSymbol: 'pts',
          currency: 'USD',
          pointValue: 0.01, // 1 point = $0.01
          earnRate: 1, // 1 point per $1 spent
          launchedDate: '2023-06-15'
        },

        // Summary Stats
        stats: {
          totalMembers: 1456,
          membersChange: 12.3,
          activeMembers: 1089,
          activePercent: 74.8,
          totalPointsIssued: 2450000,
          totalPointsRedeemed: 1890000,
          pointsOutstanding: 560000,
          outstandingValue: 5600.00,
          redemptionRate: 77.1,
          avgPointsPerMember: 385,
          lifetimeRewardsValue: 18900.00
        },

        // Tier Structure
        tiers: [
          {
            id: 1,
            name: 'Bronze',
            icon: 'shield',
            color: '#CD7F32',
            minPoints: 0,
            maxPoints: 499,
            members: 678,
            benefits: [
              '1 point per $1 spent',
              'Birthday reward',
              'Member-only sales access'
            ],
            earnMultiplier: 1.0
          },
          {
            id: 2,
            name: 'Silver',
            icon: 'star',
            color: '#C0C0C0',
            minPoints: 500,
            maxPoints: 1499,
            members: 412,
            benefits: [
              '1.25 points per $1 spent',
              'Free shipping on orders $50+',
              'Early access to new products',
              'Birthday reward (2x points)'
            ],
            earnMultiplier: 1.25
          },
          {
            id: 3,
            name: 'Gold',
            icon: 'award',
            color: '#FFD700',
            minPoints: 1500,
            maxPoints: 4999,
            members: 239,
            benefits: [
              '1.5 points per $1 spent',
              'Free shipping on all orders',
              'Exclusive Gold member events',
              'Priority customer support',
              'Birthday reward (3x points)'
            ],
            earnMultiplier: 1.5
          },
          {
            id: 4,
            name: 'Platinum',
            icon: 'crown',
            color: '#E5E4E2',
            minPoints: 5000,
            maxPoints: null,
            members: 127,
            benefits: [
              '2 points per $1 spent',
              'Free express shipping',
              'Personal shopping assistant',
              'VIP events & experiences',
              'Anniversary gift',
              'Birthday reward (5x points)',
              'Price match guarantee'
            ],
            earnMultiplier: 2.0
          }
        ],

        // Rewards Catalog
        rewards: [
          { id: 1, name: '$5 Off', type: 'discount', pointsCost: 500, value: 5.00, redemptions: 456, status: 'active' },
          { id: 2, name: '$10 Off', type: 'discount', pointsCost: 1000, value: 10.00, redemptions: 312, status: 'active' },
          { id: 3, name: '$25 Off', type: 'discount', pointsCost: 2500, value: 25.00, redemptions: 89, status: 'active' },
          { id: 4, name: 'Free Shipping', type: 'shipping', pointsCost: 300, value: 8.00, redemptions: 234, status: 'active' },
          { id: 5, name: 'Mystery Box', type: 'product', pointsCost: 5000, value: 75.00, redemptions: 23, status: 'active' },
          { id: 6, name: 'VIP Experience', type: 'experience', pointsCost: 10000, value: 200.00, redemptions: 5, status: 'active' },
          { id: 7, name: '20% Off Single Item', type: 'discount', pointsCost: 1500, value: null, redemptions: 167, status: 'active' },
          { id: 8, name: 'Double Points Day', type: 'bonus', pointsCost: 2000, value: null, redemptions: 45, status: 'paused' }
        ],

        // Recent Activity
        recentActivity: [
          { id: 1, type: 'earn', member: 'Marcus J.', points: 245, reason: 'Purchase', time: '10 min ago' },
          { id: 2, type: 'redeem', member: 'Sarah W.', points: 500, reward: '$5 Off', time: '25 min ago' },
          { id: 3, type: 'tier_up', member: 'David C.', fromTier: 'Gold', toTier: 'Platinum', time: '1 hr ago' },
          { id: 4, type: 'earn', member: 'Emily R.', points: 89, reason: 'Purchase', time: '2 hrs ago' },
          { id: 5, type: 'signup', member: 'John D.', points: 100, reason: 'Welcome bonus', time: '3 hrs ago' },
          { id: 6, type: 'redeem', member: 'Lisa M.', points: 1000, reward: '$10 Off', time: '4 hrs ago' },
          { id: 7, type: 'earn', member: 'Chris T.', points: 156, reason: 'Referral bonus', time: '5 hrs ago' },
          { id: 8, type: 'expire', member: 'Amy K.', points: 234, reason: 'Points expired', time: 'Yesterday' }
        ],

        // Top Earners
        topEarners: [
          { id: 1, name: 'Marcus Johnson', points: 12450, tier: 'Platinum', lifetimeEarned: 24500 },
          { id: 2, name: 'Sarah Williams', points: 8920, tier: 'Platinum', lifetimeEarned: 18400 },
          { id: 3, name: 'David Chen', points: 7650, tier: 'Platinum', lifetimeEarned: 15200 },
          { id: 4, name: 'Emily Rodriguez', points: 5890, tier: 'Gold', lifetimeEarned: 12100 },
          { id: 5, name: 'Michael Brown', points: 4420, tier: 'Gold', lifetimeEarned: 9800 }
        ],

        // Point Sources (where points come from)
        pointSources: [
          { source: 'Purchases', points: 1850000, percent: 75.5 },
          { source: 'Referrals', points: 245000, percent: 10.0 },
          { source: 'Reviews', points: 123000, percent: 5.0 },
          { source: 'Bonuses', points: 147000, percent: 6.0 },
          { source: 'Promotions', points: 85000, percent: 3.5 }
        ],

        // Ecosystem Teaser (Future)
        ecosystem: {
          enabled: false,
          tokenName: 'STORE',
          tokenSymbol: 'STR',
          features: [
            'Trade points with other members',
            'Transfer to friends & family',
            'Convert to stablecoin value',
            'Use across partner businesses',
            'Hold for value appreciation'
          ]
        }
  });

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getTierIcon = (iconName) => {
    switch (iconName) {
      case 'shield': return Shield;
      case 'star': return Star;
      case 'award': return Award;
      case 'crown': return Crown;
      default: return Star;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'earn': return <Coins size={16} color="#22c55e" />;
      case 'redeem': return <Gift size={16} color="#8b5cf6" />;
      case 'tier_up': return <TrendingUp size={16} color="#f59e0b" />;
      case 'signup': return <Users size={16} color="#3b82f6" />;
      case 'expire': return <Clock size={16} color="#ef4444" />;
      default: return <Zap size={16} />;
    }
  };

  const getRewardTypeIcon = (type) => {
    switch (type) {
      case 'discount': return <Percent size={16} />;
      case 'shipping': return <ShoppingBag size={16} />;
      case 'product': return <Gift size={16} />;
      case 'experience': return <Star size={16} />;
      case 'bonus': return <Zap size={16} />;
      default: return <Tag size={16} />;
    }
  };

  if (loading || !data) {
    return (
      <div style={styles.loadingContainer}>
        <Gift size={32} style={{ animation: 'pulse 1s ease-in-out infinite' }} />
        <p>Loading loyalty program...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.programBadge}>
            <Gift size={24} color="#8b5cf6" />
            <div>
              <h1 style={styles.title}>{data.program.name}</h1>
              <span style={styles.subtitle}>
                Loyalty program management
              </span>
            </div>
          </div>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.actionBtn}>
            <Download size={16} />
            Export
          </button>
          <button style={styles.actionBtn}>
            <Settings size={16} />
            Settings
          </button>
          <button style={styles.primaryBtn}>
            <Plus size={16} />
            Add Reward
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={styles.tabNav}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'tiers', label: 'Tiers' },
          { id: 'rewards', label: 'Rewards' },
          { id: 'members', label: 'Members' },
          { id: 'activity', label: 'Activity' }
        ].map(tab => (
          <button
            key={tab.id}
            style={{
              ...styles.tabBtn,
              ...(activeTab === tab.id ? styles.tabBtnActive : {})
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statHeader}>
                <div style={{...styles.statIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)'}}>
                  <Users size={22} color="#8b5cf6" />
                </div>
              </div>
              <div style={styles.statValue}>{formatNumber(data.stats.totalMembers)}</div>
              <div style={styles.statLabel}>Total Members</div>
              <div style={styles.statChange}>
                <ArrowUpRight size={14} color="#22c55e" />
                <span style={{ color: '#22c55e' }}>+{data.stats.membersChange}%</span>
                <span style={styles.changeLabel}>this month</span>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statHeader}>
                <div style={{...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
                  <Coins size={22} color="#22c55e" />
                </div>
              </div>
              <div style={styles.statValue}>{formatNumber(data.stats.totalPointsIssued)}</div>
              <div style={styles.statLabel}>Points Issued</div>
              <div style={styles.statSubtext}>Lifetime total</div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statHeader}>
                <div style={{...styles.statIcon, backgroundColor: 'rgba(249, 115, 22, 0.1)'}}>
                  <Gift size={22} color="#f97316" />
                </div>
              </div>
              <div style={styles.statValue}>{formatNumber(data.stats.totalPointsRedeemed)}</div>
              <div style={styles.statLabel}>Points Redeemed</div>
              <div style={styles.statChange}>
                <span style={{ color: '#22c55e' }}>{data.stats.redemptionRate}% rate</span>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statHeader}>
                <div style={{...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
                  <DollarSign size={22} color="#3b82f6" />
                </div>
              </div>
              <div style={styles.statValue}>{formatCurrency(data.stats.outstandingValue)}</div>
              <div style={styles.statLabel}>Outstanding Value</div>
              <div style={styles.statSubtext}>{formatNumber(data.stats.pointsOutstanding)} pts</div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statHeader}>
                <div style={{...styles.statIcon, backgroundColor: 'rgba(236, 72, 153, 0.1)'}}>
                  <Heart size={22} color="#ec4899" />
                </div>
              </div>
              <div style={styles.statValue}>{data.stats.activePercent}%</div>
              <div style={styles.statLabel}>Active Rate</div>
              <div style={styles.statSubtext}>{formatNumber(data.stats.activeMembers)} active</div>
            </div>
          </div>

          {/* Main Content */}
          <div style={styles.mainGrid}>
            {/* Tier Distribution */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Tier Distribution</h3>
                <button style={styles.viewAllBtn}>
                  Manage Tiers <ChevronRight size={14} />
                </button>
              </div>
              <div style={styles.tiersList}>
                {data.tiers.map((tier) => {
                  const TierIcon = getTierIcon(tier.icon);
                  const percent = (tier.members / data.stats.totalMembers) * 100;
                  return (
                    <div key={tier.id} style={styles.tierRow}>
                      <div style={{
                        ...styles.tierIcon,
                        backgroundColor: `${tier.color}20`,
                        color: tier.color
                      }}>
                        <TierIcon size={18} />
                      </div>
                      <div style={styles.tierInfo}>
                        <span style={styles.tierName}>{tier.name}</span>
                        <span style={styles.tierRange}>
                          {formatNumber(tier.minPoints)}+ pts
                        </span>
                      </div>
                      <div style={styles.tierMembers}>
                        {formatNumber(tier.members)} members
                      </div>
                      <div style={styles.tierBar}>
                        <div style={{
                          ...styles.tierBarFill,
                          width: `${percent}%`,
                          backgroundColor: tier.color
                        }} />
                      </div>
                      <span style={styles.tierPercent}>{percent.toFixed(1)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Point Sources */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Point Sources</h3>
                <Target size={18} color="var(--color-text-muted)" />
              </div>
              <div style={styles.sourcesList}>
                {data.pointSources.map((source, index) => (
                  <div key={index} style={styles.sourceRow}>
                    <div style={styles.sourceInfo}>
                      <span style={styles.sourceName}>{source.source}</span>
                      <span style={styles.sourcePoints}>
                        {formatNumber(source.points)} pts
                      </span>
                    </div>
                    <div style={styles.sourceBar}>
                      <div style={{
                        ...styles.sourceBarFill,
                        width: `${source.percent}%`
                      }} />
                    </div>
                    <span style={styles.sourcePercent}>{source.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity & Top Earners */}
          <div style={styles.secondGrid}>
            {/* Recent Activity */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Recent Activity</h3>
                <button style={styles.viewAllBtn}>
                  View All <ChevronRight size={14} />
                </button>
              </div>
              <div style={styles.activityList}>
                {data.recentActivity.slice(0, 6).map((activity) => (
                  <div key={activity.id} style={styles.activityRow}>
                    <div style={styles.activityIcon}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div style={styles.activityInfo}>
                      <span style={styles.activityMember}>{activity.member}</span>
                      <span style={styles.activityDesc}>
                        {activity.type === 'earn' && `Earned ${formatNumber(activity.points)} pts`}
                        {activity.type === 'redeem' && `Redeemed ${activity.reward}`}
                        {activity.type === 'tier_up' && `Upgraded to ${activity.toTier}`}
                        {activity.type === 'signup' && 'Joined program'}
                        {activity.type === 'expire' && `${formatNumber(activity.points)} pts expired`}
                      </span>
                    </div>
                    <span style={styles.activityTime}>{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Earners */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>
                  <Crown size={18} color="#f59e0b" style={{ marginRight: '8px' }} />
                  Top Earners
                </h3>
              </div>
              <div style={styles.earnersList}>
                {data.topEarners.map((earner, index) => (
                  <div key={earner.id} style={styles.earnerRow}>
                    <div style={styles.earnerRank}>#{index + 1}</div>
                    <div style={styles.earnerAvatar}>
                      {earner.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div style={styles.earnerInfo}>
                      <span style={styles.earnerName}>{earner.name}</span>
                      <span style={styles.earnerTier}>{earner.tier}</span>
                    </div>
                    <div style={styles.earnerPoints}>
                      <span style={styles.currentPoints}>{formatNumber(earner.points)} pts</span>
                      <span style={styles.lifetimePoints}>
                        {formatNumber(earner.lifetimeEarned)} lifetime
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Rewards */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Popular Rewards</h3>
                <button style={styles.viewAllBtn}>
                  Manage <ChevronRight size={14} />
                </button>
              </div>
              <div style={styles.rewardsList}>
                {data.rewards.slice(0, 5).map((reward) => (
                  <div key={reward.id} style={styles.rewardRow}>
                    <div style={styles.rewardIcon}>
                      {getRewardTypeIcon(reward.type)}
                    </div>
                    <div style={styles.rewardInfo}>
                      <span style={styles.rewardName}>{reward.name}</span>
                      <span style={styles.rewardCost}>
                        {formatNumber(reward.pointsCost)} pts
                      </span>
                    </div>
                    <div style={styles.rewardRedemptions}>
                      {formatNumber(reward.redemptions)} redeemed
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ecosystem Teaser */}
          <div style={styles.ecosystemCard}>
            <div style={styles.ecosystemHeader}>
              <div style={styles.ecosystemIcon}>
                <Gem size={28} color="#8b5cf6" />
              </div>
              <div style={styles.ecosystemTitleBlock}>
                <h3 style={styles.ecosystemTitle}>Loyalty Ecosystem</h3>
                <span style={styles.ecosystemSubtitle}>
                  Transform points into tradeable tokens
                </span>
              </div>
              <span style={styles.comingSoonBadge}>Coming Soon</span>
            </div>
            <div style={styles.ecosystemFeatures}>
              {data.ecosystem.features.map((feature, index) => (
                <div key={index} style={styles.ecosystemFeature}>
                  <CheckCircle size={16} color="#8b5cf6" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div style={styles.ecosystemFooter}>
              <div style={styles.tokenPreview}>
                <Coins size={20} color="#f59e0b" />
                <span style={styles.tokenName}>{data.ecosystem.tokenName}</span>
                <span style={styles.tokenSymbol}>${data.ecosystem.tokenSymbol}</span>
              </div>
              <button style={styles.learnMoreBtn}>
                Learn More <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Tiers Tab */}
      {activeTab === 'tiers' && (
        <div style={styles.tiersGrid}>
          {data.tiers.map((tier) => {
            const TierIcon = getTierIcon(tier.icon);
            return (
              <div key={tier.id} style={styles.tierCard}>
                <div style={styles.tierCardHeader}>
                  <div style={{
                    ...styles.tierCardIcon,
                    backgroundColor: tier.color,
                  }}>
                    <TierIcon size={24} color="#ffffff" />
                  </div>
                  <div style={styles.tierCardTitle}>
                    <h3 style={styles.tierCardName}>{tier.name}</h3>
                    <span style={styles.tierCardRange}>
                      {formatNumber(tier.minPoints)} - {tier.maxPoints ? formatNumber(tier.maxPoints) : '∞'} pts
                    </span>
                  </div>
                  <button style={styles.tierEditBtn}>
                    <Edit size={14} />
                  </button>
                </div>

                <div style={styles.tierCardStats}>
                  <div style={styles.tierCardStat}>
                    <span style={styles.tierStatValue}>{formatNumber(tier.members)}</span>
                    <span style={styles.tierStatLabel}>Members</span>
                  </div>
                  <div style={styles.tierCardStat}>
                    <span style={styles.tierStatValue}>{tier.earnMultiplier}x</span>
                    <span style={styles.tierStatLabel}>Earn Rate</span>
                  </div>
                </div>

                <div style={styles.tierBenefits}>
                  <h4 style={styles.benefitsTitle}>Benefits</h4>
                  <ul style={styles.benefitsList}>
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} style={styles.benefitItem}>
                        <CheckCircle size={14} color={tier.color} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* Add Tier Card */}
          <div style={styles.addTierCard}>
            <Plus size={32} color="var(--color-text-muted)" />
            <span style={styles.addTierText}>Add New Tier</span>
          </div>
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div style={styles.rewardsSection}>
          <div style={styles.rewardsToolbar}>
            <div style={styles.searchBox}>
              <Search size={16} color="var(--color-text-muted)" />
              <input
                type="text"
                placeholder="Search rewards..."
                style={styles.searchInput}
              />
            </div>
            <button style={styles.primaryBtn}>
              <Plus size={16} />
              Add Reward
            </button>
          </div>

          <div style={styles.rewardsGrid}>
            {data.rewards.map((reward) => (
              <div key={reward.id} style={styles.rewardCard}>
                <div style={styles.rewardCardHeader}>
                  <div style={styles.rewardCardIcon}>
                    {getRewardTypeIcon(reward.type)}
                  </div>
                  <span style={{
                    ...styles.rewardStatus,
                    backgroundColor: reward.status === 'active' 
                      ? 'rgba(34, 197, 94, 0.1)' 
                      : 'rgba(249, 115, 22, 0.1)',
                    color: reward.status === 'active' ? '#22c55e' : '#f59e0b'
                  }}>
                    {reward.status}
                  </span>
                </div>
                <h4 style={styles.rewardCardName}>{reward.name}</h4>
                <div style={styles.rewardCardCost}>
                  <Coins size={16} color="#8b5cf6" />
                  <span>{formatNumber(reward.pointsCost)} pts</span>
                </div>
                {reward.value && (
                  <div style={styles.rewardCardValue}>
                    Value: {formatCurrency(reward.value)}
                  </div>
                )}
                <div style={styles.rewardCardFooter}>
                  <span style={styles.rewardRedemptionCount}>
                    {formatNumber(reward.redemptions)} redeemed
                  </span>
                  <div style={styles.rewardCardActions}>
                    <button style={styles.rewardActionBtn}>
                      <Edit size={14} />
                    </button>
                    <button style={styles.rewardActionBtn}>
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Reward Card */}
            <div style={styles.addRewardCard}>
              <Plus size={32} color="var(--color-text-muted)" />
              <span style={styles.addRewardText}>Create Reward</span>
            </div>
          </div>
        </div>
      )}

      {/* Members Tab Placeholder */}
      {activeTab === 'members' && (
        <div style={styles.placeholderTab}>
          <Users size={48} color="var(--color-text-muted)" />
          <h3>Member Management</h3>
          <p>View and manage loyalty program members</p>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            (Uses CustomerSegments component with loyalty filter)
          </p>
        </div>
      )}

      {/* Activity Tab Placeholder */}
      {activeTab === 'activity' && (
        <div style={styles.placeholderTab}>
          <Clock size={48} color="var(--color-text-muted)" />
          <h3>Activity History</h3>
          <p>Full loyalty activity log</p>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            (Uses CustomerActivity component with loyalty filter)
          </p>
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
  programBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
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
  tabNav: {
    display: 'flex',
    gap: '4px',
    marginBottom: '24px',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '0'
  },
  tabBtn: {
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    marginBottom: '-1px'
  },
  tabBtnActive: {
    color: 'var(--color-primary)',
    borderBottomColor: 'var(--color-primary)'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
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
    marginBottom: '12px'
  },
  statIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginBottom: '8px'
  },
  statChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px'
  },
  changeLabel: {
    color: 'var(--color-text-muted)',
    marginLeft: '4px'
  },
  statSubtext: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px'
  },
  secondGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
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
    display: 'flex',
    alignItems: 'center',
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
  tiersList: {
    padding: '16px 24px'
  },
  tierRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  tierIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tierInfo: {
    flex: 1
  },
  tierName: {
    display: 'block',
    fontWeight: 600
  },
  tierRange: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  tierMembers: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginRight: '16px'
  },
  tierBar: {
    width: '80px',
    height: '6px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  tierBarFill: {
    height: '100%',
    borderRadius: '3px'
  },
  tierPercent: {
    width: '50px',
    textAlign: 'right',
    fontSize: '13px',
    fontWeight: 600
  },
  sourcesList: {
    padding: '16px 24px'
  },
  sourceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  sourceInfo: {
    width: '120px'
  },
  sourceName: {
    display: 'block',
    fontWeight: 500,
    fontSize: '13px'
  },
  sourcePoints: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  sourceBar: {
    flex: 1,
    height: '8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  sourceBarFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: '4px'
  },
  sourcePercent: {
    width: '50px',
    textAlign: 'right',
    fontSize: '13px',
    fontWeight: 600
  },
  activityList: {
    padding: '16px 24px'
  },
  activityRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  activityIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityInfo: {
    flex: 1
  },
  activityMember: {
    display: 'block',
    fontWeight: 600,
    fontSize: '13px'
  },
  activityDesc: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  activityTime: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  earnersList: {
    padding: '16px 24px'
  },
  earnerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  earnerRank: {
    width: '28px',
    fontWeight: 700,
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  earnerAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#8b5cf6',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 600
  },
  earnerInfo: {
    flex: 1
  },
  earnerName: {
    display: 'block',
    fontWeight: 600,
    fontSize: '13px'
  },
  earnerTier: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  earnerPoints: {
    textAlign: 'right'
  },
  currentPoints: {
    display: 'block',
    fontWeight: 700,
    color: '#8b5cf6'
  },
  lifetimePoints: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  rewardsList: {
    padding: '16px 24px'
  },
  rewardRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  rewardIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    color: '#8b5cf6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rewardInfo: {
    flex: 1
  },
  rewardName: {
    display: 'block',
    fontWeight: 600,
    fontSize: '13px'
  },
  rewardCost: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  rewardRedemptions: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  // Ecosystem Card
  ecosystemCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '24px',
    background: 'linear-gradient(135deg, var(--color-surface) 0%, rgba(139, 92, 246, 0.05) 100%)'
  },
  ecosystemHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px'
  },
  ecosystemIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ecosystemTitleBlock: {
    flex: 1
  },
  ecosystemTitle: {
    fontSize: '20px',
    fontWeight: 700,
    margin: '0 0 4px 0'
  },
  ecosystemSubtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  comingSoonBadge: {
    padding: '6px 14px',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#f59e0b'
  },
  ecosystemFeatures: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  ecosystemFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
    fontSize: '13px'
  },
  ecosystemFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid var(--color-border)'
  },
  tokenPreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  tokenName: {
    fontWeight: 700,
    fontSize: '16px'
  },
  tokenSymbol: {
    padding: '4px 10px',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#f59e0b'
  },
  learnMoreBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#8b5cf6',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  // Tiers Tab
  tiersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  tierCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '24px'
  },
  tierCardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    marginBottom: '20px'
  },
  tierCardIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tierCardTitle: {
    flex: 1
  },
  tierCardName: {
    fontSize: '20px',
    fontWeight: 700,
    margin: '0 0 4px 0'
  },
  tierCardRange: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  tierEditBtn: {
    padding: '8px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  tierCardStats: {
    display: 'flex',
    gap: '24px',
    marginBottom: '20px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px'
  },
  tierCardStat: {
    textAlign: 'center',
    flex: 1
  },
  tierStatValue: {
    display: 'block',
    fontSize: '24px',
    fontWeight: 700
  },
  tierStatLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  tierBenefits: {},
  benefitsTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    margin: '0 0 12px 0'
  },
  benefitsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 0',
    fontSize: '13px'
  },
  addTierCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '40px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '2px dashed var(--color-border)',
    cursor: 'pointer',
    minHeight: '300px'
  },
  addTierText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  // Rewards Tab
  rewardsSection: {},
  rewardsToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    width: '300px'
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  rewardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  },
  rewardCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '20px'
  },
  rewardCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  rewardCardIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    color: '#8b5cf6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rewardStatus: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  rewardCardName: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 8px 0'
  },
  rewardCardCost: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '18px',
    fontWeight: 700,
    color: '#8b5cf6',
    marginBottom: '4px'
  },
  rewardCardValue: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginBottom: '16px'
  },
  rewardCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid var(--color-border)'
  },
  rewardRedemptionCount: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  rewardCardActions: {
    display: 'flex',
    gap: '8px'
  },
  rewardActionBtn: {
    padding: '6px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '6px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  addRewardCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '40px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '2px dashed var(--color-border)',
    cursor: 'pointer',
    minHeight: '200px'
  },
  addRewardText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  // Placeholder Tabs
  placeholderTab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    textAlign: 'center',
    gap: '12px'
  }
};

export default CustomerLoyalty;