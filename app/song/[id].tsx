import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import { useObject } from '../../store/realm';
import { Song } from '../../store/realm/schema';
import { Realm } from '@realm/react';

export default function SongDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const song = useObject(Song, new Realm.BSON.ObjectId(id));

    if (!song) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Song not found</Text>
            </View>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: song.title }} />
            <ScrollView className="flex-1 bg-white p-4">
                <View className="mb-6">
                    <Text className="text-gray-500 text-center text-lg font-bold mb-1">Song #{song.number}</Text>
                    <Text className="text-2xl font-bold text-center mb-2">{song.title}</Text>
                    <Text className="text-gray-400 text-center">{song.category} • {song.key || 'No Key'}</Text>
                </View>

                <Text className="text-lg leading-8 text-gray-800 text-center pb-10">
                    {song.lyrics}
                </Text>
            </ScrollView>
        </>
    );
}
