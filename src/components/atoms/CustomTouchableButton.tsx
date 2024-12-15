import { Theme, useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CustomButtonProps {
    title?: string;
    onPress: () => void;
    iconName?: string
    color?: string,
    size?: number,
    style?: object;
    textStyle?: object;
    IconComponent?: React.ComponentType<any>;
    disabled?: boolean
    iconRight?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, iconName, IconComponent, color, size, style, textStyle, disabled, iconRight }) => {

    const theme = useTheme()
    const styles = createStyles(theme)

    return (

        <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={disabled || false}>
            {IconComponent && iconName && size && !iconRight && (
                <IconComponent name={iconName} size={size} color={color || theme.colors.primary} />
            )}
            {title &&
                <Text style={[styles.buttonText, textStyle]}>{title}</Text>}
            {IconComponent && iconName && size && iconRight && (
                <IconComponent name={iconName} size={size} color={color || theme.colors.primary} />
            )}

        </TouchableOpacity>
    );
};

export default CustomButton

const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        button: {
            backgroundColor: theme.colors.border,
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 10,
            width: width * 0.7,

        },
        buttonText: {
            color: theme.colors.background,
            fontSize: 16,
            fontWeight: 'bold',

        }
    });

