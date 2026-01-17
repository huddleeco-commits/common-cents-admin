/**
 * HealthPage
 * 
 * System health diagnostics and monitoring.
 * Shows status of all components, logs, and manual/auto fix options.
 * Works with or without AI Manager.
 */

import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Activity,
  Server,
  Database,
  Globe,
  CreditCard,
  Mail,
  Cloud,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Wrench,
  Clock,
  ChevronDown,
  ChevronUp,
  Terminal,
  Zap,
  ExternalLink
} from 'lucide-react';
import { useHealth } from '../hooks/useHealth';

export function HealthPage() {
  const { business } = useOutletContext();
  const { 
    health, 
    loading, 
    lastCheck,
    fixing,
    checkHealth, 
    attemptFix,
    checkIntegration,
    getStatusColor,
    getStatusIcon,
    isHealthy,
    isDegraded,
    isUnhealthy
  } = useHealth(false); // Manual refresh only on this page

  const [expandedSections, setExpandedSections] = useState({});
  const [fixingComponent, setFixingComponent] = useState(null);
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFix = async (component) => {
    setFixingComponent(component);
    addLog(`Attempting to fix ${component}...`);
    
    const result = await attemptFix(component);
    
    if (result.success) {
      addLog(`✅ ${component} fixed: ${result.message}`);
      if (result.actions) {
        result.actions.forEach(action => addLog(`   → ${action}`));
      }
    } else {
      addLog(`❌ Failed to fix ${component}: ${result.error}`);
    }
    
    setFixingComponent(null);
  };

  const handleCheckIntegration = async (name) => {
    addLog(`Checking ${name}...`);
    const result = await checkIntegration(name);
    addLog(`${result.status === 'healthy' ? '✅' : '❌'} ${name}: ${result.status}`);
  };

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { timestamp, message }]);
  };

  const handleFullCheck = async () => {
    addLog('Starting full system check...');
    await checkHealth();
    addLog('Full system check complete.');
  };

  // Build component list
  const components = [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: Globe,
      status: health.frontend?.status || 'unknown',
      latency: health.frontend?.latency,
      details: health.details?.frontend || {},
      fixable: true
    },
    {
      id: 'backend',
      name: 'Backend API',
      icon: Server,
      status: health.backend?.status || 'unknown',
      latency: health.backend?.latency,
      details: health.details?.backend || {},
      fixable: true
    },
    {
      id: 'database',
      name: 'Database',
      icon: Database,
      status: health.database?.status || 'unknown',
      details: health.details?.database || {},
      fixable: true
    }
  ];

  // Build integrations list
  const integrations = [
    { id: 'stripe', name: 'Stripe Payments', icon: CreditCard },
    { id: 'email', name: 'Email Service', icon: Mail },
    { id: 'storage', name: 'File Storage', icon: Cloud }
  ].map(int => ({
    ...int,
    status: health.integrations?.[int.id]?.status || 'unknown',
    details: health.integrations?.[int.id] || {}
  }));

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>System Health</h1>
          <p style={styles.subtitle}>
            Monitor and diagnose {business?.name || 'your business'} infrastructure
          </p>
        </div>
        <div style={styles.headerActions}>
          <button 
            style={styles.refreshButton} 
            onClick={handleFullCheck}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'spinning' : ''} />
            {loading ? 'Checking...' : 'Run Full Check'}
          </button>
        </div>
      </div>

      {/* Overall Status Banner */}
      <div style={{
        ...styles.statusBanner,
        backgroundColor: isHealthy 
          ? 'rgba(34, 197, 94, 0.1)' 
          : isDegraded 
            ? 'rgba(234, 179, 8, 0.1)'
            : 'rgba(239, 68, 68, 0.1)',
        borderColor: isHealthy 
          ? '#22c55e' 
          : isDegraded 
            ? '#eab308'
            : '#ef4444'
      }}>
        <div style={styles.statusBannerIcon}>
          {isHealthy ? (
            <CheckCircle size={32} color="#22c55e" />
          ) : isDegraded ? (
            <AlertCircle size={32} color="#eab308" />
          ) : (
            <XCircle size={32} color="#ef4444" />
          )}
        </div>
        <div style={styles.statusBannerInfo}>
          <h2 style={{
            ...styles.statusBannerTitle,
            color: isHealthy ? '#22c55e' : isDegraded ? '#eab308' : '#ef4444'
          }}>
            {isHealthy ? 'All Systems Operational' : isDegraded ? 'Some Issues Detected' : 'System Issues'}
          </h2>
          <p style={styles.statusBannerSubtitle}>
            {lastCheck 
              ? `Last checked: ${lastCheck.toLocaleString()}`
              : 'Click "Run Full Check" to check system status'
            }
          </p>
        </div>
        {!isHealthy && (
          <button
            style={styles.autoFixAllButton}
            onClick={() => handleFix('all')}
            disabled={fixing}
          >
            <Zap size={16} />
            {fixing ? 'Fixing...' : 'Auto-Fix All'}
          </button>
        )}
      </div>

      {/* Core Components */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Core Components</h3>
        <div style={styles.componentsList}>
          {components.map(comp => (
            <ComponentCard
              key={comp.id}
              component={comp}
              expanded={expandedSections[comp.id]}
              onToggle={() => toggleSection(comp.id)}
              onFix={() => handleFix(comp.id)}
              fixing={fixingComponent === comp.id}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Integrations</h3>
        <div style={styles.integrationsGrid}>
          {integrations.map(int => (
            <IntegrationCard
              key={int.id}
              integration={int}
              onCheck={() => handleCheckIntegration(int.id)}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          ))}
        </div>
      </div>

      {/* Logs Panel */}
      <div style={styles.section}>
        <button 
          style={styles.logsToggle}
          onClick={() => setShowLogs(!showLogs)}
        >
          <Terminal size={18} />
          <span>Diagnostic Logs ({logs.length})</span>
          {showLogs ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {showLogs && (
          <div style={styles.logsPanel}>
            {logs.length === 0 ? (
              <p style={styles.logsEmpty}>No logs yet. Run a check to see diagnostic output.</p>
            ) : (
              <div style={styles.logsList}>
                {logs.map((log, idx) => (
                  <div key={idx} style={styles.logEntry}>
                    <span style={styles.logTime}>{log.timestamp}</span>
                    <span style={styles.logMessage}>{log.message}</span>
                  </div>
                ))}
              </div>
            )}
            {logs.length > 0 && (
              <button 
                style={styles.clearLogsButton}
                onClick={() => setLogs([])}
              >
                Clear Logs
              </button>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Quick Actions</h3>
        <div style={styles.quickActionsGrid}>
          <QuickActionCard
            icon={RefreshCw}
            title="Restart Backend"
            description="Restart the API server"
            onClick={() => handleFix('restart-backend')}
            disabled={fixing}
          />
          <QuickActionCard
            icon={Database}
            title="Clear Cache"
            description="Clear all cached data"
            onClick={() => handleFix('clear-cache')}
            disabled={fixing}
          />
          <QuickActionCard
            icon={Activity}
            title="Run Migrations"
            description="Apply pending database migrations"
            onClick={() => handleFix('run-migrations')}
            disabled={fixing}
          />
          <QuickActionCard
            icon={Globe}
            title="Redeploy Frontend"
            description="Trigger frontend rebuild"
            onClick={() => handleFix('redeploy-frontend')}
            disabled={fixing}
          />
        </div>
      </div>
    </div>
  );
}

// Component Card
function ComponentCard({ component, expanded, onToggle, onFix, fixing, getStatusColor, getStatusIcon }) {
  const Icon = component.icon;
  const statusColor = getStatusColor(component.status);
  const statusIcon = getStatusIcon(component.status);
  
  return (
    <div style={styles.componentCard}>
      <div style={styles.componentHeader} onClick={onToggle}>
        <div style={styles.componentLeft}>
          <div style={{ ...styles.componentIcon, color: statusColor }}>
            <Icon size={20} />
          </div>
          <div style={styles.componentInfo}>
            <span style={styles.componentName}>{component.name}</span>
            <span style={{ ...styles.componentStatus, color: statusColor }}>
              {statusIcon} {component.status}
              {component.latency && ` (${component.latency}ms)`}
            </span>
          </div>
        </div>
        <div style={styles.componentRight}>
          {component.status !== 'healthy' && component.fixable && (
            <button
              style={styles.fixButton}
              onClick={(e) => { e.stopPropagation(); onFix(); }}
              disabled={fixing}
            >
              <Wrench size={14} />
              {fixing ? 'Fixing...' : 'Fix'}
            </button>
          )}
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>
      
      {expanded && (
        <div style={styles.componentDetails}>
          {Object.entries(component.details).length === 0 ? (
            <p style={styles.noDetails}>No additional details available</p>
          ) : (
            <div style={styles.detailsList}>
              {Object.entries(component.details).map(([key, value]) => (
                <div key={key} style={styles.detailRow}>
                  <span style={styles.detailKey}>{key}</span>
                  <span style={styles.detailValue}>{String(value)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Integration Card
function IntegrationCard({ integration, onCheck, getStatusColor, getStatusIcon }) {
  const Icon = integration.icon;
  const statusColor = getStatusColor(integration.status);
  const statusIcon = getStatusIcon(integration.status);
  
  return (
    <div style={styles.integrationCard}>
      <div style={{ ...styles.integrationIcon, color: statusColor }}>
        <Icon size={24} />
      </div>
      <div style={styles.integrationInfo}>
        <span style={styles.integrationName}>{integration.name}</span>
        <span style={{ ...styles.integrationStatus, color: statusColor }}>
          {statusIcon} {integration.status}
        </span>
      </div>
      <button style={styles.checkButton} onClick={onCheck}>
        <RefreshCw size={14} />
      </button>
    </div>
  );
}

// Quick Action Card
function QuickActionCard({ icon: Icon, title, description, onClick, disabled }) {
  return (
    <button 
      style={{
        ...styles.quickActionCard,
        opacity: disabled ? 0.5 : 1
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <div style={styles.quickActionIcon}>
        <Icon size={20} />
      </div>
      <div style={styles.quickActionInfo}>
        <span style={styles.quickActionTitle}>{title}</span>
        <span style={styles.quickActionDesc}>{description}</span>
      </div>
    </button>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    margin: 0,
    fontFamily: 'var(--font-heading)'
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0'
  },
  headerActions: {
    display: 'flex',
    gap: '12px'
  },
  refreshButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  statusBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid'
  },
  statusBannerIcon: {
    flexShrink: 0
  },
  statusBannerInfo: {
    flex: 1
  },
  statusBannerTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0
  },
  statusBannerSubtitle: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0'
  },
  autoFixAllButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  componentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  componentCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  componentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    cursor: 'pointer'
  },
  componentLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  componentIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  componentInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  componentName: {
    fontSize: '15px',
    fontWeight: 600
  },
  componentStatus: {
    fontSize: '13px',
    textTransform: 'capitalize'
  },
  componentRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: 'var(--color-text-muted)'
  },
  fixButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  componentDetails: {
    padding: '16px 20px',
    backgroundColor: 'var(--color-surface-2)',
    borderTop: '1px solid var(--color-border)'
  },
  noDetails: {
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    margin: 0
  },
  detailsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px'
  },
  detailKey: {
    color: 'var(--color-text-muted)'
  },
  detailValue: {
    fontFamily: 'monospace'
  },
  integrationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px'
  },
  integrationCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)'
  },
  integrationIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  integrationInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  integrationName: {
    fontSize: '14px',
    fontWeight: 600
  },
  integrationStatus: {
    fontSize: '12px',
    textTransform: 'capitalize'
  },
  checkButton: {
    padding: '8px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  logsToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 18px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left'
  },
  logsPanel: {
    backgroundColor: '#0d0d0d',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  logsEmpty: {
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    padding: '20px',
    margin: 0,
    textAlign: 'center'
  },
  logsList: {
    maxHeight: '300px',
    overflowY: 'auto',
    padding: '12px'
  },
  logEntry: {
    display: 'flex',
    gap: '12px',
    padding: '6px 0',
    fontSize: '12px',
    fontFamily: 'monospace',
    borderBottom: '1px solid #1a1a1a'
  },
  logTime: {
    color: '#666',
    flexShrink: 0
  },
  logMessage: {
    color: '#ccc',
    wordBreak: 'break-word'
  },
  clearLogsButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    borderTop: '1px solid #1a1a1a',
    color: 'var(--color-text-muted)',
    fontSize: '12px',
    cursor: 'pointer'
  },
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px'
  },
  quickActionCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s'
  },
  quickActionIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-primary)'
  },
  quickActionInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  quickActionTitle: {
    fontSize: '13px',
    fontWeight: 600
  },
  quickActionDesc: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  }
};

export default HealthPage;