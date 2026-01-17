/**
 * OrderActions
 * 
 * Bulk actions bar that appears when orders are selected.
 * - Update status in bulk
 * - Print multiple orders
 * - Export selected
 * - Send notifications
 * - Delete/archive
 * 
 * Sticky bar at bottom of screen.
 */

import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Printer,
  Download,
  Mail,
  Trash2,
  Archive,
  ChevronDown,
  AlertTriangle
} from 'lucide-react';

export function OrderActions({ selectedCount, onClearSelection, onBulkAction }) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const statusOptions = [
    { value: 'pending', label: 'Mark Pending', icon: Clock, color: '#eab308' },
    { value: 'processing', label: 'Mark Processing', icon: Clock, color: '#3b82f6' },
    { value: 'completed', label: 'Mark Completed', icon: CheckCircle, color: '#22c55e' },
    { value: 'cancelled', label: 'Mark Cancelled', icon: XCircle, color: '#ef4444' }
  ];

  const handleStatusChange = (status) => {
    onBulkAction({ type: 'updateStatus', status });
    setShowStatusMenu(false);
  };

  const handlePrint = () => {
    onBulkAction({ type: 'print' });
  };

  const handleExport = () => {
    onBulkAction({ type: 'export' });
  };

  const handleEmail = () => {
    onBulkAction({ type: 'email' });
  };

  const handleArchive = () => {
    onBulkAction({ type: 'archive' });
  };

  const handleDelete = () => {
    onBulkAction({ type: 'delete' });
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.inner}>
          {/* Selection Info */}
          <div style={styles.selectionInfo}>
            <div style={styles.selectedCount}>
              <CheckCircle size={18} />
              <span>{selectedCount} selected</span>
            </div>
            <button style={styles.clearButton} onClick={onClearSelection}>
              <X size={14} />
              Clear
            </button>
          </div>

          {/* Divider */}
          <div style={styles.divider} />

          {/* Actions */}
          <div style={styles.actions}>
            {/* Status Dropdown */}
            <div style={styles.dropdownContainer}>
              <button 
                style={styles.actionButton}
                onClick={() => setShowStatusMenu(!showStatusMenu)}
              >
                <CheckCircle size={16} />
                Update Status
                <ChevronDown size={14} />
              </button>

              {showStatusMenu && (
                <div style={styles.dropdown}>
                  {statusOptions.map(option => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        style={styles.dropdownItem}
                        onClick={() => handleStatusChange(option.value)}
                      >
                        <Icon size={14} color={option.color} />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Print */}
            <button style={styles.actionButton} onClick={handlePrint}>
              <Printer size={16} />
              Print
            </button>

            {/* Export */}
            <button style={styles.actionButton} onClick={handleExport}>
              <Download size={16} />
              Export
            </button>

            {/* Email */}
            <button style={styles.actionButton} onClick={handleEmail}>
              <Mail size={16} />
              Email Customers
            </button>

            {/* Archive */}
            <button style={styles.actionButton} onClick={handleArchive}>
              <Archive size={16} />
              Archive
            </button>

            {/* Delete */}
            <button 
              style={styles.actionButtonDanger}
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalIcon}>
              <AlertTriangle size={32} color="#ef4444" />
            </div>
            <h3 style={styles.modalTitle}>Delete {selectedCount} Orders?</h3>
            <p style={styles.modalText}>
              This action cannot be undone. All selected orders and their data will be permanently deleted.
            </p>
            <div style={styles.modalActions}>
              <button 
                style={styles.modalCancel}
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                style={styles.modalDelete}
                onClick={handleDelete}
              >
                <Trash2 size={14} />
                Delete Orders
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    animation: 'slideUp 0.3s ease'
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
  },
  selectionInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  selectedCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-primary)'
  },
  clearButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '12px',
    cursor: 'pointer'
  },
  divider: {
    width: '1px',
    height: '32px',
    backgroundColor: 'var(--color-border)'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  dropdownContainer: {
    position: 'relative'
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap'
  },
  actionButtonDanger: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '10px',
    color: '#ef4444',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap'
  },
  dropdown: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    marginBottom: '8px',
    minWidth: '180px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden'
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.2s'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  modal: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '20px',
    padding: '32px',
    textAlign: 'center'
  },
  modalIcon: {
    width: '64px',
    height: '64px',
    margin: '0 auto 20px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 700,
    margin: '0 0 12px 0'
  },
  modalText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '0 0 24px 0',
    lineHeight: 1.6
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center'
  },
  modalCancel: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  modalDelete: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#ef4444',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  }
};

export default OrderActions;