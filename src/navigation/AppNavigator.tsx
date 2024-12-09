import { useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { ThemeContext } from "../theme/theme.context";
import { darkTheme, lightTheme } from "../theme/theme";
import { DrawerNavigator } from "./DrawerNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';



const AppNavigator = () => {
    const colorScheme = Appearance.getColorScheme();
    const [theme, setTheme] = useState<ColorSchemeName>(colorScheme);
    // const { isAuthenticated } = useAuth();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);


    console.log("estatus logued", isAuthenticated);


    return (
        <NavigationContainer theme={theme === "light" ? lightTheme : darkTheme}>
            <ThemeContext.Provider value={{ themeType: theme, toggleTheme: setTheme }}>
                {isAuthenticated ?
                    <DrawerNavigator />
                    :
                    <AuthNavigator />

                }


            </ThemeContext.Provider>
        </NavigationContainer>
    );
};

export default AppNavigator;
