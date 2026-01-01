import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text, SectionList, Pressable, Alert, Linking, Share } from 'react-native';
import { useRealm, useQuery } from '../store/realm';
import { useThemeStore, THEME_COLORS, ThemeColorKey } from '../store/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Application from 'expo-application';

type SettingItem = {
  label: string;
  value?: string;
  icon: keyof typeof FontAwesome.glyphMap;
  onPress: () => void;
  color?: string;
};

type SettingSection = {
  title: string;
  data: SettingItem[];
};

const ThemeSelector = () => {
  const { themeName, setTheme } = useThemeStore();

  return (
    <View>
      <Text className="px-4 py-3 text-xs font-poppins-bold text-gray-500 uppercase mt-4">Theme</Text>
      <View className="px-4 py-4 bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700 flex-row justify-between">
        {(Object.keys(THEME_COLORS) as ThemeColorKey[]).map((colorKey) => (
          <Pressable
            key={colorKey}
            onPress={() => setTheme(colorKey)}
            className={`w-10 h-10 rounded-full items-center justify-center ${themeName === colorKey ? 'border-2 border-gray-400' : ''}`}
            style={{ backgroundColor: THEME_COLORS[colorKey] }}
          >
            {themeName === colorKey && <FontAwesome name="check" size={14} color="white" />}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default function Settings() {
  const realm = useRealm();
  const version = Application.nativeApplicationVersion || '1.0.0';
  const { themeName, setTheme, primaryColor, isDarkMode, toggleDarkMode } = useThemeStore();

  const sections: SettingSection[] = [
    {
      title: 'About',
      data: [
        {
          label: 'Version',
          value: version,
          icon: 'info-circle',
          onPress: () => { },
        },
        {
          label: 'Developer',
          value: 'Andama Godwin',
          icon: 'code',
          onPress: () => Linking.openURL('https://github.com/andamagodwin').catch(() => { }),
        },
        {
          label: 'Song Editor',
          value: 'Opifeni Timothy',
          icon: 'pencil',
          onPress: () => { },
        },
      ],
    },
    {
      title: 'Appearance',
      data: [
        {
          label: 'Dark Mode',
          icon: 'moon-o',
          onPress: toggleDarkMode,
          value: isDarkMode ? 'On' : 'Off',
        }
      ]
    },
    {
      title: 'Support',
      data: [
        {
          label: 'Share App',
          icon: 'share-alt',
          onPress: async () => {
            try {
              await Share.share({
                message: 'Check out OngoMunguni - A Lugbara Songbook App with 272 hymns!\n\nDownload: https://play.google.com/store/apps/details?id=com.andama.ongomunguniapp',
                title: 'OngoMunguni - Lugbara Songbook',
              });
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    }
  ];

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <SectionList
        sections={sections}
        ListHeaderComponent={ThemeSelector}
        keyExtractor={(item, index) => item.label + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="px-4 py-3 text-xs font-poppins-bold text-gray-500 uppercase mt-4">
            {title}
          </Text>
        )}
        renderItem={({ item, index, section }) => {
          const dataItem = item as SettingItem;
          return (
            <Pressable
              onPress={dataItem.onPress}
              className={`flex-row items-center justify-between px-4 py-3 bg-white dark:bg-black border-gray-100 dark:border-gray-700 ${index === 0 ? 'border-t' : ''
                } ${index === section.data.length - 1 ? 'border-b' : 'border-b'}`}
            >
              <View className="flex-row items-center">
                <View className={`w-8 h-8 rounded-lg items-center justify-center mr-3`} style={{ backgroundColor: dataItem.color ? '#fef2f2' : (isDarkMode ? `${primaryColor}30` : `${primaryColor}20`) }}>
                  <FontAwesome name={dataItem.icon} size={16} color={dataItem.color || primaryColor} />
                </View>
                <Text className={`text-base font-sans ${dataItem.color ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{dataItem.label}</Text>
              </View>
              <View className="flex-row items-center">
                {dataItem.value && <Text className="text-gray-500 mr-2 font-sans">{dataItem.value}</Text>}
                {!dataItem.value && <FontAwesome name="chevron-right" size={12} color="#4b5563" />}
              </View>
            </Pressable>
          )
        }}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}
