import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ReusableForm, { IInput, KeyboardTypeEnum } from '../molecules/ReusableForm';
import CustomButton from '../atoms/CustomTouchableButton';
import { addBudgeschema } from '../../utilities/yupSchema/schemas';
import ReusableModal from '../molecules/CustomModalContent';
import { validateFrequency } from '../../utilities/funtions/validateFrequency';
import ModalCategories from '../molecules/ModalCategories';
import { useSubmitBudget } from '../../hooks/budgets/useSubmitBudgetCategories';
import { categoryType } from '../../services/categories/interfaces/create-category-interface';
import { CustomModalConfirmComponent } from '../molecules/CustomModal';

interface IAddBudgetProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface IAddCategories {
    name: string;
    type: categoryType;
    baseAmount: number;
}

interface FormValues {
    title: string;
    baseAmount: number;
    currency: "COP" | "USD";
    frequency: "montly" | "biweekly" | "weekly" | "once" | "";
    startDate?: Date | null | undefined;
    endDate?: Date | null | undefined;
}

const AddBudgetForm: React.FC<IAddBudgetProps> = ({ visible, onClose, onSuccess }) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false)
    const [categories, setCategories] = useState<IAddCategories[]>(
        []
    );
    const [budgetType, setBudgetType] = useState<"frequency" | "occasional" | "">("")
    const [isModalCatErrorVisible, SetIsModalCatErrorVisible] = useState(false)
    const [texError, setTextError] = useState('')

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(addBudgeschema),
        defaultValues: {
            title: '',
            baseAmount: 0,
            currency: 'COP',
            frequency: '',
            startDate: new Date(),
            endDate: new Date(),
        },
    });

    const allFields = useWatch({ control });

    const theme = useTheme();
    const styles = createStyles(theme);

    const closeModal = () => {
        setModalVisible(false)
    }

    const closeCategoryModal = () => {
        SetIsModalCatErrorVisible(false)
    }

    const baseBudgetAmount = watch('baseAmount')


    const handleAddCategory = (type: categoryType, name: string, baseAmount: number) => {

        const currentCatAmount = categories.reduce((total, cat) => total += cat.baseAmount, 0)
        console.log("esta es la baseamount actual de las categorias", currentCatAmount);

        if (currentCatAmount + baseAmount > (allFields.baseAmount ?? 0)) {
            setTextError(`El monto ingresado supera el saldo disponible del presupuesto.\nDisponible: ${baseBudgetAmount - currentCatAmount} ${allFields.currency}`)
            SetIsModalCatErrorVisible(true)

            return;
        }

        setCategories((prevCategories) => {
            const updatedCategories = [...prevCategories, { type, name, baseAmount }];
            console.log("categorias seleccionadas", updatedCategories);
            return updatedCategories;
        });

    };

    const openModal = () => {
        setModalVisible(true)
    }

    const handleClose = () => {
        onClose();
    };


    const { submitBudget } = useSubmitBudget();

    const handleSubmitForm = (data: FormValues) => {
        console.log("!!!!!!!!!!!!!estas son las fechas!!!!!!!!!!!!!!!!!", data.startDate, data.endDate);
        
        const dataToSend = {
            ...data,
            ...(data.frequency === 'once'
                ? { type: 'occasional', frequency: undefined }
                : { type: budgetType })
        };

        console.log("Datos enviados:", dataToSend, "categorias", categories);

        submitBudget(dataToSend, categories, () => {
            console.log("Presupuesto y categorías creadas con éxito.");
            onSuccess();
            onClose();
            reset();
        });
    };

    const frequency = watch('frequency');

    const validateFrequencyDates = () => {
        const [startDate, endDate] = validateFrequency(frequency)
        setValue('startDate', startDate);
        setValue('endDate', endDate);
        setButtonDisabled(true)
        if (frequency === 'once') {
            setButtonDisabled(false)
        }
    }

    useEffect(() => {
        console.log('este es frequency', frequency);
        validateFrequencyDates()
        setBudgetType(frequency === "once" ? "occasional" : "frequency")
    }, [frequency]);



    const inputs: IInput<FormValues>[] = [
        {
            name: 'title',
            type: 'text',
            placeholder: 'Título',
            rules: { required: "El título es requerido" },
            style: [styles.input],
            control,
            errors,
        },
        {
            name: 'baseAmount',
            type: 'text',
            placeholder: 'Monto inicial',
            rules: { required: "El monto inicial es requerido" },
            keyboardType: KeyboardTypeEnum.NUMERIC,
            style: [styles.inputAmount, styles.input],
            control,
            errors,
        },
        {
            name: 'currency',
            type: 'select',
            placeholder: 'Moneda',
            rules: { required: "La moneda es requerida" },
            options: [
                { label: 'COP', value: 'COP' },
                { label: 'USD', value: 'USD' },
            ],
            style: [styles.input],
            control,
            errors,
        },
        {
            name: 'startDate',
            label: 'Inicio',
            type: 'date',
            iconLibrary: MaterialIcons,
            disabled: buttonDisabled,
            control,
            errors,
        },
        {
            name: 'endDate',
            label: 'Fin',
            type: 'date',
            iconLibrary: MaterialIcons,
            disabled: buttonDisabled,
            control,
            errors,
        },
        {
            name: 'frequency',
            label: 'Frecuencia',
            type: 'radio',
            options: [
                { label: 'Mensual', value: 'montly' },
                { label: 'Quincenal', value: 'biweekly' },
                { label: 'Semanal', value: 'weekly' },
                { label: 'Una Vez', value: 'once' },
            ],
            control,
            errors,
        },
    ];

    return (

        <ReusableModal
            visible={visible}
            onClose={handleClose}
        >


            <View style={styles.containerModal}>
                <ReusableForm
                    inputs={inputs}

                />
                <CustomButton
                    title="Agregar Categorias"
                    onPress={openModal}
                    style={styles.addCatButton}
                    textStyle={{ color: theme.colors.text, fontSize: 20, fontWeight: '400' }}
                    iconName='category'
                    size={20}
                    IconComponent={MaterialIcons}
                    color={theme.colors.text}
                />
                <CustomButton
                    title="Enviar"
                    onPress={handleSubmit(handleSubmitForm)}
                />

            </View>

            <ModalCategories
                visible={isModalVisible}
                onClose={closeModal}
                onCategorySelect={handleAddCategory}

            />
            <CustomModalConfirmComponent
                visible={isModalCatErrorVisible}
                onClose={closeCategoryModal}
                text={texError}

            />

        </ReusableModal>


    )
};

export default AddBudgetForm;

const { width, height } = Dimensions.get('window');

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        containerModal: {
            alignItems: 'center',
            gap: 20
        },
        addCatButton: {
            width: width * 0.85,
            backgroundColor: theme.colors.background,
            borderWidth: 1,
            borderColor: theme.colors.card,
            borderBlockEndColor: theme.colors.notification,
        },
        input: {
            borderColor: theme.colors.card,
            borderBlockEndColor: theme.colors.notification,
        },
        inputAmount: {
            width: width * 0.5,
        },
        form: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '5%',

        },
        buttonSend: {
            alignSelf: "center"
        },
        loadingContainer: {

        }
    });
