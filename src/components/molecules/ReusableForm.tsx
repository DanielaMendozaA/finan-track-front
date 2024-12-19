import React, { useEffect, useState } from "react";
import { Control, Controller, FieldErrors, FieldValues, Path, useForm } from "react-hook-form";
import { Theme, useTheme } from "@react-navigation/native";
import { View, Text, TextInput, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Dimensions } from 'react-native';
import CustomButton from "../atoms/CustomTouchableButton";
import { subHours } from 'date-fns';

export enum KeyboardTypeEnum {
    NUMERIC = 'numeric',
    EMAIL = 'email-address'
}

export interface IInput<T extends FieldValues> {
    name: Path<T>;
    label?: string;
    type: string;
    placeholder?: string;
    options?: { label: string; value: string }[];
    rules?: object;
    iconName?: string;
    iconLibrary?: any;
    keyboardType?: KeyboardTypeEnum | "default";
    style?: object;
    inputGroup?: boolean;
    processed?: boolean;
    disabled?: boolean;
    control: Control<T>;
    errors?: FieldErrors<T>;
}


interface IFormProps<T extends FieldValues> {
    inputs: IInput<T>[];
    style?: object;
    // navLink?: { path: string; text: string; onPress: () => void };
    // buttonText?: string
}


const ReusableForm = <T extends FieldValues>({ inputs, style }: IFormProps<T>) => {


    const [visiblePickers, setVisiblePickers] = useState<{ [key: string]: boolean }>({});
    const [showPicker, setShowPicker] = useState(false);
    const theme = useTheme();
    const styles = createStyles(theme);

    const getErrorMessage = (error: any): string | null => {
        if (!error) return null;
        if (error.type === "required") return "Este campo es obligatorio";
        if (error.type === "pattern" && typeof error.message === "string") return error.message;
        return null;
    };
    const handleShowPicker = () => setShowPicker(true);

    const togglePicker = (name: string) => {
        setVisiblePickers((prev) => ({ ...prev, [name]: !prev[name] }));
    };


    return (
        <View style={styles.form}>
            {inputs.map((input, index) => (
                <View key={index}>

                    <Controller
                        control={input.control}
                        name={input.name}
                        rules={input.rules}
                        render={({ field: { onChange, onBlur, value } }) => {
                            const keyboardType = input.keyboardType || "default";

                            switch (input.type) {
                                case "text":
                                    return (
                                        <View style={[styles.containerIcon, input.style]}>
                                            {input.iconName && input.iconLibrary && (
                                                <input.iconLibrary
                                                    name={input.iconName}
                                                    size={20}
                                                    color={theme.colors.text}
                                                    style={styles.inputIcon}
                                                />
                                            )}
                                            <TextInput
                                                style={[styles.input]}
                                                placeholder={input.placeholder}
                                                placeholderTextColor={theme.colors.text}
                                                onBlur={onBlur}
                                                onChangeText={(text) => {
                                                    console.log("Valor ingresado:", text);
                                                    onChange(text);
                                                  }}
                                                value={value}
                                                keyboardType={keyboardType}

                                            />
                                        </View>
                                    );

                                case "textarea":
                                    return (
                                        <>
                                            {input.label &&
                                                <Text style={styles.label}>{input.label}</Text>

                                            }

                                            <TextInput
                                                style={[styles.input, styles.textarea, input.style]}
                                                placeholder={input.placeholder}
                                                placeholderTextColor={theme.colors.text}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                multiline
                                                numberOfLines={4}
                                            />
                                        </>
                                    );

                                case "checkbox":
                                    return (
                                        <Switch
                                            value={value || false}
                                            onValueChange={onChange}
                                            style={input.style}
                                        />
                                    );
                                case "select":
                                    return (
                                        <View style={[styles.containerPicker, input.style]}>
                                            {input.label && (
                                                <Text style={styles.label}>{input.label}</Text>
                                            )}
                                            <Picker
                                                selectedValue={value}
                                                onValueChange={onChange}
                                                style={styles.picker}
                                                itemStyle={styles.pickerItem}
                                            >
                                                {input.options?.map((option, idx) => (
                                                    <Picker.Item
                                                        key={idx}
                                                        label={option.label}
                                                        value={option.value}
                                                    />
                                                ))}
                                            </Picker>
                                        </View>
                                    );

                                case "password":
                                    return (
                                        <View style={styles.containerIcon}>
                                            {input.iconName && input.iconLibrary && (
                                                <input.iconLibrary
                                                    name={input.iconName}
                                                    size={20}
                                                    color={theme.colors.text}
                                                    style={styles.inputIcon}
                                                />
                                            )}
                                            <TextInput
                                                style={[styles.input, input.style]}
                                                placeholder={input.placeholder}
                                                placeholderTextColor={theme.colors.text}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                secureTextEntry
                                            />
                                        </View>
                                    );

                                case "radio":
                                    return (
                                        <View style={[styles.containerRadio, input.style]}>
                                            {input.label && <Text style={styles.label}>{input.label}</Text>}
                                            <View style={styles.radioGroup}>
                                                {input.options?.map((option, idx) => (
                                                    <View key={idx} style={styles.radioOption}>
                                                        <TouchableOpacity
                                                            style={styles.radioButton}
                                                            onPress={() => {
                                                                onChange(option.value);
                                                                // console.log("Seleccionado:", option.value); 
                                                            }}
                                                        >
                                                            {value === option.value && (
                                                                <View style={styles.radioInnerCircle} />
                                                            )}
                                                        </TouchableOpacity>
                                                        <Text style={styles.radioLabel}>{option.label}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    );

                                case "date":
                                    return (
                                        <View style={styles.containerDatePicker}>
                                            {input.label && (
                                                <Text style={styles.dataPickerLabel}>{input.label} :</Text>
                                            )}

                                            <CustomButton
                                                title={value?.toISOString().split('T')[0] || "Selecciona Fecha"}
                                                onPress={() => togglePicker(input.name)}
                                                iconName={input.disabled ? undefined : "arrow-drop-down"}
                                                size={25}
                                                color={theme.colors.notification}
                                                IconComponent={input.iconLibrary}
                                                iconRight={true}
                                                style={styles.buttonDataPicker}
                                                textStyle={styles.buttonDataPickeText}
                                                disabled={input.disabled}
                                            />

                                            {visiblePickers[input.name] && (
                                                <DateTimePicker
                                                    value={value || new Date()}
                                                    mode="date"
                                                    display="spinner"
                                                    onChange={(event, selectedDate) => {
                                                        onChange(selectedDate || value);
                                                        togglePicker(input.name);
                                                    }}
                                                />
                                            )}
                                        </View>
                                    );
                                default:
                                    return <Text style={{ color: "red" }}>Tipo de campo no soportado</Text>;
                            }
                        }}
                    />

                    {input.errors && input.errors[input.name] && input.errors[input.name]?.message && (
                        <Text
                            style={{ color: theme.colors.primary }}

                        >{String(input.errors[input.name]?.message)}</Text>
                    )}
                </View>
            ))}
            {/* {navLink && (
                <CustomButton
                    title={navLink.text}
                    onPress={navLink.onPress}
                    style={styles.navLink}
                    textStyle={styles.textButton}
                />
            )}  */}
        </View>
    );
};

export default ReusableForm;

const { width, height } = Dimensions.get('window');

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        form: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 25,

        },
        radioGroup: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 15
        },
        containerPicker: {
            width: width * 0.3,
            borderRadius: 10,
            justifyContent: "center",
            borderWidth: 1,
            borderColor: theme.colors.card,
            height: height * 0.1,
        },
        label: {
            marginBottom: 5,
            color: theme.colors.text,
            textAlign: 'center',
            fontSize: 20,
        },
        buttonSend: {
            alignSelf: "center"
        },
        picker: {
            color: theme.colors.text,
        },
        pickerItem: {
            color: theme.colors.text,
            fontSize: 10,
        },
        containerIcon: {
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 10,
            paddingHorizontal: 10,
            width: width * 0.88,
            height: height * 0.1,
        },
        inputIcon: {
            marginRight: 10,
        },
        input: {
            color: theme.colors.text,
        },
        textarea: {
            height: 100,
            textAlignVertical: "top",
        },
        error: {
            color: theme.colors.primary,
            fontSize: 12,
            padding: 10
        },
        radioOption: {
            flexDirection: "row",
            marginBottom: 8,
            width: width * 0.4,

        },
        radioButton: {
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: theme.colors.card,
            alignItems: "flex-end",
            justifyContent: "center",
            marginRight: 10,
            alignSelf: "flex-end"
        },
        radioButtonSelected: {
            borderColor: theme.colors.card,
        },
        radioInnerCircle: {
            height: height * 0.025,
            width: width * 0.05,
            borderRadius: 5,
            backgroundColor: theme.colors.card,
        },
        radioLabel: {
            fontSize: 16,
            color: theme.colors.text,
            textAlign: 'center'
        },
        containerRadio: {
            gap: 10,
        },
        containerDatePicker: {
            gap: 10
        },
        dateText: {
            color: theme.colors.text,
            fontSize: 16,
        },
        buttonDataPicker: {
            backgroundColor: 'transparent',
            padding: 15,
            width: width * 0.4,
            height: height * 0.1,
            borderWidth: 1,
            borderColor: theme.colors.card,
            borderBlockEndColor: theme.colors.notification,
        },
        buttonDataPickeText: {
            color: theme.colors.text,
            fontWeight: '400',
            fontSize: 14

        },
        dataPickerLabel: {
            color: theme.colors.text,
            textAlign: 'center',
        }
    });

