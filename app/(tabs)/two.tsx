import { Stack } from 'expo-router';
import { FlatList, View, Text } from 'react-native';
import { useQuery } from '../../store/realm';
import { Song } from '../../store/realm/schema';
import { SongListItem } from '../../components/SongListItem';

export default function Favorites() {
  const favoriteSongs = useQuery(Song).filtered('isFavorite == true').sorted('number');

  return (
    <>
      <Stack.Screen options={{ title: 'Favorites' }} />
      <View className="flex-1 bg-white">
        {favoriteSongs.length === 0 ? (
          <View className="flex-1 items-center justify-center p-4">
            <Text className="text-gray-500 text-lg">No favorites yet.</Text>
          </View>
        ) : (
          <FlatList
            data={favoriteSongs}
            keyExtractor={(item) => item._id.toHexString()}
            renderItem={({ item }) => <SongListItem song={item} />}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </>
  );
}
