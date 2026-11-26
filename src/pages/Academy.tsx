import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useSession } from '../state/session';
import { ACADEMY_SCENARIOS } from '../content/scenarios';
import { Scenario, ScenarioChoice } from '../types';

export const Academy: React.FC = () => {
  const { language } = useSession();
  const isBn = language === 'bn';

  const [activeScenarioId, setActiveScenarioId] = useState<string>(ACADEMY_SCENARIOS[0].id);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const activeScenario = ACADEMY_SCENARIOS.find((s) => s.id === activeScenarioId) || ACADEMY_SCENARIOS[0];
  const selectedChoice = activeScenario.choices.find((c) => c.id === selectedChoiceId);

  const handleSelectScenario = (id: string) => {
    setActiveScenarioId(id);
    setSelectedChoiceId(null);
  };

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-slate">
          {isBn ? 'উদাহরণ দিয়ে শিখুন' : 'Practice with examples'}
        </h1>
        <p className="text-sm text-brand-muted mt-1 leading-relaxed">
          {isBn ? 'একটি কাল্পনিক পরিস্থিতি বেছে নিয়ে দেখুন কী করতে পারেন।' : 'Pick a fictional situation and explore your choices.'}
        </p>
      </div>

      {/* Scenario Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
        {ACADEMY_SCENARIOS.map((s, index) => {
          const isCurrent = s.id === activeScenario.id;
          return (
            <button
              key={s.id}
              onClick={() => handleSelectScenario(s.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition border ${
                isCurrent
                  ? 'bg-brand-deep text-white border-brand-deep shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <span>{isBn ? `দৃশ্যপট ${index + 1}` : `Scenario ${index + 1}`}</span>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        {/* Scenario Header & Synopsis */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase bg-brand-tint text-brand-deep px-2 py-0.5 rounded font-bold">
              {activeScenario.category}
            </span>
            <span className="text-xs text-slate-400">
              {isBn ? 'কাল্পনিক শিক্ষামূলক উদাহরণ' : 'Fictional Learning Case'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-brand-slate">
            {activeScenario.title[language]}
          </h2>
          <p className="text-xs text-brand-muted mt-1">
            {activeScenario.synopsis[language]}
          </p>
        </div>

        {/* Narrative Context Box */}
        <div className="bg-slate-50 border-l-4 border-brand-teal p-4 rounded-r-lg text-xs sm:text-sm text-brand-slate leading-relaxed">
          <p className="font-sans italic">"{activeScenario.context[language]}"</p>
        </div>

        {/* Choices */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            {isBn ? 'আপনি কী সিদ্ধান্ত নেবেন?' : 'What would you choose in this situation?'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeScenario.choices.map((choice) => {
              const isSelected = selectedChoiceId === choice.id;
              return (
                <button
                  key={choice.id}
                  onClick={() => setSelectedChoiceId(choice.id)}
                  className={`p-4 rounded-xl text-left text-xs transition border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-teal-50 border-brand-teal ring-1 ring-brand-teal font-semibold text-brand-deep shadow-xs'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="leading-relaxed">{choice.text[language]}</span>
                  <span className="text-[10px] text-brand-teal mt-3 font-semibold flex items-center gap-1">
                    <span>{isBn ? 'ফলাফল ও বিশ্লেষণ দেখুন' : 'Explore trade-offs'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Choice Feedback / Tradeoffs */}
        {selectedChoice && (
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 animate-fade-in space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-teal flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? 'সিদ্ধান্তের বিশ্লেষণ ও প্রভাব:' : 'Outcome Analysis & Safety Trade-offs:'}</span>
            </h4>

            <div className="text-xs text-slate-700 leading-relaxed">
              <p className="mb-2">{selectedChoice.feedback[language]}</p>
              <div className="bg-white p-3 rounded-lg border border-slate-200 my-2">
                <span className="font-semibold text-slate-700 block mb-0.5">
                  {isBn ? 'লাভ বনাম ঝুঁকি (Trade-off):' : 'Trade-off Considerations:'}
                </span>
                <span className="text-slate-600">{selectedChoice.tradeoffs[language]}</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-950 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{isBn ? 'মূল শিক্ষা (Takeaway): ' : 'Key Takeaway: '}</span>
                <span>{selectedChoice.safeTakeaway[language]}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setSelectedChoiceId(null)}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isBn ? 'অন্য উত্তর দেখুন' : 'Try alternative choice'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
