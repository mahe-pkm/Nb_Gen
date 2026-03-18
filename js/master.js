const GLOBAL_PHYSICS_PROMPT = `ROLE: EXPERT FASHION PHOTOGRAPHER & TEXTILE FORENSICS EXPERT.
CONTEXT: The input image is a MANNEQUIN reference.
The input mannequin image already contains a natural garment pose. The generated model must closely follow the same pose structure visible in the input image. Body orientation, arm placement, and garment fall should remain consistent with the input pose. The pose instructions below act only as refinement guidance. Do NOT dramatically change the pose if the input image already matches the described pose. Maintain similar stance, posture, and garment flow from the source image.
TASK: "Dress" a real Indian female model in this exact garment.
OUTPUT INSTRUCTION: You must STRICTLY ONLY copy the GARMENT. DO NOT copy the mannequin, the background, or any text. Completely replace the mannequin with a lifelike human model as specified below. The final image must look like it was shot in a high-end studio.

/// PHASE 1: UNIVERSAL FABRIC & CRAFT ANALYSIS (MANDATORY) ///
You must dynamically ANALYZE the input image to determine the physics engine:

STEP A: IDENTIFY FABRIC PHYSICS
• IF sheer/fluid (Georgette/Chiffon/Net) -> RENDER: Soft micro-folds, translucency, air interaction.
• IF structured/textured (Raw Silk/Organza/Tussar) -> RENDER: Crisp folds, slight stiffness, visible weave/slubs.
• IF heavy/absorbent (Velvet/Brocade) -> RENDER: Deep shadows, light absorption, soft sheen.

STEP B: IDENTIFY CRAFT & DEPTH
• IF work is RAISED (Zardosi/Beads/Stones) -> RENDER: High 3D relief, cast shadows on fabric.
• IF work is METAL/GOLD (Zari/Sequins) -> RENDER: **REFLECTIVE METALLIC SURFACE**. It must shine, not look like yellow thread.
• IF work is FLAT (Thread/Print/Kalamkari) -> RENDER: Flush with fabric surface, following fabric contours.

CRITICAL REQUIREMENT - MACRO DEFINITION (v3.1):
1. **NO BLENDING:** Embroidery elements must NOT melt into each other.
2. **BEAD SEPARATION:** You must render the tiny GAP between individual beads/stones.
3. **MATERIAL DISTINCTION:** Glass beads must look glossy; Zari must look metallic; Thread must look matte.
4. **EDGE SHARPNESS:** The edges of the motif must be razor-sharp, not fuzzy or hallucinated.
5. **THREAD TENSION:** Render the interwoven zari thread tension and micro-shadows cast by individual zari loops.

CRITICAL REQUIREMENT - 98% ACCURACY:
• Replicate the *exact* observed fabric weight and embroidery density from the input.
• Do not default to generic "satin" or "print". Use the analysis above.

MODEL & POSE:
• MODEL: Beautiful Indian female, natural relaxed expression, high-end editorial photography.
• POSE: See specific pose instruction below.
• FOOTWEAR: CLOSED FOOTWEAR ONLY. Feet must be hidden. NO hidden footwear.
• ORIENTATION: STRICTLY VERTICAL / PORTRAIT (2:3 or 3:4).

STRICT VISUAL RULES:
• CHARACTER CONSISTENCY: KEEP FACE AND MODEL AESTHETIC STRICTLY CONSISTENT ACROSS POSES. RETAIN THE IDENTICAL FACE, SKIN TONE, AND BODY PROPORTIONS. MUST LOCK THE FIRST SUCCESSFUL GENERATION'S MODEL EVERY TIME.
• NO Hallucinations: Do not add jewelry, belts, or latkans unless present in source.
• NO Amputations: Hands and fingers must be elegant, complete, and anatomically correct.
• CLOSED FOOTWEAR ONLY: Feet fully concealed.
• WATERMARK SPACE: LEAVE EMPTY NEGATIVE SPACE (approx 300x300px) in the TOP-LEFT corner for watermark placement. Do not place important details or face in this area.
GENERATE: A high-end commercial fashion catalog photograph where the fabric physics and embroidery detail depth are indistinguishable from reality AND HIGH FIDELITY 4K RESOLUTION, MAX POSSIBLE RESOLUTION.`;

const ATTIRE_TYPES = {
  chudidhar: "Chudidhar",
  half_saree: "Half Saree",
  lehenga: "Lehenga",
  long_gown: "Long Gown",
  saree_ready: "Ready to Wear Saree",
  semi_lehenga: "Semi Lehenga",
  sharara: "Sharara",
  tops: "Tops",
  two_piece: "Two Piece",
  anarkali: "Anarkali",
};

const POSE_LIBRARY = {
  chudidhar: [
    {
      id: "pose1",
      img: "chudidhar/pose1_v1.png",
      title: "Pose 01 — Main Image (Full Front)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model falls into a perfectly symmetrical, static standing position. Shoulders are pulled back and down, chest neutral. Weight is evenly distributed on both feet. Arms are completely relaxed at the sides, hanging straight down without creating wrinkles in the bodice fabric.\r\nGARMENT: The Chudidhar flows straight down in its intended A-line or flared silhouette. No motion blur, no wind. The hemline settles naturally on the floor (or above footwear).\r\nFRAMING: Center-weighted composition. Head at the top third, hem near the bottom.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "chudidhar/pose1_v1.png",
        },
        {
          label: "V2: Walking",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model captured mid-stride walking directly toward the camera. the stance is slightly forward, engaging the lower silhouette muscles which press gently against the fabric. Shoulders remain level. Arms swing naturally—one slightly forward, one slightly back—adding dynamic life to the pose.\r\nGARMENT: The kurta reacts to the forward motion, creating soft, fluid ripples at the hem. Fabric drapes over the forward stance, highlighting the material's weight and flow.\r\nFRAMING: Full length, ensuring the movement doesn't crop the hem or head.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "chudidhar/pose1_v2.png",
        },
        {
          label: "V3: Clasped",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model stands tall and elegant. Hands are brought together at the mid-section, fingers lightly interlaced or one palm resting softly in the other. Elbows bend slightly outward, creating a small triangular gap between arm and mid-section that defines the mid-section silhouette.\r\nGARMENT: The bodice is pulled slightly taut across the upper bodice due to the arm position, showing garment fit along the torso. The kurta hangs vertically with undisturbed natural garment volume.\r\nFRAMING: Emphasis on the hourglass shape created by the arms and mid-section.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "chudidhar/pose1_v3.png",
        },
      ],
    },
    {
      id: "pose2",
      img: "chudidhar/pose2_v1.png",
      title: "Pose 02 — Secondary (Front Variation)",
      variations: [
        {
          label: "V1: Weight Shift",
          text: 'Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model adopts a "Contrapposto" stance—weight shifted entirely to one mid-section, creating a subtle S-curve in the posture axis. The non-weight-bearing stance is slightly bent at the knee, relaxing the posture. Arms hang loosely at the sides.\r\nGARMENT: The skirt flare of the Chudidhar is accentuated on the weight-bearing side. The folds of the kurta bunch slightly on the relaxed side, showing fabric pliability.\r\nFRAMING: Vertical alignment capturing the subtle curve of the silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "chudidhar/pose2_v1.png",
        },
        {
          label: "V2: Candid",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Candid, editorial style. Model's silhouette faces forward, but her head is turned 30 degrees to the side, looking off-camera. Posture is relaxed but upright. Shoulders serve as a hanger for the garment, showcasing the shoulder fit perfectly.\r\nGARMENT: The neckline sits perfectly flat against the upper neckline area. Sleeves hang straight without twisting. Details of the yoke are front and center.\r\nFRAMING: Intimate but full-length, making the viewer feel like an observer.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "chudidhar/pose2_v2.png",
        },
        {
          label: "V3: Hand Flow",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Model interacts with the garment. One hand extends downwards to gently brush or hold the side flare of the kurta flare. The fingers slightly lift the fabric, revealing its weight and texture. The other arm remains neutral. Head tilts slightly towards the active hand.\r\nGARMENT: The kurta is physically manipulated, creating tension lines from the hand downwards. This demonstrates the volume and abundance of cloth.\r\nFRAMING: Focus on the hand-to-fabric interaction while keeping Full length visible.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "chudidhar/pose2_v3.png",
        },
      ],
    },
    {
      id: "pose3",
      img: "chudidhar/pose3_v1.png",
      title: "Pose 03 — Secondary (Side View)",
      variations: [
        {
          label: "V1: Profile",
          text: "Full fashion shot in strict portrait orientation, complete side profile (90-degree view).\r\nPOSE: Model stands perpendicular to the camera. The profile silhouette is sharp. The posture axis is straight, face direction up. Arms hang directly down the side seam of the silhouette, partially obscuring the mid-section but revealing the sleeve embroidery profile.\r\nGARMENT: The side seam of the Chudidhar is the focal line. The kurta's flare is visible from front to back, showing the A-line gradient. The bodice and back fit are clearly profiled.\r\nFRAMING: Full height profile, from head to floor.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "chudidhar/pose3_v1.png",
        },
        {
          label: "V2: Head Turn",
          text: "Full fashion shot in strict portrait orientation, side view.\r\nPOSE: silhouette remains in strict 90-degree profile. However, the model turns her upper silhouette to look over her shoulder, making direct eye contact with the camera. The face direction is slightly dropped, creating an alluring, slight head tilt. Shoulders stay profile.\r\nGARMENT: The twisting of the upper silhouette might cause slight shifting in the neckline, revealing fabric behavior. The side profile of the sleeve is prominent.\r\nFRAMING: Captures the connection between the model's gaze and the dress's silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "chudidhar/pose3_v2.png",
        },
        {
          label: "V3: Walking",
          text: 'Full fashion shot in strict portrait orientation, side profile.\r\nPOSE: Dynamic walking profile. Model is caught mid-step moving across the frame (left to right or vice versa). The leading movement pulls the kurta forward; the trailing movement pushes it back.\r\nGARMENT: The kurta creates a "motion trail" behind the model, flying out slightly due to air resistance. This showcases lightness/heaviness of the material.\r\nFRAMING: Wide enough to capture the trailing hem.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "chudidhar/pose3_v3.png",
        },
      ],
    },
    {
      id: "pose4",
      img: "chudidhar/pose4_v1.png",
      title: "Pose 04 — Secondary (Back View)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, back-facing view.\r\nPOSE: Model stands with her back completely to the camera. Shoulders are square and even. Head is straight, looking forward (away from camera). Hair is swept entirely to one side or tied up to reveal the upper back details.\r\nGARMENT: Focus is 100% on the back design—zipper concealment, embroidery on the upper back, and the full radial spread of the kurta as it hits the floor.\r\nFRAMING: Symmetrical backshot.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "chudidhar/pose4_v1.png",
        },
        {
          label: "V2: Looking Back",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model turns her head back over her shoulder to acknowledge the camera. The bodice twists very slightly (max 10 degrees) to facilitate the upper silhouette turn, but the lower silhouette remains largely back-facing.\r\nGARMENT: The slight bodice twist creates gentle diagonal stress lines in the bodice back, showing fabric fit. The kurta remains largely static.\r\nFRAMING: Focus on the back details with the added context of the model's profile.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "chudidhar/pose4_v2.png",
        },
        {
          label: "V3: Walking Away",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model is walking away from the camera. The movement is captured from behind. The garment sways naturally with the step. Shoulders move in opposition to the mid-section.\r\nGARMENT: The kurta swishes dynamically. The hemline flips up slightly at the heels. The back panels of the Chudidhar ripple with motion.\r\nFRAMING: Capturing the departure, focusing on the flow of the dress in motion.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "chudidhar/pose4_v3.png",
        },
      ],
    },
    {
      id: "pose5",
      img: "chudidhar/pose5_v1.png",
      title: "Pose 05 — Detail (Neckline)",
      variations: [
        {
          label: "V1: Center",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nFRAMING: TIGHT crop from just above the head to the mid-section.\r\nPOSE: Model stands perfectly still, facing front. Arms are held slightly away from the bodice to ensure they don't block the side-mid-section embroidery. Shoulders dropped.\r\nGARMENT: High-resolution focus on the NECKLINE, yoke embroidery, and upper bodice detailing. Every sequin, thread, and texture variance on the bodice must be sharp.\r\nShot on 100mm lens.",
          img: "chudidhar/pose5_v1.png",
        },
        {
          label: "V2: Angled",
          text: 'Upper-silhouette close-up in strict portrait orientation.\r\nANGLE: "Heroic" low angle. Camera looks up from mid-bodice level towards the face.\r\nPOSE: Model looks down into the lens with a powerful, confident expression. face direction slightly lifted.\r\nGARMENT: This angle emphasizes the fall of the fabric over the upper bodice and the upper neckline detailing of the neckline. It showcases the majesty of the Chudidhar.\r\nShot on 35mm lens.',
          img: "chudidhar/pose5_v2.png",
        },
        {
          label: "V3: Context",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nPOSE: Model brings one hand up to gently touch her upper neckline area or a necklace. The hand is relaxed, elegant—not gripping. It adds a sense of scale and human touch.\r\nGARMENT: The hand position draws the eye immediately to the upper neckline and shoulder embroidery. The sleeve fabric gathers slightly at the elbow due to the raised arm.\r\nShot on 80mm lens.",
          img: "chudidhar/pose5_v3.png",
        },
      ],
    },
    {
      id: "pose6",
      img: "chudidhar/pose6_v1.png",
      title: "Pose 06 — Detail (Sleeve)",
      variations: [
        {
          label: "V1: Lifted",
          text: "Portrait-orientation close-up focusing on one sleeve.\r\nFRAMING: Crop focusing on one arm from shoulder to fingertips.\r\nPOSE: Model lifts one arm slightly to the side (approx 45 degrees), separating it from the silhouette. The hand is relaxed, palm facing inward or down.\r\nGARMENT: This pose isolates the sleeve to show its silhouette, transparency (if any), and the density of embroidery down the length of the arm.\r\nShot on 100mm lens.",
          img: "chudidhar/pose6_v1.png",
        },
        {
          label: "V2: On mid-section",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: Model places her hand firmly on her natural mid-section. The elbow bends outward at an acute angle.\r\nGARMENT: The bending of the arm causes the sleeve fabric to "bunch" and fold at the inner elbow—this is critical for showing fabric stiffness/softness. The wrist cuff embroidery is brought close to the bodice embroidery for texture comparison.\r\nShot on 100mm lens.',
          img: "chudidhar/pose6_v2.png",
        },
        {
          label: "V3: Cuff Adjust",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: The model uses her opposite hand to adjust the cuff/bangle of the primary arm. It\'s a "getting ready" micro-action.\r\nGARMENT: Focus is on the cuff interaction. The tension of the opposite hand pulling slightly on the sleeve cuff reveals the stitching strength and button details (if any).\r\nShot on 100mm lens.',
          img: "chudidhar/pose6_v3.png",
        },
      ],
    },
    {
      id: "pose7",
      img: "chudidhar/pose7_v1.png",
      title: "Pose 07 — Detail (Kurta Midsection)",
      variations: [
        {
          label: "V1: Center",
          text: 'Mid-fashion shot in strict portrait orientation.\r\nFRAMING: Crop starting from the upper neckline area and ending at the upper mid-section. Detail shot focusing on the garment fabric.\r\nPOSE: Static fontal stance.\r\nGARMENT: This is the "Texture Shot." Focus is entirely on the TRANSITION from the bodice (yoke) to the kurta (kalidar). The gathers, pleats, and waistband stitching are the heroes.\r\nShot on 100mm lens.',
          img: "chudidhar/pose7_v1.png",
        },
        {
          label: "V2: Side Angle",
          text: "Mid-fashion shot in strict portrait orientation.\r\nPOSE: Model turns 45 degrees to the side. One arm is lifted high (as if fixing hair) to completely expose the side-seam and side-seam area.\r\nGARMENT: Shows the side zipper implementation, the side fit, and how the embroidery patterns align (or stop) at the side seam.\r\nShot on 80mm lens.",
          img: "chudidhar/pose7_v2.png",
        },
        {
          label: "V3: Texture",
          text: "Mid-length macro shot in vertical orientation.\r\nFRAMING: Extreme close-up on a specific patch of heavy embroidery or complex joinery in the midsection.\r\nPOSE: Stationary.\r\nGARMENT: Macro details of gold thread work (zari), sequins, or prints. The weave of the fabric base should be visible.\r\nShot on 100mm lens.",
          img: "chudidhar/pose7_v3.png",
        },
      ],
    },
    {
      id: "pose8",
      img: "chudidhar/pose8_v1.png",
      title: "Pose 08 — Detail (Kurta Flare & Bottoms)",
      variations: [
        {
          label: "V1: Static",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nFRAMING: mid-section down to floor.\r\nPOSE: Neutral standing. posture perfectly straight.\r\nGARMENT: Focus on the "Fall" and "Ghera" (Flare). Shows how the kurta gathers at the bottom. We can see the hemline stitching (pico/facing). Shows how the fabric interacts with gravity when still.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "chudidhar/pose8_v1.png",
        },
        {
          label: "V2: Holding Edge",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model extends one stance slightly and uses her hand to hold the edge of the kurta flare, pulling it out wide.\r\nGARMENT: This displays the total width of a single "Kali" (panel) or the full circumference of the hem. It shows the translucency of the kurta fabric when stretched vs when bunched.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "chudidhar/pose8_v2.png",
        },
        {
          label: "V3: Gentle Turn",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model performs a "Twirl" or "Spin" — caught in freeze-frame.\r\nGARMENT: The kurta is fully flared out by centrifugal force, forming a circle or semi-circle. This demonstrates the volume and grandiosity of the Chudidhar.\r\nFRAMING: Wide enough to contain the flared hem edges.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "chudidhar/pose8_v3.png",
        },
      ],
    },
    {
      id: "pose9",
      img: "chudidhar/pose9_v1.png",
      title: "Pose 09 — Detail (Side Closeup Profile)",
      variations: [
        {
          label: "V1: Clean Profile",
          text: "Upper-silhouette close-up in strict portrait orientation. FULL SIDE PROFILE (90-degree view). \r\nPOSE: Model stands perfectly straight, perpendicular to the camera. Arms rest naturally down the side, emphasizing the exact side-seam and shoulder alignment. \r\nGARMENT: High-resolution focus on the side silhouette of the upper bodice, side-neckline depth, and the complete sleeve fall. Perfect for showcasing shoulder/sleeve embroidery transitions. \r\nShot on 100mm macro lens.",
          img: "chudidhar/pose9_v1.png",
        },
        {
          label: "V2: Forward Lean",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: Model leans slightly forward, with focus and intense gaze straight ahead (off-camera). The front shoulder drops minimally, creating a dynamic diagonal line across the upper back. \r\nGARMENT: The fabric pulls slightly across the upper back, demonstrating fit tension and shoulder-yoke detailing. The sleeve shifts gracefully backwards. \r\nShot on 80mm lens.",
          img: "chudidhar/pose9_v2.png",
        },
        {
          label: "V3: Over-Shoulder Glimpse",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: While the bodice remains in strict 90-degree profile, the model turns her head gently towards the camera, face direction lowered, offering an intimate, side-eyed glance over her shoulder. \r\nGARMENT: The twisting of the upper silhouette highlights the collar/nape detailing and contrasts the profile of the sleeve against the back fabric. \r\nShot on 80mm lens.",
          img: "chudidhar/pose9_v3.png",
        },
      ],
    },
  ],
  half_saree: [
    {
      id: "pose1",
      img: "half_saree/pose1_v1.png",
      title: "Pose 01 — Main Image (Full Front)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model falls into a perfectly symmetrical, static standing position. Shoulders are pulled back and down, chest neutral. Weight is evenly distributed on both feet. Arms are completely relaxed at the sides, hanging straight down without creating wrinkles in the bodice fabric.\r\nGARMENT: The Half Saree flows straight down in its intended A-line or flared silhouette. No motion blur, no wind. The hemline settles naturally on the floor (or above footwear).\r\nFRAMING: Center-weighted composition. Head at the top third, hem near the bottom.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "half_saree/pose1_v1.png",
        },
        {
          label: "V2: Walking",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model captured mid-stride walking directly toward the camera. the stance is slightly forward, engaging the lower silhouette muscles which press gently against the fabric. Shoulders remain level. Arms swing naturally—one slightly forward, one slightly back—adding dynamic life to the pose.\r\nGARMENT: The skirt reacts to the forward motion, creating soft, fluid ripples at the hem. Fabric drapes over the forward stance, highlighting the material's weight and flow.\r\nFRAMING: Full length, ensuring the movement doesn't crop the hem or head.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "half_saree/pose1_v2.png",
        },
        {
          label: "V3: Clasped",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model stands tall and elegant. Hands are brought together at the mid-section, fingers lightly interlaced or one palm resting softly in the other. Elbows bend slightly outward, creating a small triangular gap between arm and mid-section that defines the mid-section silhouette.\r\nGARMENT: The bodice is pulled slightly taut across the upper bodice due to the arm position, showing garment fit along the torso. The skirt hangs vertically with undisturbed natural garment volume.\r\nFRAMING: Emphasis on the hourglass shape created by the arms and mid-section.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "half_saree/pose1_v3.png",
        },
      ],
    },
    {
      id: "pose2",
      img: "half_saree/pose2_v1.png",
      title: "Pose 02 — Secondary (Front Variation)",
      variations: [
        {
          label: "V1: Weight Shift",
          text: 'Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model adopts a "Contrapposto" stance—weight shifted entirely to one mid-section, creating a subtle S-curve in the posture axis. The non-weight-bearing stance is slightly bent at the knee, relaxing the posture. Arms hang loosely at the sides.\r\nGARMENT: The skirt flare of the Half Saree is accentuated on the weight-bearing side. The folds of the skirt bunch slightly on the relaxed side, showing fabric pliability.\r\nFRAMING: Vertical alignment capturing the subtle curve of the silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "half_saree/pose2_v1.png",
        },
        {
          label: "V2: Candid",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Candid, editorial style. Model's silhouette faces forward, but her head is turned 30 degrees to the side, looking off-camera. Posture is relaxed but upright. Shoulders serve as a hanger for the garment, showcasing the shoulder fit perfectly.\r\nGARMENT: The neckline sits perfectly flat against the upper neckline area. Sleeves hang straight without twisting. Details of the yoke are front and center.\r\nFRAMING: Intimate but full-length, making the viewer feel like an observer.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "half_saree/pose2_v2.png",
        },
        {
          label: "V3: Hand Flow",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Model interacts with the garment. One hand extends downwards to gently brush or hold the side flare of the Half Saree skirt. The fingers slightly lift the fabric, revealing its weight and texture. The other arm remains neutral. Head tilts slightly towards the active hand.\r\nGARMENT: The skirt is physically manipulated, creating tension lines from the hand downwards. This demonstrates the volume and abundance of cloth.\r\nFRAMING: Focus on the hand-to-fabric interaction while keeping Full length visible.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "half_saree/pose2_v3.png",
        },
      ],
    },
    {
      id: "pose3",
      img: "half_saree/pose3_v1.png",
      title: "Pose 03 — Secondary (Side View)",
      variations: [
        {
          label: "V1: Profile",
          text: "Full fashion shot in strict portrait orientation, complete side profile (90-degree view).\r\nPOSE: Model stands perpendicular to the camera. The profile silhouette is sharp. The posture axis is straight, face direction up. Arms hang directly down the side seam of the silhouette, partially obscuring the mid-section but revealing the sleeve embroidery profile.\r\nGARMENT: The side seam of the Half Saree is the focal line. The skirt's flare is visible from front to back, showing the A-line gradient. The bodice and back fit are clearly profiled.\r\nFRAMING: Full height profile, from head to floor.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "half_saree/pose3_v1.png",
        },
        {
          label: "V2: Head Turn",
          text: "Full fashion shot in strict portrait orientation, side view.\r\nPOSE: silhouette remains in strict 90-degree profile. However, the model turns her upper silhouette to look over her shoulder, making direct eye contact with the camera. The face direction is slightly dropped, creating an alluring, slight head tilt. Shoulders stay profile.\r\nGARMENT: The twisting of the upper silhouette might cause slight shifting in the neckline, revealing fabric behavior. The side profile of the sleeve is prominent.\r\nFRAMING: Captures the connection between the model's gaze and the dress's silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "half_saree/pose3_v2.png",
        },
        {
          label: "V3: Walking",
          text: 'Full fashion shot in strict portrait orientation, side profile.\r\nPOSE: Dynamic walking profile. Model is caught mid-step moving across the frame (left to right or vice versa). The leading movement pulls the skirt forward; the trailing movement pushes it back.\r\nGARMENT: The skirt creates a "motion trail" behind the model, flying out slightly due to air resistance. This showcases lightness/heaviness of the material.\r\nFRAMING: Wide enough to capture the trailing hem.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "half_saree/pose3_v3.png",
        },
      ],
    },
    {
      id: "pose4",
      img: "half_saree/pose4_v1.png",
      title: "Pose 04 — Secondary (Back View)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, back-facing view.\r\nPOSE: Model stands with her back completely to the camera. Shoulders are square and even. Head is straight, looking forward (away from camera). Hair is swept entirely to one side or tied up to reveal the upper back details.\r\nGARMENT: Focus is 100% on the back design—zipper concealment, embroidery on the upper back, and the full radial spread of the skirt as it hits the floor.\r\nFRAMING: Symmetrical backshot.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "half_saree/pose4_v1.png",
        },
        {
          label: "V2: Looking Back",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model turns her head back over her shoulder to acknowledge the camera. The bodice twists very slightly (max 10 degrees) to facilitate the upper silhouette turn, but the lower silhouette remains largely back-facing.\r\nGARMENT: The slight bodice twist creates gentle diagonal stress lines in the bodice back, showing fabric fit. The skirt remains largely static.\r\nFRAMING: Focus on the back details with the added context of the model's profile.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "half_saree/pose4_v2.png",
        },
        {
          label: "V3: Walking Away",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model is walking away from the camera. The movement is captured from behind. The garment sways naturally with the step. Shoulders move in opposition to the mid-section.\r\nGARMENT: The skirt swishes dynamically. The hemline flips up slightly at the heels. The back panels of the Half Saree ripple with motion.\r\nFRAMING: Capturing the departure, focusing on the flow of the dress in motion.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "half_saree/pose4_v3.png",
        },
      ],
    },
    {
      id: "pose5",
      img: "half_saree/pose5_v1.png",
      title: "Pose 05 — Detail (Neckline)",
      variations: [
        {
          label: "V1: Center",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nFRAMING: TIGHT crop from just above the head to the mid-section.\r\nPOSE: Model stands perfectly still, facing front. Arms are held slightly away from the bodice to ensure they don't block the side-mid-section embroidery. Shoulders dropped.\r\nGARMENT: High-resolution focus on the NECKLINE, yoke embroidery, and upper bodice detailing. Every sequin, thread, and texture variance on the bodice must be sharp.\r\nShot on 100mm lens.",
          img: "half_saree/pose5_v1.png",
        },
        {
          label: "V2: Angled",
          text: 'Upper-silhouette close-up in strict portrait orientation.\r\nANGLE: "Heroic" low angle. Camera looks up from mid-bodice level towards the face.\r\nPOSE: Model looks down into the lens with a powerful, confident expression. face direction slightly lifted.\r\nGARMENT: This angle emphasizes the fall of the fabric over the upper bodice and the upper neckline detailing of the neckline. It showcases the majesty of the Half Saree.\r\nShot on 35mm lens.',
          img: "half_saree/pose5_v2.png",
        },
        {
          label: "V3: Context",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nPOSE: Model brings one hand up to gently touch her upper neckline area or a necklace. The hand is relaxed, elegant—not gripping. It adds a sense of scale and human touch.\r\nGARMENT: The hand position draws the eye immediately to the upper neckline and shoulder embroidery. The sleeve fabric gathers slightly at the elbow due to the raised arm.\r\nShot on 80mm lens.",
          img: "half_saree/pose5_v3.png",
        },
      ],
    },
    {
      id: "pose6",
      img: "half_saree/pose6_v1.png",
      title: "Pose 06 — Detail (Sleeve)",
      variations: [
        {
          label: "V1: Lifted",
          text: "Portrait-orientation close-up focusing on one sleeve.\r\nFRAMING: Crop focusing on one arm from shoulder to fingertips.\r\nPOSE: Model lifts one arm slightly to the side (approx 45 degrees), separating it from the silhouette. The hand is relaxed, palm facing inward or down.\r\nGARMENT: This pose isolates the sleeve to show its silhouette, transparency (if any), and the density of embroidery down the length of the arm.\r\nShot on 100mm lens.",
          img: "half_saree/pose6_v1.png",
        },
        {
          label: "V2: On mid-section",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: Model places her hand firmly on her natural mid-section. The elbow bends outward at an acute angle.\r\nGARMENT: The bending of the arm causes the sleeve fabric to "bunch" and fold at the inner elbow—this is critical for showing fabric stiffness/softness. The wrist cuff embroidery is brought close to the bodice embroidery for texture comparison.\r\nShot on 100mm lens.',
          img: "half_saree/pose6_v2.png",
        },
        {
          label: "V3: Cuff Adjust",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: The model uses her opposite hand to adjust the cuff/bangle of the primary arm. It\'s a "getting ready" micro-action.\r\nGARMENT: Focus is on the cuff interaction. The tension of the opposite hand pulling slightly on the sleeve cuff reveals the stitching strength and button details (if any).\r\nShot on 100mm lens.',
          img: "half_saree/pose6_v3.png",
        },
      ],
    },
    {
      id: "pose7",
      img: "half_saree/pose7_v1.png",
      title: "Pose 07 — Detail (Blouse & Vaddanam)",
      variations: [
        {
          label: "V1: Center",
          text: 'Mid-fashion shot in strict portrait orientation.\r\nFRAMING: Crop starting from the upper neckline area and ending at the upper mid-section. Detail shot focusing on the garment fabric.\r\nPOSE: Static fontal stance.\r\nGARMENT: This is the "Texture Shot." Focus is entirely on the TRANSITION from the bodice (yoke) to the skirt (kalidar). The gathers, pleats, and waistband stitching are the heroes.\r\nShot on 100mm lens.',
          img: "half_saree/pose7_v1.png",
        },
        {
          label: "V2: Side Angle",
          text: "Mid-fashion shot in strict portrait orientation.\r\nPOSE: Model turns 45 degrees to the side. One arm is lifted high (as if fixing hair) to completely expose the side-seam and side-seam area.\r\nGARMENT: Shows the side zipper implementation, the side fit, and how the embroidery patterns align (or stop) at the side seam.\r\nShot on 80mm lens.",
          img: "half_saree/pose7_v2.png",
        },
        {
          label: "V3: Texture",
          text: "Mid-length macro shot in vertical orientation.\r\nFRAMING: Extreme close-up on a specific patch of heavy embroidery or complex joinery in the midsection.\r\nPOSE: Stationary.\r\nGARMENT: Macro details of gold thread work (zari), sequins, or prints. The weave of the fabric base should be visible.\r\nShot on 100mm lens.",
          img: "half_saree/pose7_v3.png",
        },
      ],
    },
    {
      id: "pose8",
      img: "half_saree/pose8_v1.png",
      title: "Pose 08 — Detail (Pleats & Flare)",
      variations: [
        {
          label: "V1: Static",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nFRAMING: mid-section down to floor.\r\nPOSE: Neutral standing. posture perfectly straight.\r\nGARMENT: Focus on the "Fall" and "Ghera" (Flare). Shows how the skirt gathers at the bottom. We can see the hemline stitching (pico/facing). Shows how the fabric interacts with gravity when still.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "half_saree/pose8_v1.png",
        },
        {
          label: "V2: Holding Edge",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model extends one stance slightly and uses her hand to hold the edge of the skirt flare, pulling it out wide.\r\nGARMENT: This displays the total width of a single "Kali" (panel) or the full circumference of the hem. It shows the translucency of the skirt fabric when stretched vs when bunched.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "half_saree/pose8_v2.png",
        },
        {
          label: "V3: Gentle Turn",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model performs a "Twirl" or "Spin" — caught in freeze-frame.\r\nGARMENT: The skirt is fully flared out by centrifugal force, forming a circle or semi-circle. This demonstrates the volume and grandiosity of the Half Saree.\r\nFRAMING: Wide enough to contain the flared skirt edges.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "half_saree/pose8_v3.png",
        },
      ],
    },
    {
      id: "pose9",
      img: "half_saree/pose9_v1.png",
      title: "Pose 09 — Detail (Side Closeup Profile)",
      variations: [
        {
          label: "V1: Clean Profile",
          text: "Upper-silhouette close-up in strict portrait orientation. FULL SIDE PROFILE (90-degree view). \r\nPOSE: Model stands perfectly straight, perpendicular to the camera. Arms rest naturally down the side, emphasizing the exact side-seam and shoulder alignment. \r\nGARMENT: High-resolution focus on the side silhouette of the upper bodice, side-neckline depth, and the complete sleeve fall. Perfect for showcasing shoulder/sleeve embroidery transitions. \r\nShot on 100mm macro lens.",
          img: "half_saree/pose9_v1.png",
        },
        {
          label: "V2: Forward Lean",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: Model leans slightly forward, with focus and intense gaze straight ahead (off-camera). The front shoulder drops minimally, creating a dynamic diagonal line across the upper back. \r\nGARMENT: The fabric pulls slightly across the upper back, demonstrating fit tension and shoulder-yoke detailing. The sleeve shifts gracefully backwards. \r\nShot on 80mm lens.",
          img: "half_saree/pose9_v2.png",
        },
        {
          label: "V3: Over-Shoulder Glimpse",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: While the bodice remains in strict 90-degree profile, the model turns her head gently towards the camera, face direction lowered, offering an intimate, side-eyed glance over her shoulder. \r\nGARMENT: The twisting of the upper silhouette highlights the collar/nape detailing and contrasts the profile of the sleeve against the back fabric. \r\nShot on 80mm lens.",
          img: "half_saree/pose9_v3.png",
        },
      ],
    },
  ],
  lehenga: [
    {
      id: "pose1",
      img: "lehenga/pose1_v1.png",
      title: "Pose 01 — Main Image (Full Front)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model falls into a perfectly symmetrical, static standing position. Shoulders are pulled back and down, chest neutral. Weight is evenly distributed on both feet. Arms are completely relaxed at the sides, hanging straight down without creating wrinkles in the bodice fabric.\r\nGARMENT: The Lehenga flows straight down in its intended A-line or flared silhouette. No motion blur, no wind. The hemline settles naturally on the floor (or above footwear).\r\nFRAMING: Center-weighted composition. Head at the top third, hem near the bottom.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "lehenga/pose1_v1.png",
        },
        {
          label: "V2: Walking",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model captured mid-stride walking directly toward the camera. the stance is slightly forward, engaging the lower silhouette muscles which press gently against the fabric. Shoulders remain level. Arms swing naturally—one slightly forward, one slightly back—adding dynamic life to the pose.\r\nGARMENT: The skirt reacts to the forward motion, creating soft, fluid ripples at the hem. Fabric drapes over the forward stance, highlighting the material's weight and flow.\r\nFRAMING: Full length, ensuring the movement doesn't crop the hem or head.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "lehenga/pose1_v2.png",
        },
        {
          label: "V3: Clasped",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model stands tall and elegant. Hands are brought together at the mid-section, fingers lightly interlaced or one palm resting softly in the other. Elbows bend slightly outward, creating a small triangular gap between arm and mid-section that defines the mid-section silhouette.\r\nGARMENT: The bodice is pulled slightly taut across the upper bodice due to the arm position, showing garment fit along the torso. The skirt hangs vertically with undisturbed natural garment volume.\r\nFRAMING: Emphasis on the hourglass shape created by the arms and mid-section.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "lehenga/pose1_v3.png",
        },
      ],
    },
    {
      id: "pose2",
      img: "lehenga/pose2_v1.png",
      title: "Pose 02 — Secondary (Front Variation)",
      variations: [
        {
          label: "V1: Weight Shift",
          text: 'Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model adopts a "Contrapposto" stance—weight shifted entirely to one mid-section, creating a subtle S-curve in the posture axis. The non-weight-bearing stance is slightly bent at the knee, relaxing the posture. Arms hang loosely at the sides.\r\nGARMENT: The skirt flare of the Lehenga is accentuated on the weight-bearing side. The folds of the skirt bunch slightly on the relaxed side, showing fabric pliability.\r\nFRAMING: Vertical alignment capturing the subtle curve of the silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "lehenga/pose2_v1.png",
        },
        {
          label: "V2: Candid",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Candid, editorial style. Model's silhouette faces forward, but her head is turned 30 degrees to the side, looking off-camera. Posture is relaxed but upright. Shoulders serve as a hanger for the garment, showcasing the shoulder fit perfectly.\r\nGARMENT: The neckline sits perfectly flat against the upper neckline area. Sleeves hang straight without twisting. Details of the yoke are front and center.\r\nFRAMING: Intimate but full-length, making the viewer feel like an observer.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "lehenga/pose2_v2.png",
        },
        {
          label: "V3: Hand Flow",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Model interacts with the garment. One hand extends downwards to gently brush or hold the side flare of the Lehenga skirt. The fingers slightly lift the fabric, revealing its weight and texture. The other arm remains neutral. Head tilts slightly towards the active hand.\r\nGARMENT: The skirt is physically manipulated, creating tension lines from the hand downwards. This demonstrates the volume and abundance of cloth.\r\nFRAMING: Focus on the hand-to-fabric interaction while keeping Full length visible.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "lehenga/pose2_v3.png",
        },
      ],
    },
    {
      id: "pose3",
      img: "lehenga/pose3_v1.png",
      title: "Pose 03 — Secondary (Side View)",
      variations: [
        {
          label: "V1: Profile",
          text: "Full fashion shot in strict portrait orientation, complete side profile (90-degree view).\r\nPOSE: Model stands perpendicular to the camera. The profile silhouette is sharp. The posture axis is straight, face direction up. Arms hang directly down the side seam of the silhouette, partially obscuring the mid-section but revealing the sleeve embroidery profile.\r\nGARMENT: The side seam of the Lehenga is the focal line. The skirt's flare is visible from front to back, showing the A-line gradient. The bodice and back fit are clearly profiled.\r\nFRAMING: Full height profile, from head to floor.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "lehenga/pose3_v1.png",
        },
        {
          label: "V2: Head Turn",
          text: "Full fashion shot in strict portrait orientation, side view.\r\nPOSE: silhouette remains in strict 90-degree profile. However, the model turns her upper silhouette to look over her shoulder, making direct eye contact with the camera. The face direction is slightly dropped, creating an alluring, slight head tilt. Shoulders stay profile.\r\nGARMENT: The twisting of the upper silhouette might cause slight shifting in the neckline, revealing fabric behavior. The side profile of the sleeve is prominent.\r\nFRAMING: Captures the connection between the model's gaze and the dress's silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "lehenga/pose3_v2.png",
        },
        {
          label: "V3: Walking",
          text: 'Full fashion shot in strict portrait orientation, side profile.\r\nPOSE: Dynamic walking profile. Model is caught mid-step moving across the frame (left to right or vice versa). The leading movement pulls the skirt forward; the trailing movement pushes it back.\r\nGARMENT: The skirt creates a "motion trail" behind the model, flying out slightly due to air resistance. This showcases lightness/heaviness of the material.\r\nFRAMING: Wide enough to capture the trailing hem.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "lehenga/pose3_v3.png",
        },
      ],
    },
    {
      id: "pose4",
      img: "lehenga/pose4_v1.png",
      title: "Pose 04 — Secondary (Back View)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, back-facing view.\r\nPOSE: Model stands with her back completely to the camera. Shoulders are square and even. Head is straight, looking forward (away from camera). Hair is swept entirely to one side or tied up to reveal the upper back details.\r\nGARMENT: Focus is 100% on the back design—zipper concealment, embroidery on the upper back, and the full radial spread of the skirt as it hits the floor.\r\nFRAMING: Symmetrical backshot.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "lehenga/pose4_v1.png",
        },
        {
          label: "V2: Looking Back",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model turns her head back over her shoulder to acknowledge the camera. The bodice twists very slightly (max 10 degrees) to facilitate the upper silhouette turn, but the lower silhouette remains largely back-facing.\r\nGARMENT: The slight bodice twist creates gentle diagonal stress lines in the bodice back, showing fabric fit. The skirt remains largely static.\r\nFRAMING: Focus on the back details with the added context of the model's profile.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "lehenga/pose4_v2.png",
        },
        {
          label: "V3: Walking Away",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model is walking away from the camera. The movement is captured from behind. The garment sways naturally with the step. Shoulders move in opposition to the mid-section.\r\nGARMENT: The skirt swishes dynamically. The hemline flips up slightly at the heels. The back panels of the Lehenga ripple with motion.\r\nFRAMING: Capturing the departure, focusing on the flow of the dress in motion.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "lehenga/pose4_v3.png",
        },
      ],
    },
    {
      id: "pose5",
      img: "lehenga/pose5_v1.png",
      title: "Pose 05 — Detail (Neckline)",
      variations: [
        {
          label: "V1: Center",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nFRAMING: TIGHT crop from just above the head to the mid-section.\r\nPOSE: Model stands perfectly still, facing front. Arms are held slightly away from the bodice to ensure they don't block the side-mid-section embroidery. Shoulders dropped.\r\nGARMENT: High-resolution focus on the NECKLINE, yoke embroidery, and upper bodice detailing. Every sequin, thread, and texture variance on the bodice must be sharp.\r\nShot on 100mm lens.",
          img: "lehenga/pose5_v1.png",
        },
        {
          label: "V2: Angled",
          text: 'Upper-silhouette close-up in strict portrait orientation.\r\nANGLE: "Heroic" low angle. Camera looks up from mid-bodice level towards the face.\r\nPOSE: Model looks down into the lens with a powerful, confident expression. face direction slightly lifted.\r\nGARMENT: This angle emphasizes the fall of the fabric over the upper bodice and the upper neckline detailing of the neckline. It showcases the majesty of the Lehenga.\r\nShot on 35mm lens.',
          img: "lehenga/pose5_v2.png",
        },
        {
          label: "V3: Context",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nPOSE: Model brings one hand up to gently touch her upper neckline area or a necklace. The hand is relaxed, elegant—not gripping. It adds a sense of scale and human touch.\r\nGARMENT: The hand position draws the eye immediately to the upper neckline and shoulder embroidery. The sleeve fabric gathers slightly at the elbow due to the raised arm.\r\nShot on 80mm lens.",
          img: "lehenga/pose5_v3.png",
        },
      ],
    },
    {
      id: "pose6",
      img: "lehenga/pose6_v1.png",
      title: "Pose 06 — Detail (Sleeve)",
      variations: [
        {
          label: "V1: Lifted",
          text: "Portrait-orientation close-up focusing on one sleeve.\r\nFRAMING: Crop focusing on one arm from shoulder to fingertips.\r\nPOSE: Model lifts one arm slightly to the side (approx 45 degrees), separating it from the silhouette. The hand is relaxed, palm facing inward or down.\r\nGARMENT: This pose isolates the sleeve to show its silhouette, transparency (if any), and the density of embroidery down the length of the arm.\r\nShot on 100mm lens.",
          img: "lehenga/pose6_v1.png",
        },
        {
          label: "V2: On mid-section",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: Model places her hand firmly on her natural mid-section. The elbow bends outward at an acute angle.\r\nGARMENT: The bending of the arm causes the sleeve fabric to "bunch" and fold at the inner elbow—this is critical for showing fabric stiffness/softness. The wrist cuff embroidery is brought close to the bodice embroidery for texture comparison.\r\nShot on 100mm lens.',
          img: "lehenga/pose6_v2.png",
        },
        {
          label: "V3: Cuff Adjust",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: The model uses her opposite hand to adjust the cuff/bangle of the primary arm. It\'s a "getting ready" micro-action.\r\nGARMENT: Focus is on the cuff interaction. The tension of the opposite hand pulling slightly on the sleeve cuff reveals the stitching strength and button details (if any).\r\nShot on 100mm lens.',
          img: "lehenga/pose6_v3.png",
        },
      ],
    },
    {
      id: "pose7",
      img: "lehenga/pose7_v1.png",
      title: "Pose 07 — Detail (Blouse & mid-section)",
      variations: [
        {
          label: "V1: Center",
          text: 'Mid-fashion shot in strict portrait orientation.\r\nFRAMING: Crop starting from the upper neckline area and ending at the upper mid-section. Detail shot focusing on the garment fabric.\r\nPOSE: Static fontal stance.\r\nGARMENT: This is the "Texture Shot." Focus is entirely on the TRANSITION from the bodice (yoke) to the skirt (kalidar). The gathers, pleats, and waistband stitching are the heroes.\r\nShot on 100mm lens.',
          img: "lehenga/pose7_v1.png",
        },
        {
          label: "V2: Side Angle",
          text: "Mid-fashion shot in strict portrait orientation.\r\nPOSE: Model turns 45 degrees to the side. One arm is lifted high (as if fixing hair) to completely expose the side-seam and side-seam area.\r\nGARMENT: Shows the side zipper implementation, the side fit, and how the embroidery patterns align (or stop) at the side seam.\r\nShot on 80mm lens.",
          img: "lehenga/pose7_v2.png",
        },
        {
          label: "V3: Texture",
          text: "Mid-length macro shot in vertical orientation.\r\nFRAMING: Extreme close-up on a specific patch of heavy embroidery or complex joinery in the midsection.\r\nPOSE: Stationary.\r\nGARMENT: Macro details of gold thread work (zari), sequins, or prints. The weave of the fabric base should be visible.\r\nShot on 100mm lens.",
          img: "lehenga/pose7_v3.png",
        },
      ],
    },
    {
      id: "pose8",
      img: "lehenga/pose8_v1.png",
      title: "Pose 08 — Detail (Lehenga Skirt)",
      variations: [
        {
          label: "V1: Static",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nFRAMING: mid-section down to floor.\r\nPOSE: Neutral standing. posture perfectly straight.\r\nGARMENT: Focus on the "Fall" and "Ghera" (Flare). Shows how the skirt gathers at the bottom. We can see the hemline stitching (pico/facing). Shows how the fabric interacts with gravity when still.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "lehenga/pose8_v1.png",
        },
        {
          label: "V2: Holding Edge",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model extends one stance slightly and uses her hand to hold the edge of the skirt flare, pulling it out wide.\r\nGARMENT: This displays the total width of a single "Kali" (panel) or the full circumference of the hem. It shows the translucency of the skirt fabric when stretched vs when bunched.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "lehenga/pose8_v2.png",
        },
        {
          label: "V3: Gentle Turn",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model performs a "Twirl" or "Spin" — caught in freeze-frame.\r\nGARMENT: The skirt is fully flared out by centrifugal force, forming a circle or semi-circle. This demonstrates the volume and grandiosity of the Lehenga.\r\nFRAMING: Wide enough to contain the flared skirt edges.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "lehenga/pose8_v3.png",
        },
      ],
    },
    {
      id: "pose9",
      img: "lehenga/pose9_v1.png",
      title: "Pose 09 — Detail (Side Closeup Profile)",
      variations: [
        {
          label: "V1: Clean Profile",
          text: "Upper-silhouette close-up in strict portrait orientation. FULL SIDE PROFILE (90-degree view). \r\nPOSE: Model stands perfectly straight, perpendicular to the camera. Arms rest naturally down the side, emphasizing the exact side-seam and shoulder alignment. \r\nGARMENT: High-resolution focus on the side silhouette of the upper bodice, side-neckline depth, and the complete sleeve fall. Perfect for showcasing shoulder/sleeve embroidery transitions. \r\nShot on 100mm macro lens.",
          img: "lehenga/pose9_v1.png",
        },
        {
          label: "V2: Forward Lean",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: Model leans slightly forward, with focus and intense gaze straight ahead (off-camera). The front shoulder drops minimally, creating a dynamic diagonal line across the upper back. \r\nGARMENT: The fabric pulls slightly across the upper back, demonstrating fit tension and shoulder-yoke detailing. The sleeve shifts gracefully backwards. \r\nShot on 80mm lens.",
          img: "lehenga/pose9_v2.png",
        },
        {
          label: "V3: Over-Shoulder Glimpse",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: While the bodice remains in strict 90-degree profile, the model turns her head gently towards the camera, face direction lowered, offering an intimate, side-eyed glance over her shoulder. \r\nGARMENT: The twisting of the upper silhouette highlights the collar/nape detailing and contrasts the profile of the sleeve against the back fabric. \r\nShot on 80mm lens.",
          img: "lehenga/pose9_v3.png",
        },
      ],
    },
  ],
  long_gown: [
    {
      id: "pose1",
      img: "long_gown/pose1_v1.png",
      title: "Pose 01 — Main Image (Full Front)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model falls into a perfectly symmetrical, static standing position. Shoulders are pulled back and down, chest neutral. Weight is evenly distributed on both feet. Arms are completely relaxed at the sides, hanging straight down without creating wrinkles in the bodice fabric.\r\nGARMENT: The Long Gown flows straight down in its intended A-line or flared silhouette. No motion blur, no wind. The hemline settles naturally on the floor (or above footwear).\r\nFRAMING: Center-weighted composition. Head at the top third, hem near the bottom.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "long_gown/pose1_v1.png",
        },
        {
          label: "V2: Walking",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model captured mid-stride walking directly toward the camera. the stance is slightly forward, engaging the lower silhouette muscles which press gently against the fabric. Shoulders remain level. Arms swing naturally—one slightly forward, one slightly back—adding dynamic life to the pose.\r\nGARMENT: The skirt reacts to the forward motion, creating soft, fluid ripples at the hem. Fabric drapes over the forward stance, highlighting the material's weight and flow.\r\nFRAMING: Full length, ensuring the movement doesn't crop the hem or head.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "long_gown/pose1_v2.png",
        },
        {
          label: "V3: Clasped",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model stands tall and elegant. Hands are brought together at the mid-section, fingers lightly interlaced or one palm resting softly in the other. Elbows bend slightly outward, creating a small triangular gap between arm and mid-section that defines the mid-section silhouette.\r\nGARMENT: The bodice is pulled slightly taut across the upper bodice due to the arm position, showing garment fit along the torso. The skirt hangs vertically with undisturbed natural garment volume.\r\nFRAMING: Emphasis on the hourglass shape created by the arms and mid-section.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "long_gown/pose1_v3.png",
        },
      ],
    },
    {
      id: "pose2",
      img: "long_gown/pose2_v1.png",
      title: "Pose 02 — Secondary (Front Variation)",
      variations: [
        {
          label: "V1: Weight Shift",
          text: 'Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model adopts a "Contrapposto" stance—weight shifted entirely to one mid-section, creating a subtle S-curve in the posture axis. The non-weight-bearing stance is slightly bent at the knee, relaxing the posture. Arms hang loosely at the sides.\r\nGARMENT: The skirt flare of the Long Gown is accentuated on the weight-bearing side. The folds of the skirt bunch slightly on the relaxed side, showing fabric pliability.\r\nFRAMING: Vertical alignment capturing the subtle curve of the silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "long_gown/pose2_v1.png",
        },
        {
          label: "V2: Candid",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Candid, editorial style. Model's silhouette faces forward, but her head is turned 30 degrees to the side, looking off-camera. Posture is relaxed but upright. Shoulders serve as a hanger for the garment, showcasing the shoulder fit perfectly.\r\nGARMENT: The neckline sits perfectly flat against the upper neckline area. Sleeves hang straight without twisting. Details of the yoke are front and center.\r\nFRAMING: Intimate but full-length, making the viewer feel like an observer.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "long_gown/pose2_v2.png",
        },
        {
          label: "V3: Hand Flow",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Model interacts with the garment. One hand extends downwards to gently brush or hold the side flare of the Long Gown skirt. The fingers slightly lift the fabric, revealing its weight and texture. The other arm remains neutral. Head tilts slightly towards the active hand.\r\nGARMENT: The skirt is physically manipulated, creating tension lines from the hand downwards. This demonstrates the volume and abundance of cloth.\r\nFRAMING: Focus on the hand-to-fabric interaction while keeping Full length visible.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "long_gown/pose2_v3.png",
        },
      ],
    },
    {
      id: "pose3",
      img: "long_gown/pose3_v1.png",
      title: "Pose 03 — Secondary (Side View)",
      variations: [
        {
          label: "V1: Profile",
          text: "Full fashion shot in strict portrait orientation, complete side profile (90-degree view).\r\nPOSE: Model stands perpendicular to the camera. The profile silhouette is sharp. The posture axis is straight, face direction up. Arms hang directly down the side seam of the silhouette, partially obscuring the mid-section but revealing the sleeve embroidery profile.\r\nGARMENT: The side seam of the Long Gown is the focal line. The skirt's flare is visible from front to back, showing the A-line gradient. The bodice and back fit are clearly profiled.\r\nFRAMING: Full height profile, from head to floor.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "long_gown/pose3_v1.png",
        },
        {
          label: "V2: Head Turn",
          text: "Full fashion shot in strict portrait orientation, side view.\r\nPOSE: silhouette remains in strict 90-degree profile. However, the model turns her upper silhouette to look over her shoulder, making direct eye contact with the camera. The face direction is slightly dropped, creating an alluring, slight head tilt. Shoulders stay profile.\r\nGARMENT: The twisting of the upper silhouette might cause slight shifting in the neckline, revealing fabric behavior. The side profile of the sleeve is prominent.\r\nFRAMING: Captures the connection between the model's gaze and the dress's silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "long_gown/pose3_v2.png",
        },
        {
          label: "V3: Walking",
          text: 'Full fashion shot in strict portrait orientation, side profile.\r\nPOSE: Dynamic walking profile. Model is caught mid-step moving across the frame (left to right or vice versa). The leading movement pulls the skirt forward; the trailing movement pushes it back.\r\nGARMENT: The skirt creates a "motion trail" behind the model, flying out slightly due to air resistance. This showcases lightness/heaviness of the material.\r\nFRAMING: Wide enough to capture the trailing hem.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "long_gown/pose3_v3.png",
        },
      ],
    },
    {
      id: "pose4",
      img: "long_gown/pose4_v1.png",
      title: "Pose 04 — Secondary (Back View)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, back-facing view.\r\nPOSE: Model stands with her back completely to the camera. Shoulders are square and even. Head is straight, looking forward (away from camera). Hair is swept entirely to one side or tied up to reveal the upper back details.\r\nGARMENT: Focus is 100% on the back design—zipper concealment, embroidery on the upper back, and the full radial spread of the skirt as it hits the floor.\r\nFRAMING: Symmetrical backshot.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "long_gown/pose4_v1.png",
        },
        {
          label: "V2: Looking Back",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model turns her head back over her shoulder to acknowledge the camera. The bodice twists very slightly (max 10 degrees) to facilitate the upper silhouette turn, but the lower silhouette remains largely back-facing.\r\nGARMENT: The slight bodice twist creates gentle diagonal stress lines in the bodice back, showing fabric fit. The skirt remains largely static.\r\nFRAMING: Focus on the back details with the added context of the model's profile.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "long_gown/pose4_v2.png",
        },
        {
          label: "V3: Walking Away",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model is walking away from the camera. The movement is captured from behind. The garment sways naturally with the step. Shoulders move in opposition to the mid-section.\r\nGARMENT: The skirt swishes dynamically. The hemline flips up slightly at the heels. The back panels of the Long Gown ripple with motion.\r\nFRAMING: Capturing the departure, focusing on the flow of the dress in motion.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "long_gown/pose4_v3.png",
        },
      ],
    },
    {
      id: "pose5",
      img: "long_gown/pose5_v1.png",
      title: "Pose 05 — Detail (Neckline)",
      variations: [
        {
          label: "V1: Center",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nFRAMING: TIGHT crop from just above the head to the mid-section.\r\nPOSE: Model stands perfectly still, facing front. Arms are held slightly away from the bodice to ensure they don't block the side-mid-section embroidery. Shoulders dropped.\r\nGARMENT: High-resolution focus on the NECKLINE, yoke embroidery, and upper bodice detailing. Every sequin, thread, and texture variance on the bodice must be sharp.\r\nShot on 100mm lens.",
          img: "long_gown/pose5_v1.png",
        },
        {
          label: "V2: Angled",
          text: 'Upper-silhouette close-up in strict portrait orientation.\r\nANGLE: "Heroic" low angle. Camera looks up from mid-bodice level towards the face.\r\nPOSE: Model looks down into the lens with a powerful, confident expression. face direction slightly lifted.\r\nGARMENT: This angle emphasizes the fall of the fabric over the upper bodice and the upper neckline detailing of the neckline. It showcases the majesty of the Long Gown.\r\nShot on 35mm lens.',
          img: "long_gown/pose5_v2.png",
        },
        {
          label: "V3: Context",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nPOSE: Model brings one hand up to gently touch her upper neckline area or a necklace. The hand is relaxed, elegant—not gripping. It adds a sense of scale and human touch.\r\nGARMENT: The hand position draws the eye immediately to the upper neckline and shoulder embroidery. The sleeve fabric gathers slightly at the elbow due to the raised arm.\r\nShot on 80mm lens.",
          img: "long_gown/pose5_v3.png",
        },
      ],
    },
    {
      id: "pose6",
      img: "long_gown/pose6_v1.png",
      title: "Pose 06 — Detail (Sleeve)",
      variations: [
        {
          label: "V1: Lifted",
          text: "Portrait-orientation close-up focusing on one sleeve.\r\nFRAMING: Crop focusing on one arm from shoulder to fingertips.\r\nPOSE: Model lifts one arm slightly to the side (approx 45 degrees), separating it from the silhouette. The hand is relaxed, palm facing inward or down.\r\nGARMENT: This pose isolates the sleeve to show its silhouette, transparency (if any), and the density of embroidery down the length of the arm.\r\nShot on 100mm lens.",
          img: "long_gown/pose6_v1.png",
        },
        {
          label: "V2: On mid-section",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: Model places her hand firmly on her natural mid-section. The elbow bends outward at an acute angle.\r\nGARMENT: The bending of the arm causes the sleeve fabric to "bunch" and fold at the inner elbow—this is critical for showing fabric stiffness/softness. The wrist cuff embroidery is brought close to the bodice embroidery for texture comparison.\r\nShot on 100mm lens.',
          img: "long_gown/pose6_v2.png",
        },
        {
          label: "V3: Cuff Adjust",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: The model uses her opposite hand to adjust the cuff/bangle of the primary arm. It\'s a "getting ready" micro-action.\r\nGARMENT: Focus is on the cuff interaction. The tension of the opposite hand pulling slightly on the sleeve cuff reveals the stitching strength and button details (if any).\r\nShot on 100mm lens.',
          img: "long_gown/pose6_v3.png",
        },
      ],
    },
    {
      id: "pose7",
      img: "long_gown/pose7_v1.png",
      title: "Pose 07 — Detail (Bodice & mid-section)",
      variations: [
        {
          label: "V1: Center",
          text: 'Mid-fashion shot in strict portrait orientation.\r\nFRAMING: Crop starting from the upper neckline area and ending at the upper mid-section. Detail shot focusing on the garment fabric.\r\nPOSE: Static fontal stance.\r\nGARMENT: This is the "Texture Shot." Focus is entirely on the TRANSITION from the bodice (yoke) to the skirt (kalidar). The gathers, pleats, and waistband stitching are the heroes.\r\nShot on 100mm lens.',
          img: "long_gown/pose7_v1.png",
        },
        {
          label: "V2: Side Angle",
          text: "Mid-fashion shot in strict portrait orientation.\r\nPOSE: Model turns 45 degrees to the side. One arm is lifted high (as if fixing hair) to completely expose the side-seam and side-seam area.\r\nGARMENT: Shows the side zipper implementation, the side fit, and how the embroidery patterns align (or stop) at the side seam.\r\nShot on 80mm lens.",
          img: "long_gown/pose7_v2.png",
        },
        {
          label: "V3: Texture",
          text: "Mid-length macro shot in vertical orientation.\r\nFRAMING: Extreme close-up on a specific patch of heavy embroidery or complex joinery in the midsection.\r\nPOSE: Stationary.\r\nGARMENT: Macro details of gold thread work (zari), sequins, or prints. The weave of the fabric base should be visible.\r\nShot on 100mm lens.",
          img: "long_gown/pose7_v3.png",
        },
      ],
    },
    {
      id: "pose8",
      img: "long_gown/pose8_v1.png",
      title: "Pose 08 — Detail (Gown Flare)",
      variations: [
        {
          label: "V1: Static",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nFRAMING: mid-section down to floor.\r\nPOSE: Neutral standing. posture perfectly straight.\r\nGARMENT: Focus on the "Fall" and "Ghera" (Flare). Shows how the skirt gathers at the bottom. We can see the hemline stitching (pico/facing). Shows how the fabric interacts with gravity when still.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "long_gown/pose8_v1.png",
        },
        {
          label: "V2: Holding Edge",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model extends one stance slightly and uses her hand to hold the edge of the skirt flare, pulling it out wide.\r\nGARMENT: This displays the total width of a single "Kali" (panel) or the full circumference of the hem. It shows the translucency of the skirt fabric when stretched vs when bunched.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "long_gown/pose8_v2.png",
        },
        {
          label: "V3: Gentle Turn",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model performs a "Twirl" or "Spin" — caught in freeze-frame.\r\nGARMENT: The skirt is fully flared out by centrifugal force, forming a circle or semi-circle. This demonstrates the volume and grandiosity of the Long Gown.\r\nFRAMING: Wide enough to contain the flared skirt edges.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "long_gown/pose8_v3.png",
        },
      ],
    },
    {
      id: "pose9",
      img: "long_gown/pose9_v1.png",
      title: "Pose 09 — Detail (Side Closeup Profile)",
      variations: [
        {
          label: "V1: Clean Profile",
          text: "Upper-silhouette close-up in strict portrait orientation. FULL SIDE PROFILE (90-degree view). \r\nPOSE: Model stands perfectly straight, perpendicular to the camera. Arms rest naturally down the side, emphasizing the exact side-seam and shoulder alignment. \r\nGARMENT: High-resolution focus on the side silhouette of the upper bodice, side-neckline depth, and the complete sleeve fall. Perfect for showcasing shoulder/sleeve embroidery transitions. \r\nShot on 100mm macro lens.",
          img: "long_gown/pose9_v1.png",
        },
        {
          label: "V2: Forward Lean",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: Model leans slightly forward, with focus and intense gaze straight ahead (off-camera). The front shoulder drops minimally, creating a dynamic diagonal line across the upper back. \r\nGARMENT: The fabric pulls slightly across the upper back, demonstrating fit tension and shoulder-yoke detailing. The sleeve shifts gracefully backwards. \r\nShot on 80mm lens.",
          img: "long_gown/pose9_v2.png",
        },
        {
          label: "V3: Over-Shoulder Glimpse",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: While the bodice remains in strict 90-degree profile, the model turns her head gently towards the camera, face direction lowered, offering an intimate, side-eyed glance over her shoulder. \r\nGARMENT: The twisting of the upper silhouette highlights the collar/nape detailing and contrasts the profile of the sleeve against the back fabric. \r\nShot on 80mm lens.",
          img: "long_gown/pose9_v3.png",
        },
      ],
    },
  ],
  saree_ready: [
    {
      id: "pose1",
      img: "ready_saree/pose1_v1.png",
      title: "Pose 01 — Main Image (Full Front)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model falls into a perfectly symmetrical, static standing position. Shoulders are pulled back and down, chest neutral. Weight is evenly distributed on both feet. Arms are completely relaxed at the sides, hanging straight down without creating wrinkles in the bodice fabric.\r\nGARMENT: The Ready to Wear Saree flows straight down in its intended A-line or flared silhouette. No motion blur, no wind. The hemline settles naturally on the floor (or above footwear).\r\nFRAMING: Center-weighted composition. Head at the top third, hem near the bottom.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "ready_saree/pose1_v1.png",
        },
        {
          label: "V2: Walking",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model captured mid-stride walking directly toward the camera. the stance is slightly forward, engaging the lower silhouette muscles which press gently against the fabric. Shoulders remain level. Arms swing naturally—one slightly forward, one slightly back—adding dynamic life to the pose.\r\nGARMENT: The skirt reacts to the forward motion, creating soft, fluid ripples at the hem. Fabric drapes over the forward stance, highlighting the material's weight and flow.\r\nFRAMING: Full length, ensuring the movement doesn't crop the hem or head.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "ready_saree/pose1_v2.png",
        },
        {
          label: "V3: Clasped",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model stands tall and elegant. Hands are brought together at the mid-section, fingers lightly interlaced or one palm resting softly in the other. Elbows bend slightly outward, creating a small triangular gap between arm and mid-section that defines the mid-section silhouette.\r\nGARMENT: The bodice is pulled slightly taut across the upper bodice due to the arm position, showing garment fit along the torso. The skirt hangs vertically with undisturbed natural garment volume.\r\nFRAMING: Emphasis on the hourglass shape created by the arms and mid-section.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "ready_saree/pose1_v3.png",
        },
      ],
    },
    {
      id: "pose2",
      img: "ready_saree/pose2_v1.png",
      title: "Pose 02 — Secondary (Front Variation)",
      variations: [
        {
          label: "V1: Weight Shift",
          text: 'Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model adopts a "Contrapposto" stance—weight shifted entirely to one mid-section, creating a subtle S-curve in the posture axis. The non-weight-bearing stance is slightly bent at the knee, relaxing the posture. Arms hang loosely at the sides.\r\nGARMENT: The skirt flare of the Ready to Wear Saree is accentuated on the weight-bearing side. The folds of the skirt bunch slightly on the relaxed side, showing fabric pliability.\r\nFRAMING: Vertical alignment capturing the subtle curve of the silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "ready_saree/pose2_v1.png",
        },
        {
          label: "V2: Candid",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Candid, editorial style. Model's silhouette faces forward, but her head is turned 30 degrees to the side, looking off-camera. Posture is relaxed but upright. Shoulders serve as a hanger for the garment, showcasing the shoulder fit perfectly.\r\nGARMENT: The neckline sits perfectly flat against the upper neckline area. Sleeves hang straight without twisting. Details of the yoke are front and center.\r\nFRAMING: Intimate but full-length, making the viewer feel like an observer.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "ready_saree/pose2_v2.png",
        },
        {
          label: "V3: Hand Flow",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Model interacts with the garment. One hand extends downwards to gently brush or hold the side flare of the Ready to Wear Saree skirt. The fingers slightly lift the fabric, revealing its weight and texture. The other arm remains neutral. Head tilts slightly towards the active hand.\r\nGARMENT: The skirt is physically manipulated, creating tension lines from the hand downwards. This demonstrates the volume and abundance of cloth.\r\nFRAMING: Focus on the hand-to-fabric interaction while keeping Full length visible.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "ready_saree/pose2_v3.png",
        },
      ],
    },
    {
      id: "pose3",
      img: "ready_saree/pose3_v1.png",
      title: "Pose 03 — Secondary (Side View)",
      variations: [
        {
          label: "V1: Profile",
          text: "Full fashion shot in strict portrait orientation, complete side profile (90-degree view).\r\nPOSE: Model stands perpendicular to the camera. The profile silhouette is sharp. The posture axis is straight, face direction up. Arms hang directly down the side seam of the silhouette, partially obscuring the mid-section but revealing the sleeve embroidery profile.\r\nGARMENT: The side seam of the Ready to Wear Saree is the focal line. The skirt's flare is visible from front to back, showing the A-line gradient. The bodice and back fit are clearly profiled.\r\nFRAMING: Full height profile, from head to floor.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "ready_saree/pose3_v1.png",
        },
        {
          label: "V2: Head Turn",
          text: "Full fashion shot in strict portrait orientation, side view.\r\nPOSE: silhouette remains in strict 90-degree profile. However, the model turns her upper silhouette to look over her shoulder, making direct eye contact with the camera. The face direction is slightly dropped, creating an alluring, slight head tilt. Shoulders stay profile.\r\nGARMENT: The twisting of the upper silhouette might cause slight shifting in the neckline, revealing fabric behavior. The side profile of the sleeve is prominent.\r\nFRAMING: Captures the connection between the model's gaze and the dress's silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "ready_saree/pose3_v2.png",
        },
        {
          label: "V3: Walking",
          text: 'Full fashion shot in strict portrait orientation, side profile.\r\nPOSE: Dynamic walking profile. Model is caught mid-step moving across the frame (left to right or vice versa). The leading movement pulls the skirt forward; the trailing movement pushes it back.\r\nGARMENT: The skirt creates a "motion trail" behind the model, flying out slightly due to air resistance. This showcases lightness/heaviness of the material.\r\nFRAMING: Wide enough to capture the trailing hem.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "ready_saree/pose3_v3.png",
        },
      ],
    },
    {
      id: "pose4",
      img: "ready_saree/pose4_v1.png",
      title: "Pose 04 — Secondary (Back View)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, back-facing view.\r\nPOSE: Model stands with her back completely to the camera. Shoulders are square and even. Head is straight, looking forward (away from camera). Hair is swept entirely to one side or tied up to reveal the upper back details.\r\nGARMENT: Focus is 100% on the back design—zipper concealment, embroidery on the upper back, and the full radial spread of the skirt as it hits the floor.\r\nFRAMING: Symmetrical backshot.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "ready_saree/pose4_v1.png",
        },
        {
          label: "V2: Looking Back",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model turns her head back over her shoulder to acknowledge the camera. The bodice twists very slightly (max 10 degrees) to facilitate the upper silhouette turn, but the lower silhouette remains largely back-facing.\r\nGARMENT: The slight bodice twist creates gentle diagonal stress lines in the bodice back, showing fabric fit. The skirt remains largely static.\r\nFRAMING: Focus on the back details with the added context of the model's profile.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "ready_saree/pose4_v2.png",
        },
        {
          label: "V3: Walking Away",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model is walking away from the camera. The movement is captured from behind. The garment sways naturally with the step. Shoulders move in opposition to the mid-section.\r\nGARMENT: The skirt swishes dynamically. The hemline flips up slightly at the heels. The back panels of the Ready to Wear Saree ripple with motion.\r\nFRAMING: Capturing the departure, focusing on the flow of the dress in motion.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "ready_saree/pose4_v3.png",
        },
      ],
    },
    {
      id: "pose5",
      img: "ready_saree/pose5_v1.png",
      title: "Pose 05 — Detail (Neckline)",
      variations: [
        {
          label: "V1: Center",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nFRAMING: TIGHT crop from just above the head to the mid-section.\r\nPOSE: Model stands perfectly still, facing front. Arms are held slightly away from the bodice to ensure they don't block the side-mid-section embroidery. Shoulders dropped.\r\nGARMENT: High-resolution focus on the NECKLINE, yoke embroidery, and upper bodice detailing. Every sequin, thread, and texture variance on the bodice must be sharp.\r\nShot on 100mm lens.",
          img: "ready_saree/pose5_v1.png",
        },
        {
          label: "V2: Angled",
          text: 'Upper-silhouette close-up in strict portrait orientation.\r\nANGLE: "Heroic" low angle. Camera looks up from mid-bodice level towards the face.\r\nPOSE: Model looks down into the lens with a powerful, confident expression. face direction slightly lifted.\r\nGARMENT: This angle emphasizes the fall of the fabric over the upper bodice and the upper neckline detailing of the neckline. It showcases the majesty of the Ready to Wear Saree.\r\nShot on 35mm lens.',
          img: "ready_saree/pose5_v2.png",
        },
        {
          label: "V3: Context",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nPOSE: Model brings one hand up to gently touch her upper neckline area or a necklace. The hand is relaxed, elegant—not gripping. It adds a sense of scale and human touch.\r\nGARMENT: The hand position draws the eye immediately to the upper neckline and shoulder embroidery. The sleeve fabric gathers slightly at the elbow due to the raised arm.\r\nShot on 80mm lens.",
          img: "ready_saree/pose5_v3.png",
        },
      ],
    },
    {
      id: "pose6",
      img: "ready_saree/pose6_v1.png",
      title: "Pose 06 — Detail (Sleeve)",
      variations: [
        {
          label: "V1: Lifted",
          text: "Portrait-orientation close-up focusing on one sleeve.\r\nFRAMING: Crop focusing on one arm from shoulder to fingertips.\r\nPOSE: Model lifts one arm slightly to the side (approx 45 degrees), separating it from the silhouette. The hand is relaxed, palm facing inward or down.\r\nGARMENT: This pose isolates the sleeve to show its silhouette, transparency (if any), and the density of embroidery down the length of the arm.\r\nShot on 100mm lens.",
          img: "ready_saree/pose6_v1.png",
        },
        {
          label: "V2: On mid-section",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: Model places her hand firmly on her natural mid-section. The elbow bends outward at an acute angle.\r\nGARMENT: The bending of the arm causes the sleeve fabric to "bunch" and fold at the inner elbow—this is critical for showing fabric stiffness/softness. The wrist cuff embroidery is brought close to the bodice embroidery for texture comparison.\r\nShot on 100mm lens.',
          img: "ready_saree/pose6_v2.png",
        },
        {
          label: "V3: Cuff Adjust",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: The model uses her opposite hand to adjust the cuff/bangle of the primary arm. It\'s a "getting ready" micro-action.\r\nGARMENT: Focus is on the cuff interaction. The tension of the opposite hand pulling slightly on the sleeve cuff reveals the stitching strength and button details (if any).\r\nShot on 100mm lens.',
          img: "ready_saree/pose6_v3.png",
        },
      ],
    },
    {
      id: "pose7",
      img: "ready_saree/pose7_v1.png",
      title: "Pose 07 — Detail (Blouse & Pallu)",
      variations: [
        {
          label: "V1: Center",
          text: 'Mid-fashion shot in strict portrait orientation.\r\nFRAMING: Crop starting from the upper neckline area and ending at the upper mid-section. Detail shot focusing on the garment fabric.\r\nPOSE: Static fontal stance.\r\nGARMENT: This is the "Texture Shot." Focus is entirely on the TRANSITION from the bodice (yoke) to the skirt (kalidar). The gathers, pleats, and waistband stitching are the heroes.\r\nShot on 100mm lens.',
          img: "ready_saree/pose7_v1.png",
        },
        {
          label: "V2: Side Angle",
          text: "Mid-fashion shot in strict portrait orientation.\r\nPOSE: Model turns 45 degrees to the side. One arm is lifted high (as if fixing hair) to completely expose the side-seam and side-seam area.\r\nGARMENT: Shows the side zipper implementation, the side fit, and how the embroidery patterns align (or stop) at the side seam.\r\nShot on 80mm lens.",
          img: "ready_saree/pose7_v2.png",
        },
        {
          label: "V3: Texture",
          text: "Mid-length macro shot in vertical orientation.\r\nFRAMING: Extreme close-up on a specific patch of heavy embroidery or complex joinery in the midsection.\r\nPOSE: Stationary.\r\nGARMENT: Macro details of gold thread work (zari), sequins, or prints. The weave of the fabric base should be visible.\r\nShot on 100mm lens.",
          img: "ready_saree/pose7_v3.png",
        },
      ],
    },
    {
      id: "pose8",
      img: "ready_saree/pose8_v1.png",
      title: "Pose 08 — Detail (Saree Pleats)",
      variations: [
        {
          label: "V1: Static",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nFRAMING: mid-section down to floor.\r\nPOSE: Neutral standing. posture perfectly straight.\r\nGARMENT: Focus on the "Fall" and "Ghera" (Flare). Shows how the skirt gathers at the bottom. We can see the hemline stitching (pico/facing). Shows how the fabric interacts with gravity when still.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "ready_saree/pose8_v1.png",
        },
        {
          label: "V2: Holding Edge",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model extends one stance slightly and uses her hand to hold the edge of the skirt flare, pulling it out wide.\r\nGARMENT: This displays the total width of a single "Kali" (panel) or the full circumference of the hem. It shows the translucency of the skirt fabric when stretched vs when bunched.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "ready_saree/pose8_v2.png",
        },
        {
          label: "V3: Gentle Turn",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model performs a "Twirl" or "Spin" — caught in freeze-frame.\r\nGARMENT: The skirt is fully flared out by centrifugal force, forming a circle or semi-circle. This demonstrates the volume and grandiosity of the Ready to Wear Saree.\r\nFRAMING: Wide enough to contain the flared skirt edges.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "ready_saree/pose8_v3.png",
        },
      ],
    },
    {
      id: "pose9",
      img: "ready_saree/pose9_v1.png",
      title: "Pose 09 — Detail (Side Closeup Profile)",
      variations: [
        {
          label: "V1: Clean Profile",
          text: "Upper-silhouette close-up in strict portrait orientation. FULL SIDE PROFILE (90-degree view). \r\nPOSE: Model stands perfectly straight, perpendicular to the camera. Arms rest naturally down the side, emphasizing the exact side-seam and shoulder alignment. \r\nGARMENT: High-resolution focus on the side silhouette of the upper bodice, side-neckline depth, and the complete sleeve fall. Perfect for showcasing shoulder/sleeve embroidery transitions. \r\nShot on 100mm macro lens.",
          img: "ready_saree/pose9_v1.png",
        },
        {
          label: "V2: Forward Lean",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: Model leans slightly forward, with focus and intense gaze straight ahead (off-camera). The front shoulder drops minimally, creating a dynamic diagonal line across the upper back. \r\nGARMENT: The fabric pulls slightly across the upper back, demonstrating fit tension and shoulder-yoke detailing. The sleeve shifts gracefully backwards. \r\nShot on 80mm lens.",
          img: "ready_saree/pose9_v2.png",
        },
        {
          label: "V3: Over-Shoulder Glimpse",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: While the bodice remains in strict 90-degree profile, the model turns her head gently towards the camera, face direction lowered, offering an intimate, side-eyed glance over her shoulder. \r\nGARMENT: The twisting of the upper silhouette highlights the collar/nape detailing and contrasts the profile of the sleeve against the back fabric. \r\nShot on 80mm lens.",
          img: "ready_saree/pose9_v3.png",
        },
      ],
    },
  ],
  semi_lehenga: [
    {
      id: "pose1",
      img: "semi_lehenga/pose1_v1.png",
      title: "Pose 01 — Main Image (Full Front)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model falls into a perfectly symmetrical, static standing position. Shoulders are pulled back and down, chest neutral. Weight is evenly distributed on both feet. Arms are completely relaxed at the sides, hanging straight down without creating wrinkles in the bodice fabric.\r\nGARMENT: The Semi Lehenga flows straight down in its intended A-line or flared silhouette. No motion blur, no wind. The hemline settles naturally on the floor (or above footwear).\r\nFRAMING: Center-weighted composition. Head at the top third, hem near the bottom.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "semi_lehenga/pose1_v1.png",
        },
        {
          label: "V2: Walking",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model captured mid-stride walking directly toward the camera. the stance is slightly forward, engaging the lower silhouette muscles which press gently against the fabric. Shoulders remain level. Arms swing naturally—one slightly forward, one slightly back—adding dynamic life to the pose.\r\nGARMENT: The skirt reacts to the forward motion, creating soft, fluid ripples at the hem. Fabric drapes over the forward stance, highlighting the material's weight and flow.\r\nFRAMING: Full length, ensuring the movement doesn't crop the hem or head.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "semi_lehenga/pose1_v2.png",
        },
        {
          label: "V3: Clasped",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model stands tall and elegant. Hands are brought together at the mid-section, fingers lightly interlaced or one palm resting softly in the other. Elbows bend slightly outward, creating a small triangular gap between arm and mid-section that defines the mid-section silhouette.\r\nGARMENT: The bodice is pulled slightly taut across the upper bodice due to the arm position, showing garment fit along the torso. The skirt hangs vertically with undisturbed natural garment volume.\r\nFRAMING: Emphasis on the hourglass shape created by the arms and mid-section.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "semi_lehenga/pose1_v3.png",
        },
      ],
    },
    {
      id: "pose2",
      img: "semi_lehenga/pose2_v1.png",
      title: "Pose 02 — Secondary (Front Variation)",
      variations: [
        {
          label: "V1: Weight Shift",
          text: 'Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model adopts a "Contrapposto" stance—weight shifted entirely to one mid-section, creating a subtle S-curve in the posture axis. The non-weight-bearing stance is slightly bent at the knee, relaxing the posture. Arms hang loosely at the sides.\r\nGARMENT: The skirt flare of the Semi Lehenga is accentuated on the weight-bearing side. The folds of the skirt bunch slightly on the relaxed side, showing fabric pliability.\r\nFRAMING: Vertical alignment capturing the subtle curve of the silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "semi_lehenga/pose2_v1.png",
        },
        {
          label: "V2: Candid",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Candid, editorial style. Model's silhouette faces forward, but her head is turned 30 degrees to the side, looking off-camera. Posture is relaxed but upright. Shoulders serve as a hanger for the garment, showcasing the shoulder fit perfectly.\r\nGARMENT: The neckline sits perfectly flat against the upper neckline area. Sleeves hang straight without twisting. Details of the yoke are front and center.\r\nFRAMING: Intimate but full-length, making the viewer feel like an observer.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "semi_lehenga/pose2_v2.png",
        },
        {
          label: "V3: Hand Flow",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Model interacts with the garment. One hand extends downwards to gently brush or hold the side flare of the Semi Lehenga skirt. The fingers slightly lift the fabric, revealing its weight and texture. The other arm remains neutral. Head tilts slightly towards the active hand.\r\nGARMENT: The skirt is physically manipulated, creating tension lines from the hand downwards. This demonstrates the volume and abundance of cloth.\r\nFRAMING: Focus on the hand-to-fabric interaction while keeping Full length visible.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "semi_lehenga/pose2_v3.png",
        },
      ],
    },
    {
      id: "pose3",
      img: "semi_lehenga/pose3_v1.png",
      title: "Pose 03 — Secondary (Side View)",
      variations: [
        {
          label: "V1: Profile",
          text: "Full fashion shot in strict portrait orientation, complete side profile (90-degree view).\r\nPOSE: Model stands perpendicular to the camera. The profile silhouette is sharp. The posture axis is straight, face direction up. Arms hang directly down the side seam of the silhouette, partially obscuring the mid-section but revealing the sleeve embroidery profile.\r\nGARMENT: The side seam of the Semi Lehenga is the focal line. The skirt's flare is visible from front to back, showing the A-line gradient. The bodice and back fit are clearly profiled.\r\nFRAMING: Full height profile, from head to floor.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "semi_lehenga/pose3_v1.png",
        },
        {
          label: "V2: Head Turn",
          text: "Full fashion shot in strict portrait orientation, side view.\r\nPOSE: silhouette remains in strict 90-degree profile. However, the model turns her upper silhouette to look over her shoulder, making direct eye contact with the camera. The face direction is slightly dropped, creating an alluring, slight head tilt. Shoulders stay profile.\r\nGARMENT: The twisting of the upper silhouette might cause slight shifting in the neckline, revealing fabric behavior. The side profile of the sleeve is prominent.\r\nFRAMING: Captures the connection between the model's gaze and the dress's silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "semi_lehenga/pose3_v2.png",
        },
        {
          label: "V3: Walking",
          text: 'Full fashion shot in strict portrait orientation, side profile.\r\nPOSE: Dynamic walking profile. Model is caught mid-step moving across the frame (left to right or vice versa). The leading movement pulls the skirt forward; the trailing movement pushes it back.\r\nGARMENT: The skirt creates a "motion trail" behind the model, flying out slightly due to air resistance. This showcases lightness/heaviness of the material.\r\nFRAMING: Wide enough to capture the trailing hem.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "semi_lehenga/pose3_v3.png",
        },
      ],
    },
    {
      id: "pose4",
      img: "semi_lehenga/pose4_v1.png",
      title: "Pose 04 — Secondary (Back View)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, back-facing view.\r\nPOSE: Model stands with her back completely to the camera. Shoulders are square and even. Head is straight, looking forward (away from camera). Hair is swept entirely to one side or tied up to reveal the upper back details.\r\nGARMENT: Focus is 100% on the back design—zipper concealment, embroidery on the upper back, and the full radial spread of the skirt as it hits the floor.\r\nFRAMING: Symmetrical backshot.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "semi_lehenga/pose4_v1.png",
        },
        {
          label: "V2: Looking Back",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model turns her head back over her shoulder to acknowledge the camera. The bodice twists very slightly (max 10 degrees) to facilitate the upper silhouette turn, but the lower silhouette remains largely back-facing.\r\nGARMENT: The slight bodice twist creates gentle diagonal stress lines in the bodice back, showing fabric fit. The skirt remains largely static.\r\nFRAMING: Focus on the back details with the added context of the model's profile.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "semi_lehenga/pose4_v2.png",
        },
        {
          label: "V3: Walking Away",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model is walking away from the camera. The movement is captured from behind. The garment sways naturally with the step. Shoulders move in opposition to the mid-section.\r\nGARMENT: The skirt swishes dynamically. The hemline flips up slightly at the heels. The back panels of the Semi Lehenga ripple with motion.\r\nFRAMING: Capturing the departure, focusing on the flow of the dress in motion.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "semi_lehenga/pose4_v3.png",
        },
      ],
    },
    {
      id: "pose5",
      img: "semi_lehenga/pose5_v1.png",
      title: "Pose 05 — Detail (Neckline)",
      variations: [
        {
          label: "V1: Center",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nFRAMING: TIGHT crop from just above the head to the mid-section.\r\nPOSE: Model stands perfectly still, facing front. Arms are held slightly away from the bodice to ensure they don't block the side-mid-section embroidery. Shoulders dropped.\r\nGARMENT: High-resolution focus on the NECKLINE, yoke embroidery, and upper bodice detailing. Every sequin, thread, and texture variance on the bodice must be sharp.\r\nShot on 100mm lens.",
          img: "semi_lehenga/pose5_v1.png",
        },
        {
          label: "V2: Angled",
          text: 'Upper-silhouette close-up in strict portrait orientation.\r\nANGLE: "Heroic" low angle. Camera looks up from mid-bodice level towards the face.\r\nPOSE: Model looks down into the lens with a powerful, confident expression. face direction slightly lifted.\r\nGARMENT: This angle emphasizes the fall of the fabric over the upper bodice and the upper neckline detailing of the neckline. It showcases the majesty of the Semi Lehenga.\r\nShot on 35mm lens.',
          img: "semi_lehenga/pose5_v2.png",
        },
        {
          label: "V3: Context",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nPOSE: Model brings one hand up to gently touch her upper neckline area or a necklace. The hand is relaxed, elegant—not gripping. It adds a sense of scale and human touch.\r\nGARMENT: The hand position draws the eye immediately to the upper neckline and shoulder embroidery. The sleeve fabric gathers slightly at the elbow due to the raised arm.\r\nShot on 80mm lens.",
          img: "semi_lehenga/pose5_v3.png",
        },
      ],
    },
    {
      id: "pose6",
      img: "semi_lehenga/pose6_v1.png",
      title: "Pose 06 — Detail (Sleeve)",
      variations: [
        {
          label: "V1: Lifted",
          text: "Portrait-orientation close-up focusing on one sleeve.\r\nFRAMING: Crop focusing on one arm from shoulder to fingertips.\r\nPOSE: Model lifts one arm slightly to the side (approx 45 degrees), separating it from the silhouette. The hand is relaxed, palm facing inward or down.\r\nGARMENT: This pose isolates the sleeve to show its silhouette, transparency (if any), and the density of embroidery down the length of the arm.\r\nShot on 100mm lens.",
          img: "semi_lehenga/pose6_v1.png",
        },
        {
          label: "V2: On mid-section",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: Model places her hand firmly on her natural mid-section. The elbow bends outward at an acute angle.\r\nGARMENT: The bending of the arm causes the sleeve fabric to "bunch" and fold at the inner elbow—this is critical for showing fabric stiffness/softness. The wrist cuff embroidery is brought close to the bodice embroidery for texture comparison.\r\nShot on 100mm lens.',
          img: "semi_lehenga/pose6_v2.png",
        },
        {
          label: "V3: Cuff Adjust",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: The model uses her opposite hand to adjust the cuff/bangle of the primary arm. It\'s a "getting ready" micro-action.\r\nGARMENT: Focus is on the cuff interaction. The tension of the opposite hand pulling slightly on the sleeve cuff reveals the stitching strength and button details (if any).\r\nShot on 100mm lens.',
          img: "semi_lehenga/pose6_v3.png",
        },
      ],
    },
    {
      id: "pose7",
      img: "semi_lehenga/pose7_v1.png",
      title: "Pose 07 — Detail (Blouse & mid-section)",
      variations: [
        {
          label: "V1: Center",
          text: 'Mid-fashion shot in strict portrait orientation.\r\nFRAMING: Crop starting from the upper neckline area and ending at the upper mid-section. Detail shot focusing on the garment fabric.\r\nPOSE: Static fontal stance.\r\nGARMENT: This is the "Texture Shot." Focus is entirely on the TRANSITION from the bodice (yoke) to the skirt (kalidar). The gathers, pleats, and waistband stitching are the heroes.\r\nShot on 100mm lens.',
          img: "semi_lehenga/pose7_v1.png",
        },
        {
          label: "V2: Side Angle",
          text: "Mid-fashion shot in strict portrait orientation.\r\nPOSE: Model turns 45 degrees to the side. One arm is lifted high (as if fixing hair) to completely expose the side-seam and side-seam area.\r\nGARMENT: Shows the side zipper implementation, the side fit, and how the embroidery patterns align (or stop) at the side seam.\r\nShot on 80mm lens.",
          img: "semi_lehenga/pose7_v2.png",
        },
        {
          label: "V3: Texture",
          text: "Mid-length macro shot in vertical orientation.\r\nFRAMING: Extreme close-up on a specific patch of heavy embroidery or complex joinery in the midsection.\r\nPOSE: Stationary.\r\nGARMENT: Macro details of gold thread work (zari), sequins, or prints. The weave of the fabric base should be visible.\r\nShot on 100mm lens.",
          img: "semi_lehenga/pose7_v3.png",
        },
      ],
    },
    {
      id: "pose8",
      img: "semi_lehenga/pose8_v1.png",
      title: "Pose 08 — Detail (Lehenga Skirt)",
      variations: [
        {
          label: "V1: Static",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nFRAMING: mid-section down to floor.\r\nPOSE: Neutral standing. posture perfectly straight.\r\nGARMENT: Focus on the "Fall" and "Ghera" (Flare). Shows how the skirt gathers at the bottom. We can see the hemline stitching (pico/facing). Shows how the fabric interacts with gravity when still.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "semi_lehenga/pose8_v1.png",
        },
        {
          label: "V2: Holding Edge",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model extends one stance slightly and uses her hand to hold the edge of the skirt flare, pulling it out wide.\r\nGARMENT: This displays the total width of a single "Kali" (panel) or the full circumference of the hem. It shows the translucency of the skirt fabric when stretched vs when bunched.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "semi_lehenga/pose8_v2.png",
        },
        {
          label: "V3: Gentle Turn",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model performs a "Twirl" or "Spin" — caught in freeze-frame.\r\nGARMENT: The skirt is fully flared out by centrifugal force, forming a circle or semi-circle. This demonstrates the volume and grandiosity of the Semi Lehenga.\r\nFRAMING: Wide enough to contain the flared skirt edges.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "semi_lehenga/pose8_v3.png",
        },
      ],
    },
    {
      id: "pose9",
      img: "semi_lehenga/pose9_v1.png",
      title: "Pose 09 — Detail (Side Closeup Profile)",
      variations: [
        {
          label: "V1: Clean Profile",
          text: "Upper-silhouette close-up in strict portrait orientation. FULL SIDE PROFILE (90-degree view). \r\nPOSE: Model stands perfectly straight, perpendicular to the camera. Arms rest naturally down the side, emphasizing the exact side-seam and shoulder alignment. \r\nGARMENT: High-resolution focus on the side silhouette of the upper bodice, side-neckline depth, and the complete sleeve fall. Perfect for showcasing shoulder/sleeve embroidery transitions. \r\nShot on 100mm macro lens.",
          img: "semi_lehenga/pose9_v1.png",
        },
        {
          label: "V2: Forward Lean",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: Model leans slightly forward, with focus and intense gaze straight ahead (off-camera). The front shoulder drops minimally, creating a dynamic diagonal line across the upper back. \r\nGARMENT: The fabric pulls slightly across the upper back, demonstrating fit tension and shoulder-yoke detailing. The sleeve shifts gracefully backwards. \r\nShot on 80mm lens.",
          img: "semi_lehenga/pose9_v2.png",
        },
        {
          label: "V3: Over-Shoulder Glimpse",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: While the bodice remains in strict 90-degree profile, the model turns her head gently towards the camera, face direction lowered, offering an intimate, side-eyed glance over her shoulder. \r\nGARMENT: The twisting of the upper silhouette highlights the collar/nape detailing and contrasts the profile of the sleeve against the back fabric. \r\nShot on 80mm lens.",
          img: "semi_lehenga/pose9_v3.png",
        },
      ],
    },
  ],
  sharara: [
    {
      id: "pose1",
      img: "sharara/pose1_v1.png",
      title: "Pose 01 — Main Image (Full Front)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model falls into a perfectly symmetrical, static standing position. Shoulders are pulled back and down, chest neutral. Weight is evenly distributed on both feet. Arms are completely relaxed at the sides, hanging straight down without creating wrinkles in the bodice fabric.\r\nGARMENT: The Sharara flows straight down in its intended A-line or flared silhouette. No motion blur, no wind. The hemline settles naturally on the floor (or above footwear).\r\nFRAMING: Center-weighted composition. Head at the top third, hem near the bottom.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "sharara/pose1_v1.png",
        },
        {
          label: "V2: Walking",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model captured mid-stride walking directly toward the camera. the stance is slightly forward, engaging the lower silhouette muscles which press gently against the fabric. Shoulders remain level. Arms swing naturally—one slightly forward, one slightly back—adding dynamic life to the pose.\r\nGARMENT: The skirt reacts to the forward motion, creating soft, fluid ripples at the hem. Fabric drapes over the forward stance, highlighting the material's weight and flow.\r\nFRAMING: Full length, ensuring the movement doesn't crop the hem or head.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "sharara/pose1_v2.png",
        },
        {
          label: "V3: Clasped",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model stands tall and elegant. Hands are brought together at the mid-section, fingers lightly interlaced or one palm resting softly in the other. Elbows bend slightly outward, creating a small triangular gap between arm and mid-section that defines the mid-section silhouette.\r\nGARMENT: The bodice is pulled slightly taut across the upper bodice due to the arm position, showing garment fit along the torso. The skirt hangs vertically with undisturbed natural garment volume.\r\nFRAMING: Emphasis on the hourglass shape created by the arms and mid-section.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "sharara/pose1_v3.png",
        },
      ],
    },
    {
      id: "pose2",
      img: "sharara/pose2_v1.png",
      title: "Pose 02 — Secondary (Front Variation)",
      variations: [
        {
          label: "V1: Weight Shift",
          text: 'Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model adopts a "Contrapposto" stance—weight shifted entirely to one mid-section, creating a subtle S-curve in the posture axis. The non-weight-bearing stance is slightly bent at the knee, relaxing the posture. Arms hang loosely at the sides.\r\nGARMENT: The skirt flare of the Sharara is accentuated on the weight-bearing side. The folds of the skirt bunch slightly on the relaxed side, showing fabric pliability.\r\nFRAMING: Vertical alignment capturing the subtle curve of the silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "sharara/pose2_v1.png",
        },
        {
          label: "V2: Candid",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Candid, editorial style. Model's silhouette faces forward, but her head is turned 30 degrees to the side, looking off-camera. Posture is relaxed but upright. Shoulders serve as a hanger for the garment, showcasing the shoulder fit perfectly.\r\nGARMENT: The neckline sits perfectly flat against the upper neckline area. Sleeves hang straight without twisting. Details of the yoke are front and center.\r\nFRAMING: Intimate but full-length, making the viewer feel like an observer.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "sharara/pose2_v2.png",
        },
        {
          label: "V3: Hand Flow",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Model interacts with the garment. One hand extends downwards to gently brush or hold the side flare of the Sharara skirt. The fingers slightly lift the fabric, revealing its weight and texture. The other arm remains neutral. Head tilts slightly towards the active hand.\r\nGARMENT: The skirt is physically manipulated, creating tension lines from the hand downwards. This demonstrates the volume and abundance of cloth.\r\nFRAMING: Focus on the hand-to-fabric interaction while keeping Full length visible.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "sharara/pose2_v3.png",
        },
      ],
    },
    {
      id: "pose3",
      img: "sharara/pose3_v1.png",
      title: "Pose 03 — Secondary (Side View)",
      variations: [
        {
          label: "V1: Profile",
          text: "Full fashion shot in strict portrait orientation, complete side profile (90-degree view).\r\nPOSE: Model stands perpendicular to the camera. The profile silhouette is sharp. The posture axis is straight, face direction up. Arms hang directly down the side seam of the silhouette, partially obscuring the mid-section but revealing the sleeve embroidery profile.\r\nGARMENT: The side seam of the Sharara is the focal line. The skirt's flare is visible from front to back, showing the A-line gradient. The bodice and back fit are clearly profiled.\r\nFRAMING: Full height profile, from head to floor.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "sharara/pose3_v1.png",
        },
        {
          label: "V2: Head Turn",
          text: "Full fashion shot in strict portrait orientation, side view.\r\nPOSE: silhouette remains in strict 90-degree profile. However, the model turns her upper silhouette to look over her shoulder, making direct eye contact with the camera. The face direction is slightly dropped, creating an alluring, slight head tilt. Shoulders stay profile.\r\nGARMENT: The twisting of the upper silhouette might cause slight shifting in the neckline, revealing fabric behavior. The side profile of the sleeve is prominent.\r\nFRAMING: Captures the connection between the model's gaze and the dress's silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "sharara/pose3_v2.png",
        },
        {
          label: "V3: Walking",
          text: 'Full fashion shot in strict portrait orientation, side profile.\r\nPOSE: Dynamic walking profile. Model is caught mid-step moving across the frame (left to right or vice versa). The leading movement pulls the skirt forward; the trailing movement pushes it back.\r\nGARMENT: The skirt creates a "motion trail" behind the model, flying out slightly due to air resistance. This showcases lightness/heaviness of the material.\r\nFRAMING: Wide enough to capture the trailing hem.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "sharara/pose3_v3.png",
        },
      ],
    },
    {
      id: "pose4",
      img: "sharara/pose4_v1.png",
      title: "Pose 04 — Secondary (Back View)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, back-facing view.\r\nPOSE: Model stands with her back completely to the camera. Shoulders are square and even. Head is straight, looking forward (away from camera). Hair is swept entirely to one side or tied up to reveal the upper back details.\r\nGARMENT: Focus is 100% on the back design—zipper concealment, embroidery on the upper back, and the full radial spread of the skirt as it hits the floor.\r\nFRAMING: Symmetrical backshot.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "sharara/pose4_v1.png",
        },
        {
          label: "V2: Looking Back",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model turns her head back over her shoulder to acknowledge the camera. The bodice twists very slightly (max 10 degrees) to facilitate the upper silhouette turn, but the lower silhouette remains largely back-facing.\r\nGARMENT: The slight bodice twist creates gentle diagonal stress lines in the bodice back, showing fabric fit. The skirt remains largely static.\r\nFRAMING: Focus on the back details with the added context of the model's profile.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "sharara/pose4_v2.png",
        },
        {
          label: "V3: Walking Away",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model is walking away from the camera. The movement is captured from behind. The garment sways naturally with the step. Shoulders move in opposition to the mid-section.\r\nGARMENT: The skirt swishes dynamically. The hemline flips up slightly at the heels. The back panels of the Sharara ripple with motion.\r\nFRAMING: Capturing the departure, focusing on the flow of the dress in motion.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "sharara/pose4_v3.png",
        },
      ],
    },
    {
      id: "pose5",
      img: "sharara/pose5_v1.png",
      title: "Pose 05 — Detail (Neckline)",
      variations: [
        {
          label: "V1: Center",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nFRAMING: TIGHT crop from just above the head to the mid-section.\r\nPOSE: Model stands perfectly still, facing front. Arms are held slightly away from the bodice to ensure they don't block the side-mid-section embroidery. Shoulders dropped.\r\nGARMENT: High-resolution focus on the NECKLINE, yoke embroidery, and upper bodice detailing. Every sequin, thread, and texture variance on the bodice must be sharp.\r\nShot on 100mm lens.",
          img: "sharara/pose5_v1.png",
        },
        {
          label: "V2: Angled",
          text: 'Upper-silhouette close-up in strict portrait orientation.\r\nANGLE: "Heroic" low angle. Camera looks up from mid-bodice level towards the face.\r\nPOSE: Model looks down into the lens with a powerful, confident expression. face direction slightly lifted.\r\nGARMENT: This angle emphasizes the fall of the fabric over the upper bodice and the upper neckline detailing of the neckline. It showcases the majesty of the Sharara.\r\nShot on 35mm lens.',
          img: "sharara/pose5_v2.png",
        },
        {
          label: "V3: Context",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nPOSE: Model brings one hand up to gently touch her upper neckline area or a necklace. The hand is relaxed, elegant—not gripping. It adds a sense of scale and human touch.\r\nGARMENT: The hand position draws the eye immediately to the upper neckline and shoulder embroidery. The sleeve fabric gathers slightly at the elbow due to the raised arm.\r\nShot on 80mm lens.",
          img: "sharara/pose5_v3.png",
        },
      ],
    },
    {
      id: "pose6",
      img: "sharara/pose6_v1.png",
      title: "Pose 06 — Detail (Sleeve)",
      variations: [
        {
          label: "V1: Lifted",
          text: "Portrait-orientation close-up focusing on one sleeve.\r\nFRAMING: Crop focusing on one arm from shoulder to fingertips.\r\nPOSE: Model lifts one arm slightly to the side (approx 45 degrees), separating it from the silhouette. The hand is relaxed, palm facing inward or down.\r\nGARMENT: This pose isolates the sleeve to show its silhouette, transparency (if any), and the density of embroidery down the length of the arm.\r\nShot on 100mm lens.",
          img: "sharara/pose6_v1.png",
        },
        {
          label: "V2: On mid-section",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: Model places her hand firmly on her natural mid-section. The elbow bends outward at an acute angle.\r\nGARMENT: The bending of the arm causes the sleeve fabric to "bunch" and fold at the inner elbow—this is critical for showing fabric stiffness/softness. The wrist cuff embroidery is brought close to the bodice embroidery for texture comparison.\r\nShot on 100mm lens.',
          img: "sharara/pose6_v2.png",
        },
        {
          label: "V3: Cuff Adjust",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: The model uses her opposite hand to adjust the cuff/bangle of the primary arm. It\'s a "getting ready" micro-action.\r\nGARMENT: Focus is on the cuff interaction. The tension of the opposite hand pulling slightly on the sleeve cuff reveals the stitching strength and button details (if any).\r\nShot on 100mm lens.',
          img: "sharara/pose6_v3.png",
        },
      ],
    },
    {
      id: "pose7",
      img: "sharara/pose7_v1.png",
      title: "Pose 07 — Detail (Kurta Midsection)",
      variations: [
        {
          label: "V1: Center",
          text: 'Mid-fashion shot in strict portrait orientation.\r\nFRAMING: Crop starting from the upper neckline area and ending at the upper mid-section. Detail shot focusing on the garment fabric.\r\nPOSE: Static fontal stance.\r\nGARMENT: This is the "Texture Shot." Focus is entirely on the TRANSITION from the bodice (yoke) to the skirt (kalidar). The gathers, pleats, and waistband stitching are the heroes.\r\nShot on 100mm lens.',
          img: "sharara/pose7_v1.png",
        },
        {
          label: "V2: Side Angle",
          text: "Mid-fashion shot in strict portrait orientation.\r\nPOSE: Model turns 45 degrees to the side. One arm is lifted high (as if fixing hair) to completely expose the side-seam and side-seam area.\r\nGARMENT: Shows the side zipper implementation, the side fit, and how the embroidery patterns align (or stop) at the side seam.\r\nShot on 80mm lens.",
          img: "sharara/pose7_v2.png",
        },
        {
          label: "V3: Texture",
          text: "Mid-length macro shot in vertical orientation.\r\nFRAMING: Extreme close-up on a specific patch of heavy embroidery or complex joinery in the midsection.\r\nPOSE: Stationary.\r\nGARMENT: Macro details of gold thread work (zari), sequins, or prints. The weave of the fabric base should be visible.\r\nShot on 100mm lens.",
          img: "sharara/pose7_v3.png",
        },
      ],
    },
    {
      id: "pose8",
      img: "sharara/pose8_v1.png",
      title: "Pose 08 — Detail (Sharara Pants Flare)",
      variations: [
        {
          label: "V1: Static",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nFRAMING: mid-section down to floor.\r\nPOSE: Neutral standing. posture perfectly straight.\r\nGARMENT: Focus on the "Fall" and "Ghera" (Flare). Shows how the skirt gathers at the bottom. We can see the hemline stitching (pico/facing). Shows how the fabric interacts with gravity when still.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "sharara/pose8_v1.png",
        },
        {
          label: "V2: Holding Edge",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model extends one stance slightly and uses her hand to hold the edge of the skirt flare, pulling it out wide.\r\nGARMENT: This displays the total width of a single "Kali" (panel) or the full circumference of the hem. It shows the translucency of the skirt fabric when stretched vs when bunched.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "sharara/pose8_v2.png",
        },
        {
          label: "V3: Gentle Turn",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model performs a "Twirl" or "Spin" — caught in freeze-frame.\r\nGARMENT: The skirt is fully flared out by centrifugal force, forming a circle or semi-circle. This demonstrates the volume and grandiosity of the Sharara.\r\nFRAMING: Wide enough to contain the flared skirt edges.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "sharara/pose8_v3.png",
        },
      ],
    },
    {
      id: "pose9",
      img: "sharara/pose9_v1.png",
      title: "Pose 09 — Detail (Side Closeup Profile)",
      variations: [
        {
          label: "V1: Clean Profile",
          text: "Upper-silhouette close-up in strict portrait orientation. FULL SIDE PROFILE (90-degree view). \r\nPOSE: Model stands perfectly straight, perpendicular to the camera. Arms rest naturally down the side, emphasizing the exact side-seam and shoulder alignment. \r\nGARMENT: High-resolution focus on the side silhouette of the upper bodice, side-neckline depth, and the complete sleeve fall. Perfect for showcasing shoulder/sleeve embroidery transitions. \r\nShot on 100mm macro lens.",
          img: "sharara/pose9_v1.png",
        },
        {
          label: "V2: Forward Lean",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: Model leans slightly forward, with focus and intense gaze straight ahead (off-camera). The front shoulder drops minimally, creating a dynamic diagonal line across the upper back. \r\nGARMENT: The fabric pulls slightly across the upper back, demonstrating fit tension and shoulder-yoke detailing. The sleeve shifts gracefully backwards. \r\nShot on 80mm lens.",
          img: "sharara/pose9_v2.png",
        },
        {
          label: "V3: Over-Shoulder Glimpse",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: While the bodice remains in strict 90-degree profile, the model turns her head gently towards the camera, face direction lowered, offering an intimate, side-eyed glance over her shoulder. \r\nGARMENT: The twisting of the upper silhouette highlights the collar/nape detailing and contrasts the profile of the sleeve against the back fabric. \r\nShot on 80mm lens.",
          img: "sharara/pose9_v3.png",
        },
      ],
    },
  ],
  tops: [
    {
      id: "pose1",
      img: "tops/pose1_v1.png",
      title: "Pose 01 — Main Image (Full Front)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model falls into a perfectly symmetrical, static standing position. Shoulders are pulled back and down, chest neutral. Weight is evenly distributed on both feet. Arms are completely relaxed at the sides, hanging straight down without creating wrinkles in the bodice fabric.\r\nGARMENT: The Tops flows straight down in its intended A-line or flared silhouette. No motion blur, no wind. The hemline settles naturally on the floor (or above footwear).\r\nFRAMING: Center-weighted composition. Head at the top third, hem near the bottom.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "tops/pose1_v1.png",
        },
        {
          label: "V2: Walking",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model captured mid-stride walking directly toward the camera. the stance is slightly forward, engaging the lower silhouette muscles which press gently against the fabric. Shoulders remain level. Arms swing naturally—one slightly forward, one slightly back—adding dynamic life to the pose.\r\nGARMENT: The top reacts to the forward motion, creating soft, fluid ripples at the hem. Fabric drapes over the forward stance, highlighting the material's weight and flow.\r\nFRAMING: Full length, ensuring the movement doesn't crop the hem or head.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "tops/pose1_v2.png",
        },
        {
          label: "V3: Clasped",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model stands tall and elegant. Hands are brought together at the mid-section, fingers lightly interlaced or one palm resting softly in the other. Elbows bend slightly outward, creating a small triangular gap between arm and mid-section that defines the mid-section silhouette.\r\nGARMENT: The bodice is pulled slightly taut across the upper bodice due to the arm position, showing garment fit along the torso. The top hangs vertically with undisturbed natural garment volume.\r\nFRAMING: Emphasis on the hourglass shape created by the arms and mid-section.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "tops/pose1_v3.png",
        },
      ],
    },
    {
      id: "pose2",
      img: "tops/pose2_v1.png",
      title: "Pose 02 — Secondary (Front Variation)",
      variations: [
        {
          label: "V1: Weight Shift",
          text: 'Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model adopts a "Contrapposto" stance—weight shifted entirely to one mid-section, creating a subtle S-curve in the posture axis. The non-weight-bearing stance is slightly bent at the knee, relaxing the posture. Arms hang loosely at the sides.\r\nGARMENT: The skirt flare of the Tops is accentuated on the weight-bearing side. The folds of the top bunch slightly on the relaxed side, showing fabric pliability.\r\nFRAMING: Vertical alignment capturing the subtle curve of the silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "tops/pose2_v1.png",
        },
        {
          label: "V2: Candid",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Candid, editorial style. Model's silhouette faces forward, but her head is turned 30 degrees to the side, looking off-camera. Posture is relaxed but upright. Shoulders serve as a hanger for the garment, showcasing the shoulder fit perfectly.\r\nGARMENT: The neckline sits perfectly flat against the upper neckline area. Sleeves hang straight without twisting. Details of the yoke are front and center.\r\nFRAMING: Intimate but full-length, making the viewer feel like an observer.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "tops/pose2_v2.png",
        },
        {
          label: "V3: Hand Flow",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Model interacts with the garment. One hand extends downwards to gently brush or hold the side flare of the top. The fingers slightly lift the fabric, revealing its weight and texture. The other arm remains neutral. Head tilts slightly towards the active hand.\r\nGARMENT: The top is physically manipulated, creating tension lines from the hand downwards. This demonstrates the volume and abundance of cloth.\r\nFRAMING: Focus on the hand-to-fabric interaction while keeping Full length visible.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "tops/pose2_v3.png",
        },
      ],
    },
    {
      id: "pose3",
      img: "tops/pose3_v1.png",
      title: "Pose 03 — Secondary (Side View)",
      variations: [
        {
          label: "V1: Profile",
          text: "Full fashion shot in strict portrait orientation, complete side profile (90-degree view).\r\nPOSE: Model stands perpendicular to the camera. The profile silhouette is sharp. The posture axis is straight, face direction up. Arms hang directly down the side seam of the silhouette, partially obscuring the mid-section but revealing the sleeve embroidery profile.\r\nGARMENT: The side seam of the Tops is the focal line. The top's flare is visible from front to back, showing the A-line gradient. The bodice and back fit are clearly profiled.\r\nFRAMING: Full height profile, from head to floor.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "tops/pose3_v1.png",
        },
        {
          label: "V2: Head Turn",
          text: "Full fashion shot in strict portrait orientation, side view.\r\nPOSE: silhouette remains in strict 90-degree profile. However, the model turns her upper silhouette to look over her shoulder, making direct eye contact with the camera. The face direction is slightly dropped, creating an alluring, slight head tilt. Shoulders stay profile.\r\nGARMENT: The twisting of the upper silhouette might cause slight shifting in the neckline, revealing fabric behavior. The side profile of the sleeve is prominent.\r\nFRAMING: Captures the connection between the model's gaze and the dress's silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "tops/pose3_v2.png",
        },
        {
          label: "V3: Walking",
          text: 'Full fashion shot in strict portrait orientation, side profile.\r\nPOSE: Dynamic walking profile. Model is caught mid-step moving across the frame (left to right or vice versa). The leading movement pulls the fabric forward; the trailing movement pushes it back.\r\nGARMENT: The top creates a "motion trail" behind the model, flying out slightly due to air resistance. This showcases lightness/heaviness of the material.\r\nFRAMING: Wide enough to capture the trailing hem.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "tops/pose3_v3.png",
        },
      ],
    },
    {
      id: "pose4",
      img: "tops/pose4_v1.png",
      title: "Pose 04 — Secondary (Back View)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, back-facing view.\r\nPOSE: Model stands with her back completely to the camera. Shoulders are square and even. Head is straight, looking forward (away from camera). Hair is swept entirely to one side or tied up to reveal the upper back details.\r\nGARMENT: Focus is 100% on the back design—zipper concealment, embroidery on the upper back, and the full radial spread of the top as it hits the floor.\r\nFRAMING: Symmetrical backshot.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "tops/pose4_v1.png",
        },
        {
          label: "V2: Looking Back",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model turns her head back over her shoulder to acknowledge the camera. The bodice twists very slightly (max 10 degrees) to facilitate the upper silhouette turn, but the lower silhouette remains largely back-facing.\r\nGARMENT: The slight bodice twist creates gentle diagonal stress lines in the bodice back, showing fabric fit. The lower hem remains largely static.\r\nFRAMING: Focus on the back details with the added context of the model's profile.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "tops/pose4_v2.png",
        },
        {
          label: "V3: Walking Away",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model is walking away from the camera. The movement is captured from behind. The garment sways naturally with the step. Shoulders move in opposition to the mid-section.\r\nGARMENT: The top swishes dynamically. The hemline flips up slightly at the heels. The back panels of the Tops ripple with motion.\r\nFRAMING: Capturing the departure, focusing on the flow of the dress in motion.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "tops/pose4_v3.png",
        },
      ],
    },
    {
      id: "pose5",
      img: "tops/pose5_v1.png",
      title: "Pose 05 — Detail (Neckline)",
      variations: [
        {
          label: "V1: Center",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nFRAMING: TIGHT crop from just above the head to the mid-section.\r\nPOSE: Model stands perfectly still, facing front. Arms are held slightly away from the bodice to ensure they don't block the side-mid-section embroidery. Shoulders dropped.\r\nGARMENT: High-resolution focus on the NECKLINE, yoke embroidery, and upper bodice detailing. Every sequin, thread, and texture variance on the bodice must be sharp.\r\nShot on 100mm lens.",
          img: "tops/pose5_v1.png",
        },
        {
          label: "V2: Angled",
          text: 'Upper-silhouette close-up in strict portrait orientation.\r\nANGLE: "Heroic" low angle. Camera looks up from mid-bodice level towards the face.\r\nPOSE: Model looks down into the lens with a powerful, confident expression. face direction slightly lifted.\r\nGARMENT: This angle emphasizes the fall of the fabric over the upper bodice and the upper neckline detailing of the neckline. It showcases the majesty of the Tops.\r\nShot on 35mm lens.',
          img: "tops/pose5_v2.png",
        },
        {
          label: "V3: Context",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nPOSE: Model brings one hand up to gently touch her upper neckline area or a necklace. The hand is relaxed, elegant—not gripping. It adds a sense of scale and human touch.\r\nGARMENT: The hand position draws the eye immediately to the upper neckline and shoulder embroidery. The sleeve fabric gathers slightly at the elbow due to the raised arm.\r\nShot on 80mm lens.",
          img: "tops/pose5_v3.png",
        },
      ],
    },
    {
      id: "pose6",
      img: "tops/pose6_v1.png",
      title: "Pose 06 — Detail (Sleeve)",
      variations: [
        {
          label: "V1: Lifted",
          text: "Portrait-orientation close-up focusing on one sleeve.\r\nFRAMING: Crop focusing on one arm from shoulder to fingertips.\r\nPOSE: Model lifts one arm slightly to the side (approx 45 degrees), separating it from the silhouette. The hand is relaxed, palm facing inward or down.\r\nGARMENT: This pose isolates the sleeve to show its silhouette, transparency (if any), and the density of embroidery down the length of the arm.\r\nShot on 100mm lens.",
          img: "tops/pose6_v1.png",
        },
        {
          label: "V2: On mid-section",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: Model places her hand firmly on her natural mid-section. The elbow bends outward at an acute angle.\r\nGARMENT: The bending of the arm causes the sleeve fabric to "bunch" and fold at the inner elbow—this is critical for showing fabric stiffness/softness. The wrist cuff embroidery is brought close to the bodice embroidery for texture comparison.\r\nShot on 100mm lens.',
          img: "tops/pose6_v2.png",
        },
        {
          label: "V3: Cuff Adjust",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: The model uses her opposite hand to adjust the cuff/bangle of the primary arm. It\'s a "getting ready" micro-action.\r\nGARMENT: Focus is on the cuff interaction. The tension of the opposite hand pulling slightly on the sleeve cuff reveals the stitching strength and button details (if any).\r\nShot on 100mm lens.',
          img: "tops/pose6_v3.png",
        },
      ],
    },
    {
      id: "pose7",
      img: "tops/pose7_v1.png",
      title: "Pose 07 — Detail (Midsection)",
      variations: [
        {
          label: "V1: Center",
          text: 'Mid-fashion shot in strict portrait orientation.\r\nFRAMING: Crop starting from the upper neckline area and ending at the upper mid-section. Detail shot focusing on the garment fabric.\r\nPOSE: Static fontal stance.\r\nGARMENT: This is the "Texture Shot." Focus is entirely on the TRANSITION from the bodice (yoke) to the skirt (kalidar). The gathers, pleats, and waistband stitching are the heroes.\r\nShot on 100mm lens.',
          img: "tops/pose7_v1.png",
        },
        {
          label: "V2: Side Angle",
          text: "Mid-fashion shot in strict portrait orientation.\r\nPOSE: Model turns 45 degrees to the side. One arm is lifted high (as if fixing hair) to completely expose the side-seam and side-seam area.\r\nGARMENT: Shows the side zipper implementation, the side fit, and how the embroidery patterns align (or stop) at the side seam.\r\nShot on 80mm lens.",
          img: "tops/pose7_v2.png",
        },
        {
          label: "V3: Texture",
          text: "Mid-length macro shot in vertical orientation.\r\nFRAMING: Extreme close-up on a specific patch of heavy embroidery or complex joinery in the midsection.\r\nPOSE: Stationary.\r\nGARMENT: Macro details of gold thread work (zari), sequins, or prints. The weave of the fabric base should be visible.\r\nShot on 100mm lens.",
          img: "tops/pose7_v3.png",
        },
      ],
    },
    {
      id: "pose8",
      img: "tops/pose8_v1.png",
      title: "Pose 08 — Detail (Lower Hem)",
      variations: [
        {
          label: "V1: Static",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nFRAMING: mid-section down to floor.\r\nPOSE: Neutral standing. posture perfectly straight.\r\nGARMENT: Focus on the "Fall" and "Ghera" (Flare). Shows how the fabric gathers at the bottom. We can see the hemline stitching (pico/facing). Shows how the fabric interacts with gravity when still.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "tops/pose8_v1.png",
        },
        {
          label: "V2: Holding Edge",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model extends one stance slightly and uses her hand to hold the edge of the top flare, pulling it out wide.\r\nGARMENT: This displays the total width of a single "Kali" (panel) or the full circumference of the hem. It shows the translucency of the fabric when stretched vs when bunched.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "tops/pose8_v2.png",
        },
        {
          label: "V3: Gentle Turn",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model performs a "Twirl" or "Spin" — caught in freeze-frame.\r\nGARMENT: The top is fully flared out by centrifugal force, forming a circle or semi-circle. This demonstrates the volume and grandiosity of the Tops.\r\nFRAMING: Wide enough to contain the flared hem edges.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "tops/pose8_v3.png",
        },
      ],
    },
    {
      id: "pose9",
      img: "tops/pose9_v1.png",
      title: "Pose 09 — Detail (Side Closeup Profile)",
      variations: [
        {
          label: "V1: Clean Profile",
          text: "Upper-silhouette close-up in strict portrait orientation. FULL SIDE PROFILE (90-degree view). \r\nPOSE: Model stands perfectly straight, perpendicular to the camera. Arms rest naturally down the side, emphasizing the exact side-seam and shoulder alignment. \r\nGARMENT: High-resolution focus on the side silhouette of the upper bodice, side-neckline depth, and the complete sleeve fall. Perfect for showcasing shoulder/sleeve embroidery transitions. \r\nShot on 100mm macro lens.",
          img: "tops/pose9_v1.png",
        },
        {
          label: "V2: Forward Lean",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: Model leans slightly forward, with focus and intense gaze straight ahead (off-camera). The front shoulder drops minimally, creating a dynamic diagonal line across the upper back. \r\nGARMENT: The fabric pulls slightly across the upper back, demonstrating fit tension and shoulder-yoke detailing. The sleeve shifts gracefully backwards. \r\nShot on 80mm lens.",
          img: "tops/pose9_v2.png",
        },
        {
          label: "V3: Over-Shoulder Glimpse",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: While the bodice remains in strict 90-degree profile, the model turns her head gently towards the camera, face direction lowered, offering an intimate, side-eyed glance over her shoulder. \r\nGARMENT: The twisting of the upper silhouette highlights the collar/nape detailing and contrasts the profile of the sleeve against the back fabric. \r\nShot on 80mm lens.",
          img: "tops/pose9_v3.png",
        },
      ],
    },
  ],
  two_piece: [
    {
      id: "pose1",
      img: "two_piece/pose1_v1.png",
      title: "Pose 01 — Main Image (Full Front)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model falls into a perfectly symmetrical, static standing position. Shoulders are pulled back and down, chest neutral. Weight is evenly distributed on both feet. Arms are completely relaxed at the sides, hanging straight down without creating wrinkles in the bodice fabric.\r\nGARMENT: The Two Piece flows straight down in its intended A-line or flared silhouette. No motion blur, no wind. The hemline settles naturally on the floor (or above footwear).\r\nFRAMING: Center-weighted composition. Head at the top third, hem near the bottom.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "two_piece/pose1_v1.png",
        },
        {
          label: "V2: Walking",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model captured mid-stride walking directly toward the camera. the stance is slightly forward, engaging the lower silhouette muscles which press gently against the fabric. Shoulders remain level. Arms swing naturally—one slightly forward, one slightly back—adding dynamic life to the pose.\r\nGARMENT: The skirt reacts to the forward motion, creating soft, fluid ripples at the hem. Fabric drapes over the forward stance, highlighting the material's weight and flow.\r\nFRAMING: Full length, ensuring the movement doesn't crop the hem or head.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "two_piece/pose1_v2.png",
        },
        {
          label: "V3: Clasped",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model stands tall and elegant. Hands are brought together at the mid-section, fingers lightly interlaced or one palm resting softly in the other. Elbows bend slightly outward, creating a small triangular gap between arm and mid-section that defines the mid-section silhouette.\r\nGARMENT: The bodice is pulled slightly taut across the upper bodice due to the arm position, showing garment fit along the torso. The skirt hangs vertically with undisturbed natural garment volume.\r\nFRAMING: Emphasis on the hourglass shape created by the arms and mid-section.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "two_piece/pose1_v3.png",
        },
      ],
    },
    {
      id: "pose2",
      img: "two_piece/pose2_v1.png",
      title: "Pose 02 — Secondary (Front Variation)",
      variations: [
        {
          label: "V1: Weight Shift",
          text: 'Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model adopts a "Contrapposto" stance—weight shifted entirely to one mid-section, creating a subtle S-curve in the posture axis. The non-weight-bearing stance is slightly bent at the knee, relaxing the posture. Arms hang loosely at the sides.\r\nGARMENT: The skirt flare of the Two Piece is accentuated on the weight-bearing side. The folds of the skirt bunch slightly on the relaxed side, showing fabric pliability.\r\nFRAMING: Vertical alignment capturing the subtle curve of the silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "two_piece/pose2_v1.png",
        },
        {
          label: "V2: Candid",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Candid, editorial style. Model's silhouette faces forward, but her head is turned 30 degrees to the side, looking off-camera. Posture is relaxed but upright. Shoulders serve as a hanger for the garment, showcasing the shoulder fit perfectly.\r\nGARMENT: The neckline sits perfectly flat against the upper neckline area. Sleeves hang straight without twisting. Details of the yoke are front and center.\r\nFRAMING: Intimate but full-length, making the viewer feel like an observer.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "two_piece/pose2_v2.png",
        },
        {
          label: "V3: Hand Flow",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Model interacts with the garment. One hand extends downwards to gently brush or hold the side flare of the Two Piece skirt. The fingers slightly lift the fabric, revealing its weight and texture. The other arm remains neutral. Head tilts slightly towards the active hand.\r\nGARMENT: The skirt is physically manipulated, creating tension lines from the hand downwards. This demonstrates the volume and abundance of cloth.\r\nFRAMING: Focus on the hand-to-fabric interaction while keeping Full length visible.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "two_piece/pose2_v3.png",
        },
      ],
    },
    {
      id: "pose3",
      img: "two_piece/pose3_v1.png",
      title: "Pose 03 — Secondary (Side View)",
      variations: [
        {
          label: "V1: Profile",
          text: "Full fashion shot in strict portrait orientation, complete side profile (90-degree view).\r\nPOSE: Model stands perpendicular to the camera. The profile silhouette is sharp. The posture axis is straight, face direction up. Arms hang directly down the side seam of the silhouette, partially obscuring the mid-section but revealing the sleeve embroidery profile.\r\nGARMENT: The side seam of the Two Piece is the focal line. The skirt's flare is visible from front to back, showing the A-line gradient. The bodice and back fit are clearly profiled.\r\nFRAMING: Full height profile, from head to floor.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "two_piece/pose3_v1.png",
        },
        {
          label: "V2: Head Turn",
          text: "Full fashion shot in strict portrait orientation, side view.\r\nPOSE: silhouette remains in strict 90-degree profile. However, the model turns her upper silhouette to look over her shoulder, making direct eye contact with the camera. The face direction is slightly dropped, creating an alluring, slight head tilt. Shoulders stay profile.\r\nGARMENT: The twisting of the upper silhouette might cause slight shifting in the neckline, revealing fabric behavior. The side profile of the sleeve is prominent.\r\nFRAMING: Captures the connection between the model's gaze and the dress's silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "two_piece/pose3_v2.png",
        },
        {
          label: "V3: Walking",
          text: 'Full fashion shot in strict portrait orientation, side profile.\r\nPOSE: Dynamic walking profile. Model is caught mid-step moving across the frame (left to right or vice versa). The leading movement pulls the skirt forward; the trailing movement pushes it back.\r\nGARMENT: The skirt creates a "motion trail" behind the model, flying out slightly due to air resistance. This showcases lightness/heaviness of the material.\r\nFRAMING: Wide enough to capture the trailing hem.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "two_piece/pose3_v3.png",
        },
      ],
    },
    {
      id: "pose4",
      img: "two_piece/pose4_v1.png",
      title: "Pose 04 — Secondary (Back View)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, back-facing view.\r\nPOSE: Model stands with her back completely to the camera. Shoulders are square and even. Head is straight, looking forward (away from camera). Hair is swept entirely to one side or tied up to reveal the upper back details.\r\nGARMENT: Focus is 100% on the back design—zipper concealment, embroidery on the upper back, and the full radial spread of the skirt as it hits the floor.\r\nFRAMING: Symmetrical backshot.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "two_piece/pose4_v1.png",
        },
        {
          label: "V2: Looking Back",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model turns her head back over her shoulder to acknowledge the camera. The bodice twists very slightly (max 10 degrees) to facilitate the upper silhouette turn, but the lower silhouette remains largely back-facing.\r\nGARMENT: The slight bodice twist creates gentle diagonal stress lines in the bodice back, showing fabric fit. The skirt remains largely static.\r\nFRAMING: Focus on the back details with the added context of the model's profile.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "two_piece/pose4_v2.png",
        },
        {
          label: "V3: Walking Away",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model is walking away from the camera. The movement is captured from behind. The garment sways naturally with the step. Shoulders move in opposition to the mid-section.\r\nGARMENT: The skirt swishes dynamically. The hemline flips up slightly at the heels. The back panels of the Two Piece ripple with motion.\r\nFRAMING: Capturing the departure, focusing on the flow of the dress in motion.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "two_piece/pose4_v3.png",
        },
      ],
    },
    {
      id: "pose5",
      img: "two_piece/pose5_v1.png",
      title: "Pose 05 — Detail (Neckline)",
      variations: [
        {
          label: "V1: Center",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nFRAMING: TIGHT crop from just above the head to the mid-section.\r\nPOSE: Model stands perfectly still, facing front. Arms are held slightly away from the bodice to ensure they don't block the side-mid-section embroidery. Shoulders dropped.\r\nGARMENT: High-resolution focus on the NECKLINE, yoke embroidery, and upper bodice detailing. Every sequin, thread, and texture variance on the bodice must be sharp.\r\nShot on 100mm lens.",
          img: "two_piece/pose5_v1.png",
        },
        {
          label: "V2: Angled",
          text: 'Upper-silhouette close-up in strict portrait orientation.\r\nANGLE: "Heroic" low angle. Camera looks up from mid-bodice level towards the face.\r\nPOSE: Model looks down into the lens with a powerful, confident expression. face direction slightly lifted.\r\nGARMENT: This angle emphasizes the fall of the fabric over the upper bodice and the upper neckline detailing of the neckline. It showcases the majesty of the Two Piece.\r\nShot on 35mm lens.',
          img: "two_piece/pose5_v2.png",
        },
        {
          label: "V3: Context",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nPOSE: Model brings one hand up to gently touch her upper neckline area or a necklace. The hand is relaxed, elegant—not gripping. It adds a sense of scale and human touch.\r\nGARMENT: The hand position draws the eye immediately to the upper neckline and shoulder embroidery. The sleeve fabric gathers slightly at the elbow due to the raised arm.\r\nShot on 80mm lens.",
          img: "two_piece/pose5_v3.png",
        },
      ],
    },
    {
      id: "pose6",
      img: "two_piece/pose6_v1.png",
      title: "Pose 06 — Detail (Sleeve)",
      variations: [
        {
          label: "V1: Lifted",
          text: "Portrait-orientation close-up focusing on one sleeve.\r\nFRAMING: Crop focusing on one arm from shoulder to fingertips.\r\nPOSE: Model lifts one arm slightly to the side (approx 45 degrees), separating it from the silhouette. The hand is relaxed, palm facing inward or down.\r\nGARMENT: This pose isolates the sleeve to show its silhouette, transparency (if any), and the density of embroidery down the length of the arm.\r\nShot on 100mm lens.",
          img: "two_piece/pose6_v1.png",
        },
        {
          label: "V2: On mid-section",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: Model places her hand firmly on her natural mid-section. The elbow bends outward at an acute angle.\r\nGARMENT: The bending of the arm causes the sleeve fabric to "bunch" and fold at the inner elbow—this is critical for showing fabric stiffness/softness. The wrist cuff embroidery is brought close to the bodice embroidery for texture comparison.\r\nShot on 100mm lens.',
          img: "two_piece/pose6_v2.png",
        },
        {
          label: "V3: Cuff Adjust",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: The model uses her opposite hand to adjust the cuff/bangle of the primary arm. It\'s a "getting ready" micro-action.\r\nGARMENT: Focus is on the cuff interaction. The tension of the opposite hand pulling slightly on the sleeve cuff reveals the stitching strength and button details (if any).\r\nShot on 100mm lens.',
          img: "two_piece/pose6_v3.png",
        },
      ],
    },
    {
      id: "pose7",
      img: "two_piece/pose7_v1.png",
      title: "Pose 07 — Detail (Top Midsection)",
      variations: [
        {
          label: "V1: Center",
          text: 'Mid-fashion shot in strict portrait orientation.\r\nFRAMING: Crop starting from the upper neckline area and ending at the upper mid-section. Detail shot focusing on the garment fabric.\r\nPOSE: Static fontal stance.\r\nGARMENT: This is the "Texture Shot." Focus is entirely on the TRANSITION from the bodice (yoke) to the skirt (kalidar). The gathers, pleats, and waistband stitching are the heroes.\r\nShot on 100mm lens.',
          img: "two_piece/pose7_v1.png",
        },
        {
          label: "V2: Side Angle",
          text: "Mid-fashion shot in strict portrait orientation.\r\nPOSE: Model turns 45 degrees to the side. One arm is lifted high (as if fixing hair) to completely expose the side-seam and side-seam area.\r\nGARMENT: Shows the side zipper implementation, the side fit, and how the embroidery patterns align (or stop) at the side seam.\r\nShot on 80mm lens.",
          img: "two_piece/pose7_v2.png",
        },
        {
          label: "V3: Texture",
          text: "Mid-length macro shot in vertical orientation.\r\nFRAMING: Extreme close-up on a specific patch of heavy embroidery or complex joinery in the midsection.\r\nPOSE: Stationary.\r\nGARMENT: Macro details of gold thread work (zari), sequins, or prints. The weave of the fabric base should be visible.\r\nShot on 100mm lens.",
          img: "two_piece/pose7_v3.png",
        },
      ],
    },
    {
      id: "pose8",
      img: "two_piece/pose8_v1.png",
      title: "Pose 08 — Detail (Bottoms)",
      variations: [
        {
          label: "V1: Static",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nFRAMING: mid-section down to floor.\r\nPOSE: Neutral standing. posture perfectly straight.\r\nGARMENT: Focus on the "Fall" and "Ghera" (Flare). Shows how the skirt gathers at the bottom. We can see the hemline stitching (pico/facing). Shows how the fabric interacts with gravity when still.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "two_piece/pose8_v1.png",
        },
        {
          label: "V2: Holding Edge",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model extends one stance slightly and uses her hand to hold the edge of the skirt flare, pulling it out wide.\r\nGARMENT: This displays the total width of a single "Kali" (panel) or the full circumference of the hem. It shows the translucency of the skirt fabric when stretched vs when bunched.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "two_piece/pose8_v2.png",
        },
        {
          label: "V3: Gentle Turn",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model performs a "Twirl" or "Spin" — caught in freeze-frame.\r\nGARMENT: The skirt is fully flared out by centrifugal force, forming a circle or semi-circle. This demonstrates the volume and grandiosity of the Two Piece.\r\nFRAMING: Wide enough to contain the flared skirt edges.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "two_piece/pose8_v3.png",
        },
      ],
    },
    {
      id: "pose9",
      img: "two_piece/pose9_v1.png",
      title: "Pose 09 — Detail (Side Closeup Profile)",
      variations: [
        {
          label: "V1: Clean Profile",
          text: "Upper-silhouette close-up in strict portrait orientation. FULL SIDE PROFILE (90-degree view). \r\nPOSE: Model stands perfectly straight, perpendicular to the camera. Arms rest naturally down the side, emphasizing the exact side-seam and shoulder alignment. \r\nGARMENT: High-resolution focus on the side silhouette of the upper bodice, side-neckline depth, and the complete sleeve fall. Perfect for showcasing shoulder/sleeve embroidery transitions. \r\nShot on 100mm macro lens.",
          img: "two_piece/pose9_v1.png",
        },
        {
          label: "V2: Forward Lean",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: Model leans slightly forward, with focus and intense gaze straight ahead (off-camera). The front shoulder drops minimally, creating a dynamic diagonal line across the upper back. \r\nGARMENT: The fabric pulls slightly across the upper back, demonstrating fit tension and shoulder-yoke detailing. The sleeve shifts gracefully backwards. \r\nShot on 80mm lens.",
          img: "two_piece/pose9_v2.png",
        },
        {
          label: "V3: Over-Shoulder Glimpse",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: While the bodice remains in strict 90-degree profile, the model turns her head gently towards the camera, face direction lowered, offering an intimate, side-eyed glance over her shoulder. \r\nGARMENT: The twisting of the upper silhouette highlights the collar/nape detailing and contrasts the profile of the sleeve against the back fabric. \r\nShot on 80mm lens.",
          img: "two_piece/pose9_v3.png",
        },
      ],
    },
  ],
  anarkali: [
    {
      id: "pose1",
      img: "anarkali/pose1_v1.png",
      title: "Pose 01 — Main Image (Full Front)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model falls into a perfectly symmetrical, static standing position. Shoulders are pulled back and down, chest neutral. Weight is evenly distributed on both feet. Arms are completely relaxed at the sides, hanging straight down without creating wrinkles in the bodice fabric.\r\nGARMENT: The Anarkali flows straight down in its intended A-line or flared silhouette. No motion blur, no wind. The hemline settles naturally on the floor (or above footwear).\r\nFRAMING: Center-weighted composition. Head at the top third, hem near the bottom.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "anarkali/pose1_v1.png",
        },
        {
          label: "V2: Walking",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model captured mid-stride walking directly toward the camera. the stance is slightly forward, engaging the lower silhouette muscles which press gently against the fabric. Shoulders remain level. Arms swing naturally—one slightly forward, one slightly back—adding dynamic life to the pose.\r\nGARMENT: The skirt reacts to the forward motion, creating soft, fluid ripples at the hem. Fabric drapes over the forward stance, highlighting the material's weight and flow.\r\nFRAMING: Full length, ensuring the movement doesn't crop the hem or head.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "anarkali/pose1_v2.png",
        },
        {
          label: "V3: Clasped",
          text: "Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model stands tall and elegant. Hands are brought together at the mid-section, fingers lightly interlaced or one palm resting softly in the other. Elbows bend slightly outward, creating a small triangular gap between arm and mid-section that defines the mid-section silhouette.\r\nGARMENT: The bodice is pulled slightly taut across the upper bodice due to the arm position, showing garment fit along the torso. The skirt hangs vertically with undisturbed natural garment volume.\r\nFRAMING: Emphasis on the hourglass shape created by the arms and mid-section.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "anarkali/pose1_v3.png",
        },
      ],
    },
    {
      id: "pose2",
      img: "anarkali/pose2_v1.png",
      title: "Pose 02 — Secondary (Front Variation)",
      variations: [
        {
          label: "V1: Weight Shift",
          text: 'Full fashion shot in strict portrait orientation, front-facing.\r\nPOSE: Model adopts a "Contrapposto" stance—weight shifted entirely to one mid-section, creating a subtle S-curve in the posture axis. The non-weight-bearing stance is slightly bent at the knee, relaxing the posture. Arms hang loosely at the sides.\r\nGARMENT: The skirt flare of the Anarkali is accentuated on the weight-bearing side. The folds of the skirt bunch slightly on the relaxed side, showing fabric pliability.\r\nFRAMING: Vertical alignment capturing the subtle curve of the silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "anarkali/pose2_v1.png",
        },
        {
          label: "V2: Candid",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Candid, editorial style. Model's silhouette faces forward, but her head is turned 30 degrees to the side, looking off-camera. Posture is relaxed but upright. Shoulders serve as a hanger for the garment, showcasing the shoulder fit perfectly.\r\nGARMENT: The neckline sits perfectly flat against the upper neckline area. Sleeves hang straight without twisting. Details of the yoke are front and center.\r\nFRAMING: Intimate but full-length, making the viewer feel like an observer.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "anarkali/pose2_v2.png",
        },
        {
          label: "V3: Hand Flow",
          text: "Full fashion shot in strict portrait orientation.\r\nPOSE: Model interacts with the garment. One hand extends downwards to gently brush or hold the side flare of the Anarkali skirt. The fingers slightly lift the fabric, revealing its weight and texture. The other arm remains neutral. Head tilts slightly towards the active hand.\r\nGARMENT: The skirt is physically manipulated, creating tension lines from the hand downwards. This demonstrates the volume and abundance of cloth.\r\nFRAMING: Focus on the hand-to-fabric interaction while keeping Full length visible.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "anarkali/pose2_v3.png",
        },
      ],
    },
    {
      id: "pose3",
      img: "anarkali/pose3_v1.png",
      title: "Pose 03 — Secondary (Side View)",
      variations: [
        {
          label: "V1: Profile",
          text: "Full fashion shot in strict portrait orientation, complete side profile (90-degree view).\r\nPOSE: Model stands perpendicular to the camera. The profile silhouette is sharp. The posture axis is straight, face direction up. Arms hang directly down the side seam of the silhouette, partially obscuring the mid-section but revealing the sleeve embroidery profile.\r\nGARMENT: The side seam of the Anarkali is the focal line. The skirt's flare is visible from front to back, showing the A-line gradient. The bodice and back fit are clearly profiled.\r\nFRAMING: Full height profile, from head to floor.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "anarkali/pose3_v1.png",
        },
        {
          label: "V2: Head Turn",
          text: "Full fashion shot in strict portrait orientation, side view.\r\nPOSE: silhouette remains in strict 90-degree profile. However, the model turns her upper silhouette to look over her shoulder, making direct eye contact with the camera. The face direction is slightly dropped, creating an alluring, slight head tilt. Shoulders stay profile.\r\nGARMENT: The twisting of the upper silhouette might cause slight shifting in the neckline, revealing fabric behavior. The side profile of the sleeve is prominent.\r\nFRAMING: Captures the connection between the model's gaze and the dress's silhouette.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "anarkali/pose3_v2.png",
        },
        {
          label: "V3: Walking",
          text: 'Full fashion shot in strict portrait orientation, side profile.\r\nPOSE: Dynamic walking profile. Model is caught mid-step moving across the frame (left to right or vice versa). The leading movement pulls the skirt forward; the trailing movement pushes it back.\r\nGARMENT: The skirt creates a "motion trail" behind the model, flying out slightly due to air resistance. This showcases lightness/heaviness of the material.\r\nFRAMING: Wide enough to capture the trailing hem.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "anarkali/pose3_v3.png",
        },
      ],
    },
    {
      id: "pose4",
      img: "anarkali/pose4_v1.png",
      title: "Pose 04 — Secondary (Back View)",
      variations: [
        {
          label: "V1: Static",
          text: "Full fashion shot in strict portrait orientation, back-facing view.\r\nPOSE: Model stands with her back completely to the camera. Shoulders are square and even. Head is straight, looking forward (away from camera). Hair is swept entirely to one side or tied up to reveal the upper back details.\r\nGARMENT: Focus is 100% on the back design—zipper concealment, embroidery on the upper back, and the full radial spread of the skirt as it hits the floor.\r\nFRAMING: Symmetrical backshot.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "anarkali/pose4_v1.png",
        },
        {
          label: "V2: Looking Back",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model turns her head back over her shoulder to acknowledge the camera. The bodice twists very slightly (max 10 degrees) to facilitate the upper silhouette turn, but the lower silhouette remains largely back-facing.\r\nGARMENT: The slight bodice twist creates gentle diagonal stress lines in the bodice back, showing fabric fit. The skirt remains largely static.\r\nFRAMING: Focus on the back details with the added context of the model's profile.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "anarkali/pose4_v2.png",
        },
        {
          label: "V3: Walking Away",
          text: "Full fashion shot in strict portrait orientation, back view.\r\nPOSE: Model is walking away from the camera. The movement is captured from behind. The garment sways naturally with the step. Shoulders move in opposition to the mid-section.\r\nGARMENT: The skirt swishes dynamically. The hemline flips up slightly at the heels. The back panels of the Anarkali ripple with motion.\r\nFRAMING: Capturing the departure, focusing on the flow of the dress in motion.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.",
          img: "anarkali/pose4_v3.png",
        },
      ],
    },
    {
      id: "pose5",
      img: "anarkali/pose5_v1.png",
      title: "Pose 05 — Detail (Neckline)",
      variations: [
        {
          label: "V1: Center",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nFRAMING: TIGHT crop from just above the head to the mid-section.\r\nPOSE: Model stands perfectly still, facing front. Arms are held slightly away from the bodice to ensure they don't block the side-mid-section embroidery. Shoulders dropped.\r\nGARMENT: High-resolution focus on the NECKLINE, yoke embroidery, and upper bodice detailing. Every sequin, thread, and texture variance on the bodice must be sharp.\r\nShot on 100mm lens.",
          img: "anarkali/pose5_v1.png",
        },
        {
          label: "V2: Angled",
          text: 'Upper-silhouette close-up in strict portrait orientation.\r\nANGLE: "Heroic" low angle. Camera looks up from mid-bodice level towards the face.\r\nPOSE: Model looks down into the lens with a powerful, confident expression. face direction slightly lifted.\r\nGARMENT: This angle emphasizes the fall of the fabric over the upper bodice and the upper neckline detailing of the neckline. It showcases the majesty of the Anarkali.\r\nShot on 35mm lens.',
          img: "anarkali/pose5_v2.png",
        },
        {
          label: "V3: Context",
          text: "Upper-silhouette close-up in strict portrait orientation.\r\nPOSE: Model brings one hand up to gently touch her upper neckline area or a necklace. The hand is relaxed, elegant—not gripping. It adds a sense of scale and human touch.\r\nGARMENT: The hand position draws the eye immediately to the upper neckline and shoulder embroidery. The sleeve fabric gathers slightly at the elbow due to the raised arm.\r\nShot on 80mm lens.",
          img: "anarkali/pose5_v3.png",
        },
      ],
    },
    {
      id: "pose6",
      img: "anarkali/pose6_v1.png",
      title: "Pose 06 — Detail (Sleeve)",
      variations: [
        {
          label: "V1: Lifted",
          text: "Portrait-orientation close-up focusing on one sleeve.\r\nFRAMING: Crop focusing on one arm from shoulder to fingertips.\r\nPOSE: Model lifts one arm slightly to the side (approx 45 degrees), separating it from the silhouette. The hand is relaxed, palm facing inward or down.\r\nGARMENT: This pose isolates the sleeve to show its silhouette, transparency (if any), and the density of embroidery down the length of the arm.\r\nShot on 100mm lens.",
          img: "anarkali/pose6_v1.png",
        },
        {
          label: "V2: On mid-section",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: Model places her hand firmly on her natural mid-section. The elbow bends outward at an acute angle.\r\nGARMENT: The bending of the arm causes the sleeve fabric to "bunch" and fold at the inner elbow—this is critical for showing fabric stiffness/softness. The wrist cuff embroidery is brought close to the bodice embroidery for texture comparison.\r\nShot on 100mm lens.',
          img: "anarkali/pose6_v2.png",
        },
        {
          label: "V3: Cuff Adjust",
          text: 'Portrait-orientation close-up on sleeve.\r\nPOSE: The model uses her opposite hand to adjust the cuff/bangle of the primary arm. It\'s a "getting ready" micro-action.\r\nGARMENT: Focus is on the cuff interaction. The tension of the opposite hand pulling slightly on the sleeve cuff reveals the stitching strength and button details (if any).\r\nShot on 100mm lens.',
          img: "anarkali/pose6_v3.png",
        },
      ],
    },
    {
      id: "pose7",
      img: "anarkali/pose7_v1.png",
      title: "Pose 07 — Detail (Bodice)",
      variations: [
        {
          label: "V1: Center",
          text: 'Mid-fashion shot in strict portrait orientation.\r\nFRAMING: Crop starting from the upper neckline area and ending at the upper mid-section. Detail shot focusing on the garment fabric.\r\nPOSE: Static fontal stance.\r\nGARMENT: This is the "Texture Shot." Focus is entirely on the TRANSITION from the bodice (yoke) to the skirt (kalidar). The gathers, pleats, and waistband stitching are the heroes.\r\nShot on 100mm lens.',
          img: "anarkali/pose7_v1.png",
        },
        {
          label: "V2: Side Angle",
          text: "Mid-fashion shot in strict portrait orientation.\r\nPOSE: Model turns 45 degrees to the side. One arm is lifted high (as if fixing hair) to completely expose the side-seam and side-seam area.\r\nGARMENT: Shows the side zipper implementation, the side fit, and how the embroidery patterns align (or stop) at the side seam.\r\nShot on 80mm lens.",
          img: "anarkali/pose7_v2.png",
        },
        {
          label: "V3: Texture",
          text: "Mid-length macro shot in vertical orientation.\r\nFRAMING: Extreme close-up on a specific patch of heavy embroidery or complex joinery in the midsection.\r\nPOSE: Stationary.\r\nGARMENT: Macro details of gold thread work (zari), sequins, or prints. The weave of the fabric base should be visible.\r\nShot on 100mm lens.",
          img: "anarkali/pose7_v3.png",
        },
      ],
    },
    {
      id: "pose8",
      img: "anarkali/pose8_v1.png",
      title: "Pose 08 — Detail (Skirt)",
      variations: [
        {
          label: "V1: Static",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nFRAMING: mid-section down to floor.\r\nPOSE: Neutral standing. posture perfectly straight.\r\nGARMENT: Focus on the "Fall" and "Ghera" (Flare). Shows how the skirt gathers at the bottom. We can see the hemline stitching (pico/facing). Shows how the fabric interacts with gravity when still.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "anarkali/pose8_v1.png",
        },
        {
          label: "V2: Holding Edge",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model extends one stance slightly and uses her hand to hold the edge of the skirt flare, pulling it out wide.\r\nGARMENT: This displays the total width of a single "Kali" (panel) or the full circumference of the hem. It shows the translucency of the skirt fabric when stretched vs when bunched.\r\nShot on 80mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "anarkali/pose8_v2.png",
        },
        {
          label: "V3: Gentle Turn",
          text: 'Portrait-orientation mid-to-lower fashion shot.\r\nPOSE: Model performs a "Twirl" or "Spin" — caught in freeze-frame.\r\nGARMENT: The skirt is fully flared out by centrifugal force, forming a circle or semi-circle. This demonstrates the volume and grandiosity of the Anarkali.\r\nFRAMING: Wide enough to contain the flared skirt edges.\r\nShot on 50mm lens.\r\nFRAMING CONSTRAINT: Must leave ample room for ceiling and floor. DO NOT crop below the ankle.',
          img: "anarkali/pose8_v3.png",
        },
      ],
    },
    {
      id: "pose9",
      img: "anarkali/pose9_v1.png",
      title: "Pose 09 — Detail (Side Closeup Profile)",
      variations: [
        {
          label: "V1: Clean Profile",
          text: "Upper-silhouette close-up in strict portrait orientation. FULL SIDE PROFILE (90-degree view). \r\nPOSE: Model stands perfectly straight, perpendicular to the camera. Arms rest naturally down the side, emphasizing the exact side-seam and shoulder alignment. \r\nGARMENT: High-resolution focus on the side silhouette of the upper bodice, side-neckline depth, and the complete sleeve fall. Perfect for showcasing shoulder/sleeve embroidery transitions. \r\nShot on 100mm macro lens.",
          img: "anarkali/pose9_v1.png",
        },
        {
          label: "V2: Forward Lean",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: Model leans slightly forward, with focus and intense gaze straight ahead (off-camera). The front shoulder drops minimally, creating a dynamic diagonal line across the upper back. \r\nGARMENT: The fabric pulls slightly across the upper back, demonstrating fit tension and shoulder-yoke detailing. The sleeve shifts gracefully backwards. \r\nShot on 80mm lens.",
          img: "anarkali/pose9_v2.png",
        },
        {
          label: "V3: Over-Shoulder Glimpse",
          text: "Upper-silhouette close-up in strict portrait orientation, side profile. \r\nPOSE: While the bodice remains in strict 90-degree profile, the model turns her head gently towards the camera, face direction lowered, offering an intimate, side-eyed glance over her shoulder. \r\nGARMENT: The twisting of the upper silhouette highlights the collar/nape detailing and contrasts the profile of the sleeve against the back fabric. \r\nShot on 80mm lens.",
          img: "anarkali/pose9_v3.png",
        },
      ],
    },
  ],
};

function buildPrompt(attire, pose, variation) {
  const attireName = ATTIRE_TYPES[attire] || "Garment";
  const poseObj =
    POSE_LIBRARY[attire] && POSE_LIBRARY[attire].find((p) => p.id === pose);
  const variationObj =
    poseObj && poseObj.variations && poseObj.variations[variation]
      ? poseObj.variations[variation]
      : null;

  let poseInstructions = "";
  if (variationObj && variationObj.text) {
    poseInstructions = "\n\n--- POSE INSTRUCTIONS ---\n" + variationObj.text;
  }

  return (
    GLOBAL_PHYSICS_PROMPT +
    "\n\n--- ATTIRE TYPE ---\n" +
    attireName +
    poseInstructions
  );
}

// ==========================================
// DATA STRUCTURES
// ==========================================

// ==========================================
// STATE MANAGEMENT & GEN LOGIC
// ==========================================

let activeAttire = "anarkali";
let activePosesState = {};

// ==========================================
// SCENE & BACKGROUND HELPERS
// ==========================================

let recentColors = [];
const MAX_RECENT_COLORS = 5;

function saveRecentColor(colorHex) {
  // Validate basic hex
  if (!/^#[0-9A-Fa-f]{6}$/i.test(colorHex)) return;
  // Remove if it already exists to move it to the front
  recentColors = recentColors.filter((c) => c.toLowerCase() !== colorHex.toLowerCase());
  recentColors.unshift(colorHex);
  if (recentColors.length > MAX_RECENT_COLORS) {
    recentColors.pop();
  }
  localStorage.setItem("recentColors", JSON.stringify(recentColors));
  renderRecentColors();
}

function renderRecentColors() {
  const container = document.getElementById("recentColorsContainer");
  if (!container) return;
  container.innerHTML = "";
  if (recentColors.length === 0) {
    container.innerHTML = '<span style="color: var(--text-secondary); font-size: 11px;">No recent colors</span>';
    return;
  }
  recentColors.forEach((color) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.title = color;
    btn.style = `width: 20px; height: 20px; border-radius: 4px; border: 1px solid var(--border-color); background-color: ${color}; cursor: pointer;`;
    btn.onclick = () => {
      const input = document.getElementById("bgColor");
      const picker = document.getElementById("bgColorPicker");
      if (input) input.value = `Hex ${color.toUpperCase()}`;
      if (picker) picker.value = color;
      saveRecentColor(color);
      updateAllPrompts();
    };
    container.appendChild(btn);
  });
}

function setBgColor(value) {
  const input = document.getElementById("bgColor");
  if (input) {
    input.value = value;
    // Extract hex to save
    const match = value.match(/#([0-9A-Fa-f]{6})\b/);
    if (match) saveRecentColor(match[0]);
    updateAllPrompts();
  }
}

function syncColorPicker() {
  const picker = document.getElementById("bgColorPicker");
  const input = document.getElementById("bgColor");
  if (picker && input) {
    const hexVal = picker.value.toUpperCase();
    input.value = `Hex ${hexVal}`;
    saveRecentColor(hexVal);
    updateAllPrompts();
  }
}

function updateAllPrompts() {
  const state = {
    look: document.getElementById("modelLook").value,
    silhouette: document.getElementById("bodyType").value,
    age: document.getElementById("ageGroup").value,
    accs: document.getElementById("accessoriesToggle").checked,
  };

  let modelDesc = "Elegant fashion model";
  if (state.age === "young")
    modelDesc = "Elegant young adult fashion model (approx 20-25 years)";
  if (state.age === "adult")
    modelDesc = "Elegant adult fashion model (approx 28-32 years)";
  if (state.age === "mature")
    modelDesc = "Elegant mature fashion model (approx 40-45 years)";

  if (state.look === "indian") modelDesc += ", classic Indian styling";
  if (state.look === "south_indian")
    modelDesc += ", authentic South Indian styling, warm tones";
  if (state.look === "north_indian")
    modelDesc += ", authentic North Indian styling";
  if (state.look === "indo_western")
    modelDesc += ", modern Indo-Western high-fashion look";

  if (state.silhouette === "slim")
    modelDesc += ", graceful fashion editorial styling.";
  else if (state.silhouette === "curvy")
    modelDesc += ", elegant plus-size fashion styling.";
  else modelDesc += ", regular high-fashion editorial styling.";

  let accDesc = "";
  if (state.accs) {
    // Check if a custom jewelry mode is active
    const jewelryMode = document.querySelector('input[name="jewelryMode"]:checked')?.value || "none";
    if (jewelryMode === "none") {
      accDesc = `\nACCESSORIES: DO NOT retain any original jewelry/accessories from the input image. Model is styled with minimal elegant jewelry (simple stud earrings, minimal simple chain). Maintain this exact jewelry consistently.`;
    } else {
      accDesc = `\nACCESSORIES: DO NOT retain any original jewelry/accessories from the input image. Apply custom jewelry settings as defined below.`;
    }
  } else {
    accDesc = `\nACCESSORIES: Model wears NO jewelry or accessories. You MUST remove any existing jewelry from the input image.`;
  }

  const inputSource = document.getElementById("inputSource").value;
  let physicsBaseText = GLOBAL_PHYSICS_PROMPT;

  if (inputSource === "model") {
    physicsBaseText = physicsBaseText.replace(
      /CONTEXT: The input image is a MANNEQUIN reference\./,
      "CONTEXT: The input image features a REAL PERSON, but you MUST treat them as a lifeless MANNEQUIN proxy."
    );
    physicsBaseText = physicsBaseText.replace(
      /TASK: "Dress" a real Indian female model in this exact garment\./,
      "TASK: Treat the input person as a faceless mannequin dummy. Completely REPLACE their identity and face with a BRAND NEW professional high-end fashion model, wearing the exact garment."
    );
    physicsBaseText = physicsBaseText.replace(
      /RETAIN THE IDENTICAL FACE, SKIN TONE, AND BODY PROPORTIONS\. MUST LOCK THE FIRST SUCCESSFUL GENERATION'S MODEL EVERY TIME\./,
      "YOU MUST GENERATE A COMPLETELY NEW MODEL IDENTITY. DO NOT RETAIN THE INPUT PERSON'S FACE OR LIKENESS."
    );
  }

  const finalMaster =
    physicsBaseText +
    `\n\nGENERATE: A high-end commercial fashion catalog photograph where the fabric physics and embroidery detail depth are indistinguishable from reality.\nEnsure the layout is strictly vertical/portrait (2:3 or 3:4).\n\n/// SECONDARY SUBJECT DETAILS & ISOLATION ///\n${modelDesc}, warm pleasant expression, high-end editorial photography lighting.\nFOOTWEAR: Model MUST wear closed footwear ONLY. Ensure footwear is cropped out or hidden by the garment flow.${accDesc}\nCLEAN EDGES: Maintain razor-sharp subject separation from background for professional masking.`;

  const bgColorInput = document.getElementById("bgColor");
  const customBgColor =
    bgColorInput && bgColorInput.value.trim() !== ""
      ? bgColorInput.value.trim()
      : "Hex #FFFFFF";

  if (bgColorInput && bgColorInput.value) {
    localStorage.setItem("bgColor", bgColorInput.value);
  }

  // Attempt bidirectional sync from text -> picker swatch
  const picker = document.getElementById("bgColorPicker");
  if (picker && customBgColor) {
    let match = customBgColor.match(/#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/);
    if (match) {
      let hex = match[0];
      if (hex.length === 4) {
        hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
      }
      picker.value = hex;
    } else if (customBgColor.toLowerCase().includes("white")) {
      picker.value = "#ffffff";
    } else if (customBgColor.toLowerCase().includes("black")) {
      picker.value = "#000000";
    } else if (customBgColor.toLowerCase().includes("green")) {
      picker.value = "#00ff00";
    } else if (
      customBgColor.toLowerCase().includes("grey") ||
      customBgColor.toLowerCase().includes("gray")
    ) {
      picker.value = "#808080";
    }
  }

  const finalAdditional = `Set the scene in a high-end commercial fashion studio.\nThe background must be a pure flat seamless continuous backdrop (${customBgColor}) with zero cast shadows on the floor.\nPlease use crisp key lighting to create specular glints on the garment embellishments. Incorporate global illumination with subsurface scattering to ensure the fabric and model look highly realistic.\nEnsure the gold zardosi and stones catch the light and sparkle naturally. Prevent any background edge bloom from bleeding into the garment edges.\nCrucially, maintain the exact model identity (face, silhouette, hair) consistently if regenerating. The styling should feature elegant, loose hair and high-fidelity lighting.`;

  let finalNegative = "blurry, pixelated, bad structure, extra limbs, extra fingers, missing limbs, watermarks, text, signatures, low res, plastic look, oil painting, cartoon, CGI, smooth fabrics (unless silk), flat embroidery, soft/melted beads";
  
  if (inputSource === "model") {
    finalNegative += ", original face, likeness of input model, original identity, facial recognition, exact original person";
  }

  document.getElementById("masterPrompt").value = finalMaster;
  document.getElementById("additionalPrompt").value = finalAdditional;
  const negInput = document.getElementById("negativePrompt");
  if (negInput) {
    negInput.value = finalNegative;
  }

  // Build structured JSON in the background for copying
  window.currentJsonState = window.currentJsonState || { poses: {} };
  window.currentJsonState.master_prompt = {
    task: "Generate a high-end commercial fashion catalog photograph where fabric physics and embroidery detail depth are indistinguishable from reality.",
    layout: "Strictly vertical/portrait (2:3 or 3:4) orientation.",
    style_and_physics_base: physicsBaseText,
    subject_details: `${modelDesc}, warm pleasant expression, high-end editorial photography lighting.`,
    footwear: `Model MUST wear closed footwear ONLY. Ensure footwear is cropped out or hidden by the garment flow.${accDesc}`,
    clean_edges:
      "Maintain razor-sharp subject separation from background for professional masking.",
  };

  window.currentJsonState.additional_instructions = {
    scene: "High-end commercial fashion studio.",
    background: `Pure flat seamless continuous backdrop (${customBgColor}) with zero cast shadows on the floor.`,
    lighting:
      "Crisp key lighting for specular glints on embellishments. Global illumination with subsurface scattering for realistic fabric and model.",
    details:
      "Ensure gold zardosi and stones sparkle naturally. Prevent background edge bloom from bleeding into garment edges.",
    consistency:
      "Crucially, maintain the exact model identity (face, silhouette, hair) consistently if regenerating. Styling: elegant, loose hair, high-fidelity lighting.",
  };
}

const dupattaPrompts = {
  none: "No Dupatta selected.",
  left: `MANDATORY DUPATTA INCLUSION:
The outfit INCLUDES a matching Dupatta (stole/scarf).
• Draped neatly and pinned over the LEFT shoulder.
• It hangs gracefully down the front and back of the left side.
• Preserve the transparency, border work, and fabric texture of the dupatta.
• Do NOT obscure the center bodice embroidery.`,
  right: `MANDATORY DUPATTA INCLUSION:
The outfit INCLUDES a matching Dupatta (stole/scarf).
• Draped neatly and pinned over the RIGHT shoulder.
• It hangs gracefully down the front and back of the right side.
• Preserve the transparency, border work, and fabric texture of the dupatta.
• Do NOT obscure the center bodice embroidery.`,
  full: `MANDATORY DUPATTA INCLUSION:
The outfit INCLUDES a matching Dupatta (stole/scarf).
• Draped elegantly across BOTH arms/shoulders (Open Drape).
• The dupatta falls symmetrically or wraps loosely around the arms, framing the attire.
• Show full border details and fabric sheen like a royal stole.`,
};

function updateDupattaPrompt() {
  const styleRadio = document.querySelector(
    'input[name="dupattaStyle"]:checked',
  );
  const txt = document.getElementById("dupattaPrompt");
  if (txt && styleRadio) {
    txt.value = dupattaPrompts[styleRadio.value];
  }
}

// ==========================================
// JEWELRY PROMPT SETTINGS
// ==========================================

const JEWELRY_TEMPLATES = {
  anarkali: {
    minimal: "Minimal elegant jewelry: small jhumkas, delicate thin chain. No heavy pieces. Keep the look subtle and sophisticated.",
    normal: "Standard traditional jewelry: medium-sized kundan or polki earrings, matching necklace, a few bangles, and a subtle bindi. Authentic Indian ethnic styling.",
    bridal: "Heavy bridal jewelry: grand layered Kundan/Polki necklaces, oversized jhumkas with sahara chains, maang tikka, heavy bangles, rings, and an elaborate bridal appearance."
  },
  lehenga: {
    minimal: "Minimal elegant jewelry: diamond or polki studs, very delicate necklace. Modern and refined, allowing the lehenga to be the focal point.",
    normal: "Standard traditional jewelry: statement choker, matching earrings, stack of bangles, and a bindi.",
    bridal: "Extravagant bridal jewelry: heavy bridal choker and raani haar, oversized earrings, maatha patti, nath (nose ring), chuda/heavy bangles, and haath phool."
  },
  semi_lehenga: {
    minimal: "Minimal contemporary jewelry: elegant studs or small drop earrings, very simple delicate chain. Indo-western fusion styling.",
    normal: "Standard festive jewelry: medium statement earrings, matching necklace, and a few sleek bangles.",
    bridal: "Heavy festive look: grand choker necklace, elaborate earrings, maang tikka, and a stack of festive bangles."
  },
  half_saree: {
    minimal: "Minimal traditional jewelry: small gold or temple earrings, thin chain. Subtle and classic South Indian styling.",
    normal: "Standard traditional jewelry: classic gold temple jewelry set including medium necklace, jhumkas, glass bangles, and a bindi.",
    bridal: "Heavy South Indian bridal jewelry: elaborate antique temple jewelry, layered necklaces (mango mala, kasu mala), vaddanam (waist belt), vanki (armband), jadanagam (hair jewelry), heavy jhumkas and bangles."
  },
  saree_ready: {
    minimal: "Minimal sophisticated jewelry: small diamond or pearl studs, delicate chain, perhaps a watch. Modern and sleek.",
    normal: "Standard elegance: statement earrings or a classic necklace set, sleek bangles. Appropriate for evening wear or parties.",
    bridal: "Heavy glamorous jewelry: extravagant diamond or kundan set, heavy earrings, maang tikka, and layered bangles."
  },
  sharara: {
    minimal: "Minimal elegant jewelry: small chaandbaalis or studs, delicate chain. Subtle festive styling.",
    normal: "Standard traditional jewelry: statement chaandbaalis, matching choker, bangles, and a bindi or passa (side tikka).",
    bridal: "Heavy bridal jewelry: grand passaa (headpiece), heavy choker, long haar, elaborate earrings, and stacked bangles."
  },
  chudidhar: {
    minimal: "Minimal daily/casual jewelry: tiny studs, very thin chain. Extremely subtle.",
    normal: "Standard festive jewelry: medium jhumkas or drop earrings, simple necklace, and a few bangles.",
    bridal: "Heavy festive jewelry: elaborate necklace, heavy earrings, maang tikka, and a full set of bangles."
  },
  tops: {
    minimal: "Minimal modern jewelry: tiny studs, delicate thin geometric chain. Very casual, western styling.",
    normal: "Standard modern jewelry: hoops or statement drop earrings, layered delicate chains. Chic and trendy.",
    bridal: "Statement party jewelry: bold statement earrings, chunky necklace or layered chains, statement rings. Very glamorous."
  },
  long_gown: {
    minimal: "Minimal high-fashion jewelry: small diamond studs, delicate tennis bracelet. Elegant red-carpet styling.",
    normal: "Standard evening jewelry: elegant drop earrings or a classic diamond necklace. Sophisticated evening gown styling.",
    bridal: "Heavy statement jewelry: extravagant diamond necklace set, chandelier earrings. High-glamour red-carpet look."
  },
  two_piece: {
    minimal: "Minimal fusion jewelry: tiny studs, subtle chain. Modern indo-western style.",
    normal: "Standard fusion jewelry: statement earrings (oxidized or contemporary), maybe a choker. Trendy festive look.",
    bridal: "Heavy statement fusion jewelry: elaborate choker, bold earrings, stacked metallic bangles, maybe a maang tikka."
  }
};

function toggleJewelrySection() {
  const isChecked = document.getElementById("accessoriesToggle")?.checked;
  const panel = document.getElementById("jewelrySettingsPanel");
  if (panel) {
    if (isChecked) {
      panel.style.display = "block";
    } else {
      panel.style.display = "none";
      // Auto-set the radio to 'none' if we turn off accessories
      const noneRadio = document.querySelector('input[name="jewelryMode"][value="none"]');
      if (noneRadio && !noneRadio.checked) {
        noneRadio.checked = true;
      }
    }
    updateJewelryPrompt();
  }
}

function updateJewelryPrompt() {
  const modeRadio = document.querySelector('input[name="jewelryMode"]:checked');
  const mode = modeRadio ? modeRadio.value : "none";
  
  const textOptions = document.getElementById("jewelryTextOptions");
  const imageOptions = document.getElementById("jewelryImageOptions");
  const promptTextarea = document.getElementById("jewelryPrompt");
  const promptBlock = document.getElementById("jewelryPromptBlock");
  
  // Handle UI visibility
  if (textOptions && imageOptions) {
    if (mode === "none") {
      textOptions.style.display = "none";
      imageOptions.style.display = "none";
      if(promptBlock) promptBlock.style.display = "none";
    } else if (mode === "text") {
      textOptions.style.display = "block";
      imageOptions.style.display = "none";
      if(promptBlock) promptBlock.style.display = "block";
    } else if (mode === "image") {
      textOptions.style.display = "none";
      imageOptions.style.display = "block";
      if(promptBlock) promptBlock.style.display = "block";
    }
  }
  
  // Generate Prompt
  if (!promptTextarea) return;
  
  if (mode === "none") {
    promptTextarea.value = "No Jewelry option selected.";
  } else if (mode === "text") {
    const levelSelect = document.getElementById("jewelryLevel");
    const level = levelSelect ? levelSelect.value : "normal";
    
    // Get the base jewelry description for this attire and level
    let jewelryDesc = "";
    if (JEWELRY_TEMPLATES[activeAttire] && JEWELRY_TEMPLATES[activeAttire][level]) {
      jewelryDesc = JEWELRY_TEMPLATES[activeAttire][level];
    } else {
      // Fallback if attire is missing
      jewelryDesc = JEWELRY_TEMPLATES["lehenga"][level]; 
    }
    
    promptTextarea.value = `MANDATORY JEWELRY & ACCESSORIES INCLUSION:
• CRITICAL: You MUST remove and IGNORE any existing jewelry or accessories from the original input image.
• Apply the following jewelry styling: ${jewelryDesc}
• Ensure the jewelry seamlessly matches the outfit's aesthetic and color palette.
• The jewelry should look physically authentic with correct specular highlights (metals should shine, gems should refract/reflect).`;

  } else if (mode === "image") {
    const refTextarea = document.getElementById("jewelryReferenceText");
    const userInstructions = refTextarea && refTextarea.value.trim() ? refTextarea.value.trim() : "Extract and apply the exact jewelry from the referenced image.";
    
    promptTextarea.value = `MANDATORY JEWELRY EXTRACTION FROM REFERENCE IMAGE:
• CRITICAL: You MUST remove and IGNORE any existing jewelry or accessories from the original input garment image.
• SECONDARY INPUT DETECTED: A secondary image containing flat-lay jewelry reference has been provided.
• INSTRUCTION: ${userInstructions}
• Ensure you ONLY apply the jewelry from the reference. Do not copy the flat-lay background or arrangement.
• Place the extracted jewelry anatomically correctly onto the model in the final generated image.
• The extracted jewelry must scale appropriately and cast realistic micro-shadows on the model's skin/garment.`;
  }
}

function renderPoseGrid() {
  const container = document.getElementById("posesContainer");
  container.innerHTML = "";
  document.getElementById("attireNameDisplay").textContent =
    ATTIRE_TYPES[activeAttire];

  const poses = POSE_LIBRARY[activeAttire];

  if (!poses || poses.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; padding: 40px; text-align:center; color: #64748b;">Pose Data for ${activeAttire} is currently being built...</p>`;
    return;
  }

  poses.forEach((pose, poseIndex) => {
    if (!activePosesState[pose.id]) activePosesState[pose.id] = 0;
    const varIdx = activePosesState[pose.id];

    let tabsHtml = "";
    pose.variations.forEach((v, vIdx) => {
      const activeCls = vIdx === varIdx ? "active" : "";
      tabsHtml += `<div class="tab ${activeCls}" onclick="switchPoseVariation('${pose.id}', ${vIdx})">${v.label}</div>`;
    });

    const activeVar = pose.variations[varIdx];
    const displayImg = activeVar.img || pose.img || "fallback.png";
    const placeholderImg = `${activeAttire}/placeholder.svg`;

    let poseOutputText = activeVar.text;

    // Store structured JSON in the background
    window.currentJsonState = window.currentJsonState || { poses: {} };
    window.currentJsonState.poses[pose.id] = {
      title: pose.title,
      variation: activeVar.label,
      raw_instructions: activeVar.text,
    };

    const card = document.createElement("div");
    card.className = "pose-card";
    card.innerHTML = `
 <img src="${displayImg}" alt="${pose.title}" onerror="if(this.src.indexOf('placeholder.svg') == -1) this.src='${placeholderImg}';">
 <strong>${pose.title}</strong>
 <div class="tabs">
 ${tabsHtml}
 </div>
 <textarea readonly id="ta_${pose.id}">${poseOutputText}</textarea>
 <div class="action-group" style="flex-wrap: wrap; gap: 8px;">
 <button class="btn-copy-full" onclick="copyCardFull('${pose.id}')">Copy Full</button>
 <button class="btn-copy-full" onclick="copyCardFull('${pose.id}', true)" style="background-color: #d946ef; border-color: #d946ef;">+ Dupatta</button>
 <button class="btn-copy-pose" onclick="copyText('ta_${pose.id}')">Pose Only</button>
 </div>
 `;
    container.appendChild(card);
  });
}

function switchPoseVariation(poseId, vIdx) {
  activePosesState[poseId] = vIdx;
  renderPoseGrid();
}

// ==========================================
// EVENT LISTENERS & COPY UTILS
// ==========================================

window.selectAttire = function (attireKey) {
  const tabs = document.querySelectorAll(".attire-btn");
  tabs.forEach((t) => t.classList.remove("active"));

  const activeBtn = Array.from(tabs).find(
    (t) => t.getAttribute("data-attire") === attireKey,
  );
  if (activeBtn) activeBtn.classList.add("active");

  activeAttire = attireKey;
  activePosesState = {};

  if (!ATTIRE_TYPES[activeAttire]) {
    ATTIRE_TYPES[activeAttire] = "Unknown Attire";
    POSE_LIBRARY[activeAttire] = [];
  }

  updateAllPrompts();
  updateJewelryPrompt(); // Update jewelry prompt when attire changes
  renderPoseGrid();
};

function initTabs() {
  const tabs = document.querySelectorAll(".attire-btn");
  tabs.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const attireKey = e.target.getAttribute("data-attire");
      window.selectAttire(attireKey);
    });
  });

  // Restore Background Color
  const savedBgColor = localStorage.getItem("bgColor");
  if (savedBgColor) {
    const bgColorInput = document.getElementById("bgColor");
    if (bgColorInput) bgColorInput.value = savedBgColor;
  }

  // Restore Recent Colors
  try {
    const savedRecent = localStorage.getItem("recentColors");
    if (savedRecent) {
      recentColors = JSON.parse(savedRecent);
    }
  } catch (e) { console.error("Could not parse recent colors"); }
  renderRecentColors();

  toggleJewelrySection();
  updateAllPrompts();
  renderPoseGrid();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTabs);
} else {
  initTabs();
}

function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function copyText(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    if (elementId.startsWith("ta_")) {
      // It's a pose textarea, highlight the parent card
      document
        .querySelectorAll(".pose-card")
        .forEach((c) => c.classList.remove("copied-pose"));
      el.closest(".pose-card").classList.add("copied-pose");
    }
    copyToClipboard(el.value, () => showToast("Copied successfully!"));
  }
}

function copyCardFull(poseId, forceDupatta = false) {
  // Highlight Logic
  document
    .querySelectorAll(".pose-card")
    .forEach((c) => c.classList.remove("copied-pose"));
  const targetCard = document
    .getElementById(`ta_${poseId}`)
    .closest(".pose-card");
  if (targetCard) targetCard.classList.add("copied-pose");

  const master = document.getElementById("masterPrompt").value;
  const additional = document.getElementById("additionalPrompt").value;
  const neg = document.getElementById("negativePrompt").value;
  const poseTxt = document.getElementById(`ta_${poseId}`).value;

  let dupattaText = "";
  const dupattaRadio = document.querySelector(
    'input[name="dupattaStyle"]:checked',
  );
  let useStyle = dupattaRadio ? dupattaRadio.value : "none";

  if (forceDupatta && useStyle === "none") useStyle = "full";

  if (useStyle !== "none") {
    dupattaText = "\n" + dupattaPrompts[useStyle];
  }

  // Gemini Marker Capture
  const markerRed = document.getElementById("markerRed")?.value.trim();
  const markerBlue = document.getElementById("markerBlue")?.value.trim();
  const markerGreen = document.getElementById("markerGreen")?.value.trim();
  let markerText = "";
  if (markerRed) markerText += `\n🔴 RED MARKED AREA: ${markerRed}`;
  if (markerBlue) markerText += `\n🔵 BLUE MARKED AREA: ${markerBlue}`;
  if (markerGreen) markerText += `\n🟢 GREEN MARKED AREA: ${markerGreen}`;

  // Jewelry Capture
  const accessoriesToggle = document.getElementById("accessoriesToggle")?.checked;
  const jewelryMode = document.querySelector('input[name="jewelryMode"]:checked')?.value || "none";
  let jewelryText = "";
  
  if (accessoriesToggle && jewelryMode !== "none") {
      const jPrompt = document.getElementById("jewelryPrompt")?.value;
      if (jPrompt && !jPrompt.includes("No Jewelry")) {
          jewelryText = "\n\n" + jPrompt;
      }
  }

  const outputFormat = document.getElementById("outputFormat")
    ? document.getElementById("outputFormat").value
    : "text";
  let full = "";

  if (outputFormat === "json") {
    const fullObj = {
      _instruction_for_ai_model:
        "You are an elite fashion photographer and textile expert AI. Read this JSON configuration payload strictly and generate the final fashion image exactly as specified. Do NOT output text. Output the photorealistic image only.",
      master_prompt: window.currentJsonState.master_prompt,
      pose_details: window.currentJsonState.poses[poseId],
      additional_instructions: window.currentJsonState.additional_instructions,
      negative_prompt: neg,
    };

    if (dupattaText) fullObj.dupatta_inclusion = dupattaText.trim();
    if (jewelryText) fullObj.jewelry_inclusion = jewelryText.trim();

    if (markerText) {
      fullObj.image_edits = {
        red_marker: markerRed || null,
        blue_marker: markerBlue || null,
        green_marker: markerGreen || null,
      };
    }
    full = JSON.stringify(fullObj, null, 2);
  } else {
    if (markerText) markerText = `\n\nImage Edits & Adjustments:${markerText}`;
    full = `${master}${dupattaText}${jewelryText}\n\nGarment and Pose Details:\n${poseTxt}\n\nAdditional Instructions:\n${additional}\n\nCrucial Requirements:\n${neg}${markerText}`;
  }

  copyToClipboard(full, () =>
    showToast(
      dupattaText ? "Copied Full Prompt (+Dupatta)!" : "Copied Full Prompt!",
    ),
  );
}

function copyEverything() {
  const master = document.getElementById("masterPrompt").value;
  const additional = document.getElementById("additionalPrompt").value;
  const neg = document.getElementById("negativePrompt").value;

  let dupattaText = "";
  const dupattaRadio = document.querySelector(
    'input[name="dupattaStyle"]:checked',
  );
  if (dupattaRadio && dupattaRadio.value !== "none") {
    dupattaText = "\n" + dupattaPrompts[dupattaRadio.value];
  }

  // Gemini Marker Capture
  const markerRed = document.getElementById("markerRed")?.value.trim();
  const markerBlue = document.getElementById("markerBlue")?.value.trim();
  const markerGreen = document.getElementById("markerGreen")?.value.trim();
  let markerText = "";
  if (markerRed) markerText += `\n🔴 RED MARKED AREA: ${markerRed}`;
  if (markerBlue) markerText += `\n🔵 BLUE MARKED AREA: ${markerBlue}`;
  if (markerGreen) markerText += `\n🟢 GREEN MARKED AREA: ${markerGreen}`;

  // Jewelry Capture
  const accessoriesToggle = document.getElementById("accessoriesToggle")?.checked;
  const jewelryMode = document.querySelector('input[name="jewelryMode"]:checked')?.value || "none";
  let jewelryText = "";
  
  if (accessoriesToggle && jewelryMode !== "none") {
      const jPrompt = document.getElementById("jewelryPrompt")?.value;
      if (jPrompt && !jPrompt.includes("No Jewelry")) {
          jewelryText = "\n\n" + jPrompt;
      }
  }

  const outputFormat = document.getElementById("outputFormat")
    ? document.getElementById("outputFormat").value
    : "text";
  let full = "";

  if (outputFormat === "json") {
    const fullObj = {
      _instruction_for_ai_model:
        "You are an elite fashion photographer and textile expert AI. Read this JSON configuration payload strictly and generate the final fashion image exactly as specified. Do NOT output text. Output the photorealistic image only.",
      master_prompt: window.currentJsonState.master_prompt,
      additional_instructions: window.currentJsonState.additional_instructions,
      negative_prompt: neg,
    };

    if (dupattaText) fullObj.dupatta_inclusion = dupattaText.trim();
    if (jewelryText) fullObj.jewelry_inclusion = jewelryText.trim();

    if (markerText) {
      fullObj.image_edits = {
        red_marker: markerRed || null,
        blue_marker: markerBlue || null,
        green_marker: markerGreen || null,
      };
    }
    full = JSON.stringify(fullObj, null, 2);
  } else {
    if (markerText) markerText = `\n\nImage Edits & Adjustments:${markerText}`;
    full = `${master}${dupattaText}${jewelryText}\n\nAdditional Instructions:\n${additional}\n\nCrucial Requirements:\n${neg}${markerText}`;
  }
  copyToClipboard(full, () =>
    showToast(
      dupattaText
        ? "Copied All (+Dupatta)!"
        : "Copied Master + Additional + Negative!",
    ),
  );
}

function copyToClipboard(text, onSuccess) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(onSuccess)
      .catch((err) => fallbackCopy(text, onSuccess));
  } else {
    fallbackCopy(text, onSuccess);
  }
}

function fallbackCopy(text, onSuccess) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.silhouette.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand("copy");
    if (successful && onSuccess) onSuccess();
  } catch (err) { }
  document.silhouette.removeChild(textArea);
}

// WIP Banner Logic
function closeWipBanner() {
  const banner = document.getElementById("wip-banner");
  if (banner) {
    banner.style.display = "none";
    localStorage.setItem("hideWipBanner", "true");
  }
}

// Theme Toggle Logic
function toggleTheme() {
  const isLight = document.body.classList.toggle("light-theme");
  localStorage.setItem("theme", isLight ? "light" : "dark");

  const checkbox = document.getElementById("themeToggleCheckbox");
  if (checkbox) checkbox.checked = isLight;

  const label = document.getElementById("themeLabel");
  if (label) {
    label.innerText = isLight ? "LUXURY EDITORIAL" : "CYBER NEON";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Check saved theme
  const isLight = localStorage.getItem("theme") === "light";
  if (isLight) {
    document.body.classList.add("light-theme");
  }

  // Set UI state
  const checkbox = document.getElementById("themeToggleCheckbox");
  if (checkbox) checkbox.checked = isLight;

  const label = document.getElementById("themeLabel");
  if (label) {
    label.innerText = isLight ? "LUXURY EDITORIAL" : "CYBER NEON";
  }

  if (localStorage.getItem("hideWipBanner") === "true") {
    const banner = document.getElementById("wip-banner");
    if (banner) banner.style.display = "none";
  }
});
