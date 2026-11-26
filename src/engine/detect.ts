import { Finding, IndicatorRule, EvidenceSpan, IndicatorCategory, FindingStatus } from '../types';
import { normalizeText, findSpansInOriginal } from './normalize';
import { INDICATOR_RULES } from '../content/rules';

export interface DetectionResult {
  hasMatches: boolean;
  findings: Finding[];
  spans: EvidenceSpan[];
  isQuotedText: boolean;
  isNegatedText: boolean;
  detectedLocales: string[];
}

// Common cues indicating someone is quoting what someone else said
const QUOTATION_PATTERNS = [
  /সে (আমাকে|বলেছে|লিখেছে)/iu,
  /he (said|texted|wrote|told me)/iu,
  /she (said|texted|wrote|told me)/iu,
  /someone said/iu,
  /আমাকে মেসেজ দিয়ে বলল/iu,
  /মেসেজে লিখেছে/iu,
  /\"[^\"]+\"/g,
  /“[^\”]+”/g,
];

// Common cues indicating negation or joking
const NEGATION_PATTERNS = [
  /বলছি না/iu,
  /বলি নাই/iu,
  /চাচ্ছি না/iu,
  /did not say/iu,
  /not demanding/iu,
  /never said/iu,
  /joke korchilam/iu,
  /মজা করছিলাম/iu,
];

const EXPLANATIONS: Record<string, { en: string; bn: string }> = {
  threat_to_distribute_media: {
    en: 'Contains explicit language indicating non-consensual distribution of private photos or videos.',
    bn: 'ব্যক্তিগত ছবি বা ভিডিও সম্মতি ছাড়া ছড়িয়ে দেওয়ার স্পষ্ট হুমকি বা ভাষার উপস্থিতি রয়েছে।',
  },
  sexual_coercion_demands: {
    en: 'Indicates conditional pressure or emotional coercion linked to sexual content or intimacy.',
    bn: 'ঘনিষ্ঠতা বা সংবেদনশীল ছবির জন্য শর্তযুক্ত চাপ বা আবেগীয় ব্ল্যাকমেইলের ইঙ্গিত পাওয়া গেছে।',
  },
  persistent_location_or_activity_tracking: {
    en: 'Requests real-time tracking, screen sharing, or ongoing surveillance of your location and contacts.',
    bn: 'আপনার অবস্থান, লাইভ লোকেশন বা কার সাথে কথা বলছেন তা নজরদারি করার অনুরোধ বা চাপ নির্দেশ করে।',
  },
  pressure_to_disclose_credentials: {
    en: 'Appears to demand account passwords, PINs, or device access under guise of trust or pressure.',
    bn: 'বিশ্বাসের নামে বা জোর করে অ্যাকাউন্টের পাসওয়ার্ড বা ডিভাইসের নিয়ন্ত্রণ চাওয়ার ইঙ্গিত।',
  },
  attempted_isolation_from_support: {
    en: 'Directs you to cut communication with friends, family, or support networks.',
    bn: 'পরিবার বা বন্ধুদের সাথে যোগাযোগ বন্ধ করতে বা বিচ্ছিন্ন করার চেষ্টা নির্দেশ করে।',
  },
  reputational_harassment_threat: {
    en: 'Expresses intent to damage your social reputation, humiliate, or publicly shame you.',
    bn: 'সামাজিকভাবে হেয় প্রতিপন্ন করার বা সম্মানহানির হুমকি প্রকাশ করে।',
  },
  unsupported_or_neutral: {
    en: 'No explicit coercion keywords detected. Note: Absence of keywords does not automatically mean a situation is safe.',
    bn: 'কোনো নির্দিষ্ট অসদাচরণের শব্দ মেলেনি। মনে রাখবেন: শব্দ না মেলার অর্থ এই নয় যে পরিস্থিতি ঝুঁকিমুক্ত।',
  },
};

export function detectAbuseIndicators(
  rawText: string,
  rules: IndicatorRule[] = INDICATOR_RULES
): DetectionResult {
  if (!rawText || rawText.trim().length === 0) {
    return {
      hasMatches: false,
      findings: [],
      spans: [],
      isQuotedText: false,
      isNegatedText: false,
      detectedLocales: [],
    };
  }

  const normalizedData = normalizeText(rawText);
  const normStr = normalizedData.normalized;

  // Check quotation and negation cues
  const isQuotedText = QUOTATION_PATTERNS.some((p) => p.test(rawText));
  const isNegatedText = NEGATION_PATTERNS.some((p) => p.test(rawText));

  const allMatchedSpans: EvidenceSpan[] = [];
  const findings: Finding[] = [];
  const matchedRuleIds = new Set<string>();

  for (const rule of rules) {
    const matchedVariants: string[] = [];

    for (const variant of rule.variants) {
      const normVariant = variant.toLowerCase().trim();
      let searchIndex = 0;

      while ((searchIndex = normStr.indexOf(normVariant, searchIndex)) !== -1) {
        const spanInfo = findSpansInOriginal(
          rawText,
          normStr,
          normalizedData.charMap,
          searchIndex,
          searchIndex + normVariant.length
        );

        const span: EvidenceSpan = {
          start: spanInfo.start,
          end: spanInfo.end,
          matchedText: spanInfo.snippet,
          sourceTextSnippet: rawText.substring(
            Math.max(0, spanInfo.start - 20),
            Math.min(rawText.length, spanInfo.end + 20)
          ),
        };

        allMatchedSpans.push(span);
        matchedVariants.push(variant);
        searchIndex += normVariant.length;
      }
    }

    if (matchedVariants.length > 0 && !matchedRuleIds.has(rule.id)) {
      matchedRuleIds.add(rule.id);

      const status: FindingStatus = rule.severityNotice === 'urgent'
        ? 'explicit_indicator'
        : 'possible_pattern';

      const exp = EXPLANATIONS[rule.explanationKey] || EXPLANATIONS.unsupported_or_neutral;

      findings.push({
        id: `finding_${rule.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        ruleId: rule.id,
        category: rule.category,
        incidentIds: [],
        spans: allMatchedSpans.filter((s) =>
          matchedVariants.some((v) => s.matchedText.toLowerCase().includes(v.toLowerCase()))
        ),
        status,
        reasonKeys: [rule.explanationKey],
        unknowns: ['consentContext', 'deviceSecurity'],
        explanation: exp,
        severityNotice: rule.severityNotice || 'neutral',
      });
    }
  }

  // Detect which locales were found
  const hasBengali = /[\u0980-\u09FF]/.test(rawText);
  const detectedLocales: string[] = [];
  if (hasBengali) detectedLocales.push('bn');
  detectedLocales.push('en/banglish');

  return {
    hasMatches: findings.length > 0,
    findings,
    spans: allMatchedSpans,
    isQuotedText,
    isNegatedText,
    detectedLocales,
  };
}
