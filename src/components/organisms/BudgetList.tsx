import React from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme, useNavigation, useTheme } from '@react-navigation/native';

import { isBefore, isWithinInterval } from "date-fns";
import { subHours } from "date-fns";


import ReusableFlatList from '../molecules/CustomFlatList';
import { IBudget } from '../../services/budgets/interfaces/get-all-budgets-response.interface';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { BarProgress } from '../molecules/BarProgress';
import { DrawerSingleBudgetNavigationProp } from '../../navigation/types/types';


const validateDates = (start: string, end: string) => {

    const currentDate = subHours(new Date(), 5);

    let statusBudget
    const isWithin = isWithinInterval(currentDate, {
        start,
        end
    });

    if (isWithin) {
        statusBudget = 'En Curso'
    } else if (isBefore(currentDate, start)) {
        statusBudget = 'Pendiente'
    } else {
        statusBudget = 'Completada'
    }

    console.log("la fecha esta en el intervalo??", isWithin);

    return statusBudget;

};


interface IBudgetListProp {
    data: IBudget[];
    loading: boolean

}

export const BudgetList: React.FC<IBudgetListProp> = ({ data, loading }) => {
    const navigation = useNavigation<DrawerSingleBudgetNavigationProp>(); 

    const theme = useTheme()
    const styles = createStyles(theme)

    const { width, height } = Dimensions.get('window');

    const renderItem = ({ item }: { item: IBudget }) => {



        const availableProgress = Math.round((+item.currentAmount / +item.baseAmount) * 100);

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
        const handleNavigationToSingle = () => {
            navigation.navigate('SingleBudget', {budget: item})
        }


        return (
            <TouchableOpacity onPress={handleNavigationToSingle} activeOpacity={0.8}>
                <View style={{ borderRadius: 30, overflow: 'hidden', marginBottom: 20 }}>


                    <Svg height={height * 0.4} width="100%">
                        <Defs>
                            <LinearGradient id="grad" x1="0" y1="0.5" x2="0.5" y2="1.3">
                                <Stop offset="1" stopColor={theme.colors.background} stopOpacity="0.5" />
                                <Stop offset="0.2" stopColor={theme.colors.card} stopOpacity="1" />
                            </LinearGradient>
                        </Defs>
                        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
                    </Svg>

                    <View style={[styles.itemContainer, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}>

                        <Text style={{
                            color: theme.colors.text,
                            fontSize: 25,
                            textAlign: 'center'



                        }}>{item.title.toUpperCase()}</Text>

                        <View style={styles.containerViewTextF}>
                            <View style={styles.containerViewText}>
                                <Text>
                                    <Text
                                        style={[styles.itemText]}
                                    >Disponible: </Text>
                                    <Text
                                        style={[styles.itemText, { color: textColorAvailable }, styles.itemTextNumber]}
                                    >{`${item.currentAmount} ${item.currency}`}</Text>
                                </Text>

                                <Text>
                                    <Text
                                        style={styles.itemText}
                                    >Gastado: </Text>
                                    <Text
                                        style={[styles.itemText, { color: theme.colors.primary }, styles.itemTextNumber]}
                                    >{`${+item.baseAmount - +item.currentAmount} ${item.currency}`}</Text>
                                </Text>
                            </View>

                            <Text
                                style={[styles.itemText, { color: theme.colors.primary }]}
                            >{item.frequency === 'montly' ?
                                "MENSUAL" :
                                item.frequency === 'biweekly' ?
                                    "QUINCENAL" :
                                    item.frequency === 'weekly' ?
                                        "SEMANAL" :
                                        "UNA VEZ"
                                }</Text>

                        </View>


                        <BarProgress
                            progress={availableProgress}

                        />

                        <Text
                            style={[styles.text, {
                                color: theme.colors.notification,

                            }]}
                        >
                            {validateDates(item.startDate || new Date().toISOString(), item.endDate || new Date().toISOString())}
                        </Text>


                    </View>

                </View>
                </TouchableOpacity>


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
                emptyMessage='No hay presupuestos disponibles'
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
            padding: 10,
            borderRadius: 30,
            gap: 30,

        },
        itemText: {
            color: theme.colors.notification,
            fontSize: 15,
            fontWeight: '400'
        },
        itemTextNumber: {
            fontWeight: '500'
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
        text: {
            fontSize: 18,
            fontWeight: '400',
            textAlign: 'center'
        },


    });

