/**
 * SettingsAI
 * 
 * AI Manager configuration.
 * Model selection, usage limits, personality, capabilities.
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Save,
  Check,
  AlertCircle,
  Bot,
  Zap,
  Brain,
  MessageSquare,
  Shield,
  DollarSign,
  Sliders,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useBrain } from '../../hooks/useBrain';

export function SettingsAI() {
  const { business } = useOutletContext();
  const { brain, updateBrain, saving } = useBrain();
  
  const [formData, setFormData] = useState({
    enabled: true,
    model: {
      primary: 'claude-sonnet-4-20250514',
      fallback: 'claude-haiku-4-20250514',
      useFallbackOnLimit: true
    },
    limits: {
      monthlyBudget: 50,
      dailyMessages: 100,
      maxTokensPerMessage: 4000,
      rateLimitPerMinute: 10
    },
    personality: {
      name: 'AI Assistant',
      tone: 'professional',
      customInstructions: '',
      includeBusinessContext: true,
      includeInventoryAccess: true,
      includeAnalyticsAccess: true
    },
    capabilities: {
      canEditContent: true,
      canEditSettings: true,
      canViewAnalytics: true,
      canManageOrders: true,
      canManageInventory: true,
      canSendEmails: false,
      canAccessCustomerData: true,
      requireConfirmation: ['settings', 'delete', 'billing']
    },
    safety: {
      contentFiltering: true,
      blockSensitiveTopics: true,
      logAllConversations: true,
      humanEscalationEnabled: true,
      escalationEmail: ''
    },
    usage: {
      currentMonth: {
        messages: 0,
        tokens: 0,
        cost: 0
      }
    }
  });
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (brain?.ai) {
      setFormData(prev => ({
        ...prev,
        ...brain.ai,
        model: { ...prev.model, ...brain.ai.model },
        limits: { ...prev.limits, ...brain.ai.limits },
        personality: { ...prev.personality, ...brain.ai.personality },
        capabilities: { ...prev.capabilities, ...brain.ai.capabilities },
        safety: { ...prev.safety, ...brain.ai.safety },
        usage: { ...prev.usage, ...brain.ai.usage }
      }));
    }
  }, [brain]);

  const handleChange = (section, field, value) => {
    if (section === 'root') {
      setFormData(prev => ({ ...prev, [field]: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    }
  };

  const toggleCapability = (capability) => {
    setFormData(prev => ({
      ...prev,
      capabilities: {
        ...prev.capabilities,
        [capability]: !prev.capabilities[capability]
      }
    }));
  };

  const toggleConfirmation = (action) => {
    const current = formData.capabilities.requireConfirmation || [];
    const updated = current.includes(action)
      ? current.filter(a => a !== action)
      : [...current, action];
    handleChange('capabilities', 'requireConfirmation', updated);
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    
    const result = await updateBrain('ai', formData);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || 'Failed to save');
    }
  };

  const models = [
    { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet 4', desc: 'Best balance of speed and capability', cost: '$$' },
    { id: 'claude-opus-4-20250514', name: 'Claude Opus 4', desc: 'Most capable, higher cost', cost: '$$$' },
    { id: 'claude-haiku-4-20250514', name: 'Claude Haiku 4', desc: 'Fastest, most economical', cost: '$' }
  ];

  const tones = [
    { id: 'professional', name: 'Professional', desc: 'Formal and business-like' },
    { id: 'friendly', name: 'Friendly', desc: 'Warm and approachable' },
    { id: 'casual', name: 'Casual', desc: 'Relaxed and conversational' },
    { id: 'concise', name: 'Concise', desc: 'Brief and to the point' }
  ];

  const usagePercent = formData.limits.monthlyBudget > 0 
    ? (formData.usage.currentMonth.cost / formData.limits.monthlyBudget) * 100 
    : 0;

  return (
    <div style={styles.container}>
      {/* Master Toggle */}
      <div style={styles.masterToggle}>
        <div style={styles.masterToggleInfo}>
          <Bot size={24} />
          <div>
            <h3 style={styles.masterToggleTitle}>AI Manager</h3>
            <p style={styles.masterToggleDesc}>
              Enable AI-powered business management
            </p>
          </div>
        </div>
        <button
          style={{
            ...styles.toggleButton,
            backgroundColor: formData.enabled ? 'var(--color-primary)' : 'var(--color-surface-2)'
          }}
          onClick={() => handleChange('root', 'enabled', !formData.enabled)}
        >
          {formData.enabled ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
          <span>{formData.enabled ? 'Enabled' : 'Disabled'}</span>
        </button>
      </div>

      {formData.enabled && (
        <>
          {/* Usage Overview */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <DollarSign size={20} />
              <h3 style={styles.sectionTitle}>Usage This Month</h3>
            </div>
            
            <div style={styles.usageGrid}>
              <div style={styles.usageCard}>
                <span style={styles.usageLabel}>Messages</span>
                <span style={styles.usageValue}>{formData.usage.currentMonth.messages}</span>
                <span style={styles.usageLimit}>/ {formData.limits.dailyMessages * 30} limit</span>
              </div>
              
              <div style={styles.usageCard}>
                <span style={styles.usageLabel}>Tokens</span>
                <span style={styles.usageValue}>
                  {(formData.usage.currentMonth.tokens / 1000).toFixed(1)}K
                </span>
              </div>
              
              <div style={styles.usageCard}>
                <span style={styles.usageLabel}>Cost</span>
                <span style={styles.usageValue}>
                  ${formData.usage.currentMonth.cost.toFixed(2)}
                </span>
                <span style={styles.usageLimit}>/ ${formData.limits.monthlyBudget} budget</span>
              </div>
            </div>

            <div style={styles.usageBarContainer}>
              <div style={styles.usageBarLabel}>
                <span>Budget Used</span>
                <span>{usagePercent.toFixed(1)}%</span>
              </div>
              <div style={styles.usageBar}>
                <div 
                  style={{
                    ...styles.usageBarFill,
                    width: `${Math.min(usagePercent, 100)}%`,
                    backgroundColor: usagePercent > 90 ? '#ef4444' : usagePercent > 70 ? '#eab308' : '#22c55e'
                  }}
                />
              </div>
            </div>
          </section>

          {/* Model Selection */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <Brain size={20} />
              <h3 style={styles.sectionTitle}>Model Selection</h3>
            </div>
            
            <div style={styles.modelsGrid}>
              {models.map(model => (
                <div 
                  key={model.id}
                  style={{
                    ...styles.modelCard,
                    ...(formData.model.primary === model.id ? styles.modelCardSelected : {})
                  }}
                  onClick={() => handleChange('model', 'primary', model.id)}
                >
                  <div style={styles.modelHeader}>
                    <span style={styles.modelName}>{model.name}</span>
                    <span style={styles.modelCost}>{model.cost}</span>
                  </div>
                  <p style={styles.modelDesc}>{model.desc}</p>
                  {formData.model.primary === model.id && (
                    <div style={styles.modelBadge}>Primary</div>
                  )}
                </div>
              ))}
            </div>

            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Fallback Model</label>
                <select
                  value={formData.model.fallback}
                  onChange={(e) => handleChange('model', 'fallback', e.target.value)}
                  style={styles.select}
                >
                  {models.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.model.useFallbackOnLimit}
                    onChange={(e) => handleChange('model', 'useFallbackOnLimit', e.target.checked)}
                    style={styles.checkbox}
                  />
                  Use fallback when budget is low
                </label>
              </div>
            </div>
          </section>

          {/* Limits */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <Sliders size={20} />
              <h3 style={styles.sectionTitle}>Usage Limits</h3>
            </div>
            
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Monthly Budget ($)</label>
                <input
                  type="number"
                  value={formData.limits.monthlyBudget}
                  onChange={(e) => handleChange('limits', 'monthlyBudget', parseFloat(e.target.value))}
                  style={styles.input}
                  min="0"
                  step="5"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Daily Message Limit</label>
                <input
                  type="number"
                  value={formData.limits.dailyMessages}
                  onChange={(e) => handleChange('limits', 'dailyMessages', parseInt(e.target.value))}
                  style={styles.input}
                  min="1"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Max Tokens per Message</label>
                <input
                  type="number"
                  value={formData.limits.maxTokensPerMessage}
                  onChange={(e) => handleChange('limits', 'maxTokensPerMessage', parseInt(e.target.value))}
                  style={styles.input}
                  min="100"
                  max="100000"
                  step="500"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Rate Limit (per minute)</label>
                <input
                  type="number"
                  value={formData.limits.rateLimitPerMinute}
                  onChange={(e) => handleChange('limits', 'rateLimitPerMinute', parseInt(e.target.value))}
                  style={styles.input}
                  min="1"
                  max="60"
                />
              </div>
            </div>
          </section>

          {/* Personality */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <MessageSquare size={20} />
              <h3 style={styles.sectionTitle}>Personality</h3>
            </div>
            
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Assistant Name</label>
                <input
                  type="text"
                  value={formData.personality.name}
                  onChange={(e) => handleChange('personality', 'name', e.target.value)}
                  style={styles.input}
                  placeholder="AI Assistant"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Tone</label>
                <select
                  value={formData.personality.tone}
                  onChange={(e) => handleChange('personality', 'tone', e.target.value)}
                  style={styles.select}
                >
                  {tones.map(tone => (
                    <option key={tone.id} value={tone.id}>{tone.name} - {tone.desc}</option>
                  ))}
                </select>
              </div>
              
              <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                <label style={styles.label}>Custom Instructions</label>
                <textarea
                  value={formData.personality.customInstructions}
                  onChange={(e) => handleChange('personality', 'customInstructions', e.target.value)}
                  style={styles.textarea}
                  placeholder="Add any specific instructions for how the AI should behave, what it should know about your business, etc."
                  rows={4}
                />
              </div>
            </div>

            <div style={styles.contextOptions}>
              <label style={styles.contextCheckbox}>
                <input
                  type="checkbox"
                  checked={formData.personality.includeBusinessContext}
                  onChange={(e) => handleChange('personality', 'includeBusinessContext', e.target.checked)}
                />
                Include business context (hours, services, etc.)
              </label>
              <label style={styles.contextCheckbox}>
                <input
                  type="checkbox"
                  checked={formData.personality.includeInventoryAccess}
                  onChange={(e) => handleChange('personality', 'includeInventoryAccess', e.target.checked)}
                />
                Access to inventory/products
              </label>
              <label style={styles.contextCheckbox}>
                <input
                  type="checkbox"
                  checked={formData.personality.includeAnalyticsAccess}
                  onChange={(e) => handleChange('personality', 'includeAnalyticsAccess', e.target.checked)}
                />
                Access to analytics data
              </label>
            </div>
          </section>

          {/* Capabilities */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <Zap size={20} />
              <h3 style={styles.sectionTitle}>Capabilities</h3>
            </div>
            
            <div style={styles.capabilitiesGrid}>
              <CapabilityToggle
                label="Edit Content"
                description="Modify pages, products, menu items"
                enabled={formData.capabilities.canEditContent}
                onToggle={() => toggleCapability('canEditContent')}
              />
              <CapabilityToggle
                label="Edit Settings"
                description="Change business configuration"
                enabled={formData.capabilities.canEditSettings}
                onToggle={() => toggleCapability('canEditSettings')}
              />
              <CapabilityToggle
                label="View Analytics"
                description="Access performance metrics"
                enabled={formData.capabilities.canViewAnalytics}
                onToggle={() => toggleCapability('canViewAnalytics')}
              />
              <CapabilityToggle
                label="Manage Orders"
                description="View and update order status"
                enabled={formData.capabilities.canManageOrders}
                onToggle={() => toggleCapability('canManageOrders')}
              />
              <CapabilityToggle
                label="Manage Inventory"
                description="Update stock levels"
                enabled={formData.capabilities.canManageInventory}
                onToggle={() => toggleCapability('canManageInventory')}
              />
              <CapabilityToggle
                label="Send Emails"
                description="Send emails on your behalf"
                enabled={formData.capabilities.canSendEmails}
                onToggle={() => toggleCapability('canSendEmails')}
              />
              <CapabilityToggle
                label="Access Customer Data"
                description="View customer information"
                enabled={formData.capabilities.canAccessCustomerData}
                onToggle={() => toggleCapability('canAccessCustomerData')}
              />
            </div>

            <div style={styles.confirmationSection}>
              <label style={styles.label}>Require Confirmation Before:</label>
              <div style={styles.confirmationOptions}>
                {['settings', 'delete', 'billing', 'email', 'orders'].map(action => (
                  <label key={action} style={styles.confirmationCheckbox}>
                    <input
                      type="checkbox"
                      checked={formData.capabilities.requireConfirmation?.includes(action)}
                      onChange={() => toggleConfirmation(action)}
                    />
                    {action.charAt(0).toUpperCase() + action.slice(1)} changes
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Safety */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <Shield size={20} />
              <h3 style={styles.sectionTitle}>Safety & Moderation</h3>
            </div>
            
            <div style={styles.safetyGrid}>
              <label style={styles.safetyToggle}>
                <input
                  type="checkbox"
                  checked={formData.safety.contentFiltering}
                  onChange={(e) => handleChange('safety', 'contentFiltering', e.target.checked)}
                />
                <span>Content Filtering</span>
                <span style={styles.safetyDesc}>Filter inappropriate responses</span>
              </label>
              
              <label style={styles.safetyToggle}>
                <input
                  type="checkbox"
                  checked={formData.safety.blockSensitiveTopics}
                  onChange={(e) => handleChange('safety', 'blockSensitiveTopics', e.target.checked)}
                />
                <span>Block Sensitive Topics</span>
                <span style={styles.safetyDesc}>Avoid politics, religion, etc.</span>
              </label>
              
              <label style={styles.safetyToggle}>
                <input
                  type="checkbox"
                  checked={formData.safety.logAllConversations}
                  onChange={(e) => handleChange('safety', 'logAllConversations', e.target.checked)}
                />
                <span>Log Conversations</span>
                <span style={styles.safetyDesc}>Keep records for review</span>
              </label>
              
              <label style={styles.safetyToggle}>
                <input
                  type="checkbox"
                  checked={formData.safety.humanEscalationEnabled}
                  onChange={(e) => handleChange('safety', 'humanEscalationEnabled', e.target.checked)}
                />
                <span>Human Escalation</span>
                <span style={styles.safetyDesc}>Allow users to request human help</span>
              </label>
            </div>

            {formData.safety.humanEscalationEnabled && (
              <div style={styles.formGroup}>
                <label style={styles.label}>Escalation Email</label>
                <input
                  type="email"
                  value={formData.safety.escalationEmail}
                  onChange={(e) => handleChange('safety', 'escalationEmail', e.target.value)}
                  style={styles.input}
                  placeholder="support@yourbusiness.com"
                />
              </div>
            )}
          </section>
        </>
      )}

      {/* Save Button */}
      <div style={styles.saveBar}>
        {error && (
          <div style={styles.errorMessage}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}
        {success && (
          <div style={styles.successMessage}>
            <Check size={16} />
            Settings saved successfully
          </div>
        )}
        <button 
          style={styles.saveButton}
          onClick={handleSave}
          disabled={saving}
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

// Capability Toggle Component
function CapabilityToggle({ label, description, enabled, onToggle }) {
  return (
    <div 
      style={{
        ...styles.capabilityCard,
        borderColor: enabled ? 'var(--color-primary)' : 'var(--color-border)'
      }}
      onClick={onToggle}
    >
      <div style={styles.capabilityInfo}>
        <span style={styles.capabilityLabel}>{label}</span>
        <span style={styles.capabilityDesc}>{description}</span>
      </div>
      <div style={{
        ...styles.capabilityToggle,
        backgroundColor: enabled ? 'var(--color-primary)' : 'var(--color-surface-2)'
      }}>
        {enabled ? <Check size={14} color="#fff" /> : null}
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
  masterToggle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  masterToggleInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  masterToggleTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0
  },
  masterToggleDesc: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: '2px 0 0 0'
  },
  toggleButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  section: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    padding: '24px'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  usageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '20px'
  },
  usageCard: {
    padding: '20px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    textAlign: 'center'
  },
  usageLabel: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginBottom: '8px'
  },
  usageValue: {
    display: 'block',
    fontSize: '28px',
    fontWeight: 700
  },
  usageLimit: {
    display: 'block',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginTop: '4px'
  },
  usageBarContainer: {
    marginTop: '16px'
  },
  usageBarLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    marginBottom: '8px'
  },
  usageBar: {
    height: '8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  usageBarFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s'
  },
  modelsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '20px'
  },
  modelCard: {
    padding: '20px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    border: '2px solid transparent',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s'
  },
  modelCardSelected: {
    borderColor: 'var(--color-primary)',
    backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)'
  },
  modelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  modelName: {
    fontSize: '15px',
    fontWeight: 600
  },
  modelCost: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  modelDesc: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: 0
  },
  modelBadge: {
    position: 'absolute',
    top: '-8px',
    right: '12px',
    padding: '4px 10px',
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: 600,
    borderRadius: '10px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--color-text-muted)'
  },
  input: {
    padding: '12px 14px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    outline: 'none'
  },
  select: {
    padding: '12px 14px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    cursor: 'pointer'
  },
  textarea: {
    padding: '12px 14px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '24px'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  contextOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid var(--color-border)'
  },
  contextCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  capabilitiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  },
  capabilityCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  capabilityInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  capabilityLabel: {
    fontSize: '14px',
    fontWeight: 500
  },
  capabilityDesc: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  capabilityToggle: {
    width: '24px',
    height: '24px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  },
  confirmationSection: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid var(--color-border)'
  },
  confirmationOptions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    marginTop: '12px'
  },
  confirmationCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  safetyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  },
  safetyToggle: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '10px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    cursor: 'pointer'
  },
  safetyDesc: {
    width: '100%',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginLeft: '28px'
  },
  saveBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '16px',
    padding: '20px 24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#ef4444',
    fontSize: '14px'
  },
  successMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#22c55e',
    fontSize: '14px'
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  }
};

export default SettingsAI;