import { useState, useRef, useMemo, ComponentType } from "react";
import { TabConfig } from "../types/deck";
import SampleSlideA from "../components/SampleSlideA";
import SampleSlideB from "../components/SampleSlideB";

export function useTabManager(initialTabs: TabConfig[]) {
  const [tabs, setTabs] = useState<TabConfig[]>(initialTabs);
  const counterRef = useRef(0);

  const canDelete = useMemo(() => tabs.length > 2, [tabs.length]);

  function addTab(): string {
    counterRef.current += 1;
    const n = counterRef.current;
    const newTab: TabConfig = {
      id: `tab-${n}`,
      label: `New Tab ${n}`,
      slides: [SampleSlideA, SampleSlideB] as ComponentType[],
    };
    setTabs((prev) => [...prev, newTab]);
    return newTab.id;
  }

  function removeTab(id: string): void {
    if (!canDelete) return;
    setTabs((prev) => prev.filter((t) => t.id !== id));
  }

  function renameTab(id: string, newLabel: string): void {
    setTabs((prev) => prev.map((t) => (t.id === id ? { ...t, label: newLabel } : t)));
  }

  function renameSlide(tabId: string, slideIdx: number, newLabel: string): void {
    setTabs((prev) =>
      prev.map((t) =>
        t.id !== tabId
          ? t
          : { ...t, slideLabels: { ...t.slideLabels, [slideIdx]: newLabel } }
      )
    );
  }

  function renameAllSlides(tabId: string, newLabel: string): void {
    setTabs((prev) =>
      prev.map((t) => {
        if (t.id !== tabId) return t;
        const slideLabels = Object.fromEntries(t.slides.map((_, i) => [i, newLabel]));
        return { ...t, slideLabels };
      })
    );
  }

  return { tabs, addTab, removeTab, canDelete, renameTab, renameSlide, renameAllSlides };
}
