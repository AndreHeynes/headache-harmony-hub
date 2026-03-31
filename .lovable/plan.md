

## Plan: Add Manifest for Home Screen Installability

### Summary
Create a `public/manifest.json` and update `index.html` with the necessary meta tags. No service workers, no `vite-plugin-pwa`, no offline caching. This enables "Add to Home Screen" on mobile devices with a standalone app experience.

### Changes

**1. Create `public/manifest.json`**
- App name: "Recover From Headache"
- Short name: "Recovery"
- `display: "standalone"`
- `start_url: "/"`
- Theme/background colors matching the app's primary palette
- Placeholder icon references (192x192 and 512x512) — you can replace these with branded icons later

**2. Create placeholder PWA icons**
- `public/pwa-192x192.png` and `public/pwa-512x512.png`
- Simple generated placeholders

**3. Update `index.html`**
Add to `<head>`:
- `<link rel="manifest" href="/manifest.json">`
- `<meta name="theme-color" content="#1a1a2e">`
- `<meta name="apple-mobile-web-app-capable" content="yes">`
- `<meta name="apple-mobile-web-app-status-bar-style" content="default">`
- `<link rel="apple-touch-icon" href="/pwa-192x192.png">`

### What This Does
- Users on mobile can tap "Add to Home Screen" and launch the app in a standalone window (no browser chrome)
- No service workers means zero risk of caching issues in Lovable preview or production
- No new dependencies required

### What This Does NOT Do
- No offline support
- No push notifications
- No background sync

