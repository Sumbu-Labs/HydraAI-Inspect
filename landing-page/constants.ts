import { Zap, Layers, ShieldCheck, Car, Camera, FileText, CheckCircle, Activity, Link, Users, BadgeDollarSign, Wrench, Building } from 'lucide-react';

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#process' },
  { label: 'Technology', href: '#tech' },
  { label: 'Benefits', href: '#benefits' },
];

export const FEATURES = [
  {
    title: 'Instant AI Analysis',
    description: 'Computer vision models detect vehicle damages (scratches, dents, cracks) in seconds with high precision.',
    icon: Zap,
  },
  {
    title: 'Hydra L2 Scalability',
    description: 'Experience lightning-fast transaction settlement and near-zero fees using Cardano’s Hydra Head protocol.',
    icon: Layers,
  },
  {
    title: 'Blockchain-Verified',
    description: 'Every inspection is minted as a CIP-68 token, ensuring the vehicle history is immutable and tamper-proof.',
    icon: ShieldCheck,
  },
];

export const PROCESS_STEPS = [
  {
    id: 1,
    title: 'Upload Photos',
    description: 'Take 3–6 clear images of the vehicle from different angles using our mobile web app.',
    icon: Camera,
  },
  {
    id: 2,
    title: 'AI Detects Damages',
    description: 'Our fine-tuned YOLO11m model identifies scratches, dents, broken lamps, and glass damage.',
    icon: Activity,
  },
  {
    id: 3,
    title: 'Generate Report',
    description: 'Receive a comprehensive score, severity assessment, and confidence metrics instantly.',
    icon: FileText,
  },
  {
    id: 4,
    title: 'Mint Certification',
    description: 'A CIP-68 NFT is minted on Cardano Testnet via Hydra, locking the state forever.',
    icon: CheckCircle,
  },
];

export const BENEFITS = [
  { title: 'Used-Car Dealers', icon: Car, description: 'Build trust with transparent, verifiable reports.' },
  { title: 'Insurance Claims', icon: FileText, description: 'Accelerate claim processing with automated damage assessment.' },
  { title: 'Fleet Inspections', icon: Activity, description: 'Monitor fleet health in real-time with batch processing.' },
  { title: 'Valuation', icon: BadgeDollarSign, description: 'Accurate pricing based on objective AI condition scoring.' },
  { title: 'Maintenance', icon: Wrench, description: 'Keep an immutable history of repairs and condition.' },
  { title: 'Peer-to-Peer', icon: Users, description: 'Sell your car with a verified digital certificate.' },
];

export const FAQS = [
  {
    question: 'How accurate is the AI analysis?',
    answer: 'Our system uses a fine-tuned YOLO11m model trained on over 50,000 labeled vehicle damage images, achieving a mean average precision (mAP) of over 85%.',
  },
  {
    question: 'Why use Cardano and Hydra?',
    answer: 'Cardano provides rock-solid security and uptime. Hydra Layer 2 allows us to process inspections instantly with negligible gas fees, making high-volume enterprise use viable.',
  },
  {
    question: 'Is the certificate secure?',
    answer: 'Yes. The inspection data is hashed and stored on IPFS, while the proof of existence and metadata are minted as a native asset (NFT) on the blockchain.',
  },
  {
    question: 'Can I verify a certificate manually?',
    answer: 'Absolutely. Anyone can view the public ledger or scan the QR code on the certificate to verify its authenticity against the Cardano blockchain.',
  },
];
