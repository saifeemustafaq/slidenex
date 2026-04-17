import { SectionWrapper, SectionCard } from "./shared";
import { Icon } from "./Icons";

const painPoints = [
  {
    icon: "clock",
    title: "Time-Consuming Iteration",
    description:
      "Teams spend hours rearranging slides in traditional tools, losing context and narrative flow with every revision.",
  },
  {
    icon: "puzzle",
    title: "No Shared Reference System",
    description:
      "When giving feedback, reviewers resort to vague references like 'the third slide' or 'the one with the chart,' creating confusion.",
  },
  {
    icon: "users",
    title: "Collaboration Friction",
    description:
      "Multiple stakeholders iterate on overlapping versions, with no single source of truth for which variant is current.",
  },
  {
    icon: "alert",
    title: "Inconsistent Design Language",
    description:
      "Without enforced conventions, every new deck introduces its own fonts, colors, and layout patterns.",
  },
];

export default function ProblemSection() {
  return (
    <SectionWrapper label="Problem">
      <SectionCard>
        <h3 className="text-xl font-semibold text-[var(--t-heading)] leading-snug mb-2">
          Presentations Are Broken for Iterative Teams
        </h3>
        <p className="text-xs text-[var(--t-muted)] leading-relaxed mb-8 max-w-2xl">
          Traditional slide tools were designed for linear, one-shot
          presentations — not for teams that iterate, compare, and refine
          narrative sections across multiple rounds of feedback.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="bg-[var(--t-dark)] rounded-2xl p-5 flex gap-4"
            >
              <div className="flex-shrink-0 mt-0.5 text-[var(--t-icon)]">
                <Icon name={point.icon} className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--t-on-dark)] mb-1">
                  {point.title}
                </h4>
                <p className="text-xs text-[var(--t-on-dark-soft)] leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-[var(--t-callout)] border border-[var(--t-border)] rounded-xl p-4">
          <p className="text-sm text-[var(--t-label)] italic">
            &ldquo;We need a framework that treats presentations as living
            documents — not static artifacts.&rdquo;
          </p>
        </div>
      </SectionCard>
    </SectionWrapper>
  );
}
