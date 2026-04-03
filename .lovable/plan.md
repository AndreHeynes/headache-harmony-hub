

## Plan: Standardize Color Palette Across the Project

### Problem
Over 30 component files use hardcoded Tailwind colors (blue-600, purple-50, indigo-900, etc.) creating an inconsistent visual identity. The project has a proper design token system in `index.css` but most components bypass it.

### What stays as-is (intentional semantic colors)
- **Progress/comparison colors** in `progressCalculation.ts`: emerald (improved), rose (worsened), amber (unchanged) — these are semantic
- **Exercise category badge colors** in `exerciseCategoryMap.ts` — each category needs a distinct color for visual differentiation
- **Form validation** red borders (e.g., `border-red-500` on invalid inputs)
- **Connection status** green/amber indicators

### Color mapping strategy

All non-semantic decorative colors will be mapped to the design system tokens:

| Current hardcoded | Replacement |
|---|---|
| `bg-blue-50`, `bg-indigo-50`, `bg-purple-50` (info/highlight backgrounds) | `bg-muted` or `bg-accent` |
| `border-blue-100/200`, `border-purple-100` | `border-border` |
| `text-blue-600/700/800`, `text-indigo-900`, `text-purple-900` | `text-primary` or `text-foreground` |
| `from-blue-50 to-purple-50` gradients | `bg-muted` (flat) or `from-muted to-accent` |
| `from-purple-500 to-purple-600` (buttons) | `bg-primary` |
| `bg-green-50 border-green-100` (positive tips) | Keep as semantic |

### Files to update (grouped by area)

**Phase 1** (1 file)
- `DayOneContent.tsx` — blue info box → muted/primary tokens

**Phase 2** (7 files)
- `PhaseTwoContent.tsx` — purple headings, purple gradient → primary/muted tokens
- `ExerciseItem.tsx` — purple gradient button → primary
- `ExerciseTasks.tsx` — purple heading/background → primary/muted
- `ActivitySheetTasks.tsx` — blue gradient → muted
- `ActivitySheet.tsx` — blue icon → primary
- `RegularExerciseDay.tsx` — purple gradient → muted
- `WeeklyReviewDay.tsx` — purple gradient → muted

**Phase 3** (2 files)
- `DaysOneToSevenContent.tsx` — blue info boxes → muted/primary
- `DayEightContent.tsx` — indigo/purple gradient header → muted/primary

**Phase 4** (1 file)
- `PostureEducationSection.tsx` — amber alert icon stays (semantic)

**Questionnaire components** (3 files)
- `QuestionnaireOutcomeFeedback.tsx` — indigo/blue gradient → muted/primary
- `FHTInterpretation.tsx` — blue info box → muted/primary
- `PSFSInterpretation.tsx` — blue info box → muted/primary
- `StandardInterpretation.tsx` — blue "next steps" box → muted/primary (red/amber/green severity stays semantic)

**Document pages** (3 files)
- `MarketingOverview.tsx` — blue/purple/green/yellow/orange cards → use muted with primary accents
- `CurriculumOverview.tsx` — colored left borders → use primary with opacity variants
- `ProgramVisualization.tsx` — colored left borders → primary with opacity variants

**Other** (3 files)
- `Policy.tsx` — blue links → primary
- `CookieConsent.tsx` — blue links → primary
- `BetaSignupSection.tsx` — green success box stays (semantic)
- `HeadacheAnalysis.tsx` — green trend indicators stay (semantic)

### Technical approach

Each file gets a straightforward find-and-replace of color classes. No structural changes, no new files, no database changes. The design tokens (`primary`, `muted`, `accent`, `foreground`, `border`) adapt automatically to light/dark mode.

**Total: ~20 files updated, zero logic changes.**

