import { User } from './User';
import { Flashcard } from './Flashcard';
import { Status } from './Status';

export class Progress {
  id: number;
  userId: number;
  flashcardId: number;
  status: Status;
  lastReviewed?: Date;
  timesReviewed: number;
  user: User;
  flashcard: Flashcard;

  constructor(
    id: number,
    userId: number,
    flashcardId: number,
    status: Status,
    timesReviewed: number,
    user: User,
    flashcard: Flashcard,
    lastReviewed?: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.flashcardId = flashcardId;
    this.status = status;
    this.timesReviewed = timesReviewed;
    this.user = user;
    this.flashcard = flashcard;
    if (lastReviewed) {
      this.lastReviewed = lastReviewed;
    }
  }

  updateStatus(newStatus: Status): void {
    this.status = newStatus;
    this.lastReviewed = new Date();
    this.timesReviewed += 1;
  }
}
