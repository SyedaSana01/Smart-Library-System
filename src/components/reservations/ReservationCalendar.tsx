import React from 'react';
import { format, startOfWeek, addDays } from 'date-fns';

interface Reservation {
  id: number;
  userId: number;
  userName: string;
  bookId: number;
  bookTitle: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

function ReservationCalendar() {
  const today = new Date();
  const startDate = startOfWeek(today);
  
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));
  
  const reservations: Reservation[] = [
    {
      id: 1,
      userId: 1,
      userName: 'Emma Wilson',
      bookId: 1,
      bookTitle: 'The Design of Everyday Things',
      date: '2024-03-15',
      status: 'confirmed',
    },
    // Add more reservations as needed
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day) => (
            <div key={day.toString()} className="text-center">
              <div className="text-sm font-medium text-gray-500">
                {format(day, 'EEE')}
              </div>
              <div className="mt-1">
                <span className={`inline-flex items-center justify-center w-8 h-8 text-sm rounded-full ${
                  format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-900'
                }`}>
                  {format(day, 'd')}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{reservation.bookTitle}</p>
                <p className="text-sm text-gray-500">Reserved by {reservation.userName}</p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${
                reservation.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : reservation.status === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {reservation.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReservationCalendar;