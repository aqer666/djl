# AI Avatar Generator Design

## Goal

Add a high-fidelity frontend flow that lets users generate AI avatar images from an OC character profile through the existing `/api/images/generate` endpoint.

## Scope

- Add a character-level "generate avatar" entry point on the OC archive page.
- Add a modal generator form for style, composition, aspect ratio, count, and prompt supplement.
- Call the existing local backend endpoint and show provider, mode, points cost, prompt, and returned images.
- Let users set one generated image as the character cover.
- Persist generated image metadata and cover choice in `localStorage`.

## Files

- `index.html`: add the image generator dialog.
- `app.js`: add state fields, modal rendering, endpoint call, result handling, and cover binding.
- `styles.css`: add generator and generated image UI styles.
- `README.md` and `AI_IMAGE_SETUP.md`: document the frontend flow.

## Constraints

- No new dependencies or telemetry.
- Keep the current no-build static app architecture.
- Preserve the existing `/api/images/generate` request shape.
- Use the local mock path when no API key is configured.
