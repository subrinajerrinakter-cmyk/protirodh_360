import { Scenario } from '../types';

export const ACADEMY_SCENARIOS: Scenario[] = [
  {
    id: 'scenario_password_pressure',
    locale: 'bilingual',
    fictional: true,
    title: {
      en: 'Scenario 1: Password Demands Under the Guise of "Trust"',
      bn: 'দৃশ্যপট ১: "বিশ্বাসের" অজুহাতে পাসওয়ার্ড দাবি',
    },
    category: 'pressure_for_access',
    synopsis: {
      en: 'Your partner insists that if you truly love and trust them, you must give them your Facebook and phone password.',
      bn: 'আপনার সঙ্গী দাবি করছেন যে আপনি যদি তাকে সত্যিই ভালোবাসেন তবে আপনার ফেসবুক ও ফোনের পাসওয়ার্ড তাকে দেওয়া উচিত।',
    },
    context: {
      en: 'Tanvir says: "Everyone shares passwords in a serious relationship. If you have nothing to hide, give me your password right now." You feel uncomfortable and want to maintain your privacy.',
      bn: 'তানভীর বলছে: "ভালোবাসার সম্পর্কে কোনো লুকোচুরি থাকে না। তোমার যদি কোনো গোপন ব্যাপার না থাকে তবে পাসওয়ার্ড দিয়ে দাও।" আপনি অস্বস্তি বোধ করছেন এবং নিজের গোপনীয়তা বজায় রাখতে চান।',
    },
    learningObjective: {
      en: 'Understand that privacy is a healthy boundary, not a lack of trust.',
      bn: 'বোঝা যে ব্যক্তিগত গোপনীয়তা একটি স্বাভাবিক সীমা, এটি বিশ্বাসের অভাব নয়।',
    },
    choices: [
      {
        id: 'c1_handover',
        text: {
          en: 'Give in and share the password to avoid an argument.',
          bn: 'ঝামেলা এড়াতে পাসওয়ার্ড দিয়ে দেওয়া।',
        },
        feedback: {
          en: 'Sharing passwords often leads to heightened monitoring, reading of private chats with friends, and loss of digital autonomy.',
          bn: 'পাসওয়ার্ড দিয়ে দিলে সাধারণত নজরদারি আরও বৃদ্ধি পায়, বন্ধুদের সাথে ব্যক্তিগত আলাপ অন্য কেউ দেখে ফেলে এবং ডিজিটাল স্বাধীনতা খর্ব হয়।',
        },
        tradeoffs: {
          en: 'Short-term relief from argument, but long-term loss of boundary control.',
          bn: 'তাৎক্ষণিক তর্ক এড়ানো গেলেও দীর্ঘমেয়াদে নিয়ন্ত্রণ ও নিরাপত্তা হারায়।',
        },
        safeTakeaway: {
          en: 'Boundaries protect both people. A healthy relationship respects individual digital privacy.',
          bn: 'সীমানা দুজনকেই সুরক্ষা দেয়। সুস্থ সম্পর্কে একে অপরের ডিজিটাল গোপনীয়তার প্রতি সম্মান থাকে।',
        },
      },
      {
        id: 'c2_firm_boundary',
        text: {
          en: 'Calmly state that trust is built on actions, not surveillance, and keep your password private.',
          bn: 'শান্তভাবে জানানো যে বিশ্বাস আচরণে তৈরি হয় নজরদারিতে নয়, এবং পাসওয়ার্ড ব্যক্তিগত রাখা।',
        },
        feedback: {
          en: 'Clear, respectful boundary setting. Notice how the other person reacts—respectful partners accept boundaries.',
          bn: 'স্পষ্ট ও সম্মানজনক সীমানা নির্ধারণ। লক্ষ্য করুন অপরপক্ষ কেমন প্রতিক্রিয়া দেখাচ্ছে—সম্মানশীল সঙ্গী সীমানা মেনে নেয়।',
        },
        tradeoffs: {
          en: 'May cause immediate frustration from the other party, but preserves your fundamental privacy.',
          bn: 'অপরপক্ষ হয়তো কিছুটা অসন্তুষ্ট হতে পারে, কিন্তু আপনার মৌলিক নিরাপত্তা অক্ষুণ্ণ থাকে।',
        },
        safeTakeaway: {
          en: 'Healthy boundaries filter out coercive patterns early.',
          bn: 'শুরুতেই সুস্থ সীমা নির্ধারণ জবরদস্তিমূলক আচরণকে প্রতিহত করে।',
        },
      },
    ],
  },
  {
    id: 'scenario_image_blackmail',
    locale: 'bilingual',
    fictional: true,
    title: {
      en: 'Scenario 2: The Intimate Image Threat',
      bn: 'দৃশ্যপট ২: ব্যক্তিগত ছবি নিয়ে ব্ল্যাকমেইল',
    },
    category: 'image_based_threat',
    synopsis: {
      en: 'An ex-partner threatens to leak intimate pictures online if you do not resume communication.',
      bn: 'সম্পর্ক ছিন্ন করার পর একজন প্রাক্তন সঙ্গী হুমকি দিচ্ছেন যে যোগাযোগ না করলে তিনি ব্যক্তিগত ছবি ছড়িয়ে দেবেন।',
    },
    context: {
      en: 'They text: "You blocked me? Unblock me and talk, or I will post our photos to your college group." You are panicking and considering deleting everything or pleading.',
      bn: 'তিনি মেসেজ পাঠিয়েছেন: "আমাকে ব্লক করলি? আনব্লক করবি না হলে তোর কলেজের গ্রুপে সব ছবি পাঠিয়ে দেব।" আপনি আতঙ্কিত এবং কী করবেন বুঝতে পারছেন না।',
    },
    learningObjective: {
      en: 'Preserve essential evidence secretly without engaging in panic negotiations.',
      bn: 'আতঙ্কগ্রস্ত হয়ে আপস না করে গোপনে প্রয়োজনীয় প্রমাণ সংরক্ষণ করা এবং বিশেষজ্ঞের সাহায্য নেওয়া।',
    },
    choices: [
      {
        id: 'c1_plead_or_pay',
        text: {
          en: 'Beg them not to post and agree to whatever they ask.',
          bn: 'অনুনয়-বিনয় করা এবং তিনি যা যা চাইছেন তাতে সম্মতি দেওয়া।',
        },
        feedback: {
          en: 'Blackmailers rarely stop after one concession; each compliance typically invites larger demands.',
          bn: 'ব্ল্যাকমেইলাররা একবার মেনে নিলে সাধারণত থামে না, বরং পরবর্তীতে আরও বড় দাবি নিয়ে আসে।',
        },
        tradeoffs: {
          en: 'Does not resolve the root threat and reinforces their perceived power over you.',
          bn: 'মূল বিপদ দূর হয় না এবং তাদের নিয়ন্ত্রণের সুযোগ আরও বেড়ে যায়।',
        },
        safeTakeaway: {
          en: 'You are not to blame. Image-based abuse is a crime committed by the perpetrator.',
          bn: 'এতে আপনার কোনো দোষ নেই। অনুমতি ছাড়া ছবি ছড়ানো আইনত অপরাধ।',
        },
      },
      {
        id: 'c2_evidence_and_support',
        text: {
          en: 'Do not delete the chat. Take discreet screenshots showing time and username, use StopNCII.org hashes, and consult Police Cyber Support for Women.',
          bn: 'চ্যাট মুছে না ফেলে তারিখ ও প্রোফাইলসহ স্ক্রিনশট রাখা, StopNCII ব্যবহার করা এবং পুলিশ সাইবার সহায়তায় যোগাযোগ করা।',
        },
        feedback: {
          en: 'Preserving unedited proof allows legal authorities to act, while StopNCII prevents images from being uploaded across Meta and TikTok.',
          bn: 'সঠিক প্রমাণ আইনানুগ পদক্ষেপে সহায়তা করে এবং StopNCII সামাজিক যোগাযোগ মাধ্যমে ছবি আপলোড আটকাতে সহায়তা করে।',
        },
        tradeoffs: {
          en: 'Requires courage to seek help, but provides effective technical and legal protection.',
          bn: 'সাহস করে সহায়তা চাইতে হলেও এটি বাস্তবসম্মত দীর্ঘমেয়াদী সুরক্ষা দেয়।',
        },
        safeTakeaway: {
          en: 'Proactive digital defense and specialized hotlines protect you without judging you.',
          bn: 'বিশেষায়িত হটলাইন কোনো বিচার না করে আপনাকে পূর্ণ সহায়তা প্রদান করে।',
        },
        recommendedLink: '/support',
      },
    ],
  },
  {
    id: 'scenario_location_tracking',
    locale: 'bilingual',
    fictional: true,
    title: {
      en: 'Scenario 3: 24/7 Location & "Proof" Demands',
      bn: 'দৃশ্যপট ৩: সার্বক্ষণিক লোকেশন ও প্রমাণের চাপ',
    },
    category: 'unwanted_surveillance',
    synopsis: {
      en: 'Whenever you step out with friends or family, someone bombards you with video call requests and demands live location.',
      bn: 'বাইরে বের হলেই ভিডিও কলে আশেপাশের মানুষ দেখানোর চাপ ও লাইভ লোকেশন শেয়ার করার অবিরাম তাগাদা।',
    },
    context: {
      en: '"Why did it take 3 minutes to answer? Send a video call right now or send a photo of everyone sitting around you!" You feel exhausted and constantly watched.',
      bn: '"রিপ্লাই দিতে ৩ মিনিট দেরি হলো কেন? এখনই ভিডিও কল তোল নয়তো আশেপাশের সবার ছবি পাঠাও!" আপনি প্রতিনিয়ত এক মানসিক চাপের মধ্যে আছেন।',
    },
    learningObjective: {
      en: 'Recognize digital leash behavior and address surveillance tactics.',
      bn: 'ডিজিটাল নজরদারির কুফল চিহ্নিত করা এবং অযৌক্তিক জবাবদিহিতা প্রতিহত করা।',
    },
    choices: [
      {
        id: 'c1_comply_constantly',
        text: {
          en: 'Constantly send photos and keep Google Maps location sharing turned on indefinitely.',
          bn: 'সবসময় ছবি পাঠানো এবং সার্বক্ষণিক লোকেশন শেয়ার চালু রাখা।',
        },
        feedback: {
          en: 'Over-compliance legitimizes unrealistic expectations and reduces your personal autonomy.',
          bn: 'সব শর্ত ক্রমাগত মেনে নিলে অযৌক্তিক দাবি ক্রমেই অভ্যাসে পরিণত হয়।',
        },
        tradeoffs: {
          en: 'Creates temporary quiet but increases long-term anxiety.',
          bn: 'সাময়িক নিস্তব্ধতা আনলেও মানসিক উদ্বেগ বাড়িয়ে দেয়।',
        },
        safeTakeaway: {
          en: 'Constant electronic monitoring is a form of coercive control.',
          bn: 'সার্বক্ষণিক নজরদারি জবরদস্তিমূলক নিয়ন্ত্রণের একটি অন্যতম রূপ।',
        },
      },
      {
        id: 'c2_set_communication_rhythm',
        text: {
          en: 'Explain that you will check in when you are free, turn off continuous live location, and discuss realistic communication expectations.',
          bn: 'সুস্পষ্টভাবে জানানো যে কাজ শেষ করে কথা বলবেন, লাইভ লোকেশন বন্ধ রাখা এবং স্বাভাবিক যোগাযোগের সময়সীমা ঠিক করা।',
        },
        feedback: {
          en: 'Restoring reasonable boundaries protects mental well-being and sets a benchmark for mutual respect.',
          bn: 'স্বাভাবিক যোগাযোগের সীমা বজায় রাখা মানসিক স্বস্তি ও সুস্থ সম্পর্কের জন্য অপরিহার্য।',
        },
        tradeoffs: {
          en: 'May reveal if the person is motivated by care or by control.',
          bn: 'অপরপক্ষের উদ্দেশ্য যত্ন নাকি নিয়ন্ত্রণ তা স্পষ্ট করে দেয়।',
        },
        safeTakeaway: {
          en: 'Care is supportive; control is restrictive.',
          bn: 'যত্ন মানুষকে স্বাধীন রাখে; নিয়ন্ত্রণ মানুষকে বন্দি করে।',
        },
      },
    ],
  },
  {
    id: 'scenario_gendered_harassment',
    locale: 'bilingual',
    fictional: true,
    title: {
      en: 'Scenario 4: Class Group Defamation & Slurs',
      bn: 'দৃশ্যপট ৪: সহপাঠী বা গ্রুপে অপপ্রচার ও কটূক্তি',
    },
    category: 'gendered_harassment',
    synopsis: {
      en: 'A fellow student posts derogatory comments about your character in a WhatsApp or Facebook study group.',
      bn: 'ফেসবুক বা হোয়াটসঅ্যাপ গ্রুপে আপনার চরিত্র নিয়ে কুৎসা রটানো ও অপমানজনক মন্তব্য করা হচ্ছে।',
    },
    context: {
      en: 'Someone takes your profile picture, captions it with insulting rumors, and others start reacting with laughing emojis. You feel mortified.',
      bn: 'কেউ আপনার ছবি দিয়ে বাজে মন্তব্য ছড়াচ্ছে এবং অন্যরা উপহাস করছে। আপনি অপমানে ভেঙে পড়ছেন।',
    },
    learningObjective: {
      en: 'Use group moderation, institutional redress, and bystander allies safely.',
      bn: 'প্রাতিষ্ঠানিক নীতিমালা, অ্যাডমিন সহায়তা এবং সহমর্মী বন্ধুদের কাজে লাগানো।',
    },
    choices: [
      {
        id: 'c1_flame_war',
        text: {
          en: 'Engage in a heated public comment argument and trade insults.',
          bn: 'গ্রুপে প্রকাশ্যে তর্কে জড়িয়ে পড়া এবং পাল্টা কটূক্তি করা।',
        },
        feedback: {
          en: 'Public flame wars often amplify the harassment, distract from the perpetrator\'s violation, and increase emotional distress.',
          bn: 'প্রকাশ্য বিতণ্ডা পরিস্থিতি আরও জটিল করে তোলে এবং মূল অপরাধীর মনোযোগের খোরাক যোগায়।',
        },
        tradeoffs: {
          en: 'Venting anger may feel justified, but creates screenshot fodder for further bullying.',
          bn: 'রাগ প্রকাশ করা স্বাভাবিক হলেও এটি কটূক্তিকারীদের নতুন সুযোগ দেয়।',
        },
        safeTakeaway: {
          en: 'Never feed online harassment with public retaliation.',
          bn: 'পাল্টা আক্রমণ হয়রানিকারীর ক্ষমতা বাড়িয়ে দেয়।',
        },
      },
      {
        id: 'c2_document_report_group',
        text: {
          en: 'Quietly screenshot the messages and profile details, report to the group admin/institution, and reach out to trusted classmates privately.',
          bn: 'নীরবে সম্পূর্ণ প্রমাণ সংরক্ষণ করে গ্রুপ অ্যাডমিন বা সংশ্লিষ্ট কর্তৃপক্ষকে জানানো এবং ঘনিষ্ঠ বন্ধুদের সাথে কথা বলা।',
        },
        feedback: {
          en: 'Takes away their stage, preserves official evidence, and creates a support network without escalating chaos.',
          bn: 'পরিস্থিতি শান্ত রেখে অফিশিয়াল ব্যবস্থা নেওয়ার সুযোগ তৈরি করে এবং বন্ধুদের পাশে পায়।',
        },
        tradeoffs: {
          en: 'Requires patience while moderation or disciplinary steps take place.',
          bn: 'প্রাতিষ্ঠানিক বিচার বা ব্যবস্থা নিতে কিছুটা সময় লাগতে পারে।',
        },
        safeTakeaway: {
          en: 'Cyberbullying violates educational guidelines and cyber laws in Bangladesh.',
          bn: 'অনলাইন বুলিং প্রাতিষ্ঠানিক নিয়ম এবং দেশের সাইবার আইনের স্পষ্ট লঙ্ঘন।',
        },
      },
    ],
  },
  {
    id: 'scenario_consent_communication',
    locale: 'bilingual',
    fictional: true,
    title: {
      en: 'Scenario 5: Consent-Respecting Communication',
      bn: 'দৃশ্যপট ৫: পারস্পরিক সম্মতি ও শ্রদ্ধাপূর্ণ যোগাযোগ',
    },
    category: 'benign_or_consensual',
    synopsis: {
      en: 'Your friend asks if they can tag you in a photo and share your contact number with an event organizer.',
      bn: 'আপনার এক বন্ধু জানতে চাইছে তারা কি একটি ছবিতে আপনাকে ট্যাগ করতে পারে এবং আপনার নম্বর একজন ইভেন্ট আয়োজককে দিতে পারে কিনা।',
    },
    context: {
      en: '"Hey, I took this group photo from the seminar. Are you comfortable if I post it and tag you, or would you prefer not to?"',
      bn: '"দোস্ত, সেমিনারের গ্রুপ ছবিটা পোস্ট করতে চাচ্ছিলাম। তোকে কি ট্যাগ করব নাকি তুই চাও না?"',
    },
    learningObjective: {
      en: 'Recognize what positive, proactive consent looks like in digital culture.',
      bn: 'ডিজিটাল জগতে সুস্থ ও পারস্পরিক শ্রদ্ধাশীল সম্মতি কেমন হয় তা চিহ্নিত করা।',
    },
    choices: [
      {
        id: 'c1_appreciate_and_answer',
        text: {
          en: 'Appreciate the question and communicate your honest preference without pressure.',
          bn: 'প্রশ্নটিকে ইতিবাচকভাবে গ্রহণ করে নিজের আসল মতামত খোলামেলা জানানো।',
        },
        feedback: {
          en: 'This is the gold standard of digital consent. Asking before sharing personal images or numbers preserves trust.',
          bn: 'এটি ডিজিটাল সম্মতির আদর্শ রূপ। কারো ব্যক্তিগত ছবি বা নম্বর প্রকাশের আগে জিজ্ঞাসা করা পারস্পরিক সম্পর্ক মজবুত করে।',
        },
        tradeoffs: {
          en: 'None—open communication strengthens mutual digital security.',
          bn: 'কোনো ঝুঁকি নেই—খোলামেলা বোঝাপড়া সম্পর্ককে সুরক্ষিত করে।',
        },
        safeTakeaway: {
          en: 'Consent is specific, informed, and can be given or withdrawn freely.',
          bn: 'সম্মতি সবসময় স্বেচ্ছাপ্রদত্ত, স্পষ্ট এবং যেকোনো সময় ফিরিয়ে নেওয়া যায়।',
        },
      },
    ],
  },
  {
    id: 'scenario_unsolicited_messages',
    locale: 'bilingual',
    fictional: true,
    title: {
      en: 'Scenario 6: Unsolicited Inappropriate Media & Harassment',
      bn: 'দৃশ্যপট ৬: অপরিচিত বা পরিচিত ব্যক্তির অযাচিত আপত্তিকর বার্তা',
    },
    category: 'sexual_coercion',
    synopsis: {
      en: 'An acquaintance or stranger sends sexually explicit photos or requests without your permission.',
      bn: 'কোনো পরিচিত বা অপরিচিত ব্যক্তি আপনার সম্মতি ছাড়া হঠাৎ অশ্লীল বার্তা বা ছবি পাঠিয়ে বসেছে।',
    },
    context: {
      en: 'You open Messenger and find an inappropriate, unsolicited photo from a junior student with a message: "Don\'t show this to anyone, just look at it."',
      bn: 'ইনবক্স খুলে দেখলেন এক সহপাঠী বা পরিচিত ব্যক্তি আপত্তিকর ছবি পাঠিয়ে লিখেছে: "কাউকে দেখাবা না, শুধু দেখো।" আপনি হতবাক ও ক্ষুব্ধ।',
    },
    learningObjective: {
      en: 'Learn how to preserve the timestamped evidence before blocking or reporting.',
      bn: 'ব্লক বা রিপোর্ট করার আগে কীভাবে প্রমাণ নিরাপদে সংরক্ষণ করতে হয় তা জানা।',
    },
    choices: [
      {
        id: 'c1_delete_and_block_instantly',
        text: {
          en: 'Immediately delete the chat thread in disgust without saving anything.',
          bn: 'বিরক্তিতে কোনো কিছু না রেখে তাৎক্ষণিক পুরো চ্যাট ডিলিট করে দেওয়া।',
        },
        feedback: {
          en: 'While understandable, deleting the thread erases the timestamp, username, and evidence needed if the behavior escalates from another account.',
          bn: 'বিরক্তি স্বাভাবিক হলেও চ্যাট ডিলিট করে দিলে ভবিষ্যতের জন্য কোনো প্রমাণ অবশিষ্ট থাকে না।',
        },
        tradeoffs: {
          en: 'Removes the offensive image from your view immediately, but discards evidence.',
          bn: 'চোখের সামনে থেকে দ্রুত সরে গেলেও প্রমাণের সুযোগ নষ্ট হয়।',
        },
        safeTakeaway: {
          en: 'Screenshot first (profile URL + timestamp), THEN report and block.',
          bn: 'আগে স্ক্রিনশট ও প্রোফাইল লিংক সংরক্ষণ করুন, এরপর রিপোর্ট ও ব্লক করুন।',
        },
      },
      {
        id: 'c2_screenshot_report_block',
        text: {
          en: 'Discreetly take a screenshot including sender ID, report to the platform, and block the user.',
          bn: 'প্রেরকের পরিচয়সহ স্ক্রিনশট নিন, প্ল্যাটফর্মে রিপোর্ট করুন এবং ব্যবহারকারীকে ব্লক করুন।',
        },
        feedback: {
          en: 'The recommended practice. You retain the evidence while stopping immediate harassment.',
          bn: 'সঠিক ও পেশাদার পদ্ধতি। প্রমাণও অক্ষুণ্ণ থাকল এবং অযাচিত বিরক্তিকর যোগাযোগও বন্ধ হলো।',
        },
        tradeoffs: {
          en: 'Takes 30 seconds to capture evidence before blocking.',
          bn: 'ব্লক করার আগে ৩০ সেকেন্ড সময় নিয়ে স্ক্রিনশট নেওয়া।',
        },
        safeTakeaway: {
          en: 'Documenting protects you against repeated harassment from alternative accounts.',
          bn: 'প্রমাণ সংরক্ষণ ভবিষ্যতে নতুন অ্যাকাউন্ট দিয়ে হয়রানি প্রতিহত করতে কাজে দেয়।',
        },
      },
    ],
  },
];
