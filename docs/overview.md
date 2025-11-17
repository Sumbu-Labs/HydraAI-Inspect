# HydraAI Inspect Overview

HydraAI Inspect is an AI-driven vehicle inspection platform for Cardano. It leverages Hydra Head for high throughput, keeps workflow coordination inside a Node.js backend, and offloads inference to a dedicated AI microservice. Every inspection is anchored on-chain as a Vehicle Condition Token (VCT) backed by storage on IPFS/B2. The concept follows the [HydraAI Inspect Proposal.pdf](../HydraAI-Inspect-Proposal.pdf) and [HydraAI-Inspect Pitching.pdf](../HydraAI-Inspect-Pitching.pdf) briefs submitted to Catalyst Fund 15.

## Goals
- Automate the capture and analysis of vehicle photos using YOLO and damage heuristics.
- Persist inspection outcomes on Cardano through CIP-68 minting (VCT).
- Expose a transparent workflow for inspectors, auditors, and Catalyst stakeholders.

## Component Breakdown

### Frontend (React PWA)
- Upload vehicle photos and metadata from the field.
- Display AI-generated results, inspection status, and approvals.
- Provide QR codes and deep links to the minted VCT.

### Backend API (Node.js / TypeScript)
- Coordinate inspection sessions, orchestrating uploads, AI calls, and approvals.
- Communicate with the AI service for `/analyze` inference requests.
- Sync state with the Hydra Head cluster to maintain off-chain session data.
- Trigger CIP-68 minting on Cardano testnet and attach storage references.
- Push artifacts (images + JSON reports) to IPFS or Backblaze B2.

### AI Service (Python)
- REST endpoint (e.g., `/analyze`) that accepts vehicle images.
- Outputs damage types, bounding boxes, confidence values, and an overall condition score.

### Hydra Head Cluster
- Maintains off-chain session state: inspection status, AI outputs, and inspector approvals.
- Batches the finalized transactions and commits them to Cardano L1.

### Cardano Node (Testnet)
- Executes the CIP-68 mint to issue VCTs.
- Stores the final metadata hash and links to IPFS/B2 artifacts.

### Storage (IPFS / Backblaze)
- Stores raw vehicle photos and the complete inspection report JSON.
- Provides CID/URL references that are embedded into the token metadata.

## Problem Statement (from the proposal & pitch)
- Global used-car inspections (>$1T market) lack tamper-proof, shareable inspection records.
- Manipulated or fragmented inspection data erodes trust between buyers, sellers, and verifiers.
- Recording high-frequency inspection events directly on Cardano L1 is cost-prohibitive (≈5 ADA/inspection in the pitch deck).

## Solution Summary
1. Inspectors upload multi-angle photos via the PWA.
2. AI service detects damages, severity, and bounding boxes.
3. Backend stores intermediate state inside a Hydra Head session for instant confirmations and multi-party approvals.
4. Finalized inspection data plus assets are pinned to IPFS/B2.
5. Backend mints a CIP-68 Vehicle Condition Token (VCT) on Cardano testnet containing the metadata hash + storage links.

## Why Hydra (per pitch deck)
- High-throughput batching: handle thousands of inspection events per second.
- Near-instant finality for inspectors/dealerships operating in the field.
- Ultra-low fees vs. 5 ADA/inspection on L1.
- Multi-party verification in Hydra Heads for inspectors, dealers, and auditors.
- Selective settlement so only final approved inspections hit L1, keeping Cardano lean but auditable.

## Key Metrics & Targets
- Campaign: Cardano Use Cases — Prototype & Launch.
- Duration: 6 months.
- Budget request: ₳75,000 (detailed in `docs/catalyst-proposal.md`).
- Success targets from the PDFs:
  - ≥300 inspection tests before final report.
  - Public Hydra endpoint + testnet deployment by month 5.
  - Reference architecture + open-source repos delivered by month 1.
