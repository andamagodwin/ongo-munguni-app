import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Song } from '../store/realm/schema';

interface SongListItemProps {
    song: Song;
}

export const SongListItem = ({ song }: SongListItemProps) => {
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
                {song.isFavorite && (
                    <Text className="text-yellow-500 ml-2">★</Text>
                )}
            </Pressable>
        </Link>
    );
};
