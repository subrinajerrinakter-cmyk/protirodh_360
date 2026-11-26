import React, { useState } from 'react';
import { ShieldAlert, ExternalLink, Settings, X } from 'lucide-react';
import { useSession } from '../state/session';

export const SafeExitBanner: React.FC = () => {
  const { language, triggerQuickExit, quickExitUrl, setQuickExitUrl } = useSession();
  const [showSettings, setShowSettings] = useState(false);

  const isBn = language === 'bn';

  return (
    <aside aria-label={isBn ? 'জরুরি প্রস্থান বার' : 'Emergency Exit Bar'} className="bg-brand-slate text-white text-xs px-4 py-2 border-b border-slate-700">
      <div className="max-w-content mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {isBn
              ? 'নিরাপদ প্রস্থান: জরুরি পরিস্থিতিতে তাৎক্ষণিক বের হতে লাল বাটন চাপুন। (মনে রাখবেন: এটি ব্রাউজার হিস্ট্রি মোছে না)'
              : 'Safe Exit: If monitored, click exit to leave immediately. (Note: Exit does not erase browser history)'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            title={isBn ? 'প্রস্থান সেটিংস' : 'Exit Settings'}
            className="text-slate-300 hover:text-white p-1 rounded"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={triggerQuickExit}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded transition flex items-center gap-1.5 shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isBn ? 'দ্রুত প্রস্থান (Safe Exit)' : 'Quick Safe Exit'}</span>
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="max-w-content mx-auto mt-2 pt-2 border-t border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-slate-300">
              {isBn ? 'প্রস্থান গন্তব্য URL:' : 'Exit redirect URL:'}
            </label>
            <input
              type="text"
              value={quickExitUrl}
              onChange={(e) => setQuickExitUrl(e.target.value)}
              className="bg-slate-800 text-white px-2 py-0.5 rounded text-xs border border-slate-600 w-64 focus:outline-none focus:border-brand-teal"
            />
          </div>
          <button
            onClick={() => setShowSettings(false)}
            className="text-slate-400 hover:text-white text-xs flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>{isBn ? 'বন্ধ করুন' : 'Close'}</span>
          </button>
        </div>
      )}
    </aside>
  );
};
