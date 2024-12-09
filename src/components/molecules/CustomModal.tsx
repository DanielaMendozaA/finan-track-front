import React from "react";
import { Dimensions, Modal, StyleSheet, View , Text} from "react-native";
import CustomButton from "../atoms/CustomTouchableButton";
import { Theme, useTheme } from "@react-navigation/native";


interface ModalProps {
    visible: boolean;
    onClose: () => void;
    text: string;
}

export const CustomModalConfirmComponent: React.FC<ModalProps> = ({
    visible,
    onClose,
    text
}) => {


    const theme = useTheme()
    const styles = createStyles(theme)


    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.containerModal}>
                    <Text style={styles.text}>
                        {text}
                    </Text>

                    <CustomButton
                        title="Cerrar"
                        onPress={onClose}
                    />
                </View>
            </View>
        </Modal>
    );
};


const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        overlay: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        containerModal: {
            width: '80%',
            backgroundColor: theme.colors.text,
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
        },
        text: {
            color: '#3c1f14',
            fontSize: 20,
            textAlign: "center"
        }
    });
