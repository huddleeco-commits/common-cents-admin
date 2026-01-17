/**
 * AIManagerPage
 * 
 * The AI Manager control center. This is where business owners
 * interact with their AI assistant that can:
 * - Make any website changes with preview before publish
 * - Monitor competitors and local trends
 * - Provide proactive business insights
 * - Automate tasks and workflows
 * 
 * The AI knows the business industry, location, and has full
 * context from brain.json to make intelligent suggestions.
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Bot,
  MessageSquare,
  Eye,
  Lightbulb,
  Target,
  MapPin,
  Clock,
  History,
  Zap,
  TrendingUp,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useBrain } from '../../hooks/useBrain';
import AIChat from './AIChat';
import AIPreview from './AIPreview';
import AIInsights from './AIInsights';
import AICompetitors from './AICompetitors';
import AILocalPulse from './AILocalPulse';
import AITasks from './AITasks';
import AIHistory from './AIHistory';

export function AIManagerPage() {
  const { business } = useOutletContext();
  const { brain } = useBrain();
  
  const [activeTab, setActiveTab] = useState('chat');
  const [pendingChanges, setPendingChanges] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [aiStatus, setAiStatus] = useState('ready'); // ready, thinking, acting
  const [insights, setInsights] = useState([]);

  // Simulated insights on load
  useEffect(() => {
    // In production, these come from AI analysis
    setInsights([
      {
        id: 1,
        type: 'opportunity',
        priority: 'high',
        title: 'Seasonal Menu Update',
        message: 'Pumpkin spice searches up 340% in your area. Add seasonal items?',
        action: 'Add Seasonal Items'
      },
      {
        id: 2,
        type: 'competitor',
        priority: 'medium',
        title: 'Competitor Price Change',
        message: "Joe's Diner raised burger prices 12%. You have pricing power.",
        action: 'Review Pricing'
      },
      {
        id: 3,
        type: 'event',
        priority: 'medium',
        title: 'Local Event This Weekend',
        message: 'Dallas Marathon Sunday - expect 40% more foot traffic.',
        action: 'Prepare Promotion'
      }
    ]);
  }, []);

  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageSquare, description: 'Talk to your AI' },
    { id: 'insights', label: 'Insights', icon: Lightbulb, badge: insights.length },
    { id: 'competitors', label: 'Competitors', icon: Target },
    { id: 'local', label: 'Local Pulse', icon: MapPin },
    { id: 'tasks', label: 'Tasks', icon: Clock },
    { id: 'history', label: 'History', icon: History }
  ];

  const handleAIAction = (changes) => {
    setPendingChanges(changes);
    setShowPreview(true);
  };

  const handlePublish = async () => {
    setAiStatus('acting');
    // Apply changes to brain.json
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPendingChanges([]);
    setShowPreview(false);
    setAiStatus('ready');
  };

  const handleCancelChanges = () => {
    setPendingChanges([]);
    setShowPreview(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return <AIChat onAction={handleAIAction} status={aiStatus} setStatus={setAiStatus} />;
      case 'insights':
        return <AIInsights insights={insights} onAction={handleAIAction} />;
      case 'competitors':
        return <AICompetitors onAction={handleAIAction} />;
      case 'local':
        return <AILocalPulse onAction={handleAIAction} />;
      case 'tasks':
        return <AITasks />;
      case 'history':
        return <AIHistory />;
      default:
        return <AIChat onAction={handleAIAction} status={aiStatus} setStatus={setAiStatus} />;
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.aiAvatar}>
            <Bot size={28} />
            <span style={{
              ...styles.statusDot,
              backgroundColor: aiStatus === 'ready' ? '#22c55e' : 
                              aiStatus === 'thinking' ? '#eab308' : '#3b82f6'
            }} />
          </div>
          <div>
            <h1 style={styles.title}>AI Manager</h1>
            <p style={styles.subtitle}>
              {brain?.ai?.personality?.name || 'Your AI Assistant'} • 
              {' '}{business?.industry ? `${business.industry.charAt(0).toUpperCase() + business.industry.slice(1)} Expert` : 'Business Expert'}
            </p>
          </div>
        </div>
        
        <div style={styles.headerRight}>
          {pendingChanges.length > 0 && (
            <button style={styles.previewButton} onClick={() => setShowPreview(true)}>
              <Eye size={16} />
              Preview Changes ({pendingChanges.length})
            </button>
          )}
          <div style={styles.statusBadge}>
            <Zap size={14} />
            <span>
              {aiStatus === 'ready' ? 'Ready' : 
               aiStatus === 'thinking' ? 'Thinking...' : 'Applying...'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Insights Bar */}
      {insights.length > 0 && activeTab !== 'insights' && (
        <div style={styles.insightsBar}>
          <Sparkles size={16} style={{ color: '#eab308' }} />
          <span style={styles.insightsText}>
            {insights.length} new insights available
          </span>
          <button 
            style={styles.insightsButton}
            onClick={() => setActiveTab('insights')}
          >
            View All
          </button>
        </div>
      )}

      {/* Main Content */}
      <div style={styles.main}>
        {/* Tabs */}
        <div style={styles.tabs}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.tabActive : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span style={styles.tabBadge}>{tab.badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={styles.content}>
          {renderTabContent()}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <AIPreview
          changes={pendingChanges}
          onPublish={handlePublish}
          onCancel={handleCancelChanges}
          publishing={aiStatus === 'acting'}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'var(--color-background)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 32px',
    backgroundColor: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  aiAvatar: {
    position: 'relative',
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff'
  },
  statusDot: {
    position: 'absolute',
    bottom: '-2px',
    right: '-2px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: '3px solid var(--color-surface)'
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    margin: 0
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  previewButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '20px',
    color: '#22c55e',
    fontSize: '13px',
    fontWeight: 500
  },
  insightsBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 32px',
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderBottom: '1px solid rgba(234, 179, 8, 0.2)'
  },
  insightsText: {
    flex: 1,
    fontSize: '14px',
    color: '#eab308'
  },
  insightsButton: {
    padding: '6px 14px',
    backgroundColor: '#eab308',
    border: 'none',
    borderRadius: '6px',
    color: '#000000',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  main: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  tabs: {
    width: '200px',
    padding: '24px 16px',
    backgroundColor: 'var(--color-surface)',
    borderRight: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left'
  },
  tabActive: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  tabBadge: {
    marginLeft: 'auto',
    padding: '2px 8px',
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#ffffff'
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: '24px 32px'
  }
};

export default AIManagerPage;