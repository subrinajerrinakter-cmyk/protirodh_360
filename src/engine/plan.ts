import { SafetyPlan, SafetyOption, SafetyPlanItem } from '../types';

export function buildSafetyPlan(
  selectedOptions: SafetyOption[],
  customNotes: string = '',
  language: 'en' | 'bn' = 'bn'
): SafetyPlan {
  const plan: SafetyPlan = {
    id: `plan_${Date.now()}`,
    createdAt: new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    immediateItems: [],
    deviceItems: [],
    documentationItems: [],
    supportItems: [],
    userNotes: customNotes,
  };

  for (const opt of selectedOptions) {
    const item: SafetyPlanItem = {
      id: `item_${opt.id}`,
      actionId: opt.id,
      title: opt.title[language],
      category: opt.category,
      customNotes: opt.beforeYouAct[language],
      status: 'pending',
      cautionAlert: opt.cautionNotice ? opt.cautionNotice[language] : undefined,
    };

    if (opt.category === 'immediate') {
      plan.immediateItems.push(item);
    } else if (opt.category === 'device') {
      plan.deviceItems.push(item);
    } else if (opt.category === 'documentation') {
      plan.documentationItems.push(item);
    } else {
      plan.supportItems.push(item);
    }
  }

  return plan;
}

export function redactPlanForSafeExport(
  text: string,
  redactNames: boolean = true,
  redactPhoneNumbers: boolean = true
): string {
  let result = text;
  if (redactPhoneNumbers) {
    // Redact Bangladesh phone numbers (01xxxxxxxxx or +8801xxxxxxxxx)
    result = result.replace(/(\+?88)?01[3-9]\d{8}/g, '[REDACTED_PHONE]');
  }
  if (redactNames) {
    // Redact social media handles or common identifier patterns
    result = result.replace(/@[a-zA-Z0-9_.]+/g, '@[REDACTED_USER]');
    result = result.replace(/facebook\.com\/[a-zA-Z0-9_.]+/g, 'facebook.com/[REDACTED]');
  }
  return result;
}

export function formatPlanAsText(plan: SafetyPlan, language: 'en' | 'bn' = 'bn'): string {
  const isBn = language === 'bn';
  const lines: string[] = [];

  lines.push('====================================================');
  lines.push(isBn ? 'প্রতিরোধ ৩৬০ | ব্যক্তিগত নিরাপত্তা কর্মপরিকল্পনা' : 'PROTIRODH 360 | Personal Safety Action Plan');
  lines.push(isBn ? `তৈরির তারিখ: ${plan.createdAt}` : `Generated On: ${plan.createdAt}`);
  lines.push(isBn ? 'গোপনীয়তা বিজ্ঞপ্তি: এই তথ্যটি আপনার ব্রাউজার মেমোরিতে তৈরি। সার্ভারে কিছু সংরক্ষিত হয়নি।' : 'Privacy Notice: Generated strictly in browser memory. Nothing saved to servers.');
  lines.push('====================================================\n');

  if (plan.immediateItems.length > 0) {
    lines.push(isBn ? '【 জরুরি পদক্ষেপ 】' : '【 IMMEDIATE ACTIONS 】');
    plan.immediateItems.forEach((item, idx) => {
      lines.push(`${idx + 1}. ${item.title}`);
      if (item.cautionAlert) lines.push(`   ! সতর্কতা: ${item.cautionAlert}`);
      if (item.customNotes) lines.push(`   - নির্দেশিকা: ${item.customNotes}`);
    });
    lines.push('');
  }

  if (plan.deviceItems.length > 0) {
    lines.push(isBn ? '【 ডিভাইস ও অ্যাকাউন্ট সুরক্ষা 】' : '【 DEVICE & ACCOUNT SAFETY 】');
    plan.deviceItems.forEach((item, idx) => {
      lines.push(`${idx + 1}. ${item.title}`);
      if (item.cautionAlert) lines.push(`   ! সতর্কতা: ${item.cautionAlert}`);
      if (item.customNotes) lines.push(`   - নির্দেশিকা: ${item.customNotes}`);
    });
    lines.push('');
  }

  if (plan.documentationItems.length > 0) {
    lines.push(isBn ? '【 নিরাপদ প্রমাণ সংরক্ষণ 】' : '【 SECURE DOCUMENTATION 】');
    plan.documentationItems.forEach((item, idx) => {
      lines.push(`${idx + 1}. ${item.title}`);
      if (item.cautionAlert) lines.push(`   ! সতর্কতা: ${item.cautionAlert}`);
      if (item.customNotes) lines.push(`   - নির্দেশিকা: ${item.customNotes}`);
    });
    lines.push('');
  }

  if (plan.supportItems.length > 0) {
    lines.push(isBn ? '【 সহায়তা ও বিশেষজ্ঞ নেটওয়ার্ক 】' : '【 SUPPORT & SPECIALIST NETWORK 】');
    plan.supportItems.forEach((item, idx) => {
      lines.push(`${idx + 1}. ${item.title}`);
      if (item.customNotes) lines.push(`   - নির্দেশিকা: ${item.customNotes}`);
    });
    lines.push('');
  }

  if (plan.userNotes) {
    lines.push(isBn ? '【 ব্যক্তিগত নোট 】' : '【 PERSONAL NOTES 】');
    lines.push(plan.userNotes);
    lines.push('');
  }

  lines.push('----------------------------------------------------');
  lines.push(isBn ? 'জরুরি হেল্পলাইন: ৯৯৯ | সাইবার সাপোর্ট ফর উইমেন: ০১৩২০০০৮৮৮' : 'Emergency: 999 | Cyber Support for Women: 01320000888');
  lines.push('====================================================');

  return lines.join('\n');
}
