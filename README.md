
# Expense Tracker

A modern, feature-rich expense tracking application built with React, TypeScript, and Tailwind CSS. Track your income and expenses, visualize your spending patterns, and manage your financial data with an intuitive interface.

## 🚀 Features

### Core Functionality
- **Add Transactions**: Record income (credit) and expense (debit) transactions with detailed information
- **Transaction Management**: View, filter, and delete transactions with ease
- **Real-time Summary**: See your total income, expenses, and current balance at a glance
- **Data Persistence**: Automatic local storage saves your data between sessions

### Advanced Features
- **Interactive Charts**: Visualize your spending patterns with responsive charts
- **Smart Filtering**: Filter transactions by type (credit/debit) and date range
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Category Management**: Organize transactions with customizable categories

### User Experience
- **Toast Notifications**: Instant feedback for all actions
- **Form Validation**: Comprehensive input validation with helpful error messages
- **Intuitive UI**: Clean, modern interface built with shadcn/ui components
- **Keyboard Accessible**: Full keyboard navigation support

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: shadcn/ui component library
- **State Management**: React Context API with local storage persistence
- **Charts**: Recharts for interactive data visualization
- **Date Handling**: date-fns for robust date operations
- **Form Management**: React Hook Form with Zod validation
- **Icons**: Lucide React for consistent iconography

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

## 🎯 Usage

### Adding a Transaction
1. Click the "Add Transaction" button
2. Fill in the transaction details:
   - Amount (required)
   - Type: Credit (income) or Debit (expense)
   - Description (required)
   - Date and time
   - Category (optional)
3. Click "Add Transaction" to save

### Filtering Transactions
- Use the filter dropdown to show all transactions, only credits, or only debits
- Select a date range using the date picker to filter by time period
- Combine filters for more specific results

### Managing Data
- Delete transactions by clicking the delete button in the transaction list
- All data is automatically saved to your browser's local storage
- Data persists between browser sessions

## 📊 Dashboard Overview

The main dashboard provides:

### Summary Cards
- **Total Credit**: Sum of all income transactions
- **Total Debit**: Sum of all expense transactions  
- **Balance**: Net difference between credits and debits

### Transaction List
- Chronological list of all transactions
- Color-coded by type (green for credit, red for debit)
- Quick actions for each transaction

### Interactive Chart
- Visual representation of your financial data
- Responsive design adapts to screen size
- Clear distinction between income and expenses

## 🔧 Configuration

### Customizing Categories
Edit the category options in the transaction form by modifying the category dropdown in the AddTransactionDialog component.

### Theming
The application supports both light and dark themes. The theme preference is automatically saved and restored on subsequent visits.

### Local Storage
Transaction data is stored in your browser's local storage under the key `expense-tracker-transactions`. This ensures your data persists between sessions without requiring a backend.

## 🚀 Deployment

### Using Lovable (Recommended)
1. Open your [Lovable Project](https://lovable.dev/projects/1717edf6-155d-44c9-a683-a368bd5ca25e)
2. Click on "Share" → "Publish"
3. Your app will be deployed and accessible via a public URL

### Manual Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your preferred hosting service (Vercel, Netlify, etc.)

## 🔗 Custom Domain

To connect a custom domain:
1. Navigate to Project > Settings > Domains in Lovable
2. Click "Connect Domain"
3. Follow the setup instructions
4. Note: A paid Lovable plan is required for custom domains

## 🤝 Contributing

This project was built with Lovable. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

- **Documentation**: [Lovable Docs](https://docs.lovable.dev/)
- **Community**: [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Issues**: Create an issue in this repository

## 🎬 Demo

Visit the live demo at: `https://lovable.dev/projects/1717edf6-155d-44c9-a683-a368bd5ca25e`

---

Built with ❤️ using [Lovable](https://lovable.dev)
