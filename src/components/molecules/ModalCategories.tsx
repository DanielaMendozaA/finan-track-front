import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import ReusableModal from "./CustomModalContent";
import { Theme, useTheme } from "@react-navigation/native";
import ButtonPaper from "../atoms/ButtonPaper";
import ModalCreateCategory from "./ModalCreateCategories";
import { categoryType } from "../../services/categories/interfaces/create-category-interface";
import { categories } from "../../utilities/const/categories";

interface ModalCategoriesProps {
    visible: boolean;
    onClose: () => void;
    onCategorySelect: (type: categoryType, name: string, baseAmount: number) => void;
}

const ModalCategories: React.FC<ModalCategoriesProps> = ({
    visible,
    onClose,
    onCategorySelect,
}) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    const [selectedCategory, setSelectedCategory] = useState<categoryType>("");
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);

    const openCreateCategoryModal = (categoryTitle: categoryType) => {
        setSelectedCategory(categoryTitle);
        setCreateModalVisible(true);
    };


    return (
        <>
            <ReusableModal visible={visible} onClose={onClose}>
                <View style={styles.containerModal}>
                    <Text style={styles.title}>SELECCIONAR CATEGORÍA</Text>

                    {categories.map((category, index) => (
                        <ButtonPaper
                            key={index}
                            onPress={() => openCreateCategoryModal(category.title)}
                            source={category.icon}
                            title={category.title}
                        />
                    ))}
                </View>
            </ReusableModal>

            <ModalCreateCategory
                selectedType={selectedCategory}
                visible={isCreateModalVisible}
                onClose={() => setCreateModalVisible(false)}
                onCategorySubmit={(name, baseAmount) => {
                    onCategorySelect(selectedCategory, name, baseAmount);
                    setCreateModalVisible(false);

                }}
            />
        </>
    );
};

export default ModalCategories;

const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        title: {
            color: theme.colors.text,
        },
        containerModal: {
            alignItems: 'center',
            gap: 20,
            marginBottom: 50
        },

    })