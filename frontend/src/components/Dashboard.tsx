
import React from 'react';
import { Header } from './Header';
import { SummaryCards } from './SummaryCards';
import { TransactionList } from './TransactionList';
import { ExpenseChart } from './ExpenseChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <SummaryCards />
        
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="mt-6">
            <TransactionList />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <ExpenseChart />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
