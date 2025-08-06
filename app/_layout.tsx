import Header from "@/components/Header";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./(tabs)/index";
import Login from "./(tabs)/login";
import Favorites from "./(tabs)/saved";
import MovieDetail from "./movies/[id]";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: "#16171B",
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: "#EC8B00",
                        height: 3,
                    },
                    tabBarLabelStyle: {
                        fontWeight: "bold",
                        fontSize: 14,
                    },
                    tabBarActiveTintColor: "#EC8B00",
                    tabBarInactiveTintColor: "#A9A9A9",
                }}
            >
                <Tab.Screen
                    name="home"
                    component={Home}
                    options={{ title: "Todos os Filmes" }}
                />
                <Tab.Screen
                    name="favorites"
                    component={Favorites}
                    options={{ title: "Filmes Favoritos" }}
                />
            </Tab.Navigator>
        </View>
    );
}

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#0D0E14"
                translucent={false}
            />
            <View style={{ flex: 1, backgroundColor: "#0D0E14" }}>
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: "#0D0E14" }
                    }}
                >
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ 
                            headerShown: false,
                            gestureEnabled: false 
                        }}
                    />
                    <Stack.Screen
                        name="Tabs"
                        component={TabNavigator}
                        options={{ 
                            headerShown: false,
                            gestureEnabled: false 
                        }}
                    />
                    <Stack.Screen
                        name="Detalhes"
                        component={MovieDetail}
                        options={{
                            headerShown: false,
                            animation: 'fade'
                        }}
                    />
                </Stack.Navigator>
            </View>
        </SafeAreaProvider>
    );
}