"use client";

import { useCallback, useMemo, useState, ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTheme } from "../hooks/useTheme";
import { useTabManager } from "../hooks/useTabManager";
import { getGreekPrefix } from "../utils/greekPrefix";
import { TabConfig } from "../types/deck";
import { SlideLabelContext } from "../contexts/slideLabelContext";
import ThemePicker from "./ThemePicker";
import ConfirmDialog from "./ConfirmDialog";
import RenameDialog from "./RenameDialog";
import ProblemSection from "./ProblemSection";
import ProblemCondensedSection from "./ProblemCondensedSection";
import ProblemCleanSection from "./ProblemCleanSection";
import GapSection from "./GapSection";
import GapVisionSection from "./GapVisionSection";
import GapVisionCondensedSection from "./GapVisionCondensedSection";
import UserJourneySection from "./UserJourneySection";
import UserJourneyCondensedSection from "./UserJourneyCondensedSection";
import ArchitectureSection from "./ArchitectureSection";
import ImpactSection from "./ImpactSection";

const INITIAL_TABS: TabConfig[] = [
  { id: "problem", label: "Problem", slides: [ProblemSection, ProblemCondensedSection, ProblemCleanSection] },
  { id: "gap", label: "Gap", slides: [GapSection, GapVisionSection, GapVisionCondensedSection] },
  { id: "user-journey", label: "User Journey", slides: [UserJourneySection, UserJourneyCondensedSection] },
  { id: "next-steps", label: "Next Steps", slides: [ArchitectureSection, ImpactSection] },
];

interface PendingSlideRename {
  tabId: string;
  slideIdx: number;
  currentLabel: string;
}

function Labeled({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="mb-10">
      <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[var(--t-dark)] text-[var(--t-on-dark)] text-xs font-semibold tracking-wide">
        {name}
      </span>
      {children}
    </div>
  );
}

export default function DeckShell() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { globalTheme, effectiveGlobalTheme, getTabTheme, applyTheme, setPreview, clearPreview } = useTheme();
  const { tabs, addTab, removeTab, canDelete, renameTab, renameSlide, renameAllSlides } =
    useTabManager(INITIAL_TABS);

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [renamingTabId, setRenamingTabId] = useState<string | null>(null);
  const [tabRenameValue, setTabRenameValue] = useState("");
  const [pendingSlideRename, setPendingSlideRename] = useState<PendingSlideRename | null>(null);

  const tabIds = useMemo(() => new Set(tabs.map((t) => t.id)), [tabs]);
  const paramTab = searchParams.get("tab");
  const activeTab = paramTab && tabIds.has(paramTab) ? paramTab : tabs[0].id;

  const setActiveTab = useCallback(
    (id: string) => router.push(`?tab=${id}`, { scroll: false }),
    [router],
  );

  function handleAddTab() {
    const newId = addTab();
    router.push(`?tab=${newId}`, { scroll: false });
  }

  function handleDeleteClick(e: React.MouseEvent, tabId: string) {
    e.stopPropagation();
    setPendingDeleteId(tabId);
  }

  function confirmDelete() {
    if (!pendingDeleteId) return;
    const isActive = pendingDeleteId === activeTab;
    const fallbackId = tabs.find((t) => t.id !== pendingDeleteId)?.id ?? tabs[0].id;
    removeTab(pendingDeleteId);
    setPendingDeleteId(null);
    if (isActive) router.push(`?tab=${fallbackId}`, { scroll: false });
  }

  function handleTabDoubleClick(e: React.MouseEvent, tabId: string, currentLabel: string) {
    e.stopPropagation();
    setRenamingTabId(tabId);
    setTabRenameValue(currentLabel);
  }

  function commitTabRename(tabId: string) {
    const trimmed = tabRenameValue.trim();
    if (trimmed) renameTab(tabId, trimmed);
    setRenamingTabId(null);
  }

  function handleTabRenameKeyDown(e: React.KeyboardEvent, tabId: string) {
    if (e.key === "Enter") commitTabRename(tabId);
    if (e.key === "Escape") setRenamingTabId(null);
  }

  function handleSlideRenameRequest(tabId: string, slideIdx: number, currentLabel: string) {
    setPendingSlideRename({ tabId, slideIdx, currentLabel });
  }

  function handleSlideRenameOne(newLabel: string) {
    if (!pendingSlideRename) return;
    renameSlide(pendingSlideRename.tabId, pendingSlideRename.slideIdx, newLabel);
    setPendingSlideRename(null);
  }

  function handleSlideRenameAll(newLabel: string) {
    if (!pendingSlideRename) return;
    renameAllSlides(pendingSlideRename.tabId, newLabel);
    setPendingSlideRename(null);
  }

  const pendingSlideTab = pendingSlideRename
    ? tabs.find((t) => t.id === pendingSlideRename.tabId)
    : null;

  return (
    <div className="min-h-screen bg-white" data-theme={effectiveGlobalTheme}>
      <header className="relative z-[60] border-b border-[var(--t-border-outer)] bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--t-heading)] tracking-tight">
              SlideNexus
            </h1>
            <p className="text-sm text-[var(--t-muted)] mt-1">
              Topic-agnostic presentation framework
            </p>
          </div>
          <div className="mt-1">
            <ThemePicker
              globalTheme={globalTheme}
              activeTabId={activeTab}
              onApply={applyTheme}
              onPreview={setPreview}
              onCancelPreview={clearPreview}
            />
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-50 border-b border-[var(--t-border-outer)] bg-white/95 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto px-6 flex gap-1 items-center">
          {tabs.map((tab) =>
            renamingTabId === tab.id ? (
              <div key={tab.id} className="relative flex items-center">
                <input
                  autoFocus
                  value={tabRenameValue}
                  onChange={(e) => setTabRenameValue(e.target.value)}
                  onBlur={() => commitTabRename(tab.id)}
                  onKeyDown={(e) => handleTabRenameKeyDown(e, tab.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-3 text-sm font-medium text-[var(--t-heading)] bg-transparent border-none outline-none min-w-[6rem] max-w-[12rem]"
                />
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--t-accent)] rounded-full" />
              </div>
            ) : (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                onDoubleClick={(e) => handleTabDoubleClick(e, tab.id, tab.label)}
                className={`px-4 py-3 text-sm font-medium transition-colors relative flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "text-[var(--t-heading)]"
                    : "text-[var(--t-inactive)] hover:text-[var(--t-label)]"
                }`}
              >
                {tab.label}
                {canDelete && (
                  <span
                    role="button"
                    aria-label={`Delete ${tab.label}`}
                    onClick={(e) => handleDeleteClick(e, tab.id)}
                    className="text-[var(--t-inactive)] hover:text-[var(--t-heading)] text-xs leading-none"
                  >
                    ×
                  </span>
                )}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--t-accent)] rounded-full" />
                )}
              </button>
            )
          )}
          <button
            onClick={handleAddTab}
            aria-label="Add tab"
            className="px-3 py-3 text-sm font-medium text-[var(--t-inactive)] hover:text-[var(--t-label)] transition-colors"
          >
            +
          </button>
        </div>
      </nav>

      {pendingDeleteId && (
        <ConfirmDialog
          message={`Delete "${tabs.find((t) => t.id === pendingDeleteId)?.label}"? This cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}

      {pendingSlideRename && pendingSlideTab && (
        <RenameDialog
          currentName={pendingSlideRename.currentLabel}
          slideCount={pendingSlideTab.slides.length}
          onRenameOne={handleSlideRenameOne}
          onRenameAll={handleSlideRenameAll}
          onCancel={() => setPendingSlideRename(null)}
        />
      )}

      <main
        className="max-w-[1200px] mx-auto px-6 py-10"
        data-theme={getTabTheme(activeTab)}
      >
        {tabs.map((tab, tabIdx) =>
          activeTab === tab.id ? (
            <div key={tab.id}>
              {tab.slides.map((Slide, slideIdx) => (
                <SlideLabelContext.Provider
                  key={slideIdx}
                  value={{
                    label: tab.slideLabels?.[slideIdx],
                    onRenameRequest: (currentLabel) =>
                      handleSlideRenameRequest(tab.id, slideIdx, currentLabel),
                  }}
                >
                  <Labeled name={`${getGreekPrefix(tabIdx)}-${slideIdx + 1}`}>
                    <Slide />
                  </Labeled>
                </SlideLabelContext.Provider>
              ))}
            </div>
          ) : null
        )}
      </main>
    </div>
  );
}
