export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  status: 'Available' | 'Borrowed' | 'Reserved';
  cover: string;
  category: string;
  description: string;
}