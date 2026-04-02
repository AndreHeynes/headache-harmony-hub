

## Plan: Full Phase 4 Implementation

This plan transforms Phase 4 from a static UI prototype into a fully functional maintenance program builder, addressing all identified gaps.

---

### Overview

The work breaks into 6 major deliverables, built in sequence:

1. **Database table for maintenance programs**
2. **Exercise Library wired to real data with FHT filtering**
3. **Functional Goal Setting with visual goal card and countdown**
4. **Program Builder with state management (diary, schedule, 4x weekly)**
5. **Return to Sport/Training guidance section**
6. **Posture Education section**

---

### 1. Database: `maintenance_programs` table

Create a new table to persist user-built programs:

```
maintenance_programs
- id (uuid, PK)
- user_id (uuid, NOT NULL)
- goals (jsonb) — array of SMART goals with target dates
- selected_exercises (jsonb) — exercise IDs + sets/reps config
- weekly_schedule (jsonb) — day-to-exercise mapping
- sport_plan (jsonb) — return-to-sport progression notes
- created_at, updated_at (timestamptz)
```

RLS: users can only CRUD their own rows (`auth.uid() = user_id`).

---

### 2. Exercise Library — Real Data + FHT Filtering

**File: `ExerciseLibrary.tsx` (rewrite)**

- Import exercises from `src/utils/exercises/data/index.ts`
- Import `getRecommendedExercises` from `src/utils/exercises/filters.ts`
- Fetch the user's FHT questionnaire response using `useQuestionnaireResponses`
- Filter the exercise list through `getRecommendedExercises(fhtResponse)` so Neural (Set 4) and TMJ (Set 6) tabs only appear for qualifying users
- Categorize exercises into tabs: Neck Mobility, Neck Stability, Neck Stretches, Sensorimotor, Neural (conditional), TMJ (conditional)
- Add exercise category metadata — each exercise needs a `category` field; map existing exercises to categories based on their data files (e.g., `chin-neck` → Mobility, `neck-strength-*` → Stability, `scalenes/pec/levator` → Stretches, `combined-movement` → Sensorimotor)
- Checkbox selection state lifted to parent `PhaseFour.tsx` via props/context

---

### 3. Goal Setting — Enhanced with Visual Goal + Countdown

**File: `GoalSettingSection.tsx` (rewrite)**

- Add form fields for each SMART component (not just a single textarea):
  - **Specific**: What exactly do you want to achieve?
  - **Measurable**: How will you measure progress?
  - **Achievable**: What steps will you take?
  - **Relevant**: Why does this matter to you?
  - **Time-bound**: Target date picker
- **Visual Goal Card**: Once filled, render a styled "goal preview card" showing the goal description with a visual representation (icon/color-coded card the user can see in their diary)
- **Personal Countdown Timer**: Calculate days remaining from today to target date; display as a countdown badge (replaces the current "access expires" timer concept)
- **Multiple Goals**: Allow adding up to 3 SMART goals
- **AS3/AS4 Quick Access**: Keep Sleep Hygiene and Trigger Management links but make them expandable inline panels that load the user's saved `activity_sheet_progress` data for `AS3` and `AS4`, rather than linking away to Phase 2

---

### 4. Program Builder — State Management + Diary Format

**File: `ProgramBuilder.tsx` (rewrite)**

- Receive selected exercises from Exercise Library
- For each selected exercise, show sets/reps controls (already prototyped)
- **Weekly Schedule Grid**: Interactive — user drags or assigns exercises to days; enforce minimum 4 active days with visual indicator ("4/7 days scheduled — meets recommended frequency")
- **Diary View**: New tab/toggle within this section showing a week-at-a-glance diary format where exercises appear as entries the user can check off. Goals appear highlighted at the top of the diary
- **Completion Tracking**: Log exercise completions to `exercise_completions` table with `phase: 4`

**New hook: `useMaintenanceProgram.ts`**
- CRUD operations against `maintenance_programs` table
- Auto-save on changes (debounced)
- Load existing program on mount

---

### 5. Return to Sport/Training Section

**New file: `src/components/phase-four/ReturnToSportSection.tsx`**

Content-driven component with two sub-sections:

**A. External Training Guidance**
- Recommendation to start with a Personal Trainer
- HIT (High Intensity Training) evidence summary card
- Low-impact training alternatives card
- Progressive overload principles

**B. Return to Running Progression**
- Visual 4-stage progression timeline:
  1. Short slow runs
  2. Short faster runs
  3. Long slow runs
  4. Long faster runs
- Each stage has a checkbox/completion marker
- Optional notes field per stage for the user to track their experience
- Persisted in `maintenance_programs.sport_plan`

---

### 6. Posture Education Section

**New file: `src/components/phase-four/PostureEducationSection.tsx`**

Educational content component:

- Explanation that posture-headache correlation is weak, but Forward Head Posture (FHP) at desks can theoretically impact headache experience
- **Relaxed Sitting Exercise** — step-by-step guide:
  1. Sit as far back into your chair
  2. Slouch naturally — back from buttocks to shoulder blades relaxed into chair (not pushed)
  3. Adjust monitor to eye level — no chin lift or drop needed
- Illustrated with a simple diagram or placeholder image
- Checkbox: "I've set up my workstation" (persisted as a task completion)

---

### 7. Page Assembly Update

**File: `PhaseFour.tsx`**

- Add React state context for selected exercises, goals, and schedule
- Wire all sections together with shared state
- Add new sections in order: Goal Setting → Exercise Library → Program Builder → Return to Sport → Posture Education → Review/Summary
- Make the wizard stepper in `PhaseProgress.tsx` functional (clickable steps, active state tracks scroll position or explicit navigation)

---

### Technical Details

| Concern | Approach |
|---|---|
| State management | React `useState` + context in `PhaseFour.tsx`; no Redux needed |
| Persistence | New `useMaintenanceProgram` hook using Supabase `maintenance_programs` table |
| FHT data access | `useQuestionnaireResponses().getResponse('fht', 1)` — already available |
| Exercise categories | Add `category` mapping utility in `src/utils/exercises/exerciseCategoryMap.ts` |
| Existing hooks reused | `useQuestionnaireResponses`, `useCurrentUser`, `useActivitySheetProgress` |
| New DB migration | Single migration for `maintenance_programs` table + RLS policies |

