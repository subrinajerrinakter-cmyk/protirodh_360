import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  Radar,
  GitCommit,
  LifeBuoy,
  FileCheck2,
  BookOpen,
  PhoneCall,
  Scale,
  Lock,
  Info,
  Menu,
  X,
  Trash2,
} from 'lucide-react';
import { useSession } from '../state/session';

export const Navbar: React.FC = () => {
  const { language, setLanguage, clearAllSessionData, inputText, incidents, selectedOptions } = useSession();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isBn = language === 'bn';
  const hasData = Boolean(inputText || incidents.length > 0 || selectedOptions.length > 0);

  const navLinks = [
    {
      to: '/detect',
      label: isBn ? 'অ্যাবিউজ রাডার' : 'Abuse Radar',
      icon: Radar,
      badge: 'P0',
    },
    {
      to: '/timeline',
      label: isBn ? 'প্যাটার্ন ট্র্যাকার' : 'Pattern Tracker',
      icon: GitCommit,
      badge: incidents.length > 0 ? `${incidents.length}` : 'P0',
    },
    {
      to: '/respond',
      label: isBn ? 'রেসপন্স ল্যাব' : 'Response Lab',
      icon: LifeBuoy,
      badge: 'P0',
    },
    {
      to: '/plan',
      label: isBn ? 'নিরাপত্তা পরিকল্পনা' : 'Safety Plan',
      icon: FileCheck2,
      badge: selectedOptions.length > 0 ? `${selectedOptions.length}` : 'P0',
    },
    {
      to: '/shield',
      label: isBn ? 'সেফটি চেকআপ' : 'Safety Checkup',
      icon: Shield,
      badge: 'P1',
    },
    {
      to: '/academy',
      label: isBn ? 'ডিফেন্স একাডেমি' : 'Defence Academy',
      icon: BookOpen,
      badge: 'P1',
    },
    {
      to: '/support',
      label: isBn ? 'সহায়তা ডিরেক্টরি' : 'Support Directory',
      icon: PhoneCall,
      badge: 'P1',
    },
    {
      to: '/rights',
      label: isBn ? 'অধিকার ও আইন' : 'Rights & Law',
      icon: Scale,
      badge: 'P1',
    },
    {
      to: '/privacy',
      label: isBn ? 'প্রাইভেসি সেন্টার' : 'Privacy Centre',
      icon: Lock,
      badge: 'P0',
    },
    {
      to: '/about',
      label: isBn ? 'পদ্ধতি ও বেঞ্চমার্ক' : 'Methodology',
      icon: Info,
      badge: 'P0',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-brand-deep text-white shadow-md">
      <div className="max-w-content mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-brand-teal flex items-center justify-center font-bold text-white shadow-sm border border-teal-400/30 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <div className="font-bold text-lg leading-tight tracking-tight flex items-center gap-1.5">
              <span>PROTIRODH 360</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-brand-teal/50 font-normal text-emerald-200 border border-teal-500/30">
                {isBn ? 'প্রতিরোধ ৩৬০' : 'Safe Tech'}
              </span>
            </div>
            <p className="text-[10px] text-teal-200/80 font-normal hidden sm:block">
              {isBn ? 'ডিজিটাল জেন্ডারভিত্তিক সহিংসতার বিরুদ্ধে আত্মরক্ষা' : 'Digital Self-Defence Against TGBV in Bangladesh'}
            </p>
          </div>
        </Link>

        {/* Right side controls: Language toggle, Clear session, Mobile hamburger */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="bg-slate-800/80 p-0.5 rounded-lg border border-teal-700/50 flex items-center text-xs">
            <button
              onClick={() => setLanguage('bn')}
              className={`px-2.5 py-1 rounded-md transition ${
                isBn ? 'bg-brand-teal text-white font-semibold shadow-xs' : 'text-teal-200 hover:text-white'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-md transition ${
                !isBn ? 'bg-brand-teal text-white font-semibold shadow-xs' : 'text-teal-200 hover:text-white'
              }`}
            >
              English
            </button>
          </div>

          {/* Clear Session Data Button */}
          {hasData && (
            <button
              onClick={clearAllSessionData}
              title={isBn ? 'সকল মেমোরি ডেটা মুছুন' : 'Clear all in-memory data'}
              className="hidden md:flex items-center gap-1.5 text-xs bg-red-950/40 text-red-300 hover:bg-red-900/60 hover:text-white border border-red-800/60 px-2.5 py-1.5 rounded-md transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isBn ? 'মুছুন' : 'Clear'}</span>
            </button>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-teal-900/60 text-teal-100 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation Row */}
      <nav aria-label={isBn ? 'প্রধান নেভিগেশন' : 'Primary Navigation'} className="hidden md:block bg-brand-deep/95 border-t border-teal-900/60">
        <div className="max-w-content mx-auto px-4 flex items-center gap-1 overflow-x-auto py-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition ${
                  isActive
                    ? 'bg-brand-teal text-white shadow-xs'
                    : 'text-teal-100 hover:bg-brand-teal/30 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 opacity-80" />
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    className={`text-[9px] px-1 rounded ${
                      isActive ? 'bg-teal-900 text-teal-100' : 'bg-slate-800 text-teal-300'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav aria-label={isBn ? 'মোবাইল নেভিগেশন মেনু' : 'Mobile Navigation Menu'} className="md:hidden bg-brand-deep border-t border-teal-800 px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-sm ${
                  isActive ? 'bg-brand-teal text-white font-semibold' : 'text-teal-100 hover:bg-brand-teal/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
                <span className="text-xs bg-slate-800 px-1.5 py-0.5 rounded text-teal-300">
                  {link.badge}
                </span>
              </Link>
            );
          })}
          {hasData && (
            <button
              onClick={() => {
                clearAllSessionData();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-3 flex items-center justify-center gap-2 text-xs bg-red-900 text-white py-2 rounded-md"
            >
              <Trash2 className="w-4 h-4" />
              <span>{isBn ? 'সকল মেমোরি ডেটা মুছুন' : 'Clear All In-Memory Data'}</span>
            </button>
          )}
        </nav>
      )}
    </header>
  );
};
