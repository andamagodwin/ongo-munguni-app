import '../global.css';
import { RealmProvider } from '../store/realm';
import { Stack } from 'expo-router';
import { useThemeStore } from '../store/theme';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Text, TextInput } from 'react-native';

SplashScreen.preventAutoHideAsync();

// Unstable: Set default font globally
// @ts-ignore
if (Text.defaultProps == null) Text.defaultProps = {};
// @ts-ignore
Text.defaultProps.style = { fontFamily: 'Poppins-Regular' };
// @ts-ignore
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
// @ts-ignore
TextInput.defaultProps.style = { fontFamily: 'Poppins-Regular' };

export default function RootLayout() {
  const { primaryColor, isDarkMode, hasHydrated } = useThemeStore();
  const { setColorScheme } = useColorScheme();

  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    if (hasHydrated && fontsLoaded) {
      setColorScheme(isDarkMode ? 'dark' : 'light');
      SplashScreen.hideAsync();
    }
  }, [isDarkMode, hasHydrated, fontsLoaded]);

  if (!hasHydrated || !fontsLoaded) {
    return null;
  }

  return (
    <RealmProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Bold',
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
