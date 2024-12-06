import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, TextInput, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Theme, useTheme } from "@react-navigation/native";
import { Dimensions } from 'react-native';

interface IInput {
    name: string;
    label?: string;
    type: string;
    placeholder?: string;
    options?: { label: string; value: string }[];
    rules?: object;
}

interface IFormProps {
    inputs: IInput[];
    onSubmit: (data: any) => void;
    buttonText: string;
    navLink?: { path: string; text: string; onPress: () => void };
}

const ReusableForm = ({ inputs, onSubmit, buttonText, navLink }: IFormProps) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
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
                <View key={index}>
                    <Text style={styles.label}>{input.label}</Text>

                    <Controller
                        control={control}
                        name={input.name}
                        rules={input.rules}
                        render={({ field: { onChange, onBlur, value } }) => {
                            switch (input.type) {
                                case "text":
                                    return (
                                        <TextInput
                                            style={styles.input}
                                            placeholder={input.placeholder}
                                            placeholderTextColor={theme.colors.text}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
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
                                        <TextInput
                                            style={styles.input}
                                            placeholder={input.placeholder}
                                            placeholderTextColor={theme.colors.text}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            secureTextEntry
                                        />
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
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.touchableButton}>
                <Text style={[styles.button, fontStyles]}>{buttonText}</Text>
            </TouchableOpacity>
            {navLink && (
                <TouchableOpacity onPress={navLink.onPress} style={styles.navLink}>
                    <Text style={styles.navLinkText}>{navLink.text}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ReusableForm;

const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        form: {
            padding: 10,
            gap: 10
        },
        label: {
            marginBottom: 5,
            color: theme.colors.text
        },
        input: {
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 10,
            padding: 25,
            color: theme.colors.text,
            width: width * 0.88
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
            marginTop: 20,
            alignSelf: "center",
        },
        touchableButton: {
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10
        },
        button: {
            backgroundColor: theme.colors.border,
            padding: 15,
            textAlign: "center",
            width: '70%',
            borderRadius: 15,
            fontWeight: "bold",
            fontSize: 18
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
