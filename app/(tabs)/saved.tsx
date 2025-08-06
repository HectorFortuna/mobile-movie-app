import MovieCard from '@/components/MovieCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';

const SAVED_MOVIES_KEY = 'SAVED_MOVIES';

const Saved = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            const fetchSavedMovies = async () => {
                try {
                    setLoading(true);
                    const saved = await AsyncStorage.getItem(SAVED_MOVIES_KEY);
                    setMovies(saved ? JSON.parse(saved) : []);
                } finally {
                    setLoading(false);
                }
            };
            fetchSavedMovies();
        }, [])
    );

    return (
        <View style={{ backgroundColor: "#16171B" }} className="flex-1 bg-primary">
            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
            >
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#fff"
                        className="mt-10 self-center"
                    />
                ) : movies.length === 0 ? (
                    <Text className="text-white text-center mt-10 text-base">Nenhum filme salvo.</Text>
                ) : (
                    <View className="flex-1 mt-5">
                        <FlatList
                    style={{ paddingTop: 40 }}
                    data={
                        movies.length % 2 === 0
                        ? movies
                        : [...movies, { id: -1 } as Movie] 
                    }
                    renderItem={({ item }) =>
                        item.id === -1 ? (
                        <View style={{ flex: 1, marginBottom: 20 }} />
                        ) : (
                        <MovieCard {...item} />
                        )
                    }
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between', gap: 20 }}
                    contentContainerStyle={{ paddingHorizontal: 3, paddingBottom: 32 }}
                    scrollEnabled={false}
                    />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Saved;
