import { Theme, useTheme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

interface IProgressBar {
    progress: number
}

export const BarProgress: React.FC<IProgressBar> = ({ progress }) => {


    const theme = useTheme()
    const styles = createStyles(theme)

    return (
        <View style={styles.container}>

            <View style={styles.loadingOverlay}>
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${progress}%` },
                        ]}
                    />
                </View>
            </View>

        </View>
    );

}

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        loadingOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
        progressBar: {
            width: '80%',
            height: 18,
            backgroundColor: theme.colors.card,
            borderRadius: 5,
            overflow: 'hidden',
            marginTop: 10,
        },
        progressFill: {
            height: '100%',
            backgroundColor: theme.colors.border,
        },


    })