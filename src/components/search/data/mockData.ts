import { SearchSuggestion, BookCategory } from '../types';

export const categories: BookCategory[] = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Science Fiction',
  'Romance',
  'Biography',
  'History',
  'Science',
  'Technology',
  'Philosophy',
  'Poetry',
  'Drama',
  'Children'
];

export const mockSuggestions: SearchSuggestion[] = [
  {
    id: '1',
    text: 'The Adventures of Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    category: 'Mystery',
    description: 'A collection of twelve short stories featuring the legendary detective Sherlock Holmes. Follow Holmes and Dr. Watson as they unravel complex mysteries using deductive reasoning and forensic science.',
    mediaLinks: {
      pdf: 'https://www.gutenberg.org/files/1661/1661-h/1661-h.htm',
      audio: 'https://librivox.org/the-adventures-of-sherlock-holmes-by-sir-arthur-conan-doyle/download.mp3',
      video: 'https://archive.org/download/SherlockHolmes1939/Sherlock_Holmes_1939.mp4'
    },
    thumbnail: 'https://images.unsplash.com/photo-1587876931567-564ce588bfbd',
    year: 1892,
    rating: 4.6,
    genres: ['Mystery', 'Classic', 'Detective'],
    libraryDetails: {
      shelfNumber: 'M-123',
      rackNumber: 'R-45',
      copiesAvailable: 3,
      totalPages: 307,
      isbn: '978-0140437713',
      language: 'English',
      edition: 'Penguin Classics',
      publisher: 'Penguin Books'
    }
  },
  {
    id: '2',
    text: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: 'Romance',
    description: 'A masterful satire of social conventions in Georgian England, following the turbulent relationship between Elizabeth Bennet and Mr. Darcy as they overcome their pride and prejudices.',
    mediaLinks: {
      pdf: 'https://www.gutenberg.org/files/1342/1342-h/1342-h.htm',
      audio: 'https://librivox.org/pride-and-prejudice-by-jane-austen/download.mp3',
      video: 'https://archive.org/download/PrideAndPrejudice1940/Pride_and_Prejudice_1940.mp4'
    },
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
    year: 1813,
    rating: 4.7,
    genres: ['Romance', 'Classic', 'Social Commentary'],
    libraryDetails: {
      shelfNumber: 'F-234',
      rackNumber: 'R-12',
      copiesAvailable: 5,
      totalPages: 432,
      isbn: '978-0141439518',
      language: 'English',
      edition: 'Penguin Classics',
      publisher: 'Penguin Books'
    }
  },
  {
    id: '3',
    text: 'The Republic',
    author: 'Plato',
    category: 'Philosophy',
    description: 'Plato\'s masterwork on justice, government, and the nature of the soul. Through dialogues led by Socrates, the text explores the meaning of justice and the structure of the ideal state.',
    mediaLinks: {
      pdf: 'https://www.gutenberg.org/files/1497/1497-h/1497-h.htm',
      audio: 'https://librivox.org/the-republic-by-plato/download.mp3',
      video: 'https://archive.org/download/republic_plato_documentary/republic_plato.mp4'
    },
    thumbnail: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc',
    year: -380,
    rating: 4.5,
    genres: ['Philosophy', 'Classic', 'Political Theory'],
    libraryDetails: {
      shelfNumber: 'P-567',
      rackNumber: 'R-78',
      copiesAvailable: 2,
      totalPages: 514,
      isbn: '978-0872201361',
      language: 'English',
      edition: 'Hackett Classics',
      publisher: 'Hackett Publishing'
    }
  }
];