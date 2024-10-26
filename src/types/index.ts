export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  status: 'Available' | 'Borrowed' | 'Reserved';
  cover: string;
  description?: string;
  category?: string;
  dueDate?: string;
  borrower?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  borrowedBooks: number;
  joinDate: string;
  avatar: string;
  role: 'Admin' | 'User';
}

export interface BorrowRecord {
  id: number;
  bookId: number;
  userId: number;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Active' | 'Returned' | 'Overdue';
}