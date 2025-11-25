export enum AppView {
  ONBOARDING = 'ONBOARDING',
  UPLOAD = 'UPLOAD',
  ANALYSIS = 'ANALYSIS',
  RESULT = 'RESULT',
  TOKEN = 'TOKEN',
  HISTORY = 'HISTORY',
  SETTINGS = 'SETTINGS',
  INSPECTION_DETAILS = 'INSPECTION_DETAILS'
}

export interface VehicleInfo {
  label: string;
  plate: string;
  vin: string;
}

export enum DamageSeverity {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum DamageType {
  SHATTERED_GLASS = 'Shattered Glass',
  FLAT_TIRE = 'Flat Tire',
  BROKEN_LAMP = 'Broken Lamp',
  DENT = 'Dent',
  SCRATCH = 'Scratch',
  CRACK = 'Crack',
}

export interface Damage {
  id: string;
  type: DamageType;
  location: string;
  severity: DamageSeverity;
  severityScore: number; // 0-100
  confidence: number; // 0-100
}

export interface InspectionRecord {
  id: string;
  date: string;
  vehicle: VehicleInfo;
  damages: Damage[];
  score: number;
  status: 'Pending' | 'Analyzed' | 'Minted';
  txHash?: string;
  imageUrl: string;
}

export const DEFAULT_VEHICLE: VehicleInfo = {
  label: "2021 Tesla Model 3",
  plate: "AB-1234-CD",
  vin: "1HGCM82633A004352"
};