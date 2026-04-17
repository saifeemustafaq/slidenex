import { ReactNode } from "react";
import { XIcon, Icon } from "./Icons";
import { useSlideLabelContext } from "../contexts/slideLabelContext";

export function SectionWrapper({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const { label: ctxLabel, onRenameRequest } = useSlideLabelContext();
  const displayLabel = ctxLabel ?? label;

  return (
    <div className="w-full max-w-[1160px] mx-auto border border-[var(--t-border-outer)] p-6">
      <div className="flex items-center gap-2 mb-4 group">
        <h2 className="text-lg font-semibold tracking-widest uppercase text-[var(--t-heading)]">
          {displayLabel}
        </h2>
        <button
          onClick={() => onRenameRequest(displayLabel)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--t-inactive)] hover:text-[var(--t-label)]"
          aria-label="Rename section header"
        >
          <Icon name="pencil" className="w-3.5 h-3.5" />
        </button>
      </div>
      {children}
    </div>
  );
}

export function SectionCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl bg-[var(--t-card)] border border-[var(--t-border)] p-8">
      {children}
    </div>
  );
}

export function NegationList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-0.5 flex-shrink-0 text-red-400">
            <XIcon className="w-4 h-4" />
          </span>
          <span className="text-sm text-[var(--t-heading)] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
