import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { useObject, useRealm } from '../../store/realm';
import { Song } from '../../store/realm/schema';
import { Realm } from '@realm/react';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function SongDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const song = useObject(Song, new Realm.BSON.ObjectId(id));
    const realm = useRealm();

    // Font size state
    const [fontSize, setFontSize] = useState(18);

    if (!song) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Song not found</Text>
            </View>
        );
    }

    const toggleFavorite = () => {
        realm.write(() => {
            song.isFavorite = !song.isFavorite;
        });
    };

    const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 40));
    const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));

    return (
        <>
            <Stack.Screen options={{ title: song.title }} />
            <View className="flex-1 bg-white relative">
                <ScrollView className="flex-1 p-4 mb-20">
                    <View className="mb-6">
                        <Text className="text-gray-500 text-center text-lg font-bold mb-1">Song #{song.number}</Text>
                        <Text className="text-2xl font-bold text-center mb-2">{song.title}</Text>
                        <Text className="text-gray-400 text-center">{song.category} • {song.key || 'No Key'}</Text>
                    </View>

                    <Text style={{ fontSize, lineHeight: fontSize * 1.5 }} className="text-gray-800 text-center pb-10">
                        {song.lyrics}
                    </Text>
                </ScrollView>

                {/* Floating Task Bar */}
                <View
                    className="absolute bottom-6 left-4 right-4 bg-white rounded-2xl shadow-lg border border-gray-100 flex-row items-center justify-around p-4"
                    style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 5
                    }}
                >
                    <Pressable onPress={decreaseFontSize} className="p-2 active:bg-gray-100 rounded-full">
                        <FontAwesome name="minus" size={20} color="#374151" />
                    </Pressable>

                    <View className="items-center">
                        <Text className="text-xs text-gray-500 mb-1">Size: {fontSize}</Text>
                        <Text className="font-bold text-gray-700">Aa</Text>
                    </View>

                    <Pressable onPress={increaseFontSize} className="p-2 active:bg-gray-100 rounded-full">
                        <FontAwesome name="plus" size={20} color="#374151" />
                    </Pressable>

                    <View className="w-[1px] h-8 bg-gray-200 mx-2" />

                    <Pressable onPress={toggleFavorite} className="p-2 active:bg-gray-100 rounded-full">
                        <FontAwesome
                            name={song.isFavorite ? "heart" : "heart-o"}
                            size={24}
                            color={song.isFavorite ? "#ef4444" : "#9ca3af"}
                        />
                    </Pressable>
                </View>
            </View>
        </>
    );
}
