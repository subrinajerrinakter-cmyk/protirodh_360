import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GitCommit,
  Plus,
  Trash2,
  AlertTriangle,
  ArrowRight,
  Shield,
  Layers,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { useSession } from '../state/session';
import { derivePatternsFromIncidents } from '../engine/patterns';
import { Incident, IndicatorCategory } from '../types';

export const Timeline: React.FC = () => {
  const navigate = useNavigate();
  const { language, incidents, removeIncident, clearIncidents } = useSession();
  const isBn = language === 'bn';

  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<IndicatorCategory>('unwanted_surveillance');
  const [showAddForm, setShowAddForm] = useState(false);

  const patterns = derivePatternsFromIncidents(incidents);

  const handleAddManualIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const manualInc: Incident = {
      id: `inc_manual_${Date.now()}`,
      createdOrder: incidents.length + 1,
      relativeDate: isBn ? 'আজ' : 'Today',
      text: newNoteText,
      category: newNoteCategory,
      sourceType: 'manual_note',
      indicators: [],
      notes: isBn ? 'ম্যানুয়াল নোট' : 'Manual entry',
    };

    // Add to session through state or local append
    incidents.unshift(manualInc);
    setNewNoteText('');
    setShowAddForm(false);
  };

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-teal text-sm font-semibold mb-1">
            <GitCommit className="w-4 h-4" />
            <span>{isBn ? 'মডিউল ০২: কোয়ের্সন প্যাটার্ন ট্র্যাকার' : 'Module 02: Coercion Pattern Tracker'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-slate">
            {isBn ? 'ঘটনার ধারাবাহিকতা ও প্যাটার্ন' : 'Incident Timeline & Patterns'}
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            {isBn
              ? 'বিচ্ছিন্ন ঘটনাগুলো এক জায়গায় করে ধারাবাহিক নিয়ন্ত্রণ বা ব্ল্যাকমেইলের প্যাটার্ন বুঝুন। কোনো নাম বা পরিচয় সংগ্রহ করা হয় না।'
              : 'Connect distinct moments to identify patterns of surveillance or pressure over time. No personal identities stored.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-brand-deep hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isBn ? 'নতুন ঘটনা যোগ করুন' : 'Add Incident'}</span>
          </button>
          {incidents.length > 0 && (
            <button
              onClick={clearIncidents}
              className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-xs px-3 py-2 rounded-lg transition flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isBn ? 'টাইমলাইন মুছুন' : 'Clear'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Manual Add Card Form */}
      {showAddForm && (
        <form onSubmit={handleAddManualIncident} className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-xs">
          <h2 className="text-xs font-bold uppercase text-slate-500 mb-2">
            {isBn ? 'নতুন ঘটনা লিপিবদ্ধ করুন:' : 'Log New Incident:'}
          </h2>
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder={
              isBn
                ? 'কী ঘটেছিল? (যেমন: ফেসবুকে পাসওয়ার্ড চেয়েছে, ক্লাসের বন্ধুদের সাথে কথা বলতে নিষেধ করেছে...)'
                : 'What occurred? (e.g., demanded location, threatened to leak screenshots...)'
            }
            rows={3}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-teal/40 mb-3"
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <label className="text-slate-600 font-medium">
                {isBn ? 'ক্যাটাগরি:' : 'Category:'}
              </label>
              <select
                value={newNoteCategory}
                onChange={(e) => setNewNoteCategory(e.target.value as IndicatorCategory)}
                className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs"
              >
                <option value="unwanted_surveillance">Unwanted Surveillance</option>
                <option value="pressure_for_access">Pressure for Access / Password</option>
                <option value="image_based_threat">Image-based Threat</option>
                <option value="sexual_coercion">Sexual Coercion</option>
                <option value="isolation">Isolation from Support</option>
                <option value="gendered_harassment">Gendered Harassment</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5"
              >
                {isBn ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="bg-brand-teal text-white text-xs font-semibold px-4 py-1.5 rounded-md"
              >
                {isBn ? 'সংরক্ষণ করুন' : 'Save to Timeline'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Main Grid: Patterns Derived (Top/Right) and Incident Cards (Left) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Incident Cards Timeline */}
        <div className="lg:col-span-7 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center justify-between mb-2">
            <span>{isBn ? 'লিপিবদ্ধ ঘটনাবলি' : 'Recorded Moments'}</span>
            <span className="text-slate-400 font-mono text-[11px]">{incidents.length} total</span>
          </h2>

          {incidents.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
              <GitCommit className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-medium">
                {isBn ? 'এখনো কোনো ঘটনা লিপিবদ্ধ নেই' : 'No incidents recorded yet'}
              </p>
              <p className="text-xs mt-1 mb-4">
                {isBn
                  ? 'অ্যাবিউজ রাডার থেকে বার্তা বিশ্লেষণ করে সরাসরি টাইমলাইনে যোগ করতে পারেন।'
                  : 'Analyze messages in Abuse Radar and click "Add to Timeline" to build history.'}
              </p>
              <button
                onClick={() => navigate('/detect')}
                className="bg-brand-teal text-white text-xs font-semibold px-4 py-2 rounded-lg inline-flex items-center gap-1.5"
              >
                <span>{isBn ? 'রাডারে যান' : 'Go to Abuse Radar'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            incidents.map((inc, index) => (
              <div
                key={inc.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition relative"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-mono text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="text-xs font-semibold text-brand-slate bg-slate-100 px-2 py-0.5 rounded">
                      {inc.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {inc.relativeDate || 'Recent'}
                    </span>
                    <button
                      onClick={() => removeIncident(inc.id)}
                      className="text-slate-300 hover:text-red-600 transition p-1"
                      title={isBn ? 'মুছে ফেলুন' : 'Remove card'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-brand-slate bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono my-2 break-words">
                  "{inc.text}"
                </p>

                {inc.notes && (
                  <p className="text-xs text-slate-600 mt-2">
                    <span className="font-semibold text-slate-500">{isBn ? 'নোট: ' : 'Note: '}</span>
                    {inc.notes}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Right: Derived Patterns & SSDE Reasoning */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-brand-teal" />
              <span>{isBn ? 'চিহ্নিত ধারাবাহিক প্যাটার্ন' : 'Derived Coercive Patterns'}</span>
            </h2>

            {patterns.length === 0 ? (
              <p className="text-xs text-slate-400 leading-relaxed py-4 text-center">
                {isBn
                  ? 'একাধিক ভিন্ন ঘটনা যুক্ত হলে ইঞ্জিন স্বয়ংক্রিয়ভাবে পুনরাবৃত্তিমূলক প্যাটার্ন বিশ্লেষণ করবে।'
                  : 'Add two or more distinct moments to evaluate recurring coercive behavior.'}
              </p>
            ) : (
              <div className="space-y-3">
                {patterns.map((p) => (
                  <div
                    key={p.id}
                    className={`p-3.5 rounded-lg border ${
                      p.isRecurring
                        ? 'bg-amber-50/60 border-amber-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <h3 className="text-xs font-bold text-brand-slate">
                        {p.title[language]}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          p.isRecurring
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {p.isRecurring
                          ? isBn ? 'ধারাবাহিক পুনরাবৃত্তি' : 'Recurring Pattern'
                          : isBn ? 'একক ঘটনা' : 'Single Instance'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mb-2">
                      {p.description[language]}
                    </p>

                    <div className="bg-white/80 p-2 rounded text-[11px] text-slate-700 border border-slate-200">
                      <span className="font-semibold text-slate-600 block mb-0.5">
                        {isBn ? 'ইঞ্জিন ব্যাখ্যা:' : 'Engine Rationale:'}
                      </span>
                      {p.explanation[language]}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-slate-200">
              <button
                onClick={() => navigate('/respond')}
                className="w-full bg-brand-teal hover:bg-teal-600 text-white font-semibold py-2.5 px-4 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>{isBn ? 'রেসপন্স ল্যাব-এ সমাধান দেখুন' : 'Proceed to Response Lab'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
