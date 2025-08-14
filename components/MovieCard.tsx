import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Image, TouchableOpacity } from "react-native";

type RootStackParamList = {
    Detalhes: { id: number };
};

const MovieCard = ({
    id,
    poster_path,
}: Movie) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity
            testID="movie-card"
            style={{
                flex: 1,
                width: '50%',
                aspectRatio: 156 / 228,
                marginBottom: 20,
            }}
            onPress={() => navigation.navigate('Detalhes', { id })}
        >
            <Image
                testID="movie-poster"
                source={{
                    uri: poster_path
                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        : "https://placehold.co/600x400/1a1a1a/ffffff.png",
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 6,
                }}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );
};

export default MovieCard;