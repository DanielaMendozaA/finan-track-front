import React, { useState } from 'react'
import { useFetchGetBudgets } from '../../hooks/budgets/useFetchGetBudgets'
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import ReusableFlatList from '../molecules/CustomFlatList';
import { IBudget } from '../../services/budgets/interfaces/get-all-budgets-response.interface';
import BudgetPieChart from './PieChaty';
import { CustomInput } from '../atoms/CustomInput';

const formatDateManual = (dateString: string) => {
    const months = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    // const month = months[date.getMonth()];
    const month = date.getMonth();

    const year = date.getFullYear();

    return `${day} - ${month} - ${year}`;
};

export const FrequencyList = () => {
    const [title, setTitle] = useState('');

    const { data, loading, error, reload, setReload } = useFetchGetBudgets()

    const theme = useTheme()
    const styles = createStyles(theme)

    const handleInputChange = (text: string) => {

        console.log('este es el text', text);
        setTitle(text)


    }

    const renderItem = ({ item }: { item: IBudget }) => {
        const startDate = formatDateManual(new Date(item.startDate).toISOString().split('T')[0])

        const endDate = formatDateManual(new Date(item.endDate).toISOString().split('T')[0])


        return (
            <View>
                {/* <CustomInput
                    value={title}
                    onChange={handleInputChange}
                    placeholder='Ingrese el titulo'

                /> */}

                <View style={styles.itemContainer}>
                    <BudgetPieChart
                        initialBudget={Number(item.baseAmount)}
                        title={item.title}
                        currentBudget={Number(item.currentAmount)}
                    />
                    <View style={styles.textContainer}>
                        <Text style={
                            {
                                color: theme.colors.primary,
                                fontSize: 18,
                                fontWeight: '300'
                            }
                        }>Mensual</Text>
                        <Text style={styles.itemText}>{`Del ${startDate}`}</Text>
                        <Text style={styles.itemText}>{`Al ${endDate}`}</Text>
                    </View>
                </View>
            </View>
        );
    };


    const keyExtractor = (item: any) => item.id.toString();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View>
            <ReusableFlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                isLoading={loading}
            />
        </View>
    )
}


const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        itemContainer: {
            padding: 16,
            backgroundColor: theme.colors.card,
            borderRadius: 30,

        },
        itemText: {
            color: theme.colors.text,
            fontSize: 15,
        },
        textContainer: {
            justifyContent: 'center',
            marginTop: 20,
            alignItems: 'center',
            gap: 8
        }
    });

