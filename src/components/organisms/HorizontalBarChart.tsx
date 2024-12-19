import React from 'react';
import { StackedBarChart } from 'react-native-svg-charts';
import { View } from 'react-native';
import { IBudget } from '../../services/budgets/interfaces/get-all-budgets-response.interface';
import { useTheme } from '@react-navigation/native';

interface HorizontalBarChartProps {
    data: IBudget;
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ data }) => {

    const theme = useTheme()
    const keys = ['baseAmount'] as const;
    const colors = ['#653970'];

    const chartData = [
        {
            title: data.title,
            baseAmount: +data.baseAmount,
        },
        {
            title: data.title,
            baseAmount: +data.currentAmount,
        },
    ];

    return (
        <>
            <StackedBarChart
                style={{ height: 150, width: 150 }}
                data={chartData}
                keys={keys}
                colors={colors}
                horizontal={true}
                contentInset={{ top: 20, bottom: 20 }}
            />
        </>
    );
};

export default HorizontalBarChart;
