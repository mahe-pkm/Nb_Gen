<h1 align="center">
  <br>
  🍌 NanoBanana Pro
  <br>
</h1>

<h4 align="center">An advanced internal AI prompt engineering tool for photorealistic fashion generation.</h4>

<p align="center">
  <img src="https://img.shields.io/badge/Version-5.0.0-blueviolet.svg?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/Status-Active_Production-success.svg?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Deployment-Automated-ff69b4.svg?style=for-the-badge" alt="Deployment">
</p>

<p align="center">
  <a href="#sparkles-key-features">Key Features</a> •
  <a href="#art-attire-categories">Attire Categories</a> •
  <a href="#gear-how-it-works">How It Works</a> •
  <a href="#rocket-deployment-pipeline">Deployment Pipeline</a>
</p>

---

## 📖 Overview

**NanoBanana Pro** is a proprietary interface built to bridge the gap between creative fashion design and AI image generation. It algorithmically constructs dense, highly-specific textual prompts (the `physics_base`) needed to guide sophisticated diffusion models (like Imagen or Midjourney) in generating flawless fashion lifestyle photography.

By strictly controlling garment boundaries, human anatomy, fabric mechanics, and environmental framing, it eliminates AI hallucinations and dramatically reduces prompt-engineering time.

---

## :sparkles: Key Features

### 🔄 Dynamic Input Context (Real Model vs Mannequin)
Generating clothing on a plastic mannequin requires a completely different AI instruction set than generating clothing on a real model whose face needs hiding. Our **Input Source Toggle** handles this seamlessly:
- **`👗 Mannequin Source`**: Instructs the AI to extrapolate a highly detailed human figure based merely on a plastic frame.
- **`👤 Real Model Source`**: Triggers a specialized strict-replacement engine. It explicitly commands the AI to **only copy the garment**, while completely hallucinating a brand new, high-end fashion model, preventing the original model's face or body characteristics from carrying over.

### 📐 Extreme Framing Constraints
AI models infamously crop images at the shins. NanoBanana Pro dynamically injects strict **Compositional Framing Rules** into every single output prompt:
> *"Must leave ample room for ceiling and floor. DO NOT crop below the ankle."*

### 🛡️ Anti-Hallucination Visual Rules
The `STRICT VISUAL RULES` engine enforces:
- **No Amputation:** Hands, feet, and limbs must remain perfectly whole in the frame.
- **Zero Additions:** AI is explicitly forbidden from generating belts, heavy jewelry, bags, or props unless explicitly instructed.
- **Footwear Integrity:** Enforces closed footwear to prevent strange toe generation.

---

## :art: Attire Categories

NanoBanana Pro natively understands the physics, draping, and terminology of **10 distinct garment styles**:

1. 🌸 **Anarkali** - Flowing, majestic volume
2. ✨ **Lehenga** - Heavy embroidery and structured skirts
3. 🧵 **Chudidhar** - Straight-A line silhouettes
4. 🥻 **Saree** - Complex pleating and pallu draping
5. 🎊 **Halfsaree (Langa Voni)** - Traditional regional draping
6. 👗 **Long Gown** - Western sweeping elegance
7. 🎽 **Maxi** - Casual, lightweight flow
8. 💫 **Semi Lehenga** - Modern fusion wear
9. 👖 **Sharara** - Flared, wide-legged geometry
10. 👚 **Tops / Two-Piece** - Modern casual separates

---

## :rocket: Deployment Pipeline

This repository includes a completely automated deployment mechanism built for shared hosting environments. 

### `update.php`
No SSH keys or FTP clients required. The `update.php` script living on the server securely listens for a webhook or a direct URL hit via a secret key. When triggered:
1. It downloads the latest `main.zip` from this exact GitHub repository.
2. Unzips the files and logically moves them into the live `public_html` root directory.
3. Overwrites old files with fresh ones in seconds.

**Usage:** After pushing to GitHub, simply visit the secret server URL to sync your live deployment!

---
<p align="center">
  <i>Built with ❤️ for perfectly composed AI Fashion Generation.</i>
</p>
