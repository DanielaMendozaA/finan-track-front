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
            
            <View style={styles.containerHeaderHome}>
                <Text style={styles.textHome}>HOME</Text>
                <CustomButton
                    title=""
                    onPress={() => {
                        console.log('frecuentes');
                    }}
                    iconName="menu"
                    size={55}
                    color={theme.colors.text}
                    style={styles.menuButton}

                />
            </View>

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

export default HeaderHome

const { width, height } = Dimensions.get('window');

const createStyles = (theme: Theme) =>
    StyleSheet.create({

        containerHeader: {
            width: '100%',
            backgroundColor: theme.colors.card,
            height: '25%'
          },
          containerHeaderHome: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 15,
          },
          textHome: {
            color: theme.colors.text,
            fontSize: 35,
            marginLeft: 30,
          },
          budgetTypeButton: {
            backgroundColor: theme.colors.card,
            width: width * 0.5,
            padding: 0
          },
          budgetTypeButtonText: {
            color: theme.colors.text,
            fontSize: 20
          },
          containerButtons: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 40
      
          },
          menuButton: {
            padding: 0,
            width: 'auto',
            backgroundColor: theme.colors.card
          },
        
    })