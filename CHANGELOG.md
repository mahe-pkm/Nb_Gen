# 📈 Changelog

All notable changes to the **NanoBanana Pro** project will be documented in this file. 

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to Semantic Versioning.

---

## 🚀 [v5.0.0] - 2026-03-08
*The "Framing & Automation" Update*

### ✨ Added
- **`Input Source` Toggle Engine:** Introduced a new UI selection mechanism under the Model Profile section. 
  - 🧍‍♀️ **Mannequin Mode:** Retains standard prompt extrapolation.
  - 🎭 **Real Model Mode:** Re-wires the core `CONTEXT` prompt to enforce strict facial and body characteristic replacement, ensuring privacy and eliminating the cloning of the original source model.
- **🖼️ Universal Framing Safeguards:** Injected mandatory compositional boundaries across all 10 attire categories and their subsequent pose variations. Every generated "Full Body" prompt now structurally concludes with: `Must leave ample room for ceiling and floor. DO NOT crop below the ankle.`
- **🔒 Strict Visual Rules Revival:** Corrected the backend logic to reliably append the `STRICT VISUAL RULES` block mathematically to the `physics_base` of the Master Generator. This restores crucial safeguards against AI hallucinations (random accessories, amputations, open-toe anomalies).
- **☁️ Zero-Touch Deployment Script (`update.php`):** Engineered a secure, native PHP auto-updater designed for Hostinger and shared environments. 
  - Resolves standard `git pull` permission errors by executing direct cURL downloads of the raw GitHub `main.zip`.
  - Implements an encrypted URL key (`?key=...`) to prevent unauthorized server extraction.
  - Automates recursive directory moving and cleanup in ~3 seconds.

### 🐛 Fixed
- **`master.js` Syntax Crash:** Resolved a critical bug where dynamic string concatenation incorrectly escaped double quotes (e.g., `ankle."Contrapposto\"`), breaking the JSON-like data structure and bringing the UI to a halt.
- **Cropped Ankle Syndrome:** Explicitly solved the ongoing issue where diffusion models cut off the bottom of the fashion garment by establishing definitive spatial constraints.
- **Missing Watermark Canvas:** Repaired the prompt logic to successfully request a 300x300px blank top-left corner space for post-production branding.

---

## 🔙 [v4.5.1] - Previous Architecture
*The "Halfsaree Expansion" Update*

*(Historical documentation references structural additions to the `halfsaree.html` control panel and prompt libraries.)*
