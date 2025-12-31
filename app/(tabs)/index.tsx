import { Stack } from 'expo-router';
import { FlatList, View, TextInput } from 'react-native';
import { useQuery } from '../../store/realm';
import { Song } from '../../store/realm/schema';
import { SongListItem } from '../../components/SongListItem';
import { useState, useMemo } from 'react';

export default function Home() {
  const songs = useQuery(Song);
  const [search, setSearch] = useState('');

  const filteredSongs = useMemo(() => {
    if (!search) return songs.sorted('number');
    const lowerSearch = search.toLowerCase();
    return songs.filtered(
      'title CONTAINS[c] $0 OR lyrics CONTAINS[c] $0 OR number == $1',
      lowerSearch,
      parseInt(search) || -1
    ).sorted('number');
  }, [songs, search]);

  return (
    <>
      <Stack.Screen options={{ title: 'Ongo Munguni' }} />
      <View className="flex-1 bg-white">
        <View className="p-4">
          <TextInput
            className="bg-gray-50 p-4 rounded-lg"
            placeholder="Search by number, title, lyrics..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <FlatList
          data={filteredSongs}
          keyExtractor={(item) => item._id.toHexString()}
          renderItem={({ item }) => <SongListItem song={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          initialNumToRender={10}
        />
      </View>
    </>
  );
}
