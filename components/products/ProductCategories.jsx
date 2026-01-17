/**
 * ProductCategories
 * 
 * Category & collection management.
 * - Hierarchical categories (parent/child)
 * - Collections (manual & smart)
 * - Drag-drop reordering
 * - Bulk product assignment
 * - Category images & SEO
 * - Performance metrics per category
 * 
 * Organizes products for navigation & filtering.
 */

import React, { useState, useEffect } from 'react';
import {
  Layers,
  FolderTree,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronRight,
  ChevronDown,
  GripVertical,
  Image,
  Package,
  Eye,
  EyeOff,
  Tag,
  Filter,
  Zap,
  Settings,
  ExternalLink,
  Copy,
  Archive,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Check,
  X,
  Move,
  FolderPlus
} from 'lucide-react';

export function ProductCategories() {
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('categories'); // 'categories' or 'collections'
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(['cat-1', 'cat-2']);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setCategories([
        {
          id: 'cat-1',
          name: 'Electronics',
          slug: 'electronics',
          description: 'Gadgets, devices, and tech accessories',
          image: null,
          productCount: 156,
          revenue: 89450,
          status: 'active',
          children: [
            { id: 'cat-1-1', name: 'Audio', slug: 'audio', productCount: 45, revenue: 34200, status: 'active', children: [] },
            { id: 'cat-1-2', name: 'Wearables', slug: 'wearables', productCount: 28, revenue: 28900, status: 'active', children: [] },
            { id: 'cat-1-3', name: 'Smart Home', slug: 'smart-home', productCount: 34, revenue: 18500, status: 'active', children: [] },
            { id: 'cat-1-4', name: 'Accessories', slug: 'electronics-accessories', productCount: 49, revenue: 7850, status: 'active', children: [] }
          ]
        },
        {
          id: 'cat-2',
          name: 'Apparel',
          slug: 'apparel',
          description: 'Clothing and fashion items',
          image: null,
          productCount: 234,
          revenue: 34560,
          status: 'active',
          children: [
            { id: 'cat-2-1', name: 'Men', slug: 'mens', productCount: 89, revenue: 14200, status: 'active', children: [] },
            { id: 'cat-2-2', name: 'Women', slug: 'womens', productCount: 112, revenue: 18900, status: 'active', children: [] },
            { id: 'cat-2-3', name: 'Kids', slug: 'kids', productCount: 33, revenue: 1460, status: 'draft', children: [] }
          ]
        },
        {
          id: 'cat-3',
          name: 'Home & Garden',
          slug: 'home-garden',
          description: 'Everything for your home',
          image: null,
          productCount: 189,
          revenue: 18900,
          status: 'active',
          children: [
            { id: 'cat-3-1', name: 'Kitchen', slug: 'kitchen', productCount: 67, revenue: 8900, status: 'active', children: [] },
            { id: 'cat-3-2', name: 'Decor', slug: 'decor', productCount: 78, revenue: 6200, status: 'active', children: [] },
            { id: 'cat-3-3', name: 'Outdoor', slug: 'outdoor', productCount: 44, revenue: 3800, status: 'active', children: [] }
          ]
        },
        {
          id: 'cat-4',
          name: 'Fitness',
          slug: 'fitness',
          description: 'Sports and exercise equipment',
          image: null,
          productCount: 98,
          revenue: 8970,
          status: 'active',
          children: []
        },
        {
          id: 'cat-5',
          name: 'Accessories',
          slug: 'accessories',
          description: 'Bags, jewelry, and more',
          image: null,
          productCount: 170,
          revenue: 4900,
          status: 'active',
          children: []
        }
      ]);

      setCollections([
        {
          id: 'col-1',
          name: 'Best Sellers',
          slug: 'best-sellers',
          type: 'smart',
          description: 'Top performing products',
          rules: [{ field: 'sales', operator: 'greater_than', value: 100 }],
          productCount: 45,
          revenue: 67800,
          status: 'active',
          image: null
        },
        {
          id: 'col-2',
          name: 'New Arrivals',
          slug: 'new-arrivals',
          type: 'smart',
          description: 'Recently added products',
          rules: [{ field: 'created_at', operator: 'within', value: '30_days' }],
          productCount: 28,
          revenue: 12400,
          status: 'active',
          image: null
        },
        {
          id: 'col-3',
          name: 'Summer Sale',
          slug: 'summer-sale',
          type: 'manual',
          description: 'Hand-picked summer deals',
          productCount: 67,
          revenue: 34500,
          status: 'active',
          image: null
        },
        {
          id: 'col-4',
          name: 'Gift Ideas',
          slug: 'gift-ideas',
          type: 'manual',
          description: 'Perfect gifts for any occasion',
          productCount: 89,
          revenue: 28900,
          status: 'active',
          image: null
        },
        {
          id: 'col-5',
          name: 'Clearance',
          slug: 'clearance',
          type: 'smart',
          description: 'Last chance deals',
          rules: [{ field: 'compare_price', operator: 'exists', value: true }],
          productCount: 34,
          revenue: 8900,
          status: 'active',
          image: null
        },
        {
          id: 'col-6',
          name: 'Holiday 2024',
          slug: 'holiday-2024',
          type: 'manual',
          description: 'Holiday season collection',
          productCount: 0,
          revenue: 0,
          status: 'draft',
          image: null
        }
      ]);

      setLoading(false);
    }, 400);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const toggleCategory = (categoryId) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const getTotalProducts = (category) => {
    let total = category.productCount;
    if (category.children) {
      category.children.forEach(child => {
        total += getTotalProducts(child);
      });
    }
    return total;
  };

  const getTotalRevenue = (category) => {
    let total = category.revenue;
    if (category.children) {
      category.children.forEach(child => {
        total += getTotalRevenue(child);
      });
    }
    return total;
  };

  // Filter categories based on search
  const filterCategories = (cats, query) => {
    if (!query) return cats;
    return cats.filter(cat => {
      const matchesName = cat.name.toLowerCase().includes(query.toLowerCase());
      const hasMatchingChildren = cat.children && filterCategories(cat.children, query).length > 0;
      return matchesName || hasMatchingChildren;
    }).map(cat => ({
      ...cat,
      children: cat.children ? filterCategories(cat.children, query) : []
    }));
  };

  const filteredCategories = filterCategories(categories, searchQuery);
  const filteredCollections = collections.filter(col =>
    col.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategoryTree = (categoryList, depth = 0) => {
    return categoryList.map(category => {
      const isExpanded = expandedCategories.includes(category.id);
      const hasChildren = category.children && category.children.length > 0;
      const isSelected = selectedItem?.id === category.id;

      return (
        <div key={category.id}>
          <div
            style={{
              ...styles.categoryRow,
              paddingLeft: `${24 + depth * 24}px`,
              ...(isSelected ? styles.categoryRowSelected : {})
            }}
            onClick={() => setSelectedItem({ ...category, type: 'category' })}
          >
            <div style={styles.categoryLeft}>
              <GripVertical size={14} color="var(--color-text-muted)" style={{ cursor: 'grab' }} />
              
              {hasChildren ? (
                <button
                  style={styles.expandBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategory(category.id);
                  }}
                >
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              ) : (
                <span style={styles.expandPlaceholder} />
              )}

              <div style={styles.categoryImageThumb}>
                {category.image ? (
                  <img src={category.image} alt="" style={styles.categoryImg} />
                ) : (
                  <FolderTree size={18} color="var(--color-text-muted)" />
                )}
              </div>

              <div style={styles.categoryInfo}>
                <span style={styles.categoryName}>{category.name}</span>
                <span style={styles.categorySlug}>/{category.slug}</span>
              </div>
            </div>

            <div style={styles.categoryRight}>
              <div style={styles.categoryStats}>
                <span style={styles.categoryStat}>
                  <Package size={12} />
                  {formatNumber(hasChildren ? getTotalProducts(category) : category.productCount)}
                </span>
                <span style={styles.categoryStat}>
                  <DollarSign size={12} />
                  {formatCurrency(hasChildren ? getTotalRevenue(category) : category.revenue)}
                </span>
              </div>

              <span style={{
                ...styles.statusBadge,
                backgroundColor: category.status === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                color: category.status === 'active' ? '#22c55e' : '#6b7280'
              }}>
                {category.status}
              </span>

              <div style={styles.categoryActions}>
                <button style={styles.actionIconBtn} title="Edit">
                  <Edit size={14} />
                </button>
                <button style={styles.actionIconBtn} title="Add Subcategory">
                  <FolderPlus size={14} />
                </button>
                <button style={styles.actionIconBtn} title="More">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Children */}
          {hasChildren && isExpanded && (
            <div style={styles.categoryChildren}>
              {renderCategoryTree(category.children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Layers size={32} style={{ animation: 'pulse 1s ease-in-out infinite' }} />
        <p>Loading categories...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Categories & Collections</h1>
          <span style={styles.subtitle}>
            Organize your product catalog
          </span>
        </div>
        <div style={styles.headerActions}>
          <button
            style={styles.primaryBtn}
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={16} />
            {activeView === 'categories' ? 'New Category' : 'New Collection'}
          </button>
        </div>
      </div>

      {/* View Tabs */}
      <div style={styles.viewTabs}>
        <button
          style={{
            ...styles.viewTab,
            ...(activeView === 'categories' ? styles.viewTabActive : {})
          }}
          onClick={() => setActiveView('categories')}
        >
          <FolderTree size={18} />
          Categories
          <span style={styles.viewTabCount}>{categories.length}</span>
        </button>
        <button
          style={{
            ...styles.viewTab,
            ...(activeView === 'collections' ? styles.viewTabActive : {})
          }}
          onClick={() => setActiveView('collections')}
        >
          <Layers size={18} />
          Collections
          <span style={styles.viewTabCount}>{collections.length}</span>
        </button>
      </div>

      {/* Search */}
      <div style={styles.toolbar}>
        <div style={styles.searchBox}>
          <Search size={18} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder={`Search ${activeView}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          {searchQuery && (
            <button
              style={styles.clearSearchBtn}
              onClick={() => setSearchQuery('')}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* List */}
        <div style={styles.listPanel}>
          {activeView === 'categories' ? (
            <div style={styles.categoryTree}>
              {filteredCategories.length > 0 ? (
                renderCategoryTree(filteredCategories)
              ) : (
                <div style={styles.emptyState}>
                  <FolderTree size={40} color="var(--color-text-muted)" />
                  <p>No categories found</p>
                </div>
              )}
            </div>
          ) : (
            <div style={styles.collectionsList}>
              {filteredCollections.length > 0 ? (
                filteredCollections.map(collection => {
                  const isSelected = selectedItem?.id === collection.id;
                  return (
                    <div
                      key={collection.id}
                      style={{
                        ...styles.collectionRow,
                        ...(isSelected ? styles.collectionRowSelected : {})
                      }}
                      onClick={() => setSelectedItem({ ...collection, type: 'collection' })}
                    >
                      <div style={styles.collectionLeft}>
                        <GripVertical size={14} color="var(--color-text-muted)" style={{ cursor: 'grab' }} />
                        
                        <div style={styles.collectionImageThumb}>
                          {collection.image ? (
                            <img src={collection.image} alt="" style={styles.collectionImg} />
                          ) : (
                            <Layers size={18} color="var(--color-text-muted)" />
                          )}
                        </div>

                        <div style={styles.collectionInfo}>
                          <div style={styles.collectionNameRow}>
                            <span style={styles.collectionName}>{collection.name}</span>
                            {collection.type === 'smart' && (
                              <span style={styles.smartBadge}>
                                <Zap size={10} />
                                Smart
                              </span>
                            )}
                          </div>
                          <span style={styles.collectionSlug}>/{collection.slug}</span>
                        </div>
                      </div>

                      <div style={styles.collectionRight}>
                        <div style={styles.collectionStats}>
                          <span style={styles.collectionStat}>
                            <Package size={12} />
                            {formatNumber(collection.productCount)}
                          </span>
                          <span style={styles.collectionStat}>
                            <DollarSign size={12} />
                            {formatCurrency(collection.revenue)}
                          </span>
                        </div>

                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: collection.status === 'active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                          color: collection.status === 'active' ? '#22c55e' : '#6b7280'
                        }}>
                          {collection.status}
                        </span>

                        <div style={styles.collectionActions}>
                          <button style={styles.actionIconBtn} title="Edit">
                            <Edit size={14} />
                          </button>
                          <button style={styles.actionIconBtn} title="View">
                            <Eye size={14} />
                          </button>
                          <button style={styles.actionIconBtn} title="More">
                            <MoreHorizontal size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={styles.emptyState}>
                  <Layers size={40} color="var(--color-text-muted)" />
                  <p>No collections found</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div style={styles.detailPanel}>
          {selectedItem ? (
            <>
              <div style={styles.detailHeader}>
                <div style={styles.detailImageLarge}>
                  {selectedItem.image ? (
                    <img src={selectedItem.image} alt="" style={styles.detailImg} />
                  ) : selectedItem.type === 'category' ? (
                    <FolderTree size={40} color="var(--color-text-muted)" />
                  ) : (
                    <Layers size={40} color="var(--color-text-muted)" />
                  )}
                  <button style={styles.changeImageBtn}>
                    <Image size={14} />
                    Change
                  </button>
                </div>
                <div style={styles.detailTitleSection}>
                  <span style={styles.detailType}>
                    {selectedItem.type === 'category' ? 'Category' : 
                     selectedItem.type === 'smart' ? 'Smart Collection' : 'Manual Collection'}
                  </span>
                  <h2 style={styles.detailTitle}>{selectedItem.name}</h2>
                  <span style={styles.detailSlug}>/{selectedItem.slug}</span>
                </div>
              </div>

              <div style={styles.detailStats}>
                <div style={styles.detailStat}>
                  <Package size={18} color="#3b82f6" />
                  <div>
                    <span style={styles.detailStatValue}>
                      {formatNumber(selectedItem.productCount)}
                    </span>
                    <span style={styles.detailStatLabel}>Products</span>
                  </div>
                </div>
                <div style={styles.detailStat}>
                  <DollarSign size={18} color="#22c55e" />
                  <div>
                    <span style={styles.detailStatValue}>
                      {formatCurrency(selectedItem.revenue)}
                    </span>
                    <span style={styles.detailStatLabel}>Revenue</span>
                  </div>
                </div>
                <div style={styles.detailStat}>
                  <TrendingUp size={18} color="#8b5cf6" />
                  <div>
                    <span style={styles.detailStatValue}>+12.5%</span>
                    <span style={styles.detailStatLabel}>Growth</span>
                  </div>
                </div>
              </div>

              {selectedItem.description && (
                <div style={styles.detailSection}>
                  <h4 style={styles.detailSectionTitle}>Description</h4>
                  <p style={styles.detailDescription}>{selectedItem.description}</p>
                </div>
              )}

              {selectedItem.type === 'smart' && selectedItem.rules && (
                <div style={styles.detailSection}>
                  <h4 style={styles.detailSectionTitle}>
                    <Zap size={14} color="#f59e0b" />
                    Smart Rules
                  </h4>
                  <div style={styles.rulesContainer}>
                    {selectedItem.rules.map((rule, index) => (
                      <div key={index} style={styles.ruleItem}>
                        <span style={styles.ruleField}>{rule.field}</span>
                        <span style={styles.ruleOperator}>{rule.operator.replace('_', ' ')}</span>
                        <span style={styles.ruleValue}>{rule.value}</span>
                      </div>
                    ))}
                    <button style={styles.addRuleBtn}>
                      <Plus size={14} />
                      Add Rule
                    </button>
                  </div>
                </div>
              )}

              {selectedItem.type === 'category' && selectedItem.children && selectedItem.children.length > 0 && (
                <div style={styles.detailSection}>
                  <h4 style={styles.detailSectionTitle}>Subcategories</h4>
                  <div style={styles.subcategoriesList}>
                    {selectedItem.children.map(child => (
                      <div key={child.id} style={styles.subcategoryItem}>
                        <FolderTree size={14} color="var(--color-text-muted)" />
                        <span>{child.name}</span>
                        <span style={styles.subcategoryCount}>{child.productCount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={styles.detailSection}>
                <h4 style={styles.detailSectionTitle}>SEO Preview</h4>
                <div style={styles.seoPreview}>
                  <span style={styles.seoTitle}>{selectedItem.name} | YourStore</span>
                  <span style={styles.seoUrl}>yourstore.com/{activeView === 'categories' ? 'category' : 'collection'}/{selectedItem.slug}</span>
                  <span style={styles.seoDesc}>
                    {selectedItem.description || `Browse our ${selectedItem.name} collection`}
                  </span>
                </div>
              </div>

              <div style={styles.detailActions}>
                <button style={styles.editFullBtn}>
                  <Edit size={16} />
                  Edit {selectedItem.type === 'category' ? 'Category' : 'Collection'}
                </button>
                <button style={styles.viewProductsBtn}>
                  <Package size={16} />
                  View Products
                </button>
                <button style={styles.moreActionsBtn}>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </>
          ) : (
            <div style={styles.noSelection}>
              {activeView === 'categories' ? (
                <FolderTree size={48} color="var(--color-text-muted)" />
              ) : (
                <Layers size={48} color="var(--color-text-muted)" />
              )}
              <h3 style={styles.noSelectionTitle}>
                Select a {activeView === 'categories' ? 'category' : 'collection'}
              </h3>
              <p style={styles.noSelectionText}>
                Click on an item to view details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal Placeholder */}
      {showCreateModal && (
        <div style={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                Create {activeView === 'categories' ? 'Category' : 'Collection'}
              </h2>
              <button
                style={styles.modalClose}
                onClick={() => setShowCreateModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Name</label>
                <input
                  type="text"
                  placeholder={`${activeView === 'categories' ? 'Category' : 'Collection'} name`}
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>URL Handle</label>
                <div style={styles.inputWithPrefix}>
                  <span style={styles.urlPrefix}>/{activeView === 'categories' ? 'category' : 'collection'}/</span>
                  <input
                    type="text"
                    placeholder="url-handle"
                    style={styles.formInputWithPrefix}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Description</label>
                <textarea
                  placeholder="Optional description..."
                  style={styles.formTextarea}
                  rows={3}
                />
              </div>

              {activeView === 'categories' && (
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Parent Category</label>
                  <select style={styles.formSelect}>
                    <option value="">None (Top Level)</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {activeView === 'collections' && (
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Collection Type</label>
                  <div style={styles.typeOptions}>
                    <label style={styles.typeOption}>
                      <input type="radio" name="type" value="manual" defaultChecked />
                      <div style={styles.typeOptionContent}>
                        <span style={styles.typeOptionTitle}>Manual</span>
                        <span style={styles.typeOptionDesc}>Manually add products</span>
                      </div>
                    </label>
                    <label style={styles.typeOption}>
                      <input type="radio" name="type" value="smart" />
                      <div style={styles.typeOptionContent}>
                        <Zap size={14} color="#f59e0b" />
                        <span style={styles.typeOptionTitle}>Smart</span>
                        <span style={styles.typeOptionDesc}>Auto-populate by rules</span>
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.cancelBtn}
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button style={styles.createBtn}>
                <Plus size={16} />
                Create {activeView === 'categories' ? 'Category' : 'Collection'}
              </button>
            </div>
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
    marginBottom: '24px'
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
  viewTabs: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px'
  },
  viewTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 24px',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: '12px',
    color: 'var(--color-text-muted)',
    fontSize: '15px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  viewTabActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'var(--color-primary)',
    color: 'var(--color-primary)'
  },
  viewTabCount: {
    padding: '2px 10px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: 600
  },
  toolbar: {
    marginBottom: '20px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    width: '350px'
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  clearSearchBtn: {
    padding: '4px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '6px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '24px',
    minHeight: '600px'
  },
  listPanel: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  categoryTree: {
    padding: '8px 0'
  },
  categoryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
    borderBottom: '1px solid var(--color-border)'
  },
  categoryRowSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)'
  },
  categoryLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  expandBtn: {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  expandPlaceholder: {
    width: '24px'
  },
  categoryImageThumb: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  categoryImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  categoryInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  categoryName: {
    fontWeight: 600,
    fontSize: '14px'
  },
  categorySlug: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  categoryRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  categoryStats: {
    display: 'flex',
    gap: '16px'
  },
  categoryStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  categoryActions: {
    display: 'flex',
    gap: '4px'
  },
  actionIconBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  categoryChildren: {},
  // Collections
  collectionsList: {
    padding: '8px 0'
  },
  collectionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
    borderBottom: '1px solid var(--color-border)'
  },
  collectionRowSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)'
  },
  collectionLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  collectionImageThumb: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  collectionImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  collectionInfo: {},
  collectionNameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  collectionName: {
    fontWeight: 600,
    fontSize: '14px'
  },
  smartBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderRadius: '8px',
    fontSize: '10px',
    fontWeight: 600,
    color: '#f59e0b'
  },
  collectionSlug: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  collectionRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  collectionStats: {
    display: 'flex',
    gap: '16px'
  },
  collectionStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  collectionActions: {
    display: 'flex',
    gap: '4px'
  },
  // Detail Panel
  detailPanel: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    padding: '24px',
    height: 'fit-content'
  },
  detailHeader: {
    display: 'flex',
    gap: '20px',
    marginBottom: '24px'
  },
  detailImageLarge: {
    position: 'relative',
    width: '100px',
    height: '100px',
    borderRadius: '16px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0
  },
  detailImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  changeImageBtn: {
    position: 'absolute',
    bottom: '8px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '11px',
    cursor: 'pointer'
  },
  detailTitleSection: {},
  detailType: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    fontWeight: 600
  },
  detailTitle: {
    fontSize: '22px',
    fontWeight: 700,
    margin: '4px 0'
  },
  detailSlug: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  detailStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  detailStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px'
  },
  detailStatValue: {
    display: 'block',
    fontSize: '18px',
    fontWeight: 700
  },
  detailStatLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  detailSection: {
    marginBottom: '20px'
  },
  detailSectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    marginBottom: '10px',
    textTransform: 'uppercase'
  },
  detailDescription: {
    fontSize: '14px',
    lineHeight: 1.6,
    color: 'var(--color-text)',
    margin: 0
  },
  rulesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  ruleItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    fontSize: '13px'
  },
  ruleField: {
    fontWeight: 600,
    color: 'var(--color-primary)'
  },
  ruleOperator: {
    color: 'var(--color-text-muted)'
  },
  ruleValue: {
    fontWeight: 500
  },
  addRuleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    backgroundColor: 'transparent',
    border: '1px dashed var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-primary)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  subcategoriesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  subcategoryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    fontSize: '13px'
  },
  subcategoryCount: {
    marginLeft: 'auto',
    padding: '2px 10px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 600
  },
  seoPreview: {
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px'
  },
  seoTitle: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 500,
    color: '#1a0dab',
    marginBottom: '4px'
  },
  seoUrl: {
    display: 'block',
    fontSize: '12px',
    color: '#006621',
    marginBottom: '4px'
  },
  seoDesc: {
    fontSize: '13px',
    color: '#545454',
    lineHeight: 1.5
  },
  detailActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: '1px solid var(--color-border)'
  },
  editFullBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  viewProductsBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  moreActionsBtn: {
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  noSelection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
    textAlign: 'center'
  },
  noSelectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '16px 0 8px 0'
  },
  noSelectionText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center',
    color: 'var(--color-text-muted)'
  },
  // Modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '20px',
    overflow: 'hidden'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid var(--color-border)'
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0
  },
  modalClose: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  modalBody: {
    padding: '24px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  formLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '8px'
  },
  formInput: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  formTextarea: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  formSelect: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none',
    boxSizing: 'border-box'
  },
  inputWithPrefix: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  urlPrefix: {
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    borderRight: '1px solid var(--color-border)',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    whiteSpace: 'nowrap'
  },
  formInputWithPrefix: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  typeOptions: {
    display: 'flex',
    gap: '12px'
  },
  typeOption: {
    flex: 1,
    cursor: 'pointer'
  },
  typeOptionContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '2px solid var(--color-border)',
    borderRadius: '12px',
    transition: 'all 0.2s'
  },
  typeOptionTitle: {
    fontWeight: 600,
    fontSize: '14px'
  },
  typeOptionDesc: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid var(--color-border)'
  },
  cancelBtn: {
    padding: '12px 20px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  createBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  }
};

export default ProductCategories;