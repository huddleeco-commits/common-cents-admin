/**
 * AIManager
 * 
 * Full AI chat interface for managing the business.
 * The AI knows the business intimately - it was there at generation.
 * Customers can edit content, check analytics, diagnose issues, all via conversation.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Send, 
  Trash2, 
  Zap,
  Settings,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { useAI } from '../hooks/useAI';

export function AIManager() {
  const { business } = useOutletContext();
  const { 
    messages, 
    sendMessage, 
    executeAction,
    clearHistory, 
    loading, 
    typing,
    quickActions 
  } = useAI();
  
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  const handleQuickAction = async (action) => {
    await quickActions[action]();
  };

  const handleActionClick = async (action) => {
    await executeAction(action);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.aiAvatar}>⚡</div>
          <div style={styles.headerInfo}>
            <h1 style={styles.title}>AI Manager</h1>
            <p style={styles.subtitle}>
              Talk to your business. I know {business?.name || 'it'} inside and out.
            </p>
          </div>
        </div>
        <button 
          style={styles.clearButton}
          onClick={clearHistory}
          disabled={messages.length === 0}
        >
          <Trash2 size={16} />
          Clear Chat
        </button>
      </div>

      {/* Quick Actions Bar */}
      <div style={styles.quickActionsBar}>
        <span style={styles.quickActionsLabel}>Quick:</span>
        <button 
          style={styles.quickActionChip}
          onClick={() => handleQuickAction('checkHealth')}
        >
          <Activity size={14} /> Check Health
        </button>
        <button 
          style={styles.quickActionChip}
          onClick={() => handleQuickAction('showAnalytics')}
        >
          <BarChart3 size={14} /> Analytics
        </button>
        <button 
          style={styles.quickActionChip}
          onClick={() => handleQuickAction('diagnose')}
        >
          <Zap size={14} /> Diagnose
        </button>
        <button 
          style={styles.quickActionChip}
          onClick={() => handleQuickAction('suggestions')}
        >
          <Lightbulb size={14} /> Suggestions
        </button>
      </div>

      {/* Chat Messages */}
      <div style={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>💬</div>
            <h3 style={styles.emptyTitle}>Start a Conversation</h3>
            <p style={styles.emptyText}>
              I'm your AI business manager. I can help you:
            </p>
            <ul style={styles.emptyList}>
              <li>Update content, hours, and settings</li>
              <li>Check analytics and insights</li>
              <li>Diagnose and fix issues</li>
              <li>Manage inventory and products</li>
              <li>Answer questions about your business</li>
            </ul>
            <p style={styles.emptyText}>
              Try asking: "How did we do last week?" or "Update my hours to close at 9pm"
            </p>
          </div>
        ) : (
          <div style={styles.messagesList}>
            {messages.map(msg => (
              <MessageBubble 
                key={msg.id} 
                message={msg}
                formatTime={formatTime}
                onActionClick={handleActionClick}
              />
            ))}
            {typing && (
              <div style={styles.typingIndicator}>
                <div style={styles.typingDots}>
                  <span style={styles.dot}></span>
                  <span style={styles.dot}></span>
                  <span style={styles.dot}></span>
                </div>
                <span>AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} style={styles.inputArea}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about your business..."
          style={styles.input}
          disabled={loading}
        />
        <button 
          type="submit" 
          style={{
            ...styles.sendButton,
            opacity: loading || !input.trim() ? 0.5 : 1
          }}
          disabled={loading || !input.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

// Message Bubble Component
function MessageBubble({ message, formatTime, onActionClick }) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const isError = message.isError;

  return (
    <div style={{
      ...styles.messageBubbleContainer,
      justifyContent: isUser ? 'flex-end' : 'flex-start'
    }}>
      {!isUser && (
        <div style={styles.messageAvatar}>
          {isSystem ? '📢' : isError ? '⚠️' : '⚡'}
        </div>
      )}
      
      <div style={{
        ...styles.messageBubble,
        ...(isUser ? styles.userBubble : styles.aiBubble),
        ...(isError ? styles.errorBubble : {}),
        ...(isSystem ? styles.systemBubble : {})
      }}>
        <div style={styles.messageContent}>
          {message.content}
        </div>

        {/* Action Buttons */}
        {message.actions && message.actions.length > 0 && (
          <div style={styles.actionsContainer}>
            {message.actions.map((action, idx) => (
              <button
                key={idx}
                style={styles.actionButton}
                onClick={() => onActionClick(action)}
              >
                <CheckCircle size={14} />
                {action.label || action.type}
              </button>
            ))}
          </div>
        )}

        {/* Suggestions */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div style={styles.suggestionsContainer}>
            <span style={styles.suggestionsLabel}>Suggestions:</span>
            {message.suggestions.map((suggestion, idx) => (
              <span key={idx} style={styles.suggestionChip}>
                {suggestion}
              </span>
            ))}
          </div>
        )}

        <div style={styles.messageTime}>
          <Clock size={10} />
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 140px)',
    backgroundColor: 'var(--color-background)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  aiAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px'
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'column'
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
  clearButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  quickActionsBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '10px',
    marginBottom: '16px',
    overflowX: 'auto'
  },
  quickActionsLabel: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    fontWeight: 600
  },
  quickActionChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '20px',
    color: 'var(--color-text)',
    fontSize: '12px',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    marginBottom: '16px'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    padding: '40px'
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: 600,
    margin: '0 0 12px 0'
  },
  emptyText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '0 0 16px 0',
    maxWidth: '400px'
  },
  emptyList: {
    textAlign: 'left',
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '0 0 16px 0',
    paddingLeft: '20px'
  },
  messagesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  messageBubbleContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },
  messageAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    flexShrink: 0
  },
  messageBubble: {
    maxWidth: '70%',
    padding: '14px 18px',
    borderRadius: '16px',
    position: 'relative'
  },
  userBubble: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff',
    borderBottomRightRadius: '4px'
  },
  aiBubble: {
    backgroundColor: 'var(--color-surface-2)',
    color: 'var(--color-text)',
    borderBottomLeftRadius: '4px'
  },
  errorBubble: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: '#ef4444'
  },
  systemBubble: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: 'var(--color-text)',
    maxWidth: '100%',
    textAlign: 'center'
  },
  messageContent: {
    fontSize: '14px',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap'
  },
  actionsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid var(--color-border)'
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  suggestionsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '6px',
    marginTop: '12px'
  },
  suggestionsLabel: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  suggestionChip: {
    padding: '4px 10px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  messageTime: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '8px',
    fontSize: '10px',
    color: 'var(--color-text-muted)',
    opacity: 0.7
  },
  typingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  typingDots: {
    display: 'flex',
    gap: '4px'
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-text-muted)',
    animation: 'bounce 1.4s infinite ease-in-out both'
  },
  inputArea: {
    display: 'flex',
    gap: '12px',
    padding: '16px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px'
  },
  input: {
    flex: 1,
    padding: '16px 20px',
    fontSize: '15px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    color: 'var(--color-text)',
    outline: 'none'
  },
  sendButton: {
    width: '54px',
    height: '54px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '12px',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'opacity 0.2s'
  }
};

export default AIManager;