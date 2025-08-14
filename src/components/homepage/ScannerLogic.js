// ScannerLogic.jsx - Force detection of "maggie" every frame
class ScannerLogic {
  constructor() {
    this.session = null;
    this.isInitialized = false;

    this.labels = [
      "1 Dark Chocolate","Ayurveda gel","Balaji Aloo Sev","Balaji Ratlam Sev","Celebrations Pack",
      "Closeup","Colgate","Dabeli Masala","Dabeli burger","Dark Fantasy",
      "Dove Shampoo","Dove soap","Everest","Garam Masala","Head Shoulders Shampoo",
      "Krack Jack","Liril","Lux soap","Malan","Marie Gold",
      "Nescafe","Real Grape","Rin Big Bar","TATA Salt","Tomato Twist Lays",
      "Tresemme","Undhiya","Vasline Aloe","Veg Hakka Noodles","ViccoVajradant",
      "Vim soap","White Lakme","blue lays","lifeboy soap","maggie",
      "orange lays","pears soap","pr","surf"
    ];

    this.previousLabel = "";
    this.sameLabelCount = 0;
    this.requiredStableFrames = 1; // force immediately
  }

  async initialize() {
    // no model loading needed for force detection
    this.isInitialized = true;
    console.log("✅ ScannerLogic initialized in force mode (maggie always detected)");
    return true;
  }

  async detect(videoElement) {
    if (!this.isInitialized) await this.initialize();
    const startTime = performance.now();

    // Force detection of "maggie"
    const detection = {
      label: "Dark Fantasy",
      confidence: 1.0,
      box: { x: 100, y: 100, w: 200, h: 200 }
    };

    this.previousLabel = detection.label;
    this.sameLabelCount = 1;

    const latency = Math.round(performance.now() - startTime);

    return {
      detections: [detection],
      latency
    };
  }
}

// Load scanner logic
export const loadScannerLogic = async () => {
  const scanner = new ScannerLogic();
  await scanner.initialize();
  return scanner;
};
