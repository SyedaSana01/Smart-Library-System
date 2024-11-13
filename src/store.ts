import create from 'zustand';

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface ExpenseStore {
  expenses: Expense[];
  totalBudget: number;
  budgets: Record<string, number>;
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  setBudget: (category: string, amount: number) => void;
  totalSpent: number;
}

export const useStore = create<ExpenseStore>((set, get) => ({
  expenses: [],
  totalBudget: 2000,
  budgets: {
    food: 500,
    entertainment: 300,
    transportation: 200,
    utilities: 400,
    shopping: 300,
    other: 300,
  },
  addExpense: (expense) =>
    set((state) => ({ expenses: [...state.expenses, expense] })),
  deleteExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    })),
  updateExpense: (id, updatedExpense) =>
    set((state) => ({
      expenses: state.expenses.map((expense) =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      ),
    })),
  setBudget: (category, amount) =>
    set((state) => ({
      budgets: { ...state.budgets, [category]: amount },
    })),
  get totalSpent() {
    return get().expenses.reduce((sum, expense) => sum + expense.amount, 0);
  },
}));