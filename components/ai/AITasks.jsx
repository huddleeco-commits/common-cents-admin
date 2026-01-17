/**
 * AITasks
 * 
 * Automated tasks that AI can run on schedule.
 * - Daily/weekly reports
 * - Price monitoring and auto-adjustments
 * - Inventory alerts and reordering
 * - Social media posting
 * - Review responses
 * - Competitor tracking
 * 
 * Set it and forget it automation.
 */

import React, { useState } from 'react';
import {
  Clock,
  Zap,
  Play,
  Pause,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  Mail,
  DollarSign,
  Package,
  Star,
  Target,
  Share2,
  FileText,
  Bell,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  MoreVertical,
  RefreshCw
} from 'lucide-react';

export function AITasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Daily Performance Report',
      description: 'Generate and email daily sales, traffic, and insights summary',
      type: 'report',
      schedule: 'Daily at 8:00 AM',
      frequency: 'daily',
      time: '08:00',
      enabled: true,
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 16),
      nextRun: new Date(Date.now() + 1000 * 60 * 60 * 8),
      status: 'success',
      actions: ['Generate report', 'Email to owner']
    },
    {
      id: 2,
      name: 'Competitor Price Check',
      description: 'Monitor competitor prices and alert on significant changes',
      type: 'monitoring',
      schedule: 'Every 6 hours',
      frequency: 'hourly',
      interval: 6,
      enabled: true,
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 2),
      nextRun: new Date(Date.now() + 1000 * 60 * 60 * 4),
      status: 'success',
      actions: ['Scan competitors', 'Compare prices', 'Alert if >5% change']
    },
    {
      id: 3,
      name: 'Low Stock Alerts',
      description: 'Check inventory levels and alert when items are running low',
      type: 'inventory',
      schedule: 'Daily at 6:00 AM',
      frequency: 'daily',
      time: '06:00',
      enabled: true,
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 18),
      nextRun: new Date(Date.now() + 1000 * 60 * 60 * 6),
      status: 'warning',
      statusMessage: '2 items flagged as low',
      actions: ['Check inventory', 'Flag low items', 'Send alert']
    },
    {
      id: 4,
      name: 'Review Response',
      description: 'Draft responses to new customer reviews for approval',
      type: 'reviews',
      schedule: 'Every 4 hours',
      frequency: 'hourly',
      interval: 4,
      enabled: true,
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 1),
      nextRun: new Date(Date.now() + 1000 * 60 * 60 * 3),
      status: 'pending',
      statusMessage: '2 drafts awaiting approval',
      actions: ['Check new reviews', 'Draft response', 'Queue for approval']
    },
    {
      id: 5,
      name: 'Weekly Social Post',
      description: 'Generate and schedule weekly special promotion post',
      type: 'social',
      schedule: 'Thursdays at 10:00 AM',
      frequency: 'weekly',
      dayOfWeek: 4,
      time: '10:00',
      enabled: false,
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      nextRun: null,
      status: 'disabled',
      actions: ['Generate content', 'Create image', 'Schedule post']
    },
    {
      id: 6,
      name: 'SEO Health Check',
      description: 'Analyze website SEO and suggest improvements',
      type: 'seo',
      schedule: 'Mondays at 9:00 AM',
      frequency: 'weekly',
      dayOfWeek: 1,
      time: '09:00',
      enabled: true,
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      nextRun: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
      status: 'success',
      actions: ['Crawl website', 'Check rankings', 'Generate report']
    }
  ]);

  const [showNewTask, setShowNewTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const taskTypes = [
    { id: 'report', label: 'Reports', icon: FileText, color: '#3b82f6' },
    { id: 'monitoring', label: 'Monitoring', icon: Target, color: '#f97316' },
    { id: 'inventory', label: 'Inventory', icon: Package, color: '#22c55e' },
    { id: 'reviews', label: 'Reviews', icon: Star, color: '#eab308' },
    { id: 'social', label: 'Social Media', icon: Share2, color: '#ec4899' },
    { id: 'seo', label: 'SEO', icon: Zap, color: '#8b5cf6' },
    { id: 'email', label: 'Email', icon: Mail, color: '#06b6d4' },
    { id: 'pricing', label: 'Pricing', icon: DollarSign, color: '#22c55e' }
  ];

  const getTypeConfig = (type) => {
    return taskTypes.find(t => t.id === type) || taskTypes[0];
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'success':
        return { backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' };
      case 'warning':
        return { backgroundColor: 'rgba(234, 179, 8, 0.1)', color: '#eab308' };
      case 'error':
        return { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      case 'pending':
        return { backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' };
      case 'disabled':
        return { backgroundColor: 'var(--color-surface-2)', color: 'var(--color-text-muted)' };
      default:
        return { backgroundColor: 'var(--color-surface-2)', color: 'var(--color-text-muted)' };
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const formatTimeUntil = (date) => {
    if (!date) return 'Not scheduled';
    const now = new Date();
    const diff = date - now;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    if (hours < 1) return `in ${minutes}m`;
    if (hours < 24) return `in ${hours}h ${minutes}m`;
    return `in ${Math.floor(hours / 24)}d`;
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, enabled: !task.enabled } : task
    ));
  };

  const runTaskNow = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { 
        ...task, 
        lastRun: new Date(),
        status: 'success'
      } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const enabledTasks = tasks.filter(t => t.enabled);
  const disabledTasks = tasks.filter(t => !t.enabled);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <Clock size={24} style={{ color: '#06b6d4' }} />
          <div>
            <h2 style={styles.title}>Automated Tasks</h2>
            <p style={styles.subtitle}>
              {enabledTasks.length} active tasks running on autopilot
            </p>
          </div>
        </div>
        <button 
          style={styles.newTaskButton}
          onClick={() => setShowNewTask(true)}
        >
          <Plus size={16} />
          New Task
        </button>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
            <CheckCircle size={20} color="#22c55e" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{enabledTasks.length}</span>
            <span style={styles.statLabel}>Active Tasks</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
            <RefreshCw size={20} color="#3b82f6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>24</span>
            <span style={styles.statLabel}>Runs Today</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: 'rgba(234, 179, 8, 0.1)' }}>
            <AlertCircle size={20} color="#eab308" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>2</span>
            <span style={styles.statLabel}>Need Attention</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
            <Zap size={20} color="#8b5cf6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>12hrs</span>
            <span style={styles.statLabel}>Saved This Week</span>
          </div>
        </div>
      </div>

      {/* Task Types Quick Filter */}
      <div style={styles.typeFilters}>
        {taskTypes.map(type => {
          const count = tasks.filter(t => t.type === type.id && t.enabled).length;
          return (
            <div 
              key={type.id} 
              style={{
                ...styles.typeFilter,
                borderColor: count > 0 ? type.color : 'var(--color-border)'
              }}
            >
              <type.icon size={16} color={type.color} />
              <span>{type.label}</span>
              {count > 0 && (
                <span style={{
                  ...styles.typeCount,
                  backgroundColor: type.color
                }}>
                  {count}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Tasks */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Active Tasks</h3>
        <div style={styles.tasksList}>
          {enabledTasks.map(task => {
            const typeConfig = getTypeConfig(task.type);
            const TypeIcon = typeConfig.icon;
            
            return (
              <div key={task.id} style={styles.taskCard}>
                <div style={styles.taskHeader}>
                  <div style={{
                    ...styles.taskIcon,
                    backgroundColor: `${typeConfig.color}20`,
                    color: typeConfig.color
                  }}>
                    <TypeIcon size={20} />
                  </div>
                  
                  <div style={styles.taskInfo}>
                    <h4 style={styles.taskName}>{task.name}</h4>
                    <p style={styles.taskDescription}>{task.description}</p>
                  </div>

                  <div style={styles.taskActions}>
                    <button 
                      style={styles.taskActionButton}
                      onClick={() => runTaskNow(task.id)}
                      title="Run now"
                    >
                      <Play size={14} />
                    </button>
                    <button 
                      style={styles.taskActionButton}
                      onClick={() => setEditingTask(task)}
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      style={{
                        ...styles.taskActionButton,
                        ...(task.enabled ? styles.pauseButton : {})
                      }}
                      onClick={() => toggleTask(task.id)}
                      title={task.enabled ? 'Pause' : 'Resume'}
                    >
                      <Pause size={14} />
                    </button>
                  </div>
                </div>

                <div style={styles.taskBody}>
                  <div style={styles.taskSchedule}>
                    <Calendar size={14} />
                    <span>{task.schedule}</span>
                  </div>

                  <div style={styles.taskTiming}>
                    <div style={styles.taskTime}>
                      <span style={styles.taskTimeLabel}>Last run</span>
                      <span style={styles.taskTimeValue}>{formatTimeAgo(task.lastRun)}</span>
                    </div>
                    <div style={styles.taskTimeDivider} />
                    <div style={styles.taskTime}>
                      <span style={styles.taskTimeLabel}>Next run</span>
                      <span style={styles.taskTimeValue}>{formatTimeUntil(task.nextRun)}</span>
                    </div>
                  </div>

                  <div style={{
                    ...styles.taskStatus,
                    ...getStatusStyle(task.status)
                  }}>
                    {task.status === 'success' && <CheckCircle size={14} />}
                    {task.status === 'warning' && <AlertCircle size={14} />}
                    {task.status === 'pending' && <Clock size={14} />}
                    <span>
                      {task.statusMessage || 
                       (task.status === 'success' ? 'Completed successfully' : 
                        task.status === 'pending' ? 'Action required' : '')}
                    </span>
                  </div>
                </div>

                <div style={styles.taskFooter}>
                  <div style={styles.taskSteps}>
                    {task.actions.map((action, i) => (
                      <React.Fragment key={i}>
                        <span style={styles.taskStep}>{action}</span>
                        {i < task.actions.length - 1 && (
                          <ChevronRight size={12} style={{ opacity: 0.5 }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disabled Tasks */}
      {disabledTasks.length > 0 && (
        <div style={styles.section}>
          <h3 style={{ ...styles.sectionTitle, color: 'var(--color-text-muted)' }}>
            Paused Tasks
          </h3>
          <div style={styles.tasksList}>
            {disabledTasks.map(task => {
              const typeConfig = getTypeConfig(task.type);
              const TypeIcon = typeConfig.icon;
              
              return (
                <div key={task.id} style={{ ...styles.taskCard, opacity: 0.6 }}>
                  <div style={styles.taskHeader}>
                    <div style={{
                      ...styles.taskIcon,
                      backgroundColor: 'var(--color-surface-2)',
                      color: 'var(--color-text-muted)'
                    }}>
                      <TypeIcon size={20} />
                    </div>
                    
                    <div style={styles.taskInfo}>
                      <h4 style={styles.taskName}>{task.name}</h4>
                      <p style={styles.taskDescription}>{task.description}</p>
                    </div>

                    <div style={styles.taskActions}>
                      <button 
                        style={styles.resumeButton}
                        onClick={() => toggleTask(task.id)}
                      >
                        <Play size={14} />
                        Resume
                      </button>
                      <button 
                        style={styles.deleteButton}
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Suggested Tasks */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>
          <Zap size={18} />
          Suggested Automations
        </h3>
        <div style={styles.suggestedGrid}>
          <div style={styles.suggestedCard}>
            <Bell size={24} />
            <h4>Price Drop Alerts</h4>
            <p>Get notified when competitors lower prices</p>
            <button style={styles.suggestedButton}>
              <Plus size={14} /> Add
            </button>
          </div>
          <div style={styles.suggestedCard}>
            <Mail size={24} />
            <h4>Weekly Newsletter</h4>
            <p>Auto-generate and send customer newsletter</p>
            <button style={styles.suggestedButton}>
              <Plus size={14} /> Add
            </button>
          </div>
          <div style={styles.suggestedCard}>
            <Star size={24} />
            <h4>Review Solicitation</h4>
            <p>Request reviews from happy customers</p>
            <button style={styles.suggestedButton}>
              <Plus size={14} /> Add
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
    gap: '24px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    margin: 0
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0'
  },
  newTaskButton: {
    display: 'flex',
    alignItems: 'center',
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 700
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  typeFilters: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  typeFilter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '20px',
    fontSize: '13px'
  },
  typeCount: {
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: 600,
    color: '#ffffff'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  tasksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  taskCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  taskHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px',
    borderBottom: '1px solid var(--color-border)'
  },
  taskIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskInfo: {
    flex: 1
  },
  taskName: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 4px 0'
  },
  taskDescription: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: 0
  },
  taskActions: {
    display: 'flex',
    gap: '8px'
  },
  taskActionButton: {
    padding: '10px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  pauseButton: {
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderColor: 'rgba(234, 179, 8, 0.3)',
    color: '#eab308'
  },
  taskBody: {
    padding: '20px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  taskSchedule: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  taskTiming: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flex: 1
  },
  taskTime: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  taskTimeLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase'
  },
  taskTimeValue: {
    fontSize: '14px',
    fontWeight: 500
  },
  taskTimeDivider: {
    width: '1px',
    height: '30px',
    backgroundColor: 'var(--color-border)'
  },
  taskStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 500
  },
  taskFooter: {
    padding: '16px 24px',
    backgroundColor: 'var(--color-surface-2)'
  },
  taskSteps: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  taskStep: {
    padding: '4px 10px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '6px'
  },
  resumeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '13px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '10px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: 'none',
    borderRadius: '8px',
    color: '#ef4444',
    cursor: 'pointer'
  },
  suggestedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  },
  suggestedCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '2px dashed var(--color-border)',
    textAlign: 'center'
  },
  suggestedButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  }
};

export default AITasks;