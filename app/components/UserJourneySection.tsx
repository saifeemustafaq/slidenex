import { SectionWrapper, SectionCard } from "./shared";
import { Icon } from "./Icons";

const steps = [
  {
    number: "01",
    icon: "cog",
    title: "Define Narrative Tabs",
    description:
      "The deck creator decides on the narrative sections — Problem, Approach, Results, or whatever fits their topic — and adds them to the tab array.",
  },
  {
    number: "02",
    icon: "cube",
    title: "Build Slide Components",
    description:
      "Each slide is authored as a standalone React component using SectionWrapper and SectionCard. Content, icons, and layout are encapsulated per slide.",
  },
  {
    number: "03",
    icon: "lightbulb",
    title: "Label & Iterate",
    description:
      "Every slide gets a Greek-letter label (Alpha-1, Alpha-2). New iterations are added alongside existing ones so teams can compare versions directly.",
  },
  {
    number: "04",
    icon: "users",
    title: "Review & Reference",
    description:
      'Stakeholders use labels to give precise feedback — "Let\'s go with Beta-2 but use the callout style from Beta-1" — eliminating ambiguity.',
  },
  {
    number: "05",
    icon: "rocket",
    title: "Ship the Deck",
    description:
      "The final selection of slides is the deck. Old iterations remain available for reference, creating a natural audit trail of the narrative evolution.",
  },
];

const topRow = steps.slice(0, 3);
const bottomRow = [...steps.slice(3)].reverse();

function StepCard({ step }: { step: (typeof steps)[number] }) {
  return (
    <div className="bg-white/80 border border-[var(--t-border)]/50 rounded-2xl p-5 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg font-semibold leading-none text-[var(--t-border)]">
          {step.number}
        </span>
        <span className="text-[var(--t-label)]">
          <Icon name={step.icon} className="w-5 h-5" />
        </span>
      </div>
      <h4 className="text-sm font-semibold text-[var(--t-heading)] mb-1">
        {step.title}
      </h4>
      <p className="text-xs text-[var(--t-muted)] leading-relaxed">{step.description}</p>
    </div>
  );
}

function ArrowRight() {
  return (
    <span className="hidden md:flex items-center text-[var(--t-border)]">
      <Icon name="arrow" className="w-4 h-4" />
    </span>
  );
}

function ArrowLeft() {
  return (
    <span className="hidden md:flex items-center text-[var(--t-border)] rotate-180">
      <Icon name="arrow" className="w-4 h-4" />
    </span>
  );
}

export default function UserJourneySection() {
  return (
    <SectionWrapper label="User Journey">
      <SectionCard>
        <h3 className="text-xl font-semibold text-[var(--t-heading)] leading-snug mb-1">
          From Blank Canvas to Final Deck
        </h3>
        <p className="text-xs text-[var(--t-muted)] leading-relaxed mb-8 max-w-2xl">
          The workflow a team follows when building a presentation with
          SlideNexus.
        </p>

        {/* Row 1: 01 → 02 → 03 */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-3 items-stretch mb-3">
          <StepCard step={topRow[0]} />
          <ArrowRight />
          <StepCard step={topRow[1]} />
          <ArrowRight />
          <StepCard step={topRow[2]} />
        </div>

        {/* Down arrow */}
        <div className="hidden md:flex justify-end pr-[calc(100%/6)] mb-3">
          <span className="text-[var(--t-border)] rotate-90">
            <Icon name="arrow" className="w-4 h-4" />
          </span>
        </div>

        {/* Row 2: 05 ← 04 (reversed order, right to left) */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-stretch md:ml-auto md:w-[calc(66.666%+0.375rem)]">
          <StepCard step={bottomRow[0]} />
          <ArrowLeft />
          <StepCard step={bottomRow[1]} />
        </div>

        {/* Callout */}
        <div className="mt-8 bg-[var(--t-callout)] border border-[var(--t-border)] rounded-xl p-4 flex items-center gap-3">
          <span className="text-[var(--t-label)] flex-shrink-0">
            <Icon name="check" className="w-5 h-5" />
          </span>
          <p className="text-sm text-[var(--t-label)] italic">
            This creates a{" "}
            <span className="font-semibold text-[var(--t-accent)]">
              living iteration system
            </span>{" "}
            instead of a static slide deck.
          </p>
        </div>
      </SectionCard>
    </SectionWrapper>
  );
}
