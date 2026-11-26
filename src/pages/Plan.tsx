import React, { useState } from 'react';
import {
  FileCheck2,
  Download,
  Printer,
  ShieldAlert,
  AlertTriangle,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import { useSession } from '../state/session';
import { formatPlanAsText, redactPlanForSafeExport } from '../engine/plan';

export const Plan: React.FC = () => {
  const { language, safetyPlan, selectedOptions, updateSafetyPlan, clearAllSessionData } = useSession();
  const isBn = language === 'bn';

  const [notes, setNotes] = useState('');
  const [redactInfo, setRedactInfo] = useState(true);
  const [showExportModal, setShowExportModal] = useState(false);

  const formattedPlanText = safetyPlan ? formatPlanAsText(safetyPlan, language) : '';
  const finalExportText = redactInfo
    ? redactPlanForSafeExport(formattedPlanText)
    : formattedPlanText;

  const handleDownload = () => {
    const blob = new Blob([finalExportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Protirodh_Safety_Plan_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-slate">
            {isBn ? 'আপনার নিরাপত্তা পরিকল্পনা' : 'Your safety plan'}
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            {isBn ? 'আপনার পদক্ষেপগুলো দেখুন এবং দরকার হলে নোট যোগ করুন।' : 'Review your steps and add notes if you need them.'}
          </p>
        </div>

        {safetyPlan && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isBn ? 'প্রিন্ট' : 'Print'}</span>
            </button>

            <button
              onClick={() => setShowExportModal(true)}
              className="bg-brand-teal hover:bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isBn ? 'টেক্সট ডাউনলোড' : 'Download .TXT'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Shared Device Storage Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3 text-xs text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h2 className="font-bold text-amber-950">
            {isBn ? 'শেয়ার্ড ডিভাইস সম্পর্কিত জরুরি সতর্কতা' : 'Shared Device Security Precaution'}
          </h2>
          <p className="mt-1 leading-relaxed text-amber-800">
            {isBn
              ? 'যদি এই ফোন বা কম্পিউটার অন্য কেউ ব্যবহার করে, তবে কোনো ফাইল ডাউনলোড বা প্রিন্ট করবেন না। ডাউনলোড করা ফাইল বা কাগজ অন্যের চোখে পড়লে আপনার নিরাপত্তা বিঘ্নিত হতে পারে। প্রয়োজন হলে বিশ্বস্ত বন্ধুর ডিভাইসে এটি তৈরি করুন।'
              : 'If anyone else has access to this device, do NOT download or print this plan here. Downloaded files remain in system folders and can alert someone. Complete this step on a trusted device.'}
          </p>
        </div>
      </div>

      {!safetyPlan ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
          <FileCheck2 className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h2 className="text-base font-semibold text-brand-slate mb-1">
            {isBn ? 'এখনো কোনো পদক্ষেপ যুক্ত করা হয়নি' : 'No Actions in Safety Plan Yet'}
          </h2>
          <p className="text-xs text-brand-muted max-w-md mx-auto mb-5 leading-relaxed">
            {isBn
              ? 'রেসপন্স ল্যাব থেকে প্রয়োজনীয় সিদ্ধান্ত কার্ডের পাশে "+ পরিকল্পনায় যোগ করুন" বাটন চাপলে তা এখানে প্রদর্শিত হবে।'
              : 'Visit Response Lab to select action cards tailored to your situation. They will appear here for editing and export.'}
          </p>
          <a
            href="/respond"
            className="inline-flex items-center gap-2 bg-brand-teal text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xs"
          >
            <span>{isBn ? 'রেসপন্স ল্যাব-এ যান' : 'Go to Response Lab'}</span>
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Action Plan Sections */}
          <div className="lg:col-span-7 space-y-4">
            {/* Immediate Action Items */}
            {safetyPlan.immediateItems.length > 0 && (
              <div className="bg-white rounded-xl border border-red-200 p-5 shadow-xs">
                <h2 className="text-xs font-bold uppercase text-red-600 tracking-wider mb-3 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>{isBn ? 'জরুরি পদক্ষেপ (Immediate Actions)' : 'Immediate Actions'}</span>
                </h2>
                <div className="space-y-3">
                  {safetyPlan.immediateItems.map((item, i) => (
                    <div key={item.id} className="p-3 bg-red-50/50 rounded-lg border border-red-100 text-xs">
                      <div className="font-bold text-brand-slate text-sm mb-1">{item.title}</div>
                      {item.cautionAlert && (
                        <div className="text-red-700 font-medium mb-1">! {item.cautionAlert}</div>
                      )}
                      <p className="text-slate-600">{item.customNotes}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Device & Account Safety Items */}
            {safetyPlan.deviceItems.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <h2 className="text-xs font-bold uppercase text-brand-teal tracking-wider mb-3">
                  {isBn ? 'ডিভাইস ও অ্যাকাউন্ট নিরাপত্তা' : 'Device & Account Security'}
                </h2>
                <div className="space-y-3">
                  {safetyPlan.deviceItems.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                      <div className="font-bold text-brand-slate text-sm mb-1">{item.title}</div>
                      <p className="text-slate-600">{item.customNotes}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documentation Items */}
            {safetyPlan.documentationItems.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <h2 className="text-xs font-bold uppercase text-brand-teal tracking-wider mb-3">
                  {isBn ? 'প্রমাণ ও তথ্য সংরক্ষণ' : 'Documentation & Evidence'}
                </h2>
                <div className="space-y-3">
                  {safetyPlan.documentationItems.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                      <div className="font-bold text-brand-slate text-sm mb-1">{item.title}</div>
                      <p className="text-slate-600">{item.customNotes}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Support Items */}
            {safetyPlan.supportItems.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <h2 className="text-xs font-bold uppercase text-brand-teal tracking-wider mb-3">
                  {isBn ? 'সহায়তা ও হটলাইন নেটওয়ার্ক' : 'Support & Hotlines'}
                </h2>
                <div className="space-y-3">
                  {safetyPlan.supportItems.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                      <div className="font-bold text-brand-slate text-sm mb-1">{item.title}</div>
                      <p className="text-slate-600">{item.customNotes}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Personal Notes Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <label htmlFor="safety-plan-personal-notes" className="text-xs font-bold uppercase text-slate-500 block mb-2">
                {isBn ? 'ব্যক্তিগত অতিরিক্ত নোট (ঐচ্ছিক):' : 'Custom Personal Notes (Optional):'}
              </label>
              <textarea
                id="safety-plan-personal-notes"
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  updateSafetyPlan(e.target.value);
                }}
                placeholder={
                  isBn
                    ? 'যেমন: কোন বন্ধুর সাথে যোগাযোগ করবেন, জরুরি কাগজপত্র কোথায় রেখেছেন...'
                    : 'e.g. Which trusted friend to call, location of important documents...'
                }
                rows={3}
                className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
              />
            </div>
          </div>

          {/* Right Column: Live Redaction Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs sticky top-24">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {isBn ? 'এক্সপোর্ট প্রিভিউ' : 'Plain Text Export Preview'}
                </h2>
                <button
                  onClick={() => setRedactInfo(!redactInfo)}
                  className={`text-xs px-2.5 py-1 rounded transition flex items-center gap-1.5 border ${
                    redactInfo
                      ? 'bg-brand-tint text-brand-deep border-teal-300 font-semibold'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {redactInfo ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isBn ? 'রিডাকশন / গোপনকরণ সক্রিয়' : 'Redaction Enabled'}</span>
                </button>
              </div>

              <pre className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-[11px] leading-relaxed overflow-x-auto max-h-96 whitespace-pre-wrap select-all">
                {finalExportText}
              </pre>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {isBn ? 'মেমোরিতে সংরক্ষিত (জিরো ক্লাউড)' : 'Stored in RAM only (Zero Cloud)'}
                </span>
                <button
                  onClick={clearAllSessionData}
                  className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isBn ? 'পরিকল্পনা মুছুন' : 'Clear Plan'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Confirmation Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 text-amber-600 font-bold text-base">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{isBn ? 'ডাউনলোড করার আগে নিশ্চিত হোন' : 'Confirm Safe Download'}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'এই ফাইলটি আপনার ডিভাইসের "Downloads" ফোল্ডারে সেভ হবে। অন্য কেউ এই ফোন চেক করলে ফাইলটি দেখতে পারে। আপনি কি নিশ্চিত যে আপনি এটি ডাউনলোড করতে চান?'
                : 'This file will be saved to your device Downloads folder. If your device is monitored, this file may be viewed by others. Are you sure you wish to proceed?'}
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowExportModal(false)}
                className="text-xs text-slate-600 hover:text-slate-800 px-4 py-2"
              >
                {isBn ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                onClick={handleDownload}
                className="bg-brand-teal hover:bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-lg"
              >
                {isBn ? 'হ্যাঁ, ডাউনলোড করুন' : 'Confirm Download'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
