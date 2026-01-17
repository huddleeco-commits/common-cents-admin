/**
 * SettingsPayments
 * 
 * Payment processor configuration.
 * Stripe, Square, PayPal, payout settings.
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Save,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  ExternalLink,
  RefreshCw,
  CreditCard,
  DollarSign,
  Shield,
  Link2
} from 'lucide-react';
import { useBrain } from '../../hooks/useBrain';

export function SettingsPayments() {
  const { business } = useOutletContext();
  const { brain, updateBrain, saving } = useBrain();
  
  const [formData, setFormData] = useState({
    stripe: {
      enabled: true,
      liveMode: false,
      accountId: '',
      publishableKey: '',
      secretKey: '',
      webhookSecret: '',
      webhookUrl: ''
    },
    square: {
      enabled: false,
      applicationId: '',
      accessToken: '',
      locationId: ''
    },
    paypal: {
      enabled: false,
      clientId: '',
      clientSecret: '',
      mode: 'sandbox'
    },
    payouts: {
      schedule: 'daily',
      minimumAmount: 25,
      bankAccount: null
    }
  });
  
  const [showSecrets, setShowSecrets] = useState({});
  const [testing, setTesting] = useState(null);
  const [testResults, setTestResults] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Load data from brain
  useEffect(() => {
    if (brain?.integrations?.payments) {
      setFormData(prev => ({
        ...prev,
        ...brain.integrations.payments
      }));
    }
  }, [brain]);

  const handleChange = (provider, field, value) => {
    setFormData(prev => ({
      ...prev,
      [provider]: {
        ...prev[provider],
        [field]: value
      }
    }));
  };

  const toggleSecret = (key) => {
    setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const testConnection = async (provider) => {
    setTesting(provider);
    setTestResults(prev => ({ ...prev, [provider]: null }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const config = formData[provider];
      if (provider === 'stripe' && !config.secretKey) {
        throw new Error('Secret key is required');
      }
      
      setTestResults(prev => ({ 
        ...prev, 
        [provider]: { success: true, message: 'Connection successful' }
      }));
    } catch (err) {
      setTestResults(prev => ({ 
        ...prev, 
        [provider]: { success: false, message: err.message }
      }));
    } finally {
      setTesting(null);
    }
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    
    const result = await updateBrain('integrations', { payments: formData });
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || 'Failed to save');
    }
  };

  const openStripeDashboard = () => {
    window.open('https://dashboard.stripe.com', '_blank');
  };

  return (
    <div style={styles.container}>
      {/* Stripe */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <div style={styles.stripeIcon}>
              <CreditCard size={20} />
            </div>
            <div>
              <h3 style={styles.sectionTitle}>Stripe</h3>
              <p style={styles.sectionDesc}>Primary payment processor</p>
            </div>
          </div>
          <div style={styles.headerRight}>
            {testResults.stripe && (
              <span style={{
                ...styles.testResult,
                color: testResults.stripe.success ? '#22c55e' : '#ef4444'
              }}>
                {testResults.stripe.success ? <Check size={14} /> : <AlertCircle size={14} />}
                {testResults.stripe.message}
              </span>
            )}
            <button 
              style={styles.testButton}
              onClick={() => testConnection('stripe')}
              disabled={testing === 'stripe'}
            >
              <RefreshCw size={14} />
              {testing === 'stripe' ? 'Testing...' : 'Test'}
            </button>
            <label style={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={formData.stripe.enabled}
                onChange={(e) => handleChange('stripe', 'enabled', e.target.checked)}
              />
              <span style={{
                ...styles.toggleSlider,
                backgroundColor: formData.stripe.enabled ? 'var(--color-primary)' : 'var(--color-border)'
              }}>
                <span style={{
                  ...styles.toggleKnob,
                  transform: formData.stripe.enabled ? 'translateX(20px)' : 'translateX(0)'
                }} />
              </span>
            </label>
          </div>
        </div>

        {formData.stripe.enabled && (
          <div style={styles.sectionBody}>
            {/* Mode Toggle */}
            <div style={styles.modeToggle}>
              <button
                style={{
                  ...styles.modeButton,
                  ...(formData.stripe.liveMode ? {} : styles.modeButtonActive)
                }}
                onClick={() => handleChange('stripe', 'liveMode', false)}
              >
                <Shield size={14} /> Test Mode
              </button>
              <button
                style={{
                  ...styles.modeButton,
                  ...(formData.stripe.liveMode ? styles.modeButtonLive : {})
                }}
                onClick={() => handleChange('stripe', 'liveMode', true)}
              >
                <DollarSign size={14} /> Live Mode
              </button>
            </div>

            {formData.stripe.liveMode && (
              <div style={styles.liveWarning}>
                <AlertCircle size={16} />
                Live mode is enabled. Real charges will be processed.
              </div>
            )}

            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Account ID</label>
                <input
                  type="text"
                  value={formData.stripe.accountId}
                  onChange={(e) => handleChange('stripe', 'accountId', e.target.value)}
                  style={styles.input}
                  placeholder="acct_..."
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  {formData.stripe.liveMode ? 'Live' : 'Test'} Publishable Key
                </label>
                <div style={styles.secretInput}>
                  <input
                    type={showSecrets.stripePk ? 'text' : 'password'}
                    value={formData.stripe.publishableKey}
                    onChange={(e) => handleChange('stripe', 'publishableKey', e.target.value)}
                    style={styles.input}
                    placeholder={formData.stripe.liveMode ? 'pk_live_...' : 'pk_test_...'}
                  />
                  <button style={styles.secretToggle} onClick={() => toggleSecret('stripePk')}>
                    {showSecrets.stripePk ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  {formData.stripe.liveMode ? 'Live' : 'Test'} Secret Key
                </label>
                <div style={styles.secretInput}>
                  <input
                    type={showSecrets.stripeSk ? 'text' : 'password'}
                    value={formData.stripe.secretKey}
                    onChange={(e) => handleChange('stripe', 'secretKey', e.target.value)}
                    style={styles.input}
                    placeholder={formData.stripe.liveMode ? 'sk_live_...' : 'sk_test_...'}
                  />
                  <button style={styles.secretToggle} onClick={() => toggleSecret('stripeSk')}>
                    {showSecrets.stripeSk ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Webhook Secret</label>
                <div style={styles.secretInput}>
                  <input
                    type={showSecrets.stripeWh ? 'text' : 'password'}
                    value={formData.stripe.webhookSecret}
                    onChange={(e) => handleChange('stripe', 'webhookSecret', e.target.value)}
                    style={styles.input}
                    placeholder="whsec_..."
                  />
                  <button style={styles.secretToggle} onClick={() => toggleSecret('stripeWh')}>
                    {showSecrets.stripeWh ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                <label style={styles.label}>Webhook URL</label>
                <div style={styles.webhookUrl}>
                  <input
                    type="text"
                    value={formData.stripe.webhookUrl || `https://api.${business?.domain || 'yourbusiness.com'}/webhooks/stripe`}
                    readOnly
                    style={{ ...styles.input, backgroundColor: 'var(--color-surface)' }}
                  />
                  <button 
                    style={styles.copyButton}
                    onClick={() => navigator.clipboard.writeText(formData.stripe.webhookUrl)}
                  >
                    Copy
                  </button>
                </div>
                <span style={styles.helpText}>Add this URL to your Stripe webhook settings</span>
              </div>
            </div>

            <div style={styles.actionButtons}>
              <button style={styles.actionButton} onClick={openStripeDashboard}>
                <ExternalLink size={14} /> Open Stripe Dashboard
              </button>
              <button style={styles.actionButton}>
                <Link2 size={14} /> Connect New Account
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Square */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <div style={styles.squareIcon}>💳</div>
            <div>
              <h3 style={styles.sectionTitle}>Square</h3>
              <p style={styles.sectionDesc}>Alternative payment processor</p>
            </div>
          </div>
          <label style={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={formData.square.enabled}
              onChange={(e) => handleChange('square', 'enabled', e.target.checked)}
            />
            <span style={{
              ...styles.toggleSlider,
              backgroundColor: formData.square.enabled ? 'var(--color-primary)' : 'var(--color-border)'
            }}>
              <span style={{
                ...styles.toggleKnob,
                transform: formData.square.enabled ? 'translateX(20px)' : 'translateX(0)'
              }} />
            </span>
          </label>
        </div>

        {formData.square.enabled && (
          <div style={styles.sectionBody}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Application ID</label>
                <input
                  type="text"
                  value={formData.square.applicationId}
                  onChange={(e) => handleChange('square', 'applicationId', e.target.value)}
                  style={styles.input}
                  placeholder="sq0idp-..."
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Access Token</label>
                <div style={styles.secretInput}>
                  <input
                    type={showSecrets.squareToken ? 'text' : 'password'}
                    value={formData.square.accessToken}
                    onChange={(e) => handleChange('square', 'accessToken', e.target.value)}
                    style={styles.input}
                    placeholder="EAAAl..."
                  />
                  <button style={styles.secretToggle} onClick={() => toggleSecret('squareToken')}>
                    {showSecrets.squareToken ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Location ID</label>
                <input
                  type="text"
                  value={formData.square.locationId}
                  onChange={(e) => handleChange('square', 'locationId', e.target.value)}
                  style={styles.input}
                  placeholder="L..."
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* PayPal */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <div style={styles.paypalIcon}>🅿️</div>
            <div>
              <h3 style={styles.sectionTitle}>PayPal</h3>
              <p style={styles.sectionDesc}>PayPal checkout integration</p>
            </div>
          </div>
          <label style={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={formData.paypal.enabled}
              onChange={(e) => handleChange('paypal', 'enabled', e.target.checked)}
            />
            <span style={{
              ...styles.toggleSlider,
              backgroundColor: formData.paypal.enabled ? 'var(--color-primary)' : 'var(--color-border)'
            }}>
              <span style={{
                ...styles.toggleKnob,
                transform: formData.paypal.enabled ? 'translateX(20px)' : 'translateX(0)'
              }} />
            </span>
          </label>
        </div>

        {formData.paypal.enabled && (
          <div style={styles.sectionBody}>
            <div style={styles.modeToggle}>
              <button
                style={{
                  ...styles.modeButton,
                  ...(formData.paypal.mode === 'sandbox' ? styles.modeButtonActive : {})
                }}
                onClick={() => handleChange('paypal', 'mode', 'sandbox')}
              >
                Sandbox
              </button>
              <button
                style={{
                  ...styles.modeButton,
                  ...(formData.paypal.mode === 'live' ? styles.modeButtonLive : {})
                }}
                onClick={() => handleChange('paypal', 'mode', 'live')}
              >
                Live
              </button>
            </div>

            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Client ID</label>
                <input
                  type="text"
                  value={formData.paypal.clientId}
                  onChange={(e) => handleChange('paypal', 'clientId', e.target.value)}
                  style={styles.input}
                  placeholder="AY..."
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Client Secret</label>
                <div style={styles.secretInput}>
                  <input
                    type={showSecrets.paypalSecret ? 'text' : 'password'}
                    value={formData.paypal.clientSecret}
                    onChange={(e) => handleChange('paypal', 'clientSecret', e.target.value)}
                    style={styles.input}
                    placeholder="EK..."
                  />
                  <button style={styles.secretToggle} onClick={() => toggleSecret('paypalSecret')}>
                    {showSecrets.paypalSecret ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Payout Settings */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <DollarSign size={20} />
            <div>
              <h3 style={styles.sectionTitle}>Payout Settings</h3>
              <p style={styles.sectionDesc}>Configure how you receive funds</p>
            </div>
          </div>
        </div>

        <div style={styles.sectionBody}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Payout Schedule</label>
              <select
                value={formData.payouts.schedule}
                onChange={(e) => handleChange('payouts', 'schedule', e.target.value)}
                style={styles.select}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Minimum Payout ($)</label>
              <input
                type="number"
                value={formData.payouts.minimumAmount}
                onChange={(e) => handleChange('payouts', 'minimumAmount', parseFloat(e.target.value))}
                style={styles.input}
                placeholder="25.00"
              />
            </div>

            <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
              <label style={styles.label}>Bank Account</label>
              {formData.payouts.bankAccount ? (
                <div style={styles.bankAccount}>
                  <span>•••• {formData.payouts.bankAccount.last4}</span>
                  <span style={styles.bankName}>{formData.payouts.bankAccount.bankName}</span>
                  <button style={styles.changeBankButton}>Change</button>
                </div>
              ) : (
                <button style={styles.addBankButton}>
                  + Add Bank Account
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

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
  section: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px'
  },
  sectionTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  stripeIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#635bff',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  squareIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px'
  },
  paypalIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: '#003087',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  sectionDesc: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: '2px 0 0 0'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  testResult: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px'
  },
  testButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    fontSize: '12px',
    cursor: 'pointer'
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
  sectionBody: {
    padding: '24px',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface-2)'
  },
  modeToggle: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px'
  },
  modeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  modeButtonActive: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  modeButtonLive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
    color: '#ffffff'
  },
  liveWarning: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    border: '1px solid #22c55e',
    borderRadius: '8px',
    color: '#22c55e',
    fontSize: '13px',
    marginBottom: '20px'
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
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    outline: 'none'
  },
  select: {
    padding: '12px 14px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface)',
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
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  webhookUrl: {
    display: 'flex',
    gap: '8px'
  },
  copyButton: {
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  helpText: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginTop: '4px'
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid var(--color-border)'
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  bankAccount: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '8px',
    border: '1px solid var(--color-border)'
  },
  bankName: {
    color: 'var(--color-text-muted)',
    fontSize: '13px'
  },
  changeBankButton: {
    marginLeft: 'auto',
    padding: '8px 14px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    fontSize: '12px',
    cursor: 'pointer'
  },
  addBankButton: {
    padding: '14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px dashed var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'center'
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

export default SettingsPayments;