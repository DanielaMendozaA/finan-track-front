import React from 'react'

import { BudgetList } from '../organisms/BudgetList';
import { useFetchGetBudgets } from '../../hooks/budgets/useFetchGetBudgets';

const FrequencyBudget = () => {
 
    const { data, loading } = useFetchGetBudgets('frequency');

    return (
            <BudgetList loading={loading} data={data} />
    )
}

export default FrequencyBudget