import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Transaction, FilterOptions } from '../types/transaction';
import { toast } from '@/hooks/use-toast';

interface TransactionContextType {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  filters: FilterOptions;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateFilters: (filters: Partial<FilterOptions>) => void;
  getTotalCredit: () => number;
  getTotalDebit: () => number;
  getBalance: () => number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Demo data
const demoTransactions: Transaction[] = [
  {
    id: '1',
    amount: 2500,
    type: 'credit',
    description: 'Salary Payment',
    date: new Date('2024-06-01T09:00:00'),
    category: 'Income'
  },
  {
    id: '2',
    amount: 45.99,
    type: 'debit',
    description: 'Grocery Shopping',
    date: new Date('2024-06-01T14:30:00'),
    category: 'Food'
  },
  {
    id: '3',
    amount: 1200,
    type: 'debit',
    description: 'Monthly Rent',
    date: new Date('2024-05-31T10:00:00'),
    category: 'Housing'
  },
  {
    id: '4',
    amount: 89.50,
    type: 'debit',
    description: 'Gas Station',
    date: new Date('2024-05-30T16:45:00'),
    category: 'Transportation'
  },
  {
    id: '5',
    amount: 500,
    type: 'credit',
    description: 'Freelance Project',
    date: new Date('2024-05-29T11:20:00'),
    category: 'Income'
  }
];

// Helper function to parse transactions and convert date strings back to Date objects
const parseTransactions = (transactions: any[]): Transaction[] => {
  return transactions.map(transaction => ({
    ...transaction,
    date: new Date(transaction.date)
  }));
};

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('expense-tracker-transactions');
    if (saved) {
      try {
        const parsedTransactions = JSON.parse(saved);
        return parseTransactions(parsedTransactions);
      } catch (error) {
        console.error('Error parsing transactions from localStorage:', error);
        return demoTransactions;
      }
    }
    return demoTransactions;
  });
  
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'all',
    dateRange: { from: undefined, to: undefined }
  });

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('expense-tracker-transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: crypto.randomUUID(),
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    toast({
      title: "Transaction Added",
      description: `${transactionData.type === 'credit' ? 'Credit' : 'Debit'} of $${transactionData.amount.toFixed(2)} added successfully.`,
    });
  };

  const deleteTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    setTransactions(prev => prev.filter(t => t.id !== id));
    
    if (transaction) {
      toast({
        title: "Transaction Deleted",
        description: `${transaction.description} has been removed.`,
      });
    }
  };

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredTransactions = transactions.filter(transaction => {
    // Filter by type
    if (filters.type !== 'all' && transaction.type !== filters.type) {
      return false;
    }

    // Filter by date range
    if (filters.dateRange.from && transaction.date < filters.dateRange.from) {
      return false;
    }
    if (filters.dateRange.to && transaction.date > filters.dateRange.to) {
      return false;
    }

    return true;
  });

  const getTotalCredit = () => {
    return filteredTransactions
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalDebit = () => {
    return filteredTransactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getBalance = () => {
    return getTotalCredit() - getTotalDebit();
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      filteredTransactions,
      filters,
      addTransaction,
      deleteTransaction,
      updateFilters,
      getTotalCredit,
      getTotalDebit,
      getBalance
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
