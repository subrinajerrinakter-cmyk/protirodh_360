import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radar,
  AlertCircle,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  GitCommit,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useSession } from '../state/session';
import { FICTIONAL_JOURNEYS } from '../content/fictionalJourneys';

export const Detect: React.FC = () => {
  const navigate = useNavigate();
  const {
    language,
    inputText,
    setInputText,
    context,
    setContextField,
    findings,
    contextExplanations,
    addIncidentFromCurrent,
    loadJourney,
    activeJourney,
  } = useSession();

  const isBn = language === 'bn';
  const [showConsentQuestions, setShowConsentQuestions] = useState(true);

  // Check if current text has matches
  const hasFindings = findings.length > 0;
  const primaryFinding = findings[0];
  const primaryExplanation = contextExplanations[0];

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-brand-teal text-sm font-semibold mb-1">
          <Radar className="w-4 h-4" />
          <span>{isBn ? 'মডিউল ০১: ইন্টেলিজেন্ট অ্যাবিউজ রাডার' : 'Module 01: Intelligent Abuse Radar'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-slate">
          {isBn ? 'পরিস্থিতি ও বার্তা বিশ্লেষণ' : 'Situation & Message Analysis'}
        </h1>
        <p className="text-sm text-brand-muted mt-1">
          {isBn
            ? 'সন্দেহজনক বার্তা পেস্ট করুন অথবা কাল্পনিক উদাহরণ দিয়ে পরীক্ষা করুন। কোনো ডেটা সার্ভারে যায় না।'
            : 'Paste a concerning message or try realistic fictional examples. 100% processed locally on your device.'}
        </p>
      </div>

      {/* Quick Fictional Demo Selector */}
      <div className="bg-white rounded-lg p-3.5 border border-slate-200 mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-brand-deep flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
          {isBn ? 'দ্রুত ডেমো নির্বাচন:' : 'Quick Demo Scenarios:'}
        </span>
        {FICTIONAL_JOURNEYS.map((j) => (
          <button
            key={j.id}
            onClick={() => loadJourney(j.id)}
            className={`text-xs px-2.5 py-1 rounded transition border ${
              activeJourney?.id === j.id
                ? 'bg-brand-teal text-white border-brand-teal font-medium'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
          >
            {j.title[language]}
          </button>
        ))}
      </div>

      {/* Main Grid: Input on left, Analysis & Context on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Text Input & Paste Warning */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="abuse-radar-text-input" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {isBn ? 'বার্তার বিবরণ (বাংলা, বাংলিশ বা ইংরেজি):' : 'Message Content (Bangla, Banglish, English):'}
              </label>
              <span className="text-[11px] text-slate-400">
                {inputText.length} / 10,000 {isBn ? 'অক্ষর' : 'characters'}
              </span>
            </div>

            {/* Shared Device Paste Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-md p-2.5 mb-3 flex items-start gap-2 text-xs text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                {isBn
                  ? 'সতর্কতা: আপনার স্ক্রিন যদি অন্য কেউ দেখতে পায় বা ডিভাইস মনিটর করা হয়, তবে সরাসরি পেস্ট করার আগে নিরাপদ স্থান নিশ্চিত করুন।'
                  : 'Precaution: If someone can view your screen, ensure you are in a private space before pasting.'}
              </span>
            </div>

            <textarea
              id="abuse-radar-text-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isBn
                  ? 'যেমন: "ছবি ভাইরাল করে দিব", "লোকেশন পাঠাও ekhon", "পাসওয়ার্ড না দিলে ব্রেকআপ"...'
                  : 'e.g. "Share your location right now", "password dao nahole break up", "chobi viral kore dibo"...'
              }
              rows={6}
              maxLength={10000}
              className="w-full p-3 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal font-sans text-brand-slate placeholder:text-slate-400"
            />

            <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isBn ? 'ইন-মেমোরি প্রসেসিং (CPU)' : 'Client-side CPU evaluation'}</span>
              </div>
              {inputText && (
                <button
                  onClick={() => setInputText('')}
                  className="text-slate-400 hover:text-red-600 transition flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{isBn ? 'মুছে ফেলুন' : 'Clear text'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Context Contrast Demonstration Box (When Active Journey C is selected) */}
          {activeJourney?.contrastPair && (
            <div className="bg-emerald-50/60 border border-emerald-300 rounded-xl p-4">
              <h2 className="text-xs font-bold uppercase text-emerald-900 tracking-wider flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                {isBn ? 'কনটেক্সট কন্ট্রাস্ট ডেমো (বিচারকদের জন্য)' : 'Context Contrast Demo (Flagship Moment)'}
              </h2>
              <p className="text-xs text-emerald-800 mb-3">
                {activeJourney.contrastPair.explanation[language]}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setContextField('consent', 'yes');
                    setContextField('refusalRespected', 'yes');
                    setContextField('repeated', 'no');
                  }}
                  className={`p-2.5 rounded text-xs text-left border transition ${
                    context.consent === 'yes' && context.refusalRespected === 'yes'
                      ? 'bg-emerald-700 text-white border-emerald-800 font-semibold shadow-xs'
                      : 'bg-white text-emerald-950 border-emerald-200 hover:bg-emerald-100/50'
                  }`}
                >
                  <div className="font-semibold">
                    {activeJourney.contrastPair.labelA[language]}
                  </div>
                  <div className="text-[10px] mt-0.5 opacity-90">
                    {isBn ? 'সম্মতি আছে + সীমা বজায়' : 'Consent = Yes, Refusal = Respected'}
                  </div>
                </button>

                <button
                  onClick={() => {
                    setContextField('consent', 'no');
                    setContextField('refusalRespected', 'no');
                    setContextField('repeated', 'yes');
                  }}
                  className={`p-2.5 rounded text-xs text-left border transition ${
                    context.refusalRespected === 'no'
                      ? 'bg-red-700 text-white border-red-800 font-semibold shadow-xs'
                      : 'bg-white text-slate-800 border-red-200 hover:bg-red-50'
                  }`}
                >
                  <div className="font-semibold">
                    {activeJourney.contrastPair.labelB[language]}
                  </div>
                  <div className="text-[10px] mt-0.5 opacity-90">
                    {isBn ? 'অসম্মতি অগ্রাহ্য + বারবার চাপ' : 'Refusal = Disrespected, Repeated = Yes'}
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Context Questionnaire */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-brand-slate flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-brand-teal" />
                <span>{isBn ? 'প্রাসঙ্গিক মূল্যায়ন প্রশ্নাবলি' : 'Contextual Circumstances'}</span>
              </h2>
              <button
                onClick={() => setShowConsentQuestions(!showConsentQuestions)}
                className="text-xs text-brand-teal hover:underline font-medium"
              >
                {showConsentQuestions ? (isBn ? 'লুকান' : 'Collapse') : isBn ? 'দেখান' : 'Expand'}
              </button>
            </div>

            {showConsentQuestions && (
              <div className="space-y-3.5 text-xs">
                {/* 1. Was refusal respected? */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="font-medium text-slate-800 mb-2">
                    {isBn
                      ? '১. আপনি যদি অসম্মতি জানান বা "না" বলেন, অপরপক্ষ কি তা মেনে নিয়েছে?'
                      : '1. If you expressed discomfort or refused, was your boundary respected?'}
                  </p>
                  <div className="flex items-center gap-2">
                    {(['yes', 'no', 'unknown'] as const).map((val) => (
                      <button
                        key={val}
                        onClick={() => setContextField('refusalRespected', val)}
                        className={`px-3 py-1 rounded text-xs capitalize transition ${
                          context.refusalRespected === val
                            ? val === 'no'
                              ? 'bg-red-600 text-white font-semibold'
                              : 'bg-brand-teal text-white font-semibold'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {val === 'yes' ? (isBn ? 'হ্যাঁ, মেনেছে' : 'Yes') : val === 'no' ? (isBn ? 'না, চাপ দিয়েছে' : 'No') : isBn ? 'অজানা/প্রযোজ্য নয়' : 'Unsure'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Is this recurring? */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="font-medium text-slate-800 mb-2">
                    {isBn
                      ? '২. এই দাবি বা চাপ কি বারবার ঘটছে?'
                      : '2. Has this demand or pressure occurred repeatedly over time?'}
                  </p>
                  <div className="flex items-center gap-2">
                    {(['yes', 'no', 'unknown'] as const).map((val) => (
                      <button
                        key={val}
                        onClick={() => setContextField('repeated', val)}
                        className={`px-3 py-1 rounded text-xs capitalize transition ${
                          context.repeated === val
                            ? val === 'yes'
                              ? 'bg-brand-deep text-white font-semibold'
                              : 'bg-brand-teal text-white font-semibold'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {val === 'yes' ? (isBn ? 'হ্যাঁ, বারবার' : 'Yes, repeated') : val === 'no' ? (isBn ? 'একবারই ঘটেছে' : 'Single time') : isBn ? 'অনিশ্চিত' : 'Unsure'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Can someone access this device? */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="font-medium text-slate-800 mb-2">
                    {isBn
                      ? '৩. অন্য কারো কি এই ফোনের পাসওয়ার্ড বা স্ক্রিন দেখার সুযোগ আছে?'
                      : '3. Does someone else have physical access or know the PIN to this device?'}
                  </p>
                  <div className="flex items-center gap-2">
                    {(['yes', 'no', 'unknown'] as const).map((val) => (
                      <button
                        key={val}
                        onClick={() => setContextField('deviceAccess', val)}
                        className={`px-3 py-1 rounded text-xs capitalize transition ${
                          context.deviceAccess === val
                            ? val === 'yes'
                              ? 'bg-amber-600 text-white font-semibold'
                              : 'bg-brand-teal text-white font-semibold'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {val === 'yes' ? (isBn ? 'হ্যাঁ, শেয়ার্ড ডিভাইস' : 'Yes, shared') : val === 'no' ? (isBn ? 'না, কেবল আমার' : 'No, private') : isBn ? 'অনিশ্চিত' : 'Unsure'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Immediate Danger Concern */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="font-medium text-slate-800 mb-2">
                    {isBn
                      ? '৪. এই মুহূর্তে কি কোনো শারীরিক বিপদ বা তাৎক্ষণিক সহিংসতার আশঙ্কা আছে?'
                      : '4. Is there an immediate concern for your physical safety right now?'}
                  </p>
                  <div className="flex items-center gap-2">
                    {(['yes', 'no', 'unknown'] as const).map((val) => (
                      <button
                        key={val}
                        onClick={() => setContextField('immediateConcern', val)}
                        className={`px-3 py-1 rounded text-xs capitalize transition ${
                          context.immediateConcern === val
                            ? val === 'yes'
                              ? 'bg-red-600 text-white font-semibold'
                              : 'bg-brand-teal text-white font-semibold'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {val === 'yes' ? (isBn ? 'হ্যাঁ, জরুরি বিপদ' : 'Yes, immediate') : val === 'no' ? (isBn ? 'না, তাৎক্ষণিক নয়' : 'No') : isBn ? 'অনিশ্চিত' : 'Unsure'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Engine Findings & Actions */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
              <span>{isBn ? 'ইঞ্জিন পর্যবেক্ষণ ও ব্যাখ্যা' : 'Engine Findings & Rationale'}</span>
              {hasFindings && (
                <span className="text-[11px] bg-brand-tint text-brand-deep px-2 py-0.5 rounded font-mono font-medium">
                  {findings.length} {isBn ? 'ইন্ডিকেটর' : 'Indicator(s)'}
                </span>
              )}
            </h2>

            {!inputText.trim() ? (
              <div className="text-center py-12 px-4 text-slate-400">
                <Radar className="w-10 h-10 mx-auto text-slate-300 mb-2 animate-pulse" />
                <p className="text-sm font-medium">
                  {isBn ? 'বামপাশে টেক্সট লিখুন বা উপরের ডেমো ক্লিক করুন' : 'Enter text on the left or select a demo scenario'}
                </p>
                <p className="text-xs mt-1">
                  {isBn ? 'ইঞ্জিন স্বয়ংক্রিয়ভাবে প্রমাণ স্প্যান শনাক্ত করবে।' : 'The SSDE will highlight evidence spans locally.'}
                </p>
              </div>
            ) : !hasFindings ? (
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-brand-slate">
                      {isBn ? 'কোনো সুস্পষ্ট ঝুঁকি শব্দ মেলেনি' : 'No explicit coercion indicator detected'}
                    </h3>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                      {isBn
                        ? 'এই লেখায় আমাদের সংজ্ঞায়িত ব্ল্যাকমেইল বা নজরদারির শব্দ পাওয়া যায়নি। মনে রাখবেন: কোনো ইন্ডিকেটর না মেলার অর্থ এই নয় যে পরিস্থিতি সম্পূর্ণ ঝুঁকিমুক্ত।'
                        : 'No monitored coercion or extortion keywords matched in this text. Notice: An absence of indicators does not guarantee safety.'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {findings.map((f, idx) => {
                  const expl = contextExplanations[idx];
                  const isBenign = expl?.isConsensualBenign;

                  return (
                    <div
                      key={f.id}
                      className={`rounded-lg p-4 border transition ${
                        isBenign
                          ? 'bg-emerald-50/50 border-emerald-300'
                          : f.severityNotice === 'urgent'
                          ? 'bg-red-50/50 border-red-300'
                          : 'bg-amber-50/50 border-amber-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded ${
                              isBenign
                                ? 'bg-emerald-700 text-white'
                                : f.severityNotice === 'urgent'
                                ? 'bg-red-700 text-white'
                                : 'bg-amber-600 text-white'
                            }`}
                          >
                            {isBenign
                              ? isBn ? 'পারস্পরিক সম্মতিযুক্ত' : 'Consensual / Boundary Kept'
                              : f.status === 'explicit_indicator'
                              ? isBn ? 'স্পষ্ট ঝুঁকি ইন্ডিকেটর' : 'Explicit Coercion'
                              : isBn ? 'সম্ভাব্য প্যাটার্ন' : 'Possible Pattern'}
                          </span>
                          <span className="text-xs font-mono text-slate-500">{f.category}</span>
                        </div>
                      </div>

                      {/* Matched evidence snippet */}
                      {f.spans.length > 0 && (
                        <div className="bg-white/80 rounded p-2.5 my-2 border border-slate-200 text-xs">
                          <span className="font-semibold text-slate-500 mr-1.5">
                            {isBn ? 'শনাক্তকৃত স্প্যান:' : 'Matched Span:'}
                          </span>
                          <span className="font-semibold text-brand-slate bg-yellow-100 px-1 py-0.5 rounded">
                            "{f.spans[0].matchedText}"
                          </span>
                        </div>
                      )}

                      {/* Explanation */}
                      <p className="text-xs text-brand-slate leading-relaxed mt-2">
                        {f.explanation[language]}
                      </p>

                      {/* Context influence badges */}
                      {expl && expl.contextInfluences.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200/80 space-y-1">
                          <span className="text-[11px] font-semibold text-slate-600 block">
                            {isBn ? 'পরিস্থিতির প্রভাব (Context Reason):' : 'Contextual Influences:'}
                          </span>
                          {expl.contextInfluences.map((inf, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                              <span
                                className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                                  inf.effect === 'aggravating'
                                    ? 'bg-red-500'
                                    : inf.effect === 'mitigating'
                                    ? 'bg-emerald-500'
                                    : 'bg-slate-400'
                                }`}
                              />
                              <span>{inf.description[language]}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Actions: Add to Timeline and Move to Response Lab */}
            {hasFindings && (
              <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={addIncidentFromCurrent}
                  className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-brand-slate font-medium px-4 py-2 rounded-lg text-xs transition flex items-center justify-center gap-1.5"
                >
                  <GitCommit className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{isBn ? 'টাইমলাইন ট্র্যাকার-এ যোগ করুন' : 'Add to Pattern Timeline'}</span>
                </button>

                <button
                  onClick={() => navigate('/respond')}
                  className="w-full sm:w-auto bg-brand-teal hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>{isBn ? 'নিরাপদ রেসপন্স দেখুন' : 'Explore Response Options'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
