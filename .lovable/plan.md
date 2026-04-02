

## Plan: Lock PSFS Activity Names in Phase 3

### Problem
When a user takes the PSFS in Phase 3, the activity text fields from Phase 1 are pre-populated (the fetch logic in `Questionnaire.tsx` lines 49-67 already works), but the text inputs remain **editable**. Users could change the activity names, breaking the before/after comparison.

### What's already working (no changes needed)
- **HIT-6 comparison**: Phase 1 score vs Phase 3 score — fetched, compared, displayed correctly
- **MIDAS comparison**: Phase 1 score vs Phase 3 score — fetched, compared, displayed correctly
- **PSFS comparison**: Activity-by-activity matching by ID (`psfs-activity1`, etc.) — works correctly in `useProgressData`
- **GPOC**: Phase 3 only, no comparison needed — works correctly
- **DayEightContent**: Renders all comparisons with color-coded cards, percentage changes, and direction indicators

### Fix needed: 1 file change

**`src/components/questionnaire/QuestionnaireSection.tsx`**

In the `text` input renderer, detect when the question is a PSFS activity field AND the value was pre-populated (i.e., it has an initial value). Make the input **read-only** with a visual indicator (grayed-out background, lock icon or label saying "From Phase 1").

This requires passing an additional prop (e.g., `readOnlyFields?: string[]`) from `QuestionnaireForm` → `QuestionnaireSection`, which `QuestionnaireForm` populates when `questionnaire.id === 'psfs'` and Phase 1 activities exist in `initialAnswers`.

### Technical detail

1. **`QuestionnaireForm.tsx`**: Derive a `readOnlyFields` array from `initialAnswers.savedActivities` IDs (e.g., `['psfs-activity1', 'psfs-activity2']`). Pass to `QuestionnaireSection`.

2. **`QuestionnaireSection.tsx`**: Accept `readOnlyFields` prop. When rendering a `text` type question whose ID is in `readOnlyFields`, set `readOnly={true}` and apply `bg-neutral-100 cursor-not-allowed` styling with a small label "Activity from Phase 1".

No database changes. No new files. The comparison display system is already complete.

