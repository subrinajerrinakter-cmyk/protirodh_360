// Resolves contextual differences — The "Flagship Jury Moment":
// Same text ("Share your location" / "লোকেশন পাঠাও"):
// Context A: voluntary, refusal respected -> ambiguous / no coercion indicator
// Context B: repeated unwanted demand & threat after refusal -> surveillance/control indicator
// Explains exactly why the output changed without claiming certainty or making legal judgements.

import { Finding, UserContext, FindingStatus } from '../types';

export interface ContextualExplanation {
  findingId: string;
  originalStatus: FindingStatus;
  updatedStatus: FindingStatus;
  contextInfluences: {
    factor: string;
    description: { en: string; bn: string };
    effect: 'aggravating' | 'mitigating' | 'neutral';
  }[];
  explanationText: { en: string; bn: string };
  isConsensualBenign: boolean;
  requiresUrgentCare: boolean;
}

export function resolveContextForFindings(
  findings: Finding[],
  context: UserContext
): { findings: Finding[]; explanations: ContextualExplanation[] } {
  const updatedFindings: Finding[] = [];
  const explanations: ContextualExplanation[] = [];

  for (const f of findings) {
    const influences: ContextualExplanation['contextInfluences'] = [];
    let updatedStatus: FindingStatus = f.status;
    let isConsensualBenign = false;
    let requiresUrgentCare = false;

    // Check Immediate Physical Concern
    if (context.immediateConcern === 'yes') {
      requiresUrgentCare = true;
      influences.push({
        factor: 'immediateConcern',
        description: {
          en: 'Immediate safety or physical danger reported — priority elevated.',
          bn: 'জরুরি শারীরিক নিরাপত্তা বা বিপদের শঙ্কা রয়েছে — সহায়তা অগ্রাধিকার দেওয়া হয়েছে।',
        },
        effect: 'aggravating',
      });
    }

    // Context Contrast check: Refusal respected vs Refusal violated
    if (context.refusalRespected === 'yes' && context.consent === 'yes') {
      // Both consenting and refusal respected: benign interaction
      isConsensualBenign = true;
      updatedStatus = 'no_supported_indicator';
      influences.push({
        factor: 'consensualAgreement',
        description: {
          en: 'You stated this interaction was consensual and your refusal was respected.',
          bn: 'আপনি জানিয়েছেন এটি পারস্পরিক সম্মতিতে হয়েছে এবং অসম্মতি মেনে নেওয়া হয়েছিল।',
        },
        effect: 'mitigating',
      });
    } else if (context.refusalRespected === 'no') {
      // User said NO and it was ignored or punished
      if (updatedStatus !== 'explicit_indicator') {
        updatedStatus = 'explicit_indicator';
      }
      influences.push({
        factor: 'refusalDisrespected',
        description: {
          en: 'Your refusal was ignored or met with pressure — transforms neutral requests into coercive control.',
          bn: 'আপনার অসম্মতি অগ্রাহ্য করা হয়েছে বা চাপ দেওয়া হয়েছে — এটি সাধারণ অনুরোধকে জবরদস্তিমূলক আচরণে পরিণত করে।',
        },
        effect: 'aggravating',
      });
    }

    // Check Recurrence
    if (context.repeated === 'yes') {
      influences.push({
        factor: 'repeatedDemands',
        description: {
          en: 'Happening repeatedly over time rather than an isolated question.',
          bn: 'এটি একবারের ঘটনা নয়, বরং বারবার ঘটছে যা ধারাবাহিক চাপের লক্ষণ।',
        },
        effect: 'aggravating',
      });
      if (updatedStatus === 'possible_pattern') {
        updatedStatus = 'explicit_indicator';
      }
    } else if (context.repeated === 'no' && updatedStatus === 'possible_pattern') {
      influences.push({
        factor: 'singleIncident',
        description: {
          en: 'Single unrepeated incident; pattern tracking recommended before conclusion.',
          bn: 'একক ঘটনা; নিশ্চিত সিদ্ধান্তে না গিয়ে ধারাবাহিকতা পর্যবেক্ষণ শ্রেয়।',
        },
        effect: 'neutral',
      });
    }

    // Check Device Access
    if (context.deviceAccess === 'yes') {
      influences.push({
        factor: 'sharedDeviceAccess',
        description: {
          en: 'Someone else may have physical or remote access to your device. Stealth/safe navigation applied.',
          bn: 'অন্য কারো কাছে এই ডিভাইসের নিয়ন্ত্রণ থাকতে পারে। নিরাপদ ব্রাউজিং সতর্কতা প্রযোজ্য।',
        },
        effect: 'aggravating',
      });
    }

    // Image distribution threat check
    if (context.threatenedDistribution === 'yes') {
      requiresUrgentCare = true;
      updatedStatus = 'explicit_indicator';
      influences.push({
        factor: 'imageThreatActive',
        description: {
          en: 'Threat to distribute personal photos or private material confirmed.',
          bn: 'ব্যক্তিগত ছবি ছড়িয়ে দেওয়ার হুমকি নিশ্চিত করা হয়েছে।',
        },
        effect: 'aggravating',
      });
    }

    // Synthesize bilingual explanation
    let enSummary = '';
    let bnSummary = '';

    if (isConsensualBenign) {
      enSummary =
        'Even though the phrase looked similar to surveillance or pressure, your answers confirmed mutual consent and respected boundaries. No coercion pattern detected.';
      bnSummary =
        'শব্দটি নজরদারির মতো মনে হলেও আপনার উত্তর অনুযায়ী এটি পারস্পরিক সম্মতিতে এবং সীমা মেনে হয়েছে। কোনো জবরদস্তির লক্ষণ নেই।';
    } else if (context.refusalRespected === 'no') {
      enSummary =
        'Because your boundary/refusal was not respected, this request acts as a coercive control indicator rather than a normal inquiry.';
      bnSummary =
        'যেহেতু আপনার না-বোধক সিদ্ধান্তকে সম্মান করা হয়নি, তাই এই বার্তাটি সাধারণ যোগাযোগের বদলে নিয়ন্ত্রণের চেষ্টা হিসেবে চিহ্নিত হয়েছে।';
    } else {
      enSummary =
        'Contextual questions help ensure this evaluation is based on your real experience and safety, not just literal word matching.';
      bnSummary =
        'প্রাসঙ্গিক প্রশ্নাবলি নিশ্চিত করে যে মূল্যায়নটি কেবল শব্দ খোঁজা নয়, বরং আপনার বাস্তব নিরাপত্তা পরিস্থিতির ওপর ভিত্তি করে হয়েছে।';
    }

    const updatedFinding: Finding = {
      ...f,
      status: updatedStatus,
      unknowns: f.unknowns.filter((u) => u !== 'consentContext'),
    };

    updatedFindings.push(updatedFinding);
    explanations.push({
      findingId: f.id,
      originalStatus: f.status,
      updatedStatus,
      contextInfluences: influences,
      explanationText: { en: enSummary, bn: bnSummary },
      isConsensualBenign,
      requiresUrgentCare,
    });
  }

  return { findings: updatedFindings, explanations };
}
