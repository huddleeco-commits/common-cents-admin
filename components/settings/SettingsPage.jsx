/**
 * SettingsPage
 * 
 * Main settings page with tabbed navigation.
 * All business configuration in one place.
 * Works with or without AI Manager.
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import {
  Settings,
  Building,
  Server,
  Key,
  CreditCard,
  Truck,
  Bot,
  Mail,
  BarChart3,
  Shield,
  Puzzle,
  Wrench
} from 'lucide-react';

// Import settings sub-components
import SettingsGeneral from './SettingsGeneral';
import SettingsInfra from './SettingsInfra';
import SettingsAPIs from './SettingsAPIs';
import SettingsPayments from './SettingsPayments';
import SettingsShipping from './SettingsShipping';
import SettingsAI from './SettingsAI';
import SettingsEmail from './SettingsEmail';
import SettingsAnalytics from './SettingsAnalytics';
import SettingsSecurity from './SettingsSecurity';
import SettingsIntegrations from './SettingsIntegrations';
import SettingsAdvanced from './SettingsAdvanced';

export function SettingsPage() {
  const { business, brain } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialTab = searchParams.get('tab') || 'general';
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: 'general', label: 'General', icon: Building },
    { id: 'infrastructure', label: 'Infrastructure', icon: Server },
    { id: 'apis', label: 'APIs', icon: Key },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'ai', label: 'AI', icon: Bot },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Puzzle },
    { id: 'advanced', label: 'Advanced', icon: Wrench }
  ];

  useEffect(() => {
    // Update URL when tab changes
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <SettingsGeneral />;
      case 'infrastructure':
        return <SettingsInfra />;
      case 'apis':
        return <SettingsAPIs />;
      case 'payments':
        return <SettingsPayments />;
      case 'shipping':
        return <SettingsShipping />;
      case 'ai':
        return <SettingsAI />;
      case 'email':
        return <SettingsEmail />;
      case 'analytics':
        return <SettingsAnalytics />;
      case 'security':
        return <SettingsSecurity />;
      case 'integrations':
        return <SettingsIntegrations />;
      case 'advanced':
        return <SettingsAdvanced />;
      default:
        return <SettingsGeneral />;
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerIcon}>
          <Settings size={24} />
        </div>
        <div>
          <h1 style={styles.title}>Settings</h1>
          <p style={styles.subtitle}>
            Configure {business?.name || 'your business'}
          </p>
        </div>
      </div>

      {/* Layout: Tabs + Content */}
      <div style={styles.layout}>
        {/* Tab Navigation */}
        <nav style={styles.tabNav}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                style={{
                  ...styles.tabButton,
                  ...(isActive ? styles.tabButtonActive : {})
                }}
                onClick={() => handleTabChange(tab.id)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Tab Content */}
        <div style={styles.tabContent}>
          {renderTabContent()}
        </div>
      </div>
    </div>
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
    alignItems: 'center',
    gap: '16px'
  },
  headerIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-primary)'
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
  layout: {
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start'
  },
  tabNav: {
    width: '200px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    padding: '12px',
    border: '1px solid var(--color-border)',
    position: 'sticky',
    top: '100px'
  },
  tabButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 14px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s'
  },
  tabButtonActive: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  tabContent: {
    flex: 1,
    minWidth: 0
  }
};

export default SettingsPage;