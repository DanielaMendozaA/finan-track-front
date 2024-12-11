import { Theme, useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import CustomButton from '../atoms/CustomTouchableButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IBudgetPieChart {
    initialBudget: number,
    currentBudget: number,
    title: string

}

const BudgetPieChart = ({ initialBudget, currentBudget, title }: IBudgetPieChart) => {

    const spentBudget = initialBudget - currentBudget

    const theme = useTheme()
    const styles = createStyles(theme)

    let textColorAvailable
    if (initialBudget === currentBudget) {
        textColorAvailable = '#15fa15'
    } else if (currentBudget === (initialBudget / 2) || currentBudget < (initialBudget / 2)) {
        textColorAvailable = '#e89e27'
    } else {
        textColorAvailable = '#e64e20'
    }


    const pieData = [
        {
            key: 1,
            value: currentBudget,
            svg: { fill: theme.colors.primary },
            label: ['Disponible', currentBudget],
            textColor: textColorAvailable,
        },
        {
            key: 2,
            value: spentBudget,
            svg: { fill: theme.colors.border },
            label: ['Gastado', spentBudget],
            textColor: "#F25E5E",
        },
    ];

    return (
        <View style={styles.container}>

            <View style={styles.containerButtons}>
                <Text style={styles.title}>{title}</Text>
                <CustomButton
                    onPress={() => { }}
                    iconName='more-horiz'
                    size={35}
                    color={theme.colors.text}
                    style={styles.customButtons}

                />

            </View>

            <View style={styles.initialAmount}>
                {/* <Icon name='balance' size={30} color={theme.colors.primary} /> */}
                <View style={styles.containerText}>
                    <Text style={{
                        color: theme.colors.text,
                        fontSize: 18,
                        fontWeight: '300'



                    }}>Balance Inicial: </Text>
                    <Text style={{
                        color: '#15fa15',
                        fontSize: 18,
                        fontWeight: '300'
                    }}>{initialBudget} COP</Text>
                </View>
            </View>



            <View style={styles.legendContainer}>

                <View style={styles.containerChart}>
                    <PieChart
                        style={{ height: 80, width: 80 }}
                        data={pieData}
                        valueAccessor={({ item }) => item.value}
                        outerRadius="100%"
                        innerRadius="50%"
                    />
                    <Text style={{ color: theme.colors.border, fontSize: 18 }}>En Curso</Text>
                </View>

                <View style={styles.labelContainer}>

                    {pieData.map((item) => (
                        <View key={item.key} style={styles.legendItem}>

                            <View style={[styles.legendColor, { backgroundColor: item.svg.fill }]}>
                            </View>

                            <View style={styles.legendText}>
                                <Text style={styles.legendText}>{item.label[0]}</Text>
                                <Text style={[styles.legendTextMoney, { color: item.textColor }]}>{item.label[1]} COP</Text>
                            </View>


                        </View>
                    ))}

                </View>


            </View>


        </View>
    );
};

const { width, height } = Dimensions.get('window');
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        containerView: {
            flexDirection: 'row'
        },
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            width: width * 0.8
        },
        labelContainer: {
            justifyContent: 'center',
            gap: 20,

        },

        title: {
            fontSize: 25,
            color: theme.colors.text,
        },
        initialAmount: {
            borderBottomWidth: 3,
            borderBottomColor: theme.colors.border,
            paddingBottom: 4,
            width: width * 0.8,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10

        },
        containerText: {
            flexDirection: 'row'
        },
        legendContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: width * 0.8,


        },
        legendItem: {
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center'
        },
        legendColor: {
            width: 16,
            height: 16,
        },
        legendText: {
            fontSize: 14,
            color: theme.colors.text,
            flexDirection: 'column'

        },
        legendTextMoney: {
            color: 'green'
        },
        containerButtonsText: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 20
        },
        customButtons: {
            backgroundColor: theme.colors.card,
            padding: 0,
            width: 'auto',
        },
        containerButtons: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 20,
            maxWidth: width * 0.8,
            width: width * 0.8,
        },
        containerChart: {
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
        }
    });

export default BudgetPieChart;
