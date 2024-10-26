import React, { useState } from 'react';
import { Calendar, Clock, Users, Wifi, Monitor, Coffee } from 'lucide-react';
import { format, addHours, setHours, setMinutes } from 'date-fns';

interface Room {
  id: number;
  name: string;
  capacity: number;
  features: string[];
  image: string;
}

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

function StudyRoomBooking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const rooms: Room[] = [
    {
      id: 1,
      name: 'Collaboration Room A',
      capacity: 6,
      features: ['Large Screen', 'Whiteboard', 'Video Conference'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: 2,
      name: 'Quiet Study Room B',
      capacity: 4,
      features: ['Silent Zone', 'Natural Light', 'Standing Desk'],
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1000',
    },
  ];

  const timeSlots: TimeSlot[] = Array.from({ length: 12 }, (_, i) => {
    const start = setMinutes(setHours(new Date(), 8 + Math.floor(i / 2)), (i % 2) * 30);
    const end = addHours(start, 1);
    return {
      start: format(start, 'HH:mm'),
      end: format(end, 'HH:mm'),
      available: Math.random() > 0.3,
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Study Room Booking</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedRoom === room.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
              onClick={() => setSelectedRoom(room.id)}
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="font-medium text-gray-900">{room.name}</h3>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">Up to {room.capacity} people</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {room.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Available Time Slots</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                disabled={!slot.available}
                className={`px-3 py-2 text-sm rounded-md text-center ${
                  slot.available
                    ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                {slot.start} - {slot.end}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            disabled={!selectedRoom}
            className={`px-4 py-2 rounded-md ${
              selectedRoom
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Book Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudyRoomBooking;