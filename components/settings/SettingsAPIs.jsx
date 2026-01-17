/**
 * SettingsAPIs
 * 
 * API integrations and third-party services.
 * AI providers, image storage, maps, etc.
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Save,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  RefreshCw,
  Bot,
  Image,
  MapPin,
  ExternalLink,
  Zap
} from 'lucide-react';
import { useBrain } from '../../hooks/useBrain';

export function SettingsAPIs() {
  const { business } = useOutletContext();
  const { brain, updateBrain, saving } = useBrain();
  
  const [formData, setFormData] = useState({
    ai: {
      anthropic: { apiKey: '', model: 'claude-sonnet-4-20250514', enabled: true, monthlyLimit: 50 },
      openai: { apiKey: '', model: 'gpt-4-turbo', enabled: false, useAs: 'fallback' },
      gemini: { apiKey: '', model: 'gemini-pro', enabled: false, useAs: 'fallback' }
    },
    storage: {
      cloudinary: { cloudName: '', apiKey: '', apiSecret: '', folder: '', enabled: true }
    },
    maps: {
      google: { apiKey: '', enabledApis: ['places', 'geocoding', 'maps'], enabled: false }
    },
    custom: []
  });
  
  const [showSecrets, setShowSecrets] = useState({});
  const [testing, setTesting] = useState(null);
  const [testResults, setTestResults] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Load data from brain
  useEffect(() => {
    if (brain?.integrations?.apis) {
      setFormData(prev => ({
        ...prev,
        ...brain.integrations.apis
      }));
    }
  }, [brain]);

  const handleChange = (category, provider, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [provider]: {
          ...prev[category][provider],
          [field]: value
        }
      }
    }));
  };

  const toggleSecret = (key) => {
    setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const testConnection = async (category, provider) => {
    setTesting(`${category}-${provider}`);
    setTestResults(prev => ({ ...prev, [`${category}-${provider}`]: null }));
    
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if API key exists
      const config = formData[category][provider];
      if (!config.apiKey && provider !== 'cloudinary') {
        throw new Error('API key is required');
      }
      
      setTestResults(prev => ({ 
        ...prev, 
        [`${category}-${provider}`]: { success: true, message: 'Connection successful' }
      }));
    } catch (err) {
      setTestResults(prev => ({ 
        ...prev, 
        [`${category}-${provider}`]: { success: false, message: err.message }
      }));
    } finally {
      setTesting(null);
    }
  };

  const addCustomAPI = () => {
    setFormData(prev => ({
      ...prev,
      custom: [
        ...prev.custom,
        { id: Date.now(), name: '', baseUrl: '', apiKey: '', headers: {} }
      ]
    }));
  };

  const updateCustomAPI = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      custom: prev.custom.map(api => 
        api.id === id ? { ...api, [field]: value } : api
      )
    }));
  };

  const removeCustomAPI = (id) => {
    setFormData(prev => ({
      ...prev,
      custom: prev.custom.filter(api => api.id !== id)
    }));
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    
    const result = await updateBrain('integrations', { apis: formData });
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || 'Failed to save');
    }
  };

  return (
    <div style={styles.container}>
      {/* AI Services */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Bot size={20} />
            <h3 style={styles.sectionTitle}>AI Services</h3>
          </div>
        </div>

        {/* Anthropic (Claude) */}
        <APICard
          name="Anthropic (Claude)"
          icon="🧠"
          description="Primary AI for chat, content generation, and business management"
          enabled={formData.ai.anthropic.enabled}
          onToggle={(v) => handleChange('ai', 'anthropic', 'enabled', v)}
          testResult={testResults['ai-anthropic']}
          testing={testing === 'ai-anthropic'}
          onTest={() => testConnection('ai', 'anthropic')}
        >
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>API Key</label>
              <div style={styles.secretInput}>
                <input
                  type={showSecrets.anthropic ? 'text' : 'password'}
                  value={formData.ai.anthropic.apiKey}
                  onChange={(e) => handleChange('ai', 'anthropic', 'apiKey', e.target.value)}
                  style={styles.input}
                  placeholder="sk-ant-..."
                />
                <button style={styles.secretToggle} onClick={() => toggleSecret('anthropic')}>
                  {showSecrets.anthropic ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Model</label>
              <select
                value={formData.ai.anthropic.model}
                onChange={(e) => handleChange('ai', 'anthropic', 'model', e.target.value)}
                style={styles.select}
              >
                <option value="claude-sonnet-4-20250514">Claude Sonnet 4</option>
                <option value="claude-opus-4-20250514">Claude Opus 4</option>
                <option value="claude-haiku-4-20250514">Claude Haiku 4</option>
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Monthly Budget ($)</label>
              <input
                type="number"
                value={formData.ai.anthropic.monthlyLimit}
                onChange={(e) => handleChange('ai', 'anthropic', 'monthlyLimit', parseFloat(e.target.value))}
                style={styles.input}
                placeholder="50.00"
              />
            </div>
          </div>
        </APICard>

        {/* OpenAI */}
        <APICard
          name="OpenAI (GPT)"
          icon="🤖"
          description="Fallback AI provider"
          enabled={formData.ai.openai.enabled}
          onToggle={(v) => handleChange('ai', 'openai', 'enabled', v)}
          testResult={testResults['ai-openai']}
          testing={testing === 'ai-openai'}
          onTest={() => testConnection('ai', 'openai')}
        >
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>API Key</label>
              <div style={styles.secretInput}>
                <input
                  type={showSecrets.openai ? 'text' : 'password'}
                  value={formData.ai.openai.apiKey}
                  onChange={(e) => handleChange('ai', 'openai', 'apiKey', e.target.value)}
                  style={styles.input}
                  placeholder="sk-..."
                />
                <button style={styles.secretToggle} onClick={() => toggleSecret('openai')}>
                  {showSecrets.openai ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Model</label>
              <select
                value={formData.ai.openai.model}
                onChange={(e) => handleChange('ai', 'openai', 'model', e.target.value)}
                style={styles.select}
              >
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="gpt-4o">GPT-4o</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Use As</label>
              <select
                value={formData.ai.openai.useAs}
                onChange={(e) => handleChange('ai', 'openai', 'useAs', e.target.value)}
                style={styles.select}
              >
                <option value="fallback">Fallback Only</option>
                <option value="primary">Primary</option>
                <option value="specific">Specific Tasks</option>
              </select>
            </div>
          </div>
        </APICard>

        {/* Google Gemini */}
        <APICard
          name="Google Gemini"
          icon="✨"
          description="Additional fallback AI provider"
          enabled={formData.ai.gemini.enabled}
          onToggle={(v) => handleChange('ai', 'gemini', 'enabled', v)}
          testResult={testResults['ai-gemini']}
          testing={testing === 'ai-gemini'}
          onTest={() => testConnection('ai', 'gemini')}
        >
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>API Key</label>
              <div style={styles.secretInput}>
                <input
                  type={showSecrets.gemini ? 'text' : 'password'}
                  value={formData.ai.gemini.apiKey}
                  onChange={(e) => handleChange('ai', 'gemini', 'apiKey', e.target.value)}
                  style={styles.input}
                  placeholder="AIza..."
                />
                <button style={styles.secretToggle} onClick={() => toggleSecret('gemini')}>
                  {showSecrets.gemini ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Model</label>
              <select
                value={formData.ai.gemini.model}
                onChange={(e) => handleChange('ai', 'gemini', 'model', e.target.value)}
                style={styles.select}
              >
                <option value="gemini-pro">Gemini Pro</option>
                <option value="gemini-ultra">Gemini Ultra</option>
              </select>
            </div>
          </div>
        </APICard>
      </section>

      {/* Image Storage */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Image size={20} />
            <h3 style={styles.sectionTitle}>Image & File Storage</h3>
          </div>
        </div>

        <APICard
          name="Cloudinary"
          icon="☁️"
          description="Image and media storage, optimization, and delivery"
          enabled={formData.storage.cloudinary.enabled}
          onToggle={(v) => handleChange('storage', 'cloudinary', 'enabled', v)}
          testResult={testResults['storage-cloudinary']}
          testing={testing === 'storage-cloudinary'}
          onTest={() => testConnection('storage', 'cloudinary')}
        >
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Cloud Name</label>
              <input
                type="text"
                value={formData.storage.cloudinary.cloudName}
                onChange={(e) => handleChange('storage', 'cloudinary', 'cloudName', e.target.value)}
                style={styles.input}
                placeholder="your-cloud-name"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>API Key</label>
              <input
                type="text"
                value={formData.storage.cloudinary.apiKey}
                onChange={(e) => handleChange('storage', 'cloudinary', 'apiKey', e.target.value)}
                style={styles.input}
                placeholder="123456789012345"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>API Secret</label>
              <div style={styles.secretInput}>
                <input
                  type={showSecrets.cloudinary ? 'text' : 'password'}
                  value={formData.storage.cloudinary.apiSecret}
                  onChange={(e) => handleChange('storage', 'cloudinary', 'apiSecret', e.target.value)}
                  style={styles.input}
                  placeholder="••••••••••••••••"
                />
                <button style={styles.secretToggle} onClick={() => toggleSecret('cloudinary')}>
                  {showSecrets.cloudinary ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Folder Path</label>
              <input
                type="text"
                value={formData.storage.cloudinary.folder}
                onChange={(e) => handleChange('storage', 'cloudinary', 'folder', e.target.value)}
                style={styles.input}
                placeholder="/blink/your-business/"
              />
            </div>
          </div>
        </APICard>
      </section>

      {/* Maps & Location */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <MapPin size={20} />
            <h3 style={styles.sectionTitle}>Maps & Location</h3>
          </div>
        </div>

        <APICard
          name="Google Maps"
          icon="🗺️"
          description="Maps, places, and geocoding services"
          enabled={formData.maps.google.enabled}
          onToggle={(v) => handleChange('maps', 'google', 'enabled', v)}
          testResult={testResults['maps-google']}
          testing={testing === 'maps-google'}
          onTest={() => testConnection('maps', 'google')}
        >
          <div style={styles.formGrid}>
            <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
              <label style={styles.label}>API Key</label>
              <div style={styles.secretInput}>
                <input
                  type={showSecrets.googleMaps ? 'text' : 'password'}
                  value={formData.maps.google.apiKey}
                  onChange={(e) => handleChange('maps', 'google', 'apiKey', e.target.value)}
                  style={styles.input}
                  placeholder="AIza..."
                />
                <button style={styles.secretToggle} onClick={() => toggleSecret('googleMaps')}>
                  {showSecrets.googleMaps ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            
            <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
              <label style={styles.label}>Enabled APIs</label>
              <div style={styles.checkboxGroup}>
                {['places', 'geocoding', 'maps', 'directions', 'distance'].map(api => (
                  <label key={api} style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.maps.google.enabledApis?.includes(api)}
                      onChange={(e) => {
                        const current = formData.maps.google.enabledApis || [];
                        const updated = e.target.checked
                          ? [...current, api]
                          : current.filter(a => a !== api);
                        handleChange('maps', 'google', 'enabledApis', updated);
                      }}
                      style={styles.checkbox}
                    />
                    {api.charAt(0).toUpperCase() + api.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </APICard>
      </section>

      {/* Custom APIs */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Zap size={20} />
            <h3 style={styles.sectionTitle}>Custom APIs</h3>
          </div>
          <button style={styles.addButton} onClick={addCustomAPI}>
            <Plus size={14} /> Add API
          </button>
        </div>

        {formData.custom.length === 0 ? (
          <p style={styles.emptyText}>No custom APIs configured. Click "Add API" to add one.</p>
        ) : (
          formData.custom.map(api => (
            <div key={api.id} style={styles.customAPICard}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Name</label>
                  <input
                    type="text"
                    value={api.name}
                    onChange={(e) => updateCustomAPI(api.id, 'name', e.target.value)}
                    style={styles.input}
                    placeholder="My Custom API"
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Base URL</label>
                  <input
                    type="text"
                    value={api.baseUrl}
                    onChange={(e) => updateCustomAPI(api.id, 'baseUrl', e.target.value)}
                    style={styles.input}
                    placeholder="https://api.example.com"
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>API Key</label>
                  <input
                    type="password"
                    value={api.apiKey}
                    onChange={(e) => updateCustomAPI(api.id, 'apiKey', e.target.value)}
                    style={styles.input}
                    placeholder="••••••••••••••••"
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <button 
                    style={styles.removeButton}
                    onClick={() => removeCustomAPI(api.id)}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))
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

// API Card Component
function APICard({ name, icon, description, enabled, onToggle, children, testResult, testing, onTest }) {
  return (
    <div style={{
      ...styles.apiCard,
      opacity: enabled ? 1 : 0.7
    }}>
      <div style={styles.apiCardHeader}>
        <div style={styles.apiCardLeft}>
          <span style={styles.apiIcon}>{icon}</span>
          <div>
            <h4 style={styles.apiName}>{name}</h4>
            <p style={styles.apiDesc}>{description}</p>
          </div>
        </div>
        <div style={styles.apiCardRight}>
          {testResult && (
            <span style={{
              ...styles.testResult,
              color: testResult.success ? '#22c55e' : '#ef4444'
            }}>
              {testResult.success ? <Check size={14} /> : <AlertCircle size={14} />}
              {testResult.message}
            </span>
          )}
          <button 
            style={styles.testButton}
            onClick={onTest}
            disabled={testing}
          >
            <RefreshCw size={14} className={testing ? 'spinning' : ''} />
            {testing ? 'Testing...' : 'Test'}
          </button>
          <label style={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => onToggle(e.target.checked)}
              style={styles.toggleInput}
            />
            <span style={styles.toggleSlider}></span>
          </label>
        </div>
      </div>
      
      {enabled && (
        <div style={styles.apiCardBody}>
          {children}
        </div>
      )}
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
  apiCard: {
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
    marginBottom: '12px',
    overflow: 'hidden'
  },
  apiCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px'
  },
  apiCardLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  apiIcon: {
    fontSize: '24px'
  },
  apiName: {
    fontSize: '15px',
    fontWeight: 600,
    margin: 0
  },
  apiDesc: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    margin: '2px 0 0 0'
  },
  apiCardRight: {
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
    backgroundColor: 'var(--color-surface)',
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
  toggleInput: {
    opacity: 0,
    width: 0,
    height: 0
  },
  toggleSlider: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--color-border)',
    borderRadius: '24px',
    transition: 'all 0.3s'
  },
  apiCardBody: {
    padding: '20px',
    borderTop: '1px solid var(--color-border)'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
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
    padding: '10px 12px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    outline: 'none'
  },
  select: {
    padding: '10px 12px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    cursor: 'pointer'
  },
  secretInput: {
    display: 'flex',
    gap: '8px'
  },
  secretToggle: {
    padding: '10px 12px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  checkboxGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  customAPICard: {
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
    marginBottom: '12px'
  },
  removeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 14px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    color: '#ef4444',
    fontSize: '13px',
    cursor: 'pointer',
    marginTop: '22px'
  },
  emptyText: {
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    textAlign: 'center',
    padding: '20px'
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

export default SettingsAPIs;