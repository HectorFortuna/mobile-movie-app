import { Nunito_400Regular, Nunito_700Bold, useFonts } from "@expo-google-fonts/nunito";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import { Alert, Image, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import logoutIcon from "@/assets/icons/Logout.png";

interface HeaderProps {
    onLogout?: () => void;
    showBackButton?: boolean;
    showFavoriteButton?: boolean;
    isFavorite?: boolean;
    onFavoritePress?: () => void;
}

export default function Header({
    onLogout,
    showBackButton = false,
    showFavoriteButton = false,
    isFavorite = false,
    onFavoritePress
}: HeaderProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
    });

    const handleLogout = () => {
        Alert.alert(
            "Sair",
            "Tem certeza que deseja sair do aplicativo?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                    onPress: () => setModalVisible(false)
                },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: () => {
                        setModalVisible(false);
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            })
                        );
                    }
                }
            ]
        );
    };

    if (!fontsLoaded) return null;

    return (
        <View
            style={{
                paddingTop: insets.top,
                height: showBackButton ? 90 : insets.top + 90,
                paddingHorizontal: 16,
                backgroundColor: showBackButton ? "transparent" : "#16171B",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                position: showBackButton ? "absolute" : "relative",
                left: 0,
                right: 0,
                top: 0,
                zIndex: 1,
            }}
        >
            {showBackButton ? (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={28} color="#FFFFFF" />
                </TouchableOpacity>
            ) : (
                <Text
                    style={{
                        color: "#FFFFFF",
                        fontSize: 26,
                        fontFamily: "Nunito_400Regular",
                    }}
                >
                    BRQ Movies
                </Text>
            )}

            {showFavoriteButton ? (
                <TouchableOpacity onPress={onFavoritePress}>
                    <AntDesign 
                        name={isFavorite ? "heart" : "hearto"} 
                        size={28} 
                        color={isFavorite ? "#EC8B00" : "#FFFFFF"} 
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{
                        backgroundColor: "#EC8B00",
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Entypo name="dots-three-vertical" size={16} color="black"/>
                </TouchableOpacity>
            )}

            {modalVisible && (
                <Modal
                    transparent
                    visible={modalVisible}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <Pressable
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                        onPress={() => setModalVisible(false)}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                position: "absolute",
                                top: insets.top + 70,
                                right: 16,
                                backgroundColor: "#16171B",
                                borderRadius: 8,
                                paddingVertical: 4,
                                paddingHorizontal: 0,
                                width: 117,
                                height: 44,
                                shadowColor: "#000",
                                shadowOffset: {width: 0, height: 2},
                                shadowOpacity: 0.3,
                                shadowRadius: 4,
                                elevation: 6,
                            }}
                        >
                            <Pressable
                                onPress={handleLogout}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems:"center",
                                    paddingVertical: 5,
                                    paddingLeft: 20,
                                }}
                            >
                                <Image
                                    source={logoutIcon}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        justifyContent:"center",
                                        resizeMode: "contain",
                                        marginRight: 5,
                                    }}
                                />
                                <Text
                                    style={{
                                        color: "#FFFFFF",
                                        fontSize: 20,
                                        fontFamily: "Nunito_400Regular",
                                        justifyContent:"center"
                                    }}
                                >
                                    Sair
                                </Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Modal>
            )}
        </View>
    );
};