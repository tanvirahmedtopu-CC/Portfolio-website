# Verification — September 28, 2026

- Production `npm run build` passes. Non-blocking Browserslist database age notice remains.
- Gzipped main JavaScript: 150.34 kB (previous deployed build approximately 403 kB).
- Desktop reviewed at 1440 × 900; responsive layout reviewed at 390 × 844. No mobile page overflow.
- Category filter returned the expected three AI films, and All work restored twelve films.
- Full video playback confirmed with `readyState: 4`, no media error and sound enabled. Mobile player also confirmed playing.
- Escape closes the player and restores focus to its film button.
- Desktop page scrolling moves the phone rail through the later brand profiles. All ten profile screenshots loaded. Mobile uses native horizontal overflow instead of the pinned layout.
- All three AI workflow selectors display their corresponding tools.
- 36 local media assets checked for existence; 24 MP4s checked as H.264, 8-bit 4:2:0. Full files under 50 MB each. All silent previews together: 3.28 MB.
- Generated deployment manifest paths exist; all 36 deployed media files match their source copies.
- `git diff --check` passes.

Reduced motion and Save-Data fallbacks are implemented. Physical-device Safari and Android testing was not performed. The contact form opens an email draft and preserves its content; it does not provide server-side delivery.
