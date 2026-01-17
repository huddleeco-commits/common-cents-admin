/**
 * SettingsAnalytics
 * 
 * Analytics and tracking configuration.
 * Google Analytics, Meta Pixel, custom tracking.
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Save,
  Check,
  AlertCircle,
  BarChart3,
  Eye,
  Target,
  TrendingUp,
  Code,
  Plus,
  Trash2
} from 'lucide-react';
import { useBrain } from '../../hooks/useBrain';

export function SettingsAnalytics() {
  const { business } = useOutletContext();
  const { brain, updateBrain, saving } = useBrain();
  
  const [formData, setFormData] = useState({
    google: {
      enabled: false,
      measurementId: '',
      enableEnhancedMeasurement: true,
      enableEcommerce: true,
      anonymizeIp: true
    },
    meta: {
      enabled: false,
      pixelId: '',
      enableAdvancedMatching: true,
      trackPageViews: true,
      trackPurchases: true
    },
    tiktok: {
      enabled: false,
      pixelId: ''
    },
    hotjar: {
      enabled: false,
      siteId: ''
    },
    internal: {
      enabled: true,
      trackPageViews: true,
      trackClicks: true,
      trackScrollDepth: true,
      trackFormSubmissions: true,
      retentionDays: 90
    },
    customScripts: [],
    cookieConsent: {
      enabled: true,
      style: 'banner',
      position: 'bottom'
    }
  });
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (brain?.integrations?.analytics) {
      setFormData(prev => ({
        ...prev,
        ...brain.integrations.analytics,
        google: { ...prev.google, ...brain.integrations.analytics.google },
        meta: { ...prev.meta, ...brain.integrations.analytics.meta },
        tiktok: { ...prev.tiktok, ...brain.integrations.analytics.tiktok },
        hotjar: { ...prev.hotjar, ...brain.integrations.analytics.hotjar },
        internal: { ...prev.internal, ...brain.integrations.analytics.internal },
        cookieConsent: { ...prev.cookieConsent, ...brain.integrations.analytics.cookieConsent }
      }));
    }
  }, [brain]);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const addCustomScript = () => {
    setFormData(prev => ({
      ...prev,
      customScripts: [
        ...prev.customScripts,
        { id: Date.now(), name: '', placement: 'head', code: '' }
      ]
    }));
  };

  const updateCustomScript = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      customScripts: prev.customScripts.map(s =>
        s.id === id ? { ...s, [field]: value } : s
      )
    }));
  };

  const removeCustomScript = (id) => {
    setFormData(prev => ({
      ...prev,
      customScripts: prev.customScripts.filter(s => s.id !== id)
    }));
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    
    const result = await updateBrain('integrations', { analytics: formData });
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || 'Failed to save');
    }
  };

  return (
    <div style={styles.container}>
      {/* Google Analytics */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <div style={styles.providerIcon}>📊</div>
            <div>
              <h3 style={styles.sectionTitle}>Google Analytics</h3>
              <p style={styles.sectionDesc}>Track visitors and conversions with GA4</p>
            </div>
          </div>
          <label style={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={formData.google.enabled}
              onChange={(e) => handleChange('google', 'enabled', e.target.checked)}
            />
            <span style={{
              ...styles.toggleSlider,
              backgroundColor: formData.google.enabled ? 'var(--color-primary)' : 'var(--color-border)'
            }}>
              <span style={{
                ...styles.toggleKnob,
                transform: formData.google.enabled ? 'translateX(20px)' : 'translateX(0)'
              }} />
            </span>
          </label>
        </div>

        {formData.google.enabled && (
          <div style={styles.sectionBody}>
            <div style={styles.formGrid}>
              <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                <label style={styles.label}>Measurement ID</label>
                <input
                  type="text"
                  value={formData.google.measurementId}
                  onChange={(e) => handleChange('google', 'measurementId', e.target.value)}
                  style={styles.input}
                  placeholder="G-XXXXXXXXXX"
                />
                <span style={styles.helpText}>
                  Find this in Google Analytics {'>'} Admin {'>'} Data Streams
                </span>
              </div>
            </div>

            <div style={styles.optionsGrid}>
              <label style={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={formData.google.enableEnhancedMeasurement}
                  onChange={(e) => handleChange('google', 'enableEnhancedMeasurement', e.target.checked)}
                />
                <div>
                  <span style={styles.optionLabel}>Enhanced Measurement</span>
                  <span style={styles.optionDesc}>Automatic scroll, outbound clicks, site search tracking</span>
                </div>
              </label>

              <label style={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={formData.google.enableEcommerce}
                  onChange={(e) => handleChange('google', 'enableEcommerce', e.target.checked)}
                />
                <div>
                  <span style={styles.optionLabel}>Ecommerce Tracking</span>
                  <span style={styles.optionDesc}>Track purchases, add to cart, checkout steps</span>
                </div>
              </label>

              <label style={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={formData.google.anonymizeIp}
                  onChange={(e) => handleChange('google', 'anonymizeIp', e.target.checked)}
                />
                <div>
                  <span style={styles.optionLabel}>Anonymize IP</span>
                  <span style={styles.optionDesc}>GDPR-friendly IP anonymization</span>
                </div>
              </label>
            </div>
          </div>
        )}
      </section>

      {/* Meta Pixel */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <div style={styles.providerIcon}>📘</div>
            <div>
              <h3 style={styles.sectionTitle}>Meta Pixel</h3>
              <p style={styles.sectionDesc}>Track conversions for Facebook & Instagram ads</p>
            </div>
          </div>
          <label style={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={formData.meta.enabled}
              onChange={(e) => handleChange('meta', 'enabled', e.target.checked)}
            />
            <span style={{
              ...styles.toggleSlider,
              backgroundColor: formData.meta.enabled ? 'var(--color-primary)' : 'var(--color-border)'
            }}>
              <span style={{
                ...styles.toggleKnob,
                transform: formData.meta.enabled ? 'translateX(20px)' : 'translateX(0)'
              }} />
            </span>
          </label>
        </div>

        {formData.meta.enabled && (
          <div style={styles.sectionBody}>
            <div style={styles.formGrid}>
              <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                <label style={styles.label}>Pixel ID</label>
                <input
                  type="text"
                  value={formData.meta.pixelId}
                  onChange={(e) => handleChange('meta', 'pixelId', e.target.value)}
                  style={styles.input}
                  placeholder="1234567890123456"
                />
                <span style={styles.helpText}>
                  Find this in Meta Events Manager
                </span>
              </div>
            </div>

            <div style={styles.optionsGrid}>
              <label style={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={formData.meta.enableAdvancedMatching}
                  onChange={(e) => handleChange('meta', 'enableAdvancedMatching', e.target.checked)}
                />
                <div>
                  <span style={styles.optionLabel}>Advanced Matching</span>
                  <span style={styles.optionDesc}>Match visitors using email and phone</span>
                </div>
              </label>

              <label style={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={formData.meta.trackPageViews}
                  onChange={(e) => handleChange('meta', 'trackPageViews', e.target.checked)}
                />
                <div>
                  <span style={styles.optionLabel}>Track Page Views</span>
                  <span style={styles.optionDesc}>Fire PageView event on each page</span>
                </div>
              </label>

              <label style={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={formData.meta.trackPurchases}
                  onChange={(e) => handleChange('meta', 'trackPurchases', e.target.checked)}
                />
                <div>
                  <span style={styles.optionLabel}>Track Purchases</span>
                  <span style={styles.optionDesc}>Fire Purchase event with value</span>
                </div>
              </label>
            </div>
          </div>
        )}
      </section>

      {/* TikTok Pixel */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <div style={styles.providerIcon}>🎵</div>
            <div>
              <h3 style={styles.sectionTitle}>TikTok Pixel</h3>
              <p style={styles.sectionDesc}>Track conversions for TikTok ads</p>
            </div>
          </div>
          <label style={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={formData.tiktok.enabled}
              onChange={(e) => handleChange('tiktok', 'enabled', e.target.checked)}
            />
            <span style={{
              ...styles.toggleSlider,
              backgroundColor: formData.tiktok.enabled ? 'var(--color-primary)' : 'var(--color-border)'
            }}>
              <span style={{
                ...styles.toggleKnob,
                transform: formData.tiktok.enabled ? 'translateX(20px)' : 'translateX(0)'
              }} />
            </span>
          </label>
        </div>

        {formData.tiktok.enabled && (
          <div style={styles.sectionBody}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Pixel ID</label>
              <input
                type="text"
                value={formData.tiktok.pixelId}
                onChange={(e) => handleChange('tiktok', 'pixelId', e.target.value)}
                style={styles.input}
                placeholder="CXXXXXXXXXXXXXXXXX"
              />
            </div>
          </div>
        )}
      </section>

      {/* Hotjar */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <div style={styles.providerIcon}>🔥</div>
            <div>
              <h3 style={styles.sectionTitle}>Hotjar</h3>
              <p style={styles.sectionDesc}>Heatmaps and session recordings</p>
            </div>
          </div>
          <label style={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={formData.hotjar.enabled}
              onChange={(e) => handleChange('hotjar', 'enabled', e.target.checked)}
            />
            <span style={{
              ...styles.toggleSlider,
              backgroundColor: formData.hotjar.enabled ? 'var(--color-primary)' : 'var(--color-border)'
            }}>
              <span style={{
                ...styles.toggleKnob,
                transform: formData.hotjar.enabled ? 'translateX(20px)' : 'translateX(0)'
              }} />
            </span>
          </label>
        </div>

        {formData.hotjar.enabled && (
          <div style={styles.sectionBody}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Site ID</label>
              <input
                type="text"
                value={formData.hotjar.siteId}
                onChange={(e) => handleChange('hotjar', 'siteId', e.target.value)}
                style={styles.input}
                placeholder="1234567"
              />
            </div>
          </div>
        )}
      </section>

      {/* Internal Analytics */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <BarChart3 size={20} />
            <div>
              <h3 style={styles.sectionTitle}>Built-in Analytics</h3>
              <p style={styles.sectionDesc}>Our own privacy-friendly analytics</p>
            </div>
          </div>
          <label style={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={formData.internal.enabled}
              onChange={(e) => handleChange('internal', 'enabled', e.target.checked)}
            />
            <span style={{
              ...styles.toggleSlider,
              backgroundColor: formData.internal.enabled ? 'var(--color-primary)' : 'var(--color-border)'
            }}>
              <span style={{
                ...styles.toggleKnob,
                transform: formData.internal.enabled ? 'translateX(20px)' : 'translateX(0)'
              }} />
            </span>
          </label>
        </div>

        {formData.internal.enabled && (
          <div style={styles.sectionBody}>
            <div style={styles.optionsGrid}>
              <label style={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={formData.internal.trackPageViews}
                  onChange={(e) => handleChange('internal', 'trackPageViews', e.target.checked)}
                />
                <div>
                  <span style={styles.optionLabel}>Page Views</span>
                </div>
              </label>

              <label style={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={formData.internal.trackClicks}
                  onChange={(e) => handleChange('internal', 'trackClicks', e.target.checked)}
                />
                <div>
                  <span style={styles.optionLabel}>Click Tracking</span>
                </div>
              </label>

              <label style={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={formData.internal.trackScrollDepth}
                  onChange={(e) => handleChange('internal', 'trackScrollDepth', e.target.checked)}
                />
                <div>
                  <span style={styles.optionLabel}>Scroll Depth</span>
                </div>
              </label>

              <label style={styles.optionCheckbox}>
                <input
                  type="checkbox"
                  checked={formData.internal.trackFormSubmissions}
                  onChange={(e) => handleChange('internal', 'trackFormSubmissions', e.target.checked)}
                />
                <div>
                  <span style={styles.optionLabel}>Form Submissions</span>
                </div>
              </label>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Data Retention (days)</label>
              <select
                value={formData.internal.retentionDays}
                onChange={(e) => handleChange('internal', 'retentionDays', parseInt(e.target.value))}
                style={styles.select}
              >
                <option value={30}>30 days</option>
                <option value={60}>60 days</option>
                <option value={90}>90 days</option>
                <option value={180}>180 days</option>
                <option value={365}>1 year</option>
              </select>
            </div>
          </div>
        )}
      </section>

      {/* Cookie Consent */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Eye size={20} />
            <h3 style={styles.sectionTitle}>Cookie Consent</h3>
          </div>
          <label style={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={formData.cookieConsent.enabled}
              onChange={(e) => handleChange('cookieConsent', 'enabled', e.target.checked)}
            />
            <span style={{
              ...styles.toggleSlider,
              backgroundColor: formData.cookieConsent.enabled ? 'var(--color-primary)' : 'var(--color-border)'
            }}>
              <span style={{
                ...styles.toggleKnob,
                transform: formData.cookieConsent.enabled ? 'translateX(20px)' : 'translateX(0)'
              }} />
            </span>
          </label>
        </div>

        {formData.cookieConsent.enabled && (
          <div style={styles.sectionBody}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Style</label>
                <select
                  value={formData.cookieConsent.style}
                  onChange={(e) => handleChange('cookieConsent', 'style', e.target.value)}
                  style={styles.select}
                >
                  <option value="banner">Banner</option>
                  <option value="modal">Modal</option>
                  <option value="corner">Corner Popup</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Position</label>
                <select
                  value={formData.cookieConsent.position}
                  onChange={(e) => handleChange('cookieConsent', 'position', e.target.value)}
                  style={styles.select}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Custom Scripts */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Code size={20} />
            <h3 style={styles.sectionTitle}>Custom Scripts</h3>
          </div>
          <button style={styles.addButton} onClick={addCustomScript}>
            <Plus size={14} /> Add Script
          </button>
        </div>

        {formData.customScripts.length === 0 ? (
          <p style={styles.emptyText}>
            No custom scripts. Add tracking codes, chat widgets, or other third-party scripts.
          </p>
        ) : (
          <div style={styles.scriptsGrid}>
            {formData.customScripts.map(script => (
              <div key={script.id} style={styles.scriptCard}>
                <div style={styles.scriptHeader}>
                  <input
                    type="text"
                    value={script.name}
                    onChange={(e) => updateCustomScript(script.id, 'name', e.target.value)}
                    style={styles.scriptNameInput}
                    placeholder="Script name"
                  />
                  <select
                    value={script.placement}
                    onChange={(e) => updateCustomScript(script.id, 'placement', e.target.value)}
                    style={styles.scriptPlacementSelect}
                  >
                    <option value="head">Head</option>
                    <option value="body-start">Body Start</option>
                    <option value="body-end">Body End</option>
                  </select>
                  <button
                    style={styles.removeButton}
                    onClick={() => removeCustomScript(script.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <textarea
                  value={script.code}
                  onChange={(e) => updateCustomScript(script.id, 'code', e.target.value)}
                  style={styles.scriptCodeArea}
                  placeholder="<script>...</script>"
                  rows={4}
                />
              </div>
            ))}
          </div>
        )}
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
  providerIcon: {
    fontSize: '28px'
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
  sectionBody: {
    padding: '24px',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface-2)'
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
  helpText: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginTop: '20px'
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
  emptyText: {
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    padding: '24px',
    textAlign: 'center'
  },
  scriptsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '24px'
  },
  scriptCard: {
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  scriptHeader: {
    display: 'flex',
    gap: '10px',
    padding: '12px',
    borderBottom: '1px solid var(--color-border)'
  },
  scriptNameInput: {
    flex: 1,
    padding: '8px 12px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)'
  },
  scriptPlacementSelect: {
    padding: '8px 12px',
    fontSize: '13px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    cursor: 'pointer'
  },
  removeButton: {
    padding: '8px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: 'none',
    borderRadius: '6px',
    color: '#ef4444',
    cursor: 'pointer'
  },
  scriptCodeArea: {
    width: '100%',
    padding: '12px',
    fontSize: '13px',
    fontFamily: 'monospace',
    backgroundColor: '#0d0d0d',
    border: 'none',
    color: '#22c55e',
    resize: 'vertical',
    outline: 'none'
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

export default SettingsAnalytics;