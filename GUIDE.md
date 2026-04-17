# SlideNexus — Project Guide

This document describes the structure, conventions, and design system used in this project so that any engineer can build new presentation decks or modify existing ones consistently.

---

## Overview

SlideNexus is a **topic-agnostic** presentation-style web app built with **Next.js** and **Tailwind CSS**. It provides a framework for organizing narrative slides into tabs, iterating on them, and referencing them precisely.

The framework is content-independent. Tabs, slides, and labels are not tied to any particular subject matter. A deck about "Data Modeling" will have different tabs and slides than one about "Customer Onboarding" or "Security Architecture," but they all follow the same structural and visual conventions described below.

---

## Tab System

The top-level page (`app/page.tsx`) wraps `DeckShell` in a `<Suspense>` boundary. `DeckShell` (`app/components/DeckShell.tsx`) renders the **sticky tab navigation bar** and all tab content. Each tab represents a narrative section of the presentation.

### How tabs work

- Tabs are managed by `useTabManager` in `app/hooks/useTabManager.ts` and defined via `INITIAL_TABS` in `DeckShell.tsx`. Each `TabConfig` carries an `id`, `label`, and `slides` array (slide component list).
- The active tab is **synced to the URL** via the `?tab=` query parameter (e.g., `/?tab=gap`). This means:
  - Switching tabs updates the browser URL.
  - Sharing a URL opens the correct tab directly.
  - Browser back/forward navigation moves between tabs.
  - Refreshing the page preserves the active tab.
- If the `?tab=` parameter is missing or invalid, the first tab is shown as the default.
- The active tab has an underline indicator. Slides for the active tab are rendered via `.map()` — no manual conditional blocks needed.
- Tab names are chosen by the deck creator to match their narrative structure.

### Example (current deck)

The current deck uses these tabs as an example, but a different topic would have entirely different tabs:

| Tab ID         | Label         |
|----------------|---------------|
| `problem`      | Problem       |
| `gap`          | Gap           |
| `user-journey` | User Journey  |
| `next-steps`   | Next Steps    |

A different deck might use tabs like "Context", "Approach", "Results", "Roadmap" — the framework doesn't prescribe tab names.

### Adding a new tab (runtime)

Click the **`+`** button at the end of the tab bar. This:

1. Appends a new tab with 2 placeholder slides (`SampleSlideA`, `SampleSlideB`).
2. Automatically assigns the next available Greek prefix based on tab position.
3. Navigates to the new tab via `?tab=<id>`.

Tab state is **in-memory only** — refreshing the page resets to the 4 default tabs. To persist a new tab, add it to `INITIAL_TABS` in `DeckShell.tsx` with its slide components.

### Deleting a tab (runtime)

Click the **`×`** button next to a tab label. Rules:

- The `×` button is only shown when **3 or more tabs** exist (minimum floor is 2 tabs).
- Any tab can be deleted — no tab is permanently locked.
- If the active tab is deleted, navigation falls back to the first tab.
- Greek prefixes recalculate automatically for remaining tabs (positional, not stored).

### Adding a new tab (code — permanent)

1. Create slide components in `app/components/`.
2. Add an entry to `INITIAL_TABS` in `DeckShell.tsx` with `id`, `label`, and `slides` array.
3. URL routing is automatic — the new tab ID becomes a valid `?tab=` value.

---

## Naming Convention (Alpha, Beta, Gamma, Delta...)

Each slide component gets a **unique label** displayed as a small pill badge above it. This allows anyone (designer, PM, engineer) to reference a specific slide unambiguously, regardless of the topic.

### How it works

- The **first tab** uses the prefix **Alpha**, the second uses **Beta**, the third uses **Gamma**, the fourth uses **Delta**, and so on following the Greek alphabet (Epsilon, Zeta, Eta, Theta...).
- Within each tab, slides are numbered sequentially: Alpha-1, Alpha-2, Alpha-3, etc.
- Each number represents a different **iteration** or **variation** of the same narrative section — not a different topic.

### Example (current deck)

| Tab           | Prefix   | Current assignments                           |
|---------------|----------|-----------------------------------------------|
| Problem       | Alpha    | Alpha-1, Alpha-2, Alpha-3                     |
| Gap           | Beta     | Beta-1, Beta-2, Beta-3                        |
| User Journey  | Gamma    | Gamma-1, Gamma-2                              |
| Next Steps    | Delta    | Delta-1, Delta-2                              |

### Rules

- The prefix is determined by the **tab position** (1st tab = Alpha, 2nd = Beta, etc.), not by the tab's content or name.
- Number sequentially starting from 1.
- When adding a new iteration of a slide, increment the number (e.g., `Alpha-4`).
- The label is rendered by the `<Labeled name="Alpha-1">` wrapper component defined in `page.tsx`.
- Labels sit **above** the component box (not overlapping it).
- If a fifth tab is added, its prefix would be **Epsilon**. The full sequence: Alpha, Beta, Gamma, Delta, Epsilon, Zeta, Eta, Theta, Iota, Kappa, Lambda, Mu...

---

## Component Anatomy

Every slide component follows a consistent two-layer container structure, regardless of its content:

### 1. SectionWrapper (outer border box)

```
┌─────────────────────────────────────┐
│  SECTION LABEL (uppercase, tracked) │
│                                     │
│  ┌─────────────────────────────────┐│
│  │  SectionCard (inner content)    ││
│  │  ...                            ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

- **`SectionWrapper`** — A `max-w-[1160px]` box with a light border (`border-[#d5e1ed]`), **square corners** (no border-radius), and `p-6` padding. Displays a bold uppercase label at the top. The label describes the slide's purpose (e.g., "PROBLEM", "APPROACH", "RESULTS"). The outermost container must always have square corners — only inner elements may be rounded.
- **`SectionCard`** — A rounded card (`rounded-3xl`) with a blue-tinted background (`bg-[#eaf1f8]`), border (`border-[#c0d4ea]`), and `p-8` padding. This is where all content lives.

Both are defined in `app/components/shared.tsx` and should be used by every slide component.

### Usage

```tsx
import { SectionWrapper, SectionCard } from "./shared";

export default function MyNewSection() {
  return (
    <SectionWrapper label="My Section">
      <SectionCard>
        {/* Content goes here */}
      </SectionCard>
    </SectionWrapper>
  );
}
```

---

## Color Palette & Theming

SlideNexus uses a CSS custom property token system that supports 10 interchangeable themes. Components never use raw hex values — they reference the 13 semantic tokens defined in `app/themes.css`.

### CSS Variable Tokens

| Token              | CSS Variable         | Ocean default | Usage                              |
|--------------------|----------------------|---------------|------------------------------------|
| Heading            | `--t-heading`        | `#0f2a45`     | Primary heading text               |
| Dark BG            | `--t-dark`           | `#1a3d5c`     | Dark card backgrounds, pill        |
| Accent             | `--t-accent`         | `#2a6496`     | Highlighted text, underline        |
| Label              | `--t-label`          | `#4a7a9e`     | Subheadings, CTAs, icons           |
| Muted              | `--t-muted`          | `#6b8eae`     | Descriptions, secondary text       |
| Inactive           | `--t-inactive`       | `#8aa0b8`     | Inactive tab text                  |
| Icon               | `--t-icon`           | `#94b0c8`     | Icons, subtle decorative elements  |
| Border             | `--t-border`         | `#c0d4ea`     | Inner borders, card borders        |
| Card BG            | `--t-card`           | `#eaf1f8`     | SectionCard background             |
| Callout BG         | `--t-callout`        | `#f0f6fc`     | Callout panel background           |
| Border Outer       | `--t-border-outer`   | `#d5e1ed`     | SectionWrapper border, nav borders |
| On Dark            | `--t-on-dark`        | `#ffffff`     | Text on dark backgrounds           |
| On Dark Soft       | `--t-on-dark-soft`   | `#bfdbfe`     | Secondary text on dark backgrounds |

### Usage in components

```tsx
// Correct — theme-aware
<h3 className="text-[var(--t-heading)]">...</h3>
<div className="bg-[var(--t-dark)]">...</div>

// Wrong — hard-coded, breaks theming
<h3 className="text-[#0f2a45]">...</h3>
```

### Available themes

Ocean (default), Forest, Sunset, Lavender, Slate, Rose, Ember, Teal, Sand, Midnight.

Theme switching is instant via CSS cascade — `data-theme` attributes on the outer wrapper (`DeckShell`) and per-tab `<main>` wrapper drive all color changes.

### Backgrounds for content cards within slides

- **Light card:** `bg-white/80` — for neutral content items
- **Dark card:** `bg-[var(--t-dark)]` — for emphasized items (text: `text-[var(--t-on-dark)]` / `text-[var(--t-on-dark-soft)]`)
- **Highlighted callout:** `bg-[var(--t-callout)] border border-[var(--t-border)]` — for key statements

### Card layout alignment

Every card that pairs decorative elements (numbers, icons) with text content must follow these rules:

- **Decorative elements on top** — numbers and icons form the first row of the card. Title and description sit below them, never beside them.
- **`flex flex-col`** on the card, with the decorative row using `flex items-center gap-2`.
- **Equal-height cards** — use `h-full` within grid layouts so all cards in a row match.
- **Sequential/journey content** — use card grids with a snake-flow pattern (row 1 left→right, row 2 right→left with arrow connectors), not vertical lists of inline rows.

See `DEV_GUIDE.md` → Component Layout Rule for the full specification and checklist.

---

## Typography Conventions

| Element                     | Classes                                                  |
|-----------------------------|----------------------------------------------------------|
| Section label (wrapper)     | `text-lg font-semibold tracking-widest uppercase`        |
| Slide heading               | `text-xl font-semibold text-[#0f2a45] leading-snug`     |
| Sub-section label           | `text-sm font-medium text-[#4a7a9e] tracking-wide uppercase` |
| Card item title             | `text-sm font-semibold text-white` (on dark bg)          |
| Card item title             | `text-sm font-medium text-[#0f2a45]` (on light bg)      |
| Description text            | `text-xs text-[#6b8eae] leading-relaxed`                |
| CTA / callout               | `text-sm text-[#4a7a9e] italic`                         |
| Accent inline text          | `text-[#2a6496]` with optional `font-semibold`          |

---

## Shared Utility Components

Defined in `app/components/shared.tsx`:

| Component        | Purpose                                                     |
|------------------|-------------------------------------------------------------|
| `SectionWrapper` | Outer border box with uppercase label                       |
| `SectionCard`    | Inner rounded card with blue background                     |
| `NegationList`   | List of items with X icons (for "what's missing" patterns)  |

Icons are defined in `app/components/Icons.tsx`:

| Component  | Purpose                                          |
|------------|--------------------------------------------------|
| `Icon`     | Renders a named icon from the `ICON_PATHS` map   |
| `XIcon`    | Small X mark icon for negation lists             |

---

## File Structure

```
app/
├── page.tsx                          # Suspense boundary, renders DeckShell
├── components/
│   ├── DeckShell.tsx                 # Tab navigation + Labeled wrapper + URL routing
│   ├── shared.tsx                    # SectionWrapper, SectionCard, NegationList
│   ├── Icons.tsx                     # Icon, XIcon
│   ├── SampleSlideA.tsx              # Placeholder card-grid slide (used by new tabs)
│   ├── SampleSlideB.tsx              # Placeholder list slide (used by new tabs)
│   └── [SlideComponents].tsx         # One file per slide (see naming convention)
├── hooks/
│   ├── useTheme.ts                   # Global + per-tab theme state
│   └── useTabManager.ts              # Add/remove tab state, canDelete logic
├── utils/
│   └── greekPrefix.ts                # Positional Greek letter derivation
└── types/
    └── deck.ts                       # TabConfig interface
```

### Current deck example

The files below are specific to the current deck topic. A different deck would have different component files, but they'd follow the same patterns:

```
├── ProblemSection.tsx            # Alpha-1
├── ProblemCondensedSection.tsx   # Alpha-2
├── ProblemCleanSection.tsx       # Alpha-3
├── GapSection.tsx               # Beta-1
├── GapVisionSection.tsx         # Beta-2
├── GapVisionCondensedSection.tsx # Beta-3
├── UserJourneySection.tsx       # Gamma-1
├── UserJourneyCondensedSection.tsx # Gamma-2
├── ArchitectureSection.tsx      # Delta-1
└── ImpactSection.tsx            # Delta-2
```

---

## Adding a New Slide

1. **Create the component** in `app/components/`. Use `SectionWrapper` and `SectionCard` as the outer structure.
2. **Import it** in `app/components/DeckShell.tsx`.
3. **Add it to the correct tab's `slides` array** in `INITIAL_TABS`. The `<Labeled>` wrapper and Greek prefix are generated automatically from the slide's position.
4. **Follow the naming convention** — Greek letter prefix is positional (tab index), slide number is the index within the `slides` array.
5. **Use the color palette and typography conventions** above for consistency.
6. **Use SVG icons inline** for visuals — keep them as small functional components within the file or add them to `Icons.tsx` if reusable.

---

## Starting a New Deck (Different Topic)

To create an entirely new presentation on a different topic:

1. **Define your tabs** — choose tab names that match your narrative structure (e.g., "Context", "Approach", "Demo", "Roadmap"). Update the `tabs` array in `page.tsx`.
2. **Create slide components** — one `.tsx` file per slide, each using `SectionWrapper` + `SectionCard`.
3. **Apply the naming convention** — first tab gets Alpha prefix, second gets Beta, etc. This is automatic based on tab position, not content.
4. **Reuse the design system** — colors, typography, shared components, and container structure stay the same across all decks. The visual consistency is the point.
5. **Iterate freely** — add Alpha-2, Alpha-3, etc. as you refine each section. Old iterations stay visible for comparison.

---

## Design Principles

- **Topic-agnostic framework** — the tab system, naming convention, and visual design work for any subject matter. The framework provides structure; the creator provides content.
- **Each slide is an iteration**, not a replacement. Multiple versions of the same narrative section live under one tab so they can be compared and discussed.
- **Consistency over creativity** — every slide uses the same container structure, colors, and typography regardless of content.
- **Labels are for communication** — the Alpha/Beta naming exists so slides can be referenced precisely in conversations and feedback, without ambiguity.
- **Self-contained components** — each slide component should be independently renderable. No cross-component state (except the tab selector in `page.tsx`).
