import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';

// 1. Schema de Validação
export const transactionSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 letras"),
  amount: z.coerce.number().min(0.01, "O valor deve ser positivo"),
  category: z.enum(['Alimentação', 'Transporte', 'Lazer', 'Outros', 'Salário']),
  type: z.enum(['expense', 'income']),
});

export type Transaction = z.infer<typeof transactionSchema> & { id: string; date: string };

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (data: Omit<Transaction, 'id' | 'date'>) => void;
  deleteTransaction: (id: string) => void;
  getBalance: () => number;
}

// 2. Store com Persistência
export const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: [],
      
      addTransaction: (data) => set((state) => ({
        transactions: [
          { ...data, id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString() },
          ...state.transactions
        ]
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),

      getBalance: () => {
        const { transactions } = get();
        return transactions.reduce((acc, curr) => {
          return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
        }, 0);
      }
    }),
    {
      name: 'pocketfinance-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);