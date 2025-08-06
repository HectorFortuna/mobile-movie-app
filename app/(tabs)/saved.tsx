import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

const SAVED_MOVIES_KEY = 'SAVED_MOVIES';

interface Movie {
    id: number;
    title: string;
    poster_path?: string;
}

const Saved = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const router = useRouter();

    useFocusEffect(
        React.useCallback(() => {
            const fetchSavedMovies = async () => {
                const saved = await AsyncStorage.getItem(SAVED_MOVIES_KEY);
                setMovies(saved ? JSON.parse(saved) : []);
            };
            fetchSavedMovies();
        }, [])
    );

    return (
        <View className="flex-1 bg-primary px-4 py-6">
            <Text className="text-white text-xl font-bold mb-4">Filmes Salvos</Text>

            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 80 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => router.push(`/movies/${item.id}`)}
                        className="flex-row items-center mb-4"
                    >
                        <Image
                            source={{
                                uri: item.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                    : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
                            }}
                            className="w-[60px] h-[90px] rounded-lg mr-4"
                            resizeMode="cover"
                        />
                        <Text className="text-white text-base font-semibold">{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default Saved;
