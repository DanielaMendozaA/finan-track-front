import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Login: { email: string, password: string};
    Register: undefined;
    Home: undefined;
    Settings: undefined;
}

export type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export type LoginScreenRoutenProp = RouteProp<RootStackParamList, 'Login'>;

export type SettingsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>