import React from "react";
import { Modal, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import CustomButton from "../atoms/CustomTouchableButton";
import { Theme, useTheme } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    style?: object
}

const ReusableModal: React.FC<ModalProps> = ({ visible, onClose, children, style }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardAvoiding}
                >
                    <View style={[styles.modalContent, style]}>
                        <CustomButton
                            title=""
                            onPress={onClose}
                            iconName="closesquare"
                            size={35}
                            IconComponent={AntDesign}
                            style={styles.closeButton}
                            color={theme.colors.text}
                        />

                        <ScrollView
                            contentContainerStyle={styles.scrollViewContent}
                            showsVerticalScrollIndicator={false}
                        >
                            {children}
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

export default ReusableModal;

const { width, height } = Dimensions.get('window');

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        modalOverlay: {
            minHeight: height,
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
            justifyContent: "center", 
            alignItems: "center",
            minWidth: width
          },
        modalContent: {
            backgroundColor: theme.colors.background,
            minHeight: height,
            minWidth: width,
            gap: 10,
        },
        closeButton: {
            backgroundColor: 'transparent',
            width: 'auto',
            alignSelf: 'flex-end',
            padding: 0,
            marginTop: 10,
            marginRight: 10
        },
        keyboardAvoiding: {
            flex: 1,
            justifyContent: "center",
        },
        scrollViewContent: {
            flexGrow: 1,
        },
    });
