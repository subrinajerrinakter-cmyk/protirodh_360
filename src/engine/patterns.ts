// Derives patterns across multiple distinct incidents in session timeline
// Blueprint rule: Group reviewed indicators, identify repeated distinct incidents,
// never infer perpetrator identity or predict future violence.

import { Incident, DerivedPattern, IndicatorCategory } from '../types';

const CATEGORY_METADATA: Record<
  IndicatorCategory,
  {
    title: { en: string; bn: string };
    description: { en: string; bn: string };
  }
> = {
  image_based_threat: {
    title: {
      en: 'Repeated Image-Based Threats / Coercion',
      bn: 'ব্যক্তিগত ছবি নিয়ে বারবার ব্ল্যাকমেইল বা হুমকি',
    },
    description: {
      en: 'Multiple logged records indicate recurring threats to distribute intimate media or photos.',
      bn: 'একাধিক ঘটনা পর্যালোচনায় ব্যক্তিগত ছবি বা ভিডিও ছড়িয়ে দেওয়ার ধারাবাহিক হুমকির আভাস রয়েছে।',
    },
  },
  sexual_coercion: {
    title: {
      en: 'Conditional Pressure for Intimacy',
      bn: 'ঘনিষ্ঠতা বা ছবির জন্য ক্রমাগত শর্তযুক্ত চাপ',
    },
    description: {
      en: 'Patterns of emotional guilt, threats to end the relationship, or demands for private content.',
      bn: 'সম্পর্ক ভেঙে দেওয়ার ভয় দেখিয়ে বা জোর করে অন্তরঙ্গ ছবি চাওয়ার ধারাবাহিক চেষ্টা।',
    },
  },
  unwanted_surveillance: {
    title: {
      en: 'Persistent Surveillance & Location Demand',
      bn: 'ধারাবাহিক অবস্থান নজরদারি ও জবাবদিহিতা চাওয়া',
    },
    description: {
      en: 'Repeated demands for real-time location, screenshots of chats, or continuous video proof.',
      bn: 'কোথায় আছেন, কার সাথে আছেন তা নিয়ে অতিরিক্ত জেরা, স্ক্রিনশট বা লাইভ লোকেশন চাওয়ার পুনরাবৃত্তি।',
    },
  },
  pressure_for_access: {
    title: {
      en: 'Account Control & Password Demands',
      bn: 'অ্যাকাউন্ট ও পাসওয়ার্ড দখলের চেষ্টা',
    },
    description: {
      en: 'Ongoing attempts to gain access to social media accounts, inbox messages, or phone PINs.',
      bn: 'সোশ্যাল মিডিয়া পাসওয়ার্ড বা ফোন চেক করার জন্য বারবার চাপ প্রয়োগের লক্ষণ।',
    },
  },
  isolation: {
    title: {
      en: 'Social & Support Isolation',
      bn: 'পরিবার ও বন্ধুদের কাছ থেকে বিচ্ছিন্ন করার প্রয়াস',
    },
    description: {
      en: 'Efforts to stop you from interacting with friends, classmates, or trusted family members.',
      bn: 'কাছের বন্ধু বা পরিবারের সাথে কথা না বলার জন্য চাপ সৃষ্টি বা যোগাযোগে বাধা প্রদান।',
    },
  },
  gendered_harassment: {
    title: {
      en: 'Reputational Defamation & Shaming',
      bn: 'সামাজিক মানহানি ও হেয় প্রতিপন্ন করার অপচেষ্টা',
    },
    description: {
      en: 'Threats to spread rumors, character assassination, or public humiliation.',
      bn: 'সমাজে চরিত্রহনন বা সম্মান নষ্ট করার ধারাবাহিক অপচেষ্টা।',
    },
  },
  benign_or_consensual: {
    title: {
      en: 'Consensual or Boundary-Respected Communication',
      bn: 'পারস্পরিক সম্মতিতে যোগাযোগ',
    },
    description: {
      en: 'Recorded moments show boundaries are respected when expressed.',
      bn: 'লগ অনুযায়ী সীমানা প্রকাশ করার পর তা মেনে চলা হয়েছে।',
    },
  },
};

export function derivePatternsFromIncidents(incidents: Incident[]): DerivedPattern[] {
  if (!incidents || incidents.length === 0) return [];

  // Group by category, filtering out exact duplicates
  const categoryMap = new Map<IndicatorCategory, Incident[]>();

  for (const inc of incidents) {
    if (!inc.category || inc.category === 'benign_or_consensual') continue;

    const list = categoryMap.get(inc.category) || [];
    // Ensure we do not double count incidents with same text
    const isDuplicateText = list.some(
      (existing) => existing.text && inc.text && existing.text.trim() === inc.text.trim()
    );

    if (!isDuplicateText) {
      list.push(inc);
      categoryMap.set(inc.category, list);
    }
  }

  const patterns: DerivedPattern[] = [];

  categoryMap.forEach((categoryIncidents, category) => {
    const meta = CATEGORY_METADATA[category];
    const isRecurring = categoryIncidents.length >= 2;

    const patternId = `pattern_${category}_${categoryIncidents.length}`;
    const supportingIds = categoryIncidents.map((i) => i.id);

    patterns.push({
      id: patternId,
      category,
      title: meta.title,
      description: meta.description,
      supportingIncidentIds: supportingIds,
      isRecurring,
      explanation: {
        en: isRecurring
          ? `Identified across ${categoryIncidents.length} distinct recorded moments. Recurring behavior is more significant than an isolated misunderstanding.`
          : `Recorded in 1 incident. We avoid assuming an established pattern without further distinct occurrences.`,
        bn: isRecurring
          ? `${categoryIncidents.length}টি পৃথক ঘটনায় এই লক্ষণ পাওয়া গেছে। বিচ্ছিন্ন ভুল বোঝাবুঝির চেয়ে ধারাবাহিক পুনরাবৃত্তি অধিক সতর্কতার দাবি রাখে।`
          : `১টি ঘটনায় এটি লিপিবদ্ধ হয়েছে। আরও স্পষ্ট ধারাবাহিক তথ্য ছাড়া এটিকে নিশ্চিত প্যাটার্ন ধরা হয় না।`,
      },
    });
  });

  return patterns;
}
