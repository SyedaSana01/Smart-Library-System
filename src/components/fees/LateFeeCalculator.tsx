import React, { useState, useEffect } from 'react';
import { DollarSign, CreditCard, Calendar, CheckCircle, XCircle, BarChart2 } from 'lucide-react';
import { format, differenceInDays, isWeekend, addDays } from 'date-fns';
import jsPDF from 'jspdf';

interface LateFee {
  id: number;
  userName: string;
  bookTitle: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  amount: number;
  isPaid: boolean;
  paymentDate?: string;
  invoiceUrl?: string;
}

function LateFeeCalculator() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<LateFee | null>(null);
  const [lateFees, setLateFees] = useState<LateFee[]>([
    {
      id: 1,
      userName: 'Emma Wilson',
      bookTitle: 'Clean Code',
      borrowDate: '2024-02-25',
      dueDate: '2024-03-11',
      returnDate: '2024-03-15',
      amount: 20,
      isPaid: false,
    },
    {
      id: 2,
      userName: 'James Chen',
      bookTitle: 'Design Patterns',
      borrowDate: '2024-02-20',
      dueDate: '2024-03-06',
      returnDate: '2024-03-10',
      amount: 20,
      isPaid: true,
      paymentDate: '2024-03-11',
    },
    // Add more users
    {
      id: 3,
      userName: 'Sophia Miller',
      bookTitle: 'Refactoring',
      borrowDate: '2024-03-01',
      dueDate: '2024-03-16',
      returnDate: null,
      amount: 40,
      isPaid: false,
    },
    {
      id: 4,
      userName: 'John Doe',
      bookTitle: 'JavaScript: The Good Parts',
      borrowDate: '2024-03-05',
      dueDate: '2024-03-20',
      returnDate: '2024-03-25',
      amount: 10,
      isPaid: false,
    },
    {
      id: 5,
      userName: 'Jane Smith',
      bookTitle: 'The Pragmatic Programmer',
      borrowDate: '2024-02-15',
      dueDate: '2024-03-01',
      returnDate: '2024-03-05',
      amount: 15,
      isPaid: true,
      paymentDate: '2024-03-10',
    },
    {
      id: 6,
      userName: 'David Evans',
      bookTitle: 'The Catcher in the Rye',
      borrowDate: '2024-09-10',
      dueDate: '2024-09-25',
      returnDate: '2024-09-27',
      amount: 5,
      isPaid: true,
      invoiceUrl: 'invoice6.pdf',
    },
    {
      id: 7,
      userName: 'Emma Williams',
      bookTitle: 'Brave New World',
      borrowDate: '2024-09-15',
      dueDate: '2024-09-30',
      returnDate: '2024-10-01',
      amount: 4,
      isPaid: false,
      invoiceUrl: '',
    },
    {
      id: 8,
      userName: 'Frank Miller',
      bookTitle: 'War and Peace',
      borrowDate: '2024-09-01',
      dueDate: '2024-09-16',
      returnDate: '2024-09-18',
      amount: 8,
      isPaid: true,
      invoiceUrl: 'invoice8.pdf',
    },
    {
      id: 9,
      userName: 'Grace Wilson',
      bookTitle: 'The Odyssey',
      borrowDate: '2024-10-01',
      dueDate: '2024-10-15',
      returnDate: '2024-10-16',
      amount: 6,
      isPaid: false,
      invoiceUrl: '',
    },
    {
      id: 10,
      userName: 'Henry Moore',
      bookTitle: 'Les Misérables',
      borrowDate: '2024-09-25',
      dueDate: '2024-10-10',
      returnDate: '2024-10-12',
      amount: 7,
      isPaid: false,
      invoiceUrl: '',
    },
    {
      id: 11,
      userName: 'Isla Taylor',
      bookTitle: 'The Brothers Karamazov',
      borrowDate: '2024-09-10',
      dueDate: '2024-09-25',
      returnDate: '2024-09-28',
      amount: 4,
      isPaid: true,
      invoiceUrl: 'invoice11.pdf',
    },
    {
      id: 12,
      userName: 'Jack Lee',
      bookTitle: 'Crime and Punishment',
      borrowDate: '2024-09-12',
      dueDate: '2024-09-27',
      returnDate: '2024-09-30',
      amount: 5,
      isPaid: true,
      invoiceUrl: 'invoice12.pdf',
    },
    {
      id: 13,
      userName: 'Katherine Clark',
      bookTitle: 'Don Quixote',
      borrowDate: '2024-10-10',
      dueDate: '2024-10-25',
      returnDate: '2024-10-30',
      amount: 6,
      isPaid: false,
      invoiceUrl: '',
    },
    {
      id: 14,
      userName: 'Liam Harris',
      bookTitle: 'Frankenstein',
      borrowDate: '2024-08-20',
      dueDate: '2024-09-05',
      returnDate: '2024-09-07',
      amount: 3,
      isPaid: false,
      invoiceUrl: '',
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | null>(null);

  const DAILY_RATE = 5;
  const WEEKEND_MULTIPLIER = 1.5; // 50% more for weekends
  const LOAN_PERIOD = 15;

  const calculateFee = (dueDate: string, returnDate: string | null): number => {
    if (!returnDate) {
      const daysLate = Math.max(0, differenceInDays(new Date(), new Date(dueDate)));
      return calculateDynamicFee(daysLate);
    }
    const daysLate = Math.max(0, differenceInDays(new Date(returnDate), new Date(dueDate)));
    return calculateDynamicFee(daysLate);
  };

  const calculateDynamicFee = (daysLate: number): number => {
    let fee = 0;
    for (let i = 0; i < daysLate; i++) {
      const day = addDays(new Date(), -i);
      if (isWeekend(day)) {
        fee += DAILY_RATE * WEEKEND_MULTIPLIER;
      } else {
        fee += DAILY_RATE;
      }
    }
    return fee;
  };

  const sendReminder = (userName: string, bookTitle: string, dueDate: string) => {
    setToastMessage(`Reminder sent to ${userName} for returning "${bookTitle}" by ${dueDate}.`);
    setToastType('success');
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handlePayment = (fee: LateFee) => {
    setSelectedFee(fee);
    setShowPaymentModal(true);
  };

  const completePayment = () => {
    if (selectedFee) {
      const updatedFees = lateFees.map((fee) => {
        if (fee.id === selectedFee.id) {
          return {
            ...fee,
            isPaid: true,
            paymentDate: format(new Date(), 'yyyy-MM-dd'),
            invoiceUrl: generateInvoice(fee),
          };
        }
        return fee;
      });

      setLateFees(updatedFees);
      setShowPaymentModal(false);
      setSelectedFee(null);

      setToastMessage(`Payment of $${selectedFee.amount.toFixed(2)} processed successfully.`);
      setToastType('success');
      setTimeout(() => setToastMessage(null), 5000);
    }
  };

  const generateInvoice = (fee: LateFee): string => {
    const doc = new jsPDF();
    doc.text('Late Fee Invoice', 10, 10);
    doc.text(`User: ${fee.userName}`, 10, 20);
    doc.text(`Book: ${fee.bookTitle}`, 10, 30);
    doc.text(`Amount: $${fee.amount.toFixed(2)}`, 10, 40);
    const fileName = `${fee.userName}_Invoice_${fee.id}.pdf`;
    doc.save(fileName); // Save the PDF to a file
    return fileName; // Return the file name (for the download link)
  };

  const closeToast = () => {
    setToastMessage(null);
  };

  // Basic analytics calculations
  const totalLateFees = lateFees.length;
  const totalPaidFees = lateFees.filter((fee) => fee.isPaid).length;
  const totalUnpaidFees = totalLateFees - totalPaidFees;
  const totalAmountUnpaid = lateFees.filter((fee) => !fee.isPaid).reduce((sum, fee) => sum + fee.amount, 0);
  const percentagePaid = (totalPaidFees / totalLateFees) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Late Fees</h2>
          <p className="text-sm text-gray-500 mt-1">
            Loan period: {LOAN_PERIOD} days | Late fee: ${DAILY_RATE}/day (Weekend rate: {WEEKEND_MULTIPLIER}x)
          </p>
        </div>
        <button
          onClick={() => sendReminder('Emma Wilson', 'Clean Code', '2024-03-11')}
          className="bg-indigo-600 text-white px-3 py-2 rounded-md"
        >
          Send Reminder
        </button>
      </div>

      {/* Analytics Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Analytics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white shadow rounded-lg flex items-center">
            <BarChart2 className="w-5 h-5 text-indigo-600 mr-3" />
            <span>Total Late Fees: {totalLateFees}</span>
          </div>
          <div className="p-3 bg-white shadow rounded-lg flex items-center">
            <DollarSign className="w-5 h-5 text-green-600 mr-3" />
            <span>Paid: {totalPaidFees}</span>
          </div>
          <div className="p-3 bg-white shadow rounded-lg flex items-center">
            <CreditCard className="w-5 h-5 text-red-600 mr-3" />
            <span>Unpaid: {totalUnpaidFees}</span>
          </div>
          <div className="p-3 bg-white shadow rounded-lg flex items-center">
            <Calendar className="w-5 h-5 text-yellow-600 mr-3" />
            <span>Unpaid Amount: ${totalAmountUnpaid.toFixed(2)}</span>
          </div>
          <div className="p-3 bg-white shadow rounded-lg flex items-center col-span-2">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
            <span>Percentage Paid: {percentagePaid.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Book Title</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Borrow Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Return Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fee</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lateFees.map((fee) => (
              <tr key={fee.id}>
                <td className="px-4 py-2 whitespace-nowrap">{fee.userName}</td>
                <td className="px-4 py-2 whitespace-nowrap">{fee.bookTitle}</td>
                <td className="px-4 py-2 whitespace-nowrap">{fee.borrowDate}</td>
                <td className="px-4 py-2 whitespace-nowrap">{fee.dueDate}</td>
                <td className="px-4 py-2 whitespace-nowrap">{fee.returnDate || 'Not Returned'}</td>
                <td className="px-4 py-2 whitespace-nowrap">${fee.amount.toFixed(2)}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {!fee.isPaid && (
                    <button
                      onClick={() => handlePayment(fee)}
                      className="bg-indigo-600 text-white px-3 py-2 rounded-md"
                    >
                      Pay Now
                    </button>
                  )}
                  {fee.isPaid && (
                    <a href={fee.invoiceUrl} download className="text-indigo-600 hover:text-indigo-900">
                      Download Invoice
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPaymentModal && selectedFee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-medium text-gray-900">Complete Payment</h3>
            <p className="text-gray-700 mt-2">
              You are about to pay <span className="font-semibold">${selectedFee.amount.toFixed(2)}</span> for the late
              return of <span className="font-semibold">{selectedFee.bookTitle}</span>.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => completePayment()}
                className="bg-green-600 text-white px-3 py-2 rounded-md"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="ml-2 bg-gray-600 text-white px-3 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div
          className={`fixed bottom-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg ${
            toastType === 'success' ? 'bg-green-600' : 'bg-red-600'
          } text-white`}
        >
          {toastType === 'success' ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
          <p>{toastMessage}</p>
          <button onClick={closeToast} className="ml-4">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default LateFeeCalculator;

