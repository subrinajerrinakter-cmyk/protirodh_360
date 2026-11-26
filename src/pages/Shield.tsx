import React, { useState } from 'react';
import {
  ShieldCheck,
  Smartphone,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { useSession } from '../state/session';
import { SHIELD_CHECKLIST, ShieldCheckItem } from '../content/shieldChecklist';

export const Shield: React.FC = () => {
  const { language } = useSession();
  const isBn = language === 'bn';

  const [answers, setAnswers] = useState<Record<string, 'yes' | 'no' | 'unsure'>>({});

  const handleSelect = (id: string, val: 'yes' | 'no' | 'unsure') => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-brand-teal text-sm font-semibold mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>{isBn ? 'মডিউল ০৫: ডিজিটাল সেফটি চেকআপ' : 'Module 05: Digital Safety Checkup'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-slate">
          {isBn ? 'ডিভাইস ও অ্যাকাউন্ট নিরাপত্তা নিরীক্ষা' : 'Device & Account Security Audit'}
        </h1>
        <p className="text-sm text-brand-muted mt-1 leading-relaxed">
          {isBn
            ? 'কোনো বিভ্রান্তিকর "নিরাপত্তা স্কোর" দেওয়ার বদলে এটি একটি অগ্রাধিকারপ্রাপ্ত চেকলিস্ট। জানুন কোনো সেটিংস পরিবর্তন করার সম্ভাব্য ঝুঁকি।'
            : 'A prioritized practical checklist without arbitrary safety scores. Review logged-in devices and shared access points.'}
        </p>
      </div>

      {/* Progress Notice */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-700">
          <Smartphone className="w-4 h-4 text-brand-teal" />
          <span>
            {isBn
              ? `সম্পন্ন প্রশ্নাবলি: ${answeredCount} / ${SHIELD_CHECKLIST.length}`
              : `Answered: ${answeredCount} of ${SHIELD_CHECKLIST.length} checkpoints`}
          </span>
        </div>
        <span className="text-xs text-slate-400">
          {isBn ? 'স্কিপ করলেও পূর্ণ তথ্য দেখতে পাবেন' : 'You can skip any question'}
        </span>
      </div>

      {/* Checklist items */}
      <div className="space-y-4">
        {SHIELD_CHECKLIST.map((item, index) => {
          const currentAnswer = answers[item.id];
          const hasRisk = currentAnswer === 'yes' || currentAnswer === 'unsure';

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl border transition p-5 shadow-xs ${
                hasRisk && currentAnswer === 'yes'
                  ? 'border-amber-300 bg-amber-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-mono text-xs flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <h2 className="text-base font-bold text-brand-slate">
                    {item.title[language]}
                  </h2>
                </div>
                <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>

              <p className="text-xs font-medium text-slate-800 my-2 leading-relaxed">
                {item.question[language]}
              </p>

              {/* Answer Buttons */}
              <div className="flex items-center gap-2 my-3">
                <button
                  onClick={() => handleSelect(item.id, 'yes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    currentAnswer === 'yes'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isBn ? 'হ্যাঁ (Yes)' : 'Yes'}
                </button>
                <button
                  onClick={() => handleSelect(item.id, 'no')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    currentAnswer === 'no'
                      ? 'bg-brand-teal text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isBn ? 'না (No)' : 'No'}
                </button>
                <button
                  onClick={() => handleSelect(item.id, 'unsure')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    currentAnswer === 'unsure'
                      ? 'bg-slate-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isBn ? 'অনিশ্চিত (Unsure)' : 'Unsure'}
                </button>
              </div>

              {/* Guidance Box */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 mt-2 space-y-2">
                <p className="leading-relaxed">
                  <strong className="text-brand-slate">{isBn ? 'পরামর্শ: ' : 'Guidance: '}</strong>
                  {item.guidance[language]}
                </p>

                {currentAnswer === 'yes' && item.warningIfYes && (
                  <div className="flex items-start gap-1.5 text-amber-900 bg-amber-50 p-2 rounded border border-amber-200 mt-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{item.warningIfYes[language]}</span>
                  </div>
                )}

                {item.actionUrl && (
                  <a
                    href={item.actionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-brand-teal hover:underline font-semibold mt-1"
                  >
                    <span>{item.actionLinkText ? item.actionLinkText[language] : 'Official Settings'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
