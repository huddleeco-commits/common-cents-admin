/**
 * SettingsIntegrations
 * 
 * Third-party integrations.
 * Social media, POS systems, CRM, reviews, etc.
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
  Link2,
  Unlink,
  Puzzle
} from 'lucide-react';
import { useBrain } from '../../hooks/useBrain';

export function SettingsIntegrations() {
  const { business } = useOutletContext();
  const { brain, updateBrain, saving } = useBrain();
  
  const [formData, setFormData] = useState({
    social: {
      facebook: { connected: false, pageId: '', accessToken: '' },
      instagram: { connected: false, accountId: '', accessToken: '' },
      twitter: { connected: false, handle: '', apiKey: '', apiSecret: '' },
      linkedin: { connected: false, companyId: '', accessToken: '' },
      tiktok: { connected: false, handle: '' },
      youtube: { connected: false, channelId: '' }
    },
    pos: {
      square: { connected: false, locationId: '', accessToken: '' },
      clover: { connected: false, merchantId: '', apiToken: '' },
      toast: { connected: false, restaurantGuid: '', apiKey: '' }
    },
    crm: {
      hubspot: { connected: false, apiKey: '', portalId: '' },
      salesforce: { connected: false, instanceUrl: '', accessToken: '' },
      mailchimp: { connected: false, apiKey: '', audienceId: '' }
    },
    reviews: {
      google: { connected: false, placeId: '' },
      yelp: { connected: false, businessId: '', apiKey: '' },
      trustpilot: { connected: false, businessUnitId: '', apiKey: '' }
    },
    reservations: {
      opentable: { connected: false, restaurantId: '' },
      resy: { connected: false, venueId: '' },
      yelp: { connected: false, businessId: '' }
    },
    delivery: {
      doordash: { connected: false, storeId: '', merchantToken: '' },
      ubereats: { connected: false, storeId: '', clientId: '', clientSecret: '' },
      grubhub: { connected: false, restaurantId: '' }
    },
    scheduling: {
      calendly: { connected: false, apiKey: '', eventTypeUri: '' },
      acuity: { connected: false, userId: '', apiKey: '' }
    }
  });
  
  const [showSecrets, setShowSecrets] = useState({});
  const [connecting, setConnecting] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (brain?.integrations?.thirdParty) {
      setFormData(prev => ({
        ...prev,
        ...brain.integrations.thirdParty
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

  const handleConnect = async (category, provider) => {
    setConnecting(`${category}-${provider}`);
    
    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      handleChange(category, provider, 'connected', true);
    } catch (err) {
      setError(`Failed to connect ${provider}`);
    } finally {
      setConnecting(null);
    }
  };

  const handleDisconnect = async (category, provider) => {
    if (!confirm(`Disconnect ${provider}? This will remove all synced data.`)) return;
    
    handleChange(category, provider, 'connected', false);
    // Clear tokens
    const fields = Object.keys(formData[category][provider]);
    fields.forEach(field => {
      if (field !== 'connected') {
        handleChange(category, provider, field, '');
      }
    });
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    
    const result = await updateBrain('integrations', { thirdParty: formData });
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || 'Failed to save');
    }
  };

  const integrationGroups = [
    {
      id: 'social',
      title: 'Social Media',
      icon: '📱',
      items: [
        { id: 'facebook', name: 'Facebook', icon: '📘', fields: ['pageId', 'accessToken'] },
        { id: 'instagram', name: 'Instagram', icon: '📸', fields: ['accountId', 'accessToken'] },
        { id: 'twitter', name: 'X (Twitter)', icon: '🐦', fields: ['handle', 'apiKey', 'apiSecret'] },
        { id: 'linkedin', name: 'LinkedIn', icon: '💼', fields: ['companyId', 'accessToken'] },
        { id: 'tiktok', name: 'TikTok', icon: '🎵', fields: ['handle'] },
        { id: 'youtube', name: 'YouTube', icon: '🎬', fields: ['channelId'] }
      ]
    },
    {
      id: 'pos',
      title: 'Point of Sale',
      icon: '💳',
      items: [
        { id: 'square', name: 'Square', icon: '⬛', fields: ['locationId', 'accessToken'] },
        { id: 'clover', name: 'Clover', icon: '🍀', fields: ['merchantId', 'apiToken'] },
        { id: 'toast', name: 'Toast', icon: '🍞', fields: ['restaurantGuid', 'apiKey'] }
      ]
    },
    {
      id: 'crm',
      title: 'CRM & Marketing',
      icon: '📧',
      items: [
        { id: 'hubspot', name: 'HubSpot', icon: '🟠', fields: ['apiKey', 'portalId'] },
        { id: 'salesforce', name: 'Salesforce', icon: '☁️', fields: ['instanceUrl', 'accessToken'] },
        { id: 'mailchimp', name: 'Mailchimp', icon: '🐵', fields: ['apiKey', 'audienceId'] }
      ]
    },
    {
      id: 'reviews',
      title: 'Reviews',
      icon: '⭐',
      items: [
        { id: 'google', name: 'Google Reviews', icon: '🔍', fields: ['placeId'] },
        { id: 'yelp', name: 'Yelp', icon: '🔴', fields: ['businessId', 'apiKey'] },
        { id: 'trustpilot', name: 'Trustpilot', icon: '💚', fields: ['businessUnitId', 'apiKey'] }
      ]
    },
    {
      id: 'reservations',
      title: 'Reservations',
      icon: '📅',
      items: [
        { id: 'opentable', name: 'OpenTable', icon: '🍽️', fields: ['restaurantId'] },
        { id: 'resy', name: 'Resy', icon: '🪑', fields: ['venueId'] },
        { id: 'yelp', name: 'Yelp Reservations', icon: '🔴', fields: ['businessId'] }
      ]
    },
    {
      id: 'delivery',
      title: 'Delivery',
      icon: '🚗',
      items: [
        { id: 'doordash', name: 'DoorDash', icon: '🔴', fields: ['storeId', 'merchantToken'] },
        { id: 'ubereats', name: 'Uber Eats', icon: '🟢', fields: ['storeId', 'clientId', 'clientSecret'] },
        { id: 'grubhub', name: 'Grubhub', icon: '🟠', fields: ['restaurantId'] }
      ]
    },
    {
      id: 'scheduling',
      title: 'Scheduling',
      icon: '🗓️',
      items: [
        { id: 'calendly', name: 'Calendly', icon: '📆', fields: ['apiKey', 'eventTypeUri'] },
        { id: 'acuity', name: 'Acuity Scheduling', icon: '📋', fields: ['userId', 'apiKey'] }
      ]
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerIcon}>
          <Puzzle size={24} />
        </div>
        <div>
          <h2 style={styles.headerTitle}>Integrations</h2>
          <p style={styles.headerDesc}>Connect third-party services to your business</p>
        </div>
      </div>

      {/* Integration Groups */}
      {integrationGroups.map(group => (
        <section key={group.id} style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>{group.icon}</span>
            <h3 style={styles.sectionTitle}>{group.title}</h3>
          </div>

          <div style={styles.integrationsGrid}>
            {group.items.map(item => {
              const data = formData[group.id]?.[item.id] || {};
              const isConnected = data.connected;
              const isConnecting = connecting === `${group.id}-${item.id}`;

              return (
                <div 
                  key={item.id} 
                  style={{
                    ...styles.integrationCard,
                    ...(isConnected ? styles.integrationCardConnected : {})
                  }}
                >
                  <div style={styles.integrationHeader}>
                    <div style={styles.integrationInfo}>
                      <span style={styles.integrationIcon}>{item.icon}</span>
                      <span style={styles.integrationName}>{item.name}</span>
                    </div>
                    {isConnected ? (
                      <button
                        style={styles.disconnectButton}
                        onClick={() => handleDisconnect(group.id, item.id)}
                      >
                        <Unlink size={14} /> Disconnect
                      </button>
                    ) : (
                      <button
                        style={styles.connectButton}
                        onClick={() => handleConnect(group.id, item.id)}
                        disabled={isConnecting}
                      >
                        {isConnecting ? (
                          <><RefreshCw size={14} className="spinning" /> Connecting...</>
                        ) : (
                          <><Link2 size={14} /> Connect</>
                        )}
                      </button>
                    )}
                  </div>

                  {isConnected && (
                    <div style={styles.integrationBody}>
                      <div style={styles.connectedBadge}>
                        <Check size={12} /> Connected
                      </div>

                      <div style={styles.integrationFields}>
                        {item.fields.map(field => {
                          const isSecret = field.toLowerCase().includes('token') || 
                                          field.toLowerCase().includes('secret') || 
                                          field.toLowerCase().includes('key');
                          const secretKey = `${group.id}-${item.id}-${field}`;

                          return (
                            <div key={field} style={styles.fieldGroup}>
                              <label style={styles.fieldLabel}>
                                {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </label>
                              <div style={styles.fieldInput}>
                                <input
                                  type={isSecret && !showSecrets[secretKey] ? 'password' : 'text'}
                                  value={data[field] || ''}
                                  onChange={(e) => handleChange(group.id, item.id, field, e.target.value)}
                                  style={styles.input}
                                  placeholder={isSecret ? '••••••••' : `Enter ${field}`}
                                />
                                {isSecret && (
                                  <button 
                                    style={styles.toggleSecretButton}
                                    onClick={() => toggleSecret(secretKey)}
                                  >
                                    {showSecrets[secretKey] ? <EyeOff size={14} /> : <Eye size={14} />}
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

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
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  headerIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0
  },
  headerDesc: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0'
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
  sectionIcon: {
    fontSize: '24px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  integrationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  integrationCard: {
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden',
    transition: 'all 0.2s'
  },
  integrationCardConnected: {
    borderColor: 'var(--color-primary)'
  },
  integrationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px'
  },
  integrationInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  integrationIcon: {
    fontSize: '24px'
  },
  integrationName: {
    fontSize: '15px',
    fontWeight: 600
  },
  connectButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  disconnectButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    color: '#ef4444',
    fontSize: '13px',
    cursor: 'pointer'
  },
  integrationBody: {
    padding: '16px',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)'
  },
  connectedBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '12px',
    color: '#22c55e',
    fontSize: '12px',
    fontWeight: 500,
    marginBottom: '16px'
  },
  integrationFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  fieldLabel: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--color-text-muted)'
  },
  fieldInput: {
    display: 'flex',
    gap: '8px'
  },
  input: {
    flex: 1,
    padding: '10px 12px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    outline: 'none'
  },
  toggleSecretButton: {
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

export default SettingsIntegrations;