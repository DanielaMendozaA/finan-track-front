import { useEffect, useState } from "react";
import { Appearance, ColorSchemeName, ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemeContext } from "../theme/theme.context";
import { RootStackParamList } from "./types/types";
import { darkTheme, lightTheme } from "../theme/theme";
import HomeScreen  from "../screens/private/Home.screen";
import LoginScreen from "../screens/public/Login.screen";
import RegisterScreen from "../screens/public/Register.screen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const colorScheme = Appearance.getColorScheme();
    const [theme, setTheme] = useState<ColorSchemeName>(colorScheme);
    const [isLogged, setIsLogged] = useState<null | string>(null); 
    const [isLoading, setIsLoading] = useState(true);

    console.log("estatus logued", isLogged);

    const checkLoginStatus = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            console.log("este es el token desde app navigator", token);

            if (token) {
                setIsLogged(token); 
            } else {
                setIsLogged(null); 
            }
        } catch (error) {
            console.log("Error al leer AsyncStorage:", error);
            setIsLogged(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);


    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer theme={theme === "light" ? lightTheme : darkTheme}>
            <ThemeContext.Provider value={{ themeType: theme, toggleTheme: setTheme }}>
                <Stack.Navigator initialRouteName={isLogged ? "Home" : "Login"}>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </ThemeContext.Provider>
        </NavigationContainer>
    );
};

export default AppNavigator;
