import { Flashcard } from './Flashcard';

export class Category {
  id: number;
  name: string;
  description?: string;
  flashcards: Flashcard[];

  constructor(
    id: number,
    name: string,
    flashcards: Flashcard[] = [],
    description?: string
  ) {
    this.id = id;
    this.name = name;
    this.flashcards = flashcards;
    if (description) {
      this.description = description;
    }
  }

  addFlashcard(flashcard: Flashcard): void {
    this.flashcards.push(flashcard);
  }

  updateDescription(newDescription: string): void {
    this.description = newDescription;
  }
}
