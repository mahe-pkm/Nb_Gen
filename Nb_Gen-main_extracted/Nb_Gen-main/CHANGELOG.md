# 📈 Changelog

All notable changes to the **NanoBanana Pro** project will be documented in this file. 

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to Semantic Versioning.

---

## 🚀 [v6.1.0] - 2026-03-17
*The "Jewelry & Branding" Update*

### ✨ Added
- **`Buzl's Gemini` Rebrand:** Officially rebranded the application from "NanoBanana Pro" to "Buzl's Gemini | Multi-Attire Prompt Generator".
- **`Custom Jewelry Prompts`:** Engineered a new dedicated prompt generation module for accessories.
  - Added "Option 1 (Text)" allowing users to select between Minimal, Normal, and Bridal jewelry tiers tailored specifically to the active attire.
  - Added "Option 2 (Image)" allowing users to instruct the AI to extract and apply exact jewelry pieces from a secondary uploaded reference image.
  - Wired the new jewelry instructions to seamlessly inject into the Master payload and JSON API outputs.

---

## 🚀 [v6.0.4] - 2026-03-10
*The "Prompt Engine Refactor" Update*

### ✨ Added
- **`Global Prompt Constants`**: Extracted repetitive physics text and pose schemas into `GLOBAL_PHYSICS_PROMPT`, `POSE_LIBRARY`, and `ATTIRE_TYPES` to improve engine performance.
- **`Dynamic Builder`**: Created the `buildPrompt()` function for efficient prompt assembly.
- **`Pose Anchoring`**: Added rigid instructions to force the generator to maintain the original mannequin's posture.

### 🐛 Fixed
- Purged generic aesthetic adjectives (`masterpiece`, `stunning`, etc.) and replaced ambiguous phrases with professional technical vocabulary.

---

## 🚀 [v6.0.3] - 2026-03-09
*The "Color Preset & Sync" Update*

### ✨ Added
- **`Bidirectional Color Sync UI`:** Upgraded the "Scene & Background" block with an interactive visual color picker and 4 predefined environment swatches (Pure White, 50% Grey, Deep Black, Chroma Green).
- typing a standard Hex code into the manual input now automatically triggers a regular expression parser that instantly updates the visual color picker swatch to match, creating a seamless bidirectional sync.

---

## 🚀 [v6.0.2] - 2026-03-08
*The "Engine & Automation Workflow" Update*

### ✨ Added
- **`Dual Theme UI Switcher`:** Engineered a hardware-accelerated dual-theme architecture. A prominent slider in the primary header now allows users to cleanly toggle the entire interface between the futuristic "Cyber Neon Dark" mode and the refined "Luxury Fashion Editorial" mode. The preference is automatically cached in LocalStorage.
- **`JSON Output Serialization`:** Re-engineered the clipboard aggregators in `master.js` to support exporting fully structured JSON payloads alongside standard Text output.
  - Automatically wraps data in a `{ "_instruction_for_ai_model": "..." }` framework to enforce Gemini contextual obedience without manual configuration.
  - Keeps local UI `textarea` elements cleanly readable for human operators while secretly processing complex JSON trees in the background variable state upon copy action execution.
- **`Custom Background Ambient Module`:** Deployed a "Scene & Background" UI block, empowering users to type standard semantic values (e.g. "Pure White") or exact Hex/RGB properties, cascading to all dynamically constructed environment logic strings across all models instantly.
- **`Animated Deployment Overlay`:** Completely overhauled the `update.php` utility. Replaced the legacy plain-text output with a premium glassmorphic dark-mode web application featuring real-time DOM updates, loaders, and progression checklists (Download -> Extract -> Clean up).

### 🐛 Fixed
- Misaligned HTML `h1` version references were incorrectly injected inside the Lightroom prep boundaries.

---

## 🚀 [v5.0.0] - 2026-03-08
*The "Framing & Deployment Blueprint" Update*

### ✨ Added
- **`Input Source` Toggle Engine:** Introduced a new UI selection mechanism under the Model Profile section. 
  - 🧍‍♀️ **Mannequin Mode:** Retains standard prompt extrapolation.
  - 🎭 **Real Model Mode:** Re-wires the core `CONTEXT` prompt to enforce strict facial and body characteristic replacement, ensuring privacy and eliminating the cloning of the original source model.
- **🖼️ Universal Framing Safeguards:** Injected mandatory compositional boundaries across all 10 attire categories and their subsequent pose variations. Every generated "Full Body" prompt now structurally concludes with: `Must leave ample room for ceiling and floor. DO NOT crop below the ankle.`
- **🔒 Strict Visual Rules Revival:** Corrected the backend logic to reliably append the `STRICT VISUAL RULES` block mathematically to the `physics_base` of the Master Generator. This restores crucial safeguards against AI hallucinations (random accessories, amputations, open-toe anomalies).
- **☁️ Zero-Touch Deployment Script (`update.php`):** Engineered a secure, native PHP auto-updater designed for Hostinger and shared environments. 

### 🐛 Fixed
- **`master.js` Syntax Crash:** Resolved a critical bug where dynamic string concatenation incorrectly escaped double quotes (e.g., `ankle."Contrapposto\"`), breaking the JSON-like data structure and bringing the UI to a halt.
- **Cropped Ankle Syndrome:** Explicitly solved the ongoing issue where diffusion models cut off the bottom of the fashion garment by establishing definitive spatial constraints.
- **Missing Watermark Canvas:** Repaired the prompt logic to successfully request a 300x300px blank top-left corner space for post-production branding.

---

## 🔙 [v4.5.1] - Previous Architecture
*The "Halfsaree Expansion" Update*

*(Historical documentation references structural additions to the `halfsaree.html` control panel and prompt libraries.)*
