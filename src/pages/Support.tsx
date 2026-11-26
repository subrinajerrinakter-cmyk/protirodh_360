import React, { useState } from 'react';
import {
  PhoneCall,
  Search,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Clock,
  Mail,
  Phone,
  AlertTriangle,
} from 'lucide-react';
import { useSession } from '../state/session';
import { SUPPORT_RESOURCES } from '../content/resources';

export const Support: React.FC = () => {
  const { language } = useSession();
  const isBn = language === 'bn';

  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = SUPPORT_RESOURCES.filter((res) => {
    const matchesType = filterType === 'all' || res.serviceType === filterType;
    const nameMatch = res.name[language].toLowerCase().includes(searchQuery.toLowerCase());
    const eligMatch = res.eligibility[language].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && (nameMatch || eligMatch);
  });

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-brand-teal text-sm font-semibold mb-1">
          <PhoneCall className="w-4 h-4" />
          <span>{isBn ? 'মডিউল ০৭: সহায়তা ডিরেক্টরি' : 'Module 07: Support Navigator'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-slate">
          {isBn ? 'যাচাইকৃত হেল্পলাইন ও আইনি সহায়তা' : 'Verified Directory of Support Services'}
        </h1>
        <p className="text-sm text-brand-muted mt-1 leading-relaxed">
          {isBn
            ? 'বাংলাদেশে সাইবার হয়রানি ও জেন্ডারভিত্তিক সহিংসতায় সহায়তাকারী আনুষ্ঠানিক পুলিশ হেল্পলাইন, লিগ্যাল এইড ও মানসিক স্বাস্থ্য সেবা।'
            : 'Curated, dated directory of vetted support services including Police Cyber Support for Women, emergency 999, and free legal aid.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: isBn ? 'সকল সেবা' : 'All Services' },
            { id: 'police_cyber', label: isBn ? 'সাইবার পুলিশ' : 'Cyber Police' },
            { id: 'emergency', label: isBn ? 'জরুরি ৯৯৯' : 'Emergency 999' },
            { id: 'legal_aid', label: isBn ? 'বিনামূল্যে আইনি সহায়তা' : 'Legal Aid' },
            { id: 'psychosocial', label: isBn ? 'মানসিক স্বাস্থ্য' : 'Psychosocial' },
            { id: 'hotline', label: isBn ? 'ছবি ফাঁসরোধ প্ল্যাটফর্ম' : 'Image Removal' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterType === tab.id
                  ? 'bg-brand-teal text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'সেবার নাম খুঁজুন...' : 'Search provider...'}
            className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-teal/40 w-full sm:w-56"
          />
        </div>
      </div>

      {/* Resources Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                  {res.serviceType}
                </span>
                <span className="text-[11px] text-teal-700 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3 h-3 text-teal-600" />
                  <span>{isBn ? 'যাচাইকৃত (Verified)' : 'Verified On'} {res.verifiedOn}</span>
                </span>
              </div>

              <h2 className="text-base font-bold text-brand-slate mb-1">
                {res.name[language]}
              </h2>

              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                {res.eligibility[language]}
              </p>

              {/* Contact methods */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5 text-xs">
                {res.contactMethods.phone && (
                  <div className="flex items-center gap-2 text-brand-slate font-bold">
                    <Phone className="w-3.5 h-3.5 text-brand-teal" />
                    <span>{res.contactMethods.phone}</span>
                    {res.contactMethods.hours && (
                      <span className="text-[10px] text-slate-500 font-normal">
                        ({res.contactMethods.hours})
                      </span>
                    )}
                  </div>
                )}
                {res.contactMethods.email && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono text-[11px]">{res.contactMethods.email}</span>
                  </div>
                )}
                {res.contactMethods.website && (
                  <div className="flex items-center gap-2 text-brand-teal">
                    <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
                    <a
                      href={res.contactMethods.website}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline font-medium text-[11px]"
                    >
                      {res.contactMethods.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Scope Limitations note */}
            <div className="mt-3 pt-2 text-[11px] text-slate-500 border-t border-slate-100">
              <span className="font-semibold text-slate-600">{isBn ? 'সীমাবদ্ধতা: ' : 'Scope: '}</span>
              {res.scopeLimitations[language]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
