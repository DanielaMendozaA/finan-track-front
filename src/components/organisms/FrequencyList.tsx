import React from 'react'
import { useFetchGetBudgets } from '../../hooks/budgets/useFetchGetBudgets'
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import ReusableFlatList from '../molecules/CustomFlatList';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../atoms/CustomTouchableButton';
import { IBudget } from '../../services/budgets/interfaces/get-all-budgets-response.interface';

export const FrequencyList = () => {
    const { data, loading, error, reload, setReload } = useFetchGetBudgets()

    const theme = useTheme()
    const styles = createStyles(theme)

    const renderItem = ({ item }: { item: IBudget }) => {
        console.log(typeof(item.startDate))
        const startDataObject = new Date(item.startDate)
        const startDate = startDataObject.toISOString().split('T')[0]

        const endDateObjet =  new Date(item.endDate)
        const endDate = endDateObjet.toISOString().split('T')[0]


        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.title}</Text>
                <Text style={styles.itemText}>{`Balance Inicial: ${item.baseAmount}`}</Text>
                <Text style={styles.itemText}>{`Balance Actual: ${item.currentAmount}`}</Text>
                <Text style={styles.itemText}>{`Del ${startDate}`}</Text>
                <Text style={styles.itemText}>{`Al ${endDate}`}</Text>
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
            backgroundColor: theme.colors.card
     
        },
        itemText: {
            color: theme.colors.text,
            fontSize: 20,
        },
    });

