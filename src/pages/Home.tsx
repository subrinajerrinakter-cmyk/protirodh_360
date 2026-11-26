import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Radar,
  FileCheck2,
  BookOpen,
  PhoneCall,
  Lock,
  ArrowRight,
  EyeOff,
  Cpu,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useSession } from '../state/session';
import { FictionalJourneyBar } from '../components/FictionalJourneyBar';

export const Home: React.FC = () => {
  const { language, loadJourney } = useSession();
  const isBn = language === 'bn';

  return (
    <div className="min-h-screen">
      <FictionalJourneyBar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-deep to-[#0D3832] text-white py-16 px-4">
        <div className="max-w-content mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-teal/40 border border-teal-400/30 text-teal-200 text-xs px-3.5 py-1.5 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>
              {isBn
                ? 'শেয়ার-নেট বাংলাদেশ এআই অ্যান্ড টিজিবিভি হ্যাকাথন ২০২৬'
                : 'Share-Net Bangladesh AI & TGBV Hackathon 2026'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white leading-tight">
            {isBn ? 'আপনার ডিজিটাল সীমানা গুরুত্বপূর্ণ।' : 'Your digital boundaries matter.'}
          </h1>

          <p className="text-base sm:text-xl text-teal-100/90 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            {isBn
              ? 'ডিজিটাল জেন্ডারভিত্তিক সহিংসতা, ছবি ছড়ানোর হুমকি ও নজরদারি শনাক্ত ও প্রতিরোধে একটি সম্পূর্ণ ব্যক্তিগত ও গোপনীয় প্ল্যাটফর্ম। কোনো অ্যাকাউন্ট বা সার্ভার লগইন ছাড়া।'
              : 'A privacy-first, browser-based digital self-defence platform for young people in Bangladesh facing online coercion, surveillance, and image threats.'}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/detect"
              className="bg-brand-teal hover:bg-teal-600 text-white font-semibold px-6 py-3.5 rounded-lg shadow-md transition flex items-center gap-2 text-sm sm:text-base"
            >
              <Radar className="w-5 h-5" />
              <span>{isBn ? 'পরিস্থিতি মূল্যায়ন করুন (Radar)' : 'Understand a Situation'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/plan"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium px-5 py-3.5 rounded-lg transition flex items-center gap-2 text-sm sm:text-base backdrop-blur-xs"
            >
              <FileCheck2 className="w-5 h-5 text-teal-300" />
              <span>{isBn ? 'নিরাপত্তা পরিকল্পনা তৈরি করুন' : 'Make a Safety Plan'}</span>
            </Link>

            <Link
              to="/academy"
              className="bg-transparent hover:bg-white/5 text-teal-200 hover:text-white font-medium px-4 py-3.5 rounded-lg transition flex items-center gap-2 text-sm sm:text-base"
            >
              <BookOpen className="w-5 h-5" />
              <span>{isBn ? 'কাল্পনিক উদাহরণে শিখুন' : 'Learn with Scenarios'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Privacy & Architecture Pillars */}
      <section className="py-12 px-4 bg-white border-b border-slate-200">
        <div className="max-w-content mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-brand-teal flex items-center justify-center shrink-0 border border-teal-100">
                <EyeOff className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-brand-slate text-sm">
                  {isBn ? 'শূন্য সার্ভার ডেটা' : 'Zero Server Data'}
                </h2>
                <p className="text-xs text-brand-muted mt-1">
                  {isBn
                    ? 'আপনার লেখা টেক্সট বা উত্তর কখনোই কোনো সার্ভার বা ক্লাউডে পাঠানো বা সংরক্ষণ করা হয় না।'
                    : 'Everything runs strictly in browser memory. No backend logging, accounts, or telemetry.'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-brand-teal flex items-center justify-center shrink-0 border border-teal-100">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-brand-slate text-sm">
                  {isBn ? 'ব্যাখ্যাযোগ্য কনটেক্সট ইঞ্জিন' : 'Explainable Engine'}
                </h2>
                <p className="text-xs text-brand-muted mt-1">
                  {isBn
                    ? 'কোনো রহস্যময় ব্ল্যাক-বক্স নয়; কেন একটি ফলাফল এসেছে তার প্রতিটি যুক্তি স্পষ্ট ও স্বচ্ছ।'
                    : 'Deterministic SSDE rule pipeline explains exact evidence spans and context changes.'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-brand-teal flex items-center justify-center shrink-0 border border-teal-100">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-brand-slate text-sm">
                  {isBn ? 'সারভাইভার স্বায়ত্তশাসন' : 'Survivor Autonomy'}
                </h2>
                <p className="text-xs text-brand-muted mt-1">
                  {isBn
                    ? 'কোনো বাধ্যতামূলক আদেশ বা স্বয়ংক্রিয় পুলিশ রিপোর্ট নেই। আপনিই নিজের সিদ্ধান্তের নিয়ন্ত্রক।'
                    : 'No automatic calls, emails, or police alerts. You remain in complete control of choices.'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-brand-teal flex items-center justify-center shrink-0 border border-teal-100">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-brand-slate text-sm">
                  {isBn ? 'বাংলা ও বাংলিশ সহায়ক' : 'Bangla & Banglish'}
                </h2>
                <p className="text-xs text-brand-muted mt-1">
                  {isBn
                    ? 'প্রাকৃতিক বাংলা ও মেসেজিং বাংলিশ ভাষা বুঝে বাস্তবসম্মত বিশ্লেষণ প্রদান করে।'
                    : 'Trained rules for native Bengali script, Romanized Banglish chat, and English.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Journey Showcase Box */}
      <section className="py-12 px-4 max-w-content mx-auto">
        <div className="bg-white rounded-xl border border-teal-200/80 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-teal bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                {isBn ? 'মূল উদ্ভাবন: কনটেক্সট কন্ট্রাস্ট' : 'Core Innovation: Context Contrast'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-slate mt-2">
                {isBn
                  ? 'একই বার্তা, কিন্তু ভিন্ন পরিস্থিতি: ফলাফল কীভাবে বদলায়?'
                  : 'Same Message, Different Context: How Findings Evolve'}
              </h2>
              <p className="text-sm text-brand-muted mt-2 leading-relaxed">
                {isBn
                  ? 'উদাহরণস্বরূপ: "লোকেশন পাঠাও"। সঙ্গীর সাথে পারস্পরিক সম্মতিতে অবস্থান জানানো কোনো অপরাধ নয়। কিন্তু অসম্মতি জানানোর পরেও বারবার চাপ প্রয়োগ করা ও হুমকি দেওয়া জবরদস্তিমূলক নিয়ন্ত্রণ। আমাদের ইঞ্জিন শব্দ না বদলে পরিস্থিতি বুঝে সিদ্ধান্ত দেয়।'
                  : 'For example: "Share your location". When voluntary and mutual, it carries no harm. But when refusal is rejected and demands repeated, it acts as coercive surveillance. Our engine adapts without claiming false certainty.'}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => loadJourney('journey_c_benign_contrast')}
                className="bg-brand-deep hover:bg-slate-800 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
              >
                <span>{isBn ? 'ডেমো ট্রাই করুন (Journey C)' : 'Test Context Contrast Demo'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Resource Links */}
      <section className="py-8 px-4 max-w-content mx-auto pb-16">
        <h2 className="text-lg font-bold text-brand-slate mb-4">
          {isBn ? 'অন্যান্য জরুরি ও সহায়ক মডিউল' : 'Additional Safety Modules'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/shield"
            className="p-5 bg-white rounded-lg border border-slate-200 hover:border-brand-teal transition group shadow-xs"
          >
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-5 h-5 text-brand-teal group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-brand-slate text-sm">
                {isBn ? 'ডিজিটাল সেফটি চেকআপ' : 'Digital Safety Checkup'}
              </h3>
            </div>
            <p className="text-xs text-brand-muted">
              {isBn
                ? 'লগইন সেশন, লাইভ লোকেশন ও রিকভারি ইমেইল সুরক্ষিত করার ধাপে ধাপে চেকলিস্ট।'
                : 'Prioritized checklist to audit logged-in devices and shared account permissions.'}
            </p>
          </Link>

          <Link
            to="/support"
            className="p-5 bg-white rounded-lg border border-slate-200 hover:border-brand-teal transition group shadow-xs"
          >
            <div className="flex items-center gap-3 mb-2">
              <PhoneCall className="w-5 h-5 text-brand-teal group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-brand-slate text-sm">
                {isBn ? 'যাচাইকৃত সহায়তা ডিরেক্টরি' : 'Support Navigator'}
              </h3>
            </div>
            <p className="text-xs text-brand-muted">
              {isBn
                ? 'পুলিশ সাইবার সাপোর্ট ফর উইমেন (০১৩২০০০৮৮৮) সহ জরুরি ফোন নম্বর ও আইনি সহায়তা।'
                : 'Direct verified hotlines including Police Cyber Support for Women (PCSW) & 999.'}
            </p>
          </Link>

          <Link
            to="/privacy"
            className="p-5 bg-white rounded-lg border border-slate-200 hover:border-brand-teal transition group shadow-xs"
          >
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-5 h-5 text-brand-teal group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-brand-slate text-sm">
                {isBn ? 'প্রাইভেসি ও থ্রেট মডেল' : 'Privacy & Threat Model'}
              </h3>
            </div>
            <p className="text-xs text-brand-muted">
              {isBn
                ? 'কীভাবে আপনার ডেটা মেমোরিতে থাকে এবং কীভাবে তাৎক্ষণিক ব্রাউজার ক্যাশ মুছবেন।'
                : 'Inspect technical threat models, local storage guarantees, and safe clearing.'}
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
};
