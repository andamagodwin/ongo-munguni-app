import '../global.css';
import { RealmProvider } from '../store/realm';
import { Stack } from 'expo-router';
import { useThemeStore } from '../store/theme';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const { primaryColor, isDarkMode, hasHydrated } = useThemeStore();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    if (hasHydrated) {
      setColorScheme(isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, hasHydrated]);

  if (!hasHydrated) {
    return null; // Or a SplashScreen
  }

  return (
    <RealmProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTintColor: '#fff',
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
      </Stack>
    </RealmProvider>
  );
}
