import { Stack } from 'expo-router';
import { FlatList, View, TextInput, Pressable, Text } from 'react-native';
import { useQuery } from '../../store/realm';
import { Song } from '../../store/realm/schema';
import { SongListItem } from '../../components/SongListItem';
import { useState, useMemo } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useThemeStore } from '../../store/theme';

export default function Home() {
  const songs = useQuery(Song);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState<'number' | 'title'>('number');
  const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
  const { primaryColor, isDarkMode } = useThemeStore();

  const filteredSongs = useMemo(() => {
    let result = songs;

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = songs.filtered(
        'title CONTAINS[c] $0 OR lyrics CONTAINS[c] $0 OR number == $1',
        lowerSearch,
        parseInt(search) || -1
      );
    }

    return result.sorted(sortOption);
  }, [songs, search, sortOption]);

  const toggleSort = (option: 'number' | 'title') => {
    setSortOption(option);
    setSortDropdownOpen(false);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Ongo Munguni' }} />
      <View className="flex-1 bg-white dark:bg-black relative">
        <View className="p-4 z-10">
          <View className="flex-row items-center gap-2">
            <TextInput
              className="flex-1 bg-gray-50 dark:bg-gray-800 dark:text-white p-4 rounded-lg font-sans"
              placeholder="Search by number, title, lyrics..."
              placeholderTextColor="#9ca3af"
              value={search}
              onChangeText={setSearch}
            />
            <Pressable
              onPress={() => setSortDropdownOpen(!isSortDropdownOpen)}
              className={`p-4 rounded-lg flex-row items-center gap-2 border`}
              style={{
                backgroundColor: isSortDropdownOpen ? `${primaryColor}10` : (isDarkMode ? '#1f2937' : 'white'),
                borderColor: isSortDropdownOpen ? `${primaryColor}50` : 'transparent'
              }}
            >
              <FontAwesome name="sort" size={20} color={isSortDropdownOpen ? primaryColor : "#6b7280"} />
            </Pressable>
          </View>

          {/* Custom Dropdown */}
          {isSortDropdownOpen && (
            <View className="absolute top-20 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 w-48" style={{ elevation: 5 }}>
              <Text className="px-4 py-2 text-xs font-poppins-bold text-gray-400 uppercase">Sort Order</Text>

              <Pressable
                onPress={() => toggleSort('number')}
                className={`px-4 py-3 flex-row items-center justify-between`}
                style={({ pressed }) => ({
                  backgroundColor: pressed || sortOption === 'number' ? `${primaryColor}10` : (isDarkMode ? '#1f2937' : 'white')
                })}
              >
                <Text className={`font-poppins-bold`} style={{ color: sortOption === 'number' ? primaryColor : (isDarkMode ? 'white' : '#374151') }}>Number (Default)</Text>
                {sortOption === 'number' && <FontAwesome name="check" size={14} color={primaryColor} />}
              </Pressable>

              <Pressable
                onPress={() => toggleSort('title')}
                className={`px-4 py-3 flex-row items-center justify-between`}
                style={({ pressed }) => ({
                  backgroundColor: pressed || sortOption === 'title' ? `${primaryColor}10` : (isDarkMode ? '#1f2937' : 'white')
                })}
              >
                <Text className={`font-poppins-bold`} style={{ color: sortOption === 'title' ? primaryColor : (isDarkMode ? 'white' : '#374151') }}>Title (A-Z)</Text>
                {sortOption === 'title' && <FontAwesome name="check" size={14} color={primaryColor} />}
              </Pressable>
            </View>
          )}
        </View>

        <FlatList
          data={filteredSongs}
          keyExtractor={(item) => item._id.toHexString()}
          renderItem={({ item }) => <SongListItem song={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          initialNumToRender={10}
          onTouchStart={() => setSortDropdownOpen(false)}
        />
      </View>
    </>
  );
}
