

## Plan: Fix FHT-Based Exercise Filtering in Phase 2

### Problem
Phase 2 shows TMJ (Set 6) and Neural/Occipital (Set 4) exercises to ALL users regardless of their FHT questionnaire answers. The `getExercisesForDay()` function accepts an FHT response but ignores it, and `PhaseTwoContent` never passes one.

Phase 4's Exercise Library is already correctly filtering — this fix brings Phase 2 to parity.

### Solution
Apply `getRecommendedExercises()` as a post-filter on each day's hardcoded exercise list, removing exercises the user shouldn't see based on their FHT results.

### Changes

**1. `src/components/phase-two/PhaseTwoContent.tsx`**
- Import `useQuestionnaireResponses` hook
- Fetch the user's FHT response on mount
- Pass it to `getExercisesForDay(day, fhtResponse)`

**2. `src/utils/exercises/schedules/dailyExercises.ts`**
- After the hardcoded day function returns its exercise list, cross-filter it against `getRecommendedExercises(fhtResponse)`
- Only return exercises that appear in both the day's list AND the user's recommended set
- This preserves the daily schedule structure while removing exercises the user shouldn't see (e.g., TMJ exercises for non-Set-6 users, Neural exercises for non-Set-4 users)

**3. `src/components/phase-two/DailyExerciseList.tsx`**
- Pass the FHT response through to weekly review day functions so they also get filtered

### How it works

```text
Day's hardcoded exercises ──┐
                            ├── intersection ──> Filtered daily list
User's FHT-recommended set ─┘
```

The hardcoded daily schedules stay as-is (they define the program structure). The FHT filter removes exercises the user doesn't qualify for. For users with no FHT data, only `isGeneralExercise` exercises are shown (existing fallback behavior in `filters.ts`).

### No database changes required
The FHT response is already stored in `user_responses` and retrieved via `useQuestionnaireResponses`.

