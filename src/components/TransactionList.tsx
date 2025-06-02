
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Calendar } from 'lucide-react';
import { useTransactions } from '../contexts/TransactionContext';
import { DeleteTransactionDialog } from './DeleteTransactionDialog';
import { DatePickerWithRange } from './DatePickerWithRange';
import { DateRange } from '../types/transaction';

export const TransactionList: React.FC = () => {
  const { filteredTransactions, updateFilters, filters } = useTransactions();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteClick = (id: string) => {
    setTransactionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDateRangeChange = (dateRange: DateRange) => {
    updateFilters({ dateRange });
  };

  const handleTypeFilterChange = (type: 'all' | 'credit' | 'debit') => {
    updateFilters({ type });
  };

  const clearFilters = () => {
    updateFilters({ 
      type: 'all', 
      dateRange: { from: undefined, to: undefined } 
    });
    setSearchTerm('');
  };

  const displayedTransactions = filteredTransactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Transactions</span>
          <span className="text-sm font-normal text-muted-foreground">
            {displayedTransactions.length} transactions
          </span>
        </CardTitle>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:max-w-xs"
          />
          
          <Select value={filters.type} onValueChange={handleTypeFilterChange}>
            <SelectTrigger className="sm:w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="credit">Credit</SelectItem>
              <SelectItem value="debit">Debit</SelectItem>
            </SelectContent>
          </Select>

          <DatePickerWithRange
            dateRange={filters.dateRange}
            onDateRangeChange={handleDateRangeChange}
          />

          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {displayedTransactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No transactions found</p>
            <p className="text-sm">Try adjusting your filters or add a new transaction</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{transaction.description}</h3>
                    <Badge 
                      variant={transaction.type === 'credit' ? 'default' : 'destructive'}
                      className={
                        transaction.type === 'credit' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100' 
                          : 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-100'
                      }
                    >
                      {transaction.type}
                    </Badge>
                    {transaction.category && (
                      <Badge variant="outline" className="text-xs">
                        {transaction.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDateTime(transaction.date)}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`text-lg font-semibold ${
                    transaction.type === 'credit' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteClick(transaction.id)}
                    className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <DeleteTransactionDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        transactionId={transactionToDelete}
      />
    </Card>
  );
};
