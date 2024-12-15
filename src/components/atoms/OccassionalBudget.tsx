import React from 'react'

import { BudgetList } from '../organisms/BudgetList';
import { useFetchGetBudgets } from '../../hooks/budgets/useFetchGetBudgets';

const OccassionalBudget = () => {

    const { data, loading } = useFetchGetBudgets('occasional');

    return (

        <BudgetList loading={loading} data={data} />
    )
}



export default OccassionalBudget