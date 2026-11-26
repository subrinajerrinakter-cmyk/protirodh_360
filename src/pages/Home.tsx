import { ArrowRight, BookOpen, Lock, MessageSquare, PhoneCall, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSession } from '../state/session';

export function Home() {
  const { language } = useSession();
  const bn = language === 'bn';
  const tools = [
    { to: '/plan', icon: ShieldCheck, title: bn ? 'নিরাপত্তা পরিকল্পনা' : 'Make a safety plan', description: bn ? 'নিজের জন্য নিরাপদ পদক্ষেপ বেছে নিন।' : 'Choose steps you can take safely.' },
    { to: '/shield', icon: Lock, title: bn ? 'ডিভাইস সুরক্ষিত করুন' : 'Secure your devices', description: bn ? 'লগইন ও লোকেশন শেয়ারিং পরীক্ষা করুন।' : 'Review logins and location sharing.' },
    { to: '/academy', icon: BookOpen, title: bn ? 'উদাহরণ দিয়ে শিখুন' : 'Practice with examples', description: bn ? 'কাল্পনিক পরিস্থিতিতে কী করবেন, দেখে নিন।' : 'Explore what to do in fictional situations.' },
  ];

  return (
    <div className="mx-auto max-w-content px-4 pb-12 pt-6 sm:px-6 sm:pt-10">
      <section className="relative isolate overflow-hidden rounded-3xl bg-brand-deep px-6 py-9 text-white sm:px-12 sm:py-14">
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-28 -z-10 hidden h-96 w-96 items-center justify-center rounded-full border border-white/15 bg-teal-700/20 md:flex">
          <div className="grid h-64 w-64 place-items-center rounded-full border border-white/15">
            <MessageSquare className="h-20 w-20 text-teal-200/40" strokeWidth={1} />
          </div>
        </div>
        <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {bn ? 'অনলাইনে কিছু নিয়ে চিন্তিত?' : 'Worried about something online?'}
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-teal-50 sm:text-lg">
          {bn ? 'কোনো বার্তা অস্বস্তিকর লাগলে, কী হচ্ছে বুঝতে এবং পরের পদক্ষেপ বেছে নিতে এখানে শুরু করুন।' : 'If a message makes you uneasy, start here to understand what’s happening and decide what to do next.'}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link to="/detect" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 font-semibold text-brand-deep transition hover:bg-teal-50">
            {bn ? 'বার্তা যাচাই করুন' : 'Check a message'}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link to="/support" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/40 px-5 font-semibold transition hover:bg-white/10">
            <PhoneCall aria-hidden="true" className="h-4 w-4" />
            {bn ? 'সহায়তা নিন' : 'Get support'}
          </Link>
        </div>
        <Link to="/privacy" className="mt-5 inline-flex items-center gap-2 text-sm text-teal-100 underline-offset-4 hover:underline">
          <Lock aria-hidden="true" className="h-4 w-4" />
          {bn ? 'আপনার লেখা এই ডিভাইসেই থাকে।' : 'What you type stays on this device.'}
        </Link>
      </section>

      <section aria-labelledby="other-tools" className="mt-9">
        <h2 id="other-tools" className="mb-4 text-xl font-semibold text-brand-deep">
          {bn ? 'আরও যা করতে পারেন' : 'Other ways to get started'}
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {tools.map(({ to, icon: Icon, title, description }) => (
            <Link key={to} to={to} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-teal hover:bg-brand-tint">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand-deep">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <h3 className="font-semibold text-brand-deep">{title}</h3>
                <p className="mt-1 text-sm text-brand-muted">{description}</p>
              </div>
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-teal transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
