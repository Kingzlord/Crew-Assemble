'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { StoreProvider } from '@/lib/store';
import { Sidebar } from '@/components/Sidebar';
import { Tutorial, shouldShowTutorial } from '@/components/Tutorial';

export function AppShell({ children }: { children: ReactNode }) {
  const [showTutorial, setShowTutorial] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (shouldShowTutorial()) {
      setShowTutorial(true);
    }
  }, []);

  const handleReplayTutorial = () => {
    setShowTutorial(true);
  };

  return (
    <StoreProvider>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar onReplayTutorial={handleReplayTutorial} />
        <main className="flex-1 overflow-auto lg:pt-0">
          {children}
        </main>
      </div>
      {mounted && showTutorial && (
        <Tutorial onClose={() => setShowTutorial(false)} />
      )}
    </StoreProvider>
  );
}
