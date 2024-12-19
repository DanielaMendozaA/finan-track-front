import { useState } from "react";
import { TransactionService } from "../../services/transactions/transaction.service";
import { ICreateTransaction } from "../../services/transactions/interfaces/create-transaction-interface";


export const useSubmitTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const submitTransaction = async (
    transactionData: ICreateTransaction,
    onSuccess?: (newTransaction: any) => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      const createdTransaction = await TransactionService.createTransaction(transactionData);
      setSuccess(true);
      if (onSuccess) onSuccess(createdTransaction);
    } catch (err) {
      setError("Hubo un error al crear la transacción.");
      console.error(err); 
    } finally {
      setLoading(false);
    }
  };

  return { submitTransaction, loading, error, success };
};
