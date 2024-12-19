import React, { useState } from 'react';
import { Icon } from 'react-native-paper';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { categoryType } from '../../services/categories/interfaces/create-category-interface';
import ReusableFlatList from '../molecules/CustomFlatList';
import { Theme, useTheme } from '@react-navigation/native';
import { ICategory } from '../../services/budgets/interfaces/get-all-budgets-response.interface';
import { categories } from '../../utilities/const/categories';
import CustomButton from '../atoms/CustomTouchableButton';
import ModalCategoriesByType from '../molecules/ModalCategoriesByType';

interface ICategoryListProps {
    data: ICategory[];
}

export const CategoryList: React.FC<ICategoryListProps> = ({ data }) => {
    const [isModalVisible, setIsModalvisible] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);


    const theme = useTheme()
    const styles = createStyles(theme)

    const groupCategoryType = (type: categoryType) => {
        console.log("esta es la data", data);

        const groupData = data.filter(cat => cat.type === type)
        return groupData
    }

    const handleOpenModal = (type: categoryType) => {
        const groupOfCategories = groupCategoryType(type);
        setSelectedCategories(groupOfCategories);
        setIsModalvisible(true);
    };


    const handleCloseModal = () => {
        setIsModalvisible(false)
    }



    const renderItem = ({ item }: { item: { title: categoryType; icon: string } }) => {


        const groupOfCategories = groupCategoryType(item.title);

        const baseAmount = groupOfCategories.reduce((total, cat) => total += +cat.baseAmount, 0);

        const currentAmount = groupOfCategories.reduce((total, cat) => total += +cat.currentAmount, 0);

        const spentAmount = baseAmount - currentAmount;

        let textColorAvailable;
        if (+currentAmount < 0) {
            textColorAvailable = '#ff0000'; 
        } else if (+baseAmount === +currentAmount || +currentAmount > (+baseAmount / 2)) {
            textColorAvailable = '#35bf35'; 
        } else if (+currentAmount === (+baseAmount / 2) || +currentAmount < (+baseAmount / 2)) {
            textColorAvailable = '#e89e27'; 
        } else if (+baseAmount - +currentAmount < 0) {
            textColorAvailable = '#e64e20'; 
        }

        const totalCategories = groupOfCategories.length

        if (!totalCategories) {
            return <></>
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => handleOpenModal(item.title)} activeOpacity={0.8}>
                    <View style={styles.card}>

                        <View style={styles.containerIconText}>
                            <Icon
                                source={item.icon}
                                color={theme.colors.border}
                                size={35}
                            />
                            <Text style={styles.title}>{item.title}</Text>
                            <CustomButton
                                onPress={() => { }}
                                iconName="more-vert"
                                color={theme.colors.border}
                                size={24}
                                style={styles.button}
                                IconComponent={MaterialIcons}
                            />

                        </View>

                        <Text style={[styles.title, { fontSize: 17 }]}>Total Categorias: {totalCategories}</Text>

                        <View style={styles.containerContent}>

                            <View style={styles.containerContentLeft}>

                                <Text style={[styles.title, { fontSize: 17 }]}>

                                    Disponible: <Text style={{ color: textColorAvailable }}>
                                        {currentAmount}
                                    </Text>
                                </Text>
                                <Text style={[styles.title, { fontSize: 17 }]}>

                                    Gastado: <Text style={{ color: theme.colors.primary }}>
                                        {spentAmount}
                                    </Text>
                                </Text>




                            </View>


                            <View style={styles.containerContentRight}>
                                <Text style={[styles.title, { fontSize: 17 }]}>

                                    Total: <Text style={{ color: textColorAvailable }}>
                                        {baseAmount}
                                    </Text>
                                </Text>

                            </View>

                        </View>

                    </View>
                </TouchableOpacity>
            </View>

        )
    }

    const keyExtractor = (item: any) => item.id.toString();

    return (
        <View style={styles.container}>
            <ReusableFlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                emptyMessage='No hay presupuestos disponibles'
            />

            <ModalCategoriesByType
                onClose={handleCloseModal}
                visible={isModalVisible}
                data={selectedCategories}
            />
        </View>
    );
};


const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.card,
            marginBottom: 30,
            alignItems: 'center',
        },
        listContent: {
            alignItems: 'center',
        },
        card: {
            padding: 20,
            backgroundColor: theme.colors.background,
            borderRadius: 10,
            width: 300,
            gap: 10
        },
        title: {
            fontSize: 20,
            fontWeight: '300',
            color: '#fff',
        },
        containerIconText: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
        },
        button: {
            backgroundColor: theme.colors.background,
            width: 'auto',
            padding: 0
        },
        containerContent: {
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
    });
