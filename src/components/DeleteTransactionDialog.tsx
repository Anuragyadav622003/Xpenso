
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useTransactions } from '../contexts/TransactionContext';

interface DeleteTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionId: string | null;
}

export const DeleteTransactionDialog: React.FC<DeleteTransactionDialogProps> = ({
  open,
  onOpenChange,
  transactionId,
}) => {
  const { deleteTransaction, transactions } = useTransactions();

  const transaction = transactionId 
    ? transactions.find(t => t.id === transactionId)
    : null;

  const handleDelete = () => {
    if (transactionId) {
      deleteTransaction(transactionId);
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this transaction?
            {transaction && (
              <div className="mt-2 p-3 bg-muted rounded border-l-4 border-l-destructive">
                <div className="font-medium">{transaction.description}</div>
                <div className="text-sm text-muted-foreground">
                  {transaction.type === 'credit' ? '+' : '-'}
                  ${transaction.amount.toFixed(2)}
                </div>
              </div>
            )}
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete Transaction
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
