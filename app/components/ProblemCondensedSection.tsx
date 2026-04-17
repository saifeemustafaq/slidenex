import { SectionWrapper, SectionCard } from "./shared";
import { Icon } from "./Icons";

const issues = [
  { icon: "clock", label: "Slow iteration cycles across revision rounds" },
  { icon: "puzzle", label: "No universal reference system for slide feedback" },
  { icon: "users", label: "Version conflicts between collaborators" },
  { icon: "alert", label: "Design inconsistency across decks and teams" },
];

export default function ProblemCondensedSection() {
  return (
    <SectionWrapper label="Problem">
      <SectionCard>
        <h3 className="text-xl font-semibold text-[var(--t-heading)] leading-snug mb-1">
          The Core Challenges
        </h3>
        <p className="text-xs text-[var(--t-muted)] leading-relaxed mb-6">
          Four friction points that slow down every team working on
          presentations.
        </p>

        <div className="space-y-3">
          {issues.map((issue) => (
            <div
              key={issue.label}
              className="flex items-center gap-3 bg-white/80 rounded-xl px-4 py-3"
            >
              <span className="text-[var(--t-label)]">
                <Icon name={issue.icon} className="w-5 h-5" />
              </span>
              <span className="text-sm font-medium text-[var(--t-heading)]">
                {issue.label}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>
    </SectionWrapper>
  );
}
