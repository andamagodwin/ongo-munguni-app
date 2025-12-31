import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, ScrollView, Pressable, Platform, Share, Alert } from 'react-native';
import { useObject, useRealm } from '../../store/realm';
import { Song } from '../../store/realm/schema';
import { Realm } from '@realm/react';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useThemeStore } from '../../store/theme';

export default function SongDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const song = useObject(Song, new Realm.BSON.ObjectId(id));
    const realm = useRealm();
    const { primaryColor, isDarkMode } = useThemeStore();

    // Font size state
    const [fontSize, setFontSize] = useState(18);

    if (!song) {
        return (
            <View className="flex-1 items-center justify-center dark:bg-black">
                <Text className="dark:text-white">Song not found</Text>
            </View>
        );
    }

    const toggleFavorite = () => {
        realm.write(() => {
            song.isFavorite = !song.isFavorite;
        });
    };

    const shareSong = async () => {
        try {
            await Share.share({
                message: `${song.title}\n\n${song.category}\n\n${song.lyrics}\n\nShared from Ongo Munguni App`,
                title: song.title,
            });
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 40));
    const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));

    return (
        <>
            <Stack.Screen options={{ title: song.title }} />
            <View className="flex-1 bg-white dark:bg-black relative">
                <ScrollView className="flex-1 p-4 mb-20">
                    <View className="mb-6 items-center">
                        <View className="px-3 py-1 rounded-full mb-2" style={{ backgroundColor: `${primaryColor}20` }}>
                            <Text className="font-bold text-sm" style={{ color: primaryColor }}>Song #{song.number}</Text>
                        </View>
                        <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-1">{song.title}</Text>
                        <Text className="text-gray-500 text-center">{song.category}</Text>
                    </View>

                    <Text style={{ fontSize, lineHeight: fontSize * 1.5 }} className="text-gray-800 dark:text-gray-200 text-center pb-10">
                        {song.lyrics}
                    </Text>
                </ScrollView>

                {/* Floating Task Bar */}
                <View
                    className="absolute bottom-6 left-4 right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex-row items-center justify-around p-4"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 5
                    }}
                >
                    <Pressable
                        onPress={decreaseFontSize}
                        className="p-3 bg-gray-50 dark:bg-gray-800 rounded-full"
                        style={({ pressed }) => ({
                            backgroundColor: pressed ? `${primaryColor}20` : (isDarkMode ? '#374151' : '#f9fafb')
                        })}
                    >
                        <FontAwesome name="minus" size={16} color={isDarkMode ? "#e5e7eb" : "#4b5563"} />
                    </Pressable>

                    <View className="items-center">
                        <Text className="text-xs text-gray-400 mb-1">Size: {fontSize}</Text>
                        <Text className="font-bold text-gray-800 dark:text-white text-lg">Aa</Text>
                    </View>

                    <Pressable
                        onPress={increaseFontSize}
                        className="p-3 bg-gray-50 dark:bg-gray-800 rounded-full"
                        style={({ pressed }) => ({
                            backgroundColor: pressed ? `${primaryColor}20` : (isDarkMode ? '#374151' : '#f9fafb')
                        })}
                    >
                        <FontAwesome name="plus" size={16} color={isDarkMode ? "#e5e7eb" : "#4b5563"} />
                    </Pressable>

                    <View className="w-[1px] h-8 bg-gray-200 dark:bg-gray-600 mx-2" />

                    <Pressable onPress={toggleFavorite} className="p-2 active:bg-gray-100 dark:active:bg-gray-700 rounded-full">
                        <FontAwesome
                            name={song.isFavorite ? "heart" : "heart-o"}
                            size={24}
                            color={song.isFavorite ? "#ef4444" : (isDarkMode ? "#9ca3af" : "#9ca3af")}
                        />
                    </Pressable>

                    <Pressable onPress={shareSong} className="p-2 active:bg-gray-100 dark:active:bg-gray-700 rounded-full ml-2">
                        <FontAwesome name="share-alt" size={24} color={isDarkMode ? "#9ca3af" : "#4b5563"} />
                    </Pressable>
                </View>
            </View>
        </>
    );
}
