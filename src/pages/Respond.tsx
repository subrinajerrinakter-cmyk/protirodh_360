import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LifeBuoy,
  ShieldAlert,
  AlertTriangle,
  Check,
  Plus,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useSession } from '../state/session';
import { generateSafetyOptions } from '../engine/recommend';
import { SafetyOption } from '../types';

export const Respond: React.FC = () => {
  const navigate = useNavigate();
  const {
    language,
    findings,
    context,
    setContextField,
    selectedOptions,
    toggleOption,
  } = useSession();

  const isBn = language === 'bn';

  // Generate options based on current findings and user context
  const availableOptions = generateSafetyOptions(findings, context, language);

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-slate">
          {isBn ? 'নিরাপদ পদক্ষেপ' : 'Choose safety steps'}
        </h1>
        <p className="text-sm text-brand-muted mt-1 leading-relaxed">
          {isBn ? 'আপনার জন্য কাজে আসবে এমন পদক্ষেপ পরিকল্পনায় যোগ করুন।' : 'Add steps that fit your situation to your safety plan.'}
        </p>
      </div>

      {/* Safety Priority Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-brand-teal" />
            {isBn ? 'পরিস্থিতি সেটিংস:' : 'Circumstance Controls:'}
          </span>

          {/* Quick toggle for shared device */}
          <button
            onClick={() =>
              setContextField('deviceAccess', context.deviceAccess === 'yes' ? 'no' : 'yes')
            }
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center gap-1.5 ${
              context.deviceAccess === 'yes'
                ? 'bg-amber-600 text-white border-amber-700 font-semibold'
                : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <span>
              {isBn
                ? context.deviceAccess === 'yes'
                  ? '✓ ডিভাইস অন্যের নিয়ন্ত্রণে'
                  : 'ডিভাইস সুরক্ষিত'
                : context.deviceAccess === 'yes'
                ? '✓ Shared / Monitored Device'
                : 'Device is Private'}
            </span>
          </button>

          {/* Quick toggle for immediate concern */}
          <button
            onClick={() =>
              setContextField('immediateConcern', context.immediateConcern === 'yes' ? 'no' : 'yes')
            }
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center gap-1.5 ${
              context.immediateConcern === 'yes'
                ? 'bg-red-600 text-white border-red-700 font-semibold'
                : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <span>
              {isBn
                ? context.immediateConcern === 'yes'
                  ? '✓ জরুরি বিপদের শঙ্কা'
                  : 'জরুরি বিপদ নেই'
                : context.immediateConcern === 'yes'
                ? '✓ Immediate Danger Concern'
                : 'No Immediate Danger'}
            </span>
          </button>
        </div>

        <button
          onClick={() => navigate('/plan')}
          className="bg-brand-deep hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5 shadow-xs"
        >
          <span>{isBn ? 'পরিকল্পনা প্রিভিউ দেখুন' : 'View Safety Plan'}</span>
          <span className="bg-brand-teal text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
            {selectedOptions.length}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Decision Cards List */}
      <div className="space-y-4">
        {availableOptions.map((opt) => {
          const isSelected = selectedOptions.some((s) => s.id === opt.id);

          return (
            <div
              key={opt.id}
              className={`bg-white rounded-xl border transition p-5 shadow-xs ${
                opt.isUrgent
                  ? 'border-red-300 bg-red-50/20'
                  : isSelected
                  ? 'border-brand-teal ring-1 ring-brand-teal/40'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {opt.isUrgent && (
                      <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        {isBn ? 'জরুরি অগ্রাধিকার' : 'Urgent Priority'}
                      </span>
                    )}
                    <span className="text-[11px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {opt.category}
                    </span>
                    <span className="text-[11px] text-teal-700 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {opt.reviewStatus === 'verified_expert' ? 'Expert Reviewed' : 'Standard'}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-brand-slate">
                    {opt.title[language]}
                  </h2>
                </div>

                <button
                  onClick={() => toggleOption(opt)}
                  className={`shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shadow-xs ${
                    isSelected
                      ? 'bg-brand-teal text-white'
                      : 'bg-slate-100 text-slate-800 hover:bg-brand-teal hover:text-white'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{isBn ? 'পরিকল্পনায় যুক্ত' : 'Added to Plan'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isBn ? 'পরিকল্পনায় যোগ করুন' : 'Add to My Plan'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Reason (Why this appears) */}
              <div className="mb-3 text-xs text-slate-700">
                <span className="font-semibold text-slate-800 block mb-0.5">
                  {isBn ? 'কেন এই অপশনটি দেখাচ্ছে (Why this appears):' : 'Why this appears:'}
                </span>
                <p className="leading-relaxed">{opt.reason[language]}</p>
              </div>

              {/* Caution Notice if present */}
              {opt.cautionNotice && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 mb-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">{isBn ? 'সতর্কতা: ' : 'Caution: '}</span>
                    <span>{opt.cautionNotice[language]}</span>
                  </div>
                </div>
              )}

              {/* Action details & Alternatives */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-100">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="font-semibold text-brand-slate block mb-1">
                    {isBn ? 'পদক্ষেপ নেওয়ার আগে (Before you act):' : 'Before you act:'}
                  </span>
                  <p className="text-slate-600 leading-relaxed">{opt.beforeYouAct[language]}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="font-semibold text-brand-slate block mb-1">
                    {isBn ? 'বিকল্প পথ (Alternatives):' : 'Alternatives:'}
                  </span>
                  <p className="text-slate-600 leading-relaxed">{opt.alternatives[language]}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
