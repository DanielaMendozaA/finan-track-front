import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import CustomButton from "../../components/atoms/CustomTouchableButton";
import { Theme, useTheme } from "@react-navigation/native";
import HeaderHome from "../../components/organisms/HeaderHome";
import { FrequencyList } from "../../components/organisms/FrequencyList";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  const [activeSection, setActiveSection] = useState<'Frecuentes' | 'Ocasionales'>('Frecuentes');


  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <HeaderHome
      setActiveSection={setActiveSection}
      />

      <View style={styles.contentContainer}>
        {activeSection === 'Frecuentes' ? (
          <FrequencyList/>
        ) : (
          <Text style={styles.textHome}></Text>
        )}
      </View>
      
      <CustomButton
            title=""
            onPress={() => {
              console.log('frecuentes');
            }}
            iconName="add-box"
            size={60}
            color={theme.colors.text}
            style={styles.floatingButton}
            IconComponent={MaterialIcons}

          />


    </View>
  );
};

export default HomeScreen;

const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      flex: 1,
      padding: 15,
    },
    textHome: {
      color: theme.colors.text,
      fontSize: 35,
      marginLeft: 30,
    },

    floatingButton: {
      position: 'absolute',
      padding: 0, 
      bottom: 20, 
      left: '50%', 
      marginLeft: -30, 
      width: 60,  
      height: 60,
      backgroundColor: 'transparent',
      borderRadius: 30, 
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

