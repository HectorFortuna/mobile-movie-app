import Header from "@/components/Header";
import MovieInfoGrid from "@/components/MovieInfoGrid";
import { fetchMovieDetails } from "@/services/api";
import { isMovieSaved, removeMovie, saveMovie } from "@/services/storage";
import useFetch from "@/services/useFetch";
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";


const { width } = Dimensions.get('window');
    const [headerBackground, setHeaderBackground] = useState("transparent");


const Details = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const scrollY = new Animated.Value(0);
    const { id } = (route.params as { id: string | number });
    const shouldFetch = typeof id === "string" || typeof id === "number";

    const fetcher = shouldFetch
        ? () => fetchMovieDetails(String(id))
        : () => Promise.resolve(null as any);

    const { data: movie, loading, error } = useFetch(fetcher);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (movie?.id) {
            isMovieSaved(movie.id).then(setSaved);
        }
    }, [movie?.id]);

    useEffect(() => {
        scrollY.addListener(({ value }) => {
            if (value > 50) {
                setHeaderBackground("#16171B");
            } else {
                setHeaderBackground("transparent");
            }
        });
        return () => {
            scrollY.removeAllListeners();
        };
    }, []);

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
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#EC8B00" />
            </View>
        );
    }

    if (!movie) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Nenhum dado disponível.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />

            <Header
                showBackButton
                showFavoriteButton
                isFavorite={saved}
                onFavoritePress={toggleSave}
            />

            <Animated.ScrollView 
                style={styles.scrollView}
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                <Image
                    source={{
                        uri: movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://via.placeholder.com/500x750?text=No+Image",
                    }}
                    style={styles.posterImage}
                />

                <View style={styles.content}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.sinopsis}>SINOPSE</Text>
                    <Text style={styles.overview}>{movie.overview}</Text>
                </View>

                <MovieInfoGrid

                    rating={movie.vote_average}
                    releaseDate={movie.release_date}
                    votes={movie.vote_count}
                    popularity={movie.popularity}
                    />

            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16171B",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#16171B",
    },
    errorText: {
        color: "#FFFFFF",
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
    },
    posterImage: {
        width: width,
        height: width * 1.5,
        resizeMode: "cover",
    },
    content: {
        padding: 20,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    overview: {
        color: "#FFFFFF",
        fontSize: 16,
        lineHeight: 24,
    },
    sinopsis:{
        paddingTop:25,
        fontSize: 14,
        color: '#EC8B00',
        paddingBottom: 20,

    }
});

export default Details;
