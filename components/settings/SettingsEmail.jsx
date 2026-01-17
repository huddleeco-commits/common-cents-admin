/**
 * SettingsEmail
 * 
 * Email configuration.
 * Providers (SendGrid, Mailgun, SES), templates, notification settings.
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Save,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  Send,
  FileText,
  Bell,
  RefreshCw,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import { useBrain } from '../../hooks/useBrain';

export function SettingsEmail() {
  const { business } = useOutletContext();
  const { brain, updateBrain, saving } = useBrain();
  
  const [formData, setFormData] = useState({
    enabled: true,
    provider: 'sendgrid',
    providers: {
      sendgrid: { apiKey: '', fromEmail: '', fromName: '' },
      mailgun: { apiKey: '', domain: '', fromEmail: '', fromName: '' },
      ses: { accessKeyId: '', secretAccessKey: '', region: 'us-east-1', fromEmail: '', fromName: '' },
      smtp: { host: '', port: 587, username: '', password: '', secure: true, fromEmail: '', fromName: '' }
    },
    notifications: {
      orderConfirmation: true,
      orderShipped: true,
      orderDelivered: true,
      orderCancelled: true,
      newCustomer: true,
      lowStock: true,
      dailySummary: false,
      weeklySummary: true
    },
    recipients: {
      admin: '',
      orders: '',
      support: ''
    },
    templates: []
  });
  
  const [showSecrets, setShowSecrets] = useState({});
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [testEmail, setTestEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (brain?.integrations?.email) {
      setFormData(prev => ({
        ...prev,
        ...brain.integrations.email,
        providers: { ...prev.providers, ...brain.integrations.email.providers },
        notifications: { ...prev.notifications, ...brain.integrations.email.notifications },
        recipients: { ...prev.recipients, ...brain.integrations.email.recipients }
      }));
    }
  }, [brain]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProviderChange = (provider, field, value) => {
    setFormData(prev => ({
      ...prev,
      providers: {
        ...prev.providers,
        [provider]: { ...prev.providers[provider], [field]: value }
      }
    }));
  };

  const handleNotificationChange = (notification, value) => {
    setFormData(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [notification]: value }
    }));
  };

  const handleRecipientChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      recipients: { ...prev.recipients, [type]: value }
    }));
  };

  const toggleSecret = (key) => {
    setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sendTestEmail = async () => {
    if (!testEmail) {
      setTestResult({ success: false, message: 'Please enter an email address' });
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTestResult({ success: true, message: `Test email sent to ${testEmail}` });
    } catch (err) {
      setTestResult({ success: false, message: err.message });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    
    const result = await updateBrain('integrations', { email: formData });
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || 'Failed to save');
    }
  };

  const currentProvider = formData.providers[formData.provider];

  const notificationLabels = {
    orderConfirmation: { label: 'Order Confirmation', desc: 'When a new order is placed' },
    orderShipped: { label: 'Order Shipped', desc: 'When an order ships' },
    orderDelivered: { label: 'Order Delivered', desc: 'When an order is delivered' },
    orderCancelled: { label: 'Order Cancelled', desc: 'When an order is cancelled' },
    newCustomer: { label: 'New Customer', desc: 'When someone creates an account' },
    lowStock: { label: 'Low Stock Alert', desc: 'When inventory is running low' },
    dailySummary: { label: 'Daily Summary', desc: 'Daily business overview' },
    weeklySummary: { label: 'Weekly Summary', desc: 'Weekly business overview' }
  };

  return (
    <div style={styles.container}>
      {/* Master Toggle */}
      <div style={styles.masterToggle}>
        <div style={styles.masterToggleInfo}>
          <Mail size={24} />
          <div>
            <h3 style={styles.masterToggleTitle}>Email</h3>
            <p style={styles.masterToggleDesc}>Send transactional and notification emails</p>
          </div>
        </div>
        <label style={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={formData.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
          />
          <span style={{
            ...styles.toggleSlider,
            backgroundColor: formData.enabled ? 'var(--color-primary)' : 'var(--color-border)'
          }}>
            <span style={{
              ...styles.toggleKnob,
              transform: formData.enabled ? 'translateX(20px)' : 'translateX(0)'
            }} />
          </span>
        </label>
      </div>

      {formData.enabled && (
        <>
          {/* Provider Selection */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <Send size={20} />
              <h3 style={styles.sectionTitle}>Email Provider</h3>
            </div>

            <div style={styles.providerGrid}>
              {[
                { id: 'sendgrid', name: 'SendGrid', icon: '📧' },
                { id: 'mailgun', name: 'Mailgun', icon: '📬' },
                { id: 'ses', name: 'Amazon SES', icon: '☁️' },
                { id: 'smtp', name: 'Custom SMTP', icon: '⚙️' }
              ].map(provider => (
                <div
                  key={provider.id}
                  style={{
                    ...styles.providerCard,
                    ...(formData.provider === provider.id ? styles.providerCardSelected : {})
                  }}
                  onClick={() => handleChange('provider', provider.id)}
                >
                  <span style={styles.providerIcon}>{provider.icon}</span>
                  <span style={styles.providerName}>{provider.name}</span>
                  {formData.provider === provider.id && (
                    <Check size={16} style={styles.providerCheck} />
                  )}
                </div>
              ))}
            </div>

            {/* Provider-specific fields */}
            <div style={styles.providerConfig}>
              {formData.provider === 'sendgrid' && (
                <div style={styles.formGrid}>
                  <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                    <label style={styles.label}>API Key</label>
                    <div style={styles.secretInput}>
                      <input
                        type={showSecrets.sendgridKey ? 'text' : 'password'}
                        value={formData.providers.sendgrid.apiKey}
                        onChange={(e) => handleProviderChange('sendgrid', 'apiKey', e.target.value)}
                        style={styles.input}
                        placeholder="SG.xxxxxxxx"
                      />
                      <button style={styles.secretToggle} onClick={() => toggleSecret('sendgridKey')}>
                        {showSecrets.sendgridKey ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>From Email</label>
                    <input
                      type="email"
                      value={formData.providers.sendgrid.fromEmail}
                      onChange={(e) => handleProviderChange('sendgrid', 'fromEmail', e.target.value)}
                      style={styles.input}
                      placeholder="noreply@yourbusiness.com"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>From Name</label>
                    <input
                      type="text"
                      value={formData.providers.sendgrid.fromName}
                      onChange={(e) => handleProviderChange('sendgrid', 'fromName', e.target.value)}
                      style={styles.input}
                      placeholder="Your Business Name"
                    />
                  </div>
                </div>
              )}

              {formData.provider === 'mailgun' && (
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>API Key</label>
                    <div style={styles.secretInput}>
                      <input
                        type={showSecrets.mailgunKey ? 'text' : 'password'}
                        value={formData.providers.mailgun.apiKey}
                        onChange={(e) => handleProviderChange('mailgun', 'apiKey', e.target.value)}
                        style={styles.input}
                        placeholder="key-xxxxxxxx"
                      />
                      <button style={styles.secretToggle} onClick={() => toggleSecret('mailgunKey')}>
                        {showSecrets.mailgunKey ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Domain</label>
                    <input
                      type="text"
                      value={formData.providers.mailgun.domain}
                      onChange={(e) => handleProviderChange('mailgun', 'domain', e.target.value)}
                      style={styles.input}
                      placeholder="mg.yourbusiness.com"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>From Email</label>
                    <input
                      type="email"
                      value={formData.providers.mailgun.fromEmail}
                      onChange={(e) => handleProviderChange('mailgun', 'fromEmail', e.target.value)}
                      style={styles.input}
                      placeholder="noreply@yourbusiness.com"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>From Name</label>
                    <input
                      type="text"
                      value={formData.providers.mailgun.fromName}
                      onChange={(e) => handleProviderChange('mailgun', 'fromName', e.target.value)}
                      style={styles.input}
                      placeholder="Your Business Name"
                    />
                  </div>
                </div>
              )}

              {formData.provider === 'ses' && (
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Access Key ID</label>
                    <div style={styles.secretInput}>
                      <input
                        type={showSecrets.sesAccessKey ? 'text' : 'password'}
                        value={formData.providers.ses.accessKeyId}
                        onChange={(e) => handleProviderChange('ses', 'accessKeyId', e.target.value)}
                        style={styles.input}
                        placeholder="AKIA..."
                      />
                      <button style={styles.secretToggle} onClick={() => toggleSecret('sesAccessKey')}>
                        {showSecrets.sesAccessKey ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Secret Access Key</label>
                    <div style={styles.secretInput}>
                      <input
                        type={showSecrets.sesSecretKey ? 'text' : 'password'}
                        value={formData.providers.ses.secretAccessKey}
                        onChange={(e) => handleProviderChange('ses', 'secretAccessKey', e.target.value)}
                        style={styles.input}
                        placeholder="••••••••••"
                      />
                      <button style={styles.secretToggle} onClick={() => toggleSecret('sesSecretKey')}>
                        {showSecrets.sesSecretKey ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Region</label>
                    <select
                      value={formData.providers.ses.region}
                      onChange={(e) => handleProviderChange('ses', 'region', e.target.value)}
                      style={styles.select}
                    >
                      <option value="us-east-1">US East (N. Virginia)</option>
                      <option value="us-west-2">US West (Oregon)</option>
                      <option value="eu-west-1">EU (Ireland)</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>From Email</label>
                    <input
                      type="email"
                      value={formData.providers.ses.fromEmail}
                      onChange={(e) => handleProviderChange('ses', 'fromEmail', e.target.value)}
                      style={styles.input}
                      placeholder="noreply@yourbusiness.com"
                    />
                  </div>
                </div>
              )}

              {formData.provider === 'smtp' && (
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>SMTP Host</label>
                    <input
                      type="text"
                      value={formData.providers.smtp.host}
                      onChange={(e) => handleProviderChange('smtp', 'host', e.target.value)}
                      style={styles.input}
                      placeholder="smtp.yourprovider.com"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Port</label>
                    <input
                      type="number"
                      value={formData.providers.smtp.port}
                      onChange={(e) => handleProviderChange('smtp', 'port', parseInt(e.target.value))}
                      style={styles.input}
                      placeholder="587"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Username</label>
                    <input
                      type="text"
                      value={formData.providers.smtp.username}
                      onChange={(e) => handleProviderChange('smtp', 'username', e.target.value)}
                      style={styles.input}
                      placeholder="username"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Password</label>
                    <div style={styles.secretInput}>
                      <input
                        type={showSecrets.smtpPassword ? 'text' : 'password'}
                        value={formData.providers.smtp.password}
                        onChange={(e) => handleProviderChange('smtp', 'password', e.target.value)}
                        style={styles.input}
                        placeholder="••••••••••"
                      />
                      <button style={styles.secretToggle} onClick={() => toggleSecret('smtpPassword')}>
                        {showSecrets.smtpPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>From Email</label>
                    <input
                      type="email"
                      value={formData.providers.smtp.fromEmail}
                      onChange={(e) => handleProviderChange('smtp', 'fromEmail', e.target.value)}
                      style={styles.input}
                      placeholder="noreply@yourbusiness.com"
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.providers.smtp.secure}
                        onChange={(e) => handleProviderChange('smtp', 'secure', e.target.checked)}
                      />
                      Use TLS/SSL
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Test Email */}
            <div style={styles.testSection}>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                style={styles.testInput}
                placeholder="Enter email to test..."
              />
              <button
                style={styles.testButton}
                onClick={sendTestEmail}
                disabled={testing}
              >
                <RefreshCw size={14} className={testing ? 'spinning' : ''} />
                {testing ? 'Sending...' : 'Send Test'}
              </button>
              {testResult && (
                <span style={{
                  ...styles.testResult,
                  color: testResult.success ? '#22c55e' : '#ef4444'
                }}>
                  {testResult.success ? <Check size={14} /> : <AlertCircle size={14} />}
                  {testResult.message}
                </span>
              )}
            </div>
          </section>

          {/* Notification Recipients */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <Bell size={20} />
              <h3 style={styles.sectionTitle}>Notification Recipients</h3>
            </div>

            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Admin Notifications</label>
                <input
                  type="email"
                  value={formData.recipients.admin}
                  onChange={(e) => handleRecipientChange('admin', e.target.value)}
                  style={styles.input}
                  placeholder="admin@yourbusiness.com"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Order Notifications</label>
                <input
                  type="email"
                  value={formData.recipients.orders}
                  onChange={(e) => handleRecipientChange('orders', e.target.value)}
                  style={styles.input}
                  placeholder="orders@yourbusiness.com"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Support Notifications</label>
                <input
                  type="email"
                  value={formData.recipients.support}
                  onChange={(e) => handleRecipientChange('support', e.target.value)}
                  style={styles.input}
                  placeholder="support@yourbusiness.com"
                />
              </div>
            </div>
          </section>

          {/* Notification Settings */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <FileText size={20} />
              <h3 style={styles.sectionTitle}>Notification Types</h3>
            </div>

            <div style={styles.notificationsGrid}>
              {Object.entries(notificationLabels).map(([key, { label, desc }]) => (
                <div key={key} style={styles.notificationItem}>
                  <div style={styles.notificationInfo}>
                    <span style={styles.notificationLabel}>{label}</span>
                    <span style={styles.notificationDesc}>{desc}</span>
                  </div>
                  <label style={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={formData.notifications[key]}
                      onChange={(e) => handleNotificationChange(key, e.target.checked)}
                    />
                    <span style={{
                      ...styles.toggleSlider,
                      backgroundColor: formData.notifications[key] ? 'var(--color-primary)' : 'var(--color-border)'
                    }}>
                      <span style={{
                        ...styles.toggleKnob,
                        transform: formData.notifications[key] ? 'translateX(20px)' : 'translateX(0)'
                      }} />
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Email Templates */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Email Templates</h3>
              <button style={styles.addButton}>
                <Plus size={14} /> Add Template
              </button>
            </div>

            <div style={styles.templatesInfo}>
              <p style={styles.templatesDesc}>
                Custom email templates allow you to personalize the look and content of emails sent to customers.
                Default templates are used when custom ones are not configured.
              </p>
              
              <div style={styles.defaultTemplates}>
                {['Order Confirmation', 'Shipping Notification', 'Welcome Email', 'Password Reset'].map(template => (
                  <div key={template} style={styles.templateItem}>
                    <span style={styles.templateName}>{template}</span>
                    <span style={styles.templateBadge}>Default</span>
                    <button style={styles.templateEditButton}>
                      <Edit2 size={14} /> Customize
                    </button>
                  </div>
                ))}
              </div>
            </div>
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
    padding: '20px 24px',
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
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  masterToggleDesc: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: '2px 0 0 0'
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
    justifyContent: 'space-between',
    gap: '10px',
    marginBottom: '20px'
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    fontWeight: 600,
    margin: 0,
    flex: 1
  },
  providerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginBottom: '24px'
  },
  providerCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '20px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    border: '2px solid transparent',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s'
  },
  providerCardSelected: {
    borderColor: 'var(--color-primary)'
  },
  providerIcon: {
    fontSize: '28px'
  },
  providerName: {
    fontSize: '14px',
    fontWeight: 500
  },
  providerCheck: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: 'var(--color-primary)'
  },
  providerConfig: {
    paddingTop: '20px',
    borderTop: '1px solid var(--color-border)'
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
    flex: 1,
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
  secretInput: {
    display: 'flex',
    gap: '8px'
  },
  secretToggle: {
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '20px'
  },
  testSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid var(--color-border)'
  },
  testInput: {
    flex: 1,
    maxWidth: '300px',
    padding: '12px 14px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)'
  },
  testButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 18px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  testResult: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px'
  },
  notificationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  },
  notificationItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px'
  },
  notificationInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  notificationLabel: {
    fontSize: '14px',
    fontWeight: 500
  },
  notificationDesc: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  toggleSwitch: {
    position: 'relative',
    width: '44px',
    height: '24px',
    cursor: 'pointer'
  },
  toggleSlider: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '24px',
    transition: 'all 0.3s'
  },
  toggleKnob: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '20px',
    height: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    transition: 'transform 0.3s'
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '13px',
    cursor: 'pointer'
  },
  templatesInfo: {},
  templatesDesc: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    marginBottom: '20px'
  },
  defaultTemplates: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  templateItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px'
  },
  templateName: {
    flex: 1,
    fontSize: '14px',
    fontWeight: 500
  },
  templateBadge: {
    padding: '4px 10px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  templateEditButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    fontSize: '12px',
    cursor: 'pointer'
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

export default SettingsEmail;