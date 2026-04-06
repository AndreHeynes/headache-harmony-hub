

## Comprehensive Technical Review: Phases 1–4

### Questionnaire Count

Phase 1 currently shows **9 unique questionnaires** spread across Days 2–7: HIT-6, FHT, PSFS, MKQ, MIDAS, HSLOC, PSC, HSES, HB. However, the same questionnaires appear on multiple days (e.g., MKQ on Days 2, 3, 4, 5; PSFS on Days 2, 3, 5). Once completed, they disappear from all days. The `headache-type.ts` questionnaire exists in the data folder but is **never referenced** in any route or day content — it appears to be an unused duplicate of FHT. Confirming: 9 active questionnaires match your requirement.

---

### CRITICAL: Broken Questionnaire Routing

**The `/questionnaire` route in App.tsx has NO `:id` parameter**, yet every questionnaire link in the app points to `/questionnaire/hit-6`, `/questionnaire/fht`, etc. The `Questionnaire.tsx` page calls `useParams<{ id: string }>()` expecting an `id` param.

**Current route:** `<Route path="/questionnaire" element={...} />`
**Required:** `<Route path="/questionnaire/:id" element={...} />`

This means **clicking any questionnaire link currently renders a "Questionnaire Not Found" screen.** This is the highest-priority fix.

---

### CRITICAL: No Phase Gating

There is **no enforcement** that Phase 2 requires Phase 1 completion, Phase 3 requires Phase 2 completion, etc. Any user can navigate directly to `/phase-two`, `/phase-three`, or `/phase-four` at any time. The `DiagnosisGuard` only checks for diagnosis attestation — it does not check phase progression.

**Required:** A `PhaseGuard` component that checks `user_progress.current_phase` and redirects users who haven't completed prerequisite phases.

---

### CRITICAL: Phase Transitions Not Automated

When a user completes all 9 Phase 1 questionnaires, the `current_phase` in `user_progress` is **never updated to 2**. Similarly, completing Phase 2 (day 76) doesn't advance to Phase 3, and completing Phase 3 doesn't advance to Phase 4. Users stay on `current_phase = 1` forever unless manually changed.

---

### Phase 1 Issues

| Issue | Severity | Detail |
|---|---|---|
| No "complete within 1 week" notice | Medium | Day 1 content has no urgency messaging about the 7-day window |
| No post-completion lockout | High | After all 9 questionnaires are done, user should only access headache diary, but Phase 1 remains fully navigable |
| Questionnaire download prevention | Low | No print/download protection exists (CSS `@media print` hide or right-click prevention) |
| Remaining hardcoded colors | Medium | Day content files still use `hover:bg-neutral-50`, `text-neutral-600` — missed in color standardization |
| `headache-type.ts` questionnaire unused | Low | Dead code — exists but never referenced |

---

### Phase 2 Issues

| Issue | Severity | Detail |
|---|---|---|
| Activity sheet links are broken | Critical | `ActivitySheet.tsx` opens `/activity-sheets/{id}` — **no such route exists in App.tsx** |
| No diary/calendar format | High | Currently a flat day-by-day linear view with a dropdown selector, not the calendar/diary format requested |
| No "enlarge a day" feature | High | No way to expand a specific day from a calendar overview |
| Dual persistence (localStorage + DB) | Medium | `PhaseTwo.tsx` still uses `secureStore`/`secureRetrieve` as fallback alongside DB |
| `bg-white` hardcoded | Medium | `PhaseTwo.tsx` line 199 uses `bg-white` instead of `bg-card` |
| `text-neutral-600` remaining | Medium | `PhaseTwoContent.tsx` lines 38, 51 still hardcoded |
| No Aim/Goal messaging | Medium | The locus of control educational framing is not presented to users anywhere |
| totalDays = 76 inconsistency | Low | Comment says "Updated from 64 to 76" but Phase 2 should be ~63 days (9 weeks) or 77 days (11 weeks) |

---

### Phase 3 Issues

| Issue | Severity | Detail |
|---|---|---|
| Only 4 questionnaires (correct) | OK | HIT-6, MIDAS, PSFS, GPOC — matches your requirement |
| Side-by-side comparison exists | OK | `DayEightContent.tsx` + `useProgressData` correctly fetches Phase 1 vs Phase 3 data and renders comparison cards |
| PSFS uses same activities from Phase 1 | OK | `Questionnaire.tsx` pre-populates Phase 1 activities as read-only for Phase 3 |
| Remaining hardcoded neutral colors | Medium | `DayEightContent.tsx` uses `text-neutral-900`, `text-neutral-600`, `text-neutral-500`, `text-neutral-700`, `bg-white/60` extensively (~20 instances) |
| `DaysOneToSevenContent.tsx` colors | Medium | Uses `text-neutral-500` |
| `HeadacheAnalysis` is sample data | Medium | Already labeled "Sample data" but shown on Day 8 as if real |

---

### Phase 4 Issues

| Issue | Severity | Detail |
|---|---|---|
| Exercise library works | OK | Filters by FHT, allows selection, persists to DB |
| Program builder with weekly schedule | OK | Has schedule + diary views |
| Save button shows toast but doesn't save | Medium | The "Save Program" button at line 58 only shows a toast — the actual auto-saving happens via `useMaintenanceProgram` hook, making this button misleading |
| No continuous access to all exercises | Medium | Only exercises from the filtered library are shown, no "browse all" option |
| Goal setting + countdown exists | OK | SMART goals with target dates |

---

### Dashboard Issues

| Issue | Severity | Detail |
|---|---|---|
| `bg-white` used 6 times | Medium | Should be `bg-card` |
| `bg-blue-500` used 4 times | Medium | Phase links should use `bg-primary` |
| `text-neutral-600` | Medium | Should be `text-muted-foreground` |
| All phase links visible regardless of progress | Medium | Dashboard shows "Continue to Phase 1/2/3/4" based on `currentPhase`, but doesn't prevent direct URL access |

---

### Summary of Required Changes

**Critical (must fix for app to function):**
1. Fix questionnaire route: add `:id` parameter
2. Add phase gating (PhaseGuard component) 
3. Auto-advance `current_phase` when phase milestones are met
4. Fix broken activity sheet routes

**High (required for intended user experience):**
5. Phase 1 post-completion lockout (redirect to diary only)
6. Add "complete within 1 week" notice to Phase 1
7. Phase 2 calendar/diary layout redesign

**Medium (quality/consistency):**
8. Standardize remaining hardcoded colors in ~10 files (Dashboard, Phase 1 day content, Phase 2, Phase 3 DayEight, DaysOneToSeven)
9. Remove misleading Phase 4 "Save Program" button (or make it trigger actual save)
10. Add Aim/Goal educational messaging to Phase 2
11. Remove Phase 2 localStorage fallback

**Low:**
12. Remove unused `headache-type.ts` questionnaire
13. Add basic print-prevention CSS for questionnaires
14. Verify totalDays consistency in Phase 2

