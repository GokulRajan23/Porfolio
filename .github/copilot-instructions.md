# Copilot Instructions for Cloover AI

## Project Overview
- **Cloover AI** is a minimalist, voice-first autonomous sales assistant. It reads customer data from an Excel file and uses a multi-agent AI pipeline to generate personalized sales playbooks.
- The UI is a single-orb, hands-free interface. All major logic is in `script.js`, with supporting files `index.html` and `style.css`.

## Architecture & Data Flow
- **4-Agent Pipeline:**
  1. **Market Intelligence Agent:** Analyzes market and location data.
  2. **Offer Strategy Agent:** Recommends products and predicts objections.
  3. **Financing Strategy Agent:** Optimizes payment options and incentives.
  4. **Master Sales Coach:** Synthesizes all agent outputs into a markdown playbook and a 30-second audio script.
- **Data Source:** Customer leads are loaded from `leads.xlsx` (parsed at runtime via SheetJS CDN).
- **LLM Integration:** Uses Google Gemini API (`gemini-flash-lite-latest`) for agentic reasoning.
- **Speech:** Uses Web Speech API for recognition and ElevenLabs API for TTS.

## Developer Workflows
- **Run Locally:**
  - Start a local server to avoid CORS issues:
    ```bash
    python3 -m http.server 8080
    ```
  - Visit `http://localhost:8080` and allow microphone access.
- **No build step** is required; all code is vanilla JS/HTML/CSS.
- **No test suite** is present; manual testing via browser is expected.

## Project-Specific Conventions
- **All agent logic and orchestration** is in `script.js`.
- **Excel file** must be named `leads.xlsx` and placed in the project root.
- **CDN dependencies** (SheetJS, Gemini, ElevenLabs) are loaded in `index.html`.
- **Voice UI**: The orb triggers all interactions; no keyboard navigation is supported.

## Integration Points
- **SheetJS** for Excel parsing (runtime, not build-time).
- **Google Gemini API** for LLM calls (see `script.js`).
- **ElevenLabs API** for TTS (see `script.js`).

## Examples
- To add a new agent, extend the agent pipeline in `script.js` and update the orchestration logic.
- To change the Excel schema, update both the parsing logic in `script.js` and the expected columns in `leads.xlsx`.

---

For more, see [README.md](../../README.md).