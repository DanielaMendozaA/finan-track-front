import React from 'react'
import { Theme, useTheme } from '@react-navigation/native'
import { Dimensions, StyleSheet, View } from 'react-native'


const SettingsScreen = () => {
  
  const theme = useTheme()
  const styles = createStyles(theme)

  
  return (
    <View>


    </View>
  )
}


export default SettingsScreen;

const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        containerDrawerButtons:{
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