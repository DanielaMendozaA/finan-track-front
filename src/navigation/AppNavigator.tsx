import { useContext, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { PaperProvider } from 'react-native-paper';

import { DrawerNavigator } from "./DrawerNavigator";
import { ThemeContext } from "../theme/theme.context";
import { darkTheme, lightTheme } from "../theme/theme";
import { AuthNavigator } from "./AuthNavigator";
import { RootState } from '../redux/store';



const AppNavigator = () => {
    const colorScheme = Appearance.getColorScheme();
    const [theme, setTheme] = useState<ColorSchemeName>(colorScheme);
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const { themeType, toggleTheme } = useContext(ThemeContext)
    const paperTheme = themeType === "light" ? lightTheme : darkTheme;


    console.log("estatus logued", isAuthenticated);


    return (
        <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={theme === "light" ? lightTheme : darkTheme}>
            <ThemeContext.Provider value={{ themeType: theme, toggleTheme: setTheme }}>
                {isAuthenticated ?
                    <DrawerNavigator />
                    :
                    <AuthNavigator />

                }


            </ThemeContext.Provider>
        </NavigationContainer>
        </PaperProvider>
    );
};

export default AppNavigator;
