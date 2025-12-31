import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define available theme colors
export const THEME_COLORS = {
    violet: '#7c3aed',
    blue: '#2563eb',
    green: '#16a34a',
    red: '#dc2626',
    orange: '#ea580c',
    pink: '#db2777',
};

export type ThemeColorKey = keyof typeof THEME_COLORS;

interface ThemeState {
    themeName: ThemeColorKey;
    primaryColor: string;
    isDarkMode: boolean;
    hasHydrated: boolean;
    setTheme: (name: ThemeColorKey) => void;
    toggleDarkMode: () => void;
    setHasHydrated: (state: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            themeName: 'violet',
            primaryColor: THEME_COLORS.violet, // Default
            isDarkMode: false,
            hasHydrated: false,
            setTheme: (name) => set({
                themeName: name,
                primaryColor: THEME_COLORS[name]
            }),
            toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
            setHasHydrated: (state) => set({ hasHydrated: state })
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            }
        }
    )
);
