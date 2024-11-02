import React, { useState } from 'react';
import { X, Upload, Search, Plus } from 'lucide-react';
import BookForm from './BookForm';

interface AddBookModalProps {
  onClose: () => void;
  onAdd: (bookData: any) => void;
}

function AddBookModal({ onClose, onAdd }: AddBookModalProps) {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const suggestedBooks = [
    {
      title: "The Pragmatic Programmer",
      author: "David Thomas, Andrew Hunt",
      isbn: "978-0201616224",
      cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1000",
      description: "A guide to software development best practices.",
      category: "Technology"
    },
    {
      title: "Design Patterns",
      author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
      isbn: "978-0201633610",
      cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=1000",
      description: "Elements of Reusable Object-Oriented Software",
      category: "Technology"
    },
    {
      title: "Refactoring",
      author: "Martin Fowler",
      isbn: "978-0134757599",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000",
      description: "Improving the Design of Existing Code",
      category: "Technology"
    }
  ];

  const handleSelectBook = (book: any) => {
    setSelectedBook(book);
    setShowSuggestions(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {showSuggestions ? 'Add New Book' : 'Edit Book Details'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {showSuggestions ? (
          <div className="p-6">
            <div className="mb-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSuggestions(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Custom Book
                </button>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for books..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedBooks.map((book, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:border-indigo-500 cursor-pointer transition-colors"
                  onClick={() => handleSelectBook(book)}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="font-medium text-gray-900">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <p className="text-sm text-gray-500 mt-1">ISBN: {book.isbn}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <BookForm
              onSubmit={onAdd}
              initialData={selectedBook}
              onCancel={() => setShowSuggestions(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddBookModal;