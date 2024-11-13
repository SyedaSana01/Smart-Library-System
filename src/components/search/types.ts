export interface SearchSuggestion {
  id: string;
  text: string;
  author: string;
  category: string;
  description: string;
  mediaLinks: {
    pdf?: string;
  };
  thumbnail?: string;
  year?: number;
  rating?: number;
  genres: string[];
  libraryDetails: {
    shelfNumber: string;
    rackNumber: string;
    copiesAvailable: number;
    totalPages: number;
    isbn: string;
    language: string;
    edition: string;
    publisher: string;
  };
}

export type BookCategory = 
  | 'Fiction'
  | 'Non-Fiction'
  | 'Mystery'
  | 'Science Fiction'
  | 'Romance'
  | 'Biography'
  | 'History'
  | 'Science'
  | 'Technology'
  | 'Philosophy'
  | 'Poetry'
  | 'Drama'
  | 'Children';