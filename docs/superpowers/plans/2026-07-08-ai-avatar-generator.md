# AI Avatar Generator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the confirmed OC-level AI avatar generation frontend flow.

**Architecture:** Keep the existing static app model. Add one modal form in `index.html`, wire all behavior in `app.js`, and style the flow in `styles.css`. Persist character cover and generated asset metadata in the existing `localStorage` state.

**Tech Stack:** HTML dialog, vanilla JavaScript, CSS, Node local server.

## Global Constraints

- No new dependencies.
- Do not change the existing `/api/images/generate` endpoint contract.
- Keep generated images served from the existing `/generated/*` static path.
- Verify with `node server.mjs` and a browser run against `http://127.0.0.1:8765/`.

---

### Task 1: Add Generator Dialog

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

**Steps:**
- [x] Add a dialog with form controls for character, style, pose, size, count, and prompt.
- [x] Add result slots for status, provider, cost, prompt, and images.
- [x] Add responsive styles for form and image result grid.

### Task 2: Wire State and API Call

**Files:**
- Modify: `app.js`

**Steps:**
- [x] Add `coverUrl` and `generatedImages` support to character state.
- [x] Add "生成头像" action on character cards.
- [x] Submit the generator form with selected character data to `/api/images/generate`.
- [x] Render loading, success, and error states.
- [x] Store returned images on the selected character and support setting a cover image.

### Task 3: Update Docs and Verify

**Files:**
- Modify: `README.md`
- Modify: `AI_IMAGE_SETUP.md`

**Steps:**
- [x] Update docs so the implemented frontend flow matches the setup guide.
- [x] Run `node server.mjs`.
- [x] Generate at least one mock image from the browser.
- [x] Confirm the chosen image updates the OC card cover and persists after refresh.
