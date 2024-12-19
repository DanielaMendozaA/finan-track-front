import React, { useState } from "react";
import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import { Theme, useTheme } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import { ICategory } from '../../services/budgets/interfaces/get-all-budgets-response.interface';
import ReusableFlatList from "./CustomFlatList";
import CustomButton from "../atoms/CustomTouchableButton";
import { ModalAddTransaction } from "./ModalAddTransaction";

interface ModalCategoriesByTypeProps {
    visible: boolean;
    onClose: () => void;
    data: ICategory[]
}

const ModalCategoriesByType: React.FC<ModalCategoriesByTypeProps> = ({
    visible,
    onClose,
    data
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [categoryId, setCategoryId] = useState(0)
    const theme = useTheme();
    const styles = createStyles(theme);
    console.log("esta es la data", data)

    const handleOpenModal = () => {
        setIsModalVisible(true)
    }
    const handleCloseModal = () => {
        setIsModalVisible(false)
    }

    const renderItem = ({ item }: { item: ICategory }) => {
        let textColorAvailable;
        if (+item.currentAmount < 0) {
            textColorAvailable = '#ff0000';
        } else if (+item.baseAmount === +item.currentAmount || +item.currentAmount > (+item.baseAmount / 2)) {
            textColorAvailable = '#35bf35';
        } else if (+item.currentAmount === (+item.baseAmount / 2) || +item.currentAmount < (+item.baseAmount / 2)) {
            textColorAvailable = '#e89e27';
        } else if (+item.baseAmount - +item.currentAmount < 0) {
            textColorAvailable = '#e64e20';
        }

        return (
            <View style={styles.containerCat}>

                <View style={styles.containerIconText}>
                    <Text style={styles.title}>{item.name}</Text>
                    <CustomButton
                        onPress={() => {
                            setCategoryId(item.id); // Actualiza el categoryId correctamente
                            handleOpenModal(); // Abre el modal
                        }}
                        iconName="more-horiz"
                        color={theme.colors.border}
                        size={24}
                        style={styles.button}
                        IconComponent={MaterialIcons}
                    />

                </View>

                <View style={styles.containerContent}>

                    <View style={styles.containerContentLeft}>

                        <Text style={[styles.title, { fontSize: 17 }]}>

                            Disponible: <Text style={{ color: textColorAvailable }}>
                                {item.currentAmount}
                            </Text>
                        </Text>
                        <Text style={[styles.title, { fontSize: 17 }]}>

                            Gastado: <Text style={{ color: theme.colors.primary }}>
                                {+item.baseAmount - +item.currentAmount}
                            </Text>
                        </Text>




                    </View>


                    <View style={styles.containerContentRight}>
                        <Text style={[styles.title, { fontSize: 17 }]}>

                            Total: <Text style={{ color: textColorAvailable }}>
                                {item.baseAmount}
                            </Text>
                        </Text>

                    </View>

                </View>
            </View>

        )

    }

    const keyExtractor = (item: any) => item.id.toString();

    return (
        <>
            <Modal
                transparent={true}
                animationType="slide"
                visible={visible}
                onRequestClose={onClose}
            >
                <View style={styles.containerModal}>
                    <CustomButton
                        title=""
                        onPress={onClose}
                        iconName="closesquare"
                        size={35}
                        IconComponent={AntDesign}
                        style={styles.closeButton}
                        color={theme.colors.text}
                    />
                    <Text style={styles.title}>Categorías</Text>
                    <ReusableFlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        emptyMessage='No hay categorías disponibles'
                    />


                </View>
            </Modal>

            <ModalAddTransaction
                visible={isModalVisible}
                onClose={handleCloseModal}
                categoryId={categoryId}

            />
        </>
    );
};

export default ModalCategoriesByType;

const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        title: {
            color: theme.colors.text,
            fontSize: 20,
            fontWeight: '300'
        },
        containerModal: {
            alignItems: 'center',
            gap: 20,
            marginBottom: 50,
            backgroundColor: theme.colors.background,
            minHeight: height
        },
        closeButton: {
            backgroundColor: 'transparent',
            width: 'auto',
            alignSelf: 'flex-end',
            padding: 0,
            marginTop: 10,
            marginRight: 10
        },
        containerCat: {
            backgroundColor: theme.colors.card,
            width: width * 0.9,
            marginTop: 20,
            padding: 20,
            borderRadius: 20
        },
        containerIconText: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            width: '100%'
        },
        button: {
            backgroundColor: theme.colors.card,
            width: 'auto',
            padding: 0
        },
        containerContent: {
            marginTop: 10,
            flexDirection: 'row',
        },
        containerContentLeft: {
            maxWidth: '50%'
        },
        containerContentRight: {
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center'
        }
    })