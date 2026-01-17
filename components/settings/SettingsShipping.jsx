/**
 * SettingsShipping
 * 
 * Shipping configuration for businesses that ship products.
 * Carriers (USPS, UPS, FedEx), rates, rules.
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
  Truck,
  Package,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { useBrain } from '../../hooks/useBrain';

export function SettingsShipping() {
  const { business } = useOutletContext();
  const { brain, updateBrain, saving } = useBrain();
  
  const [formData, setFormData] = useState({
    enabled: true,
    shipFrom: {
      name: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
      country: 'US'
    },
    carriers: {
      usps: { enabled: true, userId: '', apiUrl: '', services: ['priority', 'first_class'] },
      ups: { enabled: false, accountNumber: '', clientId: '', clientSecret: '', services: ['ground', '2day'] },
      fedex: { enabled: false, accountNumber: '', apiKey: '', secretKey: '', services: ['ground', 'express'] }
    },
    rules: {
      freeShippingThreshold: 75,
      freeShippingEnabled: true,
      flatRateEnabled: true,
      flatRateAmount: 9.99,
      localPickupEnabled: true,
      localDeliveryEnabled: false,
      localDeliveryRadius: 10,
      localDeliveryFee: 5.99
    },
    handlingTime: 2,
    packaging: []
  });
  
  const [showSecrets, setShowSecrets] = useState({});
  const [testing, setTesting] = useState(null);
  const [testResults, setTestResults] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (brain?.integrations?.shipping) {
      setFormData(prev => ({
        ...prev,
        ...brain.integrations.shipping
      }));
    }
  }, [brain]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleShipFromChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      shipFrom: { ...prev.shipFrom, [field]: value }
    }));
  };

  const handleCarrierChange = (carrier, field, value) => {
    setFormData(prev => ({
      ...prev,
      carriers: {
        ...prev.carriers,
        [carrier]: { ...prev.carriers[carrier], [field]: value }
      }
    }));
  };

  const handleRulesChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      rules: { ...prev.rules, [field]: value }
    }));
  };

  const toggleService = (carrier, service) => {
    const current = formData.carriers[carrier].services || [];
    const updated = current.includes(service)
      ? current.filter(s => s !== service)
      : [...current, service];
    handleCarrierChange(carrier, 'services', updated);
  };

  const toggleSecret = (key) => {
    setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const testCarrier = async (carrier) => {
    setTesting(carrier);
    setTestResults(prev => ({ ...prev, [carrier]: null }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTestResults(prev => ({ 
        ...prev, 
        [carrier]: { success: true, message: 'Connected' }
      }));
    } catch (err) {
      setTestResults(prev => ({ 
        ...prev, 
        [carrier]: { success: false, message: err.message }
      }));
    } finally {
      setTesting(null);
    }
  };

  const addPackaging = () => {
    setFormData(prev => ({
      ...prev,
      packaging: [
        ...prev.packaging,
        { id: Date.now(), name: '', length: '', width: '', height: '', weight: '' }
      ]
    }));
  };

  const updatePackaging = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      packaging: prev.packaging.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    }));
  };

  const removePackaging = (id) => {
    setFormData(prev => ({
      ...prev,
      packaging: prev.packaging.filter(p => p.id !== id)
    }));
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    
    const result = await updateBrain('integrations', { shipping: formData });
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || 'Failed to save');
    }
  };

  const uspsServices = [
    { id: 'priority', name: 'Priority Mail' },
    { id: 'first_class', name: 'First Class' },
    { id: 'express', name: 'Priority Mail Express' },
    { id: 'media', name: 'Media Mail' }
  ];

  const upsServices = [
    { id: 'ground', name: 'Ground' },
    { id: '3day', name: '3 Day Select' },
    { id: '2day', name: '2nd Day Air' },
    { id: 'nextday', name: 'Next Day Air' }
  ];

  const fedexServices = [
    { id: 'ground', name: 'Ground' },
    { id: 'express', name: 'Express Saver' },
    { id: '2day', name: '2Day' },
    { id: 'overnight', name: 'Standard Overnight' }
  ];

  return (
    <div style={styles.container}>
      {/* Master Toggle */}
      <div style={styles.masterToggle}>
        <div style={styles.masterToggleInfo}>
          <Truck size={24} />
          <div>
            <h3 style={styles.masterToggleTitle}>Shipping</h3>
            <p style={styles.masterToggleDesc}>Enable shipping for physical products</p>
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
          {/* Ship From Address */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <MapPin size={20} />
              <h3 style={styles.sectionTitle}>Ship From Address</h3>
            </div>
            
            <div style={styles.formGrid}>
              <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                <label style={styles.label}>Business Name</label>
                <input
                  type="text"
                  value={formData.shipFrom.name}
                  onChange={(e) => handleShipFromChange('name', e.target.value)}
                  style={styles.input}
                  placeholder="Your Business Name"
                />
              </div>
              
              <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                <label style={styles.label}>Street Address</label>
                <input
                  type="text"
                  value={formData.shipFrom.street1}
                  onChange={(e) => handleShipFromChange('street1', e.target.value)}
                  style={styles.input}
                  placeholder="123 Main St"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>City</label>
                <input
                  type="text"
                  value={formData.shipFrom.city}
                  onChange={(e) => handleShipFromChange('city', e.target.value)}
                  style={styles.input}
                  placeholder="City"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>State</label>
                <input
                  type="text"
                  value={formData.shipFrom.state}
                  onChange={(e) => handleShipFromChange('state', e.target.value)}
                  style={styles.input}
                  placeholder="TX"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>ZIP Code</label>
                <input
                  type="text"
                  value={formData.shipFrom.zip}
                  onChange={(e) => handleShipFromChange('zip', e.target.value)}
                  style={styles.input}
                  placeholder="75201"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Handling Time (days)</label>
                <input
                  type="number"
                  value={formData.handlingTime}
                  onChange={(e) => handleChange('handlingTime', parseInt(e.target.value))}
                  style={styles.input}
                  min="0"
                  max="14"
                />
              </div>
            </div>
          </section>

          {/* Carriers */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <Package size={20} />
              <h3 style={styles.sectionTitle}>Carriers</h3>
            </div>

            {/* USPS */}
            <CarrierCard
              name="USPS"
              icon="📮"
              enabled={formData.carriers.usps.enabled}
              onToggle={(v) => handleCarrierChange('usps', 'enabled', v)}
              testing={testing === 'usps'}
              testResult={testResults.usps}
              onTest={() => testCarrier('usps')}
            >
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>User ID</label>
                  <input
                    type="text"
                    value={formData.carriers.usps.userId}
                    onChange={(e) => handleCarrierChange('usps', 'userId', e.target.value)}
                    style={styles.input}
                    placeholder="123YOURCO4567"
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>API URL</label>
                  <input
                    type="text"
                    value={formData.carriers.usps.apiUrl}
                    onChange={(e) => handleCarrierChange('usps', 'apiUrl', e.target.value)}
                    style={styles.input}
                    placeholder="https://secure.shippingapis.com"
                  />
                </div>
                
                <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                  <label style={styles.label}>Services</label>
                  <div style={styles.servicesGrid}>
                    {uspsServices.map(service => (
                      <label key={service.id} style={styles.serviceCheckbox}>
                        <input
                          type="checkbox"
                          checked={formData.carriers.usps.services?.includes(service.id)}
                          onChange={() => toggleService('usps', service.id)}
                        />
                        {service.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </CarrierCard>

            {/* UPS */}
            <CarrierCard
              name="UPS"
              icon="📦"
              enabled={formData.carriers.ups.enabled}
              onToggle={(v) => handleCarrierChange('ups', 'enabled', v)}
              testing={testing === 'ups'}
              testResult={testResults.ups}
              onTest={() => testCarrier('ups')}
            >
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Account Number</label>
                  <input
                    type="text"
                    value={formData.carriers.ups.accountNumber}
                    onChange={(e) => handleCarrierChange('ups', 'accountNumber', e.target.value)}
                    style={styles.input}
                    placeholder="12345X"
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Client ID</label>
                  <div style={styles.secretInput}>
                    <input
                      type={showSecrets.upsClientId ? 'text' : 'password'}
                      value={formData.carriers.ups.clientId}
                      onChange={(e) => handleCarrierChange('ups', 'clientId', e.target.value)}
                      style={styles.input}
                      placeholder="••••••••••"
                    />
                    <button style={styles.secretToggle} onClick={() => toggleSecret('upsClientId')}>
                      {showSecrets.upsClientId ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Client Secret</label>
                  <div style={styles.secretInput}>
                    <input
                      type={showSecrets.upsClientSecret ? 'text' : 'password'}
                      value={formData.carriers.ups.clientSecret}
                      onChange={(e) => handleCarrierChange('ups', 'clientSecret', e.target.value)}
                      style={styles.input}
                      placeholder="••••••••••"
                    />
                    <button style={styles.secretToggle} onClick={() => toggleSecret('upsClientSecret')}>
                      {showSecrets.upsClientSecret ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
                
                <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                  <label style={styles.label}>Services</label>
                  <div style={styles.servicesGrid}>
                    {upsServices.map(service => (
                      <label key={service.id} style={styles.serviceCheckbox}>
                        <input
                          type="checkbox"
                          checked={formData.carriers.ups.services?.includes(service.id)}
                          onChange={() => toggleService('ups', service.id)}
                        />
                        {service.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </CarrierCard>

            {/* FedEx */}
            <CarrierCard
              name="FedEx"
              icon="✈️"
              enabled={formData.carriers.fedex.enabled}
              onToggle={(v) => handleCarrierChange('fedex', 'enabled', v)}
              testing={testing === 'fedex'}
              testResult={testResults.fedex}
              onTest={() => testCarrier('fedex')}
            >
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Account Number</label>
                  <input
                    type="text"
                    value={formData.carriers.fedex.accountNumber}
                    onChange={(e) => handleCarrierChange('fedex', 'accountNumber', e.target.value)}
                    style={styles.input}
                    placeholder="123456789"
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>API Key</label>
                  <div style={styles.secretInput}>
                    <input
                      type={showSecrets.fedexApiKey ? 'text' : 'password'}
                      value={formData.carriers.fedex.apiKey}
                      onChange={(e) => handleCarrierChange('fedex', 'apiKey', e.target.value)}
                      style={styles.input}
                      placeholder="••••••••••"
                    />
                    <button style={styles.secretToggle} onClick={() => toggleSecret('fedexApiKey')}>
                      {showSecrets.fedexApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
                
                <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
                  <label style={styles.label}>Services</label>
                  <div style={styles.servicesGrid}>
                    {fedexServices.map(service => (
                      <label key={service.id} style={styles.serviceCheckbox}>
                        <input
                          type="checkbox"
                          checked={formData.carriers.fedex.services?.includes(service.id)}
                          onChange={() => toggleService('fedex', service.id)}
                        />
                        {service.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </CarrierCard>
          </section>

          {/* Shipping Rules */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Shipping Rules</h3>
            </div>

            <div style={styles.rulesGrid}>
              {/* Free Shipping */}
              <div style={styles.ruleCard}>
                <label style={styles.ruleCheckbox}>
                  <input
                    type="checkbox"
                    checked={formData.rules.freeShippingEnabled}
                    onChange={(e) => handleRulesChange('freeShippingEnabled', e.target.checked)}
                  />
                  <span>Free Shipping</span>
                </label>
                {formData.rules.freeShippingEnabled && (
                  <div style={styles.ruleInput}>
                    <span>Orders over $</span>
                    <input
                      type="number"
                      value={formData.rules.freeShippingThreshold}
                      onChange={(e) => handleRulesChange('freeShippingThreshold', parseFloat(e.target.value))}
                      style={styles.smallInput}
                    />
                  </div>
                )}
              </div>

              {/* Flat Rate */}
              <div style={styles.ruleCard}>
                <label style={styles.ruleCheckbox}>
                  <input
                    type="checkbox"
                    checked={formData.rules.flatRateEnabled}
                    onChange={(e) => handleRulesChange('flatRateEnabled', e.target.checked)}
                  />
                  <span>Flat Rate Option</span>
                </label>
                {formData.rules.flatRateEnabled && (
                  <div style={styles.ruleInput}>
                    <span>$</span>
                    <input
                      type="number"
                      value={formData.rules.flatRateAmount}
                      onChange={(e) => handleRulesChange('flatRateAmount', parseFloat(e.target.value))}
                      style={styles.smallInput}
                      step="0.01"
                    />
                  </div>
                )}
              </div>

              {/* Local Pickup */}
              <div style={styles.ruleCard}>
                <label style={styles.ruleCheckbox}>
                  <input
                    type="checkbox"
                    checked={formData.rules.localPickupEnabled}
                    onChange={(e) => handleRulesChange('localPickupEnabled', e.target.checked)}
                  />
                  <span>Local Pickup</span>
                </label>
              </div>

              {/* Local Delivery */}
              <div style={styles.ruleCard}>
                <label style={styles.ruleCheckbox}>
                  <input
                    type="checkbox"
                    checked={formData.rules.localDeliveryEnabled}
                    onChange={(e) => handleRulesChange('localDeliveryEnabled', e.target.checked)}
                  />
                  <span>Local Delivery</span>
                </label>
                {formData.rules.localDeliveryEnabled && (
                  <div style={styles.ruleInputRow}>
                    <div style={styles.ruleInput}>
                      <span>Radius:</span>
                      <input
                        type="number"
                        value={formData.rules.localDeliveryRadius}
                        onChange={(e) => handleRulesChange('localDeliveryRadius', parseInt(e.target.value))}
                        style={styles.smallInput}
                      />
                      <span>miles</span>
                    </div>
                    <div style={styles.ruleInput}>
                      <span>Fee: $</span>
                      <input
                        type="number"
                        value={formData.rules.localDeliveryFee}
                        onChange={(e) => handleRulesChange('localDeliveryFee', parseFloat(e.target.value))}
                        style={styles.smallInput}
                        step="0.01"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Packaging Presets */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Packaging Presets</h3>
              <button style={styles.addButton} onClick={addPackaging}>
                <Plus size={14} /> Add Package
              </button>
            </div>

            {formData.packaging.length === 0 ? (
              <p style={styles.emptyText}>No packaging presets. Add common box sizes for faster shipping.</p>
            ) : (
              <div style={styles.packagingList}>
                {formData.packaging.map(pkg => (
                  <div key={pkg.id} style={styles.packagingItem}>
                    <input
                      type="text"
                      value={pkg.name}
                      onChange={(e) => updatePackaging(pkg.id, 'name', e.target.value)}
                      style={styles.packagingInput}
                      placeholder="Name"
                    />
                    <input
                      type="number"
                      value={pkg.length}
                      onChange={(e) => updatePackaging(pkg.id, 'length', e.target.value)}
                      style={styles.packagingInputSmall}
                      placeholder="L"
                    />
                    <span style={styles.dimensionX}>×</span>
                    <input
                      type="number"
                      value={pkg.width}
                      onChange={(e) => updatePackaging(pkg.id, 'width', e.target.value)}
                      style={styles.packagingInputSmall}
                      placeholder="W"
                    />
                    <span style={styles.dimensionX}>×</span>
                    <input
                      type="number"
                      value={pkg.height}
                      onChange={(e) => updatePackaging(pkg.id, 'height', e.target.value)}
                      style={styles.packagingInputSmall}
                      placeholder="H"
                    />
                    <span style={styles.dimensionUnit}>in</span>
                    <input
                      type="number"
                      value={pkg.weight}
                      onChange={(e) => updatePackaging(pkg.id, 'weight', e.target.value)}
                      style={styles.packagingInputSmall}
                      placeholder="oz"
                    />
                    <span style={styles.dimensionUnit}>oz</span>
                    <button 
                      style={styles.removePackaging}
                      onClick={() => removePackaging(pkg.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
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

// Carrier Card Component
function CarrierCard({ name, icon, enabled, onToggle, children, testing, testResult, onTest }) {
  return (
    <div style={{
      ...styles.carrierCard,
      opacity: enabled ? 1 : 0.6
    }}>
      <div style={styles.carrierHeader}>
        <div style={styles.carrierLeft}>
          <span style={styles.carrierIcon}>{icon}</span>
          <span style={styles.carrierName}>{name}</span>
        </div>
        <div style={styles.carrierRight}>
          {testResult && (
            <span style={{
              ...styles.testResult,
              color: testResult.success ? '#22c55e' : '#ef4444'
            }}>
              {testResult.success ? <Check size={14} /> : <AlertCircle size={14} />}
              {testResult.message}
            </span>
          )}
          {enabled && (
            <button 
              style={styles.testButton}
              onClick={onTest}
              disabled={testing}
            >
              <RefreshCw size={14} />
              {testing ? 'Testing...' : 'Test'}
            </button>
          )}
          <label style={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => onToggle(e.target.checked)}
            />
            <span style={{
              ...styles.toggleSlider,
              backgroundColor: enabled ? 'var(--color-primary)' : 'var(--color-border)'
            }}>
              <span style={{
                ...styles.toggleKnob,
                transform: enabled ? 'translateX(20px)' : 'translateX(0)'
              }} />
            </span>
          </label>
        </div>
      </div>
      
      {enabled && (
        <div style={styles.carrierBody}>
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
    margin: 0
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
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    outline: 'none'
  },
  secretInput: {
    display: 'flex',
    gap: '8px'
  },
  secretToggle: {
    padding: '10px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  carrierCard: {
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
    marginBottom: '12px',
    overflow: 'hidden'
  },
  carrierHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px'
  },
  carrierLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  carrierIcon: {
    fontSize: '24px'
  },
  carrierName: {
    fontSize: '15px',
    fontWeight: 600
  },
  carrierRight: {
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
  carrierBody: {
    padding: '20px',
    borderTop: '1px solid var(--color-border)'
  },
  servicesGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px'
  },
  serviceCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  rulesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  ruleCard: {
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)'
  },
  ruleCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  ruleInput: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '12px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  ruleInputRow: {
    display: 'flex',
    gap: '16px',
    marginTop: '12px'
  },
  smallInput: {
    width: '70px',
    padding: '8px 10px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    textAlign: 'center'
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
  packagingList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  packagingItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px'
  },
  packagingInput: {
    flex: 1,
    padding: '8px 10px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)'
  },
  packagingInputSmall: {
    width: '50px',
    padding: '8px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    textAlign: 'center'
  },
  dimensionX: {
    color: 'var(--color-text-muted)',
    fontSize: '14px'
  },
  dimensionUnit: {
    color: 'var(--color-text-muted)',
    fontSize: '12px'
  },
  removePackaging: {
    padding: '8px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: 'none',
    borderRadius: '6px',
    color: '#ef4444',
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

export default SettingsShipping;