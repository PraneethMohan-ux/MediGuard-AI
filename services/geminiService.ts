
import { UserProfile, ChatMessage } from "../types";

// Enhanced Drug Database based on Indian Pharmacopoeia (IP) & NLEM 2022 Standards
interface DrugInfo {
  class: string;
  indication: string;
  schedule: string; // Schedule H, H1, G, X etc.
  kidney: string;
  liver: string;
  interactions: string[];
  sideEffects: string[];
  warnings: string[];
  bbb: boolean;          // Blood Brain Barrier Crossing
  habitForming: boolean; // Addiction Risk
  pregnancyUnsafe: boolean; // Pregnancy Category D/X or generally unsafe
}

// A comprehensive list of common drugs in India (Updated with NLEM 2022)
const DRUG_DB: Record<string, DrugInfo> = {
  // --- PAIN & FEVER ---
  "paracetamol": {
    class: "Analgesic & Antipyretic (NLEM 2022)",
    indication: "Fever, Mild Pain",
    schedule: "OTC",
    kidney: "Safe in normal doses. Adjustment needed in severe renal failure.",
    liver: "WARNING: High risk of hepatotoxicity in overdose (>4g/day).",
    interactions: ["Warfarin", "Alcohol", "Isoniazid"],
    sideEffects: ["Nausea", "Allergic reactions"],
    warnings: ["Do not exceed 4g per 24 hours.", "Contraindicated in severe liver failure."],
    bbb: true, 
    habitForming: false,
    pregnancyUnsafe: false
  },
  "crocin": {
    class: "Analgesic (Brand for Paracetamol)",
    indication: "Fever, Headache",
    schedule: "OTC",
    kidney: "Safe in normal doses.",
    liver: "Avoid overdose.",
    interactions: ["Alcohol"],
    sideEffects: ["Nausea"],
    warnings: ["Contains Paracetamol. Do not double dose."],
    bbb: true,
    habitForming: false,
    pregnancyUnsafe: false
  },
  "dolo": {
    class: "Analgesic (Brand for Paracetamol 650)",
    indication: "High Fever",
    schedule: "OTC",
    kidney: "Safe in normal doses.",
    liver: "Avoid overdose.",
    interactions: ["Alcohol"],
    sideEffects: ["Nausea"],
    warnings: ["Contains Paracetamol 650mg."],
    bbb: true,
    habitForming: false,
    pregnancyUnsafe: false
  },
  "ibuprofen": {
    class: "NSAID (NLEM 2022)",
    indication: "Pain, Inflammation",
    schedule: "Schedule H",
    kidney: "WARNING: Can cause acute kidney injury. Avoid in CKD.",
    liver: "Use with caution.",
    interactions: ["Aspirin", "ACE Inhibitors", "Lithium", "Methotrexate"],
    sideEffects: ["Gastritis", "Ulcers", "Kidney damage"],
    warnings: ["Take with food to avoid gastric irritation.", "Contraindicated in active peptic ulcer.", "Contraindicated in third trimester of pregnancy."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: true // Avoid, esp in 3rd trimester
  },
  "diclofenac": {
    class: "NSAID (NLEM 2022)",
    indication: "Pain, Arthritis",
    schedule: "Schedule H",
    kidney: "High risk of renal impairment with long-term use.",
    liver: "Risk of elevated liver enzymes.",
    interactions: ["Other NSAIDs", "Blood thinners"],
    sideEffects: ["Epigastric pain", "Nausea", "Headache"],
    warnings: ["Avoid if you have heart disease or stomach ulcers.", "Contraindicated in patients with active GI bleeding."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: true
  },
  "tramadol": {
    class: "Opioid Analgesic (NLEM 2022)",
    indication: "Moderate to Severe Pain",
    schedule: "Schedule H1 (Strict Warning)",
    kidney: "Reduce dose in renal impairment.",
    liver: "Reduce dose in hepatic impairment.",
    interactions: ["SSRI Antidepressants", "Alcohol", "Benzodiazepines"],
    sideEffects: ["Dizziness", "Constipation", "Nausea", "Sleepiness"],
    warnings: ["Habit-forming. Causes drowsiness. Do not drive.", "Contraindicated in acute intoxication with alcohol.", "Contraindicated in respiratory depression."],
    bbb: true,
    habitForming: true,
    pregnancyUnsafe: true
  },

  // --- NLEM 2022 ADDITIONS ---
  "ivermectin": {
    class: "Anthelminthic & Antifilarial (NLEM 2022)",
    indication: "Filariasis, Strongyloidiasis, Scabies",
    schedule: "Schedule H",
    kidney: "Safe.",
    liver: "Use with caution.",
    interactions: ["Warfarin"],
    sideEffects: ["Fever", "Pruritus", "Skin rash", "Dizziness"],
    warnings: ["Take on an empty stomach with water.", "Mazzotti reaction possible in onchocerciasis treatment."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: true // Category C
  },
  "amikacin": {
    class: "Aminoglycoside Antibiotic (NLEM 2022)",
    indication: "Serious bacterial infections (MDR-TB, Hospital-acquired)",
    schedule: "Schedule H",
    kidney: "WARNING: Nephrotoxic. Strict monitoring required.",
    liver: "Safe.",
    interactions: ["Furosemide", "Amphotericin B", "Muscle relaxants"],
    sideEffects: ["Hearing loss (Ototoxicity)", "Kidney damage", "Balance problems"],
    warnings: ["Monitor auditory and renal function.", "Ensure adequate hydration."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: true // Category D
  },
  "bedaquiline": {
    class: "Diarylquinoline Antitubercular (NLEM 2022)",
    indication: "Multidrug-resistant Tuberculosis (MDR-TB)",
    schedule: "Schedule H1",
    kidney: "Use with caution.",
    liver: "Avoid in severe hepatic impairment.",
    interactions: ["Rifampicin (CYP3A4 inducers)", "QT prolonging drugs"],
    sideEffects: ["Headache", "Nausea", "QT prolongation", "Joint pain"],
    warnings: ["Boxed Warning: QT prolongation (Monitor ECG).", "Increased risk of death observed in trials."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: true // Category B
  },
  "delamanid": {
    class: "Antitubercular (NLEM 2022)",
    indication: "MDR-TB",
    schedule: "Schedule H1",
    kidney: "Safe.",
    liver: "Caution.",
    interactions: ["QT prolonging drugs"],
    sideEffects: ["Dizziness", "Tremor", "QT prolongation"],
    warnings: ["Monitor ECG for QT prolongation.", "Take with food."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: true
  },
  "itraconazole": {
    class: "Azole Antifungal (NLEM 2022)",
    indication: "Fungal infections (Aspergillosis, Blastomycosis)",
    schedule: "Schedule H",
    kidney: "Caution.",
    liver: "Monitor liver function.",
    interactions: ["Simvastatin", "Midazolam", "Antacids"],
    sideEffects: ["Nausea", "Abdominal pain", "Liver toxicity"],
    warnings: ["Take with food for better absorption.", "Contraindicated in heart failure."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: true // Category C
  },

  // --- ANTIBIOTICS ---
  "amoxicillin": {
    class: "Penicillin Antibiotic (NLEM 2022)",
    indication: "Bacterial Infections",
    schedule: "Schedule H",
    kidney: "Dose adjustment required in renal failure.",
    liver: "Generally safe.",
    interactions: ["Methotrexate", "Warfarin", "Probenecid"],
    sideEffects: ["Diarrhea", "Rash", "Nausea"],
    warnings: ["Complete the full course to prevent resistance.", "Contraindicated if allergic to Penicillin."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: false
  },
  "azithromycin": {
    class: "Macrolide Antibiotic (NLEM 2022)",
    indication: "Respiratory & Throat Infections",
    schedule: "Schedule H",
    kidney: "Safe.",
    liver: "Use with caution.",
    interactions: ["Antacids (Al/Mg)", "Digoxin", "Ergot derivatives"],
    sideEffects: ["Diarrhea", "Abdominal pain"],
    warnings: ["Take 1 hour before or 2 hours after food.", "Contraindicated in patients with history of cholestatic jaundice/hepatic dysfunction."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: false
  },
  "ciprofloxacin": {
    class: "Fluoroquinolone Antibiotic (NLEM 2022)",
    indication: "UTI, Bacterial Infections",
    schedule: "Schedule H",
    kidney: "Dose adjustment needed.",
    liver: "Caution.",
    interactions: ["Theophylline", "Tizanidine", "Dairy products"],
    sideEffects: ["Tendonitis", "Photosensitivity", "Dizziness"],
    warnings: ["Avoid in children and pregnancy. Risk of tendon rupture.", "Contraindicated in patients with history of tendon disorders."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: true
  },

  // --- DIABETES ---
  "metformin": {
    class: "Biguanide (NLEM 2022)",
    indication: "Type 2 Diabetes",
    schedule: "Schedule H",
    kidney: "Contraindicated in severe renal impairment (eGFR < 30).",
    liver: "Avoid in severe liver disease.",
    interactions: ["Alcohol", "Iodinated contrast media"],
    sideEffects: ["GI upset", "Metallic taste", "B12 deficiency"],
    warnings: ["Take with meals to reduce stomach upset.", "Contraindicated in metabolic acidosis, including diabetic ketoacidosis."],
    bbb: true,
    habitForming: false,
    pregnancyUnsafe: false // Generally considered safer than others, but insulin preferred
  },
  "glimepiride": {
    class: "Sulfonylurea (NLEM 2022)",
    indication: "Type 2 Diabetes",
    schedule: "Schedule H",
    kidney: "Use with caution.",
    liver: "Use with caution.",
    interactions: ["Alcohol", "Beta-blockers", "Fluconazole"],
    sideEffects: ["Hypoglycemia (Low sugar)", "Weight gain"],
    warnings: ["Risk of sudden low blood sugar. Carry sugar.", "Contraindicated in diabetic ketoacidosis."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: true
  },

  // --- HYPERTENSION & HEART ---
  "amlodipine": {
    class: "Calcium Channel Blocker (NLEM 2022)",
    indication: "Hypertension",
    schedule: "Schedule H",
    kidney: "Safe.",
    liver: "Start with lower dose in hepatic impairment.",
    interactions: ["Simvastatin"],
    sideEffects: ["Ankle swelling (Edema)", "Flushing"],
    warnings: ["Do not stop abruptly.", "Contraindicated in severe hypotension."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: false // Category C, use if benefit > risk
  },
  "telmisartan": {
    class: "ARB (NLEM 2022)",
    indication: "Hypertension",
    schedule: "Schedule H",
    kidney: "Monitor Potassium levels.",
    liver: "Caution in biliary obstruction.",
    interactions: ["Potassium supplements", "NSAIDs"],
    sideEffects: ["Dizziness", "Back pain"],
    warnings: ["May cause high potassium levels.", "Contraindicated in pregnancy (2nd and 3rd trimesters).", "Contraindicated in biliary obstruction."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: true // Category D
  },
  "atorvastatin": {
    class: "Statin (NLEM 2022)",
    indication: "High Cholesterol",
    schedule: "Schedule H",
    kidney: "Safe.",
    liver: "Contraindicated in active liver disease.",
    interactions: ["Clarithromycin", "Grapefruit juice"],
    sideEffects: ["Muscle pain", "Digestive issues"],
    warnings: ["Report unexplained muscle pain immediately.", "Contraindicated in active liver disease.", "Contraindicated in pregnancy."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: true // Category X
  },

  // --- GASTRIC ---
  "pantoprazole": {
    class: "Proton Pump Inhibitor (NLEM 2022)",
    indication: "Acidity, GERD",
    schedule: "Schedule H",
    kidney: "Safe.",
    liver: "Maximum 20mg in severe liver failure.",
    interactions: ["Clopidogrel (Mild)", "Iron supplements"],
    sideEffects: ["Headache", "Diarrhea"],
    warnings: ["Best taken empty stomach in the morning."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: false
  },
  "domperidone": {
    class: "Prokinetic (NLEM 2022)",
    indication: "Nausea, Vomiting",
    schedule: "Schedule H",
    kidney: "Adjust dose.",
    liver: "Contraindicated in moderate/severe impairment.",
    interactions: ["Ketoconazole", "Erythromycin"],
    sideEffects: ["Dry mouth", "Heart rhythm changes (Rare)"],
    warnings: ["Use lowest effective dose.", "Contraindicated in GI hemorrhage.", "Contraindicated in patients with prolactin-releasing pituitary tumour."],
    bbb: true, 
    habitForming: false,
    pregnancyUnsafe: false // Caution advised
  },

  // --- ALLERGY ---
  "cetirizine": {
    class: "Antihistamine (NLEM 2022)",
    indication: "Allergy, Cold",
    schedule: "Schedule H",
    kidney: "Reduce dose.",
    liver: "Safe.",
    interactions: ["Alcohol", "Sedatives"],
    sideEffects: ["Drowsiness", "Dry mouth"],
    warnings: ["May cause mild drowsiness.", "Contraindicated in end stage renal disease."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: false
  },
  "montelukast": {
    class: "Leukotriene Receptor Antagonist (NLEM 2022)",
    indication: "Asthma, Allergy",
    schedule: "Schedule H",
    kidney: "Safe.",
    liver: "Caution.",
    interactions: ["Phenytoin", "Phenobarbital"],
    sideEffects: ["Mood changes", "Headache"],
    warnings: ["Take in the evening.", "Contraindicated in patients with hypersensitivity to the drug."],
    bbb: false,
    habitForming: false,
    pregnancyUnsafe: false
  },

  // --- OTHERS ---
  "alcohol": {
    class: "CNS Depressant",
    indication: "Recreational (Not a drug)",
    schedule: "N/A",
    kidney: "Diuretic effect. Dehydration.",
    liver: "WARNING: Toxic. Causes cirrhosis.",
    interactions: ["Metronidazole", "Painkillers", "Sedatives", "Antibiotics"],
    sideEffects: ["Intoxication", "Liver damage"],
    warnings: ["Dangerous interactions with almost all prescription drugs.", "Contraindicated in liver disease.", "Contraindicated in pregnancy."],
    bbb: true, // Crosses rapidly
    habitForming: true,
    pregnancyUnsafe: true
  }
};

// --- HELPER FUNCTIONS ---

// Extract complete sentences to avoid truncation like "indicat..."
const formatSentences = (text: string, maxSentences: number = 2): string => {
    if (!text) return "Details not available in standard format.";
    
    // Remove trailing ellipses or junk
    let clean = text.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s+/g, " ").trim();
    clean = clean.replace(/\.\.\.$/, ""); // Remove "..." at end

    // Regex matches sequences that end with . ! or ?
    const matches = clean.match(/[^.!?]+[.!?]+/g);
    
    if (!matches) {
        // Fallback: If no punctuation, try to ensure it ends cleanly
        // If > 20 chars and no punctuation, append '.'
        return clean.length > 20 && !clean.endsWith('.') ? clean + '.' : clean;
    }
    
    // Join the desired number of sentences
    return matches.slice(0, maxSentences).join(" ");
};

// intelligently extract warning sentences
const extractWarnings = (text: string, limit: number = 3): string[] => {
    if (!text) return [];
    const clean = text.replace(/(\r\n|\n|\r)/gm, " ").replace(/\s+/g, " ").trim();
    const sentences = clean.match(/[^.!?]+[.!?]+/g);
    if (!sentences) return [];

    const keywords = [
        "contraindicat", "avoid", "do not", "unsafe", "risk", "warning", 
        "danger", "prohibit", "consult", "harm", "monitor", "caution", 
        "severe", "fatal", "pregnancy", "breastfeeding", "allerg", "should not",
        "adverse", "stop"
    ];
    
    // Filter sentences containing keywords
    const found = sentences.filter(s => keywords.some(k => s.toLowerCase().includes(k)));
    
    // Deduplicate
    const unique = [...new Set(found)];
    
    // If we have less than 2, try to pad with generic warnings if text suggests risk
    if (unique.length < 2) {
       if (clean.toLowerCase().includes("doctor") && !unique.some(s => s.toLowerCase().includes("doctor"))) {
           unique.push("Consult your doctor for full safety profile.");
       }
       if (clean.toLowerCase().includes("label") && !unique.some(s => s.toLowerCase().includes("label"))) {
           unique.push("Refer to package insert for complete contraindications.");
       }
    }

    return unique.slice(0, limit);
};

function isMedicalContext(text: string): boolean {
    const medicalKeywords = [
        "drug", "medication", "medicine", "tablet", "capsule", "syrup", 
        "injection", "pharmaceutical", "treatment", "therapy", "dosage", 
        "side effect", "symptom", "disease", "disorder", "infection", 
        "antibiotic", "vitamin", "supplement", "vaccine", "analgesic",
        "antipyretic", "anti-inflammatory", "prescription", "otc", "medical"
    ];
    const lower = text.toLowerCase();
    return medicalKeywords.some(keyword => lower.includes(keyword));
}

async function fetchWikipediaData(query: string): Promise<{ title: string; extract: string; url: string } | null> {
    try {
        const cleanQuery = query.replace(/(side effects|dosage|uses|benefits|of|about|tell me|is|safe|medicine|tablet|syrup)/gi, '').trim();
        if (!cleanQuery) return null;

        const searchUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(cleanQuery)}&limit=1&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();
        
        if (!searchData[1] || searchData[1].length === 0) return null;

        const title = searchData[1][0];
        const description = searchData[2][0] || "";
        const url = searchData[3][0];

        const nonMedicalKeywords = ["song", "album", "film", "movie", "book", "video game", "place", "city", "village", "river"];
        if (nonMedicalKeywords.some(kw => description.toLowerCase().includes(kw))) {
             return null;
        }

        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
        const summaryRes = await fetch(summaryUrl);
        const summaryData = await summaryRes.json();

        if (summaryData.type === 'standard' && summaryData.extract && !summaryData.extract.includes("may refer to")) {
            if (!isMedicalContext(summaryData.extract) && !isMedicalContext(description)) {
                return null;
            }

            return {
                title: summaryData.title,
                extract: summaryData.extract,
                url: url
            };
        }
    } catch (e) {
        console.error("Wiki fetch failed", e);
    }
    return null;
}

async function fetchOpenFDAData(query: string, apiKey?: string): Promise<{ brand: string; generic: string | null; purpose: string; warnings: string; class: string; sideEffects: string } | null> {
    try {
        const cleanQuery = query.replace(/(side effects|dosage|uses|benefits|of|about|tell me|is|safe|medicine|tablet|syrup)/gi, '').trim();
        if (!cleanQuery) return null;

        let searchUrl = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(cleanQuery)}"+OR+openfda.generic_name:"${encodeURIComponent(cleanQuery)}"&limit=1`;
        
        if (apiKey && apiKey.trim() !== '') {
            searchUrl += `&api_key=${apiKey.trim()}`;
        }
        
        const res = await fetch(searchUrl);
        if (!res.ok) return null;
        
        const data = await res.json();
        if (!data.results || data.results.length === 0) return null;

        const info = data.results[0];
        const openfda = info.openfda || {};
        
        // Helper to get clean text and ensure it ends with a sentence boundary, max 1500 chars
        const getText = (arr: string[]) => {
            if (!arr || arr.length === 0) return "";
            let t = arr[0];
            if (t.length > 1500) {
                t = t.substring(0, 1500);
                // Cut at last period to avoid "indicat..."
                const lastDot = t.lastIndexOf('.');
                if (lastDot > 100) { // Ensure we have a decent chunk
                    t = t.substring(0, lastDot + 1);
                }
            }
            return t.replace(/(\r\n|\n|\r)/gm, " ");
        };
        
        // Extract Pharmacologic Class
        const pharmClass = openfda.pharm_class_epc ? openfda.pharm_class_epc[0] : (openfda.pharm_class_pe ? openfda.pharm_class_pe[0] : "Unspecified Pharmacologic Class");

        return {
            brand: openfda.brand_name ? openfda.brand_name[0] : (openfda.generic_name ? openfda.generic_name[0] : cleanQuery),
            generic: openfda.generic_name ? openfda.generic_name[0] : null,
            purpose: getText(info.indications_and_usage) || getText(info.purpose),
            warnings: getText(info.warnings) || getText(info.boxed_warning),
            class: pharmClass,
            sideEffects: getText(info.adverse_reactions) || "Refer to official labeling for side effect details."
        };

    } catch (e) {
        console.error("FDA fetch failed", e);
    }
    return null;
}

export const sendMessageToGemini = async (
  message: string,
  history: ChatMessage[],
  profile: UserProfile,
  language: string
): Promise<{ text: string; groundingSources?: { title: string; url: string }[] }> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowerMsg = message.toLowerCase();
  let responseText = "";

  // 1. Context Build-up (History & Profile)
  const contextDrugs = new Set<string>();
  if (profile.currentMeds) {
      profile.currentMeds.split(',').forEach(m => {
          const clean = m.trim().toLowerCase();
          if (clean) contextDrugs.add(clean);
      });
  }
  history.slice(-10).forEach(msg => {
      Object.keys(DRUG_DB).forEach(key => {
          if (msg.text.toLowerCase().includes(key)) {
              contextDrugs.add(key);
          }
      });
  });

  // Calculate Pregnancy Risk based on Profile
  const userAge = parseInt(profile.age || '0');
  const isFemale = profile.gender === 'Female';
  const isChildbearingAge = isFemale && userAge >= 18 && userAge <= 50;

  // 2. Image handling
  const lastMsg = history[history.length - 1];
  if (lastMsg && lastMsg.image) {
      responseText += `**Image Detected**: Analyzing... Check Expiry & Red Line (Schedule H).\n\n`;
  }

  // 3. Identify Drugs in Query (Local DB)
  const foundDrugKeys = Object.keys(DRUG_DB).filter(key => lowerMsg.includes(key));
  
  if (foundDrugKeys.length > 0) {
      // --- INTERACTION CHECKS (Top Priority) ---
      let interactionsDetected = false;

      // A. Query vs Query (Drug + Drug)
      for (let i = 0; i < foundDrugKeys.length; i++) {
          for (let j = i + 1; j < foundDrugKeys.length; j++) {
              const keyA = foundDrugKeys[i];
              const keyB = foundDrugKeys[j];
              const drugA = DRUG_DB[keyA];
              const nameA = keyA.toUpperCase();
              const nameB = keyB.toUpperCase();

              // Check explicit interactions in DB
              const hasInteraction = drugA.interactions.some(int => keyB.includes(int.toLowerCase()) || int.toLowerCase().includes(keyB));
              
              // Check duplicate therapy (e.g. Paracetamol + Crocin)
              const duplicate = (keyA.includes('paracetamol') && keyB.includes('crocin')) || 
                                (keyA.includes('crocin') && keyB.includes('paracetamol')) ||
                                (keyA === keyB);

              if (hasInteraction || duplicate) {
                  responseText += `[RED]⚠️ WARNING: CONTRAINDICATION DETECTED[/RED]\n`;
                  responseText += `[RED]• Interaction between **${nameA}** and **${nameB}**.[/RED]\n`;
                  if (duplicate) responseText += `[RED]• Risk of Duplicate Therapy/Overdose.[/RED]\n`;
                  interactionsDetected = true;
              }
          }
      }

      // B. Query vs Profile/History
      foundDrugKeys.forEach(key => {
          const drug = DRUG_DB[key];
          contextDrugs.forEach(ctxDrug => {
             // Don't check against itself if it's in history
             if (foundDrugKeys.includes(ctxDrug)) return; 

             const match = drug.interactions.find(i => ctxDrug.includes(i.toLowerCase()) || i.toLowerCase().includes(ctxDrug));
             if (match) {
                 responseText += `[RED]⚠️ WARNING: HISTORICAL INTERACTION[/RED]\n`;
                 responseText += `[RED]• **${key.toUpperCase()}** may interact with **${ctxDrug}** (from history/profile).[/RED]\n`;
                 interactionsDetected = true;
             }
          });

          // Check against raw profile string if not caught
          if (profile.currentMeds) {
              const meds = profile.currentMeds.toLowerCase();
              drug.interactions.forEach(i => {
                  if (meds.includes(i.toLowerCase()) && !foundDrugKeys.includes(i.toLowerCase())) {
                       responseText += `[RED]⚠️ WARNING: PROFILE INTERACTION[/RED]\n`;
                       responseText += `[RED]• **${key.toUpperCase()}** interacts with **${i}**.[/RED]\n`;
                  }
              });
          }
      });

      if (interactionsDetected) responseText += `\n`;

      // --- PER DRUG DETAILS ---
      foundDrugKeys.forEach(key => {
          const drug = DRUG_DB[key];
          const drugName = key.charAt(0).toUpperCase() + key.slice(1);

          responseText += `**${drugName}**\n`;
          responseText += `**Class**: ${drug.class}\n\n`;
          
          // Uses
          responseText += `**Uses**: This medication is indicated for ${drug.indication}.\n\n`;

          if (drug.schedule.includes("Schedule")) {
             responseText += `**Regulatory**: [RED]${drug.schedule}[/RED]\n`;
          }

          if (drug.bbb) responseText += `CRITICAL: 🧠 Crosses Blood-Brain Barrier (BBB).\n`;
          if (drug.habitForming) responseText += `CRITICAL: ⛔ HABIT-FORMING / ADDICTION RISK.\n`;
          
          if (drug.pregnancyUnsafe && isChildbearingAge) {
               responseText += `CRITICAL: 🤰 UNSAFE FOR PREGNANCY (Check Category).\n`;
          }

          // --- Aggregated Contraindications ---
          const contraList: Set<string> = new Set();

          if (drug.kidney.toLowerCase().includes("contraindicated")) contraList.add(`Kidney: ${drug.kidney}`);
          if (drug.liver.toLowerCase().includes("contraindicated")) contraList.add(`Liver: ${drug.liver}`);
          if (drug.pregnancyUnsafe) contraList.add("Pregnancy: Potential risk (Category D/X)");
          drug.warnings.forEach(w => contraList.add(w));
          
          responseText += `**Contraindications**:\n`;
          if (contraList.size > 0) {
              contraList.forEach(c => responseText += `[RED]• ${c}[/RED]\n`);
          } else {
              responseText += `[RED]• No specific contraindications listed in database. Consult a doctor.[/RED]\n`;
          }
          
          // Side Effects
          responseText += `\n**Side Effects**: ${drug.sideEffects.slice(0, 3).join(", ")}\n`;
          
          responseText += `[BUY:${drugName}]\n\n`;
      });

      // --- SUMMARIES ---
      foundDrugKeys.forEach(key => {
          const drug = DRUG_DB[key];
          const drugName = key.charAt(0).toUpperCase() + key.slice(1);
          responseText += `SUMMARY: **${drugName}** is classified as a ${drug.class} and is primarily used for ${drug.indication}. \n`;
      });

  } else {
     // --- ONLINE FALLBACK ---
     
     const parts = lowerMsg.split(/ and | \+ | with | \& /).map(s => s.trim()).filter(s => s.length > 2);
     const queries = parts.length > 1 ? parts : [message];
     
     let foundOnline = false;

     for (const q of queries) {
         let wiki = await fetchWikipediaData(q);
         let fda = null;
         
         if (!wiki) fda = await fetchOpenFDAData(q, profile.openFdaKey);
         
         if (wiki) {
             foundOnline = true;
             const drugName = wiki.title;
             // Ensure complete sentences
             const cleanExtract = formatSentences(wiki.extract, 2);
             
             responseText += `**${drugName}** (Online)\n`;
             
             // Class (Wiki might not provide explicitly, but we attempt to follow format)
             responseText += `**Class**: See description below.\n\n`;

             responseText += `**Uses**: ${cleanExtract}\n\n`;
             
             // Dynamic Red Text
             const lowerEx = wiki.extract.toLowerCase();
             
             if (lowerEx.includes("blood-brain barrier")) responseText += `CRITICAL: 🧠 Crosses BBB.\n`;
             if (lowerEx.includes("addict") || lowerEx.includes("habit-forming") || lowerEx.includes("dependence")) {
                 responseText += `CRITICAL: ⛔ HABIT-FORMING / ADDICTION RISK.\n`;
             }
             if (isChildbearingAge && (lowerEx.includes("pregnancy category d") || lowerEx.includes("pregnancy category x") || lowerEx.includes("fetal harm"))) {
                 responseText += `CRITICAL: 🤰 PREGNANCY WARNING DETECTED IN TEXT.\n`;
             }
             
             responseText += `**Contraindications**:\n`;
             // Extract 2+ contraindications if possible
             const warnings = extractWarnings(wiki.extract);
             if (warnings.length > 0) {
                 warnings.forEach(w => responseText += `[RED]• ${w}[/RED]\n`);
                 if (warnings.length < 2) {
                    responseText += `[RED]• Consult doctor for additional safety information.[/RED]\n`;
                 }
             } else {
                 if (lowerEx.includes("contraindicat") || lowerEx.includes("warning")) {
                     responseText += `[RED]• Potential warnings detected. Check official sources.[/RED]\n`;
                     responseText += `[RED]• Consult doctor for details.[/RED]\n`;
                 } else {
                     responseText += `[RED]• No specific contraindications extracted. Consult a doctor.[/RED]\n`;
                     responseText += `[RED]• Check interactions manually.[/RED]\n`;
                 }
             }

             responseText += `\n**Side Effects**: Consult a physician for detailed side effects.\n`;

             responseText += `[BUY:${drugName}]\n`;
             responseText += `SUMMARY: **${drugName}**: ${formatSentences(wiki.extract, 1)} \n\n`;
         } 
         else if (fda) {
             foundOnline = true;
             responseText += `**${fda.brand}** (FDA)\n`;
             
             responseText += `**Class**: ${fda.class}\n\n`;

             // Ensure complete sentences for Uses
             const purpose = formatSentences(fda.purpose, 2);
             responseText += `**Uses**: ${purpose}\n\n`;

             responseText += `**Contraindications / Warnings**:\n`;
             const warnings = extractWarnings(fda.warnings);
             
             if (warnings.length > 0) {
                 warnings.forEach(w => responseText += `[RED]• ${w}[/RED]\n`);
                 if (warnings.length < 2) responseText += `[RED]• Refer to official labeling for full list.[/RED]\n`;
             } else {
                 responseText += `[RED]• See official labeling for detailed contraindications.[/RED]\n`;
             }
             
             const combinedFDA = (fda.warnings + " " + fda.purpose).toLowerCase();
             if (isChildbearingAge && (combinedFDA.includes("pregnancy") && (combinedFDA.includes("unsafe") || combinedFDA.includes("avoid") || combinedFDA.includes("fetal")))) {
                 responseText += `CRITICAL: 🤰 FDA LABELING MENTIONS PREGNANCY RISKS.\n`;
             }
             if (combinedFDA.includes("addict") || combinedFDA.includes("dependence")) {
                 responseText += `CRITICAL: ⛔ HABIT-FORMING / ADDICTION RISK.\n`;
             }

             responseText += `\n**Side Effects**: ${formatSentences(fda.sideEffects, 2)}\n`;

             responseText += `[BUY:${fda.brand}]\n`;
             responseText += `SUMMARY: **${fda.brand}** is identified for: ${formatSentences(fda.purpose, 1)}\n\n`;
         }
     }

     if (!foundOnline) {
         responseText += `I couldn't find details for "**${message}**" in my database or online records.\n\n`;
         responseText += `[WEB:${message}]`;
     }
  }

  return {
    text: responseText,
    groundingSources: []
  };
};
