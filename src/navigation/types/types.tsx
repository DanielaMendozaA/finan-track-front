import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from '@react-navigation/drawer';

export type RootStackParamList = {
    Login: { email: string, password: string};
    Register: undefined;
}

export type DrawerParamList = {
    Home: undefined;
    Settings: undefined;
};


export type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;


export type LoginScreenRoutenProp = RouteProp<RootStackParamList, 'Login'>;


export type DrawerHomeNavigationProp = DrawerNavigationProp<DrawerParamList, 'Home'>;

export type DrawerSettingsNavigationProp = DrawerNavigationProp<DrawerParamList, 'Settings'>

export type DrawerNavigationPropType = DrawerNavigationProp<DrawerParamList>;