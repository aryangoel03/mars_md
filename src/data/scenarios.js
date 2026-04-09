// =============================================================================
// MARS MD — SCENARIO DATA FILE
// =============================================================================
// Edit this file to add or modify scenarios.
//
// STAGE TYPES:
//   "narrative"  — display-only text block. Supports markdown-style **bold**.
//                  Optional: image (path string like "/images/filename.png")
//
//   "checklist"  — click items to reveal them. Items can be critical: true.
//                  Missing a critical item on "Proceed" triggers an error.
//                  Items can have a "reveal" string shown when clicked.
//
//   "mcq"        — 2–5 option question. One correct answer (0-indexed).
//                  Optional: image above options, explanationImage after answer.
//                  feedback: null → generic wrong message + show explanation on correct
//                  feedback: ["per option 0 text", "per option 1 text", ...]
//                    → tailored message shown immediately for any selection
//
// HOW TO ADD IMAGES:
//   Drop files into public/images/ and reference as "/images/filename.png"
// =============================================================================

export const scenarios = [
  {
    id: 1,
    title: "Venus Picklebottom",
    subtitle: "The Breathless Commander",
    stages: [
      // -----------------------------------------------------------------------
      // PATIENT HISTORY
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `**Patient:** Venus Picklebottom | **Age:** 70 | **Sex:** Female

Venus presented this evening at the space emergency department complaining of extreme shortness of breath following an incident earlier today. She was relaxing in her remedial space capsule overnight when suddenly another spaceship crashed into her vessel while preparing for docking. Luckily, she did not sustain major injuries from the collision.

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
          { label: "Pneumothorax", critical: false },
          { label: "Infectious aetiology (pneumonia)", critical: false },
          { label: "Acute exacerbation of COPD", critical: false },
          { label: "Myocardial infarction", critical: true },
          { label: "Heart failure", critical: false },
          { label: "Interstitial lung disease", critical: false },
          // --- Distractors ---
          { label: "Aortic dissection", critical: false },
          { label: "Cardiac tamponade", critical: false },
          { label: "Primary lung malignancy", critical: false },
          { label: "Pleural effusion", critical: false },
          { label: "Mesothelioma", critical: false },
          { label: "Tuberculosis", critical: false },
          { label: "Pulmonary hypertension", critical: false },
          { label: "Anaemia", critical: false },
          { label: "Costochondritis / musculoskeletal pain", critical: false },
          { label: "Anxiety / panic attack", critical: false },
          { label: "Space pneumonia (Martian pathogen)", critical: false },
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
            reveal: "Recently visited the space intensive-care unit to visit her husband who contracted space pneumonia.",
            critical: true,
          },
          {
            label: "Occupation",
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
          "Venus fell unconscious while you were auscultating. You failed to observe that she was becoming severely cyanotic and that her vital signs were rapidly deteriorating. Always inspect first!",
          "Correct! The first step to any physical examination is always general inspection and checking vital signs.",
        ],
        explanation: null,
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
        feedback: null,
        explanation: `The combination of pleuritic chest pain, haemoptysis, unintentional weight loss, low-grade fever, and exertional SOB over 2 weeks with sudden worsening — together with risk factors including HRT, prior limb surgery, and recent hospital visit (Virchow's triad: hypercoagulability, stasis, endothelial injury) — points strongly to **pulmonary embolism**.`,
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
          "D-dimers are highly sensitive but lack specificity. In this patient with a high pre-test probability of PE, a raised D-dimer would not change management — many conditions raise D-dimer (DVT, DIC, MI, aortic dissection, AF, peripheral artery disease, etc.). A negative D-dimer is more clinically useful in low-probability patients as a rule-out tool.",
          "Correct! D-dimer is best used to rule out PE in low pre-test probability patients, not to confirm it in high-probability patients like Venus.",
        ],
        explanation: null,
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
        feedback: null,
        explanation: `Sensitivity = 95/100 = **0.95** | Specificity = 160/400 = **0.40**

LR+ = Sensitivity / (1 − Specificity) = 0.95 / 0.60 = **1.58**
LR− = (1 − Sensitivity) / Specificity = 0.05 / 0.40 = **0.125**

A low LR− (< 0.1) makes D-dimer a good **rule-out** test. The modest LR+ makes it a poor **rule-in** test — consistent with its clinical use.`,
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
        feedback: null,
        explanation: `The CT shows occlusion of the **lobar arteries** (branches of the pulmonary artery), visible as hypodense filling defects. It is important to remember that a pulmonary embolism is not always a massive saddle embolism — smaller emboli can result in a more subacute presentation, consistent with Venus's 2-week onset of SOB, before a larger clot forms, resulting in the sudden deterioration that caused her to present to the ED today.`,
        explanationImage: null,
      },

      // -----------------------------------------------------------------------
      // CLOSING NARRATIVE
      // -----------------------------------------------------------------------
      {
        type: "narrative",
        content: `You immediately inform your attending consultant and confirm a diagnosis of **pulmonary embolism**. Venus is transferred to the trustworthy hands of the space ICU unit.

*Patient stabilised. Well done.*`,
        image: null,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // SCENARIO 2 — PLACEHOLDER (fill in your content below)
  // ---------------------------------------------------------------------------
  {
    id: 2,
    title: "Patient Name Here",
    subtitle: "Scenario subtitle here",
    stages: [
      {
        type: "narrative",
        content: `**Patient:** Name | **Age:** XX | **Sex:** X

Add your scenario history here...`,
        image: null,
      },
      // Add more stages following the same structure as Scenario 1
    ],
  },

  // ---------------------------------------------------------------------------
  // SCENARIO 3 — PLACEHOLDER
  // ---------------------------------------------------------------------------
  {
    id: 3,
    title: "Patient Name Here",
    subtitle: "Scenario subtitle here",
    stages: [
      {
        type: "narrative",
        content: `**Patient:** Name | **Age:** XX | **Sex:** X

Add your scenario history here...`,
        image: null,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // SCENARIO 4 — PLACEHOLDER
  // ---------------------------------------------------------------------------
  {
    id: 4,
    title: "Patient Name Here",
    subtitle: "Scenario subtitle here",
    stages: [
      {
        type: "narrative",
        content: `**Patient:** Name | **Age:** XX | **Sex:** X

Add your scenario history here...`,
        image: null,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // SCENARIO 5 — PLACEHOLDER
  // ---------------------------------------------------------------------------
  {
    id: 5,
    title: "Patient Name Here",
    subtitle: "Scenario subtitle here",
    stages: [
      {
        type: "narrative",
        content: `**Patient:** Name | **Age:** XX | **Sex:** X

Add your scenario history here...`,
        image: null,
      },
    ],
  },
]
