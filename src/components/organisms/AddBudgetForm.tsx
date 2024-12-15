import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, StyleSheet, View } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import ReusableForm, { IInput, KeyboardTypeEnum } from '../molecules/ReusableForm';
import CustomButton from '../atoms/CustomTouchableButton';
import { subHours, addDays, startOfWeek } from 'date-fns';

interface IAddBudgetProps {
    visible: boolean;
    onClose: () => void;
}


interface NewDates {
    startDate: Date,
    endDate: Date

}


const schema = yup.object().shape({
    title: yup
        .string()
        .min(2, "El título debe tener al menos 2 caracteres")
        .required("El título es requerido"),

    baseAmount: yup
        .number()
        .typeError("El saldo inicial debe ser un número válido")
        .positive("El saldo inicial debe ser un número positivo")
        .required("El saldo inicial es requerido"),

    currency: yup
        .string()
        .oneOf(["COP", "USD"], "La moneda debe ser 'COP' o 'USD'")
        .required("La moneda es requerida"),

    Frequency: yup
        .string()
        .oneOf(
            ["montly", "biweekly", "weekly", "once", ""],
            "La frecuencia debe ser 'mensual', 'quincenal', 'semanal' o 'una vez'"
        )
        .required("La frecuencia es requerida"),

    startDate: yup
        .date()
        .typeError("La fecha de inicio debe ser una fecha válida")
        .nullable(),

    endDate: yup
        .date()
        .typeError("La fecha de fin debe ser una fecha válida")
        .min(
            yup.ref("startDate"),
            "La fecha de fin debe ser posterior a la fecha de inicio"
        )
        .nullable()
});

interface FormValues {
    title: string;
    baseAmount: number;
    currency: "COP" | "USD";
    Frequency: "montly" | "biweekly" | "weekly" | "once" | "";
    startDate?: Date | null | undefined; 
    endDate?: Date | null | undefined;  
}

// const AddBudgetForm: React.FC<IAddBudgetProps> = ({ visible, onClose }) => {
//     const [buttonDisabled, setButtonDisabled] = useState(false)
//     const { control, watch, setValue, handleSubmit, formState: { errors }  } = useForm<FormValues>({ defaultValues: { title: '', baseAmount: '', currency: 'COP', Frequency: '', startDate: {}, endDate: {} }, });


//     const theme = useTheme();
//     const styles = createStyles(theme);

//     const handleSubmitForm = (data: FormValues) => { console.log("-------------datos-----------------", data); };


//     // const watchedValues = useWatch({ control });
//     // useEffect(() => {
//     //     console.log("datos actualizados", watchedValues);
//     //     setValues(watchedValues)


//     // }, [watchedValues])

//     // const frequency = watch('Frequency');

//     // const validateFrequency = () => {
//     //     const currentDate = subHours(new Date, 5)

//     //     let newDates: NewDates = {
//     //         startDate: new Date(),
//     //         endDate: new Date()
//     //     }
//     //     switch (frequency) {
//     //         case 'montly':
//     //             newDates.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//     //             console.log("Esta es la fecha de inicio", newDates.startDate);

//     //             newDates.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
//     //             console.log("Esta es la fecha de fin", newDates.endDate);
//     //             break;

//     //         case 'biweekly':
//     //             const dayOfMonth = currentDate.getDate()
//     //             console.log("Este es el dia del mes", dayOfMonth);
//     //             if (dayOfMonth >= 15) {
//     //                 newDates.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 16);
//     //                 console.log("Esta es la fecha de inicio", newDates.startDate);
//     //                 newDates.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
//     //                 console.log("Esta es la fecha de fin", newDates.endDate);
//     //             } else {
//     //                 newDates.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//     //                 console.log("Esta es la fecha de inicio", newDates.startDate);
//     //                 newDates.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15);
//     //                 console.log("Esta es la fecha de fin", newDates.endDate);
//     //             }
//     //             break;

//     //         case 'weekly':
//     //             newDates.startDate = startOfWeek(currentDate, { weekStartsOn: 1 })
//     //             console.log("Esta es la fecha de inicio", newDates.startDate);
//     //             newDates.endDate = addDays(newDates.startDate, 6);
//     //             console.log("Esta es la fecha de fin", newDates.endDate);
//     //             break;
//     //     }

//     //     setValue('startDate', newDates.startDate);
//     //     setValue('endDate', newDates.endDate);
//     //     setButtonDisabled(true)

//     //     if (frequency === 'once') {
//     //         setButtonDisabled(false)
//     //     }

//     // }

//     // useEffect(() => {
//     //     console.log('este es frequency', frequency);
//     //     validateFrequency()
//     // }, [frequency]);


//  const inputs: IInput<{ title: string; baseAmount: string, }>[] = [
//         {
//             name: 'title',
//             type: 'text',
//             placeholder: 'Título',
//             rules: { required: true },
//             style: [styles.input],
//             control,
//             errors
//         },
//         {
//             name: 'baseAmount',
//             type: 'text',
//             placeholder: 'Monto inicial',
//             rules: { required: true },
//             keyboardType: KeyboardTypeEnum.NUMERIC,
//             inputGroup: true,
//             style: [styles.inputAmount, styles.input],
//         },
//         {
//             name: 'currency',
//             type: 'select',
//             placeholder: 'Moneda',
//             rules: { required: true },
//             options: [
//                 { label: 'COP', value: 'COP' },
//                 { label: 'USD', value: 'USD' },
//             ],
//             style: [styles.input],
//         },
//         {
//             name: 'startDate',
//             label: 'Inicio',
//             type: 'date',
//             iconLibrary: MaterialIcons,
//             disabled: buttonDisabled
//         },
//         {
//             name: 'endDate',
//             label: 'Fin',
//             type: 'date',
//             iconLibrary: MaterialIcons,
//             disabled: buttonDisabled
//         },
//         {
//             name: 'Frequency',
//             label: 'Frecuencia',
//             type: 'radio',
//             options: [
//                 { label: 'Mensual', value: 'montly' },
//                 { label: 'Quincenal', value: 'biweekly' },
//                 { label: 'Semanal', value: 'weekly' },
//                 { label: 'Una Vez', value: 'once' },
//             ],
//         },

//     ];

//     return (
//         <Modal
//             transparent={true}
//             animationType="slide"
//             visible={visible}
//             onRequestClose={onClose}
//         >
//             <ScrollView>
//                 <View style={styles.modalContent}>
//                     <CustomButton
//                         title=""
//                         onPress={onClose}
//                         iconName="closesquare"
//                         size={35}
//                         IconComponent={AntDesign}
//                         style={styles.closeButton}
//                         color={theme.colors.text}
//                     />
//                     <View style={styles.form}>
//                         {/* 
//                         <ReusableForm
//                             inputs={inputs}
//                             onSubmit={handleSubmitForm}
//                             buttonText="Enviar"

//                         />
//                         <CustomButton
//                             title='enviar'
//                             onPress={() => {}}
//                             style={styles.buttonSend}
//                         /> */}
//                     </View>
//                 </View>



//             </ScrollView>
//         </Modal>
//     );
// };
const AddBudgetForm: React.FC<IAddBudgetProps> = ({ visible, onClose }) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const theme = useTheme();
    const styles = createStyles(theme);


    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            baseAmount: 0,
            currency: 'COP',
            Frequency: '',
            startDate: new Date(),
            endDate: new Date(),
        },
    });

    const handleSubmitForm = (data: FormValues) => {
        console.log("Datos enviados:", data);
    };


    const frequency = watch('Frequency');

    const validateFrequency = () => {
        const currentDate = subHours(new Date, 5)

        let newDates: NewDates = {
            startDate: new Date(),
            endDate: new Date()
        }
        switch (frequency) {
            case 'montly':
                newDates.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                console.log("Esta es la fecha de inicio", newDates.startDate);

                newDates.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                console.log("Esta es la fecha de fin", newDates.endDate);
                break;

            case 'biweekly':
                const dayOfMonth = currentDate.getDate()
                console.log("Este es el dia del mes", dayOfMonth);
                if (dayOfMonth >= 15) {
                    newDates.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 16);
                    console.log("Esta es la fecha de inicio", newDates.startDate);
                    newDates.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                    console.log("Esta es la fecha de fin", newDates.endDate);
                } else {
                    newDates.startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                    console.log("Esta es la fecha de inicio", newDates.startDate);
                    newDates.endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15);
                    console.log("Esta es la fecha de fin", newDates.endDate);
                }
                break;

            case 'weekly':
                newDates.startDate = startOfWeek(currentDate, { weekStartsOn: 1 })
                console.log("Esta es la fecha de inicio", newDates.startDate);
                newDates.endDate = addDays(newDates.startDate, 6);
                console.log("Esta es la fecha de fin", newDates.endDate);
                break;
        }

        setValue('startDate', newDates.startDate);
        setValue('endDate', newDates.endDate);
        setButtonDisabled(true)

        if (frequency === 'once') {
            setButtonDisabled(false)
        }

    }

    useEffect(() => {
        console.log('este es frequency', frequency);
        validateFrequency()
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
            name: 'Frequency',
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
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <ScrollView>
                <View style={styles.modalContent}>
                    <CustomButton
                        title=""
                        onPress={onClose}
                        iconName="closesquare"
                        size={35}
                        IconComponent={AntDesign}
                        style={styles.closeButton}
                        color={theme.colors.text}
                    />
                    <ReusableForm
                        inputs={inputs} 
                    />
                        <CustomButton
                        title="Enviar"
                        onPress={handleSubmit(handleSubmitForm)}
                    />
                </View>
            </ScrollView>
        </Modal>
    );
};

export default AddBudgetForm;

const { width, height } = Dimensions.get('window');

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        modalContent: {
            minHeight: height,
            backgroundColor: theme.colors.background,
            justifyContent: 'space-evenly',
            padding: 20,
        },
        closeButton: {
            backgroundColor: 'transparent',
            width: 'auto',
            alignSelf: 'flex-end',
            padding: 0,
        },
        input: {
            borderColor: theme.colors.card,
            borderBlockEndColor: theme.colors.notification,
        },
        inputAmount: {
            width: width * 0.53,
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
    });
