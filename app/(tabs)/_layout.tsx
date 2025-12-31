import { Link, Tabs } from 'expo-router';
import { View } from 'react-native';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { useThemeStore } from '../../store/theme';

export default function TabLayout() {
  const { primaryColor, isDarkMode } = useThemeStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: isDarkMode ? '#9ca3af' : '#6b7280',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: primaryColor,
        },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#000000' : '#ffffff',
          borderTopColor: isDarkMode ? '#1f2937' : '#e5e7eb',
        },
        tabBarBackground: () => (
          <View className="flex-1 bg-white dark:bg-black" />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ongo',
          tabBarIcon: ({ color }) => <TabBarIcon name="music" color={color} />,
          headerRight: () => (
            <Link href="/settings" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
    </Tabs>
  );
}
