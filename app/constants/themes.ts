// FILE-SIZE-EXCEPTION: flat data-definition file — theme entries and section groupings

const COOL_SECTION = {
  label: "Cool",
  themes: [
    { id: "ocean",    name: "Ocean",    swatch: "#1a3d5c" },
    { id: "arctic",   name: "Arctic",   swatch: "#143862" },
    { id: "cerulean", name: "Cerulean", swatch: "#0d3060" },
    { id: "cobalt",   name: "Cobalt",   swatch: "#101e58" },
    { id: "teal",     name: "Teal",     swatch: "#0f3d48" },
    { id: "midnight", name: "Midnight", swatch: "#141450" },
  ],
} as const;

const WARM_SECTION = {
  label: "Warm",
  themes: [
    { id: "amber",   name: "Amber",   swatch: "#463010" },
    { id: "sunset",  name: "Sunset",  swatch: "#6b2d0e" },
    { id: "copper",  name: "Copper",  swatch: "#4a2410" },
    { id: "ember",   name: "Ember",   swatch: "#4a1a10" },
    { id: "crimson", name: "Crimson", swatch: "#48101e" },
  ],
} as const;

const NATURAL_SECTION = {
  label: "Natural",
  themes: [
    { id: "forest", name: "Forest", swatch: "#1a4028" },
    { id: "moss",   name: "Moss",   swatch: "#243018" },
    { id: "sage",   name: "Sage",   swatch: "#243830" },
    { id: "olive",  name: "Olive",  swatch: "#383618" },
    { id: "sand",   name: "Sand",   swatch: "#4a3c1a" },
  ],
} as const;

const VIBRANT_SECTION = {
  label: "Vibrant",
  themes: [
    { id: "lavender", name: "Lavender", swatch: "#3d1a5c" },
    { id: "amethyst", name: "Amethyst", swatch: "#301448" },
    { id: "berry",    name: "Berry",    swatch: "#380e4e" },
    { id: "rose",     name: "Rose",     swatch: "#6b1232" },
    { id: "fuchsia",  name: "Fuchsia",  swatch: "#501250" },
  ],
} as const;

const NEUTRAL_SECTION = {
  label: "Neutral",
  themes: [
    { id: "slate",     name: "Slate",     swatch: "#2a3244" },
    { id: "graphite",  name: "Graphite",  swatch: "#252b34" },
    { id: "charcoal",  name: "Charcoal",  swatch: "#282828" },
    { id: "warm-gray", name: "Warm Gray", swatch: "#2c2820" },
    { id: "obsidian",  name: "Obsidian",  swatch: "#101520" },
  ],
} as const;

export const THEME_SECTIONS = [
  COOL_SECTION,
  WARM_SECTION,
  NATURAL_SECTION,
  VIBRANT_SECTION,
  NEUTRAL_SECTION,
] as const;

export const THEMES = [
  ...COOL_SECTION.themes,
  ...WARM_SECTION.themes,
  ...NATURAL_SECTION.themes,
  ...VIBRANT_SECTION.themes,
  ...NEUTRAL_SECTION.themes,
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
export const DEFAULT_THEME: ThemeId = "ocean";
