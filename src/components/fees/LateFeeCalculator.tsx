import React from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';
import { differenceInDays } from 'date-fns';

interface LateFee {
  bookId: number;
  bookTitle: string;
  userId: number;
  userName: string;
  dueDate: string;
  returnDate: string | null;
  amount: number;
}

function LateFeeCalculator() {
  const DAILY_RATE = 0.50; // $0.50 per day
  const MAX_FEE = 20.00; // Maximum fee per book

  const calculateFee = (dueDate: string, returnDate: string | null): number => {
    if (!returnDate) return 0;
    const days = differenceInDays(new Date(returnDate), new Date(dueDate));
    return Math.min(Math.max(0, days) * DAILY_RATE, MAX_FEE);
  };

  const lateFees: LateFee[] = [
    {
      bookId: 1,
      bookTitle: 'Clean Code',
      userId: 1,
      userName: 'Emma Wilson',
      dueDate: '2024-03-10',
      returnDate: '2024-03-15',
      amount: calculateFee('2024-03-10', '2024-03-15'),
    },
    {
      bookId: 2,
      bookTitle: 'Design Patterns',
      userId: 2,
      userName: 'James Chen',
      dueDate: '2024-03-12',
      returnDate: null,
      amount: calculateFee('2024-03-12', new Date().toISOString()),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Late Fees</h2>
      <div className="space-y-4">
        {lateFees.map((fee) => (
          <div key={`${fee.bookId}-${fee.userId}`} className="border-b border-gray-200 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{fee.bookTitle}</h3>
                <p className="text-sm text-gray-500">Borrowed by {fee.userName}</p>
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-red-600">
                    {fee.returnDate ? 'Returned late' : 'Currently overdue'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-lg font-semibold text-gray-900">
                  <DollarSign className="w-5 h-5" />
                  {fee.amount.toFixed(2)}
                </div>
                <p className="text-sm text-gray-500">
                  {differenceInDays(
                    new Date(fee.returnDate || new Date()),
                    new Date(fee.dueDate)
                  )}{' '}
                  days overdue
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Outstanding Fees</span>
          <div className="flex items-center gap-1 text-xl font-bold text-gray-900">
            <DollarSign className="w-5 h-5" />
            {lateFees.reduce((sum, fee) => sum + fee.amount, 0).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LateFeeCalculator;