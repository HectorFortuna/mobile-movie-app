import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";

const Index = () => {
    const router = useRouter();
    
    const handleLogout = () => {
        console.log("Logout clicado");
    };

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch(() => fetchMovies({ query: "" }));

    return (
        <View style={{backgroundColor:"#16171B"}} className="flex-1 bg-primary">


            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
            >

                {moviesLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="##16171B"
                        className="mt-10 self-center"
                    />
                ) : moviesError ? (
                    <Text>Error: {moviesError?.message}</Text>
                ) : (
                    <View className="flex-1 mt-5">

                        <FlatList
                            style={{
                                paddingTop: 40,
                            }}
                            data={movies}
                            renderItem={({ item }) => <MovieCard {...item} />}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={2}
                            columnWrapperStyle={{
                                justifyContent: "space-between",
                                gap:20,
                            }}
                            contentContainerStyle={{
                                paddingHorizontal:3,
                                paddingBottom:32,
                            }}
                            scrollEnabled={false}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Index;
