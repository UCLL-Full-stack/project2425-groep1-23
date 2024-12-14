import { User } from './User';
import { Flashcard } from './Flashcard';

export class Assignment {
  id: number;
  userId: number;
  flashcardId: number;
  assignedAt: Date;
  user: User;
  flashcard: Flashcard;

  constructor(
    id: number,
    userId: number,
    flashcardId: number,
    assignedAt: Date,
    user: User,
    flashcard: Flashcard
  ) {
    this.id = id;
    this.userId = userId;
    this.flashcardId = flashcardId;
    this.assignedAt = assignedAt;
    this.user = user;
    this.flashcard = flashcard;
  }

  reassignFlashcard(newFlashcard: Flashcard): void {
    this.flashcard = newFlashcard;
    this.flashcardId = newFlashcard.id;
    this.assignedAt = new Date();
  }
}
