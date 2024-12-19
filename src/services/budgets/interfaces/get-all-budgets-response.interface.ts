export interface IGetBudgets {
    statusCode: number;
    message: string;
    data: IBudget[];
}

export interface IGetBudget {
    statusCode: number;
    message: string;
    data: IBudget;
}

export interface IBudget {
    id: number;
    title: string;
    baseAmount: string;
    currentAmount: string;
    type: Type;
    currency: Currency;
    frequency?: Frequency;
    startDate?: string;
    endDate?: string;
    categories?: ICategory[]; 
}

export interface ICategory {
    id: number;
    name: string;
    baseAmount: string;
    currentAmount: string;
    type: string;
}

export type Type = 'frequency' | 'occasional';
export type Currency = 'COP' | 'USD';
export type Frequency = 'montly' | 'biweekly' | 'weekly' | 'once';
