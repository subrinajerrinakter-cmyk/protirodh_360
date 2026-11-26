import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ExternalLink, Heart, Lock } from 'lucide-react';
import { useSession } from '../state/session';

export const Footer: React.FC = () => {
  const { language, triggerQuickExit } = useSession();
  const isBn = language === 'bn';

  return (
    <footer className="bg-brand-deep text-slate-300 border-t border-teal-900 text-xs py-10 px-4 mt-16">
      <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1: Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <Shield className="w-5 h-5 text-brand-teal" />
            <span>PROTIRODH 360</span>
          </div>
          <p className="text-teal-200/80 leading-relaxed text-[11px]">
            {isBn
              ? 'বাংলাদেশে প্রযুক্তি-সহায়তাপূর্ণ জেন্ডারভিত্তিক সহিংসতার বিরুদ্ধে সম্পূর্ণ ব্যক্তিগত ও গোপনীয় ডিজিটাল আত্মরক্ষা প্ল্যাটফর্ম।'
              : 'A privacy-first, browser-only digital self-defence platform for young people in Bangladesh.'}
          </p>
          <div className="text-[10px] text-teal-300/60 font-mono">
            Version 1.0.0 | Share-Net BD Hackathon 2026
          </div>
        </div>

        {/* Col 2: Core Modules */}
        <div className="space-y-2">
          <h2 className="text-white font-semibold uppercase tracking-wider text-[11px]">
            {isBn ? 'মূল মডিউলসমূহ' : 'Core Modules'}
          </h2>
          <ul className="space-y-1.5 text-[11px]">
            <li><Link to="/detect" className="hover:text-white transition">Abuse Radar (অ্যাবিউজ রাডার)</Link></li>
            <li><Link to="/timeline" className="hover:text-white transition">Pattern Tracker (প্যাটার্ন ট্র্যাকার)</Link></li>
            <li><Link to="/respond" className="hover:text-white transition">Response Lab (রেসপন্স ল্যাব)</Link></li>
            <li><Link to="/plan" className="hover:text-white transition">Safety Plan (নিরাপত্তা পরিকল্পনা)</Link></li>
            <li><Link to="/shield" className="hover:text-white transition">Safety Checkup (ডিভাইস চেকআপ)</Link></li>
          </ul>
        </div>

        {/* Col 3: Resources & Ethics */}
        <div className="space-y-2">
          <h2 className="text-white font-semibold uppercase tracking-wider text-[11px]">
            {isBn ? 'সহায়তা ও গোপনীয়তা' : 'Support & Privacy'}
          </h2>
          <ul className="space-y-1.5 text-[11px]">
            <li><Link to="/support" className="hover:text-white transition">Support Navigator (হেল্পলাইন)</Link></li>
            <li><Link to="/rights" className="hover:text-white transition">Rights & Laws (আইনি অধিকার)</Link></li>
            <li><Link to="/academy" className="hover:text-white transition">Defence Academy (অনুশীলন)</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition">Privacy Centre (থ্রেট মডেল)</Link></li>
            <li><Link to="/about" className="hover:text-white transition">Methodology (বেঞ্চমার্ক)</Link></li>
          </ul>
        </div>

        {/* Col 4: Verified Hotlines */}
        <div className="space-y-2">
          <h2 className="text-white font-semibold uppercase tracking-wider text-[11px]">
            {isBn ? 'জরুরি যোগাযোগ' : 'Emergency Contacts'}
          </h2>
          <div className="bg-slate-900/60 p-3 rounded-lg border border-teal-900/50 space-y-2 text-[11px]">
            <div>
              <div className="text-slate-400">Cyber Support for Women (PCSW):</div>
              <div className="font-bold text-white font-mono">01320000888</div>
            </div>
            <div>
              <div className="text-slate-400">National Emergency:</div>
              <div className="font-bold text-amber-400 font-mono">999</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-content mx-auto pt-6 border-t border-teal-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-teal-300/60">
        <div>
          {isBn
            ? 'সার্ভারহীন ব্রাউজার মেমোরি আর্কিটেকচার • কোনো ট্র্যাকার বা থার্ড-পার্টি অ্যানালিটিক্স নেই'
            : 'Serverless client-side architecture • No tracking pixels or telemetry'}
        </div>
        <button
          onClick={triggerQuickExit}
          className="text-red-400 hover:text-red-300 transition flex items-center gap-1 font-semibold"
        >
          <ExternalLink className="w-3 h-3" />
          <span>{isBn ? 'জরুরি প্রস্থান (Safe Exit)' : 'Emergency Safe Exit'}</span>
        </button>
      </div>
    </footer>
  );
};
