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
  const { primaryColor, isDarkMode } = useThemeStore();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

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
