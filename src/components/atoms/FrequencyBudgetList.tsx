import React from 'react'

import { BudgetList } from '../organisms/BudgetList';
import { useFetchGetBudgets } from '../../hooks/budgets/useFetchGetBudgets';
import { useEffect } from 'react';

interface FrequencyBudgetProps {
    reload: boolean;
}


const FrequencyBudget: React.FC<FrequencyBudgetProps> = ({ reload }) => {

    const { data, loading, refetch } = useFetchGetBudgets('frequency');


    useEffect(() => {
        refetch();
    }, [reload]);



    return (
        <BudgetList 
        
        loading={loading} 
        data={data}
        
        
        />
    )
}

export default FrequencyBudget