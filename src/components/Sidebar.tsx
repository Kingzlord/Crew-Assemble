'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Ship, RotateCcw } from 'lucide-react';
import { resetTutorial } from '@/components/Tutorial';

const NAV_ITEMS = [
  { href: '/', label: 'Command Deck', emoji: '⚓' },
  { href: '/crew', label: 'Crew Manifest', emoji: '☠' },
  { href: '/missions', label: 'Missions', emoji: '🗺' },
  { href: '/intelligence', label: 'Intelligence', emoji: '📊' },
  { href: '/readiness', label: 'Battle Readiness', emoji: '⚔' },
];

export function Sidebar({ onReplayTutorial }: { onReplayTutorial?: () => void }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleReplay = () => {
    resetTutorial();
    onReplayTutorial?.();
    setMobileOpen(false);
  };

  const navContent = (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-navy-700/50">
        <div className="flex items-center gap-3 mb-1">
          <Ship className="w-7 h-7 text-brass-400" />
          <div>
            <h1 className="text-base font-bold text-brass-400 tracking-wider nautical-text">
              BLACKFLAG
            </h1>
            <p className="text-[9px] text-brass-400/60 tracking-[0.2em] uppercase">
              Command
            </p>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto lg:hidden text-parchment-200/50 hover:text-parchment-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-parchment-200/40 italic mt-2 leading-tight">
          Know Your Crew. Choose Your Raid. Rule the Seas.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <div className="px-3 mb-3">
          <span className="text-[10px] text-parchment-200/30 tracking-[0.15em] uppercase">
            Navigation
          </span>
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-all sidebar-link
                ${isActive ? 'sidebar-link-active font-semibold' : 'text-parchment-200/70 hover:text-parchment-100'}
              `}
            >
              <span className="text-base">{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-navy-700/50">
        <button
          onClick={handleReplay}
          className="flex items-center gap-2 text-[10px] text-parchment-200/30 hover:text-brass-400 transition mb-3 w-full"
        >
          <RotateCcw className="w-3 h-3" /> Replay Tutorial
        </button>
        <div className="brass-divider mb-3" />
        <div className="flex items-center gap-2 text-[10px] text-parchment-200/30">
          <span>🏴‍☠️</span>
          <span>v1.0 — Tactical Command</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-navy-950 border-b border-navy-700/50 flex items-center px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="text-parchment-200/70 hover:text-parchment-100 transition"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Ship className="w-5 h-5 text-brass-400 ml-3" />
        <span className="text-sm font-bold text-brass-400 tracking-wider ml-2 nautical-text">BLACKFLAG</span>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          shrink-0 border-r border-navy-700/50 bg-navy-950 flex flex-col
          w-56 lg:w-60
          fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:static lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {navContent}
      </aside>

      {/* Spacer for mobile header */}
      <div className="lg:hidden h-14" />
    </>
  );
}
