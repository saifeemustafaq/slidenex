import { SectionWrapper, SectionCard } from "./shared";
import { Icon } from "./Icons";

const layers = [
  {
    icon: "globe",
    title: "Page Layer",
    file: "app/page.tsx",
    description:
      "Tab navigation, active-tab state, and the Labeled wrapper that assigns Greek-letter labels to each slide.",
  },
  {
    icon: "cube",
    title: "Component Layer",
    file: "app/components/",
    description:
      "Self-contained slide components, each using SectionWrapper + SectionCard for structural consistency.",
  },
  {
    icon: "shield",
    title: "Design System Layer",
    file: "shared.tsx + Icons.tsx",
    description:
      "Reusable containers, negation lists, icon library, and the color/typography tokens that unify all slides.",
  },
];

const conventions = [
  { label: "Tab Position → Prefix", example: "1st tab = Alpha, 2nd = Beta" },
  { label: "Slide Numbering", example: "Alpha-1, Alpha-2, Alpha-3..." },
  { label: "Container Structure", example: "SectionWrapper → SectionCard" },
  { label: "Color Tokens", example: "CSS var(--t-*) tokens, no raw hex" },
];

export default function ArchitectureSection() {
  return (
    <SectionWrapper label="Architecture">
      <SectionCard>
        <h3 className="text-xl font-semibold text-[var(--t-heading)] leading-snug mb-1">
          How SlideNexus Is Built
        </h3>
        <p className="text-xs text-[var(--t-muted)] leading-relaxed mb-8 max-w-2xl">
          A three-layer architecture that separates navigation, content, and
          design concerns.
        </p>

        <div className="space-y-4 mb-8">
          {layers.map((layer) => (
            <div
              key={layer.title}
              className="flex gap-4 bg-[var(--t-dark)] rounded-2xl p-5"
            >
              <div className="flex-shrink-0 text-[var(--t-icon)] mt-0.5">
                <Icon name={layer.icon} className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <h4 className="text-sm font-semibold text-[var(--t-on-dark)]">
                    {layer.title}
                  </h4>
                  <span className="text-[10px] font-mono text-[var(--t-icon)]">
                    {layer.file}
                  </span>
                </div>
                <p className="text-xs text-[var(--t-on-dark-soft)] leading-relaxed">
                  {layer.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm font-medium text-[var(--t-label)] tracking-wide uppercase mb-3">
          Conventions at a Glance
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {conventions.map((c) => (
            <div
              key={c.label}
              className="bg-white/80 rounded-xl px-4 py-3 border border-[var(--t-border)]/50"
            >
              <p className="text-sm font-medium text-[var(--t-heading)]">{c.label}</p>
              <p className="text-xs text-[var(--t-muted)]">{c.example}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </SectionWrapper>
  );
}
