# Changelog

All notable changes to the NanoBanana Pro project will be documented in this file.

## [v5.0.0] - 2026-03-08

### Added
- **Input Source Toggle:** Added a UI dropdown ("Mannequin" vs "Real Model") to dynamically adjust the AI context prompt. When "Real Model" is active, the prompt uniquely instructs the generation model to replace the original person's characteristics (face, body, skin tone) but retain exact garment fidelity.
- **Framing Safeguards:** Automatically injected explicit framing instructions into all "Full-Pose" prompts across all 10 attire categories: `"Must leave ample room for ceiling and floor. DO NOT crop below the ankle."`
- **Master Rules Restoration:** Restored the `STRICT VISUAL RULES` block mathematically to the `physics_base` of the Master Prompt generator, enforcing rules against hallucination, preventing amputation, mandating closed footwear, and leaving dedicated watermark space.
- **GitHub Auto-Deployment Script:** Built a secure `update.php` utility. Designed to run on shared hosting, this script uses `ZipArchive` to fetch the latest `main` branch directly from GitHub and unpack it over the live directory, enabling single-click deployments.

### Fixed
- Addressed string quoting syntax errors generated when dynamically concatenating prompt rules in `master.js`.
- Fixed full-body shots consistently framing out model ankes by establishing dynamic global composition rules.
