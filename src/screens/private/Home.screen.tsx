import { Dimensions, StyleSheet, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import MaterialComminityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomButton from "../../components/atoms/CustomTouchableButton";
import { Theme, useFocusEffect, useRoute, useTheme } from "@react-navigation/native";
import HeaderHome from "../../components/organisms/HeaderHome";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CustomInput } from "../../components/atoms/CustomInput";
import FrequencyBudget from "../../components/atoms/FrequencyBudgetList";
import OccassionalBudget from "../../components/atoms/OccassionalBudget";
import AddBudgetForm from "../../components/organisms/AddBudgetForm";
import { useFetchGetBudgets } from "../../hooks/budgets/useFetchGetBudgets";

const HomeScreen = () => {
  const [activeSection, setActiveSection] = useState<'frequency' | 'occasional'>('frequency');
  const [title, setTitle] = useState('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload((prev) => !prev);
  }, [])

  const openModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  const handleReload = () => {
    setReload((prev) => !prev);
};

  const handleInputChange = (text: string) => {

    console.log('este es el text', text);
    setTitle(text)

  }



  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <HeaderHome
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />


      <View style={styles.containerFilters}>
        <CustomButton
          onPress={handleReload}
          iconName="tune-variant"
          size={30}
          IconComponent={MaterialComminityIcons}
          style={styles.budgetTypeButton}
          textStyle={styles.budgetTypeButtonText}
          color={theme.colors.text}
        />

        <CustomInput
          style={styles.customInput}
          value={title}
          onChange={handleInputChange}
          placeholder='Filtrar por Titulo'
        />
      </View>

      <View style={styles.contentContainer}>
        {activeSection === 'frequency' ? (
            <FrequencyBudget reload={reload} />
        ) : (
          <OccassionalBudget />
        )}
      </View>


      <CustomButton
        title=""
        onPress={openModal}
        iconName="add-box"
        size={60}
        color={theme.colors.text}
        style={styles.floatingButton}
        IconComponent={MaterialIcons}

      />


      <AddBudgetForm
        visible={isModalVisible}
        onClose={closeModal}
        onSuccess={handleReload} 

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
      gap: 20
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
    },
    containerFilters: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10
    },
    budgetTypeButton: {
      backgroundColor: theme.colors.card,
      paddingVertical: 10,
      padding: 0,
      width: '20%'
    },
    budgetTypeButtonText: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: '400'
    },
    customInput: {
      width: width * 0.7,
      borderRadius: 10
    },
  });

