# Cyber Sentinel

PRD — CyberShield

1. Product Overview

Product Name: CyberShield

Tagline:
“Know the threat before it becomes a breach.”

CyberShield is a modern web application that helps users identify potentially dangerous messages, URLs, and text-based content before interacting with them.

The application analyzes submitted content and provides a simple Safe / Suspicious / Unsafe result with an explanation of the detected risks.

The goal is to make basic cybersecurity awareness accessible to ordinary users without requiring technical knowledge.

2. Problem

People regularly receive suspicious links and messages through email, SMS, WhatsApp, social media, and other platforms.

Many users cannot easily determine whether a message or URL is legitimate.

Existing cybersecurity tools can be complicated for non-technical users.

This creates a gap between sophisticated security technology and everyday users.

3. Target Users

Primary Users

Students

General internet users

Small businesses

People with limited cybersecurity knowledge

Secondary Users

Developers testing suspicious URLs

Employees checking potentially dangerous messages

4. Core Solution

CyberShield provides a simple interface where users can paste:

A URL

A suspicious message

An email/message containing a link

The system analyzes the submitted content and produces:

SAFE

The content does not show obvious indicators of malicious activity.

SUSPICIOUS

Potential warning signs were detected and the user should verify the source.

UNSAFE

Strong indicators of phishing, malicious behavior, or other security risks were detected.

The result must also explain why the content received that classification.

5. Main User Flow

Step 1 — Landing Page

Display:

CyberShield

“Check before you click.”

Short explanation:

Analyze suspicious links and messages and understand the risks before interacting with them.

Primary CTA:

Analyze Now

Secondary CTA:

How It Works

Step 2 — Analysis Dashboard

Create a clean dashboard containing:

Input Type

Three selectable options:

URL

Message

Email

Input Box

Large textarea/input field.

Placeholder:

Paste a suspicious URL or message here...

Analyze Button

Analyze Threat

Add a small privacy message:

Your content is analyzed only to generate the security assessment.

6. Analysis Results

After clicking Analyze Threat, display a result card.

The result must prominently show:

Threat Level

One of:

SAFE

SUSPICIOUS

UNSAFE

Also show a numerical confidence percentage.

Example:

Threat Confidence: 87%

7. Threat Explanation

Display a section:

Why was this flagged?

Show detected indicators such as:

Suspicious URL structure

Unknown domain

Urgency/manipulation language

Request for credentials

Suspicious redirects

Domain mismatch

Unusual characters

Potential phishing language

Each indicator should appear as a small card/chip.

8. Security Score

Create a visual security score:

Security Score: 28/100

Use a circular or horizontal progress indicator.

Below it:

Lower scores indicate higher potential risk.

9. Recommended Action

Every result should provide an actionable recommendation.

Examples:

SAFE

No obvious threats were detected. Continue to remain cautious.

SUSPICIOUS

Do not provide credentials or financial information until you verify the sender and destination.

UNSAFE

Avoid opening the link or responding to the message. Verify the sender through an independent channel.

10. Example Analysis

Include a demo/example button:

Try Example

When clicked, populate the input box with a realistic phishing-style example.

Example:

“URGENT! Your account will be suspended today. Verify your account immediately: http://example.com/verify”

The demo should produce:

UNSAFE

with several detected indicators.

This allows judges to immediately understand the product without needing to invent their own test input.

11. Dashboard

Add a simple analysis history section.

Display:

ContentResultScoreTimesuspicious-login.comUNSAFE18/100Just nowexample.orgSAFE91/1005 min ago

For the hackathon MVP, history can be stored locally in the browser.

No authentication is required.

12. Technology

Frontend:

React

TypeScript

Tailwind CSS

Modern component-based architecture

Backend/API:

Use a lightweight API architecture where required.

The application should be structured so that a real threat-intelligence API or machine-learning model can be integrated later.

For the hackathon prototype, the analysis engine may use rule-based detection and/or an AI API.

13. Detection Logic

The MVP should detect common indicators such as:

URL indicators

HTTP instead of HTTPS

Suspicious domains

Excessive subdomains

IP addresses used instead of domains

Suspicious URL parameters

URL obfuscation

Excessively long URLs

Message indicators

Urgency

Threats of account suspension

Requests for passwords

Requests for OTPs

Requests for financial information

Suspicious links

Impersonation language

Prize/reward scams

The analysis should combine multiple indicators into a risk score.

14. UI/UX Requirements

The interface should look like a modern cybersecurity product.

Design

Dark cybersecurity-inspired theme

Clean typography

Subtle gradients

Glass/modern cards

Clear visual hierarchy

Minimal animations

Responsive design

Do NOT overcrowd the dashboard.

The primary action should always be obvious:

Paste → Analyze → Understand → Act

15. Responsive Design

The application must work properly on:

Desktop

Laptop

Tablet

Mobile

On mobile:

Stack cards vertically

Make the input box full width

Keep the Analyze button easily accessible

Avoid horizontal scrolling

16. Important Product Principles

Explainability

Do not simply say:

“This is unsafe.”

Explain the detected indicators.

Simplicity

A non-technical user should understand the result within seconds.

Actionability

Every result should tell the user what to do next.

Privacy

Do not display or permanently store sensitive user input in the UI.

17. MVP Scope

The hackathon MVP MUST include:

Landing page

Analysis dashboard

URL/message input

Threat classification

Security score

Threat indicators

Explanation

Recommended action

Example/demo input

Analysis history

Responsive design

Do NOT add unnecessary features such as:

User accounts

Complex admin panels

Social features

Payment systems

Chat functionality

Large databases

18. Future Scalability

Future versions could integrate:

Google Safe Browsing

VirusTotal

Domain reputation APIs

WHOIS information

Real-time threat intelligence

Browser extension

Email security integration

WhatsApp/message scanning

ML-based phishing detection

Organization-wide security dashboards

These should be presented as future possibilities, not required for the MVP.

19. Success Criteria

The prototype is successful if a judge can:

Open the website.

Understand the product within 10 seconds.

Paste a suspicious message or URL.

Click Analyze.

Receive a clear threat classification.

Understand why it was flagged.

Know what action to take.

Test another example.

Use the website comfortably on mobile and desktop.

20. Lovable Build Instructions

Build the complete responsive React/TypeScript web application based on this PRD.

Prioritize a polished working MVP over excessive features.

Do not create unnecessary authentication or complex backend infrastructure.

Use realistic demo data so the application works immediately after launch.

Make all buttons functional.

Do not leave placeholder sections that look unfinished.

The most important user journey is:

Landing Page → Analyze → Threat Result → Explanation → Recommended Action

Ensure this flow is fast, visually clear, and suitable for a live hackathon demonstration.

Before finishing, test all major interactions and fix broken navigation, buttons, layouts, and responsive behavior.

The final result should look like a real cybersecurity startup MVP rather than a generic template.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/573650fc-6163-4e4a-b05a-8f260fd76918).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
