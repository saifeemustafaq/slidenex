import { SectionWrapper, SectionCard } from "./shared";
import { Icon } from "./Icons";

const gaps = [
  {
    icon: "search",
    current: "Slides are unnamed files in a folder",
    needed: "Every slide has a unique, referenceable label",
  },
  {
    icon: "chart",
    current: "One version replaces the previous",
    needed: "All iterations live side by side for comparison",
  },
  {
    icon: "shield",
    current: "Design choices are ad hoc per author",
    needed: "A shared design system enforces consistency",
  },
  {
    icon: "cube",
    current: "Flat list of slides with no structure",
    needed: "Narrative sections organized into navigable tabs",
  },
];

export default function GapSection() {
  return (
    <SectionWrapper label="Gap Analysis">
      <SectionCard>
        <h3 className="text-xl font-semibold text-[var(--t-heading)] leading-snug mb-1">
          Where Current Tools Fall Short
        </h3>
        <p className="text-xs text-[var(--t-muted)] leading-relaxed mb-8 max-w-2xl">
          The gap between how teams actually work on presentations and what
          existing tools support.
        </p>

        <div className="space-y-4">
          {gaps.map((gap) => (
            <div
              key={gap.current}
              className="flex items-stretch gap-4"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-10 text-[var(--t-icon)]">
                <Icon name={gap.icon} className="w-5 h-5" />
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white/80 rounded-xl px-4 py-3">
                  <p className="text-[10px] font-medium text-[var(--t-inactive)] uppercase tracking-wide mb-1">
                    Current State
                  </p>
                  <p className="text-sm text-[var(--t-heading)]">{gap.current}</p>
                </div>
                <div className="bg-[var(--t-dark)] rounded-xl px-4 py-3">
                  <p className="text-[10px] font-medium text-[var(--t-icon)] uppercase tracking-wide mb-1">
                    What&rsquo;s Needed
                  </p>
                  <p className="text-sm text-[var(--t-on-dark)]">{gap.needed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </SectionWrapper>
  );
}
