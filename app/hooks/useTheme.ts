"use client";

import { useState, useEffect, useCallback } from "react";
import { DEFAULT_THEME, type ThemeId } from "../constants/themes";

const STORAGE_KEY_GLOBAL = "slidenex:globalTheme";
const STORAGE_KEY_TABS = "slidenex:tabThemes";

export function useTheme() {
  const [globalTheme, setGlobalTheme] = useState<ThemeId>(DEFAULT_THEME);
  const [tabThemes, setTabThemes] = useState<Record<string, ThemeId>>({});

  // Preview layer — never persisted, cleared on cancel or apply
  const [previewTheme, setPreviewTheme] = useState<ThemeId | null>(null);
  const [previewScope, setPreviewScope] = useState<"all" | string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GLOBAL);
      if (stored) setGlobalTheme(stored as ThemeId);
      const storedTabs = localStorage.getItem(STORAGE_KEY_TABS);
      if (storedTabs) setTabThemes(JSON.parse(storedTabs));
    } catch {
      // localStorage unavailable — keep defaults
    }
  }, []);

  const applyTheme = useCallback(
    (themeId: ThemeId, scope: "all" | string) => {
      try {
        if (scope === "all") {
          setGlobalTheme(themeId);
          setTabThemes({});
          localStorage.setItem(STORAGE_KEY_GLOBAL, themeId);
          localStorage.setItem(STORAGE_KEY_TABS, JSON.stringify({}));
        } else {
          setTabThemes((prev) => {
            const next = { ...prev, [scope]: themeId };
            localStorage.setItem(STORAGE_KEY_TABS, JSON.stringify(next));
            return next;
          });
        }
      } catch {
        // localStorage unavailable — state still updates in memory
      }
      // Clear preview once committed
      setPreviewTheme(null);
      setPreviewScope(null);
    },
    [],
  );

  const setPreview = useCallback((themeId: ThemeId, scope: "all" | string) => {
    setPreviewTheme(themeId);
    setPreviewScope(scope);
  }, []);

  const clearPreview = useCallback(() => {
    setPreviewTheme(null);
    setPreviewScope(null);
  }, []);

  // Considers preview override for a specific tab's content
  const getTabTheme = useCallback(
    (tabId: string): ThemeId => {
      if (previewTheme !== null) {
        if (previewScope === "all") return previewTheme;
        if (previewScope === tabId) return previewTheme;
      }
      return tabThemes[tabId] ?? globalTheme;
    },
    [previewTheme, previewScope, tabThemes, globalTheme],
  );

  // Effective theme for the outer wrapper — only overridden when preview scope is "all"
  const effectiveGlobalTheme: ThemeId =
    previewTheme !== null && previewScope === "all" ? previewTheme : globalTheme;

  return { globalTheme, tabThemes, effectiveGlobalTheme, getTabTheme, applyTheme, setPreview, clearPreview };
}
