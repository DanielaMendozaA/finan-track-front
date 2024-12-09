import { Dimensions, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from "react";

import CustomButton from "../../components/atoms/CustomTouchableButton";
import { Theme, useNavigation, useTheme } from "@react-navigation/native";
import { LoginNavigationProp } from "../../navigation/types/types";
import HeaderHome from "../../components/organisms/HeaderHome";

const HomeScreen = () => {
  const navigationLogin = useNavigation<LoginNavigationProp>();

  const [activeSection, setActiveSection] = useState<'Frecuentes' | 'Ocasionales'>('Frecuentes');


  const theme = useTheme()
  const styles = createStyles(theme)

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      console.log("token cuando logout", await AsyncStorage.getItem("token"));


      navigationLogin.navigate('Login', { email: '', password: '' })

    } catch (error) {
      console.log("Error al hacer logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderHome
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      />

      <View style={styles.contentContainer}>
        {activeSection === 'Frecuentes' ? (
          <Text style={styles.textHome}>Contenido de Frecuentes</Text>
        ) : (
          <Text style={styles.textHome}>Contenido de Ocasionales</Text>
        )}
      </View>
      
      <CustomButton
            title=""
            onPress={() => {
              console.log('frecuentes');
            }}
            iconName="add"
            size={55}
            color={theme.colors.text}
            style={styles.floatingButton}

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
      backgroundColor: '#e17474',
      borderRadius: 30, 
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

