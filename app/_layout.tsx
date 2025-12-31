import '../global.css';
import { RealmProvider } from '../store/realm';

import { Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <RealmProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#7c3aed',
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
