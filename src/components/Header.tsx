
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { AddTransactionDialog } from './AddTransactionDialog';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">ExpenseTracker</h1>
            <p className="text-sm text-muted-foreground">Manage your finances with ease</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Transaction</span>
            </Button>
          </div>
        </div>
      </div>
      
      <AddTransactionDialog 
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </header>
  );
};
