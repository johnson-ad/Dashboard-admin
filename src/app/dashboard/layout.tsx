'use client';

import { useState, Suspense } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ThemeProvider } from '@/contexts/ThemeContext';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/layout/Header').then(mod => ({ default: mod.Header })), {
  ssr: false,
  loading: () => (
    <header className="h-16 glass-card border-b border-white/10 sticky top-0 z-30">
      <div className="h-full flex items-center justify-between px-6">
        <div className="text-white">Loading...</div>
      </div>
    </header>
  ),
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        
        <div className="flex-1 flex flex-col lg:ml-64">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
