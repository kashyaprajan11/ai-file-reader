import { create } from "zustand";

type FeatureStore = {
  inViewFeature: number | null;
  setInViewFeature: (feature: number | null) => void;
};

export const useFeatureStore = create<FeatureStore>((set) => ({
  inViewFeature: null,
  setInViewFeature: (feature: number | null) => set({ inViewFeature: feature }),
}));
