import { Theme, useNavigation, useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View, Animated } from 'react-native'
import CustomButton from '../atoms/CustomTouchableButton'
import { DrawerNavigationPropType } from '../../navigation/types/types'
import AntDesign from 'react-native-vector-icons/AntDesign';

interface IHeaderHomeProp {
  setActiveSection: React.Dispatch<React.SetStateAction<'frequency' | 'occasional'>>;
  activeSection: 'frequency' | 'occasional'; 
}

const HeaderHome: React.FC<IHeaderHomeProp> = ({ setActiveSection, activeSection }) => {
  const navigation = useNavigation<DrawerNavigationPropType>();

  const handleButtonPress = (section: 'frequency' | 'occasional') => {
    setActiveSection(section);
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };
  
  const theme = useTheme();
  const styles = createStyles(theme, activeSection);

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
          style={styles.menuButton}
          textStyle={styles.budgetTypeButtonText}
          color={theme.colors.text}
        />
      </View>

      <View style={styles.containerButtons}>
        <CustomButton
          title="Frecuentes"
          onPress={() => handleButtonPress('frequency')}
          style={activeSection === 'frequency' ? styles.selectedButton : styles.budgetTypeButton}
          textStyle={styles.budgetTypeButtonText}
        />
        <CustomButton
          title="Ocasionales"
          onPress={() => handleButtonPress('occasional')}
          style={activeSection === 'occasional' ? styles.selectedButton : styles.budgetTypeButton}
          textStyle={styles.budgetTypeButtonText}
        />
      </View>
    </View>
  );
};

export default HeaderHome;

const { width, height } = Dimensions.get('window');

const createStyles = (theme: Theme, activeSection: 'frequency' | 'occasional') =>
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
      padding: 0,
    },
    selectedButton: {
      backgroundColor: 'transparent',
      width: '45%',
      borderBottomWidth: 5, 
      borderBottomColor: theme.colors.text,
    },
    budgetTypeButtonText: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: '400',
      textAlign: 'center',
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
      gap: 40,
      width: width * 0.8,
    }
  });
