"use client";

import { useState, useRef, useEffect } from "react";
import { THEME_SECTIONS, THEMES, type ThemeId } from "../constants/themes";

interface Props {
  globalTheme: ThemeId;
  activeTabId: string;
  onApply: (themeId: ThemeId, scope: "all" | string) => void;
  onPreview: (themeId: ThemeId, scope: "all" | string) => void;
  onCancelPreview: () => void;
}

export default function ThemePicker({
  globalTheme,
  activeTabId,
  onApply,
  onPreview,
  onCancelPreview,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ThemeId>(globalTheme);
  const [scope, setScope] = useState<"all" | "tab">("all");
  const ref = useRef<HTMLDivElement>(null);

  // Reset selection to current committed theme each time the picker opens
  useEffect(() => {
    if (open) {
      setSelected(globalTheme);
      setScope("all");
    }
  }, [open, globalTheme]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onCancelPreview();
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onCancelPreview]);

  function handleSelectSwatch(id: ThemeId) {
    setSelected(id);
    onPreview(id, scope === "all" ? "all" : activeTabId);
  }

  function handleScopeChange(newScope: "all" | "tab") {
    setScope(newScope);
    onPreview(selected, newScope === "all" ? "all" : activeTabId);
  }

  function handleApply() {
    onApply(selected, scope === "all" ? "all" : activeTabId);
    setOpen(false);
  }

  function handleCancel() {
    onCancelPreview();
    setOpen(false);
  }

  const currentSwatch = THEMES.find((t) => t.id === globalTheme)?.swatch;
  const selectedEntry = THEMES.find((t) => t.id === selected);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change theme"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--t-border-outer)] hover:border-[var(--t-accent)] transition-colors bg-white"
      >
        <span
          className="w-3.5 h-3.5 rounded-full flex-shrink-0"
          style={{ background: currentSwatch }}
        />
        <span className="text-xs font-medium text-[var(--t-heading)]">Theme</span>
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-[60] w-72 rounded-2xl border border-[var(--t-border-outer)] bg-white shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-4 pt-4 pb-2">
            <p className="text-xs font-semibold text-[var(--t-heading)] tracking-widest uppercase">
              Theme
            </p>
          </div>

          {/* Scrollable swatch sections */}
          <div className="px-4 overflow-y-auto max-h-64 pb-2">
            {THEME_SECTIONS.map((section) => (
              <div key={section.label} className="mb-4">
                <p className="text-[10px] font-semibold text-[var(--t-inactive)] tracking-widest uppercase mb-2">
                  {section.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {section.themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleSelectSwatch(theme.id as ThemeId)}
                      title={theme.name}
                      className={`w-8 h-8 rounded-full border-2 transition-colors flex-shrink-0 ${
                        selected === theme.id
                          ? "border-[var(--t-accent)] ring-2 ring-[var(--t-accent)] ring-offset-1"
                          : "border-transparent hover:ring-2 hover:ring-[var(--t-muted)] hover:ring-offset-1"
                      }`}
                      style={{ background: theme.swatch }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Controls — always visible */}
          <div className="px-4 pt-3 pb-4 border-t border-[var(--t-border-outer)]">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ background: selectedEntry?.swatch }}
              />
              <span className="text-xs font-medium text-[var(--t-heading)]">
                {selectedEntry?.name}
              </span>
            </div>

            <div className="flex gap-2 mb-3">
              <button
                onClick={() => handleScopeChange("all")}
                className={`flex-1 text-xs py-1.5 rounded-lg border transition-colors ${
                  scope === "all"
                    ? "border-[var(--t-accent)] bg-[var(--t-callout)] text-[var(--t-accent)] font-semibold"
                    : "border-[var(--t-border)] text-[var(--t-muted)]"
                }`}
              >
                All Tabs
              </button>
              <button
                onClick={() => handleScopeChange("tab")}
                className={`flex-1 text-xs py-1.5 rounded-lg border transition-colors ${
                  scope === "tab"
                    ? "border-[var(--t-accent)] bg-[var(--t-callout)] text-[var(--t-accent)] font-semibold"
                    : "border-[var(--t-border)] text-[var(--t-muted)]"
                }`}
              >
                This Tab
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex-1 py-2 rounded-xl border border-[var(--t-border)] text-[var(--t-muted)] text-xs font-semibold hover:border-[var(--t-muted)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="flex-1 py-2 rounded-xl bg-[var(--t-dark)] text-[var(--t-on-dark)] text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
