
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useTransactions } from '../contexts/TransactionContext';

export const SummaryCards: React.FC = () => {
  const { getTotalCredit, getTotalDebit, getBalance } = useTransactions();
  
  const totalCredit = getTotalCredit();
  const totalDebit = getTotalDebit();
  const balance = getBalance();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">
            Total Income
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            {formatCurrency(totalCredit)}
          </div>
          <p className="text-xs text-green-700 dark:text-green-300">
            Credit transactions
          </p>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-800 dark:text-red-200">
            Total Expenses
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-900 dark:text-red-100">
            {formatCurrency(totalDebit)}
          </div>
          <p className="text-xs text-red-700 dark:text-red-300">
            Debit transactions
          </p>
        </CardContent>
      </Card>

      <Card className={`border-2 ${balance >= 0 
        ? 'border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20' 
        : 'border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/20'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${balance >= 0 
            ? 'text-blue-800 dark:text-blue-200' 
            : 'text-orange-800 dark:text-orange-200'
          }`}>
            Current Balance
          </CardTitle>
          <DollarSign className={`h-4 w-4 ${balance >= 0 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-orange-600 dark:text-orange-400'
          }`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${balance >= 0 
            ? 'text-blue-900 dark:text-blue-100' 
            : 'text-orange-900 dark:text-orange-100'
          }`}>
            {formatCurrency(balance)}
          </div>
          <p className={`text-xs ${balance >= 0 
            ? 'text-blue-700 dark:text-blue-300' 
            : 'text-orange-700 dark:text-orange-300'
          }`}>
            {balance >= 0 ? 'Positive balance' : 'Negative balance'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
