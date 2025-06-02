
import React, { useState } from 'react';
import { TransactionProvider } from '../contexts/TransactionContext';
import { Dashboard } from '../components/Dashboard';
import { ThemeProvider } from '../contexts/ThemeContext';

const Index = () => {
  return (
    <ThemeProvider>
      <TransactionProvider>
        <div className="min-h-screen bg-background transition-colors">
          <Dashboard />
        </div>
      </TransactionProvider>
    </ThemeProvider>
  );
};

export default Index;
