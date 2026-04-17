<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:dev-standards -->
# Engineering Standards

Read and follow `DEV_GUIDE.md` before writing any code. Key rules:
- **200–300 LOC max per file.** Refactor if exceeded. Document exceptions with `FILE-SIZE-EXCEPTION` comment.
- **DRY is a hard rule.** No duplicated code, colors, types, class strings, or logic across files. Extract to shared components, utils, constants, hooks, or types.
- **One concern per file.** If you can't describe the file's purpose in one sentence, split it.
<!-- END:dev-standards -->

<!-- BEGIN:theming-rules -->
# Theming Rules

- **Never use raw hex color values** in components. Always use CSS variable tokens: `text-[var(--t-heading)]`, `bg-[var(--t-dark)]`, etc.
- The full token set is defined in `app/themes.css`. The 13 tokens are: `--t-heading`, `--t-dark`, `--t-accent`, `--t-label`, `--t-muted`, `--t-inactive`, `--t-icon`, `--t-border`, `--t-card`, `--t-callout`, `--t-border-outer`, `--t-on-dark`, `--t-on-dark-soft`.
- To add a new theme: create a `[data-theme="name"]` block in `app/themes.css` and add an entry to `THEMES` in `app/constants/themes.ts`.
<!-- END:theming-rules -->
