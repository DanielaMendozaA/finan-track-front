import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {useState } from "react";
import { Appearance, ColorSchemeName, Text, View } from "react-native";
import { ThemeContext } from "../theme/theme.context";
import { RootStackParamList } from "./types/types";
import { darkTheme, lightTheme } from "../theme/theme";
import { HomeScreen } from "../screens/private/Home.screen";
import { LoginScreen } from "../screens/public/Login.screen";
import { RegisterScreen } from "../screens/public/Register.screen";


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {

    const colorScheme = Appearance.getColorScheme();

    const [theme, setTheme] = useState<ColorSchemeName>(colorScheme);
    const [isLogged, setIsLogged] = useState(false);


    return (
        <NavigationContainer theme={theme === 'light' ? lightTheme : darkTheme}>
            <ThemeContext.Provider value={{ themeType: theme, toggleTheme: setTheme }}>

                <Stack.Navigator>
                    {
                        isLogged ?
                            <>
                                <Stack.Screen name="Login" component={HomeScreen} options={{headerShown: false}} />
                            </>
                            :
                            <>
                                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
                            </>
                    }

                </Stack.Navigator>
            </ThemeContext.Provider>
        </NavigationContainer>
    );
};

export default AppNavigator;