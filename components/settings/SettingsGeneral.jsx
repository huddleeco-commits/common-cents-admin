/**
 * SettingsGeneral
 * 
 * General business information settings.
 * Name, address, hours, contact info.
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Save, Check, AlertCircle } from 'lucide-react';
import { useBrain } from '../../hooks/useBrain';

export function SettingsGeneral() {
  const { business } = useOutletContext();
  const { brain, updateBrain, saving } = useBrain();
  
  const [formData, setFormData] = useState({
    name: '',
    legalName: '',
    tagline: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
      country: 'USA'
    },
    hours: {
      monday: { open: '09:00', close: '17:00', closed: false },
      tuesday: { open: '09:00', close: '17:00', closed: false },
      wednesday: { open: '09:00', close: '17:00', closed: false },
      thursday: { open: '09:00', close: '17:00', closed: false },
      friday: { open: '09:00', close: '17:00', closed: false },
      saturday: { open: '10:00', close: '14:00', closed: false },
      sunday: { open: '', close: '', closed: true }
    }
  });
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Load data from brain
  useEffect(() => {
    if (brain?.business) {
      setFormData(prev => ({
        ...prev,
        ...brain.business,
        address: { ...prev.address, ...brain.business.address },
        hours: { ...prev.hours, ...brain.business.hours }
      }));
    }
  }, [brain]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handleHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: {
          ...prev.hours[day],
          [field]: field === 'closed' ? value : value
        }
      }
    }));
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    
    const result = await updateBrain('business', formData);
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || 'Failed to save');
    }
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div style={styles.container}>
      {/* Business Information */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Business Information</h3>
        
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Business Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              style={styles.input}
              placeholder="Your Business Name"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Legal Name</label>
            <input
              type="text"
              value={formData.legalName}
              onChange={(e) => handleChange('legalName', e.target.value)}
              style={styles.input}
              placeholder="Legal Entity Name LLC"
            />
          </div>
          
          <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
            <label style={styles.label}>Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              style={styles.input}
              placeholder="A short catchy tagline"
            />
          </div>
          
          <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
            <label style={styles.label}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              style={styles.textarea}
              placeholder="Tell customers about your business..."
              rows={4}
            />
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Contact Information</h3>
        
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              style={styles.input}
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              style={styles.input}
              placeholder="contact@business.com"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              style={styles.input}
              placeholder="https://yourbusiness.com"
            />
          </div>
        </div>
      </section>

      {/* Address */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Address</h3>
        
        <div style={styles.formGrid}>
          <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
            <label style={styles.label}>Street Address</label>
            <input
              type="text"
              value={formData.address.street1}
              onChange={(e) => handleAddressChange('street1', e.target.value)}
              style={styles.input}
              placeholder="123 Main Street"
            />
          </div>
          
          <div style={{ ...styles.formGroup, gridColumn: '1 / -1' }}>
            <label style={styles.label}>Street Address 2</label>
            <input
              type="text"
              value={formData.address.street2}
              onChange={(e) => handleAddressChange('street2', e.target.value)}
              style={styles.input}
              placeholder="Suite 100"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>City</label>
            <input
              type="text"
              value={formData.address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              style={styles.input}
              placeholder="City"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>State / Province</label>
            <input
              type="text"
              value={formData.address.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              style={styles.input}
              placeholder="State"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>ZIP / Postal Code</label>
            <input
              type="text"
              value={formData.address.zip}
              onChange={(e) => handleAddressChange('zip', e.target.value)}
              style={styles.input}
              placeholder="12345"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Country</label>
            <select
              value={formData.address.country}
              onChange={(e) => handleAddressChange('country', e.target.value)}
              style={styles.select}
            >
              <option value="USA">United States</option>
              <option value="CAN">Canada</option>
              <option value="MEX">Mexico</option>
              <option value="GBR">United Kingdom</option>
              <option value="AUS">Australia</option>
            </select>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Business Hours</h3>
        
        <div style={styles.hoursGrid}>
          {days.map(day => (
            <div key={day} style={styles.hoursRow}>
              <span style={styles.dayLabel}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </span>
              
              <label style={styles.closedLabel}>
                <input
                  type="checkbox"
                  checked={formData.hours[day]?.closed}
                  onChange={(e) => handleHoursChange(day, 'closed', e.target.checked)}
                  style={styles.checkbox}
                />
                Closed
              </label>
              
              {!formData.hours[day]?.closed && (
                <>
                  <input
                    type="time"
                    value={formData.hours[day]?.open || ''}
                    onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                    style={styles.timeInput}
                  />
                  <span style={styles.timeSeparator}>to</span>
                  <input
                    type="time"
                    value={formData.hours[day]?.close || ''}
                    onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                    style={styles.timeInput}
                  />
                </>
              )}
            </div>
          ))}
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
    gap: '32px'
  },
  section: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    padding: '24px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 20px 0'
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
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  textarea: {
    padding: '12px 14px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  select: {
    padding: '12px 14px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    outline: 'none',
    cursor: 'pointer'
  },
  hoursGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  hoursRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px'
  },
  dayLabel: {
    width: '100px',
    fontSize: '14px',
    fontWeight: 500
  },
  closedLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    width: '80px'
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  timeInput: {
    padding: '8px 12px',
    fontSize: '14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    outline: 'none'
  },
  timeSeparator: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
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

export default SettingsGeneral;