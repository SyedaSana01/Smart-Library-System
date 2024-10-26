import React from 'react';
import { Book, Clock, User } from 'lucide-react';
import type { Book as BookType } from '../../types';
import { format } from 'date-fns';

interface BookDetailsProps {
  book: BookType;
  onClose: () => void;
  onBorrow: (bookId: number) => void;
  onReserve: (bookId: number) => void;
}

function BookDetails({ book, onClose, onBorrow, onReserve }: BookDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex gap-6">
            <img src={book.cover} alt={book.title} className="w-48 h-64 object-cover rounded-lg" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{book.title}</h2>
              <p className="text-lg text-gray-600 mb-2">{book.author}</p>
              <p className="text-sm text-gray-500 mb-4">ISBN: {book.isbn}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  book.status === 'Available' ? 'bg-green-100 text-green-800' :
                  book.status === 'Borrowed' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {book.status}
                </span>
                {book.dueDate && (
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    Due: {format(new Date(book.dueDate), 'MMM d, yyyy')}
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-6">{book.description}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => onBorrow(book.id)}
                  disabled={book.status !== 'Available'}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                    book.status === 'Available'
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Book className="w-4 h-4" />
                  Borrow
                </button>
                <button
                  onClick={() => onReserve(book.id)}
                  disabled={book.status === 'Available'}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                    book.status !== 'Available'
                      ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  Reserve
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;