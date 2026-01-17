/**
 * SettingsAdvanced
 * 
 * Advanced settings.
 * Environment variables, feature flags, danger zone (reset, delete).
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import {
  Save,
  Check,
  AlertCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  RefreshCw,
  Download,
  Upload,
  Code,
  Flag,
  Wrench,
  Shield,
  Copy
} from 'lucide-react';
import { useBrain } from '../../hooks/useBrain';

export function SettingsAdvanced() {
  const { business } = useOutletContext();
  const { brain, updateBrain, saving, exportBrain, importBrain, resetBrain } = useBrain();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    env: [],
    featureFlags: {
      maintenanceMode: false,
      betaFeatures: false,
      debugMode: false,
      apiV2: false,
      newCheckout: false,
      aiChat: true
    },
    devTools: {
      showDebugPanel: false,
      logApiCalls: false,
      mockPayments: false
    }
  });
  
  const [showSecrets, setShowSecrets] = useState({});
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmText, setConfirmText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (brain?.advanced) {
      setFormData(prev => ({
        ...prev,
        ...brain.advanced,
        featureFlags: { ...prev.featureFlags, ...brain.advanced.featureFlags },
        devTools: { ...prev.devTools, ...brain.advanced.devTools }
      }));
    }
  }, [brain]);

  const handleFlagChange = (flag, value) => {
    setFormData(prev => ({
      ...prev,
      featureFlags: { ...prev.featureFlags, [flag]: value }
    }));
  };

  const handleDevToolChange = (tool, value) => {
    setFormData(prev => ({
      ...prev,
      devTools: { ...prev.devTools, [tool]: value }
    }));
  };

  const addEnvVar = () => {
    setFormData(prev => ({
      ...prev,
      env: [...prev.env, { id: Date.now(), key: '', value: '', secret: true }]
    }));
  };

  const updateEnvVar = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      env: prev.env.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const removeEnvVar = (id) => {
    setFormData(prev => ({
      ...prev,
      env: prev.env.filter(e => e.id !== id)
    }));
  };

  const toggleSecret = (id) => {
    setShowSecrets(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExport = async () => {
    try {
      const data = await exportBrain();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${business?.slug || 'business'}-brain-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Export failed');
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      await importBrain(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Import failed: Invalid file');
    }
  };

  const handleDangerAction = async (action) => {
    if (confirmText !== business?.name) {
      setError('Please type the business name to confirm');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      if (action === 'reset') {
        await resetBrain();
        setSuccess(true);
        setConfirmAction(null);
        setConfirmText('');
      } else if (action === 'delete') {
        // Would call delete API
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    
    const result = await updateBrain('advanced', formData);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || 'Failed to save');
    }
  };

  const featureFlags = [
    { id: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Show maintenance page to visitors', danger: true },
    { id: 'betaFeatures', label: 'Beta Features', desc: 'Enable experimental features' },
    { id: 'debugMode', label: 'Debug Mode', desc: 'Show debug information in console' },
    { id: 'apiV2', label: 'API v2', desc: 'Use new API endpoints' },
    { id: 'newCheckout', label: 'New Checkout', desc: 'Enable redesigned checkout flow' },
    { id: 'aiChat', label: 'AI Chat', desc: 'Enable AI chat for customers' }
  ];

  const devTools = [
    { id: 'showDebugPanel', label: 'Debug Panel', desc: 'Show floating debug panel' },
    { id: 'logApiCalls', label: 'Log API Calls', desc: 'Log all API requests to console' },
    { id: 'mockPayments', label: 'Mock Payments', desc: 'Use test payment processing' }
  ];

  return (
    <div style={styles.container}>
      {/* Warning Banner */}
      <div style={styles.warningBanner}>
        <AlertTriangle size={20} />
        <div>
          <strong>Advanced Settings</strong>
          <p style={styles.warningText}>
            These settings can significantly affect your business. Make changes carefully.
          </p>
        </div>
      </div>

      {/* Environment Variables */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Code size={20} />
            <h3 style={styles.sectionTitle}>Environment Variables</h3>
          </div>
          <button style={styles.addButton} onClick={addEnvVar}>
            <Plus size={14} /> Add Variable
          </button>
        </div>

        {formData.env.length === 0 ? (
          <p style={styles.emptyText}>
            No custom environment variables. These are passed to your backend at runtime.
          </p>
        ) : (
          <div style={styles.envList}>
            {formData.env.map(env => (
              <div key={env.id} style={styles.envRow}>
                <input
                  type="text"
                  value={env.key}
                  onChange={(e) => updateEnvVar(env.id, 'key', e.target.value.toUpperCase())}
                  style={styles.envKeyInput}
                  placeholder="VARIABLE_NAME"
                />
                <div style={styles.envValueWrapper}>
                  <input
                    type={env.secret && !showSecrets[env.id] ? 'password' : 'text'}
                    value={env.value}
                    onChange={(e) => updateEnvVar(env.id, 'value', e.target.value)}
                    style={styles.envValueInput}
                    placeholder="value"
                  />
                  {env.secret && (
                    <button 
                      style={styles.envAction}
                      onClick={() => toggleSecret(env.id)}
                    >
                      {showSecrets[env.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  )}
                </div>
                <label style={styles.secretToggle}>
                  <input
                    type="checkbox"
                    checked={env.secret}
                    onChange={(e) => updateEnvVar(env.id, 'secret', e.target.checked)}
                  />
                  Secret
                </label>
                <button 
                  style={styles.envRemove}
                  onClick={() => removeEnvVar(env.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Feature Flags */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Flag size={20} />
            <h3 style={styles.sectionTitle}>Feature Flags</h3>
          </div>
        </div>

        <div style={styles.flagsGrid}>
          {featureFlags.map(flag => (
            <div 
              key={flag.id} 
              style={{
                ...styles.flagCard,
                ...(flag.danger && formData.featureFlags[flag.id] ? styles.flagCardDanger : {})
              }}
            >
              <div style={styles.flagInfo}>
                <span style={styles.flagLabel}>{flag.label}</span>
                <span style={styles.flagDesc}>{flag.desc}</span>
              </div>
              <label style={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={formData.featureFlags[flag.id]}
                  onChange={(e) => handleFlagChange(flag.id, e.target.checked)}
                />
                <span style={{
                  ...styles.toggleSlider,
                  backgroundColor: formData.featureFlags[flag.id] 
                    ? (flag.danger ? '#ef4444' : 'var(--color-primary)') 
                    : 'var(--color-border)'
                }}>
                  <span style={{
                    ...styles.toggleKnob,
                    transform: formData.featureFlags[flag.id] ? 'translateX(20px)' : 'translateX(0)'
                  }} />
                </span>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Developer Tools */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Wrench size={20} />
            <h3 style={styles.sectionTitle}>Developer Tools</h3>
          </div>
        </div>

        <div style={styles.flagsGrid}>
          {devTools.map(tool => (
            <div key={tool.id} style={styles.flagCard}>
              <div style={styles.flagInfo}>
                <span style={styles.flagLabel}>{tool.label}</span>
                <span style={styles.flagDesc}>{tool.desc}</span>
              </div>
              <label style={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={formData.devTools[tool.id]}
                  onChange={(e) => handleDevToolChange(tool.id, e.target.checked)}
                />
                <span style={{
                  ...styles.toggleSlider,
                  backgroundColor: formData.devTools[tool.id] ? 'var(--color-primary)' : 'var(--color-border)'
                }}>
                  <span style={{
                    ...styles.toggleKnob,
                    transform: formData.devTools[tool.id] ? 'translateX(20px)' : 'translateX(0)'
                  }} />
                </span>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Data Management */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Shield size={20} />
            <h3 style={styles.sectionTitle}>Data Management</h3>
          </div>
        </div>

        <div style={styles.dataActions}>
          <div style={styles.dataAction}>
            <div style={styles.dataActionInfo}>
              <h4 style={styles.dataActionTitle}>Export Configuration</h4>
              <p style={styles.dataActionDesc}>Download your brain.json and all settings</p>
            </div>
            <button style={styles.dataActionButton} onClick={handleExport}>
              <Download size={16} /> Export
            </button>
          </div>

          <div style={styles.dataAction}>
            <div style={styles.dataActionInfo}>
              <h4 style={styles.dataActionTitle}>Import Configuration</h4>
              <p style={styles.dataActionDesc}>Restore settings from a backup file</p>
            </div>
            <label style={styles.dataActionButton}>
              <Upload size={16} /> Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <div style={styles.dataAction}>
            <div style={styles.dataActionInfo}>
              <h4 style={styles.dataActionTitle}>Sync Brain</h4>
              <p style={styles.dataActionDesc}>Force sync with deployed backend</p>
            </div>
            <button style={styles.dataActionButton}>
              <RefreshCw size={16} /> Sync
            </button>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section style={styles.dangerSection}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <AlertTriangle size={20} color="#ef4444" />
            <h3 style={{ ...styles.sectionTitle, color: '#ef4444' }}>Danger Zone</h3>
          </div>
        </div>

        <div style={styles.dangerActions}>
          <div style={styles.dangerAction}>
            <div style={styles.dangerActionInfo}>
              <h4 style={styles.dangerActionTitle}>Reset All Settings</h4>
              <p style={styles.dangerActionDesc}>
                Reset all settings to defaults. Your content and data will be preserved.
              </p>
            </div>
            <button 
              style={styles.dangerButton}
              onClick={() => setConfirmAction('reset')}
            >
              Reset Settings
            </button>
          </div>

          <div style={styles.dangerAction}>
            <div style={styles.dangerActionInfo}>
              <h4 style={styles.dangerActionTitle}>Delete Business</h4>
              <p style={styles.dangerActionDesc}>
                Permanently delete this business and all associated data. This cannot be undone.
              </p>
            </div>
            <button 
              style={{ ...styles.dangerButton, backgroundColor: '#ef4444' }}
              onClick={() => setConfirmAction('delete')}
            >
              Delete Business
            </button>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div style={styles.modalOverlay} onClick={() => setConfirmAction(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>
              {confirmAction === 'reset' ? 'Reset All Settings' : 'Delete Business'}
            </h3>
            <p style={styles.modalText}>
              {confirmAction === 'reset' 
                ? 'This will reset all settings to their default values. Your content and data will be preserved.'
                : 'This will permanently delete your business and all associated data. This action cannot be undone.'
              }
            </p>
            <p style={styles.modalConfirmText}>
              Type <strong>{business?.name}</strong> to confirm:
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              style={styles.modalInput}
              placeholder={business?.name}
            />
            {error && (
              <div style={styles.modalError}>
                <AlertCircle size={14} /> {error}
              </div>
            )}
            <div style={styles.modalActions}>
              <button 
                style={styles.modalCancel}
                onClick={() => {
                  setConfirmAction(null);
                  setConfirmText('');
                  setError(null);
                }}
              >
                Cancel
              </button>
              <button 
                style={{
                  ...styles.modalConfirm,
                  backgroundColor: confirmAction === 'delete' ? '#ef4444' : 'var(--color-primary)'
                }}
                onClick={() => handleDangerAction(confirmAction)}
                disabled={processing}
              >
                {processing ? 'Processing...' : confirmAction === 'reset' ? 'Reset Settings' : 'Delete Business'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div style={styles.saveBar}>
        {error && !confirmAction && (
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
  warningBanner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    padding: '16px 20px',
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    border: '1px solid #eab308',
    borderRadius: '10px',
    color: '#eab308'
  },
  warningText: {
    margin: '4px 0 0 0',
    fontSize: '13px',
    opacity: 0.9
  },
  section: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    padding: '24px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  sectionTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
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
  envList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  envRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px'
  },
  envKeyInput: {
    width: '200px',
    padding: '10px 12px',
    fontSize: '13px',
    fontFamily: 'monospace',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)'
  },
  envValueWrapper: {
    flex: 1,
    display: 'flex',
    gap: '8px'
  },
  envValueInput: {
    flex: 1,
    padding: '10px 12px',
    fontSize: '13px',
    fontFamily: 'monospace',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)'
  },
  envAction: {
    padding: '10px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  secretToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  envRemove: {
    padding: '10px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: 'none',
    borderRadius: '6px',
    color: '#ef4444',
    cursor: 'pointer'
  },
  flagsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  },
  flagCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)'
  },
  flagCardDanger: {
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.05)'
  },
  flagInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  flagLabel: {
    fontSize: '14px',
    fontWeight: 500
  },
  flagDesc: {
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
  dataActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  dataAction: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px'
  },
  dataActionInfo: {
    flex: 1
  },
  dataActionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    margin: 0
  },
  dataActionDesc: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0'
  },
  dataActionButton: {
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
  dangerSection: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid #ef4444',
    padding: '24px'
  },
  dangerActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  dangerAction: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderRadius: '10px',
    border: '1px solid rgba(239, 68, 68, 0.2)'
  },
  dangerActionInfo: {
    flex: 1
  },
  dangerActionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    margin: 0,
    color: '#ef4444'
  },
  dangerActionDesc: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0'
  },
  dangerButton: {
    padding: '10px 18px',
    backgroundColor: 'transparent',
    border: '1px solid #ef4444',
    borderRadius: '8px',
    color: '#ef4444',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    padding: '32px',
    width: '100%',
    maxWidth: '450px'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 600,
    margin: '0 0 12px 0'
  },
  modalText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    marginBottom: '20px'
  },
  modalConfirmText: {
    fontSize: '14px',
    marginBottom: '10px'
  },
  modalInput: {
    width: '100%',
    padding: '12px 14px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    marginBottom: '16px'
  },
  modalError: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#ef4444',
    fontSize: '13px',
    marginBottom: '16px'
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end'
  },
  modalCancel: {
    padding: '12px 20px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  modalConfirm: {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
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

export default SettingsAdvanced;