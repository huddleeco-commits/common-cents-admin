/**
 * AIPreview
 * 
 * Preview modal that shows exactly how changes will appear
 * on the live site BEFORE publishing. Users can:
 * - See side-by-side before/after
 * - Review each change individually
 * - Accept, reject, or modify changes
 * - Publish all or selected changes
 */

import React, { useState } from 'react';
import {
  X,
  Eye,
  Check,
  AlertCircle,
  Monitor,
  Smartphone,
  Tablet,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Send,
  Edit2,
  Trash2,
  Plus,
  DollarSign,
  Image as ImageIcon,
  Type
} from 'lucide-react';

export function AIPreview({ changes, onPublish, onCancel, publishing }) {
  const [viewMode, setViewMode] = useState('desktop'); // desktop, tablet, mobile
  const [activeChange, setActiveChange] = useState(0);
  const [selectedChanges, setSelectedChanges] = useState(
    changes.map((_, i) => i) // All selected by default
  );
  const [showBefore, setShowBefore] = useState(false);

  const toggleChange = (index) => {
    setSelectedChanges(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handlePublish = () => {
    const changesToPublish = changes.filter((_, i) => selectedChanges.includes(i));
    onPublish(changesToPublish);
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'menu': return Plus;
      case 'price': return DollarSign;
      case 'content': return Type;
      case 'image': return ImageIcon;
      default: return Edit2;
    }
  };

  const getChangeColor = (action) => {
    switch (action) {
      case 'add': return '#22c55e';
      case 'update': return '#3b82f6';
      case 'remove': return '#ef4444';
      default: return '#8b5cf6';
    }
  };

  const viewportWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px'
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <Eye size={20} />
            <h2 style={styles.title}>Preview Changes</h2>
            <span style={styles.changeCount}>
              {selectedChanges.length} of {changes.length} selected
            </span>
          </div>
          
          <div style={styles.headerCenter}>
            <div style={styles.viewToggle}>
              <button
                style={{
                  ...styles.viewButton,
                  ...(viewMode === 'desktop' ? styles.viewButtonActive : {})
                }}
                onClick={() => setViewMode('desktop')}
              >
                <Monitor size={16} />
              </button>
              <button
                style={{
                  ...styles.viewButton,
                  ...(viewMode === 'tablet' ? styles.viewButtonActive : {})
                }}
                onClick={() => setViewMode('tablet')}
              >
                <Tablet size={16} />
              </button>
              <button
                style={{
                  ...styles.viewButton,
                  ...(viewMode === 'mobile' ? styles.viewButtonActive : {})
                }}
                onClick={() => setViewMode('mobile')}
              >
                <Smartphone size={16} />
              </button>
            </div>
          </div>
          
          <div style={styles.headerRight}>
            <button style={styles.closeButton} onClick={onCancel}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.content}>
          {/* Changes Sidebar */}
          <div style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
              <h3 style={styles.sidebarTitle}>Changes</h3>
              <button 
                style={styles.selectAllButton}
                onClick={() => setSelectedChanges(
                  selectedChanges.length === changes.length ? [] : changes.map((_, i) => i)
                )}
              >
                {selectedChanges.length === changes.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div style={styles.changesList}>
              {changes.map((change, index) => {
                const Icon = getChangeIcon(change.type);
                const color = getChangeColor(change.action);
                const isSelected = selectedChanges.includes(index);
                const isActive = activeChange === index;

                return (
                  <div
                    key={index}
                    style={{
                      ...styles.changeItem,
                      ...(isActive ? styles.changeItemActive : {}),
                      opacity: isSelected ? 1 : 0.5
                    }}
                    onClick={() => setActiveChange(index)}
                  >
                    <label style={styles.changeCheckbox}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleChange(index);
                        }}
                      />
                      <span style={{
                        ...styles.checkboxCustom,
                        backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
                        borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)'
                      }}>
                        {isSelected && <Check size={12} color="#fff" />}
                      </span>
                    </label>
                    
                    <div style={{
                      ...styles.changeIcon,
                      backgroundColor: `${color}20`,
                      color: color
                    }}>
                      <Icon size={14} />
                    </div>
                    
                    <div style={styles.changeInfo}>
                      <span style={styles.changeName}>{change.item}</span>
                      <span style={styles.changeAction}>
                        {change.action === 'add' && 'Adding new item'}
                        {change.action === 'update' && 'Updating'}
                        {change.action === 'remove' && 'Removing'}
                      </span>
                    </div>
                    
                    {change.price && (
                      <span style={styles.changePrice}>${change.price}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preview Area */}
          <div style={styles.previewArea}>
            {/* Before/After Toggle */}
            <div style={styles.previewHeader}>
              <div style={styles.beforeAfterToggle}>
                <button
                  style={{
                    ...styles.toggleButton,
                    ...(showBefore ? {} : styles.toggleButtonActive)
                  }}
                  onClick={() => setShowBefore(false)}
                >
                  After
                </button>
                <button
                  style={{
                    ...styles.toggleButton,
                    ...(showBefore ? styles.toggleButtonActive : {})
                  }}
                  onClick={() => setShowBefore(true)}
                >
                  Before
                </button>
              </div>

              <div style={styles.previewNav}>
                <button
                  style={styles.navButton}
                  onClick={() => setActiveChange(Math.max(0, activeChange - 1))}
                  disabled={activeChange === 0}
                >
                  <ChevronLeft size={16} />
                </button>
                <span style={styles.navText}>
                  {activeChange + 1} / {changes.length}
                </span>
                <button
                  style={styles.navButton}
                  onClick={() => setActiveChange(Math.min(changes.length - 1, activeChange + 1))}
                  disabled={activeChange === changes.length - 1}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Preview Frame */}
            <div style={styles.previewContainer}>
              <div style={{
                ...styles.previewFrame,
                maxWidth: viewportWidths[viewMode]
              }}>
                {/* Simulated Website Preview */}
                <div style={styles.browserChrome}>
                  <div style={styles.browserDots}>
                    <span style={{ ...styles.browserDot, backgroundColor: '#ef4444' }} />
                    <span style={{ ...styles.browserDot, backgroundColor: '#eab308' }} />
                    <span style={{ ...styles.browserDot, backgroundColor: '#22c55e' }} />
                  </div>
                  <div style={styles.browserUrl}>
                    <span>yoursite.com/menu</span>
                  </div>
                </div>

                <div style={styles.previewContent}>
                  {/* This would be an iframe or rendered preview in production */}
                  <div style={styles.mockWebsite}>
                    <div style={styles.mockHeader}>
                      <span style={styles.mockLogo}>🍔 Your Restaurant</span>
                      <nav style={styles.mockNav}>
                        <span>Home</span>
                        <span style={styles.mockNavActive}>Menu</span>
                        <span>About</span>
                        <span>Contact</span>
                      </nav>
                    </div>

                    <div style={styles.mockSection}>
                      <h2 style={styles.mockSectionTitle}>
                        {showBefore ? 'Our Menu' : '🍂 Fall Specials'}
                      </h2>
                      
                      {!showBefore && (
                        <div style={styles.mockFeaturedBanner}>
                          <span>✨ NEW SEASONAL ITEMS</span>
                        </div>
                      )}

                      <div style={styles.mockMenuGrid}>
                        {/* Existing items */}
                        <div style={styles.mockMenuItem}>
                          <div style={styles.mockItemImage}>🍔</div>
                          <h4>Classic Burger</h4>
                          <p style={styles.mockItemDesc}>Half-pound beef patty with all the fixings</p>
                          <span style={styles.mockItemPrice}>$12.99</span>
                        </div>

                        <div style={styles.mockMenuItem}>
                          <div style={styles.mockItemImage}>🍟</div>
                          <h4>Loaded Fries</h4>
                          <p style={styles.mockItemDesc}>Crispy fries with cheese and bacon</p>
                          <span style={styles.mockItemPrice}>$8.99</span>
                        </div>

                        {/* New items (only shown in "After" view) */}
                        {!showBefore && changes.map((change, i) => (
                          change.action === 'add' && (
                            <div 
                              key={i}
                              style={{
                                ...styles.mockMenuItem,
                                ...styles.mockMenuItemNew,
                                ...(activeChange === i ? styles.mockMenuItemHighlight : {})
                              }}
                            >
                              {activeChange === i && (
                                <div style={styles.newBadge}>NEW</div>
                              )}
                              <div style={styles.mockItemImage}>
                                {change.category === 'Beverages' ? '☕' : '🍔'}
                              </div>
                              <h4>{change.item}</h4>
                              <p style={styles.mockItemDesc}>
                                {change.category === 'Beverages' 
                                  ? 'Seasonal favorite with warm spices'
                                  : 'Limited time special'}
                              </p>
                              <span style={styles.mockItemPrice}>${change.price}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.footerLeft}>
            <AlertCircle size={16} style={{ color: 'var(--color-text-muted)' }} />
            <span style={styles.footerNote}>
              Changes will go live immediately after publishing
            </span>
          </div>
          
          <div style={styles.footerActions}>
            <button style={styles.cancelButton} onClick={onCancel}>
              <RotateCcw size={16} />
              Discard All
            </button>
            <button 
              style={{
                ...styles.publishButton,
                opacity: selectedChanges.length > 0 ? 1 : 0.5
              }}
              onClick={handlePublish}
              disabled={selectedChanges.length === 0 || publishing}
            >
              {publishing ? (
                <>Publishing...</>
              ) : (
                <>
                  <Send size={16} />
                  Publish {selectedChanges.length} Change{selectedChanges.length !== 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    width: '100%',
    maxWidth: '1400px',
    height: '90vh',
    backgroundColor: 'var(--color-background)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    backgroundColor: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0
  },
  changeCount: {
    padding: '4px 12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  headerCenter: {
    display: 'flex',
    alignItems: 'center'
  },
  viewToggle: {
    display: 'flex',
    gap: '4px',
    padding: '4px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px'
  },
  viewButton: {
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  viewButtonActive: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  headerRight: {
    display: 'flex'
  },
  closeButton: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  content: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  sidebar: {
    width: '320px',
    backgroundColor: 'var(--color-surface)',
    borderRight: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column'
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid var(--color-border)'
  },
  sidebarTitle: {
    fontSize: '14px',
    fontWeight: 600,
    margin: 0
  },
  selectAllButton: {
    padding: '6px 12px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text-muted)',
    fontSize: '12px',
    cursor: 'pointer'
  },
  changesList: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px'
  },
  changeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '10px',
    marginBottom: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: 'var(--color-surface-2)'
  },
  changeItemActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid var(--color-primary)'
  },
  changeCheckbox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  checkboxCustom: {
    width: '20px',
    height: '20px',
    borderRadius: '6px',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  changeIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  changeInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  changeName: {
    fontSize: '14px',
    fontWeight: 500
  },
  changeAction: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  changePrice: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#22c55e'
  },
  previewArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  previewHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    backgroundColor: 'var(--color-surface-2)',
    borderBottom: '1px solid var(--color-border)'
  },
  beforeAfterToggle: {
    display: 'flex',
    gap: '4px',
    padding: '4px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '8px'
  },
  toggleButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  toggleButtonActive: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  previewNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  navButton: {
    padding: '8px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    cursor: 'pointer'
  },
  navText: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  previewContainer: {
    flex: 1,
    padding: '24px',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center'
  },
  previewFrame: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)'
  },
  browserChrome: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: '#f1f1f1',
    borderBottom: '1px solid #ddd'
  },
  browserDots: {
    display: 'flex',
    gap: '6px'
  },
  browserDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },
  browserUrl: {
    flex: 1,
    padding: '6px 12px',
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    fontSize: '12px',
    color: '#666'
  },
  previewContent: {
    minHeight: '400px'
  },
  mockWebsite: {
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    color: '#1a1a1a'
  },
  mockHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    borderBottom: '1px solid #eee'
  },
  mockLogo: {
    fontSize: '20px',
    fontWeight: 700
  },
  mockNav: {
    display: 'flex',
    gap: '24px',
    fontSize: '14px',
    color: '#666'
  },
  mockNavActive: {
    color: '#1a1a1a',
    fontWeight: 600
  },
  mockSection: {
    padding: '32px 24px'
  },
  mockSectionTitle: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '24px'
  },
  mockFeaturedBanner: {
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: '#fef3c7',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#92400e',
    marginBottom: '24px'
  },
  mockMenuGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px'
  },
  mockMenuItem: {
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    position: 'relative'
  },
  mockMenuItemNew: {
    backgroundColor: '#f0fdf4',
    border: '2px solid #22c55e'
  },
  mockMenuItemHighlight: {
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)'
  },
  newBadge: {
    position: 'absolute',
    top: '-8px',
    right: '12px',
    padding: '4px 10px',
    backgroundColor: '#22c55e',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: 700,
    color: '#ffffff'
  },
  mockItemImage: {
    fontSize: '40px',
    marginBottom: '12px'
  },
  mockItemDesc: {
    fontSize: '12px',
    color: '#666',
    margin: '8px 0'
  },
  mockItemPrice: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#22c55e'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    backgroundColor: 'var(--color-surface)',
    borderTop: '1px solid var(--color-border)'
  },
  footerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  footerNote: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  footerActions: {
    display: 'flex',
    gap: '12px'
  },
  cancelButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  publishButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#22c55e',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  }
};

export default AIPreview;