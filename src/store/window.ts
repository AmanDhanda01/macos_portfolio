import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@/constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { WritableDraft } from "immer";

interface WindowState {
  isOpen: boolean;
  zIndex: number;
  data: any;
}

interface WindowStoreState {
  windows: Record<string, WindowState>;
  nextZIndex: number;
  openWindow: (windowKey: string, data?: any) => void;
  closeWindow: (windowKey: string) => void;
  focusWindow: (windowKey: string) => void;
}

const useWindowStore = create<WindowStoreState>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey: string, data = null) =>
      set((state: WritableDraft<WindowStoreState>) => {
        const window = state.windows[windowKey];
        if (!window) return;
        window.isOpen = true;
        window.zIndex = state.nextZIndex;
        window.data = data || window.data;
        state.nextZIndex += 1;
      }),

    closeWindow: (windowKey: string) =>
      set((state: WritableDraft<WindowStoreState>) => {
        const window = state.windows[windowKey];
        if (!window) return;
        window.isOpen = false;
        window.zIndex = INITIAL_Z_INDEX;
        window.data = null;
      }),

    focusWindow: (windowKey: string) =>
      set((state: WritableDraft<WindowStoreState>) => {
        const window = state.windows[windowKey];
        window.zIndex = state.nextZIndex++;
      }),
  }))
);

export default useWindowStore;
