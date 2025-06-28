
// import React, { useMemo } from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from 'recharts';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useTransactions } from '../contexts/TransactionContext';
// import { format, subDays, startOfDay } from 'date-fns';

// export const ExpenseChart: React.FC = () => {
//   const { filteredTransactions } = useTransactions();

//   const dailyData = useMemo(() => {
//     const last7Days = Array.from({ length: 7 }, (_, i) => {
//       const date = startOfDay(subDays(new Date(), 6 - i));
//       return {
//         date,
//         dateStr: format(date, 'MMM dd'),
//         credit: 0,
//         debit: 0,
//       };
//     });

//     filteredTransactions.forEach(transaction => {
//       const transactionDate = startOfDay(transaction.date);
//       const dayData = last7Days.find(day => 
//         day.date.getTime() === transactionDate.getTime()
//       );
      
//       if (dayData) {
//         if (transaction.type === 'credit') {
//           dayData.credit += transaction.amount;
//         } else {
//           dayData.debit += transaction.amount;
//         }
//       }
//     });

//     return last7Days;
//   }, [filteredTransactions]);

//   const categoryData = useMemo(() => {
//     const categories: { [key: string]: number } = {};
    
//     filteredTransactions
//       .filter(t => t.type === 'debit' && t.category)
//       .forEach(transaction => {
//         const category = transaction.category || 'Other';
//         categories[category] = (categories[category] || 0) + transaction.amount;
//       });

//     return Object.entries(categories).map(([name, value]) => ({
//       name,
//       value,
//     }));
//   }, [filteredTransactions]);

//   const COLORS = [
//     '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
//     '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'
//   ];

//   const CustomTooltip = ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-background border rounded-lg p-3 shadow-lg">
//           <p className="font-medium">{label}</p>
//           {payload.map((entry: any, index: number) => (
//             <p key={index} className="text-sm" style={{ color: entry.color }}>
//               {entry.dataKey === 'credit' ? 'Income' : entry.dataKey === 'debit' ? 'Expenses' : entry.dataKey}: 
//               ${entry.value.toFixed(2)}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   const PieTooltip = ({ active, payload }: any) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-background border rounded-lg p-3 shadow-lg">
//           <p className="font-medium">{payload[0].name}</p>
//           <p className="text-sm">${payload[0].value.toFixed(2)}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="space-y-6">
//       <Tabs defaultValue="daily" className="w-full">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="daily">Daily Trend</TabsTrigger>
//           <TabsTrigger value="categories">Categories</TabsTrigger>
//           <TabsTrigger value="comparison">Comparison</TabsTrigger>
//         </TabsList>

//         <TabsContent value="daily" className="mt-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Income vs Expenses (Last 7 Days)</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={400}>
//                 <LineChart data={dailyData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="dateStr" />
//                   <YAxis />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Line 
//                     type="monotone" 
//                     dataKey="credit" 
//                     stroke="#10B981" 
//                     strokeWidth={3}
//                     name="Income"
//                   />
//                   <Line 
//                     type="monotone" 
//                     dataKey="debit" 
//                     stroke="#EF4444" 
//                     strokeWidth={3}
//                     name="Expenses"
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="categories" className="mt-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Expenses by Category</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {categoryData.length > 0 ? (
//                 <ResponsiveContainer width="100%" height={400}>
//                   <PieChart>
//                     <Pie
//                       data={categoryData}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                       outerRadius={120}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {categoryData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip content={<PieTooltip />} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <div className="flex items-center justify-center h-[400px] text-muted-foreground">
//                   <div className="text-center">
//                     <p>No expense data available</p>
//                     <p className="text-sm">Add some expense transactions to see category breakdown</p>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="comparison" className="mt-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Daily Income vs Expenses</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={400}>
//                 <BarChart data={dailyData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="dateStr" />
//                   <YAxis />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Bar dataKey="credit" fill="#10B981" name="Income" />
//                   <Bar dataKey="debit" fill="#EF4444" name="Expenses" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };




import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line,
} from 'recharts';
import html2canvas from 'html2canvas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, subDays, startOfDay } from 'date-fns';
import { useGetTransactionsQuery } from '@/redux/services/transectionApi';
import { Button } from '@/components/ui/button';

export const ExpenseChart: React.FC = () => {
  const { data: transactions = [] } = useGetTransactionsQuery();

  const dailyData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = startOfDay(subDays(new Date(), 6 - i));
      return {
        date,
        dateStr: format(date, 'MMM dd'),
        credit: 0,
        debit: 0,
      };
    });

    transactions.forEach(transaction => {
      const transactionDate = startOfDay(new Date(transaction.date));
      const dayData = last7Days.find(day =>
        day.date.getTime() === transactionDate.getTime()
      );

      if (dayData) {
        if (transaction.type === 'credit') {
          dayData.credit += transaction.amount;
        } else {
          dayData.debit += transaction.amount;
        }
      }
    });

    return last7Days;
  }, [transactions]);

  const categoryData = useMemo(() => {
    const categories: { [key: string]: number } = {};
    transactions
      .filter(t => t.type === 'debit' && t.category)
      .forEach(transaction => {
        const category = transaction.category || 'Other';
        categories[category] = (categories[category] || 0) + transaction.amount;
      });

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  const COLORS = ['#10B981', '#EF4444', '#6366F1', '#F59E0B', '#EC4899', '#3B82F6', '#22D3EE', '#F43F5E'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white border rounded-lg p-3 shadow-lg text-gray-800">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'credit' ? 'Income' : 'Expenses'}: ${entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white border rounded-lg p-3 shadow-lg text-gray-800">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  const handleDownloadChart = async () => {
    const chartElement = document.getElementById('chart-container');
    if (chartElement) {
      const canvas = await html2canvas(chartElement);
      const link = document.createElement('a');
      link.download = 'chart.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-lg">
          <TabsTrigger value="daily">📈 Daily Trend</TabsTrigger>
          <TabsTrigger value="categories">📊 Categories</TabsTrigger>
          <TabsTrigger value="comparison">📉 Comparison</TabsTrigger>
        </TabsList>

        {/* Daily Trend */}
        <TabsContent value="daily" className="mt-6">
          <Card className="shadow-md rounded-2xl">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-lg font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Income vs Expenses (Last 7 Days)
              </CardTitle>
              <Button variant="outline" onClick={handleDownloadChart} className="hover:bg-primary hover:text-white transition-all">
                Download Chart
              </Button>
            </CardHeader>
            <CardContent>
              <div id="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dateStr" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="credit" stroke="#10B981" strokeWidth={3} name="Income" />
                    <Line type="monotone" dataKey="debit" stroke="#EF4444" strokeWidth={3} name="Expenses" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories */}
        <TabsContent value="categories" className="mt-6">
          <Card className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-pink-600">Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[400px] text-gray-500">
                  <div className="text-center">
                    <p className="text-lg font-semibold">No expense data available</p>
                    <p className="text-sm">Add some expense transactions to see category breakdown</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparison */}
        <TabsContent value="comparison" className="mt-6">
          <Card className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-purple-600">Daily Income vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dateStr" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="credit" fill="#10B981" name="Income" />
                  <Bar dataKey="debit" fill="#EF4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};



