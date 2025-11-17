import { create } from 'zustand';
import type { InspectionResultProps } from '../components/InspectionResult';

export type InspectionStoreState = {
  inspections: InspectionResultProps[];
  setInspections: (items: InspectionResultProps[]) => void;
  addInspection: (item: InspectionResultProps) => void;
};

export const useInspectionStore = create<InspectionStoreState>((set) => ({
  inspections: [],
  setInspections: (items) => set({ inspections: items }),
  addInspection: (item) =>
    set((state) => ({
      inspections: [item, ...state.inspections]
    }))
}));
