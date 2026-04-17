import { SectionWrapper, SectionCard } from "./shared";

const placeholderItems = [
  { title: "Detail One", description: "Describe the first key detail or point here." },
  { title: "Detail Two", description: "Describe the second key detail or point here." },
  { title: "Detail Three", description: "Describe the third key detail or point here." },
];

export default function SampleSlideB() {
  return (
    <SectionWrapper label="SAMPLE DETAILS">
      <SectionCard>
        <h3 className="text-xl font-semibold text-[var(--t-heading)] leading-snug mb-2">
          Sample List Slide
        </h3>
        <p className="text-xs text-[var(--t-muted)] leading-relaxed mb-8 max-w-2xl">
          This is a placeholder slide for list-style content. Replace the items
          below with your own details, steps, or supporting points.
        </p>

        <div className="flex flex-col gap-3">
          {placeholderItems.map((item) => (
            <div
              key={item.title}
              className="bg-[var(--t-callout)] border border-[var(--t-border)] rounded-xl px-4 py-3"
            >
              <h4 className="text-sm font-semibold text-[var(--t-label)] mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-[var(--t-muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    </SectionWrapper>
  );
}
