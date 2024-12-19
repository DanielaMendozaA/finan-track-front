import { Theme, useNavigation, useRoute, useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { Dimensions, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { DrawerHomeNavigationProp, DrawerSingleBudgetRouteProp } from '../../navigation/types/types';
import { yupResolver } from '@hookform/resolvers/yup';

import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../../components/atoms/CustomTouchableButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HorizontalBarChart from '../../components/organisms/HorizontalBarChart';
import { CategoryList } from '../../components/organisms/CategoryList';
import ReusableModal from '../../components/molecules/CustomModalContent';
import ReusableForm, { IInput, KeyboardTypeEnum } from '../../components/molecules/ReusableForm';
import { useForm } from 'react-hook-form';
import { addTransactionSchema } from '../../utilities/yupSchema/schemas';

const calculateAvailablePercentage = (baseAmount: number, currentAmount: number): string => {
    if (baseAmount === 0) return "0%";
    const percentage = Math.round((currentAmount / baseAmount) * 100);
    return `${percentage}%`;
};



export const SingleBudgetScreen = () => {
    const navigation = useNavigation<DrawerHomeNavigationProp>();
    const [isModalVisible, setIsModalVisible] = useState(false)

    const { params } = useRoute<DrawerSingleBudgetRouteProp>();
    const { title, baseAmount, currentAmount, currency, startDate, endDate, categories } = params.budget



    let textColorAvailable;
    if (+currentAmount < 0) {
        textColorAvailable = '#ff0000';
    } else if (+baseAmount === +currentAmount || +currentAmount > (+baseAmount / 2)) {
        textColorAvailable = '#35bf35';
    } else if (+currentAmount === (+baseAmount / 2) || +currentAmount < (+baseAmount / 2)) {
        textColorAvailable = '#e89e27';
    } else if (+baseAmount - +currentAmount < 0) {
        textColorAvailable = '#e64e20';
    }
    console.log("estos son los params", startDate, typeof (startDate));



    const theme = useTheme()
    const styles = createStyles(theme)

    const handleBack = () => {
        navigation.navigate('Home', { reload: true })
    }

    const handleModalClose = () => {
        setIsModalVisible(false)
    }

    const openModal = () => {
        setIsModalVisible(true)
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.containerCardBudget}>

                <View style={styles.containerCardHeader}>
                    <CustomButton
                        onPress={handleBack}
                        IconComponent={AntDesign}
                        size={30}
                        iconName='fastbackward'
                        color={theme.colors.text}
                        style={styles.buttonBack}
                    />
                    <Text style={{
                        color: theme.colors.text,
                        fontSize: 25,
                    }}>{title}
                    </Text>
                    <CustomButton
                        onPress={openModal}
                        IconComponent={Ionicons}
                        size={35}
                        iconName='options-sharp'
                        color={theme.colors.text}
                        style={styles.buttonBack}
                    />
                </View>

                <View style={styles.textContainerInitial}>
                    <Text style={{ fontSize: 18, color: theme.colors.text }}>
                        Saldo Inicial: <Text style={{ color: textColorAvailable }}>{baseAmount} {currency}</Text>
                    </Text>
                </View>





                <View style={styles.containerCharContent}>

                    <View style={styles.containerChart}>
                        <HorizontalBarChart
                            data={params.budget}
                        />
                        <Text style={styles.textDates}>Del {startDate?.split('T')[0]}</Text>
                        <Text style={styles.textDates}>Al {endDate?.split('T')[0]}</Text>

                    </View>


                    <View style={styles.containerRight}>
                        <View style={styles.containerPorText}>
                            <Text style={{ color: textColorAvailable, fontSize: 20 }}>{calculateAvailablePercentage(+baseAmount, +currentAmount)}</Text>
                        </View>
                        <Text style={{ color: textColorAvailable, fontSize: 20 }}>Disponible</Text>



                    </View>
                </View>



            </View>

            <CategoryList
                data={categories || []}

            />
        </View>
    )
}

const { width, height } = Dimensions.get('window');

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        mainContainer: {
            minHeight: height,
        },
        containerCardBudget: {
            backgroundColor: theme.colors.card,
            padding: 10,
            borderRadius: 10,
            shadowColor: theme.colors.text,
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 15,
            marginBottom: 10,

        },
        buttonBack: {
            padding: 0,
            width: 'auto',
            backgroundColor: theme.colors.card,
            marginLeft: 10,
            marginRight: 10
        },
        containerCardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 50

        },
        textContainerInitial: {
            borderWidth: 1,
            borderColor: theme.colors.card,
            borderBlockEndColor: theme.colors.border,
            padding: 10

        },
        containerCharContent: {
            flexDirection: 'row'
        },
        containerRight: {
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        containerChart: {
            width: '50%'

        },
        textDates: {
            color: theme.colors.text,
            textAlign: 'center',
            lineHeight: 20,
            fontSize: 17,
            fontWeight: '200'
        },
        button: {
            width: '80%',
            marginBottom: 20,
            padding: 10
        },
        containerPorText: {
            borderWidth: 1,
            borderColor: theme.colors.notification,
            borderRadius: 50,
            minWidth: 70,
            minHeight: 70,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10
        },
        modalOverlay: {
            backgroundColor: theme.colors.background,
            justifyContent: "center",
            alignItems: "center",

        },


    })