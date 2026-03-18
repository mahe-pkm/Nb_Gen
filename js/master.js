const GLOBAL_PHYSICS_PROMPT = `ROLE: EXPERT FASHION PHOTOGRAPHER.
CONTEXT: Input is a MANNEQUIN or MODEL wearing a garment.
TASK: "Dress" a lifelike fashion model in this EXACT garment. 
RULES:
1. ONLY copy garments. Completely replace original subject/mannequin, background, and identity. 
2. Retain identical body orientation, pose structure, and garment flow from input. Pose instructions below are for refinement only.
3. Final image must be a high-end studio commercial shot, strict portrait format.

FABRIC & CRAFT PHYSICS:
- Sheer (Georgette/Net): Soft micro-folds, translucent.
- Structured (Silk/Organza): Crisp folds, visible weave.
- Raised Work (Zardosi/Beads): 3D relief, cast micro-shadows, sharp edges, gap between beads.
- Metallic (Zari/Sequins): Highly reflective, glossy/metallic (not yellow thread).
- Replicate exact weight, tension, and embroidery density. NO blending/fuzzy textures.`;

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


// Optimized dynamic pose generator
const ATTIRE_TRAITS = {
  chudidhar: {
    l: "kurta hem and fitted chudidhar pants",
    d: "Kurta flows straight naturally. Visible gathers (churis) at the ankles.",
    mf: "Kurta ripples softly, revealing the fitted pants underneath.",
    as: "Side slits of the kurta open slightly, showing pant details.",
    sp: "Straight-cut side profile showing alignment of kurta slit and fitted leg.",
    mt: "Straight kurta trails slightly with motion, without blooming excessively.",
    mb: "Kurta sways naturally against the fitted pants with each step.",
    sd: "Kurta swishes slightly, showing its distinct straight cut."
  },
  anarkali: {
    l: "flared anarkali skirt",
    d: "Anarkali flows in its intended A-line full flared silhouette.",
    mf: "Flared skirt reacts to forward motion, draping gracefully.",
    as: "Anarkali flare is accentuated on the weight-bearing side.",
    sp: "A-line gradient and massive flare are profiled clearly.",
    mt: "Massive skirt flies out dynamically behind the model.",
    mb: "Flared back panels ripple dynamically with motion.",
    sd: "Anarkali is fully flared out by centrifugal force into a wide circle."
  },
  lehenga: {
    l: "lehenga skirt",
    d: "Lehenga skirt flows in its vast flared silhouette.",
    mf: "Lehenga skirt reacts to forward motion gracefully.",
    as: "Skirt flare is accentuated on the weight-bearing side.",
    sp: "Lehenga's A-line gradient and massive flare are profiled clearly.",
    mt: "Heavy lehenga skirt flies out dynamically behind the model.",
    mb: "Flared back panels ripple dynamically with motion.",
    sd: "Lehenga is fully flared out by centrifugal force into a wide circle."
  },
  half_saree: {
    l: "pleated skirt and voni drape",
    d: "Half Saree skirt flows in its A-line silhouette.",
    mf: "Pleated skirt reacts to forward motion gracefully.",
    as: "Skirt flare is accentuated on the weight-bearing side.",
    sp: "Skirt A-line gradient is profiled clearly.",
    mt: "Skirt flies out dynamically behind the model.",
    mb: "Pleated back panels ripple dynamically with motion.",
    sd: "Skirt is fully flared out by centrifugal force into a wide circle."
  },
  long_gown: {
    l: "long gown flowing skirt",
    d: "Long Gown flows in its intended A-line sweeping silhouette.",
    mf: "Gown skirt reacts to forward motion, draping gracefully.",
    as: "Gown flare is accentuated on the weight-bearing side.",
    sp: "A-line gradient and sweep are profiled clearly.",
    mt: "Gown skirt trails out dynamically behind the model.",
    mb: "Back panels ripple dynamically with motion.",
    sd: "Gown is fully flared out by centrifugal force into a wide sweep."
  },
  two_piece: {
    l: "bottom trousers/skirt",
    d: "Two-piece set flows maintaining its co-ord structure.",
    mf: "Garment reacts to walking stride naturally.",
    as: "Co-ord pieces bunch slightly on the relaxed side.",
    sp: "Side fit and separation of the two pieces is clearly visible.",
    mt: "Fabric catches the air slightly but retains co-ord structure.",
    mb: "Back structures of top and bottom move in unison.",
    sd: "Garment moves fluidly without forced circular flare."
  },
  tops: {
    l: "top's lower hem",
    d: "The top hangs naturally to its designated length.",
    mf: "Top catches brief wind, rippling at the hem.",
    as: "Top shifts slightly, highlighting side contours.",
    sp: "Top's side seam and back fit are profiled clearly.",
    mt: "Hem trails slightly with walking motion.",
    mb: "Back panel sways naturally.",
    sd: "Top hem fans out mildly without exaggerated flaring."
  },
  sharara: {
    l: "flared sharara pants",
    d: "Sharara flows with wide flared pants from the knees down.",
    mf: "Flared pants ripple with forward motion.",
    as: "Sharara pants bunch elegantly on the relaxed leg.",
    sp: "Flared pants side profile is clearly visible.",
    mt: "Wide pants trail beautifully with walking motion.",
    mb: "Back folds of the sharara sway with each step.",
    sd: "Sharara pants flare out elegantly with the spin."
  },
  saree_ready: {
    l: "pre-stitched saree pleats",
    d: "Ready saree flows maintaining exact pre-draped pleats.",
    mf: "Pallu and pleats react to forward motion.",
    as: "Saree drape creates natural diagonal lines and asymmetry.",
    sp: "Saree pallu drape and pleat fall profiled clearly.",
    mt: "Pallu trails dynamically behind the model.",
    mb: "Back drape falls elegantly.",
    sd: "Saree pleats open slightly with spin."
  },
  semi_lehenga: {
    l: "lehenga skirt",
    d: "Lehenga flows in its vast flared silhouette.",
    mf: "Lehenga skirt reacts to forward motion gracefully.",
    as: "Skirt flare is accentuated on the weight-bearing side.",
    sp: "Lehenga's A-line gradient and massive flare are profiled clearly.",
    mt: "Heavy lehenga skirt flies out dynamically behind the model.",
    mb: "Flared back panels ripple dynamically with motion.",
    sd: "Lehenga is fully flared out by centrifugal force into a wide circle."
  }
};

function generatePoses(attireKey) {
  const t = ATTIRE_TRAITS[attireKey] || ATTIRE_TRAITS.tops;
  return [
    {
      id: "pose1", title: "Pose 01 — Main (Full Front)",
      variations: [
        { label: "V1: Static", img: attireKey+"/pose1_v1.png", text: `FRAMING: Full-body vertical portrait, center-weighted, 80mm. NEVER crop below ankle.\nPOSE: Front-facing, symmetrical static stance. Relaxed arms.\nGARMENT: ${t.d} No motion blur.`},
        { label: "V2: Walking", img: attireKey+"/pose1_v2.png", text: `FRAMING: Full-body vertical portrait, 50mm. NEVER crop below ankle.\nPOSE: Front-facing, mid-stride walking. Arms swinging naturally.\nGARMENT: ${t.mf}`},
        { label: "V3: Clasped", img: attireKey+"/pose1_v3.png", text: `FRAMING: Full-body vertical portrait, 80mm. NEVER crop below ankle.\nPOSE: Front-facing. Hands lightly clasped at waist, elbows slightly outward.\nGARMENT: Bodice taut across waist. ${t.d}`}
      ]
    },
    {
      id: "pose2", title: "Pose 02 — Secondary (Front Var)",
      variations: [
        { label: "V1: Weight Shift", img: attireKey+"/pose2_v1.png", text: `FRAMING: Full-body vertical portrait, 80mm. NEVER crop below ankle.\nPOSE: Front-facing contrapposto stance. Weight on one leg, relaxed arms.\nGARMENT: ${t.as}`},
        { label: "V2: Candid", img: attireKey+"/pose2_v2.png", text: `FRAMING: Full-body vertical portrait, 50mm. NEVER crop below ankle.\nPOSE: Torso front-facing, head turned 30 degrees off-camera.\nGARMENT: Neckline and yoke details lie flat and are clearly visible.`},
        { label: "V3: Hand Flow", img: attireKey+"/pose2_v3.png", text: `FRAMING: Full-body vertical portrait, 80mm. NEVER crop below ankle.\nPOSE: Hands gently lift/brush the ${t.l}, creating tension. Head tilts toward hand.\nGARMENT: Fabric pulled gently revealing weight and texture.`}
      ]
    },
    {
      id: "pose3", title: "Pose 03 — Secondary (Side)",
      variations: [
        { label: "V1: Profile", img: attireKey+"/pose3_v1.png", text: `FRAMING: Full-body vertical profile, 80mm. NEVER crop below ankle.\nPOSE: 90-degree true side profile. Straight posture. Arms straight down side-seam.\nGARMENT: ${t.sp}`},
        { label: "V2: Head Turn", img: attireKey+"/pose3_v2.png", text: `FRAMING: Full-body vertical profile, 80mm. NEVER crop below ankle.\nPOSE: 90-degree torso profile, head turned over shoulder making eye contact.\nGARMENT: ${t.sp}`},
        { label: "V3: Walking", img: attireKey+"/pose3_v3.png", text: `FRAMING: Full-body vertical profile. Wide enough for trailing hem. 50mm.\nPOSE: Dynamic 90-degree walking profile, mid-step.\nGARMENT: ${t.mt}`}
      ]
    },
    {
      id: "pose4", title: "Pose 04 — Secondary (Back)",
      variations: [
        { label: "V1: Static", img: attireKey+"/pose4_v1.png", text: `FRAMING: Full back-facing vertical portrait, 80mm. NEVER crop below ankle.\nPOSE: Symmetrical standing, back to camera. Hair swept aside.\nGARMENT: Focus 100% on back design, zipper, back embroidery, and back ${t.l}.`},
        { label: "V2: Looking Back", img: attireKey+"/pose4_v2.png", text: `FRAMING: Full back-facing vertical portrait, 80mm. NEVER crop below ankle.\nPOSE: Turn head over shoulder towards camera. Torso twists slightly (10 deg).\nGARMENT: Torso twist creates gentle stress lines showing back fit.`},
        { label: "V3: Walk Away", img: attireKey+"/pose4_v3.png", text: `FRAMING: Full back-facing vertical portrait, 50mm. NEVER crop below ankle.\nPOSE: Walking away from camera.\nGARMENT: ${t.mb}`}
      ]
    },
    {
      id: "pose5", title: "Pose 05 — Detail (Neckline)",
      variations: [
        { label: "V1: Center", img: attireKey+"/pose5_v1.png", text: `FRAMING: Tight upper-body crop (head to mid-section). 100mm macro.\nPOSE: Front-facing, still. Arms away from bodice.\nGARMENT: High-res focus on neckline, yoke, and upper bodice detailing.`},
        { label: "V2: Angled", img: attireKey+"/pose5_v2.png", text: `FRAMING: Low-angle upper-body crop. 35mm lens.\nPOSE: Looking down into lens, confident expression.\nGARMENT: Highlights fabric fall over upper bodice.`},
        { label: "V3: Context", img: attireKey+"/pose5_v3.png", text: `FRAMING: Upper-body crop. 80mm lens.\nPOSE: One hand gently touching upper neckline/necklace area.\nGARMENT: Hand draws eye to shoulder/neckline embroidery.`}
      ]
    },
    {
      id: "pose6", title: "Pose 06 — Detail (Sleeve)",
      variations: [
        { label: "V1: Lifted", img: attireKey+"/pose6_v1.png", text: `FRAMING: Close-up on one arm (shoulder to fingertips). 100mm.\nPOSE: Arm lifted 45 degrees sideways.\nGARMENT: Isolates sleeve to show exact shape, transparency, and embroidery.`},
        { label: "V2: On waist", img: attireKey+"/pose6_v2.png", text: `FRAMING: Close-up on sleeve. 100mm.\nPOSE: Hand firmly on natural waist, elbow outward.\nGARMENT: Shows sleeve fabric bunching at inner elbow and wrist cuff.`},
        { label: "V3: Cuff Adjust", img: attireKey+"/pose6_v3.png", text: `FRAMING: Close-up on sleeve cuffs. 100mm.\nPOSE: Opposite hand adjusting cuff/bangle of primary arm.\nGARMENT: Highlights sleeve tension, edge stitching, and cuff details.`}
      ]
    },
    {
      id: "pose7", title: "Pose 07 — Detail (Midsection)",
      variations: [
        { label: "V1: Center", img: attireKey+"/pose7_v1.png", text: `FRAMING: Mid-body crop (neckline to upper waist). 100mm.\nPOSE: Front-facing static.\nGARMENT: Extreme focus on transition points, waist gathers, pleats, or stitching.`},
        { label: "V2: Side Angle", img: attireKey+"/pose7_v2.png", text: `FRAMING: Mid-body crop. 80mm.\nPOSE: Torso turned 45 degrees, one arm lifted high (fixing hair).\nGARMENT: Unobstructed view of side-seam, zipper, and side fit.`},
        { label: "V3: Texture", img: attireKey+"/pose7_v3.png", text: `FRAMING: Extreme macro crop on heavy midsection embroidery or joinery (zari, sequins, prints). 100mm macro.\nGARMENT: Fabric weave and crisp 3D texture strictly visible.`}
      ]
    },
    {
      id: "pose8", title: "Pose 08 — Detail (Lower Hem)",
      variations: [
        { label: "V1: Static", img: attireKey+"/pose8_v1.png", text: `FRAMING: Mid-to-lower body crop (waist to floor). 80mm. NEVER crop below ankle.\nPOSE: Neutral standing.\nGARMENT: Focus on exactly how the ${t.l} falls and gathers at hemline.`},
        { label: "V2: Hold Edge", img: attireKey+"/pose8_v2.png", text: `FRAMING: Mid-to-lower body crop. 80mm. NEVER crop below ankle.\nPOSE: Model holds edge of ${t.l} pulling it wide.\nGARMENT: Shows full width, fabric fall, and translucency.`},
        { label: "V3: Gentle Turn", img: attireKey+"/pose8_v3.png", text: `FRAMING: Mid-to-lower body crop. 50mm. NEVER crop below ankle.\nPOSE: Freeze-frame of a gentle twirl/spin.\nGARMENT: ${t.sd}`}
      ]
    },
    {
      id: "pose9", title: "Pose 09 — Detail (Side Profile)",
      variations: [
        { label: "V1: Clean", img: attireKey+"/pose9_v1.png", text: `FRAMING: Upper-silhouette close-up, strict 90-degree profile. 100mm macro.\nPOSE: Arms straight down side-seam.\nGARMENT: High-res focus on side neckline depth, shoulder seam, and sleeve fall.`},
        { label: "V2: Fwd Lean", img: attireKey+"/pose9_v2.png", text: `FRAMING: Upper-silhouette close-up, side profile. 80mm.\nPOSE: Slight forward lean, intense gaze.\nGARMENT: Fabric pulls across upper back demonstrating fit tension and yoke/shoulder line.`},
        { label: "V3: Glance", img: attireKey+"/pose9_v3.png", text: `FRAMING: Upper-silhouette close-up, side profile. 80mm.\nPOSE: Torso side-profile, head turned toward camera for intimate glance.\nGARMENT: Twisting highlights collar/nape details and contrasts front vs back.`}
      ]
    }
  ];
}

const POSE_LIBRARY = {};
Object.keys(ATTIRE_TRAITS).forEach(key => {
  POSE_LIBRARY[key] = generatePoses(key);
});
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

  let modelDesc = "Fashion model";
  if (state.age === "young") modelDesc = "Young fashion model (20-25)";
  if (state.age === "adult") modelDesc = "Adult fashion model (28-32)";
  if (state.age === "mature") modelDesc = "Mature fashion model (40-45)";

  if (state.look === "indian") modelDesc += ", standard Indian";
  if (state.look === "south_indian") modelDesc += ", South Indian, warm tones";
  if (state.look === "north_indian") modelDesc += ", North Indian";
  if (state.look === "indo_western") modelDesc += ", Indo-Western modern";

  if (state.silhouette === "slim") modelDesc += ", slim styling.";
  else if (state.silhouette === "curvy") modelDesc += ", plus-size styling.";
  else modelDesc += ", regular styling.";

  let accDesc = "";
  if (state.accs) {
    const jewelryMode = document.querySelector('input[name="jewelryMode"]:checked')?.value || "none";
    if (jewelryMode === "none") {
      accDesc = "\nACCESSORIES: IGNORE original jewelry. Use minimal elegant jewelry matching attire.";
    } else {
      accDesc = "\nACCESSORIES: IGNORE original jewelry. Apply custom jewelry settings below.";
    }
  } else {
    accDesc = "\nACCESSORIES: MUST REMOVE ALL jewelry. No accessories.";
  }

  let physicsBaseText = GLOBAL_PHYSICS_PROMPT;
  let finalNegative = "blurry, pixelated, bad structure, extra limbs, extra fingers, missing limbs, watermarks, text, signatures, low res, plastic look, oil painting, cartoon, CGI, smooth fabrics (unless silk), flat embroidery, soft beads, blended texture";

  const inputSource = document.getElementById("inputSource").value;
  if (inputSource === "model") {
    const baseWithoutContext = GLOBAL_PHYSICS_PROMPT.substring(GLOBAL_PHYSICS_PROMPT.indexOf("FABRIC &"));
    const newContext = `ROLE: EXPERT FASHION PHOTOGRAPHER.
CONTEXT: Input is a REAL PERSON wearing the garment.
TASK: "Dress" a lifelike fashion model in this EXACT garment. 
RULES:
1. OVERRIDE: Treat the Real Person input as just a mannequin.
2. ONLY copy the garments. 
3. CRITICAL ANONYMIZATION: COMPLETELY REPLACE the original person. DO NOT copy face, body, or identity. Generate a NEW, unrecognizable high-end fashion model.\n\n`;
    physicsBaseText = newContext + baseWithoutContext;
    finalNegative += ", original face, same identity, original facial features, input person";
  }

const finalMaster = physicsBaseText + `\n\nGENERATE: High-end commercial fashion catalog photo.\nLAYOUT: Strict portrait (2:3 or 3:4).\nATTIRE CLASS: ${ATTIRE_TYPES[activeAttire] || activeAttire}\n\n/// SECONDARY SUBJECT ///\n${modelDesc}\nFOOTWEAR: Cropped out or hidden.\n${accDesc}\nCLEAN EDGES: Razor-sharp subject separation.`;

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

  const finalAdditional = `SCENE: High-end fashion studio.\nBACKGROUND: Pure flat continuous backdrop (${customBgColor}) with zero floor cast shadows.\nLIGHTING: Crisp key lighting for specular glints on embellishments. Global illumination with subsurface scattering.\nDETAILS: Natural sparkle on zardosi/stones. Zero background bleed onto garment.\nCONSISTENCY: Maintain strictly consistent face, silhouette, and hair.`;

  document.getElementById("masterPrompt").value = finalMaster;
  document.getElementById("additionalPrompt").value = finalAdditional;
  document.getElementById("negativePrompt").value = finalNegative;

  // Build structured JSON in the background for copying
  window.currentJsonState = window.currentJsonState || { poses: {} };
  window.currentJsonState.master_prompt = {
    task: "Generate a high-end commercial fashion catalog photograph where fabric physics and embroidery detail depth are indistinguishable from reality.",
    layout: "Strictly vertical/portrait (2:3 or 3:4) orientation.",
    style_and_physics_base: physicsBaseText,
    subject_details: `${modelDesc}, warm pleasant expression, high-end editorial photography lighting.`,
    footwear: `Ensure footwear is cropped out or hidden by the garment flow.${accDesc}`,
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
  let neg = document.getElementById("negativePrompt").value;
  if (document.getElementById("inputSource") && document.getElementById("inputSource").value === "model") {
      neg += ", original face, same identity, original facial features, input person";
  }
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
      dupattaText ? "Copied Full Prompt (+Dupatta)! Select Pro Mode in chat." : "Copied Full Prompt! Select Pro Mode in chat.",
    ),
  );
}

function copyEverything() {
  const master = document.getElementById("masterPrompt").value;
  const additional = document.getElementById("additionalPrompt").value;
  let neg = document.getElementById("negativePrompt").value;
  if (document.getElementById("inputSource") && document.getElementById("inputSource").value === "model") {
      neg += ", original face, same identity, original facial features, input person";
  }

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
        ? "Copied All (+Dupatta)! Select Pro Mode in chat."
        : "Copied Master+Additional+Negative! Select Pro Mode in chat.",
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
