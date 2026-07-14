# ⚡ SwitchGear — Datacenter QA Tracking Application

A production-level React/TypeScript application built to manage the Quality Assurance pipeline for datacenter switchgear cabinets. Developed internally at **Crusoe AI** and endorsed by management for company-wide deployment.

---

## 🚀 Live Demo

> Coming soon — deploying via Vercel

---

## 📋 Overview

SwitchGear streamlines the QA workflow for datacenter switchgear cabinets as they move through a multi-department pipeline. Built from real operational needs on the floor, it replaces manual tracking with a clean, intuitive dashboard that gives every department full visibility into cabinet status, assignments, and history.

---

## 🏗️ Pipeline Flow

```
QC → Test → UL → ✅ Complete
          ↘ Rework ↗
```

| Department | Role |
|---|---|
| 🔍 QC | Quality Control inspection |
| ⚡ Test | HI-POT and electrical testing |
| ✅ UL | UL certification verification |
| 🔧 Rework | Failed units returned for repair |

---

## ✨ Features

- **Department Dashboard** — Color-coded views for each department (QC, Test, UL, Rework) with cabinet cards showing real-time status
- **Round-Robin Auto-Assign** — Automatically assigns incoming cabinets evenly across available technicians
- **Manual Override** — Smart defaults with full manual control always available
- **Paired Cabinet Tracking** — Tracks A/B unit pairs through the pipeline together
- **Fixed Bay Assignments** — Assigns cabinets to specific physical bays in the facility
- **Breaker Assignment Module** — Supports ABB and Siemens frames with full model selection, serial numbers, voltage, amperage, and M.O. number tracking
- **Movement Logging** — Every cabinet movement through the pipeline is timestamped and logged
- **Photo Uploads** — Attach inspection photos directly to cabinet records
- **CSV Export** — Export full cabinet data for reporting and record keeping
- **Skids Management** — Global skids tracking system
- **Pass / Fail / Rework Results** — Clear result tracking per cabinet per department
- **Toast Notifications** — Real-time feedback on all actions
- **Persistent Storage** — All data persists across sessions via key-value storage

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React | UI framework |
| TypeScript (TSX) | Type-safe component development |
| Tailwind CSS | Styling and responsive layout |
| Persistent Key-Value Storage | Data persistence without a backend |
| Claude Code (Anthropic) | AI-assisted development |

---

## 🧠 About the Developer

Built by **Josh McClellan** — Testing Technician at Crusoe AI with hands-on datacenter switchgear experience. This app was built to solve a real operational problem and was adopted internally after endorsement from management.

- 📜 **Claude Code in Action** — Certified by Anthropic (April 2026)
- 🔗 Verify cert: [https://verify.skilljar.com/c/gewdwf7jr2kd](https://verify.skilljar.com/c/gewdwf7jr2kd)

---

## 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/switchgear.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

> **Note:** This app was originally developed as a Claude artifact using `window.storage` for persistence. For standalone deployment, a storage adapter (localStorage or a backend API) may be needed.

---

## 📸 Screenshots

> Coming soon

---

## 📄 License

MIT — feel free to use, fork, and build on this.
