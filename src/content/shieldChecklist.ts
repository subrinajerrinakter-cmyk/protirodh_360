export interface ShieldCheckItem {
  id: string;
  category: 'account' | 'device' | 'location' | 'recovery';
  title: { en: string; bn: string };
  question: { en: string; bn: string };
  guidance: { en: string; bn: string };
  actionLinkText?: { en: string; bn: string };
  actionUrl?: string;
  warningIfYes?: { en: string; bn: string };
}

export const SHIELD_CHECKLIST: ShieldCheckItem[] = [
  {
    id: 'shield_shared_device',
    category: 'device',
    title: {
      en: 'Shared or Monitored Device Access',
      bn: 'ডিভাইস শেয়ারিং ও অন্য কারও নিয়ন্ত্রণ',
    },
    question: {
      en: 'Does your partner, family member, or anyone else know your device lock screen PIN or have their fingerprint registered?',
      bn: 'আপনার ফোন বা কম্পিউটারের স্ক্রিন লক পিন কি অন্য কেউ জানে বা কারও আঙুলের ছাপ যুক্ত আছে?',
    },
    guidance: {
      en: 'If someone knows your screen lock, they can view notifications, 2FA SMS codes, and open apps without needing individual passwords.',
      bn: 'কেউ স্ক্রিন লক জানলে সে যেকোনো নোটিফিকেশন, ২-ফ্যাক্টর এসএমএস কোড এবং অ্যাপস সরাসরি দেখতে পারে।',
    },
    warningIfYes: {
      en: 'Consider changing your screen PIN only if doing so will not trigger physical retaliation or anger. Do not store sensitive plans locally.',
      bn: 'শারীরিক বিপদের আশঙ্কা না থাকলে পিন কোড পরিবর্তন করুন। কোনো সংবেদনশীল তথ্য ফোনে সেভ রাখবেন না।',
    },
  },
  {
    id: 'shield_logged_in_sessions',
    category: 'account',
    title: {
      en: 'Active Account Log-ins (Facebook / Google)',
      bn: 'ফেসবুক ও গুগল অ্যাকাউন্টের সক্রিয় সেশন',
    },
    question: {
      en: 'Have you ever logged into your accounts from someone else\'s phone, laptop, or cyber cafe?',
      bn: 'আপনি কি কখনো অন্য কারো ফোন, ল্যাপটপ বা সাইবার ক্যাফে থেকে নিজের অ্যাকাউন্টে লগইন করেছিলেন?',
    },
    guidance: {
      en: 'Check "Settings -> Password & Security -> Where You\'re Logged In" on Facebook, and Google Account -> Security -> Your Devices.',
      bn: 'ফেসবুক ও গুগলের "Security -> Devices" অপশনে গিয়ে দেখুন কোন কোন ডিভাইসে আপনার আইডি লগইন করা আছে।',
    },
    actionLinkText: {
      en: 'Facebook Device Security Settings',
      bn: 'ফেসবুক ডিভাইস সিকিউরিটি সেটিংস',
    },
    actionUrl: 'https://accountscenter.facebook.com/password_and_security',
  },
  {
    id: 'shield_location_sharing',
    category: 'location',
    title: {
      en: 'Continuous Location Sharing Services',
      bn: 'লাইভ লোকেশন শেয়ারিং সার্ভিস',
    },
    question: {
      en: 'Is Google Maps Location Sharing or "Find My" active with anyone continuously?',
      bn: 'গুগল ম্যাপস লাইভ লোকেশন শেয়ারিং বা কোনো ট্র্যাকিং অ্যাপ কি সক্রিয় রাখা আছে?',
    },
    guidance: {
      en: 'Open Google Maps, tap your profile picture, select "Location sharing", and ensure no ongoing sharing link is active without your explicit wish.',
      bn: 'গুগল ম্যাপস ওপেন করে প্রোফাইলে গিয়ে "Location sharing" চেক করুন এবং নিশ্চিত করুন আপনার অজান্তে শেয়ারিং চালু নেই।',
    },
  },
  {
    id: 'shield_two_factor_auth',
    category: 'account',
    title: {
      en: 'Two-Factor Authentication (2FA)',
      bn: 'টু-ফ্যাক্টর অথেনটিকেশন (2FA)',
    },
    question: {
      en: 'Do you use 2-Factor Authentication with an app (like Google Authenticator) instead of SMS?',
      bn: 'আপনি কি এসএমএস-এর পরিবর্তে কোনো অথেনটিকেটর অ্যাপ ব্যবহার করেন?',
    },
    guidance: {
      en: 'SMS 2FA can be intercepted if someone has physical access to your phone or reads lock-screen notification banners. Authenticator apps are much safer.',
      bn: 'লক স্ক্রিনে এসএমএস নোটিফিকেশন অন্য কেউ দেখে ফেলতে পারে। গুগল অথেনটিকেটর অ্যাপ ব্যবহার করা অধিক নিরাপদ।',
    },
  },
  {
    id: 'shield_recovery_contacts',
    category: 'recovery',
    title: {
      en: 'Account Recovery Email & Phone',
      bn: 'অ্যাকাউন্ট রিকভারি ইমেইল ও ফোন নম্বর',
    },
    question: {
      en: 'Are the recovery email and phone number on your accounts 100% under your own personal control?',
      bn: 'আপনার অ্যাকাউন্টগুলোর রিকভারি ইমেইল ও মোবাইল নম্বর কি শুধুই আপনার নিজের নিয়ন্ত্রণে?',
    },
    guidance: {
      en: 'Ensure your recovery email does not belong to a shared family address or a partner, as password resets can be triggered without your knowledge.',
      bn: 'নিশ্চিত করুন রিকভারি ইমেইল যেন কোনো যৌথ বা অন্যের ইমেইল না হয়, অন্যথায় তারা যেকোনো সময় পাসওয়ার্ড রিসেট করতে পারবে।',
    },
  },
  {
    id: 'shield_notification_previews',
    category: 'device',
    title: {
      en: 'Hide Notification Previews on Lock Screen',
      bn: 'লক স্ক্রিনে নোটিফিকেশন প্রিভিউ লুকানো',
    },
    question: {
      en: 'Do WhatsApp or Messenger message contents appear on your phone screen when locked?',
      bn: 'ফোন লক থাকা অবস্থায় কি স্ক্রিনে মেসেজের ভেতরের লেখা ভেসে ওঠে?',
    },
    guidance: {
      en: 'Set your phone lock screen notifications to "Show sensitive content only when unlocked" or "Hide notification content".',
      bn: 'ফোনের সেটিংসে গিয়ে লক স্ক্রিন নোটিফিকেশন "Hide sensitive content" করে রাখুন যাতে পাসওয়ার্ড বা গোপন মেসেজ কেউ পড়তে না পারে।',
    },
  },
];
