import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { UserContext, Finding, Incident, SafetyOption, SafetyPlan } from '../types';
import { detectAbuseIndicators } from '../engine/detect';
import { resolveContextForFindings, ContextualExplanation } from '../engine/context';
import { derivePatternsFromIncidents } from '../engine/patterns';
import { generateSafetyOptions } from '../engine/recommend';
import { buildSafetyPlan } from '../engine/plan';
import { FICTIONAL_JOURNEYS, FictionalJourney } from '../content/fictionalJourneys';

const DEFAULT_CONTEXT: UserContext = {
  consent: 'unknown',
  refusalRespected: 'unknown',
  repeated: 'unknown',
  deviceAccess: 'unknown',
  immediateConcern: 'unknown',
  threatenedDistribution: 'unknown',
  safeToReceiveContact: 'unknown',
  goals: ['safety_plan', 'documentation'],
};

interface SessionState {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;

  inputText: string;
  setInputText: (text: string) => void;

  context: UserContext;
  setContextField: (field: keyof UserContext, value: any) => void;
  resetContext: () => void;

  findings: Finding[];
  contextExplanations: ContextualExplanation[];
  incidents: Incident[];
  addIncidentFromCurrent: () => void;
  removeIncident: (id: string) => void;
  clearIncidents: () => void;

  selectedOptions: SafetyOption[];
  toggleOption: (option: SafetyOption) => void;

  safetyPlan: SafetyPlan | null;
  updateSafetyPlan: (notes: string) => void;

  quickExitUrl: string;
  setQuickExitUrl: (url: string) => void;
  triggerQuickExit: () => void;

  clearAllSessionData: () => void;
  loadJourney: (journeyId: string) => void;

  activeJourney: FictionalJourney | null;
  setActiveJourney: (j: FictionalJourney | null) => void;
}

const SessionContext = createContext<SessionState | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [inputText, setInputText] = useState<string>('');
  const [context, setContext] = useState<UserContext>(DEFAULT_CONTEXT);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedOptionIds, setSelectedOptionIds] = useState<Set<string>>(new Set());
  const [planNotes, setPlanNotes] = useState<string>('');
  const [quickExitUrl, setQuickExitUrl] = useState<string>('https://weather.com');
  const [activeJourney, setActiveJourney] = useState<FictionalJourney | null>(null);

  // Set field on UserContext
  const setContextField = useCallback((field: keyof UserContext, value: any) => {
    setContext((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const resetContext = useCallback(() => {
    setContext(DEFAULT_CONTEXT);
  }, []);

  // Run SSDE Detect & Context engine
  const { findings, contextExplanations } = useMemo(() => {
    if (!inputText.trim()) {
      return { findings: [], contextExplanations: [] };
    }
    const rawDetection = detectAbuseIndicators(inputText);
    const resolved = resolveContextForFindings(rawDetection.findings, context);
    return {
      findings: resolved.findings,
      contextExplanations: resolved.explanations,
    };
  }, [inputText, context]);

  // Derived available safety options based on findings and context
  const availableOptions = useMemo(() => {
    return generateSafetyOptions(findings, context, language);
  }, [findings, context, language]);

  // Selected options array
  const selectedOptions = useMemo(() => {
    return availableOptions.filter((opt) => selectedOptionIds.has(opt.id));
  }, [availableOptions, selectedOptionIds]);

  const toggleOption = useCallback((option: SafetyOption) => {
    setSelectedOptionIds((prev) => {
      const next = new Set(prev);
      if (next.has(option.id)) {
        next.delete(option.id);
      } else {
        next.add(option.id);
      }
      return next;
    });
  }, []);

  // Add current analyzed text to incident tracker
  const addIncidentFromCurrent = useCallback(() => {
    if (!inputText.trim()) return;

    const primaryFinding = findings[0];
    const category = primaryFinding?.category || 'unwanted_surveillance';

    const newIncident: Incident = {
      id: `incident_${Date.now()}_${incidents.length + 1}`,
      createdOrder: incidents.length + 1,
      relativeDate: language === 'bn' ? 'সম্প্রতি' : 'Recently',
      text: inputText,
      category,
      sourceType: 'pasted_message',
      indicators: findings.map((f) => f.ruleId),
      consentContext: { ...context },
      notes: primaryFinding ? primaryFinding.explanation[language] : '',
    };

    setIncidents((prev) => [newIncident, ...prev]);
  }, [inputText, findings, context, incidents.length, language]);

  const removeIncident = useCallback((id: string) => {
    setIncidents((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearIncidents = useCallback(() => {
    setIncidents([]);
  }, []);

  // Safety Plan derived
  const safetyPlan = useMemo(() => {
    if (selectedOptions.length === 0 && !planNotes) return null;
    return buildSafetyPlan(selectedOptions, planNotes, language);
  }, [selectedOptions, planNotes, language]);

  const updateSafetyPlan = useCallback((notes: string) => {
    setPlanNotes(notes);
  }, []);

  // Clear all in-memory data (Blueprint requirement: zero persistence, immediate purge)
  const clearAllSessionData = useCallback(() => {
    setInputText('');
    setContext(DEFAULT_CONTEXT);
    setIncidents([]);
    setSelectedOptionIds(new Set());
    setPlanNotes('');
    setActiveJourney(null);
  }, []);

  // Quick exit trigger
  const triggerQuickExit = useCallback(() => {
    clearAllSessionData();
    window.location.replace(quickExitUrl);
  }, [clearAllSessionData, quickExitUrl]);

  // Load a preconfigured fictional journey
  const loadJourney = useCallback((journeyId: string) => {
    const journey = FICTIONAL_JOURNEYS.find((j) => j.id === journeyId);
    if (!journey) return;

    setActiveJourney(journey);
    setInputText(journey.sampleText);
    setContext({
      ...DEFAULT_CONTEXT,
      ...journey.contextPreset,
    });
  }, []);

  const value: SessionState = {
    language,
    setLanguage,
    inputText,
    setInputText,
    context,
    setContextField,
    resetContext,
    findings,
    contextExplanations,
    incidents,
    addIncidentFromCurrent,
    removeIncident,
    clearIncidents,
    selectedOptions,
    toggleOption,
    safetyPlan,
    updateSafetyPlan,
    quickExitUrl,
    setQuickExitUrl,
    triggerQuickExit,
    clearAllSessionData,
    loadJourney,
    activeJourney,
    setActiveJourney,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return ctx;
}
