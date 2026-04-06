

## Phase 2: Calendar Redesign — Visual Comparison

### Current Design (what exists now)

```text
┌─────────────────────────────────────────────────┐
│  ← Previous                          Next →     │
│                                                  │
│  Jump to day: [Day 42 ▼]    Show videos as: Links│
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │Phase Card│  │Task List │  │Timeline  │      │
│  │Day 42/77 │  │☐ Exercise│  │Phase 1 ✓ │      │
│  │Week 6    │  │☐ AS      │  │Phase 2 ● │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ Day 42 Content                          │    │
│  │ (Full exercise list shown immediately)  │    │
│  │ Exercise 1, Exercise 2, Exercise 3...   │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

**Problems:** Dropdown day selector is hard to navigate. No visual sense of weekly structure. No calendar overview. Can't see which days are done.

---

### New Design (proposed calendar/diary format)

```text
┌─────────────────────────────────────────────────┐
│  Building your recovery foundation              │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │Phase Card│  │Task List │  │Timeline  │      │
│  │Day 42/77 │  │(for      │  │Phase 1 ✓ │      │
│  │Week 6    │  │ selected │  │Phase 2 ● │      │
│  └──────────┘  │ day)     │  └──────────┘      │
│                └──────────┘                     │
│                                                  │
│  ┌─ Week 6 ──────────────────────────────────┐  │
│  │  ◀ Week 5              Week 7 ▶           │  │
│  │                                            │  │
│  │  Mon    Tue    Wed    Thu    Fri   Sat  Sun│  │
│  │  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐ ┌──┐│  │
│  │  │36│  │37│  │38│  │39│  │40│  │41│ │42││  │
│  │  │ ✓│  │ ✓│  │ ✓│  │ ✓│  │ ✓│  │ ✓│ │⬤ ││  │
│  │  └──┘  └──┘  └──┘  └──┘  └──┘  └──┘ └──┘│  │
│  │                                    ▲       │  │
│  │                              selected day  │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌─ Day 42 (Sunday — Review Day) ────────────┐  │
│  │                                            │  │
│  │  Today's Exercises          Activity Sheet │  │
│  │  ┌────────────────┐  ┌────────────────┐   │  │
│  │  │ Exercise 1     │  │ AS: Triggers   │   │  │
│  │  │ 🎬 Video       │  │ [Open →]       │   │  │
│  │  │ 3x12 reps      │  └────────────────┘   │  │
│  │  └────────────────┘                        │  │
│  │  ┌────────────────┐   Daily Reminders     │  │
│  │  │ Exercise 2     │  • Stay hydrated      │  │
│  │  │ 🎬 Video       │  • Screen breaks      │  │
│  │  │ Hold 30s       │  • Track symptoms     │  │
│  │  └────────────────┘                        │  │
│  └────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**Key differences:**
- **Weekly calendar grid** replaces the dropdown — you see Mon–Sun with day numbers
- **Visual status indicators** — completed days (✓), current/selected day (●), future days (empty)
- **Week navigation** — arrow buttons to move between weeks
- **Tap-to-expand** — clicking a day cell opens that day's full content below
- **Review days** (every 7th day) get a distinct visual treatment

---

### PSFS in Phase 3 — Already Correct

Your concern is valid but the implementation already handles this correctly:

- **Activity names** (e.g., "Driving", "Reading") → locked as read-only, pre-filled from Phase 1
- **Rating numbers** (0–10 radio buttons) → fully interactive, the user selects new ratings in Phase 3
- The comparison on Day 8 then shows Phase 1 rating vs Phase 3 rating side by side

No changes needed for PSFS.

---

### Implementation Plan

**New component: `PhaseTwoCalendar.tsx`**
- Weekly grid showing 7 day cells per row
- Each cell shows: day number, completion status icon, "Review" label for day 7/14/21...
- Week navigation (prev/next week arrows)
- Clicking a cell sets `currentDay` and scrolls to expanded content below
- Completed days pulled from `useTaskCompletions` or `useExerciseCompletions`

**Modified: `PhaseTwo.tsx`**
- Replace the dropdown selector and prev/next day buttons with the new `PhaseTwoCalendar`
- Keep the expanded day content area (`PhaseTwoContent`) below the calendar
- Current week auto-calculated from `currentDay`

**Modified: `CurrentPhaseCard.tsx`**
- Add week number display alongside day count

**Files changed:** 3 modified, 1 new component

