import React from "react";
import { View, Text, StyleSheet, Dimensions, Modal, Keyboard, TouchableWithoutFeedback } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addCategorychema } from "../../utilities/yupSchema/schemas";
import ReusableForm, { IInput, KeyboardTypeEnum } from "./ReusableForm";
import { Theme, useTheme } from "@react-navigation/native";
import CustomButton from "../atoms/CustomTouchableButton";

interface ModalCreateCategoryProps {
  visible: boolean;
  onClose: () => void;
  onCategorySubmit: (name: string, baseAmount: number) => void;
  selectedType: string
}

interface FormValues {
  name: string;
  baseAmount: number;
}

const ModalCreateCategory: React.FC<ModalCreateCategoryProps> = ({
  visible,
  onClose,
  onCategorySubmit,
  selectedType
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(addCategorychema),
    defaultValues: {
      name: "",
      baseAmount: 0,
    },
  });

  const theme = useTheme();
  const styles = createStyles(theme);


  const handleSubmitForm = (data: FormValues) => {
    onCategorySubmit(data.name, Number(data.baseAmount));
    handleClose(); 
  };

  const handleClose = () => {
    reset(); 
    onClose();
  };


  const inputs: IInput<FormValues>[] = [
    {
      name: "name",
      type: "text",
      placeholder: "Nombre",
      rules: { required: "El nombre es requerido" },
      style: [styles.input],
      control,
      errors,
    },
    {
      name: "baseAmount",
      type: "text",
      placeholder: "Monto inicial",
      rules: { required: "El monto inicial es requerido" },
      keyboardType: KeyboardTypeEnum.NUMERIC,
      style: [styles.input],
      control,
      errors,
    },
  ];

  return (
    <Modal transparent={true} animationType="slide" visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <Text style={styles.title}>Tipo de categoría: {selectedType}</Text>
              <ReusableForm inputs={inputs} />
              <View style={styles.containerButton}>
                <CustomButton
                  title="Enviar"
                  onPress={handleSubmit(handleSubmitForm)}
                  size={35}
                  color={theme.colors.text}
                  style={styles.button}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalCreateCategory;

const { width, height } = Dimensions.get("window");

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    modalOverlay: {
      minHeight: height,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      backgroundColor: theme.colors.card,
      minHeight: "50%",
      width: "90%",
      padding: 20,
      borderRadius: 20,
      gap: 30,
    },
    title: {
      fontSize: 18,
      color: theme.colors.text,
      textAlign: "center",
    },
    input: {
      borderColor: theme.colors.notification,
    },
    containerButton: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
    },
    button: {
      width: width * 0.4,
    },
  });
