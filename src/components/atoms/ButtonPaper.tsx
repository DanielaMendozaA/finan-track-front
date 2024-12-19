import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';
import CustomButton from './CustomTouchableButton';
import { Theme, useTheme } from '@react-navigation/native';

interface ButtonPaperProps {
    onPress: () => void;
    source: string;
    title: string
}



const ButtonPaper: React.FC<ButtonPaperProps>  = ({
    onPress, 
    source,
    title
}) => {
    const theme = useTheme();
    const styles = createStyles(theme);


    return (
        <View style={styles.container}>
            <Icon
                source={source}
                color={theme.colors.text}
                size={40}
            />
            <CustomButton
                title={title}
                onPress={onPress}
                style={styles.button}
                textStyle={styles.buttonText}
            />
        </View>
    )
}

const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: theme.colors.background,
            width: width * 0.85,
            padding: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: theme.colors.notification
        },

        button: {
            backgroundColor: theme.colors.background,
            width: 'auto'
        },
        buttonText: {
            color: theme.colors.text,
            fontSize: 20,
            fontWeight: '400'
        },

    })

    export default ButtonPaper;