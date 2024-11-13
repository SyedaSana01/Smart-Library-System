import React, { useState } from 'react';

function AddBookModal({ onClose, onAddBook }: any) {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    description: '',
    cover: '',
  });

  // Update handleChange to handle both input and textarea elements
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onAddBook(bookData);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Add a New Book</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            placeholder="Author"
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            name="isbn"
            value={bookData.isbn}
            onChange={handleChange}
            placeholder="ISBN"
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            name="category"
            value={bookData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            name="cover"
            value={bookData.cover}
            onChange={handleChange}
            placeholder="Cover Image URL"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBookModal;


