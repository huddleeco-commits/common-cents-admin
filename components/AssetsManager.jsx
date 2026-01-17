/**
 * AssetsManager
 * 
 * Full manual UI for uploading and managing all business assets.
 * Images, logos, files - everything editable without AI.
 * Works with or without AI Manager subscription.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Upload,
  Image,
  File,
  Trash2,
  Edit2,
  Download,
  Search,
  Grid,
  List,
  Filter,
  FolderOpen,
  X,
  Check,
  AlertCircle,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useBrain } from '../hooks/useBrain';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function AssetsManager() {
  const { business } = useOutletContext();
  const { brain, updateValue } = useBrain();
  
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [editingAsset, setEditingAsset] = useState(null);
  const [editName, setEditName] = useState('');
  
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Load assets on mount
  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/assets`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to load assets');
      
      const data = await response.json();
      setAssets(data.assets || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle file upload
  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;
    
    setUploading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });
      
      const response = await fetch(`${API_BASE}/assets/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      setAssets(prev => [...data.assets, ...prev]);
      setSuccess(`${files.length} file(s) uploaded successfully`);
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    handleUpload(e.target.files);
    e.target.value = '';
  };

  // Drag and drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current?.classList.add('drag-over');
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current?.classList.remove('drag-over');
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current?.classList.remove('drag-over');
    handleUpload(e.dataTransfer.files);
  }, []);

  // Delete asset
  const handleDelete = async (assetId) => {
    if (!confirm('Are you sure you want to delete this asset?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/assets/${assetId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Delete failed');
      
      setAssets(prev => prev.filter(a => a.id !== assetId));
      setSelectedAsset(null);
      setSuccess('Asset deleted');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Rename asset
  const handleRename = async (assetId, newName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/assets/${assetId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName })
      });
      
      if (!response.ok) throw new Error('Rename failed');
      
      setAssets(prev => prev.map(a => 
        a.id === assetId ? { ...a, name: newName } : a
      ));
      setEditingAsset(null);
      setSuccess('Asset renamed');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Set as logo/hero/etc
  const handleSetAs = async (assetId, type) => {
    try {
      const asset = assets.find(a => a.id === assetId);
      if (!asset) return;
      
      const path = `business.${type}`;
      await updateValue(path, asset.url);
      
      setSuccess(`Set as ${type}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Copy URL
  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setSuccess('URL copied to clipboard');
    setTimeout(() => setSuccess(null), 2000);
  };

  // Filter assets
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || asset.type === filterType;
    return matchesSearch && matchesType;
  });

  // Get file type icon
  const getTypeIcon = (type) => {
    if (type?.startsWith('image')) return <Image size={20} />;
    return <File size={20} />;
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Assets</h1>
          <p style={styles.subtitle}>
            Manage images, logos, and files for {business?.name || 'your business'}
          </p>
        </div>
        <button 
          style={styles.uploadButton}
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <Upload size={18} />
          {uploading ? 'Uploading...' : 'Upload Files'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Alerts */}
      {error && (
        <div style={styles.errorAlert}>
          <AlertCircle size={16} />
          {error}
          <button onClick={() => setError(null)} style={styles.alertClose}>
            <X size={14} />
          </button>
        </div>
      )}
      {success && (
        <div style={styles.successAlert}>
          <Check size={16} />
          {success}
        </div>
      )}

      {/* Drop Zone */}
      <div
        ref={dropZoneRef}
        style={styles.dropZone}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={32} style={{ color: 'var(--color-text-muted)' }} />
        <p style={styles.dropText}>
          Drag and drop files here, or click to browse
        </p>
        <p style={styles.dropSubtext}>
          Supports images, PDFs, and documents
        </p>
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchBox}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        
        <div style={styles.toolbarRight}>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="document">Documents</option>
          </select>
          
          <div style={styles.viewToggle}>
            <button
              style={{
                ...styles.viewButton,
                ...(viewMode === 'grid' ? styles.viewButtonActive : {})
              }}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </button>
            <button
              style={{
                ...styles.viewButton,
                ...(viewMode === 'list' ? styles.viewButtonActive : {})
              }}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Assets Display */}
      {loading ? (
        <div style={styles.loadingState}>Loading assets...</div>
      ) : filteredAssets.length === 0 ? (
        <div style={styles.emptyState}>
          <FolderOpen size={48} style={{ color: 'var(--color-text-muted)' }} />
          <h3 style={styles.emptyTitle}>No assets yet</h3>
          <p style={styles.emptyText}>
            Upload images and files to get started
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div style={styles.assetsGrid}>
          {filteredAssets.map(asset => (
            <AssetCard
              key={asset.id}
              asset={asset}
              isSelected={selectedAsset?.id === asset.id}
              isEditing={editingAsset === asset.id}
              editName={editName}
              onSelect={() => setSelectedAsset(asset)}
              onStartEdit={() => {
                setEditingAsset(asset.id);
                setEditName(asset.name);
              }}
              onCancelEdit={() => setEditingAsset(null)}
              onSaveEdit={() => handleRename(asset.id, editName)}
              onEditNameChange={setEditName}
              onDelete={() => handleDelete(asset.id)}
              onCopyUrl={() => handleCopyUrl(asset.url)}
              onSetAs={(type) => handleSetAs(asset.id, type)}
              getTypeIcon={getTypeIcon}
            />
          ))}
        </div>
      ) : (
        <div style={styles.assetsList}>
          {filteredAssets.map(asset => (
            <AssetRow
              key={asset.id}
              asset={asset}
              isSelected={selectedAsset?.id === asset.id}
              onSelect={() => setSelectedAsset(asset)}
              onDelete={() => handleDelete(asset.id)}
              onCopyUrl={() => handleCopyUrl(asset.url)}
              getTypeIcon={getTypeIcon}
            />
          ))}
        </div>
      )}

      {/* Asset Preview Modal */}
      {selectedAsset && (
        <AssetPreview
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onDelete={() => handleDelete(selectedAsset.id)}
          onCopyUrl={() => handleCopyUrl(selectedAsset.url)}
          onSetAs={(type) => handleSetAs(selectedAsset.id, type)}
        />
      )}
    </div>
  );
}

// Asset Card Component (Grid View)
function AssetCard({ 
  asset, 
  isSelected, 
  isEditing,
  editName,
  onSelect, 
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onEditNameChange,
  onDelete,
  onCopyUrl,
  onSetAs,
  getTypeIcon 
}) {
  const isImage = asset.type?.startsWith('image');
  
  return (
    <div 
      style={{
        ...styles.assetCard,
        ...(isSelected ? styles.assetCardSelected : {})
      }}
      onClick={onSelect}
    >
      <div style={styles.assetPreview}>
        {isImage ? (
          <img src={asset.url} alt={asset.name} style={styles.assetImage} />
        ) : (
          <div style={styles.assetIcon}>
            {getTypeIcon(asset.type)}
          </div>
        )}
      </div>
      
      <div style={styles.assetInfo}>
        {isEditing ? (
          <div style={styles.editNameRow}>
            <input
              type="text"
              value={editName}
              onChange={(e) => onEditNameChange(e.target.value)}
              style={styles.editNameInput}
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); onSaveEdit(); }} style={styles.editSaveBtn}>
              <Check size={14} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onCancelEdit(); }} style={styles.editCancelBtn}>
              <X size={14} />
            </button>
          </div>
        ) : (
          <span style={styles.assetName}>{asset.name}</span>
        )}
        <span style={styles.assetMeta}>
          {asset.size ? `${(asset.size / 1024).toFixed(1)} KB` : ''}
        </span>
      </div>
      
      <div style={styles.assetActions}>
        <button onClick={(e) => { e.stopPropagation(); onStartEdit(); }} style={styles.assetActionBtn}>
          <Edit2 size={14} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onCopyUrl(); }} style={styles.assetActionBtn}>
          <Copy size={14} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} style={styles.assetActionBtnDanger}>
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

// Asset Row Component (List View)
function AssetRow({ asset, isSelected, onSelect, onDelete, onCopyUrl, getTypeIcon }) {
  const isImage = asset.type?.startsWith('image');
  
  return (
    <div 
      style={{
        ...styles.assetRow,
        ...(isSelected ? styles.assetRowSelected : {})
      }}
      onClick={onSelect}
    >
      <div style={styles.assetRowPreview}>
        {isImage ? (
          <img src={asset.url} alt={asset.name} style={styles.assetRowImage} />
        ) : (
          getTypeIcon(asset.type)
        )}
      </div>
      
      <div style={styles.assetRowInfo}>
        <span style={styles.assetRowName}>{asset.name}</span>
        <span style={styles.assetRowMeta}>
          {asset.type} • {asset.size ? `${(asset.size / 1024).toFixed(1)} KB` : ''}
        </span>
      </div>
      
      <div style={styles.assetRowActions}>
        <button onClick={(e) => { e.stopPropagation(); onCopyUrl(); }} style={styles.assetActionBtn}>
          <Copy size={14} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} style={styles.assetActionBtnDanger}>
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

// Asset Preview Modal
function AssetPreview({ asset, onClose, onDelete, onCopyUrl, onSetAs }) {
  const isImage = asset.type?.startsWith('image');
  
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.modalClose} onClick={onClose}>
          <X size={20} />
        </button>
        
        <div style={styles.modalPreview}>
          {isImage ? (
            <img src={asset.url} alt={asset.name} style={styles.modalImage} />
          ) : (
            <div style={styles.modalFileIcon}>
              <File size={64} />
            </div>
          )}
        </div>
        
        <div style={styles.modalInfo}>
          <h3 style={styles.modalTitle}>{asset.name}</h3>
          <p style={styles.modalMeta}>
            {asset.type} • {asset.size ? `${(asset.size / 1024).toFixed(1)} KB` : ''}
          </p>
          
          <div style={styles.modalUrl}>
            <input type="text" value={asset.url} readOnly style={styles.modalUrlInput} />
            <button onClick={onCopyUrl} style={styles.modalUrlCopy}>
              <Copy size={14} />
            </button>
          </div>
          
          {isImage && (
            <div style={styles.setAsButtons}>
              <span style={styles.setAsLabel}>Set as:</span>
              <button onClick={() => onSetAs('logo')} style={styles.setAsButton}>Logo</button>
              <button onClick={() => onSetAs('heroImage')} style={styles.setAsButton}>Hero Image</button>
              <button onClick={() => onSetAs('favicon')} style={styles.setAsButton}>Favicon</button>
            </div>
          )}
          
          <div style={styles.modalActions}>
            <a href={asset.url} download style={styles.modalDownload}>
              <Download size={16} /> Download
            </a>
            <a href={asset.url} target="_blank" rel="noopener noreferrer" style={styles.modalOpen}>
              <ExternalLink size={16} /> Open
            </a>
            <button onClick={onDelete} style={styles.modalDelete}>
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    margin: 0,
    fontFamily: 'var(--font-heading)'
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0'
  },
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid #ef4444',
    borderRadius: '8px',
    color: '#ef4444',
    fontSize: '14px'
  },
  successAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    border: '1px solid #22c55e',
    borderRadius: '8px',
    color: '#22c55e',
    fontSize: '14px'
  },
  alertClose: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer'
  },
  dropZone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: 'var(--color-surface)',
    border: '2px dashed var(--color-border)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  dropText: {
    fontSize: '16px',
    color: 'var(--color-text)',
    margin: '16px 0 4px 0'
  },
  dropSubtext: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: 0
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    flex: 1,
    maxWidth: '300px'
  },
  searchInput: {
    flex: 1,
    background: 'none',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  filterSelect: {
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  viewToggle: {
    display: 'flex',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid var(--color-border)'
  },
  viewButton: {
    padding: '10px 14px',
    background: 'none',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  viewButtonActive: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  loadingState: {
    textAlign: 'center',
    padding: '60px',
    color: 'var(--color-text-muted)'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px',
    textAlign: 'center'
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: '16px 0 8px 0'
  },
  emptyText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: 0
  },
  assetsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '16px'
  },
  assetCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  assetCardSelected: {
    borderColor: 'var(--color-primary)',
    boxShadow: '0 0 0 2px var(--color-primary)'
  },
  assetPreview: {
    width: '100%',
    height: '120px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  assetImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  assetIcon: {
    color: 'var(--color-text-muted)'
  },
  assetInfo: {
    padding: '12px'
  },
  assetName: {
    fontSize: '13px',
    fontWeight: 500,
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  assetMeta: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  assetActions: {
    display: 'flex',
    gap: '4px',
    padding: '0 12px 12px 12px'
  },
  assetActionBtn: {
    padding: '6px',
    background: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '4px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  assetActionBtnDanger: {
    padding: '6px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: 'none',
    borderRadius: '4px',
    color: '#ef4444',
    cursor: 'pointer'
  },
  editNameRow: {
    display: 'flex',
    gap: '4px'
  },
  editNameInput: {
    flex: 1,
    padding: '4px 8px',
    fontSize: '13px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    color: 'var(--color-text)'
  },
  editSaveBtn: {
    padding: '4px',
    background: '#22c55e',
    border: 'none',
    borderRadius: '4px',
    color: '#ffffff',
    cursor: 'pointer'
  },
  editCancelBtn: {
    padding: '4px',
    background: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '4px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  assetsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  assetRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
    cursor: 'pointer'
  },
  assetRowSelected: {
    borderColor: 'var(--color-primary)'
  },
  assetRowPreview: {
    width: '48px',
    height: '48px',
    borderRadius: '6px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  assetRowImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  assetRowInfo: {
    flex: 1
  },
  assetRowName: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500
  },
  assetRowMeta: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  assetRowActions: {
    display: 'flex',
    gap: '8px'
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
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative'
  },
  modalClose: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    padding: '8px',
    background: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text)',
    cursor: 'pointer',
    zIndex: 10
  },
  modalPreview: {
    width: '100%',
    height: '300px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  },
  modalFileIcon: {
    color: 'var(--color-text-muted)'
  },
  modalInfo: {
    padding: '24px'
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: '0 0 4px 0'
  },
  modalMeta: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: '0 0 16px 0'
  },
  modalUrl: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px'
  },
  modalUrlInput: {
    flex: 1,
    padding: '10px 14px',
    fontSize: '12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)'
  },
  modalUrlCopy: {
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    cursor: 'pointer'
  },
  setAsButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  setAsLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  setAsButton: {
    padding: '6px 12px',
    fontSize: '12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    cursor: 'pointer'
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    borderTop: '1px solid var(--color-border)',
    paddingTop: '20px'
  },
  modalDownload: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '13px',
    textDecoration: 'none',
    fontWeight: 500
  },
  modalOpen: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    fontSize: '13px',
    textDecoration: 'none'
  },
  modalDelete: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    color: '#ef4444',
    fontSize: '13px',
    cursor: 'pointer',
    marginLeft: 'auto'
  }
};

export default AssetsManager;