# SlideNexus — Developer Guide

This document defines the engineering standards every contributor must follow. It covers file size limits, modularization strategy, and DRY principle enforcement.

---

## File Size Rule: 200–300 LOC

Every source file should target **200–300 lines of code** as its upper bound.

### Hard limits

| Threshold | Action |
|-----------|--------|
| ≤ 200 LOC | Ideal. No action needed. |
| 200–300 LOC | Acceptable. Review whether extraction is possible. |
| > 300 LOC | **Must be refactored** unless a documented exception applies (see below). |

### Permitted exceptions

A file may exceed 300 LOC only when splitting it would **harm readability or break co-location of tightly coupled logic**. Examples:

- A complex component whose JSX, hooks, and handlers are deeply intertwined and extracting them would require passing 8+ props through layers of wrappers.
- A data-definition file (icon paths, theme tokens, route config) that is a flat list of values with no logic to extract.
- A generated or schema-driven file where manual splitting would cause drift from the source of truth.

When an exception is taken, add a comment at the top of the file:

```ts
// FILE-SIZE-EXCEPTION: <one-line reason>
```

### How to measure

```bash
wc -l app/**/*.tsx app/**/*.ts
```

Blank lines and import blocks count toward LOC. The goal is total file length, not "lines of logic."

---

## Modularization Strategy

### One concern per file

Each file should have a single, clear responsibility. If you can't describe what a file does in one short sentence, it needs splitting.

| Pattern | File | Responsibility |
|---------|------|----------------|
| Page | `app/page.tsx` | Tab navigation, layout, Labeled wrapper |
| Slide component | `app/components/ProblemSection.tsx` | One slide's markup and local data |
| Shared UI | `app/components/shared.tsx` | Reusable container components |
| Icons | `app/components/Icons.tsx` | Icon registry and rendering |
| Hooks | `app/hooks/<name>.ts` | One custom hook per file |
| Utilities | `app/utils/<name>.ts` | One utility concern per file |
| Constants | `app/constants/<name>.ts` | Grouped constants by domain |
| Types | `app/types/<name>.ts` | Shared type definitions |

### When to split a file

Apply these triggers:

1. **The file crosses 200 LOC.** Look for extraction opportunities.
2. **Two or more unrelated concerns live in the same file.** Separate them.
3. **A helper function is used by more than one component.** Move it to `utils/` or `hooks/`.
4. **A data array is large and reusable.** Move it to `constants/`.
5. **Types are shared across files.** Move them to `types/`.

### Directory structure

```
app/
├── page.tsx
├── globals.css
├── layout.tsx
├── components/
│   ├── shared.tsx          # Reusable container components
│   ├── Icons.tsx            # Icon registry
│   └── [SlideComponents].tsx
├── hooks/                   # Custom React hooks (one per file)
├── utils/                   # Pure utility functions (one concern per file)
├── constants/               # Static data, config, tokens
└── types/                   # Shared TypeScript interfaces/types
```

---

## DRY Principle — Maximum Enforcement

**Don't Repeat Yourself** is not a suggestion in this project — it is a hard rule. Every piece of knowledge must have a single, authoritative source.

### DRY tactics (ordered by frequency of use)

#### 1. Shared components

If the same JSX structure appears in two or more places, extract it into a reusable component.

```tsx
// BAD — duplicated card layout in every slide
<div className="bg-[#1a3d5c] rounded-2xl p-5 flex gap-4">
  <Icon ... />
  <div><h4>...</h4><p>...</p></div>
</div>

// GOOD — extracted once, used everywhere
<DarkCard icon="bolt" title="..." description="..." />
```

#### 2. Shared utility functions

If the same transformation or calculation appears in two or more files, extract it to `app/utils/`.

```ts
// app/utils/formatLabel.ts
export function formatLabel(prefix: string, index: number): string {
  return `${prefix}-${index + 1}`;
}
```

#### 3. Constants and configuration arrays

If the same literal value (color, string, config object) appears in more than one place, extract it to `app/constants/`.

```ts
// app/constants/colors.ts
export const COLORS = {
  deepNavy: "#0f2a45",
  navy: "#1a3d5c",
  blueAccent: "#2a6496",
  // ...
} as const;
```

#### 4. Custom hooks

If the same stateful logic (useState + useEffect pattern, event handlers, derived state) appears in two or more components, extract it to `app/hooks/`.

```ts
// app/hooks/useActiveTab.ts
export function useActiveTab(defaultTab: string) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return { activeTab, setActiveTab } as const;
}
```

#### 5. Shared types and interfaces

If the same shape is defined in multiple files, extract it to `app/types/`.

```ts
// app/types/slide.ts
export interface SlideItem {
  icon: string;
  title: string;
  description: string;
}
```

#### 6. Higher-order components and render patterns

If the same wrapping logic (error boundaries, layout wrappers, data-fetching shells) is applied to multiple components, use composition or HOC patterns.

```tsx
// Already done in this project: <Labeled name="Alpha-1"> wraps every slide
// Already done: SectionWrapper + SectionCard wraps every slide's content
```

#### 7. CSS utility extraction via Tailwind

If the same Tailwind class string is repeated across components, extract it to a constant or use `@apply` in `globals.css` — but prefer constants over `@apply`.

```ts
// app/constants/styles.ts
export const CARD_DARK = "bg-[#1a3d5c] rounded-2xl p-5";
export const CARD_LIGHT = "bg-white/80 rounded-xl px-4 py-3 border border-[#c0d4ea]/50";
export const LABEL_SUB = "text-sm font-medium text-[#4a7a9e] tracking-wide uppercase";
```

#### 8. Data-driven rendering

If multiple components render similar lists of items that only differ by data, use a single generic component with different data inputs.

```tsx
// INSTEAD OF: ProblemSection, GapSection each having their own card grid
// USE: a shared <CardGrid items={...} variant="dark" /> component
```

#### 9. Parametric components over branching duplication

If two components are 80%+ identical and differ only in a few props or layout tweaks, merge them into one component with parameters rather than maintaining two separate files.

```tsx
// BAD — two nearly-identical files
GapVisionSection.tsx       // 66 lines
GapVisionCondensedSection.tsx // 50 lines

// GOOD (if they're similar enough) — one file with a variant prop
<GapVision variant="full" />
<GapVision variant="condensed" />
```

**Judgment call:** Only merge when the conditional logic stays simple (1–2 branch points). If merging creates a component full of ternaries, keep them separate.

### DRY audit checklist

Before submitting any code, verify:

- [ ] No raw hex color value in any component — always `var(--t-*)` tokens
- [ ] No JSX block of 5+ lines is copy-pasted between components (extract component)
- [ ] No utility function is defined in more than one file (move to utils/)
- [ ] No TypeScript interface is duplicated across files (move to types/)
- [ ] No Tailwind class string of 4+ classes is duplicated across files (extract constant)
- [ ] No hook logic pattern is repeated across components (extract hook)

---

## Code Review Standards

Every PR is reviewed against these criteria:

1. **File size** — No file exceeds 300 LOC without a documented exception.
2. **Single responsibility** — Each file does one thing.
3. **DRY compliance** — No knowledge is duplicated. The audit checklist above is satisfied.
4. **Import depth** — No file imports from more than 2 directory levels deep. Keep the dependency graph shallow.
5. **Naming** — Files, functions, and variables have descriptive names. No abbreviations except widely understood ones (`props`, `idx`, `ref`).

---

## Tab Routing Rule

Tabs must always be **URL-routed** via the `?tab=` query parameter. Never use plain `useState` for tab state.

### Requirements

- The active tab is derived from `useSearchParams().get("tab")`.
- Clicking a tab calls `router.push("?tab=<id>", { scroll: false })` to update the URL.
- Invalid or missing `?tab=` values fall back to the first tab.
- `useSearchParams` requires a `<Suspense>` boundary — `page.tsx` provides this, and `DeckShell.tsx` contains the routing logic.

### Why this matters

- **Shareability** — a URL like `/?tab=gap` opens the correct tab directly.
- **Browser navigation** — back/forward buttons move between tabs naturally.
- **Refresh persistence** — reloading the page preserves the active tab.
- **Bookmarkability** — users can bookmark specific tabs.

### File split

| File | Role |
|------|------|
| `app/page.tsx` | Server component, renders `<Suspense>` around `<DeckShell />` |
| `app/components/DeckShell.tsx` | Client component, owns tab state via URL params |

---

## Component Layout Rule

Every card or list item that combines **decorative elements** (numbers, icons, badges) with **content** (title, description) must follow a strict internal structure.

### Card structure: decorative top, content below

When a card has a number, icon, or badge, these decorative elements form the **top line** of the card. Title and description sit **below** them in the remaining space. Never place decorative elements on the left with text on the right in a side-by-side layout — this creates awkward vertical alignment.

```
CORRECT                          WRONG
┌──────────────────────┐         ┌──────────────────────┐
│ 01 ⚙                 │         │ 01 ⚙  Title          │
│                       │         │       Description ... │
│ Title                 │         │       continues here  │
│ Description text ...  │         └──────────────────────┘
└──────────────────────┘

ALSO WRONG
┌──────────────────────┐
│ 01                   │
│ ⚙   Title            │
│     Description      │
└──────────────────────┘
```

### Rules

1. **Decorative elements on top** — number + icon sit in a `flex items-center gap-2` row at the top of the card.
2. **Content below** — title and description stack vertically below the decorative row.
3. **Equal-height cards** — use `h-full` on cards within grid layouts so all cards in a row match height.
4. **`flex flex-col`** on the card itself to stack top → content naturally.

### Sequential / journey content: use card grids

When showing numbered steps or a process flow, use a **card grid** — not a vertical list of inline rows. Cards should be arranged in a snake pattern:

```
Row 1:  [01] → [02] → [03]
                         ↓
Row 2:         [05] ← [04]
```

- Top row: left to right with arrow connectors.
- Transition: a down arrow at the end of the top row.
- Bottom row: right to left (reversed data order) with left-arrow connectors.
- Arrows are hidden on mobile; on mobile, cards stack vertically.

### Checklist before shipping any card/list component

- [ ] Are decorative elements (number, icon, badge) on the top row of the card?
- [ ] Is content (title, description) stacked below the decorative row?
- [ ] Do cards in a grid row have equal height?
- [ ] Is sequential content laid out as a card grid, not a vertical list?

---

## Corner Radius Rule

The **outermost container** (`SectionWrapper`) must always have **square corners** — no `rounded-*` classes. Only inner elements (cards, badges, buttons, callouts) may use border-radius.

| Element | Corners |
|---------|---------|
| `SectionWrapper` (outermost border) | **Square** — no rounding, ever |
| `SectionCard` (inner content card) | Rounded (`rounded-3xl`) |
| Content cards, badges, callouts | Rounded (per component needs) |

This creates a clear visual hierarchy: the structural frame is sharp and architectural, while the content within it is soft and approachable.

---

## Theming Rule

All color references in components **must** use CSS variable tokens. Raw hex values are forbidden.

| Task | How |
|------|-----|
| Use a color | `text-[var(--t-heading)]`, `bg-[var(--t-dark)]`, etc. |
| Add a new theme | Add `[data-theme="name"] { ... }` block in `app/themes.css` + entry in `app/constants/themes.ts` |
| Per-tab scoping | Works via CSS cascade from `data-theme` on `<main>` — no prop drilling needed |

The 13 tokens: `--t-heading`, `--t-dark`, `--t-accent`, `--t-label`, `--t-muted`, `--t-inactive`, `--t-icon`, `--t-border`, `--t-card`, `--t-callout`, `--t-border-outer`, `--t-on-dark`, `--t-on-dark-soft`.

---

## Quick Reference

| Rule | Threshold |
|------|-----------|
| Max file size (soft) | 200 LOC |
| Max file size (hard) | 300 LOC |
| DRY trigger | Same code in 2+ places → extract |
| One concern per file | Always |
| Tab state | URL-routed via `?tab=` — never plain `useState` |
| Component layout | `items-start`, decorative elements on one horizontal axis |
| Outermost container corners | Square — no `rounded-*` on `SectionWrapper` |
| Color values | `var(--t-*)` tokens only — never raw hex |
| Exceptions | Must be documented with `FILE-SIZE-EXCEPTION` comment |
