
// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Plus, Moon, Sun } from 'lucide-react';
// import { useTheme } from '../contexts/ThemeContext';
// import { AddTransactionDialog } from './AddTransactionDialog';

// export const Header: React.FC = () => {
//   const { theme, toggleTheme } = useTheme();
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

//   return (
//     <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-foreground">ExpenseTracker</h1>
//             <p className="text-sm text-muted-foreground">Manage your finances with ease</p>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={toggleTheme}
//               aria-label="Toggle theme"
//             >
//               {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
//             </Button>
            
//             <Button 
//               onClick={() => setIsAddDialogOpen(true)}
//               className="flex items-center space-x-2"
//             >
//               <Plus className="h-4 w-4" />
//               <span>Add Transaction</span>
//             </Button>
//           </div>
//         </div>
//       </div>
      
//       <AddTransactionDialog 
//         open={isAddDialogOpen}
//         onOpenChange={setIsAddDialogOpen}
//       />
//     </header>
//   );
// };




import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Moon, Sun, LogOut, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { AddTransactionDialog } from './AddTransactionDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
const dispatch = useDispatch();
  const handleProfileClick = () => {
    console.log('View Profile');
  };

  const handleLogout = () => {
    console.log('Logout');
    dispatch(logout());
    
  };

  const avatarText = (): string => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        const parsed = JSON.parse(user);
        const name = parsed.email || '';
        const initials = name
          .split(' ')
          .map(part => part[0])
          .join('')
          .toUpperCase();
        return initials;
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
    return '';
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* App Title */}
          <div>
            <h1 className="text-2xl font-bold text-foreground">ExpenseTracker</h1>
            <p className="text-sm text-muted-foreground">Manage your finances with ease</p>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Add Transaction */}
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Transaction</span>
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <AvatarImage src="/avatar.png" alt="Profile" />
                  <AvatarFallback>{avatarText()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleProfileClick}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
