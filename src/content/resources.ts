import { SupportResource } from '../types';

export const SUPPORT_RESOURCES: SupportResource[] = [
  {
    id: 'source_pcsw',
    name: {
      en: 'Police Cyber Support for Women (PCSW)',
      bn: 'পুলিশ সাইবার সাপোর্ট ফর উইমেন (PCSW)',
    },
    serviceType: 'police_cyber',
    eligibility: {
      en: 'Women and children in Bangladesh facing cyber harassment, blackmail, fake accounts, or intimate image abuse.',
      bn: 'বাংলাদেশে সাইবার হয়রানি, ব্ল্যাকমেইল, ভুয়া অ্যাকাউন্ট বা ছবি ছড়ানোর শিকার নারী ও শিশুরা।',
    },
    contactMethods: {
      phone: '01320000888',
      email: 'cybersupport.women@police.gov.bd',
      website: 'https://www.police.gov.bd/en/police_cyber_support_for_women',
      hours: '24/7 Helpline',
    },
    sourceUrl: 'https://www.police.gov.bd/en/police_cyber_support_for_women',
    verifiedOn: '2026-11-26',
    scopeLimitations: {
      en: 'Specialized desk managed by Bangladesh Police. Requires incident details for official investigation.',
      bn: 'বাংলাদেশ পুলিশ পরিচালিত বিশেষায়িত শাখা। তদন্তের জন্য ঘটনার তথ্য ও স্ক্রিনশট প্রয়োজন হতে পারে।',
    },
    reviewStatus: 'verified_official',
    districtsAvailable: ['All Bangladesh'],
  },
  {
    id: 'source_emergency_999',
    name: {
      en: 'National Emergency Service (999)',
      bn: 'জাতীয় জরুরি সেবা (৯৯৯)',
    },
    serviceType: 'emergency',
    eligibility: {
      en: 'Anyone in Bangladesh facing immediate physical danger, violence, or requiring urgent police dispatch.',
      bn: 'বাংলাদেশে যেকোনো ব্যক্তি তাৎক্ষণিক শারীরিক বিপদ, সহিংসতা বা জরুরি পুলিশি সহায়তার জন্য।',
    },
    contactMethods: {
      phone: '999',
      hours: '24/7 Toll-Free',
    },
    sourceUrl: 'https://www.bangladesh.gov.bd',
    verifiedOn: '2026-11-26',
    scopeLimitations: {
      en: 'Emergency first-response only. Best utilized when physical safety is in imminent jeopardy.',
      bn: 'জরুরি তাৎক্ষণিক সেবা। শারীরিক উপস্থিতির কোনো হুমকি থাকলে সরাসরি যোগাযোগ করুন।',
    },
    reviewStatus: 'verified_official',
    districtsAvailable: ['All Bangladesh'],
  },
  {
    id: 'source_ask_legal',
    name: {
      en: 'Ain o Salish Kendra (ASK) Helpline',
      bn: 'আইন ও সালিশ কেন্দ্র (আসক) হেল্পলাইন',
    },
    serviceType: 'legal_aid',
    eligibility: {
      en: 'Free legal counseling and psychosocial support for human rights violations and gender-based violence.',
      bn: 'মানবাধিকার লঙ্ঘন ও জেন্ডারভিত্তিক সহিংসতার ক্ষেত্রে বিনামূল্যে আইনি ও মানসিক সহায়তা।',
    },
    contactMethods: {
      phone: '01724414151',
      website: 'https://www.askbd.org',
      hours: '9:00 AM - 5:00 PM (Working days)',
    },
    sourceUrl: 'https://www.askbd.org',
    verifiedOn: '2026-11-26',
    scopeLimitations: {
      en: 'Independent NGO legal aid. Does not control police dispatch or prosecution directly.',
      bn: 'স্বতন্ত্র এনজিও পরিচালিত আইনি পরামর্শক শাখা। আদালতের মামলা পরিচালনায় সহযোগিতা করে।',
    },
    reviewStatus: 'partner_reviewed',
    districtsAvailable: ['All Bangladesh'],
  },
  {
    id: 'source_blast_legal',
    name: {
      en: 'Bangladesh Legal Aid and Services Trust (BLAST)',
      bn: 'বাংলাদেশ লিগ্যাল এইড অ্যান্ড সার্ভিসেস ট্রাস্ট (ব্লাস্ট)',
    },
    serviceType: 'legal_aid',
    eligibility: {
      en: 'Legal information, advocacy, and direct legal representation for marginalized individuals.',
      bn: 'প্রান্তিক ও অধিকারবঞ্চিত মানুষের জন্য আইনি পরামর্শ ও আদালতে সহায়তা।',
    },
    contactMethods: {
      phone: '01715220220',
      website: 'https://www.blast.org.bd',
      hours: 'Office hours',
    },
    sourceUrl: 'https://www.blast.org.bd',
    verifiedOn: '2026-11-26',
    scopeLimitations: {
      en: 'Legal aid provider with offices in 26+ districts across Bangladesh.',
      bn: 'বাংলাদেশের ২৬টির বেশি জেলায় শাখা অফিস রয়েছে।',
    },
    reviewStatus: 'partner_reviewed',
    districtsAvailable: ['All Bangladesh'],
  },
  {
    id: 'source_kaan_pete_roi',
    name: {
      en: 'Kaan Pete Roi (Emotional Support & Suicide Prevention)',
      bn: 'কান পেতে রই (মানসিক স্বাস্থ্য ও আবেগীয় সহায়তা)',
    },
    serviceType: 'psychosocial',
    eligibility: {
      en: 'Free, completely confidential, non-judgmental telephone helpline for anyone experiencing stress or trauma.',
      bn: 'মানসিক চাপ, আতঙ্ক বা হতাশায় আক্রান্ত যেকারো জন্য বিনামূল্যে ও সম্পূর্ণ গোপনীয় টেলিফোন সেবা।',
    },
    contactMethods: {
      phone: '01779554391',
      website: 'https://shuni.org',
      hours: '3:00 PM - 9:00 PM Daily',
    },
    sourceUrl: 'https://shuni.org',
    verifiedOn: '2026-11-26',
    scopeLimitations: {
      en: 'Emotional listening only; does not provide legal representation or medical prescriptions.',
      bn: 'কেবল মানসিক শ্রবণের জন্য; কোনো আইনি প্রতিনিধিত্ব বা ওষুধ প্রদান করে না।',
    },
    reviewStatus: 'partner_reviewed',
    districtsAvailable: ['All Bangladesh'],
  },
  {
    id: 'source_stopncii',
    name: {
      en: 'StopNCII.org & Take It Down (Non-Consensual Image Removal)',
      bn: 'StopNCII.org এবং Take It Down (ছবি ফাঁসরোধ প্ল্যাটফর্ম)',
    },
    serviceType: 'hotline',
    eligibility: {
      en: 'Global cryptographically secure hashing platform to stop the spread of intimate photos before or after upload on Meta, TikTok, OnlyFans, etc.',
      bn: 'ফেসবুক, ইনস্টাগ্রাম, টিকটক ইত্যাদি প্ল্যাটফর্মে ব্যক্তিগত ছবি ছড়িয়ে পড়া আটকাতে এনক্রিপ্টেড হ্যাশ তৈরির বিশ্বস্ত সিস্টেম।',
    },
    contactMethods: {
      website: 'https://stopncii.org',
      hours: '24/7 Self-Service Web Tool',
    },
    sourceUrl: 'https://stopncii.org',
    verifiedOn: '2026-11-26',
    scopeLimitations: {
      en: 'Your actual images NEVER leave your device. The tool only creates numerical hashes (digital fingerprints) locally in your browser.',
      bn: 'আপনার আসল ছবি আপনার ডিভাইসেই থাকে, কখনোই আপলোড হয় না। এটি কেবল আপনার ডিভাইসে ডিজিটাল হ্যাশ তৈরি করে।',
    },
    reviewStatus: 'verified_official',
    districtsAvailable: ['International / Bangladesh'],
  },
];
