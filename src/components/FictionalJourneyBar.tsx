import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useSession } from '../state/session';
import { FICTIONAL_JOURNEYS } from '../content/fictionalJourneys';

export const FictionalJourneyBar: React.FC = () => {
  const { language, loadJourney, activeJourney } = useSession();
  const isBn = language === 'bn';

  return (
    <div className="bg-brand-tint border-b border-teal-200/60 py-2.5 px-4">
      <div className="max-w-content mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-teal shrink-0" />
          <span className="text-xs font-semibold text-brand-deep">
            {isBn ? 'কাল্পনিক ডেমো জার্নি (১-ক্লিকে লোড করুন):' : 'Pre-loaded Fictional Demo Journeys:'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {FICTIONAL_JOURNEYS.map((journey) => {
            const isSelected = activeJourney?.id === journey.id;
            return (
              <button
                key={journey.id}
                onClick={() => loadJourney(journey.id)}
                className={`text-xs px-2.5 py-1 rounded-md transition border flex items-center gap-1 ${
                  isSelected
                    ? 'bg-brand-deep text-white border-brand-deep font-semibold shadow-xs'
                    : 'bg-white hover:bg-brand-teal hover:text-white border-teal-300 text-brand-slate'
                }`}
                title={journey.description[language]}
              >
                <span>{journey.badge[language]}</span>
                <ArrowRight className="w-3 h-3 opacity-60" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
