/**
 * CampaignBuilder
 * 
 * Multi-step campaign creation wizard:
 * - Step 1: Campaign type & basics
 * - Step 2: Audience selection
 * - Step 3: Content (email/SMS/push)
 * - Step 4: Schedule & settings
 * - Step 5: Review & launch
 * 
 * Supports email, SMS, and push notification campaigns.
 */

import React, { useState, useEffect } from 'react';
import {
  Mail,
  MessageSquare,
  Bell,
  Users,
  FileText,
  Calendar,
  Send,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Plus,
  Trash2,
  Eye,
  Edit,
  Image,
  Link,
  Bold,
  Italic,
  List,
  AlignLeft,
  AlignCenter,
  Type,
  Palette,
  Layout,
  Smartphone,
  Monitor,
  Clock,
  Target,
  Zap,
  Tag,
  Filter,
  Search,
  Settings,
  Sparkles,
  RefreshCw,
  Copy,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Info,
  HelpCircle,
  Wand2,
  Grip
} from 'lucide-react';

export function CampaignBuilder({ campaignId = null, onClose, onSave }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaign, setCampaign] = useState({
    name: '',
    type: 'email',
    // Audience
    audienceType: 'segment',
    selectedSegments: [],
    excludedSegments: [],
    estimatedReach: 0,
    // Email content
    subject: '',
    preheader: '',
    fromName: 'Your Store',
    fromEmail: 'hello@yourstore.com',
    replyTo: '',
    emailContent: {
      blocks: [
        { id: 'header', type: 'header', content: { logo: true, menuLinks: [] } },
        { id: 'hero', type: 'hero', content: { image: '', headline: '', subheadline: '', buttonText: '', buttonUrl: '' } },
        { id: 'text', type: 'text', content: { text: '' } },
        { id: 'footer', type: 'footer', content: { address: '', unsubscribe: true, socialLinks: [] } }
      ]
    },
    // SMS content
    smsMessage: '',
    smsCharCount: 0,
    // Push content
    pushTitle: '',
    pushBody: '',
    pushImage: '',
    pushUrl: '',
    // Schedule
    scheduleType: 'now',
    scheduledDate: '',
    scheduledTime: '',
    timezone: 'America/New_York',
    // Settings
    trackOpens: true,
    trackClicks: true,
    googleAnalytics: false,
    utmSource: '',
    utmMedium: '',
    utmCampaign: ''
  });

  const [segments, setSegments] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showAIAssist, setShowAIAssist] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load segments
    setSegments([
      { id: 'seg-1', name: 'All Subscribers', count: 12450, icon: Users },
      { id: 'seg-2', name: 'VIP Customers', count: 1250, icon: Target },
      { id: 'seg-3', name: 'New Subscribers (30d)', count: 890, icon: Zap },
      { id: 'seg-4', name: 'Inactive (60d+)', count: 3400, icon: Clock },
      { id: 'seg-5', name: 'High Spenders ($500+)', count: 2100, icon: Tag },
      { id: 'seg-6', name: 'Cart Abandoners', count: 567, icon: AlertTriangle },
      { id: 'seg-7', name: 'Repeat Buyers', count: 4200, icon: RefreshCw },
      { id: 'seg-8', name: 'First-Time Buyers', count: 1800, icon: CheckCircle }
    ]);

    // Load templates
    setTemplates([
      { id: 'tpl-1', name: 'Welcome Email', type: 'email', thumbnail: null },
      { id: 'tpl-2', name: 'Flash Sale', type: 'email', thumbnail: null },
      { id: 'tpl-3', name: 'New Arrival', type: 'email', thumbnail: null },
      { id: 'tpl-4', name: 'Abandoned Cart', type: 'email', thumbnail: null },
      { id: 'tpl-5', name: 'Order Confirmation', type: 'email', thumbnail: null }
    ]);

    // Load existing campaign if editing
    if (campaignId) {
      // Fetch campaign data
    }
  }, [campaignId]);

  // Calculate estimated reach
  useEffect(() => {
    let reach = 0;
    campaign.selectedSegments.forEach(segId => {
      const seg = segments.find(s => s.id === segId);
      if (seg) reach += seg.count;
    });
    campaign.excludedSegments.forEach(segId => {
      const seg = segments.find(s => s.id === segId);
      if (seg) reach -= seg.count;
    });
    setCampaign(prev => ({ ...prev, estimatedReach: Math.max(0, reach) }));
  }, [campaign.selectedSegments, campaign.excludedSegments, segments]);

  const steps = [
    { id: 1, name: 'Type', icon: Layout },
    { id: 2, name: 'Audience', icon: Users },
    { id: 3, name: 'Content', icon: FileText },
    { id: 4, name: 'Schedule', icon: Calendar },
    { id: 5, name: 'Review', icon: Check }
  ];

  const campaignTypes = [
    {
      id: 'email',
      name: 'Email Campaign',
      description: 'Send rich HTML emails with images, links, and formatting',
      icon: Mail,
      color: '#3b82f6'
    },
    {
      id: 'sms',
      name: 'SMS Campaign',
      description: 'Send text messages directly to mobile phones',
      icon: MessageSquare,
      color: '#22c55e'
    },
    {
      id: 'push',
      name: 'Push Notification',
      description: 'Send instant notifications to app users',
      icon: Bell,
      color: '#f97316'
    }
  ];

  const updateCampaign = (field, value) => {
    setCampaign(prev => ({ ...prev, [field]: value }));
    // Clear validation error
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const toggleSegment = (segId, exclude = false) => {
    const field = exclude ? 'excludedSegments' : 'selectedSegments';
    const otherField = exclude ? 'selectedSegments' : 'excludedSegments';
    
    setCampaign(prev => {
      const current = prev[field];
      const other = prev[otherField];
      
      if (current.includes(segId)) {
        return { ...prev, [field]: current.filter(id => id !== segId) };
      } else {
        return {
          ...prev,
          [field]: [...current, segId],
          [otherField]: other.filter(id => id !== segId)
        };
      }
    });
  };

  const validateStep = (step) => {
    const errors = {};
    
    switch (step) {
      case 1:
        if (!campaign.name.trim()) errors.name = 'Campaign name is required';
        if (!campaign.type) errors.type = 'Select a campaign type';
        break;
      case 2:
        if (campaign.selectedSegments.length === 0) errors.audience = 'Select at least one audience segment';
        break;
      case 3:
        if (campaign.type === 'email') {
          if (!campaign.subject.trim()) errors.subject = 'Subject line is required';
          if (!campaign.fromName.trim()) errors.fromName = 'From name is required';
          if (!campaign.fromEmail.trim()) errors.fromEmail = 'From email is required';
        } else if (campaign.type === 'sms') {
          if (!campaign.smsMessage.trim()) errors.smsMessage = 'Message is required';
        } else if (campaign.type === 'push') {
          if (!campaign.pushTitle.trim()) errors.pushTitle = 'Title is required';
          if (!campaign.pushBody.trim()) errors.pushBody = 'Body is required';
        }
        break;
      case 4:
        if (campaign.scheduleType === 'scheduled') {
          if (!campaign.scheduledDate) errors.scheduledDate = 'Select a date';
          if (!campaign.scheduledTime) errors.scheduledTime = 'Select a time';
        }
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSave = async (launch = false) => {
    if (!validateStep(currentStep)) return;
    
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      if (onSave) onSave(campaign, launch);
      if (onClose) onClose();
    }, 1500);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderTypeStep();
      case 2:
        return renderAudienceStep();
      case 3:
        return renderContentStep();
      case 4:
        return renderScheduleStep();
      case 5:
        return renderReviewStep();
      default:
        return null;
    }
  };

  // Step 1: Type & Basics
  const renderTypeStep = () => (
    <div style={styles.stepContent}>
      <div style={styles.stepSection}>
        <h3 style={styles.sectionTitle}>Campaign Name</h3>
        <input
          type="text"
          placeholder="e.g., January Flash Sale, New Product Launch..."
          value={campaign.name}
          onChange={(e) => updateCampaign('name', e.target.value)}
          style={{
            ...styles.textInput,
            ...(validationErrors.name ? styles.inputError : {})
          }}
        />
        {validationErrors.name && (
          <span style={styles.errorText}>{validationErrors.name}</span>
        )}
      </div>

      <div style={styles.stepSection}>
        <h3 style={styles.sectionTitle}>Campaign Type</h3>
        <div style={styles.typeGrid}>
          {campaignTypes.map((type) => {
            const TypeIcon = type.icon;
            const isSelected = campaign.type === type.id;
            return (
              <button
                key={type.id}
                style={{
                  ...styles.typeCard,
                  ...(isSelected ? styles.typeCardSelected : {}),
                  borderColor: isSelected ? type.color : 'var(--color-border)'
                }}
                onClick={() => updateCampaign('type', type.id)}
              >
                <div style={{
                  ...styles.typeIconWrapper,
                  backgroundColor: isSelected ? `${type.color}20` : 'var(--color-surface-2)'
                }}>
                  <TypeIcon size={28} color={isSelected ? type.color : 'var(--color-text-muted)'} />
                </div>
                <span style={styles.typeName}>{type.name}</span>
                <span style={styles.typeDescription}>{type.description}</span>
                {isSelected && (
                  <div style={{...styles.typeCheck, backgroundColor: type.color}}>
                    <Check size={14} color="#fff" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Step 2: Audience
  const renderAudienceStep = () => (
    <div style={styles.stepContent}>
      <div style={styles.audienceHeader}>
        <div style={styles.audienceStats}>
          <div style={styles.audienceStat}>
            <Users size={20} color="var(--color-primary)" />
            <div>
              <span style={styles.audienceStatValue}>{formatNumber(campaign.estimatedReach)}</span>
              <span style={styles.audienceStatLabel}>Estimated Reach</span>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.stepSection}>
        <h3 style={styles.sectionTitle}>Select Audience Segments</h3>
        {validationErrors.audience && (
          <span style={styles.errorText}>{validationErrors.audience}</span>
        )}
        <div style={styles.segmentsList}>
          {segments.map((segment) => {
            const SegmentIcon = segment.icon;
            const isSelected = campaign.selectedSegments.includes(segment.id);
            const isExcluded = campaign.excludedSegments.includes(segment.id);
            return (
              <div
                key={segment.id}
                style={{
                  ...styles.segmentItem,
                  ...(isSelected ? styles.segmentItemSelected : {}),
                  ...(isExcluded ? styles.segmentItemExcluded : {})
                }}
              >
                <div style={styles.segmentInfo}>
                  <div style={styles.segmentIconWrapper}>
                    <SegmentIcon size={18} />
                  </div>
                  <div>
                    <span style={styles.segmentName}>{segment.name}</span>
                    <span style={styles.segmentCount}>{formatNumber(segment.count)} contacts</span>
                  </div>
                </div>
                <div style={styles.segmentActions}>
                  <button
                    style={{
                      ...styles.segmentBtn,
                      ...(isSelected ? styles.segmentBtnActive : {})
                    }}
                    onClick={() => toggleSegment(segment.id, false)}
                  >
                    {isSelected ? <Check size={14} /> : <Plus size={14} />}
                    {isSelected ? 'Added' : 'Add'}
                  </button>
                  <button
                    style={{
                      ...styles.segmentBtn,
                      ...styles.segmentBtnExclude,
                      ...(isExcluded ? styles.segmentBtnExcludeActive : {})
                    }}
                    onClick={() => toggleSegment(segment.id, true)}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Step 3: Content
  const renderContentStep = () => {
    if (campaign.type === 'email') return renderEmailContent();
    if (campaign.type === 'sms') return renderSMSContent();
    if (campaign.type === 'push') return renderPushContent();
    return null;
  };

  const renderEmailContent = () => (
    <div style={styles.stepContent}>
      <div style={styles.emailBuilderLayout}>
        {/* Settings Panel */}
        <div style={styles.emailSettings}>
          <div style={styles.stepSection}>
            <h3 style={styles.sectionTitle}>Email Details</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Subject Line *</label>
              <div style={styles.inputWithAI}>
                <input
                  type="text"
                  placeholder="Enter a compelling subject line..."
                  value={campaign.subject}
                  onChange={(e) => updateCampaign('subject', e.target.value)}
                  style={{
                    ...styles.textInput,
                    ...(validationErrors.subject ? styles.inputError : {})
                  }}
                />
                <button style={styles.aiBtn} title="AI Assist">
                  <Wand2 size={16} />
                </button>
              </div>
              {validationErrors.subject && (
                <span style={styles.errorText}>{validationErrors.subject}</span>
              )}
              <span style={styles.charCount}>{campaign.subject.length}/60 characters</span>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Preview Text</label>
              <input
                type="text"
                placeholder="Brief preview shown in inbox..."
                value={campaign.preheader}
                onChange={(e) => updateCampaign('preheader', e.target.value)}
                style={styles.textInput}
              />
              <span style={styles.charCount}>{campaign.preheader.length}/100 characters</span>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>From Name *</label>
                <input
                  type="text"
                  value={campaign.fromName}
                  onChange={(e) => updateCampaign('fromName', e.target.value)}
                  style={{
                    ...styles.textInput,
                    ...(validationErrors.fromName ? styles.inputError : {})
                  }}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>From Email *</label>
                <input
                  type="email"
                  value={campaign.fromEmail}
                  onChange={(e) => updateCampaign('fromEmail', e.target.value)}
                  style={{
                    ...styles.textInput,
                    ...(validationErrors.fromEmail ? styles.inputError : {})
                  }}
                />
              </div>
            </div>
          </div>

          <div style={styles.stepSection}>
            <h3 style={styles.sectionTitle}>Choose Template</h3>
            <div style={styles.templateGrid}>
              {templates.filter(t => t.type === 'email').map((template) => (
                <button key={template.id} style={styles.templateCard}>
                  <div style={styles.templateThumb}>
                    <Layout size={24} color="var(--color-text-muted)" />
                  </div>
                  <span style={styles.templateName}>{template.name}</span>
                </button>
              ))}
              <button style={styles.templateCardAdd}>
                <Plus size={24} />
                <span>Blank</span>
              </button>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div style={styles.emailPreview}>
          <div style={styles.previewHeader}>
            <span style={styles.previewTitle}>Preview</span>
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
          </div>
          <div style={{
            ...styles.previewFrame,
            ...(previewMode === 'mobile' ? styles.previewFrameMobile : {})
          }}>
            <div style={styles.previewContent}>
              <div style={styles.previewSubject}>
                {campaign.subject || 'Your subject line here...'}
              </div>
              <div style={styles.previewPreheader}>
                {campaign.preheader || 'Preview text will appear here...'}
              </div>
              <div style={styles.previewBody}>
                <div style={styles.previewPlaceholder}>
                  <Layout size={40} color="var(--color-text-muted)" />
                  <p>Email content preview</p>
                  <span>Select a template or build from scratch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSMSContent = () => (
    <div style={styles.stepContent}>
      <div style={styles.smsLayout}>
        <div style={styles.smsEditor}>
          <div style={styles.stepSection}>
            <h3 style={styles.sectionTitle}>Message Content</h3>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>SMS Message *</label>
              <div style={styles.inputWithAI}>
                <textarea
                  placeholder="Type your message... Use {{first_name}} for personalization"
                  value={campaign.smsMessage}
                  onChange={(e) => {
                    updateCampaign('smsMessage', e.target.value);
                    updateCampaign('smsCharCount', e.target.value.length);
                  }}
                  style={{
                    ...styles.textArea,
                    ...(validationErrors.smsMessage ? styles.inputError : {})
                  }}
                  rows={5}
                />
                <button style={{...styles.aiBtn, alignSelf: 'flex-start', marginTop: '8px'}} title="AI Assist">
                  <Wand2 size={16} />
                </button>
              </div>
              {validationErrors.smsMessage && (
                <span style={styles.errorText}>{validationErrors.smsMessage}</span>
              )}
              <div style={styles.smsCharInfo}>
                <span>{campaign.smsCharCount}/160 characters</span>
                <span>{Math.ceil(campaign.smsCharCount / 160) || 1} SMS segment(s)</span>
              </div>
            </div>

            <div style={styles.mergeTagsSection}>
              <span style={styles.mergeTagsLabel}>Insert merge tag:</span>
              <div style={styles.mergeTagsList}>
                {['{{first_name}}', '{{last_name}}', '{{company}}', '{{link}}'].map(tag => (
                  <button
                    key={tag}
                    style={styles.mergeTagBtn}
                    onClick={() => updateCampaign('smsMessage', campaign.smsMessage + tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={styles.smsPreview}>
          <div style={styles.phoneFrame}>
            <div style={styles.phoneNotch} />
            <div style={styles.phoneScreen}>
              <div style={styles.smsBubble}>
                {campaign.smsMessage || 'Your message will appear here...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPushContent = () => (
    <div style={styles.stepContent}>
      <div style={styles.pushLayout}>
        <div style={styles.pushEditor}>
          <div style={styles.stepSection}>
            <h3 style={styles.sectionTitle}>Notification Content</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Title *</label>
              <input
                type="text"
                placeholder="Notification title..."
                value={campaign.pushTitle}
                onChange={(e) => updateCampaign('pushTitle', e.target.value)}
                style={{
                  ...styles.textInput,
                  ...(validationErrors.pushTitle ? styles.inputError : {})
                }}
              />
              {validationErrors.pushTitle && (
                <span style={styles.errorText}>{validationErrors.pushTitle}</span>
              )}
              <span style={styles.charCount}>{campaign.pushTitle.length}/50 characters</span>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Body *</label>
              <textarea
                placeholder="Notification body text..."
                value={campaign.pushBody}
                onChange={(e) => updateCampaign('pushBody', e.target.value)}
                style={{
                  ...styles.textArea,
                  ...(validationErrors.pushBody ? styles.inputError : {})
                }}
                rows={3}
              />
              {validationErrors.pushBody && (
                <span style={styles.errorText}>{validationErrors.pushBody}</span>
              )}
              <span style={styles.charCount}>{campaign.pushBody.length}/150 characters</span>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Click URL</label>
              <input
                type="url"
                placeholder="https://yourstore.com/page"
                value={campaign.pushUrl}
                onChange={(e) => updateCampaign('pushUrl', e.target.value)}
                style={styles.textInput}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Image (optional)</label>
              <div style={styles.imageUpload}>
                <Image size={24} color="var(--color-text-muted)" />
                <span>Click to upload or drag and drop</span>
                <span style={styles.imageUploadHint}>PNG, JPG up to 1MB</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.pushPreview}>
          <div style={styles.phoneFrame}>
            <div style={styles.phoneNotch} />
            <div style={styles.phoneScreen}>
              <div style={styles.pushNotification}>
                <div style={styles.pushNotificationHeader}>
                  <div style={styles.pushAppIcon}>
                    <Bell size={14} />
                  </div>
                  <span style={styles.pushAppName}>Your App</span>
                  <span style={styles.pushTime}>now</span>
                </div>
                <div style={styles.pushNotificationContent}>
                  <span style={styles.pushNotificationTitle}>
                    {campaign.pushTitle || 'Notification Title'}
                  </span>
                  <span style={styles.pushNotificationBody}>
                    {campaign.pushBody || 'Notification body text will appear here...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 4: Schedule
  const renderScheduleStep = () => (
    <div style={styles.stepContent}>
      <div style={styles.stepSection}>
        <h3 style={styles.sectionTitle}>When to Send</h3>
        <div style={styles.scheduleOptions}>
          <button
            style={{
              ...styles.scheduleOption,
              ...(campaign.scheduleType === 'now' ? styles.scheduleOptionActive : {})
            }}
            onClick={() => updateCampaign('scheduleType', 'now')}
          >
            <Send size={24} />
            <span style={styles.scheduleOptionTitle}>Send Now</span>
            <span style={styles.scheduleOptionDesc}>Send immediately after review</span>
            {campaign.scheduleType === 'now' && (
              <div style={styles.scheduleCheck}><Check size={14} /></div>
            )}
          </button>

          <button
            style={{
              ...styles.scheduleOption,
              ...(campaign.scheduleType === 'scheduled' ? styles.scheduleOptionActive : {})
            }}
            onClick={() => updateCampaign('scheduleType', 'scheduled')}
          >
            <Calendar size={24} />
            <span style={styles.scheduleOptionTitle}>Schedule</span>
            <span style={styles.scheduleOptionDesc}>Choose a specific date and time</span>
            {campaign.scheduleType === 'scheduled' && (
              <div style={styles.scheduleCheck}><Check size={14} /></div>
            )}
          </button>
        </div>

        {campaign.scheduleType === 'scheduled' && (
          <div style={styles.scheduleDetails}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Date *</label>
                <input
                  type="date"
                  value={campaign.scheduledDate}
                  onChange={(e) => updateCampaign('scheduledDate', e.target.value)}
                  style={{
                    ...styles.textInput,
                    ...(validationErrors.scheduledDate ? styles.inputError : {})
                  }}
                />
                {validationErrors.scheduledDate && (
                  <span style={styles.errorText}>{validationErrors.scheduledDate}</span>
                )}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Time *</label>
                <input
                  type="time"
                  value={campaign.scheduledTime}
                  onChange={(e) => updateCampaign('scheduledTime', e.target.value)}
                  style={{
                    ...styles.textInput,
                    ...(validationErrors.scheduledTime ? styles.inputError : {})
                  }}
                />
                {validationErrors.scheduledTime && (
                  <span style={styles.errorText}>{validationErrors.scheduledTime}</span>
                )}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Timezone</label>
                <select
                  value={campaign.timezone}
                  onChange={(e) => updateCampaign('timezone', e.target.value)}
                  style={styles.selectInput}
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={styles.stepSection}>
        <h3 style={styles.sectionTitle}>Tracking & Analytics</h3>
        <div style={styles.trackingOptions}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={campaign.trackOpens}
              onChange={(e) => updateCampaign('trackOpens', e.target.checked)}
              style={styles.checkboxInput}
            />
            <span style={styles.checkboxText}>Track email opens</span>
          </label>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={campaign.trackClicks}
              onChange={(e) => updateCampaign('trackClicks', e.target.checked)}
              style={styles.checkboxInput}
            />
            <span style={styles.checkboxText}>Track link clicks</span>
          </label>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={campaign.googleAnalytics}
              onChange={(e) => updateCampaign('googleAnalytics', e.target.checked)}
              style={styles.checkboxInput}
            />
            <span style={styles.checkboxText}>Add Google Analytics tracking</span>
          </label>
        </div>
      </div>
    </div>
  );

  // Step 5: Review
  const renderReviewStep = () => {
    const selectedType = campaignTypes.find(t => t.id === campaign.type);
    const TypeIcon = selectedType?.icon || Mail;

    return (
      <div style={styles.stepContent}>
        <div style={styles.reviewGrid}>
          {/* Campaign Summary */}
          <div style={styles.reviewCard}>
            <div style={styles.reviewCardHeader}>
              <h3 style={styles.reviewCardTitle}>Campaign Details</h3>
              <button style={styles.editBtn} onClick={() => setCurrentStep(1)}>
                <Edit size={14} />
                Edit
              </button>
            </div>
            <div style={styles.reviewItem}>
              <span style={styles.reviewLabel}>Name</span>
              <span style={styles.reviewValue}>{campaign.name}</span>
            </div>
            <div style={styles.reviewItem}>
              <span style={styles.reviewLabel}>Type</span>
              <span style={{...styles.reviewValue, display: 'flex', alignItems: 'center', gap: '8px'}}>
                <TypeIcon size={16} color={selectedType?.color} />
                {selectedType?.name}
              </span>
            </div>
          </div>

          {/* Audience Summary */}
          <div style={styles.reviewCard}>
            <div style={styles.reviewCardHeader}>
              <h3 style={styles.reviewCardTitle}>Audience</h3>
              <button style={styles.editBtn} onClick={() => setCurrentStep(2)}>
                <Edit size={14} />
                Edit
              </button>
            </div>
            <div style={styles.reviewItem}>
              <span style={styles.reviewLabel}>Segments</span>
              <span style={styles.reviewValue}>
                {campaign.selectedSegments.length} selected
              </span>
            </div>
            <div style={styles.reviewItem}>
              <span style={styles.reviewLabel}>Estimated Reach</span>
              <span style={{...styles.reviewValue, fontWeight: 700, color: 'var(--color-primary)'}}>
                {formatNumber(campaign.estimatedReach)} contacts
              </span>
            </div>
          </div>

          {/* Content Summary */}
          <div style={styles.reviewCard}>
            <div style={styles.reviewCardHeader}>
              <h3 style={styles.reviewCardTitle}>Content</h3>
              <button style={styles.editBtn} onClick={() => setCurrentStep(3)}>
                <Edit size={14} />
                Edit
              </button>
            </div>
            {campaign.type === 'email' && (
              <>
                <div style={styles.reviewItem}>
                  <span style={styles.reviewLabel}>Subject</span>
                  <span style={styles.reviewValue}>{campaign.subject || '-'}</span>
                </div>
                <div style={styles.reviewItem}>
                  <span style={styles.reviewLabel}>From</span>
                  <span style={styles.reviewValue}>{campaign.fromName} &lt;{campaign.fromEmail}&gt;</span>
                </div>
              </>
            )}
            {campaign.type === 'sms' && (
              <div style={styles.reviewItem}>
                <span style={styles.reviewLabel}>Message</span>
                <span style={styles.reviewValue}>
                  {campaign.smsMessage?.substring(0, 50) || '-'}
                  {campaign.smsMessage?.length > 50 && '...'}
                </span>
              </div>
            )}
            {campaign.type === 'push' && (
              <>
                <div style={styles.reviewItem}>
                  <span style={styles.reviewLabel}>Title</span>
                  <span style={styles.reviewValue}>{campaign.pushTitle || '-'}</span>
                </div>
                <div style={styles.reviewItem}>
                  <span style={styles.reviewLabel}>Body</span>
                  <span style={styles.reviewValue}>{campaign.pushBody || '-'}</span>
                </div>
              </>
            )}
          </div>

          {/* Schedule Summary */}
          <div style={styles.reviewCard}>
            <div style={styles.reviewCardHeader}>
              <h3 style={styles.reviewCardTitle}>Schedule</h3>
              <button style={styles.editBtn} onClick={() => setCurrentStep(4)}>
                <Edit size={14} />
                Edit
              </button>
            </div>
            <div style={styles.reviewItem}>
              <span style={styles.reviewLabel}>When</span>
              <span style={styles.reviewValue}>
                {campaign.scheduleType === 'now' 
                  ? 'Send immediately'
                  : `${campaign.scheduledDate} at ${campaign.scheduledTime}`
                }
              </span>
            </div>
            <div style={styles.reviewItem}>
              <span style={styles.reviewLabel}>Tracking</span>
              <span style={styles.reviewValue}>
                {[
                  campaign.trackOpens && 'Opens',
                  campaign.trackClicks && 'Clicks',
                  campaign.googleAnalytics && 'GA'
                ].filter(Boolean).join(', ') || 'None'}
              </span>
            </div>
          </div>
        </div>

        {/* Final Check */}
        <div style={styles.finalCheck}>
          <CheckCircle size={24} color="#22c55e" />
          <div>
            <span style={styles.finalCheckTitle}>Ready to send!</span>
            <span style={styles.finalCheckDesc}>
              Your campaign will be sent to {formatNumber(campaign.estimatedReach)} contacts
              {campaign.scheduleType === 'scheduled' && ` on ${campaign.scheduledDate} at ${campaign.scheduledTime}`}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>
            {campaignId ? 'Edit Campaign' : 'Create Campaign'}
          </h1>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            style={styles.saveDraftBtn}
            onClick={() => handleSave(false)}
            disabled={isSaving}
          >
            Save Draft
          </button>
        </div>
      </div>

      {/* Progress Steps */}
      <div style={styles.stepsNav}>
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          return (
            <React.Fragment key={step.id}>
              <button
                style={{
                  ...styles.stepItem,
                  ...(isActive ? styles.stepItemActive : {}),
                  ...(isCompleted ? styles.stepItemCompleted : {})
                }}
                onClick={() => isCompleted && setCurrentStep(step.id)}
              >
                <div style={{
                  ...styles.stepIcon,
                  ...(isActive ? styles.stepIconActive : {}),
                  ...(isCompleted ? styles.stepIconCompleted : {})
                }}>
                  {isCompleted ? <Check size={18} /> : <StepIcon size={18} />}
                </div>
                <span style={styles.stepName}>{step.name}</span>
              </button>
              {index < steps.length - 1 && (
                <div style={{
                  ...styles.stepConnector,
                  ...(isCompleted ? styles.stepConnectorCompleted : {})
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step Content */}
      <div style={styles.contentArea}>
        {renderStepContent()}
      </div>

      {/* Footer Navigation */}
      <div style={styles.footer}>
        <button
          style={styles.backBtn}
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ChevronLeft size={18} />
          Back
        </button>
        <div style={styles.footerRight}>
          {currentStep < 5 ? (
            <button style={styles.nextBtn} onClick={handleNext}>
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              style={styles.launchBtn}
              onClick={() => handleSave(true)}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Launching...
                </>
              ) : (
                <>
                  <Send size={18} />
                  {campaign.scheduleType === 'now' ? 'Launch Campaign' : 'Schedule Campaign'}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'var(--color-background)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)'
  },
  headerLeft: {},
  title: {
    fontSize: '20px',
    fontWeight: 600,
    margin: 0
  },
  headerRight: {
    display: 'flex',
    gap: '12px'
  },
  cancelBtn: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  saveDraftBtn: {
    padding: '10px 20px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  stepsNav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 32px',
    backgroundColor: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)'
  },
  stepItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  stepItemActive: {
    color: 'var(--color-primary)'
  },
  stepItemCompleted: {
    color: '#22c55e',
    cursor: 'pointer'
  },
  stepIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepIconActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: 'var(--color-primary)'
  },
  stepIconCompleted: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    color: '#22c55e'
  },
  stepName: {
    fontWeight: 500
  },
  stepConnector: {
    width: '60px',
    height: '2px',
    backgroundColor: 'var(--color-border)',
    margin: '0 8px'
  },
  stepConnectorCompleted: {
    backgroundColor: '#22c55e'
  },
  contentArea: {
    flex: 1,
    overflow: 'auto',
    padding: '32px'
  },
  stepContent: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  stepSection: {
    marginBottom: '32px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 16px 0'
  },
  textInput: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  inputError: {
    borderColor: '#ef4444'
  },
  errorText: {
    display: 'block',
    color: '#ef4444',
    fontSize: '12px',
    marginTop: '6px'
  },
  typeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
  typeCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 24px',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center'
  },
  typeCardSelected: {
    backgroundColor: 'var(--color-surface-2)'
  },
  typeIconWrapper: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  typeName: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '8px'
  },
  typeDescription: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.4
  },
  typeCheck: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  audienceHeader: {
    marginBottom: '24px'
  },
  audienceStats: {
    display: 'flex',
    gap: '24px'
  },
  audienceStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  audienceStatValue: {
    display: 'block',
    fontSize: '24px',
    fontWeight: 700
  },
  audienceStatLabel: {
    display: 'block',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  segmentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  segmentItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px'
  },
  segmentItemSelected: {
    borderColor: 'var(--color-primary)',
    backgroundColor: 'rgba(59, 130, 246, 0.05)'
  },
  segmentItemExcluded: {
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.05)'
  },
  segmentInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  segmentIconWrapper: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)'
  },
  segmentName: {
    display: 'block',
    fontWeight: 600,
    fontSize: '14px'
  },
  segmentCount: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  segmentActions: {
    display: 'flex',
    gap: '8px'
  },
  segmentBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  segmentBtnActive: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    color: '#fff'
  },
  segmentBtnExclude: {
    padding: '8px'
  },
  segmentBtnExcludeActive: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
    color: '#fff'
  },
  emailBuilderLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '32px'
  },
  emailSettings: {},
  formGroup: {
    marginBottom: '20px'
  },
  formLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: '8px'
  },
  inputWithAI: {
    display: 'flex',
    gap: '8px'
  },
  aiBtn: {
    padding: '12px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    border: 'none',
    borderRadius: '10px',
    color: '#8b5cf6',
    cursor: 'pointer'
  },
  charCount: {
    display: 'block',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginTop: '6px',
    textAlign: 'right'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  templateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px'
  },
  templateCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    padding: '16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    cursor: 'pointer'
  },
  templateThumb: {
    width: '100%',
    height: '80px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  templateName: {
    fontSize: '12px',
    fontWeight: 500
  },
  templateCardAdd: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '16px',
    backgroundColor: 'transparent',
    border: '2px dashed var(--color-border)',
    borderRadius: '12px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    minHeight: '120px'
  },
  emailPreview: {
    position: 'sticky',
    top: '0'
  },
  previewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  previewTitle: {
    fontSize: '14px',
    fontWeight: 600
  },
  previewToggle: {
    display: 'flex',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
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
    backgroundColor: 'var(--color-surface-2)',
    color: 'var(--color-text)'
  },
  previewFrame: {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  },
  previewFrameMobile: {
    maxWidth: '375px',
    margin: '0 auto'
  },
  previewContent: {
    padding: '20px'
  },
  previewSubject: {
    fontWeight: 600,
    fontSize: '16px',
    marginBottom: '4px'
  },
  previewPreheader: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginBottom: '20px'
  },
  previewBody: {
    minHeight: '300px'
  },
  previewPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
    gap: '12px',
    color: 'var(--color-text-muted)',
    textAlign: 'center'
  },
  smsLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '32px'
  },
  smsEditor: {},
  textArea: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  smsCharInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginTop: '6px'
  },
  mergeTagsSection: {
    marginTop: '16px'
  },
  mergeTagsLabel: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    marginBottom: '8px'
  },
  mergeTagsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  mergeTagBtn: {
    padding: '6px 12px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    fontSize: '12px',
    fontFamily: 'monospace',
    cursor: 'pointer'
  },
  smsPreview: {
    display: 'flex',
    justifyContent: 'center'
  },
  phoneFrame: {
    width: '280px',
    backgroundColor: '#1a1a1a',
    borderRadius: '36px',
    padding: '12px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
  },
  phoneNotch: {
    width: '120px',
    height: '24px',
    backgroundColor: '#000',
    borderRadius: '12px',
    margin: '0 auto 12px'
  },
  phoneScreen: {
    backgroundColor: '#f5f5f5',
    borderRadius: '24px',
    minHeight: '400px',
    padding: '20px'
  },
  smsBubble: {
    backgroundColor: '#007AFF',
    color: '#fff',
    padding: '12px 16px',
    borderRadius: '18px',
    borderBottomRightRadius: '4px',
    maxWidth: '85%',
    marginLeft: 'auto',
    fontSize: '14px',
    lineHeight: 1.4
  },
  pushLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '32px'
  },
  pushEditor: {},
  pushPreview: {
    display: 'flex',
    justifyContent: 'center'
  },
  pushNotification: {
    backgroundColor: '#fff',
    borderRadius: '14px',
    padding: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    margin: '40px 12px'
  },
  pushNotificationHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px'
  },
  pushAppIcon: {
    width: '20px',
    height: '20px',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  pushAppName: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#666'
  },
  pushTime: {
    fontSize: '11px',
    color: '#999',
    marginLeft: 'auto'
  },
  pushNotificationContent: {},
  pushNotificationTitle: {
    display: 'block',
    fontWeight: 600,
    fontSize: '14px',
    color: '#000',
    marginBottom: '4px'
  },
  pushNotificationBody: {
    display: 'block',
    fontSize: '13px',
    color: '#333',
    lineHeight: 1.3
  },
  imageUpload: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '32px',
    backgroundColor: 'var(--color-surface)',
    border: '2px dashed var(--color-border)',
    borderRadius: '12px',
    cursor: 'pointer',
    color: 'var(--color-text-muted)',
    fontSize: '14px'
  },
  imageUploadHint: {
    fontSize: '11px'
  },
  scheduleOptions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '24px'
  },
  scheduleOption: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '32px 24px',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: '16px',
    cursor: 'pointer',
    textAlign: 'center'
  },
  scheduleOptionActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: 'rgba(59, 130, 246, 0.05)'
  },
  scheduleOptionTitle: {
    fontSize: '16px',
    fontWeight: 600
  },
  scheduleOptionDesc: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  scheduleCheck: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  scheduleDetails: {
    padding: '24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  selectInput: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer'
  },
  trackingOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer'
  },
  checkboxInput: {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  checkboxText: {
    fontSize: '14px'
  },
  reviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '24px'
  },
  reviewCard: {
    padding: '24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  reviewCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  reviewCardTitle: {
    fontSize: '14px',
    fontWeight: 600,
    margin: 0
  },
  editBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  reviewItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '10px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  reviewLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  reviewValue: {
    fontSize: '14px',
    fontWeight: 500,
    textAlign: 'right',
    maxWidth: '60%'
  },
  finalCheck: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '24px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '16px',
    border: '1px solid rgba(34, 197, 94, 0.3)'
  },
  finalCheckTitle: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 600,
    color: '#22c55e'
  },
  finalCheckDesc: {
    display: 'block',
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    marginTop: '4px'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)'
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  footerRight: {
    display: 'flex',
    gap: '12px'
  },
  nextBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  launchBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 28px',
    backgroundColor: '#22c55e',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  }
};

export default CampaignBuilder;