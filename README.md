# 🛡️ CyberShield

### Know the threat before it becomes a breach.

CyberShield is a lightweight cybersecurity analysis tool designed to help users identify potentially dangerous URLs, phishing attempts, scam messages, and suspicious email content before interacting with them.

It analyzes user-provided content, detects common threat indicators, generates a security score, and explains the detected risks in plain language.

> **HackDay 1.0 — Tech for a Better Tomorrow**

---

## 🚨 Problem

Phishing and online scams increasingly rely on social engineering rather than sophisticated technical attacks.

A suspicious message may use:

- Urgent language
- Fake account-verification requests
- Credential or OTP harvesting
- Impersonation
- Suspicious links
- URL redirects
- Attachment-based scams
- Financial or investment promises
- Gift-card/reward scams
- Requests for secrecy

For many users, identifying these warning signs is difficult.

CyberShield aims to make the first layer of threat awareness simple: **paste it, analyze it, understand the risk.**

---

## 💡 Solution

CyberShield provides a simple interface where users can submit a:

- 🌐 URL
- 💬 Message
- 📧 Email

The system analyzes the submitted content and returns:

### 🟢 SAFE
No significant threat indicators were detected by the current analysis rules.

### 🟡 SUSPICIOUS
Potential warning signs were detected and the user should investigate further before interacting.

### 🔴 UNSAFE
Multiple or high-risk indicators were detected. The user should avoid interacting with the content.

The result also includes a **security score, threat confidence, detected indicators, explanation, and recommended action.**

---

## ⚙️ How It Works

```text
          User Input
              │
              ▼
     ┌──────────────────┐
     │  Content Parser  │
     └────────┬─────────┘
              │
              ▼
     ┌──────────────────┐
     │ Threat Detection │
     │     Engine       │
     └────────┬─────────┘
              │
       ┌──────┴──────┐
       ▼             ▼
   URL Analysis   Message Analysis
       │             │
       └──────┬──────┘
              ▼
       Risk Calculation
              │
              ▼
     ┌──────────────────┐
     │ Security Score   │
     │ + Threat Level   │
     └────────┬─────────┘
              │
              ▼
      Explanation +
      Recommended Action
```

---

## 🔍 Detection Capabilities

CyberShield currently checks for multiple indicators, including:

### URL-related indicators

- HTTP connections
- Raw IP addresses
- Suspicious or risky domains
- Punycode / encoded domains
- URL shorteners
- Nested or encoded URLs
- Multiple destinations
- Redirect-style URLs
- `@`-obfuscated URLs
- Suspicious URL parameters
- Credential-related patterns

### Message & email indicators

- Urgency and pressure tactics
- Credential harvesting
- OTP requests
- Account verification scams
- Financial threats
- Rewards and gift-card scams
- Investment scams
- Remote-access requests
- Suspicious attachments
- Impersonation patterns
- Sender/domain mismatches
- Requests for secrecy
- Multiple suspicious destinations

---

## 📊 Risk Analysis

CyberShield produces a security score from **0–100** based on detected indicators.

The interface presents:

- **Security Score**
- **Threat Confidence**
- **Threat Verdict**
- **Detected Risk Indicators**
- **Plain-English Explanation**
- **Recommended Action**

This helps users understand **why** something was flagged instead of receiving only a simple warning.

---

## 🕘 Recent Checks

CyberShield keeps recent analyses locally so users can revisit previous checks.

Selecting a recent check reloads its original input and runs the analyzer again.

No external account is required for this functionality.

---

## 🎨 User Experience

CyberShield is designed around a simple workflow:

```text
Paste → Analyze → Understand → Act
```

The interface includes:

- Dark cybersecurity-focused UI
- Responsive layout
- Animated security score
- Clear SAFE / SUSPICIOUS / UNSAFE verdicts
- Risk indicator cards
- Recent analysis history
- Educational "How It Works" section
- Mobile-friendly interface

---

## 🛠️ Technology

### Frontend

- React
- TypeScript
- TanStack Start
- TanStack Router
- Vite

### Styling & UI

- CSS
- Responsive design
- Custom cybersecurity-themed interface

### Analysis

CyberShield currently uses a **rule-based threat analysis engine** designed to detect recognizable phishing and scam indicators.

This approach keeps the application lightweight, transparent, and fast while providing understandable explanations for each detected indicator.

### Development

- Git
- GitHub
- Vercel
- VS Code
- AI-assisted development tools

---

## 🌐 Live Demo

**CyberShield:**  
https://cyber-sentinel-peach.vercel.app/

**Analyzer:**  
https://cyber-sentinel-peach.vercel.app/analyze

---

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/It-A-tec/cyber-sentinel.git
```

### 2. Enter the project

```bash
cd cyber-sentinel
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available through the local development URL shown by Vite.

---

## 🧪 Example Tests

### SAFE

```text
https://www.google.com
```

Expected:

```text
SAFE
```

### SUSPICIOUS

```text
Your account needs verification. Please verify your account immediately to avoid suspension.
```

Expected:

```text
SUSPICIOUS
```

### UNSAFE

```text
URGENT: Your bank account will be suspended today.
Verify your password and OTP immediately at
http://bank-security.example/verify
```

Expected:

```text
UNSAFE
```

> These examples are for testing the analyzer. Do not visit suspicious URLs.

---

## 🔐 Privacy

CyberShield is designed around minimal input handling.

Recent checks are stored locally in the browser rather than requiring a user account.

The current version does **not** claim to provide definitive malware detection or replace professional security tools.

A result represents the indicators detected by CyberShield's current analysis engine.

---

## 🚀 Future Scope

CyberShield can be expanded with additional cybersecurity capabilities, including:

- 🤖 AI-assisted threat analysis
- 🔗 Reputation and threat-intelligence APIs
- 🌐 Domain and DNS intelligence
- 📧 Advanced email-header analysis
- 🧠 Machine-learning-based phishing classification
- 🖼️ Screenshot-based scam detection
- 📱 Browser extension
- 💻 Desktop/mobile applications
- 🏢 Organization-level threat monitoring
- 📈 Analytics dashboard
- 🔔 Real-time threat alerts
- 🗄️ Optional cloud-based analysis history

The long-term goal is to evolve CyberShield from a simple analysis tool into a broader **personal cybersecurity awareness and protection platform**.

---

## 🎯 HackDay 1.0

**Event:** HackDay 1.0  
**Theme:** Tech for a Better Tomorrow  
**Project:** CyberShield  
**Category:** Cybersecurity

### Core Idea

> **Help people recognize digital threats before those threats become real-world breaches.**

---

## 👥 Team

**It-A-tec**

Built with a combination of human problem-solving, development, design, testing, and AI-assisted tools.

---

## 📄 License

This project was created for HackDay 1.0.

See the repository for the current project license and source code.

---

### 🛡️ CyberShield

**Know the threat before it becomes a breach.**
