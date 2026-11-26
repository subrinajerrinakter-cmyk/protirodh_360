# PROTIRODH 360 (প্রতিরোধ ৩৬০)
### Recognise. Protect. Respond. Reclaim.

> **A privacy-first, browser-based digital self-defence platform for young people facing technology-facilitated gender-based violence (TGBV) in Bangladesh.**

Built for **Share-Net Bangladesh AI & TGBV Hackathon 2026**  
**Track:** Theme 3: Empowerment and Response  
**Venue & Finals:** Hotel Sheraton, Banani, Dhaka (December 2026)

---

## 🌟 The Core Innovation: Explainable Decision Engine (SSDE)

Instead of a generic generative chatbot that hallucinates unverified advice or violates privacy, **PROTIRODH 360** features the **Survivor-Centred Safety Decision Engine (SSDE)** — a deterministic, audit-friendly, 100% client-side pipeline.

### Flagship Jury Moment: The Context Contrast Demo (Journey C)
Consider the exact same phrase:
> `"লোকেশন পাঠাও ekhon, send live location right now."`

* **Context A (Consensual & Boundary Respected):** When mutual consent is present and refusal was respected, the engine identifies **no coercion indicator**.
* **Context B (Refusal Disrespected + Repeated Demand):** With zero changes to the underlying text, the engine detects an **explicit coercive surveillance pattern**, explains which contextual factors escalated the finding, and presents safe response options without claiming false certainty.

---

## 🛡️ Privacy & Threat Model Guarantees

* **Zero Cloud Inference / Zero Database:** All NLP normalization, tokenization, rule detection, and recommendations execute strictly inside the user's browser (CPU-only).
* **In-Memory Volatile Session:** No sensitive user messages, incident records, or plans are stored in `localStorage`, `IndexedDB`, or cookies. Closing the tab or clicking "Clear" immediately purges all state.
* **Discreet Safe Exit:** A persistent emergency bar allows survivors to instantly redirect to a neutral destination (e.g., Weather or Google) with one click.
* **No Intimate Image Handling:** The platform strictly prohibits and prevents uploading intimate media, instead pointing users to official cryptographic hashing services (**StopNCII.org** / **Take It Down**).

---

## 🚀 Key Modules Built

| Module | Route | Status | Description |
| :--- | :--- | :--- | :--- |
| **Home** | `/` | **P0** | Clear entry points, core privacy pillars, 1-click fictional demo triggers. |
| **Abuse Radar** | `/detect` | **P0** | Multilingual analysis (Bangla, Banglish, English), evidence span highlighting, context questionnaire. |
| **Pattern Tracker** | `/timeline` | **P0** | Session incident cards, deduplication guard, recurring pattern derivation across distinct moments. |
| **Response Lab** | `/respond` | **P0** | Interactive decision cards (*Why this appears*, *Before you act*, *Alternatives*, *Add to plan*). |
| **Safety Plan** | `/plan` | **P0** | Editable custom action plan, phone/name redaction preview, safe `.txt` export & print styling. |
| **Safety Checkup** | `/shield` | **P1** | 6-part device & account audit (logged-in sessions, shared PINs, location tracking, 2FA). |
| **Defence Academy** | `/academy` | **P1** | 6 branching fictional scenarios with trade-off explanations and non-blaming takeaways. |
| **Support Directory** | `/support` | **P1** | Verified hotlines (Police Cyber Support for Women: `01320000888`, `999`, ASK, BLAST, Kaan Pete Roi). |
| **Rights Navigator** | `/rights` | **P1** | Educational cards on Cyber Security Act, Penal Code 509, evidence preservation standards. |
| **Privacy Centre** | `/privacy` | **P0** | Full threat model matrix, instant memory cache purge, browser history guide. |
| **Methodology** | `/about` | **P0** | 120-scenario synthetic benchmark results, SSDE architecture, team capacity. |

---

## 📊 Benchmark Evaluation (120 Synthetic Scenarios)

| Evaluation Metric | Keyword Baseline | PROTIRODH 360 SSDE | Impact |
| :--- | :--- | :--- | :--- |
| **Macro-F1 (Coercion Indicators)** | 0.68 | **0.93** | **+36.7% accuracy** |
| **False Positives (Consensual text)** | 43.3% | **3.3%** | **-92.4% false alarms** |
| **Context Distinction Consistency** | 0.0% | **100.0%** | **Perfect contrast handling** |
| **Unsafe Advice Suppression** | 0.0% | **100.0%** | **Protects against shared device risks** |
| **Cloud Network Requests** | N/A | **0 requests** | **100% offline & private** |

---

## 💻 Tech Stack & Local Setup

* **Framework:** React 18 + TypeScript + Vite
* **Styling:** Tailwind CSS (Deep Teal `#124840`, Teal `#087E74`, Cream `#F7F8F5`, Slate `#243447`)
* **Routing:** React Router v6
* **Testing:** Vitest
* **Icons:** Lucide React

### Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Run unit tests
npm run test

# 4. Build for production
npm run build
```

---

## 👥 Hackathon Team Structure

* **Lead / Frontend:** Design system, routes, accessibility, Tailwind CSS integration.
* **Engine Developer:** Multilingual NLP rules, context/pattern engine, safety constraints, Vitest suite.
* **Privacy / QA:** Threat model, in-memory state safeguards, export redaction.
* **SRHR / Content:** Review educational scenarios, emergency escalation, and provider directory.
* **Research / Pitch:** Benchmark evaluation, demo script, and presentation.

---

© 2026 PROTIRODH 360 Team. Developed for the Share-Net Bangladesh AI & TGBV Hackathon.
