import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { IBudget } from "../../services/budgets/interfaces/get-all-budgets-response.interface";

export type RootStackParamList = {
    Login: { email?: string, password?: string };
    Register: undefined;
}

export type DrawerParamList = {
    Home: { reload: boolean };
    Settings: undefined;
    SingleBudget: { budget: IBudget }
};


export type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export type RegisterNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;


export type LoginScreenRoutenProp = RouteProp<RootStackParamList, 'Login'>;

export type DrawerHomeRouteProp = RouteProp<DrawerParamList, 'Home'>;

export type DrawerSingleBudgetRouteProp = RouteProp<DrawerParamList, 'SingleBudget'>;


export type DrawerHomeNavigationProp = DrawerNavigationProp<DrawerParamList, 'Home'>;

export type DrawerSettingsNavigationProp = DrawerNavigationProp<DrawerParamList, 'Settings'>

export type DrawerSingleBudgetNavigationProp = DrawerNavigationProp<DrawerParamList, 'SingleBudget'>


export type DrawerNavigationPropType = DrawerNavigationProp<DrawerParamList>;