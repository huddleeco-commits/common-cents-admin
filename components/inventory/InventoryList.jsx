/**
 * InventoryList
 * 
 * Full inventory table with powerful features.
 * - Search & filter
 * - Sort by any column
 * - Bulk actions
 * - Quick adjustments
 * - Export options
 * - Multi-select
 * 
 * Works for ANY industry via brain.json config.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Package,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Plus,
  Download,
  Upload,
  Trash2,
  Edit,
  Copy,
  Tag,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpDown,
  SlidersHorizontal,
  Grid,
  List,
  RefreshCw,
  Printer,
  BarChart3,
  Eye,
  Archive
} from 'lucide-react';

export function InventoryList() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [viewMode, setViewMode] = useState('table'); // table, grid
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    location: 'all',
    status: 'all',
    minStock: '',
    maxStock: ''
  });

  // Mock inventory data - varied industries for demonstration
  useEffect(() => {
    setTimeout(() => {
      setItems([
        // Mix of industries to show universality
        { id: 1, sku: 'PRO-001', name: 'Premium Widget', category: 'Widgets', location: 'Warehouse A', quantity: 245, minStock: 50, maxStock: 500, cost: 12.50, price: 24.99, status: 'in_stock', lastUpdated: '2 hrs ago' },
        { id: 2, sku: 'PRO-002', name: 'Standard Widget', category: 'Widgets', location: 'Warehouse A', quantity: 89, minStock: 100, maxStock: 400, cost: 8.00, price: 15.99, status: 'low_stock', lastUpdated: '1 hr ago' },
        { id: 3, sku: 'PRO-003', name: 'Economy Widget', category: 'Widgets', location: 'Warehouse B', quantity: 456, minStock: 75, maxStock: 600, cost: 5.50, price: 9.99, status: 'in_stock', lastUpdated: '3 hrs ago' },
        { id: 4, sku: 'GAD-001', name: 'Smart Gadget Pro', category: 'Gadgets', location: 'Warehouse A', quantity: 0, minStock: 25, maxStock: 200, cost: 45.00, price: 89.99, status: 'out_of_stock', lastUpdated: '1 day ago' },
        { id: 5, sku: 'GAD-002', name: 'Smart Gadget Lite', category: 'Gadgets', location: 'Showroom', quantity: 34, minStock: 20, maxStock: 150, cost: 28.00, price: 49.99, status: 'in_stock', lastUpdated: '5 hrs ago' },
        { id: 6, sku: 'ACC-001', name: 'Universal Adapter', category: 'Accessories', location: 'Warehouse B', quantity: 12, minStock: 50, maxStock: 300, cost: 3.00, price: 7.99, status: 'low_stock', lastUpdated: '2 hrs ago' },
        { id: 7, sku: 'ACC-002', name: 'Premium Cable 6ft', category: 'Accessories', location: 'Warehouse A', quantity: 567, minStock: 100, maxStock: 800, cost: 2.50, price: 12.99, status: 'in_stock', lastUpdated: '30 min ago' },
        { id: 8, sku: 'ACC-003', name: 'Wireless Charger', category: 'Accessories', location: 'Showroom', quantity: 23, minStock: 30, maxStock: 200, cost: 15.00, price: 34.99, status: 'low_stock', lastUpdated: '4 hrs ago' },
        { id: 9, sku: 'SVC-001', name: 'Maintenance Kit', category: 'Service Parts', location: 'Service Dept', quantity: 45, minStock: 20, maxStock: 100, cost: 22.00, price: 44.99, status: 'in_stock', lastUpdated: '1 day ago' },
        { id: 10, sku: 'SVC-002', name: 'Replacement Screen', category: 'Service Parts', location: 'Service Dept', quantity: 8, minStock: 15, maxStock: 75, cost: 65.00, price: 129.99, status: 'low_stock', lastUpdated: '6 hrs ago' },
        { id: 11, sku: 'PKG-001', name: 'Gift Box Set', category: 'Packaging', location: 'Warehouse B', quantity: 234, minStock: 50, maxStock: 400, cost: 4.00, price: 0, status: 'in_stock', lastUpdated: '2 days ago' },
        { id: 12, sku: 'PKG-002', name: 'Premium Bag Large', category: 'Packaging', location: 'Warehouse B', quantity: 0, minStock: 100, maxStock: 500, cost: 1.50, price: 0, status: 'out_of_stock', lastUpdated: '3 days ago' },
        { id: 13, sku: 'ELE-001', name: 'Power Supply 500W', category: 'Electronics', location: 'Warehouse A', quantity: 67, minStock: 25, maxStock: 150, cost: 35.00, price: 69.99, status: 'in_stock', lastUpdated: '8 hrs ago' },
        { id: 14, sku: 'ELE-002', name: 'LED Display Panel', category: 'Electronics', location: 'Warehouse A', quantity: 19, minStock: 20, maxStock: 100, cost: 120.00, price: 249.99, status: 'low_stock', lastUpdated: '12 hrs ago' },
        { id: 15, sku: 'ELE-003', name: 'Cooling Fan Set', category: 'Electronics', location: 'Service Dept', quantity: 156, minStock: 40, maxStock: 250, cost: 18.00, price: 39.99, status: 'in_stock', lastUpdated: '1 hr ago' }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // Get unique values for filters
  const categories = useMemo(() => {
    const cats = [...new Set(items.map(item => item.category))];
    return cats.sort();
  }, [items]);

  const locations = useMemo(() => {
    const locs = [...new Set(items.map(item => item.location))];
    return locs.sort();
  }, [items]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(item => item.category === filters.category);
    }

    // Location filter
    if (filters.location !== 'all') {
      result = result.filter(item => item.location === filters.location);
    }

    // Status filter
    if (filters.status !== 'all') {
      result = result.filter(item => item.status === filters.status);
    }

    // Min stock filter
    if (filters.minStock !== '') {
      result = result.filter(item => item.quantity >= parseInt(filters.minStock));
    }

    // Max stock filter
    if (filters.maxStock !== '') {
      result = result.filter(item => item.quantity <= parseInt(filters.maxStock));
    }

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return result;
  }, [items, searchQuery, filters, sortField, sortDirection]);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  // Handle select item
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      category: 'all',
      location: 'all',
      status: 'all',
      minStock: '',
      maxStock: ''
    });
    setSearchQuery('');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in_stock':
        return { label: 'In Stock', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' };
      case 'low_stock':
        return { label: 'Low Stock', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' };
      case 'out_of_stock':
        return { label: 'Out of Stock', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' };
      default:
        return { label: status, color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' };
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <ArrowUpDown size={14} color="var(--color-text-muted)" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp size={14} color="var(--color-primary)" />
      : <ChevronDown size={14} color="var(--color-primary)" />;
  };

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const inStock = filteredItems.filter(i => i.status === 'in_stock').length;
    const lowStock = filteredItems.filter(i => i.status === 'low_stock').length;
    const outOfStock = filteredItems.filter(i => i.status === 'out_of_stock').length;
    const totalValue = filteredItems.reduce((sum, i) => sum + (i.quantity * i.cost), 0);
    const totalRetail = filteredItems.reduce((sum, i) => sum + (i.quantity * i.price), 0);
    
    return { inStock, lowStock, outOfStock, totalValue, totalRetail };
  }, [filteredItems]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite' }} />
        <p>Loading inventory...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Inventory Items</h1>
          <span style={styles.subtitle}>
            {filteredItems.length} of {items.length} items
          </span>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.actionBtn}>
            <Upload size={16} />
            Import
          </button>
          <button style={styles.actionBtn}>
            <Download size={16} />
            Export
          </button>
          <button style={styles.primaryBtn}>
            <Plus size={16} />
            Add Item
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={styles.quickStats}>
        <div style={styles.quickStat}>
          <CheckCircle size={16} color="#22c55e" />
          <span>{summaryStats.inStock} In Stock</span>
        </div>
        <div style={styles.quickStat}>
          <AlertTriangle size={16} color="#f59e0b" />
          <span>{summaryStats.lowStock} Low Stock</span>
        </div>
        <div style={styles.quickStat}>
          <XCircle size={16} color="#ef4444" />
          <span>{summaryStats.outOfStock} Out of Stock</span>
        </div>
        <div style={styles.divider} />
        <div style={styles.quickStat}>
          <span style={styles.statLabel}>Total Cost Value:</span>
          <span style={styles.statValue}>{formatCurrency(summaryStats.totalValue)}</span>
        </div>
        <div style={styles.quickStat}>
          <span style={styles.statLabel}>Total Retail Value:</span>
          <span style={styles.statValue}>{formatCurrency(summaryStats.totalRetail)}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchBox}>
          <Search size={18} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search by name, SKU, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.toolbarRight}>
          <button
            style={{
              ...styles.filterBtn,
              ...(showFilters ? styles.filterBtnActive : {})
            }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={16} />
            Filters
            {Object.values(filters).some(f => f !== 'all' && f !== '') && (
              <span style={styles.filterBadge}>
                {Object.values(filters).filter(f => f !== 'all' && f !== '').length}
              </span>
            )}
          </button>

          <div style={styles.viewToggle}>
            <button
              style={{
                ...styles.viewBtn,
                ...(viewMode === 'table' ? styles.viewBtnActive : {})
              }}
              onClick={() => setViewMode('table')}
            >
              <List size={16} />
            </button>
            <button
              style={{
                ...styles.viewBtn,
                ...(viewMode === 'grid' ? styles.viewBtnActive : {})
              }}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div style={styles.filtersPanel}>
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              style={styles.filterSelect}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Location</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              style={styles.filterSelect}
            >
              <option value="all">All Locations</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              style={styles.filterSelect}
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Stock Range</label>
            <div style={styles.rangeInputs}>
              <input
                type="number"
                placeholder="Min"
                value={filters.minStock}
                onChange={(e) => setFilters({ ...filters, minStock: e.target.value })}
                style={styles.rangeInput}
              />
              <span style={styles.rangeSeparator}>to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxStock}
                onChange={(e) => setFilters({ ...filters, maxStock: e.target.value })}
                style={styles.rangeInput}
              />
            </div>
          </div>

          <button style={styles.clearFiltersBtn} onClick={clearFilters}>
            Clear All
          </button>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div style={styles.bulkActions}>
          <span style={styles.selectedCount}>
            {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
          </span>
          <div style={styles.bulkButtons}>
            <button style={styles.bulkBtn}>
              <Edit size={14} />
              Edit
            </button>
            <button style={styles.bulkBtn}>
              <Tag size={14} />
              Update Category
            </button>
            <button style={styles.bulkBtn}>
              <MapPin size={14} />
              Move Location
            </button>
            <button style={styles.bulkBtn}>
              <Printer size={14} />
              Print Labels
            </button>
            <button style={styles.bulkBtn}>
              <Archive size={14} />
              Archive
            </button>
            <button style={{...styles.bulkBtn, ...styles.bulkBtnDanger}}>
              <Trash2 size={14} />
              Delete
            </button>
          </div>
          <button
            style={styles.clearSelectionBtn}
            onClick={() => setSelectedItems([])}
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={handleSelectAll}
                    style={styles.checkbox}
                  />
                </th>
                <th style={styles.th} onClick={() => handleSort('sku')}>
                  <div style={styles.thContent}>
                    SKU {getSortIcon('sku')}
                  </div>
                </th>
                <th style={styles.th} onClick={() => handleSort('name')}>
                  <div style={styles.thContent}>
                    Name {getSortIcon('name')}
                  </div>
                </th>
                <th style={styles.th} onClick={() => handleSort('category')}>
                  <div style={styles.thContent}>
                    Category {getSortIcon('category')}
                  </div>
                </th>
                <th style={styles.th} onClick={() => handleSort('location')}>
                  <div style={styles.thContent}>
                    Location {getSortIcon('location')}
                  </div>
                </th>
                <th style={styles.th} onClick={() => handleSort('quantity')}>
                  <div style={styles.thContent}>
                    Qty {getSortIcon('quantity')}
                  </div>
                </th>
                <th style={styles.th} onClick={() => handleSort('cost')}>
                  <div style={styles.thContent}>
                    Cost {getSortIcon('cost')}
                  </div>
                </th>
                <th style={styles.th} onClick={() => handleSort('price')}>
                  <div style={styles.thContent}>
                    Price {getSortIcon('price')}
                  </div>
                </th>
                <th style={styles.th} onClick={() => handleSort('status')}>
                  <div style={styles.thContent}>
                    Status {getSortIcon('status')}
                  </div>
                </th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const statusBadge = getStatusBadge(item.status);
                const isSelected = selectedItems.includes(item.id);
                
                return (
                  <tr
                    key={item.id}
                    style={{
                      ...styles.tr,
                      ...(isSelected ? styles.trSelected : {})
                    }}
                  >
                    <td style={styles.checkboxCell}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectItem(item.id)}
                        style={styles.checkbox}
                      />
                    </td>
                    <td style={styles.td}>
                      <span style={styles.sku}>{item.sku}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.itemName}>{item.name}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.category}>{item.category}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.location}>
                        <MapPin size={12} />
                        {item.location}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.quantityCell}>
                        <span style={{
                          ...styles.quantity,
                          color: item.quantity <= item.minStock ? '#ef4444' : 'inherit'
                        }}>
                          {item.quantity}
                        </span>
                        {item.quantity <= item.minStock && (
                          <span style={styles.minStockWarning}>
                            min: {item.minStock}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={styles.td}>
                      {formatCurrency(item.cost)}
                    </td>
                    <td style={styles.td}>
                      {item.price > 0 ? formatCurrency(item.price) : '—'}
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: statusBadge.bg,
                        color: statusBadge.color
                      }}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actions}>
                        <button style={styles.actionIcon} title="View">
                          <Eye size={16} />
                        </button>
                        <button style={styles.actionIcon} title="Edit">
                          <Edit size={16} />
                        </button>
                        <button style={styles.actionIcon} title="More">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div style={styles.gridContainer}>
          {filteredItems.map((item) => {
            const statusBadge = getStatusBadge(item.status);
            const isSelected = selectedItems.includes(item.id);
            
            return (
              <div
                key={item.id}
                style={{
                  ...styles.gridCard,
                  ...(isSelected ? styles.gridCardSelected : {})
                }}
              >
                <div style={styles.gridCardHeader}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectItem(item.id)}
                    style={styles.checkbox}
                  />
                  <span style={styles.gridSku}>{item.sku}</span>
                  <button style={styles.gridMenuBtn}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>
                <div style={styles.gridCardBody}>
                  <h4 style={styles.gridItemName}>{item.name}</h4>
                  <span style={styles.gridCategory}>{item.category}</span>
                </div>
                <div style={styles.gridCardStats}>
                  <div style={styles.gridStat}>
                    <span style={styles.gridStatValue}>{item.quantity}</span>
                    <span style={styles.gridStatLabel}>In Stock</span>
                  </div>
                  <div style={styles.gridStat}>
                    <span style={styles.gridStatValue}>{formatCurrency(item.price)}</span>
                    <span style={styles.gridStatLabel}>Price</span>
                  </div>
                </div>
                <div style={styles.gridCardFooter}>
                  <span style={styles.gridLocation}>
                    <MapPin size={12} />
                    {item.location}
                  </span>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: statusBadge.bg,
                    color: statusBadge.color
                  }}>
                    {statusBadge.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div style={styles.emptyState}>
          <Package size={48} color="var(--color-text-muted)" />
          <h3 style={styles.emptyTitle}>No items found</h3>
          <p style={styles.emptyMessage}>
            {searchQuery || Object.values(filters).some(f => f !== 'all' && f !== '')
              ? 'Try adjusting your search or filters'
              : 'Add your first inventory item to get started'
            }
          </p>
          {(searchQuery || Object.values(filters).some(f => f !== 'all' && f !== '')) && (
            <button style={styles.clearFiltersBtn} onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredItems.length > 0 && (
        <div style={styles.pagination}>
          <span style={styles.paginationInfo}>
            Showing 1-{filteredItems.length} of {filteredItems.length} items
          </span>
          <div style={styles.paginationButtons}>
            <button style={styles.pageBtn} disabled>Previous</button>
            <button style={{...styles.pageBtn, ...styles.pageBtnActive}}>1</button>
            <button style={styles.pageBtn} disabled>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '24px 32px',
    maxWidth: '100%'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    gap: '16px',
    color: 'var(--color-text-muted)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px'
  },
  headerLeft: {},
  title: {
    fontSize: '28px',
    fontWeight: 700,
    margin: '0 0 4px 0'
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  headerActions: {
    display: 'flex',
    gap: '12px'
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  primaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  quickStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '16px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    marginBottom: '20px'
  },
  quickStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  },
  divider: {
    width: '1px',
    height: '24px',
    backgroundColor: 'var(--color-border)'
  },
  statLabel: {
    color: 'var(--color-text-muted)'
  },
  statValue: {
    fontWeight: 600
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    maxWidth: '400px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px'
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
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
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  filterBtnActive: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  filterBadge: {
    padding: '2px 8px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: 700,
    color: 'var(--color-primary)'
  },
  viewToggle: {
    display: 'flex',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  viewBtn: {
    padding: '10px 14px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  viewBtnActive: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  filtersPanel: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '20px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    marginBottom: '16px'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  filterLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)'
  },
  filterSelect: {
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    minWidth: '160px',
    cursor: 'pointer',
    outline: 'none'
  },
  rangeInputs: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  rangeInput: {
    width: '80px',
    padding: '10px 12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  rangeSeparator: {
    color: 'var(--color-text-muted)',
    fontSize: '13px'
  },
  clearFiltersBtn: {
    padding: '10px 16px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  bulkActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 20px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '12px',
    marginBottom: '16px'
  },
  selectedCount: {
    fontWeight: 600,
    color: 'var(--color-primary)'
  },
  bulkButtons: {
    display: 'flex',
    gap: '8px',
    flex: 1
  },
  bulkBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  bulkBtnDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    color: '#ef4444'
  },
  clearSelectionBtn: {
    padding: '8px 14px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  tableContainer: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: 'var(--color-surface-2)'
  },
  th: {
    padding: '14px 16px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    userSelect: 'none'
  },
  thContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  checkboxCell: {
    width: '50px',
    padding: '14px 16px',
    textAlign: 'center'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  tr: {
    borderBottom: '1px solid var(--color-border)',
    transition: 'background-color 0.15s'
  },
  trSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)'
  },
  td: {
    padding: '16px',
    fontSize: '14px'
  },
  sku: {
    fontFamily: 'monospace',
    fontWeight: 600,
    color: 'var(--color-text-muted)'
  },
  itemName: {
    fontWeight: 600
  },
  category: {
    padding: '4px 10px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px',
    fontSize: '12px'
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--color-text-muted)',
    fontSize: '13px'
  },
  quantityCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  quantity: {
    fontWeight: 700,
    fontSize: '16px'
  },
  minStockWarning: {
    fontSize: '10px',
    color: '#ef4444'
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 600
  },
  actions: {
    display: 'flex',
    gap: '8px'
  },
  actionIcon: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  },
  gridCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '20px',
    transition: 'all 0.2s'
  },
  gridCardSelected: {
    borderColor: 'var(--color-primary)',
    backgroundColor: 'rgba(59, 130, 246, 0.05)'
  },
  gridCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  gridSku: {
    flex: 1,
    fontFamily: 'monospace',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  gridMenuBtn: {
    padding: '6px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  gridCardBody: {
    marginBottom: '16px'
  },
  gridItemName: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 4px 0'
  },
  gridCategory: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  gridCardStats: {
    display: 'flex',
    gap: '24px',
    marginBottom: '16px'
  },
  gridStat: {},
  gridStatValue: {
    display: 'block',
    fontSize: '20px',
    fontWeight: 700
  },
  gridStatLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  gridCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid var(--color-border)'
  },
  gridLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: '16px 0 8px 0'
  },
  emptyMessage: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    marginBottom: '20px'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px'
  },
  paginationInfo: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  paginationButtons: {
    display: 'flex',
    gap: '8px'
  },
  pageBtn: {
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  pageBtnActive: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    color: '#ffffff'
  }
};

export default InventoryList;