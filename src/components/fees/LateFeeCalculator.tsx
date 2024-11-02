import React, { useState } from 'react';
import { DollarSign, AlertCircle, Calendar, CreditCard } from 'lucide-react';
import { differenceInDays, format } from 'date-fns';

interface LateFee {
  bookId: number;
  bookTitle: string;
  userId: number;
  userName: string;
  dueDate: string;
  returnDate: string | null;
  amount: number;
  paymentStatus: 'pending' | 'paid' | 'waived';
  paymentHistory?: {
    date: string;
    amount: number;
    method: string;
  }[];
}

function LateFeeCalculator() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<LateFee | null>(null);

  const DAILY_RATE = 0.50; // $0.50 per day
  const MAX_FEE = 20.00; // Maximum fee per book
  const GRACE_PERIOD_DAYS = 2; // Days before late fees start accumulating

  const calculateFee = (dueDate: string, returnDate: string | null): number => {
    if (!returnDate) return 0;
    const days = differenceInDays(new Date(returnDate), new Date(dueDate));
    // Subtract grace period from late days
    const lateDays = Math.max(0, days - GRACE_PERIOD_DAYS);
    return Math.min(lateDays * DAILY_RATE, MAX_FEE);
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
      paymentStatus: 'pending',
      paymentHistory: [],
    },
    {
      bookId: 2,
      bookTitle: 'Design Patterns',
      userId: 2,
      userName: 'James Chen',
      dueDate: '2024-03-12',
      returnDate: null,
      amount: calculateFee('2024-03-12', new Date().toISOString()),
      paymentStatus: 'paid',
      paymentHistory: [
        {
          date: '2024-03-20',
          amount: 5.00,
          method: 'Credit Card',
        },
      ],
    },
  ];

  const handlePayment = (fee: LateFee) => {
    setSelectedFee(fee);
    setShowPaymentModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Late Fees</h2>
        <div className="text-sm text-gray-500">
          <p>Grace period: {GRACE_PERIOD_DAYS} days</p>
          <p>Daily rate: ${DAILY_RATE.toFixed(2)}</p>
          <p>Maximum fee: ${MAX_FEE.toFixed(2)}</p>
        </div>
      </div>

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
                {fee.paymentHistory && fee.paymentHistory.length > 0 && (
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Payment History:</p>
                    {fee.paymentHistory.map((payment, index) => (
                      <p key={index} className="ml-2">
                        {format(new Date(payment.date), 'MMM d, yyyy')} - ${payment.amount.toFixed(2)} ({payment.method})
                      </p>
                    ))}
                  </div>
                )}
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
                {fee.paymentStatus === 'pending' && (
                  <button
                    onClick={() => handlePayment(fee)}
                    className="mt-2 flex items-center gap-1 text-sm text-white bg-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-700"
                  >
                    <CreditCard className="w-4 h-4" />
                    Pay Now
                  </button>
                )}
                {fee.paymentStatus === 'paid' && (
                  <span className="mt-2 inline-block text-sm text-green-600 bg-green-50 px-2 py-1 rounded-md">
                    Paid
                  </span>
                )}
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
            {lateFees
              .filter((fee) => fee.paymentStatus === 'pending')
              .reduce((sum, fee) => sum + fee.amount, 0)
              .toFixed(2)}
          </div>
        </div>
      </div>

      {showPaymentModal && selectedFee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Pay Late Fee</h3>
            <p className="text-gray-600 mb-4">
              Amount due: ${selectedFee.amount.toFixed(2)}
            </p>
            {/* Add payment form here */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LateFeeCalculator;