import { Theme, useNavigation, useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import CustomButton from '../atoms/CustomTouchableButton'
import { DrawerNavigationPropType } from '../../navigation/types/types'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface IHeaderHomeProp {

  setActiveSection: React.Dispatch<React.SetStateAction<'Frecuentes' | 'Ocasionales'>>

}

const HeaderHome: React.FC<IHeaderHomeProp> = ({ setActiveSection }) => {
  const navigation = useNavigation<DrawerNavigationPropType>();



  const handleButtonPress = (section: 'Frecuentes' | 'Ocasionales') => {
    setActiveSection(section);
  };


  const openDrawer = () => {
    navigation.openDrawer();
  };


  const theme = useTheme()
  const styles = createStyles(theme)
  return (
    <View style={styles.containerHeader}>


      <View style={styles.containerHeaderTitle}>
        <Text style={{ 
          color: theme.colors.text,
          fontSize: 30,
          fontWeight: '300'
          
          }}>HOME</Text>
        <CustomButton
          onPress={openDrawer}
          iconName="menufold"
          size={30}
          IconComponent={AntDesign}
          style={styles.budgetTypeButton}
          textStyle={styles.budgetTypeButtonText}
          color={theme.colors.text}
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

export default HeaderHome;

const { width, height } = Dimensions.get('window');

const createStyles = (theme: Theme) =>
  StyleSheet.create({

    containerHeader: {
      width: '100%',
      backgroundColor: theme.colors.card,
      height: '20%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 20
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
      gap: 30

    },
    budgetTypeButton: {
      backgroundColor: theme.colors.card,
      width: 'auto',
      paddingVertical: 10,
      padding: 0
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
    containerHeaderTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 60,
      width: width * 0.8,
    }
  })