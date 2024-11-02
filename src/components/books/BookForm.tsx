import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface BookFormProps {
  onSubmit: (bookData: any) => void;
  onCancel?: () => void;
  initialData?: any;
  isEdit?: boolean;
}

function BookForm({ onSubmit, onCancel, initialData, isEdit = false }: BookFormProps) {
  const [bookData, setBookData] = useState(
    initialData || {
      title: '',
      author: '',
      isbn: '',
      category: '',
      description: '',
      cover: '',
      copies: 1,
      location: {
        section: '',
        shelf: '',
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(bookData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={bookData.title}
            onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            id="author"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={bookData.author}
            onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={bookData.isbn}
            onChange={(e) => setBookData({ ...bookData, isbn: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={bookData.category}
            onChange={(e) => setBookData({ ...bookData, category: e.target.value })}
          >
            <option value="">Select a category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="History">History</option>
            <option value="Biography">Biography</option>
            <option value="Design">Design</option>
            <option value="Self-Development">Self-Development</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={bookData.description}
            onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="copies" className="block text-sm font-medium text-gray-700">
            Number of Copies
          </label>
          <input
            type="number"
            id="copies"
            min="1"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={bookData.copies}
            onChange={(e) => setBookData({ ...bookData, copies: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <label htmlFor="cover" className="block text-sm font-medium text-gray-700">
            Cover Image URL
          </label>
          <input
            type="url"
            id="cover"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={bookData.cover}
            onChange={(e) => setBookData({ ...bookData, cover: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="section" className="block text-sm font-medium text-gray-700">
            Section
          </label>
          <input
            type="text"
            id="section"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={bookData.location.section}
            onChange={(e) =>
              setBookData({
                ...bookData,
                location: { ...bookData.location, section: e.target.value },
              })
            }
          />
        </div>

        <div>
          <label htmlFor="shelf" className="block text-sm font-medium text-gray-700">
            Shelf
          </label>
          <input
            type="text"
            id="shelf"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={bookData.location.shelf}
            onChange={(e) =>
              setBookData({
                ...bookData,
                location: { ...bookData.location, shelf: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {isEdit ? 'Update Book' : 'Add Book'}
        </button>
      </div>
    </form>
  );
}

export default BookForm;