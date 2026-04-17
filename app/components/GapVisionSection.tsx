import { SectionWrapper, SectionCard } from "./shared";
import { Icon } from "./Icons";

const visionPoints = [
  {
    icon: "lightbulb",
    title: "Labelled Iterations",
    description:
      "Every slide gets a unique Greek-letter label (Alpha-1, Beta-2) so anyone can reference it precisely — no more guessing which slide someone means.",
  },
  {
    icon: "cube",
    title: "Tab-Based Narrative",
    description:
      "Content is organized into narrative tabs, not a flat list. Each tab represents a section of the story, with multiple iterations visible within it.",
  },
  {
    icon: "shield",
    title: "Enforced Design System",
    description:
      "A shared color palette, typography scale, and component library ensure every slide looks consistent regardless of who creates it.",
  },
  {
    icon: "bolt",
    title: "Component Architecture",
    description:
      "Each slide is a self-contained React component — independently renderable, version-controllable, and composable into any deck.",
  },
];

export default function GapVisionSection() {
  return (
    <SectionWrapper label="Vision">
      <SectionCard>
        <h3 className="text-xl font-semibold text-[var(--t-heading)] leading-snug mb-1">
          A Framework Built for Iteration
        </h3>
        <p className="text-xs text-[var(--t-muted)] leading-relaxed mb-8 max-w-2xl">
          SlideNexus reimagines presentations as structured, living documents
          with built-in conventions for collaboration and referenceability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {visionPoints.map((point) => (
            <div
              key={point.title}
              className="bg-white/80 rounded-2xl p-5 border border-[var(--t-border)]/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[var(--t-label)]">
                  <Icon name={point.icon} className="w-5 h-5" />
                </span>
                <h4 className="text-sm font-medium text-[var(--t-heading)]">
                  {point.title}
                </h4>
              </div>
              <p className="text-xs text-[var(--t-muted)] leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    </SectionWrapper>
  );
}
