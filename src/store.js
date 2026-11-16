import { create } from 'zustand';

export const useSearchStore = create((set) => ({
  visible: false,

  toggle: () => set((s) => ({ visible: !s.visible })),
  hide: () => set((s) => ({ visible: false })),
}));