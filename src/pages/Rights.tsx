import React from 'react';
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  FileText,
  BookmarkCheck,
  Info,
} from 'lucide-react';
import { useSession } from '../state/session';
import { RIGHTS_CONTENT } from '../content/rightsContent';

export const Rights: React.FC = () => {
  const { language } = useSession();
  const isBn = language === 'bn';

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-brand-teal text-sm font-semibold mb-1">
          <Scale className="w-4 h-4" />
          <span>{isBn ? 'মডিউল ০৮: অধিকার ও আইনি কাঠামো' : 'Module 08: Rights Navigator'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-slate">
          {isBn ? 'ডিজিটাল অধিকার ও বাংলাদেশের সাইবার আইন' : 'Digital Rights & Legal Framework in Bangladesh'}
        </h1>
        <p className="text-sm text-brand-muted mt-1 leading-relaxed">
          {isBn
            ? 'ডিজিটাল জেন্ডারভিত্তিক সহিংসতার শিকার ব্যক্তিদের সুরক্ষা প্রদানে প্রচলিত আইন ও প্রমাণ সংরক্ষণের অধিকার।'
            : 'Reviewed educational cards on consent, image-based abuse, and evidentiary considerations in Bangladesh.'}
        </p>
      </div>

      {/* Scope Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3 text-xs text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h2 className="font-bold text-amber-950">
            {isBn ? 'আইনি সচেতনতামূলক বিজ্ঞপ্তির সীমাবদ্ধতা' : 'Educational Awareness Scope Notice'}
          </h2>
          <p className="mt-1 leading-relaxed text-amber-800">
            {isBn
              ? 'এখানে উপস্থাপিত তথ্যগুলো নাগরিক সচেতনতা ও ডিজিটাল আত্মরক্ষার উদ্দেশ্যে সংকলিত। এটি আদালতের মামলা পরিচালনার আনুষ্ঠানিক আইনি পরামর্শ নয়। আনুষ্ঠানিক সহায়তা পেতে আমাদের সাপোর্ট ডিরেক্টরি থেকে আসক (ASK), ব্লাস্ট (BLAST) বা পুলিশ সাইবার সাপোর্ট ফর উইমেনের সরাসরি সাহায্য নিন।'
              : 'This content is provided for educational and self-defence awareness only. It does not constitute formal legal counsel. For legal representation or litigation, consult verified bodies in our Support Directory.'}
          </p>
        </div>
      </div>

      {/* Legal Cards Grid */}
      <div className="space-y-4">
        {RIGHTS_CONTENT.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h2 className="text-base font-bold text-brand-slate">
                {card.topic[language]}
              </h2>
              <span className="text-[11px] font-mono text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded font-semibold self-start sm:self-auto">
                {card.citation}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              {card.summary[language]}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-100">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="font-semibold text-brand-slate mb-1 flex items-center gap-1.5">
                  <BookmarkCheck className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{isBn ? 'ব্যবহারিক অধিকার:' : 'Practical Takeaway:'}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{card.practicalTakeaway[language]}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="font-semibold text-brand-slate mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{isBn ? 'প্রমাণ সংরক্ষণের পরামর্শ:' : 'Evidence Preservation Tip:'}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{card.evidenceTip[language]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
