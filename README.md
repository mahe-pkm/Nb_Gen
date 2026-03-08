# NanoBanana Pro (v5.0)

NanoBanana Pro is an advanced internal tool used for generating highly detailed, photorealistic image generation prompts. It specifically focuses on traditional and modern Indian fashion garments, allowing users to fine-tune garment physics, material textures, model profiles, and poses.

This tool builds comprehensive textual prompts that act as the `physics_base` instructions for sophisticated image generation models, ensuring precise fabric mechanics, correct anatomical features, and photographic lighting standards.

## Features

- **Multi-Attire Support:** Generate prompts for 10 distinct garment styles including Anarkali, Lehenga, Chudidhar, Saree, Halfsaree, Long Gown, Maxi, Semi Lehenga, Sharara, Tops, and Two-Piece sets.
- **Dynamic Context Handling:** Easily toggle between "Mannequin" inputs and "Real Model" inputs to instruct the AI on whether to construct a model from scratch or strictly copy garment details while replacing the source person's features.
- **Strict Visual Rules:** Enforces constraints against AI hallucinations (no added jewelry, belts), prevents amputations, ensures closed footwear, and mandates specific framing boundaries (preventing ankle crops).
- **Watermark Ready:** Automatically instructs the AI to leave a 300x300px space in the top-left corner for the brand's watermark.
- **Auto-Updater:** Includes an `update.php` deployment script for seamless, automated synchronization from the GitHub repository to live shared-hosting environments.

## Deployment

To deploy this project to a web server (like Hostinger):
1. Place all files in the `public_html` directory.
2. The `update.php` script handles automated pulling of future updates from the `main` branch of this repository. When you push new commits to GitHub, visit the secret `update.php?key=[YOUR_SECRET_KEY]` URL to apply the changes instantly.
