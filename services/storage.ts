import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVED_MOVIES_KEY = "SAVED_MOVIES";

export const getSavedMovies = async () => {
    const saved = await AsyncStorage.getItem(SAVED_MOVIES_KEY);
    return saved ? JSON.parse(saved) : [];
};

export const isMovieSaved = async (id: number): Promise<boolean> => {
    const saved = await getSavedMovies();
    return saved.some((m: any) => m.id === id);
};

export const saveMovie = async (movie: { id: number; title: string; poster_path: string | null }) => {
    const saved = await getSavedMovies();
    const exists = saved.some((m: any) => m.id === movie.id);
    if (!exists) {
        saved.push(movie);
        await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(saved));
    }
};

export const removeMovie = async (id: number) => {
    const saved = await getSavedMovies();
    const updated = saved.filter((m: any) => m.id !== id);
    await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(updated));
};
