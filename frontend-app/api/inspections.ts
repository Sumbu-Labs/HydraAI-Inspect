import { api } from './client';

export interface CreateInspectionData {
    vehicleLabel?: string;
    plate: string;
    vin: string;
}

export interface Inspection {
    id: string;
    vehicleLabel: string;
    plate: string;
    vin: string;
    status: 'PENDING_UPLOAD' | 'PENDING_AI' | 'ANALYZED' | 'MINTED' | 'FAILED';
    totalDamages: number;
    avgConfidence: number;
    score: number;
    createdAt: string;
    images: { id: string; url: string }[];
    damages: {
        id: string;
        clazz: string;
        severity: 'LOW' | 'MEDIUM' | 'HIGH';
        confidence: number;
        bbox: { x: number; y: number; width: number; height: number };
    }[];
    vctToken?: {
        assetName: string;
        metadata: any;
    };
}

export const inspectionApi = {
    create: async (data: CreateInspectionData) => {
        const response = await api.post<{ status: string; data: Inspection }>('/inspections', data);
        return response.data.data; // Extract the actual inspection from the nested structure
    },

    uploadImages: async (id: string, files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('images', file);
        });

        const response = await api.post<{ status: string; data: Inspection }>(`/inspections/${id}/images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    },

    analyze: async (id: string) => {
        const response = await api.post<{ status: string; data: Inspection }>(`/inspections/${id}/analyze`);
        return response.data.data;
    },

    get: async (id: string) => {
        const response = await api.get<{ status: string; data: Inspection }>(`/inspections/${id}`);
        return response.data.data;
    },

    list: async (limit = 50, offset = 0) => {
        const response = await api.get<{ status: string; data: { inspections: Inspection[]; total: number } }>(
            `/inspections?limit=${limit}&offset=${offset}`
        );
        return response.data.data;
    },

    mint: async (id: string) => {
        const response = await api.post<{ status: string; data: Inspection }>(`/inspections/${id}/mint`);
        return response.data.data;
    },
};
