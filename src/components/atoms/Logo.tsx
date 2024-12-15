import { Theme, useTheme } from '@react-navigation/native'
import React from 'react'
import { Dimensions, ImageBackground, StyleSheet } from 'react-native'
import { View } from 'react-native-reanimated/lib/typescript/Animated'

const Logo = () => {
    const theme = useTheme()
    const styles = createStyles(theme)


    return (
            <ImageBackground
                source={require('../../assets/images/finan-track-logo.png')}
                resizeMode="cover"
                style={styles.textSettingContainer}

            >
            </ImageBackground>
    )
}



export default Logo;

const { width, height } = Dimensions.get('window');

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        textSettingContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.primary,
            width: 200,
            height: 200,
            borderRadius: 100, 
            overflow: 'hidden', 
            borderWidth: 2, 
            borderColor: theme.colors.border,
        }

    })