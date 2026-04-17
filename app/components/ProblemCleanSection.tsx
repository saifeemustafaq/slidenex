import { SectionWrapper, SectionCard, NegationList } from "./shared";

export default function ProblemCleanSection() {
  return (
    <SectionWrapper label="Problem">
      <SectionCard>
        <h3 className="text-xl font-semibold text-[var(--t-heading)] leading-snug mb-1">
          What&rsquo;s Not Working Today
        </h3>
        <p className="text-xs text-[var(--t-muted)] leading-relaxed mb-6">
          Current presentation workflows fail iterative teams in specific,
          measurable ways.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-[var(--t-label)] tracking-wide uppercase mb-3">
              Process Gaps
            </p>
            <NegationList
              items={[
                "No side-by-side comparison of slide iterations",
                "Feedback references are ambiguous and error-prone",
                "Design tokens are manually replicated per deck",
              ]}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--t-label)] tracking-wide uppercase mb-3">
              Impact
            </p>
            <NegationList
              items={[
                "2–3 hours lost per revision cycle on re-alignment",
                "Stakeholder confusion leads to repeated review rounds",
                "Visual drift erodes brand consistency over time",
              ]}
            />
          </div>
        </div>
      </SectionCard>
    </SectionWrapper>
  );
}
