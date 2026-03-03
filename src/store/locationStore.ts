import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Location {
    id?: string;
    address: string;
    lat?: number;
    lng?: number;
    city: string;
}

interface LocationState {
    currentLocation: Location | null;
    savedLocations: Location[];
    setLocation: (location: Location) => void;
    addSavedLocation: (location: Location) => void;
    removeSavedLocation: (id: string) => void;
}

export const useLocationStore = create<LocationState>()(
    persist(
        (set, get) => ({
            currentLocation: null,
            savedLocations: [],
            setLocation: (location) => set({ currentLocation: location }),
            addSavedLocation: (location) => set({
                savedLocations: [...get().savedLocations, { ...location, id: Date.now().toString() }]
            }),
            removeSavedLocation: (id) => set({
                savedLocations: get().savedLocations.filter((l) => l.id !== id)
            })
        }),
        {
            name: 'location-storage'
        }
    )
);
