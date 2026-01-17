/**
 * DashboardHome
 * 
 * Main admin dashboard overview.
 * Shows health status, quick stats, recent activity, and AI chat preview.
 */

import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  DollarSign, 
  Users, 
  Eye,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Send
} from 'lucide-react';
import { useHealth } from '../hooks/useHealth';
import { useAI } from '../hooks/useAI';

export function DashboardHome() {
  const { brain, business } = useOutletContext();
  const { health, isHealthy, isDegraded, isUnhealthy, getStatusIcon, checkHealth, loading: healthLoading } = useHealth();
  const { sendMessage, messages, loading: aiLoading, typing } = useAI();
  const navigate = useNavigate();
  
  const [quickMessage, setQuickMessage] = useState('');

  // Dynamic labels based on industry
  const labels = brain?.labels || {
    customers: 'Customers',
    orders: 'Orders',
    items: 'Items',
    revenue: 'Revenue'
  };

  // Quick stats (would come from brain/analytics)
  const stats = brain?.analytics?.summary || {
    revenue: { value: '$0', change: '+0%', trend: 'up' },
    customers: { value: '0', change: '+0%', trend: 'up' },
    orders: { value: '0', change: '+0%', trend: 'up' },
    views: { value: '0', change: '+0%', trend: 'up' }
  };

  // Handle quick AI message
  const handleQuickMessage = async (e) => {
    e.preventDefault();
    if (!quickMessage.trim()) return;
    await sendMessage(quickMessage);
    setQuickMessage('');
  };

  return (
    <div style={styles.container}>
      {/* Welcome Section */}
      <div style={styles.welcomeSection}>
        <h1 style={styles.welcomeTitle}>
          Welcome back{business?.ownerName ? `, ${business.ownerName}` : ''}
        </h1>
        <p style={styles.welcomeSubtitle}>
          Here's what's happening with {business?.name || 'your business'} today
        </p>
      </div>

      {/* Health Status Card */}
      <div style={{
        ...styles.healthCard,
        borderColor: isHealthy ? '#22c55e' : isDegraded ? '#eab308' : isUnhealthy ? '#ef4444' : '#888888'
      }}>
        <div style={styles.healthHeader}>
          <div style={styles.healthTitle}>
            <Activity size={20} />
            <span>System Health</span>
          </div>
          <button 
            style={styles.refreshButton}
            onClick={checkHealth}
            disabled={healthLoading}
          >
            {healthLoading ? 'Checking...' : 'Refresh'}
          </button>
        </div>
        
        <div style={styles.healthGrid}>
          <HealthItem 
            label="Frontend" 
            status={health.frontend?.status} 
            latency={health.frontend?.latency}
            icon={getStatusIcon(health.frontend?.status)}
          />
          <HealthItem 
            label="Backend" 
            status={health.backend?.status} 
            latency={health.backend?.latency}
            icon={getStatusIcon(health.backend?.status)}
          />
          <HealthItem 
            label="Database" 
            status={health.database?.status} 
            icon={getStatusIcon(health.database?.status)}
          />
          <HealthItem 
            label="Overall" 
            status={health.overall} 
            icon={getStatusIcon(health.overall)}
            bold
          />
        </div>

        {(isDegraded || isUnhealthy) && (
          <div style={styles.healthAlert}>
            <AlertCircle size={16} />
            <span>Some systems need attention. </span>
            <button 
              style={styles.healthAlertLink}
              onClick={() => navigate('/admin/health')}
            >
              View Details
            </button>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <StatCard 
          icon={DollarSign}
          label={labels.revenue || 'Revenue'}
          value={stats.revenue?.value}
          change={stats.revenue?.change}
          trend={stats.revenue?.trend}
        />
        <StatCard 
          icon={Users}
          label={labels.customers || 'Customers'}
          value={stats.customers?.value}
          change={stats.customers?.change}
          trend={stats.customers?.trend}
        />
        <StatCard 
          icon={CheckCircle}
          label={labels.orders || 'Orders'}
          value={stats.orders?.value}
          change={stats.orders?.change}
          trend={stats.orders?.trend}
        />
        <StatCard 
          icon={Eye}
          label="Page Views"
          value={stats.views?.value}
          change={stats.views?.change}
          trend={stats.views?.trend}
        />
      </div>

      {/* Quick AI Chat */}
      <div style={styles.aiCard}>
        <div style={styles.aiHeader}>
          <div style={styles.aiTitle}>
            <MessageSquare size={20} />
            <span>AI Manager</span>
          </div>
          <button 
            style={styles.aiExpandButton}
            onClick={() => navigate('/admin/ai')}
          >
            Open Full Chat <ArrowRight size={14} />
          </button>
        </div>

        {/* Recent Messages Preview */}
        <div style={styles.aiMessages}>
          {messages.length === 0 ? (
            <p style={styles.aiPlaceholder}>
              Ask me anything about your business. I can update settings, check analytics, diagnose issues, and more.
            </p>
          ) : (
            messages.slice(-3).map(msg => (
              <div 
                key={msg.id} 
                style={{
                  ...styles.aiMessage,
                  ...(msg.role === 'user' ? styles.aiMessageUser : styles.aiMessageAssistant)
                }}
              >
                {msg.content.length > 150 ? msg.content.substring(0, 150) + '...' : msg.content}
              </div>
            ))
          )}
          {typing && (
            <div style={styles.aiTyping}>AI is typing...</div>
          )}
        </div>

        {/* Quick Input */}
        <form onSubmit={handleQuickMessage} style={styles.aiInputForm}>
          <input
            type="text"
            value={quickMessage}
            onChange={(e) => setQuickMessage(e.target.value)}
            placeholder="Ask something..."
            style={styles.aiInput}
            disabled={aiLoading}
          />
          <button 
            type="submit" 
            style={styles.aiSendButton}
            disabled={aiLoading || !quickMessage.trim()}
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* Quick Actions */}
      <div style={styles.quickActions}>
        <h3 style={styles.sectionTitle}>Quick Actions</h3>
        <div style={styles.actionsGrid}>
          <QuickAction 
            label="Update Hours" 
            onClick={() => navigate('/admin/settings?tab=general')}
          />
          <QuickAction 
            label="Upload Images" 
            onClick={() => navigate('/admin/assets')}
          />
          <QuickAction 
            label="View Analytics" 
            onClick={() => navigate('/admin/analytics')}
          />
          <QuickAction 
            label="Check Integrations" 
            onClick={() => navigate('/admin/settings?tab=integrations')}
          />
        </div>
      </div>
    </div>
  );
}

// Sub-components
function HealthItem({ label, status, latency, icon, bold }) {
  return (
    <div style={styles.healthItem}>
      <span style={{ 
        ...styles.healthLabel,
        fontWeight: bold ? 600 : 400
      }}>{label}</span>
      <span style={styles.healthValue}>
        {icon} {status || 'unknown'}
        {latency && <span style={styles.latency}>({latency}ms)</span>}
      </span>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, trend }) {
  const isPositive = trend === 'up' || change?.startsWith('+');
  
  return (
    <div style={styles.statCard}>
      <div style={styles.statIcon}>
        <Icon size={20} />
      </div>
      <div style={styles.statInfo}>
        <span style={styles.statLabel}>{label}</span>
        <span style={styles.statValue}>{value || '0'}</span>
        {change && (
          <span style={{
            ...styles.statChange,
            color: isPositive ? '#22c55e' : '#ef4444'
          }}>
            <TrendingUp size={12} style={{ 
              transform: isPositive ? 'none' : 'rotate(180deg)' 
            }} />
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

function QuickAction({ label, onClick }) {
  return (
    <button style={styles.quickActionButton} onClick={onClick}>
      {label}
      <ArrowRight size={14} />
    </button>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  welcomeSection: {
    marginBottom: '8px'
  },
  welcomeTitle: {
    fontSize: '28px',
    fontWeight: 700,
    margin: 0,
    fontFamily: 'var(--font-heading)'
  },
  welcomeSubtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '8px 0 0 0'
  },
  healthCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid',
    borderColor: 'var(--color-border)'
  },
  healthHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  healthTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: 600
  },
  refreshButton: {
    padding: '6px 12px',
    fontSize: '12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    cursor: 'pointer'
  },
  healthGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px'
  },
  healthItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  healthLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  healthValue: {
    fontSize: '14px',
    textTransform: 'capitalize'
  },
  latency: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginLeft: '4px'
  },
  healthAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '16px',
    padding: '12px',
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#eab308'
  },
  healthAlertLink: {
    background: 'none',
    border: 'none',
    color: '#eab308',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '13px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px'
  },
  statCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid var(--color-border)',
    display: 'flex',
    gap: '16px'
  },
  statIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-primary)'
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  statLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  statValue: {
    fontSize: '22px',
    fontWeight: 700
  },
  statChange: {
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  aiCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid var(--color-border)'
  },
  aiHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  aiTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: 600
  },
  aiExpandButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    fontSize: '12px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '6px',
    color: '#ffffff',
    cursor: 'pointer'
  },
  aiMessages: {
    minHeight: '100px',
    marginBottom: '16px'
  },
  aiPlaceholder: {
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontStyle: 'italic'
  },
  aiMessage: {
    padding: '10px 14px',
    borderRadius: '10px',
    marginBottom: '8px',
    fontSize: '14px',
    maxWidth: '85%'
  },
  aiMessageUser: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff',
    marginLeft: 'auto'
  },
  aiMessageAssistant: {
    backgroundColor: 'var(--color-surface-2)',
    color: 'var(--color-text)'
  },
  aiTyping: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    fontStyle: 'italic'
  },
  aiInputForm: {
    display: 'flex',
    gap: '8px'
  },
  aiInput: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    outline: 'none'
  },
  aiSendButton: {
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    cursor: 'pointer'
  },
  quickActions: {
    marginTop: '8px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '16px'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px'
  },
  quickActionButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  }
};

export default DashboardHome;