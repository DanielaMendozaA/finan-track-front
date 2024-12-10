import { Theme, useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import CustomButton from '../atoms/CustomTouchableButton'

interface IHeaderHomeProp{
    
    activeSection: 'Frecuentes' | 'Ocasionales'
    setActiveSection: React.Dispatch<React.SetStateAction<'Frecuentes' | 'Ocasionales'>>

}

const HeaderHome: React.FC<IHeaderHomeProp> = ({activeSection, setActiveSection }) => {

  
    const handleButtonPress = (section: 'Frecuentes' | 'Ocasionales') => {
        setActiveSection(section);
      };
    



    const theme = useTheme()
    const styles = createStyles(theme)
    return (
        <View style={styles.containerHeader}>
            <View style={styles.containerButtons}>
                <CustomButton
                    title="Frecuentes"
                    onPress={() => handleButtonPress('Frecuentes')}
                    style={styles.budgetTypeButton}
                    textStyle={styles.budgetTypeButtonText}

                />
                <CustomButton
                    title="Ocasionales"
                    onPress={() => handleButtonPress('Ocasionales')}
                    style={styles.budgetTypeButton}
                    textStyle={styles.budgetTypeButtonText}
                />
            </View>

        </View>
    )
}

export default HeaderHome;

const { width, height } = Dimensions.get('window');

const createStyles = (theme: Theme) =>
    StyleSheet.create({

      containerHeader: {
        width: '100%',
        backgroundColor: theme.colors.card,
        height: '15%',
        justifyContent: 'flex-end',  
        paddingBottom: 5,  
      },
          containerHeaderHome: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 15,
          },
          containerButtons: {
            flexDirection: 'row',
            alignItems: 'center',

          },
          budgetTypeButton: {
            backgroundColor: theme.colors.card,
            width: width * 0.5,  
            paddingVertical: 10, 
          },
          budgetTypeButtonText: {
            color: theme.colors.text,
            fontSize: 20,
            fontWeight: '400'
          },
          menuButton: {
            padding: 0,
            width: 'auto',
            backgroundColor: theme.colors.card
          },
        
    })