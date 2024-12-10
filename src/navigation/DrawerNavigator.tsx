import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions } from "react-native";
import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SettingsScreen from '../screens/private/Settings.screen';
import { HomeNavigationProp, SettingsNavigationProp } from './types/types';
import HomeScreen from '../screens/private/Home.screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/atoms/CustomTouchableButton';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { removeToken } from '../redux/features/userThunks';
import { ThemeContext } from '../theme/theme.context';


const CustomDrawerContent = () => {
    const navigationHome = useNavigation<HomeNavigationProp>();
    const navigationSettings = useNavigation<SettingsNavigationProp>();
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const { themeType, toggleTheme } = useContext(ThemeContext)
    const [themeButtonText, setThemeButtonText] = useState({
        title: 'Modo Oscuro',
        iconName: 'dark-mode'
    });


    useEffect(() => {
        if (themeType === 'dark') {
            setThemeButtonText({
                title: 'Modo Claro',
                iconName: 'light-mode'
            });
        } else {
            setThemeButtonText({
                title: 'Modo Oscuro',
                iconName: 'dark-mode'
            });
        }
    }, [themeType]);

    const logout = async () => {
        console.log("Cerrando sesión...");
        await dispatch(removeToken());
        await AsyncStorage.clear();

    };

    const handleToggle = () => {

        toggleTheme((prev) => (prev === 'light' ? 'dark' : 'light'))

    }


    const theme = useTheme()
    const styles = createStyles(theme)

    return (
        <View style={styles.containerDrawerButtons}>
            <CustomButton
                title="Ir a Home"
                onPress={() => navigationHome.navigate('Home')}
                iconName='home-filled'
                color={theme.colors.text}
                size={30}
                style={styles.drawerButton}
                textStyle={styles.drawerButtonText}
            />
            <CustomButton
                title="Estadísticas"
                onPress={() => navigationSettings.navigate('Settings')}
                iconName='auto-graph'
                color={theme.colors.text}
                size={30}
                style={styles.drawerButton}
                textStyle={styles.drawerButtonText}
            />

            <CustomButton
                title={themeButtonText.title}
                onPress={handleToggle}
                iconName={themeButtonText.iconName}
                color={theme.colors.text}
                size={30}
                style={styles.drawerButton}
                textStyle={styles.drawerButtonText}
            />
            <CustomButton
                title="Cerrar sesión"
                onPress={logout}
                iconName='logout'
                color={theme.colors.text}
                size={30}
                style={styles.drawerButton}
                textStyle={styles.drawerButtonText}

            />
        </View>
    );
};

const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {

    return (
        <Drawer.Navigator
            drawerContent={() => <CustomDrawerContent />}
            screenOptions={{
                drawerPosition: 'right',
                drawerStyle: {
                    width: 250,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start'

                },


            }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeScreen}

            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}

            />
        </Drawer.Navigator>

    )
}

const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        containerDrawerButtons: {
            flexDirection: 'column',
            alignItems: 'flex-end',
            height: 'auto',
            gap: 60

        },
        drawerButton: {
            backgroundColor: theme.colors.card,
            width: width * 0.7,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 30
        },
        drawerButtonText: {
            color: theme.colors.text,
            fontSize: 18,
            fontWeight: '400'
        }

    })
