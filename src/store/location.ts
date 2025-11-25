import { locations } from "@/constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";


export type Location = typeof locations.work;

// Define the state interface
interface LocationState {
  activeLocation: Location;
  setActiveLocation: (location: Location | null) => void;
  resetActiveLocation: () => void;
}

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create<LocationState>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location: Location | null = null) => 
      set((state) => {
        state.activeLocation = location ?? DEFAULT_LOCATION;
      }),
    
    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  }))
);

export default useLocationStore;