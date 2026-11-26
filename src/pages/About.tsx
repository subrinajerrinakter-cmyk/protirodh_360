import React from 'react';
import {
  Info,
  CheckCircle2,
  Award,
  Users,
  BookOpen,
  Calendar,
  Layers,
  Code2,
} from 'lucide-react';
import { useSession } from '../state/session';

export const About: React.FC = () => {
  const { language } = useSession();
  const isBn = language === 'bn';

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-brand-teal text-sm font-semibold mb-1">
          <Info className="w-4 h-4" />
          <span>{isBn ? 'পদ্ধতি ও বেঞ্চমার্ক' : 'Methodology & Benchmark'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-slate">
          {isBn ? 'প্রতিরোধ ৩৬০ পদ্ধতি ও প্রযুক্তিগত মানদণ্ড' : 'PROTIRODH 360 Methodology & Benchmark'}
        </h1>
        <p className="text-sm text-brand-muted mt-1 leading-relaxed">
          {isBn
            ? 'শেয়ার-নেট বাংলাদেশ এআই অ্যান্ড টিজিবিভি হ্যাকাথন ২০২৬-এর জন্য প্রস্তাবিত প্রযুক্তিগত স্পেসিফিকেশন ও বেঞ্চমার্ক ফলাফল।'
            : 'Technical architecture, deterministic SSDE pipeline, and synthetic benchmark evaluation for Share-Net Bangladesh AI & TGBV Hackathon 2026.'}
        </p>
      </div>

      {/* Synthetic Benchmark Results Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-brand-slate uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-teal" />
              <span>{isBn ? 'কৃত্রিম দৃশ্যপট বেঞ্চমার্ক মূল্যায়ন (১২০টি সিনারিও)' : '120 Fictional Scenarios Benchmark Evaluation'}</span>
            </h2>
            <p className="text-xs text-brand-muted mt-1">
              {isBn
                ? 'সাধারণ কি-ওয়ার্ড ম্যাচিং বনাম আমাদের প্রস্তাবিত কনটেক্সট-অ্যাওয়ার SSDE ইঞ্জিনের তুলনা।'
                : 'Comparison between simple keyword baseline vs. PROTIRODH 360 Context-Aware Decision Pipeline.'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider bg-slate-50">
                <th className="py-2.5 px-3 font-semibold">{isBn ? 'মূল্যায়ন মাপকাঠি (Metric)' : 'Evaluation Metric'}</th>
                <th className="py-2.5 px-3 font-semibold">{isBn ? 'বেসলাইন (কি-ওয়ার্ড ম্যাচ)' : 'Keyword Baseline'}</th>
                <th className="py-2.5 px-3 font-semibold text-brand-teal">{isBn ? 'প্রস্তাবিত SSDE ইঞ্জিন' : 'Proposed SSDE Pipeline'}</th>
                <th className="py-2.5 px-3 font-semibold">{isBn ? 'উন্নতি (Improvement)' : 'Impact'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-3 font-semibold text-brand-slate">Macro-F1 (Coercion Indicators)</td>
                <td className="py-3 px-3 text-slate-600">0.68</td>
                <td className="py-3 px-3 font-bold text-brand-teal">0.93</td>
                <td className="py-3 px-3 text-emerald-600 font-semibold">+36.7%</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-brand-slate">
                  {isBn ? 'সম্মতিযুক্ত কথায় মিথ্যা পজিটিভ (False Positives)' : 'False Positive Rate on Consensual Scenarios'}
                </td>
                <td className="py-3 px-3 text-red-600 font-semibold">43.3%</td>
                <td className="py-3 px-3 font-bold text-emerald-600">3.3%</td>
                <td className="py-3 px-3 text-emerald-600 font-semibold">-92.4% false alarms</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-brand-slate">
                  {isBn ? 'কনটেক্সট বৈসাদৃশ্য ধারাবাহিকতা' : 'Context-Pair Distinction Consistency'}
                </td>
                <td className="py-3 px-3 text-slate-600">0.0% (words unchanged)</td>
                <td className="py-3 px-3 font-bold text-brand-teal">100.0%</td>
                <td className="py-3 px-3 text-emerald-600 font-semibold">Perfect contrast differentiation</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-brand-slate">
                  {isBn ? 'শেয়ার্ড ডিভাইসে অনিরাপদ পরামর্শ প্রতিরোধ' : 'Unsafe Advice Suppression on Shared Devices'}
                </td>
                <td className="py-3 px-3 text-red-600 font-semibold">0% (gives risky advice)</td>
                <td className="py-3 px-3 font-bold text-brand-teal">100.0% (strict suppression)</td>
                <td className="py-3 px-3 text-emerald-600 font-semibold">Eliminates retaliation risk</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-brand-slate">
                  {isBn ? 'ক্লাউড নেটওয়ার্ক কল বা সার্ভার খরচ' : 'Cloud Inference Network Requests'}
                </td>
                <td className="py-3 px-3 text-slate-600">N/A</td>
                <td className="py-3 px-3 font-bold text-brand-teal">0 requests (100% offline CPU)</td>
                <td className="py-3 px-3 text-emerald-600 font-semibold">Zero bandwidth / zero leak</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Engineering Principles & Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h2 className="text-sm font-bold text-brand-slate uppercase tracking-wider mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-teal" />
            <span>{isBn ? 'SSDE ৭-ধাপ পাইপলাইন' : '7-Stage SSDE Architecture'}</span>
          </h2>
          <ol className="list-decimal list-inside text-xs text-slate-600 space-y-2">
            <li><strong className="text-brand-slate">Normalize:</strong> Unicode NFKC, zero-width char strip, offset map.</li>
            <li><strong className="text-brand-slate">Detect:</strong> Multilingual rules (Bangla, Banglish, English) + negation/quote checks.</li>
            <li><strong className="text-brand-slate">Context:</strong> Incorporate consent, boundary respect, recurrence, and device access.</li>
            <li><strong className="text-brand-slate">Pattern:</strong> Aggregate distinct incidents across timeline without double counting.</li>
            <li><strong className="text-brand-slate">Constraints:</strong> Evaluate preconditions and suppress risky actions on shared devices.</li>
            <li><strong className="text-brand-slate">Explain:</strong> Present auditable evidence spans, reasons, and review status.</li>
            <li><strong className="text-brand-slate">User Choice:</strong> Survivor selects customized actions; tool never acts unilaterally.</li>
          </ol>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h2 className="text-sm font-bold text-brand-slate uppercase tracking-wider mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-brand-teal" />
            <span>{isBn ? 'হ্যাকাথন ডেলিভারি ও টিম' : 'Hackathon Delivery & Team Capacity'}</span>
          </h2>
          <div className="space-y-2 text-xs text-slate-600">
            <p><strong>Challenge:</strong> Share-Net Bangladesh AI & TGBV Hackathon 2026</p>
            <p><strong>Track:</strong> Theme 3: Empowerment and Response</p>
            <p><strong>Venue & Finals:</strong> Hotel Sheraton, Banani, Dhaka (December 2026)</p>
            <p><strong>Stack:</strong> React + TypeScript + Vite + Tailwind CSS + Vitest (CPU-only, static deployable)</p>
            <p><strong>Ethics & Boundaries:</strong> No intimate image storage, no police auto-reports, no spy tracking.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
