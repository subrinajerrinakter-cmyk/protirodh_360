import React, { useState } from 'react';
import {
  Lock,
  Shield,
  Trash2,
  ExternalLink,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  ServerOff,
  RefreshCw,
} from 'lucide-react';
import { useSession } from '../state/session';

export const Privacy: React.FC = () => {
  const { language, clearAllSessionData, triggerQuickExit, quickExitUrl, setQuickExitUrl } = useSession();
  const isBn = language === 'bn';

  const [clearedNotice, setClearedNotice] = useState(false);

  const handleClear = () => {
    clearAllSessionData();
    setClearedNotice(true);
    setTimeout(() => setClearedNotice(false), 3000);
  };

  const threatRows = [
    {
      risk: isBn ? 'শেয়ার্ড বা মনিটরকৃত ডিভাইস' : 'Shared or Monitored Device',
      mitigation: isBn
        ? 'কোনো ডেটা লোকালস্টোরেজে রাখা হয় না। কুইক এক্সিট বাটন এক ক্লিকে ট্যাব রিডাইরেক্ট করে।'
        : 'Neutral warning, safe-device options, memory-only session, quick exit redirect.',
    },
    {
      risk: isBn ? 'সার্ভার ও হোস্টিং লগ' : 'Network & Hosting Logs',
      mitigation: isBn
        ? 'কোনো কুয়েরি স্ট্রিং বা ফর্ম সাবমিশন সার্ভারে পাঠানো হয় না। ক্লাউড এআই বা রিমোট ইনফারেন্স নেই।'
        : 'Zero sensitive query strings, form submissions, remote inference, or cloud AI calls.',
    },
    {
      risk: isBn ? 'ব্রাউজার পারসিস্টেন্স' : 'Browser Persistence',
      mitigation: isBn
        ? 'কখনোই সংবেদনশীল তথ্য localStorage বা IndexedDB-তে ক্যাশ করা হয় না। ট্যাব বন্ধেই নিঃশেষ।'
        : 'Memory-only state. No sensitive localStorage, IndexedDB, or service worker caching.',
    },
    {
      risk: isBn ? 'ম্যালিশিয়াস ইনপুট ও স্ক্রিপ্ট (XSS)' : 'XSS / Malicious Input',
      mitigation: isBn
        ? 'সমস্ত ইনপুট সাধারণ টেক্সট হিসেবে রেন্ডার হয়। কোনো অনিরাপদ HTML বা eval ব্যবহার করা হয় না।'
        : 'Plain text rendering, strict CSP, bounded input length, dependency auditing.',
    },
    {
      risk: isBn ? 'অনিচ্ছাকৃত তথ্য প্রকাশ' : 'Accidental Disclosure',
      mitigation: isBn
        ? 'কোনো অটো-সেভ বা অটো-সেন্ড নেই। এক্সপোর্টের আগে প্রিভিউ এবং রিডাকশন সক্রিয় থাকে।'
        : 'No autosave, no auto-send, manual redacted export preview, clear session always accessible.',
    },
    {
      risk: isBn ? 'ভুল এআই সিদ্ধান্ত' : 'Incorrect AI Output',
      mitigation: isBn
        ? 'অডিটযোগ্য রুল-বেসড পাইপলাইন। অনিশ্চয়তা স্বীকার করে এবং কাউকে অপবাদ দেয় না।'
        : 'Evidence-linked rules, explicit uncertainty, no definitive accusations, vetted actions.',
    },
  ];

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-slate">
          {isBn ? 'আপনার গোপনীয়তা' : 'Your privacy'}
        </h1>
        <p className="text-sm text-brand-muted mt-1 leading-relaxed">
          {isBn
            ? 'সারভাইভার-ফার্স্ট ডিজাইনের মূল শর্ত হলো গোপনীয়তা। জানুন কীভাবে আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখা হয়েছে।'
            : 'Explore our zero-server data lifecycle, threat mitigation matrix, and safe exit controls.'}
        </p>
      </div>

      {/* Immediate Session Purge Box */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-brand-slate flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-red-600" />
            <span>{isBn ? 'তাত্ক্ষণিক মেমোরি ডেটা পরিষ্কার' : 'Instant Memory Session Purge'}</span>
          </h2>
          <p className="text-xs text-brand-muted mt-1 max-w-xl">
            {isBn
              ? 'এই বাটনে ক্লিক করলে চলতি সেশনের সকল লেখা টেক্সট, টাইমলাইন ও নিরাপত্তা পরিকল্পনা তাৎক্ষণিক ব্রাউজার মেমোরি থেকে মুছে যাবে।'
              : 'Clears all pasted messages, incident timeline cards, and generated safety plans immediately from memory.'}
          </p>
        </div>

        <button
          onClick={handleClear}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition shrink-0 flex items-center justify-center gap-2 shadow-xs"
        >
          <Trash2 className="w-4 h-4" />
          <span>{isBn ? 'সকল মেমোরি ডেটা মুছুন' : 'Purge All Session Data'}</span>
        </button>
      </div>

      {clearedNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-lg p-3 text-xs mb-6 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{isBn ? 'সকল মেমোরি সফলভাবে মুছে ফেলা হয়েছে।' : 'All in-memory state purged.'}</span>
        </div>
      )}

      <details className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
        <summary className="cursor-pointer font-semibold text-brand-deep">
          {isBn ? 'দ্রুত প্রস্থানের সেটিংস' : 'Quick exit settings'}
        </summary>
        <p className="mt-3 text-sm text-brand-muted">
          {isBn ? 'দ্রুত প্রস্থান করলে এই সেশনের তথ্য মুছে যাবে। ব্রাউজার হিস্ট্রি থেকে যাবে।' : 'Quick exit clears this session. Your browser history stays on the device.'}
        </p>
        <label className="mt-3 block text-sm font-medium" htmlFor="quick-exit-url">
          {isBn ? 'প্রস্থানের পর যে ওয়েবসাইট খুলবে' : 'Website to open on exit'}
        </label>
        <input
          id="quick-exit-url"
          type="url"
          value={quickExitUrl}
          onChange={(event) => setQuickExitUrl(event.target.value)}
          className="mt-2 w-full max-w-md rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </details>

      {/* Threat Model Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-xs">
        <h2 className="text-sm font-bold text-brand-slate uppercase tracking-wider mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-brand-teal" />
          <span>{isBn ? 'হুমকি মডেল ও প্রতিরোধ ব্যবস্থা (Threat Matrix)' : 'Threat Model & Required Mitigations'}</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="py-2.5 px-3 font-semibold">{isBn ? 'ঝুঁকি (Risk)' : 'Identified Risk'}</th>
                <th className="py-2.5 px-3 font-semibold">{isBn ? 'বাধ্যতামূলক প্রতিরোধ (Required Mitigation)' : 'Required Mitigation'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {threatRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-semibold text-brand-slate whitespace-nowrap">{row.risk}</td>
                  <td className="py-3 px-3 text-slate-600 leading-relaxed">{row.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Browser Clearing Tips */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-sm font-bold text-brand-slate uppercase tracking-wider mb-3">
          {isBn ? 'ব্রাউজার হিস্ট্রি মুছে ফেলার নির্দেশিকা' : 'How to Clear Browser History Manually'}
        </h2>
        <p className="text-xs text-brand-muted mb-4 leading-relaxed">
          {isBn
            ? 'যেকোনো ওয়েবসাইট ব্রাউজ করলে ব্রাউজার নিজে থেকেই হিস্ট্রি সংরক্ষণ করে। অন্য কেউ আপনার হিস্ট্রি চেক করার সম্ভাবনা থাকলে নিচের ধাপগুলো অনুসরণ করুন:'
            : 'Any browser automatically stores browsing URLs in its history. If someone inspects your phone, clear your history manually:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-bold text-brand-slate mb-1">Google Chrome (Mobile & PC)</h3>
            <p className="text-slate-600 leading-relaxed">
              {isBn
                ? 'ডানদিকের থ্রি-ডট (⋮) -> History -> Clear browsing data -> "Last hour" বা "All time" সিলেক্ট করে ক্লিয়ার চাপুন।'
                : 'Tap 3 dots (⋮) -> History -> Clear browsing data -> Select "Last hour" or "All time" and clear.'}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-bold text-brand-slate mb-1">In-App Browsers (FB / Insta)</h3>
            <p className="text-slate-600 leading-relaxed">
              {isBn
                ? 'ফেসবুক বা ইনস্টাগ্রামের ভেতর কোনো লিংক ওপেন না করে আলাদা "ইনকগনিটো মোড" (Incognito Mode)-এ ওপেন করুন।'
                : 'Avoid opening sensitive sites inside Facebook/Instagram in-app browsers; open directly in Chrome/Safari Incognito.'}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-bold text-brand-slate mb-1">Safari (iPhone)</h3>
            <p className="text-slate-600 leading-relaxed">
              {isBn
                ? 'বুকমার্ক আইকন -> ঘড়ি আইকন (History) -> নিচে "Clear" চেপে "All time" সিলেক্ট করুন।'
                : 'Tap Bookmarks icon -> Clock icon (History) -> Tap "Clear" at bottom and choose period.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
