import { SectionWrapper, SectionCard } from "./shared";
import { Icon } from "./Icons";

const outcomes = [
  {
    icon: "bolt",
    metric: "60%",
    label: "Faster Iteration Cycles",
    description:
      "Side-by-side slide comparisons and precise labelling eliminate rework from miscommunication.",
  },
  {
    icon: "check",
    metric: "100%",
    label: "Design Consistency",
    description:
      "Shared component library and enforced tokens mean every slide matches the system — automatically.",
  },
  {
    icon: "users",
    metric: "Zero",
    label: "Ambiguous References",
    description:
      "Greek-letter labels give every slide a unique, universally understood name.",
  },
];

const nextSteps = [
  "Extend the icon library with domain-specific visuals",
  "Add export-to-PDF for offline sharing",
  "Build a deck gallery for browsing past presentations",
  "Introduce presenter mode with speaker notes",
];

export default function ImpactSection() {
  return (
    <SectionWrapper label="Impact & Next Steps">
      <SectionCard>
        <h3 className="text-xl font-semibold text-[var(--t-heading)] leading-snug mb-1">
          Measurable Outcomes & Roadmap
        </h3>
        <p className="text-xs text-[var(--t-muted)] leading-relaxed mb-8 max-w-2xl">
          What teams gain from adopting SlideNexus, and where the framework goes
          next.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {outcomes.map((o) => (
            <div
              key={o.label}
              className="bg-[var(--t-dark)] rounded-2xl p-5 flex flex-col items-center text-center"
            >
              <span className="text-[var(--t-icon)] mb-2">
                <Icon name={o.icon} className="w-6 h-6" />
              </span>
              <span className="text-2xl font-bold text-[var(--t-on-dark)] mb-1">
                {o.metric}
              </span>
              <h4 className="text-sm font-semibold text-[var(--t-on-dark)] mb-2">
                {o.label}
              </h4>
              <p className="text-xs text-[var(--t-on-dark-soft)] leading-relaxed">
                {o.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-sm font-medium text-[var(--t-label)] tracking-wide uppercase mb-3">
          Roadmap
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {nextSteps.map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-3 bg-[var(--t-callout)] border border-[var(--t-border)] rounded-xl px-4 py-3"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--t-accent)] text-[var(--t-on-dark)] text-[10px] font-semibold flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-[var(--t-heading)]">{step}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </SectionWrapper>
  );
}
