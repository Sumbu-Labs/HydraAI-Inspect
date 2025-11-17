# Catalyst Proposal Summary

This document distills the main points from the official [HydraAI Inspect Proposal.pdf](../HydraAI%20Inspect%20Proposal.pdf) and [HydraAI-Inspect Pitching.pdf](../HydraAI-Inspect%20Pitching.pdf) submitted to Catalyst Fund 15 (Cardano Use Cases — Prototype & Launch).

## At a Glance
- **Title**: HydraAI Inspect – AI-Powered Vehicle Inspection & Fast Tokenization Layer.
- **Theme**: Real-world utility with Hydra as the execution layer.
- **Duration**: 6 months.
- **Budget Requested**: ₳75,000 (fully open source, MIT License).
- **Team**: Sumbu Labs (5 engineers across blockchain, AI/ML, backend, frontend, DevOps).

## Problem Statement
The global used-car market exceeds $1T annually, yet inspection records remain fragmented, unverifiable, and prone to tampering. Buyers lack trust, sellers cannot prove condition, and inspection providers have no tamper-proof audit trail. Recording the rapid-fire inspection events directly on Cardano L1 would cost roughly 5 ADA per inspection and suffer from high latency (per the pitch deck).

## Proposed Solution
HydraAI Inspect combines AI-assisted inspections, Hydra L2 batching, and CIP-68 Vehicle Condition Tokens (VCT):
1. Inspectors upload vehicle photos through the React PWA.
2. AI service (`/analyze`) returns damage types, bounding boxes, confidence, and condition score.
3. Backend coordinates inspection sessions, persisting interim state within Hydra Heads for instant approvals.
4. Images and JSON reports are stored on IPFS/Backblaze B2.
5. Cardano node mints a CIP-68 VCT referencing the storage CIDs.
6. Frontend surfaces inspection status and QR/links to the VCT for auditors and buyers.

## Innovation Highlights (per proposal)
- First Hydra-powered industrial inspection workflow targeting Cardano.
- AI-assisted condition verification reduces fraud and subjectivity.
- CIP-68-based VCT establishes a reusable, updatable inspection token format.
- Open-source blueprint offers a modular reference for other AI + Hydra + tokenization workloads.

## MVP Scope
- AI damage detection service (≥5 vehicle damage classes recognized).
- Hydra session management: create/update/close inspection sessions, multi-party approvals.
- CIP-68 mint pipeline with metadata embedding AI results and storage links.
- Prototype UI supporting uploads, status tracking, QR viewer, and VCT link sharing.

## Milestones & Budget Split
| Month | Milestone | Outputs / Acceptance | Cost (₳) | Progress |
| --- | --- | --- | --- | --- |
| 1 | Architecture & AI Integration | System docs, repo skeletons, AI model wired up | 10,000 | 10% |
| 2 | Hydra Head Setup | Hydra devnet, session workflow, unit tests | 12,000 | 20% |
| 3 | CIP-68 VCT Pipeline | Metadata schema, mint + settlement flow | 13,000 | 40% |
| 4 | Full Inspection Workflow MVP | End-to-end UI + Hydra + AI + QR demo | 15,000 | 60% |
| 5 | Public Testnet Deployment | Public Hydra endpoint, frontend/backend, guides | 12,000 | 80% |
| 6 | Community Testing & Final Report | ≥300 inspection tests, final report, code freeze | 13,000 | 100% |

> Pitch deck context: ~75% of funds cover engineering/GPU/cloud resources, ~15% go to infra (Hydra nodes, IPFS/B2, testnet ops), and ~10% support documentation plus community workshops/demos.

## Deliverables & Evidence
- GitHub repos covering frontend, backend, AI service, Hydra scripts, and infra.
- Hydra logs + scripts proving devnet setup and workflow execution.
- Testnet explorer links validating minted VCTs.
- Public video demo of the full workflow (month 4 target).
- Test instructions + public Hydra endpoint (month 5).
- Final public report summarizing community testing (>300 runs) and code freeze (month 6).

## Value for Money
- Provides a flagship Hydra reference implementation for real industrial use cases.
- Demonstrates AI + L2 scalability, keeping L1 lean via selective settlement.
- Drives on-chain activity with CIP-68 tokens backed by verifiable evidence.
- Open-source code unlocks reuse across insurance, logistics, inspection services, and beyond.

## Team Snapshot (from pitch deck)
- **Maulana Anjari Anggorokasih** – Project lead / blockchain engineer.
- **Anugrah Muttaqien** – Backend & Hydra integration.
- **Rifqi Mukhammad** – Infra & DevOps automation.
- **Azfar Azdi Arfakhsyad** – AI/ML engineer (YOLO specialization).
- **Farhan Franaka** – Frontend/PWA engineer.

## Risks & Mitigations
- **Hydra readiness** – Dedicated milestone (month 2) plus repeatable scripts enable early validation.
- **AI accuracy** – Base model must recognize ≥5 damage types; ongoing dataset improvements keep confidence high.
- **Adoption & testing** – Public endpoints, documentation, and community workshops in months 5–6 ensure real users exercise the stack before final report.
