import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';
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
      cover: 'https://musafirbookstop.com/wp-content/uploads/2023/03/Copy-of-hindi-2023-03-19T002325.551.png',
      category: 'Design',
      description: 'A powerful primer on how design serves as the interface between objects and users.',
    },
    {
      id: 2,
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      isbn: '978-0062316097',
      status: 'Borrowed',
      cover: 'https://m.media-amazon.com/images/I/61i4k7DWNFL._AC_UF1000,1000_QL80_.jpg',
      category: 'History',
      description: 'A journey through the history of humankind.',
    },
     {
      id: 3,
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt and David Thomas',
      isbn: '978-0201616224',
      status: 'Available',
      cover: 'https://m.media-amazon.com/images/I/71VStSjZmpL._AC_UF1000,1000_QL80_.jpg',
      category: 'Technology',
      description: 'A practical guide to programming and software development.',
    },
    {
      id: 4,
      title: 'Atomic Habits',
      author: 'James Clear',
      isbn: '978-0735211292',
      status: 'Reserved',
      cover: 'https://m.media-amazon.com/images/I/81F90H7hnML.jpg',
      category: 'Self-Development',
      description: 'Tiny changes, remarkable results.',
    },
    {
      id: 5,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      status: 'Borrowed',
      cover: 'https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg',
      category: 'Technology',
      description: 'A handbook of agile software craftsmanship.',
    },
    
    {
      id: 6,
      title: 'The Subtle Art of Not Giving a F*ck',
      author: 'Mark Manson',
      isbn: '978-0062457714',
      status: 'Available',
      cover: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg',
      category: 'Self-Development',
      description: 'A counterintuitive approach to living a better life.',
    },
    {
      id: 7,
      title: 'Start with Why',
      author: 'Simon Sinek',
      isbn: '978-1591846444',
      status: 'Reserved',
      cover: 'https://m.media-amazon.com/images/I/71M1P287BjL._AC_UF1000,1000_QL80_.jpg',
      category: 'Business',
      description: 'How great leaders inspire everyone to take action.',
    },
    {
      id: 8,
      title: 'The Art of War',
      author: 'Sun Tzu',
      isbn: '978-1590302255',
      status: 'Available',
      cover: 'https://m.media-amazon.com/images/I/71jWgemHbML._AC_UF1000,1000_QL80_.jpg',
      category: 'Strategy',
      description: 'An ancient Chinese military treatise.',
    },
    {
      id: 9,
      title: 'The Lean Startup',
      author: 'Eric Ries',
      isbn: '978-0307887894',
      status: 'Available',
      cover: 'https://images-eu.ssl-images-amazon.com/images/I/81vvgZqCskL._AC_UL210_SR210,210_.jpg',
      category: 'Business',
      description: 'How today’s entrepreneurs use continuous innovation to create radically successful businesses.',
    },
    {
      id: 10,
      title: 'The Four-Hour Workweek',
      author: 'Tim Ferriss',
      isbn: '978-0307465351',
      status: 'Borrowed',
      cover: 'https://m.media-amazon.com/images/I/61xpaBcQkcL.jpg',
      category: 'Productivity',
      description: 'Escape 9-5, live anywhere, and join the new rich.',
    },
    {
      id: 11,
      title: 'Outliers: The Story of Success',
      author: 'Malcolm Gladwell',
      isbn: '978-0316017930',
      status: 'Reserved',
      cover: 'https://m.media-amazon.com/images/I/61XsLQzCkRL.jpg',
      category: 'Psychology',
      description: 'What makes high-achievers different.',
    },
    {
      id: 12,
      title: 'The Power of Habit',
      author: 'Charles Duhigg',
      isbn: '978-0812981605',
      status: 'Available',
      cover: 'https://m.media-amazon.com/images/I/71iEVsSP1GL._AC_UF1000,1000_QL80_.jpg',
      category: 'Self-Development',
      description: 'Why we do what we do in life and business.',
    },
    {
      id: 13,
      title: 'The Mythical Man-Month',
      author: 'Frederick P. Brooks Jr.',
      isbn: '978-0201835953',
      status: 'Borrowed',
      cover: 'https://m.media-amazon.com/images/I/817iWsLJR0L.jpg',
      category: 'Technology',
      description: 'Essays on software engineering and project management.',
    },
    {
      id: 14,
      title: 'The Millionaire Next Door',
      author: 'Thomas J. Stanley and William D. Danko',
      isbn: '978-1589795471',
      status: 'Reserved',
      cover: 'https://m.media-amazon.com/images/I/81qR5W9XCaL.jpg',
      category: 'Finance',
      description: 'The surprising secrets of America’s wealthy.',
    },
    {
      id: 15,
      title: 'Educated',
      author: 'Tara Westover',
      isbn: '978-0399590504',
      status: 'Available',
      cover: 'https://m.media-amazon.com/images/I/91BHu7xj8eL._AC_UF1000,1000_QL80_.jpg',
      category: 'Biography',
      description: 'A memoir about a woman who grows up in a strict and abusive household in rural Idaho.',
    },
    {
      id: 16,
      title: 'The Intelligent Investor',
      author: 'Benjamin Graham',
      isbn: '978-0060555665',
      status: 'Available',
      cover: 'https://m.media-amazon.com/images/I/71vllLbpsdL._UF1000,1000_QL80_.jpg',
      category: 'Finance',
      description: 'The definitive book on value investing.',
    },
    {
      id: 17,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      isbn: '978-0062315007',
      status: 'Borrowed',
      cover: 'https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg',
      category: 'Fiction',
      description: 'A novel about pursuing one’s dreams by following the path of the heart.',
    },
    {
      id: 18,
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      isbn: '978-0374275631',
      status: 'Reserved',
      cover: 'https://m.media-amazon.com/images/I/71f6DceqZAL.jpg',
      category: 'Psychology',
      description: 'A book on the two systems of thinking that drive human decision-making.',
    }
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

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {filteredBooks.map((book) => (
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddBookModal
          onClose={() => setShowAddModal(false)}
          onAddBook={handleAddBook}
        />
      )}

      {editingBook && (
        <BookForm
          book={editingBook}
          onSave={handleEditBook}
          onCancel={() => setEditingBook(null)}
        />
      )}
    </div>
  );
}

export default BookCatalog;
