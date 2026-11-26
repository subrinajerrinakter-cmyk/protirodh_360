import { describe, it, expect } from 'vitest';
import { normalizeText, findSpansInOriginal } from '../../src/engine/normalize';
import { detectAbuseIndicators } from '../../src/engine/detect';
import { resolveContextForFindings } from '../../src/engine/context';
import { derivePatternsFromIncidents } from '../../src/engine/patterns';
import { generateSafetyOptions } from '../../src/engine/recommend';
import { UserContext, Incident } from '../../src/types';

describe('PROTIRODH 360 SSDE Core Engine Verification', () => {
  describe('Unicode Normalization & Spans', () => {
    it('normalizes NFKC and removes zero-width characters while retaining character maps', () => {
      const text = 'লোকেশন\u200B পাঠাও ekhon!';
      const res = normalizeText(text);
      expect(res.normalized).toContain('লোকেশন পাঠাও ekhon!');
      expect(res.charMap.length).toBeGreaterThan(0);
    });

    it('finds correct substring offsets in original Bengali and Banglish text', () => {
      const original = 'জরুরি: তোর ছবি ভাইরাল করে দিব আজকেই!';
      const norm = normalizeText(original);
      const matchIdx = norm.normalized.indexOf('ছবি ভাইরাল করে দিব');
      expect(matchIdx).toBeGreaterThan(0);

      const span = findSpansInOriginal(
        original,
        norm.normalized,
        norm.charMap,
        matchIdx,
        matchIdx + 'ছবি ভাইরাল করে দিব'.length
      );
      expect(span.snippet).toBe('ছবি ভাইরাল করে দিব');
    });
  });

  describe('Flagship Jury Moment: Context Contrast (Journey C)', () => {
    it('evaluates Context A (Consensual) as no coercion indicator vs Context B (Refusal Disrespected) as explicit indicator on IDENTICAL phrase', () => {
      const targetPhrase = 'লোকেশন পাঠাও ekhon, send live location right now.';
      const raw = detectAbuseIndicators(targetPhrase);
      expect(raw.hasMatches).toBe(true);

      // Context A: voluntary, refusal was respected
      const contextA: UserContext = {
        consent: 'yes',
        refusalRespected: 'yes',
        repeated: 'no',
        deviceAccess: 'no',
        immediateConcern: 'no',
        threatenedDistribution: 'no',
        safeToReceiveContact: 'yes',
        goals: [],
      };

      const resA = resolveContextForFindings(raw.findings, contextA);
      expect(resA.findings[0].status).toBe('no_supported_indicator');
      expect(resA.explanations[0].isConsensualBenign).toBe(true);

      // Context B: refusal disrespected and repeated demands
      const contextB: UserContext = {
        consent: 'no',
        refusalRespected: 'no',
        repeated: 'yes',
        deviceAccess: 'no',
        immediateConcern: 'no',
        threatenedDistribution: 'no',
        safeToReceiveContact: 'yes',
        goals: [],
      };

      const resB = resolveContextForFindings(raw.findings, contextB);
      expect(resB.findings[0].status).toBe('explicit_indicator');
      expect(resB.explanations[0].isConsensualBenign).toBe(false);
      expect(resB.explanations[0].contextInfluences.some((i) => i.factor === 'refusalDisrespected')).toBe(true);
    });
  });

  describe('Explicit Image-Based Threats (Journey B)', () => {
    it('detects explicit distribution threats in Banglish and Bengali and prioritizes urgent support', () => {
      const threatText = 'chobi viral kore dibo sobai k jodi kotha na shuno';
      const raw = detectAbuseIndicators(threatText);
      expect(raw.hasMatches).toBe(true);
      expect(raw.findings[0].category).toBe('image_based_threat');
      expect(raw.findings[0].severityNotice).toBe('urgent');

      const options = generateSafetyOptions(raw.findings, {
        consent: 'no',
        refusalRespected: 'no',
        repeated: 'yes',
        deviceAccess: 'no',
        immediateConcern: 'no',
        threatenedDistribution: 'yes',
        safeToReceiveContact: 'yes',
        goals: ['human_support'],
      });

      // Must provide specialized confidential image threat options
      const hasImageOption = options.some((o) => o.id === 'opt_image_threat_response');
      expect(hasImageOption).toBe(true);
    });
  });

  describe('Safety Preconditions & Contraindications', () => {
    it('suppresses risky actions and emphasizes stealth guidance when device is shared/monitored', () => {
      const contextSharedDevice: UserContext = {
        consent: 'no',
        refusalRespected: 'no',
        repeated: 'no',
        deviceAccess: 'yes',
        immediateConcern: 'no',
        threatenedDistribution: 'no',
        safeToReceiveContact: 'no',
        goals: ['account_protection'],
      };

      const options = generateSafetyOptions([], contextSharedDevice);
      const safeDeviceOpt = options.find((o) => o.id === 'opt_safe_device_precaution');
      expect(safeDeviceOpt).toBeDefined();
      expect(safeDeviceOpt?.isUrgent).toBe(true);
      expect(safeDeviceOpt?.cautionNotice?.en).toContain('Do not save this safety plan or evidence on this shared phone');
    });

    it('prioritizes immediate physical danger ahead of any digital troubleshooting', () => {
      const contextImmediateDanger: UserContext = {
        consent: 'no',
        refusalRespected: 'no',
        repeated: 'no',
        deviceAccess: 'no',
        immediateConcern: 'yes',
        threatenedDistribution: 'no',
        safeToReceiveContact: 'no',
        goals: [],
      };

      const options = generateSafetyOptions([], contextImmediateDanger);
      expect(options[0].id).toBe('opt_immediate_help');
      expect(options[0].isUrgent).toBe(true);
    });
  });

  describe('Timeline Pattern Tracker Deduplication', () => {
    it('does not double count duplicate messages and aggregates distinct incident IDs', () => {
      const incidents: Incident[] = [
        {
          id: 'inc_1',
          createdOrder: 1,
          text: 'password dao nahole break up',
          category: 'pressure_for_access',
          sourceType: 'pasted_message',
          indicators: ['rule_pass_access_banglish_01'],
        },
        {
          id: 'inc_2',
          createdOrder: 2,
          text: 'password dao nahole break up', // duplicate
          category: 'pressure_for_access',
          sourceType: 'pasted_message',
          indicators: ['rule_pass_access_banglish_01'],
        },
        {
          id: 'inc_3',
          createdOrder: 3,
          text: 'fb password dao ekhoni', // distinct
          category: 'pressure_for_access',
          sourceType: 'pasted_message',
          indicators: ['rule_pass_access_banglish_01'],
        },
      ];

      const patterns = derivePatternsFromIncidents(incidents);
      expect(patterns.length).toBe(1);
      // Inc 1 and Inc 3 are distinct, Inc 2 was a duplicate text
      expect(patterns[0].supportingIncidentIds.length).toBe(2);
      expect(patterns[0].isRecurring).toBe(true);
    });
  });
});
