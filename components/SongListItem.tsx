import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Song } from '../store/realm/schema';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRealm } from '../store/realm';

interface SongListItemProps {
    song: Song;
}

export const SongListItem = ({ song }: SongListItemProps) => {
    const realm = useRealm();

    const toggleFavorite = (e: any) => {
        // Prevent default Link behavior (navigation)
        e.preventDefault();

        realm.write(() => {
            song.isFavorite = !song.isFavorite;
        });
    };

    return (
        <Link href={`/song/${song._id.toHexString()}`} asChild>
            <Pressable className="flex-row items-center justify-between p-4 border-b border-gray-200 active:bg-gray-100">
                <View className="flex-row items-center flex-1">
                    <Text className="text-lg font-bold text-gray-500 w-12">{song.number}</Text>
                    <View className="flex-1">
                        <Text className="text-lg font-semibold text-gray-900" numberOfLines={1}>
                            {song.title}
                        </Text>
                        <Text className="text-sm text-gray-500">{song.category}</Text>
                    </View>
                </View>

                <Pressable onPress={toggleFavorite} className="p-2">
                    <FontAwesome
                        name={song.isFavorite ? "heart" : "heart-o"}
                        size={24}
                        color={song.isFavorite ? "#ef4444" : "#9ca3af"}
                    />
                </Pressable>
            </Pressable>
        </Link>
    );
};
