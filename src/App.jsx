/**
 * Main App Component
 * 
 * Routes all pages through the AdminLayout.
 * Demo mode for "Demo Bistro" restaurant.
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import { AdminLayout } from '@components/AdminLayout';

// Dashboard
import { DashboardHome } from '@components/DashboardHome';

// Module Pages
import { OrdersDashboard } from '@components/orders';
import { OrdersList } from '@components/orders';
import { OrderDetail } from '@components/orders';
import { OrderFulfillment } from '@components/orders';
import { OrderReturns } from '@components/orders';

import { ProductsDashboard } from '@components/products';
import { ProductsList } from '@components/products';
import { ProductDetail } from '@components/products';
import { ProductForm } from '@components/products';
import { ProductCategories } from '@components/products';
import { ProductPricing } from '@components/products';
import { ProductInventory } from '@components/products';

import { CustomersDashboard } from '@components/customers';
import { CustomersList } from '@components/customers';
import { CustomerDetail } from '@components/customers';
import { CustomerSegments } from '@components/customers';

import { InventoryDashboard } from '@components/inventory';
import { InventoryList } from '@components/inventory';
import { InventoryAlerts } from '@components/inventory';
import { InventoryMovements } from '@components/inventory';
import { InventoryLocations } from '@components/inventory';

import { AnalyticsDashboard } from '@components/analytics';
import { AnalyticsSales } from '@components/analytics';
import { AnalyticsCustomers } from '@components/analytics';
import { AnalyticsProducts } from '@components/analytics';
import { TrafficAnalytics } from '@components/analytics';
import { AnalyticsReports } from '@components/analytics';

import { MarketingDashboard } from '@components/marketing';
import { CampaignList } from '@components/marketing';
import { CampaignBuilder } from '@components/marketing';
import { PromotionsManager } from '@components/marketing';
import { EmailTemplates } from '@components/marketing';
import { MarketingSocial } from '@components/marketing';

import { AIManagerPage } from '@components/ai';
import { AIChat } from '@components/ai';
import { AIInsights } from '@components/ai';
import { AITasks } from '@components/ai';

import { SettingsPage } from '@components/settings';
import { SettingsGeneral } from '@components/settings';
import { SettingsUsers } from '@components/settings';
import { SettingsPayments } from '@components/settings';
import { SettingsIntegrations } from '@components/settings';

function App() {
  return (
    <Routes>
      {/* All routes wrapped in AdminLayout */}
      <Route path="/" element={<AdminLayout />}>
        {/* Dashboard */}
        <Route index element={<DashboardHome />} />
        <Route path="dashboard" element={<DashboardHome />} />

        {/* Orders */}
        <Route path="orders" element={<OrdersDashboard />} />
        <Route path="orders/list" element={<OrdersList />} />
        <Route path="orders/:id" element={<OrderDetail />} />
        <Route path="orders/fulfillment" element={<OrderFulfillment />} />
        <Route path="orders/returns" element={<OrderReturns />} />

        {/* Products */}
        <Route path="products" element={<ProductsDashboard />} />
        <Route path="products/list" element={<ProductsList />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="products/:id/edit" element={<ProductForm />} />
        <Route path="products/categories" element={<ProductCategories />} />
        <Route path="products/pricing" element={<ProductPricing />} />
        <Route path="products/inventory" element={<ProductInventory />} />

        {/* Customers */}
        <Route path="customers" element={<CustomersDashboard />} />
        <Route path="customers/list" element={<CustomersList />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="customers/segments" element={<CustomerSegments />} />

        {/* Inventory */}
        <Route path="inventory" element={<InventoryDashboard />} />
        <Route path="inventory/list" element={<InventoryList />} />
        <Route path="inventory/alerts" element={<InventoryAlerts />} />
        <Route path="inventory/movements" element={<InventoryMovements />} />
        <Route path="inventory/locations" element={<InventoryLocations />} />

        {/* Analytics */}
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="analytics/sales" element={<AnalyticsSales />} />
        <Route path="analytics/customers" element={<AnalyticsCustomers />} />
        <Route path="analytics/products" element={<AnalyticsProducts />} />
        <Route path="analytics/traffic" element={<TrafficAnalytics />} />
        <Route path="analytics/reports" element={<AnalyticsReports />} />

        {/* Marketing */}
        <Route path="marketing" element={<MarketingDashboard />} />
        <Route path="marketing/campaigns" element={<CampaignList />} />
        <Route path="marketing/campaigns/new" element={<CampaignBuilder />} />
        <Route path="marketing/promotions" element={<PromotionsManager />} />
        <Route path="marketing/email" element={<EmailTemplates />} />
        <Route path="marketing/social" element={<MarketingSocial />} />

        {/* AI Manager */}
        <Route path="ai" element={<AIManagerPage />} />
        <Route path="ai/chat" element={<AIChat />} />
        <Route path="ai/insights" element={<AIInsights />} />
        <Route path="ai/tasks" element={<AITasks />} />

        {/* Settings */}
        <Route path="settings" element={<SettingsPage />} />
        <Route path="settings/general" element={<SettingsGeneral />} />
        <Route path="settings/users" element={<SettingsUsers />} />
        <Route path="settings/payments" element={<SettingsPayments />} />
        <Route path="settings/integrations" element={<SettingsIntegrations />} />

        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;