// import { useEffect, useState } from "react";
// import { IBudget } from "../../services/budgets/interfaces/get-all-budgets-response.interface";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BudgetService } from "../../services/budgets/budget.service";

// export const useFetchGetBudgets = (
//     type?: 'occasional' | 'frequency',

// ) => {
//     const [loading, setLoading] = useState(false);
//     const [data, setData] = useState<IBudget[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [reload, setReload] = useState(false); 

//     const fetchBudgets = async () => {
//         const storedUser = await AsyncStorage.getItem('user')
//         console.log("este es el usuario desde fetch", storedUser);
//         if (!storedUser) {
//             setError("User ID not found");
//             return;
//         }

//         const user = JSON.parse(storedUser);
//         const userId = user.id;

//         setLoading(true);

//         try {
//             let result
//             if (type === 'frequency') {
//                 result = await BudgetService.getAllFrequency(userId);
//                 console.log("el result desde frequency", result);

//             } else {
//                 result = await BudgetService.getAllOccasional(userId)
//                 console.log("el result desde occasional", result);
//             }


//             setData(result.data);
//         } catch (err: any) {
//             console.error(err);
//             setError(err.message || "Error fetching data");
//         } finally {
//             setLoading(false);
//         }
//     };


//     useEffect(() => {
//         fetchBudgets();
//     }, [reload]);

//     const refetch = () => setReload(prev => !prev);

//     return { data, loading, error, refetch, setReload, reload };

// }


import { useEffect, useState } from "react";
import { IBudget } from "../../services/budgets/interfaces/get-all-budgets-response.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BudgetService } from "../../services/budgets/budget.service";

export const useFetchGetBudgets = (type?: "occasional" | "frequency") => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IBudget[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Función para obtener los presupuestos
    const fetchBudgets = async () => {
        setLoading(true);

        try {
            const storedUser = await AsyncStorage.getItem("user");
            if (!storedUser) {
                setError("User ID not found");
                return;
            }

            const user = JSON.parse(storedUser);
            const userId = user.id;

            let result;
            if (type === "frequency") {
                result = await BudgetService.getAllFrequency(userId);
            } else {
                result = await BudgetService.getAllOccasional(userId);
            }

            setData(result.data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    // Llama a fetchBudgets solo cuando el hook se monta
    useEffect(() => {
        fetchBudgets();
    }, [type]);

    // Función `refetch` para recargar manualmente los datos
    const refetch = () => {
        fetchBudgets();
    };

    return {
        data,
        loading,
        error,
        refetch,
    };
};


