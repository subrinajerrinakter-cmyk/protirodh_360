import { LogOut } from 'lucide-react';
import { useSession } from '../state/session';

export function SafeExitBanner() {
  const { language, triggerQuickExit } = useSession();
  return (
    <button
      type="button"
      onClick={triggerQuickExit}
      className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-lg bg-red-700 px-2.5 text-sm font-semibold text-white hover:bg-red-800"
    >
      <LogOut aria-hidden="true" className="hidden h-4 w-4 sm:block" />
      {language === 'bn' ? 'দ্রুত প্রস্থান' : 'Quick exit'}
    </button>
  );
}
