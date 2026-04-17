import { SectionWrapper, SectionCard } from "./shared";
import { Icon } from "./Icons";

const pillars = [
  { icon: "alert", label: "Mars has the largest volcano in the solar system — Olympus Mons" },
  { icon: "clock", label: "A day on Mars lasts 24 hours and 37 minutes" },
  { icon: "globe", label: "Mars has two small moons: Phobos and Deimos" },
  { icon: "cube", label: "The Martian surface is covered in iron oxide, giving it a red hue" },
  { icon: "shield", label: "Mars once had liquid water and a thicker atmosphere" },
];

export default function GapVisionCondensedSection() {
  return (
    <SectionWrapper label="Vision">
      <SectionCard>
        <h3 className="text-xl font-semibold text-[var(--t-heading)] leading-snug mb-1">
          Five Facts About Mars
        </h3>
        <p className="text-xs text-[var(--t-muted)] leading-relaxed mb-6">
          Key facts about the Red Planet, our closest planetary neighbor.
        </p>

        <div className="flex flex-col gap-3">
          {pillars.map((p, i) => (
            <div
              key={p.label}
              className="flex items-center gap-4 bg-[var(--t-dark)] rounded-xl px-5 py-4"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--t-accent)] text-[var(--t-on-dark)] text-xs font-semibold">
                {i + 1}
              </span>
              <span className="text-[var(--t-icon)]">
                <Icon name={p.icon} className="w-5 h-5" />
              </span>
              <span className="text-sm font-semibold text-[var(--t-on-dark)]">
                {p.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-[var(--t-callout)] border border-[var(--t-border)] rounded-xl p-4">
          <p className="text-sm text-[var(--t-label)] italic">
            Mars remains the most promising candidate for future human
            settlement beyond Earth.
          </p>
        </div>
      </SectionCard>
    </SectionWrapper>
  );
}
