import { Inspection, InspectionImage, InspectionDamage, InspectionStatus, DamageClass, DamageSeverity, VctToken } from '@prisma/client';

export {
    InspectionStatus,
    DamageClass,
    DamageSeverity
};

export type {
    Inspection,
    InspectionImage,
    InspectionDamage,
    VctToken
};

export interface CreateInspectionDTO {
    vehicleLabel?: string;
    plate: string;
    vin: string;
}

export interface AddImageDTO {
    url: string;
    orderIndex: number;
}

export interface InspectionWithRelations extends Inspection {
    images: InspectionImage[];
    damages: InspectionDamage[];
}
