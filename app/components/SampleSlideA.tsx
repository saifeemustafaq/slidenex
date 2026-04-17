import { SectionWrapper, SectionCard } from "./shared";

const placeholderCards = [
  { title: "Placeholder Item A", description: "This is sample content for the first card. Replace with your own data." },
  { title: "Placeholder Item B", description: "This is sample content for the second card. Replace with your own data." },
];

export default function SampleSlideA() {
  return (
    <SectionWrapper label="SAMPLE SECTION">
      <SectionCard>
        <h3 className="text-xl font-semibold text-[var(--t-heading)] leading-snug mb-2">
          Sample Card Grid Slide
        </h3>
        <p className="text-xs text-[var(--t-muted)] leading-relaxed mb-8 max-w-2xl">
          This is a placeholder slide created when a new tab is added. Replace
          this content with your own heading, description, and card data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {placeholderCards.map((card) => (
            <div
              key={card.title}
              className="bg-[var(--t-dark)] rounded-2xl p-5 flex flex-col h-full"
            >
              <h4 className="text-sm font-semibold text-[var(--t-on-dark)] mb-2">
                {card.title}
              </h4>
              <p className="text-xs text-[var(--t-on-dark-soft)] leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    </SectionWrapper>
  );
}
