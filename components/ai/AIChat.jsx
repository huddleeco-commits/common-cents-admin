/**
 * AIChat
 * 
 * Conversational interface to the AI Manager.
 * Business owners can:
 * - Ask questions about their business
 * - Request changes (menu, prices, content, settings)
 * - Get explanations and recommendations
 * - See live previews before publishing
 * 
 * AI has full context: industry, location, brain.json, analytics
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Mic,
  Bot,
  User,
  Sparkles,
  Eye,
  Check,
  X,
  RefreshCw,
  Image,
  FileText,
  TrendingUp,
  DollarSign,
  Calendar,
  MapPin
} from 'lucide-react';
import { useBrain } from '../../hooks/useBrain';

export function AIChat({ onAction, status, setStatus }) {
  const { brain } = useBrain();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    const industry = brain?.business?.industry || 'business';
    const businessName = brain?.business?.name || 'your business';
    
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: `Hey! I'm your AI Manager for ${businessName}. I know everything about your ${industry} - your menu, prices, customers, and what's happening locally.\n\nI can help you:\n• Update your menu or products\n• Adjust prices based on competitors\n• Create promotions for local events\n• Analyze what's working and what's not\n\nWhat would you like to do today?`,
        timestamp: new Date(),
        suggestions: [
          'Show me today\'s insights',
          'What are my competitors doing?',
          'Add a seasonal special',
          'How did we do this week?'
        ]
      }
    ]);
  }, [brain]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || status !== 'ready') return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setStatus('thinking');
    setIsTyping(true);

    // Simulate AI response (in production, this calls Claude API)
    await simulateAIResponse(userMessage.content);
  };

  const simulateAIResponse = async (userInput) => {
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const lowerInput = userInput.toLowerCase();
    let response;

    // Context-aware responses based on input
    if (lowerInput.includes('seasonal') || lowerInput.includes('pumpkin') || lowerInput.includes('special')) {
      response = {
        id: Date.now(),
        role: 'assistant',
        content: "Great idea! Based on local trends, here's what I'd suggest adding:\n\n**Pumpkin Spice Latte** - $5.49\nOur signature espresso with pumpkin, cinnamon, and nutmeg. Topped with whipped cream.\n\n**Maple Bacon Burger** - $14.99\nHalf-pound patty with crispy bacon, maple glaze, and aged cheddar.\n\nThese items are trending in your area. Want me to add them to your menu?",
        timestamp: new Date(),
        hasAction: true,
        actionType: 'menu_update',
        actionData: {
          type: 'add_items',
          items: [
            { name: 'Pumpkin Spice Latte', price: 5.49, category: 'Beverages' },
            { name: 'Maple Bacon Burger', price: 14.99, category: 'Burgers' }
          ]
        },
        suggestions: [
          'Yes, add both items',
          'Just the latte',
          'Show me the preview first',
          'What prices do competitors have?'
        ]
      };
    } else if (lowerInput.includes('competitor') || lowerInput.includes('competition')) {
      response = {
        id: Date.now(),
        role: 'assistant',
        content: "Here's what I found about nearby competitors:\n\n**Joe's Diner** (0.3 mi)\n• Raised burger prices 12% last week\n• Added outdoor seating\n• 4.2★ rating (yours: 4.5★)\n\n**Main Street Cafe** (0.5 mi)\n• Running 15% off lunch special\n• New loyalty program launched\n• 4.4★ rating\n\n**Your advantage:** Better reviews and you haven't raised prices in 6 months. You have room to increase by 5-8% and still be competitive.",
        timestamp: new Date(),
        hasAction: true,
        actionType: 'insight',
        insights: [
          { type: 'pricing', message: 'Room for 5-8% price increase' },
          { type: 'competitive', message: 'Leading on reviews' }
        ],
        suggestions: [
          'Increase prices by 5%',
          'Show me a pricing comparison',
          'What items should I raise?',
          'Keep prices the same'
        ]
      };
    } else if (lowerInput.includes('week') || lowerInput.includes('performance') || lowerInput.includes('how did')) {
      response = {
        id: Date.now(),
        role: 'assistant',
        content: "Here's your week in review:\n\n📈 **Revenue:** $12,450 (+8% vs last week)\n👥 **Customers:** 342 (+12 new)\n⭐ **Avg Rating:** 4.6/5 (3 new reviews)\n🏆 **Best Seller:** Classic Burger (47 sold)\n📉 **Slow Mover:** Garden Salad (only 8 sold)\n\n**Insights:**\n• Tuesday lunch was unusually slow - consider a Tuesday special\n• Weekend dinner exceeded capacity twice\n• Garden Salad hasn't sold well in 3 weeks",
        timestamp: new Date(),
        hasAction: true,
        actionType: 'report',
        stats: {
          revenue: 12450,
          revenueChange: 8,
          customers: 342,
          newCustomers: 12
        },
        suggestions: [
          'Create a Tuesday special',
          'Remove Garden Salad',
          'Show me the full report',
          'Compare to last month'
        ]
      };
    } else if (lowerInput.includes('insight') || lowerInput.includes('suggest') || lowerInput.includes('recommend')) {
      response = {
        id: Date.now(),
        role: 'assistant',
        content: "Based on my analysis, here are today's top opportunities:\n\n🎯 **High Priority:**\n1. **Add seasonal items** - Pumpkin spice searches up 340% locally\n2. **Prep for weekend** - Dallas Marathon Sunday, expect 40% more traffic\n\n💡 **Quick Wins:**\n3. **Respond to reviews** - 2 reviews waiting (both positive!)\n4. **Update hours** - You're closed Monday but website says open\n\n📊 **This Week:**\n5. **Test price increase** - Competitors raised prices, you have room",
        timestamp: new Date(),
        suggestions: [
          'Add seasonal items',
          'Fix the hours',
          'Show me the reviews',
          'Tell me more about the marathon'
        ]
      };
    } else if (lowerInput.includes('yes') || lowerInput.includes('add') || lowerInput.includes('do it')) {
      response = {
        id: Date.now(),
        role: 'assistant',
        content: "Perfect! I've prepared the changes. Here's what will happen:\n\n✅ **Adding to Menu:**\n• Pumpkin Spice Latte - $5.49\n• Maple Bacon Burger - $14.99\n\nI've also:\n• Generated descriptions\n• Set them as \"Featured\" for 2 weeks\n• Created social media post draft\n\nClick **Preview Changes** to see how it looks on your site before publishing.",
        timestamp: new Date(),
        hasAction: true,
        actionType: 'pending_changes',
        changes: [
          { type: 'menu', action: 'add', item: 'Pumpkin Spice Latte', price: 5.49 },
          { type: 'menu', action: 'add', item: 'Maple Bacon Burger', price: 14.99 },
          { type: 'featured', action: 'set', items: ['Pumpkin Spice Latte', 'Maple Bacon Burger'] }
        ],
        showPreviewButton: true
      };
      
      // Trigger preview action
      onAction([
        { type: 'menu', action: 'add', item: 'Pumpkin Spice Latte', price: 5.49, category: 'Beverages' },
        { type: 'menu', action: 'add', item: 'Maple Bacon Burger', price: 14.99, category: 'Burgers' }
      ]);
    } else {
      // Default helpful response
      response = {
        id: Date.now(),
        role: 'assistant',
        content: `I understand you're asking about "${userInput}". Let me help with that.\n\nAs your AI Manager, I can:\n• Make changes to your website and menu\n• Show you competitor insights\n• Analyze your business performance\n• Create promotions and specials\n\nCould you tell me more about what you'd like to do?`,
        timestamp: new Date(),
        suggestions: [
          'Update my menu',
          'Show competitor prices',
          'Create a promotion',
          'How\'s business doing?'
        ]
      };
    }

    setIsTyping(false);
    setMessages(prev => [...prev, response]);
    setStatus('ready');
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={styles.container}>
      {/* Messages Area */}
      <div style={styles.messagesContainer}>
        {messages.map((message) => (
          <div 
            key={message.id}
            style={{
              ...styles.messageWrapper,
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            {message.role === 'assistant' && (
              <div style={styles.avatar}>
                <Bot size={18} />
              </div>
            )}
            
            <div style={{
              ...styles.message,
              ...(message.role === 'user' ? styles.userMessage : styles.assistantMessage)
            }}>
              <div style={styles.messageContent}>
                {message.content.split('\n').map((line, i) => (
                  <p key={i} style={styles.messageLine}>
                    {line.startsWith('**') && line.endsWith('**') 
                      ? <strong>{line.replace(/\*\*/g, '')}</strong>
                      : line.startsWith('•') 
                        ? <span style={styles.bulletPoint}>{line}</span>
                        : line
                    }
                  </p>
                ))}
              </div>

              {/* Action buttons for AI messages */}
              {message.showPreviewButton && (
                <button style={styles.previewInlineButton} onClick={() => onAction(message.changes)}>
                  <Eye size={14} /> Preview Changes
                </button>
              )}

              {/* Suggestions */}
              {message.suggestions && (
                <div style={styles.suggestions}>
                  {message.suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      style={styles.suggestionButton}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <span style={styles.timestamp}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {message.role === 'user' && (
              <div style={styles.userAvatar}>
                <User size={18} />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={styles.messageWrapper}>
            <div style={styles.avatar}>
              <Bot size={18} />
            </div>
            <div style={{ ...styles.message, ...styles.assistantMessage }}>
              <div style={styles.typingIndicator}>
                <span style={styles.typingDot} />
                <span style={{ ...styles.typingDot, animationDelay: '0.2s' }} />
                <span style={{ ...styles.typingDot, animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={styles.inputContainer}>
        <div style={styles.inputWrapper}>
          <button style={styles.inputAction}>
            <Paperclip size={18} />
          </button>
          
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about your business..."
            style={styles.input}
            rows={1}
            disabled={status !== 'ready'}
          />
          
          <button style={styles.inputAction}>
            <Mic size={18} />
          </button>
          
          <button 
            style={{
              ...styles.sendButton,
              opacity: input.trim() && status === 'ready' ? 1 : 0.5
            }}
            onClick={handleSend}
            disabled={!input.trim() || status !== 'ready'}
          >
            <Send size={18} />
          </button>
        </div>
        
        <div style={styles.inputHints}>
          <span>💡 Try: "Add a lunch special" • "What are competitors charging?" • "How did we do this week?"</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxHeight: 'calc(100vh - 250px)'
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  messageWrapper: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start'
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    flexShrink: 0
  },
  userAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)',
    flexShrink: 0
  },
  message: {
    maxWidth: '70%',
    padding: '16px 20px',
    borderRadius: '16px'
  },
  userMessage: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff',
    borderBottomRightRadius: '4px'
  },
  assistantMessage: {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderBottomLeftRadius: '4px'
  },
  messageContent: {
    fontSize: '14px',
    lineHeight: 1.6
  },
  messageLine: {
    margin: '0 0 8px 0'
  },
  bulletPoint: {
    display: 'block',
    paddingLeft: '8px'
  },
  timestamp: {
    display: 'block',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginTop: '8px',
    opacity: 0.7
  },
  suggestions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid var(--color-border)'
  },
  suggestionButton: {
    padding: '8px 14px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '20px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  previewInlineButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '12px',
    padding: '8px 14px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
    padding: '4px 0'
  },
  typingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-text-muted)',
    animation: 'typingBounce 1s infinite'
  },
  inputContainer: {
    padding: '20px 0 0 0',
    borderTop: '1px solid var(--color-border)'
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '16px'
  },
  input: {
    flex: 1,
    padding: '8px 0',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '15px',
    resize: 'none',
    outline: 'none',
    fontFamily: 'inherit'
  },
  inputAction: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.2s'
  },
  sendButton: {
    padding: '10px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  inputHints: {
    padding: '12px 16px 0',
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  }
};

// Add keyframe animation via style injection
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-4px); }
  }
`;
document.head.appendChild(styleSheet);

export default AIChat;