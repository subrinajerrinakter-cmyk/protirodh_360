export interface LegalCard {
  id: string;
  topic: { en: string; bn: string };
  citation: string;
  summary: { en: string; bn: string };
  practicalTakeaway: { en: string; bn: string };
  evidenceTip: { en: string; bn: string };
}

export const RIGHTS_CONTENT: LegalCard[] = [
  {
    id: 'legal_image_coercion',
    topic: {
      en: 'Distribution of Intimate Images Without Consent',
      bn: 'অনুমতি ছাড়া ব্যক্তিগত ছবি বা ভিডিও প্রকাশ ও ব্ল্যাকমেইল',
    },
    citation: 'Cyber Security Act & Pornography Control Act 2012 (Sec 8)',
    summary: {
      en: 'Capturing, possessing, or distributing intimate or private sexual material without unambiguous consent is a severe cognizable crime carrying strict penal consequences in Bangladesh.',
      bn: 'কারো সম্মতি ছাড়া সংবেদনশীল বা ব্যক্তিগত ছবি ধারণ, নিজের কাছে সংরক্ষণ কিংবা ইন্টারনেটে ছড়িয়ে দেওয়ার হুমকি ও ব্ল্যাকমেইল বাংলাদেশের আইনে জামিন-অযোগ্য গুরুতর অপরাধ।',
    },
    practicalTakeaway: {
      en: 'You are a victim of a crime, not an accused party. The law penalizes the person threatening or publishing the material.',
      bn: 'আপনি এখানে ক্ষতিগ্রস্ত, কোনো অপরাধী নন। যিনি ছবি প্রকাশ করেছেন বা প্রকাশের ভয় দেখাচ্ছেন আইন তাকেই দায়ী করে।',
    },
    evidenceTip: {
      en: 'Preserve the sender profile username, exact URL, and complete screen capture showing the threat text and date. Do not modify the image file.',
      bn: 'হুমকিদাতার সম্পূর্ণ প্রোফাইল লিংক, ইউজারনেম এবং তারিখসহ স্ক্রিনশট সংরক্ষণ করুন। ফাইলে কোনো এডিট করবেন না।',
    },
  },
  {
    id: 'legal_harassment_defamation',
    topic: {
      en: 'Online Gendered Harassment & Defamation',
      bn: 'অনলাইনে চরিত্রহনন, আপত্তিকর মন্তব্য ও মানসিক হয়রানি',
    },
    citation: 'Penal Code 1860 (Sec 509) & Cyber Security Laws',
    summary: {
      en: 'Using words, gestures, or electronic communications intended to insult the modesty of a woman or cause public humiliation is punishable by imprisonment and fines.',
      bn: 'অনলাইনে নারীর সম্ভ্রমহানি, অবমাননাকর মন্তব্য বা সামাজিকভাবে হেয় প্রতিপন্ন করার যেকোনো অপচেষ্টা দণ্ডবিধি এবং সাইবার আইনে দণ্ডনীয়।',
    },
    practicalTakeaway: {
      en: 'Class groups, public comment threads, and direct messages are all covered under cyber harassment provisions.',
      bn: 'হোয়াটসঅ্যাপ বা মেসেঞ্জার গ্রুপ, সোশ্যাল মিডিয়ার কমেন্ট বা ব্যক্তিগত ইনবক্স—সব মাধ্যমেই এই আইন সমভাবে প্রযোজ্য।',
    },
    evidenceTip: {
      en: 'Capture comments in context showing the post URL and reactions. Request group administrators to log the offending user ID.',
      bn: 'পোস্টের মূল লিংক ও কমেন্ট স্পষ্ট রেখে স্ক্রিনশট নিন। গ্রুপ অ্যাডমিনের কাছ থেকে ব্যবহারকারীর বিস্তারিত সংরক্ষণ করতে বলুন।',
    },
  },
  {
    id: 'legal_unauthorized_access',
    topic: {
      en: 'Hacking, Password Theft & Unauthorized Device Access',
      bn: 'পাসওয়ার্ড চুরি, হ্যাকিং বা অনুমতি ছাড়া ডিভাইস বা আইডি ব্যবহার',
    },
    citation: 'Cyber Security Legal Framework (Unauthorized Access)',
    summary: {
      en: 'Accessing someone else\'s electronic device, email, or social media account without authorization—even if done by an intimate partner—is illegal.',
      bn: 'কাউকে বাধ্য করে বা গোপনে পাসওয়ার্ড নিয়ে তার ফেসবুক, ইমেইল বা ডিভাইস অ্যাক্সেস করা বেআইনি অনধিকার প্রবেশ। সম্পর্কে থাকলেও কারো অ্যাকাউন্টে জোরপূর্বক প্রবেশ আইনত সমর্থনযোগ্য নয়।',
    },
    practicalTakeaway: {
      en: 'No relationship gives anyone legal ownership over your private communication credentials.',
      bn: 'কোনো সম্পর্কই আপনার ব্যক্তিগত অ্যাকাউন্টের গোপনীয়তা কেড়ে নেওয়ার আইনি অধিকার কাউকে দেয় না।',
    },
    evidenceTip: {
      en: 'Download your login activity history from Facebook/Google showing the unauthorized IP address and device model.',
      bn: 'ফেসবুক ও গুগল সিকিউরিটি হিস্ট্রি থেকে অনধিকার প্রবেশের আইপি ও ডিভাইসের নাম ডাউনলোড বা স্ক্রিনশট করে রাখুন।',
    },
  },
  {
    id: 'legal_disclaimer_card',
    topic: {
      en: 'Important Educational Scope Notice',
      bn: 'আইনি সচেতনতামূলক বিজ্ঞপ্তির সীমাবদ্ধতা',
    },
    citation: 'PROTIRODH 360 Ethical Standard',
    summary: {
      en: 'This information is prepared for public legal awareness and digital self-defence. It does not constitute formal legal representation or personalized court advice.',
      bn: 'এই তথ্যগুলো সাধারণ নাগরিক অধিকার ও সচেতনতার উদ্দেশ্যে সংকলিত। এটি আদালতের মামলা পরিচালনার আনুষ্ঠানিক আইনি পরামর্শ নয়।',
    },
    practicalTakeaway: {
      en: 'For formal litigation or filing a General Diary (GD) / FIR, consult verified legal aid bodies like ASK, BLAST, or Police Cyber Support for Women.',
      bn: 'জিডি, মামলা বা প্রাতিষ্ঠানিক প্রতিকারের জন্য আসক (ASK), ব্লাস্ট (BLAST) বা পুলিশ সাইবার সাপোর্ট ফর উইমেনের সরাসরি সাহায্য নিন।',
    },
    evidenceTip: {
      en: 'Visit the Support Navigator tab to connect directly with free verified legal aid organizations.',
      bn: 'বিনা খরচে সরাসরি সহায়তা পেতে আমাদের "সহায়তা ডিরেক্টরি" ট্যাবটি ঘুরে দেখুন।',
    },
  },
];
