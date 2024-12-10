import { useEffect, useState } from "react";
import { IBudget } from "../../services/budgets/interfaces/get-all-budgets-response.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BudgetService } from "../../services/budgets/budget.service";

export const useFetchGetBudgets = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IBudget[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState(false)

    const fetchUser = async () => {
        const storedUser = await AsyncStorage.getItem('user')
        console.log("este es el usuario desde fetch", storedUser);
        if (!storedUser) {
            setError("User ID not found");
            return;
        }

        const user = JSON.parse(storedUser);
        const userId = user.id;

        setLoading(true);

        try {
            const result = await BudgetService.getAllFrequency(userId);
            console.log("este es el result de budgets",result );
        
            setData(result.data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
      }, [reload]);

      return {
        data,
        loading,
        error,
        setReload
      }


}




