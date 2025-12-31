import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Song } from '../store/realm/schema';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRealm } from '../store/realm';
import { useThemeStore } from '../store/theme';

interface SongListItemProps {
    song: Song;
}

export const SongListItem = ({ song }: SongListItemProps) => {
    const realm = useRealm();
    const { primaryColor, isDarkMode } = useThemeStore();

    const toggleFavorite = (e: any) => {
        // Prevent default Link behavior (navigation)
        e.preventDefault();

        realm.write(() => {
            song.isFavorite = !song.isFavorite;
        });
    };

    return (
        <Link href={`/song/${song._id.toHexString()}`} asChild>
            <Pressable
                className="flex-row items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800"
                style={({ pressed }) => ({
                    backgroundColor: pressed ? `${primaryColor}10` : (isDarkMode ? '#000000' : 'white') // Ensure black for dark mode base
                })}
            >
                <View className="flex-row items-center flex-1">
                    <View
                        className="h-10 w-10 rounded-md items-center justify-center mr-4"
                        style={{ backgroundColor: `${primaryColor}20` }}
                    >
                        <Text className="text-lg font-bold" style={{ color: primaryColor }}>#{song.number}</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="text-lg font-semibold text-gray-900 dark:text-white" numberOfLines={1}>
                            {song.title}
                        </Text>
                        <Text className="text-sm text-gray-500">{song.category}</Text>
                    </View>
                </View>

                <Pressable onPress={toggleFavorite} className="p-2">
                    <FontAwesome
                        name={song.isFavorite ? "heart" : "heart-o"}
                        size={18}
                        color={song.isFavorite ? "#ef4444" : "#9ca3af"}
                    />
                </Pressable>
            </Pressable>
        </Link>
    );
};
