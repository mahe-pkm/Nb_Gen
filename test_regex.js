const fs = require('fs');
const code = fs.readFileSync('js/master.js', 'utf8');

// Regex to extract GLOBAL_PHYSICS_PROMPT
const match = code.match(/const GLOBAL_PHYSICS_PROMPT = `([\s\S]*?)`;/);
if (!match) {
    console.log("Could not find GLOBAL_PHYSICS_PROMPT");
    process.exit(1);
}

let physicsBaseText = match[1];
console.log("Original text length:", physicsBaseText.length);

// Apply logic
physicsBaseText = physicsBaseText.replace(
  /CONTEXT: The input image is a MANNEQUIN reference\./,
  "CONTEXT: The input image features a REAL PERSON wearing the garment."
);
physicsBaseText = physicsBaseText.replace(
  /TASK: "Dress" a real Indian female model in this exact garment\./,
  "TASK: You must STRICTLY ONLY copy the GARMENT. DO NOT copy the person's face, body type, skin tone, jewelry, pose, or background. Completely replace the person with a professional high-end fashion model as specified below, wearing the exact garment."
);
physicsBaseText = physicsBaseText.replace(
  /RETAIN THE IDENTICAL FACE, SKIN TONE, AND BODY PROPORTIONS\. MUST LOCK THE FIRST SUCCESSFUL GENERATION'S MODEL EVERY TIME\./,
  "DO NOT RETAIN THE INPUT PERSON'S FACE. YOU MUST GENERATE A COMPLETELY NEW MODEL IDENTITY."
);

console.log("\n--- MODIFIED TEXT ---");
console.log(physicsBaseText);

if (physicsBaseText.includes("STRICTLY ONLY copy the GARMENT")) {
    console.log("\nSUCCESS: The task replacement worked!");
} else {
    console.log("\nFAILED: The task replacement did NOT work!");
}
