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
          "The need to repatriate him to Earth for a kidney transplant, currently impossible due to the war",
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

Elias is transferred to the Space ICU. Over the next four hours his potassium trends downward and his urine begins to clear.

The colony administrator authorises emergency water rationing across all non-essential sectors.

*Patient stabilised. The colony endures — for now.*`,
        image: null,
      },
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
