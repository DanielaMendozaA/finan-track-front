import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import React from 'react'
import { Modal, View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import ReusableForm, { IInput, KeyboardTypeEnum } from './ReusableForm';
import { useForm } from 'react-hook-form';
import { addTransactionSchema } from '../../utilities/yupSchema/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '../atoms/CustomTouchableButton';
import { useSubmitTransaction } from '../../hooks/transactions/useSubmitTransaction';
import { DrawerHomeNavigationProp } from '../../navigation/types/types';


interface ModalCategoriesByTypeProps {
    visible: boolean;
    onClose: () => void;
    categoryId: number
}

interface FormValues {
    description: string;
    amount: number;
}


export const ModalAddTransaction: React.FC<ModalCategoriesByTypeProps> = ({
    visible,
    onClose,
    categoryId
}) => {
    const theme = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation<DrawerHomeNavigationProp>();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(addTransactionSchema),
        defaultValues: {
            description: '',
            amount: 0
        },
    });

    const { submitTransaction, loading, error, success } = useSubmitTransaction();

    const handleSubmitForm = (data: FormValues) => {
        const transactionToCreate = {
            ...data,
            date: new Date(),
            categoryId,
            type: 'expense'
        }

        submitTransaction(transactionToCreate, (newTransaction) => {
            console.log("Transacción creada con éxito:", newTransaction);
        });
        onClose();
        navigation.navigate('Home', { reload: true })
        reset();
    };

    console.log("este es id", categoryId);


    const inputs: IInput<FormValues>[] = [
        {
            name: "description",
            type: "text",
            placeholder: "Descripción",
            control,
            errors,
        },
        {
            name: "amount",
            type: "text",
            placeholder: "Monto",
            keyboardType: KeyboardTypeEnum.NUMERIC,
            control,
            errors,
        },
    ];
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.containerModal}>
                <View style={styles.containerModalContent}>
                    <Text style={styles.title}>Agregar Gasto</Text>
                    <ReusableForm
                        inputs={inputs}
                    />
                    <CustomButton
                        onPress={handleSubmit(handleSubmitForm)}
                        title='ENVIAR'
                    />
                    <CustomButton
                        onPress={onClose}
                        title='CERRAR'
                    />
                </View>
            </View>
        </Modal>
    )
}

const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        containerModal: {
            backgroundColor: 'rgba(28, 27, 29, 0.5)',
            minHeight: "100%",
            justifyContent: 'center',
            alignItems: 'center'
        },
        containerModalContent: {
            backgroundColor: theme.colors.background,
            minHeight: "30%",
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            padding: 10
        },
        title: {
            fontSize: 18,
            color: theme.colors.text,
            textAlign: "center",
        },


    })