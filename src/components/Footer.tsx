import { Link } from 'react-router-dom';
import { useSession } from '../state/session';

export function Footer() {
  const { language } = useSession();
  const bn = language === 'bn';

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-5">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm text-brand-muted">
        <span className="font-semibold text-brand-deep">{bn ? 'প্রতিরোধ ৩৬০' : 'Protirodh 360'}</span>
        <nav aria-label={bn ? 'আরও তথ্য' : 'More information'} className="flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/privacy" className="hover:text-brand-deep hover:underline">{bn ? 'গোপনীয়তা' : 'Privacy'}</Link>
          <Link to="/about" className="hover:text-brand-deep hover:underline">{bn ? 'প্রকল্প সম্পর্কে' : 'About'}</Link>
        </nav>
      </div>
    </footer>
  );
}
