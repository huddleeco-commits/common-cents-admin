/**
 * SettingsUsers
 * 
 * User and team management:
 * - User list with roles
 * - Invite new users
 * - Role management
 * - Permissions
 * - Activity log
 * - Team organization
 */

import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Crown,
  User,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Key,
  Lock,
  Unlock,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Eye,
  EyeOff,
  Copy,
  Send,
  X,
  Check,
  ChevronDown,
  ChevronRight,
  Building,
  Briefcase,
  Activity,
  LogIn,
  LogOut,
  Smartphone,
  Monitor,
  Globe
} from 'lucide-react';

export function SettingsUsers() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: 'John Davidson',
          email: 'john@company.com',
          avatar: null,
          role: 'owner',
          status: 'active',
          department: 'Executive',
          lastActive: '2024-01-15T14:30:00',
          joinedAt: '2023-01-15',
          twoFactorEnabled: true,
          invitedBy: null
        },
        {
          id: 2,
          name: 'Sarah Mitchell',
          email: 'sarah@company.com',
          avatar: null,
          role: 'admin',
          status: 'active',
          department: 'Operations',
          lastActive: '2024-01-15T13:45:00',
          joinedAt: '2023-03-20',
          twoFactorEnabled: true,
          invitedBy: 'John Davidson'
        },
        {
          id: 3,
          name: 'Mike Rodriguez',
          email: 'mike@company.com',
          avatar: null,
          role: 'manager',
          status: 'active',
          department: 'Sales',
          lastActive: '2024-01-15T12:00:00',
          joinedAt: '2023-05-10',
          twoFactorEnabled: false,
          invitedBy: 'John Davidson'
        },
        {
          id: 4,
          name: 'Emily Chen',
          email: 'emily@company.com',
          avatar: null,
          role: 'staff',
          status: 'active',
          department: 'Marketing',
          lastActive: '2024-01-15T11:30:00',
          joinedAt: '2023-08-15',
          twoFactorEnabled: true,
          invitedBy: 'Sarah Mitchell'
        },
        {
          id: 5,
          name: 'David Kim',
          email: 'david@company.com',
          avatar: null,
          role: 'staff',
          status: 'active',
          department: 'Support',
          lastActive: '2024-01-14T18:00:00',
          joinedAt: '2023-09-01',
          twoFactorEnabled: false,
          invitedBy: 'Sarah Mitchell'
        },
        {
          id: 6,
          name: 'Lisa Thompson',
          email: 'lisa@company.com',
          avatar: null,
          role: 'viewer',
          status: 'pending',
          department: 'Finance',
          lastActive: null,
          joinedAt: '2024-01-10',
          twoFactorEnabled: false,
          invitedBy: 'John Davidson'
        },
        {
          id: 7,
          name: 'James Wilson',
          email: 'james@company.com',
          avatar: null,
          role: 'staff',
          status: 'inactive',
          department: 'Operations',
          lastActive: '2023-12-15T10:00:00',
          joinedAt: '2023-04-20',
          twoFactorEnabled: false,
          invitedBy: 'Sarah Mitchell'
        }
      ]);

      setRoles([
        {
          id: 'owner',
          name: 'Owner',
          description: 'Full access to everything, including billing and team management',
          color: '#f59e0b',
          icon: Crown,
          userCount: 1,
          permissions: ['all']
        },
        {
          id: 'admin',
          name: 'Admin',
          description: 'Full access except billing. Can manage team members.',
          color: '#ef4444',
          icon: ShieldCheck,
          userCount: 1,
          permissions: ['users.manage', 'settings.manage', 'data.all', 'reports.all']
        },
        {
          id: 'manager',
          name: 'Manager',
          description: 'Can manage orders, products, and view reports',
          color: '#8b5cf6',
          icon: Shield,
          userCount: 1,
          permissions: ['orders.manage', 'products.manage', 'customers.view', 'reports.view']
        },
        {
          id: 'staff',
          name: 'Staff',
          description: 'Can process orders and manage day-to-day operations',
          color: '#3b82f6',
          icon: User,
          userCount: 3,
          permissions: ['orders.process', 'products.view', 'customers.view']
        },
        {
          id: 'viewer',
          name: 'Viewer',
          description: 'Read-only access to dashboards and reports',
          color: '#6b7280',
          icon: Eye,
          userCount: 1,
          permissions: ['dashboard.view', 'reports.view']
        }
      ]);

      setActivityLog([
        {
          id: 1,
          user: 'John Davidson',
          action: 'login',
          details: 'Logged in from Chrome on Windows',
          ip: '192.168.1.100',
          timestamp: '2024-01-15T14:30:00'
        },
        {
          id: 2,
          user: 'Sarah Mitchell',
          action: 'user_invited',
          details: 'Invited Lisa Thompson as Viewer',
          ip: '192.168.1.101',
          timestamp: '2024-01-15T13:00:00'
        },
        {
          id: 3,
          user: 'Mike Rodriguez',
          action: 'settings_changed',
          details: 'Updated notification preferences',
          ip: '192.168.1.102',
          timestamp: '2024-01-15T11:45:00'
        },
        {
          id: 4,
          user: 'Emily Chen',
          action: 'password_changed',
          details: 'Password updated successfully',
          ip: '192.168.1.103',
          timestamp: '2024-01-15T10:30:00'
        },
        {
          id: 5,
          user: 'John Davidson',
          action: 'role_changed',
          details: 'Changed David Kim role from Viewer to Staff',
          ip: '192.168.1.100',
          timestamp: '2024-01-14T16:00:00'
        },
        {
          id: 6,
          user: 'Sarah Mitchell',
          action: 'user_deactivated',
          details: 'Deactivated James Wilson account',
          ip: '192.168.1.101',
          timestamp: '2024-01-14T14:30:00'
        },
        {
          id: 7,
          user: 'John Davidson',
          action: '2fa_enabled',
          details: 'Enabled two-factor authentication',
          ip: '192.168.1.100',
          timestamp: '2024-01-13T09:00:00'
        }
      ]);

      setLoading(false);
    }, 500);
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Never';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return 'Never';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateStr) => {
    if (!dateStr) return 'Never';
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return formatDate(dateStr);
  };

  const getRoleStyle = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' };
    return { color: role.color, bg: `${role.color}20` };
  };

  const getRoleIcon = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return User;
    return role.icon;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', label: 'Active' };
      case 'pending':
        return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', label: 'Pending' };
      case 'inactive':
        return { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)', label: 'Inactive' };
      case 'suspended':
        return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', label: 'Suspended' };
      default:
        return { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)', label: status };
    }
  };

  const getActivityIcon = (action) => {
    switch (action) {
      case 'login': return <LogIn size={14} />;
      case 'logout': return <LogOut size={14} />;
      case 'user_invited': return <UserPlus size={14} />;
      case 'user_deactivated': return <UserMinus size={14} />;
      case 'role_changed': return <Shield size={14} />;
      case 'password_changed': return <Key size={14} />;
      case 'settings_changed': return <Settings size={14} />;
      case '2fa_enabled': return <Lock size={14} />;
      case '2fa_disabled': return <Unlock size={14} />;
      default: return <Activity size={14} />;
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Users size={48} style={{ opacity: 0.5 }} />
        <p>Loading users...</p>
      </div>
    );
  }

  const activeUsers = users.filter(u => u.status === 'active').length;
  const pendingUsers = users.filter(u => u.status === 'pending').length;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Users & Permissions</h1>
          <p style={styles.subtitle}>Manage team members and their access levels</p>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.secondaryBtn}>
            <Download size={16} />
            Export
          </button>
          <button style={styles.primaryBtn} onClick={() => setShowInviteModal(true)}>
            <UserPlus size={18} />
            Invite User
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
            <Users size={20} color="#3b82f6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{users.length}</span>
            <span style={styles.statLabel}>Total Users</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)'}}>
            <UserCheck size={20} color="#22c55e" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{activeUsers}</span>
            <span style={styles.statLabel}>Active</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(245, 158, 11, 0.1)'}}>
            <Clock size={20} color="#f59e0b" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{pendingUsers}</span>
            <span style={styles.statLabel}>Pending</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)'}}>
            <Shield size={20} color="#8b5cf6" />
          </div>
          <div style={styles.statInfo}>
            <span style={styles.statValue}>{roles.length}</span>
            <span style={styles.statLabel}>Roles</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {[
          { id: 'users', label: 'Users', icon: Users },
          { id: 'roles', label: 'Roles & Permissions', icon: Shield },
          { id: 'activity', label: 'Activity Log', icon: Activity }
        ].map(tab => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.tabActive : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <TabIcon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <>
          {/* Toolbar */}
          <div style={styles.toolbar}>
            <div style={styles.toolbarLeft}>
              <div style={styles.searchBox}>
                <Search size={18} color="var(--color-text-muted)" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
              </div>
              <button style={styles.filterBtn}>
                <Filter size={16} />
                Filter
              </button>
            </div>
            {selectedUsers.length > 0 && (
              <div style={styles.bulkActions}>
                <span style={styles.selectedCount}>{selectedUsers.length} selected</span>
                <button style={styles.bulkBtn}>
                  <Mail size={14} />
                  Email
                </button>
                <button style={styles.bulkBtn}>
                  <Shield size={14} />
                  Change Role
                </button>
                <button style={{...styles.bulkBtn, color: '#ef4444'}}>
                  <UserX size={14} />
                  Deactivate
                </button>
              </div>
            )}
          </div>

          {/* Users Table */}
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.thCheckbox}>
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                      style={styles.checkbox}
                    />
                  </th>
                  <th style={styles.th}>User</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Department</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Last Active</th>
                  <th style={styles.th}>2FA</th>
                  <th style={styles.thActions}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const roleStyle = getRoleStyle(user.role);
                  const statusStyle = getStatusStyle(user.status);
                  const RoleIcon = getRoleIcon(user.role);
                  const isSelected = selectedUsers.includes(user.id);

                  return (
                    <tr
                      key={user.id}
                      style={{
                        ...styles.tr,
                        ...(isSelected ? styles.trSelected : {})
                      }}
                    >
                      <td style={styles.tdCheckbox}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectUser(user.id)}
                          style={styles.checkbox}
                        />
                      </td>
                      <td style={styles.td}>
                        <div style={styles.userCell}>
                          <div style={styles.userAvatar}>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div style={styles.userInfo}>
                            <span style={styles.userName}>{user.name}</span>
                            <span style={styles.userEmail}>{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.roleBadge,
                          backgroundColor: roleStyle.bg,
                          color: roleStyle.color
                        }}>
                          <RoleIcon size={12} />
                          {user.role}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.department}>{user.department}</span>
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color
                        }}>
                          {statusStyle.label}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.lastActive}>{getTimeAgo(user.lastActive)}</span>
                      </td>
                      <td style={styles.td}>
                        {user.twoFactorEnabled ? (
                          <span style={styles.twoFactorOn}>
                            <ShieldCheck size={14} />
                          </span>
                        ) : (
                          <span style={styles.twoFactorOff}>
                            <ShieldAlert size={14} />
                          </span>
                        )}
                      </td>
                      <td style={styles.tdActions}>
                        <div style={styles.actions}>
                          <button
                            style={styles.actionBtn}
                            title="Edit User"
                            onClick={() => openEditModal(user)}
                          >
                            <Edit size={16} />
                          </button>
                          <button style={styles.actionBtn} title="Send Email">
                            <Mail size={16} />
                          </button>
                          <button style={styles.actionBtn} title="More">
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
        </>
      )}

      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <div style={styles.rolesGrid}>
          {roles.map((role) => {
            const RoleIcon = role.icon;
            return (
              <div key={role.id} style={styles.roleCard}>
                <div style={styles.roleHeader}>
                  <div style={{
                    ...styles.roleIcon,
                    backgroundColor: `${role.color}20`,
                    color: role.color
                  }}>
                    <RoleIcon size={20} />
                  </div>
                  <div style={styles.roleInfo}>
                    <span style={styles.roleName}>{role.name}</span>
                    <span style={styles.roleUsers}>{role.userCount} user{role.userCount !== 1 ? 's' : ''}</span>
                  </div>
                  <button style={styles.iconBtn}>
                    <Edit size={16} />
                  </button>
                </div>
                <p style={styles.roleDescription}>{role.description}</p>
                <div style={styles.permissionsList}>
                  <span style={styles.permissionsLabel}>Permissions:</span>
                  <div style={styles.permissionTags}>
                    {role.permissions.slice(0, 4).map((perm, idx) => (
                      <span key={idx} style={styles.permissionTag}>{perm}</span>
                    ))}
                    {role.permissions.length > 4 && (
                      <span style={styles.permissionMore}>+{role.permissions.length - 4} more</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div style={styles.addRoleCard}>
            <Plus size={24} color="var(--color-text-muted)" />
            <span>Create Custom Role</span>
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div style={styles.activityList}>
          {activityLog.map((log) => (
            <div key={log.id} style={styles.activityCard}>
              <div style={styles.activityIcon}>
                {getActivityIcon(log.action)}
              </div>
              <div style={styles.activityContent}>
                <div style={styles.activityHeader}>
                  <span style={styles.activityUser}>{log.user}</span>
                  <span style={styles.activityAction}>
                    {log.action.replace(/_/g, ' ')}
                  </span>
                </div>
                <p style={styles.activityDetails}>{log.details}</p>
                <div style={styles.activityMeta}>
                  <span><Clock size={12} /> {formatDateTime(log.timestamp)}</span>
                  <span><Globe size={12} /> {log.ip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div style={styles.modalOverlay} onClick={() => setShowInviteModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Invite Team Member</h2>
              <button style={styles.modalClose} onClick={() => setShowInviteModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Email Address</label>
                <input
                  type="email"
                  placeholder="colleague@company.com"
                  style={styles.formInput}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Name (optional)</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  style={styles.formInput}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Role</label>
                <select style={styles.formSelect}>
                  {roles.filter(r => r.id !== 'owner').map((role) => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Department</label>
                <input
                  type="text"
                  placeholder="e.g., Sales, Marketing"
                  style={styles.formInput}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Personal Message (optional)</label>
                <textarea
                  placeholder="Add a personal note to the invitation..."
                  rows={3}
                  style={styles.formTextarea}
                />
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.secondaryBtn} onClick={() => setShowInviteModal(false)}>
                Cancel
              </button>
              <button style={styles.primaryBtn}>
                <Send size={16} />
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div style={styles.modalOverlay} onClick={() => setShowEditModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Edit User</h2>
              <button style={styles.modalClose} onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.editUserHeader}>
                <div style={styles.editUserAvatar}>
                  {editingUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={styles.editUserInfo}>
                  <span style={styles.editUserName}>{editingUser.name}</span>
                  <span style={styles.editUserEmail}>{editingUser.email}</span>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Name</label>
                <input
                  type="text"
                  defaultValue={editingUser.name}
                  style={styles.formInput}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Email</label>
                <input
                  type="email"
                  defaultValue={editingUser.email}
                  style={styles.formInput}
                />
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Role</label>
                  <select style={styles.formSelect} defaultValue={editingUser.role}>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Department</label>
                  <input
                    type="text"
                    defaultValue={editingUser.department}
                    style={styles.formInput}
                  />
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Status</label>
                <select style={styles.formSelect} defaultValue={editingUser.status}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div style={styles.dangerZone}>
                <h4 style={styles.dangerTitle}>Danger Zone</h4>
                <div style={styles.dangerActions}>
                  <button style={styles.dangerBtn}>
                    <Key size={14} />
                    Reset Password
                  </button>
                  <button style={styles.dangerBtn}>
                    <Lock size={14} />
                    Force 2FA Setup
                  </button>
                  <button style={{...styles.dangerBtn, color: '#ef4444'}}>
                    <Trash2 size={14} />
                    Delete User
                  </button>
                </div>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.secondaryBtn} onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button style={styles.primaryBtn}>
                <Check size={16} />
                Save Changes
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
    color: 'var(--color-text-muted)',
    margin: 0
  },
  headerRight: {
    display: 'flex',
    gap: '12px'
  },
  secondaryBtn: {
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '14px',
    border: '1px solid var(--color-border)'
  },
  statIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 700
  },
  statLabel: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    marginBottom: '24px'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '10px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  tabActive: {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  toolbarLeft: {
    display: 'flex',
    gap: '12px'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    width: '280px'
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '14px',
    outline: 'none'
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer'
  },
  bulkActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  selectedCount: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginRight: '8px'
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
  tableWrapper: {
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
    textTransform: 'uppercase'
  },
  thCheckbox: {
    padding: '14px 16px',
    width: '40px'
  },
  thActions: {
    padding: '14px 16px',
    width: '120px'
  },
  tr: {
    borderBottom: '1px solid var(--color-border)',
    transition: 'background-color 0.15s ease'
  },
  trSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)'
  },
  td: {
    padding: '16px',
    fontSize: '14px'
  },
  tdCheckbox: {
    padding: '16px',
    width: '40px'
  },
  tdActions: {
    padding: '16px',
    width: '120px'
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  userCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-primary)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 600
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  userName: {
    fontWeight: 500,
    marginBottom: '2px'
  },
  userEmail: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  roleBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  department: {
    color: 'var(--color-text-muted)'
  },
  statusBadge: {
    display: 'inline-flex',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500
  },
  lastActive: {
    color: 'var(--color-text-muted)',
    fontSize: '13px'
  },
  twoFactorOn: {
    color: '#22c55e'
  },
  twoFactorOff: {
    color: '#ef4444'
  },
  actions: {
    display: 'flex',
    gap: '4px'
  },
  actionBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '6px'
  },
  iconBtn: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px'
  },
  rolesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
  roleCard: {
    padding: '24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  roleHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '12px'
  },
  roleIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  roleInfo: {
    flex: 1
  },
  roleName: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '2px'
  },
  roleUsers: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  roleDescription: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '0 0 16px 0',
    lineHeight: 1.5
  },
  permissionsList: {},
  permissionsLabel: {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    marginBottom: '8px'
  },
  permissionTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  },
  permissionTag: {
    padding: '4px 8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    fontSize: '11px',
    fontFamily: 'monospace'
  },
  permissionMore: {
    padding: '4px 8px',
    color: 'var(--color-primary)',
    fontSize: '11px'
  },
  addRoleCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '40px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '2px dashed var(--color-border)',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  activityCard: {
    display: 'flex',
    gap: '14px',
    padding: '16px 20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  activityIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)',
    flexShrink: 0
  },
  activityContent: {
    flex: 1
  },
  activityHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px'
  },
  activityUser: {
    fontWeight: 600
  },
  activityAction: {
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    textTransform: 'capitalize'
  },
  activityDetails: {
    fontSize: '14px',
    margin: '0 0 8px 0'
  },
  activityMeta: {
    display: 'flex',
    gap: '16px',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
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
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '20px',
    overflow: 'hidden',
    maxHeight: '90vh',
    overflowY: 'auto'
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
  editUserHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px',
    marginBottom: '24px'
  },
  editUserAvatar: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    backgroundColor: 'var(--color-primary)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 600
  },
  editUserInfo: {},
  editUserName: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '4px'
  },
  editUserEmail: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  formGroup: {
    marginBottom: '20px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  formLabel: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    marginBottom: '8px'
  },
  formInput: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  formSelect: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  formTextarea: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    color: 'var(--color-text)',
    fontSize: '14px',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  dangerZone: {
    marginTop: '24px',
    padding: '16px',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(239, 68, 68, 0.2)'
  },
  dangerTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#ef4444',
    margin: '0 0 12px 0'
  },
  dangerActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  dangerBtn: {
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
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px 24px',
    borderTop: '1px solid var(--color-border)'
  }
};

export default SettingsUsers;