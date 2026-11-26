// Data contracts as specified in PROTIRODH 360 Developer Blueprint

export type TriState = 'yes' | 'no' | 'unknown';

export interface UserContext {
  consent: TriState; // was the access or action consensual?
  refusalRespected: TriState; // when refused or resisted, was it respected?
  repeated: TriState; // is this recurring or repeated demands?
  deviceAccess: TriState; // can someone else access/monitor this device?
  immediateConcern: TriState; // is there an immediate physical danger concern?
  threatenedDistribution: TriState; // has the person threatened intimate-image or data distribution?
  safeToReceiveContact: TriState; // is it safe to receive calls or SMS right now?
  goals: string[]; // e.g., ['documentation', 'account_protection', 'human_support', 'safety_plan']
}

export type IndicatorCategory =
  | 'image_based_threat'
  | 'sexual_coercion'
  | 'unwanted_surveillance'
  | 'pressure_for_access'
  | 'isolation'
  | 'gendered_harassment'
  | 'benign_or_consensual';

export interface EvidenceSpan {
  start: number;
  end: number;
  matchedText: string;
  sourceTextSnippet: string;
}

export interface IndicatorRule {
  id: string;
  locale: 'bn' | 'en' | 'banglish' | 'multilingual';
  category: IndicatorCategory;
  variants: string[]; // regex patterns or normalized keyword phrases
  negationTriggers?: string[];
  quotationTriggers?: string[];
  contextRequirements?: Partial<Record<keyof UserContext, TriState>>;
  explanationKey: string;
  version: string;
  severityNotice?: 'urgent' | 'caution' | 'neutral';
}

export type FindingStatus =
  | 'explicit_indicator'
  | 'possible_pattern'
  | 'insufficient_context'
  | 'no_supported_indicator';

export interface Finding {
  id: string;
  ruleId: string;
  category: IndicatorCategory;
  incidentIds: string[];
  spans: EvidenceSpan[];
  status: FindingStatus;
  reasonKeys: string[];
  unknowns: string[];
  explanation: {
    en: string;
    bn: string;
  };
  severityNotice: 'urgent' | 'caution' | 'neutral';
}

export interface ActionRule {
  id: string;
  category: 'immediate' | 'device' | 'documentation' | 'support' | 'legal_educational';
  requiredConditions?: Partial<Record<keyof UserContext, TriState>>;
  cautionConditions?: Partial<Record<keyof UserContext, TriState>>;
  exclusionConditions?: Partial<Record<keyof UserContext, TriState>>;
  sourceIds: string[];
  reviewStatus: 'verified_expert' | 'fictional_demo' | 'pending_review';
  localeKeys: {
    title: { en: string; bn: string };
    why: { en: string; bn: string };
    beforeYouAct: { en: string; bn: string };
    alternatives: { en: string; bn: string };
  };
}

export interface SafetyOption {
  id: string;
  title: { en: string; bn: string };
  category: ActionRule['category'];
  reason: { en: string; bn: string };
  cautionNotice?: { en: string; bn: string };
  beforeYouAct: { en: string; bn: string };
  alternatives: { en: string; bn: string };
  sourceIds: string[];
  reviewStatus: ActionRule['reviewStatus'];
  isUrgent?: boolean;
}

export interface Incident {
  id: string;
  createdOrder: number;
  relativeDate?: string; // e.g. "Yesterday evening", "Last week"
  text?: string;
  category?: IndicatorCategory;
  sourceType: 'pasted_message' | 'manual_note' | 'fictional_sample';
  indicators: string[]; // ruleIds
  consentContext?: Partial<UserContext>;
  notes?: string;
}

export interface DerivedPattern {
  id: string;
  category: IndicatorCategory;
  title: { en: string; bn: string };
  description: { en: string; bn: string };
  supportingIncidentIds: string[];
  isRecurring: boolean;
  explanation: { en: string; bn: string };
}

export interface SupportResource {
  id: string;
  name: { en: string; bn: string };
  serviceType: 'hotline' | 'legal_aid' | 'police_cyber' | 'psychosocial' | 'emergency';
  eligibility: { en: string; bn: string };
  contactMethods: {
    phone?: string;
    email?: string;
    website?: string;
    hours?: string;
  };
  sourceUrl: string;
  verifiedOn: string;
  scopeLimitations: { en: string; bn: string };
  reviewStatus: 'verified_official' | 'partner_reviewed' | 'demo';
  districtsAvailable: string[]; // e.g. ['All Bangladesh', 'Dhaka']
}

export interface ScenarioChoice {
  id: string;
  text: { en: string; bn: string };
  feedback: { en: string; bn: string };
  tradeoffs: { en: string; bn: string };
  safeTakeaway: { en: string; bn: string };
  recommendedLink?: string;
}

export interface Scenario {
  id: string;
  locale: 'bilingual';
  fictional: true;
  title: { en: string; bn: string };
  category: IndicatorCategory;
  synopsis: { en: string; bn: string };
  context: { en: string; bn: string };
  choices: ScenarioChoice[];
  learningObjective: { en: string; bn: string };
}

export interface SafetyPlanItem {
  id: string;
  actionId: string;
  title: string;
  category: string;
  customNotes: string;
  status: 'pending' | 'completed' | 'deferred';
  cautionAlert?: string;
}

export interface SafetyPlan {
  id: string;
  createdAt: string;
  immediateItems: SafetyPlanItem[];
  deviceItems: SafetyPlanItem[];
  documentationItems: SafetyPlanItem[];
  supportItems: SafetyPlanItem[];
  userNotes: string;
}
