// Safety Option Recommendation Pipeline
// Prioritizes:
// 1. Immediate physical danger support options first
// 2. Shared-device precautions (if device is monitored, caution against saving or changing passwords now)
// 3. Action-specific prerequisites and contraindications
// 4. User preferences / goals
// Never recommends confronting, retaliating, or negotiating with an abuser.

import { UserContext, Finding, SafetyOption } from '../types';

export function generateSafetyOptions(
  findings: Finding[],
  context: UserContext,
  language: 'en' | 'bn' = 'bn'
): SafetyOption[] {
  const options: SafetyOption[] = [];
  const addedIds = new Set<string>();

  const isSharedDevice = context.deviceAccess === 'yes';
  const isImmediateDanger = context.immediateConcern === 'yes';
  const hasImageThreat =
    context.threatenedDistribution === 'yes' ||
    findings.some((f) => f.category === 'image_based_threat');
  const hasSurveillance =
    findings.some((f) => f.category === 'unwanted_surveillance') ||
    findings.some((f) => f.category === 'pressure_for_access');

  // 1. Priority #1: Immediate danger
  if (isImmediateDanger) {
    options.push({
      id: 'opt_immediate_help',
      category: 'immediate',
      isUrgent: true,
      title: {
        en: 'Reach Out to Verified Emergency Support Now',
        bn: 'অবিলম্বে জরুরি সহায়তা সেবা ও হটলাইনে যোগাযোগ করুন',
      },
      reason: {
        en: 'You reported immediate physical concern. Physical safety comes before any digital troubleshooting.',
        bn: 'আপনি জরুরি বিপদের শঙ্কা প্রকাশ করেছেন। ডিজিটাল কোনো ব্যবস্থার চেয়ে শারীরিক নিরাপত্তা সবার আগে।',
      },
      cautionNotice: {
        en: 'Do not stay in an isolated area if you feel physically unsafe.',
        bn: 'শারীরিক বিপদের আশঙ্কা থাকলে কোনো নির্জন জায়গায় অবস্থান করবেন না।',
      },
      beforeYouAct: {
        en: 'Move to a safe, populated space or contact a trusted friend or family member.',
        bn: 'নিরাপদ কোনো জনবহুল স্থানে যান বা বিশ্বস্ত বন্ধু বা অভিভাবককে সঙ্গে রাখুন।',
      },
      alternatives: {
        en: 'Call National Emergency 999 or Police Cyber Support for Women (01320000888).',
        bn: 'জাতীয় জরুরি সেবা ৯৯৯ অথবা পুলিশ সাইবার সাপোর্ট ফর উইমেন (০১৩২০০০৮৮৮) নম্বরে কল করুন।',
      },
      sourceIds: ['source_pcsw', 'source_emergency_999'],
      reviewStatus: 'verified_expert',
    });
    addedIds.add('opt_immediate_help');
  }

  // 2. Priority #2: Shared or monitored device precautions
  if (isSharedDevice) {
    options.push({
      id: 'opt_safe_device_precaution',
      category: 'device',
      isUrgent: true,
      title: {
        en: 'Safe Device & Stealth Browsing Guidance',
        bn: 'ডিভাইস নিরাপত্তা ও নিরাপদ ব্রাউজিং সতর্কতা',
      },
      reason: {
        en: 'Someone else can check this phone/computer. Changing settings or downloading files right now could alert them.',
        bn: 'অন্য কারো কাছে এই ডিভাইসের নিয়ন্ত্রণ রয়েছে। এই মুহূর্তে পাসওয়ার্ড বদল বা ফাইল ডাউনলোড তাকে সতর্ক করে দিতে পারে।',
      },
      cautionNotice: {
        en: 'Do not save this safety plan or evidence on this shared phone without encryption or a neutral disguise.',
        bn: 'কোনো প্রমাণ বা নিরাপত্তা পরিকল্পনা এই ফোনে সংরক্ষণ করবেন না যা অন্য কেউ দেখে ফেলতে পারে।',
      },
      beforeYouAct: {
        en: 'Use a trusted friend\'s phone, a cyber cafe, or a neutral device to take security actions.',
        bn: 'গুরুত্বপূর্ণ অ্যাকাউন্ট পরিবর্তন বা প্রমাণের কাজের জন্য কোনো বিশ্বস্ত বন্ধুর ডিভাইস ব্যবহার করুন।',
      },
      alternatives: {
        en: 'Use our quick "Safe Exit" button (top bar) immediately if someone approaches.',
        bn: 'কেউ কাছাকাছি এলে উপরের দ্রুত "নিরাপদ প্রস্থান" বাটনটি ব্যবহার করুন।',
      },
      sourceIds: ['source_nnedv_safety_net'],
      reviewStatus: 'verified_expert',
    });
    addedIds.add('opt_safe_device_precaution');
  }

  // 3. Image-based threat specialist support & Take It Down / StopNCII
  if (hasImageThreat) {
    options.push({
      id: 'opt_image_threat_response',
      category: 'support',
      isUrgent: true,
      title: {
        en: 'Confidential Support for Intimate Image Threats',
        bn: 'ব্যক্তিগত ছবি ছড়ানোর হুমকির ক্ষেত্রে জরুরি পদক্ষেপ',
      },
      reason: {
        en: 'Threats to circulate private media cause acute panic, but proactive hashing platforms can prevent uploads before they occur.',
        bn: 'ছবি ছড়ানোর হুমকি গভীর ভীতি সৃষ্টি করে, তবে আন্তর্জাতিক হ্যাশিং প্ল্যাটফর্ম আগেই ছবি ছড়ানো ঠেকাতে সাহায্য করে।',
      },
      cautionNotice: {
        en: 'Do not upload private photos to unverified third-party websites or anonymous online fixers.',
        bn: 'কোনো অপরিচিত ওয়েবসাইট বা তথাকথিত "সাইবার এক্সপার্ট"-এর হাতে কখনো মূল ছবি তুলে দেবেন না।',
      },
      beforeYouAct: {
        en: 'Do NOT delete the chat history immediately; preserve timestamps and sender ID secretly if safe.',
        bn: 'হুমকির চ্যাট এখনই ডিলিট করবেন না; নিরাপদ থাকলে প্রমাণ হিসেবে স্ক্রিনশট ও প্রোফাইল লিংক সংরক্ষণ করুন।',
      },
      alternatives: {
        en: 'Contact Police Cyber Support for Women (PCSW) or utilize StopNCII.org / Take It Down cryptographic hashes.',
        bn: 'পুলিশের বিশেষায়িত নারী সাইবার সহায়তা (PCSW) অথবা আন্তর্জাতিক StopNCII বা TakeItDown ব্যবহার করুন।',
      },
      sourceIds: ['source_pcsw', 'source_stopncii'],
      reviewStatus: 'verified_expert',
    });
    addedIds.add('opt_image_threat_response');
  }

  // 4. Secure Account & Revoke Sessions (when NOT on a shared device or when safe)
  if (hasSurveillance || context.goals.includes('account_protection')) {
    options.push({
      id: 'opt_secure_account_sessions',
      category: 'device',
      title: {
        en: 'Audit Logged-In Sessions & Change Passwords Safely',
        bn: 'লগ-ইন সেশন পরীক্ষা এবং নিরাপদ পাসওয়ার্ড পরিবর্তন',
      },
      reason: {
        en: 'Unwanted surveillance often relies on active web sessions or linked WhatsApp/Messenger devices.',
        bn: 'অনাকাঙ্ক্ষিত নজরদারি অনেক সময় লিঙ্কড ডিভাইস বা সক্রিয় ব্রাউজার সেশনের মাধ্যমে ঘটে থাকে।',
      },
      cautionNotice: {
        en: isSharedDevice
          ? 'CAUTION: Only perform this step when you are in a physically safe place away from the person.'
          : 'Log out of unfamiliar devices one by one to ensure you retain your primary recovery email.',
        bn: isSharedDevice
          ? 'সতর্কতা: এটি কেবল তখনই করুন যখন আপনি সংশ্লিষ্ট ব্যক্তির থেকে নিরাপদ দূরত্বে থাকবেন।'
          : 'অপরিচিত সেশনগুলো এক এক করে লগআউট করুন এবং রিকভারি ইমেইল নিজের নিয়ন্ত্রণে রাখুন।',
      },
      beforeYouAct: {
        en: 'Ensure your 2-Factor Authentication (2FA) is tied to an authenticator app, not a shared SIM.',
        bn: 'নিশ্চিত করুন টু-ফ্যাক্টর কোড যেন এমন কোনো সিমে না যায় যা অন্য কারও নিয়ন্ত্রণে রয়েছে।',
      },
      alternatives: {
        en: 'Turn off Google Maps Location Sharing and check Facebook "Where You\'re Logged In".',
        bn: 'গুগল ম্যাপস লাইভ লোকেশন শেয়ারিং বন্ধ করুন এবং ফেসবুকের "লগইন হিস্ট্রি" চেক করুন।',
      },
      sourceIds: ['source_nnedv_safety_net'],
      reviewStatus: 'verified_expert',
    });
    addedIds.add('opt_secure_account_sessions');
  }

  // 5. Evidence Preservation (Conditional, non-retaliatory)
  if (context.goals.includes('documentation') || findings.length > 0) {
    options.push({
      id: 'opt_evidence_preservation',
      category: 'documentation',
      title: {
        en: 'Safe, Objective Evidence Preservation',
        bn: 'নিরাপদ ও সঠিক পদ্ধতিতে প্রমাণ সংরক্ষণ',
      },
      reason: {
        en: 'Documenting incidents with timestamps and full profile URLs helps if you later choose legal or institutional redress.',
        bn: 'তারিখ, সময় ও প্রোফাইল লিংকসহ প্রমাণ রাখলে ভবিষ্যতে আইনগত বা প্রাতিষ্ঠানিক সহায়তা নেওয়া সহজ হয়।',
      },
      cautionNotice: {
        en: 'Never provoke or engage in prolonged debate to "gather more evidence". Your safety is first priority.',
        bn: 'প্রমাণ সংগ্রহের জন্য সংশ্লিষ্ট ব্যক্তির সাথে তর্কে জড়াবেন না বা তাকে প্ররোচিত করবেন না।',
      },
      beforeYouAct: {
        en: 'Capture complete screenshots showing date, sender profile username/URL, and uninterrupted text.',
        bn: 'এমনভাবে স্ক্রিনশট নিন যাতে প্রেরকের নাম, প্রোফাইল লিংক এবং তারিখ-সময় স্পষ্টভাবে দেখা যায়।',
      },
      alternatives: {
        en: 'Store copies in a secure, disguised cloud folder or send to a trusted confidant outside your device.',
        bn: 'প্রমাণগুলো কোনো বিশ্বস্ত বন্ধুর কাছে বা নিরাপদ এনক্রিপ্টেড ফোল্ডারে রাখুন।',
      },
      sourceIds: ['source_pcsw', 'source_cyber_tribunal_bd'],
      reviewStatus: 'verified_expert',
    });
    addedIds.add('opt_evidence_preservation');
  }

  // 6. Trusted Confidant & Mental Health Support
  options.push({
    id: 'opt_trusted_confidant',
    category: 'support',
    title: {
      en: 'Confide in a Trusted Supporter or Counselor',
      bn: 'বিশ্বস্ত শুভাকাঙ্ক্ষী বা মানসিক স্বাস্থ্য সহায়তাকারীর সাথে কথা বলুন',
    },
    reason: {
      en: 'Isolation increases fear and feelings of helplessness. Speaking with someone safe helps you regain control.',
      bn: 'একাকীত্ব ভয় ও অসহায়ত্ব বাড়িয়ে দেয়। একজন বিশ্বস্ত মানুষের পরামর্শ মনের জোর ফিরিয়ে আনে।',
    },
    cautionNotice: {
      en: 'Choose someone who will listen without blaming you or taking abrupt actions against your wishes.',
      bn: 'এমন কাউকে বেছে নিন যিনি দোষারোপ করবেন না এবং আপনার মত ছাড়া কোনো হঠকারী পদক্ষেপ নেবেন না।',
    },
    beforeYouAct: {
      en: 'Decide in advance what boundaries you want in place when sharing your situation.',
      bn: 'কথা বলার আগে ঠিক করে নিন আপনি ঠিক কতটুকু শেয়ার করতে স্বাচ্ছন্দ্য বোধ করছেন।',
    },
    alternatives: {
      en: 'Connect with free confidential listening hotlines or youth counselors.',
      bn: 'বিনা খরচে গোপনীয় পরামর্শ পেতে প্রোভাইডার ডিরেক্টরি থেকে সহায়তা নম্বর দেখুন।',
    },
    sourceIds: ['source_sharennet_bd'],
    reviewStatus: 'verified_expert',
  });

  return options;
}
