import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
export const usePreferences = create<{
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}>()(
  persist(
    (set) => ({ soundEnabled: true, setSoundEnabled: (soundEnabled) => set({ soundEnabled }) }),
    {
      name: 'bibleloop-preferences',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ soundEnabled }) => ({ soundEnabled }),
      merge: (saved, current) => ({
        ...current,
        soundEnabled:
          saved &&
          typeof saved === 'object' &&
          'soundEnabled' in saved &&
          typeof saved.soundEnabled === 'boolean'
            ? saved.soundEnabled
            : current.soundEnabled,
      }),
    },
  ),
);
