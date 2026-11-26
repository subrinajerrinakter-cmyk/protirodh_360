import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Shield, Trash2, X } from 'lucide-react';
import { useSession } from '../state/session';
import { SafeExitBanner } from './SafeExitBanner';

export function Navbar() {
  const { language, setLanguage, clearAllSessionData, inputText, incidents, selectedOptions, activeJourney } = useSession();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const bn = language === 'bn';
  const hasData = Boolean(inputText || incidents.length || selectedOptions.length || activeJourney);

  useEffect(() => setMenuOpen(false), [location]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => { document.documentElement.lang = language; }, [language]);

  const links = [
    { to: '/detect', label: bn ? 'বার্তা যাচাই' : 'Check a message' },
    { to: '/respond', label: bn ? 'নিরাপদ পদক্ষেপ' : 'Safety steps' },
    { to: '/support', label: bn ? 'সহায়তা' : 'Get support' },
    { to: '/plan', label: bn ? 'নিরাপত্তা পরিকল্পনা' : 'Safety plan' },
    { to: '/timeline', label: bn ? 'ঘটনার তালিকা' : 'Incident history' },
    { to: '/shield', label: bn ? 'ডিভাইস সুরক্ষা' : 'Device safety' },
    { to: '/academy', label: bn ? 'অনুশীলন' : 'Practice' },
    { to: '/rights', label: bn ? 'আপনার অধিকার' : 'Your rights' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold ${isActive ? 'bg-brand-tint text-brand-deep' : 'text-brand-muted hover:bg-slate-50 hover:text-brand-deep'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-content px-3 sm:px-6">
        <div className="flex min-h-16 items-center justify-between gap-2">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex min-w-0 items-center gap-2 font-bold text-brand-deep">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-deep text-white">
              <Shield aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="text-sm leading-tight sm:text-base">{bn ? 'প্রতিরোধ ৩৬০' : 'Protirodh 360'}</span>
          </Link>
          <nav aria-label={bn ? 'প্রধান নেভিগেশন' : 'Main navigation'} className="hidden items-center gap-1 lg:flex">
            {links.slice(0, 3).map(({ to, label }) => <NavLink key={to} to={to} className={linkClass}>{label}</NavLink>)}
          </nav>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button type="button" lang={bn ? 'en' : 'bn'} onClick={() => setLanguage(bn ? 'en' : 'bn')} className="min-h-11 rounded-lg px-2 text-sm font-semibold text-brand-deep hover:bg-brand-tint">
              {bn ? 'English' : 'বাংলা'}
            </button>
            <SafeExitBanner />
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-controls="tools-menu"
              aria-expanded={menuOpen}
              aria-label={bn ? 'টুলের মেনু' : 'Tools menu'}
              className="inline-flex min-h-11 min-w-10 items-center justify-center gap-1 rounded-lg text-brand-deep hover:bg-brand-tint sm:px-2"
            >
              {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
              <span className="hidden text-sm font-semibold sm:inline">{bn ? 'টুল' : 'Tools'}</span>
            </button>
          </div>
        </div>
        <nav id="tools-menu" aria-label={bn ? 'সব টুল' : 'All tools'} hidden={!menuOpen} className="max-h-[65vh] overflow-auto border-t border-slate-100 py-2">
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {links.map(({ to, label }, index) => (
              <div key={to} className={index < 3 ? 'lg:hidden' : undefined}>
                <NavLink to={to} onClick={() => setMenuOpen(false)} className={linkClass}>{label}</NavLink>
              </div>
            ))}
            {hasData && (
              <button type="button" onClick={() => { clearAllSessionData(); setMenuOpen(false); }} className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-left text-sm font-semibold text-red-700 hover:bg-red-50">
                <Trash2 aria-hidden="true" className="h-4 w-4" />
                {bn ? 'সেশনের তথ্য মুছুন' : 'Clear session'}
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
