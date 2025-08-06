import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";
import {
    isMovieSaved,
    saveMovie,
    removeMovie,
} from "@/services/storage";

interface MovieInfoProps {
    label: string;
    value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">{label}</Text>
        <Text className="text-light-100 font-bold text-sm mt-2">
            {value || "N/A"}
        </Text>
    </View>
);

const Details = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const shouldFetch = typeof id === "string" && id !== "";

    const fetcher = shouldFetch
        ? () => fetchMovieDetails(id)
        : () => Promise.resolve(null as unknown as MovieDetails);

    const { data: movie, loading, error } = useFetch(fetcher);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (movie?.id) {
            isMovieSaved(movie.id).then(setSaved);
        }
    }, [movie?.id]);

    const toggleSave = async () => {
        if (!movie) return;

        try {
            if (saved) {
                await removeMovie(movie.id);
                setSaved(false);
            } else {
                await saveMovie({
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                });
                setSaved(true);
            }
        } catch (err) {
            Alert.alert("Erro", "Não foi possível atualizar os favoritos.");
        }
    };

    if (loading) {
        return (
            <SafeAreaView className="bg-primary flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#fff" />
            </SafeAreaView>
        );
    }

    if (!movie) {
        return (
            <SafeAreaView className="bg-primary flex-1 items-center justify-center">
                <Text className="text-white text-base">Nenhum dado disponível.</Text>
            </SafeAreaView>
        );
    }

    return (
        <View className="bg-primary flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                <View>
                    <Image
                        source={{
                            uri: movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://via.placeholder.com/500x750?text=No+Image",
                        }}
                        className="w-full h-[550px]"
                        resizeMode="stretch"
                    />

                    <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
                        <Image
                            source={icons.play}
                            className="w-6 h-7 ml-1"
                            resizeMode="stretch"
                        />
                    </TouchableOpacity>
                </View>

                <View className="flex-col items-start justify-center mt-5 px-5">
                    <Text className="text-white font-bold text-xl">{movie.title}</Text>

                    <View className="flex-row items-center gap-x-1 mt-2">
                        <Text className="text-light-200 text-sm">
                            {movie.release_date?.split("-")[0]} •
                        </Text>
                        <Text className="text-light-200 text-sm">{movie.runtime}m</Text>
                    </View>

                    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                        <Image source={icons.star} className="size-4" />
                        <Text className="text-white font-bold text-sm">
                            {Math.round(movie.vote_average ?? 0)}/10
                        </Text>
                        <Text className="text-light-200 text-sm">
                            ({movie.vote_count} votes)
                        </Text>
                    </View>

                    <MovieInfo label="Overview" value={movie.overview} />
                    <MovieInfo
                        label="Genres"
                        value={movie.genres?.map((g) => g.name).join(" • ") || "N/A"}
                    />

                    <View className="flex flex-row justify-between w-1/2">
                        <MovieInfo
                            label="Budget"
                            value={`$${(movie.budget ?? 0) / 1_000_000} million`}
                        />
                        <MovieInfo
                            label="Revenue"
                            value={`$${Math.round((movie.revenue ?? 0) / 1_000_000)} million`}
                        />
                    </View>

                    <MovieInfo
                        label="Production Companies"
                        value={
                            movie.production_companies?.map((c) => c.name).join(" • ") ||
                            "N/A"
                        }
                    />
                </View>
            </ScrollView>

            {/* Botão de favorito */}
            <TouchableOpacity
                className="absolute bottom-20 left-0 right-0 mx-5 bg-dark-100 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                onPress={toggleSave}
            >
                <Text className="text-white font-semibold text-base">
                    {saved ? "❤️ Remover dos Favoritos" : "🤍 Salvar como Favorito"}
                </Text>
            </TouchableOpacity>

            {/* Botão voltar */}
            <TouchableOpacity
                className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                onPress={router.back}
            >
                <Image
                    source={icons.arrow}
                    className="size-5 mr-1 mt-0.5 rotate-180"
                    tintColor="#fff"
                />
                <Text className="text-white font-semibold text-base">Voltar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Details;
