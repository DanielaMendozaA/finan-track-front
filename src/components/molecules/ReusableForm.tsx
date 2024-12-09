import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, TextInput, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Theme, useTheme } from "@react-navigation/native";
import { Dimensions } from 'react-native';
import CustomButton from "../atoms/CustomTouchableButton";

interface IInput {
    name: string;
    label?: string;
    type: string;
    placeholder?: string;
    options?: { label: string; value: string }[];
    rules?: object;
    iconName?: string;
    iconLibrary?: any;
}

interface IFormProps {
    inputs: IInput[];
    onSubmit: (data: any) => void;
    buttonText: string;
    navLink?: { path: string; text: string; onPress: () => void };
    defaultValues?: any;
    style?: object;
}

const ReusableForm = ({ inputs, onSubmit, buttonText, navLink, defaultValues, style  }: IFormProps) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues
    });
    const theme = useTheme()
    const fontStyles = theme.fonts.heavy;
    const styles = createStyles(theme)

    const getErrorMessage = (error: any): string | null => {
        if (!error) return null;
        if (error.type === "required") return "Este campo es obligatorio";
        if (error.type === "pattern" && typeof error.message === "string") return error.message;
        return null;
    };


    return (
        <View style={styles.form}>
            {inputs.map((input, index) => (
                <View key={index} style={[styles.form, style]}>
                    <Text style={styles.label}>{input.label}</Text>

                    <Controller
                        control={control}
                        name={input.name}
                        rules={input.rules}
                        render={({ field: { onChange, onBlur, value } }) => {
                            switch (input.type) {
                                case "text":
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
                                                style={[styles.input]}
                                                placeholder={input.placeholder}
                                                placeholderTextColor={theme.colors.text}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        </View>
                                    );

                                case "textarea":
                                    return (
                                        <TextInput
                                            style={[styles.input, styles.textarea]}
                                            placeholder={input.placeholder}
                                            placeholderTextColor={theme.colors.text}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            multiline
                                            numberOfLines={4}
                                        />
                                    );

                                case "checkbox":
                                    return (
                                        <Switch
                                            value={value || false}
                                            onValueChange={onChange}
                                        />
                                    );

                                case "select":
                                    return (
                                        <Picker
                                            selectedValue={value}
                                            onValueChange={onChange}
                                            style={styles.picker}
                                        >
                                            {input.options?.map((option, idx) => (
                                                <Picker.Item key={idx} label={option.label} value={option.value} />
                                            ))}
                                        </Picker>
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
                                                style={[styles.input]}
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
                                        <View>
                                            {input.options?.map((option, idx) => (
                                                <View key={idx} style={styles.radioOption}>
                                                    <TouchableOpacity
                                                        style={styles.radioButton}
                                                        onPress={() => onChange(option.value)}
                                                    >
                                                        {value === option.value && (
                                                            <View style={styles.radioInnerCircle} />
                                                        )}
                                                    </TouchableOpacity>
                                                    <Text style={styles.radioLabel}>{option.label}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    );


                                default:
                                    return <Text style={{ color: "red" }}>Tipo de campo no soportado</Text>;
                            }
                        }}
                    />
                    {errors[input.name] && (
                        <Text style={styles.error}>
                            {getErrorMessage(errors[input.name])}
                        </Text>
                    )}
                </View>
            ))}


                <CustomButton
                    title={buttonText}
                    onPress={handleSubmit(onSubmit)}
                    style={styles.buttonSend}

                />

                {navLink && (

                    <CustomButton
                        title={navLink.text}
                        onPress={navLink.onPress}
                        style={styles.navLink}
                        textStyle={styles.textButton}

                    />
                )}
        </View>
    );
};

export default ReusableForm;

const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        form: {
            // padding: 10,
            // gap: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        label: {
            marginBottom: 5,
            color: theme.colors.text
        },
        buttonSend:{
            marginTop: 35
        },
        containerIcon: {
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 10,
            paddingHorizontal: 10,
            // marginBottom: 10,
            width: width * 0.88,
            height: height * 0.1
        },
        inputIcon: {
            marginRight: 10,
        },
        input: {
            // paddingVertical: 10,
            color: theme.colors.text,
        },
        textarea: {
            height: 100,
            textAlignVertical: "top",
        },
        picker: {
            height: 50,
            borderWidth: 1,
            borderColor: theme.colors.text,
            borderRadius: 5,
            color: theme.colors.text,
        },
        error: {
            color: theme.colors.primary,
            fontSize: 12,
            padding: 10
        },
        navLink: {
            alignSelf: "center",
            backgroundColor: theme.colors.background,
        },
        textButton: {
            color: theme.colors.text,
            fontSize: 20,
        },
        navLinkText: {
            color: theme.colors.text,
            fontSize: 20
        },
        radioOption: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            color: theme.colors.text,
        },
        radioButton: {
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: theme.colors.primary,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
        },
        radioButtonSelected: {
            borderColor: theme.colors.card,
        },
        radioInnerCircle: {
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: theme.colors.card,
        },
        radioLabel: {
            fontSize: 16,
            color: theme.colors.text
        },
    });
