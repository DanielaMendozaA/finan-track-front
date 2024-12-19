export interface ICreateTransaction {
    description: string,
    date: Date,
    type: string,
    amount: number,
    categoryId?: number,
    budgetId?: number
  }