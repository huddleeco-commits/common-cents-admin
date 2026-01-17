/**
 * EmailTemplates
 * 
 * Email template management system:
 * - Template library with categories
 * - Pre-built templates
 * - Custom template creation
 * - Drag-drop email builder
 * - Preview (desktop/mobile)
 * - Template versioning
 * - Usage analytics
 */

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Layout,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  MoreHorizontal,
  Eye,
  Star,
  StarOff,
  Grid,
  List,
  Smartphone,
  Monitor,
  Download,
  Upload,
  Image,
  Type,
  Square,
  Columns,
  AlignLeft,
  MousePointer,
  Link,
  Palette,
  Settings,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Clock,
  Users,
  TrendingUp,
  Sparkles,
  FileText,
  ShoppingCart,
  Gift,
  Tag,
  Megaphone,
  Heart,
  Zap,
  RefreshCw,
  ExternalLink,
  Code,
  Layers,
  Move,
  Maximize2
} from 'lucide-react';

export function EmailTemplates() {
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showBuilder, setShowBuilder] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCategories([
        { id: 'all', name: 'All Templates', count: 18 },
        { id: 'promotional', name: 'Promotional', count: 5, icon: Tag },
        { id: 'transactional', name: 'Transactional', count: 4, icon: FileText },
        { id: 'welcome', name: 'Welcome', count: 3, icon: Heart },
        { id: 'abandoned', name: 'Abandoned Cart', count: 2, icon: ShoppingCart },
        { id: 'newsletter', name: 'Newsletter', count: 2, icon: Mail },
        { id: 'seasonal', name: 'Seasonal', count: 2, icon: Gift }
      ]);

      setTemplates([
        {
          id: 1,
          name: 'Flash Sale Announcement',
          category: 'promotional',
          thumbnail: null,
          description: 'Bold, attention-grabbing design for flash sales',
          isFavorite: true,
          isCustom: false,
          usageCount: 24,
          lastUsed: '2024-01-14',
          avgOpenRate: 28.5,
          avgClickRate: 4.2,
          createdAt: '2023-10-01',
          updatedAt: '2024-01-10'
        },
        {
          id: 2,
          name: 'New Product Launch',
          category: 'promotional',
          thumbnail: null,
          description: 'Showcase new products with large hero image',
          isFavorite: true,
          isCustom: false,
          usageCount: 18,
          lastUsed: '2024-01-12',
          avgOpenRate: 32.1,
          avgClickRate: 5.8,
          createdAt: '2023-09-15',
          updatedAt: '2024-01-05'
        },
        {
          id: 3,
          name: 'Welcome Email',
          category: 'welcome',
          thumbnail: null,
          description: 'Warm welcome for new subscribers',
          isFavorite: true,
          isCustom: false,
          usageCount: 156,
          lastUsed: '2024-01-15',
          avgOpenRate: 52.3,
          avgClickRate: 12.4,
          createdAt: '2023-08-01',
          updatedAt: '2023-12-20'
        },
        {
          id: 4,
          name: 'Abandoned Cart Reminder',
          category: 'abandoned',
          thumbnail: null,
          description: 'Recover lost sales with product reminder',
          isFavorite: false,
          isCustom: false,
          usageCount: 89,
          lastUsed: '2024-01-15',
          avgOpenRate: 45.8,
          avgClickRate: 8.9,
          createdAt: '2023-09-01',
          updatedAt: '2024-01-08'
        },
        {
          id: 5,
          name: 'Order Confirmation',
          category: 'transactional',
          thumbnail: null,
          description: 'Clean order summary with tracking info',
          isFavorite: false,
          isCustom: false,
          usageCount: 342,
          lastUsed: '2024-01-15',
          avgOpenRate: 78.2,
          avgClickRate: 15.3,
          createdAt: '2023-07-15',
          updatedAt: '2023-11-30'
        },
        {
          id: 6,
          name: 'Shipping Notification',
          category: 'transactional',
          thumbnail: null,
          description: 'Package shipped with tracking details',
          isFavorite: false,
          isCustom: false,
          usageCount: 298,
          lastUsed: '2024-01-15',
          avgOpenRate: 72.5,
          avgClickRate: 22.1,
          createdAt: '2023-07-15',
          updatedAt: '2023-11-30'
        },
        {
          id: 7,
          name: 'Weekly Newsletter',
          category: 'newsletter',
          thumbnail: null,
          description: 'Multi-section content newsletter',
          isFavorite: true,
          isCustom: true,
          usageCount: 12,
          lastUsed: '2024-01-13',
          avgOpenRate: 24.8,
          avgClickRate: 3.2,
          createdAt: '2023-11-01',
          updatedAt: '2024-01-13'
        },
        {
          id: 8,
          name: 'Holiday Sale',
          category: 'seasonal',
          thumbnail: null,
          description: 'Festive design for holiday promotions',
          isFavorite: false,
          isCustom: false,
          usageCount: 8,
          lastUsed: '2023-12-26',
          avgOpenRate: 35.2,
          avgClickRate: 6.8,
          createdAt: '2023-11-15',
          updatedAt: '2023-12-20'
        },
        {
          id: 9,
          name: 'VIP Exclusive',
          category: 'promotional',
          thumbnail: null,
          description: 'Premium design for VIP customers',
          isFavorite: false,
          isCustom: true,
          usageCount: 6,
          lastUsed: '2024-01-10',
          avgOpenRate: 42.1,
          avgClickRate: 9.5,
          createdAt: '2023-12-01',
          updatedAt: '2024-01-10'
        },
        {
          id: 10,
          name: 'Re-engagement',
          category: 'promotional',
          thumbnail: null,
          description: 'Win back inactive subscribers',
          isFavorite: false,
          isCustom: false,
          usageCount: 15,
          lastUsed: '2024-01-08',
          avgOpenRate: 18.5,
          avgClickRate: 2.8,
          createdAt: '2023-10-15',
          updatedAt: '2024-01-05'
        },
        {
          id: 11,
          name: 'Password Reset',
          category: 'transactional',
          thumbnail: null,
          description: 'Simple password reset instructions',
          isFavorite: false,
          isCustom: false,
          usageCount: 128,
          lastUsed: '2024-01-15',
          avgOpenRate: 89.2,
          avgClickRate: 45.6,
          createdAt: '2023-07-01',
          updatedAt: '2023-10-15'
        },
        {
          id: 12,
          name: 'Review Request',
          category: 'transactional',
          thumbnail: null,
          description: 'Ask for product reviews post-purchase',
          isFavorite: false,
          isCustom: false,
          usageCount: 67,
          lastUsed: '2024-01-14',
          avgOpenRate: 38.5,
          avgClickRate: 12.3,
          createdAt: '2023-09-01',
          updatedAt: '2023-12-15'
        },
        {
          id: 13,
          name: 'Welcome Series - Day 3',
          category: 'welcome',
          thumbnail: null,
          description: 'Third email in welcome sequence',
          isFavorite: false,
          isCustom: true,
          usageCount: 145,
          lastUsed: '2024-01-15',
          avgOpenRate: 42.1,
          avgClickRate: 8.7,
          createdAt: '2023-09-15',
          updatedAt: '2023-12-20'
        },
        {
          id: 14,
          name: 'Cart Reminder - Final',
          category: 'abandoned',
          thumbnail: null,
          description: 'Last chance with discount offer',
          isFavorite: false,
          isCustom: false,
          usageCount: 56,
          lastUsed: '2024-01-15',
          avgOpenRate: 32.4,
          avgClickRate: 6.2,
          createdAt: '2023-10-01',
          updatedAt: '2024-01-08'
        },
        {
          id: 15,
          name: 'Monthly Digest',
          category: 'newsletter',
          thumbnail: null,
          description: 'Monthly content roundup',
          isFavorite: false,
          isCustom: true,
          usageCount: 4,
          lastUsed: '2024-01-01',
          avgOpenRate: 22.5,
          avgClickRate: 2.9,
          createdAt: '2023-12-01',
          updatedAt: '2024-01-01'
        },
        {
          id: 16,
          name: 'Welcome Series - Day 7',
          category: 'welcome',
          thumbnail: null,
          description: 'Final email with first purchase offer',
          isFavorite: false,
          isCustom: true,
          usageCount: 134,
          lastUsed: '2024-01-15',
          avgOpenRate: 35.8,
          avgClickRate: 10.2,
          createdAt: '2023-09-15',
          updatedAt: '2023-12-20'
        },
        {
          id: 17,
          name: 'Valentine\'s Day',
          category: 'seasonal',
          thumbnail: null,
          description: 'Romantic theme for Valentine\'s promotions',
          isFavorite: false,
          isCustom: false,
          usageCount: 0,
          lastUsed: null,
          avgOpenRate: 0,
          avgClickRate: 0,
          createdAt: '2024-01-10',
          updatedAt: '2024-01-10'
        },
        {
          id: 18,
          name: 'Clearance Sale',
          category: 'promotional',
          thumbnail: null,
          description: 'Urgent clearance with countdown',
          isFavorite: false,
          isCustom: false,
          usageCount: 5,
          lastUsed: '2024-01-05',
          avgOpenRate: 26.8,
          avgClickRate: 4.5,
          createdAt: '2023-12-15',
          updatedAt: '2024-01-05'
        }
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Never';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    if (category?.icon) {
      const Icon = category.icon;
      return <Icon size={14} />;
    }
    return <Mail size={14} />;
  };

  const getCategoryColor = (categoryId) => {
    switch (categoryId) {
      case 'promotional': return { bg: 'rgba(249, 115, 22, 0.1)', color: '#f97316' };
      case 'transactional': return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' };
      case 'welcome': return { bg: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' };
      case 'abandoned': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      case 'newsletter': return { bg: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' };
      case 'seasonal': return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' };
      default: return { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' };
    }
  };

  const toggleFavorite = (templateId) => {
    setTemplates(prev => prev.map(t => 
      t.id === templateId ? { ...t, isFavorite: !t.isFavorite } : t
    ));
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'all') return matchesSearch;
    return matchesSearch && template.category === activeCategory;
  });

  const favoriteTemplates = templates.filter(t => t.isFavorite);

  // Email Builder Block Types
  const blockTypes = [
    { id: 'header', name: 'Header', icon: Layout, desc: 'Logo and navigation' },
    { id: 'hero', name: 'Hero Image', icon: Image, desc: 'Large banner image' },
    { id: 'text', name: 'Text Block', icon: Type, desc: 'Paragraph text' },
    { id: 'button', name: 'Button', icon: MousePointer, desc: 'Call-to-action button' },
    { id: 'image', name: 'Image', icon: Image, desc: 'Single image' },
    { id: 'columns', name: '2 Columns', icon: Columns, desc: 'Side-by-side content' },
    { id: 'product', name: 'Product Card', icon: ShoppingCart, desc: 'Product with image & price' },
    { id: 'divider', name: 'Divider', icon: Square, desc: 'Horizontal line' },
    { id: 'spacer', name: 'Spacer', icon: Move, desc: 'Empty space' },
    { id: 'social', name: 'Social Icons', icon: Link, desc: 'Social media links' },
    { id: 'footer', name: 'Footer', icon: AlignLeft, desc: 'Footer with unsubscribe' }
  ];

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Mail size={48} style={{ opacity: 0.5 }} />
        <p>Loading templates...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Email Templates</h1>
          <p style={styles.subtitle}>{templates.length} templates available</p>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.actionBtn}>
            <Upload size={16} />
            Import
          </button>
          <button style={styles.primaryBtn} onClick={() => setShowBuilder(true)}>
            <Plus size={18} />
            Create Template
          </button>
        </div>
      </div>

      {/* Favorites Section */}
      {favoriteTemplates.length > 0 && (
        <div style={styles.favoritesSection}>
          <h3 style={styles.sectionTitle}>
            <Star size={16} fill="#f59e0b" color="#f59e0b" />
            Favorites
          </h3>
          <div style={styles.favoritesGrid}>
            {favoriteTemplates.slice(0, 4).map((template) => {
              const categoryStyle = getCategoryColor(template.category);
              return (
                <div key={template.id} style={styles.favoriteCard}>
                  <div style={styles.favoriteThumb}>
                    <Layout size={24} color="var(--color-text-muted)" />
                  </div>
                  <div style={styles.favoriteInfo}>
                    <span style={styles.favoriteName}>{template.name}</span>
                    <span style={{
                      ...styles.categoryBadge,
                      backgroundColor: categoryStyle.bg,
                      color: categoryStyle.color
                    }}>
                      {getCategoryIcon(template.category)}
                      {template.category}
                    </span>
                  </div>
                  <div style={styles.favoriteActions}>
                    <button style={styles.iconBtn} onClick={() => setSelectedTemplate(template)}>
                      <Eye size={14} />
                    </button>
                    <button style={styles.iconBtn}>
                      <Edit size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarSection}>
            <h4 style={styles.sidebarTitle}>Categories</h4>
            <div style={styles.categoryList}>
              {categories.map((category) => {
                const CategoryIcon = category.icon || Mail;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    style={{
                      ...styles.categoryItem,
                      ...(isActive ? styles.categoryItemActive : {})
                    }}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <CategoryIcon size={16} />
                    <span style={styles.categoryName}>{category.name}</span>
                    <span style={styles.categoryCount}>{category.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div style={styles.templatesArea}>
          {/* Toolbar */}
          <div style={styles.toolbar}>
            <div style={styles.searchBox}>
              <Search size={18} color="var(--color-text-muted)" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
              {searchQuery && (
                <button style={styles.clearBtn} onClick={() => setSearchQuery('')}>
                  <X size={14} />
                </button>
              )}
            </div>
            <div style={styles.toolbarRight}>
              <div style={styles.viewToggle}>
                <button
                  style={{
                    ...styles.viewToggleBtn,
                    ...(viewMode === 'grid' ? styles.viewToggleBtnActive : {})
                  }}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={16} />
                </button>
                <button
                  style={{
                    ...styles.viewToggleBtn,
                    ...(viewMode === 'list' ? styles.viewToggleBtnActive : {})
                  }}
                  onClick={() => setViewMode('list')}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div style={styles.templatesGrid}>
              {filteredTemplates.map((template) => {
                const categoryStyle = getCategoryColor(template.category);
                return (
                  <div key={template.id} style={styles.templateCard}>
                    {/* Thumbnail */}
                    <div style={styles.templateThumb}>
                      <Layout size={32} color="var(--color-text-muted)" />
                      <div style={styles.templateOverlay}>
                        <button 
                          style={styles.overlayBtn}
                          onClick={() => {
                            setSelectedTemplate(template);
                            setShowPreview(true);
                          }}
                        >
                          <Eye size={16} />
                          Preview
                        </button>
                        <button style={styles.overlayBtn}>
                          <Edit size={16} />
                          Edit
                        </button>
                      </div>
                      <button
                        style={{
                          ...styles.favoriteBtn,
                          color: template.isFavorite ? '#f59e0b' : 'var(--color-text-muted)'
                        }}
                        onClick={() => toggleFavorite(template.id)}
                      >
                        {template.isFavorite ? (
                          <Star size={16} fill="#f59e0b" />
                        ) : (
                          <StarOff size={16} />
                        )}
                      </button>
                      {template.isCustom && (
                        <span style={styles.customBadge}>Custom</span>
                      )}
                    </div>

                    {/* Info */}
                    <div style={styles.templateInfo}>
                      <div style={styles.templateHeader}>
                        <span style={styles.templateName}>{template.name}</span>
                        <button style={styles.moreBtn}>
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                      <p style={styles.templateDesc}>{template.description}</p>
                      <div style={styles.templateMeta}>
                        <span style={{
                          ...styles.categoryBadge,
                          backgroundColor: categoryStyle.bg,
                          color: categoryStyle.color
                        }}>
                          {getCategoryIcon(template.category)}
                          {template.category}
                        </span>
                        <span style={styles.usageCount}>
                          <Users size={12} />
                          {formatNumber(template.usageCount)} uses
                        </span>
                      </div>
                      {template.avgOpenRate > 0 && (
                        <div style={styles.templateStats}>
                          <span style={styles.stat}>
                            <TrendingUp size={12} />
                            {template.avgOpenRate.toFixed(1)}% open
                          </span>
                          <span style={styles.stat}>
                            <MousePointer size={12} />
                            {template.avgClickRate.toFixed(1)}% click
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Create New Card */}
              <button style={styles.createCard} onClick={() => setShowBuilder(true)}>
                <div style={styles.createIcon}>
                  <Plus size={32} />
                </div>
                <span style={styles.createText}>Create Template</span>
                <span style={styles.createHint}>Start from scratch</span>
              </button>
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div style={styles.templatesList}>
              {filteredTemplates.map((template) => {
                const categoryStyle = getCategoryColor(template.category);
                return (
                  <div key={template.id} style={styles.listItem}>
                    <div style={styles.listThumb}>
                      <Layout size={20} color="var(--color-text-muted)" />
                    </div>
                    <div style={styles.listInfo}>
                      <span style={styles.listName}>{template.name}</span>
                      <span style={styles.listDesc}>{template.description}</span>
                    </div>
                    <span style={{
                      ...styles.categoryBadge,
                      backgroundColor: categoryStyle.bg,
                      color: categoryStyle.color
                    }}>
                      {template.category}
                    </span>
                    <div style={styles.listStats}>
                      <span>{formatNumber(template.usageCount)} uses</span>
                      <span>{template.avgOpenRate.toFixed(1)}% open</span>
                    </div>
                    <span style={styles.listDate}>
                      {formatDate(template.lastUsed)}
                    </span>
                    <div style={styles.listActions}>
                      <button 
                        style={styles.iconBtn}
                        onClick={() => toggleFavorite(template.id)}
                      >
                        {template.isFavorite ? (
                          <Star size={14} fill="#f59e0b" color="#f59e0b" />
                        ) : (
                          <StarOff size={14} />
                        )}
                      </button>
                      <button 
                        style={styles.iconBtn}
                        onClick={() => {
                          setSelectedTemplate(template);
                          setShowPreview(true);
                        }}
                      >
                        <Eye size={14} />
                      </button>
                      <button style={styles.iconBtn}>
                        <Edit size={14} />
                      </button>
                      <button style={styles.iconBtn}>
                        <Copy size={14} />
                      </button>
                      <button style={styles.iconBtn}>
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <div style={styles.emptyState}>
              <Mail size={48} color="var(--color-text-muted)" />
              <h3>No templates found</h3>
              <p>Try adjusting your search or create a new template</p>
              <button style={styles.primaryBtn} onClick={() => setShowBuilder(true)}>
                <Plus size={18} />
                Create Template
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <div style={styles.modalOverlay} onClick={() => setShowPreview(false)}>
          <div style={styles.previewModal} onClick={e => e.stopPropagation()}>
            <div style={styles.previewHeader}>
              <div style={styles.previewHeaderLeft}>
                <h2 style={styles.previewTitle}>{selectedTemplate.name}</h2>
                <span style={styles.previewSubtitle}>{selectedTemplate.description}</span>
              </div>
              <div style={styles.previewHeaderRight}>
                <div style={styles.previewToggle}>
                  <button
                    style={{
                      ...styles.previewToggleBtn,
                      ...(previewMode === 'desktop' ? styles.previewToggleBtnActive : {})
                    }}
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Monitor size={16} />
                  </button>
                  <button
                    style={{
                      ...styles.previewToggleBtn,
                      ...(previewMode === 'mobile' ? styles.previewToggleBtnActive : {})
                    }}
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <Smartphone size={16} />
                  </button>
                </div>
                <button style={styles.previewAction}>
                  <Edit size={16} />
                  Edit
                </button>
                <button style={styles.previewAction}>
                  <Copy size={16} />
                  Duplicate
                </button>
                <button style={styles.closeBtn} onClick={() => setShowPreview(false)}>
                  <X size={20} />
                </button>
              </div>
            </div>
            <div style={styles.previewBody}>
              <div style={{
                ...styles.previewFrame,
                ...(previewMode === 'mobile' ? styles.previewFrameMobile : {})
              }}>
                {/* Email Preview Content */}
                <div style={styles.emailPreview}>
                  <div style={styles.emailHeader}>
                    <div style={styles.emailLogo}>LOGO</div>
                  </div>
                  <div style={styles.emailHero}>
                    <div style={styles.heroPlaceholder}>
                      <Image size={40} />
                      <span>Hero Image</span>
                    </div>
                  </div>
                  <div style={styles.emailContent}>
                    <h2 style={styles.emailHeadline}>Your Headline Here</h2>
                    <p style={styles.emailText}>
                      This is where your email content will appear. 
                      Add compelling copy to engage your subscribers.
                    </p>
                    <button style={styles.emailCta}>Shop Now</button>
                  </div>
                  <div style={styles.emailFooter}>
                    <p>© 2024 Your Company. All rights reserved.</p>
                    <a href="#">Unsubscribe</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Builder Modal */}
      {showBuilder && (
        <div style={styles.builderOverlay}>
          <div style={styles.builderModal}>
            {/* Builder Header */}
            <div style={styles.builderHeader}>
              <div style={styles.builderHeaderLeft}>
                <input
                  type="text"
                  placeholder="Untitled Template"
                  style={styles.builderNameInput}
                />
              </div>
              <div style={styles.builderHeaderRight}>
                <div style={styles.previewToggle}>
                  <button
                    style={{
                      ...styles.previewToggleBtn,
                      ...(previewMode === 'desktop' ? styles.previewToggleBtnActive : {})
                    }}
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Monitor size={16} />
                  </button>
                  <button
                    style={{
                      ...styles.previewToggleBtn,
                      ...(previewMode === 'mobile' ? styles.previewToggleBtnActive : {})
                    }}
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <Smartphone size={16} />
                  </button>
                </div>
                <button style={styles.builderAction}>
                  <Code size={16} />
                  HTML
                </button>
                <button style={styles.cancelBtn} onClick={() => setShowBuilder(false)}>
                  Cancel
                </button>
                <button style={styles.saveBtn}>
                  <Check size={16} />
                  Save Template
                </button>
              </div>
            </div>

            {/* Builder Body */}
            <div style={styles.builderBody}>
              {/* Blocks Panel */}
              <div style={styles.blocksPanel}>
                <h4 style={styles.panelTitle}>Content Blocks</h4>
                <div style={styles.blocksList}>
                  {blockTypes.map((block) => {
                    const BlockIcon = block.icon;
                    return (
                      <div key={block.id} style={styles.blockItem} draggable>
                        <BlockIcon size={18} />
                        <div style={styles.blockInfo}>
                          <span style={styles.blockName}>{block.name}</span>
                          <span style={styles.blockDesc}>{block.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Canvas */}
              <div style={styles.canvas}>
                <div style={{
                  ...styles.canvasFrame,
                  ...(previewMode === 'mobile' ? styles.canvasFrameMobile : {})
                }}>
                  <div style={styles.canvasContent}>
                    <div style={styles.dropZone}>
                      <Layers size={32} color="var(--color-text-muted)" />
                      <p>Drag blocks here to build your email</p>
                      <span>or click a block to add it</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings Panel */}
              <div style={styles.settingsPanel}>
                <h4 style={styles.panelTitle}>Settings</h4>
                <div style={styles.settingsContent}>
                  <div style={styles.settingGroup}>
                    <label style={styles.settingLabel}>Background Color</label>
                    <div style={styles.colorPicker}>
                      <div style={{...styles.colorSwatch, backgroundColor: '#ffffff'}} />
                      <input type="text" value="#ffffff" style={styles.colorInput} readOnly />
                    </div>
                  </div>
                  <div style={styles.settingGroup}>
                    <label style={styles.settingLabel}>Content Width</label>
                    <select style={styles.selectInput}>
                      <option>600px (Standard)</option>
                      <option>640px (Wide)</option>
                      <option>480px (Narrow)</option>
                    </select>
                  </div>
                  <div style={styles.settingGroup}>
                    <label style={styles.settingLabel}>Font Family</label>
                    <select style={styles.selectInput}>
                      <option>Arial, sans-serif</option>
                      <option>Georgia, serif</option>
                      <option>Helvetica, sans-serif</option>
                      <option>Verdana, sans-serif</option>
                    </select>
                  </div>
                </div>
              </div>
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
    color: 'var(--color-text-muted)',
    margin: 0
  },
  headerRight: {
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
  favoritesSection: {
    marginBottom: '24px'
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 600,
    margin: '0 0 12px 0'
  },
  favoritesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px'
  },
  favoriteCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  favoriteThumb: {
    width: '48px',
    height: '48px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteInfo: {
    flex: 1,
    minWidth: 0
  },
  favoriteName: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '4px'
  },
  favoriteActions: {
    display: 'flex',
    gap: '4px'
  },
  iconBtn: {
    padding: '6px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '6px'
  },
  mainContent: {
    display: 'flex',
    gap: '24px'
  },
  sidebar: {
    width: '220px',
    flexShrink: 0
  },
  sidebarSection: {},
  sidebarTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    margin: '0 0 12px 0'
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%'
  },
  categoryItemActive: {
    backgroundColor: 'var(--color-surface)',
    fontWeight: 500
  },
  categoryName: {
    flex: 1
  },
  categoryCount: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  templatesArea: {
    flex: 1,
    minWidth: 0
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    width: '300px'
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  clearBtn: {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  toolbarRight: {
    display: 'flex',
    gap: '12px'
  },
  viewToggle: {
    display: 'flex',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  viewToggleBtn: {
    padding: '10px 14px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  viewToggleBtnActive: {
    backgroundColor: 'var(--color-surface-2)',
    color: 'var(--color-text)'
  },
  templatesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  },
  templateCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  templateThumb: {
    position: 'relative',
    height: '160px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  templateOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    opacity: 0,
    transition: 'opacity 0.2s ease'
  },
  overlayBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '8px',
    color: '#000',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  favoriteBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '8px',
    backgroundColor: 'var(--color-surface)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  customBadge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    padding: '4px 10px',
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 600
  },
  templateInfo: {
    padding: '16px'
  },
  templateHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '6px'
  },
  templateName: {
    fontSize: '15px',
    fontWeight: 600
  },
  moreBtn: {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  templateDesc: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: '0 0 12px 0',
    lineHeight: 1.4
  },
  templateMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '10px'
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  usageCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  templateStats: {
    display: 'flex',
    gap: '16px'
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  createCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '40px 20px',
    backgroundColor: 'transparent',
    border: '2px dashed var(--color-border)',
    borderRadius: '16px',
    cursor: 'pointer',
    minHeight: '280px'
  },
  createIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)'
  },
  createText: {
    fontSize: '15px',
    fontWeight: 600
  },
  createHint: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  templatesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  listThumb: {
    width: '48px',
    height: '48px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listInfo: {
    flex: 1,
    minWidth: 0
  },
  listName: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '2px'
  },
  listDesc: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  listStats: {
    display: 'flex',
    gap: '16px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  listDate: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    width: '100px'
  },
  listActions: {
    display: 'flex',
    gap: '4px'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    gap: '16px',
    textAlign: 'center'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  previewModal: {
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  previewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    borderBottom: '1px solid var(--color-border)'
  },
  previewHeaderLeft: {},
  previewTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  previewSubtitle: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  previewHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  previewToggle: {
    display: 'flex',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  previewToggleBtn: {
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  previewToggleBtnActive: {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)'
  },
  previewAction: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  closeBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  previewBody: {
    flex: 1,
    overflow: 'auto',
    padding: '24px',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center'
  },
  previewFrame: {
    width: '600px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'width 0.3s ease'
  },
  previewFrameMobile: {
    width: '375px'
  },
  emailPreview: {
    fontFamily: 'Arial, sans-serif'
  },
  emailHeader: {
    padding: '20px',
    textAlign: 'center',
    borderBottom: '1px solid #eee'
  },
  emailLogo: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#333'
  },
  emailHero: {
    padding: '0'
  },
  heroPlaceholder: {
    height: '200px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    color: '#999'
  },
  emailContent: {
    padding: '32px 24px',
    textAlign: 'center'
  },
  emailHeadline: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#333',
    margin: '0 0 16px 0'
  },
  emailText: {
    fontSize: '16px',
    color: '#666',
    lineHeight: 1.6,
    margin: '0 0 24px 0'
  },
  emailCta: {
    display: 'inline-block',
    padding: '14px 32px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 600,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  emailFooter: {
    padding: '24px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    fontSize: '12px',
    color: '#999'
  },
  builderOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'var(--color-background)',
    zIndex: 1000
  },
  builderModal: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  builderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    backgroundColor: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)'
  },
  builderHeaderLeft: {},
  builderNameInput: {
    padding: '8px 12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '14px',
    fontWeight: 500,
    width: '250px',
    outline: 'none'
  },
  builderHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  builderAction: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  cancelBtn: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  saveBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  builderBody: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  blocksPanel: {
    width: '240px',
    backgroundColor: 'var(--color-surface)',
    borderRight: '1px solid var(--color-border)',
    overflow: 'auto',
    padding: '16px'
  },
  panelTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    margin: '0 0 12px 0'
  },
  blocksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  blockItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '10px',
    cursor: 'grab'
  },
  blockInfo: {
    flex: 1
  },
  blockName: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500
  },
  blockDesc: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  canvas: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    overflow: 'auto',
    padding: '24px',
    display: 'flex',
    justifyContent: 'center'
  },
  canvasFrame: {
    width: '600px',
    minHeight: '600px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    transition: 'width 0.3s ease'
  },
  canvasFrameMobile: {
    width: '375px'
  },
  canvasContent: {
    minHeight: '600px'
  },
  dropZone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    margin: '100px 40px',
    border: '2px dashed var(--color-border)',
    borderRadius: '12px',
    color: 'var(--color-text-muted)',
    textAlign: 'center'
  },
  settingsPanel: {
    width: '260px',
    backgroundColor: 'var(--color-surface)',
    borderLeft: '1px solid var(--color-border)',
    overflow: 'auto',
    padding: '16px'
  },
  settingsContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  settingGroup: {},
  settingLabel: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 500,
    marginBottom: '8px'
  },
  colorPicker: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  colorSwatch: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
    cursor: 'pointer'
  },
  colorInput: {
    flex: 1,
    padding: '8px 12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px'
  },
  selectInput: {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  }
};

export default EmailTemplates;