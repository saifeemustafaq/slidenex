import { SectionWrapper, SectionCard } from "./shared";
import { Icon } from "./Icons";

const journey = [
  { icon: "cog", label: "Define tabs for your narrative structure" },
  { icon: "cube", label: "Build slides as isolated components" },
  { icon: "lightbulb", label: "Label iterations with Greek-letter prefixes" },
  { icon: "users", label: "Reference slides precisely in feedback" },
  { icon: "rocket", label: "Ship the final selection" },
];

export default function UserJourneyCondensedSection() {
  return (
    <SectionWrapper label="User Journey">
      <SectionCard>
        <h3 className="text-xl font-semibold text-[var(--t-heading)] leading-snug mb-1">
          Five Steps to a Finished Deck
        </h3>
        <p className="text-xs text-[var(--t-muted)] leading-relaxed mb-6">
          A streamlined overview of the SlideNexus workflow.
        </p>

        <div className="flex flex-col md:flex-row gap-3">
          {journey.map((step, i) => (
            <div
              key={step.label}
              className="flex-1 flex flex-col items-center text-center bg-white/80 rounded-2xl p-4 border border-[var(--t-border)]/50 relative"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--t-accent)] text-[var(--t-on-dark)] text-xs font-semibold mb-3">
                {i + 1}
              </span>
              <span className="text-[var(--t-label)] mb-2">
                <Icon name={step.icon} className="w-5 h-5" />
              </span>
              <p className="text-xs font-medium text-[var(--t-heading)] leading-snug">
                {step.label}
              </p>
              {i < journey.length - 1 && (
                <span className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-[var(--t-border)]">
                  <Icon name="arrow" className="w-4 h-4" />
                </span>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </SectionWrapper>
  );
}
