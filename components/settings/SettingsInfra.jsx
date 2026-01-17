/**
 * SettingsInfra
 * 
 * Infrastructure settings for admin use.
 * Vercel, Railway, Database, GitHub connections.
 * Customer never sees this - admin only.
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Save,
  Check,
  AlertCircle,
  ExternalLink,
  Eye,
  EyeOff,
  RefreshCw,
  Copy,
  Server,
  Database,
  Globe,
  GitBranch
} from 'lucide-react';
import { useBrain } from '../../hooks/useBrain';
import { useHealth } from '../../hooks/useHealth';

export function SettingsInfra() {
  const { business } = useOutletContext();
  const { brain, updateBrain, saving } = useBrain();
  const { health, checkHealth, getStatusIcon } = useHealth(false);
  
  const [formData, setFormData] = useState({
    frontend: {
      provider: 'vercel',
      projectId: '',
      url: '',
      customDomain: '',
      token: ''
    },
    backend: {
      provider: 'railway',
      projectId: '',
      url: '',
      token: ''
    },
    database: {
      provider: 'railway',
      type: 'postgresql',
      host: '',
      port: '5432',
      name: '',
      username: '',
      password: '',
      connectionString: ''
    },
    repository: {
      provider: 'github',
      repo: '',
      branch: 'main',
      private: true
    }
  });
  
  const [showSecrets, setShowSecrets] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(null);

  // Load data from brain
  useEffect(() => {
    if (brain?.infrastructure) {
      setFormData(prev => ({
        frontend: { ...prev.frontend, ...brain.infrastructure.frontend },
        backend: { ...prev.backend, ...brain.infrastructure.backend },
        database: { ...prev.database, ...brain.infrastructure.database },
        repository: { ...prev.repository, ...brain.infrastructure.repository }
      }));
    }
  }, [brain]);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const toggleSecret = (key) => {
    setShowSecrets(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    
    const result = await updateBrain('infrastructure', formData);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || 'Failed to save');
    }
  };

  const openExternal = (url) => {
    if (url) window.open(url, '_blank');
  };

  return (
    <div style={styles.container}>
      {/* Warning Banner */}
      <div style={styles.warningBanner}>
        <AlertCircle size={18} />
        <div>
          <strong>Admin Only</strong>
          <p style={styles.warningText}>
            These settings control infrastructure connections. Changes sync to brain.json and may require redeployment.
          </p>
        </div>
      </div>

      {/* Frontend (Vercel) */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Globe size={20} />
            <h3 style={styles.sectionTitle}>Frontend (Vercel)</h3>
          </div>
          <span style={styles.statusBadge}>
            {getStatusIcon(health.frontend?.status)} {health.frontend?.status || 'unknown'}
          </span>
        </div>
        
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Project ID</label>
            <input
              type="text"
              value={formData.frontend.projectId}
              onChange={(e) => handleChange('frontend', 'projectId', e.target.value)}
              style={styles.input}
              placeholder="prj_abc123..."
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Production URL</label>
            <div style={styles.inputWithAction}>
              <input
                type="text"
                value={formData.frontend.url}
                onChange={(e) => handleChange('frontend', 'url', e.target.value)}
                style={styles.input}
                placeholder="your-app.vercel.app"
              />
              <button 
                style={styles.inputAction}
                onClick={() => openExternal(`https://${formData.frontend.url}`)}
              >
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Custom Domain</label>
            <input
              type="text"
              value={formData.frontend.customDomain}
              onChange={(e) => handleChange('frontend', 'customDomain', e.target.value)}
              style={styles.input}
              placeholder="yourbusiness.com"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Vercel Token</label>
            <div style={styles.secretInput}>
              <input
                type={showSecrets.vercelToken ? 'text' : 'password'}
                value={formData.frontend.token}
                onChange={(e) => handleChange('frontend', 'token', e.target.value)}
                style={styles.input}
                placeholder="••••••••••••••••"
              />
              <button 
                style={styles.secretToggle}
                onClick={() => toggleSecret('vercelToken')}
              >
                {showSecrets.vercelToken ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        </div>

        <div style={styles.actionButtons}>
          <button style={styles.actionButton} onClick={() => openExternal('https://vercel.com/dashboard')}>
            <ExternalLink size={14} /> View in Vercel
          </button>
          <button style={styles.actionButton}>
            <RefreshCw size={14} /> Redeploy
          </button>
        </div>
      </section>

      {/* Backend (Railway) */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Server size={20} />
            <h3 style={styles.sectionTitle}>Backend (Railway)</h3>
          </div>
          <span style={styles.statusBadge}>
            {getStatusIcon(health.backend?.status)} {health.backend?.status || 'unknown'}
          </span>
        </div>
        
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Project ID</label>
            <input
              type="text"
              value={formData.backend.projectId}
              onChange={(e) => handleChange('backend', 'projectId', e.target.value)}
              style={styles.input}
              placeholder="proj_xyz789..."
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Service URL</label>
            <div style={styles.inputWithAction}>
              <input
                type="text"
                value={formData.backend.url}
                onChange={(e) => handleChange('backend', 'url', e.target.value)}
                style={styles.input}
                placeholder="your-api.railway.app"
              />
              <button 
                style={styles.inputAction}
                onClick={() => openExternal(`https://${formData.backend.url}`)}
              >
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Railway Token</label>
            <div style={styles.secretInput}>
              <input
                type={showSecrets.railwayToken ? 'text' : 'password'}
                value={formData.backend.token}
                onChange={(e) => handleChange('backend', 'token', e.target.value)}
                style={styles.input}
                placeholder="••••••••••••••••"
              />
              <button 
                style={styles.secretToggle}
                onClick={() => toggleSecret('railwayToken')}
              >
                {showSecrets.railwayToken ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        </div>

        <div style={styles.actionButtons}>
          <button style={styles.actionButton} onClick={() => openExternal('https://railway.app/dashboard')}>
            <ExternalLink size={14} /> View in Railway
          </button>
          <button style={styles.actionButton}>
            <RefreshCw size={14} /> Restart
          </button>
        </div>
      </section>

      {/* Database */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Database size={20} />
            <h3 style={styles.sectionTitle}>Database (PostgreSQL)</h3>
          </div>
          <span style={styles.statusBadge}>
            {getStatusIcon(health.database?.status)} {health.database?.status || 'unknown'}
          </span>
        </div>
        
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Host</label>
            <input
              type="text"
              value={formData.database.host}
              onChange={(e) => handleChange('database', 'host', e.target.value)}
              style={styles.input}
              placeholder="containers-us-west-123.railway.app"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Port</label>
            <input
              type="text"
              value={formData.database.port}
              onChange={(e) => handleChange('database', 'port', e.target.value)}
              style={styles.input}
              placeholder="5432"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Database Name</label>
            <input
              type="text"
              value={formData.database.name}
              onChange={(e) => handleChange('database', 'name', e.target.value)}
              style={styles.input}
              placeholder="business_prod"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={formData.database.username}
              onChange={(e) => handleChange('database', 'username', e.target.value)}
              style={styles.input}
              placeholder="postgres"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.secretInput}>
              <input
                type={showSecrets.dbPassword ? 'text' : 'password'}
                value={formData.database.password}
                onChange={(e) => handleChange('database', 'password', e.target.value)}
                style={styles.input}
                placeholder="••••••••••••••••"
              />
              <button 
                style={styles.secretToggle}
                onClick={() => toggleSecret('dbPassword')}
              >
                {showSecrets.dbPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          
          <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
            <label style={styles.label}>Connection String</label>
            <div style={styles.secretInput}>
              <input
                type={showSecrets.connString ? 'text' : 'password'}
                value={formData.database.connectionString}
                onChange={(e) => handleChange('database', 'connectionString', e.target.value)}
                style={styles.input}
                placeholder="postgresql://user:pass@host:port/db"
              />
              <button 
                style={styles.secretToggle}
                onClick={() => toggleSecret('connString')}
              >
                {showSecrets.connString ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button 
                style={styles.copyButton}
                onClick={() => copyToClipboard(formData.database.connectionString, 'connString')}
              >
                {copied === 'connString' ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>

        <div style={styles.actionButtons}>
          <button style={styles.actionButton}>
            <Database size={14} /> Open DB Studio
          </button>
          <button style={styles.actionButton}>
            <RefreshCw size={14} /> Backup Now
          </button>
        </div>
      </section>

      {/* Repository */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <GitBranch size={20} />
            <h3 style={styles.sectionTitle}>Repository (GitHub)</h3>
          </div>
        </div>
        
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Repository</label>
            <div style={styles.inputWithAction}>
              <input
                type="text"
                value={formData.repository.repo}
                onChange={(e) => handleChange('repository', 'repo', e.target.value)}
                style={styles.input}
                placeholder="be1st/business-name"
              />
              <button 
                style={styles.inputAction}
                onClick={() => openExternal(`https://github.com/${formData.repository.repo}`)}
              >
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Branch</label>
            <input
              type="text"
              value={formData.repository.branch}
              onChange={(e) => handleChange('repository', 'branch', e.target.value)}
              style={styles.input}
              placeholder="main"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.repository.private}
                onChange={(e) => handleChange('repository', 'private', e.target.checked)}
                style={styles.checkbox}
              />
              Private Repository
            </label>
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
        <button style={styles.testButton} onClick={checkHealth}>
          <RefreshCw size={16} />
          Test Connections
        </button>
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
    gap: '12px',
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
  statusBadge: {
    fontSize: '12px',
    padding: '4px 10px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px',
    textTransform: 'capitalize'
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
    outline: 'none',
    fontFamily: 'monospace'
  },
  inputWithAction: {
    display: 'flex',
    gap: '8px'
  },
  inputAction: {
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
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
  copyButton: {
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
    marginTop: '24px'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
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
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
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
  testButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
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

export default SettingsInfra;