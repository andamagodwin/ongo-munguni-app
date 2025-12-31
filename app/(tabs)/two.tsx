import { Stack } from 'expo-router';
import { FlatList, View, Text, Pressable, Alert } from 'react-native';
import { useQuery, useRealm } from '../../store/realm';
import { Song } from '../../store/realm/schema';
import { SongListItem } from '../../components/SongListItem';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Favorites() {
  const realm = useRealm();
  const favoriteSongs = useQuery(Song).filtered('isFavorite == true').sorted('number');

  const clearFavorites = () => {
    if (favoriteSongs.length === 0) return;

    Alert.alert(
      'Clear Favorites',
      'Are you sure you want to remove all songs from favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            realm.write(() => {
              favoriteSongs.forEach(song => {
                song.isFavorite = false;
              });
            });
          }
        }
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Favorites',
          headerRight: () => (
            favoriteSongs.length > 0 && (
              <Pressable onPress={clearFavorites} className="mr-4 active:opacity-50">
                <FontAwesome name="trash-o" size={24} color="white" />
              </Pressable>
            )
          )
        }}
      />
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
