const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');
const scriptContent = fs.readFileSync('js/master.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "outside-only" });
const window = dom.window;
const document = window.document;

// Mock localStorage
window.localStorage = {
  getItem: function() { return null; },
  setItem: function() {},
};

// Execute master.js in the context of the JSDOM window
try {
  window.eval(scriptContent);
  console.log("master.js loaded successfully.");
} catch (e) {
  console.error("Syntax/Load Error in master.js:", e);
  process.exit(1);
}

const attires = [
  "saree_ready", "semi_lehenga", "sharara", "tops", "two_piece", 
  "anarkali", "chudidhar", "half_saree", "lehenga", "long_gown"
];

let passed = true;
attires.forEach(attire => {
  try {
    // Simulate clicking the attire button
    window.activeAttire = attire;
    window.buildPoseGrid(attire);
  } catch(e) {
    console.error(`Error in buildPoseGrid for ${attire}:`, e);
    passed = false;
  }
});

if (passed) console.log("All pose grids built successfully.");

// Test updateAllPrompts
try {
  // Test Mannequin
  document.getElementById("inputSource").value = "mannequin";
  window.updateAllPrompts();
  console.log("Mannequin prompt updated successfully.");
  
  // Test Real Model
  document.getElementById("inputSource").value = "model";
  window.updateAllPrompts();
  console.log("Real Model prompt updated successfully.");
  
} catch (e) {
  console.error("Error in updateAllPrompts:", e);
  passed = false;
}

if (passed) {
  console.log("VERIFICATION SUCCESS");
} else {
  console.log("VERIFICATION FAILED");
  process.exit(1);
}
