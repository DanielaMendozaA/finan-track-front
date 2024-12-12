import { Theme, useTheme } from '@react-navigation/native';
import React from 'react'
import { Dimensions, KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";

interface CustomInputProps {
    value: string;
    onChange?: (text: string) => void;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    style?: object
}


export const CustomInput: React.FC<CustomInputProps> = ({
    value,
    onChange,
    placeholder,
    keyboardType,
    secureTextEntry,
    style
}) => {


    const theme = useTheme()
    const styles = createStyles(theme)

    return (
        <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.text}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            style={[styles.input, style]}
             >
        </TextInput>
    )
}


const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        input: {
            backgroundColor: theme.colors.card,
            color:  theme.colors.text,
            padding: 15
        }


    })

