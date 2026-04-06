

## Plan: Color Standardization + Calendar Date Integration

### Part 1: Standardize Remaining Hardcoded Colors

Replace `bg-white`, `text-neutral-*`, `bg-neutral-*`, `hover:bg-neutral-*`, `bg-gray-*`, `text-gray-*` with semantic design tokens across all remaining files.

**Files to update (token mapping):**
- `bg-white` → `bg-card`
- `bg-neutral-50/100` → `bg-muted`
- `bg-neutral-800` → `bg-primary`
- `bg-gray-50` → `bg-muted`
- `text-neutral-500/600` → `text-muted-foreground`
- `text-neutral-700/800/900` → `text-foreground`
- `text-gray-600/900` → `text-muted-foreground` / `text-foreground`
- `hover:bg-neutral-100` → `hover:bg-accent`
- `hover:bg-white/80` → `hover:bg-accent`
- `border-neutral-200` → `border-border`
- `text-green-500` on task completion icons stays (semantic)

**Affected files (~13):**
- `src/components/phase-one/PhaseOneLayout.tsx` (2 instances)
- `src/components/phase-three/PhaseThreeTaskList.tsx` (1)
- `src/components/phase-two/tasks/WeeklyReviewTasks.tsx` (6)
- `src/components/phase-two/PhaseTwoTaskList.tsx` (1)
- `src/components/phase-two/tasks/TaskItem.tsx` (3)
- `src/components/phase-two/exercise/EmptyExerciseDay.tsx` (2)
- `src/components/phase-two/exercise/ExerciseExpandableContent.tsx` (1)
- `src/components/phase-two/ExerciseVideo.tsx` (1)
- `src/components/phase-two/ExerciseItem.tsx` (1)
- `src/pages/Policy.tsx` (2)
- `src/pages/SignIn.tsx` (2)
- `src/pages/Register.tsx` (2)
- `src/pages/LearnMore.tsx` (~20 instances)
- `src/pages/BetaSignup.tsx` (1)
- `src/pages/documents/PhaseOneGuide.tsx` (3)

---

### Part 2: Calendar with Real Dates

**Concept:** When a user registers and enters Phase 2, the calendar grid shows actual calendar dates (e.g., "6 Apr", "7 Apr") instead of just "Day 1", "Day 2". This requires:

1. **Store Phase 2 start date** — Add a `phase_two_start_date` column (type `date`, nullable) to `user_progress`. Set it when `current_phase` advances to 2.

2. **Calculate real dates** — In `PhaseTwoCalendar.tsx`, fetch `phase_two_start_date` from `user_progress`. For each program day, compute:
   ```
   actual_date = phase_two_start_date + (day - 1) days
   ```
   Display the actual date (e.g., "6 Apr") below the day number in each cell. Show estimated end date in the header.

3. **Week labels** — Instead of just "Week 3", show "Week 3 (20 Apr – 26 Apr)".

4. **Program end date** — Show "Program ends: [date]" calculated as `start_date + 76 days`.

**Database migration:**
```sql
ALTER TABLE public.user_progress
ADD COLUMN phase_two_start_date date;
```

**Files changed:**
- `src/components/phase-two/PhaseTwoCalendar.tsx` — Add date display per cell, week date range, end date
- `src/pages/PhaseTwo.tsx` — Fetch and pass `phase_two_start_date` to calendar
- `src/hooks/usePhaseAdvancement.ts` — Set `phase_two_start_date = CURRENT_DATE` when advancing to Phase 2

**Visual result:**
```text
┌─ Week 6 (11 May – 17 May) ──────────────────┐
│  ◀ Week 5                       Week 7 ▶     │
│                                               │
│  Mon      Tue      Wed      Thu      Fri ...  │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐     │
│  │ 36 │  │ 37 │  │ 38 │  │ 39 │  │ 40 │     │
│  │11May│  │12May│  │13May│  │14May│  │15May│  │
│  │  ✓ │  │  ✓ │  │  ● │  │    │  │    │     │
│  └────┘  └────┘  └────┘  └────┘  └────┘     │
│                                               │
│  Program ends: 21 Jun 2026                    │
└───────────────────────────────────────────────┘
```

---

### Summary

- ~15 files: color token standardization (straightforward find-and-replace)
- 1 DB migration: add `phase_two_start_date` column
- 3 files modified for date-aware calendar
- No breaking changes

