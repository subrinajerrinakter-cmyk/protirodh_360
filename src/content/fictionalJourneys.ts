// Pre-loaded realistic fictional user journeys from Blueprint Section 04
// Ready for 1-click jury demonstration!

export interface FictionalJourney {
  id: string;
  title: { en: string; bn: string };
  description: { en: string; bn: string };
  badge: { en: string; bn: string };
  sampleText: string;
  contextPreset: {
    consent: 'yes' | 'no' | 'unknown';
    refusalRespected: 'yes' | 'no' | 'unknown';
    repeated: 'yes' | 'no' | 'unknown';
    deviceAccess: 'yes' | 'no' | 'unknown';
    immediateConcern: 'yes' | 'no' | 'unknown';
    threatenedDistribution: 'yes' | 'no' | 'unknown';
    safeToReceiveContact: 'yes' | 'no' | 'unknown';
    goals: string[];
  };
  contrastPair?: {
    labelA: { en: string; bn: string };
    contextA: { consent: 'yes' | 'no' | 'unknown'; refusalRespected: 'yes' | 'no' | 'unknown'; repeated: 'yes' | 'no' | 'unknown' };
    labelB: { en: string; bn: string };
    contextB: { consent: 'yes' | 'no' | 'unknown'; refusalRespected: 'yes' | 'no' | 'unknown'; repeated: 'yes' | 'no' | 'unknown' };
    explanation: { en: string; bn: string };
  };
}

export const FICTIONAL_JOURNEYS: FictionalJourney[] = [
  {
    id: 'journey_c_benign_contrast',
    badge: { en: 'Flagship Jury Demo', bn: 'প্রধান বিচারক ডেমো' },
    title: {
      en: 'Journey C: Context Contrast (Location Request)',
      bn: 'জার্নি সি: কনটেক্সট বৈসাদৃশ্য (লোকেশন অনুরোধ)',
    },
    description: {
      en: 'The exact same phrase ("Share your location / লোকেশন পাঠাও") produces completely different findings when consent & boundary context changes.',
      bn: 'একই বার্তা ("লোকেশন পাঠাও") সম্মতি ও সীমানা পরিবর্তন করার সাথে সাথে ফলাফল কীভাবে সম্পূর্ণ পরিবর্তিত হয় তা প্রদর্শন করে।',
    },
    sampleText: 'লোকেশন পাঠাও ekhon, send live location right now.',
    contextPreset: {
      consent: 'no',
      refusalRespected: 'no',
      repeated: 'yes',
      deviceAccess: 'no',
      immediateConcern: 'no',
      threatenedDistribution: 'no',
      safeToReceiveContact: 'yes',
      goals: ['documentation', 'account_protection'],
    },
    contrastPair: {
      labelA: {
        en: 'Context A: Consensual & Boundary Respected',
        bn: 'কনটেক্সট ক: পারস্পরিক সম্মতি ও সীমানা বজায়',
      },
      contextA: {
        consent: 'yes',
        refusalRespected: 'yes',
        repeated: 'no',
      },
      labelB: {
        en: 'Context B: Refusal Disrespected + Repeated Demand',
        bn: 'কনটেক্সট খ: অসম্মতি অগ্রাহ্য + বারবার চাপ প্রয়োগ',
      },
      contextB: {
        consent: 'no',
        refusalRespected: 'no',
        repeated: 'yes',
      },
      explanation: {
        en: 'Notice: In Context A, mutual consent yields no harassment indicator. In Context B, disrespecting a refusal and repeating demands escalates it into coercive surveillance—all without altering a single word of text.',
        bn: 'লক্ষ্য করুন: কনটেক্সট ক-তে পারস্পরিক সম্মতির কারণে কোনো হয়রানি চিহ্নিত হয়নি। কিন্তু একই টেক্সট রেখে কনটেক্সট খ-তে অসম্মতি অমান্য করায় তা জবরদস্তিমূলক নজরদারিতে রূপান্তরিত হয়।',
      },
    },
  },
  {
    id: 'journey_b_image_threat',
    badge: { en: 'Urgent Threat Flow', bn: 'জরুরি হুমকি প্রবাহ' },
    title: {
      en: 'Journey B: Explicit Image-Based Threat',
      bn: 'জার্নি বি: সংবেদনশীল ছবি ফাঁসের স্পষ্ট হুমকি',
    },
    description: {
      en: 'Fictional threat to distribute private images triggers immediate specialized support and safe-device options without requiring image uploads.',
      bn: 'ছবি ছড়ানোর হুমকিতে কোনো ছবি আপলোড ছাড়াই স্বয়ংক্রিয়ভাবে জরুরি বিশেষায়িত সহায়তা ও ডিভাইস সুরক্ষার পরামর্শ দেয়।',
    },
    sampleText: 'যদি এখনই কথা না শুনো তাহলে তোর সব ছবি ভাইরাল করে দিব, fb te chobi diye dibo sobai k.',
    contextPreset: {
      consent: 'no',
      refusalRespected: 'no',
      repeated: 'yes',
      deviceAccess: 'yes',
      immediateConcern: 'yes',
      threatenedDistribution: 'yes',
      safeToReceiveContact: 'no',
      goals: ['human_support', 'safety_plan'],
    },
  },
  {
    id: 'journey_a_uncertain_coercion',
    badge: { en: 'Coercive Pattern', bn: 'ধারাবাহিক চাপ' },
    title: {
      en: 'Journey A: Repeated Password & Account Demands',
      bn: 'জার্নি এ: পাসওয়ার্ড ও অ্যাকাউন্ট দখলের ক্রমাগত চাপ',
    },
    description: {
      en: 'A fictional student receives repeated requests to share Facebook and phone passwords under emotional pressure.',
      bn: 'বিশ্বাসের নামে বারবার সামাজিক যোগাযোগ মাধ্যমের পাসওয়ার্ড ও ইনবক্স দেখার চাপের বাস্তবভিত্তিক কাল্পনিক পরিস্থিতি।',
    },
    sampleText: 'আমারে বিশ্বাস করলে ফেসবুক আইডি আর পাসওয়ার্ড দিতে সমস্যা কোথায়? password dao nahole break up.',
    contextPreset: {
      consent: 'no',
      refusalRespected: 'no',
      repeated: 'yes',
      deviceAccess: 'no',
      immediateConcern: 'no',
      threatenedDistribution: 'no',
      safeToReceiveContact: 'yes',
      goals: ['account_protection', 'documentation'],
    },
  },
  {
    id: 'journey_d_bystander',
    badge: { en: 'Bystander Support', bn: 'সহমর্মী ও বন্ধু' },
    title: {
      en: 'Journey D: Friend Discloses Harassment / Group Leak',
      bn: 'জার্নি ডি: কোনো বন্ধুর সমস্যা শেয়ার বা গ্রুপে ছবি ফাঁস',
    },
    description: {
      en: 'A friend or classmate learns of digital harassment. Provides non-judgmental guidance on listening and not forwarding screenshots.',
      bn: 'একজন বন্ধু বা সহপাঠী হয়রানির শিকার হলে কীভাবে অযাচিত উপদেশ বা স্ক্রিনশট শেয়ার না করে পাশে থাকবেন তার গাইড।',
    },
    sampleText: 'Class group e ekta screenshot niye sobaike mock kora hocche ebong harass kora hocche.',
    contextPreset: {
      consent: 'no',
      refusalRespected: 'no',
      repeated: 'no',
      deviceAccess: 'no',
      immediateConcern: 'no',
      threatenedDistribution: 'yes',
      safeToReceiveContact: 'yes',
      goals: ['human_support'],
    },
  },
];
