import { useState } from "react";

interface RenameDialogProps {
  currentName: string;
  slideCount: number;
  onRenameOne: (newName: string) => void;
  onRenameAll: (newName: string) => void;
  onCancel: () => void;
}

export default function RenameDialog({
  currentName,
  slideCount,
  onRenameOne,
  onRenameAll,
  onCancel,
}: RenameDialogProps) {
  const [value, setValue] = useState(currentName);
  const trimmed = value.trim();
  const slideWord = slideCount === 1 ? "slide" : "slides";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-sm font-semibold text-[var(--t-heading)] mb-4">
          Rename section header
        </h3>
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") onCancel();
            if (e.key === "Enter" && trimmed) onRenameOne(trimmed);
          }}
          className="w-full border border-[var(--t-border)] rounded-lg px-3 py-2 text-sm text-[var(--t-heading)] focus:outline-none focus:ring-1 focus:ring-[var(--t-accent)] mb-5"
        />
        <p className="text-xs text-[var(--t-muted)] mb-3">Apply rename to:</p>
        <div className="flex flex-col gap-2">
          <button
            disabled={!trimmed}
            onClick={() => onRenameOne(trimmed)}
            className="w-full px-4 py-2 text-sm font-medium text-[var(--t-heading)] rounded-lg hover:bg-[var(--t-callout)] disabled:opacity-40 transition-colors text-left"
          >
            This slide only
          </button>
          <button
            disabled={!trimmed}
            onClick={() => onRenameAll(trimmed)}
            className="w-full px-4 py-2 text-sm font-medium text-[var(--t-heading)] rounded-lg hover:bg-[var(--t-callout)] disabled:opacity-40 transition-colors text-left"
          >
            All {slideCount} {slideWord} in this tab
          </button>
        </div>
        <button
          onClick={onCancel}
          className="mt-4 w-full text-xs text-[var(--t-muted)] hover:text-[var(--t-label)] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
