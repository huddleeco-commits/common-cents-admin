/**
 * BillingPage
 * 
 * Subscription management, plan upgrades, invoices, and payment methods.
 * Works with Stripe for payments.
 */

import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  CreditCard,
  Check,
  Star,
  Zap,
  Crown,
  Download,
  ExternalLink,
  AlertCircle,
  Calendar,
  DollarSign,
  ArrowRight,
  Shield,
  X
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function BillingPage() {
  const { business, brain } = useOutletContext();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [processing, setProcessing] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      icon: Zap,
      description: 'Get started with basic features',
      features: [
        'Basic website',
        'Up to 100 products/items',
        'Standard support',
        'Blink branding'
      ],
      limitations: [
        'No AI Manager',
        'No custom domain',
        'Limited analytics'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 79,
      icon: Star,
      popular: true,
      description: 'Everything you need to grow',
      features: [
        'Everything in Free',
        'AI Manager included',
        'Custom domain',
        'Full analytics',
        'Remove Blink branding',
        'Priority support',
        'Unlimited products/items'
      ],
      limitations: []
    },
    {
      id: 'business',
      name: 'Business',
      price: 199,
      icon: Crown,
      description: 'Advanced features for scaling',
      features: [
        'Everything in Pro',
        'Multiple team members',
        'Advanced integrations',
        'API access',
        'Custom reports',
        'Dedicated support',
        'White-label options'
      ],
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: null,
      icon: Shield,
      description: 'Custom solutions for large organizations',
      features: [
        'Everything in Business',
        'Custom development',
        'SLA guarantees',
        'Dedicated account manager',
        'On-premise options',
        'Custom integrations'
      ],
      limitations: [],
      contactSales: true
    }
  ];

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const [subRes, invRes, pmRes] = await Promise.all([
        fetch(`${API_BASE}/billing/subscription`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/billing/invoices`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/billing/payment-method`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);
      
      if (subRes.ok) {
        const subData = await subRes.json();
        setSubscription(subData.subscription);
      }
      
      if (invRes.ok) {
        const invData = await invRes.json();
        setInvoices(invData.invoices || []);
      }
      
      if (pmRes.ok) {
        const pmData = await pmRes.json();
        setPaymentMethod(pmData.paymentMethod);
      }
    } catch (err) {
      setError('Failed to load billing data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planId) => {
    if (planId === 'enterprise') {
      window.open('mailto:sales@be1st.io?subject=Enterprise Plan Inquiry', '_blank');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/billing/upgrade`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ planId })
      });

      if (!response.ok) throw new Error('Upgrade failed');

      const data = await response.json();

      if (data.checkoutUrl) {
        // Redirect to Stripe checkout
        window.location.href = data.checkoutUrl;
      } else {
        // Plan changed successfully
        setSubscription(data.subscription);
        setSuccess('Plan updated successfully!');
        setShowUpgradeModal(false);
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
      return;
    }

    setProcessing(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/billing/cancel`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Cancellation failed');

      const data = await response.json();
      setSubscription(data.subscription);
      setSuccess('Subscription cancelled. Access continues until end of billing period.');
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleManagePayment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/billing/portal`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Could not open billing portal');

      const data = await response.json();
      window.location.href = data.portalUrl;
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const currentPlan = plans.find(p => p.id === subscription?.planId) || plans[0];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Billing</h1>
          <p style={styles.subtitle}>
            Manage your subscription and payment methods
          </p>
        </div>
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

      {loading ? (
        <div style={styles.loadingState}>Loading billing information...</div>
      ) : (
        <>
          {/* Current Plan Card */}
          <div style={styles.currentPlanCard}>
            <div style={styles.currentPlanHeader}>
              <div style={styles.currentPlanIcon}>
                <currentPlan.icon size={24} />
              </div>
              <div style={styles.currentPlanInfo}>
                <h2 style={styles.currentPlanName}>{currentPlan.name} Plan</h2>
                <p style={styles.currentPlanPrice}>
                  {currentPlan.price === null 
                    ? 'Custom Pricing' 
                    : currentPlan.price === 0 
                      ? 'Free' 
                      : `$${currentPlan.price}/month`
                  }
                </p>
              </div>
              <div style={styles.currentPlanActions}>
                <button 
                  style={styles.upgradeButton}
                  onClick={() => setShowUpgradeModal(true)}
                >
                  {currentPlan.id === 'free' ? 'Upgrade' : 'Change Plan'}
                </button>
              </div>
            </div>

            {subscription && (
              <div style={styles.subscriptionDetails}>
                <div style={styles.detailItem}>
                  <Calendar size={16} />
                  <span>
                    {subscription.cancelAtPeriodEnd 
                      ? `Cancels on ${formatDate(subscription.currentPeriodEnd)}`
                      : `Renews on ${formatDate(subscription.currentPeriodEnd)}`
                    }
                  </span>
                </div>
                <div style={styles.detailItem}>
                  <DollarSign size={16} />
                  <span>
                    {formatCurrency(subscription.amount || currentPlan.price)} / month
                  </span>
                </div>
              </div>
            )}

            {subscription && !subscription.cancelAtPeriodEnd && currentPlan.id !== 'free' && (
              <button 
                style={styles.cancelButton}
                onClick={handleCancelSubscription}
                disabled={processing}
              >
                Cancel Subscription
              </button>
            )}
          </div>

          {/* Payment Method */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Payment Method</h3>
            <div style={styles.paymentCard}>
              {paymentMethod ? (
                <div style={styles.paymentInfo}>
                  <div style={styles.cardIcon}>
                    <CreditCard size={24} />
                  </div>
                  <div style={styles.cardDetails}>
                    <span style={styles.cardBrand}>
                      {paymentMethod.brand?.toUpperCase()} •••• {paymentMethod.last4}
                    </span>
                    <span style={styles.cardExpiry}>
                      Expires {paymentMethod.expMonth}/{paymentMethod.expYear}
                    </span>
                  </div>
                  <button 
                    style={styles.managePaymentButton}
                    onClick={handleManagePayment}
                  >
                    Manage <ExternalLink size={14} />
                  </button>
                </div>
              ) : (
                <div style={styles.noPayment}>
                  <p>No payment method on file</p>
                  <button 
                    style={styles.addPaymentButton}
                    onClick={handleManagePayment}
                  >
                    Add Payment Method
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Invoices */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Billing History</h3>
            <div style={styles.invoicesCard}>
              {invoices.length === 0 ? (
                <p style={styles.noInvoices}>No invoices yet</p>
              ) : (
                <div style={styles.invoicesList}>
                  {invoices.map((invoice, idx) => (
                    <div key={idx} style={styles.invoiceRow}>
                      <div style={styles.invoiceInfo}>
                        <span style={styles.invoiceDate}>
                          {formatDate(invoice.date)}
                        </span>
                        <span style={styles.invoiceDesc}>
                          {invoice.description || `${currentPlan.name} Plan`}
                        </span>
                      </div>
                      <div style={styles.invoiceRight}>
                        <span style={{
                          ...styles.invoiceStatus,
                          color: invoice.status === 'paid' ? '#22c55e' : '#eab308'
                        }}>
                          {invoice.status}
                        </span>
                        <span style={styles.invoiceAmount}>
                          {formatCurrency(invoice.amount)}
                        </span>
                        {invoice.invoiceUrl && (
                          <a 
                            href={invoice.invoiceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={styles.downloadInvoice}
                          >
                            <Download size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div style={styles.modalOverlay} onClick={() => setShowUpgradeModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.modalClose}
              onClick={() => setShowUpgradeModal(false)}
            >
              <X size={20} />
            </button>
            
            <h2 style={styles.modalTitle}>Choose Your Plan</h2>
            <p style={styles.modalSubtitle}>
              Select the plan that best fits your business needs
            </p>

            <div style={styles.plansGrid}>
              {plans.map(plan => (
                <div 
                  key={plan.id}
                  style={{
                    ...styles.planCard,
                    ...(plan.popular ? styles.planCardPopular : {}),
                    ...(plan.id === currentPlan.id ? styles.planCardCurrent : {})
                  }}
                >
                  {plan.popular && (
                    <div style={styles.popularBadge}>Most Popular</div>
                  )}
                  
                  <div style={styles.planHeader}>
                    <plan.icon size={24} style={{ color: 'var(--color-primary)' }} />
                    <h3 style={styles.planName}>{plan.name}</h3>
                    <p style={styles.planPrice}>
                      {plan.price === null 
                        ? 'Custom' 
                        : plan.price === 0 
                          ? 'Free' 
                          : `$${plan.price}/mo`
                      }
                    </p>
                    <p style={styles.planDesc}>{plan.description}</p>
                  </div>

                  <ul style={styles.planFeatures}>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} style={styles.planFeature}>
                        <Check size={14} color="#22c55e" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {plan.id === currentPlan.id ? (
                    <div style={styles.currentPlanBadge}>Current Plan</div>
                  ) : (
                    <button
                      style={styles.selectPlanButton}
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={processing}
                    >
                      {plan.contactSales 
                        ? 'Contact Sales' 
                        : plan.price < currentPlan.price 
                          ? 'Downgrade' 
                          : 'Upgrade'
                      }
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
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
  loadingState: {
    textAlign: 'center',
    padding: '60px',
    color: 'var(--color-text-muted)'
  },
  currentPlanCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    padding: '24px'
  },
  currentPlanHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  currentPlanIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  currentPlanInfo: {
    flex: 1
  },
  currentPlanName: {
    fontSize: '20px',
    fontWeight: 700,
    margin: 0
  },
  currentPlanPrice: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0'
  },
  currentPlanActions: {
    display: 'flex',
    gap: '12px'
  },
  upgradeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  subscriptionDetails: {
    display: 'flex',
    gap: '24px',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid var(--color-border)'
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  cancelButton: {
    marginTop: '20px',
    padding: '10px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    color: '#ef4444',
    fontSize: '13px',
    cursor: 'pointer'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0
  },
  paymentCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    padding: '20px'
  },
  paymentInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  cardIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    backgroundColor: 'var(--color-surface-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)'
  },
  cardDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  cardBrand: {
    fontSize: '15px',
    fontWeight: 600
  },
  cardExpiry: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  managePaymentButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  noPayment: {
    textAlign: 'center',
    padding: '20px'
  },
  addPaymentButton: {
    marginTop: '12px',
    padding: '10px 20px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '14px',
    cursor: 'pointer'
  },
  invoicesCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  noInvoices: {
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    textAlign: 'center',
    padding: '30px',
    margin: 0
  },
  invoicesList: {
    display: 'flex',
    flexDirection: 'column'
  },
  invoiceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid var(--color-border)'
  },
  invoiceInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  invoiceDate: {
    fontSize: '14px',
    fontWeight: 500
  },
  invoiceDesc: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  invoiceRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  invoiceStatus: {
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  invoiceAmount: {
    fontSize: '14px',
    fontWeight: 600
  },
  downloadInvoice: {
    padding: '6px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    color: 'var(--color-text-muted)',
    display: 'flex',
    alignItems: 'center'
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
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '32px',
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
    cursor: 'pointer'
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 700,
    margin: '0 0 8px 0',
    textAlign: 'center'
  },
  modalSubtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '0 0 32px 0',
    textAlign: 'center'
  },
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px'
  },
  planCard: {
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  planCardPopular: {
    borderColor: 'var(--color-primary)',
    boxShadow: '0 0 0 1px var(--color-primary)'
  },
  planCardCurrent: {
    backgroundColor: 'var(--color-surface)'
  },
  popularBadge: {
    position: 'absolute',
    top: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '4px 12px',
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff',
    fontSize: '11px',
    fontWeight: 600,
    borderRadius: '12px'
  },
  planHeader: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  planName: {
    fontSize: '18px',
    fontWeight: 700,
    margin: '12px 0 4px 0'
  },
  planPrice: {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--color-primary)',
    margin: '0 0 8px 0'
  },
  planDesc: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: 0
  },
  planFeatures: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 20px 0',
    flex: 1
  },
  planFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    marginBottom: '10px'
  },
  currentPlanBadge: {
    textAlign: 'center',
    padding: '12px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-text-muted)'
  },
  selectPlanButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%'
  }
};

export default BillingPage;