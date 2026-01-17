/**
 * SettingsSecurity
 * 
 * Security configuration.
 * SSL, authentication, rate limits, access control.
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Save,
  Check,
  AlertCircle,
  Shield,
  Lock,
  Key,
  Users,
  Clock,
  Globe,
  AlertTriangle,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Plus,
  Trash2
} from 'lucide-react';
import { useBrain } from '../../hooks/useBrain';

export function SettingsSecurity() {
  const { business } = useOutletContext();
  const { brain, updateBrain, saving } = useBrain();
  
  const [formData, setFormData] = useState({
    ssl: {
      enabled: true,
      forceHttps: true,
      hsts: true,
      hstsMaxAge: 31536000
    },
    auth: {
      sessionTimeout: 7,
      requireEmailVerification: true,
      allowSocialLogin: true,
      allowedSocialProviders: ['google'],
      mfaEnabled: false,
      mfaRequired: false,
      passwordMinLength: 8,
      passwordRequireUppercase: true,
      passwordRequireNumber: true,
      passwordRequireSymbol: false
    },
    rateLimit: {
      enabled: true,
      requestsPerMinute: 60,
      loginAttemptsPerHour: 10,
      apiRequestsPerMinute: 100
    },
    cors: {
      enabled: true,
      allowedOrigins: [],
      allowCredentials: true
    },
    ipBlocking: {
      enabled: false,
      blockedIps: [],
      allowedIps: []
    },
    apiKeys: [],
    adminUsers: []
  });
  
  const [showSecrets, setShowSecrets] = useState({});
  const [newOrigin, setNewOrigin] = useState('');
  const [newBlockedIp, setNewBlockedIp] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (brain?.security) {
      setFormData(prev => ({
        ...prev,
        ...brain.security,
        ssl: { ...prev.ssl, ...brain.security.ssl },
        auth: { ...prev.auth, ...brain.security.auth },
        rateLimit: { ...prev.rateLimit, ...brain.security.rateLimit },
        cors: { ...prev.cors, ...brain.security.cors },
        ipBlocking: { ...prev.ipBlocking, ...brain.security.ipBlocking }
      }));
    }
  }, [brain]);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const toggleSocialProvider = (provider) => {
    const current = formData.auth.allowedSocialProviders || [];
    const updated = current.includes(provider)
      ? current.filter(p => p !== provider)
      : [...current, provider];
    handleChange('auth', 'allowedSocialProviders', updated);
  };

  const addOrigin = () => {
    if (!newOrigin) return;
    handleChange('cors', 'allowedOrigins', [...formData.cors.allowedOrigins, newOrigin]);
    setNewOrigin('');
  };

  const removeOrigin = (origin) => {
    handleChange('cors', 'allowedOrigins', formData.cors.allowedOrigins.filter(o => o !== origin));
  };

  const addBlockedIp = () => {
    if (!newBlockedIp) return;
    handleChange('ipBlocking', 'blockedIps', [...formData.ipBlocking.blockedIps, newBlockedIp]);
    setNewBlockedIp('');
  };

  const removeBlockedIp = (ip) => {
    handleChange('ipBlocking', 'blockedIps', formData.ipBlocking.blockedIps.filter(i => i !== ip));
  };

  const generateApiKey = () => {
    const key = 'bk_' + Array.from(crypto.getRandomValues(new Uint8Array(24)))
      .map(b => b.toString(16).padStart(2, '0')).join('');
    
    setFormData(prev => ({
      ...prev,
      apiKeys: [
        ...prev.apiKeys,
        { id: Date.now(), name: '', key, created: new Date().toISOString(), lastUsed: null }
      ]
    }));
  };

  const updateApiKeyName = (id, name) => {
    setFormData(prev => ({
      ...prev,
      apiKeys: prev.apiKeys.map(k => k.id === id ? { ...k, name } : k)
    }));
  };

  const removeApiKey = (id) => {
    if (!confirm('Are you sure? This cannot be undone.')) return;
    setFormData(prev => ({
      ...prev,
      apiKeys: prev.apiKeys.filter(k => k.id !== id)
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    
    const result = await updateBrain('security', formData);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || 'Failed to save');
    }
  };

  return (
    <div style={styles.container}>
      {/* SSL / HTTPS */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Lock size={20} />
            <div>
              <h3 style={styles.sectionTitle}>SSL / HTTPS</h3>
              <p style={styles.sectionDesc}>Secure connection settings</p>
            </div>
          </div>
          <div style={styles.statusBadge}>
            <Check size={14} /> Active
          </div>
        </div>

        <div style={styles.sectionBody}>
          <div style={styles.optionsGrid}>
            <label style={styles.optionCheckbox}>
              <input
                type="checkbox"
                checked={formData.ssl.forceHttps}
                onChange={(e) => handleChange('ssl', 'forceHttps', e.target.checked)}
              />
              <div>
                <span style={styles.optionLabel}>Force HTTPS</span>
                <span style={styles.optionDesc}>Redirect all HTTP traffic to HTTPS</span>
              </div>
            </label>

            <label style={styles.optionCheckbox}>
              <input
                type="checkbox"
                checked={formData.ssl.hsts}
                onChange={(e) => handleChange('ssl', 'hsts', e.target.checked)}
              />
              <div>
                <span style={styles.optionLabel}>HSTS</span>
                <span style={styles.optionDesc}>HTTP Strict Transport Security header</span>
              </div>
            </label>
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Key size={20} />
            <h3 style={styles.sectionTitle}>Authentication</h3>
          </div>
        </div>

        <div style={styles.sectionBody}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Session Timeout (days)</label>
              <input
                type="number"
                value={formData.auth.sessionTimeout}
                onChange={(e) => handleChange('auth', 'sessionTimeout', parseInt(e.target.value))}
                style={styles.input}
                min="1"
                max="90"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Min Password Length</label>
              <input
                type="number"
                value={formData.auth.passwordMinLength}
                onChange={(e) => handleChange('auth', 'passwordMinLength', parseInt(e.target.value))}
                style={styles.input}
                min="6"
                max="32"
              />
            </div>
          </div>

          <div style={styles.optionsGrid}>
            <label style={styles.optionCheckbox}>
              <input
                type="checkbox"
                checked={formData.auth.requireEmailVerification}
                onChange={(e) => handleChange('auth', 'requireEmailVerification', e.target.checked)}
              />
              <div>
                <span style={styles.optionLabel}>Require Email Verification</span>
              </div>
            </label>

            <label style={styles.optionCheckbox}>
              <input
                type="checkbox"
                checked={formData.auth.mfaEnabled}
                onChange={(e) => handleChange('auth', 'mfaEnabled', e.target.checked)}
              />
              <div>
                <span style={styles.optionLabel}>Enable 2FA</span>
              </div>
            </label>

            <label style={styles.optionCheckbox}>
              <input
                type="checkbox"
                checked={formData.auth.passwordRequireUppercase}
                onChange={(e) => handleChange('auth', 'passwordRequireUppercase', e.target.checked)}
              />
              <div>
                <span style={styles.optionLabel}>Require Uppercase</span>
              </div>
            </label>

            <label style={styles.optionCheckbox}>
              <input
                type="checkbox"
                checked={formData.auth.passwordRequireNumber}
                onChange={(e) => handleChange('auth', 'passwordRequireNumber', e.target.checked)}
              />
              <div>
                <span style={styles.optionLabel}>Require Number</span>
              </div>
            </label>

            <label style={styles.optionCheckbox}>
              <input
                type="checkbox"
                checked={formData.auth.passwordRequireSymbol}
                onChange={(e) => handleChange('auth', 'passwordRequireSymbol', e.target.checked)}
              />
              <div>
                <span style={styles.optionLabel}>Require Symbol</span>
              </div>
            </label>
          </div>

          <div style={styles.subSection}>
            <h4 style={styles.subSectionTitle}>Social Login</h4>
            <label style={styles.optionCheckbox}>
              <input
                type="checkbox"
                checked={formData.auth.allowSocialLogin}
                onChange={(e) => handleChange('auth', 'allowSocialLogin', e.target.checked)}
              />
              <div>
                <span style={styles.optionLabel}>Allow Social Login</span>
              </div>
            </label>

            {formData.auth.allowSocialLogin && (
              <div style={styles.socialProviders}>
                {['google', 'facebook', 'apple', 'github'].map(provider => (
                  <label key={provider} style={styles.providerCheckbox}>
                    <input
                      type="checkbox"
                      checked={formData.auth.allowedSocialProviders?.includes(provider)}
                      onChange={() => toggleSocialProvider(provider)}
                    />
                    {provider.charAt(0).toUpperCase() + provider.slice(1)}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rate Limiting */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Clock size={20} />
            <div>
              <h3 style={styles.sectionTitle}>Rate Limiting</h3>
              <p style={styles.sectionDesc}>Protect against abuse</p>
            </div>
          </div>
          <label style={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={formData.rateLimit.enabled}
              onChange={(e) => handleChange('rateLimit', 'enabled', e.target.checked)}
            />
            <span style={{
              ...styles.toggleSlider,
              backgroundColor: formData.rateLimit.enabled ? 'var(--color-primary)' : 'var(--color-border)'
            }}>
              <span style={{
                ...styles.toggleKnob,
                transform: formData.rateLimit.enabled ? 'translateX(20px)' : 'translateX(0)'
              }} />
            </span>
          </label>
        </div>

        {formData.rateLimit.enabled && (
          <div style={styles.sectionBody}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Requests per Minute (General)</label>
                <input
                  type="number"
                  value={formData.rateLimit.requestsPerMinute}
                  onChange={(e) => handleChange('rateLimit', 'requestsPerMinute', parseInt(e.target.value))}
                  style={styles.input}
                  min="10"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Login Attempts per Hour</label>
                <input
                  type="number"
                  value={formData.rateLimit.loginAttemptsPerHour}
                  onChange={(e) => handleChange('rateLimit', 'loginAttemptsPerHour', parseInt(e.target.value))}
                  style={styles.input}
                  min="3"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>API Requests per Minute</label>
                <input
                  type="number"
                  value={formData.rateLimit.apiRequestsPerMinute}
                  onChange={(e) => handleChange('rateLimit', 'apiRequestsPerMinute', parseInt(e.target.value))}
                  style={styles.input}
                  min="10"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CORS */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Globe size={20} />
            <h3 style={styles.sectionTitle}>CORS (Cross-Origin)</h3>
          </div>
          <label style={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={formData.cors.enabled}
              onChange={(e) => handleChange('cors', 'enabled', e.target.checked)}
            />
            <span style={{
              ...styles.toggleSlider,
              backgroundColor: formData.cors.enabled ? 'var(--color-primary)' : 'var(--color-border)'
            }}>
              <span style={{
                ...styles.toggleKnob,
                transform: formData.cors.enabled ? 'translateX(20px)' : 'translateX(0)'
              }} />
            </span>
          </label>
        </div>

        {formData.cors.enabled && (
          <div style={styles.sectionBody}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Allowed Origins</label>
              <div style={styles.listInputRow}>
                <input
                  type="text"
                  value={newOrigin}
                  onChange={(e) => setNewOrigin(e.target.value)}
                  style={styles.input}
                  placeholder="https://example.com"
                />
                <button style={styles.addItemButton} onClick={addOrigin}>
                  <Plus size={14} /> Add
                </button>
              </div>
              
              {formData.cors.allowedOrigins.length > 0 && (
                <div style={styles.tagsList}>
                  {formData.cors.allowedOrigins.map(origin => (
                    <div key={origin} style={styles.tag}>
                      {origin}
                      <button style={styles.tagRemove} onClick={() => removeOrigin(origin)}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <label style={styles.optionCheckbox}>
              <input
                type="checkbox"
                checked={formData.cors.allowCredentials}
                onChange={(e) => handleChange('cors', 'allowCredentials', e.target.checked)}
              />
              <div>
                <span style={styles.optionLabel}>Allow Credentials</span>
                <span style={styles.optionDesc}>Allow cookies in cross-origin requests</span>
              </div>
            </label>
          </div>
        )}
      </section>

      {/* IP Blocking */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <AlertTriangle size={20} />
            <h3 style={styles.sectionTitle}>IP Blocking</h3>
          </div>
          <label style={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={formData.ipBlocking.enabled}
              onChange={(e) => handleChange('ipBlocking', 'enabled', e.target.checked)}
            />
            <span style={{
              ...styles.toggleSlider,
              backgroundColor: formData.ipBlocking.enabled ? 'var(--color-primary)' : 'var(--color-border)'
            }}>
              <span style={{
                ...styles.toggleKnob,
                transform: formData.ipBlocking.enabled ? 'translateX(20px)' : 'translateX(0)'
              }} />
            </span>
          </label>
        </div>

        {formData.ipBlocking.enabled && (
          <div style={styles.sectionBody}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Blocked IPs</label>
              <div style={styles.listInputRow}>
                <input
                  type="text"
                  value={newBlockedIp}
                  onChange={(e) => setNewBlockedIp(e.target.value)}
                  style={styles.input}
                  placeholder="192.168.1.1"
                />
                <button style={styles.addItemButton} onClick={addBlockedIp}>
                  <Plus size={14} /> Block
                </button>
              </div>
              
              {formData.ipBlocking.blockedIps.length > 0 && (
                <div style={styles.tagsList}>
                  {formData.ipBlocking.blockedIps.map(ip => (
                    <div key={ip} style={{ ...styles.tag, backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#ef4444' }}>
                      {ip}
                      <button style={styles.tagRemove} onClick={() => removeBlockedIp(ip)}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* API Keys */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Key size={20} />
            <h3 style={styles.sectionTitle}>API Keys</h3>
          </div>
          <button style={styles.addButton} onClick={generateApiKey}>
            <Plus size={14} /> Generate Key
          </button>
        </div>

        <div style={styles.sectionBody}>
          {formData.apiKeys.length === 0 ? (
            <p style={styles.emptyText}>No API keys. Generate one to enable API access.</p>
          ) : (
            <div style={styles.apiKeysList}>
              {formData.apiKeys.map(apiKey => (
                <div key={apiKey.id} style={styles.apiKeyCard}>
                  <div style={styles.apiKeyHeader}>
                    <input
                      type="text"
                      value={apiKey.name}
                      onChange={(e) => updateApiKeyName(apiKey.id, e.target.value)}
                      style={styles.apiKeyNameInput}
                      placeholder="Key name (e.g., Production)"
                    />
                    <span style={styles.apiKeyDate}>
                      Created: {new Date(apiKey.created).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={styles.apiKeyValue}>
                    <input
                      type={showSecrets[apiKey.id] ? 'text' : 'password'}
                      value={apiKey.key}
                      readOnly
                      style={styles.apiKeyInput}
                    />
                    <button 
                      style={styles.apiKeyAction}
                      onClick={() => setShowSecrets(prev => ({ ...prev, [apiKey.id]: !prev[apiKey.id] }))}
                    >
                      {showSecrets[apiKey.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button 
                      style={styles.apiKeyAction}
                      onClick={() => copyToClipboard(apiKey.key)}
                    >
                      <Copy size={14} />
                    </button>
                    <button 
                      style={{ ...styles.apiKeyAction, color: '#ef4444' }}
                      onClick={() => removeApiKey(apiKey.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
    gap: '12px'
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
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '16px',
    color: '#22c55e',
    fontSize: '12px',
    fontWeight: 500
  },
  sectionBody: {
    padding: '24px',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface-2)'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '20px'
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
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  },
  optionCheckbox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '14px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  optionLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500
  },
  optionDesc: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginTop: '2px'
  },
  subSection: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid var(--color-border)'
  },
  subSectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    margin: '0 0 16px 0'
  },
  socialProviders: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '16px'
  },
  providerCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '8px',
    fontSize: '14px',
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
  listInputRow: {
    display: 'flex',
    gap: '10px'
  },
  addItemButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  tagsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '12px'
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '16px',
    fontSize: '13px'
  },
  tagRemove: {
    background: 'none',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    padding: '2px'
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
  emptyText: {
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    textAlign: 'center',
    padding: '20px'
  },
  apiKeysList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  apiKeyCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
    padding: '16px'
  },
  apiKeyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  apiKeyNameInput: {
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: 500,
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    borderRadius: '6px',
    color: 'var(--color-text)',
    outline: 'none'
  },
  apiKeyDate: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  apiKeyValue: {
    display: 'flex',
    gap: '8px'
  },
  apiKeyInput: {
    flex: 1,
    padding: '10px 14px',
    fontSize: '13px',
    fontFamily: 'monospace',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)'
  },
  apiKeyAction: {
    padding: '10px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text-muted)',
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

export default SettingsSecurity;