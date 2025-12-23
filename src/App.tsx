import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Recipients from './pages/Recipients';
import RecipientDetail from './pages/RecipientDetail';
import Gifts from './pages/Gifts';
import GiftDetail from './pages/GiftDetail';
import Ideas from './pages/Ideas';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recipients" element={<Recipients />} />
            <Route path="/recipients/:id" element={<RecipientDetail />} />
            <Route path="/gifts" element={<Gifts />} />
            <Route path="/gifts/:id" element={<GiftDetail />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
