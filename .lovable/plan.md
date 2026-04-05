

## Plan: Fix Remaining Technical Issues (Amber/Yellow Priority)

### Issues to fix, grouped by severity

**AMBER — Branding errors**

1. **`TermsOfService.tsx`** — References "MigraineTracker's website" (line 24). Replace with "Recover & Reclaim".
2. **`PrivacyPolicy.tsx`** — References "support@migrainetracker.com" (line 36). Replace with appropriate contact reference.

**AMBER — Remaining hardcoded colors (missed in previous pass)**

3. **`DataAccessControl.tsx`** — `text-blue-600` link (line 138), `text-neutral-500` descriptions. Replace with `text-primary` and `text-muted-foreground`.
4. **`CookieConsent.tsx`** — `text-neutral-500` descriptions (lines 82, 96, 110, 124, 153). Replace with `text-muted-foreground`.
5. **`PrivacyModule.tsx`** — `text-neutral-500` (lines 44, 53, 63). Replace with `text-muted-foreground`.
6. **`SecurityDashboard.tsx`** — Status icon colors (`text-red-500`, `text-yellow-500`, `text-green-500`) are semantic and stay. No changes needed.
7. **`HeadacheAnalysis.tsx`** — `bg-neutral-50`, `text-neutral-400/500` stat boxes (lines 47-48, 84-91, 115-122). Replace with `bg-muted` and `text-muted-foreground`. Green trend indicators stay (semantic).
8. **`PhaseContent.tsx`** — `text-neutral-600/500`, `bg-neutral-50/100`, `hover:bg-neutral-50` throughout (lines 33-66, 77-96, 119-146). Replace with `text-muted-foreground`, `bg-muted`, `hover:bg-muted`.
9. **`ExerciseTypeIcon.tsx`** — `text-blue-600` for activity icon (line 13). Replace with `text-primary`.
10. **Policy pages** (`PrivacyPolicy.tsx`, `TermsOfService.tsx`) — `bg-white`, `border-neutral-200`, `text-neutral-600` throughout. Replace with `bg-card`, `border-border`, `text-muted-foreground`.

**YELLOW — localStorage-only persistence (acceptable for beta, flag for post-beta)**

11. **`DiagnosisGuard.tsx` / `DiagnosisAttestation.tsx`** — Attestation stored in localStorage only. This is acceptable for beta (it's a compliance gate, not user data). No change now — add a code comment noting it should migrate to DB post-beta.
12. **`Profile.tsx`** — Notification preferences in localStorage. Same approach: add comment noting post-beta DB migration. The UI already says "read-only during beta".
13. **`AgeVerification.tsx`** — Age verification in localStorage. Same: add comment.

**YELLOW — Stale/placeholder data**

14. **`HeadacheAnalysis.tsx`** — Uses hardcoded sample data (lines 15-38). This is a placeholder component with fake stats. Add a visible "Sample data" label so users don't think it's real.
15. **`ProgramCalendar.tsx`** — Hardcoded dates ("Jan 1, 2025"). Add a "Coming soon" or "Sample" label.

### Summary

- ~12 files updated
- Fix 2 branding errors ("MigraineTracker")
- Standardize remaining `neutral-*` and `blue-600` colors to design tokens
- Add post-beta migration comments to localStorage-dependent compliance components
- Label placeholder/sample data clearly
- No database changes, no new files

