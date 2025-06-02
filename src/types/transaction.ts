
export interface Transaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: Date;
  category?: string;
}

export interface TransactionFormData {
  amount: string;
  type: 'credit' | 'debit';
  description: string;
  date: string;
  time: string;
  category?: string;
}

export interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

export interface FilterOptions {
  type: 'all' | 'credit' | 'debit';
  dateRange: DateRange;
}
