import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Theme, useTheme } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialComminityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFetchGetBudgets } from '../../hooks/budgets/useFetchGetBudgets'
import ReusableFlatList from '../molecules/CustomFlatList';
import { IBudget } from '../../services/budgets/interfaces/get-all-budgets-response.interface';
import BudgetPieChart from './PieChart';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { BarProgress } from '../molecules/BarProgress';
import { CustomInput } from '../atoms/CustomInput';
import CustomButton from '../atoms/CustomTouchableButton';


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

    const { width, height } = Dimensions.get('window');
    const handleInputChange = (text: string) => {

        console.log('este es el text', text);
        setTitle(text)


    }

    const renderItem = ({ item }: { item: IBudget }) => {


        const availableProgress = Math.round((+item.currentAmount / +item.baseAmount) * 100);


        let textColorAvailable
        if (+item.baseAmount === +item.currentAmount || +item.currentAmount > (+item.baseAmount / 2)) {
            textColorAvailable = '#359635'
        } else if (+item.currentAmount === (+item.baseAmount / 2) || +item.currentAmount < (+item.baseAmount / 2)) {
            textColorAvailable = '#e89e27'
        } else {
            textColorAvailable = '#e64e20'
        }


        return (
            <View style={styles.mainContainer}>

                <View style={styles.containerFilters}>
                    <CustomButton
                        onPress={() => { }}
                        iconName="tune-variant"
                        size={30}
                        IconComponent={MaterialComminityIcons}
                        style={styles.budgetTypeButton}
                        textStyle={styles.budgetTypeButtonText}
                        color={theme.colors.text}
                    />

                    <CustomInput
                        style={styles.customInput}
                        value={title}
                        onChange={handleInputChange}
                        placeholder='Filtrar por Titulo'
                    />
                </View>
                <View style={{ borderRadius: 30, overflow: 'hidden', marginBottom: 20}}>


                    <Svg height={height * 0.4} width="100%">
                        <Defs>
                            <LinearGradient id="grad" x1="0" y1="0" x2="0.5" y2="1">
                                <Stop offset="0" stopColor={theme.colors.background}stopOpacity="0.5" />
                                <Stop offset="1" stopColor={theme.colors.card} stopOpacity="1" />
                            </LinearGradient>
                        </Defs>
                        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
                    </Svg>

                    <View style={[styles.itemContainer, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}>

                        <Text style={{
                            color: theme.colors.text,
                            fontSize: 25,
                            textAlign: 'center'



                        }}>{item.title}</Text>

                        <View style={styles.containerViewTextF}>
                            <View style={styles.containerViewText}>
                                <Text>
                                    <Text
                                        style={styles.itemText}
                                    >Disponible: </Text>
                                    <Text
                                        style={[styles.itemText, { color: textColorAvailable }]}
                                    >{item.currentAmount} COP</Text>
                                </Text>

                                <Text>
                                    <Text
                                        style={styles.itemText}
                                    >Gastado: </Text>
                                    <Text
                                        style={[styles.itemText, { color: textColorAvailable }]}
                                    >{+item.baseAmount - +item.currentAmount} COP</Text>
                                </Text>
                            </View>

                            <Text
                                style={[styles.itemText, { color: theme.colors.primary }]}
                            >{item.frequency.toUpperCase()}</Text>

                        </View>

                 
                            <BarProgress
                                progress={availableProgress}

                            />

                            <Text
                                style={[styles.text, {
                                    color: '#F25E5E',

                                }]}
                            >
                                En Curso
                            </Text>


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
        mainContainer: {
            gap: 20
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        itemContainer: {
            padding: 10,
            borderRadius: 30,
            gap: 30,

        },
        itemText: {
            color: theme.colors.text,
            fontSize: 15,
            fontWeight: '300'
        },
        textContainer: {
            justifyContent: 'center',
            marginTop: 20,
            alignItems: 'center',
            gap: 8
        },
        containerViewText: {
            gap: 20
        },
        containerViewTextF: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.8,
            gap: 10
        },
        customInput: {
            width: width * 0.7,
            borderRadius: 10
        },
        budgetTypeButton: {
            backgroundColor: theme.colors.card,
            paddingVertical: 10,
            padding: 0,
            width: '20%'
        },
        budgetTypeButtonText: {
            color: theme.colors.text,
            fontSize: 20,
            fontWeight: '400'
        },
        containerFilters: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        text: {
            fontSize: 18,
            fontWeight: '300',
            textAlign: 'center'
        },


    });

