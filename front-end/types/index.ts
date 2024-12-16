export interface Flashcard {
    id: number;
    question: string;
    answer: string;
    categoryId?: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface FlashcardInput {
    question: string;
    answer: string;
    categoryId?: number;
  }

  export interface Category {
    id: number;
    name: string;
    description?: string;
  }


  export type StatusMessage = {
    message: string;
    type: "error" | "success";
};
