// =============================================================================
// MARS MD — SCENARIO DATA FILE
// =============================================================================
//
// HOW TO ADD A NEW SCENARIO
// -------------------------
// Append a new object to the scenarios array below. Full template:
//
// {
//   id: <number>,           // Unique integer
//   title: "Patient Name",
//   subtitle: "Short flavour subtitle",
//   stages: [
//
//     // NARRATIVE — display-only text. Supports **bold**.
//     {
//       type: "narrative",
//       content: `Text here. **Bold** supported.`,
//       image: "/images/filename.png",  // or null
//     },
//
//     // CHECKLIST — searchable multi-select dropdown.
//     // critical: true  → must be selected before proceeding (shake/warn if missed; −score)
//     // reveal: string  → card shown when item is selected; null for no reveal
//     {
//       type: "checklist",
//       instruction: "Instruction shown above the dropdown",
//       items: [
//         { label: "Item label", critical: true,  reveal: "Text shown on selection" },
//         { label: "Item label", critical: false, reveal: null },
//       ],
//     },
//
//     // MCQ — single correct answer (0-indexed). Three feedback modes:
//     //
//     //   Generic        (feedback: null)
//     //     Wrong → "Incorrect — try again". Correct → explanation. Retry until correct.
//     //
//     //   Accumulating   (feedback: array, explanation: string)
//     //     Wrong → labeled panel accumulates per wrong option. Correct → explanation. Retry.
//     //
//     //   Lock mode      (feedback: array, explanation: null)
//     //     Any selection immediately locks. Per-option feedback shown. No retry.
//     //
//     // image: single image above options (string path or null)
//     // images: array of { src, caption } for multiple images (or omit/null)
//     // explanationImage: shown below explanation on correct answer (or null)
//     //
//     // Scoring: max = options.length − 1. −1 per wrong attempt (min 0).
//     {
//       type: "mcq",
//       question: "Question text?",
//       image: null,
//       options: ["Option A", "Option B", "Option C"],
//       correct: 0,
//       feedback: null,                    // null | ["per-option text or null", ...]
//       explanation: "Shown on correct.",  // null | string
//       explanationImage: null,
//     },
//
//   ],
// },
//
// HOW TO ADD IMAGES
// -----------------
//   Drop files into public/images/ and reference as "/images/filename.png"
// =============================================================================

export const scenarios = [
  {
    id: 1,
    title: "Venus Picklebottom",
    subtitle: "The Bird Keeper",
    stages: [
      // -----------------------------------------------------------------------
      // PATIENT HISTORY
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `**Patient:** Venus Picklebottom | **Age:** 70 | **Sex:** Female

Venus presented this evening at the space emergency department complaining of extreme shortness of breath following an incident earlier today. She was relaxing in her personal habitat module overnight when suddenly another vessel crashed into her transport while preparing for docking. Luckily, she did not sustain major injuries from the collision.

On further history:

**Site:** Slight discomfort felt in her chest on both sides.

**Onset:** Had felt short of breath and chest discomfort for the last two weeks, but only suddenly experienced extreme shortness of breath after the incident today.

**Character:** Sharp pain especially when breathing in. Cannot walk more than 10 metres without getting short of breath.

**Radiation:** Nil

**Associated symptoms:** Dry cough over the last two weeks; only noticed some blood today. Over the past 3 months — 10 kg lost unintentionally. Feeling hot flushes (on and off).

**Timing:** Today: constant SOB. Past 2 weeks: SOB on exertion.

**Exacerbating factors:** Deep inhalation, exertion.`,
        image: null,
      },

      // -----------------------------------------------------------------------
      // Q1 — Differentials
      // -----------------------------------------------------------------------
      {
        type: "checklist",
        instruction: "List some possible differentials for this patient:",
        items: [
          // --- Core differentials (provided) ---
          { label: "Pulmonary embolism", critical: true },
          { label: "Pneumothorax", critical: true },
          { label: "Pneumonia (bacterial or fungal)", critical: false },
          { label: "COPD exacerbation", critical: false },
          { label: "Myocardial Infarction", critical: true },
          { label: "Heart failure", critical: false },
          { label: "Interstitial lung disease", critical: false },
          // --- Distractors ---
          { label: "Aortic dissection", critical: true },
          { label: "Cardiac tamponade", critical: false },
          { label: "Primary lung malignancy", critical: false },
          { label: "Pleural effusion", critical: false },
          { label: "Mesothelioma", critical: false },
          { label: "Tuberculosis", critical: false },
          { label: "Pulmonary hypertension", critical: false },
          { label: "Anaemia", critical: false },
          { label: "Costochondritis / musculoskeletal pain", critical: false },
          { label: "Anxiety / panic attack", critical: false },
          { label: "Colony-acquired pneumonia (Martian pathogen)", critical: false },
          { label: "Radiation-induced pneumonitis", critical: false },
          { label: "Atelectasis", critical: false },
          { label: "Oesophageal spasm", critical: false },
        ],
      },

      // -----------------------------------------------------------------------
      // Q2 — Further history
      // -----------------------------------------------------------------------
      {
        type: "checklist",
        instruction: "List further history you would like to take from this patient:",
        items: [
          {
            label: "Past Medical History",
            reveal: "Surgery in right lower limb following a car accident — 40 years ago (no complications). Otherwise, rarely sees a doctor.",
            critical: false,
          },
          { label: "Allergies", reveal: "Nil", critical: false },
          { label: "Immunisations", reveal: "Up to date", critical: false },
          { label: "Medications", reveal: "Hormone replacement therapy", critical: true },
          {
            label: "Social History",
            reveal: "Smoker for 30 pack-years, nil alcohol or drugs.",
            critical: true,
          },
          { label: "Family History", reveal: "No known family history", critical: false },
          {
            label: "Travel History",
            reveal: "Recently visited the Colony ICU to visit her husband who contracted colony-acquired pneumonia (Martian pathogen).",
            critical: true,
          },
          {
            label: "Occupational History",
            reveal: "Bird keeper (back when she was still living on Earth).",
            critical: false,
          },
        ],
      },

      // -----------------------------------------------------------------------
      // Q3 — Immediate next step (Yes/No as 2-option MCQ)
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `Venus says, "That's enough questions, you're making me short of breath!"

You proceed to perform some physical examinations and inform Venus of what these will involve. What is your next immediate step?`,
        image: null,
        options: [
          "Begin by listening to Venus's chest and assessing for chest wall expansion",
          "Perform general inspection and check vital signs first",
        ],
        correct: 1,
        feedback: [
          "Venus fell unconscious while you were auscultating. You failed to observe that she was becoming severely cyanotic and that her vital signs were rapidly deteriorating.",
          null,
        ],
        explanation: `**General inspection** and **vital signs** are always the first step of any physical examination. Jumping straight to auscultation risks missing critical systemic deterioration that is only visible from the end of the bed.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // VITALS + EXAM FINDINGS
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `**Vitals:**

Heart Rate: 108 bpm | Blood Pressure: 115/75 mmHg | Respiratory Rate: 24 breaths/min | SpO₂: 91% on room air | Temperature: 37.8°C | GCS: 15/15

**General Inspection:** Bluish discolouration of mucous membranes and fingers. Cachexic. Accessory muscles utilised.

**Palpation:** Trachea midline (no deviation). Symmetrical chest expansion (normal). Calves: NAD.

**Percussion:** Normal resonance throughout all lung fields.

**Auscultation:** Normal air entry. Localised pleural rub (creaking sound) over the site of pleuritic pain.

**Neck / JVP:** Normal JVP.`,
        image: null,
      },

      // -----------------------------------------------------------------------
      // Q4 — Most likely differential
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: "Which differential do these physical exam findings combined with the provided history increase the likelihood of the most?",
        image: null,
        options: [
          "Pneumothorax",
          "Heart failure",
          "Pneumonia",
          "Interstitial lung disease",
          "Pulmonary embolism",
        ],
        correct: 4,
        feedback: [
          "**Pneumothorax** typically presents with acute onset unilateral pleuritic pain and absent breath sounds, often in young or tall patients. Venus has bilateral discomfort, normal percussion, and symmetrical air entry — inconsistent with pneumothorax.",
          "**Heart failure** causes exertional dyspnoea and may raise JVP, but typically presents with bibasal crackles, elevated JVP, and peripheral oedema. Venus's JVP is normal and her examination does not support a cardiac cause.",
          "**Pneumonia** can cause pleuritic pain, productive cough and fever. However, Venus's cough is dry, her lung fields are clear on percussion and auscultation shows only a pleural rub — not the bronchial breathing or crackles expected with consolidation.",
          "**Interstitial lung disease** causes progressive exertional dyspnoea and may produce bilateral crackles. It does not typically cause acute haemoptysis, pleuritic pain, or the sudden deterioration Venus experienced today.",
          null,
        ],
        explanation: `The combination of **pleuritic chest pain**, **haemoptysis**, unintentional weight loss, low-grade fever, and exertional SOB over 2 weeks with sudden acute worsening — together with risk factors including **HRT**, prior limb surgery, and recent hospital visit — forms **Virchow's triad** (hypercoagulability, stasis, endothelial injury) and points strongly to **pulmonary embolism**.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // Q5a — D-dimer Yes/No
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: "Would you order a D-dimer in this patient to increase the likelihood of diagnosis?",
        image: null,
        options: ["Yes", "No"],
        correct: 1,
        feedback: [
          "D-dimer is **highly sensitive but non-specific** — it is elevated in many conditions (DVT, DIC, MI, aortic dissection, AF, malignancy, pregnancy) and would almost certainly be raised in Venus regardless of PE. In a **high pre-test probability** patient, a positive result changes nothing and a negative result is unlikely.",
          null,
        ],
        explanation: `**D-dimer** is most useful as a **rule-out** tool in **low pre-test probability** patients — a negative result effectively excludes PE. In high-probability patients like Venus, the result will not change management regardless of the outcome, making it an unnecessary and potentially misleading test.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // Q5b — Likelihood ratio calculation
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `A clinical study evaluated the performance of a D-dimer assay in 500 patients presenting to the ED with symptoms suggestive of PE. After definitive imaging (CTPA) was performed on all participants:

• Total patients with confirmed PE: 100
• Patients with PE who had a positive D-dimer: 95
• Total patients without PE: 400
• Patients without PE who had a negative D-dimer: 160

Based on these findings, calculate LR(+) and LR(−) and select the correct interpretation:`,
        image: null,
        options: [
          "LR+ = 0.95; LR− = 0.40. The test is highly specific but lacks sensitivity.",
          "LR+ = 1.58; LR− = 0.125. The test is an excellent rule-out tool but a poor rule-in tool.",
          "LR+ = 1.58; LR− = 0.125. The test is an excellent rule-in tool but a poor rule-out tool.",
          "LR+ = 2.37; LR− = 0.05. The high LR+ confirms the diagnosis of PE in most cases.",
          "LR+ = 0.40; LR− = 0.95. The test results are statistically insignificant for clinical use.",
        ],
        correct: 1,
        feedback: [
          "These numbers swap sensitivity and specificity. **Sensitivity** = TP / (TP + FN) = 95/100 = **0.95**, not 0.40. **Specificity** = TN / (TN + FP) = 160/400 = **0.40**, not 0.95. The interpretation is also reversed.",
          null,
          "The LR values are correct but the interpretation is **inverted**. A **low LR−** (0.125 is approaching but not below the 0.1 threshold) makes this a reasonable **rule-out** tool. A modest LR+ of 1.58 barely shifts post-test probability — making it a **poor rule-in** test, not a good one.",
          "These LR values are miscalculated. LR+ = Sensitivity / (1 − Specificity) = 0.95 / 0.60 = **1.58**, not 2.37. An LR+ of 1.58 provides only minimal diagnostic shift — it does not confirm PE in most cases.",
          "These values are entirely inverted — the 0.40 figure is the **specificity**, not LR+, and 0.95 is the **sensitivity**, not LR−. Likelihood ratios are derived from sensitivity and specificity, not equal to them.",
        ],
        explanation: `**Sensitivity** = 95/100 = **0.95** | **Specificity** = 160/400 = **0.40**

LR+ = Sensitivity / (1 − Specificity) = 0.95 / 0.60 = **1.58**
LR− = (1 − Sensitivity) / Specificity = 0.05 / 0.40 = **0.125**

An LR− approaching 0.1 makes D-dimer a reasonable **rule-out** test. The modest LR+ of 1.58 produces minimal post-test probability shift — making it a poor **rule-in** test. This is consistent with its clinical use.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // Q6 — CT-PA image interpretation
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: "Concerned about the possibility of a pulmonary embolism, you order a CT pulmonary angiogram. What are the findings of this CT image?",
        image: "/images/scenario1_ctpa.png",
        options: [
          "No abnormalities detected",
          "Large mass causing obstruction of the pulmonary trunk",
          "Mesothelial plaques visible on either side of the sternal body",
          "Massive saddle embolism",
          "Bilateral lobar artery filling defects",
        ],
        correct: 4,
        feedback: [
          "Look again at the pulmonary vasculature — there are filling defects present. A normal CTPA would show contrast fully opacifying the pulmonary arteries without interruption.",
          "A **large central mass** obstructing the pulmonary trunk would appear as a soft tissue density, not the hypodense intraluminal filling defects seen here. This image does not show a mass.",
          "**Mesothelial plaques** are associated with asbestos exposure and appear as pleural thickening, not intravascular filling defects within the pulmonary arterial tree.",
          "A **saddle embolism** straddles the main pulmonary artery bifurcation as a single large filling defect. The findings here are more peripheral — note the involvement of the **lobar branches**, not the central trunk.",
          null,
        ],
        explanation: `The CT shows **hypodense filling defects** within the **lobar arteries** — branches of the pulmonary artery. This is not always a massive saddle embolism: smaller emboli cause the subacute 2-week presentation, before a larger clot forms and precipitates the sudden deterioration that brought Venus to the ED today.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // CLOSING NARRATIVE
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `You immediately inform your attending consultant and confirm a diagnosis of **pulmonary embolism**. Venus is transferred to the trustworthy hands of the Colony ICU.

*Patient stabilised. Well done.*`,
        image: null,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // SCENARIO 2 — ELIAS THORNE
  // ---------------------------------------------------------------------------
  {
    id: 2,
    title: "Elias Thorne",
    subtitle: "Beneath the Red Dust",
    stages: [
      // -----------------------------------------------------------------------
      // PATIENT HISTORY
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `**Patient:** Elias Thorne | **Age:** 34 | **Sex:** Male | **Occupation:** Mining Engineer

Elias was extracted by drone teams after being pinned beneath the chassis of a Martian rover for six hours. He complains of severe pain and a sensation of "heaviness" in both lower limbs.

**Mechanism:** Crush injury to bilateral lower limbs — six hours of compression beneath a rover chassis.

**Wound contamination:** The sector dust — high in perchlorate salts and unknown crystalline silicates — was forced into open lacerations during the crush.

**Urine:** Elias reports his urine looked "like Martian soil" (dark tea-coloured) before loading onto the transport.

**Past Medical History:** Nil significant. **Medications:** Nil. **Allergies:** Nil known.

**Social History:** Non-smoker. Stationed on Mars for 18 months.`,
        image: null,
      },

      // -----------------------------------------------------------------------
      // Q1 — Differentials
      // -----------------------------------------------------------------------
      {
        type: "checklist",
        instruction: "List some possible differentials for this patient:",
        items: [
          // --- Do not miss ---
          { label: "Acute Compartment Syndrome", critical: true },
          { label: "Hyperkalaemic Cardiac Toxicity", critical: true },
          { label: "Pigment-Induced Acute Kidney Injury", critical: true },
          { label: "Tension Pneumothorax", critical: true },
          { label: "Hypovolaemic Shock", critical: true },
          // --- Non-critical ---
          { label: "Crush Syndrome (Traumatic Rhabdomyolysis)", critical: false },
          { label: "Fat Embolism Syndrome", critical: false },
          { label: "Traumatic Myocardial Contusion", critical: false },
          { label: "Demand Ischaemia (Type 2 MI)", critical: false },
          { label: "Hypocalcaemia", critical: false },
          { label: "Acute Perchlorate Toxicity", critical: false },
          { label: "Chemical / Crystalline Pneumonitis", critical: false },
        ],
      },

      // -----------------------------------------------------------------------
      // PHASE 1 — Physical Examination
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `You begin your physical examination of Elias's lower limbs. Which of the following findings would you most expect to encounter?`,
        image: null,
        options: [
          "Flaccid paralysis of the upper extremities with intact sensation",
          '"Woody" oedema of the lower limbs, diminished distal pulses, and extreme pain on passive stretch',
          "Global hyperreflexia and a positive Babinski sign",
          "High-pitched inspiratory stridor and tracheal deviation",
          "Petechial rash across the chest and conjunctival haemorrhaging",
        ],
        correct: 1,
        feedback: [
          "**Flaccid upper limb paralysis** with intact sensation points to a cervical spinal cord or lower motor neuron lesion. Localise the anatomy — Elias's injury is to the lower limbs.",
          null, // correct — explanation shown instead
          "**Hyperreflexia** and a positive Babinski are upper motor neuron signs, suggesting CNS pathology. Crush injury affects peripheral structures — you would expect impaired reflexes, not enhanced ones.",
          "**Stridor and tracheal deviation** indicate an airway or thoracic emergency. The mechanism here is an isolated lower limb crush.",
          "**Petechial rash** and conjunctival haemorrhage are hallmarks of **fat embolism syndrome**, which typically follows long bone fractures — not the primary complication of a direct lower limb crush.",
        ],
        explanation: `These are the hallmarks of **compartment syndrome** — a limb-threatening emergency. Rising intracompartmental pressure compresses vasculature and impairs perfusion. **Pain on passive stretch** is the earliest and most sensitive sign — do not wait for pulselessness to act.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // EXAM FINDINGS NARRATIVE
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `**Examination Findings:**

Both lower limbs are tense and woody to palpation — the skin is stretched and shiny, with no give in the compartments. Pedal pulses are faint and difficult to locate bilaterally.

On passive flexion of the ankles, Elias cries out. Pain is markedly out of proportion to the degree of movement.

**Vitals:**

Heart Rate: 118 bpm | Blood Pressure: 98/62 mmHg | Respiratory Rate: 22 breaths/min | SpO₂: 96% on room air | Temperature: 36.4°C | GCS: 14/15 (confused)

**Urinary catheter output:** Dark brown urine — the colour of Martian soil. Consistent with **myoglobinuria**.`,
        image: null,
      },

      // -----------------------------------------------------------------------
      // PHASE 2 — Investigations
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `With suspected rhabdomyolysis and myoglobinuria confirmed, which set of investigations is the highest priority in this resource-limited environment?`,
        image: null,
        options: [
          "Full-body CT scan and genetic sequencing for Martian microbial contaminants",
          "Bedside ultrasound (eFAST) and a lumbar puncture",
          "Serum Creatine Kinase (CK), Basic Metabolic Panel (including potassium), and a 12-lead ECG",
          "Plasma Troponin-I and coronary angiogram",
          "Urine culture and sensitivity for anaerobic organisms",
        ],
        correct: 2,
        feedback: [
          "**CT and genetic sequencing** address exotic concerns — the immediate threat here is an **electrolyte-driven cardiac** one, not microbial contamination. Treat the life threat first.",
          "**eFAST** and **lumbar puncture** address haemorrhage and meningitis respectively — neither targets the electrolyte crisis or muscle breakdown present here.",
          null, // correct — explanation shown instead
          "**Troponin-I** lacks specificity in rhabdomyolysis due to skeletal muscle cross-reactivity. A coronary angiogram requires a primary cardiac event as indication.",
          "**Urine culture** targets infection. Elias has no sepsis picture — the dark urine reflects **myoglobin**, not bacteria.",
        ],
        explanation: `The **rhabdomyolysis triad**: serum **CK** confirms muscle breakdown, **potassium** reveals the electrolyte emergency, and the **ECG** shows whether cardiac conduction is already compromised. Maximum clinical information per resource in a constrained environment.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // PHASE 3 — ECG Interpretation
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `The results return: Serum Potassium 7.2 mEq/L. Serum CK 85,000 U/L. You review the 12-lead ECG. What is the most critical interpretation?`,
        image: null,
        options: [
          "Pathological Q-waves indicating a chronic transmural myocardial infarction",
          "ST-segment elevation in leads V1–V4 suggesting acute silicate-induced pulmonary embolism",
          "Peaked T-waves and widening of the QRS complex, signalling life-threatening hyperkalaemia",
          "Shortened PR interval and delta waves — consistent with Wolff-Parkinson-White syndrome",
          "Sinus bradycardia attributed to Martian atmospheric pressure changes",
        ],
        correct: 2,
        feedback: [
          "**Pathological Q-waves** indicate established myocardial necrosis from a prior MI. There is no history or mechanism for a chronic infarct here.",
          "**Focal ST-elevation** in V1–V4 reflects anterior coronary occlusion. **Hyperkalaemia** causes global conduction delays — a fundamentally different mechanism.",
          null, // correct — explanation shown instead
          "**Delta waves** and a short PR interval are features of a congenital accessory pathway (WPW). This is unrelated to the electrolyte disturbance.",
          "**Sinus bradycardia** can occur in hyperkalaemia but is not the critical finding at this potassium level and with these conduction changes.",
        ],
        explanation: `Hyperkalaemia follows a predictable **ECG ladder**: peaked T-waves → PR prolongation → loss of P-waves → **QRS widening** (sine wave) → VFib/asystole. Lysed muscle cells dump **intracellular potassium** directly into the bloodstream. At 7.2 mEq/L with QRS widening, cardiac arrest is imminent.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // PHASE 4 — Immediate Management
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `Given the potassium of 7.2 mEq/L and ECG changes, what is your immediate pharmacological priority?`,
        image: null,
        options: [
          "10 units IV insulin with 50% dextrose to shift potassium intracellularly",
          "IV Calcium Gluconate to stabilise the cardiac membrane",
          "High-dose loop diuretics (furosemide) to flush myoglobin renally",
          `Administer "Martian-Antitoxin" to neutralise the perchlorate dust salts`,
          "Normal saline bolus at 2 L/hr to prevent acute kidney injury",
        ],
        correct: 1,
        feedback: [
          "**Insulin/Dextrose** shifts potassium intracellularly — it is the essential next step, but takes 15–30 minutes to act. With **QRS widening already present**, that delay is unacceptable.",
          null, // correct — explanation shown instead
          "**Loop diuretics** lower potassium over hours via renal excretion — far too slow when the heart is at immediate risk.",
          "No such agent exists, and even if it did, the immediate danger is **cardiac** — not the dust contaminants.",
          "**Fluid resuscitation** is critical to prevent myoglobin cast nephropathy, but cardiac arrest from hyperkalaemia will occur before the kidneys fail if not addressed first.",
        ],
        explanation: `**Calcium Gluconate** (or Chloride) stabilises the myocardial membrane within 1–3 minutes by raising the threshold potential — it does **not** lower serum potassium, it counteracts its cardiotoxicity. This buys time for definitive **potassium-shifting agents** (insulin-dextrose, salbutamol).`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // PHASE 5 — Ethical Considerations
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `As Elias stabilises, the colony administrator raises a concern about ongoing management. What is the primary ethical tension in this resource-limited environment?`,
        image: null,
        options: [
          "The risk of Elias developing rover phobia, reducing the colony's mining capacity",
          "The depletion of the colony's limited clean water reserves due to the massive fluid resuscitation required",
          "The possibility his DNA has been permanently altered by Martian surface radiation",
          "The need to repatriate him to Earth for a kidney transplant, currently impossible — medical evacuation windows are infrequent and Elias cannot wait for the next launch window",
          "Whether his prosthetic limbs (if required) can be fabricated using Martian basalt",
        ],
        correct: 1,
        feedback: [
          "Work-capacity impact from psychological sequelae is a valid concern, but not the primary **ethical** tension in a resource-constrained survival setting.",
          null, // correct — explanation shown instead
          "**Radiation exposure** is a genuine long-term health risk for colonists, but not an immediate actionable ethical dilemma in this acute management context.",
          "An **impossible option** forecloses the dilemma rather than creating one — there is no choice to be weighed when repatriation is categorically unavailable.",
          "Prosthetic fabrication is an engineering challenge, not an ethical one — it lacks the **immediate resource-allocation urgency** present here.",
        ],
        explanation: `Standard rhabdomyolysis requires **6–10 litres of fluid daily** to maintain urine output and prevent **myoglobin cast nephropathy**. In a Martian colony with finite water reserves, diverting that volume to one patient creates a genuine **utilitarian tension** — individual care against collective survival.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // CLOSING NARRATIVE
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `You administer IV calcium gluconate immediately, followed by insulin-dextrose to shift the potassium intracellularly. Aggressive saline resuscitation is commenced to protect the kidneys from myoglobin.

The surgical team performs emergency fasciotomy of both lower limbs.

Elias is transferred to the Colony ICU. Over the next four hours his potassium trends downward and his urine begins to clear.

The colony administrator authorises emergency water rationing across all non-essential sectors.

*Patient stabilised. The colony endures — for now.*`,
        image: null,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // SCENARIO 3 — ILYA ROSANOV
  // ---------------------------------------------------------------------------
  {
    id: 3,
    title: "Ilya Rosanov",
    subtitle: "The Pressure Mounts",
    stages: [
      // -----------------------------------------------------------------------
      // PATIENT HISTORY
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `**Patient:** Ilya Rosanov | **Age:** 26 | **Sex:** Male | **Occupation:** Professional Low-Gravity Hockey Player

Ilya presented to the Mars Emergency Department with worsening shortness of breath and central chest discomfort. Two weeks ago he was involved in a transport collision on his way to practice. He believed he had sustained some blunt chest trauma but declined monitoring as he was running late.

**Site:** Central chest discomfort.

**Onset:** Gradual, worsening over the past 48 hours.

**Character:** Pressure-like sensation.

**Radiation:** Nil.

**Associated symptoms:** Lightheadedness, fatigue, dyspnoea.

**Timing:** Worsens when lying flat.

**Exacerbating factors:** Minimal exertion.`,
        image: null,
      },

      // -----------------------------------------------------------------------
      // Q1 — Differentials
      // -----------------------------------------------------------------------
      {
        type: "checklist",
        instruction: "List some possible differentials for this patient:",
        items: [
          { label: "Myocardial Infarction", critical: true },
          { label: "Aortic dissection", critical: true },
          { label: "Tension pneumothorax", critical: false },
          { label: "Pulmonary embolism", critical: true },
          { label: "Cardiac tamponade", critical: true },
          { label: "Acute heart failure / pulmonary oedema", critical: false },
          { label: "Pericarditis", critical: false },
          { label: "Myocarditis", critical: false },
          { label: "Haemothorax", critical: false },
          { label: "Pneumonia", critical: false },
          { label: "GORD", critical: false },
          { label: "Costochondritis", critical: false },
          { label: "Panic attack", critical: false },
        ],
      },

      // -----------------------------------------------------------------------
      // Q2 — Further History
      // -----------------------------------------------------------------------
      {
        type: "checklist",
        instruction: "List further history you would like to take from this patient:",
        items: [
          {
            label: "Past Medical History",
            reveal: "Nil significant past medical history. No known diseases.",
            critical: true,
          },
          {
            label: "Allergies",
            reveal: "Nil known.",
            critical: false,
          },
          {
            label: "Immunisations",
            reveal: "Up to date.",
            critical: false,
          },
          {
            label: "Medications",
            reveal: "Occasional paracetamol for headaches.",
            critical: false,
          },
          {
            label: "Social History",
            reveal: "Works as a low-gravity hockey player on Mars. Non-smoker. Moderate alcohol and recreational drug use (4–5 beers on weekends, smokes Martian cannabis).",
            critical: true,
          },
          {
            label: "Family History",
            reveal: "No known family history of cardiac disease or clotting disorders.",
            critical: false,
          },
          {
            label: "Travel History",
            reveal: "No recent prolonged immobilisation or long-distance travel.",
            critical: true,
          },
          {
            label: "Occupational History",
            reveal: "Works as a rover maintenance engineer in Sector 7. Regularly performs heavy manual work in low-pressure environments.",
            critical: false,
          },
          {
            label: "Recent Illness",
            reveal: "No fever, cough, or infective symptoms.",
            critical: true,
          },
        ],
      },

      // -----------------------------------------------------------------------
      // PHYSICAL EXAMINATION
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `Which of the following physical examination findings would most likely be present in Ilya's case?`,
        image: null,
        options: [
          "Wheeze with prolonged expiration and chest hyperinflation",
          "Hyperresonant percussion, absent unilateral breath sounds and tracheal deviation away from the affected side",
          "Hypotension, elevated jugular venous pressure and muffled heart sounds",
          "Pansystolic murmur radiating to the axilla with bibasal crackles",
          "Hypertension, bradycardia and an irregular respiratory rate",
        ],
        correct: 2,
        feedback: [
          "**Wheeze with hyperinflation** is characteristic of obstructive airway disease — **asthma** or **COPD**. There is no history of airway disease here.",
          "**Hyperresonance with absent breath sounds and tracheal deviation** describes **tension pneumothorax** — an important differential, but the subacute 48-hour progression after blunt trauma points toward a different aetiology.",
          null, // correct — explanation shown instead
          "A **pansystolic murmur** radiating to the axilla with **bibasal crackles** suggests left-sided heart failure or **mitral regurgitation** — no mechanism for this in Ilya's presentation.",
          "**Hypertension, bradycardia and respiratory irregularity** constitute **Cushing's reflex**, a sign of raised intracranial pressure — unrelated to a cardiac or thoracic mechanism.",
        ],
        explanation: `Ilya's delayed deterioration after blunt trauma suggests **haemopericardium** causing **cardiac tamponade** — blood collecting in the pericardial sac, which cannot stretch rapidly, compresses the ventricles and impairs filling.

**Beck's triad** is the classic presentation: **hypotension** (reduced cardiac output), **elevated JVP** (blood unable to enter the compressed right heart), and **muffled heart sounds** (pericardial fluid dampening transmission).`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // INVESTIGATIONS
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `Which set of investigations is the highest priority for Ilya?`,
        image: null,
        options: [
          "D-dimer and CTPA",
          "Coronary angiography and troponins",
          "Sputum culture and ABG",
          "MRI chest and pericardial biopsy",
          "Transthoracic echocardiography and ECG",
        ],
        correct: 4,
        feedback: [
          "**D-dimer and CTPA** investigate for **pulmonary embolism** — a valid differential, but the blunt trauma history and Beck's triad make tamponade the more urgent diagnosis to confirm.",
          "**Coronary angiography and troponins** target **acute coronary syndrome** — less likely given his age and the absence of ischaemic risk factors or chest pain character.",
          "**Sputum culture and ABG** address respiratory infection or gas exchange — neither will identify a pericardial effusion.",
          "**MRI chest and biopsy** are thorough but too slow and resource-intensive for an acutely deteriorating patient.",
          null, // correct — explanation shown instead
        ],
        explanation: `**Transthoracic echocardiography** is the key investigation — it can directly confirm a **pericardial effusion**, right atrial/ventricular **diastolic collapse**, and impaired ventricular filling. The **ECG** provides complementary data about conduction changes associated with large effusions. Vital sign monitoring throughout is essential given haemodynamic instability.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // PRE-INTERPRETATION NARRATIVE
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `Ilya's observations continue to deteriorate:

**BP:** 85/60 mmHg | **HR:** 120 bpm | **RR:** 24 breaths/min

The transthoracic echocardiogram and 12-lead ECG are performed.`,
        image: null,
      },

      // -----------------------------------------------------------------------
      // INTERPRETATION (dual image)
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `Which of the following best explains the haemodynamic mechanism of Ilya's hypotension?`,
        images: [
          { src: "/images/scenario3_echo.png", caption: "Transthoracic Echocardiogram" },
          { src: "/images/scenario3_ecg.png", caption: "12-Lead ECG" },
        ],
        image: null,
        options: [
          "Reduced myocardial contractility as a result of direct cardiac contusion",
          "Ventricular filling impairment due to external cardiac compression",
          "Reduction in systemic vascular resistance due to inflammatory mediators",
          "Obstruction to pulmonary arterial flow increasing right ventricular afterload",
          "Internal haemorrhage causing loss of intravascular volume",
        ],
        correct: 1,
        feedback: [
          "**Reduced contractility** characterises **cardiogenic shock** — typically seen in MI or myocarditis. The mechanism here is external pressure, not intrinsic muscle failure.",
          null, // correct — explanation shown instead
          "**Low systemic vascular resistance** is the hallmark of **distributive shock** (e.g. sepsis, anaphylaxis). Ilya has no infective or allergic features.",
          "**Pulmonary arterial obstruction** causing raised right ventricular afterload describes **obstructive shock from PE** — outside the heart, not around it.",
          "**Hypovolaemic shock** from internal haemorrhage would produce a **low JVP** — Ilya's JVP is elevated, pointing to impaired venous return rather than volume depletion.",
        ],
        explanation: `The echo confirms a large **anechoic pericardial effusion** surrounding the heart, with **right ventricular diastolic collapse**. The ECG shows **low-voltage QRS complexes** — fluid dampening electrical signal transmission.

**Cardiac tamponade** causes **obstructive shock**: rising intrapericardial pressure compresses the ventricles (right side first), reducing **diastolic filling → stroke volume → cardiac output → blood pressure**.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // IMMEDIATE MANAGEMENT
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `What is the most immediate management priority for Ilya?`,
        image: null,
        options: [
          "Urgent pericardiocentesis",
          "High-dose IV furosemide",
          "IV propranolol",
          "Thrombolysis",
          "Immediate fluid restriction",
        ],
        correct: 0,
        feedback: [
          null, // correct — explanation shown instead
          "**Furosemide** reduces preload — in a patient already in obstructive shock, this would further reduce ventricular filling and worsen **hypotension**.",
          "**IV propranolol** lowers heart rate and blood pressure. Reducing blood pressure in a shocked patient is dangerous.",
          "**Thrombolysis** targets **thrombotic** causes of obstruction — PE or STEMI. The problem here is mechanical external compression, not a clot.",
          "The problem is **not fluid overload inside the circulation** — it is fluid compressing the heart from outside. Restricting IV fluids would worsen haemodynamic compromise.",
        ],
        explanation: `**Pericardiocentesis** — needle drainage of the pericardial space — is the **definitive emergency treatment** for cardiac tamponade. Removing even a small volume of fluid rapidly reduces intrapericardial pressure, restoring ventricular filling and cardiac output.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // LONG-TERM MANAGEMENT
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `Over the next 72 hours, Ilya initially improves following pericardiocentesis. However, he redevelops hypotension and dyspnoea. A repeat echocardiogram shows fluid has reaccumulated in the pericardial space. What is the most appropriate definitive management strategy?`,
        image: null,
        options: [
          "Repeat intermittent pericardiocentesis as needed",
          "Broad-spectrum antibiotics for secondary infectious pericarditis",
          "Surgical creation of a pericardial window for continuous drainage",
          "Long-term NSAID therapy for inflammatory pericarditis",
          "Transfer to Earth for cardiothoracic surgery",
        ],
        correct: 2,
        feedback: [
          "**Repeated pericardiocentesis** is unsustainable — each procedure carries cumulative risk of **infection, cardiac puncture** and vascular injury. A definitive solution is needed.",
          "There is **no evidence of infection** in Ilya's presentation. Antibiotics are not indicated for haemopericardium.",
          null, // correct — explanation shown instead
          "**NSAIDs** reduce inflammation in **pericarditis** but have no role in **haemopericardium** — the underlying cause here is not inflammatory but mechanical.",
          "Transfer to Earth is not viable — medical evacuation from Mars requires months of planning and Ilya cannot wait. In any case, this does not address the immediate recurrence.",
        ],
        explanation: `A **pericardial window** is a surgical procedure that creates a permanent opening in the pericardium, allowing fluid to drain continuously into the pleural or peritoneal space. It is the **definitive treatment** for recurrent or persistent pericardial effusions where pericardiocentesis has failed to maintain control.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // CLOSING NARRATIVE
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `The surgical team performs a pericardial window under general anaesthesia. Drainage is established and intrapericardial pressure normalises within the hour.

Ilya is transferred to the Colony ICU for monitoring. His blood pressure stabilises and his breathing improves over the following 24 hours.

He is advised to avoid contact sport until cleared by the cardiology team — a difficult conversation for a professional low-gravity hockey player.

*Patient stabilised. The rink will have to wait.*`,
        image: null,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // SCENARIO 4 — MERCURY JOHANNA
  // ---------------------------------------------------------------------------
  {
    id: 4,
    title: "Mercury Johanna",
    subtitle: "The Weight of Breathlessness",
    stages: [
      // -----------------------------------------------------------------------
      // PATIENT HISTORY
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `**Patient:** Mercury Johanna | **Age:** 62 | **Sex:** Female

Mercury presented to the Mars Emergency Department this morning with severe shortness of breath, markedly worsened by exertion. Three weeks ago she attended a birthday party for one of her grandchildren — held in one of the artificial Martian rainforests. All partygoers removed their suits and helmets to hike through the undergrowth together.

**Dyspnoea:** Unable to walk more than a few metres without stopping. Moderate dyspnoea now present at rest — a significant acute worsening from mild symptoms that began three weeks ago.

**Chest:** Non-acute, non-sharp discomfort only. Chronic fatigue over the past three months.

**Cough:** Persistent and productive over the past month, with green, purulent sputum.

**Weight:** Unintentional loss of 25% of bodyweight over the past 12 months.`,
        image: null,
      },

      // -----------------------------------------------------------------------
      // Q1 — Differentials
      // -----------------------------------------------------------------------
      {
        type: "checklist",
        instruction: "List some possible differentials for this patient:",
        items: [
          // --- Do not miss ---
          { label: "Pneumonia (bacterial or fungal)", critical: true },
          { label: "COPD exacerbation", critical: true },
          { label: "Primary lung cancer", critical: true },
          { label: "Pulmonary embolism", critical: true },
          { label: "Hypersensitivity pneumonitis", critical: false },
          { label: "Tuberculosis", critical: false },
          { label: "Heart failure", critical: false },
          // --- Distractors ---
          { label: "Pleural effusion", critical: false },
          { label: "Lung abscess", critical: false },
          { label: "Bronchiectasis", critical: false },
          { label: "Mesothelioma", critical: false },
          { label: "Interstitial lung disease / IPF", critical: false },
          { label: "Sarcoidosis", critical: false },
          { label: "Anaemia", critical: false },
          { label: "Atypical pneumonia (Mycoplasma / Legionella)", critical: false },
          { label: "GORD", critical: false },
          { label: "Panic attack / anxiety", critical: false },
          { label: "Costochondritis", critical: false },
        ],
      },

      // -----------------------------------------------------------------------
      // Q2 — Further History
      // -----------------------------------------------------------------------
      {
        type: "checklist",
        instruction: "List further history you would like to take from this patient:",
        items: [
          // --- Do not miss ---
          {
            label: "Past Medical History",
            reveal: "COPD diagnosed 15 years ago. Type 2 diabetes mellitus, reasonably controlled on oral metformin. Hypertension, controlled with lisinopril 40mg daily. No past surgical history.",
            critical: true,
          },
          {
            label: "Allergies",
            reveal: "Nil known.",
            critical: true,
          },
          {
            label: "Immunisations",
            reveal: "All up to date, including colony influenza and COVID-19 boosters.",
            critical: true,
          },
          {
            label: "Travel History",
            reveal: "No recent travel off-world or outside of the city, aside from the recent birthday party held in the artificial Martian rainforest.",
            critical: true,
          },
          {
            label: "Social History",
            reveal: "50 pack-year smoking history (Martian cigarettes — higher tobacco content than Earth cigarettes). Ceased smoking last year. Approximately 5 units of alcohol per week for the past 40 years. Lives at home with her husband, recently diagnosed with small cell lung cancer. No illicit drug use. Prior to retirement, worked as a xenobiologist in the Martian terraforming program for 35 years — working closely with bio-engineered fungal spores introduced to the local environment.",
            critical: true,
          },
          // --- Non-critical extras ---
          {
            label: "Medications",
            reveal: "Metformin 500mg BD. Lisinopril 40mg daily. Salbutamol inhaler PRN and tiotropium inhaler daily for COPD management.",
            critical: false,
          },
          {
            label: "Family History",
            reveal: "Husband recently diagnosed with small cell lung cancer. No other known family history of malignancy or cardiac disease.",
            critical: false,
          },
          {
            label: "Occupational History",
            reveal: "Retired xenobiologist. Worked for 35 years in the Martian terraforming program, with prolonged exposure to bio-engineered fungal spore preparations in enclosed environments.",
            critical: false,
          },
        ],
      },

      // -----------------------------------------------------------------------
      // VITALS + EXAMINATION NARRATIVE
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `**Vitals:**

Temperature: 38.3°C | Heart Rate: 112 bpm | Respiratory Rate: 26 breaths/min | Blood Pressure: 148/92 mmHg | SpO₂: 84% on room air

**Chest:**

**Percussion:** Dullness at the right lower zone.

**Palpation:** Bilateral chest expansion at 3 cm — symmetrical.

**Auscultation:** Expiratory wheeze bilaterally. Inspiratory crackles at the right lower zone. Bilateral reduced breath sounds.

**JVP:** 4 cm above the sternal angle.`,
        image: null,
      },

      // -----------------------------------------------------------------------
      // Q3 — Investigations
      // -----------------------------------------------------------------------
      {
        type: "checklist",
        instruction: "Based on your history and examination, which investigations would you like to order?",
        items: [
          // --- Do not miss ---
          {
            label: "Sputum microscopy, culture and sensitivity (MCS)",
            reveal: "Identifies causative organism and guides targeted antibiotic therapy. Essential before empirical antibiotics are broadened.",
            critical: true,
          },
          {
            label: "Chest X-ray",
            reveal: "First-line imaging. Can identify consolidation, pleural effusions, masses or hyperinflation consistent with COPD.",
            critical: true,
          },
          {
            label: "Full blood count (FBC)",
            reveal: "Confirms inflammatory or infectious process. May also reveal anaemia contributing to her functional decline and fatigue.",
            critical: true,
          },
          {
            label: "12-lead ECG",
            reveal: "Excludes acute cardiac causes — arrhythmias or right heart strain pattern from pulmonary embolism.",
            critical: true,
          },
          {
            label: "Blood cultures",
            reveal: "Rules out bacteraemia given fever and tachycardia. Should be drawn before antibiotics are commenced.",
            critical: true,
          },
          {
            label: "Arterial blood gas (ABG)",
            reveal: "Assesses severity of respiratory failure and guides decisions around oxygen therapy and ventilatory support.",
            critical: true,
          },
          // --- Non-critical ---
          { label: "C-reactive protein (CRP) / inflammatory markers", critical: false },
          { label: "Urea, electrolytes and creatinine (UEC)", critical: false },
          { label: "D-dimer", critical: false },
          { label: "Urinary Legionella and pneumococcal antigen", critical: false },
          { label: "Liver function tests (LFTs)", critical: false, discouraged: "No hepatic symptoms or clinical features to indicate liver pathology. LFTs will not change immediate management here." },
          { label: "Troponin", critical: false, discouraged: "Troponin may be mildly elevated due to right heart strain or demand ischaemia secondary to hypoxia, making it non-specific and difficult to interpret. It is not the priority investigation in this presentation." },
          { label: "CT chest with contrast", critical: false, discouraged: "Premature before the consolidation has cleared — the infectious opacity may obscure or mimic a mass. CXR is the appropriate first-line imaging. CT is better reserved for follow-up if abnormality persists." },
          { label: "Spirometry", critical: false, discouraged: "Spirometry results are unreliable in the acute setting when the patient is breathless and unwell. It has no role in guiding immediate management and should be deferred until the patient is stable." },
          { label: "Coagulation studies", critical: false, discouraged: "No specific indication for coagulation studies here — there is no bleeding, no anticoagulation, and no clinical suspicion of a coagulopathy." },
          { label: "Urine dipstick", critical: false, discouraged: "No urinary symptoms, and AKI is not yet established. Urine dipstick will not contribute to the diagnosis or immediate management of this presentation." },
        ],
      },

      // -----------------------------------------------------------------------
      // RESULTS NARRATIVE
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `**Investigation Results:**

**Chest X-ray:** Right lower lobe opacity consistent with consolidation. No pleural effusion or pneumothorax. Hyperinflation consistent with underlying COPD.

**Full Blood Count:** White cell count 18.2 × 10⁹/L (elevated). Haemoglobin 105 g/L (mild anaemia). Platelets normal.

**Sputum Culture:** *Streptococcus marspneumoniae* isolated.

**Blood Cultures:** No growth at 24 hours.

**ECG:** Sinus tachycardia. No acute ischaemic changes or right heart strain pattern.

**Arterial Blood Gas (on room air):**

pH: 7.31 | pCO₂: 56 mmHg | pO₂: 52 mmHg | HCO₃⁻: 28 mmol/L`,
        image: null,
      },

      // -----------------------------------------------------------------------
      // Q4a — Unifying Diagnosis
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `Based on these investigation results, which of the following is the most likely unifying diagnosis?`,
        image: null,
        options: [
          "Acute exacerbation of COPD, triggered by bacterial pneumonia",
          "Acute pulmonary embolism",
          "Hypersensitivity pneumonitis from fungal spore exposure",
          "Congestive heart failure with acute decompensation",
          "Primary small cell lung cancer",
        ],
        correct: 0,
        feedback: [
          null,
          "**Pulmonary embolism** is a reasonable differential, but there are **no direct supporting features** — no pleuritic pain, no right heart strain on ECG, and the presentation is better explained by the sputum culture finding.",
          "**Hypersensitivity pneumonitis** is plausible given Mercury's occupational history, but it does **not** typically produce **purulent sputum** or a **positive bacterial culture**. The picture is more infectious than immune-mediated.",
          "**Congestive heart failure** could explain dyspnoea and reduced breath sounds, but the **right lower lobe consolidation** and **positive sputum culture** are not features of cardiac decompensation. JVP is only mildly elevated with no other heart failure signs.",
          "**Primary lung cancer** is a serious concern given her smoking history and weight loss — but the **acute febrile presentation, purulent sputum and positive culture** point to an infectious aetiology. Malignancy remains important for **follow-up** once the acute illness resolves.",
        ],
        explanation: `The right lower lobe **consolidation** on chest X-ray combined with a positive **sputum culture** for *Streptococcus marspneumoniae* confirms **bacterial pneumonia**. In established **COPD**, lower respiratory tract infection is the most common trigger for **acute exacerbation** — driving acute-on-chronic respiratory failure. All other differentials lack direct investigative support at this stage.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // Q4b — ABG Interpretation
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `What does Mercury's arterial blood gas indicate?

pH 7.31  |  pCO₂ 56 mmHg  |  pO₂ 52 mmHg  |  HCO₃⁻ 28 mmol/L`,
        image: null,
        options: [
          "Respiratory alkalosis",
          "Respiratory acidosis with partial metabolic compensation",
          "Metabolic acidosis",
          "Metabolic alkalosis",
          "Mixed respiratory and metabolic acidosis",
        ],
        correct: 1,
        feedback: [
          "**Respiratory alkalosis** results from hyperventilation — it produces a **low pCO₂** and a **high pH**. Mercury's pCO₂ is elevated and her pH is acidotic — the opposite pattern.",
          null,
          "**Metabolic acidosis** requires a **low HCO₃⁻**. Mercury's bicarbonate is **elevated** at 28 mmol/L — reflecting renal **compensation** for a primary respiratory process, not a metabolic one.",
          "**Metabolic alkalosis** requires a **high pH** alongside the raised HCO₃⁻. Mercury's pH is **acidotic** at 7.31 — ruling out a primary alkalotic process.",
          "**Mixed respiratory and metabolic acidosis** would require a **low pH, raised pCO₂ and low HCO₃⁻** simultaneously. Mercury's bicarbonate is **elevated** — indicating compensation, not a concurrent metabolic acidosis.",
        ],
        explanation: `Mercury's ABG shows a **low pH** (7.31 — acidosis), a **raised pCO₂** (56 mmHg — hypercapnia as the primary driver), and a **raised HCO₃⁻** (28 mmol/L — partial renal compensation). This is **primary respiratory acidosis with partial metabolic compensation**.

In **COPD**, chronically obstructed airways impair CO₂ clearance at baseline. With an acute infective trigger, Mercury can no longer increase ventilation sufficiently to compensate — **CO₂ retention** drives the acidosis.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // TREATMENT RESPONSE NARRATIVE
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `Over the next 48 hours, Mercury's acute respiratory failure improves with targeted antibiotics, controlled oxygen therapy, systemic corticosteroids and non-invasive ventilation (BiPAP).

**Repeat ABG at 48 hours:** pH 7.38 | pCO₂ 48 mmHg

Mercury is comfortable and eager to be discharged. She asks when she can go home.`,
        image: null,
      },

      // -----------------------------------------------------------------------
      // Q5 — Discharge Planning
      // -----------------------------------------------------------------------
      {
        type: "mcq",
        question: `Given Mercury's significant history of unexplained weight loss and heavy smoking, what is the most critical component of her discharge plan?`,
        image: null,
        options: [
          "Immediate PET scan referral, to be completed within 48 hours",
          "Repeat chest X-ray in 6–12 weeks to ensure consolidation is fully resolved and to exclude underlying malignancy",
          "Prescription for long-term oral prednisone to prevent further COPD exacerbations",
          "No further investigation — the sputum culture has identified the causative organism",
          "CT chest with contrast, arranged before discharge",
        ],
        correct: 1,
        feedback: [
          "**PET scanning** is indicated for staging of **confirmed or highly suspected malignancy** — not as an initial investigation before consolidation has cleared. Results would be unreliable at this stage and it is an unnecessary use of limited resources.",
          null,
          "**Long-term oral prednisone** is not standard for preventing COPD exacerbations and carries significant risks — **immunosuppression, osteoporosis and glycaemic dysregulation** (particularly relevant given her T2DM). Inhaled corticosteroids are preferred where appropriate.",
          "Identifying the causative organism **addresses the acute infection** only. A **25% unintentional weight loss** over 12 months is a red flag that cannot be attributed solely to an infective illness.",
          "**CT chest** is more sensitive than CXR for detecting pulmonary masses, but organising it **before consolidation clears** risks false negatives — the infectious opacity may obscure or mimic a mass. It may be the appropriate next step if the follow-up CXR remains abnormal.",
        ],
        explanation: `Mercury's **25% unintentional weight loss** over 12 months predates her acute presentation. Combined with a **50 pack-year smoking history** and prolonged occupational exposure to **bio-engineered fungal spores**, she carries a high risk for underlying **pulmonary malignancy**.

The current consolidation may be **obscuring or mimicking** a pulmonary mass. A **repeat chest X-ray in 6–12 weeks** is the standard of care — allowing time for the consolidation to clear while ensuring any **persistent opacity** is identified and investigated further.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // CLOSING NARRATIVE
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `Mercury is discharged with a complete course of targeted antibiotics, optimised inhalers, and a clear plan for follow-up.

She is counselled on the significance of her weight loss and the importance of attending her chest X-ray in 6–12 weeks. She understands — and promises she will not skip it this time.

Her husband, already under the care of the oncology team, will accompany her to the appointment.

*Patient discharged. The investigation continues.*`,
        image: null,
      },
    ],
  },

]
