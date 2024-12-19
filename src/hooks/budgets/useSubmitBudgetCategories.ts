import { useState } from "react";
import { BudgetService } from "../../services/budgets/budget.service";
import { CategoryService } from "../../services/categories/category.service";
import { categoryType } from "../../services/categories/interfaces/create-category-interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IAddCategories {
  type: categoryType;
  name: string;
  baseAmount: number;
}

export const useSubmitBudget = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const submitBudget = async (
    budgetData: any,
    categories: IAddCategories[],
    onSuccess?: (newBudget: any) => void
  ) => {
    setLoading(true);
    setError(null);
    const storedUser = await AsyncStorage.getItem('user');
    if (!storedUser) {
      setError("User ID not found");
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user.id;
    try {
      const createdBudget = await BudgetService.createBudget({ ...budgetData, userId });
      const budgetId = createdBudget.data.id;

      for (const category of categories) {
        const categoryData = {
          ...category,
          budgetId,
        };
        await CategoryService.createCategory(categoryData);
      }

      setSuccess(true);
      if (onSuccess) onSuccess(createdBudget.data);
    } catch (err) {
      setError("Hubo un error al crear el presupuesto o las categorías.");
    } finally {
      setLoading(false);
    }
  };

  return { submitBudget, loading, error, success };
};
