import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, X } from 'lucide-react';
import AddBookModal from './books/AddBookModal';
import BookForm from './books/BookForm';

function BookCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      isbn: '978-0465050659',
      status: 'Available',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000',
      category: 'Design',
      description: 'A powerful primer on how design serves as the interface between objects and users.',
    },
    {
      id: 2,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      status: 'Borrowed',
      cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1000',
      category: 'Technology',
      description: 'A handbook of agile software craftsmanship.',
    },
    {
      id: 3,
      title: 'Atomic Habits',
      author: 'James Clear',
      isbn: '978-0735211292',
      status: 'Reserved',
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=1000',
      category: 'Self-Development',
      description: 'Tiny changes, remarkable results.',
    },
  ]);

  const handleAddBook = (bookData: any) => {
    const newBook = {
      id: books.length + 1,
      ...bookData,
      status: 'Available',
    };
    setBooks([...books, newBook]);
    setShowAddModal(false);
  };

  const handleEditBook = (bookData: any) => {
    setBooks(books.map(book => 
      book.id === editingBook.id ? { ...book, ...bookData } : book
    ));
    setEditingBook(null);
  };

  const handleDeleteBook = (bookId: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Book Catalog</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          Add Book
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search books..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow overflow-hidden group">
            <div className="relative">
              <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditingBook(book)}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 mr-2"
                >
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-sm text-gray-500 mt-1">ISBN: {book.isbn}</p>
              <p className="text-sm text-gray-600 mt-2">{book.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    book.status === 'Available'
                      ? 'bg-green-100 text-green-800'
                      : book.status === 'Borrowed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {book.status}
                </span>
                <span className="text-sm text-indigo-600">{book.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddBookModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddBook}
        />
      )}

      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Book</h2>
              <button
                onClick={() => setEditingBook(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <BookForm
                initialData={editingBook}
                onSubmit={handleEditBook}
                onCancel={() => setEditingBook(null)}
                isEdit
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookCatalog;